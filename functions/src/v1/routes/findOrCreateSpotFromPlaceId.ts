import { withValidatedAuthHandler } from "../lib/handler";
import { prisma } from "../lib/prisma";
import {
    findOrCreateSpotFromPlaceIdRequestSchema,
    FindOrCreateSpotFromPlaceIdResponse,
} from "../../../../shared/api/findOrCreateSpotFromPlaceId.schema";
import { convertPrismaToSupabase_ExtSpots, PrismaExtSpots } from "../../../../shared/converters/convert_ext_spots";
import { callExternalApi } from "../lib/backendUtils";
import { env } from "process";

// 型：PlaceDetailsレスポンスの型
type PlaceDetailsResponse = {
    title: string;
    imageUrl: string | null;
};

// 仮のAPI関数：本来は `lib/api` などに定義して分離する
async function fetchPlaceDetails(placeId: string, requestId: string, userId: string): Promise<PlaceDetailsResponse> {
    const apiKey = env.GOOGLE_MAPS_API_KEY;

    try {
        const placeResponse = await callExternalApi<{
            displayName?: { text: string };
            photos?: { name: string }[];
        }>({
            requestId,
            functionName: "fetchPlaceDetails",
            apiName: "places.googleapis",
            endpoint: `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,photos&key=${apiKey}`,
            method: "GET",
            userId,
        });

        const title = placeResponse.displayName?.text;
        if (!title) {
            throw new Error(`Place Details API response missing 'name' for placeId: ${placeId}`);
        }
        const photoRef = placeResponse.photos?.[0]?.name;
        if (!photoRef) {
            throw new Error(`Place Details API response missing 'photos' for placeId: ${placeId}`);
        }

        const photoResponse = await callExternalApi<{
            name?: string;
            photoUri?: string;
        }>({
            requestId,
            functionName: "fetchPlaceDetails",
            apiName: "places.googleapis",
            endpoint: `https://places.googleapis.com/v1/${photoRef}/media?maxWidthPx=800&key=${apiKey}`,
            method: "GET",
            customHeaders: {
                Accept: "application/json",
            },
            redirect: "manual",
            userId,
        });
        if (!photoResponse.photoUri) {
            throw new Error(`Place Details API response missing 'photoUri' for placeId: ${placeId}`);
        }

        return { title, imageUrl: photoResponse.photoUri };
    } catch (error) {
        console.error(`[${requestId}] Failed to fetch place details`, error);
        throw new Error("Failed to fetch place details from Google API");
    }
}

export const findOrCreateSpotFromPlaceId = withValidatedAuthHandler(
    findOrCreateSpotFromPlaceIdRequestSchema,
    async function findOrCreateSpotFromPlaceId({ res, input, requestId, userId }) {
        const { placeId } = input;

        let extSpot: PrismaExtSpots | null = await prisma.ext_spots.findUnique({ where: { id: "/placeId/" + placeId } });

        if (!extSpot) {
            const { title, imageUrl } = await fetchPlaceDetails(placeId, requestId, userId);

            // 📝 新しいスポットを作成
            extSpot = await prisma.ext_spots.create({
                data: {
                    id: "/placeId/" + placeId,
                    title,
                    image_url: imageUrl,
                    vision_detection_type: null,
                    landmark_latitude: null,
                    landmark_longitude: null,
                    is_recommendable: false,
                    created_at: new Date(),
                    lock_no: 0,
                },
            });
        }

        const response: FindOrCreateSpotFromPlaceIdResponse = {
            extSpots: convertPrismaToSupabase_ExtSpots(extSpot),
        };

        res.status(200).json(response);
    },
);
