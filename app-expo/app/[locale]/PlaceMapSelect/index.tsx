import React, { useState, useRef, useCallback, ComponentRef } from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Text, Button, IconButton, Searchbar } from "react-native-paper";
import MapView, { Marker, Region } from "@/components/MapView";
import * as Location from "expo-location";

import { useLogger } from "@/hooks/useLogger";
import { useLocale } from "@/hooks/useLocale";
import { useWithLoading } from "@/hooks/useWithLoading";
import i18n from "@/lib/i18n";
import { useCloudFunction } from "@/hooks/useCloudFunction";

type MapLocation = {
	latitude: number;
	longitude: number;
	name?: string;
	placeId?: string;
};

const INITIAL_REGION: Region = {
	latitude: 35.6762,
	longitude: 139.6503,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

/**
 * 🗺️ MapScreen
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
	 * - 入力キーワードをジオコーディング
	 * - 成功時は地図を移動し選択地点を更新
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

			// Use Expo Location for geocoding
			const geocoded = await Location.geocodeAsync(searchQuery);

			if (geocoded.length > 0) {
				const location = geocoded[0];
				const newRegion: Region = {
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				};

				setRegion(newRegion);
				mapRef.current?.animateToRegion(newRegion, 1000);

				setSelectedLocation({
					latitude: location.latitude,
					longitude: location.longitude,
					name: searchQuery,
				});

				setIsSearchExpanded(false);
			}
		} catch (error: any) {
			logFrontendEvent({
				event_name: "mapSearchFailed",
				error_level: "error",
				payload: { error: error.message, query: searchQuery },
			});
		} finally {
			setIsSearching(false);
		}
	}, [searchQuery, logFrontendEvent]);

	/**
	 * 🗺️ 地図上をタップしたときの処理
	 *
	 * - 座標を選択し選択地点として保存
	 * - ログに位置を記録
	 */
	const handleMapPress = useCallback(
		(event: any) => {
			const { coordinate } = event.nativeEvent;
			const location: MapLocation = {
				latitude: coordinate.latitude,
				longitude: coordinate.longitude,
				name: `${coordinate.latitude.toFixed(4)}, ${coordinate.longitude.toFixed(4)}`,
			};

			setSelectedLocation(location);

			logFrontendEvent({
				event_name: "mapLocationSelected",
				error_level: "info",
				payload: { location },
			});
		},
		[logFrontendEvent],
	);

	/**
	 * 🎯 選択した地点から PlaceGuide へ遷移
	 */
	const handleLocationSelect = withLoading(async () => {
		if (!selectedLocation) return;

		// Generate a mock place ID for navigation
		const placeId = `place_${selectedLocation.latitude}_${selectedLocation.longitude}`;

		// const { extPlaces } = await callCloudFunction<{ placeId: string }, FindOrCreatePlaceFromIdResponse>(
		// 	"findOrCreatePlaceFromId",
		// 	{ placeId },
		// 	"v1",
		// );

		router.push({
			pathname: "/[locale]/PlaceGuide",
			params: {
				locale,
				placeId,
				placeName: selectedLocation.name || "Selected Location",
				latitude: selectedLocation.latitude.toString(),
				longitude: selectedLocation.longitude.toString(),
			},
		});
	});

	/**
	 * 📸 撮影画面へ遷移
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
		setIsSearchExpanded(true);
	}, []);

	/**
	 * ❌ 検索UIを閉じる
	 */
	const handleSearchCollapse = useCallback(() => {
		setIsSearchExpanded(false);
		setSearchQuery("");
	}, []);

	return (
		<View style={styles.container}>
			{/* Map with minimal styling */}
			<MapView
				ref={mapRef}
				style={styles.map}
				region={region}
				onRegionChangeComplete={setRegion}
				onPress={handleMapPress}
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
								placeholder={i18n.t("Map.searchPlaceholder")}
								onChangeText={setSearchQuery}
								value={searchQuery}
								onSubmitEditing={handleSearch}
								loading={isSearching}
								style={styles.expandedSearchBar}
								inputStyle={styles.searchInput}
								testID="expanded-search-bar"
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
									{selectedLocation?.name || i18n.t("Map.searchPlaceholder")}
								</Text>
								<IconButton icon="magnify" size={20} iconColor="#666" style={styles.searchIcon} testID="search-icon" />
							</View>

							{/* Nanicore Button */}
							<Button
								mode="contained"
								onPress={handleLocationSelect}
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
});
