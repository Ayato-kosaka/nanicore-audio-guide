import { prisma } from "../lib/prisma";
import { outputJson } from "./utils";

const USER_ID = "";

/**
 * Extracts requestId from a payload string
 */
function extractRequestId(payload: string | null): string | null {
	if (!payload) return null;
	const match = payload.match(
		/requestId:\s*([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/,
	);
	return match ? match[1] : null;
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
	try {
		const [backendEventLogs, frontendEventLogs] = await Promise.all([
			prisma.backend_event_logs.findMany({
				where: { user_id: USER_ID },
				orderBy: { created_at: "desc" },
			}),
			prisma.frontend_event_logs.findMany({
				where: { user_id: USER_ID },
				orderBy: { created_at: "desc" },
			}),
		]);

		const frontendErrors = frontendEventLogs
			.filter((f) => f.error_level === "error")
			.map((f) => {
				const requestId = extractRequestId(f.payload);
				const relatedBackendLogs = backendEventLogs.filter((b) => b.request_id === requestId);
				return {
					...f,
					requestId,
					backendEventLogs: relatedBackendLogs,
				};
			});

		await outputJson(frontendErrors, "frontend-backend-error-linkage.json");
		console.log("✅ Successfully outputted error report.");
	} catch (error) {
		console.error("❌ Error occurred while processing logs:", error);
		process.exit(1);
	}
}

main();
