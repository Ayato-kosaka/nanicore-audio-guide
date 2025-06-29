import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, StyleSheet, Platform, TouchableOpacity, Dimensions } from "react-native";
import { CameraType, CameraView, FlashMode, useCameraPermissions } from "expo-camera";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { IconButton, Text, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import {
	GestureEvent,
	PinchGestureHandler,
	PinchGestureHandlerEventPayload,
	State,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { useWithLoading } from "@/hooks/useWithLoading";
import { useLogger } from "@/hooks/useLogger";
import { useDialog } from "@/contexts/DialogProvider";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import i18n from "@/lib/i18n";

const { width, height } = Dimensions.get("window");

const MAX_ZOOM = 1;
const MIN_ZOOM = 0;

/**
 * 📸 CameraScreen
 *
 * Instagram Stories風のフルスクリーンカメラインターフェース。
 * PlaceGuide機能内で使用され、撮影した画像をハンドラーに渡す。
 */

export type CameraScreenProps = {
	visible: boolean;
	onClose: () => void;
	onCapture: (imageUri: string) => Promise<void>;
};

export const CameraScreen: React.FC<CameraScreenProps> = ({ visible, onClose, onCapture }) => {
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef<CameraView>(null);
	const [isCameraReady, setIsCameraReady] = useState(false);
	const [facing, setFacing] = useState<CameraType>("back");
	const [flash, setFlash] = useState<FlashMode>("off");
	const [zoom, setZoom] = useState(0.01);
	const [filter, setFilter] = useState<"none" | "sepia" | "mono" | "chrome">("none");
	const startZoomRef = useRef(0);

	const { logFrontendEvent } = useLogger();
	const { isLoading, withLoading } = useWithLoading();
	const { showDialog } = useDialog();
	const { showSnackbar } = useSnackbar();

	useEffect(() => {
		if (visible && !permission?.granted) {
			requestPermission();
		}

		if (visible) {
			logFrontendEvent({
				event_name: "PlaceCameraScreenMounted",
				error_level: "info",
				payload: {},
			});
		}
	}, [visible, permission?.granted]);

	/**
	 * 📷 写真撮影とハンドラー呼び出し
	 */
	const handleCapture = withLoading(async () => {
		logFrontendEvent({
			event_name: "onPressPlaceCapture",
			error_level: "info",
			payload: { filter, facing, flash },
		});

		try {
			if (!cameraRef.current || !isCameraReady) {
				showSnackbar(i18n.t("PlaceGuide.cameraNotReady"));
				return;
			}

			const photo = await cameraRef.current.takePictureAsync({
				quality: 0.8,
				base64: false,
			});

			if (!photo) {
				throw new Error("Failed to capture photo");
			}

			// 画像の最適化処理
			const imageManipulatorContext = ImageManipulator.manipulate(photo.uri);
			imageManipulatorContext.resize({ width: 1024 });

			// フィルター適用
			if (filter !== "none") {
				switch (filter) {
					case "sepia":
						imageManipulatorContext.sepia();
						break;
					case "mono":
						imageManipulatorContext.grayscale();
						break;
					case "chrome":
						imageManipulatorContext.saturate(1.5);
						break;
				}
			}

			const imageRef = await imageManipulatorContext.renderAsync();
			const manipulated = await imageRef.saveAsync({
				format: SaveFormat.JPEG,
				compress: 0.7,
			});

			await onCapture(manipulated.uri);

			logFrontendEvent({
				event_name: "placeCaptureSuccess",
				error_level: "info",
				payload: { filter, facing, flash },
			});
		} catch (error: any) {
			logFrontendEvent({
				event_name: "placeCaptureFailed",
				error_level: "error",
				payload: { message: error.message, filter, facing, flash },
			});
			showSnackbar(i18n.t("PlaceGuide.captureError"));
		}
	});

	/**
	 * 🔄 カメラ切り替え
	 */
	const handleFlipCamera = useCallback(() => {
		setFacing(current => current === "back" ? "front" : "back");
		logFrontendEvent({
			event_name: "placeCameraFlip",
			error_level: "info",
			payload: { newFacing: facing === "back" ? "front" : "back" },
		});
	}, [facing]);

	/**
	 * ⚡ フラッシュ切り替え
	 */
	const handleFlashToggle = useCallback(() => {
		setFlash(current => current === "off" ? "on" : "off");
		logFrontendEvent({
			event_name: "placeCameraFlash",
			error_level: "info",
			payload: { newFlash: flash === "off" ? "on" : "off" },
		});
	}, [flash]);

	/**
	 * 🎨 フィルター切り替え
	 */
	const handleFilterChange = useCallback(() => {
		const filters: typeof filter[] = ["none", "sepia", "mono", "chrome"];
		const currentIndex = filters.indexOf(filter);
		const nextFilter = filters[(currentIndex + 1) % filters.length];
		setFilter(nextFilter);
		
		logFrontendEvent({
			event_name: "placeCameraFilter",
			error_level: "info",
			payload: { newFilter: nextFilter },
		});
	}, [filter]);

	/**
	 * 🔍 ピンチズーム処理
	 */
	const onPinchGestureEvent = useCallback((event: GestureEvent<PinchGestureHandlerEventPayload>) => {
		const { scale, state } = event.nativeEvent;

		if (state === State.BEGAN || state === State.ACTIVE) {
			const SENSITIVITY = 0.2;
			let delta = (scale - 1) * SENSITIVITY;
			let newZoom = startZoomRef.current + delta;
			newZoom = Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
			setZoom(newZoom);
		}

		if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
			startZoomRef.current = zoom;
		}
	}, [zoom]);

	const onPinchHandlerStateChange = useCallback(({ nativeEvent }: GestureEvent<PinchGestureHandlerEventPayload>) => {
		if (nativeEvent.state === State.BEGAN) {
			startZoomRef.current = zoom;
		}
	}, [zoom]);

	/**
	 * 🔐 権限処理
	 */
	const handlePermissionRequest = async () => {
		const perm = await requestPermission();

		if (!perm.granted && !perm.canAskAgain) {
			showDialog(i18n.t("PlaceGuide.cameraPermissionMessage"), {
				title: i18n.t("PlaceGuide.cameraPermissionTitle"),
				onConfirm: onClose,
				okLabel: i18n.t("Common.ok"),
			});
		}
	};

	/**
	 * フィルター名の表示用
	 */
	const getFilterDisplayName = (filterType: typeof filter): string => {
		switch (filterType) {
			case "none": return "Normal";
			case "sepia": return "Sepia";
			case "mono": return "B&W";
			case "chrome": return "Vivid";
			default: return "Normal";
		}
	};

	if (!visible) return null;

	if (!permission?.granted) {
		return (
			<View style={styles.permissionContainer}>
				<LinearGradient colors={["#1a1a1a", "#2d2d2d"]} style={styles.permissionGradient}>
					<Ionicons name="camera-outline" size={64} color="white" style={styles.permissionIcon} />
					<Text variant="headlineSmall" style={styles.permissionTitle}>
						{i18n.t("PlaceGuide.cameraPermissionTitle")}
					</Text>
					<Text variant="bodyMedium" style={styles.permissionMessage}>
						{i18n.t("PlaceGuide.cameraPermissionMessage")}
					</Text>
					<Button 
						mode="contained" 
						onPress={handlePermissionRequest}
						style={styles.permissionButton}
						buttonColor="#fe3764"
					>
						{i18n.t("PlaceGuide.allowCamera")}
					</Button>
					<Button 
						mode="text" 
						onPress={onClose}
						style={styles.permissionCloseButton}
						textColor="rgba(255,255,255,0.7)"
					>
						{i18n.t("Common.cancel")}
					</Button>
				</LinearGradient>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<PinchGestureHandler onGestureEvent={onPinchGestureEvent} onHandlerStateChange={onPinchHandlerStateChange}>
				<CameraView
					ref={cameraRef}
					style={StyleSheet.absoluteFill}
					onCameraReady={() => setIsCameraReady(true)}
					autofocus="on"
					facing={facing}
					zoom={zoom}
					flash={flash}
					testID="place-camera-view"
				/>
			</PinchGestureHandler>

			{/* ヘッダーコントロール */}
			<LinearGradient colors={["rgba(0,0,0,0.6)", "transparent"]} style={styles.headerGradient}>
				<View style={styles.headerControls}>
					<TouchableOpacity onPress={onClose} style={styles.closeButton} testID="close-camera-button">
						<Ionicons name="close" size={28} color="white" />
					</TouchableOpacity>
					
					<View style={styles.headerRightControls}>
						<TouchableOpacity onPress={handleFlashToggle} style={styles.controlButton}>
							<Ionicons 
								name={flash === "on" ? "flash" : "flash-off"} 
								size={24} 
								color="white" 
							/>
						</TouchableOpacity>
						
						<TouchableOpacity onPress={handleFlipCamera} style={styles.controlButton}>
							<Ionicons name="camera-reverse" size={24} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			</LinearGradient>

			{/* フッターコントロール */}
			<LinearGradient colors={["transparent", "rgba(0,0,0,0.6)"]} style={styles.footerGradient}>
				<View style={styles.footerControls}>
					{/* フィルター選択 */}
					<TouchableOpacity onPress={handleFilterChange} style={styles.filterButton}>
						<View style={[styles.filterPreview, { opacity: filter === "none" ? 0.5 : 1 }]}>
							<Text style={styles.filterText}>{getFilterDisplayName(filter)}</Text>
						</View>
					</TouchableOpacity>

					{/* 撮影ボタン */}
					<TouchableOpacity 
						onPress={handleCapture} 
						disabled={isLoading || !isCameraReady}
						style={[styles.captureButton, (isLoading || !isCameraReady) && styles.captureButtonDisabled]}
						testID="place-capture-button"
					>
						<View style={styles.captureButtonInner}>
							<Text style={styles.captureButtonText}>なにこれ</Text>
						</View>
					</TouchableOpacity>

					{/* ズーム表示 */}
					<View style={styles.zoomIndicator}>
						<Text style={styles.zoomText}>{(zoom * 10 + 1).toFixed(1)}x</Text>
					</View>
				</View>
			</LinearGradient>

			{/* グリッドオーバーレイ */}
			<View style={styles.gridOverlay} pointerEvents="none">
				<View style={[styles.gridLine, styles.gridLineHorizontal, { top: "33.3%" }]} />
				<View style={[styles.gridLine, styles.gridLineHorizontal, { top: "66.6%" }]} />
				<View style={[styles.gridLine, styles.gridLineVertical, { left: "33.3%" }]} />
				<View style={[styles.gridLine, styles.gridLineVertical, { left: "66.6%" }]} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	permissionContainer: {
		flex: 1,
		backgroundColor: "black",
	},
	permissionGradient: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 32,
	},
	permissionIcon: {
		marginBottom: 24,
		opacity: 0.8,
	},
	permissionTitle: {
		color: "white",
		textAlign: "center",
		marginBottom: 16,
		fontWeight: "600",
	},
	permissionMessage: {
		color: "rgba(255,255,255,0.8)",
		textAlign: "center",
		marginBottom: 32,
		lineHeight: 22,
	},
	permissionButton: {
		marginBottom: 16,
		borderRadius: 25,
		paddingHorizontal: 32,
	},
	permissionCloseButton: {
		borderRadius: 20,
	},
	headerGradient: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 120,
		zIndex: 10,
	},
	headerControls: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: Platform.select({ ios: 50, android: 40, default: 40 }),
		paddingHorizontal: 20,
	},
	closeButton: {
		backgroundColor: "rgba(0,0,0,0.3)",
		borderRadius: 25,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	headerRightControls: {
		flexDirection: "row",
		gap: 12,
	},
	controlButton: {
		backgroundColor: "rgba(0,0,0,0.3)",
		borderRadius: 25,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	footerGradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 200,
		zIndex: 10,
	},
	footerControls: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		paddingBottom: Platform.select({ ios: 40, android: 30, default: 30 }),
		paddingHorizontal: 30,
	},
	filterButton: {
		alignItems: "center",
		minWidth: 60,
	},
	filterPreview: {
		backgroundColor: "rgba(255,255,255,0.2)",
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.3)",
	},
	filterText: {
		color: "white",
		fontSize: 12,
		fontWeight: "500",
	},
	captureButton: {
		backgroundColor: "#fe3764",
		borderRadius: 40,
		width: 80,
		height: 80,
		justifyContent: "center",
		alignItems: "center",
		elevation: 8,
		shadowColor: "#fe3764",
		shadowOpacity: 0.4,
		shadowRadius: 16,
		shadowOffset: { width: 0, height: 4 },
	},
	captureButtonDisabled: {
		backgroundColor: "rgba(254, 55, 100, 0.5)",
		elevation: 0,
		shadowOpacity: 0,
	},
	captureButtonInner: {
		backgroundColor: "white",
		borderRadius: 35,
		width: 70,
		height: 70,
		justifyContent: "center",
		alignItems: "center",
	},
	captureButtonText: {
		color: "#fe3764",
		fontSize: 14,
		fontWeight: "700",
		letterSpacing: 0.5,
	},
	zoomIndicator: {
		alignItems: "center",
		minWidth: 60,
	},
	zoomText: {
		color: "white",
		fontSize: 14,
		fontWeight: "500",
		backgroundColor: "rgba(0,0,0,0.3)",
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	gridOverlay: {
		...StyleSheet.absoluteFillObject,
		zIndex: 5,
	},
	gridLine: {
		position: "absolute",
		backgroundColor: "rgba(255,255,255,0.2)",
	},
	gridLineHorizontal: {
		left: 0,
		right: 0,
		height: 1,
	},
	gridLineVertical: {
		top: 0,
		bottom: 0,
		width: 1,
	},
});