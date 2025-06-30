import { env } from "./env";
import { getStaticMaster } from "./getStaticMaster";
import { callExternalApi, pickByWeight } from "./backendUtils";
import { z } from "zod";

// Claude API のレスポンス型
interface ClaudeMessageResponse {
	id: string;
	model: string;
	role: "assistant";
	type: "message";
	content: {
		type: "text";
		text: string;
		citations:
			| {
					type: "char_location";
					cited_text: string;
					document_index: number; // x > 0
					document_title: string | null;
					start_char_index: number; // x > 0
					end_char_index: number;
			  }[]
			| null;
	}[];
	stop_reason: "end_turn" | "max_tokens" | "stop_sequence" | "tool_use";
	stop_sequence: string | null;
	usage: {
		input_tokens: number;
		output_tokens: number;
		// オプションで追加できる項目
		cache_creation_input_tokens?: number;
		cache_read_input_tokens?: number;
	};
}

/**
 * 🧠 Claude API を汎用的に呼び出す関数。
 *
 * - Static Master からプロンプトファミリーとバリアントを取得して使用。
 * - プロンプトのベース部分に加え、可変部分（スポット名や言語など）と出力フォーマットのヒントを合成して LLM に渡す。
 * - Claude API を呼び出し、テキストレスポンスを JSON パースして返却。
 *
 * @param llmModel - 使用する Claude モデル名（例: "claude-3-haiku-20240307"）
 * @param temperature - 出力のランダム性（例: 0.7）
 * @param promptPurpose - 使用するプロンプトファミリーの目的（例: "spot_guide_manuscript"）
 * @param variablePromptPart - プロンプト中の可変部分（スポット名や言語指定など）
 * @param outputFormatHint - 出力フォーマット（JSON構造など）の指定ヒント
 * @param requestId - トレース・ログ用の一意なリクエストID
 * @param userId - 呼び出し元ユーザーの識別子
 *
 * @returns Claude の出力結果（テキスト／JSON）、使用されたプロンプト、メタ情報を含むオブジェクト
 *
 * @throws エラー: promptファミリーやバリアントが存在しない場合、またはAPIレスポンスが不正な場合
 */
export const callClaudeWithPrompt = async ({
	llmModel,
	temperature,
	promptPurpose,
	variablePromptPart,
	outputFormatHint,
	requestId,
	userId,
}: {
	llmModel: string;
	temperature: number;
	promptPurpose: string;
	variablePromptPart: string;
	outputFormatHint: string;
	requestId: string;
	userId: string;
}): Promise<{
	responseText: string;
	parsedJson: any;
	fullPrompt: string;
	familyId: string;
	variantId: string;
}> => {
	// 🎯 Static Masterからプロンプトファミリー・バリアントを読み込み
	const promptFamilies = await getStaticMaster("prompt_families");
	const selectedFamily = pickByWeight(
		promptFamilies.filter((x) => x.purpose === promptPurpose).filter((x) => x.weight > 0),
	);
	if (!selectedFamily) throw new Error(`No eligible prompt families found with ${promptPurpose}.`);

	const promptVariants = await getStaticMaster("prompt_variants");
	const selectedVariant = promptVariants
		.filter((x) => x.family_id === selectedFamily.id)
		.sort((a, b) => b.variant_number - a.variant_number)[0];
	if (!selectedVariant) throw new Error("No eligible prompt variants found.");

	const basePrompt = selectedVariant.prompt_text;

	// 🧠 プロンプト構築
	const fullPrompt = `
${basePrompt}

${variablePromptPart}

${outputFormatHint}
`.trim();

	const requestPayload = {
		model: llmModel,
		max_tokens: 512,
		temperature,
		messages: [
			{
				role: "user",
				content: fullPrompt,
			},
		],
	};

	// 📡 Claude API を呼び出し
	// @see https://docs.anthropic.com/en/api/messages
	const response = await callExternalApi<ClaudeMessageResponse>({
		requestId,
		functionName: "callClaudeWithPrompt",
		apiName: "Claude",
		endpoint: "https://api.anthropic.com/v1/messages",
		customHeaders: {
			"anthropic-version": "2023-06-01",
			"x-api-key": env.FUNCTIONS_CLAUDE_API_KEY,
		},
		method: "POST",
		requestPayload,
		userId,
	});

	if (response.stop_reason && response.stop_reason !== "end_turn") {
		throw new Error(`Claude API failed: Unexpected stop_reason - ${response.stop_reason}`);
	}
	const responseText = response.content[0]?.text || "";

	let parsedJson: unknown;
	try {
		parsedJson = JSON.parse(responseText);
	} catch (e) {
		throw new Error(`Claude API failed: Invalid JSON response - ${(e as Error).message}`);
	}

	return {
		responseText,
		parsedJson,
		fullPrompt,
		familyId: selectedFamily.id,
		variantId: selectedVariant.id,
	};
};

// スポットガイド生成レスポンス型のスキーマ
const SpotGuideManuscriptResponseSchema = z.object({
	title: z.string(),
	manuscript: z.string(),
	tags: z.array(z.string()),
	ssmlGender: z.enum(["FEMALE", "MALE", "NEUTRAL"]),
});

// スポットガイド生成レスポンス型
export type SpotGuideManuscriptResponse = z.infer<typeof SpotGuideManuscriptResponseSchema>;

/**
 * 🧠 Claude APIを使用して観光スポットの音声ガイド情報（原稿、タイトル、タグ、音声性別）を生成する関数。
 * - Static Masterに定義されたプロンプトを取得し、LLMへ投げてレスポンスを解析。
 * - 成功時は生成結果とメタ情報をすべて返却する。
 *
 * @param spotTitle - 対象スポットのタイトル
 * @param languageTag - 出力言語（例: 'ja', 'en-US'）
 * @param requestId - トレースID
 * @param userId - 呼び出しユーザーのID
 * @returns ガイド生成結果とプロンプトメタ情報
 */
export const generateSpotGuideContent = async (
	spotTitle: string,
	languageTag: string,
	requestId: string,
	userId: string,
): Promise<
	SpotGuideManuscriptResponse & {
		familyId: string;
		variantId: string;
		promptText: string;
		generatedText: string;
		promptInput: Record<string, any>;
		llmModel: string;
		temperature: number;
	}
> => {
	const llmModel = "claude-3-haiku-20240307";
	const temperature = 0.7;
	const variablePrompt = `
The tourist spot is "${spotTitle}".
Output the guide in ${languageTag}.`;
	const outputHint = `
Use the following JSON format.
Make sure the value of "tags" is a string array (not a string).
All newline characters in the "manuscript" field must be escaped as \\n.

{
  title: string;
  manuscript: string;
  tags: string[];
  ssmlGender: 'FEMALE' | 'MALE' | 'NEUTRAL';
}`;

	const { responseText, parsedJson, fullPrompt, familyId, variantId } = await callClaudeWithPrompt({
		llmModel,
		temperature,
		promptPurpose: "spot_guide_manuscript",
		variablePromptPart: variablePrompt,
		outputFormatHint: outputHint,
		requestId,
		userId,
	});

	const validatedResponse = SpotGuideManuscriptResponseSchema.safeParse(parsedJson);
	if (!validatedResponse.success) {
		throw new Error(`Claude API failed: JSON schema validation error - ${JSON.stringify(validatedResponse.error)}`);
	}

	// 📤 JSONとしてレスポンスをパースし返却
	return {
		...validatedResponse.data,
		familyId,
		variantId,
		promptText: fullPrompt,
		generatedText: responseText,
		promptInput: { spotTitle, languageTag },
		llmModel,
		temperature,
	};
};

// 観光地ガイド生成レスポンス型のスキーマ
const PlaceGuideManuscriptResponseSchema = z.object({
	title: z.string(),
	manuscript: z.string(),
	tags: z.array(z.string()),
	ssmlGender: z.enum(["FEMALE", "MALE", "NEUTRAL"]),
});
export const generateGeneratePlaceGuideContent = async (
	placeName: string,
	latitude: number,
	longitude: number,
	languageTag: string,
	requestId: string,
	userId: string,
): Promise<
	SpotGuideManuscriptResponse & {
		familyId: string;
		variantId: string;
		promptText: string;
		generatedText: string;
		promptInput: Record<string, any>;
		llmModel: string;
		temperature: number;
	}
> => {
	const llmModel = "claude-3-haiku-20240307";
	const temperature = 0.7;
	const variablePrompt = `The place is "${placeName}" located at (${latitude}, ${longitude}). Output the guide in ${languageTag}.`;
	const outputHint = `
Use the following JSON format.
Make sure the value of "tags" is a string array (not a string).
All newline characters in the "manuscript" field must be escaped as \\n.
{
  title: string;
  manuscript: string;
  tags: string[];
  ssmlGender: 'FEMALE' | 'MALE' | 'NEUTRAL';
}`;

	const { responseText, parsedJson, fullPrompt, familyId, variantId } = await callClaudeWithPrompt({
		llmModel,
		temperature,
		promptPurpose: "general_place_guide_manuscript",
		variablePromptPart: variablePrompt,
		outputFormatHint: outputHint,
		requestId,
		userId,
	});

	const validatedResponse = PlaceGuideManuscriptResponseSchema.safeParse(parsedJson);
	if (!validatedResponse.success) {
		throw new Error(`Claude API failed: JSON schema validation error - ${JSON.stringify(validatedResponse.error)}`);
	}

        return {
                ...validatedResponse.data,
                familyId,
                variantId,
                promptText: fullPrompt,
                generatedText: responseText,
                promptInput: { placeName, latitude, longitude, languageTag },
                llmModel,
                temperature,
        };
};

export const generatePlaceGuideFromCategoryContent = async (
        placeName: string,
        latitude: number,
        longitude: number,
        categoryDescription: string,
        languageTag: string,
        requestId: string,
        userId: string,
): Promise<
        SpotGuideManuscriptResponse & {
                familyId: string;
                variantId: string;
                promptText: string;
                generatedText: string;
                promptInput: Record<string, any>;
                llmModel: string;
                temperature: number;
        }
> => {
        const llmModel = "claude-3-haiku-20240307";
        const temperature = 0.7;
        const variablePrompt = `The place is "${placeName}" located at (${latitude}, ${longitude}). The guide topic is "${categoryDescription}". Output the guide in ${languageTag}.`;
        const outputHint = `
Use the following JSON format.
Make sure the value of "tags" is a string array (not a string).
All newline characters in the "manuscript" field must be escaped as \\n.
{
  title: string;
  manuscript: string;
  tags: string[];
  ssmlGender: 'FEMALE' | 'MALE' | 'NEUTRAL';
}`;

        const { responseText, parsedJson, fullPrompt, familyId, variantId } = await callClaudeWithPrompt({
                llmModel,
                temperature,
                promptPurpose: "place_guide_from_category_manuscript",
                variablePromptPart: variablePrompt,
                outputFormatHint: outputHint,
                requestId,
                userId,
        });

        const validatedResponse = PlaceGuideManuscriptResponseSchema.safeParse(parsedJson);
        if (!validatedResponse.success) {
                throw new Error(`Claude API failed: JSON schema validation error - ${JSON.stringify(validatedResponse.error)}`);
        }

        return {
                ...validatedResponse.data,
                familyId,
                variantId,
                promptText: fullPrompt,
                generatedText: responseText,
                promptInput: { placeName, latitude, longitude, categoryDescription, languageTag },
                llmModel,
                temperature,
        };
};

export const generatePlaceGuideFromQuestionContent = async (
        placeName: string,
        latitude: number,
        longitude: number,
        question: string,
        languageTag: string,
        requestId: string,
        userId: string,
): Promise<
        SpotGuideManuscriptResponse & {
                familyId: string;
                variantId: string;
                promptText: string;
                generatedText: string;
                promptInput: Record<string, any>;
                llmModel: string;
                temperature: number;
        }
> => {
        const llmModel = "claude-3-haiku-20240307";
        const temperature = 0.7;
        const variablePrompt = `The place is "${placeName}" located at (${latitude}, ${longitude}). The user question is "${question}". Answer in ${languageTag}.`;
        const outputHint = `
Use the following JSON format.
Make sure the value of "tags" is a string array (not a string).
All newline characters in the "manuscript" field must be escaped as \\n.
{
  title: string;
  manuscript: string;
  tags: string[];
  ssmlGender: 'FEMALE' | 'MALE' | 'NEUTRAL';
}`;

        const { responseText, parsedJson, fullPrompt, familyId, variantId } = await callClaudeWithPrompt({
                llmModel,
                temperature,
                promptPurpose: "place_guide_from_question_manuscript",
                variablePromptPart: variablePrompt,
                outputFormatHint: outputHint,
                requestId,
                userId,
        });

        const validatedResponse = PlaceGuideManuscriptResponseSchema.safeParse(parsedJson);
        if (!validatedResponse.success) {
                throw new Error(`Claude API failed: JSON schema validation error - ${JSON.stringify(validatedResponse.error)}`);
        }

        return {
                ...validatedResponse.data,
                familyId,
                variantId,
                promptText: fullPrompt,
                generatedText: responseText,
                promptInput: { placeName, latitude, longitude, question, languageTag },
                llmModel,
                temperature,
        };
};

export const generateHighlightGuideFromQuestionContent = async (
        placeName: string,
        latitude: number,
        longitude: number,
        question: string,
        generalHighlightGuideTitle: string,
        generalHighlightGuideManuscript: string,
        languageTag: string,
        requestId: string,
        userId: string,
): Promise<
        SpotGuideManuscriptResponse & {
                familyId: string;
                variantId: string;
                promptText: string;
                generatedText: string;
                promptInput: Record<string, any>;
                llmModel: string;
                temperature: number;
        }
> => {
        const llmModel = "claude-3-haiku-20240307";
        const temperature = 0.7;
        const variablePrompt = `The place is "${placeName}" located at (${latitude}, ${longitude}). There is a highlight titled "${generalHighlightGuideTitle}" described as "${generalHighlightGuideManuscript}". The user question is "${question}". Provide an answer in ${languageTag}.`;
        const outputHint = `
Use the following JSON format.
Make sure the value of "tags" is a string array (not a string).
All newline characters in the "manuscript" field must be escaped as \\n.
{
  title: string;
  manuscript: string;
  tags: string[];
  ssmlGender: 'FEMALE' | 'MALE' | 'NEUTRAL';
}`;

        const { responseText, parsedJson, fullPrompt, familyId, variantId } = await callClaudeWithPrompt({
                llmModel,
                temperature,
                promptPurpose: "highlight_guide_from_question_manuscript",
                variablePromptPart: variablePrompt,
                outputFormatHint: outputHint,
                requestId,
                userId,
        });

        const validatedResponse = PlaceGuideManuscriptResponseSchema.safeParse(parsedJson);
        if (!validatedResponse.success) {
                throw new Error(`Claude API failed: JSON schema validation error - ${JSON.stringify(validatedResponse.error)}`);
        }

        return {
                ...validatedResponse.data,
                familyId,
                variantId,
                promptText: fullPrompt,
                generatedText: responseText,
                promptInput: { placeName, latitude, longitude, question, generalHighlightGuideTitle, generalHighlightGuideManuscript, languageTag },
                llmModel,
                temperature,
        };
};
