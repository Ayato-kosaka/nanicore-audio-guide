import React from "react";
import { View, ImageBackground, StyleSheet, Platform } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

/**
 * 📌 GuideBaseCard
 *
 * PlaceGuideCard と HighlightCard で共通となる画像背景とヘッダー UI をまとめたコンポーネント。
 * 子要素としてガイド表示や入力欄を受け取り、責務を分離する。
 */
export type GuideBaseCardProps = {
        imageUri: string;
        placeName?: string;
        onBack: () => void;
        children: React.ReactNode;
        onImageError?: () => void;
};

export const GuideBaseCard: React.FC<GuideBaseCardProps> = ({
        imageUri,
        placeName,
        onBack,
        children,
        onImageError,
}) => (
        <View style={styles.container}>
                <ImageBackground
                        source={{ uri: imageUri }}
                        style={styles.imageBackground}
                        resizeMode="cover"
                        onError={onImageError}>
                        <LinearGradient colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0)"]} style={styles.headerOverlay}>
                                <Text variant="titleMedium" style={styles.placeName} numberOfLines={1}>
                                        {placeName}
                                </Text>
                                <IconButton
                                        icon="close"
                                        size={20}
                                        iconColor="white"
                                        onPress={onBack}
                                        style={styles.closeButton}
                                        testID="close-button"
                                />
                        </LinearGradient>

                        <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"]} style={styles.contentOverlay}>
                                {children}
                        </LinearGradient>
                </ImageBackground>
        </View>
);

const styles = StyleSheet.create({
	container: { flex: 1, width: "100%" },
	imageBackground: { flex: 1, justifyContent: "space-between" },
	headerOverlay: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 12,
		paddingTop: Platform.select({ ios: 24, android: 12, default: 12 }),
	},
	placeName: {
		flex: 1,
		color: "white",
		fontWeight: "500",
		fontSize: 16,
	},
        closeButton: {
                margin: 0,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 20,
        },

        contentOverlay: {
                justifyContent: "flex-end",
                paddingHorizontal: 20,
                paddingBottom: 24,
                height: "40%",
	},
});
