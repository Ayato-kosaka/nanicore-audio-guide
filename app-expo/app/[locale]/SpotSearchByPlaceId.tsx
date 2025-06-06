import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useWithLoading } from "@/hooks/useWithLoading";
import { useLogger } from "@/hooks/useLogger";
import { useSnackbar } from "@/contexts/SnackbarProvider";

import { convertSupabaseToPrisma_ExtSpots } from "@shared/converters/convert_ext_spots";
import { serializeSpotGuideParams } from "@/utils/navigation";
import i18n from "@/lib/i18n";
import { SpotSearchByPlaceIdParams } from "@/types/navigation";
import { Env } from "@/constants/Env";
import { useLocale } from "@/hooks/useLocale";

// 型：PlaceDetailsレスポンスの型
type PlaceDetailsResponse = {
	title: string;
	imageUrl: string | null;
};

// 仮のAPI関数：本来は `lib/api` などに定義して分離する
async function fetchPlaceDetails(placeId: string, language: string): Promise<PlaceDetailsResponse> {
	// 仮のAPIエンドポイントにリクエストを送信。nanicore でエンドポイントを開放し次第更新する。
	const response = await fetch("https://spelieve-backend-place-r4qxqxf4ta-an.a.run.app/PBL002", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ place_id: placeId, language }),
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch place details: ${response.statusText}`);
	}

	const data = await response.json();
	return data as PlaceDetailsResponse;
}

export default function SpotSearchByPlaceId() {
	const { id: placeId } = useLocalSearchParams<SpotSearchByPlaceIdParams>();
	const { isLoading, withLoading } = useWithLoading();
	const { logFrontendEvent } = useLogger();
	const { showSnackbar } = useSnackbar();
	const locale = useLocale();
	const router = useRouter();

	useEffect(() => {
		if (!placeId) {
			showSnackbar(i18n.t("SpotSearchByPlaceId.invalidPlaceId"));
			return;
		}

		withLoading(async () => {
			logFrontendEvent({
				event_name: "SpotSearchByPlaceIdInitiated",
				error_level: "info",
				payload: { placeId },
			});

			try {
				const { title, imageUrl } = await fetchPlaceDetails(placeId, locale.split("-")[0]);

				router.replace({
					pathname: "/[locale]/SpotGuide",
					params: {
						locale: i18n.locale,
						...serializeSpotGuideParams({
							extSpots: convertSupabaseToPrisma_ExtSpots({
								id: "/g/dummy",
								title: title,
								image_url: null,
								vision_detection_type: null,
								landmark_latitude: null,
								landmark_longitude: null,
								is_recommendable: false,
								created_at: new Date().toISOString(),
								lock_no: 0,
							}),
							imageUri: imageUrl,
							takenPhotoStoragePath: null,
						}),
					},
				});
			} catch (error: any) {
				logFrontendEvent({
					event_name: "SpotSearchByPlaceIdFailed",
					error_level: "error",
					payload: { message: error.message, placeId },
				});
				showSnackbar(i18n.t("SpotSearchByPlaceId.errorMessage"));
			}
		})();
	}, [placeId]);

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" testID="place-search-loading" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
