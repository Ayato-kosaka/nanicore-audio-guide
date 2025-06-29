import { PlacesClient } from "@googlemaps/places";
import { env } from "../lib/env";
import { logExternalApi } from "../lib/logger";
import { google } from "@googlemaps/places/build/protos/protos";

const client = new PlacesClient({ key: env.FUNCTIONS_GOOGLE_PLACE_API_KEY });

/**
 * 🔍 Google Places Autocomplete(New)
 *
 * サーバー側から呼び出してAPIキーを隠蔽しつつログを残す。
 */
export const fetchAutocompletePredictions = async (
	input: string,
	languageCode: string,
	requestId: string,
	userId: string,
): Promise<(google.maps.places.v1.AutocompletePlacesResponse.Suggestion.IPlacePrediction)[]> => {
	const start = Date.now();
	let status = 0;
	let payload: any = null;
	let errorMessage: string | null = null;
	try {
		const [response] = await client.autocompletePlaces({ input, languageCode });
		payload = response;
		status = 200;
		return (
			response.suggestions
				?.map((s) => s.placePrediction)
				.filter((p) => !!p) ?? []
		);
	} catch (error: any) {
		errorMessage = error.message;
		status = error.code || 500;
		throw new Error(`Places autocomplete failed: ${errorMessage}`);
	} finally {
		logExternalApi({
			request_id: requestId,
			function_name: "fetchAutocompletePredictions",
			api_name: "GooglePlaces",
			endpoint: "autocomplete",
			request_payload: JSON.stringify({ input }),
			response_payload: JSON.stringify(payload),
			status_code: status,
			error_message: errorMessage,
			response_time_ms: Date.now() - start,
			user_id: userId,
		});
	}
};

/**
 * 📍 Place ID から詳細座標を取得
 */
export const fetchPlaceDetails = async (
	placeId: string,
	languageCode: string,
	requestId: string,
	userId: string,
): Promise<{ placeId: string; name: string; latitude: number; longitude: number; imageUrl: string }> => {
	const start = Date.now();
	let status = 0;
	let payload: any = null;
	let errorMessage: string | null = null;
	try {
		const [response] = await client.getPlace(
			{
				name: `places/${placeId}`,
				languageCode,
			},
			{
				otherArgs: {
					headers: { "X-Goog-FieldMask": "id,displayName,location,photos" },
				},
			},
		);

		if (!response.id || !response.displayName?.text || !response.location) {
			throw new Error("Incomplete place details");
		}

		const verticalPhoto = response.photos?.find((p) => (p.heightPx ?? 0) > (p.widthPx ?? 0));
		const fallbackPhoto = response.photos?.find((p) => (p.widthPx ?? 0) >= (p.heightPx ?? 0));
		const photoRef = verticalPhoto?.name ?? fallbackPhoto?.name;

		let imageUrl = "";
		if (photoRef) {
			const [photoResponse] = await client.getPhotoMedia({
				name: photoRef,
				maxWidthPx: 800,
			});
			imageUrl = (photoResponse as any).photoUri ?? "";
		}

		const result = {
			placeId: response.id,
			name: response.displayName.text,
			latitude: response.location.latitude,
			longitude: response.location.longitude,
			imageUrl,
		};

		payload = result;
		status = 200;
		return result;
	} catch (error: any) {
		errorMessage = error.message;
		status = error.code || 500;
		throw new Error(`Places details failed: ${errorMessage}`);
	} finally {
		logExternalApi({
			request_id: requestId,
			function_name: "fetchPlaceDetails",
			api_name: "GooglePlaces",
			endpoint: "place",
			request_payload: JSON.stringify({ placeId }),
			response_payload: JSON.stringify(payload),
			status_code: status,
			error_message: errorMessage,
			response_time_ms: Date.now() - start,
			user_id: userId,
		});
	}
};
