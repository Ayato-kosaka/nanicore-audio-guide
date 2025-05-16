import { withValidatedAuthHandler } from "../lib/handler";
import {
	findOrCreateSpotFromIdRequestSchema,
	FindOrCreateSpotFromIdResponse,
} from "../../../../shared/api/findOrCreateSpotFromId.schema";
import { convertPrismaToSupabase_ExtSpots } from "../../../../shared/converters/convert_ext_spots";
import { findOrCreateSpotFromId as findOrCreateSpotFromIdService } from "../services/findOrCreateSpotFromId";

export const findOrCreateSpotFromId = withValidatedAuthHandler(
	findOrCreateSpotFromIdRequestSchema,
	async function findOrCreateSpotFromId({ res, input, requestId, userId }) {
		const { spotId } = input;

		const extSpot = await findOrCreateSpotFromIdService(spotId, requestId, userId);

		const response: FindOrCreateSpotFromIdResponse = {
			extSpots: convertPrismaToSupabase_ExtSpots(extSpot),
		};

		res.status(200).json(response);
	},
);
