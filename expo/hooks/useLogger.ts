import { usePathname } from 'expo-router';
import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { nanoid } from 'nanoid';
import { getRemoteConfig } from '../lib/remoteConfig';
import { env } from '../lib/env';
import { EnumLiteral, TableRow } from '@/types/devDB.types';
import { DeepNonNullable } from '@/types/deep.types';

/**
 * ログレベルの優先度マッピング。
 */
const errorLevelPriority: Record<EnumLiteral<'frontend_event_logs_error_level'>, number> = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
};

/**
 * 📄 ログ記録用のカスタムフック。
 *
 * `useLogger()` を呼び出すことで `logFrontendEvent()` を利用可能になる。
 * - user_id は Supabase Auth から自動取得
 * - screen_name は `pathname.split('/')[1]` により自動補完
 *
 * @returns `logFrontendEvent()` ログ送信関数
 */
export const useLogger = () => {
  const pathname = usePathname();
  const screen_name = pathname.split('/')[1] || 'unknown';

  /**
   * Supabase にフロントエンドイベントログを送信する。
   *
   * @param event_name - イベント名称（例: "onCapture", "playAudio" など）
   * @param error_level - ログレベル（"debug" | "info" | "warn" | "error"）
   * @param payload - 任意の付加情報（オブジェクト形式）
   */

  const logFrontendEvent = useCallback(
    async ({
      event_name,
      error_level,
      payload,
    }: DeepNonNullable<Omit<TableRow<'frontend_event_logs'>, 'id' | 'user_id' | 'created_at' | 'created_app_version' | 'created_commit_id'>>) => {
      try {
        const remoteConfig = getRemoteConfig();
        const currentLevel = remoteConfig?.v1_min_frontend_log_level ?? 'debug';

        // ログレベルが現在の閾値よりも低ければ記録しない
        if (errorLevelPriority[error_level] < errorLevelPriority[currentLevel]) {
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();

        const now = new Date().toISOString();

        await supabase.from('frontend_event_logs').insert({
          id: nanoid(12),
          user_id: user?.id,
          event_name,
          screen_name,
          payload,
          error_level,
          created_at: now,
          created_app_version: env.APP_VERSION,
          created_commit_id: env.COMMIT_ID,
        });

        if (__DEV__) {
          console.log(`📤 [${error_level}] [${screen_name}] ${event_name}`, payload);
        }
      } catch (err: any) {
        if (__DEV__) {
          console.error(`🚨 Failed to log event [${event_name}] on screen [${screen_name}]:`, err.message);
        }
      }
    },
    [screen_name]
  );

  return { logFrontendEvent };
};
