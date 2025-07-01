import { z } from "zod";

/**
 * 📝 createHighlight のリクエストスキーマ
 */
export const createHighlightRequestSchema = z.object({
	placeId: z.string().min(1, "placeId is required"),
	placeName: z.string().min(1, "placeName is required"),
	latitude: z.number(),
	longitude: z.number(),
	imageBase64: z.string().min(1, "imageBase64 is required"),
	mimeType: z.string().min(1, "mimeType is required"),
	languageTag: z.string().min(1, "languageTag is required"),
});

export type CreateHighlightRequest = z.infer<typeof createHighlightRequestSchema>;

/**
 * createHighlight のレスポンス型
 */
export type CreateHighlightResponse = {
	highlight: {
		id: string;
		imageUrl: string;
		highlightGuides: {
			id: string;
			title: string;
			content: string;
			category: string;
			audioUrl: string;
		}[];
	};
};
