import { logBackendEvent } from "../lib/logger";
import { identifyPlaceCandidates } from "../lib/vision";
import { findOrCreatePlaceFromId } from "./findOrCreatePlaceFromId";

export const findOrCreatePlaceFromImageUri = async (imageUri: string, requestId: string, userId: string) => {
	const functionName = "findOrCreatePlaceFromImageUri";

	// 🔍 Vision API による候補抽出
	const { candidates, fullMatchingImages } = await identifyPlaceCandidates(imageUri, requestId, userId);

	if (candidates.length === 0) {
		logBackendEvent({
			request_id: requestId,
			function_name: functionName,
			event_name: "noPlaceCandidatesFound",
			user_id: userId,
			payload: { imageUri },
			error_level: "warn",
		});
		throw new Error("No valid place candidate found");
	}

	const top = candidates[0];
	const placeId = top.detectionType === "LANDMARK_DETECTION" ? top.mid : top.entityId;

	let image_url: string | null = null;
	let placeTitle: string | null = top.description ?? null;

	if (top.detectionType === "WEB_DETECTION" && fullMatchingImages?.length) {
		const sorted = [...fullMatchingImages].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
		image_url = sorted[0]?.url ?? null;
	}

	return await findOrCreatePlaceFromId(placeId, requestId, userId, {
		placeTitle,
		imageUrl: image_url,
		detectionType: top.detectionType,
		landmark_latitude:
			top.detectionType === "LANDMARK_DETECTION" ? (top.locations?.[0]?.latLng?.latitude ?? null) : null,
		landmark_longitude:
			top.detectionType === "LANDMARK_DETECTION" ? (top.locations?.[0]?.latLng?.longitude ?? null) : null,
	});
};
