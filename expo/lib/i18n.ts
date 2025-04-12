/**
 * 多言語対応のための i18n 初期化モジュール。
 *
 * ユーザー端末のロケールに応じて `i18n-js` に翻訳辞書を読み込む。
 * 対応言語は `en`, `ja`, `fr`, `zh`, `ar`。未対応言語は英語にフォールバックされる。
 * Expo Localization と連携して locale を動的設定。
 *
 * @returns {i18n} 初期化済みの i18n インスタンス
 */

import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from "../locales/en.json";
import ja from "../locales/ja.json";
import fr from "../locales/fr.json";
import zh from "../locales/zh.json";
import ar from "../locales/ar.json";

const i18n = new I18n();

// 翻訳辞書を設定（必要に応じて追加可能）
i18n.translations = {
  en,
  ja,
  fr,
  zh,
  ar,
};

// 未翻訳のキーがあった場合、英語にフォールバックする
i18n.enableFallback = true;

// デフォルトロケールを明示的に英語に設定（テストや初期化時に使用）
i18n.defaultLocale = "en";

/**
 * デバイスの優先ロケールから最上位の言語コードを設定
 * `languageCode` は 'ja', 'en' など2文字コード
 */
const deviceLocales = Localization.getLocales();
const preferredLocale = deviceLocales[0]?.languageCode ?? 'en';
i18n.locale = preferredLocale;

/**
 * アプリで使用可能な言語一覧。
 * - UI選択肢
 * - バリデーションチェック
 * - 言語切り替え表示などに活用
 */
export const SUPPORTED_LANGUAGES = Object.keys(i18n.translations);

export default i18n;
