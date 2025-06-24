import { TableRow } from '../utils/devDB.types';
import { Prisma } from '../prisma';


export type PrismaPlaceGuides = Omit<Prisma.Spot_guidesGroupByOutputType, '_count' | '_avg' | '_sum' | '_min' | '_max'>;

export type SupabasePlaceGuides = TableRow<'place_guides'>;

/**
 * Supabase 型 → Prisma 型 に変換
 * @param supabase 通信用の Supabase 型オブジェクト
 * @returns アプリ内部用の Prisma 型オブジェクト
 */
export function convertSupabaseToPrisma_PlaceGuides(supabase: SupabasePlaceGuides): PrismaPlaceGuides {
  return {
    id: supabase.id,
    place_id: supabase.place_id,
    language_tag: supabase.language_tag,
    title: supabase.title,
    manuscript: supabase.manuscript,
    tags: supabase.tags,
    audio_storage_path: supabase.audio_storage_path,
    price_amount: new Prisma.Decimal(supabase.price_amount),
    currency: supabase.currency,
    recommendation_weight: supabase.recommendation_weight,
    min_version_major: supabase.min_version_major,
    max_version_major: supabase.max_version_major,
    created_user: supabase.created_user,
    created_at: new Date(supabase.created_at),
    created_request_id: supabase.created_request_id,
    lock_no: supabase.lock_no,
  };
}

/**
 * Prisma 型 → Supabase 型 に変換
 * @param prisma アプリ内部で操作される Prisma 型オブジェクト
 * @returns API 通信用の Supabase 型オブジェクト
 */
export function convertPrismaToSupabase_PlaceGuides(prisma: PrismaPlaceGuides): SupabasePlaceGuides {
  return {
    id: prisma.id,
    place_id: prisma.place_id,
    language_tag: prisma.language_tag,
    title: prisma.title,
    manuscript: prisma.manuscript,
    tags: prisma.tags,
    audio_storage_path: prisma.audio_storage_path,
    price_amount: prisma.price_amount?.toNumber() ?? null,
    currency: prisma.currency,
    recommendation_weight: prisma.recommendation_weight,
    min_version_major: prisma.min_version_major,
    max_version_major: prisma.max_version_major,
    created_user: prisma.created_user,
    created_at: prisma.created_at?.toISOString() ?? null,
    created_request_id: prisma.created_request_id,
    lock_no: prisma.lock_no,
  };
}
