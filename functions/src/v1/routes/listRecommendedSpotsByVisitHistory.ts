import { onRequest } from 'firebase-functions/v2/https';
import { prisma } from '../lib/prisma';
import {
  createRequestId,
  getCurrentVersionMajorFromRequest,
  withAuthUser,
} from '../lib/backendUtils';
import { logBackendEvent, handleFunctionError } from '../lib/logger';
import { listRecommendedSpotsByVisitHistoryRequestSchema } from '@shared/api/listRecommendedSpotsByVisitHistory.schema';
import type { ListRecommendedSpotsByVisitHistoryResponse } from '@shared/api/listRecommendedSpotsByVisitHistory.schema';
import { convertPrismaToSupabase_ExtSpots } from '@shared/converters/convert_ext_spots';

const RECOMMENDED_SPOT_LIMIT = 20;

/**
 * 📍 過去の訪問履歴に基づいて、次におすすめのスポットを取得する。
 *
 * - 入力: `spot_id`（クエリ）
 * - 出力: おすすめスポットの配列（最大20件、順序保証付き）
 */
export const listRecommendedSpotsByVisitHistory = onRequest(async (req, res) => {
  const requestId = createRequestId();
  const functionName = 'listRecommendedSpotsByVisitHistory';

  try {
    const input = listRecommendedSpotsByVisitHistoryRequestSchema.parse(req.query);
    const spotId = input.spotId;

    // 🔐 Supabase 認証トークンから userId を取得（失敗時は例外）
    const { userId } = await withAuthUser(req);

    // 📘 アクセスログ（非同期、失敗しても無視される）
    logBackendEvent({
      request_id: requestId,
      function_name: functionName,
      event_name: 'listRecommendedSpotsByVisitHistoryAccessed',
      payload: { spotId },
      user_id: userId,
      error_level: 'info',
    });

    const currentVersionMajor = getCurrentVersionMajorFromRequest(req);

    // 訪問履歴から次に訪れるスポット候補を取得（出現頻度順）
    const visitResults = await prisma.spot_visits.groupBy({
      by: ['spot_id'],
      where: {
        prev_spot_id: spotId,
        min_version_major: { lte: currentVersionMajor },
        max_version_major: { gte: currentVersionMajor },
      },
      _count: { spot_id: true },
      orderBy: [{ _count: { spot_id: 'desc' } }],
      take: RECOMMENDED_SPOT_LIMIT,
    });

    const recommendedSpotIds = visitResults.map((r) => r.spot_id);

    // 詳細スポット情報を取得（推奨表示対象のみ）
    const spots = await prisma.ext_spots.findMany({
      where: {
        id: { in: recommendedSpotIds },
        is_recommendable: true,
      },
    });

    // 順序を維持しつつマッピング
    const orderedSpots = visitResults
      .map((r) => spots.find((s) => s.id === r.spot_id))
      .filter((s): s is NonNullable<typeof s> => !!s);

    // ✅ 成功ログ（非同期）
    logBackendEvent({
      request_id: requestId,
      function_name: functionName,
      event_name: 'listRecommendedSpotsByVisitHistorySuccess',
      payload: { spotId, result_count: orderedSpots.length },
      user_id: userId,
      error_level: 'info',
    });

    const response = {
      extSpots: orderedSpots.map(convertPrismaToSupabase_ExtSpots),
    } satisfies ListRecommendedSpotsByVisitHistoryResponse;
    res.status(200).json(response);
  } catch (err: any) {
    handleFunctionError({
      req,
      res,
      err,
      requestId,
      functionName,
    });
  }
});
