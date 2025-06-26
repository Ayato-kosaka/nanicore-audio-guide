import { PlacesApiClient } from "@googlemaps/places";
import { env } from "../lib/env";
import { logExternalApi } from "../lib/logger";

const client = new PlacesApiClient({ key: env.FUNCTIONS_GOOGLE_PLACE_API_KEY });

/**
 * 🔍 Google Places Autocomplete(New)
 *
 * サーバー側から呼び出してAPIキーを隠蔽しつつログを残す。
 */
export const fetchAutocompletePredictions = async (
        input: string,
        requestId: string,
        userId: string,
): Promise<{ placeId: string; text: string }[]> => {
        const start = Date.now();
        let status = 0;
        let payload: any = null;
        let errorMessage: string | null = null;
        try {
                const response = await client.autocomplete({ input, languageCode: "ja" });
                payload = response;
                status = 200;
                return (
                        response.predictions?.map((p) => ({ placeId: p.placeId ?? "", text: p.text ?? "" })) || []
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
        requestId: string,
        userId: string,
): Promise<{ placeId: string; name: string; latitude: number; longitude: number }> => {
        const start = Date.now();
        let status = 0;
        let payload: any = null;
        let errorMessage: string | null = null;
        try {
                const response = await client.place({ name: placeId, languageCode: "ja", fields: ["id", "displayName", "location"] });
                payload = response;
                status = 200;
                return {
                        placeId: response.id,
                        name: response.displayName?.text ?? "",
                        latitude: response.location?.latitude ?? 0,
                        longitude: response.location?.longitude ?? 0,
                };
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

