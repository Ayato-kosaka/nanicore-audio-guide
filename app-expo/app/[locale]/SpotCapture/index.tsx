import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Platform, Linking } from "react-native";
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
import { Button } from "react-native-paper";

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
            imageUri: photo.uri,
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
        i18n.t("SpotCapture.permissionDialog.title"),
        i18n.t("SpotCapture.permissionDialog.message"),
        () => Linking.openSettings(),
        {
          okLabel: i18n.t("SpotCapture.permissionDialog.okLabel")
        }
      );
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Button mode="elevated" onPress={handlePermission}>
          {i18n.t("SpotCapture.requestPermission")}
        </Button>
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
      <View style={styles.gridOverlay}>
        {/* 横線 */}
        <View style={styles.gridLineHorizontal} />
        <View style={[styles.gridLineHorizontal, { top: '66.6%' }]} />
        <View style={[styles.gridLineHorizontal, { top: '33.3%' }]} />
        {/* 縦線 */}
        <View style={styles.gridLineVertical} />
        <View style={[styles.gridLineVertical, { left: '66.6%' }]} />
        <View style={[styles.gridLineVertical, { left: '33.3%' }]} />
      </View>
      {isLoading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" testID="loading-indicator" />
        </View>
      ) : (
        <Button mode="contained" onPress={handleCapture} testID="capture-button" style={styles.button}>
          {i18n.t("SpotCapture.captureButton")}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  button: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    zIndex: 5,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    top: '50%',
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    left: '50%',
  },
});
