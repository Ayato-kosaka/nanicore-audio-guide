import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { IconButton, Text } from "react-native-paper";

import { useLogger } from "@/hooks/useLogger";
import { useWithLoading } from "@/hooks/useWithLoading";

import { GuideInteractionSection } from "./GuideInteractionSection";
import { CustomQueryModal } from "./CustomQueryModal";
import { GuideBaseCard } from "./components/GuideBaseCard";

export type PlaceGuide = {
  id: string;
  title: string;
  content: string;
  category: string;
};

export type PlaceGuideCardProps = {
  imageUri: string;
  guides: PlaceGuide[];
  placeName: string;
  onCategorySelect: (categoryId: string) => Promise<void>;
  onCustomQuestion: (query: string) => Promise<void>;
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

  const [availableCategories, setAvailableCategories] = useState(GUIDE_CATEGORIES);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const guidesScrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (guides.length > 1) {
      setTimeout(() => {
        guidesScrollViewRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [guides.length]);

  const handleCategoryPress = useCallback(
    withLoading(async (categoryId: string) => {
      const category = availableCategories.find((c) => c.id === categoryId);
      if (!category) return;

      await onCategorySelect(categoryId);
      setAvailableCategories((prev) => prev.filter((c) => c.id !== categoryId));

      logFrontendEvent({
        event_name: "placeGuideCategoryPressed",
        error_level: "info",
        payload: { categoryId },
      });
    }),
    [availableCategories, onCategorySelect, logFrontendEvent]
  );

  const handleCustomQuery = useCallback(
    withLoading(async (query: string) => {
      if (!query.trim()) return;
      await onCustomQuestion(query);
      setShowCustomModal(false);
    }),
    [onCustomQuestion]
  );

  return (
    <GuideBaseCard imageUri={imageUri} placeName={placeName} onBack={onBackPress}>
      <ScrollView
        ref={guidesScrollViewRef}
        style={styles.guidesScrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.guidesContent}
      >
        {guides.map((guide, index) => (
          <GuideInteractionSection key={guide.id} guide={guide} isFirst={index === 0} />
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
          <Text style={styles.categoryLabel}>Custom</Text>
        </View>
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
  guidesScrollView: { maxHeight: "30%" },
  guidesContent: { gap: 16, paddingBottom: 20 },
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
