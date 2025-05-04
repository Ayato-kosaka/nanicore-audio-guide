import { Database } from "../supabase/database.types";
import { TableRow } from "./devDB.types";

/**
 * 静的マスターを読み込む
 *
 * @param bucketName - バケット名
 * @param dirPath - ディレクトリパス
 * @param tableName - テーブル名
 * @returns テーブルのデータ
 */
export const loadStaticMaster = async <T extends keyof Database["dev"]["Tables"]>(
	bucketName: string,
	dirPath: string,
	tableName: T,
) => {
	const encodedFilePath = encodeURIComponent(dirPath + tableName + ".json");
	const firebaseStorageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedFilePath}?alt=media`;
	if (!firebaseStorageUrl) {
		throw new Error("Environment variable SHARED_STATIC_MASTER_GCS_URL is not defined.");
	}

	const res = await fetch(firebaseStorageUrl);
	if (!res.ok) {
		throw new Error(`Failed to load static master from GCS. ${tableName}.json is not found.`);
	}

	const jsonData = await res.json();

	if (!jsonData) {
		throw new Error(`Failed to load static master from GCS. ${tableName}.json is empty.`);
	} else if (jsonData.data === undefined) {
		throw new Error(`Failed to load static master from GCS. ${tableName}.json is undefined.`);
	} else if (!Array.isArray(jsonData.data)) {
		throw new Error(`Failed to load static master from GCS. ${tableName} is invalid.`);
	}

	return jsonData.data as unknown as TableRow<T>[];
};
