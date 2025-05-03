import { logBackendEvent } from "../lib/logger";
import { prisma } from '../lib/prisma';
import { getWikipediaImageFromKgid } from "../lib/wikipedia";
import { PrismaExtSpots } from "../../../../shared/converters/convert_ext_spots";

type FindOrCreateSpotOptions = {
    spotTitle?: string | null;
    imageUrl?: string | null;
    detectionType?: PrismaExtSpots['vision_detection_type'] | null;
    landmark_latitude?: number | null;
    landmark_longitude?: number | null;
};

export const findOrCreateSpotFromId = async (
    spotId: string,
    requestId: string,
    userId: string,
    {
        spotTitle,
        imageUrl,
        detectionType,
        landmark_latitude,
        landmark_longitude,
    }: FindOrCreateSpotOptions = {}
): Promise<PrismaExtSpots> => {
    const functionName = 'findOrCreateSpotFromId';

    // 📋 既存スポットがあればそれを返却
    const existingSpot = await prisma.ext_spots.findUnique({ where: { id: spotId } });
    if (existingSpot) return existingSpot;

    if (!imageUrl && !spotTitle) {
        try {
            // 📚 Wikipedia からタイトル/画像を取得
            const { imageUrl: wikiImageUrl, title } = await getWikipediaImageFromKgid(spotId, requestId, userId);
            spotTitle = title;
            imageUrl = wikiImageUrl;
        } catch (error) {
            logBackendEvent({
                event_name: 'wikipediaFetchError',
                error_level: 'error',
                function_name: functionName,
                user_id: userId,
                request_id: requestId,
                payload: { spotId, error: error instanceof Error ? error.message : String(error) },
            });
            throw new Error('Failed to fetch data from Wikipedia');
        }
    }

    if (!spotTitle || !imageUrl) {
        logBackendEvent({
            event_name: 'wikipediaDataMissing',
            error_level: 'warn',
            function_name: functionName,
            user_id: userId,
            request_id: requestId,
            payload: { spotId, imageUrl, spotTitle },
        });
    }

    if (!spotTitle) {
        throw new Error('Spot title is required');
    }

    // 📝 新しいスポットを作成
    const newSpot = await prisma.ext_spots.create({
        data: {
            id: spotId,
            title: spotTitle,
            image_url: imageUrl,
            vision_detection_type: detectionType,
            landmark_latitude,
            landmark_longitude,
            is_recommendable: !!imageUrl,
            created_at: new Date(),
            lock_no: 0,
        },
    });

    return newSpot;
};
