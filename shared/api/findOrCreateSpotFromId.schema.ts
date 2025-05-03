import { z } from 'zod';
import type { SupabaseExtSpots } from '../converters/convert_ext_spots';

/**
 * 📝 findOrCreateSpotFromId のリクエストスキーマ
 */
export const findOrCreateSpotFromIdRequestSchema = z.object({
    spotId: z.string().min(1, 'spotId is required'),
});

/**
 * findOrCreateSpotFromId API のリクエスト型
 */
export type FindOrCreateSpotFromIdRequest = z.infer<
    typeof findOrCreateSpotFromIdRequestSchema
>;

/**
 * findOrCreateSpotFromId API のレスポンス型
 *
 * - `SupabaseExtSpots` は DB上の ext_spots テーブルを変換・整形したフロントエンド向け構造
 */
export type FindOrCreateSpotFromIdResponse = {
    extSpots: SupabaseExtSpots;
};
