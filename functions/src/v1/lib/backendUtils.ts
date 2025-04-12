import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logBackendEvent, logExternalApi } from './logger';
import jwt from 'jsonwebtoken';
import { env } from './env';

/**
 * 🆔 UUIDベースのリクエストIDを生成（API呼び出し間のトレースに使用）
 * 
 * @returns {string} トレース用のユニークなID（UUIDv4）
 */
export const createRequestId = (): string => {
  return uuidv4();
};

/**
 * 🛑 Firebase Function 内で未処理の例外が発生した場合の共通エラーハンドラ。
 * ログに記録しつつ、HTTP 500エラーとリクエストIDを返す。
 *
 * @param res - Expressのレスポンスオブジェクト
 * @param err - キャッチされた例外オブジェクト
 * @param requestId - トレースID
 * @param functionName - 処理中だった関数名
 * @param userId - ユーザーID（認証済みユーザー）
 * @returns {Response} エラー応答
 */
export const handleFunctionError = ({
  res,
  err,
  requestId,
  functionName,
  userId,
}: {
  res: Response,
  err: any,
  requestId: string,
  functionName: string,
  userId?: string | null,
}): Response => {
  logBackendEvent({
    request_id: requestId,
    function_name: functionName,
    event_name: 'unhandledException',
    user_id: userId ?? null,
    payload: { message: err.message, stack: err.stack },
    error_level: 'error',
  });

  return res.status(500).json({ error: 'Internal server error', requestId });
};

/**
 * 🌐 外部API（REST）を呼び出し、リクエスト・レスポンスをログに記録する。
 *
 * @param requestId - 呼び出し単位の一意なトレースID
 * @param functionName - 呼び出し元の関数名（例: generateSpotGuide）
 * @param apiName - 外部サービス名（例: Claude, GoogleVision）
 * @param endpoint - リクエスト先エンドポイントURL
 * @param method - HTTPメソッド（GETまたはPOST）
 * @param payload - リクエストのボディ（POSTのみ）
 * @param userId - 呼び出し元ユーザーのID
 * @returns {Promise<any>} 取得したAPIレスポンス
 * @throws 外部API呼び出し時のネットワーク・パースエラー
 */
export const callExternalApi = async ({
  requestId,
  functionName,
  apiName,
  endpoint,
  method,
  requestPayload,
  userId,
}: {
  requestId: string;
  functionName: string;
  apiName: string;
  endpoint: string;
  method: 'GET' | 'POST';
  requestPayload?: any;
  userId: string;
}): Promise<any> => {
  const start = Date.now();
  let status_code = 0;
  let response_payload: any = null;
  let error_message: string | null = null;

  try {
    const apiResponse = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
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

    await logExternalApi({
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
 * 🔐 SupabaseのJWTトークンからユーザーIDを検証・抽出する。
 *
 * - Bearerトークン形式のJWTを `authorization` ヘッダーから抽出
 * - 未指定・署名不一致などの不正な場合は例外をスロー
 *
 * @param req - Express互換のリクエストオブジェクト
 * @returns {Promise<{ userId: string }>} 検証済みユーザーID
 * @throws {Error} 認証情報が無効・不在・期限切れなどの場合
 */
export const withAuthUser = async (req: any): Promise<{ userId: string }> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or malformed Authorization header');
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decoded = jwt.verify(token, env.FUNCTIONS_SUPABASE_JWT_SECRET) as { sub: string };
    return { userId: decoded.sub };
  } catch (error: any) {
    throw new Error(`Invalid Supabase JWT: ${error.message}`);
  }
};

/**
 * 📱 リクエストヘッダーからアプリのメジャーバージョン（整数）を抽出する。
 * 
 * - ヘッダー名: `x-app-version`
 * - 正常例: '1.2.3' → 1
 * - 異常例（未指定 / 不正）→ 例外をスロー
 *
 * @param req - Express互換のリクエストオブジェクト
 * @returns {number} メジャーバージョン（整数）
 * @throws {Error} バージョン形式が不正または未指定の場合
 */
export const getCurrentVersionMajorFromRequest = (req: any): number => {
  const rawVersion: string | undefined =
    req.headers['x-app-version'] || req.query?.version || req.body?.version;

  if (typeof rawVersion !== 'string') {
    throw new Error('Missing or invalid x-app-version header');
  }

  const majorStr = rawVersion.split('.')[0];
  const major = parseInt(majorStr, 10);

  if (Number.isNaN(major) || major < 0) {
    throw new Error(`Invalid version format: ${rawVersion}`);
  }

  return major;
};
