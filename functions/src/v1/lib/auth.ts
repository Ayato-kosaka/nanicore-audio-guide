import jwt from 'jsonwebtoken';
import { env } from './env';
import { Request } from 'firebase-functions/v2/https';

/**
 * 🔐 SupabaseのJWTトークンからユーザーIDを検証・抽出する。
 *
 * - Bearerトークン形式のJWTを `authorization` ヘッダーから抽出
 * - 未指定・署名不一致などの不正な場合は例外をスロー
 *
 * @param req - Firebase Functionsのリクエストオブジェクト
 * @returns {Promise<{ userId: string }>} 検証済みユーザーID
 * @throws {Error} 認証情報が無効・不在・期限切れなどの場合
 */
export const withAuthUser = async (req: Request): Promise<{ userId: string }> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Missing or malformed Authorization header');
    }

    const token = authHeader.replace('Bearer ', '').trim();

    try {
        const decoded = jwt.verify(token, env.FUNCTIONS_SUPABASE_JWT_SECRET) as { sub: string };
        return { userId: decoded.sub };
    } catch (error: any) {
        throw new Error(`Invalid Supabase JWT: ${error.message}`);
    }
};
