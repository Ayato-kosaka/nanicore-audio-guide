import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Chip } from "react-native-paper";

type PlaceGuide = {
	id: string;
	title: string;
	content: string;
	category: string;
};

type PlaceGuideCardProps = {
	guide: PlaceGuide;
};

export const PlaceGuideCard: React.FC<PlaceGuideCardProps> = ({ guide }) => {
	return (
		<Card style={styles.card} testID={`guide-card-${guide.id}`}>
			<Card.Content style={styles.content}>
				<View style={styles.header}>
					<Text variant="titleMedium" style={styles.title} numberOfLines={2}>
						{guide.title}
					</Text>
					<Chip size="small" style={styles.categoryChip}>
						{guide.category}
					</Chip>
				</View>
				<Text variant="bodyMedium" style={styles.description} numberOfLines={4}>
					{guide.content}
				</Text>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		width: 280,
		height: 160,
		marginHorizontal: 4,
	},
	content: {
		flex: 1,
		padding: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 12,
		gap: 8,
	},
	title: {
		flex: 1,
		fontWeight: "600",
	},
	categoryChip: {
		height: 24,
	},
	description: {
		flex: 1,
		color: "#666",
		lineHeight: 20,
	},
});