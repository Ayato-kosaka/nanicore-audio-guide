import * as admin from 'firebase-admin';
import { logBackendEvent } from './logger';
import { RemoteConfigValues, remoteConfigSchema } from '../../../../shared/remoteConfig/remoteConfig.schema';

if (!admin.apps.length) {
    admin.initializeApp();
}

let cachedConfig: RemoteConfigValues | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000;

const getConfig = async (requestId: string, userId: string) => {
    const template = await admin.remoteConfig().getTemplate();
    const parameters = template.parameters || {};

    const parsedObject: Record<string, unknown> = {};
    for (const [key, param] of Object.entries(parameters)) {
        const defaultValue = param.defaultValue;
        if (defaultValue && 'value' in defaultValue) {
            parsedObject[key] = defaultValue.value;
        } else {
            parsedObject[key] = null;
        }
    }

    const config = remoteConfigSchema.safeParse(parsedObject);
    if (!config.success) {
        logBackendEvent({
            event_name: 'remoteConfigInvalidConfig',
            function_name: 'cacheConfig',
            payload: {
                error: config.error.message,
                zodIssues: config.error.issues.map((issue) => ({
                    code: issue.code,
                    message: issue.message,
                    path: issue.path,
                })),
            },
            request_id: requestId,
            user_id: userId,
            error_level: 'error',
        });
        throw new Error(`Invalid config: ${config.error}`);
    }

    lastFetchTime = Date.now();
    return config.data;
};

/**
 * 🔧 Remote Config から指定キーの値を取得するユーティリティ関数。
 * - 最初の呼び出しで全体をキャッシュ（5分間有効）
 * - スキーマ検証済みの安全な構成値を取得
 *
 * @param key - 取得対象のRemoteConfigキー
 * @param requestId - ログ用のリクエストID
 * @param userId - 呼び出し元ユーザーID
 * @returns 指定キーに対応する文字列値
 * @throws Error - 未定義キーや型不整合がある場合
 */
export const getRemoteConfigValue = async (
    key: keyof RemoteConfigValues,
    requestId: string,
    userId: string
): Promise<string> => {
    if (cachedConfig === null || Date.now() > lastFetchTime + CACHE_DURATION_MS) {
        cachedConfig = await getConfig(requestId, userId);
    }

    if (!(key in cachedConfig)) {
        logBackendEvent({
            event_name: 'remoteConfigInvalidKey',
            function_name: 'getRemoteConfigValue',
            payload: { key },
            request_id: requestId,
            user_id: userId,
            error_level: 'error',
        });
        throw new Error(`Invalid key: ${key}`);
    }

    const value = cachedConfig[key];
    if (typeof value !== 'string') {
        logBackendEvent({
            event_name: 'remoteConfigValueTypeMismatch',
            function_name: 'getRemoteConfigValue',
            payload: { key, value },
            request_id: requestId,
            user_id: userId,
            error_level: 'error',
        });
        throw new Error(`Remote config value for key ${key} is not a string.`);
    }

    return value;
};
