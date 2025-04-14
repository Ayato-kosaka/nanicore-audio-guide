import { Database } from '../supabase/database.types';

/**
 * 🧬 任意の Supabase テーブルに対応する `Row` 型を取得するユーティリティ型。
 *
 * - スキーマは `dev` を前提とする（開発環境スキーマと同期している想定）
 *
 * @typeParam Table - 対象のテーブル名（例: 'm_spots'）
 */
export type TableRow<
  Table extends keyof Database['dev']['Tables'],
> = Database['dev']['Tables'][Table]['Row'];

/**
 * 📊 任意の Supabase ビューに対応する `Row` 型を取得するユーティリティ型。
 *
 * - スキーマは `dev` を前提とする
 *
 * @typeParam View - 対象のビュー名（例: 'v_spot_stats'）
 */
export type ViewRow<
  View extends keyof Database['dev']['Views'],
> = Database['dev']['Views'][View]['Row'];

/**
 * 🧠 任意の Supabase 関数に対応する戻り値の型を取得するユーティリティ型。
 *
 * - スキーマは `dev` を前提とする
 * - 引数型は Supabase CLI が生成しないため非対応
 *
 * @typeParam Fn - 対象の関数名（例: 'get_recommendations'）
 */
export type FunctionReturn<
  Fn extends keyof Database['dev']['Functions'],
> = Database['dev']['Functions'][Fn]['Returns'];

/**
 * 🔠 任意の Supabase Enum に対応するリテラル型を取得するユーティリティ型。
 *
 * - スキーマは `dev` を前提とする
 *
 * @typeParam Enum - 対象の Enum 名（例: 'log_level'）
 */
export type EnumLiteral<
  Enum extends keyof Database['dev']['Enums'],
> = Database['dev']['Enums'][Enum];
