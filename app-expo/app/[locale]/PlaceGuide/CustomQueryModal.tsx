import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Portal, Modal, Text, TextInput, Button, IconButton } from "react-native-paper";
import i18n from "@/lib/i18n";

type CustomQueryModalProps = {
	visible: boolean;
	onDismiss: () => void;
	onSubmit: (query: string) => Promise<void>;
	loading: boolean;
};

export const CustomQueryModal: React.FC<CustomQueryModalProps> = ({
	visible,
	onDismiss,
	onSubmit,
	loading,
}) => {
	const [query, setQuery] = useState("");

	const handleSubmit = useCallback(async () => {
		if (!query.trim()) return;
		await onSubmit(query);
		setQuery("");
	}, [query, onSubmit]);

	const handleDismiss = useCallback(() => {
		setQuery("");
		onDismiss();
	}, [onDismiss]);

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleDismiss}
				contentContainerStyle={styles.modalContainer}
				testID="custom-query-modal"
			>
				<View style={styles.header}>
					<Text variant="titleLarge" style={styles.title}>
						{i18n.t("PlaceGuide.askCustomQuestion")}
					</Text>
					<IconButton
						icon="close"
						size={20}
						onPress={handleDismiss}
						style={styles.closeButton}
						testID="close-modal-button"
					/>
				</View>

				<TextInput
					label={i18n.t("PlaceGuide.customQueryPlaceholder")}
					value={query}
					onChangeText={setQuery}
					mode="outlined"
					multiline
					numberOfLines={4}
					style={styles.textInput}
					disabled={loading}
					testID="custom-query-input"
				/>

				<View style={styles.buttonContainer}>
					<Button
						mode="outlined"
						onPress={handleDismiss}
						style={styles.cancelButton}
						disabled={loading}
						testID="cancel-button"
					>
						{i18n.t("Common.cancel")}
					</Button>
					<Button
						mode="contained"
						onPress={handleSubmit}
						loading={loading}
						disabled={loading || !query.trim()}
						style={styles.submitButton}
						buttonColor="#fe3764"
						testID="submit-query-button"
					>
						{i18n.t("PlaceGuide.generateGuides")}
					</Button>
				</View>
			</Modal>
		</Portal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: "white",
		margin: 20,
		borderRadius: 16,
		padding: 24,
		maxHeight: "80%",
		elevation: 8,
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 4 },
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	title: {
		flex: 1,
		fontWeight: "700",
		color: "#1a1a1a",
	},
	closeButton: {
		margin: 0,
	},
	textInput: {
		marginBottom: 24,
		backgroundColor: "#fafafa",
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 12,
	},
	cancelButton: {
		flex: 1,
		borderColor: "#e0e0e0",
	},
	submitButton: {
		flex: 1,
	},
});