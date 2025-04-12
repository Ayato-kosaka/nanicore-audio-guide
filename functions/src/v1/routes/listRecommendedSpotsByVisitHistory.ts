import { onRequest } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import {
  createRequestId,
  getCurrentVersionMajorFromRequest,
  handleFunctionError,
  withAuthUser,
} from '../lib/backendUtils';
import { logBackendEvent } from '../lib/logging';

const schema = z.object({
  spot_id: z.string(),
});

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
    const input = schema.parse(req.query);
    const spotId = input.spot_id;

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

    res.status(200).json(orderedSpots);
  } catch (err: any) {
    handleFunctionError({
      err,
      functionName,
      requestId,
      res,
    });
  }
});
