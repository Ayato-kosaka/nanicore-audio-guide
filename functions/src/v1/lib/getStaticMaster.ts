import { Database } from '../../../../shared/supabase/database.types'
import { TableRow } from 'shared/utils/devDB.types';
import { loadStaticMaster } from '../../../../shared/utils/loadStaticMaster';
import { env } from './env';

// キャッシュデータと最終取得時刻を保持
let cachedStaticMaster: Partial<Record<keyof Database['dev']['Tables'], TableRow<keyof Database['dev']['Tables']>[]>> = {};
let lastFetchTime: Partial<Record<keyof Database['dev']['Tables'], number>> = {};
const CACHE_DURATION_MS = 5 * 60 * 1000;

/**
 * 🗂️ 静的マスタデータを取得するユーティリティ関数。
 *
 * - 一定時間キャッシュを保持し、再取得の頻度を抑える
 * - 最終取得から `CACHE_DURATION_MS` を超過した場合は再取得
 *
 * @param tableName - 対象となるマスタテーブル名（Supabase dev スキーマ）
 * @returns 該当マスタのレコード配列
 */
export const getStaticMaster = async <T extends keyof Database['dev']['Tables']>(
    tableName: T,
): Promise<TableRow<T>[]> => {
    const now = Date.now();
    const lastFetched = lastFetchTime[tableName] ?? 0;
    const shouldRefresh = !cachedStaticMaster[tableName] || now > lastFetched + CACHE_DURATION_MS;

    if (shouldRefresh) {
        cachedStaticMaster[tableName] = await loadStaticMaster(env.FUNCTIONS_GCS_BUCKET_NAME, env.FUNCTIONS_GCS_STATIC_MASTER_DIR_PATH, tableName);
        lastFetchTime[tableName] = now;
    }

    return cachedStaticMaster[tableName] as TableRow<T>[];
};
