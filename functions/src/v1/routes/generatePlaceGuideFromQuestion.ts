import { prisma } from "../lib/prisma";
import { logBackendEvent } from "../lib/logger";
import { withValidatedAuthHandler } from "../lib/handler";
import { uploadFile } from "../lib/storage";
import {
	generatePlaceGuideFromQuestionRequestSchema,
	GeneratePlaceGuideFromQuestionResponse,
} from "../../../../shared/api/generatePlaceGuideFromQuestion.schema";
import { generatePlaceGuideFromQuestionContent } from "../lib/claude";
import { synthesizeTextToSpeech } from "../lib/textToSpeech";
import { randomUUID } from "crypto";
import { getRemoteConfigValue } from "../lib/remoteConfig";
import { getCurrentVersionFromRequest } from "../lib/backendUtils";

export const generatePlaceGuideFromQuestion = withValidatedAuthHandler(
	generatePlaceGuideFromQuestionRequestSchema,
	async function generatePlaceGuideFromQuestion({ req, res, input, requestId, userId, functionName }) {
		const { placeId, placeName, latitude, longitude, question, languageTag } = input;
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
		} = await generatePlaceGuideFromQuestionContent(
			placeName,
			latitude,
			longitude,
			question,
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
			event_name: "generatePlaceGuideFromQuestionSuccess",
			function_name: functionName,
			request_id: requestId,
			user_id: userId,
			error_level: "info",
			payload: { placeName, guideId, languageTag },
		});

		const response: GeneratePlaceGuideFromQuestionResponse = {
			guide: { id: guideId, title, manuscript, category: "custom" },
			audioUrl,
		};
		res.status(200).json(response);
	},
);
