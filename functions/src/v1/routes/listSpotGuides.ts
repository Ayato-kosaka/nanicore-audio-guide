import { prisma } from '../lib/prisma';
import {
    getCurrentVersionMajorFromRequest,
} from '../lib/backendUtils';
import { logBackendEvent } from '../lib/logger';
import { withValidatedAuthHandler } from '../lib/handler';
import { listSpotGuidesRequestSchema, ListSpotGuidesResponse } from '@shared/api/listSpotGuides.schema';
import { convertPrismaToSupabase_SpotGuides } from '@shared/converters/convert_spot_guides';
import { generateSignedUrl } from '../lib/storage';

/** 最大ガイド件数（乱数取得でも制限） */
const MAX_GUIDE_COUNT = 20;

/**
 * 🎲 同一weight内でランダムシャッフルしつつ、weight順にソート
 *
 * @param items - ガイドオブジェクト配列
 * @returns {T[]} weight降順かつ同スコア内シャッフルされた配列
 */
function shuffleByWeight<T extends { weight: number }>(items: T[]): T[] {
    return [...items].sort((a, b) => {
        if (a.weight !== b.weight) {
            return b.weight - a.weight;
        }
        return Math.random() - 0.5;
    });
}

/**
 * 🎧 スポットごとの無料ガイド一覧を取得する関数。
 *
 * @param req.query.spot_id - 対象スポットのID
 * @param req.query.language_tag - 対象言語タグ
 * @returns JSON配列（shuffled guides）
 */
export const listSpotGuides = withValidatedAuthHandler(
    listSpotGuidesRequestSchema,
    async ({ req, res, input, requestId, userId, functionName }) => {
        const { spotId, languageTag } = input;
        const currentVersionMajor = getCurrentVersionMajorFromRequest(req);

        const langPrefix = languageTag.split('-')[0] + '-';

        // 🎯 DBから該当スポットガイドを取得
        // - 指定言語・アプリバージョンに合致するものを抽出
        // - 重み（recommendation_weight）順に最大20件まで取得
        const guides = await prisma.spot_guides.findMany({
            where: {
                spot_id: spotId,
                language_tag: { startsWith: langPrefix },
                price_amount: 0,
                min_version_major: { lte: currentVersionMajor },
                max_version_major: { gte: currentVersionMajor },
            },
            orderBy: { recommendation_weight: 'desc' },
            take: MAX_GUIDE_COUNT,
        });

        // 🎲 同weight内はランダムシャッフル
        const shuffled = shuffleByWeight(
            guides.map((g) => ({ ...g, weight: g.recommendation_weight }))
        );

        // ✅ 成功ログを記録
        logBackendEvent({
            event_name: 'listSpotGuidesSuccess',
            function_name: functionName,
            request_id: requestId,
            user_id: userId,
            error_level: 'info',
            payload: {
                spot_id: spotId,
                languageTag,
                count: shuffled.length,
                top_guide_ids: shuffled.slice(0, 3).map((g) => g.id),
            },
        });

        // 🧪 Supabase用形式に変換＋署名付きURL付与
        const response: ListSpotGuidesResponse = {
            spotGuides: await Promise.all(
                shuffled.map(async (guide) => ({
                    ...convertPrismaToSupabase_SpotGuides(guide),
                    audioUrl: await generateSignedUrl(guide.audio_storage_path, 24 * 60 * 60),
                }))
            ),
        };

        res.status(200).json(response);
    }
);
