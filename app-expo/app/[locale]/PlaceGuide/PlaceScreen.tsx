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
import { useSnackbar } from "@/contexts/SnackbarProvider";
import i18n from "@/lib/i18n";
import { useCloudFunction } from "@/hooks/useCloudFunction";

import type {
	GenerateGeneralPlaceGuideRequest,
	GenerateGeneralPlaceGuideResponse,
} from "@shared/api/generateGeneralPlaceGuide.schema";

import { PlaceGuideCard, PlaceGuide } from "./PlaceGuideCard";
import { HighlightCard, Highlight } from "./HighlightCard";
import { CameraScreen } from "./CameraScreen";
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
	const { callCloudFunction } = useCloudFunction();
	const { showSnackbar } = useSnackbar();

	const [placeData, setPlaceData] = useState<PlaceData | null>(null);
	const [placeGuides, setPlaceGuides] = useState<PlaceGuide[]>([]);
	const [highlights, setHighlights] = useState<Highlight[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showCamera, setShowCamera] = useState(false);
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

		try {
			// TODO: listPlaceGuides を呼び出して、既存のガイドを取得する
			// TODO: listPlaceHighlights を呼び出して、既存のハイライトを取得する

			const { guide, audioUrl } = await callCloudFunction<
				GenerateGeneralPlaceGuideRequest,
				GenerateGeneralPlaceGuideResponse
			>(
				"generateGeneralPlaceGuide",
				{
					placeName: params.placeName,
					latitude: parseFloat(params.latitude),
					longitude: parseFloat(params.longitude),
					languageTag: locale,
				},
				"v1",
			);

			const place: PlaceData = {
				id: params.placeId,
				name: params.placeName,
				imageUrl: params.imageUrl,
			};

			const guides: PlaceGuide[] = [
				{
					id: guide.id,
					title: guide.title,
					content: guide.content,
					category: guide.category,
					audioUrl,
				},
			];

			setPlaceData(place);
			setPlaceGuides(guides);
			setHighlights([]);
		} catch (err: any) {
			logFrontendEvent({
				event_name: "generateGeneralPlaceGuideFailed",
				error_level: "error",
				payload: { error: err.message },
			});
		}
	};

	const generatePlaceGuidesFromCategory = async (categoryId: string) => {
		const newGuide: PlaceGuide = {
			id: `${categoryId}_${Date.now()}`,
			title: `${categoryId} Guide`,
			content: `Information about ${categoryId} in ${params.placeName}`,
			category: categoryId,
			audioUrl: "",
		};
		setPlaceGuides((prev) => [...prev, newGuide]);
	};

	const generatePlaceGuidesFromQuestion = async (question: string) => {
		const newGuide: PlaceGuide = {
			id: `custom_${Date.now()}`,
			title: question,
			content: `Answer for "${question}" about ${params.placeName}`,
			category: "custom",
			audioUrl: "",
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
									audioUrl: "",
								},
							],
						}
					: h,
			),
		);
	};

	/**
	 * 📸 カメラ画面からの撮影完了処理
	 *
	 * 撮影された画像を新しいハイライトとして追加し、
	 * カルーセルを新しいハイライトに移動する
	 */
	const handleCameraCapture = useCallback(
		async (imageUri: string) => {
			try {
				logFrontendEvent({
					event_name: "placeCameraCapture",
					error_level: "info",
					payload: { placeId: params.placeId },
				});

				// 新しいハイライトを作成
				const newHighlight: Highlight = {
					id: `highlight_${Date.now()}`,
					imageUri,
					highlightGuides: [
						{
							id: `guide_${Date.now()}`,
							title: "Photo Analysis",
							content: `This is an analysis of your captured photo at ${params.placeName}. The AI has identified interesting elements and can provide detailed information about what's visible in the image.`,
							category: "photo_analysis",
							audioUrl: "",
						},
					],
				};

				// ハイライトリストに追加
				setHighlights((prev) => [...prev, newHighlight]);

				// カメラ画面を閉じる
				setShowCamera(false);

				// 新しいハイライトにカルーセルを移動（少し遅延を入れて確実に移動）
				setTimeout(() => {
					const newIndex = highlights.length + 1; // place + existing highlights + new highlight
					carouselRef.current?.scrollTo({ index: newIndex, animated: true });
				}, 100);

				// 成功メッセージを表示
				showSnackbar(i18n.t("PlaceGuide.photoAdded"));

				logFrontendEvent({
					event_name: "placeCameraCaptureSuccess",
					error_level: "info",
					payload: {
						placeId: params.placeId,
						highlightId: newHighlight.id,
						totalHighlights: highlights.length + 1,
					},
				});
			} catch (error: any) {
				logFrontendEvent({
					event_name: "placeCameraCaptureFailed",
					error_level: "error",
					payload: {
						error: error.message,
						placeId: params.placeId,
					},
				});
				showSnackbar(i18n.t("PlaceGuide.captureError"));
			}
		},
		[params.placeId, params.placeName, highlights.length, showSnackbar],
	);

	/**
	 * 📷 カメラボタン押下処理
	 *
	 * カメラ画面を表示する
	 */
	const handleCameraPress = useCallback(() => {
		setShowCamera(true);
		logFrontendEvent({
			event_name: "placeCameraButtonPressed",
			error_level: "info",
			payload: { placeId: params.placeId },
		});
	}, [params.placeId]);

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
			if (!placeData) {
				return <View />;
			}
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
						onCustomQuestion={generateHighlightGuidesFromQuestion}
						onBackPress={() => router.back()}
					/>
				</View>
			);
		},
		[placeData, placeGuides, highlights],
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
				onPress={handleCameraPress}
				style={styles.cameraButton}
				testID="camera-fab"
			/>

			{/* 📸 カメラ画面 */}
			<CameraScreen visible={showCamera} onClose={() => setShowCamera(false)} onCapture={handleCameraCapture} />
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
