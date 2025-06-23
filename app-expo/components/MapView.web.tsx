import React from "react";
import { GoogleMap, Marker as GoogleMarker, LoadScript } from "@react-google-maps/api";

export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type MapViewProps = {
  style?: React.CSSProperties;
  region: Region;
  onRegionChangeComplete?: (region: Region) => void;
  onPress?: (e: google.maps.MapMouseEvent) => void;
  showsUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  children?: React.ReactNode;
};

export type MarkerProps = {
  coordinate: { latitude: number; longitude: number };
  title?: string;
  onPress?: () => void;
  testID?: string;
};

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
      [ref]
    );

    const handleIdle = React.useCallback(
      (map: google.maps.Map) => {
        if (onRegionChangeComplete) {
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
      },
      [onRegionChangeComplete, region]
    );

    return (
      <LoadScript googleMapsApiKey="">
        <GoogleMap
          onLoad={handleLoad}
          center={{ lat: region.latitude, lng: region.longitude }}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "100%", ...style }}
          onClick={onPress}
          onIdle={handleIdle}
        >
          {children}
        </GoogleMap>
      </LoadScript>
    );
  }
);

export default MapView;
