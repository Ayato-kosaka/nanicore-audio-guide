import React from "react";
import { GoogleMap, Marker as GoogleMarker, LoadScript } from "@react-google-maps/api";
import type { MapViewProps, MarkerProps } from "./MapView";

export const Marker: React.FC<MarkerProps> = ({ coordinate, title, onPress, testID }) => (
	<GoogleMarker
		position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
		title={title}
		onClick={onPress}
		options={{}}
	/>
);

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
						onRegionChangeComplete({
							latitude: center.lat(),
							longitude: center.lng(),
							latitudeDelta: region.latitudeDelta,
							longitudeDelta: region.longitudeDelta,
						});
					}
				}
			}
		}, [onRegionChangeComplete, region, ref]);

		return (
			<LoadScript googleMapsApiKey="">
				<GoogleMap
					onLoad={handleLoad}
					center={{ lat: region.latitude, lng: region.longitude }}
					zoom={10}
					mapContainerStyle={{ width: "100%", height: "100%", ...style }}
					onClick={onPress}
					onIdle={handleIdle}>
					{children}
				</GoogleMap>
			</LoadScript>
		);
	},
);

export default MapView;
