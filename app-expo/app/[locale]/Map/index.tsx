import React, { useState, useRef, useCallback } from "react";
import { View, StyleSheet, Platform, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Searchbar, FAB } from "react-native-paper";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";

import { useLogger } from "@/hooks/useLogger";
import { useLocale } from "@/hooks/useLocale";
import i18n from "@/lib/i18n";
import { useSnackbar } from "@/contexts/SnackbarProvider";

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

export default function MapScreen() {
	const router = useRouter();
	const locale = useLocale();
	const { logFrontendEvent } = useLogger();
	const { showSnackbar } = useSnackbar();

	const [searchQuery, setSearchQuery] = useState("");
	const [region, setRegion] = useState<Region>(INITIAL_REGION);
	const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
	const [isSearching, setIsSearching] = useState(false);
	const mapRef = useRef<MapView>(null);

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
			} else {
				showSnackbar(i18n.t("Map.noResultsFound"));
			}
		} catch (error: any) {
			logFrontendEvent({
				event_name: "mapSearchFailed",
				error_level: "error",
				payload: { error: error.message, query: searchQuery },
			});
			showSnackbar(i18n.t("Map.searchError"));
		} finally {
			setIsSearching(false);
		}
	}, [searchQuery, logFrontendEvent, showSnackbar]);

	const handleMapPress = useCallback((event: any) => {
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
	}, [logFrontendEvent]);

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

	const getCurrentLocation = useCallback(async () => {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				showSnackbar(i18n.t("Map.locationPermissionDenied"));
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
				event_name: "getCurrentLocation",
				error_level: "info",
				payload: { location: newRegion },
			});
		} catch (error: any) {
			logFrontendEvent({
				event_name: "getCurrentLocationFailed",
				error_level: "error",
				payload: { error: error.message },
			});
			showSnackbar(i18n.t("Map.locationError"));
		}
	}, [logFrontendEvent, showSnackbar]);

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<Searchbar
					placeholder={i18n.t("Map.searchPlaceholder")}
					onChangeText={setSearchQuery}
					value={searchQuery}
					onSubmitEditing={handleSearch}
					loading={isSearching}
					style={styles.searchBar}
					testID="map-search-bar"
				/>
			</View>

			<MapView
				ref={mapRef}
				style={styles.map}
				region={region}
				onRegionChangeComplete={setRegion}
				onPress={handleMapPress}
				showsUserLocation={true}
				showsMyLocationButton={false}
				testID="map-view"
			>
				{selectedLocation && (
					<Marker
						coordinate={{
							latitude: selectedLocation.latitude,
							longitude: selectedLocation.longitude,
						}}
						title={selectedLocation.name}
						onPress={handleLocationSelect}
						testID="selected-location-marker"
					/>
				)}
			</MapView>

			<View style={styles.fabContainer}>
				<FAB
					icon="crosshairs-gps"
					onPress={getCurrentLocation}
					style={[styles.fab, styles.locationFab]}
					testID="location-fab"
				/>
				<FAB
					icon="camera"
					onPress={handleCameraPress}
					style={[styles.fab, styles.cameraFab]}
					testID="camera-fab"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchContainer: {
		position: "absolute",
		top: Platform.OS === "ios" ? 60 : 40,
		left: 16,
		right: 16,
		zIndex: 1,
	},
	searchBar: {
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 2 },
	},
	map: {
		flex: 1,
	},
	fabContainer: {
		position: "absolute",
		bottom: 32,
		right: 16,
		gap: 16,
	},
	fab: {
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 2 },
	},
	locationFab: {
		backgroundColor: "white",
	},
	cameraFab: {
		backgroundColor: "#fe3764",
	},
});