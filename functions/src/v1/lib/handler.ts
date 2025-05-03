import { onRequest } from 'firebase-functions/v2/https';
import { ZodSchema } from 'zod';
import { logBackendEvent } from './logger';
import { withAuthUser } from './auth';
import { handleInvalidRequest } from './request';
import { createRequestId } from './backendUtils';
import * as Busboy from 'busboy';
import cors from 'cors';
import type { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import { prisma } from '../lib/prisma';


const corsHandler = cors({
    origin: ['http://localhost:8081', 'https://nanicore-audio-guide.web.app/'],
});

/**
 * ファイルアップロード時の解析結果型
 */
type ParsedFile = {
    buffer: Buffer;
    info: {
        filename: string;
        mimeType: string;
    };
};

/**
 * 📂 Firebase Functions v2 に対応した Busboy ベースのマルチパートパーサー。
 * - 画像などのバイナリデータを安全に扱うために必要。
 *
 * @param req - リクエストオブジェクト
 * @returns フィールドとオプションのファイルを含むパース結果
 */
const parseMultipartForm = (req: Request): Promise<{ fields: Record<string, any>, file?: ParsedFile }> => {
    return new Promise((resolve, reject) => {
        const busboy = Busboy.default({ headers: req.headers });
        const fields: Record<string, any> = {};
        let parsedFile: ParsedFile | undefined;

        busboy.on('field', (fieldname: string, value: string) => {
            fields[fieldname] = value;
        });

        busboy.on('file', (
            fieldname: string,
            fileStream: NodeJS.ReadableStream,
            fileInfo: { filename: string; encoding: string; mimeType: string },
        ) => {
            const chunks: Buffer[] = [];
            fileStream.on('data', (data: Buffer) => chunks.push(data));
            fileStream.on('end', () => {
                parsedFile = {
                    buffer: Buffer.concat(chunks),
                    info: {
                        filename: fileInfo.filename,
                        mimeType: fileInfo.mimeType,
                    },
                };
            });
        });

        busboy.on('finish', () => {
            resolve({ fields, file: parsedFile });
        });

        busboy.on('error', reject);

        if (!req.rawBody) {
            return reject(new Error('Missing rawBody in request. Make sure to enable "rawBody" in Firebase Function settings.'));
        }

        busboy.end(req.rawBody);
    });
};

/**
 * ✅ Firebase Cloud Functions 用の共通ハンドラ。
 * - Supabase認証
 * - Zod入力検証
 * - アクセスログ記録（非同期）
 * を一括で行い、ロジックの簡素化と安全性を確保。
 *
 * @param schema - Zod スキーマ（入力バリデーション）
 * @param fn - 認証済み・検証済みで実行される処理本体
 * @param options - マルチパート対応オプション
 * @returns Cloud Function ハンドラ
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
        file?: ParsedFile;
    }) => Promise<void>,
    options?: {
        useMultipart?: boolean;
        fileRequired?: boolean;
    }
) =>
    onRequest(async (req, res) => {
        corsHandler(req, res, async () => {
            const requestId = createRequestId();
            const functionName = fn.name || 'anonymousHandler';
            const isMultipart = options?.useMultipart;
            const isBody = Object.keys(req.body).length > 0;

            res.setHeader('x-request-id', requestId);

            let userId: string | null = null;
            try {
                const auth = await withAuthUser(req);
                userId = auth.userId;
            } catch (err) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            try {
                let parsed: { fields: Record<string, any>, file?: ParsedFile } = { fields: {} };
                if (isMultipart) {
                    parsed = await parseMultipartForm(req);

                    if (options?.fileRequired && !parsed.file) {
                        res.status(400).json({ error: 'File is required' });
                        return;
                    }
                }

                const inputSource = isMultipart ? parsed.fields : (isBody ? req.body : req.query);
                const result = schema.safeParse(inputSource);

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

                // 📘 ログ記録（非同期）
                logBackendEvent({
                    request_id: requestId,
                    function_name: functionName,
                    event_name: 'FunctionCalled',
                    user_id: userId,
                    error_level: 'info',
                    payload: {
                        method: req.method,
                        path: req.path,
                        source: isMultipart ? 'multipart' : (isBody ? 'body' : 'query'),
                        hasFile: !!parsed.file,
                        query: req.query,
                        body: isMultipart ? 'multipart' : req.body,
                    },
                });

                await fn({
                    req,
                    res,
                    input: result.data,
                    requestId,
                    userId,
                    functionName,
                    file: parsed.file,
                });
            } catch (err: any) {
                logBackendEvent({
                    event_name: 'unhandledException',
                    error_level: 'error',
                    function_name: functionName,
                    user_id: userId,
                    payload: {
                        message: err.message,
                        stack: err.stack,
                        payload: isBody ? req.query : req.body,
                    },
                    request_id: requestId,
                });
                res.status(500).json({ error: err.message ?? 'Internal server error' });
            } finally {
                await prisma.$disconnect();
            }
        })
    });
