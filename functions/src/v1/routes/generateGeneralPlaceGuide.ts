import { prisma } from "../lib/prisma";
import { logBackendEvent } from "../lib/logger";
import { withValidatedAuthHandler } from "../lib/handler";
import { uploadFile } from "../lib/storage";
import {
    generateGeneralPlaceGuideRequestSchema,
    GenerateGeneralPlaceGuideResponse,
} from "../../../../shared/api/generateGeneralPlaceGuide.schema";
import { generateGeneratePlaceGuideContent } from "../lib/claude";
import { synthesizeTextToSpeech } from "../lib/textToSpeech";
import { randomUUID } from "crypto";

export const generateGeneralPlaceGuide = withValidatedAuthHandler(
    generateGeneralPlaceGuideRequestSchema,
    async function withValidatedAuthHandler({ req, res, input, requestId, userId, functionName }) {
        const { placeName, latitude, longitude, languageTag } = input;
        const guideId = randomUUID();

        const {
            title,
            manuscript,
            ssmlGender,
            familyId,
            variantId,
            promptText,
            generatedText,
            promptInput,
            llmModel,
            temperature,
        } = await generateGeneratePlaceGuideContent(placeName, latitude, longitude, languageTag, requestId, userId);

        const audioBuffer = await synthesizeTextToSpeech({
            text: manuscript,
            languageTag,
            ssmlGender,
            requestId,
            userId,
        });

        const { path: audioPath, signedUrl: audioUrl } = await uploadFile({
            buffer: audioBuffer,
            mimeType: "audio/mpeg",
            resourceType: "system-generated",
            usageType: "audio-guides",
            identifier: guideId,
            fileName: "place",
            requestId,
            createdVersion: req.headers["x-app-version"] as string,
        });

        // TODO: insert into place_guides table

        await prisma.prompt_usages.create({
            data: {
                id: randomUUID(),
                family_id: familyId,
                variant_id: variantId,
                target_type: "place_guides",
                target_id: randomUUID(),
                generated_text: generatedText,
                used_prompt_text: promptText,
                input_data: promptInput,
                llm_model: llmModel,
                temperature,
                generated_user: "00000000-0000-0000-0000-000000000000",
                created_at: new Date(),
                created_request_id: requestId,
            },
        });

        logBackendEvent({
            event_name: "generateGeneralPlaceGuideSuccess",
            function_name: functionName,
            request_id: requestId,
            user_id: userId,
            error_level: "info",
            payload: { placeName, guideId, languageTag },
        });

        const response: GenerateGeneralPlaceGuideResponse = {
            guide: { id: guideId, title, content: manuscript, category: "general" },
            audioUrl,
        };
        res.status(200).json(response);
    }
);
