import React, { useState, useCallback } from 'react';
import { Image, StyleSheet, Platform, ImageBackground } from 'react-native';
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
const SpotRecommendCard = React.memo(function SpotRecommendCard({
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
        <ImageBackground
            source={{ uri: imageSrc }}
            style={styles.image}
            imageStyle={{ borderRadius: 10 }}
            resizeMode="cover"
            onError={handleImageError}
            testID="recommend-image"
        >
            <Button
                mode="contained"
                onPress={handlePress}
                style={styles.button}
                contentStyle={styles.buttonContent}
                buttonColor="white"
                textColor="rgba(0,0,0,0.6)"
                labelStyle={styles.buttonLabel}
                testID="recommend-button"
            >
                {i18n.t('SpotRecommend.nanicore')}
            </Button>
        </ImageBackground>
    );
});

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
    },
    buttonContent: {
    },
    button: {
        marginBottom: 60,
        marginHorizontal: 32,
        borderRadius: 50,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOpacity: 0.95,
        shadowRadius: 30,
        shadowOffset: { width: 0, height: 0 },
    },
    buttonLabel: {
        fontSize: 32,
        lineHeight: 48,
    },
});

export default SpotRecommendCard;