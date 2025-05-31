import { callExternalApi } from "./backendUtils";
import { env } from "./env";

/**
 * 🌐 Google Knowledge Graph API + Wikipedia API を用いて、
 * KGID（KGエンティティID）から Wikipedia 記事の画像とタイトルを取得する。
 *
 * @param kgid - Google Knowledge Graph の ID （例: /m/012345）
 * @param requestId - トレース用のリクエストID
 * @param userId - 認証済みユーザーのID（ログ用）
 * @returns サムネイル画像URLと Wikipedia タイトル（どちらも null の可能性あり）
 */
export const getWikipediaImageFromKgid = async (
	kgid: string,
	requestId: string,
	userId: string,
): Promise<{ imageUrl: string | null; title: string | null }> => {
	// Google Knowledge Graph Search API から Wikipedia URL を取得
	// @see https://developers.google.com/knowledge-graph/reference/rest/v1?hl=en
	const kgUrl = `https://kgsearch.googleapis.com/v1/entities:search?ids=${encodeURIComponent(
		kgid,
	)}&languages=en&key=${env.FUNCTIONS_GOOGLE_KG_API_KEY}&limit=1&indent=false`;

	const kgResponse = await callExternalApi<{
		itemListElement: {
			result: {
				detailedDescription?: { url?: string };
				name?: string;
			};
		}[];
	}>({
		requestId,
		functionName: "getWikipediaImageFromKgid",
		apiName: "GoogleKnowledgeGraphAPI",
		endpoint: kgUrl,
		method: "GET",
		userId,
	});

	const articleUrl = kgResponse?.itemListElement?.[0]?.result?.detailedDescription?.url;
	if (!articleUrl) {
		return { imageUrl: null, title: kgResponse?.itemListElement?.[0]?.result?.name ?? null };
	}

	// Wikipedia URL からタイトルを抽出
	const title = decodeURIComponent(articleUrl.split("/").pop() || "").replace(/_/g, " ");

	// Wikipedia PageImages API からサムネイルを取得
	// @see https://en.wikipedia.org/w/api.php
	const wikiApiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
		title,
	)}&prop=pageimages&format=json&pithumbsize=640&origin=*`;

	const wikiResponse = await callExternalApi<{
		query: {
			pages: {
				[key: string]: {
					title?: string;
					thumbnail?: { source: string };
				};
			};
		};
	}>({
		requestId,
		functionName: "getWikipediaImageFromKgid",
		apiName: "WikipediaAPI",
		endpoint: wikiApiUrl,
		method: "GET",
		userId,
	});

	const page = Object.values(wikiResponse?.query?.pages || {})?.[0];

	return {
		imageUrl: page?.thumbnail?.source ?? null,
		title: page?.title ?? null,
	};
};
