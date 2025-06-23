import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IconButton, Text } from "react-native-paper";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { useLogger } from "@/hooks/useLogger";
import { useLocale } from "@/hooks/useLocale";
import { useWithLoading } from "@/hooks/useWithLoading";
import { useSnackbar } from "@/contexts/SnackbarProvider";
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
	const { showSnackbar } = useSnackbar();

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
						content: "This is a beautiful location with rich history and culture. Explore the area to discover hidden gems and local attractions.",
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
			showSnackbar(i18n.t("PlaceGuide.loadError"));
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
					content: "This is an analysis of your captured photo. The AI has identified interesting elements and can provide detailed information about what's visible in the image.",
					category: "photo_analysis",
				},
			],
		};

		setPlaceImages(prev => [...prev, newImage]);
		
		// Navigate to the new image
		setTimeout(() => {
			carouselRef.current?.scrollTo({ index: placeImages.length, animated: true });
		}, 100);

		logFrontendEvent({
			event_name: "placeGuideCameraPressed",
			error_level: "info",
			payload: { imageId: newImage.id },
		});

		showSnackbar(i18n.t("PlaceGuide.photoAdded"));
	}, [placeImages.length, logFrontendEvent, showSnackbar]);

	const updatePlaceImage = useCallback((imageId: string, updates: Partial<PlaceImage>) => {
		setPlaceImages(prev => 
			prev.map(image => 
				image.id === imageId ? { ...image, ...updates } : image
			)
		);
	}, []);

	const handleSnapToItem = useCallback((index: number) => {
		setCurrentIndex(index);
	}, []);

	const handleBackPress = useCallback(() => {
		router.back();
	}, [router]);

	const renderItem = useCallback(
		({ item, index }: { item: PlaceImage; index: number }) => (
			<View style={styles.cardContainer}>
				<PlaceGuideCard
					placeImage={item}
					placeName={params.placeName}
					onUpdate={(updates) => updatePlaceImage(item.id, updates)}
				/>
			</View>
		),
		[params.placeName, updatePlaceImage],
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

			{/* Header */}
			<View style={styles.header}>
				<IconButton
					icon="arrow-left"
					size={24}
					onPress={handleBackPress}
					style={styles.backButton}
					testID="back-button"
				/>
				<Text variant="headlineSmall" style={styles.placeName} numberOfLines={1}>
					{params.placeName}
				</Text>
				<View style={styles.headerSpacer} />
			</View>

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

			{/* Camera Button */}
			<IconButton
				icon="camera"
				size={28}
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
						<View
							key={index}
							style={[
								styles.dot,
								index === currentIndex ? styles.activeDot : styles.inactiveDot,
							]}
						/>
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
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 4,
		paddingVertical: 12,
		backgroundColor: "white",
		borderBottomWidth: 0.5,
		borderBottomColor: "#e8e8e8",
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
		...Platform.select({
			ios: {
				paddingTop: 56,
			},
			android: {
				paddingTop: 24,
			},
		}),
	},
	backButton: {
		margin: 0,
		marginLeft: 4,
	},
	placeName: {
		flex: 1,
		textAlign: "center",
		fontWeight: "700",
		marginHorizontal: 16,
		color: "#1a1a1a",
	},
	headerSpacer: {
		width: 48,
	},
	carouselContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	cardContainer: {
		height: "100%",
		borderRadius: 0,
		alignItems: "center",
		backgroundColor: "#fff",
	},
	cameraButton: {
		position: "absolute",
		bottom: 120,
		right: 20,
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
		backgroundColor: "rgba(0, 0, 0, 0.2)",
	},
});