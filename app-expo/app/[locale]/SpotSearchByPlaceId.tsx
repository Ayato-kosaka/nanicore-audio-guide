import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useWithLoading } from "@/hooks/useWithLoading";
import { useLogger } from "@/hooks/useLogger";
import { useSnackbar } from "@/contexts/SnackbarProvider";

import type {
	FindOrCreateSpotFromPlaceIdRequest,
	FindOrCreateSpotFromPlaceIdResponse,
} from "@shared/api/findOrCreateSpotFromPlaceId.schema";
import { convertSupabaseToPrisma_ExtSpots } from "@shared/converters/convert_ext_spots";
import { serializeSpotGuideParams } from "@/utils/navigation";
import i18n from "@/lib/i18n";
import { SpotSearchByPlaceIdParams } from "@/types/navigation";
import { useLocale } from "@/hooks/useLocale";
import { useCloudFunction } from "@/hooks/useCloudFunction";

export default function SpotSearchByPlaceId() {
	const { id: placeId } = useLocalSearchParams<SpotSearchByPlaceIdParams>();
	const { isLoading, withLoading } = useWithLoading();
	const { callCloudFunction } = useCloudFunction();
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
				const { extSpots } = await callCloudFunction<
					FindOrCreateSpotFromPlaceIdRequest,
					FindOrCreateSpotFromPlaceIdResponse
				>("findOrCreateSpotFromPlaceId", { placeId }, "v1");

				router.replace({
					pathname: "/[locale]/SpotGuide",
					params: {
						locale: i18n.locale,
						...serializeSpotGuideParams({
							extSpots: convertSupabaseToPrisma_ExtSpots(extSpots),
							imageUri: extSpots?.image_url,
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
