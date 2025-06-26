import React from "react";
import { GoogleMap, Marker as GoogleMarker, LoadScript } from "@react-google-maps/api";
import type { MapViewProps, MarkerProps } from "./MapView";
import type { MapPressEvent, MarkerPressEvent, PoiClickEvent } from "react-native-maps";
import { Env } from "@/constants/Env";

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
	({ style, region, onRegionChangeComplete, onPress, onPoiClick, children }, ref) => {
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
				if (!e.latLng) return;
				const { placeId } = e as unknown as { placeId: string | undefined };
				if (placeId && onPoiClick) {
					// If the event has a placeId, it's a POI click
					const poiClockEvent = {
						nativeEvent: {
							id: placeId,
							action: "poi-click",
							coordinate: {
								latitude: e.latLng.lat(),
								longitude: e.latLng.lng(),
							},
						},
					} as unknown as PoiClickEvent;
					onPoiClick(poiClockEvent);
					return;
				}
				if (onPress) {
					// Handle map press event
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
				}
			},
			[onPress],
		);

		const containerStyle: React.CSSProperties = {
			width: "100%",
			height: "100%",
			...(typeof style === "object" && style !== null ? (style as React.CSSProperties) : {}),
		};

		return (
			<LoadScript googleMapsApiKey={Env.GOOGLE_MAPS_API_KEY}>
				<GoogleMap
					onLoad={handleLoad}
					center={{ lat: region?.latitude ?? 0, lng: region?.longitude ?? 0 }}
					zoom={17}
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
