import { TableRow } from '../utils/devDB.types';
import { Prisma } from '../prisma';


export type PrismaPlaceVisits = Omit<Prisma.Spot_visitsGroupByOutputType, '_count' | '_avg' | '_sum' | '_min' | '_max'>;

export type SupabasePlaceVisits = TableRow<'place_visits'>;

/**
 * Supabase 型 → Prisma 型 に変換
 * @param supabase 通信用の Supabase 型オブジェクト
 * @returns アプリ内部用の Prisma 型オブジェクト
 */
export function convertSupabaseToPrisma_PlaceVisits(supabase: SupabasePlaceVisits): PrismaPlaceVisits {
  return {
    id: supabase.id,
    user_id: supabase.user_id,
    place_id: supabase.place_id,
    represent_guide_id: supabase.represent_guide_id,
    taken_photo_storage_path: supabase.taken_photo_storage_path,
    prev_place_id: supabase.prev_place_id,
    time_gap_minutes: supabase.time_gap_minutes,
    min_version_major: supabase.min_version_major,
    max_version_major: supabase.max_version_major,
    created_at: new Date(supabase.created_at),
    updated_at: new Date(supabase.updated_at),
    lock_no: supabase.lock_no,
  };
}

/**
 * Prisma 型 → Supabase 型 に変換
 * @param prisma アプリ内部で操作される Prisma 型オブジェクト
 * @returns API 通信用の Supabase 型オブジェクト
 */
export function convertPrismaToSupabase_PlaceVisits(prisma: PrismaPlaceVisits): SupabasePlaceVisits {
  return {
    id: prisma.id,
    user_id: prisma.user_id,
    place_id: prisma.place_id,
    represent_guide_id: prisma.represent_guide_id,
    taken_photo_storage_path: prisma.taken_photo_storage_path,
    prev_place_id: prisma.prev_place_id,
    time_gap_minutes: prisma.time_gap_minutes,
    min_version_major: prisma.min_version_major,
    max_version_major: prisma.max_version_major,
    created_at: prisma.created_at?.toISOString() ?? null,
    updated_at: prisma.updated_at?.toISOString() ?? null,
    lock_no: prisma.lock_no,
  };
}
