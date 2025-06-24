import { z } from "zod";
import type { SupabasePlaceGuides } from "../converters/convert_place_guides";

/**
 * 📝 listPlaceGuides のリクエストスキーマ
 *
 * - 指定されたスポット ID と言語タグをもとに、スポットガイドを取得
 */
export const listPlaceGuidesRequestSchema = z.object({
	placeId: z.string().min(1, "placeId is required"),
	languageTag: z.string().min(1, "languageTag is required"),
});

/**
 * listPlaceGuides API のリクエスト型
 */
export type ListPlaceGuidesRequest = z.infer<typeof listPlaceGuidesRequestSchema>;

/**
 * listPlaceGuides API のレスポンス型
 *
 * - `SupabasePlaceGuides` は DB上の place_guides テーブルを変換・整形したフロントエンド向け構造
 * - `audioUrl` は音声ファイルのURL
 */
export type ListPlaceGuidesResponse = {
	placeGuides: (SupabasePlaceGuides & { audioUrl: string })[];
};
