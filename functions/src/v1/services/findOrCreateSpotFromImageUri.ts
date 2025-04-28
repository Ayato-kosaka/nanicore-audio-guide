import { logBackendEvent } from "../lib/logger";
import { identifySpotCandidates } from "../lib/vision";
import { prisma } from '../lib/prisma';
import { getWikipediaImageFromMid } from "../lib/wikipedia";

export const findOrCreateSpotFromImageUri = async (
    imageUri: string,
    requestId: string,
    userId: string
) => {
    const functionName = 'findOrCreateSpotFromImageUri';

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
        throw new Error('No valid spot candidate found');
    }

    const top = candidates[0];
    const spotId = top.detectionType === 'LANDMARK_DETECTION' ? top.mid : top.entityId;

    // 📋 既存スポットがあればそれを返却
    const existing = await prisma.ext_spots.findUnique({ where: { id: spotId } });
    if (existing) {
        return (existing);
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

    return (inserted);
}