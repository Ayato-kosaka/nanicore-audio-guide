import { prisma } from "../lib/prisma";
import { logBackendEvent } from "../lib/logger";
import { withValidatedAuthHandler } from "../lib/handler";
import { uploadFile } from "../lib/storage";
import {
        generatePlaceGuideFromCategoryRequestSchema,
        GeneratePlaceGuideFromCategoryResponse,
} from "../../../../shared/api/generatePlaceGuideFromCategory.schema";
import { generatePlaceGuideFromCategoryContent } from "../lib/claude";
import { synthesizeTextToSpeech } from "../lib/textToSpeech";
import { randomUUID } from "crypto";
import { getRemoteConfigValue } from "../lib/remoteConfig";
import { getCurrentVersionFromRequest } from "../lib/backendUtils";

export const generatePlaceGuideFromCategory = withValidatedAuthHandler(
        generatePlaceGuideFromCategoryRequestSchema,
        async function ({ req, res, input, requestId, userId, functionName }) {
                const { categoryId, placeId, placeName, latitude, longitude, categoryDescription, languageTag } = input;
                const guideId = randomUUID();

                const defaultPlaceGuideCreatedUserId = await getRemoteConfigValue("v1_place_guides_default_created_user_id");

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
                } = await generatePlaceGuideFromCategoryContent(
                        placeName,
                        latitude,
                        longitude,
                        categoryDescription,
                        languageTag,
                        requestId,
                        userId,
                );

                const audioBuffer = await synthesizeTextToSpeech({
                        text: manuscript,
                        languageTag,
                        ssmlGender,
                        requestId,
                        userId,
                });

                const { signedUrl: audioUrl } = await uploadFile({
                        buffer: audioBuffer,
                        mimeType: "audio/mpeg",
                        resourceType: "system-generated",
                        usageType: "audio-guides",
                        identifier: placeId,
                        fileName: guideId,
                        requestId,
                        createdVersion: getCurrentVersionFromRequest(req),
                });

                // TODO: insert into place_guides table

                await prisma.prompt_usages.create({
                        data: {
                                id: randomUUID(),
                                family_id: familyId,
                                variant_id: variantId,
                                target_type: "place_guides",
                                target_id: guideId,
                                generated_text: generatedText,
                                used_prompt_text: promptText,
                                input_data: promptInput,
                                llm_model: llmModel,
                                temperature,
                                generated_user: defaultPlaceGuideCreatedUserId,
                                created_at: new Date(),
                                created_request_id: requestId,
                        },
                });

                logBackendEvent({
                        event_name: "generatePlaceGuideFromCategorySuccess",
                        function_name: functionName,
                        request_id: requestId,
                        user_id: userId,
                        error_level: "info",
                        payload: { placeName, guideId, categoryId, categoryDescription, languageTag },
                });

                const response: GeneratePlaceGuideFromCategoryResponse = {
                        guide: { id: guideId, title, content: manuscript, category: categoryId },
                        audioUrl,
                };
                res.status(200).json(response);
        },
);
