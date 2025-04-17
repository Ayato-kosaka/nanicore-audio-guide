import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useLogger } from '@/hooks/useLogger';
import i18n from '@/lib/i18n';
import { PrismaExtSpots } from '@shared/converters/convert_ext_spots';
import { serializeSpotGuideParams } from '@/utils/navigation';
import { useLocale } from '@/hooks/useLocale';

/**
 * 📍 SpotRecommendCard
 *
 * おすすめスポットの画像と「なにこれ？」ボタンを表示するカードUI。
 * - 画像ロード失敗時にはローカル画像にフォールバック
 * - ボタン押下で SpotGuide 画面へ遷移（パラメータ付き）
 *
 * @param {PrismaExtSpots} spot - 表示対象のスポットデータ
 * @returns {JSX.Element} 推薦スポットの表示コンポーネント
 */
export const SpotRecommendCard = React.memo(function SpotRecommendCard({
    spot,
}: {
    spot: PrismaExtSpots;
}) {
    const router = useRouter();
    const { logFrontendEvent } = useLogger();
    // レコメンド対象のスポットは必ず画像URLが存在する
    const [imageSrc, setImageSrc] = useState(spot.image_url!);
    const locale = useLocale();

    /**
     * 📸 画像読み込み失敗時にローカル画像へフォールバック。
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
            payload: { spot_id: spot.id, failed_url: spot.image_url },
        });
    }, [spot.id, spot.image_url]);

    /**
     * 🧭 ボタン押下でスポットガイド画面へ遷移する。
     */
    const handlePress = useCallback(() => {
        router.push({
            pathname: '/[locale]/SpotGuide',
            params: {
                ...serializeSpotGuideParams({
                    extSpots: spot,
                    imageUri: spot.image_url!,
                    takenPhotoStoragePath: null,
                }),
                locale,
            },
        });
    }, [router, spot, locale]);

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageSrc }}
                style={styles.image}
                onError={handleImageError}
                testID="recommend-image"
            />
            <Button
                mode="contained"
                onPress={handlePress}
                style={styles.button}
                testID="recommend-button"
            >
                {i18n.t('SpotRecommend.nanicore')}
            </Button>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    button: {
        alignSelf: 'center',
    },
});
