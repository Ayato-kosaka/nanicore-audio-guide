import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Platform, Linking, TouchableOpacity } from "react-native";
import { CameraType, CameraView, FlashMode, useCameraPermissions } from "expo-camera";
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
import { GestureEvent, PinchGestureHandler, PinchGestureHandlerEventPayload, State } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const MAX_ZOOM = 1 // expo-camera zoom is between 0 - 1
const MIN_ZOOM = 0

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
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [zoom, setZoom] = useState(0.01);
  const startZoomRef = useRef(0);

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

  const onPinchGestureEvent = (event: GestureEvent<PinchGestureHandlerEventPayload>) => {
    const { scale, state } = event.nativeEvent
  
    if (state === State.BEGAN || state === State.ACTIVE) {
      const SENSITIVITY = 0.2 // 拡大スピード係数
  
      // 差分に基づいたリニア補間
      let delta = (scale - 1) * SENSITIVITY
      let newZoom = startZoomRef.current + delta
  
  
      // クランプして範囲内に制限
      newZoom = Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM)
      setZoom(newZoom)
    }
  
    if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
      startZoomRef.current = zoom
    }
  }
  
  const onPinchHandlerStateChange = ({ nativeEvent }: GestureEvent<PinchGestureHandlerEventPayload>) => {
    if (nativeEvent.state === State.BEGAN) {
      startZoomRef.current = zoom
    }
  }

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
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}
      >
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          onCameraReady={() => setIsCameraReady(true)}
          autofocus={'on'}
          facing={facing}
          zoom={zoom}
          flash={flash}
        />
      </PinchGestureHandler>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setFacing(facing === 'back' ? 'front' : 'back')} style={styles.iconButton}>
          <Ionicons name="camera-reverse" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFlash(flash === 'off' ? 'on' : 'off')} style={styles.iconButton}>
          <Ionicons name={flash === 'on' ? 'flash' : 'flash-off'} size={24} color="white" />
        </TouchableOpacity>
      </View>
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
        <Button
          mode="contained"
          onPress={handleCapture}
          style={styles.button}
          contentStyle={styles.buttonContent}
          buttonColor="white"
          textColor="rgba(0,0,0,0.6)"
          labelStyle={styles.buttonLabel}
          testID="capture-button"
        > 
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
  buttonContent: {
  },
  button: {
      position: "absolute",
      alignSelf: 'center',
      bottom: 100,
      marginHorizontal: 32,
      borderRadius: 50,
      borderColor: 'white',
      shadowColor: '#000',
      shadowOpacity: 0.95,
      shadowRadius: 30,
      shadowOffset: { width: 0, height: 0 },
  },
  buttonLabel: {
      fontSize: 32,
      lineHeight: 48,
  },
  controls: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'column',
    gap: 16,
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
