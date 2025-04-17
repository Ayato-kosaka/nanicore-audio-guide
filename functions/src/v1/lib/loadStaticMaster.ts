import { Storage } from '@google-cloud/storage'
import { z } from 'zod'
import { env } from './env'
import { TableRow } from '@shared/utils/devDB.types'
import { Database } from '@shared/supabase/database.types'
import { logBackendEvent } from './logger'
const storage = new Storage()

const MasterSchema = z.object({
    data: z.array(
        z.object({
            id: z.string().min(1), // id必須
        }).passthrough() // その他のフィールドは通す
    ),
})

/**
 * GCS上のJSONを読み込み、バリデーションして返却
 * 
 * @param tableName - テーブル名
 * @returns テーブルのデータ
 */
const loadStaticMaster = async <T extends keyof Database['dev']['Tables']>(tableName: T) => {
    const file = storage.bucket(env.FUNCTIONS_GCS_BUCKET_NAME).file(`${tableName}.json`)
    const [contents] = await file.download()
    const jsonText = contents.toString('utf-8')

    let parsed
    try {
        parsed = JSON.parse(jsonText)
    } catch (err) {
        throw new Error(`❌ JSON parse error for file ${tableName}: ${err}`)
    }

    const validated = MasterSchema.safeParse(parsed)
    if (!validated.success) {
        throw new Error(`❌ Schema validation failed for ${tableName}: ${validated.error.message}`)
    }

    return validated.data as unknown as TableRow<T>;
}

/**
 * 静的マスタを読み込み、ログを出力
 * 
 * @param tableName - テーブル名
 * @param userId - ユーザーID
 * @param requestId - リクエストID
 * @returns マスタデータ
 * @throws マスタデータのバリデーションに失敗した場合、エラーをthrow
 * @throws マスタデータの読み込みに失敗した場合、エラーをthrow
 */
export const loadStaticMasterWithLog = async <T extends keyof Database['dev']['Tables']>(
    tableName: T,
    userId: string,
    requestId: string,
) => {
    try {
        return await loadStaticMaster(tableName);
    } catch (err) {
        logBackendEvent({
            event_name: 'loadStaticMaster',
            error_level: 'error',
            function_name: 'loadStaticMaster',
            user_id: userId,
            payload: {
                tableName,
            },
            request_id: requestId,
        })
        throw err
    }
}

