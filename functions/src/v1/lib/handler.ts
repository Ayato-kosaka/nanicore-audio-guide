import { onRequest, Request } from 'firebase-functions/v2/https';
import multer from 'multer';
import type { Response } from 'express';
import { z, ZodSchema } from 'zod';
import { logBackendEvent } from './logger';
import { withAuthUser } from './auth';
import { handleInvalidRequest } from './request';
import { createRequestId } from './backendUtils';

/**
 * ✅ Firebase Cloud Functions 用の共通ラッパー。
 * - Supabase認証チェック
 * - Zodによる入力バリデーション
 * - アクセスログ記録（非同期）
 * を一括で処理し、ビジネスロジックを簡潔に保つ。
 *
 * @param schema - 入力検証に使用する Zod スキーマ
 * @param fn - 検証＆認証済みで実行されるビジネスロジック本体
 * @param options - multer使用時の設定（画像アップロード対応など）
 * @returns Firebase HTTPS Function ハンドラ
 */
export const withValidatedAuthHandler = <T>(
    schema: ZodSchema<T>,
    fn: (ctx: {
        req: Request;
        res: Response;
        input: T;
        requestId: string;
        userId: string;
        functionName: string;
    }) => Promise<void>,
    options?: {
        useMulter?: boolean;
        multerFieldName?: string;
    }
) =>
    onRequest(async (req, res) => {
        const requestId = createRequestId();
        const functionName = fn.name || 'anonymousHandler';
        const isBody = options?.useMulter || Object.keys(req.body).length > 0;

        try {
            // 🔐 ユーザー認証（失敗時は例外）
            const { userId } = await withAuthUser(req);

            // 📂 ファイルアップロード（multer） 
            let zodSource = schema;

            // 📦 ファイルアップロード対応（必要な場合のみ）
            if (options?.useMulter) {
                const upload = multer({ storage: multer.memoryStorage() });
                const fieldName = options.multerFieldName || 'file';

                await new Promise<void>((resolve, reject) => {
                    upload.single(fieldName)(req as any, res as any, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });

                // ファイルの存在確認（Zodに反映）
                zodSource = zodSource.superRefine((_, ctx) => {
                    if (!req.file) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: 'File is required',
                            path: [fieldName],
                        });
                    }
                });
            }

            const source = isBody ? req.body : req.query;

            const result = zodSource.safeParse(source);

            if (!result.success) {
                return handleInvalidRequest({
                    req,
                    res,
                    requestId,
                    functionName,
                    userId,
                    zodIssues: result.error.issues,
                });
            }

            // 📘 実行ログ（await不要、非同期記録）
            logBackendEvent({
                request_id: requestId,
                function_name: functionName,
                event_name: 'FunctionCalled',
                user_id: userId,
                error_level: 'info',
                payload: {
                    method: req.method,
                    path: req.path,
                    source: isBody ? 'body' : 'query',
                    hasFile: !!req.file,
                    query: req.query,
                    body: req.body,
                },
            });

            // ✅ ビジネスロジック本体を実行
            await fn({
                req,
                res,
                input: result.data,
                requestId,
                userId,
                functionName,
            });
        } catch (err: any) {
            logBackendEvent({
                event_name: 'unhandledException',
                error_level: 'error',
                function_name: functionName,
                user_id: null,
                payload: { message: err.message, stack: err.stack, payload: isBody ? req.query : req.body },
                request_id: requestId,
            });
            res.status(500).json({ error: 'Internal server error', requestId });
        }
    });  