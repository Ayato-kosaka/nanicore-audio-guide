import { z } from "zod";

export const generatePlaceGuideFromCategoryRequestSchema = z.object({
	placeId: z.string().min(1, "placeId is required"),
	placeName: z.string().min(1, "placeName is required"),
	latitude: z.number(),
	longitude: z.number(),
	categoryDescription: z.string().min(1, "categoryDescription is required"),
	languageTag: z.string().min(1, "languageTag is required"),
});

export type GeneratePlaceGuideFromCategoryRequest = z.infer<typeof generatePlaceGuideFromCategoryRequestSchema>;

export type GeneratePlaceGuideFromCategoryResponse = {
	guide: { id: string; title: string; content: string; category: string };
	audioUrl: string;
};
