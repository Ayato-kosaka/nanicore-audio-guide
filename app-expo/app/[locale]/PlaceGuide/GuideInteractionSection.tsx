import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { Audio, InterruptionModeIOS } from "expo-av";
import { toggleReaction, insertReaction } from "@/lib/reactions";
import { useLogger } from "@/hooks/useLogger";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import i18n from "@/lib/i18n";

/**
 * 📚 GuideInteractionSection
 *
 * ガイドテキストを表示し、いいねや音声再生など
 * ユーザーのリアクションをまとめて扱う小さなコンポーネント。
 */

type Guide = {
	id: string;
	title: string;
	manuscript: string;
	category: string;
	audioUrl: string;
};

type GuideInteractionSectionProps = {
	guide: Guide;
	isFirst?: boolean;
	targetType: "place_guides" | "highlight_guides";
};

export const GuideInteractionSection: React.FC<GuideInteractionSectionProps> = ({
	guide,
	isFirst = false,
	targetType,
}) => {
       const [isLiked, setIsLiked] = useState(false);
       const [isPlaying, setIsPlaying] = useState(false);
       const [sound, setSound] = useState<Audio.Sound | null>(null);

       const { logFrontendEvent } = useLogger();
       const { showSnackbar } = useSnackbar();

	/**
	 * 💖 いいねボタンのトグル
	 */
	const handleLikePress = async () => {
		const willLike = !isLiked;
		setIsLiked(willLike);
               try {
                       await toggleReaction({
                               willReact: willLike,
                               target_type: targetType,
                               target_id: guide.id,
                               action_type: "like",
                       });
               } catch (err: any) {
                       logFrontendEvent({
                               event_name: "toggleLikeFailed",
                               error_level: "error",
                               payload: { error: err.message },
                       });
                       showSnackbar(i18n.t("PlaceGuide.reactionError"));
               }
       };

	/**
	 * ▶️ 音声再生のトグル
	 */
	const handlePlayPress = useCallback(async () => {
		if (isPlaying) {
			setIsPlaying(false);
			if (sound) {
                               try {
                                       await sound.stopAsync();
                                       await sound.unloadAsync();
                                       await insertReaction({
                                               target_type: targetType,
                                               target_id: guide.id,
                                               action_type: "pause",
                                       });
                               } catch (err: any) {
                                       logFrontendEvent({
                                               event_name: "pauseAudioFailed",
                                               error_level: "error",
                                               payload: { error: err.message },
                                       });
                                       showSnackbar(i18n.t("PlaceGuide.audioError"));
                               }
                               setSound(null);
                       }
			return;
		}
		if (!guide.audioUrl) return;
		setIsPlaying(true);
		try {
			await insertReaction({
				target_type: targetType,
				target_id: guide.id,
				action_type: "play",
			});
			const { sound: newSound } = await Audio.Sound.createAsync({ uri: guide.audioUrl }, { shouldPlay: true });
			setSound(newSound);
                        newSound.setOnPlaybackStatusUpdate(async (status) => {
                                if (!status.isLoaded) {
                                        setIsPlaying(false);
                                        setSound(null);
                                        return;
                                }
                                if (status.didJustFinish) {
                                        setIsPlaying(false);
                                       await newSound.unloadAsync();
                                       setSound(null);
                                       try {
                                               await insertReaction({
                                                       target_type: targetType,
                                                       target_id: guide.id,
                                                       action_type: "finish",
                                               });
                                       } catch (err: any) {
                                               logFrontendEvent({
                                                       event_name: "finishAudioReactionFailed",
                                                       error_level: "error",
                                                       payload: { error: err.message },
                                               });
                                               showSnackbar(i18n.t("PlaceGuide.audioError"));
                                       }
                               }
                       });
               } catch (err: any) {
                       setIsPlaying(false);
                       logFrontendEvent({
                               event_name: "playAudioFailed",
                               error_level: "error",
                               payload: { error: err.message },
                       });
                       showSnackbar(i18n.t("PlaceGuide.audioError"));
               }
       }, [isPlaying, guide.audioUrl, sound]);

        useEffect(() => {
               Audio.setAudioModeAsync({
                       playsInSilentModeIOS: true,
                       interruptionModeIOS: InterruptionModeIOS.DuckOthers,
               }).catch((err) => {
                       logFrontendEvent({
                               event_name: "audioModeSetupFailed",
                               error_level: "error",
                               payload: { error: err.message },
                       });
                       showSnackbar(i18n.t("PlaceGuide.audioError"));
               });
       }, []);

        useEffect(() => {
                return () => {
                        sound?.unloadAsync();
                };
	}, [sound]);

	return (
		<View style={[styles.container, isFirst && styles.firstGuide]}>
			<View style={styles.contentContainer}>
				<View style={styles.textContainer}>
					<Text style={[styles.title, isFirst && styles.firstTitle]}>{guide.title}</Text>
					<Text style={[styles.manuscript, isFirst && styles.firstContent]}>{guide.manuscript}</Text>
				</View>
				<View style={styles.actionsContainer}>
					<IconButton
						icon={isLiked ? "heart" : "heart-outline"}
						iconColor={isLiked ? "#fe3764" : "white"}
						size={18}
						onPress={handleLikePress}
						style={[styles.actionButton, isLiked && styles.likedButton]}
						testID="like-button"
					/>
					<IconButton
						icon={isPlaying ? "pause" : "volume-high"}
						iconColor={isPlaying ? "#4CAF50" : "white"}
						size={18}
						onPress={handlePlayPress}
						style={[styles.actionButton, isPlaying && styles.playingButton]}
						testID="play-audio-button"
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		borderTopWidth: 1,
		borderTopColor: "rgba(255, 255, 255, 0.15)",
	},
	firstGuide: {
		borderTopWidth: 0,
		paddingTop: 0,
	},
	contentContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	textContainer: {
		flex: 1,
		marginRight: 12,
	},
	actionsContainer: {
		flexDirection: "column",
		gap: 4,
	},
	title: {
		fontSize: 14,
		fontWeight: "600",
		color: "white",
		marginBottom: 6,
		textShadowColor: "rgba(0, 0, 0, 0.8)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	firstTitle: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 8,
	},
	manuscript: {
		fontSize: 12,
		color: "rgba(255, 255, 255, 0.95)",
		lineHeight: 16,
		textShadowColor: "rgba(0, 0, 0, 0.8)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	firstContent: {
		fontSize: 14,
		lineHeight: 20,
	},
	actionButton: {
		margin: 0,
		backgroundColor: "rgba(255, 255, 255, 0.15)",
		borderRadius: 16,
		width: 32,
		height: 32,
	},
	likedButton: {
		backgroundColor: "rgba(254, 55, 100, 0.2)",
	},
	playingButton: {
		backgroundColor: "rgba(76, 175, 80, 0.2)",
	},
});
