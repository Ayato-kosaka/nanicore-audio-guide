import { prisma } from "../lib/prisma";
import { getCurrentVersionMajorFromRequest, shuffleByWeight } from "../lib/backendUtils";
import { logBackendEvent } from "../lib/logger";
import { withValidatedAuthHandler } from "../lib/handler";
import { listPlaceGuidesRequestSchema, ListPlaceGuidesResponse } from "../../../../shared/api/listPlaceGuides.schema";
import { convertPrismaToSupabase_PlaceGuides } from "../../../../shared/converters/convert_place_guides";
import { generateSignedUrl } from "../lib/storage";

/** 最大ガイド件数（乱数取得でも制限） */
const MAX_GUIDE_COUNT = 20;

/**
 * 🎧 場所ごとの無料ガイド一覧を取得する関数。
 *
 * @param req.query.place_id - 対象場所のID
 * @param req.query.language_tag - 対象言語タグ
 * @returns JSON配列（shuffled guides）
 */
export const listPlaceGuides = withValidatedAuthHandler(
	listPlaceGuidesRequestSchema,
	async function listPlaceGuides({ req, res, input, requestId, userId, functionName }) {
		const { placeId, languageTag } = input;
		const currentVersionMajor = getCurrentVersionMajorFromRequest(req);

		const langPrefix = languageTag.split("-")[0] + "-";

		// 🎯 DBから該当場所ガイドを取得
		// - 指定言語・アプリバージョンに合致するものを抽出
		// - 重み（recommendation_weight）順に最大20件まで取得
		const guides = await prisma.place_guides.findMany({
			where: {
				place_id: placeId,
				language_tag: { startsWith: langPrefix },
				price_amount: 0,
				min_version_major: { lte: currentVersionMajor },
				max_version_major: { gte: currentVersionMajor },
			},
			orderBy: { recommendation_weight: "desc" },
			take: MAX_GUIDE_COUNT,
		});

		// 🎲 同weight内はランダムシャッフル
		const shuffled = shuffleByWeight(guides.map((g) => ({ ...g, weight: g.recommendation_weight })));

		// ✅ 成功ログを記録
		logBackendEvent({
			event_name: "listPlaceGuidesSuccess",
			function_name: functionName,
			request_id: requestId,
			user_id: userId,
			error_level: "info",
			payload: {
				place_id: placeId,
				languageTag,
				count: shuffled.length,
				top_guide_ids: shuffled.slice(0, 3).map((g) => g.id),
			},
		});

		// 🧪 Supabase用形式に変換＋署名付きURL付与
		const response: ListPlaceGuidesResponse = {
			placeGuides: await Promise.all(
				shuffled.map(async (guide) => ({
					...convertPrismaToSupabase_PlaceGuides(guide),
					audioUrl: await generateSignedUrl(guide.audio_storage_path, 24 * 60 * 60),
				})),
			),
		};

		res.status(200).json(response);
	},
);
