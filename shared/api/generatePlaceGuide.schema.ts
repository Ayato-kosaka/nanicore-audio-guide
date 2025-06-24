import { z } from "zod";
import type { SupabasePlaceGuides } from "../converters/convert_place_guides";

/**
 * 📝 generatePlaceGuide のリクエストスキーマ
 *
 * - スポット情報と言語タグをもとに、スポットガイドを生成
 */
export const generatePlaceGuideRequestSchema = z.object({
	extPlace: z.object({
		id: z.string().min(1, "extPlace.id is required"),
		title: z.string().min(1, "extPlace.title is required"),
	}),
	languageTag: z.string().min(1, "languageTag is required"),
});

/**
 * 📝 generatePlaceGuide のリクエスト型
 */
export type GeneratePlaceGuideRequest = z.infer<typeof generatePlaceGuideRequestSchema>;

/**
 * 📝 generatePlaceGuide のレスポンス型
 */
export type GeneratePlaceGuideResponse = {
	placeGuide: SupabasePlaceGuides;
	audioUrl: string;
};
