import { prisma } from "../lib/prisma";
import { logBackendEvent } from "../lib/logger";
import { withValidatedAuthHandler } from "../lib/handler";
import { uploadFile } from "../lib/storage";
import {
	generateHighlightGuideFromQuestionRequestSchema,
	GenerateHighlightGuideFromQuestionResponse,
} from "../../../../shared/api/generateHighlightGuideFromQuestion.schema";
import { generateHighlightGuideFromQuestionContent } from "../lib/claude";
import { synthesizeTextToSpeech } from "../lib/textToSpeech";
import { randomUUID } from "crypto";
import { getRemoteConfigValue } from "../lib/remoteConfig";
import { getCurrentVersionFromRequest } from "../lib/backendUtils";

export const generateHighlightGuideFromQuestion = withValidatedAuthHandler(
	generateHighlightGuideFromQuestionRequestSchema,
	async function generateHighlightGuideFromQuestion({ req, res, input, requestId, userId, functionName }) {
		const {
			placeId,
			placeName,
			latitude,
			longitude,
			question,
			generalHighlightGuideTitle,
			generalHighlightGuideManuscript,
			languageTag,
		} = input;
		const guideId = randomUUID();

		const defaultCreatedUserId = await getRemoteConfigValue("v1_highlight_guides_default_created_user_id");

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
		} = await generateHighlightGuideFromQuestionContent(
			placeName,
			latitude,
			longitude,
			question,
			generalHighlightGuideTitle,
			generalHighlightGuideManuscript,
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

		// TODO: insert into highlight_guides table

		await prisma.prompt_usages.create({
			data: {
				id: randomUUID(),
				family_id: familyId,
				variant_id: variantId,
				target_type: "highlight_guides",
				target_id: guideId,
				generated_text: generatedText,
				used_prompt_text: promptText,
				input_data: promptInput,
				llm_model: llmModel,
				temperature,
				generated_user: defaultCreatedUserId,
				created_at: new Date(),
				created_request_id: requestId,
			},
		});

		logBackendEvent({
			event_name: "generateHighlightGuideFromQuestionSuccess",
			function_name: functionName,
			request_id: requestId,
			user_id: userId,
			error_level: "info",
			payload: { placeName, guideId, languageTag },
		});

		const response: GenerateHighlightGuideFromQuestionResponse = {
			guide: { id: guideId, title, manuscript, category: "custom" },
			audioUrl,
		};
		res.status(200).json(response);
	},
);
