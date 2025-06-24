import { SupabaseExtPlaces } from "../converters/convert_ext_places";

export type FindOrCreatePlaceFromImageResponse = {
	extPlaces: SupabaseExtPlaces;
	uploadedUri: string;
	takenPhotoStoragePath: string;
};
