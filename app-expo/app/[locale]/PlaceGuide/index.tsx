import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, Button, Chip, TextInput, Card } from "react-native-paper";

import { useLogger } from "@/hooks/useLogger";
import { useLocale } from "@/hooks/useLocale";
import { useWithLoading } from "@/hooks/useWithLoading";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import i18n from "@/lib/i18n";

import { PlaceGuideCard } from "./PlaceGuideCard";
import { PhotoGuideSection } from "./PhotoGuideSection";

type PlaceGuideParams = {
	placeId: string;
	placeName: string;
	latitude?: string;
	longitude?: string;
};

type GuideChip = {
	id: string;
	label: string;
	selected: boolean;
};

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

const GUIDE_CATEGORIES: GuideChip[] = [
	{ id: "history", label: "History", selected: false },
	{ id: "culture", label: "Culture", selected: false },
	{ id: "food", label: "Food", selected: false },
	{ id: "cost", label: "Cost of Living", selected: false },
	{ id: "safety", label: "Safety", selected: false },
	{ id: "transport", label: "Transportation", selected: false },
	{ id: "attractions", label: "Attractions", selected: false },
	{ id: "weather", label: "Weather", selected: false },
];

export default function PlaceGuideScreen() {
	const params = useLocalSearchParams<PlaceGuideParams>();
	const router = useRouter();
	const locale = useLocale();
	const { logFrontendEvent } = useLogger();
	const { isLoading, withLoading } = useWithLoading();
	const { showSnackbar } = useSnackbar();

	const [chips, setChips] = useState<GuideChip[]>(GUIDE_CATEGORIES);
	const [customQuery, setCustomQuery] = useState("");
	const [placeGuides, setPlaceGuides] = useState<PlaceGuide[]>([]);
	const [photoGuides, setPhotoGuides] = useState<PhotoGuide[]>([]);

	useEffect(() => {
		logFrontendEvent({
			event_name: "PlaceGuideMounted",
			error_level: "info",
			payload: { placeId: params.placeId, placeName: params.placeName },
		});

		// Load initial place guides
		loadPlaceGuides();
	}, [params.placeId]);

	const loadPlaceGuides = withLoading(async () => {
		try {
			// Mock API call - replace with actual implementation
			const mockGuides: PlaceGuide[] = [
				{
					id: "1",
					title: "Welcome to " + params.placeName,
					content: "This is a beautiful location with rich history and culture. Explore the area to discover hidden gems and local attractions.",
					category: "general",
				},
			];

			setPlaceGuides(mockGuides);
		} catch (error: any) {
			logFrontendEvent({
				event_name: "loadPlaceGuidesFailed",
				error_level: "error",
				payload: { error: error.message },
			});
			showSnackbar(i18n.t("PlaceGuide.loadError"));
		}
	});

	const handleChipToggle = useCallback((chipId: string) => {
		setChips(prev => 
			prev.map(chip => 
				chip.id === chipId ? { ...chip, selected: !chip.selected } : chip
			)
		);

		logFrontendEvent({
			event_name: "placeGuideChipToggled",
			error_level: "info",
			payload: { chipId },
		});
	}, [logFrontendEvent]);

	const generateGuidesForSelection = withLoading(async () => {
		const selectedCategories = chips.filter(chip => chip.selected).map(chip => chip.id);
		
		if (selectedCategories.length === 0 && !customQuery.trim()) {
			showSnackbar(i18n.t("PlaceGuide.selectCategoryOrQuery"));
			return;
		}

		try {
			// Mock guide generation - replace with actual API call
			const mockGeneratedGuides: PlaceGuide[] = selectedCategories.map(category => ({
				id: `${category}_${Date.now()}`,
				title: `${category.charAt(0).toUpperCase() + category.slice(1)} Guide`,
				content: `Detailed information about ${category} in ${params.placeName}. This guide provides comprehensive insights and local knowledge.`,
				category,
			}));

			if (customQuery.trim()) {
				mockGeneratedGuides.push({
					id: `custom_${Date.now()}`,
					title: "Custom Guide",
					content: `Information about "${customQuery}" in ${params.placeName}. This custom guide addresses your specific inquiry.`,
					category: "custom",
				});
			}

			setPlaceGuides(prev => [...prev, ...mockGeneratedGuides]);

			logFrontendEvent({
				event_name: "placeGuidesGenerated",
				error_level: "info",
				payload: { selectedCategories, customQuery },
			});
		} catch (error: any) {
			logFrontendEvent({
				event_name: "generatePlaceGuidesFailed",
				error_level: "error",
				payload: { error: error.message },
			});
			showSnackbar(i18n.t("PlaceGuide.generateError"));
		}
	});

	const handleCameraPress = useCallback(() => {
		// Mock photo capture - replace with actual camera implementation
		const mockImageUri = `https://picsum.photos/400/300?random=${Date.now()}`;
		
		const newPhotoGuide: PhotoGuide = {
			id: `photo_${Date.now()}`,
			imageUri: mockImageUri,
			guides: [],
			selectedChips: [],
			customQuery: "",
		};

		setPhotoGuides(prev => [...prev, newPhotoGuide]);

		logFrontendEvent({
			event_name: "placeGuideCameraPressed",
			error_level: "info",
			payload: { photoGuideId: newPhotoGuide.id },
		});

		showSnackbar(i18n.t("PlaceGuide.photoAdded"));
	}, [logFrontendEvent, showSnackbar]);

	const updatePhotoGuide = useCallback((photoGuideId: string, updates: Partial<PhotoGuide>) => {
		setPhotoGuides(prev => 
			prev.map(guide => 
				guide.id === photoGuideId ? { ...guide, ...updates } : guide
			)
		);
	}, []);

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			{/* Place Header */}
			<View style={styles.header}>
				<Text variant="headlineMedium" style={styles.placeName}>
					{params.placeName}
				</Text>
				{params.latitude && params.longitude && (
					<Text variant="bodyMedium" style={styles.coordinates}>
						{parseFloat(params.latitude).toFixed(4)}, {parseFloat(params.longitude).toFixed(4)}
					</Text>
				)}
			</View>

			{/* Camera Button */}
			<View style={styles.cameraSection}>
				<Button
					mode="contained"
					icon="camera"
					onPress={handleCameraPress}
					style={styles.cameraButton}
					testID="place-camera-button"
				>
					{i18n.t("PlaceGuide.takePhoto")}
				</Button>
			</View>

			{/* Guide Categories */}
			<View style={styles.section}>
				<Text variant="titleMedium" style={styles.sectionTitle}>
					{i18n.t("PlaceGuide.selectCategories")}
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
							testID={`chip-${chip.id}`}
						>
							{chip.label}
						</Chip>
					))}
				</ScrollView>
			</View>

			{/* Custom Query */}
			<View style={styles.section}>
				<TextInput
					label={i18n.t("PlaceGuide.customQuery")}
					value={customQuery}
					onChangeText={setCustomQuery}
					mode="outlined"
					multiline
					numberOfLines={2}
					style={styles.textInput}
					testID="custom-query-input"
				/>
				<Button
					mode="contained"
					onPress={generateGuidesForSelection}
					loading={isLoading}
					disabled={isLoading}
					style={styles.generateButton}
					testID="generate-guides-button"
				>
					{i18n.t("PlaceGuide.generateGuides")}
				</Button>
			</View>

			{/* Place Guides */}
			{placeGuides.length > 0 && (
				<View style={styles.section}>
					<Text variant="titleMedium" style={styles.sectionTitle}>
						{i18n.t("PlaceGuide.placeGuides")}
					</Text>
					<ScrollView 
						horizontal 
						showsHorizontalScrollIndicator={false}
						style={styles.guidesContainer}
						contentContainerStyle={styles.guidesContent}
					>
						{placeGuides.map(guide => (
							<PlaceGuideCard key={guide.id} guide={guide} />
						))}
					</ScrollView>
				</View>
			)}

			{/* Photo Guides */}
			{photoGuides.map(photoGuide => (
				<PhotoGuideSection
					key={photoGuide.id}
					photoGuide={photoGuide}
					onUpdate={(updates) => updatePhotoGuide(photoGuide.id, updates)}
				/>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		padding: 20,
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	placeName: {
		fontWeight: "bold",
		marginBottom: 4,
	},
	coordinates: {
		color: "#666",
	},
	cameraSection: {
		padding: 20,
		backgroundColor: "white",
		marginBottom: 8,
	},
	cameraButton: {
		alignSelf: "center",
	},
	section: {
		backgroundColor: "white",
		marginBottom: 8,
		padding: 20,
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