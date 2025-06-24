import { logBackendEvent } from "../lib/logger";
import { prisma } from "../lib/prisma";
import { getWikipediaImageFromKgid } from "../lib/wikipedia";
import { PrismaExtPlaces } from "../../../../shared/converters/convert_ext_places";

type FindOrCreatePlaceOptions = {
	placeTitle?: string | null;
	imageUrl?: string | null;
	detectionType?: PrismaExtPlaces["vision_detection_type"] | null;
	landmark_latitude?: number | null;
	landmark_longitude?: number | null;
};

export const findOrCreatePlaceFromId = async (
	placeId: string,
	requestId: string,
	userId: string,
	{ placeTitle, imageUrl, detectionType, landmark_latitude, landmark_longitude }: FindOrCreatePlaceOptions = {},
): Promise<PrismaExtPlaces> => {
	const functionName = "findOrCreatePlaceFromId";

	// 📋 既存スポットがあればそれを返却
	const existingPlace = await prisma.ext_places.findUnique({ where: { id: placeId } });
	if (existingPlace) return existingPlace;

	if (!imageUrl || !placeTitle) {
		try {
			// 📚 Wikipedia からタイトル/画像を取得
			const { imageUrl: wikiImageUrl, title } = await getWikipediaImageFromKgid(placeId, requestId, userId);
			placeTitle = title;
			imageUrl = wikiImageUrl;
		} catch (error) {
			logBackendEvent({
				event_name: "wikipediaFetchError",
				error_level: "error",
				function_name: functionName,
				user_id: userId,
				request_id: requestId,
				payload: { placeId, error: error instanceof Error ? error.message : String(error) },
			});
			throw new Error("Failed to fetch data from Wikipedia");
		}
	}

	if (!placeTitle || !imageUrl) {
		logBackendEvent({
			event_name: "wikipediaDataMissing",
			error_level: "warn",
			function_name: functionName,
			user_id: userId,
			request_id: requestId,
			payload: { placeId, imageUrl, placeTitle },
		});
	}

	if (!placeTitle) {
		throw new Error("Place title is required");
	}

	// 📝 新しいスポットを作成
	const newPlace = await prisma.ext_places.create({
		data: {
			id: placeId,
			title: placeTitle,
			image_url: imageUrl,
			vision_detection_type: detectionType,
			landmark_latitude,
			landmark_longitude,
			is_recommendable: !!imageUrl,
			created_at: new Date(),
			lock_no: 0,
		},
	});

	return newPlace;
};
