import "react-native-get-random-values";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider } from "@/contexts/AuthProvider";
import { useLocale } from "@/hooks/useLocale";
import i18n, { getResolvedLocale } from "@/lib/i18n";
import { SplashHandler } from "@/components/SplashHandler";
import { useLocaleFonts } from "@/hooks/useLocaleFonts";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SnackbarProvider } from "@/contexts/SnackbarProvider";
import { useColorScheme } from "react-native";
import { getPaperTheme } from "@/constants/PaperTheme";
import { DialogProvider } from "@/contexts/DialogProvider";

/**
 * 🌍 BCP 47 言語タグが妥当な形式かを検証するユーティリティ関数。
 *
 * @param tag - 対象の言語コード（例: "ja", "en-US", "zh-Hant"）
 * @returns 正常な言語タグであれば true、不正な形式なら false
 */
const isValidBcp47Tag = (tag: string): boolean => {
	const bcp47Pattern = /^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$/;
	return bcp47Pattern.test(tag);
};

/**
 * 🌐 言語スコープレイアウト（[local]ルーティングに対応）
 *
 * - `useLocale()` によって取得された言語コードを i18n.locale に反映
 * - 不正な形式の場合はトップページへリダイレクト
 * - アプリ全体で BCP 47 に準拠した多言語対応を保証する
 *
 * @returns 言語判定とバリデーションを行ったレイアウト付きスタック構造
 */
export default function LocalLayout() {
	const router = useRouter();
	const locale = useLocale();
	const scheme = useColorScheme();
	const theme = getPaperTheme(scheme, locale);

	const fontsLoaded = useLocaleFonts(locale);

	useEffect(() => {
		const isLocaleSupported = isValidBcp47Tag(locale);

		if (!isLocaleSupported) {
			router.replace("/");
			return;
		}

		i18n.locale = getResolvedLocale(locale);
	}, [locale]);

	if (!fontsLoaded) return null;
	return (
		<PaperProvider theme={theme}>
			<GestureHandlerRootView>
				<SnackbarProvider>
					<DialogProvider>
						<AuthProvider>
							<SplashHandler>
								<Stack initialRouteName="SpotCapture/index" screenOptions={{ headerShown: false }} />
							</SplashHandler>
						</AuthProvider>
					</DialogProvider>
				</SnackbarProvider>
			</GestureHandlerRootView>
		</PaperProvider>
	);
}
