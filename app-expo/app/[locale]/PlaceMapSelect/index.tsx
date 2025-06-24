import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useCloudFunction } from "@/hooks/useCloudFunction";
import { useWithLoading } from "@/hooks/useWithLoading";
import { useLogger } from "@/hooks/useLogger";
import type { FindOrCreatePlaceFromIdResponse } from "@shared/api/findOrCreatePlaceFromId.schema";
import { convertSupabaseToPrisma_ExtPlaces } from "@shared/converters/convert_ext_places";
import { serializePlaceGuideParams } from "@/utils/navigation";
import i18n from "@/lib/i18n";

const SAMPLE_PLACES = [
	{ id: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM", title: "Sydney Opera House", latitude: -33.8567844, longitude: 151.213108 },
	{ id: "ChIJLfyY2E4cGGARZVrBTch0Uro", title: "Tokyo Tower", latitude: 35.6586, longitude: 139.7454 },
];

export default function PlaceMapSelect() {
	const router = useRouter();
	const { callCloudFunction } = useCloudFunction();
	const { withLoading, isLoading } = useWithLoading();
	const { logFrontendEvent } = useLogger();

	const handleSelect = withLoading(async (placeId: string) => {
		try {
			const { extPlaces } = await callCloudFunction<{ placeId: string }, FindOrCreatePlaceFromIdResponse>(
				"findOrCreatePlaceFromId",
				{ placeId },
				"v1",
			);
			router.push({
				pathname: "/[locale]/PlaceGuide",
				params: {
					locale: i18n.locale,
					...serializePlaceGuideParams({
						extPlaces: convertSupabaseToPrisma_ExtPlaces(extPlaces),
						imageUri: extPlaces.image_url ?? "",
						takenPhotoStoragePath: null,
					}),
				},
			});
		} catch (error: any) {
			logFrontendEvent({
				event_name: "selectPlaceFailed",
				error_level: "error",
				payload: { message: error.message },
			});
		}
	});

	return (
		<View style={styles.container}>
			<MapView
				style={StyleSheet.absoluteFill}
				initialRegion={{
					latitude: SAMPLE_PLACES[0].latitude,
					longitude: SAMPLE_PLACES[0].longitude,
					latitudeDelta: 0.1,
					longitudeDelta: 0.1,
				}}>
				{SAMPLE_PLACES.map((p) => (
					<Marker
						key={p.id}
						coordinate={{ latitude: p.latitude, longitude: p.longitude }}
						title={p.title}
						onPress={() => handleSelect(p.id)}
					/>
				))}
			</MapView>
			{isLoading && (
				<View style={styles.loading}>
					<ActivityIndicator size="large" />
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	loading: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.3)",
	},
});
