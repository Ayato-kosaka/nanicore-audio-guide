import type { SpotGuideParams, SpotGuideSerializedParams } from "@/types/navigation";
import type { PlaceGuideParams, PlaceGuideSerializedParams } from "@/types/navigation";
import { convertSupabaseToPrisma_ExtSpots } from "@shared/converters/convert_ext_spots";
import { convertSupabaseToPrisma_ExtPlaces } from "@shared/converters/convert_ext_places";
export const serializeSpotGuideParams = (params: SpotGuideParams): SpotGuideSerializedParams => ({
	extSpots: JSON.stringify(params.extSpots),
	takenPhotoStoragePath: params.takenPhotoStoragePath || "",
	imageUri: params.imageUri || "",
});

export const deserializeSpotGuideParams = (params: SpotGuideSerializedParams): SpotGuideParams => ({
	...params,
	extSpots: params.extSpots ? convertSupabaseToPrisma_ExtSpots(JSON.parse(params.extSpots)) : undefined,
	takenPhotoStoragePath: params.takenPhotoStoragePath || undefined,
	imageUri: params.imageUri ? decodeURIComponent(params.imageUri) : undefined,
});

export const serializePlaceGuideParams = (params: PlaceGuideParams): PlaceGuideSerializedParams => ({
	extPlaces: JSON.stringify(params.extPlaces),
	takenPhotoStoragePath: params.takenPhotoStoragePath || "",
	imageUri: params.imageUri || "",
});

export const deserializePlaceGuideParams = (params: PlaceGuideSerializedParams): PlaceGuideParams => ({
	...params,
	extPlaces: params.extPlaces ? convertSupabaseToPrisma_ExtPlaces(JSON.parse(params.extPlaces)) : undefined,
	takenPhotoStoragePath: params.takenPhotoStoragePath || undefined,
	imageUri: params.imageUri ? decodeURIComponent(params.imageUri) : undefined,
});
