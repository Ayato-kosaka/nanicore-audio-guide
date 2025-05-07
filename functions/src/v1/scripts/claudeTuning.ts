import { createRequestId } from "../lib/backendUtils";
import { prisma } from "../lib/prisma";
import { PrismaExtSpots } from "../../../../shared/converters/convert_ext_spots";
import { execute, importJson, outputJson } from "./utils";
import { generateSpotGuideContent } from "../lib/claude";

// Cleanup: DBのクリーンアップ
const cleanUp = async () => {
	console.log("🧹 Cleaning up database...");
};

export type VisionTuningResult = {
	image: string;
	requestId: string;
	success: boolean;
	spot?: PrismaExtSpots;
	externalApiLogs?: Awaited<ReturnType<typeof prisma.external_api_logs.findMany>>;
	backendEventLogs?: Awaited<ReturnType<typeof prisma.backend_event_logs.findMany>>;
	errorMessage?: string;
};

const CLAUDE_TUNING_USER_ID = "00000000-2025-0502-0554-000000000000";

const claudeTuning = async () => {
	try {
		await cleanUp();

		const claudeTuningInput: { input: string }[] = await importJson("claude-tuning-input.json");

		const results = await Promise.all(
			claudeTuningInput.map(async (input) => {
				const requestId = createRequestId();
				const inputParse = JSON.parse(input.input);
				const spotTitle = inputParse.extSpot.title;
				const languageTag = inputParse.languageTag;
				let success = true;
				let errorMessage;
				try {
					await generateSpotGuideContent(spotTitle, languageTag, requestId, CLAUDE_TUNING_USER_ID);

					console.log(`✅ Processed: generateSpotGuideContent ${spotTitle} ${languageTag} ${requestId}`);
				} catch (error: any) {
					console.error(`❌ Error processing generateSpotGuideContent:`, error);
					success = false;
					errorMessage = error?.message ?? "Unknown error";
				}

				const externalApiLogs = await prisma.external_api_logs.findMany({
					where: { request_id: requestId },
				});

				const backendEventLogs = await prisma.backend_event_logs.findMany({
					where: { request_id: requestId },
				});

				return {
					spotTitle,
					languageTag,
					requestId,
					success,
					errorMessage,
					externalApiLogs,
					backendEventLogs,
				};
			}),
		);

		await outputJson(results, "claude-tuning-results.json");
	} catch (error) {
		console.error("❌ Fatal error during claude tuning:", error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
};

execute(claudeTuning);
