/**
 * 多言語対応のための i18n 初期化モジュール。
 *
 * 未対応ロケールは自動的に英語（en-US）にフォールバック。
 *
 * `getResolvedLocale(locale?: string)` により、
 * 任意のロケール値から最適なサポートロケールを特定可能。
 *
 * ※ 実際の `locale` 設定は app/[locale]/_layout.tsx 側で行います。
 */

import { I18n } from 'i18n-js';

// 各ロケール用翻訳ファイル
import en_US from '../locales/en-US.json';
import ja_JP from '../locales/ja-JP.json';
import fr_FR from '../locales/fr-FR.json';
import zh_CN from '../locales/zh-CN.json';
import ar_SA from '../locales/ar-SA.json';

// 翻訳辞書をロケール形式で登録
const TRANSLATIONS: Record<string, object> = {
  'en-US': en_US,
  'ja-JP': ja_JP,
  'fr-FR': fr_FR,
  'zh-CN': zh_CN,
  'ar-SA': ar_SA,
};

// サポートされているロケール一覧を公開
export const I18N_SUPPORTED_LOCALES = Object.keys(TRANSLATIONS);

// i18n インスタンスの生成と初期化
const i18n = new I18n(TRANSLATIONS);
i18n.enableFallback = true;
i18n.defaultLocale = 'en-US';

/**
 * ユーザーが選択したロケールから適切な翻訳ロケールを解決する。
 * - 完全一致（例: ja-JP）
 * - 言語コード一致（例: ja）
 * - 該当なし → 'en-US'
 *
 * @param locale 任意のロケール文字列（例: "ja-JP", "fr"）
 * @returns i18n-js に適したロケールキー
 */
export function getResolvedLocale(locale?: string): string {
  if (!locale) return i18n.defaultLocale;

  const normalized = locale.trim();

  // 完全一致があれば採用
  if (I18N_SUPPORTED_LOCALES.includes(normalized)) return normalized;

  // 言語コードベースのフォールバック（例: "ja" → "ja-JP"）
  const langCode = normalized.split('-')[0];
  const matched = I18N_SUPPORTED_LOCALES.find(l => l.startsWith(langCode));
  return matched || i18n.defaultLocale;
}

export default i18n;
