import React, { useState, useCallback } from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { Text, IconButton, Chip } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { useLogger } from "@/hooks/useLogger";
import { useWithLoading } from "@/hooks/useWithLoading";
import { useSnackbar } from "@/contexts/SnackbarProvider";
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

export const PlaceGuideCard: React.FC<PlaceGuideCardProps> = ({ placeImage, placeName, onUpdate }) => {
	const { logFrontendEvent } = useLogger();
	const { isLoading, withLoading } = useWithLoading();
	const { showSnackbar } = useSnackbar();

	const [chips, setChips] = useState<GuideChip[]>(GUIDE_CATEGORIES);
	const [showCustomModal, setShowCustomModal] = useState(false);

	const handleChipPress = useCallback(
		withLoading(async (chipId: string) => {
			const chip = chips.find((c) => c.id === chipId);
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

				// Hide the pressed chip
				setChips((prev) => prev.filter((c) => c.id !== chipId));

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
				{/* Guide Content */}
				<LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"]} style={styles.contentOverlay}>
					<ScrollView
						style={styles.guidesScrollView}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.guidesContent}>
						{placeImage.guides.map((guide, index) => (
							<GuideSection key={guide.id} guide={guide} isFirst={index === 0} />
						))}
					</ScrollView>

					{/* Question Field Overlay */}
					<View style={styles.questionFieldOverlay}>
						<View style={styles.questionContainer}>
							<IconButton
								icon="message-text-outline"
								size={20}
								iconColor="white"
								onPress={() => setShowCustomModal(true)}
								style={styles.messageIcon}
								testID="custom-query-button"
							/>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								style={styles.chipsContainer}
								contentContainerStyle={styles.chipsContent}>
								{chips.map((chip) => (
									<Chip
										key={chip.id}
										onPress={() => handleChipPress(chip.id)}
										style={styles.chip}
										textStyle={styles.chipText}
										disabled={isLoading}
										testID={`category-chip-${chip.id}`}>
										{chip.label}
									</Chip>
								))}
							</ScrollView>
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
	questionFieldOverlay: {
		marginTop: 20,
	},
	questionContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		borderRadius: 20,
		paddingVertical: 8,
		paddingHorizontal: 12,
		backdropFilter: "blur(10px)",
	},
	messageIcon: {
		margin: 0,
		marginRight: 8,
	},
	chipsContainer: {
		flex: 1,
	},
	chipsContent: {
		gap: 6,
		paddingRight: 8,
	},
	chip: {
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		height: 28,
	},
	chipText: {
		fontSize: 11,
		color: "#333",
		fontWeight: "500",
	},
	contentOverlay: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 20,
		paddingBottom: 24,
		paddingTop: 80,
	},
	guidesScrollView: {
		maxHeight: "30%",
	},
	guidesContent: {
		gap: 20,
		paddingBottom: 20,
	},
});
