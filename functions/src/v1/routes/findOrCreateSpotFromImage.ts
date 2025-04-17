import { z } from 'zod';
import { withValidatedAuthHandler } from '../lib/handler';
import { identifySpotCandidates } from '../lib/vision';
import { getCurrentVersionFromRequest } from '../lib/backendUtils';
import { getWikipediaImageFromMid } from '../lib/wikipedia';
import { prisma } from '../lib/prisma';
import { uploadFile } from '../lib/storage';
import { logBackendEvent } from '../lib/logger';
import { FindOrCreateSpotFromImageResponse } from '../../../../shared/api/findOrCreateSpotFromImage.schema';
import { convertPrismaToSupabase_ExtSpots } from '../../../../shared/converters/convert_ext_spots';

/**
 * ✨ アップロード画像を解析し、対応するスポット情報を返却または新規作成する Cloud Function。
 *
 * @param file - アップロードされた画像ファイル（multipart）
 * @param requestId - 各リクエストの一意な ID（トレース用）
 * @param userId - リクエスト元のユーザー ID
 * @param req - Firebase Request オブジェクト
 * @param res - Firebase Response オブジェクト
 * @returns FindOrCreateSpotFromImageResponse JSON
 */
export const findOrCreateSpotFromImage = withValidatedAuthHandler(
    z.object({}),
    async function findOrCreateSpotFromImage({ req, res, requestId, userId, functionName, file }) {
        if (!file) return;

        // ☁️ GCS へアップロードし URI を生成
        const { path: imagePath, signedUrl: imageUri } = await uploadFile({
            buffer: file.buffer,
            mimeType: file.info.mimeType,
            resourceType: 'user-uploads',
            usageType: 'photos',
            identifier: userId,
            fileName: 'capture',
            requestId,
            createdVersion: getCurrentVersionFromRequest(req),
            expiresInSeconds: 24 * 60 * 60,
        });

        // 🔍 Vision API による候補抽出
        const { candidates, fullMatchingImages } = await identifySpotCandidates(
            imageUri,
            requestId,
            userId
        );

        if (candidates.length === 0) {
            logBackendEvent({
                request_id: requestId,
                function_name: functionName,
                event_name: 'noSpotCandidatesFound',
                user_id: userId,
                payload: { imageUri },
                error_level: 'warn',
            });
            res.status(404).json({ error: 'No valid spot candidate found' });
            return;
        }

        const top = candidates[0];
        const spotId = top.detectionType === 'LANDMARK_DETECTION' ? top.mid : top.entityId;

        // 📋 既存スポットがあればそれを返却
        const existing = await prisma.ext_spots.findUnique({ where: { id: spotId } });
        if (existing) {
            res.status(200).json({
                ext_spots: existing,
                uploadedUri: imageUri,
                takenPhotoStoragePath: imagePath,
            });
            return;
        }

        let image_url: string | null = null;
        let spotTitle: string | null = top.description ?? null;

        // 📚 Wikipedia からタイトル/画像を取得
        if (top.detectionType === 'LANDMARK_DETECTION' && top.mid) {
            const wiki = await getWikipediaImageFromMid(top.mid, requestId, userId);
            image_url = wiki?.imageUrl ?? null;
            spotTitle = wiki?.title ?? spotTitle ?? null;

            if (!spotTitle || !image_url) {
                logBackendEvent({
                    event_name: 'wikipediaDataMissing',
                    error_level: 'warn',
                    function_name: functionName,
                    user_id: userId,
                    payload: { mid: top.mid, wiki },
                    request_id: requestId,
                });
            }
        } else if (top.detectionType === 'WEB_DETECTION' && fullMatchingImages?.length) {
            const sorted = [...fullMatchingImages].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
            image_url = sorted[0]?.url ?? null;

            if (!spotTitle || !image_url) {
                logBackendEvent({
                    event_name: 'webImageMissing',
                    error_level: 'warn',
                    function_name: functionName,
                    user_id: userId,
                    payload: JSON.stringify(top),
                    request_id: requestId,
                });
            }
        }

        if (!spotTitle) throw new Error('Spot title is required');

        // 📍 新しいスポットとして DB に登録
        const inserted = await prisma.ext_spots.create({
            data: {
                id: spotId,
                title: spotTitle,
                image_url,
                vision_detection_type: top.detectionType,
                landmark_latitude:
                    top.detectionType === 'LANDMARK_DETECTION'
                        ? top.locations?.[0].latLng?.latitude ?? null
                        : null,
                landmark_longitude:
                    top.detectionType === 'LANDMARK_DETECTION'
                        ? top.locations?.[0].latLng?.longitude ?? null
                        : null,
                is_recommendable: image_url !== null,
                created_at: new Date(),
                lock_no: 0,
            },
        });

        const response: FindOrCreateSpotFromImageResponse = {
            extSpots: convertPrismaToSupabase_ExtSpots(inserted),
            uploadedUri: imageUri,
            takenPhotoStoragePath: imagePath,
        };

        res.status(200).json(response);
    },
    {
        useMultipart: true,
        fileRequired: true,
    }
);
