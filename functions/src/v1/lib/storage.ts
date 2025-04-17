import { Storage } from '@google-cloud/storage';
import { env } from './env';

/**
 * 📁 Cloud Storage クライアントとバケット初期化
 */
const storage = env.FUNCTIONS_NODE_ENV === "production"
  ? new Storage()
  : new Storage({
    projectId: env.FUNCTIONS_DEV_GCP_PROJECT_ID,
    credentials: JSON.parse(Buffer.from(env.FUNCTIONS_DEV_GCP_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8'))
  });
const bucketName = env.FUNCTIONS_GCS_BUCKET_NAME;
const environment = env.FUNCTIONS_NODE_ENV;
const bucket = storage.bucket(bucketName);

/**
 * 🔖 アップロード時に必要なパラメータ型定義
 */
type UploadFileParams = {
  buffer: Buffer;
  mimeType: string;
  resourceType: string; // e.g., 'user-uploads', 'system-generated'
  usageType: string;    // e.g., 'photos', 'audio-guides'
  identifier: string;   // e.g., userId, spotId
  fileName?: string;
  requestId: string;
  createdVersion: string;
  expiresInSeconds?: number;
};

/**
 * 📄 MIMEタイプに対応する拡張子を返す
 *
 * @param mime - ファイルのMIMEタイプ
 * @returns {string} 拡張子（例: 'jpg', 'mp3'）
 */
const getExtensionFromMime = (mime: string): string => {
  switch (mime) {
    case 'image/jpeg': return 'jpg';
    case 'image/png': return 'png';
    case 'image/webp': return 'webp';
    case 'audio/mpeg': return 'mp3';
    default: return 'bin';
  }
};

/**
 * 📤 ファイルをCloud Storageへアップロードし、署名付きURLを生成する
 *
 * @param params - アップロード設定とメタデータ
 * @returns {Promise<{ path: string, signedUrl: string }>} アップロードパスと署名付きURL
 */
export const uploadFile = async ({
  buffer,
  mimeType,
  resourceType,
  usageType,
  identifier,
  fileName,
  requestId,
  createdVersion,
  expiresInSeconds = 24 * 60 * 60,
}: UploadFileParams): Promise<{ path: string; signedUrl: string }> => {
  const timestamp = Date.now();
  const extension = getExtensionFromMime(mimeType);
  const finalFileName = fileName
    ? `${timestamp}_${fileName}.${extension}`
    : `${timestamp}.${extension}`;

  const fullPath = `${environment}/${resourceType}/${usageType}/${identifier}/${finalFileName}`;
  const file = bucket.file(fullPath);
  const nowIso = new Date().toISOString();

  try {
    await file.save(buffer, {
      metadata: {
        contentType: mimeType,
        metadata: {
          request_id: requestId,
          created_version: createdVersion,
          created_at: nowIso,
          updated_at: nowIso,
        },
      },
      resumable: false,
    });
  } catch (error: any) {
    console.error('❌ Failed to upload file to Cloud Storage:', error.message);
    throw new Error('Upload to Cloud Storage failed');
  }

  const signedUrl = await generateSignedUrl(fullPath, expiresInSeconds);

  return {
    path: fullPath,
    signedUrl,
  };
};

/**
 * 🔐 Cloud Storage上のファイルに対して署名付きURLを発行
 *
 * @param path - バケット内ファイルのフルパス
 * @param expiresInSeconds - URLの有効期限（秒）
 * @returns {Promise<string>} 署名付きURL
 */
export const generateSignedUrl = async (
  path: string,
  expiresInSeconds = 24 * 60 * 60
): Promise<string> => {
  const file = bucket.file(path);

  try {
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + expiresInSeconds * 1000,
    });
    return url;
  } catch (error: any) {
    console.error('❌ Failed to generate signed URL:', error.message);
    throw new Error('Signed URL generation failed');
  }
};

/**
 * ❌ 指定パスのファイルをCloud Storageから削除する
 *
 * @param path - バケット内ファイルのフルパス
 * @returns {Promise<void>} 削除処理の完了通知
 */
export const deleteFile = async (path: string): Promise<void> => {
  const file = bucket.file(path);
  try {
    await file.delete();
  } catch (error: any) {
    console.error('❌ Failed to delete file from Cloud Storage:', error.message);
    throw new Error('File deletion failed');
  }
};
