import { logExternalApi } from './logger';
import { Request } from 'firebase-functions/v2/https';
const { nanoid } = require('nanoid');

/**
 * 🆔 リクエストIDを生成（API呼び出し間のトレースに使用）
 * 
 * @returns {string} トレース用のユニークなID（nanoid）
 */
export const createRequestId = (): string => {
  return nanoid(12);
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
