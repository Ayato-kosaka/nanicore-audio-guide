import { z } from "zod";

/**
 * 📝 googlePlacesAutocomplete API のリクエストスキーマ
 *
 * - 入力キーワードを元に Google Places Autocomplete(New) を実行
 */
export const googlePlacesAutocompleteRequestSchema = z.object({
	input: z.string().min(1, "input is required"),
	languageCode: z.string().min(1, "languageCode is required"),
});

/**
 * googlePlacesAutocomplete API のリクエスト型
 */
export type GooglePlacesAutocompleteRequest = z.infer<typeof googlePlacesAutocompleteRequestSchema>;

/**
 * googlePlacesAutocomplete API のレスポンス型
 */
export type GooglePlacesAutocompleteResponse = {
	predictions: {
		placeId: string;
		name: string;
		types?: (string[] | null);
	}[];
};
