import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import * as ImagePicker from "expo-image-picker";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

import { useLogger } from "@/hooks/useLogger";
import { useWithLoading } from "@/hooks/useWithLoading";
import { useLocale } from "@/hooks/useLocale";
import i18n from "@/lib/i18n";

import { PlaceGuideCard, PlaceGuide } from "./PlaceGuideCard";
import { HighlightCard, Highlight } from "./HighlightCard";
import { BannerAdView } from "@/components/BannerAdView";
import { PlaceGuideParams } from "@/types/navigation";

const { width } = Dimensions.get("window");

type PlaceData = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function PlaceScreen() {
  const params = useLocalSearchParams<PlaceGuideParams>();
  const router = useRouter();
  const locale = useLocale();
  const { logFrontendEvent } = useLogger();
  const { isLoading, withLoading } = useWithLoading();

  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [placeGuides, setPlaceGuides] = useState<PlaceGuide[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const slides = useMemo(() => {
    if (!placeData) return [] as string[];
    return ["place", ...highlights.map((h) => h.id)];
  }, [placeData, highlights]);

  useEffect(() => {
    withLoading(initialize)();
  }, [params.placeId]);

  const initialize = async () => {
    logFrontendEvent({
      event_name: "PlaceScreenMounted",
      error_level: "info",
      payload: { placeId: params.placeId },
    });
    // Mock API responses
    const place: PlaceData = {
      id: params.placeId,
      name: params.placeName,
      imageUrl: `https://picsum.photos/400/600?random=${Date.now()}`,
    };
    const guides: PlaceGuide[] = [
      {
        id: "initial_guide",
        title: `Welcome to ${params.placeName}`,
        content: "This area has a rich history. Enjoy your visit!",
        category: "general",
      },
    ];
    setPlaceData(place);
    setPlaceGuides(guides);
    setHighlights([]);
  };

  const generatePlaceGuidesFromCategory = async (categoryId: string) => {
    const newGuide: PlaceGuide = {
      id: `${categoryId}_${Date.now()}`,
      title: `${categoryId} Guide`,
      content: `Information about ${categoryId} in ${params.placeName}`,
      category: categoryId,
    };
    setPlaceGuides((prev) => [...prev, newGuide]);
  };

  const generatePlaceGuidesFromQuestion = async (question: string) => {
    const newGuide: PlaceGuide = {
      id: `custom_${Date.now()}`,
      title: question,
      content: `Answer for "${question}" about ${params.placeName}`,
      category: "custom",
    };
    setPlaceGuides((prev) => [...prev, newGuide]);
  };

  const generateHighlightGuidesFromQuestion = async (id: string, question: string) => {
    setHighlights((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              highlightGuides: [
                ...h.highlightGuides,
                {
                  id: `${id}_${Date.now()}`,
                  title: question,
                  content: `Answer for "${question}"`,
                  category: "custom",
                },
              ],
            }
          : h
      )
    );
  };

  const handleCapture = withLoading(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (result.canceled || !result.assets?.[0]) return;

    const manipulated = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 1024 } }],
      { compress: 0.7, format: SaveFormat.JPEG }
    );

    const newHighlight: Highlight = {
      id: `h_${Date.now()}`,
      imageUri: manipulated.uri,
      highlightGuides: [],
    };
    setHighlights((prev) => [...prev, newHighlight]);
    setTimeout(() => {
      carouselRef.current?.scrollTo({ index: highlights.length + 1, animated: true });
    }, 100);
  });

  const handleSnapToItem = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      carouselRef.current?.scrollTo({ index: currentIndex - 1, animated: true });
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      carouselRef.current?.scrollTo({ index: currentIndex + 1, animated: true });
    }
  };

  const renderItem = useCallback(
    ({ index }: { index: number }) => {
      if (!placeData) return null;
      if (index === 0) {
        return (
          <View style={styles.cardContainer}>
            <PlaceGuideCard
              imageUri={placeData.imageUrl}
              guides={placeGuides}
              placeName={placeData.name}
              onCategorySelect={generatePlaceGuidesFromCategory}
              onCustomQuestion={generatePlaceGuidesFromQuestion}
              onBackPress={() => router.back()}
            />
          </View>
        );
      }
      const highlight = highlights[index - 1];
      return (
        <View style={styles.cardContainer}>
          <HighlightCard
            highlight={highlight}
            placeName={placeData.name}
            onCustomQuestion={generateHighlightGuidesFromQuestion}
            onBackPress={() => router.back()}
          />
        </View>
      );
    },
    [placeData, placeGuides, highlights]
  );

  if (!placeData) {
    return (
      <View style={styles.container}>
        <BannerAdView />
        <View style={styles.loadingContainer}>
          <Text variant="bodyLarge">{i18n.t("PlaceGuide.loading")}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BannerAdView />
      <Carousel
        ref={carouselRef}
        loop={false}
        data={slides}
        pagingEnabled
        snapEnabled
        modeConfig={{ parallaxScrollingScale: 0.95, parallaxScrollingOffset: 30 }}
        scrollAnimationDuration={300}
        renderItem={renderItem}
        width={width}
        onSnapToItem={handleSnapToItem}
        containerStyle={styles.carouselContainer}
        mode="parallax"
        testID="place-images-carousel"
      />
      {slides.length > 1 && (
        <>
          {currentIndex > 0 && (
            <IconButton
              icon="chevron-left"
              size={28}
              iconColor="white"
              onPress={handlePrevious}
              style={[styles.navigationArrow, styles.leftArrow]}
              testID="previous-button"
            />
          )}
          {currentIndex < slides.length - 1 && (
            <IconButton
              icon="chevron-right"
              size={28}
              iconColor="white"
              onPress={handleNext}
              style={[styles.navigationArrow, styles.rightArrow]}
              testID="next-button"
            />
          )}
        </>
      )}
      <IconButton
        icon="camera"
        size={44}
        mode="contained"
        containerColor="#fe3764"
        iconColor="white"
        onPress={handleCapture}
        style={styles.cameraButton}
        testID="camera-fab"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  carouselContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  cardContainer: {
    height: "100%",
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  navigationArrow: {
    position: "absolute",
    top: "50%",
    marginTop: -24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 24,
    zIndex: 5,
  },
  leftArrow: { left: 20 },
  rightArrow: { right: 20 },
  cameraButton: {
    position: "absolute",
    bottom: 90,
    right: 30,
    elevation: 12,
    shadowColor: "#fe3764",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    borderRadius: 28,
  },
});
