import { z } from "zod";
import type { SupabaseSpotGuides } from "../converters/convert_spot_guides";

/**
 * 📝 listSpotGuides のリクエストスキーマ
 *
 * - 指定されたスポット ID と言語タグをもとに、スポットガイドを取得
 */
export const listSpotGuidesRequestSchema = z.object({
	spotId: z.string().min(1, "spotId is required"),
	languageTag: z.string().min(1, "languageTag is required"),
});

/**
 * listSpotGuides API のリクエスト型
 */
export type ListSpotGuidesRequest = z.infer<typeof listSpotGuidesRequestSchema>;

/**
 * listSpotGuides API のレスポンス型
 *
 * - `SupabaseSpotGuides` は DB上の spot_guides テーブルを変換・整形したフロントエンド向け構造
 * - `audioUrl` は音声ファイルのURL
 */
export type ListSpotGuidesResponse = {
	spotGuides: (SupabaseSpotGuides & { audioUrl: string })[];
};
