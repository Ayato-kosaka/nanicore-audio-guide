import { TableRow } from '../utils/devDB.types';
import { Prisma } from '../prisma';


export type PrismaExtSpots = Omit<Prisma.Ext_spotsGroupByOutputType, '_count' | '_avg' | '_sum' | '_min' | '_max'>;

/**
 * Supabase 型 → Prisma 型 に変換
 * @param supabase 通信用の Supabase 型オブジェクト
 * @returns アプリ内部用の Prisma 型オブジェクト
 */
export function convertSupabaseToPrisma_ExtSpots(supabase: TableRow<'ext_spots'>): PrismaExtSpots {
  return {
    id: supabase.id,
    source_type: supabase.source_type,
    title: supabase.title,
    image_url: supabase.image_url,
    landmark_latitude: supabase.landmark_latitude,
    landmark_longitude: supabase.landmark_longitude,
    is_recommendable: supabase.is_recommendable,
    created_at: new Date(supabase.created_at),
    lock_no: supabase.lock_no,
  };
}

/**
 * Prisma 型 → Supabase 型 に変換
 * @param prisma アプリ内部で操作される Prisma 型オブジェクト
 * @returns API 通信用の Supabase 型オブジェクト
 */
export function convertPrismaToSupabase_ExtSpots(prisma: PrismaExtSpots): TableRow<'ext_spots'> {
  return {
    id: prisma.id,
    source_type: prisma.source_type,
    title: prisma.title,
    image_url: prisma.image_url,
    landmark_latitude: prisma.landmark_latitude,
    landmark_longitude: prisma.landmark_longitude,
    is_recommendable: prisma.is_recommendable,
    created_at: prisma.created_at.toISOString(),
    lock_no: prisma.lock_no,
  };
}
