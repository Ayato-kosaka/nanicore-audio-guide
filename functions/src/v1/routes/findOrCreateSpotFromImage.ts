import { onRequest } from 'firebase-functions/v2/https';
import multer from 'multer';
import { identifySpotCandidates } from '../lib/vision';
import {
    createRequestId,
    getCurrentVersionFromRequest,
    withAuthUser,
} from '../lib/backendUtils';
import {
    logBackendEvent,
    handleFunctionError,
    handleInvalidRequest,
} from '../lib/logger';
import { getWikipediaImageFromMid } from '../lib/wikipedia';
import { prisma } from '../lib/prisma';
import { uploadFile } from '../lib/storage';

const upload = multer({ storage: multer.memoryStorage() });

/**
 * 📸 アップロードされた画像を Vision API で解析し、
 * スポット情報を取得または作成する Cloud Function。
 */
export const findOrCreateSpotFromImage = onRequest(async (req, res) => {
    const requestId = createRequestId();
    const functionName = 'findOrCreateSpotFromImage';

    try {
        const { userId } = await withAuthUser(req);

        // 🚀 アクセスログ（非同期記録）
        logBackendEvent({
            request_id: requestId,
            function_name: functionName,
            event_name: 'accessed',
            user_id: userId,
            payload: {},
            error_level: 'info',
        });

        // 📂 画像ファイル受信（multipart/form-data）
        await new Promise<void>((resolve, reject) => {
            upload.single('image')(req as any, res as any, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        if (!req.file) {
            return handleInvalidRequest({
                req,
                res,
                requestId,
                functionName,
                userId,
                zodIssues: [],
            });
        }

        // ☁️ GCSへアップロード → 公開URL生成
        const { path: imagePath, signedUrl: imageUri } = await uploadFile({
            buffer: req.file.buffer,
            mimeType: req.file.mimetype,
            resourceType: 'user-uploads',
            usageType: 'photos',
            identifier: userId,
            fileName: 'capture',
            requestId,
            createdVersion: getCurrentVersionFromRequest(req),
            expiresInSeconds: 24 * 60 * 60,
        });

        // 👁️ Vision APIでスポット候補を検出
        const { candidates, fullMatchingImages } = await identifySpotCandidates(imageUri, requestId, userId);

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
        }

        const top = candidates[0];
        const spotId: string =
            top.detectionType === 'LANDMARK_DETECTION' ? top.mid : top.entityId;

        // 🧾 既存チェック
        const existing = await prisma.ext_spots.findUnique({
            where: { id: spotId },
        });
        if (existing) {
            res.status(200).json(existing);
        }

        // 🔍 Wikipedia画像・タイトル取得
        let image_url: string | null = null;
        let spotTitle: string | null = top.description ?? null;

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

        // 📝 新規スポット作成
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
    } catch (err: any) {
        return handleFunctionError({
            req,
            res,
            err,
            requestId,
            functionName,
        });
    }
});
