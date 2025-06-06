import { z } from "zod";
import type { SupabaseExtSpots } from "../converters/convert_ext_spots";

/**
 * 📝 findOrCreateSpotFromPlaceId のリクエストスキーマ
 */
export const findOrCreateSpotFromPlaceIdRequestSchema = z.object({
	placeId: z.string().min(1, "placeId is required"),
});

/**
 * findOrCreateSpotFromPlaceId API のリクエスト型
 */
export type FindOrCreateSpotFromPlaceIdRequest = z.infer<typeof findOrCreateSpotFromPlaceIdRequestSchema>;

/**
 * findOrCreateSpotFromPlaceId API のレスポンス型
 *
 * - `SupabaseExtSpots` は DB上の ext_spots テーブルを変換・整形したフロントエンド向け構造
 */
export type FindOrCreateSpotFromPlaceIdResponse = {
	extSpots: SupabaseExtSpots;
};
