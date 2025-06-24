import { withValidatedAuthHandler } from "../lib/handler";
import {
	findOrCreatePlaceFromIdRequestSchema,
	FindOrCreatePlaceFromIdResponse,
} from "../../../../shared/api/findOrCreatePlaceFromId.schema";
import { convertPrismaToSupabase_ExtPlaces } from "../../../../shared/converters/convert_ext_places";
import { findOrCreatePlaceFromId as service } from "../services/findOrCreatePlaceFromId";

export const findOrCreatePlaceFromId = withValidatedAuthHandler(
	findOrCreatePlaceFromIdRequestSchema,
	async function findOrCreatePlaceFromId({ res, input, requestId, userId }) {
		const { placeId } = input;
		const extPlace = await service(placeId, requestId, userId);
		const response: FindOrCreatePlaceFromIdResponse = {
			extPlaces: convertPrismaToSupabase_ExtPlaces(extPlace),
		};
		res.status(200).json(response);
	},
);
