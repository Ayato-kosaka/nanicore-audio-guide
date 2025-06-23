import { Platform } from "react-native";
import type { MapViewProps, MarkerProps, Region } from "./MapView.native";

let MapView: React.ComponentType<MapViewProps>;
let Marker: React.ComponentType<MarkerProps>;

if (Platform.OS === "web") {
  const Web = require("./MapView.web");
  MapView = Web.default;
  Marker = Web.Marker;
} else {
  const Native = require("./MapView.native");
  MapView = Native.default;
  Marker = Native.Marker;
}

export { MapView as default, Marker };
export type { MapViewProps, MarkerProps, Region };
