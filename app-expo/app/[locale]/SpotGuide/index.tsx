import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, Share, StyleSheet, ActivityIndicator, Image, Platform, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { IconButton, Text } from 'react-native-paper';

import SpotGuideCard from './SpotGuideCard';
import SpotRecommendCard from './SpotRecommendCard';

import { useLogger } from '@/hooks/useLogger';
import { useWithLoading } from '@/hooks/useWithLoading';
import { useCloudFunction } from '@/hooks/useCloudFunction';
import { useLocale } from '@/hooks/useLocale';

import type { ListRecommendedSpotsByVisitHistoryRequest, ListRecommendedSpotsByVisitHistoryResponse } from "@shared/api/listRecommendedSpotsByVisitHistory.schema";
import type { ListSpotGuidesRequest, ListSpotGuidesResponse } from "@shared/api/listSpotGuides.schema";
import { SpotGuideParams, SpotGuideSerializedParams } from '@/types/navigation';
import { deserializeSpotGuideParams } from '@/utils/navigation';
import i18n from '@/lib/i18n';
import { convertSupabaseToPrisma_ExtSpots, PrismaExtSpots } from '@shared/converters/convert_ext_spots';
import { convertSupabaseToPrisma_SpotGuides, PrismaSpotGuides } from '@shared/converters/convert_spot_guides';
import { useSafeInterstitialAd } from '@/hooks/useSafeInterstitialAd';

const { width, height } = Dimensions.get('window');

/**
 * 📍 SpotGuideScreen
 *
 * - 撮影画像と認識スポット情報を元にガイドやリコメンドを表示
 * - スワイプで複数スポットを切り替え可能（右スワイプで広告表示）
 * - シェアや戻るなどの補助操作も可能
 */
export default function SpotGuideScreen() {
  const router = useRouter();
  const { logFrontendEvent } = useLogger();
  const { isLoading, withLoading } = useWithLoading();
  const { callCloudFunction } = useCloudFunction();
  const locale = useLocale();
  const serializedParams = useLocalSearchParams<SpotGuideSerializedParams>();
  const { extSpots, imageUri, takenPhotoStoragePath }: SpotGuideParams =
    useMemo(() => deserializeSpotGuideParams(serializedParams), [serializedParams]);
  const { show, isLoaded } = useSafeInterstitialAd();

  const [spotGuides, setSpotGuides] = useState<(PrismaSpotGuides & { audioUrl: string })[]>([]);
  const [recommendedSpots, setRecommendedSpots] = useState<PrismaExtSpots[]>([]);
  const [lastAdShownIndex, setLastAdShownIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const carouselItems = useMemo(() => [extSpots, ...recommendedSpots], [extSpots, recommendedSpots]);

  useEffect(() => {
    if (!extSpots) {
      router.replace(`/${locale}/SpotCapture`);
      return;
    }
    let mounted = true;

    withLoading(async () => {
      if (!mounted) return;

      try {
        logFrontendEvent({
          event_name: 'SpotGuideMounted',
          error_level: 'info',
          payload: { extSpots, imageUri, takenPhotoStoragePath },
        });

        const guides = await callCloudFunction<
          ListSpotGuidesRequest,
          ListSpotGuidesResponse
        >('listSpotGuides', { spotId: extSpots.id, languageTag: locale }, 'v1');
        setSpotGuides(guides.spotGuides.map(spotGuide => ({
          ...convertSupabaseToPrisma_SpotGuides(spotGuide),
          audioUrl: spotGuide.audioUrl,
        })));

        const recommends = await callCloudFunction<
          ListRecommendedSpotsByVisitHistoryRequest,
          ListRecommendedSpotsByVisitHistoryResponse
        >('listRecommendedSpotsByVisitHistory', { spotId: extSpots.id }, 'v1');
        setRecommendedSpots(recommends.extSpots.map(convertSupabaseToPrisma_ExtSpots));
      } catch (error: any) {
        logFrontendEvent({
          event_name: 'SpotGuideLoadFailed',
          error_level: 'error',
          payload: { message: error.message },
        });
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const maybeShowAd = useCallback(
    async (index: number) => {
      if (index % 5 === 0 && lastAdShownIndex !== index && isLoaded) {
        try {
          show();
          setLastAdShownIndex(index);

          logFrontendEvent({
            event_name: 'showInterstitialAd',
            error_level: 'info',
            payload: { index },
          });
        } catch (err: any) {
          logFrontendEvent({
            event_name: 'adShowFailed',
            error_level: 'warn',
            payload: { error: err.message },
          });
        }
      }
    },
    [lastAdShownIndex]
  );

  const handleSnapToItem = useCallback((index: number) => {
    setCurrentIndex(index);
    maybeShowAd(index);
  }, [maybeShowAd]);

  const handleReturnToCamera = () => {
    router.replace(`/${locale}/SpotCapture`);
    logFrontendEvent({
      event_name: 'returnToCamera',
      error_level: 'info',
      payload: {},
    });
  };

  const displayImageUri = useMemo(() => {
    const placeholderImage = require('@/assets/images/no_image_logo.png');
    const resolvedAsset = Platform.OS === 'web'
      ? placeholderImage
      : Image.resolveAssetSource(placeholderImage);
    return imageUri
      ?? extSpots?.image_url
      ?? resolvedAsset.uri;
  }, [imageUri, extSpots?.image_url]);

  const handleShareInstagram = async () => {
    if (!imageUri) return;
    try {
      await Share.share({
        url: imageUri,
        message: i18n.t('SpotGuide.shareMessage'),
      });

      logFrontendEvent({
        event_name: 'shareInstagram',
        error_level: 'info',
        payload: { imageUri },
      });
    } catch (error: any) {
      logFrontendEvent({
        event_name: 'shareInstagramFailed',
        error_level: 'error',
        payload: { message: error.message },
      });
    }
  };

  const renderItem = useCallback(
    ({ index }: { index: number }) => {
      if (!extSpots) return <></>;
      const recommendedSpot = recommendedSpots[index - 1];
      return (
        <View style={styles.cardContainer}>
          {index === 0 ? (
            <SpotGuideCard
              spot={extSpots}
              initialGuides={spotGuides}
              imageUri={displayImageUri}
              takenPhotoStoragePath={takenPhotoStoragePath}
            />
          ) : (
            <SpotRecommendCard spot={recommendedSpot} />
          )}
        </View>
      );
    },
    [spotGuides, recommendedSpots, displayImageUri]
  );

  const renderControlButton = (icon: string, onPress: (() => void) | undefined, testID: string, rotation = '0deg') => (
    <IconButton
      icon={icon}
      size={32}
      mode="contained-tonal"
      containerColor="rgba(255,255,255,0.85)"
      style={{ ...styles.iconButton, transform: [{ rotate: rotation }] }}
      onPress={onPress}
      testID={testID}
    />
  );

  if (!extSpots || isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      {/* 🔺 広告エリア */}
      <View style={styles.adArea}>
        <Text style={styles.adText}>広告エリア</Text>
      </View>

      {/* 🎯 スポットカード Carousel */}
      <Carousel
        ref={carouselRef}
        loop={false}
        data={carouselItems}
        pagingEnabled={true}
        snapEnabled={true}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        scrollAnimationDuration={300}
        renderItem={renderItem}
        width={width}
        onSnapToItem={handleSnapToItem}
        containerStyle={styles.carouselContainer}
        mode="parallax"
      />

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          {renderControlButton('refresh', handleReturnToCamera, 'back-to-camera-button', '270deg')}
        </View>
        <View style={styles.button}>
          {currentIndex > 0 && renderControlButton('chevron-left', () => carouselRef.current?.prev(), 'left-button')}
        </View>
        <View style={styles.button}>
          {currentIndex < carouselItems.length - 1 && renderControlButton('chevron-right', () => carouselRef.current?.next(), 'right-button')}
        </View>
        <View style={styles.button}>
          {imageUri && renderControlButton('share-variant', handleShareInstagram, 'share-instagram-button')}
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  adArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  adText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  carouselContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    width,
  },
  cardContainer: {
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 18,
  },
  iconButton: {
    borderRadius: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: 'white',
  },
  button: {
    width: 60,
  },
});