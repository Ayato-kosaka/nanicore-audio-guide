import { findOrCreateSpotFromImageUri } from '../services/findOrCreateSpotFromImageUri';
import { createRequestId } from '../lib/backendUtils';
import { prisma } from '../lib/prisma';
import { PrismaExtSpots } from '../../../../shared/converters/convert_ext_spots'
import { execute, fetchImagesFromGCS, outputJson } from './utils';

// Cleanup: DBのクリーンアップ
const cleanUp = async () => {
    console.log('🧹 Cleaning up database...');
    await prisma.spot_visits.deleteMany({});
    await prisma.spot_guides.deleteMany({});
    await prisma.ext_spots.deleteMany({});
};

export type VisionTuningResult = {
    image: string;
    requestId: string;
    success: boolean;
    spot?: PrismaExtSpots;
    externalApiLogs?: Awaited<ReturnType<typeof prisma.external_api_logs.findMany>>;
    backendEventLogs?: Awaited<ReturnType<typeof prisma.backend_event_logs.findMany>>;
    errorMessage?: string;
}

const VISION_TUNING_USER_ID = '00000000-7669-7369-6f6e-54756e696e67';

const visionTuning = async () => {
    try {
        await cleanUp();

        const dirPath = 'system/images/vision-tuning/20250428';
        const images = await fetchImagesFromGCS(dirPath);

        console.log(`📸 Found ${images.length} images.`);

        const results: VisionTuningResult[] = [];

        for (const image of images) {
            const requestId = createRequestId();
            let success = true;
            let errorMessage;
            let spot;
            try {
                spot = await findOrCreateSpotFromImageUri(image, requestId, VISION_TUNING_USER_ID);

                console.log(`✅ Processed image: ${image}`);
            } catch (error: any) {
                console.error(`❌ Error processing image ${image}:`, error);
                success = false;
                errorMessage = error?.message ?? 'Unknown error'
            }

            const externalApiLogs = await prisma.external_api_logs.findMany({
                where: { request_id: requestId },
            });

            const backendEventLogs = await prisma.backend_event_logs.findMany({
                where: { request_id: requestId },
            });

            results.push({
                image,
                requestId,
                success,
                spot,
                externalApiLogs,
                backendEventLogs,
                errorMessage,
            });
        }

        await outputJson(results, 'vision-tuning-results.json');

    } catch (error) {
        console.error('❌ Fatal error during vision tuning:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

execute(visionTuning);