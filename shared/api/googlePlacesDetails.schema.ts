import { z } from "zod";

/**
 * 📝 googlePlacesDetails API のリクエストスキーマ
 *
 * - Place ID に基づき地点の詳細情報を取得
 */
export const googlePlacesDetailsRequestSchema = z.object({
	placeId: z.string().min(1, "placeId is required"),
});

/**
 * googlePlacesDetails API のリクエスト型
 */
export type GooglePlacesDetailsRequest = z.infer<typeof googlePlacesDetailsRequestSchema>;

/**
 * googlePlacesDetails API のレスポンス型
 */
export type GooglePlacesDetailsResponse = {
	placeId: string;
	name: string;
	latitude: number;
	longitude: number;
};
