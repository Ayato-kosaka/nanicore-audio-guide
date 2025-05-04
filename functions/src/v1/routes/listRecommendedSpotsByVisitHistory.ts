import { prisma } from "../lib/prisma";
import { getCurrentVersionMajorFromRequest } from "../lib/backendUtils";
import { logBackendEvent } from "../lib/logger";
import { listRecommendedSpotsByVisitHistoryRequestSchema } from "../../../../shared/api/listRecommendedSpotsByVisitHistory.schema";
import type { ListRecommendedSpotsByVisitHistoryResponse } from "../../../../shared/api/listRecommendedSpotsByVisitHistory.schema";
import { convertPrismaToSupabase_ExtSpots } from "../../../../shared/converters/convert_ext_spots";
import { withValidatedAuthHandler } from "../lib/handler";

const RECOMMENDED_SPOT_LIMIT = 20;
const MAX_TIME_GAP_MINUTES = 90;

/**
 * 📍 過去の訪問履歴に基づいて、次におすすめのスポットを取得する。
 *
 * @param input.spotId - 訪問履歴の起点となるスポットID
 * @returns おすすめスポットの配列（最大20件、順序保証付き）
 */
export const listRecommendedSpotsByVisitHistory = withValidatedAuthHandler(
	listRecommendedSpotsByVisitHistoryRequestSchema,
	async function listRecommendedSpotsByVisitHistory({ req, res, input, requestId, userId, functionName }) {
		const spotId = input.spotId;

		const currentVersionMajor = getCurrentVersionMajorFromRequest(req);

		// 履歴ベースで訪問先を集計（出現頻度順）
		const visitResults = await prisma.spot_visits.groupBy({
			by: ["spot_id"],
			where: {
				prev_spot_id: spotId,
				time_gap_minutes: { lte: MAX_TIME_GAP_MINUTES },
				min_version_major: { lte: currentVersionMajor },
				max_version_major: { gte: currentVersionMajor },
			},
			_count: { spot_id: true },
			orderBy: [{ _count: { spot_id: "desc" } }],
			take: RECOMMENDED_SPOT_LIMIT,
		});

		const recommendedSpotIds = visitResults.map((r) => r.spot_id).filter((s) => s !== spotId);

		// 推薦先スポット情報を取得（is_recommendable = true）
		const spots = await prisma.ext_spots.findMany({
			where: {
				id: { in: recommendedSpotIds },
				is_recommendable: true,
			},
		});

		// 順序を維持して並び替え（map + find）
		const orderedSpots = visitResults
			.map((r) => spots.find((s) => s.id === r.spot_id))
			.filter((s): s is NonNullable<typeof s> => !!s);

		// ✅ 成功ログ（非同期）
		logBackendEvent({
			request_id: requestId,
			function_name: functionName,
			event_name: "listRecommendedSpotsByVisitHistorySuccess",
			payload: { spotId, result_count: orderedSpots.length },
			user_id: userId,
			error_level: "info",
		});

		// Supabase型に変換して返却
		const response: ListRecommendedSpotsByVisitHistoryResponse = {
			extSpots: orderedSpots.map(convertPrismaToSupabase_ExtSpots),
		};

		res.status(200).json(response);
	},
);
