import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, Image, StyleSheet, Platform, ImageBackground } from "react-native";
import { Text } from "react-native-paper";
import { Audio, InterruptionModeIOS } from "expo-av";
import { IconButton } from "react-native-paper";
import { useWithLoading } from "@/hooks/useWithLoading";
import { useCloudFunction } from "@/hooks/useCloudFunction";
import { useLogger } from "@/hooks/useLogger";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/contexts/AuthProvider";
import i18n from "@/lib/i18n";
import { getRemoteConfig } from "@/lib/remoteConfig";
import { convertSupabaseToPrisma_PlaceGuides, PrismaPlaceGuides } from "@shared/converters/convert_place_guides";
import { convertPrismaToSupabase_ExtPlaces, PrismaExtPlaces } from "@shared/converters/convert_ext_places";
import { Env } from "@/constants/Env";
import type { GeneratePlaceGuideRequest, GeneratePlaceGuideResponse } from "@shared/api/generatePlaceGuide.schema";
import { useLocale } from "@/hooks/useLocale";
import type { SupabasePlaceVisits } from "@shared/converters/convert_place_visits";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSnackbar } from "@/contexts/SnackbarProvider";

/**
 * 🧭 PlaceGuideCard
 *
 * 撮影画像とガイド情報を表示し、音声再生・いいね・次のガイド表示などの操作を提供する。
 * - 初期ロード時にガイドがなければ自動生成
 * - ガイドを切り替えるときに代表ガイドとして記録
 * - ガイド生成・いいねなどの操作ログを記録
 *
 * @param {PrismaExtPlaces} place - 表示する場所情報
 * @param {PlaceGuide[]} initialGuides - 初期ガイドのリスト
 * @param {string} imageUri - 表示する撮影画像のURL
 * @param {string} [takenPhotoStoragePath] - 画像の保存パス（任意）
 * @returns {JSX.Element} ガイド表示用のUIコンポーネント
 */
const PlaceGuideCard = ({
	place,
	initialGuides,
	imageUri,
	takenPhotoStoragePath,
}: {
	place: PrismaExtPlaces;
	initialGuides: (PrismaPlaceGuides & { audioUrl: string })[];
	imageUri: string;
	takenPhotoStoragePath?: string | null;
}) => {
	const { user } = useAuth();
	const { isLoading, withLoading } = useWithLoading();
	const { logFrontendEvent } = useLogger();
	const { callCloudFunction } = useCloudFunction();
	const { showSnackbar } = useSnackbar();
	const router = useRouter();
	const locale = useLocale();

	const [placeGuideList, setPlaceGuideList] = useState(initialGuides);
	const [placeGuideIndex, setPlaceGuideIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [imageSrc, setImageSrc] = useState(imageUri);
	const [showLikeButton, setShowLikeButton] = useState(false);
	const [showNextButton, setShowNextButton] = useState(false);

	const visitIdRef = useRef<string>(uuidv4());
	const currentGuide = placeGuideIndex < placeGuideList.length ? placeGuideList[placeGuideIndex] : null;
	/**
	 * 🎧 現在のガイドの音声を再生する。
	 *
	 * - すでに再生中であれば再生しない
	 * - 音声再生後、終了時に自動でアンロード
	 */
	const playAudioFromGuide = useCallback(
		async (guide: typeof currentGuide) => {
			if (isPlaying || !guide?.audioUrl) return;
			setIsPlaying(true);

			try {
				const { sound: newSound } = await Audio.Sound.createAsync({ uri: guide?.audioUrl }, { shouldPlay: true });
				setSound(newSound);

				newSound.setOnPlaybackStatusUpdate((status) => {
					if (!status.isLoaded) {
						setIsPlaying(false);
						newSound.unloadAsync();
						return;
					}

					if (status.didJustFinish) {
						setIsPlaying(false);
						newSound.unloadAsync();

						// ガイド再生終了時に訪問記録を更新
						if (user?.id && guide?.id) {
							supabase.from("place_visits").update({ represent_guide_id: guide.id }).eq("id", visitIdRef.current);
						}
					}
				});

				logFrontendEvent({
					event_name: "playAudio",
					payload: { place_id: place.id },
					error_level: "info",
				});
			} catch (err: any) {
				setIsPlaying(false);
				logFrontendEvent({
					event_name: "playAudioFailed",
					error_level: "error",
					payload: { error: err.message ?? "Unknown error during audio playback." },
				});
			}
		},
		[isPlaying, place.id, user?.id],
	);
	const handlePlayAudio = useCallback(() => {
		playAudioFromGuide(currentGuide);
	}, [playAudioFromGuide, currentGuide]);

	/**
	 * 💖 ガイドに対する「いいね」をトグルする。
	 *
	 * - Supabase の reactions テーブルを更新
	 */
	const handleToggleLike = useCallback(async () => {
		if (!user?.id || !currentGuide?.id) return;

		const guideId = currentGuide.id;
		const willLike = !isLiked;
		setIsLiked(willLike);

		logFrontendEvent({
			event_name: "toggleLike",
			payload: { guideId, willLike },
			error_level: "info",
		});

		try {
			if (willLike) {
				const { error } = await supabase.from("reactions").insert({
					id: uuidv4(),
					user_id: user.id,
					target_type: "place_guides",
					target_id: guideId,
					action_type: "like",
					created_at: new Date().toISOString(),
					created_version: Env.APP_VERSION,
					lock_no: 0,
				});
				if (error) throw new Error(error.message);
			} else {
				const { error } = await supabase
					.from("reactions")
					.delete()
					.eq("user_id", user.id)
					.eq("target_type", "place_guides")
					.eq("target_id", guideId)
					.eq("action_type", "like");
				if (error) throw new Error(error.message);
			}
		} catch (err: any) {
			logFrontendEvent({
				event_name: "toggleLikeFailed",
				error_level: "error",
				payload: {
					guideId,
					willLike,
					error: err.message ?? "Failed to update like status.",
				},
			});
		}
	}, [currentGuide?.id, isLiked, user?.id]);

	/**
	 * 🪄 新しいガイドを生成してリストに追加する。
	 *
	 * - `generatePlaceGuide` Cloud Function を呼び出す
	 * - 結果を `placeGuideList` に追加
	 */
	const generatePlaceGuide = useCallback(async () => {
		try {
			const { spotGuide, audioUrl } = await callCloudFunction<GeneratePlaceGuideRequest, GeneratePlaceGuideResponse>(
				"generatePlaceGuide",
				{ extPlace: convertPrismaToSupabase_ExtPlaces(place), languageTag: locale },
				"v1",
			);

			const newGuide = { ...convertSupabaseToPrisma_PlaceGuides(spotGuide), audioUrl };
			setPlaceGuideList((prev) => [...prev, newGuide]);

			logFrontendEvent({
				event_name: "generatePlaceGuide",
				payload: { place_guide_id: spotGuide.id },
				error_level: "info",
			});
			return newGuide;
		} catch (err: any) {
			showSnackbar(i18n.t("PlaceGuideCard.generatePlaceGuideErrorMessage"));
			router.replace(`/${locale}/PlaceMapSelect`);
			logFrontendEvent({
				event_name: "generatePlaceGuideFailed",
				error_level: "error",
				payload: {
					error: err.message ?? "Failed to generate new guide.",
					stack: err.stack,
				},
			});
		}
	}, [callCloudFunction, locale, place]);
	/**
	 * ⏭ 現在のガイドを代表として表示し、次のガイドを表示する。
	 *
	 * - "regenerate" 反応を追加
	 * - ガイドの終了時に新しいガイドを生成
	 * - `place_visits.represent_guide_id` を更新
	 */
	const handleNextGuideSpot = withLoading(async () => {
		if (!user?.id || !currentGuide?.id) return;

		const currentGuideId = currentGuide.id;

		try {
			supabase.from("reactions").insert({
				id: uuidv4(),
				user_id: user.id,
				target_type: "place_guides",
				target_id: currentGuideId,
				action_type: "regenerate",
				created_at: new Date().toISOString(),
				created_version: Env.APP_VERSION,
				lock_no: 0,
			});

			let newGuide: typeof currentGuide | undefined;
			if (placeGuideList.length === placeGuideIndex + 1) {
				newGuide = await generatePlaceGuide();
			}
			setPlaceGuideIndex((prev) => prev + 1);
			playAudioFromGuide(newGuide ?? currentGuide);
		} catch (err: any) {
			logFrontendEvent({
				event_name: "nextGuideFailed",
				error_level: "error",
				payload: { error: err.message ?? "Failed to move to next guide." },
			});
		}
	});

	/**
	 * 📸 画像読み込み失敗時にフォールバック画像へ切り替える。
	 */
	const handleImageError = useCallback(() => {
		const placeholderImage = require("@/assets/images/no_image_logo.png");
		const resolvedAsset = Platform.OS === "web" ? placeholderImage : Image.resolveAssetSource(placeholderImage);
		setImageSrc(resolvedAsset.uri);
		logFrontendEvent({
			event_name: "imageLoadError",
			error_level: "error",
			payload: {
				place_id: place.id,
				failed_url: imageUri,
			},
		});
	}, [imageUri, place.id]);

	/**
	 * 🔄 初期化処理：最初のガイド生成と訪問記録
	 */
	useEffect(() => {
		const initialize = async () => {
			if (!user?.id) return;

			const remoteConfig = getRemoteConfig();
			const like = await remoteConfig?.v1_show_like_button;
			const next = await remoteConfig?.v1_show_next_button;
			setShowLikeButton(like === "true");
			setShowNextButton(next === "true");
			if (!remoteConfig?.v1_spot_visits_max_version_major) return;

			let newGuide: typeof currentGuide | undefined;
			if (placeGuideList.length === 0) {
				newGuide = await generatePlaceGuide();
			}
			playAudioFromGuide(newGuide ?? currentGuide);

			const { data: previousVisit } = await supabase
				.from("place_visits")
				.select("id, place_id, created_at")
				.eq("user_id", user.id)
				.order("created_at", { ascending: false })
				.limit(1)
				.maybeSingle();

			const minutesSinceLastVisit = previousVisit?.created_at
				? Math.floor((Date.now() - new Date(previousVisit.created_at).getTime()) / 60000)
				: null;

			const visit: SupabasePlaceVisits = {
				id: visitIdRef.current,
				user_id: user.id,
				place_id: place.id,
				represent_guide_id: null,
				taken_photo_storage_path: takenPhotoStoragePath ?? null,
				prev_place_id: previousVisit?.place_id ?? null,
				time_gap_minutes: minutesSinceLastVisit,
				min_version_major: 1,
				max_version_major: parseInt(remoteConfig.v1_spot_visits_max_version_major),
				created_at: new Date().toISOString(),
				lock_no: 0,
				updated_at: new Date().toISOString(),
			};
			// Supabase SDK は遅延評価なので、Promise.resolve で非同期で挿入
			Promise.resolve().then(async () => {
				const { error } = await supabase.from("place_visits").insert(visit);
				if (error) {
					logFrontendEvent({
						event_name: "insertPlaceVisitFailedOnInitialize",
						error_level: "error",
						payload: { error: error.message ?? "Failed to insert spot visit on initialize." },
					});
				}
			});
		};

		withLoading(initialize)();
	}, []);

	/**
	 * サイレントモード無視の設定
	 */
	useEffect(() => {
		Audio.setAudioModeAsync({
			playsInSilentModeIOS: true,
			interruptionModeIOS: InterruptionModeIOS.DuckOthers,
		}).catch((err) => {
			logFrontendEvent({
				event_name: "audioModeSetupFailed",
				error_level: "error",
				payload: { error: err },
			});
		});
	}, []);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={{ uri: imageSrc }}
				style={styles.image}
				imageStyle={{ borderRadius: 10 }}
				resizeMode="cover"
				onError={handleImageError}
				testID="place-image">
				<LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]} style={styles.titleContainer}>
					<Text style={styles.title}>{currentGuide?.title}</Text>
					<Text style={styles.guideText}>{currentGuide?.manuscript ?? i18n.t("PlaceGuideCard.generating")}</Text>
					<View style={styles.buttonRow}>
						{showLikeButton && (
							<IconButton
								icon={isLiked ? "heart" : "heart-outline"}
								onPress={handleToggleLike}
								disabled={!currentGuide}
								iconColor="white"
								testID="like-button"
							/>
						)}
						<IconButton
							icon="volume-high"
							onPress={handlePlayAudio}
							disabled={isPlaying || !currentGuide?.audioUrl}
							iconColor="white"
							testID="play-audio-button"
						/>
						{showNextButton && (
							<IconButton
								icon="refresh"
								onPress={handleNextGuideSpot}
								disabled={isLoading}
								iconColor="white"
								testID="next-guide-button"
							/>
						)}
					</View>
				</LinearGradient>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	image: {
		height: "100%",
		justifyContent: "flex-end",
	},
	titleContainer: {
		justifyContent: "flex-end",
		padding: 16,
		paddingTop: 60,
		borderRadius: 10,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 12,
		color: "white",
	},
	guideText: {
		fontSize: 16,
		marginBottom: 12,
		color: "white",
	},
	buttonRow: {
		flexDirection: "row",
		gap: 12,
		color: "white",
	},
});

export default PlaceGuideCard;
