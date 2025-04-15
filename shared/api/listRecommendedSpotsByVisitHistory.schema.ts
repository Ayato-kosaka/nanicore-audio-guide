import { z } from 'zod';
import type { SupabaseExtSpots } from '../converters/convert_ext_spots';

/**
 * 📝 listRecommendedSpotsByVisitHistory のリクエストスキーマ
 *
 * - 指定されたスポット ID をもとに、訪問履歴に基づくレコメンドを取得
 */
export const listRecommendedSpotsByVisitHistoryRequestSchema = z.object({
    spotId: z.string().min(1, 'spotId is required'),
});

/**
 * listRecommendedSpotsByVisitHistory API のリクエスト型
 */
export type ListRecommendedSpotsByVisitHistoryRequest = z.infer<
    typeof listRecommendedSpotsByVisitHistoryRequestSchema
>;

/**
 * listRecommendedSpotsByVisitHistory API のレスポンス型
 *
 * - `SupabaseExtSpots` は DB上の ext_spots テーブルを変換・整形したフロントエンド向け構造
 */
export type ListRecommendedSpotsByVisitHistoryResponse = {
    extSpots: SupabaseExtSpots[];
};
