import { prisma } from '../lib/prisma';
import { getCurrentVersionFromRequest } from '../lib/backendUtils';
import { logBackendEvent } from '../lib/logger';
import { withValidatedAuthHandler } from '../lib/handler';
import { uploadFile } from '../lib/storage';
import { generateSpotGuideRequestSchema, GenerateSpotGuideResponse } from '../../../../shared/api/generateSpotGuide.schema';
import { generateSpotGuideContent } from '../lib/claude';
import { synthesizeTextToSpeech } from '../lib/textToSpeech';
import { getRemoteConfigValue } from '../lib/remoteConfig';
import { randomUUID } from 'crypto';
import { convertPrismaToSupabase_SpotGuides } from '../../../../shared/converters/convert_spot_guides';

const DEFAULT_SPOT_GUIDE_CREATED_USER_ID = '00000000-0000-0000-0000-000000000000';

/**
 * 🧠 Claude × TTS を用いて、観光ガイドを生成・保存する Cloud Function。
 *
 * @param extSpot - 観光スポット情報
 * @param languageTag - 言語タグ
 * @returns 作成されたガイド情報 + 音声URL を返却（JSON形式）
 */
export const generateSpotGuide = withValidatedAuthHandler(
    generateSpotGuideRequestSchema,
    async function withValidatedAuthHandler({ req, res, input, requestId, userId, functionName }) {
        const { extSpot, languageTag } = input;
        const spotGuideId = randomUUID();

        // 📦 Remote Config より対象バージョン上限を取得
        const maxVersionMajor = parseInt(
            await getRemoteConfigValue('v1_spot_guides_max_version_major', requestId, userId)
        );

        // ✍️ Claude によるコンテンツ生成
        const {
            title,
            manuscript,
            tags,
            ssmlGender,
            familyId,
            variantId,
            promptText,
            generatedText,
            promptInput,
            llmModel,
            temperature,
        } = await generateSpotGuideContent(extSpot.title, languageTag, requestId, userId);

        // 🔊 TTS による音声合成
        const audioBuffer = await synthesizeTextToSpeech({
            text: manuscript,
            languageTag,
            ssmlGender,
            requestId,
            userId,
        });

        // ☁️ 音声ファイルを Cloud Storage にアップロード
        const { path: audioPath, signedUrl: audioUrl } = await uploadFile({
            buffer: audioBuffer,
            mimeType: 'audio/mpeg',
            resourceType: 'system-generated',
            usageType: 'audio-guides',
            identifier: extSpot.id,
            fileName: spotGuideId,
            requestId,
            createdVersion: getCurrentVersionFromRequest(req),
        });

        // 🧾 spot_guides 登録
        const spotGuide = await prisma.spot_guides.create({
            data: {
                id: spotGuideId,
                spot_id: extSpot.id,
                language_tag: languageTag,
                title,
                manuscript,
                tags,
                audio_storage_path: audioPath,
                price_amount: 0,
                currency: null,
                recommendation_weight: 1,
                min_version_major: 1,
                max_version_major: maxVersionMajor,
                // 【思想】登録未済のスポットでは、システムがその場で生成・登録する #17
                created_user: DEFAULT_SPOT_GUIDE_CREATED_USER_ID,
                created_at: new Date(),
                created_request_id: requestId,
                lock_no: 0,
            },
        });

        // 🧠 プロンプト使用履歴の登録
        await prisma.prompt_usages.create({
            data: {
                id: randomUUID(),
                family_id: familyId,
                variant_id: variantId,
                target_type: 'spot_guides',
                target_id: spotGuideId,
                generated_text: generatedText,
                used_prompt_text: promptText,
                input_data: promptInput,
                llm_model: llmModel,
                temperature,
                generated_user: DEFAULT_SPOT_GUIDE_CREATED_USER_ID,
                created_at: new Date(),
            },
        });

        // 📘 成功ログ（非同期）
        logBackendEvent({
            event_name: 'generateSpotGuideSuccess',
            function_name: functionName,
            request_id: requestId,
            user_id: userId,
            error_level: 'info',
            payload: {
                spotId: extSpot.id,
                spotGuideId,
                languageTag,
            },
        });

        // ✅ レスポンス返却（音声URL付き）
        const response: GenerateSpotGuideResponse = {
            spotGuide: convertPrismaToSupabase_SpotGuides(spotGuide),
            audioUrl,
        };

        res.status(200).json(response);
    }
);
