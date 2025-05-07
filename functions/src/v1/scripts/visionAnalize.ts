import { importJson, outputJson } from "./utils";
import { VisionTuningResult } from "./visionTuning";

type VisionAnalysisResult = {
	inputImageName: string;
	identifiedSpot?: string;
	landmarkAnnotations?: any;
	webDetection?: any;
};

export const visionAnalize = (rawResults: VisionTuningResult[]): VisionAnalysisResult[] => {
	return rawResults.map((item) => {
		const { image, spot, externalApiLogs } = item;

		const name = decodeURIComponent(image.split("/").pop()?.split("?")[0] || "");

		const identifyLog = externalApiLogs?.find((log: any) => log.function_name === "identifySpotCandidates");

		let parsedResponse: any = {};
		if (identifyLog?.response_payload) {
			try {
				parsedResponse = JSON.parse(identifyLog.response_payload as string);
			} catch (error) {
				console.warn(`Failed to parse response payload for image: ${name}`, error);
			}
		}

		return {
			inputImageName: name,
			identifiedSpot: spot?.title,
			landmarkAnnotations: parsedResponse.landmarkAnnotations,
			webDetection: parsedResponse.webDetection,
		};
	});
};

async function main() {
	const rawResults = await importJson("vision-tuning-results.json");

	const analysis = visionAnalize(rawResults);

	await outputJson(analysis, "vision-analize-results.json");
}

main();
