import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IconButton, Text } from "react-native-paper";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { useLogger } from "@/hooks/useLogger";
import { useLocale } from "@/hooks/useLocale";
import { useWithLoading } from "@/hooks/useWithLoading";
import i18n from "@/lib/i18n";

import { PlaceGuideCard } from "./PlaceGuideCard";
import { BannerAdView } from "@/components/BannerAdView";

const { width, height } = Dimensions.get("window");

type PlaceGuideParams = {
	placeId: string;
	placeName: string;
	latitude?: string;
	longitude?: string;
};

type PlaceGuide = {
	id: string;
	title: string;
	content: string;
	category: string;
};

type PlaceImage = {
	id: string;
	imageUri: string;
	guides: PlaceGuide[];
	isInitial: boolean;
};

export default function PlaceGuideScreen() {
	const params = useLocalSearchParams<PlaceGuideParams>();
	const router = useRouter();
	const locale = useLocale();
	const { logFrontendEvent } = useLogger();
	const { isLoading, withLoading } = useWithLoading();

	const [placeImages, setPlaceImages] = useState<PlaceImage[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef<ICarouselInstance>(null);

	useEffect(() => {
		logFrontendEvent({
			event_name: "PlaceGuideMounted",
			error_level: "info",
			payload: { placeId: params.placeId, placeName: params.placeName },
		});

		// Initialize with place image and initial guide
		initializePlaceGuide();
	}, [params.placeId]);

	const initializePlaceGuide = withLoading(async () => {
		try {
			// Mock initial place image and guide
			const initialImage: PlaceImage = {
				id: "initial",
				imageUri: `https://picsum.photos/400/600?random=${Date.now()}`,
				isInitial: true,
				guides: [
					{
						id: "initial_guide",
						title: `Welcome to ${params.placeName}`,
						content:
							"This is a beautiful location with rich history and culture. Explore the area to discover hidden gems and local attractions.",
						category: "general",
					},
				],
			};

			setPlaceImages([initialImage]);
		} catch (error: any) {
			logFrontendEvent({
				event_name: "initializePlaceGuideFailed",
				error_level: "error",
				payload: { error: error.message },
			});
		}
	});

	const handleCameraPress = useCallback(() => {
		// Mock photo capture - replace with actual camera implementation
		const mockImageUri = `https://picsum.photos/400/600?random=${Date.now()}`;

		const newImage: PlaceImage = {
			id: `photo_${Date.now()}`,
			imageUri: mockImageUri,
			isInitial: false,
			guides: [
				{
					id: `guide_${Date.now()}`,
					title: "Photo Analysis",
					content:
						"This is an analysis of your captured photo. The AI has identified interesting elements and can provide detailed information about what's visible in the image.",
					category: "photo_analysis",
				},
			],
		};

		setPlaceImages((prev) => [...prev, newImage]);

		// Navigate to the new image
		setTimeout(() => {
			carouselRef.current?.scrollTo({ index: placeImages.length, animated: true });
		}, 100);

		logFrontendEvent({
			event_name: "placeGuideCameraPressed",
			error_level: "info",
			payload: { imageId: newImage.id },
		});
	}, [placeImages.length, logFrontendEvent]);

	const updatePlaceImage = useCallback((imageId: string, updates: Partial<PlaceImage>) => {
		setPlaceImages((prev) => prev.map((image) => (image.id === imageId ? { ...image, ...updates } : image)));
	}, []);

	const handleSnapToItem = useCallback((index: number) => {
		setCurrentIndex(index);
	}, []);

	const handlePrevious = useCallback(() => {
		if (currentIndex > 0) {
			carouselRef.current?.scrollTo({ index: currentIndex - 1, animated: true });
		}
	}, [currentIndex]);

	const handleNext = useCallback(() => {
		if (currentIndex < placeImages.length - 1) {
			carouselRef.current?.scrollTo({ index: currentIndex + 1, animated: true });
		}
	}, [currentIndex, placeImages.length]);

	const renderItem = useCallback(
		({ item, index }: { item: PlaceImage; index: number }) => (
			<View style={styles.cardContainer}>
				<PlaceGuideCard
					placeImage={item}
					placeName={params.placeName}
					onUpdate={(updates) => updatePlaceImage(item.id, updates)}
					onBackPress={() => router.back()}
				/>
			</View>
		),
		[params.placeName, updatePlaceImage, router],
	);

	if (placeImages.length === 0) {
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
			{/* Banner Ad */}
			<BannerAdView />

			{/* Image Carousel */}
			<Carousel
				ref={carouselRef}
				loop={false}
				data={placeImages}
				pagingEnabled={true}
				snapEnabled={true}
				modeConfig={{
					parallaxScrollingScale: 0.95,
					parallaxScrollingOffset: 30,
				}}
				scrollAnimationDuration={300}
				renderItem={renderItem}
				width={width}
				onSnapToItem={handleSnapToItem}
				containerStyle={styles.carouselContainer}
				mode="parallax"
				testID="place-images-carousel"
			/>

			{/* Navigation Arrows */}
			{placeImages.length > 1 && (
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
					{currentIndex < placeImages.length - 1 && (
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

			{/* Camera Button */}
			<IconButton
				icon="camera"
				size={44}
				mode="contained"
				containerColor="#fe3764"
				iconColor="white"
				onPress={handleCameraPress}
				style={styles.cameraButton}
				testID="camera-fab"
			/>

			{/* Page Indicator */}
			{placeImages.length > 1 && (
				<View style={styles.pageIndicator}>
					{placeImages.map((_, index) => (
						<View key={index} style={[styles.dot, index === currentIndex ? styles.activeDot : styles.inactiveDot]} />
					))}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fafafa",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	carouselContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
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
	leftArrow: {
		left: 20,
	},
	rightArrow: {
		right: 20,
	},
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
	pageIndicator: {
		position: "absolute",
		bottom: 24,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 6,
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3,
	},
	activeDot: {
		backgroundColor: "#fe3764",
		width: 20,
		borderRadius: 3,
	},
	inactiveDot: {
		backgroundColor: "rgba(255, 255, 255, 0.6)",
	},
});
