import { TableRow } from '../utils/devDB.types';
import { Prisma } from '../prisma';


/**
 * Supabase 型 → Prisma 型 に変換
 * @param supabase 通信用の Supabase 型オブジェクト
 * @returns アプリ内部用の Prisma 型オブジェクト
 */
export function convertSupabaseToPrisma_Reactions(supabase: TableRow<'reactions'>): Omit<Prisma.ReactionsGroupByOutputType, '_count' | '_avg' | '_sum' | '_min' | '_max'> {
  return {
    id: supabase.id,
    user_id: supabase.user_id,
    target_type: supabase.target_type,
    target_id: supabase.target_id,
    action_type: supabase.action_type,
    created_at: new Date(supabase.created_at),
    created_version: supabase.created_version,
    lock_no: supabase.lock_no,
  };
}

/**
 * Prisma 型 → Supabase 型 に変換
 * @param prisma アプリ内部で操作される Prisma 型オブジェクト
 * @returns API 通信用の Supabase 型オブジェクト
 */
export function convertPrismaToSupabase_Reactions(prisma: Omit<Prisma.ReactionsGroupByOutputType, '_count' | '_avg' | '_sum' | '_min' | '_max'>): TableRow<'reactions'> {
  return {
    id: prisma.id,
    user_id: prisma.user_id,
    target_type: prisma.target_type,
    target_id: prisma.target_id,
    action_type: prisma.action_type,
    created_at: prisma.created_at.toISOString(),
    created_version: prisma.created_version,
    lock_no: prisma.lock_no,
  };
}
