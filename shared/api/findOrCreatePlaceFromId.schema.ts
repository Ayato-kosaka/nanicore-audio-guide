import { z } from "zod";
import type { SupabaseExtPlaces } from "../converters/convert_ext_places";

export const findOrCreatePlaceFromIdRequestSchema = z.object({
	placeId: z.string().min(1, "placeId is required"),
});

export type FindOrCreatePlaceFromIdRequest = z.infer<typeof findOrCreatePlaceFromIdRequestSchema>;

export type FindOrCreatePlaceFromIdResponse = {
	extPlaces: SupabaseExtPlaces;
};
