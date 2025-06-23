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

type MapLocation = {
	latitude: number;
	longitude: number;
	name?: string;
	placeId?: string;
};

const { width, height } = Dimensions.get("window");

const INITIAL_REGION: Region = {
	latitude: 35.6762,
	longitude: 139.6503,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

export default function MapScreen() {
	const router = useRouter();
	const locale = useLocale();
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
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
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

	const handleLocationSelect = useCallback(() => {
		if (!selectedLocation) return;

		// Generate a mock place ID for navigation
		const mockPlaceId = `place_${selectedLocation.latitude}_${selectedLocation.longitude}`;

		router.push({
			pathname: "/[locale]/PlaceGuide",
			params: {
				locale,
				placeId: mockPlaceId,
				placeName: selectedLocation.name || "Selected Location",
				latitude: selectedLocation.latitude.toString(),
				longitude: selectedLocation.longitude.toString(),
			},
		});
	}, [selectedLocation, router, locale]);

	const handleCameraPress = useCallback(() => {
		router.push(`/${locale}/SpotCapture`);

		logFrontendEvent({
			event_name: "mapCameraButtonPressed",
			error_level: "info",
			payload: {},
		});
	}, [router, locale, logFrontendEvent]);

	const handleSearchBoxPress = useCallback(() => {
		setIsSearchExpanded(true);
	}, []);

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

			{/* FAB Container - Top left */}
			<View style={styles.fabContainer}>
				<IconButton
					icon="crosshairs-gps"
					onPress={getCurrentLocation}
					style={styles.locationFab}
					iconColor="#666"
					testID="location-fab"
				/>
			</View>

			{/* Bottom Sheet */}
			<View style={[styles.bottomSheet, isSearchExpanded && styles.expandedBottomSheet]}>
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
							<Text variant="bodyMedium" style={styles.locationText} numberOfLines={1}>
								{selectedLocation?.name || i18n.t("Map.searchPlaceholder")}
							</Text>
							<IconButton
								icon="magnify"
								size={20}
								iconColor="#666"
								style={styles.searchIcon}
								testID="search-icon"
							/>
						</View>

						{/* Camera Button */}
						<IconButton
							icon="camera"
							size={20}
							mode="contained"
							containerColor="#fe3764"
							iconColor="white"
							onPress={handleCameraPress}
							style={styles.cameraFab}
							testID="camera-fab"
						/>

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
	fabContainer: {
		position: "absolute",
		top: Platform.OS === "ios" ? 60 : 40,
		left: 16,
		zIndex: 1,
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
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
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
	searchIcon: {
		margin: 0,
	},
	cameraFab: {
		alignSelf: "flex-end",
		marginBottom: 16,
		borderRadius: 24,
		elevation: 4,
		shadowColor: "#fe3764",
		shadowOpacity: 0.3,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
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