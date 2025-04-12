import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase/database.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as aesjs from 'aes-js';
import 'react-native-get-random-values';
import { Env } from '../constants/Env';

/**
 * 🔐 大きなセッションデータをセキュアに保存するためのストレージクラス。
 *
 * - SecureStore は 2KB 制限があるため、AES-256 で暗号化した payload を AsyncStorage に保存。
 * - 鍵は SecureStore に安全に保持し、データ本体は非同期にストレージへ。
 */
class LargeSecureStore {
  /**
   * データを暗号化して AsyncStorage に保存する。
   * 暗号鍵は SecureStore に保持。
   *
   * @param key - 暗号鍵の格納キー
   * @param value - 保存する平文文字列
   * @returns 暗号化済みの16進文字列
   */
  private async _encrypt(key: string, value: string): Promise<string> {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(32)); // AES-256 = 32 bytes
    const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));
    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  /**
   * AsyncStorage に保存された暗号データを復号する。
   * 鍵は SecureStore から取得。
   *
   * @param key - SecureStore に保存された鍵のキー
   * @param value - 暗号化された16進文字列
   * @returns 復号後の文字列 or null
   */
  private async _decrypt(key: string, value: string): Promise<string | null> {
    const encryptionKeyHex = await SecureStore.getItemAsync(key);
    if (!encryptionKeyHex) return null;

    const encryptionKey = aesjs.utils.hex.toBytes(encryptionKeyHex);
    const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  /**
   * 保存された値を復号して取得する。
   *
   * @param key - データキー
   * @returns 復号済みの文字列 or null
   */
  async getItem(key: string): Promise<string | null> {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) return null;
    return await this._decrypt(key, encrypted);
  }

  /**
   * 指定したキーのデータと対応する鍵を削除する。
   *
   * @param key - 削除対象のキー
   */
  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }

  /**
   * 平文文字列を暗号化し、AsyncStorage に保存する。
   *
   * @param key - 保存キー
   * @param value - 保存する平文データ
   */
  async setItem(key: string, value: string): Promise<void> {
    const encrypted = await this._encrypt(key, value);
    await AsyncStorage.setItem(key, encrypted);
  }
}

/**
 * Supabase クライアントを生成。
 * - 認証セッションは LargeSecureStore を使用し、安全かつ永続的に保存される。
 * - DB スキーマは動的環境変数で切り替え可能（開発/本番）
 */
export const supabase = createClient<Database>(
  Env.SUPABASE_URL,
  Env.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: new LargeSecureStore(),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
    db: {
      schema: Env.DB_SCHEMA,
    },
  }
);