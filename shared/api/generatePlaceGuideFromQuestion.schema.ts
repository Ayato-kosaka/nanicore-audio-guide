import { z } from "zod";

export const generatePlaceGuideFromQuestionRequestSchema = z.object({
        placeId: z.string().min(1, "placeId is required"),
        placeName: z.string().min(1, "placeName is required"),
        latitude: z.number(),
        longitude: z.number(),
        question: z.string().min(1, "question is required"),
        languageTag: z.string().min(1, "languageTag is required"),
});

export type GeneratePlaceGuideFromQuestionRequest = z.infer<typeof generatePlaceGuideFromQuestionRequestSchema>;

export type GeneratePlaceGuideFromQuestionResponse = {
        guide: { id: string; title: string; content: string; category: string };
        audioUrl: string;
};
