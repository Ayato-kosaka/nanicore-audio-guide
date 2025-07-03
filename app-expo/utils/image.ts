import { Image, Platform } from "react-native";

/**
 * Get URI of the fallback image used when remote image loading fails.
 */
export const getFallbackImageUri = (): string => {
	const placeholderImage = require("@/assets/images/no_image_logo.png");
	const resolvedAsset = Platform.OS === "web" ? placeholderImage : Image.resolveAssetSource(placeholderImage);
	return resolvedAsset.uri;
};
