import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { IconButton } from 'react-native-paper';
import { useWithLoading } from '@/hooks/useWithLoading';
import { useCloudFunction } from '@/hooks/useCloudFunction';
import { useLogger } from '@/hooks/useLogger';
import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useAuth } from '@/contexts/AuthProvider';
import i18n from '@/lib/i18n';
import { getRemoteConfig } from '@/lib/remoteConfig';
import { convertSupabaseToPrisma_SpotGuides, PrismaSpotGuides } from '@shared/converters/convert_spot_guides';
import { convertPrismaToSupabase_ExtSpots, PrismaExtSpots } from '@shared/converters/convert_ext_spots';
import { Env } from '@/constants/Env';
import type { GenerateSpotGuideRequest, GenerateSpotGuideResponse } from '@shared/api/generateSpotGuide.schema';
import { useLocale } from '@/hooks/useLocale';
import type { SupabaseSpotVisits } from '@shared/converters/convert_spot_visits';

/**
 * 🧭 SpotGuideCard
 *
 * 撮影画像とガイド情報を表示し、音声再生・いいね・次のガイド表示などの操作を提供する。
 * - 初期ロード時にガイドがなければ自動生成
 * - ガイドを切り替えるときに代表ガイドとして記録
 * - ガイド生成・いいねなどの操作ログを記録
 *
 * @param {ExtSpot} spot - 表示するスポット情報
 * @param {SpotGuide[]} initialGuides - 初期ガイドのリスト
 * @param {string} imageUri - 表示する撮影画像のURL
 * @param {string} [takenPhotoStoragePath] - 画像の保存パス（任意）
 * @returns {JSX.Element} ガイド表示用のUIコンポーネント
 */
export const SpotGuideCard = ({
    spot,
    initialGuides,
    imageUri,
    takenPhotoStoragePath,
}: {
    spot: PrismaExtSpots;
    initialGuides: (PrismaSpotGuides & { audioUrl: string })[];
    imageUri: string;
    takenPhotoStoragePath?: string | null;
}) => {
    const { user } = useAuth();
    const { isLoading, withLoading } = useWithLoading();
    const { logFrontendEvent } = useLogger();
    const { callCloudFunction } = useCloudFunction();
    const locale = useLocale();

    const [spotGuideList, setSpotGuideList] = useState(initialGuides);
    const [spotGuideIndex, setSpotGuideIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [imageSrc, setImageSrc] = useState(imageUri);

    const visitIdRef = useRef<string>(nanoid(12));
    const currentGuide = spotGuideIndex < spotGuideList.length ? spotGuideList[spotGuideIndex] : null;
    /**
     * 🎧 現在のガイドの音声を再生する。
     *
     * - すでに再生中であれば再生しない
     * - 音声再生後、終了時に自動でアンロード
     */
    const handlePlayAudio = useCallback(async () => {
        if (isPlaying || !currentGuide?.audioUrl) return;
        setIsPlaying(true);

        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: currentGuide?.audioUrl },
                { shouldPlay: true }
            );
            setSound(newSound);

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (!status.isLoaded) {
                    setIsPlaying(false);
                    newSound.unloadAsync();
                    return;
                }

                if (status.didJustFinish) {
                    setIsPlaying(false);
                    newSound.unloadAsync();

                    // ガイド再生終了時に訪問記録を更新
                    if (user?.id && currentGuide?.id) {
                        supabase
                            .from('spot_visits')
                            .update({ represent_guide_id: currentGuide.id })
                            .eq('id', visitIdRef.current);
                    }
                }
            });

            logFrontendEvent({
                event_name: 'playAudio',
                payload: { spot_id: spot.id },
                error_level: 'info',
            });
        } catch (err: any) {
            setIsPlaying(false);
            logFrontendEvent({
                event_name: 'playAudioFailed',
                error_level: 'error',
                payload: { error: err.message ?? 'Unknown error during audio playback.' },
            });
        }
    }, [currentGuide?.audioUrl, isPlaying, spot.id, user?.id, currentGuide?.id]);

    /**
     * 💖 ガイドに対する「いいね」をトグルする。
     *
     * - Supabase の reactions テーブルを更新
     */
    const handleToggleLike = useCallback(async () => {
        if (!user?.id || !currentGuide?.id) return;

        const guideId = currentGuide.id;
        const willLike = !isLiked;
        setIsLiked(willLike);

        logFrontendEvent({
            event_name: 'toggleLike',
            payload: { guideId, willLike },
            error_level: 'info',
        });

        try {
            if (willLike) {
                const { error } = await supabase.from('reactions').insert({
                    id: nanoid(12),
                    user_id: user.id,
                    target_type: 'spot_guides',
                    target_id: guideId,
                    action_type: 'like',
                    created_at: new Date().toISOString(),
                    created_version: Env.APP_VERSION,
                    lock_no: 0,
                });
                if (error) throw new Error(error.message);
            } else {
                const { error } = await supabase
                    .from('reactions')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('target_type', 'spot_guides')
                    .eq('target_id', guideId)
                    .eq('action_type', 'like');
                if (error) throw new Error(error.message);
            }
        } catch (err: any) {
            logFrontendEvent({
                event_name: 'toggleLikeFailed',
                error_level: 'error',
                payload: {
                    guideId,
                    willLike,
                    error: err.message ?? 'Failed to update like status.',
                },
            });
        }
    }, [currentGuide?.id, isLiked, user?.id]);

    /**
     * 🪄 新しいガイドを生成してリストに追加する。
     *
     * - `generateSpotGuide` Cloud Function を呼び出す
     * - 結果を `spotGuideList` に追加
     */
    const generateSpotGuide = useCallback(async () => {
        try {
            const { spotGuide, audioUrl } = await callCloudFunction<
                GenerateSpotGuideRequest,
                GenerateSpotGuideResponse
            >('generateSpotGuide', { extSpot: convertPrismaToSupabase_ExtSpots(spot), languageTag: locale }, 'v1');

            setSpotGuideList((prev) => [
                ...prev,
                { ...convertSupabaseToPrisma_SpotGuides(spotGuide), audioUrl },
            ]);

            logFrontendEvent({
                event_name: 'generateSpotGuide',
                payload: { spot_guide_id: spotGuide.id },
                error_level: 'info',
            });
        } catch (err: any) {
            logFrontendEvent({
                event_name: 'generateSpotGuideFailed',
                error_level: 'error',
                payload: {
                    error: err.message ?? 'Failed to generate new guide.',
                },
            });
        }
    }, [callCloudFunction, locale, spot]);
    /**
     * ⏭ 現在のガイドを代表として表示し、次のガイドを表示する。
     *
     * - "regenerate" 反応を追加
     * - ガイドの終了時に新しいガイドを生成
     * - `spot_visits.represent_guide_id` を更新
     */
    const handleNextGuideSpot = withLoading(async () => {
        if (!user?.id || !currentGuide?.id) return;

        const currentGuideId = currentGuide.id;

        try {
            supabase.from('reactions').insert({
                id: nanoid(12),
                user_id: user.id,
                target_type: 'spot_guides',
                target_id: currentGuideId,
                action_type: 'regenerate',
                created_at: new Date().toISOString(),
                created_version: Env.APP_VERSION,
                lock_no: 0,
            });

            if (spotGuideList.length === spotGuideIndex + 1) {
                await generateSpotGuide();
            }
            setSpotGuideIndex((prev) => prev + 1);
            handlePlayAudio();

        } catch (err: any) {
            logFrontendEvent({
                event_name: 'nextGuideFailed',
                error_level: 'error',
                payload: { error: err.message ?? 'Failed to move to next guide.' },
            });
        }
    });

    /**
     * 📸 画像読み込み失敗時にフォールバック画像へ切り替える。
     */
    const handleImageError = useCallback(() => {
        const placeholderImage = require('@/assets/images/no_image_logo.png');
        const resolvedAsset = Platform.OS === 'web'
            ? placeholderImage
            : Image.resolveAssetSource(placeholderImage);
        setImageSrc(resolvedAsset.uri);
        logFrontendEvent({
            event_name: 'imageLoadError',
            error_level: 'error',
            payload: {
                spot_id: spot.id,
                failed_url: imageUri,
            },
        });
    }, [imageUri, spot.id]);

    /**
     * 🔄 初期化処理：最初のガイド生成と訪問記録
     */
    useEffect(() => {
        const initialize = async () => {
            if (!user?.id) return;

            const remoteConfig = getRemoteConfig();
            if (!remoteConfig?.v1_spot_visits_max_version_major) return;

            if (spotGuideList.length === 0) {
                await generateSpotGuide();
            }
            handlePlayAudio();

            const { data: previousVisit } = await supabase
                .from('spot_visits')
                .select('id, spot_id, created_at')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            const minutesSinceLastVisit = previousVisit?.created_at
                ? Math.floor((Date.now() - new Date(previousVisit.created_at).getTime()) / 60000)
                : null;

            const visit: SupabaseSpotVisits = {
                id: visitIdRef.current,
                user_id: user.id,
                spot_id: spot.id,
                represent_guide_id: null,
                taken_photo_storage_path: takenPhotoStoragePath ?? null,
                prev_spot_id: previousVisit?.spot_id ?? null,
                time_gap_minutes: minutesSinceLastVisit,
                min_version_major: 1,
                max_version_major: parseInt(remoteConfig.v1_spot_visits_max_version_major),
                created_at: new Date().toISOString(),
                lock_no: 0,
                updated_at: new Date().toISOString(),
            };
            supabase.from('spot_visits').insert(visit);
        };

        withLoading(initialize)();
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageSrc }}
                style={styles.image}
                onError={handleImageError}
                testID="spot-image"
            />
            <Text style={styles.title}>{currentGuide?.title}</Text>
            <Text style={styles.guideText}>
                {currentGuide?.manuscript ?? i18n.t('SpotGuide.generating')}
            </Text>
            <View style={styles.buttonRow}>
                <IconButton
                    icon={isLiked ? 'heart' : 'heart-outline'}
                    onPress={handleToggleLike}
                    disabled={!currentGuide}
                />
                <IconButton
                    icon="volume-high"
                    onPress={handlePlayAudio}
                    disabled={isPlaying || !currentGuide?.audioUrl}
                />
                <IconButton
                    icon="refresh"
                    onPress={handleNextGuideSpot}
                    disabled={isLoading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    guideText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
});
