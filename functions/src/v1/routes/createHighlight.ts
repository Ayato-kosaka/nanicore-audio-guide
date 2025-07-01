import { prisma } from "../lib/prisma";
import { logBackendEvent } from "../lib/logger";
import { withValidatedAuthHandler } from "../lib/handler";
import { uploadFile } from "../lib/storage";
import { createHighlightRequestSchema, CreateHighlightResponse } from "../../../../shared/api/createHighlight.schema";
import { generateGeneralHighlightGuideContent } from "../lib/claude";
import { synthesizeTextToSpeech } from "../lib/textToSpeech";
import { randomUUID } from "crypto";
import { getRemoteConfigValue } from "../lib/remoteConfig";
import { getCurrentVersionFromRequest } from "../lib/backendUtils";

export const createHighlight = withValidatedAuthHandler(
	createHighlightRequestSchema,
	async function createHighlight({ req, res, input, requestId, userId, functionName }) {
		const { placeId, placeName, latitude, longitude, imageBase64, mimeType, languageTag } = input;
		const highlightId = randomUUID();
		const guideId = randomUUID();

		const defaultCreatedUserId = await getRemoteConfigValue("v1_highlight_guides_default_created_user_id");

		const imageBuffer = Buffer.from(imageBase64, "base64");
		const { signedUrl: imageUrl } = await uploadFile({
			buffer: imageBuffer,
			mimeType,
			resourceType: "user-uploads",
			usageType: "photos",
			identifier: userId,
			fileName: highlightId,
			requestId,
			createdVersion: getCurrentVersionFromRequest(req),
		});

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
		} = await generateGeneralHighlightGuideContent(
			placeName,
			latitude,
			longitude,
			imageBase64,
			mimeType,
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
			identifier: highlightId,
			fileName: guideId,
			requestId,
			createdVersion: getCurrentVersionFromRequest(req),
		});

		// TODO: insert into highlights table
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
			event_name: "createHighlightSuccess",
			function_name: functionName,
			request_id: requestId,
			user_id: userId,
			error_level: "info",
			payload: { placeId, highlightId },
		});

		const response: CreateHighlightResponse = {
			highlight: {
				id: highlightId,
				imageUrl,
				highlightGuides: [{ id: guideId, title, content: manuscript, category: "general", audioUrl }],
			},
		};

		res.status(200).json(response);
	},
);
