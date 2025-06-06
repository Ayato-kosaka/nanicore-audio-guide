import { PrismaExtSpots } from "@shared/converters/convert_ext_spots";

/**
 * 🎯 SpotGuide 画面に渡されるパラメータ（非シリアライズ形式）。
 *
 * - ext_spots：Prismaの `ext_spots` テーブルの行オブジェクト
 * - imageUri：撮影画像の URI（ローカル or GCS URL）
 * - takenPhotoStoragePath：画像が保存された Cloud Storage パス
 */
export type SpotGuideParams = {
	extSpots?: PrismaExtSpots;
	imageUri?: string | null;
	takenPhotoStoragePath?: string | null;
};

/**
 * 🌐 URLシリアライズ用途などに対応した `SpotGuideParams` の文字列化版。
 *
 * - すべてのプロパティを `string` として扱えるよう変換
 * - DeepLinkや`expo-router`の query param 用などに利用可能
 */
export type SpotGuideSerializedParams = {
	[K in keyof SpotGuideParams]?: string;
};

/**
 *  SpotSearch  画面に渡されるパラメータ
 * - id: 検索結果のID
 */
export type SpotSearchParams = { id: string };

/**
 *  SpotSearchByPlaceId  画面に渡されるパラメータ
 * - id: 検索結果のID
 */
export type SpotSearchByPlaceIdParams = { id: string };

/**
 * 🚦 アプリ内ルーティングで使用されるパラメータ一覧。
 *
 * - `react-navigation` や `expo-router` の型安全な navigation 用
 * - 各画面に渡すパラメータ構造を明示することで補完・型検査が強化される
 */
export type RootStackParamList = {
	SpotCapture: {}; // 撮影画面（パラメータなし）
	SpotGuide: SpotGuideSerializedParams; // SpotGuide画面（URL渡し用）
	SpotSearch: SpotSearchParams; // SpotSearch画面
	SpotSearchByPlaceId: SpotSearchByPlaceIdParams; // SpotSearchByPlaceId画面
};
