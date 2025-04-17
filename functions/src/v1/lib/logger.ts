import { prisma } from './prisma';
import { env } from './env';
import { Prisma } from '../../../../shared/prisma';
import { randomUUID } from 'crypto';

/**
 * 🚀 バックエンドイベントを `backend_event_logs` テーブルに記録する。
 * 
 * イベント発生時のトレース、デバッグ、監査に活用される。
 * 開発環境では内容をコンソールにも出力。
 * 
 * @param event_name - 発生したイベント名（例: 'spotCreated'）
 * @param error_level - イベントのレベル
 * @param function_name - 呼び出し元関数名（例: 'generateSpotGuide'）
 * @param user_id - 操作を行ったユーザーのID（匿名可）
 * @param payload - イベントに付随するデータ（JSON）
 * @param request_id - トレースID（API間ログ紐付けに使用）
 * @returns {Promise<void>} 非同期処理（失敗時は dev 環境でのみ出力）
 */
export const logBackendEvent = async ({
  event_name,
  error_level,
  function_name,
  user_id,
  payload,
  request_id,
}: Required<Omit<Prisma.backend_event_logsCreateInput, 'id' | 'created_commit_id' | 'created_at'>>): Promise<void> => {
  try {
    await prisma.backend_event_logs.create({
      data: {
        id: randomUUID(),
        event_name,
        error_level,
        function_name,
        user_id,
        payload,
        request_id,
        created_at: new Date(),
        created_commit_id: env.FUNCTIONS_COMMIT_ID,
      },
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`📘 [${error_level}] ${function_name}:${event_name}`, payload);
    }
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Failed to log backend event', {
        error: error.message,
        function_name,
        event_name,
        request_id,
      });
    }
  }
};

/**
 * 🌐 外部APIの呼び出し情報を `external_api_logs` テーブルに記録する。
 * 
 * レスポンス時間やリクエスト内容、ステータスコードなどを追跡可能とし、
 * API連携のトラブルシュート・パフォーマンス改善に寄与する。
 * 
 * @param request_id - トレースID（他ログとの関連付けに使用）
 * @param function_name - 呼び出し元の関数名（例: 'recognizeSpot'）
 * @param api_name - 使用したAPIのサービス名（例: 'Claude', 'GoogleTTS'）
 * @param endpoint - APIエンドポイントパス（例: '/v1/images:annotate'）
 * @param request_payload - 送信したリクエストの内容
 * @param response_payload - 受信したレスポンスの内容
 * @param status_code - HTTPステータスコード（例: 200, 500）
 * @param error_message - エラーが発生した場合のメッセージ（null可）
 * @param response_time_ms - API呼び出しに要した時間（ms単位）
 * @param user_id - 呼び出し元のユーザーID（匿名可）
 * @returns {Promise<void>} 非同期でDBに記録（失敗時は dev 環境でのみログ出力）
 */
export const logExternalApi = async ({
  request_id,
  function_name,
  api_name,
  endpoint,
  request_payload,
  response_payload,
  status_code,
  error_message,
  response_time_ms,
  user_id,
}: Required<Omit<Prisma.external_api_logsCreateInput, 'id' | 'created_commit_id' | 'created_at'>>): Promise<void> => {
  try {
    await prisma.external_api_logs.create({
      data: {
        id: randomUUID(),
        request_id,
        function_name,
        api_name,
        endpoint,
        request_payload,
        response_payload,
        status_code,
        error_message,
        response_time_ms,
        user_id,
        created_at: new Date(),
        created_commit_id: env.FUNCTIONS_COMMIT_ID,
      },
    });
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Failed to log external API call', {
        error: error.message,
        function_name,
        api_name,
        request_id,
        endpoint,
      });
    }
  }
};