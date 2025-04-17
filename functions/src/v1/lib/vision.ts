import vision from '@google-cloud/vision';
import { google } from '@google-cloud/vision/build/protos/protos';
import { logExternalApi } from './logger';
import { FeaturesMethod } from '@google-cloud/vision/build/src/helpers';
import { RequestType } from '../../../../shared/utils/types';

const client = new vision.ImageAnnotatorClient();

/** 🎯 スコア判定のしきい値と重み（LANDMARKの方が高く評価される） */
const LANDMARK_SCORE_THRESHOLD = 0.3;
const LANDMARK_SCORE_WEIGHT = 1.0;
const WEBENTITY_SCORE_THRESHOLD = 0.4;
const WEBENTITY_SCORE_WEIGHT = 0.6;

/**
 * 📸 Vision API により画像からスポット候補（ランドマーク・WebEntity）を検出する。
 *
 * @param imageUri - Google Cloud Storage または https URL 形式の画像パス
 * @param requestId - トレース用の一意なリクエストID
 * @param userId - 認証済みユーザーのID
 * @returns スコア付きの検出候補リスト（降順）と fullMatchingImages
 */
export const identifySpotCandidates = async (
    imageUri: string,
    requestId: string,
    userId: string
): Promise<{
    candidates: IdentifiedSpotCandidate[],
    fullMatchingImages: google.cloud.vision.v1.WebDetection.IWebImage[]
}> => {
    const functionName = 'identifySpotCandidates';
    const start = Date.now();

    const request: RequestType<FeaturesMethod['annotateImage']> = {
        image: { source: { imageUri } },
        features: [
            { type: 'LANDMARK_DETECTION' },
            { type: 'WEB_DETECTION' },
        ],
    };

    // 📸 Vision API の呼び出し
    // @see https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate
    const [result] = await client.annotateImage(request);

    const duration = Date.now() - start;

    // 📝 外部APIログ（非同期に記録）
    logExternalApi({
        request_id: requestId,
        function_name: functionName,
        api_name: 'GoogleCloudVision',
        endpoint: 'annotateImage',
        request_payload: JSON.stringify(request),
        response_payload: JSON.stringify(result),
        status_code: result.error?.code ?? 200,
        error_message: result.error?.message ?? null,
        response_time_ms: duration,
        user_id: userId,
    });

    const candidates: IdentifiedSpotCandidate[] = [];

    // 📍 LANDMARK_DETECTION の候補抽出（しきい値付き）
    if (result.landmarkAnnotations?.length) {
        for (const landmark of result.landmarkAnnotations) {
            if (landmark.mid && landmark.score && landmark.score >= LANDMARK_SCORE_THRESHOLD) {
                candidates.push({
                    detectionType: 'LANDMARK_DETECTION',
                    ...landmark,
                    mid: landmark.mid,
                    order: landmark.score * LANDMARK_SCORE_WEIGHT,
                });
            }
        }
    }

    // 🌐 WEB_DETECTION の候補抽出（しきい値付き）
    if (result.webDetection?.webEntities?.length) {
        for (const webEntity of result.webDetection.webEntities) {
            if (webEntity.entityId && webEntity.score && webEntity.score >= WEBENTITY_SCORE_THRESHOLD) {
                candidates.push({
                    detectionType: 'WEB_DETECTION',
                    ...webEntity,
                    entityId: webEntity.entityId,
                    order: webEntity.score * WEBENTITY_SCORE_WEIGHT,
                });
            }
        }
    }

    // 🧮 スコア降順でソート
    candidates.sort((a, b) => b.order - a.order);

    return {
        candidates,
        fullMatchingImages: result.webDetection?.fullMatchingImages ?? [],
    };
};

/**
 * 🔖 Vision API の検出結果から共通的に使う候補型
 */
export type IdentifiedSpotCandidate = (
    google.cloud.vision.v1.IEntityAnnotation & {
        mid: string;
        detectionType: 'LANDMARK_DETECTION';
        order: number;
    } |
    google.cloud.vision.v1.WebDetection.IWebEntity & {
        entityId: string;
        detectionType: 'WEB_DETECTION';
        order: number;
    }
);
