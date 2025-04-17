import { prisma } from '../lib/prisma';
import {
    getCurrentVersionFromRequest,
} from '../lib/backendUtils';
import { logBackendEvent } from '../lib/logger';
import { withValidatedAuthHandler } from '../lib/handler';
import { uploadFile } from '../lib/storage';
import { generateSpotGuideRequestSchema } from '@shared/api/generateSpotGuide.schema';
import { generateSpotGuideContent } from '../lib/claude';
import { synthesizeTextToSpeech } from '../lib/textToSpeech';
import { getRemoteConfigValue } from '../lib/remoteConfig';
const nanoid = require('nanoid');

const DEFAULT_SPOT_GUIDE_CREATED_BY = 'system';

/**
 * 🧠 Claude × TTS を用いて、観光ガイドを生成し保存する Cloud Function。
 *
 * @param extSpot - 観光スポット情報
 * @param languageTag - 言語タグ
 * @returns ガイド情報 + 音声URL を返却（JSON形式）
 */
export const generateSpotGuide = withValidatedAuthHandler(
    generateSpotGuideRequestSchema,
    async ({ req, res, input, requestId, userId, functionName }) => {
        const { extSpot, languageTag } = input;

        // 🆔 一意なガイドIDを生成
        const spotGuideId = nanoid(12);

        // 📦 Remote Configから適用対象バージョン最大値を取得
        const maxVersionMajor = parseInt(
            await getRemoteConfigValue(
                'v1_spot_guides_max_version_major',
                requestId,
                userId
            )
        );

        // ✍️ Claudeにより観光ガイドコンテンツ（タイトル・本文・タグ）を生成
        const { title, manuscript, tags, ssmlGender } =
            await generateSpotGuideContent(
                extSpot.title,
                languageTag,
                requestId,
                userId
            );

        // 🔊 TTS による音声合成（音声性別も Claudeから取得）
        const audioBuffer = await synthesizeTextToSpeech({
            text: manuscript,
            languageTag,
            ssmlGender,
            requestId,
            userId,
        });

        // ☁️ Cloud Storage に音声ファイルをアップロード
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

        // 🧾 DBへスポットガイド情報を登録
        const spotGuide = await prisma.spot_guides.create({
            data: {
                id: spotGuideId,
                spot_id: extSpot.id,
                language_tag: languageTag,
                title,
                manuscript,
                tags,
                audio_storage_path: audioPath,
                voice_type: ssmlGender,
                price_amount: 0,
                currency: null,
                weight: 0,
                min_version_major: 1,
                max_version_major: maxVersionMajor,
                // 【思想】登録未済のスポットでは、システムがその場で生成・登録する #17
                created_by: DEFAULT_SPOT_GUIDE_CREATED_BY,
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

        // 🎧 クライアントへレスポンス返却（音声URL含む）
        res.status(200).json({
            ...spotGuide,
            audioUrl,
        });
    }
);
