import textToSpeech, { protos } from "@google-cloud/text-to-speech";
import { logExternalApi } from "./logger";
import { google } from "@google-cloud/text-to-speech/build/protos/protos";

const client = new textToSpeech.TextToSpeechClient();

/**
 * 📢 Google Text-to-Speech API を使って音声合成を行う関数。
 *
 * @param text - 合成する文章（例："Welcome to the museum!"）
 * @param ssmlGender - 音声の性別（例："FEMALE"）
 * @param languageTag - 言語コード（例："ja-JP"）
 * @param requestId - 呼び出し元で生成した一意のリクエストID
 * @param userId - 呼び出し元ユーザーのID（匿名でも可）
 * @returns 音声データを含む Buffer オブジェクト
 * @throws エラー時は例外を投げる（ログは常に残る）
 */
export const synthesizeTextToSpeech = async ({
	text,
	ssmlGender,
	languageTag,
	requestId,
	userId,
}: {
	text: string;
	ssmlGender: google.cloud.texttospeech.v1.IVoiceSelectionParams["ssmlGender"];
	languageTag: string;
	requestId: string;
	userId: string;
}): Promise<Buffer> => {
	const start = Date.now();
	let status_code = 0;
	let response_payload: any = null;
	let error_message: string | null = null;

	const requestPayload: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
		input: { text },
		voice: {
			languageCode: languageTag,
			ssmlGender,
		},
		audioConfig: {
			audioEncoding: "MP3",
		},
	};
	try {
		// @see https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize
		const [response] = await client.synthesizeSpeech(requestPayload);
		response_payload = response;

		if (!response.audioContent) {
			throw new Error("音声合成に失敗しました（audioContentが空）");
		}
		status_code = 200;

		if (typeof response.audioContent === "string") {
			return Buffer.from(response.audioContent, "base64");
		} else {
			return Buffer.from(response.audioContent);
		}
	} catch (error: any) {
		error_message = error.message;
		status_code = error.code || 500;
		throw new Error(`TTS失敗: ${error_message}`);
	} finally {
		const response_time_ms = Date.now() - start;
		logExternalApi({
			request_id: requestId,
			function_name: "synthesizeTextToSpeech",
			api_name: "GoogleTextToSpeech",
			endpoint: "synthesizeSpeech",
			request_payload: JSON.stringify(requestPayload),
			response_payload,
			status_code,
			response_time_ms,
			user_id: userId,
			error_message,
		});
	}
};
