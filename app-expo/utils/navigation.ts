import type { SpotGuideParams, SpotGuideSerializedParams } from "@/types/navigation";
import { convertSupabaseToPrisma_ExtSpots } from "@shared/converters/convert_ext_spots";
export const serializeSpotGuideParams = (params: SpotGuideParams): SpotGuideSerializedParams => ({
	extSpots: JSON.stringify(params.extSpots),
	takenPhotoStoragePath: params.takenPhotoStoragePath || "",
	imageUri: params.imageUri || "",
});

export const deserializeSpotGuideParams = (params: SpotGuideSerializedParams): SpotGuideParams => ({
	...params,
	extSpots: params.extSpots ? convertSupabaseToPrisma_ExtSpots(JSON.parse(params.extSpots)) : undefined,
	takenPhotoStoragePath: params.takenPhotoStoragePath || undefined,
});
