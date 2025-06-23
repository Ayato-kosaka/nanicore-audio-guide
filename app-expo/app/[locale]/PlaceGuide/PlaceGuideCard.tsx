import React, { useState, useCallback } from "react";
import { View, StyleSheet, ImageBackground, ScrollView, Platform } from "react-native";
import { Text, IconButton, Chip, TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { useLogger } from "@/hooks/useLogger";
import { useWithLoading } from "@/hooks/useWithLoading";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import { useDialog } from "@/contexts/DialogProvider";
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

type GuideChip = {
	id: string;
	label: string;
	selected: boolean;
};

type PlaceGuideCardProps = {
	placeImage: PlaceImage;
	placeName: string;
	onUpdate: (updates: Partial<PlaceImage>) => void;
};

const GUIDE_CATEGORIES: GuideChip[] = [
	{ id: "history", label: "History", selected: false },
	{ id: "culture", label: "Culture", selected: false },
	{ id: "food", label: "Food", selected: false },
	{ id: "architecture", label: "Architecture", selected: false },
	{ id: "nature", label: "Nature", selected: false },
	{ id: "people", label: "People", selected: false },
	{ id: "cost", label: "Cost", selected: false },
	{ id: "safety", label: "Safety", selected: false },
];

export const PlaceGuideCard: React.FC<PlaceGuideCardProps> = ({ 
	placeImage, 
	placeName, 
	onUpdate 
}) => {
	const { logFrontendEvent } = useLogger();
	const { isLoading, withLoading } = useWithLoading();
	const { showSnackbar } = useSnackbar();
	const { showDialog } = useDialog();

	const [chips, setChips] = useState<GuideChip[]>(GUIDE_CATEGORIES);
	const [showCustomModal, setShowCustomModal] = useState(false);
	const [currentGuideIndex, setCurrentGuideIndex] = useState(0);

	const currentGuide = placeImage.guides[currentGuideIndex] || placeImage.guides[0];

	const handleChipPress = useCallback(
		withLoading(async (chipId: string) => {
			const chip = chips.find(c => c.id === chipId);
			if (!chip) return;

			try {
				// Mock guide generation based on category
				const newGuide: PlaceGuide = {
					id: `${placeImage.id}_${chipId}_${Date.now()}`,
					title: `${chip.label} Guide`,
					content: `Detailed information about ${chip.label.toLowerCase()} in ${placeName}. This guide provides comprehensive insights and local knowledge about this specific aspect of the location.`,
					category: chipId,
				};

				const updatedGuides = [...placeImage.guides, newGuide];
				onUpdate({ guides: updatedGuides });

				// Navigate to the new guide
				setCurrentGuideIndex(updatedGuides.length - 1);

				logFrontendEvent({
					event_name: "placeGuideChipPressed",
					error_level: "info",
					payload: { chipId, placeImageId: placeImage.id },
				});

				showSnackbar(i18n.t("PlaceGuide.guidesGenerated"));
			} catch (error: any) {
				logFrontendEvent({
					event_name: "generatePlaceGuideFromChipFailed",
					error_level: "error",
					payload: { error: error.message, chipId },
				});
				showSnackbar(i18n.t("PlaceGuide.generateError"));
			}
		}),
		[chips, placeImage, placeName, onUpdate, logFrontendEvent, showSnackbar],
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

				// Navigate to the new guide
				setCurrentGuideIndex(updatedGuides.length - 1);

				logFrontendEvent({
					event_name: "placeGuideCustomQuery",
					error_level: "info",
					payload: { query, placeImageId: placeImage.id },
				});

				showSnackbar(i18n.t("PlaceGuide.guidesGenerated"));
				setShowCustomModal(false);
			} catch (error: any) {
				logFrontendEvent({
					event_name: "generatePlaceGuideFromQueryFailed",
					error_level: "error",
					payload: { error: error.message, query },
				});
				showSnackbar(i18n.t("PlaceGuide.generateError"));
			}
		}),
		[placeImage, placeName, onUpdate, logFrontendEvent, showSnackbar],
	);

	const handlePreviousGuide = useCallback(() => {
		if (currentGuideIndex > 0) {
			setCurrentGuideIndex(currentGuideIndex - 1);
		}
	}, [currentGuideIndex]);

	const handleNextGuide = useCallback(() => {
		if (currentGuideIndex < placeImage.guides.length - 1) {
			setCurrentGuideIndex(currentGuideIndex + 1);
		}
	}, [currentGuideIndex, placeImage.guides.length]);

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
				
				{/* Guide Content Overlay */}
				<LinearGradient 
					colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]} 
					style={styles.contentOverlay}
				>
					{/* Guide Navigation */}
					{placeImage.guides.length > 1 && (
						<View style={styles.guideNavigation}>
							<IconButton
								icon="chevron-left"
								size={20}
								iconColor="white"
								onPress={handlePreviousGuide}
								disabled={currentGuideIndex === 0}
								style={styles.navButton}
								testID="previous-guide-button"
							/>
							<Text style={styles.guideCounter}>
								{currentGuideIndex + 1} / {placeImage.guides.length}
							</Text>
							<IconButton
								icon="chevron-right"
								size={20}
								iconColor="white"
								onPress={handleNextGuide}
								disabled={currentGuideIndex === placeImage.guides.length - 1}
								style={styles.navButton}
								testID="next-guide-button"
							/>
						</View>
					)}

					{/* Current Guide */}
					<GuideSection guide={currentGuide} />
				</LinearGradient>
			</ImageBackground>

			{/* Question Field */}
			<View style={styles.questionField}>
				<View style={styles.questionHeader}>
					<IconButton
						icon="message-text-outline"
						size={24}
						iconColor="#fe3764"
						onPress={() => setShowCustomModal(true)}
						style={styles.messageIcon}
						testID="custom-query-button"
					/>
					<Text variant="titleSmall" style={styles.questionTitle}>
						{i18n.t("PlaceGuide.askQuestion")}
					</Text>
				</View>

				{/* Category Chips */}
				<ScrollView 
					horizontal 
					showsHorizontalScrollIndicator={false}
					style={styles.chipsContainer}
					contentContainerStyle={styles.chipsContent}
				>
					{chips.map(chip => (
						<Chip
							key={chip.id}
							onPress={() => handleChipPress(chip.id)}
							style={styles.chip}
							textStyle={styles.chipText}
							disabled={isLoading}
							testID={`category-chip-${chip.id}`}
						>
							{chip.label}
						</Chip>
					))}
				</ScrollView>
			</View>

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
	contentOverlay: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	guideNavigation: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	navButton: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		margin: 0,
	},
	guideCounter: {
		color: "white",
		fontSize: 14,
		fontWeight: "600",
		marginHorizontal: 16,
	},
	questionField: {
		backgroundColor: "white",
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
	},
	questionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	messageIcon: {
		margin: 0,
		marginRight: 8,
	},
	questionTitle: {
		flex: 1,
		fontWeight: "600",
		color: "#333",
	},
	chipsContainer: {
		marginHorizontal: -4,
	},
	chipsContent: {
		paddingHorizontal: 4,
		gap: 8,
	},
	chip: {
		backgroundColor: "#f5f5f5",
		marginHorizontal: 4,
	},
	chipText: {
		fontSize: 12,
		color: "#666",
	},
});