import React, { useEffect } from "react";
import { View, Button, ActivityIndicator, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import { useWithLoading } from "@/hooks/useWithLoading";
import { useLogger } from "@/hooks/useLogger";
import { useCloudFunction } from "@/hooks/useCloudFunction";
import type { FindOrCreateSpotFromImageResponse } from "@shared/api/findOrCreateSpotFromImage.schema";
import { convertSupabaseToPrisma_ExtSpots } from "@shared/converters/convert_ext_spots";
import i18n from "@/lib/i18n";
import { serializeSpotGuideParams } from "@/utils/navigation";
import { useSnackbar } from "@/contexts/SnackbarProvider";

/**
 * 📸 SpotCapture 画面
 *
 * - カメラ撮影 → Cloud Function 送信 → SpotGuide へ遷移という流れを管理
 * - すべての処理でログを記録し、非同期状態をフックで制御
 * - 通信失敗時にはユーザーにエラーを通知（i18n対応）
 */
export default function SpotCapture() {
  const { logFrontendEvent } = useLogger();
  const { isLoading, withLoading } = useWithLoading();
  const { callCloudFunction } = useCloudFunction();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    logFrontendEvent({
      event_name: "SpotCaptureMounted",
      error_level: "info",
      payload: {},
    });
  }, []);

  /**
   * 📷 カメラ撮影〜Cloud Function呼び出し〜画面遷移までのメイン処理
   */
  const handleCapture = withLoading(async () => {
    logFrontendEvent({
      event_name: "onPressCapture",
      error_level: "info",
      payload: {},
    });

    try {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        base64: false,
      });

      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];

      const formData = new FormData();
      if (Platform.OS === "web") {
        const response = await fetch(asset.uri);
        const blob = await response.blob();

        formData.append("image", new File([blob], asset.fileName ?? "upload.jpg", {
          type: blob.type || "image/jpeg",
        }));
      } else {
        const uri = asset.uri.startsWith("file://") ? asset.uri : `file://${asset.uri}`;
        const file: any = {
          uri,
          name: asset.fileName ?? "upload.jpg",
          type: "image/jpeg",
        };
        formData.append("image", file);
      }

      const { extSpots, uploadedUri, takenPhotoStoragePath } =
        await callCloudFunction<FormData, FindOrCreateSpotFromImageResponse>(
          "findOrCreateSpotFromImage",
          formData,
          "v1",
          true // isMultipart
        );

      router.push({
        pathname: "/[locale]/SpotGuide",
        params: {
          locale: i18n.locale,
          ...serializeSpotGuideParams({
            extSpots: convertSupabaseToPrisma_ExtSpots(extSpots),
            imageUri: uploadedUri,
            takenPhotoStoragePath,
          })
        }
      });
    } catch (error: any) {
      logFrontendEvent({
        event_name: "captureFailed",
        error_level: "error",
        payload: { message: error.message },
      });
      showSnackbar(i18n.t("SpotCapture.errorMessage"));
    }
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" testID="loading-indicator" />
      ) : (
        <Button
          title={i18n.t("SpotCapture.captureButton")}
          onPress={handleCapture}
          testID="capture-button"
        />
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