import { z } from "zod";
import { withValidatedAuthHandler } from "../lib/handler";
import { getCurrentVersionFromRequest } from "../lib/backendUtils";
import { uploadFile } from "../lib/storage";
import { FindOrCreateSpotFromImageResponse } from "../../../../shared/api/findOrCreateSpotFromImage.schema";
import { convertPrismaToSupabase_ExtSpots } from "../../../../shared/converters/convert_ext_spots";
import { findOrCreateSpotFromImageUri } from "../services/findOrCreateSpotFromImageUri";

/**
 * ✨ アップロード画像を解析し、対応するスポット情報を返却または新規作成する Cloud Function。
 *
 * @param file - アップロードされた画像ファイル（multipart）
 * @param requestId - 各リクエストの一意な ID（トレース用）
 * @param userId - リクエスト元のユーザー ID
 * @param req - Firebase Request オブジェクト
 * @param res - Firebase Response オブジェクト
 * @returns FindOrCreateSpotFromImageResponse JSON
 */
export const findOrCreateSpotFromImage = withValidatedAuthHandler(
	z.object({}),
	async function findOrCreateSpotFromImage({ req, res, requestId, userId, functionName, file }) {
		if (!file) return;

		// ☁️ GCS へアップロードし URI を生成
		const { path: imagePath, signedUrl: imageUri } = await uploadFile({
			buffer: file.buffer,
			mimeType: file.info.mimeType,
			resourceType: "user-uploads",
			usageType: "photos",
			identifier: userId,
			fileName: "capture",
			requestId,
			createdVersion: getCurrentVersionFromRequest(req),
			expiresInSeconds: 24 * 60 * 60,
		});

		const extSpot = await findOrCreateSpotFromImageUri(imageUri, requestId, userId);

		const response: FindOrCreateSpotFromImageResponse = {
			extSpots: convertPrismaToSupabase_ExtSpots(extSpot),
			uploadedUri: imageUri,
			takenPhotoStoragePath: imagePath,
		};

		res.status(200).json(response);
	},
	{
		useMultipart: true,
		fileRequired: true,
	},
);
