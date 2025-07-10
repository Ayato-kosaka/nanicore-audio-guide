import React, { useRef, useEffect, useCallback, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, Portal, Text } from "react-native-paper";

import { useWithLoading } from "@/hooks/useWithLoading";
import { useLogger } from "@/hooks/useLogger";
import i18n from "@/lib/i18n";

import { GuideInteractionSection } from "./GuideInteractionSection";
import { CustomQueryModal } from "./CustomQueryModal";
import { GuideBaseCard } from "./components/GuideBaseCard";
import { getFallbackImageUri } from "@/utils/image";

export type HighlightGuide = {
	id: string;
	title: string;
	manuscript: string;
	category: string;
	audioUrl: string;
};

export type Highlight = {
	id: string;
	imageUri: string;
	highlightGuides: HighlightGuide[];
};

export type HighlightCardProps = {
	highlight: Highlight;
	onCustomQuestion: (id: string, question: string) => Promise<void>;
	onBackPress: () => void;
	carouselRef?: React.RefObject<any>;
};

/**
 * 🌟 HighlightCard
 *
 * ユーザーが撮影したハイライト画像とガイドを表示するカード。
 * カスタム質問のみを受け付け、ガイドを追加生成する。
 */
export const HighlightCard: React.FC<HighlightCardProps> = ({
	highlight,
	onCustomQuestion,
	onBackPress,
	carouselRef,
}) => {
	const { isLoading, withLoading } = useWithLoading();
	const { logFrontendEvent } = useLogger();
	const [showCustomModal, setShowCustomModal] = useState(false);
	const [imageSrc, setImageSrc] = useState(highlight.imageUri);
	const scrollRef = useRef<ScrollView>(null);

	useEffect(() => {
		if (highlight.highlightGuides.length > 1) {
			setTimeout(() => {
				scrollRef.current?.scrollToEnd({ animated: true });
			}, 300);
		}
	}, [highlight.highlightGuides.length]);

	const handleCustomQuery = useCallback(
		withLoading(async (query: string) => {
			if (!query.trim()) return;
			await onCustomQuestion(highlight.id, query);
			setShowCustomModal(false);
			logFrontendEvent({
				event_name: "highlightCustomQuery",
				error_level: "info",
				payload: { highlightId: highlight.id },
			});
		}),
		[highlight.id, onCustomQuestion, logFrontendEvent],
	);

	/**
	 * 📸 画像読み込み失敗時にフォールバック画像へ切り替える。
	 */
	const handleImageError = useCallback(() => {
		setImageSrc(getFallbackImageUri());
		logFrontendEvent({
			event_name: "highlightImageLoadError",
			error_level: "error",
			payload: {
				highlight_id: highlight.id,
				failed_url: highlight.imageUri,
			},
		});
	}, [highlight.id, highlight.imageUri, logFrontendEvent]);

	return (
		<GuideBaseCard imageUri={imageSrc} onBack={onBackPress} onImageError={handleImageError}>
			<ScrollView
				ref={scrollRef}
				style={styles.guidesScrollView}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.guidesContent}
				nestedScrollEnabled={Platform.OS === "android"}
				simultaneousHandlers={carouselRef}>
				{highlight.highlightGuides.map((guide, index) => (
					<GuideInteractionSection key={guide.id} guide={guide} isFirst={index === 0} targetType="highlight_guides" />
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
			</View>

			<Portal>
				<CustomQueryModal
					visible={showCustomModal}
					onDismiss={() => setShowCustomModal(false)}
					onSubmit={handleCustomQuery}
					loading={isLoading}
				/>
			</Portal>
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
