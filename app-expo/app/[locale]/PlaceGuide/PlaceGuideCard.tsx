import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, ImageBackground, ScrollView, Platform } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { useLogger } from "@/hooks/useLogger";
import { useWithLoading } from "@/hooks/useWithLoading";
import i18n from "@/lib/i18n";

import { GuideSection } from "./GuideSection";
import { CustomQueryModal } from "./CustomQueryModal";

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

type PlaceGuideCardProps = {
	placeImage: PlaceImage;
	placeName: string;
	onUpdate: (updates: Partial<PlaceImage>) => void;
	onBackPress: () => void;
};

const GUIDE_CATEGORIES = [
	{ id: "history", label: "History", icon: "book-open-outline" },
	{ id: "culture", label: "Culture", icon: "palette-outline" },
	{ id: "food", label: "Food", icon: "food-outline" },
	{ id: "architecture", label: "Architecture", icon: "home-city-outline" },
	{ id: "nature", label: "Nature", icon: "leaf-outline" },
	{ id: "people", label: "People", icon: "account-group-outline" },
	{ id: "cost", label: "Cost", icon: "currency-usd" },
	{ id: "safety", label: "Safety", icon: "shield-check-outline" },
];

export const PlaceGuideCard: React.FC<PlaceGuideCardProps> = ({ 
	placeImage, 
	placeName, 
	onUpdate, 
	onBackPress 
}) => {
	const { logFrontendEvent } = useLogger();
	const { isLoading, withLoading } = useWithLoading();

	const [availableCategories, setAvailableCategories] = useState(GUIDE_CATEGORIES);
	const [showCustomModal, setShowCustomModal] = useState(false);
	const guidesScrollViewRef = useRef<ScrollView>(null);

	// Auto-scroll to bottom when new guides are added
	useEffect(() => {
		if (placeImage.guides.length > 1) {
			setTimeout(() => {
				guidesScrollViewRef.current?.scrollToEnd({ animated: true });
			}, 300);
		}
	}, [placeImage.guides.length]);

	const handleCategoryPress = useCallback(
		withLoading(async (categoryId: string) => {
			const category = availableCategories.find((c) => c.id === categoryId);
			if (!category) return;

			try {
				// Mock guide generation based on category
				const newGuide: PlaceGuide = {
					id: `${placeImage.id}_${categoryId}_${Date.now()}`,
					title: `${category.label} Guide`,
					content: `Detailed information about ${category.label.toLowerCase()} in ${placeName}. This guide provides comprehensive insights and local knowledge about this specific aspect of the location.`,
					category: categoryId,
				};

				const updatedGuides = [...placeImage.guides, newGuide];
				onUpdate({ guides: updatedGuides });

				// Remove the used category
				setAvailableCategories((prev) => prev.filter((c) => c.id !== categoryId));

				logFrontendEvent({
					event_name: "placeGuideCategoryPressed",
					error_level: "info",
					payload: { categoryId, placeImageId: placeImage.id },
				});
			} catch (error: any) {
				logFrontendEvent({
					event_name: "generatePlaceGuideFromCategoryFailed",
					error_level: "error",
					payload: { error: error.message, categoryId },
				});
			}
		}),
		[availableCategories, placeImage, placeName, onUpdate, logFrontendEvent],
	);

	const handleCustomQuery = useCallback(
		withLoading(async (query: string) => {
			if (!query.trim()) return;

			try {
				// Mock guide generation based on custom query
				const newGuide: PlaceGuide = {
					id: `${placeImage.id}_custom_${Date.now()}`,
					title: "Custom Guide",
					content: `Information about "${query}" in ${placeName}. This custom guide addresses your specific inquiry with detailed insights and relevant information.`,
					category: "custom",
				};

				const updatedGuides = [...placeImage.guides, newGuide];
				onUpdate({ guides: updatedGuides });

				logFrontendEvent({
					event_name: "placeGuideCustomQuery",
					error_level: "info",
					payload: { query, placeImageId: placeImage.id },
				});

				setShowCustomModal(false);
			} catch (error: any) {
				logFrontendEvent({
					event_name: "generatePlaceGuideFromQueryFailed",
					error_level: "error",
					payload: { error: error.message, query },
				});
			}
		}),
		[placeImage, placeName, onUpdate, logFrontendEvent],
	);

	const handleImageError = useCallback(() => {
		logFrontendEvent({
			event_name: "placeImageLoadError",
			error_level: "error",
			payload: { placeImageId: placeImage.id, imageUri: placeImage.imageUri },
		});
	}, [placeImage.id, placeImage.imageUri, logFrontendEvent]);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={{ uri: placeImage.imageUri }}
				style={styles.imageBackground}
				resizeMode="cover"
				onError={handleImageError}
				testID={`place-image-${placeImage.id}`}>
				
				{/* Header Overlay - Inside each card */}
				<View style={styles.headerOverlay}>
					<Text variant="titleMedium" style={styles.placeName} numberOfLines={1}>
						{placeName}
					</Text>
					<IconButton
						icon="close"
						size={20}
						iconColor="white"
						onPress={onBackPress}
						style={styles.closeButton}
						testID="close-button"
					/>
				</View>

				{/* Guide Content */}
				<LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"]} style={styles.contentOverlay}>
					<ScrollView
						ref={guidesScrollViewRef}
						style={styles.guidesScrollView}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.guidesContent}>
						{placeImage.guides.map((guide, index) => (
							<GuideSection key={guide.id} guide={guide} isFirst={index === 0} />
						))}
					</ScrollView>

					{/* Question Field - Below guide content */}
					<View style={styles.questionField}>
						<View style={styles.questionActions}>
							<View style={styles.categoryButtonsContainer}>
								{availableCategories.slice(0, 4).map((category) => (
									<View key={category.id} style={styles.categoryButtonWrapper}>
										<IconButton
											icon={category.icon}
											size={20}
											iconColor="white"
											onPress={() => handleCategoryPress(category.id)}
											style={styles.categoryButton}
											disabled={isLoading}
											testID={`category-button-${category.id}`}
										/>
										<Text style={styles.categoryLabel}>{category.label}</Text>
									</View>
								))}
							</View>
							<View style={styles.customQueryButtonWrapper}>
								<IconButton
									icon="message-text-outline"
									size={20}
									iconColor="white"
									onPress={() => setShowCustomModal(true)}
									style={styles.customQueryButton}
									testID="custom-query-button"
								/>
								<Text style={styles.categoryLabel}>Custom</Text>
							</View>
						</View>
					</View>
				</LinearGradient>
			</ImageBackground>

			{/* Custom Query Modal */}
			<CustomQueryModal
				visible={showCustomModal}
				onDismiss={() => setShowCustomModal(false)}
				onSubmit={handleCustomQuery}
				loading={isLoading}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	imageBackground: {
		flex: 1,
		justifyContent: "flex-end",
	},
	headerOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 12,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		zIndex: 10,
		...Platform.select({
			ios: {
				paddingTop: 56,
			},
			android: {
				paddingTop: 44,
			},
		}),
	},
	placeName: {
		flex: 1,
		color: "white",
		fontWeight: "500",
		fontSize: 16,
		textShadowColor: "rgba(0, 0, 0, 0.8)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	closeButton: {
		margin: 0,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 20,
	},
	contentOverlay: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 20,
		paddingBottom: 24,
		paddingTop: 120,
	},
	guidesScrollView: {
		maxHeight: "50%",
	},
	guidesContent: {
		gap: 16,
		paddingBottom: 20,
	},
	questionField: {
		marginTop: 16,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: "rgba(255, 255, 255, 0.2)",
	},
	questionActions: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 16,
	},
	categoryButtonsContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	categoryButtonWrapper: {
		alignItems: "center",
		minWidth: 60,
	},
	categoryButton: {
		margin: 0,
		backgroundColor: "rgba(255, 255, 255, 0.15)",
		borderRadius: 20,
		width: 40,
		height: 40,
	},
	customQueryButtonWrapper: {
		alignItems: "center",
		minWidth: 60,
	},
	customQueryButton: {
		margin: 0,
		backgroundColor: "rgba(254, 55, 100, 0.3)",
		borderRadius: 20,
		width: 40,
		height: 40,
	},
	categoryLabel: {
		fontSize: 10,
		color: "white",
		textAlign: "center",
		marginTop: 4,
		textShadowColor: "rgba(0, 0, 0, 0.8)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
});