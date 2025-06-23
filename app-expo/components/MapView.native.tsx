import React from "react";
import MapViewRN, { Marker as RNMarker } from "react-native-maps";
import type { MapViewProps as RNMapViewProps, MarkerProps as RNMarkerProps, Region } from "react-native-maps";

export type MapViewProps = RNMapViewProps;
export type MarkerProps = RNMarkerProps;
export type { Region };

const MapView = React.forwardRef<MapViewRN, MapViewProps>((props, ref) => {
  return <MapViewRN ref={ref} {...props} />;
});

export const Marker = RNMarker;
export default MapView;
