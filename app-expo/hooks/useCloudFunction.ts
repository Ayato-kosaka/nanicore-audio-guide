import { useCallback } from "react";
import { Env } from "@/constants/Env";
import { useLogger } from "./useLogger";
import { useAuth } from "@/contexts/AuthProvider";
import i18n from "@/lib/i18n";
import { useDialog } from "@/contexts/DialogProvider";
import { Linking, Platform } from "react-native";

type APIVersion = "v1" | "v2";

/**
 * ☁️ Firebase Cloud Functions を呼び出すカスタムフック。
 *
 * - 認証セッションの JWT を Authorization ヘッダーに付与
 * - multipart/form-data または JSON 形式の POST に対応
 * - 呼び出しと同時にログを出力し、レスポンスを返す
 * - 通信エラー時はログ記録した上で例外をスロー
 *
 * @returns `callCloudFunction` を提供（非同期POST）
 */
export const useCloudFunction = () => {
	const { logFrontendEvent } = useLogger();
	const { showDialog } = useDialog();
	const { session } = useAuth();

	/**
	 * 指定された Cloud Function を呼び出す
	 *
	 * @param functionName - 関数名（例: "findOrCreateSpotFromImage"）
	 * @param requestPayload - リクエストボディ（JSONまたはFormData）
	 * @param version - バージョン名（"v1" or "v2"）
	 * @param isMultipart - multipart/form-data を使用するか
	 * @returns Cloud Function の戻り値（型指定可）
	 * @throws ネットワークエラーまたは認証なし・応答エラー時に例外をスロー
	 */
	const callCloudFunction = useCallback(
		async <T extends Record<string, any> | FormData, R>(
			functionName: string,
			requestPayload: T,
			version: APIVersion,
			isMultipart: boolean = false,
		): Promise<R> => {
			const appVersion = Env.APP_VERSION;
			const endpoint = `${Env.CLOUD_FUNCTION_BASE_URL}/${version}-${functionName}`;

			// 🔐 認証トークンの有無をチェック
			const accessToken = session?.access_token;
			if (!accessToken) {
				throw new Error("User is not authenticated: Supabase access_token is missing.");
			}

			// 🧾 リクエストヘッダー構築
			const headers: Record<string, string> = {
				"x-app-version": appVersion,
				Authorization: `Bearer ${accessToken}`,
			};
			if (!isMultipart) {
				headers["Content-Type"] = "application/json";
			}

			// 🌐 API 呼び出し
			const response = await fetch(endpoint, {
				method: "POST",
				headers,
				body: isMultipart ? (requestPayload as FormData) : JSON.stringify(requestPayload),
			});

			const requestId = response.headers.get("x-request-id");

			// ❌ エラー処理
			if (!response.ok) {
				const errorMessage = `Function ${version}-${functionName} failed with status ${response.status} (requestId: ${requestId})`;

				let errorPayload: { error?: string; message?: string } = {};
				try {
					errorPayload = await response.json();
				} catch {
					// レスポンスボディがJSONでない場合はスキップ
				}

				// 特定エラーコードによる分岐
				if (response.status === 403) {
					switch (errorPayload.error) {
						case "Service maintenance":
							showDialog(i18n.t("Error.maintenanceMessage")); // 🧃 表示のみ（アプリ全体は操作制限済み想定）
							throw {
								code: "maintenance_mode",
								message: errorPayload.message || errorMessage,
								requestId,
							};
						case "Unsupported version":
							const storeUrl = Platform.select({
								ios: Env.APP_STORE_URL, // iOS の App Store URL
								android: Env.PLAY_STORE_URL, // Android の Play Store URL
							});
							showDialog(i18n.t("Error.unsupportedVersion"), {
								// 🧃 表示のみ（アプリ全体は操作制限済み想定）
								okLabel: i18n.t("Common.goStore"),
								onConfirm: () => storeUrl && Linking.openURL(storeUrl),
							});
							throw {
								code: "unsupported_version",
								message: errorPayload.message || errorMessage,
								requestId,
							};
						default:
							throw {
								code: "forbidden",
								message: errorPayload.message || errorMessage,
								requestId,
							};
					}
				}

				// その他の HTTP エラー
				throw {
					code: "http_error",
					status: response.status,
					message: `Function ${version}-${functionName} failed with status ${response.status}`,
					requestId,
				};
			}

			logFrontendEvent({
				event_name: `callCloudFunction:${version}-${functionName}`,
				error_level: "info",
				payload: {
					requestPayload: isMultipart || requestPayload instanceof FormData ? "[multipart/form-data]" : requestPayload,
					requestId,
				},
			});

			return await response.json();
		},
		[logFrontendEvent, session],
	);

	return { callCloudFunction };
};
