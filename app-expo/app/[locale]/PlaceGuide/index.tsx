import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Chip } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";

import PlaceGuideCard from "./PlaceGuideCard";
import { useWithLoading } from "@/hooks/useWithLoading";
import { useCloudFunction } from "@/hooks/useCloudFunction";
import { useLogger } from "@/hooks/useLogger";
import { useLocale } from "@/hooks/useLocale";
import type { ListPlaceGuidesRequest, ListPlaceGuidesResponse } from "@shared/api/listPlaceGuides.schema";
import type { GeneratePlaceGuideRequest, GeneratePlaceGuideResponse } from "@shared/api/generatePlaceGuide.schema";
import { PlaceGuideParams, PlaceGuideSerializedParams } from "@/types/navigation";
import { deserializePlaceGuideParams } from "@/utils/navigation";
import { convertSupabaseToPrisma_PlaceGuides, PrismaPlaceGuides } from "@shared/converters/convert_place_guides";

export default function PlaceGuideScreen() {
	const router = useRouter();
	const { callCloudFunction } = useCloudFunction();
	const { withLoading, isLoading } = useWithLoading();
	const { logFrontendEvent } = useLogger();
	const locale = useLocale();
	const serializedParams = useLocalSearchParams<PlaceGuideSerializedParams>();
	const { extPlaces, imageUri, takenPhotoStoragePath }: PlaceGuideParams = useMemo(
		() => deserializePlaceGuideParams(serializedParams),
		[serializedParams],
	);

	const [guides, setGuides] = useState<(PrismaPlaceGuides & { audioUrl: string })[]>([]);
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	const tags = useMemo(() => {
		const setTag = new Set<string>();
		guides.forEach((g) => g.tags?.forEach((t: string) => setTag.add(t)));
		return Array.from(setTag);
	}, [guides]);

	useEffect(() => {
		if (!extPlaces) {
			router.replace(`/${locale}/PlaceMapSelect`);
			return;
		}
		withLoading(async () => {
			try {
				logFrontendEvent({
					event_name: "PlaceGuideMounted",
					error_level: "info",
					payload: { placeId: extPlaces.id },
				});
				const res = await callCloudFunction<ListPlaceGuidesRequest, ListPlaceGuidesResponse>(
					"listPlaceGuides",
					{ placeId: extPlaces.id, languageTag: locale },
					"v1",
				);
				let list = res.placeGuides.map((g) => ({ ...convertSupabaseToPrisma_PlaceGuides(g), audioUrl: g.audioUrl }));
				if (list.length === 0) {
					const gen = await callCloudFunction<GeneratePlaceGuideRequest, GeneratePlaceGuideResponse>(
						"generatePlaceGuide",
						{ extPlace: { id: extPlaces.id, title: extPlaces.title }, languageTag: locale },
						"v1",
					);
					list = [{ ...convertSupabaseToPrisma_PlaceGuides(gen.placeGuide), audioUrl: gen.audioUrl }];
				}
				setGuides(list);
			} catch (error: any) {
				logFrontendEvent({
					event_name: "PlaceGuideLoadFailed",
					error_level: "error",
					payload: { message: error.message },
				});
			}
		})();
	}, []);

	const filteredGuides = useMemo(() => {
		if (!selectedTag) return guides;
		return guides.filter((g) => g.tags?.includes(selectedTag));
	}, [guides, selectedTag]);

	if (!extPlaces || isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

	return (
		<View style={styles.container}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
				<Chip selected={!selectedTag} onPress={() => setSelectedTag(null)} style={styles.chip}>
					All
				</Chip>
				{tags.map((tag) => (
					<Chip key={tag} selected={selectedTag === tag} onPress={() => setSelectedTag(tag)} style={styles.chip}>
						{tag}
					</Chip>
				))}
			</ScrollView>
			<PlaceGuideCard
				place={extPlaces}
				initialGuides={filteredGuides}
				imageUri={imageUri ?? extPlaces.image_url ?? ""}
				takenPhotoStoragePath={takenPhotoStoragePath}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#f1f1f1" },
	chips: { paddingHorizontal: 8, paddingVertical: 12 },
	chip: { marginRight: 8 },
});
