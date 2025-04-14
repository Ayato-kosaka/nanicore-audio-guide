import { useCallback } from 'react';
import { Env } from '@/constants/Env';
import { useLogger } from './useLogger';
import { useAuth } from '@/contexts/AuthProvider';

type APIVersion = 'v1' | 'v2';

/**
 * ☁️ Firebase Cloud Functions を呼び出すカスタムフック。
 *
 * - 認証セッションの JWT を Authorization ヘッダーに付与
 * - multipart/form-data または JSON 形式の POST に対応
 * - 呼び出しと同時にログを出力し、レスポンスを返す
 * - 通信エラー時はログ記録した上で例外をスロー
 *
 * @returns `callCloudFunction` を提供（非同期POST）
 */
export const useCloudFunction = () => {
  const { logFrontendEvent } = useLogger();
  const { session } = useAuth();

  /**
   * 指定された Cloud Function を呼び出す
   *
   * @param functionName - 関数名（例: "findOrCreateSpotFromImage"）
   * @param requestPayload - リクエストボディ（JSONまたはFormData）
   * @param version - バージョン名（"v1" or "v2"）
   * @param isMultipart - multipart/form-data を使用するか
   * @returns Cloud Function の戻り値（型指定可）
   * @throws ネットワークエラーまたは認証なし・応答エラー時に例外をスロー
   */
  const callCloudFunction = useCallback(
    async <T extends object | FormData, R>(
      functionName: string,
      requestPayload: T,
      version: APIVersion,
      isMultipart: boolean = false,
    ): Promise<R> => {
      const appVersion = Env.APP_VERSION;
      const endpoint = `${Env.CLOUD_FUNCTION_BASE_URL}/${version}/${functionName}`;

      // 🔐 認証トークンの有無をチェック
      const accessToken = session?.access_token;
      if (!accessToken) {
        throw new Error('User is not authenticated: Supabase access_token is missing.');
      }

      // 🧾 リクエストヘッダー構築
      const headers: Record<string, string> = {
        'x-app-version': appVersion,
        Authorization: `Bearer ${accessToken}`,
      };

      if (!isMultipart) {
        headers['Content-Type'] = 'application/json';
      }

      try {
        logFrontendEvent({
          event_name: `callCloudFunction:${version}/${functionName}`,
          error_level: 'info',
          payload:
            isMultipart || requestPayload instanceof FormData
              ? { info: '[multipart/form-data]' }
              : (requestPayload as Record<string, any>),
        });

        const response = await fetch(endpoint, {
          method: 'POST',
          headers,
          body: isMultipart
            ? (requestPayload as FormData)
            : JSON.stringify(requestPayload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          logFrontendEvent({
            event_name: `callCloudFunctionError:${version}/${functionName}`,
            error_level: 'error',
            payload: { status: response.status, body: errorText },
          });
          throw new Error(
            `Function ${functionName} failed with status ${response.status}`
          );
        }

        return await response.json();
      } catch (error: any) {
        logFrontendEvent({
          event_name: `callCloudFunctionException:${version}/${functionName}`,
          error_level: 'error',
          payload: { message: error?.message },
        });
        throw error;
      }
    },
    [logFrontendEvent, session]
  );

  return { callCloudFunction };
};
