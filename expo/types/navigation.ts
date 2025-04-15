import { Prisma } from '@shared/prisma';

/**
 * 🎯 SpotGuide 画面に渡されるパラメータ（非シリアライズ形式）。
 *
 * - ext_spots：Prismaの `ext_spots` テーブルの行オブジェクト
 * - imageUri：撮影画像の URI（ローカル or GCS URL）
 * - takenPhotoStoragePath：画像が保存された Cloud Storage パス
 */
export type SpotGuideParams = {
  extSpots: Omit<Prisma.Ext_spotsGroupByOutputType, '_count' | '_avg' | '_sum' | '_min' | '_max'>;
  imageUri: string;
  takenPhotoStoragePath: string;
};

/**
 * 🌐 URLシリアライズ用途などに対応した `SpotGuideParams` の文字列化版。
 *
 * - すべてのプロパティを `string` として扱えるよう変換
 * - DeepLinkや`expo-router`の query param 用などに利用可能
 */
export type SpotGuideSerializedParams = {
  [K in keyof SpotGuideParams]: string;
};

/**
 * 🚦 アプリ内ルーティングで使用されるパラメータ一覧。
 *
 * - `react-navigation` や `expo-router` の型安全な navigation 用
 * - 各画面に渡すパラメータ構造を明示することで補完・型検査が強化される
 */
export type RootStackParamList = {
  SpotCapture: {}; // 撮影画面（パラメータなし）
  SpotGuide: SpotGuideSerializedParams; // SpotGuide画面（URL渡し用）
};
