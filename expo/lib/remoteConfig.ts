import { Env } from '../constants/Env';
import type { RemoteConfigValues } from '@shared/remoteConfig/remoteConfig.schema';
import { loadStaticMaster } from '@shared/utils/loadStaticMaster';
// キャッシュ用のローカル変数（初期値は null）
let cachedValues: RemoteConfigValues | null = null;

/**
 * 静的マスタから設定データを取得
 * 
 * @returns 設定データ
 */
export const initRemoteConfig = async (): Promise<RemoteConfigValues | null> => {

  // 🔄 静的マスタから設定データを取得
  const configJson = await loadStaticMaster(Env.GCS_BUCKET_NAME, Env.GCS_STATIC_MASTER_DIR_PATH, 'config');
  const config = configJson.reduce((acc, config) => {
    acc[config.key] = config.value;
    return acc;
  }, {} as Record<string, string>);

  cachedValues = config as RemoteConfigValues;
  return cachedValues;
};

/**
 * キャッシュされた Remote Config の値を取得する。
 * 初期化されていない場合は null を返すため、起動時に `initRemoteConfig` を呼び出すこと。
 *
 * @returns 初期化済みの Remote Config 値 or null
 */
export const getRemoteConfig = (): RemoteConfigValues | null => cachedValues;
