import React, { useState, useRef, useCallback, ComponentRef, useEffect } from "react";
import { View, StyleSheet, Platform, Dimensions, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Text, Button, IconButton, Searchbar, List } from "react-native-paper";
import MapView, { Marker, Region } from "@/components/MapView";
import * as Location from "expo-location";

import { useLogger } from "@/hooks/useLogger";
import { useLocale } from "@/hooks/useLocale";
import { useWithLoading } from "@/hooks/useWithLoading";
import i18n from "@/lib/i18n";
import { useCloudFunction } from "@/hooks/useCloudFunction";
import type {
	GooglePlacesAutocompleteRequest,
	GooglePlacesAutocompleteResponse,
} from "@shared/api/googlePlacesAutocomplete.schema";
import type { PlacesDetailsRequest, PlacesDetailsResponse } from "@shared/api/googlePlacesDetails.schema";

type MapLocation = {
        placeId: string;
        name: string;
        latitude: number;
        longitude: number;
        imageUrl: string;
};

const INITIAL_REGION: Region = {
	latitude: 35.6762,
	longitude: 139.6503,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

/**
 * 🗺️ PlaceMapSelect Screen
 *
 * 現在地取得や場所検索、地点選択を行い PlaceGuide 画面へ遷移する地図画面。
 * - 位置情報サービスから現在地を取得して初期表示
 * - キーワード検索や地図タップで地点を選択
 * - 選択した地点から PlaceGuide へ移動
 */
export default function MapScreen() {
	const router = useRouter();
	const locale = useLocale();
	const { callCloudFunction } = useCloudFunction();
	const { logFrontendEvent } = useLogger();
	const { isLoading, withLoading } = useWithLoading();

	const [region, setRegion] = useState<Region>(INITIAL_REGION);
	const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [predictions, setPredictions] = useState<MapLocation[]>([]);
	const mapRef = useRef<ComponentRef<typeof MapView> | null>(null);

	// Initialize with user's current location
	React.useEffect(() => {
		getCurrentLocation();
	}, []);

	/**
	 * 📍 現在地を取得して地図を更新
	 *
	 * - 位置情報の許可を確認
	 * - 成功時は地図を現在地へ移動
	 */
	const getCurrentLocation = useCallback(async () => {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				logFrontendEvent({
					event_name: "locationPermissionDenied",
					error_level: "warn",
					payload: {},
				});
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			const newRegion: Region = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.002,
				longitudeDelta: 0.002,
			};

			setRegion(newRegion);
			mapRef.current?.animateToRegion(newRegion, 1000);

			logFrontendEvent({
				event_name: "getCurrentLocationSuccess",
				error_level: "info",
				payload: { location: newRegion },
			});
		} catch (error: any) {
			logFrontendEvent({
				event_name: "getCurrentLocationFailed",
				error_level: "error",
				payload: { error: error.message },
			});
		}
	}, [logFrontendEvent]);

	/**
	 * 🔎 地名検索を実行
	 *
	 * - APIキーを保持しないため、Cloud Functions 経由でプレイス候補を取得
	 * - 検索結果は選択時まで確定しないため、地点状態はここでは更新しない
	 */
const handleSearch = useCallback(async () => {
		if (!searchQuery.trim()) return;

		setIsSearching(true);
		try {
			logFrontendEvent({
				event_name: "mapSearch",
				error_level: "info",
				payload: { query: searchQuery },
			});

                       const { predictions } = await callCloudFunction<
                               GooglePlacesAutocompleteRequest,
                               GooglePlacesAutocompleteResponse
                       >("googlePlacesAutocomplete", { input: searchQuery, languageCode: locale }, "v1");

			setPredictions(predictions);
		} catch (error: any) {
			logFrontendEvent({
				event_name: "mapSearchFailed",
				error_level: "error",
				payload: { error: error.message, query: searchQuery },
			});
		} finally {
			setIsSearching(false);
		}
}, [searchQuery, logFrontendEvent, callCloudFunction]);

       // 📝 検索欄が展開されている間は入力のたびに候補を取得する
       // - 空文字の場合は候補をクリア
       // - 300ms デバウンスでリクエスト数を抑制
       useEffect(() => {
               if (!isSearchExpanded) return;
               if (!searchQuery.trim()) {
                       setPredictions([]);
                       return;
               }
               const t = setTimeout(() => {
                       handleSearch();
               }, 300);
               return () => clearTimeout(t);
       }, [searchQuery, isSearchExpanded, handleSearch]);

	/**
	 * 🗺️ 地図ピン押下した場合
	 *
	 * - MapView からは placeId しか得られないため、Cloud Functions で詳細座標を取得
	 */
	const handlePoiPress = useCallback(
		(event: any) => {
			withLoading(async () => {
				const { placeId } = event.nativeEvent;
				if (!placeId) return;

				try {
                                       const place = await callCloudFunction<PlacesDetailsRequest, PlacesDetailsResponse>(
                                               "googlePlacesDetails",
                                               { placeId, languageCode: locale },
                                               "v1",
                                       );

					const newRegion: Region = {
						latitude: place.latitude,
						longitude: place.longitude,
						latitudeDelta: 0.002,
						longitudeDelta: 0.002,
					};
					setRegion(newRegion);
					mapRef.current?.animateToRegion(newRegion, 1000);

					setSelectedLocation({
						placeId: place.placeId,
						name: place.name,
						latitude: place.latitude,
						longitude: place.longitude,
						imageUrl: place.imageUrl,
					});

					logFrontendEvent({
						event_name: "mapLocationSelected",
						error_level: "info",
						payload: { placeId },
					});
				} catch (error: any) {
					logFrontendEvent({
						event_name: "mapLocationSelectFailed",
						error_level: "error",
						payload: { error: error.message, placeId },
					});
				}
			})();
		},
		[logFrontendEvent, callCloudFunction, withLoading],
	);

	/**
	 * 📑 オートコンプリート候補を選択したときの処理
	 *
	 * - 候補の緯度経度へ地図を移動し、次画面遷移のため選択状態を保持
	 */
	// 検索結果をユーザーが選択したタイミングで地点を確定させる
	const handlePredictionSelect = useCallback(
		(location: MapLocation) => {
			withLoading(async () => {
				try {
                                       const place = await callCloudFunction<PlacesDetailsRequest, PlacesDetailsResponse>(
                                               "googlePlacesDetails",
                                               { placeId: location.placeId, languageCode: locale },
                                               "v1",
                                       );

					const newRegion: Region = {
						latitude: place.latitude,
						longitude: place.longitude,
						latitudeDelta: 0.002,
						longitudeDelta: 0.002,
					};
					setRegion(newRegion);
					mapRef.current?.animateToRegion(newRegion, 1000);

					setSelectedLocation({
						placeId: place.placeId,
						name: place.name,
						latitude: place.latitude,
						longitude: place.longitude,
						imageUrl: place.imageUrl,
					});
					setIsSearchExpanded(false);
					setPredictions([]);

					logFrontendEvent({
						event_name: "mapLocationSelectedFromSearch",
						error_level: "info",
						payload: { placeId: location.placeId },
					});
				} catch (error: any) {
					logFrontendEvent({
						event_name: "mapLocationSelectFromSearchFailed",
						error_level: "error",
						payload: { error: error.message, placeId: location.placeId },
					});
				}
			})();
		},
		[logFrontendEvent, callCloudFunction, withLoading],
	);

	/**
	 * 🎯 「なにこれ」押下したときの処理
	 */
	const handleNanicorePress = withLoading(async () => {
		if (!selectedLocation) return;

               router.push({
                       pathname: "/[locale]/PlaceGuide",
                       params: {
                               locale,
                               placeId: selectedLocation.placeId,
                               placeName: selectedLocation.name || "Selected Location",
                               latitude: selectedLocation.latitude.toString(),
                               longitude: selectedLocation.longitude.toString(),
                               imageUrl: selectedLocation.imageUrl,
                       },
               });
       });

	/**
	 * 📸 カメラボタンを押下した時の処理
	 */
	const handleCameraPress = useCallback(() => {
		router.push(`/${locale}/SpotCapture`);

		logFrontendEvent({
			event_name: "mapCameraButtonPressed",
			error_level: "info",
			payload: {},
		});
	}, [router, locale, logFrontendEvent]);

	/**
	 * 🔍 検索ボックス押下時に検索UIを展開
	 */
	const handleSearchBoxPress = useCallback(() => {
		// ユーザーに入力欄を広げるため展開。前回の候補はクリアする
		setIsSearchExpanded(true);
		setPredictions([]);
	}, []);

	/**
	 * ❌ 検索UIを閉じる
	 */
	const handleSearchCollapse = useCallback(() => {
		setIsSearchExpanded(false);
		setSearchQuery("");
		setPredictions([]);
	}, []);

	return (
		<View style={styles.container}>
			{/* Map with minimal styling */}
			<MapView
				ref={mapRef}
				style={styles.map}
				region={region}
				onRegionChangeComplete={setRegion}
				onPoiClick={handlePoiPress}
				showsUserLocation={true}
				showsMyLocationButton={false}
				customMapStyle={mapStyle}
				testID="map-view">
				{selectedLocation && (
					<Marker
						coordinate={{
							latitude: selectedLocation.latitude,
							longitude: selectedLocation.longitude,
						}}
						title={selectedLocation.name}
						testID="selected-location-marker"
					/>
				)}
			</MapView>

			{isLoading && (
				<View style={styles.loadingOverlay}>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			)}

			{/* Bottom Container */}
			<View style={[styles.bottomContainer, isSearchExpanded && styles.expandedBottomSheet]}>
				{/* FAB Container*/}
				{!isSearchExpanded && (
					<View style={styles.fabContainer}>
						<IconButton
							icon="crosshairs-gps"
							size={32}
							onPress={getCurrentLocation}
							style={styles.locationFab}
							iconColor="#666"
							testID="location-fab"
						/>
						<IconButton
							icon="camera"
							size={32}
							mode="contained"
							containerColor="#fe3764"
							iconColor="white"
							onPress={handleCameraPress}
							style={styles.cameraFab}
							testID="camera-fab"
						/>
					</View>
				)}

				{/* Bottom Sheet */}
				<View style={styles.bottomSheet}>
					{isSearchExpanded ? (
						// Expanded Search UI
						<View style={styles.expandedSearchContainer}>
							<View style={styles.searchHeader}>
								<Text variant="titleMedium" style={styles.searchTitle}>
									Search Places
								</Text>
								<IconButton
									icon="close"
									size={20}
									onPress={handleSearchCollapse}
									style={styles.closeSearchButton}
									testID="close-search-button"
								/>
							</View>
							<Searchbar
								placeholder={i18n.t("PlaceMapSelect.searchPlaceholder")}
								onChangeText={setSearchQuery}
								value={searchQuery}
								onSubmitEditing={handleSearch}
								loading={isSearching}
								style={styles.expandedSearchBar}
								inputStyle={styles.searchInput}
								testID="expanded-search-bar"
							/>
							<FlatList
								data={predictions}
								keyExtractor={(item) => item.placeId}
								renderItem={({ item }) => (
									<List.Item
										title={item.name}
										onPress={() => handlePredictionSelect(item)}
										style={styles.predictionItem}
										titleStyle={styles.predictionTitle}
										testID="prediction-item"
									/>
								)}
								ItemSeparatorComponent={() => <View style={styles.predictionSeparator} />}
								contentContainerStyle={styles.predictionsContent}
								style={styles.predictionsList}
							/>
						</View>
					) : (
						// Collapsed Bottom Sheet UI
						<>
							{/* Instruction Text */}
							<Text variant="bodySmall" style={styles.instructionText}>
								地図をドラッグして地点を選択してください
							</Text>

							{/* Location Display Box */}
							<View style={styles.locationBox} onTouchEnd={handleSearchBoxPress}>
								<IconButton
									icon="map-marker"
									size={20}
									iconColor="#666"
									style={styles.markerIcon}
									testID="marker-icon"
								/>
								<Text variant="bodyMedium" style={styles.locationText} numberOfLines={1}>
									{selectedLocation?.name || i18n.t("PlaceMapSelect.searchPlaceholder")}
								</Text>
								<IconButton icon="magnify" size={20} iconColor="#666" style={styles.searchIcon} testID="search-icon" />
							</View>

							{/* Nanicore Button */}
							<Button
								mode="contained"
								onPress={handleNanicorePress}
								disabled={!selectedLocation}
								style={[styles.nanicoreButton, !selectedLocation && styles.disabledButton]}
								buttonColor="#fe3764"
								labelStyle={styles.nanicoreButtonLabel}
								contentStyle={styles.nanicoreButtonContent}
								testID="nanicore-button">
								なにこれ
							</Button>
						</>
					)}
				</View>
			</View>
		</View>
	);
}

// Minimal map style configuration
const mapStyle = [
	{
		featureType: "all",
		elementType: "labels.text.fill",
		stylers: [{ color: "#9ca5b3" }],
	},
	{
		featureType: "all",
		elementType: "labels.text.stroke",
		stylers: [{ visibility: "off" }],
	},
	{
		featureType: "administrative",
		elementType: "geometry.stroke",
		stylers: [{ color: "#c9c9c9" }],
	},
	{
		featureType: "administrative",
		elementType: "labels.text.fill",
		stylers: [{ color: "#444444" }],
	},
	{
		featureType: "landscape",
		elementType: "all",
		stylers: [{ color: "#f2f2f2" }],
	},
	{
		featureType: "poi",
		elementType: "all",
		stylers: [{ visibility: "off" }],
	},
	{
		featureType: "road",
		elementType: "all",
		stylers: [{ saturation: -100 }, { lightness: 45 }],
	},
	{
		featureType: "road.highway",
		elementType: "all",
		stylers: [{ visibility: "simplified" }],
	},
	{
		featureType: "road.arterial",
		elementType: "labels.icon",
		stylers: [{ visibility: "off" }],
	},
	{
		featureType: "transit",
		elementType: "all",
		stylers: [{ visibility: "off" }],
	},
	{
		featureType: "water",
		elementType: "all",
		stylers: [{ color: "#d4d4d4" }, { visibility: "on" }],
	},
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
	bottomContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
	fabContainer: {
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "flex-end",
		zIndex: 1,
		marginRight: 16,
		marginBottom: 16,
	},
	locationFab: {
		backgroundColor: "white",
		borderRadius: 28,
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.15,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 2 },
	},
	bottomSheet: {
		flex: 1,
		backgroundColor: "white",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingHorizontal: 24,
		paddingTop: 20,
		paddingBottom: Platform.OS === "ios" ? 34 : 20,
		elevation: 12,
		shadowColor: "#000",
		shadowOpacity: 0.15,
		shadowRadius: 16,
		shadowOffset: { width: 0, height: -4 },
		minHeight: 180,
	},
	expandedBottomSheet: {
		height: "90%",
		paddingTop: 32,
	},
	expandedSearchContainer: {
		flex: 1,
	},
	searchHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	searchTitle: {
		fontWeight: "600",
		color: "#1a1a1a",
	},
	closeSearchButton: {
		margin: 0,
		backgroundColor: "#f5f5f5",
		borderRadius: 20,
	},
	expandedSearchBar: {
		backgroundColor: "#f8f9fa",
		borderRadius: 16,
		elevation: 0,
	},
	searchInput: {
		fontSize: 16,
	},
	predictionsList: {
		flex: 1,
	},
	predictionsContent: {
		paddingVertical: 8,
	},
	predictionItem: {
		backgroundColor: "#fff",
		paddingVertical: 8,
	},
	predictionTitle: {
		fontSize: 16,
	},
	predictionSeparator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: "#e5e5e5",
		marginLeft: 16,
	},
	instructionText: {
		textAlign: "center",
		color: "#666",
		marginBottom: 16,
		fontSize: 13,
	},
	locationBox: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f8f9fa",
		borderRadius: 16,
		paddingHorizontal: 16,
		paddingVertical: 12,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#e9ecef",
	},
	locationText: {
		flex: 1,
		color: "#495057",
		fontSize: 15,
	},
	markerIcon: {
		margin: 0,
	},
	searchIcon: {
		margin: 0,
	},
	cameraFab: {
		elevation: 12,
		shadowColor: "#fe3764",
		shadowOpacity: 0.4,
		shadowRadius: 16,
		shadowOffset: { width: 0, height: 6 },
		borderRadius: 28,
	},
	nanicoreButton: {
		borderRadius: 20,
		elevation: 6,
		shadowColor: "#fe3764",
		shadowOpacity: 0.3,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 6 },
	},
	disabledButton: {
		backgroundColor: "#e9ecef",
		elevation: 0,
		shadowOpacity: 0,
	},
	nanicoreButtonContent: {
		paddingVertical: 8,
	},
	nanicoreButtonLabel: {
		fontSize: 18,
		fontWeight: "600",
		letterSpacing: 0.5,
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
});
