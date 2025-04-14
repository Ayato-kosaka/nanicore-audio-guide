import { TableRow } from '../utils/devDB.types';
import { Prisma } from '../prisma';


export type PrismaSpotGuides = Omit<Prisma.Spot_guidesGroupByOutputType, '_count' | '_avg' | '_sum' | '_min' | '_max'>;

/**
 * Supabase 型 → Prisma 型 に変換
 * @param supabase 通信用の Supabase 型オブジェクト
 * @returns アプリ内部用の Prisma 型オブジェクト
 */
export function convertSupabaseToPrisma_SpotGuides(supabase: TableRow<'spot_guides'>): PrismaSpotGuides {
  return {
    id: supabase.id,
    spot_id: supabase.spot_id,
    language_tag: supabase.language_tag,
    title: supabase.title,
    manuscript: supabase.manuscript,
    audio_storage_path: supabase.audio_storage_path,
    voice_type: supabase.voice_type,
    tags: supabase.tags,
    price_amount: new Prisma.Decimal(supabase.price_amount),
    currency: supabase.currency,
    recommendation_weight: supabase.recommendation_weight,
    min_version_major: supabase.min_version_major,
    max_version_major: supabase.max_version_major,
    created_by: supabase.created_by,
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
export function convertPrismaToSupabase_SpotGuides(prisma: PrismaSpotGuides): TableRow<'spot_guides'> {
  return {
    id: prisma.id,
    spot_id: prisma.spot_id,
    language_tag: prisma.language_tag,
    title: prisma.title,
    manuscript: prisma.manuscript,
    audio_storage_path: prisma.audio_storage_path,
    voice_type: prisma.voice_type,
    tags: prisma.tags,
    price_amount: prisma.price_amount.toNumber(),
    currency: prisma.currency,
    recommendation_weight: prisma.recommendation_weight,
    min_version_major: prisma.min_version_major,
    max_version_major: prisma.max_version_major,
    created_by: prisma.created_by,
    created_at: prisma.created_at.toISOString(),
    created_request_id: prisma.created_request_id,
    lock_no: prisma.lock_no,
  };
}
