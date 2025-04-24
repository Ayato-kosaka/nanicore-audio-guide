import React, { useEffect, useRef, useState } from "react";
import { View, Button, ActivityIndicator, StyleSheet, Platform, Linking, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { useRouter } from "expo-router";

import { useWithLoading } from "@/hooks/useWithLoading";
import { useLogger } from "@/hooks/useLogger";
import { useCloudFunction } from "@/hooks/useCloudFunction";
import { useSnackbar } from "@/contexts/SnackbarProvider";

import type { FindOrCreateSpotFromImageResponse } from "@shared/api/findOrCreateSpotFromImage.schema";
import { convertSupabaseToPrisma_ExtSpots } from "@shared/converters/convert_ext_spots";
import i18n from "@/lib/i18n";
import { serializeSpotGuideParams } from "@/utils/navigation";
import { useDialog } from "@/contexts/DialogProvider";

/**
 * 📸 SpotCapture 画面
 *
 * - カメラ撮影 → Cloud Function 送信 → SpotGuide へ遷移という流れを管理
 * - すべての処理でログを記録し、非同期状態をフックで制御
 * - 通信失敗時にはユーザーにエラーを通知（i18n対応）
 */
export default function SpotCapture() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const { logFrontendEvent } = useLogger();
  const { isLoading, withLoading } = useWithLoading();
  const { callCloudFunction } = useCloudFunction();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { showDialog } = useDialog();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }

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
      if (!cameraRef.current || !isCameraReady) return;

      const photo = await cameraRef.current.takePictureAsync();

      if (!photo) throw Error();

      const imageManipulatorContext = ImageManipulator.manipulate(photo.uri);
      imageManipulatorContext.resize({ width: 800 });
      const imageRef = await imageManipulatorContext.renderAsync();
      const manipulated = await imageRef.saveAsync({
        format: SaveFormat.JPEG,
        compress: 0.7,
      });

      const formData = new FormData();

      if (Platform.OS === "web") {
        const response = await fetch(manipulated.uri);
        const blob = await response.blob();
        formData.append("image", new File([blob], "upload.jpg", { type: blob.type || "image/jpeg" }));
      } else {
        formData.append("image", {
          uri: manipulated.uri,
          name: "upload.jpg",
          type: "image/jpeg",
        } as any);
      }

      const { extSpots, takenPhotoStoragePath } =
        await callCloudFunction<FormData, FindOrCreateSpotFromImageResponse>(
          "findOrCreateSpotFromImage",
          formData,
          "v1",
          true
        );

      router.push({
        pathname: "/[locale]/SpotGuide",
        params: {
          locale: i18n.locale,
          ...serializeSpotGuideParams({
            extSpots: convertSupabaseToPrisma_ExtSpots(extSpots),
            imageUri: manipulated.uri,
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
      showSnackbar(i18n.t("SpotCapture.errorMessage"));
    }
  });

  const handlePermission = async () => {
    const perm = await requestPermission();

    if (!perm.granted && !perm.canAskAgain) {
      showDialog(
        "カメラのアクセスが拒否されています",
        "カメラを使うには設定から許可が必要です。",
        () => Linking.openSettings(),
        {
          okLabel: "設定を開く"
        }
      );
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Button title={i18n.t("SpotCapture.requestPermission")} onPress={handlePermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" testID="loading-indicator" />
        ) : (
          <Button title={i18n.t("SpotCapture.captureButton")} onPress={handleCapture} testID="capture-button" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
});
