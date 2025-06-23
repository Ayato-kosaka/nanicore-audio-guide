import React from "react";
import { GoogleMap, Marker as GoogleMarker, LoadScript } from "@react-google-maps/api";
import type { MapViewProps, MarkerProps } from "./MapView";
import type { MapPressEvent, MarkerPressEvent } from "react-native-maps";

interface RegionChangeDetails {
	isGesture: boolean;
}

export const Marker: React.FC<MarkerProps> = ({ coordinate, title, onPress, testID }) => {
	const handleClick = React.useCallback(
		(e: google.maps.MapMouseEvent) => {
			if (!onPress || !e.latLng) return;
			const event = {
				nativeEvent: {
					id: testID ?? "",
					action: "marker-press",
					coordinate: {
						latitude: e.latLng.lat(),
						longitude: e.latLng.lng(),
					},
				},
			} as unknown as MarkerPressEvent;
			onPress(event);
		},
		[onPress, testID],
	);

	return (
		<GoogleMarker
			position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
			title={title}
			onClick={handleClick}
			options={{}}
		/>
	);
};

const MapView = React.forwardRef<google.maps.Map | null, MapViewProps>(
	({ style, region, onRegionChangeComplete, onPress, children }, ref) => {
		const handleLoad = React.useCallback(
			(map: google.maps.Map) => {
				if (typeof ref === "function") {
					ref(map);
				} else if (ref) {
					(ref as React.MutableRefObject<google.maps.Map | null>).current = map;
				}
			},
			[ref],
		);

		const handleIdle = React.useCallback(() => {
			if (onRegionChangeComplete && ref && typeof ref !== "function") {
				const map = (ref as React.MutableRefObject<google.maps.Map | null>).current;
				if (map) {
					const center = map.getCenter();
					if (center) {
						const eventRegion = {
							latitude: center.lat(),
							longitude: center.lng(),
							latitudeDelta: region?.latitudeDelta ?? 0,
							longitudeDelta: region?.longitudeDelta ?? 0,
						};
						const details: RegionChangeDetails = { isGesture: false };
						onRegionChangeComplete(eventRegion, details);
					}
				}
			}
		}, [onRegionChangeComplete, region, ref]);

		const handleClick = React.useCallback(
			(e: google.maps.MapMouseEvent) => {
				if (!onPress || !e.latLng) return;
				const pressEvent = {
					nativeEvent: {
						coordinate: {
							latitude: e.latLng.lat(),
							longitude: e.latLng.lng(),
						},
						position: { x: 0, y: 0 },
					},
				} as unknown as MapPressEvent;
				onPress(pressEvent);
			},
			[onPress],
		);

		const containerStyle: React.CSSProperties = {
			width: "100%",
			height: "100%",
			...(typeof style === "object" && style !== null ? (style as React.CSSProperties) : {}),
		};

		return (
			<LoadScript googleMapsApiKey="">
				<GoogleMap
					onLoad={handleLoad}
					center={{ lat: region?.latitude ?? 0, lng: region?.longitude ?? 0 }}
					zoom={10}
					mapContainerStyle={containerStyle}
					onClick={handleClick}
					onIdle={handleIdle}>
					{children}
				</GoogleMap>
			</LoadScript>
		);
	},
);

export default MapView;
