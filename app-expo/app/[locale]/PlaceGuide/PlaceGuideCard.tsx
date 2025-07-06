import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { IconButton, Text } from "react-native-paper";

import { useLogger } from "@/hooks/useLogger";
import { useWithLoading } from "@/hooks/useWithLoading";
import i18n from "@/lib/i18n";

import { GuideInteractionSection } from "./GuideInteractionSection";
import { CustomQueryModal } from "./CustomQueryModal";
import { GuideBaseCard } from "./components/GuideBaseCard";
import { getFallbackImageUri } from "@/utils/image";

export type PlaceGuide = {
	id: string;
	title: string;
	manuscript: string;
	category: string;
	audioUrl: string;
};

export type PlaceGuideCardProps = {
	imageUri: string;
	guides: PlaceGuide[];
	placeName: string;
	onCategorySelect: (category: GuideCategory) => Promise<void>;
	onCustomQuestion: (query: string) => Promise<void>;
	onBackPress: () => void;
};

export const GUIDE_CATEGORIES = [
	{
		id: "history",
		label: "History",
		description: "historical background of the place",
		icon: "book-open-outline",
	},
	{
		id: "culture",
		label: "Culture",
		description: "local culture, art and traditions",
		icon: "palette-outline",
	},
	{
		id: "architecture",
		label: "Architecture",
		description: "buildings and architectural style",
		icon: "home-city-outline",
	},
	{
		id: "food",
		label: "Food",
		description: "famous foods and cuisine",
		icon: "food-outline",
	},
	// {
	// 	id: "nature",
	// 	label: "Nature",
	// 	description: "surrounding nature and scenery",
	// 	icon: "leaf-outline",
	// },
	// {
	// 	id: "people",
	// 	label: "People",
	// 	description: "local people and society",
	// 	icon: "account-group-outline",
	// },
	// {
	// 	id: "cost",
	// 	label: "Cost",
	// 	description: "typical expenses and prices",
	// 	icon: "currency-usd",
	// },
	// {
	// 	id: "safety",
	// 	label: "Safety",
	// 	description: "travel safety tips",
	// 	icon: "shield-check-outline",
	// },
];

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];

/**
 * 🏞️ PlaceGuideCard
 *
 * 最初のガイドを表示するカード。カテゴリ選択やカスタム質問で
 * 追加のガイド生成を呼び出す。
 */
export const PlaceGuideCard: React.FC<PlaceGuideCardProps> = ({
	imageUri,
	guides,
	placeName,
	onCategorySelect,
	onCustomQuestion,
	onBackPress,
}) => {
	const { logFrontendEvent } = useLogger();
	const { isLoading, withLoading } = useWithLoading();

	const [availableCategories, setAvailableCategories] = useState<GuideCategory[]>(GUIDE_CATEGORIES);
	const [showCustomModal, setShowCustomModal] = useState(false);
	const [imageSrc, setImageSrc] = useState(imageUri);
	const guidesScrollViewRef = useRef<ScrollView>(null);

	useEffect(() => {
		if (guides.length > 1) {
			setTimeout(() => {
				guidesScrollViewRef.current?.scrollToEnd({ animated: true });
			}, 300);
		}
	}, [guides.length]);

	const handleCategoryPress = useCallback(
		withLoading(async (category: GuideCategory) => {
			await onCategorySelect(category);
			setAvailableCategories((prev) => prev.filter((c) => c.id !== category.id));

			logFrontendEvent({
				event_name: "placeGuideCategoryPressed",
				error_level: "info",
				payload: { category: category.id, place_name: placeName },
			});
		}),
		[availableCategories, onCategorySelect, logFrontendEvent],
	);

	const handleCustomQuery = useCallback(
		withLoading(async (query: string) => {
			if (!query.trim()) return;
			await onCustomQuestion(query);
			setShowCustomModal(false);
		}),
		[onCustomQuestion],
	);

	/**
	 * 📸 画像読み込み失敗時にフォールバック画像へ切り替える。
	 */
	const handleImageError = useCallback(() => {
		setImageSrc(getFallbackImageUri());
		logFrontendEvent({
			event_name: "placeImageLoadError",
			error_level: "error",
			payload: {
				place_name: placeName,
				failed_url: imageUri,
			},
		});
	}, [imageUri, placeName, logFrontendEvent]);

	return (
		<GuideBaseCard imageUri={imageSrc} placeName={placeName} onBack={onBackPress} onImageError={handleImageError}>
			<ScrollView
				ref={guidesScrollViewRef}
				style={styles.guidesScrollView}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.guidesContent}>
				{guides.map((guide, index) => (
					<GuideInteractionSection key={guide.id} guide={guide} isFirst={index === 0} targetType="place_guides" />
				))}
			</ScrollView>

			<View style={styles.questionField}>
				<View style={styles.customQueryButtonWrapper}>
					<IconButton
						icon="message-text-outline"
						size={20}
						iconColor="white"
						onPress={() => setShowCustomModal(true)}
						style={styles.customQueryButton}
						testID="custom-query-button"
					/>
					<Text style={styles.categoryLabel}>{i18n.t("PlaceGuide.custom")}</Text>
				</View>
				{availableCategories.slice(0, 4).map((category) => (
					<View key={category.id} style={styles.categoryButtonWrapper}>
						<IconButton
							icon={category.icon}
							size={20}
							iconColor="white"
							onPress={() => handleCategoryPress(category)}
							style={styles.categoryButton}
							disabled={isLoading}
							testID={`category-button-${category.id}`}
						/>
						<Text style={styles.categoryLabel}>{i18n.t(`PlaceGuide.category.${category.id}`)}</Text>
					</View>
				))}
			</View>

			<CustomQueryModal
				visible={showCustomModal}
				onDismiss={() => setShowCustomModal(false)}
				onSubmit={handleCustomQuery}
				loading={isLoading}
			/>
		</GuideBaseCard>
	);
};

const styles = StyleSheet.create({
	guidesScrollView: {},
	guidesContent: { gap: 16 },
	questionField: {
		marginTop: 16,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: "rgba(255, 255, 255, 0.2)",
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 8,
	},
	categoryButtonWrapper: { alignItems: "center", minWidth: 60 },
	categoryButton: {
		margin: 0,
		backgroundColor: "rgba(255, 255, 255, 0.15)",
		borderRadius: 20,
		width: 40,
		height: 40,
	},
	customQueryButtonWrapper: { alignItems: "center", minWidth: 60 },
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
	},
});
