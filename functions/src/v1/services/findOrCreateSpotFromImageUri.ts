import { logBackendEvent } from "../lib/logger";
import { identifySpotCandidates } from "../lib/vision";
import { findOrCreateSpotFromId } from "./findOrCreateSpotFromId";

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

    let image_url: string | null = null;
    let spotTitle: string | null = top.description ?? null;

    if (top.detectionType === 'WEB_DETECTION' && fullMatchingImages?.length) {
        const sorted = [...fullMatchingImages].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        image_url = sorted[0]?.url ?? null;
    }

    return await findOrCreateSpotFromId(
        spotId,
        requestId,
        userId,
        {
            spotTitle,
            imageUrl: image_url,
            detectionType: top.detectionType,
            landmark_latitude: top.detectionType === 'LANDMARK_DETECTION' ? top.locations?.[0]?.latLng?.latitude ?? null : null,
            landmark_longitude: top.detectionType === 'LANDMARK_DETECTION' ? top.locations?.[0]?.latLng?.longitude ?? null : null,
        }
    );

}