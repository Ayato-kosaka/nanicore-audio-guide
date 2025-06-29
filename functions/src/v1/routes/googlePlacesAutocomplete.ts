import { withValidatedAuthHandler } from "../lib/handler";
import { logBackendEvent } from "../lib/logger";
import {
	googlePlacesAutocompleteRequestSchema,
	GooglePlacesAutocompleteResponse,
} from "../../../../shared/api/googlePlacesAutocomplete.schema";
import { fetchAutocompletePredictions } from "../services/googlePlaces";

/**
 * 🔎 ユーザー入力から候補地点を検索する Cloud Function
 *
 * - フロントエンドでは API キーを保持しないため、サーバー側で代理リクエストを行う
 * - 取得した候補には緯度経度を付与して返却する
 */
export const googlePlacesAutocomplete = withValidatedAuthHandler(
	googlePlacesAutocompleteRequestSchema,
	async function googlePlacesAutocomplete({ res, input, requestId, userId, functionName }) {
		const predictions = await fetchAutocompletePredictions(input.input, input.languageCode, requestId, userId);

		const response: GooglePlacesAutocompleteResponse = {
			predictions: predictions.map((p) => ({
				placeId: p.placeId,
				name: p?.text?.text,
				types: p.types ?? null,
			})).filter((p) => !!p.placeId && !!p.name) as GooglePlacesAutocompleteResponse["predictions"],
		};

		logBackendEvent({
			event_name: "googlePlacesAutocompleteSuccess",
			error_level: "info",
			function_name: functionName,
			user_id: userId,
			request_id: requestId,
			payload: { query: input.input, count: predictions.length },
		});

		res.status(200).json(response);
	},
);
