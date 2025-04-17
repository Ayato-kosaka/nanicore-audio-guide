import { z } from 'zod';
import { withValidatedAuthHandler } from '../lib/handler';
import { identifySpotCandidates } from '../lib/vision';
import { getCurrentVersionFromRequest } from '../lib/backendUtils';
import { getWikipediaImageFromMid } from '../lib/wikipedia';
import { prisma } from '../lib/prisma';
import { uploadFile } from '../lib/storage';
import { logBackendEvent } from '../lib/logger';

/**
 * 📸 アップロードされた画像を Vision API で解析し、
 * 該当するスポット情報を DB に取得または、登録する Cloud Function。
 */
export const findOrCreateSpotFromImage = withValidatedAuthHandler(
    z.object({}),
    async ({ req, res, requestId, userId, functionName }) => {
        const file = req.file!;

        // ☁️ GCSへアップロード
        const { path: imagePath, signedUrl: imageUri } = await uploadFile({
            buffer: file.buffer,
            mimeType: file.mimetype,
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

        // 📋 既存スポットがあればそれを返す
        const existing = await prisma.ext_spots.findUnique({ where: { id: spotId } });
        if (existing) {
            res.status(200).json(existing);
            return;
        }

        let image_url: string | null = null;
        let spotTitle: string | null = top.description ?? null;

        // 📚 Wikipedia から画像＋タイトルを取得（可能なら）
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

        if (!spotTitle) throw new Error('spotTitle is required');

        // 📝 スポット情報を DB に作成
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

        res.status(200).json({
            ext_spots: inserted,
            uploadedUri: imageUri,
            takenPhotoStoragePath: imagePath,
        });
    },
    {
        useMulter: true,
        multerFieldName: 'image',
    }
);
