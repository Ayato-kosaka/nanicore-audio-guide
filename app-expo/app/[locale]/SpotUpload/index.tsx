import React, { useEffect } from "react";
import { View, Button, ActivityIndicator, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { useRouter } from "expo-router";

import { useWithLoading } from "@/hooks/useWithLoading";
import { useLogger } from "@/hooks/useLogger";
import { useCloudFunction } from "@/hooks/useCloudFunction";
import type { FindOrCreateSpotFromImageResponse } from "@shared/api/findOrCreateSpotFromImage.schema";
import { convertSupabaseToPrisma_ExtSpots } from "@shared/converters/convert_ext_spots";
import i18n from "@/lib/i18n";
import { serializeSpotGuideParams } from "@/utils/navigation";
import { useSnackbar } from "@/contexts/SnackbarProvider";

export default function SpotUpload() {
	const { logFrontendEvent } = useLogger();
	const { isLoading, withLoading } = useWithLoading();
	const { callCloudFunction } = useCloudFunction();
	const router = useRouter();
	const { showSnackbar } = useSnackbar();

	useEffect(() => {
		(async () => {
			const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

			if (cameraStatus !== "granted") {
				showSnackbar(i18n.t("SpotUpload.permissionDeniedMessage"));
			}
		})();

		logFrontendEvent({
			event_name: "SpotCaptureMounted",
			error_level: "info",
			payload: {},
		});
	}, []);

	const handleCapture = withLoading(async () => {
		logFrontendEvent({
			event_name: "onPressCapture",
			error_level: "info",
			payload: {},
		});

		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				quality: 0.7,
				base64: false,
			});

			if (result.canceled || !result.assets?.[0]) return;

			const imageManipulatorContext = ImageManipulator.manipulate(result.assets[0].uri);
			imageManipulatorContext.resize({ width: 800 });
			const imageRef = await imageManipulatorContext.renderAsync();
			const asset = await imageRef.saveAsync({
				format: SaveFormat.JPEG,
				compress: 0.7,
			});

			const formData = new FormData();
			if (Platform.OS === "web") {
				const response = await fetch(asset.uri);
				const blob = await response.blob();

				formData.append(
					"image",
					new File([blob], result.assets[0].fileName ?? "upload.jpg", {
						type: blob.type || "image/jpeg",
					}),
				);
			} else {
				const uri = asset.uri.startsWith("file://") ? asset.uri : `file://${asset.uri}`;
				const file: any = {
					uri,
					name: result.assets[0].fileName ?? "upload.jpg",
					type: "image/jpeg",
				};
				formData.append("image", file);
			}

			const { extSpots, takenPhotoStoragePath } = await callCloudFunction<FormData, FindOrCreateSpotFromImageResponse>(
				"findOrCreateSpotFromImage",
				formData,
				"v1",
				true, // isMultipart
			);

			router.push({
				pathname: "/[locale]/SpotGuide",
				params: {
					locale: i18n.locale,
					...serializeSpotGuideParams({
						extSpots: convertSupabaseToPrisma_ExtSpots(extSpots),
						imageUri: asset.uri,
						takenPhotoStoragePath,
					}),
				},
			});
		} catch (error: any) {
			logFrontendEvent({
				event_name: "captureFailed",
				error_level: "error",
				payload: { message: error.message },
			});
			showSnackbar(i18n.t("SpotUpload.errorMessage"));
		}
	});

	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator size="large" testID="loading-indicator" />
			) : (
				<Button title={i18n.t("SpotUpload.uploadButton")} onPress={handleCapture} testID="capture-button" />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
