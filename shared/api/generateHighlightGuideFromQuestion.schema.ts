import { z } from "zod";

export const generateHighlightGuideFromQuestionRequestSchema = z.object({
	placeId: z.string().min(1, "placeId is required"),
	placeName: z.string().min(1, "placeName is required"),
	latitude: z.number(),
	longitude: z.number(),
	question: z.string().min(1, "question is required"),
	generalHighlightGuideTitle: z.string().min(1, "generalHighlightGuideTitle is required"),
	generalHighlightGuideManuscript: z.string().min(1, "generalHighlightGuideManuscript is required"),
	languageTag: z.string().min(1, "languageTag is required"),
});

export type GenerateHighlightGuideFromQuestionRequest = z.infer<typeof generateHighlightGuideFromQuestionRequestSchema>;

export type GenerateHighlightGuideFromQuestionResponse = {
	guide: { id: string; title: string; manuscript: string; category: string };
	audioUrl: string;
};
