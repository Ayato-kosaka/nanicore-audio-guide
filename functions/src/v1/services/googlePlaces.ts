import { env } from "../lib/env";
import { callExternalApi } from "../lib/backendUtils";

/** Google Places Autocomplete(New) を呼び出して候補を取得する */
export const fetchAutocompletePredictions = async (
	input: string,
	requestId: string,
	userId: string,
): Promise<{ placeId: string; text: string }[]> => {
	const endpoint = `https://places.googleapis.com/v1/places:autocomplete?input=${encodeURIComponent(
		input,
	)}&languageCode=ja&key=${env.FUNCTIONS_GOOGLE_PLACE_API_KEY}`;

	const response = await callExternalApi<{ predictions: { placeId: string; text: string }[] }>({
		requestId,
		functionName: "fetchAutocompletePredictions",
		apiName: "GooglePlacesAPI",
		endpoint,
		method: "GET",
		userId,
	});

	return response.predictions || [];
};

/** Place ID から名前と緯度経度を取得する */
export const fetchPlaceDetails = async (
	placeId: string,
	requestId: string,
	userId: string,
): Promise<{ placeId: string; name: string; latitude: number; longitude: number }> => {
	const endpoint = `https://places.googleapis.com/v1/${placeId}?fields=location,displayName&key=${env.FUNCTIONS_GOOGLE_PLACE_API_KEY}`;

	const response = await callExternalApi<{
		id: string;
		location?: { latitude: number; longitude: number };
		displayName?: { text: string };
	}>({
		requestId,
		functionName: "fetchPlaceDetails",
		apiName: "GooglePlacesAPI",
		endpoint,
		method: "GET",
		userId,
	});

	return {
		placeId: response.id,
		name: response.displayName?.text ?? "",
		latitude: response.location?.latitude ?? 0,
		longitude: response.location?.longitude ?? 0,
	};
};
