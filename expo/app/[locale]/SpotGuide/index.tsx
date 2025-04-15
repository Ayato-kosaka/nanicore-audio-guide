import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, ActivityIndicator, Share, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { IconButton } from 'react-native-paper';
import { AdMobInterstitial } from 'expo-ads-admob';

import { SpotGuideCard } from './SpotGuideCard';
import { SpotRecommendCard } from './SpotRecommendCard';

import { useLogger } from '@/hooks/useLogger';
import { useWithLoading } from '@/hooks/useWithLoading';
import { useCloudFunction } from '@/hooks/useCloudFunction';
import { useLocale } from '@/hooks/useLocale';

import type { ListRecommendedSpotsByVisitHistoryRequest, ListRecommendedSpotsByVisitHistoryResponse } from "@shared/api/listRecommendedSpotsByVisitHistory.schema";
import type { ListSpotGuidesRequest, ListSpotGuidesResponse } from "@shared/api/listSpotGuides.schema";
import { SpotGuideParams, SpotGuideSerializedParams } from '@/types/navigation';
import { deserializeSpotGuideParams } from '@/utils/navigation';
import i18n from '@/lib/i18n';
import { getAdMobInterstitialUnitId } from '@/constants/AdMob';
import { convertSupabaseToPrisma_ExtSpots, PrismaExtSpots } from '@shared/converters/convert_ext_spots';
import { convertSupabaseToPrisma_SpotGuides, PrismaSpotGuides } from '@shared/converters/convert_spot_guides';
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
  const { extSpots, imageUri, takenPhotoStoragePath }: SpotGuideParams = deserializeSpotGuideParams(serializedParams);

  const [spotGuides, setSpotGuides] = useState<(PrismaSpotGuides & { audioUrl: string })[]>([]);
  const [recommendedSpots, setRecommendedSpots] = useState<PrismaExtSpots[]>([]);
  const [lastAdShownIndex, setLastAdShownIndex] = useState<number | null>(null);
  const carouselRef = useRef<ICarouselInstance>(null);

  const displayImageUri = imageUri ?? extSpots.image_url;
  const carouselItems = useMemo(() => [extSpots, ...recommendedSpots], [extSpots, recommendedSpots]);
  const currentIndex = carouselRef.current?.getCurrentIndex?.() ?? 0;

  useEffect(() => {
    if (!extSpots) {
      router.replace('/SpotCapture');
      return;
    }

    logFrontendEvent({
      event_name: 'SpotGuideMounted',
      error_level: 'info',
      payload: { serializedParams },
    });
  }, [extSpots]);

  useEffect(() => {
    if (!extSpots) return;

    withLoading(async () => {
      try {
        const guides = await callCloudFunction<
          ListSpotGuidesRequest,
          ListSpotGuidesResponse
        >('listSpotGuides', { spotId: extSpots.id, languageTag: locale }, 'v1');
        setSpotGuides(guides.spotGuides.map(spotGuide => ({
          ...convertSupabaseToPrisma_SpotGuides(spotGuide),
          audioUrl: spotGuide.audio_storage_path,
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
  }, [extSpots, locale]);

  const maybeShowAd = useCallback(
    async (index: number) => {
      if (index % 5 === 0 && lastAdShownIndex !== index) {
        try {
          await AdMobInterstitial.setAdUnitID(getAdMobInterstitialUnitId());
          await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
          await AdMobInterstitial.showAdAsync();
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

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      carouselRef.current?.scrollTo({ index: prevIndex });
    }
  };

  const handleForward = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < carouselItems.length) {
      maybeShowAd(nextIndex);
      carouselRef.current?.scrollTo({ index: nextIndex });
    }
  };

  const handleReturnToCamera = () => {
    router.replace('/SpotCapture');
    logFrontendEvent({
      event_name: 'returnToCamera',
      error_level: 'info',
      payload: {},
    });
  };

  const handleShareInstagram = async () => {
    try {
      await Share.share({
        url: displayImageUri,
        message: i18n.t('SpotGuide.shareMessage'),
      });

      logFrontendEvent({
        event_name: 'shareInstagram',
        error_level: 'info',
        payload: { imageUri: displayImageUri },
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
      if (index === 0) {
        return (
          <SpotGuideCard
            spot={extSpots}
            initialGuides={spotGuides}
            imageUri={displayImageUri}
            takenPhotoStoragePath={takenPhotoStoragePath}
          />
        );
      }
      const recommendedSpot = recommendedSpots[index - 1];
      return <SpotRecommendCard spot={recommendedSpot} />;
    },
    [spotGuides, recommendedSpots, displayImageUri]
  );

  if (!extSpots || isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={carouselRef}
        loop={false}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height}
        data={carouselItems}
        scrollAnimationDuration={300}
        renderItem={renderItem}
        onSnapToItem={maybeShowAd}
        mode="parallax"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        <IconButton icon="arrow-left" onPress={handleReturnToCamera} testID="back-to-camera" />
        <IconButton icon="share-variant" onPress={handleShareInstagram} testID="share-button" />
        {currentIndex > 0 && (
          <IconButton icon="chevron-left" onPress={handleBack} testID="carousel-back" />
        )}
        {currentIndex < carouselItems.length - 1 && (
          <IconButton icon="chevron-right" onPress={handleForward} testID="carousel-forward" />
        )}
      </View>
    </View>
  );
}
