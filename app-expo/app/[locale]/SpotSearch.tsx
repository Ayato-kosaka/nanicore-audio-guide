import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useWithLoading } from "@/hooks/useWithLoading";
import { useLogger } from "@/hooks/useLogger";
import { useCloudFunction } from "@/hooks/useCloudFunction";
import { useSnackbar } from "@/contexts/SnackbarProvider";

import type {
	FindOrCreateSpotFromIdRequest,
	FindOrCreateSpotFromIdResponse,
} from "@shared/api/findOrCreateSpotFromId.schema";
import { convertSupabaseToPrisma_ExtSpots } from "@shared/converters/convert_ext_spots";
import { serializeSpotGuideParams } from "@/utils/navigation";
import i18n from "@/lib/i18n";
import { SpotSearchParams } from "@/types/navigation";

export default function SpotSearch() {
	const { id: spotId } = useLocalSearchParams<SpotSearchParams>();
	const { isLoading, withLoading } = useWithLoading();
	const { callCloudFunction } = useCloudFunction();
	const { logFrontendEvent } = useLogger();
	const { showSnackbar } = useSnackbar();
	const router = useRouter();

	useEffect(() => {
		if (!spotId) {
			showSnackbar(i18n.t("SpotSearch.invalidSpotId"));
			return;
		}

		withLoading(async () => {
			logFrontendEvent({
				event_name: "SpotSearchInitiated",
				error_level: "info",
				payload: { spotId },
			});

			try {
				const { extSpots } = await callCloudFunction<FindOrCreateSpotFromIdRequest, FindOrCreateSpotFromIdResponse>(
					"findOrCreateSpotFromId",
					{ spotId },
					"v1",
				);

				router.replace({
					pathname: "/[locale]/SpotGuide",
					params: {
						locale: i18n.locale,
						...serializeSpotGuideParams({
							extSpots: convertSupabaseToPrisma_ExtSpots(extSpots),
							imageUri: extSpots.image_url,
							takenPhotoStoragePath: null,
						}),
					},
				});
			} catch (error: any) {
				logFrontendEvent({
					event_name: "SpotSearchFailed",
					error_level: "error",
					payload: { message: error.message, spotId },
				});
				showSnackbar(i18n.t("SpotSearch.errorMessage"));
			}
		})();
	}, [spotId]);

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" testID="spot-search-loading" />
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
