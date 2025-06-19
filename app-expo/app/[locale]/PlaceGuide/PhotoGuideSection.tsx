import React, { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Chip, TextInput, Button } from "react-native-paper";

import { useLogger } from "@/hooks/useLogger";
import { useWithLoading } from "@/hooks/useWithLoading";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import i18n from "@/lib/i18n";

import { PlaceGuideCard } from "./PlaceGuideCard";

type PlaceGuide = {
	id: string;
	title: string;
	content: string;
	category: string;
};

type PhotoGuide = {
	id: string;
	imageUri: string;
	guides: PlaceGuide[];
	selectedChips: string[];
	customQuery: string;
};

type GuideChip = {
	id: string;
	label: string;
	selected: boolean;
};

type PhotoGuideSectionProps = {
	photoGuide: PhotoGuide;
	onUpdate: (updates: Partial<PhotoGuide>) => void;
};

const PHOTO_GUIDE_CATEGORIES: GuideChip[] = [
	{ id: "architecture", label: "Architecture", selected: false },
	{ id: "art", label: "Art", selected: false },
	{ id: "nature", label: "Nature", selected: false },
	{ id: "people", label: "People", selected: false },
	{ id: "food", label: "Food", selected: false },
	{ id: "culture", label: "Culture", selected: false },
	{ id: "history", label: "History", selected: false },
	{ id: "technology", label: "Technology", selected: false },
];

export const PhotoGuideSection: React.FC<PhotoGuideSectionProps> = ({ photoGuide, onUpdate }) => {
	const { logFrontendEvent } = useLogger();
	const { isLoading, withLoading } = useWithLoading();
	const { showSnackbar } = useSnackbar();

	const [chips, setChips] = useState<GuideChip[]>(
		PHOTO_GUIDE_CATEGORIES.map(chip => ({
			...chip,
			selected: photoGuide.selectedChips.includes(chip.id),
		}))
	);
	const [customQuery, setCustomQuery] = useState(photoGuide.customQuery);

	const handleChipToggle = useCallback((chipId: string) => {
		const newChips = chips.map(chip => 
			chip.id === chipId ? { ...chip, selected: !chip.selected } : chip
		);
		setChips(newChips);

		const selectedChips = newChips.filter(chip => chip.selected).map(chip => chip.id);
		onUpdate({ selectedChips });

		logFrontendEvent({
			event_name: "photoGuideChipToggled",
			error_level: "info",
			payload: { photoGuideId: photoGuide.id, chipId },
		});
	}, [chips, onUpdate, photoGuide.id, logFrontendEvent]);

	const handleCustomQueryChange = useCallback((text: string) => {
		setCustomQuery(text);
		onUpdate({ customQuery: text });
	}, [onUpdate]);

	const generatePhotoGuides = withLoading(async () => {
		const selectedCategories = chips.filter(chip => chip.selected).map(chip => chip.id);
		
		if (selectedCategories.length === 0 && !customQuery.trim()) {
			showSnackbar(i18n.t("PlaceGuide.selectCategoryOrQuery"));
			return;
		}

		try {
			// Mock guide generation based on photo analysis
			const mockPhotoGuides: PlaceGuide[] = selectedCategories.map(category => ({
				id: `photo_${photoGuide.id}_${category}_${Date.now()}`,
				title: `${category.charAt(0).toUpperCase() + category.slice(1)} in Photo`,
				content: `Analysis of ${category} elements visible in this photo. This guide provides insights based on what can be observed in the captured image.`,
				category,
			}));

			if (customQuery.trim()) {
				mockPhotoGuides.push({
					id: `photo_${photoGuide.id}_custom_${Date.now()}`,
					title: "Custom Photo Analysis",
					content: `Custom analysis: "${customQuery}". This guide addresses your specific question about what's visible in the photo.`,
					category: "custom",
				});
			}

			onUpdate({ guides: [...photoGuide.guides, ...mockPhotoGuides] });

			logFrontendEvent({
				event_name: "photoGuidesGenerated",
				error_level: "info",
				payload: { 
					photoGuideId: photoGuide.id, 
					selectedCategories, 
					customQuery,
					generatedCount: mockPhotoGuides.length,
				},
			});

			showSnackbar(i18n.t("PlaceGuide.guidesGenerated"));
		} catch (error: any) {
			logFrontendEvent({
				event_name: "generatePhotoGuidesFailed",
				error_level: "error",
				payload: { error: error.message, photoGuideId: photoGuide.id },
			});
			showSnackbar(i18n.t("PlaceGuide.generateError"));
		}
	});

	return (
		<View style={styles.container}>
			{/* Photo */}
			<View style={styles.photoContainer}>
				<Image 
					source={{ uri: photoGuide.imageUri }} 
					style={styles.photo}
					testID={`photo-${photoGuide.id}`}
				/>
			</View>

			{/* Photo Guide Categories */}
			<View style={styles.section}>
				<Text variant="titleMedium" style={styles.sectionTitle}>
					{i18n.t("PlaceGuide.analyzePhoto")}
				</Text>
				<ScrollView 
					horizontal 
					showsHorizontalScrollIndicator={false}
					style={styles.chipsContainer}
					contentContainerStyle={styles.chipsContent}
				>
					{chips.map(chip => (
						<Chip
							key={chip.id}
							selected={chip.selected}
							onPress={() => handleChipToggle(chip.id)}
							style={styles.chip}
							testID={`photo-chip-${photoGuide.id}-${chip.id}`}
						>
							{chip.label}
						</Chip>
					))}
				</ScrollView>
			</View>

			{/* Custom Query for Photo */}
			<View style={styles.section}>
				<TextInput
					label={i18n.t("PlaceGuide.askAboutPhoto")}
					value={customQuery}
					onChangeText={handleCustomQueryChange}
					mode="outlined"
					multiline
					numberOfLines={2}
					style={styles.textInput}
					testID={`photo-query-${photoGuide.id}`}
				/>
				<Button
					mode="contained"
					onPress={generatePhotoGuides}
					loading={isLoading}
					disabled={isLoading}
					style={styles.generateButton}
					testID={`generate-photo-guides-${photoGuide.id}`}
				>
					{i18n.t("PlaceGuide.analyzePhoto")}
				</Button>
			</View>

			{/* Photo Guides */}
			{photoGuide.guides.length > 0 && (
				<View style={styles.section}>
					<Text variant="titleMedium" style={styles.sectionTitle}>
						{i18n.t("PlaceGuide.photoAnalysis")}
					</Text>
					<ScrollView 
						horizontal 
						showsHorizontalScrollIndicator={false}
						style={styles.guidesContainer}
						contentContainerStyle={styles.guidesContent}
					>
						{photoGuide.guides.map(guide => (
							<PlaceGuideCard key={guide.id} guide={guide} />
						))}
					</ScrollView>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		marginBottom: 8,
	},
	photoContainer: {
		padding: 20,
		alignItems: "center",
	},
	photo: {
		width: "100%",
		height: 200,
		borderRadius: 12,
		backgroundColor: "#f0f0f0",
	},
	section: {
		padding: 20,
		paddingTop: 0,
	},
	sectionTitle: {
		marginBottom: 16,
		fontWeight: "600",
	},
	chipsContainer: {
		marginHorizontal: -4,
	},
	chipsContent: {
		paddingHorizontal: 4,
		gap: 8,
	},
	chip: {
		marginHorizontal: 4,
	},
	textInput: {
		marginBottom: 16,
	},
	generateButton: {
		alignSelf: "flex-start",
	},
	guidesContainer: {
		marginHorizontal: -4,
	},
	guidesContent: {
		paddingHorizontal: 4,
		gap: 12,
	},
});