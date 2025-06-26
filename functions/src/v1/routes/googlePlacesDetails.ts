import { withValidatedAuthHandler } from "../lib/handler";
import { logBackendEvent } from "../lib/logger";
import {
	googlePlacesDetailsRequestSchema,
	GooglePlacesDetailsResponse,
} from "../../../../shared/api/googlePlacesDetails.schema";
import { fetchPlaceDetails } from "../services/googlePlaces";

/**
 * 📍 地図上の POI 押下時に詳細情報を取得する Cloud Function
 *
 * - MapView からは placeId のみ得られるため、緯度経度を取得してフロントへ返す
 */
export const googlePlacesDetails = withValidatedAuthHandler(
	googlePlacesDetailsRequestSchema,
	async function googlePlacesDetails({ res, input, requestId, userId, functionName }) {
		const detail = await fetchPlaceDetails(input.placeId, requestId, userId);

		const response: GooglePlacesDetailsResponse = detail;

		logBackendEvent({
			event_name: "googlePlacesDetailsSuccess",
			error_level: "info",
			function_name: functionName,
			user_id: userId,
			request_id: requestId,
			payload: { placeId: input.placeId },
		});

		res.status(200).json(response);
	},
);
