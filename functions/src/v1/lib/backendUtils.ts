import { logExternalApi } from './logger';
import { Request } from 'firebase-functions/v2/https';
import { randomUUID } from 'crypto';

/**
 * 🆔 リクエストIDを生成（API呼び出し間のトレースに使用）
 * 
 * @returns {string} トレース用のユニークなID（randomUUID）
 */
export const createRequestId = (): string => {
  return randomUUID();
};

/**
 * 🌐 外部API（REST）を呼び出し、リクエスト・レスポンスをログに記録する。
 *
 * @param requestId - 呼び出し単位の一意なトレースID
 * @param functionName - 呼び出し元の関数名（例: generateSpotGuide）
 * @param apiName - 外部サービス名（例: Claude, GoogleVision）
 * @param customHeaders - リクエストヘッダー
 * @param endpoint - リクエスト先エンドポイントURL
 * @param method - HTTPメソッド（GETまたはPOST）
 * @param payload - リクエストのボディ（POSTのみ）
 * @param userId - 呼び出し元ユーザーのID
 * @returns {Promise<any>} 取得したAPIレスポンス
 * @throws 外部API呼び出し時のネットワーク・パースエラー
 */
export const callExternalApi = async <T>({
  requestId,
  functionName,
  apiName,
  endpoint,
  customHeaders = {},
  method,
  requestPayload,
  userId,
}: {
  requestId: string;
  functionName: string;
  apiName: string;
  endpoint: string;
  customHeaders?: Record<string, string>;
  method: 'GET' | 'POST';
  requestPayload?: any;
  userId: string;
}): Promise<T> => {
  const start = Date.now();
  let status_code = 0;
  let response_payload: any = null;
  let error_message: string | null = null;

  try {
    const apiResponse = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
      body: method === 'POST' ? JSON.stringify(requestPayload) : undefined,
    });

    status_code = apiResponse.status;

    try {
      response_payload = await apiResponse.json();
    } catch (parseError: any) {
      error_message = `Failed to parse JSON response: ${parseError.message}`;
      throw new Error(error_message);
    }

    return response_payload;
  } catch (error: any) {
    error_message = error.message || 'Unknown error during API call';
    throw error;
  } finally {
    const response_time_ms = Date.now() - start;

    logExternalApi({
      request_id: requestId,
      function_name: functionName,
      api_name: apiName,
      endpoint,
      request_payload: requestPayload,
      response_payload,
      status_code,
      error_message,
      response_time_ms,
      user_id: userId,
    });
  }
};

/**
 * 📱 リクエストヘッダーからアプリのバージョン（文字列）を抽出する。
 * 
 * - ヘッダー名: `x-app-version`
 * - 正常例: '1.2.3' → '1.2.3'
 * - 異常例（未指定 / 不正）→ 例外をスロー
 * 
 * @param req - Firebase Functionsのリクエストオブジェクト
 * @returns {string} アプリのバージョン（文字列）
 * @throws {Error} バージョン形式が不正または未指定の場合
 */
export const getCurrentVersionFromRequest = (req: Request): string => {
  const rawVersion: string | undefined =
    req.headers['x-app-version'] || req.query?.version || req.body?.version;

  if (typeof rawVersion !== 'string') {
    throw new Error('Missing or invalid x-app-version header');
  }

  return rawVersion;
};

/**
 * 📱 リクエストヘッダーからアプリのメジャーバージョン（整数）を抽出する。
 * 
 * - ヘッダー名: `x-app-version`
 * - 正常例: '1.2.3' → 1
 * - 異常例（未指定 / 不正）→ 例外をスロー
 * 
 * @param req - Firebase Functionsのリクエストオブジェクト
 * @returns {number} メジャーバージョン（整数）
 * @throws {Error} バージョン形式が不正または未指定の場合
 */
export const getCurrentVersionMajorFromRequest = (req: Request): number => {
  const version = getCurrentVersionFromRequest(req);
  const majorStr = version.split('.')[0];
  const major = parseInt(majorStr, 10);

  if (Number.isNaN(major) || major < 0) {
    throw new Error(`Invalid version format: ${version}`);
  }

  return major;
};


/**
 * 🎲 同一 weight 内でランダムにシャッフルしつつ、weight の降順にソートするユーティリティ関数
 *
 * - weight が高いものほど上に来る
 * - weight が同じ場合はランダムな順序になる
 *
 * @template T - weight プロパティを持つオブジェクト型
 * @param {T[]} items - ソート対象のオブジェクト配列
 * @returns {T[]} weight 降順かつ同一 weight 内でランダムシャッフルされた新しい配列
 */
export function shuffleByWeight<T extends { weight: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.weight !== b.weight) {
      return b.weight - a.weight;
    }
    return Math.random() - 0.5;
  });
}

/**
 * 🎯 weight に応じた確率で 1 件ランダムに選択するユーティリティ関数
 *
 * - weight の合計をもとに、重み付きランダム選択を行う
 * - weight が高いアイテムほど選ばれやすくなる
 *
 * @template T - weight プロパティを持つオブジェクト型
 * @param {T[]} items - 選択対象のオブジェクト配列
 * @returns {T | null} 選択されたオブジェクト、選べない場合は null
 */
export function pickByWeight<T extends { weight: number }>(items: T[]) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const random = Math.random() * totalWeight;
  let cumulative = 0;
  for (const item of items) {
    cumulative += item.weight;
    if (random < cumulative) {
      return item;
    }
  }
  return null;
}