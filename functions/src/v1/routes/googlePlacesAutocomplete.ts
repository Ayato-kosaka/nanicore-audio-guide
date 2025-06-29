import { withValidatedAuthHandler } from "../lib/handler";
import { logBackendEvent } from "../lib/logger";
import {
	googlePlacesAutocompleteRequestSchema,
	GooglePlacesAutocompleteResponse,
} from "../../../../shared/api/googlePlacesAutocomplete.schema";
import { fetchAutocompletePredictions, fetchPlaceDetails } from "../services/googlePlaces";

/**
 * 🔎 ユーザー入力から候補地点を検索する Cloud Function
 *
 * - フロントエンドでは API キーを保持しないため、サーバー側で代理リクエストを行う
 * - 取得した候補には緯度経度を付与して返却する
 */
export const googlePlacesAutocomplete = withValidatedAuthHandler(
	googlePlacesAutocompleteRequestSchema,
	async function googlePlacesAutocomplete({ res, input, requestId, userId, functionName }) {
       const predictions = await fetchAutocompletePredictions(
               input.input,
               input.languageCode,
               requestId,
               userId,
       );
       const detailed = await Promise.all(
               predictions.slice(0, 5).map((p) =>
                       fetchPlaceDetails(p.placeId, input.languageCode, requestId, userId),
               ),
       );

		const response: GooglePlacesAutocompleteResponse = { predictions: detailed };

		logBackendEvent({
			event_name: "googlePlacesAutocompleteSuccess",
			error_level: "info",
			function_name: functionName,
			user_id: userId,
			request_id: requestId,
			payload: { query: input.input, count: detailed.length },
		});

		res.status(200).json(response);
	},
);
