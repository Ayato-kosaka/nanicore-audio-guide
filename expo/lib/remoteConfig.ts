import remoteConfig from '@react-native-firebase/remote-config';
import { frontend_event_logs_error_level } from '@shared/prisma';
import { env } from './env';

/**
 * Remote Config の取得値を保持する型。
 * - Cloud Functions やフロントエンドの動的制御に使用。
 */
export type RemoteConfigValues = {
  v1_min_frontend_log_level: frontend_event_logs_error_level;
  feature_x_enabled: boolean;
  welcome_message: string;
  v1_spot_visits_max_version_major: string;
};

// キャッシュ用のローカル変数（初期値は null）
let cachedValues: RemoteConfigValues | null = null;

/**
 * 🔧 Remote Config の初期化処理。
 *
 * Firebase Remote Config に対して `fetchAndActivate` を行い、
 * アプリ内で使用する値を `cachedValues` にキャッシュする。
 * `v1_min_frontend_log_level` により、ログ記録の閾値を制御できる。
 *
 * @returns 初期化された RemoteConfig の値（内部キャッシュとしても保存される）
 */
export const initRemoteConfig = async (): Promise<RemoteConfigValues | null> => {
  try {
    await remoteConfig().setDefaults({
      v1_min_frontend_log_level: 'debug',
      feature_x_enabled: false,
      welcome_message: '',
    });

    await remoteConfig().fetchAndActivate();

    cachedValues = {
      v1_min_frontend_log_level: remoteConfig().getValue('v1_min_frontend_log_level').asString() as frontend_event_logs_error_level,
      v1_spot_visits_max_version_major: remoteConfig().getValue('v1_spot_visits_max_version_major').asString(),
      feature_x_enabled: remoteConfig().getValue('feature_x_enabled').asBoolean(),
      welcome_message: remoteConfig().getValue('welcome_message').asString(),
    };

    if (env.NODE_ENV === "development") {
      console.log('✅ Remote Config initialized:', cachedValues);
    }

    return cachedValues;
  } catch (err: any) {
    if (env.NODE_ENV === "development") {
      console.error('⚠️ Remote Config initialization failed:', err.message);
    }
    return null;
  }
};

/**
 * キャッシュされた Remote Config の値を取得する。
 * 初期化されていない場合は null を返すため、起動時に `initRemoteConfig` を呼び出すこと。
 *
 * @returns 初期化済みの Remote Config 値 or null
 */
export const getRemoteConfig = (): RemoteConfigValues | null => cachedValues;
