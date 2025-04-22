import { env } from './env';
import { getStaticMaster } from './getStaticMaster';
import { callExternalApi } from './backendUtils';

// Claude API のレスポンス型
interface MessageResponse {
    id: string;
    model: string;
    role: 'assistant';
    type: 'message';
    content: {
        type: 'text';
        text: string;
        citations: {
            type: 'char_location';
            cited_text: string;
            document_index: number; // x > 0
            document_title: string | null;
            start_char_index: number; // x > 0
            end_char_index: number;
        }[] | null;
    }[];
    stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | 'tool_use';
    stop_sequence: string | null;
    usage: {
        input_tokens: number;
        output_tokens: number;
        // オプションで追加できる項目
        cache_creation_input_tokens?: number;
        cache_read_input_tokens?: number;
    };
};

// スポットガイド生成レスポンス型
export type SpotGuideManuscriptResponse = {
    title: string;
    manuscript: string;
    tags: string[];
    ssmlGender: 'FEMALE' | 'MALE' | 'NEUTRAL';
};

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
    userId: string
): Promise<SpotGuideManuscriptResponse & {
    familyId: string;
    variantId: string;
    promptText: string;
    generatedText: string;
    promptInput: Record<string, any>;
    llmModel: string;
    temperature: number;
}> => {
    const llmModel = 'claude-3-haiku-20240307';
    const temperature = 0.7;

    try {
        // 🎯 Static Masterからプロンプトファミリー・バリアントを読み込み
        const promptFamilies = await getStaticMaster('prompt_families');
        const selectedFamily = promptFamilies
            .filter((x) => x.purpose === 'spot_guide_manuscript')
            .filter((x) => x.weight > 0)
            .sort((a, b) => a.weight - b.weight)[0];

        const promptVariants = await getStaticMaster('prompt_variants');
        const selectedVariant = promptVariants
            .filter((x) => x.family_id === selectedFamily.id)
            .sort((a, b) => a.variant_number - b.variant_number)[0];

        const basePrompt = selectedVariant.prompt_text;

        // 🎨 実際のプロンプト文を構築（JSON形式でレスポンスを要求）
        const prompt = `
${basePrompt}

The tourist spot is "${spotTitle}".
Output the guide in ${languageTag}.
Use the following JSON format.
Make sure the value of "tags" is a string array (not a string).

{
  title: string;
  manuscript: string;
  tags: string[];
  ssmlGender: 'FEMALE' | 'MALE' | 'NEUTRAL';
}`.trim();

        const requestPayload = {
            model: llmModel,
            max_tokens: 512,
            temperature,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        };

        // 📡 Claude API を呼び出し
        // @see https://docs.anthropic.com/en/api/messages
        const response = await callExternalApi<MessageResponse>({
            requestId,
            functionName: 'generateSpotGuideContent',
            apiName: 'Claude',
            endpoint: 'https://api.anthropic.com/v1/messages',
            customHeaders: {
                'anthropic-version': '2023-06-01',
                'x-api-key': env.FUNCTIONS_CLAUDE_API_KEY,
            },
            method: 'POST',
            requestPayload,
            userId,
        });

        if (response.stop_reason && response.stop_reason !== 'end_turn') {
            throw new Error(`Claude API failed: Unexpected stop_reason - ${response.stop_reason}`);
        }

        // 📤 JSONとしてレスポンスをパースし返却
        return {
            ...JSON.parse(response.content[0].text || '{}') as SpotGuideManuscriptResponse,
            familyId: selectedFamily.id,
            variantId: selectedVariant.id,
            promptText: prompt,
            generatedText: response.content[0].text,
            promptInput: { spotTitle, languageTag },
            llmModel,
            temperature,
        };
    } catch (error: any) {
        throw new Error(`Claude API call failed: ${error.message}`);
    }
};