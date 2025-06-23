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
};

export const GuideSection: React.FC<GuideSectionProps> = ({ guide }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title} numberOfLines={2}>
				{guide.title}
			</Text>
			<Text style={styles.content} numberOfLines={4}>
				{guide.content}
			</Text>
			<View style={styles.buttonRow}>
				<IconButton
					icon="heart-outline"
					iconColor="white"
					size={24}
					onPress={() => {}}
					testID="like-button"
				/>
				<IconButton
					icon="volume-high"
					iconColor="white"
					size={24}
					onPress={() => {}}
					testID="play-audio-button"
				/>
				<IconButton
					icon="share-variant"
					iconColor="white"
					size={24}
					onPress={() => {}}
					testID="share-button"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginBottom: 12,
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,
	},
	content: {
		fontSize: 16,
		color: "white",
		lineHeight: 24,
		marginBottom: 20,
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 8,
	},
});