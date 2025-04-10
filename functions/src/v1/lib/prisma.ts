import { PrismaClient } from "functions/src/generated/prisma";

/**
 * 📦 Prisma Client のシングルトンインスタンスを生成・保持するモジュール。
 *
 * ローカル開発環境ではホットリロード時に複数インスタンスが生成されないよう、
 * `global.prisma` を再利用する。ログ出力はクエリ・エラー・警告を含む。
 *
 * @see https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 *
 * @returns {PrismaClient} Prismaのクライアントインスタンス
 */


// eslint-disable-next-line no-var
declare global {
  var prisma: PrismaClient | undefined;
}

// シングルトンインスタンスを生成（ローカル開発ではグローバル再利用）
export const prisma: PrismaClient =
  global.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

// 本番以外ではグローバルに保持（開発時の再生成を防止）
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
