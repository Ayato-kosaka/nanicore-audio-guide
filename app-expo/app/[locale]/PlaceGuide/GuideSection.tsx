import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";

type PlaceGuide = {
	id: string;
	title: string;
	content: string;
	category: string;
};

type GuideSectionProps = {
	guide: PlaceGuide;
	isFirst?: boolean;
};

export const GuideSection: React.FC<GuideSectionProps> = ({ guide, isFirst = false }) => {
	return (
		<View style={[styles.container, isFirst && styles.firstGuide]}>
			<Text style={[styles.title, isFirst && styles.firstTitle]} numberOfLines={2}>
				{guide.title}
			</Text>
			<Text style={[styles.content, isFirst && styles.firstContent]} numberOfLines={6}>
				{guide.content}
			</Text>
			<View style={styles.buttonRow}>
				<IconButton
					icon="heart-outline"
					iconColor="white"
					size={20}
					onPress={() => {}}
					style={styles.actionButton}
					testID="like-button"
				/>
				<IconButton
					icon="volume-high"
					iconColor="white"
					size={20}
					onPress={() => {}}
					style={styles.actionButton}
					testID="play-audio-button"
				/>
				<IconButton
					icon="share-variant"
					iconColor="white"
					size={20}
					onPress={() => {}}
					style={styles.actionButton}
					testID="share-button"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		borderTopWidth: 1,
		borderTopColor: "rgba(255, 255, 255, 0.2)",
	},
	firstGuide: {
		borderTopWidth: 0,
		paddingTop: 0,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: "white",
		marginBottom: 8,
		textShadowColor: "rgba(0, 0, 0, 0.8)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	firstTitle: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 12,
	},
	content: {
		fontSize: 13,
		color: "rgba(255, 255, 255, 0.95)",
		lineHeight: 18,
		marginBottom: 12,
		textShadowColor: "rgba(0, 0, 0, 0.8)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	firstContent: {
		fontSize: 15,
		lineHeight: 22,
		marginBottom: 16,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 4,
	},
	actionButton: {
		margin: 0,
		backgroundColor: "rgba(255, 255, 255, 0.15)",
		borderRadius: 20,
	},
});