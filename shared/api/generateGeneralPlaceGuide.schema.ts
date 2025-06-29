import { z } from "zod";

/**
 * 📝 generateGeneralPlaceGuide のリクエストスキーマ
 */
export const generateGeneralPlaceGuideRequestSchema = z.object({
	placeId: z.string().min(1, "placeId is required"),
	placeName: z.string().min(1, "placeName is required"),
	latitude: z.number(),
	longitude: z.number(),
	languageTag: z.string().min(1, "languageTag is required"),
});

export type GenerateGeneralPlaceGuideRequest = z.infer<typeof generateGeneralPlaceGuideRequestSchema>;

export type GenerateGeneralPlaceGuideResponse = {
	guide: { id: string; title: string; content: string; category: string };
	audioUrl: string;
};
