import { z } from "zod";
import type { SupabaseSpotGuides } from "../converters/convert_spot_guides";

/**
 * 📝 generateSpotGuide のリクエストスキーマ
 *
 * - スポット情報と言語タグをもとに、スポットガイドを生成
 */
export const generateSpotGuideRequestSchema = z.object({
	extSpot: z.object({
		id: z.string().min(1, "extSpot.id is required"),
		title: z.string().min(1, "extSpot.title is required"),
	}),
	languageTag: z.string().min(1, "languageTag is required"),
});

/**
 * 📝 generateSpotGuide のリクエスト型
 */
export type GenerateSpotGuideRequest = z.infer<typeof generateSpotGuideRequestSchema>;

/**
 * 📝 generateSpotGuide のレスポンス型
 */
export type GenerateSpotGuideResponse = {
	spotGuide: SupabaseSpotGuides;
	audioUrl: string;
};
