import { SupabaseExtSpots } from "@shared/converters/convert_ext_spots";

export type FindOrCreateSpotFromImageResponse = {
    extSpots: SupabaseExtSpots;
    uploadedUri: string;
    takenPhotoStoragePath: string;
}
