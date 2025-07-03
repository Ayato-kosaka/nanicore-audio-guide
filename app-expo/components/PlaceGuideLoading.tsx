import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated, Easing } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/PaperTheme";
import i18n from "@/lib/i18n";

const { width, height } = Dimensions.get("window");

/**
 * 🎭 PlaceGuideLoadingProps
 *
 * Props interface for the PlaceGuideLoading component
 */
export interface PlaceGuideLoadingProps {
	/** Optional custom loading message */
	message?: string;
	/** Whether to show the animated logo */
	showLogo?: boolean;
	/** Custom test ID for testing purposes */
	testID?: string;
}

/**
 * 💀 SkeletonBox Component
 *
 * Reusable skeleton loading box with shimmer animation
 */
interface SkeletonBoxProps {
	width: number | string;
	height: number | string;
	borderRadius?: number;
	style?: any;
	testID?: string;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ width, height, borderRadius = 8, style, testID }) => {
	const shimmerAnimation = useRef(new Animated.Value(0)).current;
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";

	useEffect(() => {
		const shimmer = () => {
			shimmerAnimation.setValue(0);
			Animated.timing(shimmerAnimation, {
				toValue: 1,
				duration: 1500,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start(() => shimmer());
		};
		shimmer();
	}, [shimmerAnimation]);

	const translateX = shimmerAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: [-width as number, width as number],
	});

	return (
		<View
			style={[
				{
					width,
					height,
					borderRadius,
					backgroundColor: isDark ? Colors.dark.surfaceVariant : Colors.light.surfaceVariant,
					overflow: "hidden",
				},
				style,
			]}
			testID={testID}
			accessibilityRole="progressbar"
			accessibilityLabel={i18n.t("PlaceGuide.loading")}>
			<Animated.View
				style={[
					StyleSheet.absoluteFill,
					{
						transform: [{ translateX }],
					},
				]}>
				<LinearGradient
					colors={
						isDark
							? ["transparent", "rgba(255,255,255,0.1)", "transparent"]
							: ["transparent", "rgba(255,255,255,0.8)", "transparent"]
					}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={StyleSheet.absoluteFill}
				/>
			</Animated.View>
		</View>
	);
};

/**
 * 🌟 PlaceGuideLoading Component
 *
 * A skeleton loading component that exactly matches PlaceGuideCard.tsx structure:
 * - GuideBaseCard with imageBackground and overlays
 * - PlaceGuideCard with guides scroll view and question field
 * - GuideInteractionSection with text and action buttons
 * - Exact padding, margins, border radius, and shadows
 */
export const PlaceGuideLoading: React.FC<PlaceGuideLoadingProps> = ({
	message = i18n.t("PlaceGuide.loading"),
	showLogo = true,
	testID = "place-guide-loading",
}) => {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";

	// Animation values for smooth entrance
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.95)).current;

	useEffect(() => {
		// Entrance animation matching PlaceScreen
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 600,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 600,
				easing: Easing.out(Easing.back(1.1)),
				useNativeDriver: true,
			}),
		]).start();
	}, [fadeAnim, scaleAnim]);

	const styles = createStyles(isDark);

	return (
		<View style={styles.container} testID={testID}>
			{/* Exact match to PlaceScreen carouselContainer */}
			<View style={styles.carouselContainer}>
				<Animated.View
					style={[
						styles.cardContainer,
						{
							opacity: fadeAnim,
							transform: [{ scale: scaleAnim }],
						},
					]}>
					{/* GuideBaseCard structure - imageBackground with overlays */}
					<View style={styles.imageBackground}>
						{/* Image skeleton */}
						<SkeletonBox
							width="100%"
							height="100%"
							borderRadius={12}
							style={styles.imageSkeleton}
							testID="image-skeleton"
						/>

						{/* Header overlay - exact match to GuideBaseCard */}
						<LinearGradient colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0)"]} style={styles.headerOverlay}>
							<View style={styles.headerContent}>
								{/* Place name skeleton */}
								<SkeletonBox width="60%" height={16} borderRadius={8} testID="place-name-skeleton" />
								{/* Close button skeleton */}
								<SkeletonBox width={40} height={40} borderRadius={20} testID="close-button-skeleton" />
							</View>
						</LinearGradient>

						{/* Content overlay - exact match to GuideBaseCard */}
						<LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"]} style={styles.contentOverlay}>
							{/* Guides scroll view content */}
							<View style={styles.guidesContent}>
								{/* First guide (larger) */}
								<View style={styles.firstGuide}>
									<View style={styles.guideContentContainer}>
										<View style={styles.textContainer}>
											<SkeletonBox width="80%" height={18} borderRadius={9} testID="first-title-skeleton" />
											<View style={styles.firstContentLines}>
												<SkeletonBox width="95%" height={14} borderRadius={7} testID="first-content-1" />
												<SkeletonBox width="85%" height={14} borderRadius={7} testID="first-content-2" />
												<SkeletonBox width="75%" height={14} borderRadius={7} testID="first-content-3" />
											</View>
										</View>
										<View style={styles.actionsContainer}>
											<SkeletonBox width={32} height={32} borderRadius={16} testID="action-1" />
											<SkeletonBox width={32} height={32} borderRadius={16} testID="action-2" />
										</View>
									</View>
								</View>

								{/* Additional guides */}
								<View style={styles.additionalGuide}>
									<View style={styles.guideContentContainer}>
										<View style={styles.textContainer}>
											<SkeletonBox width="70%" height={14} borderRadius={7} testID="guide-title-2" />
											<View style={styles.contentLines}>
												<SkeletonBox width="90%" height={12} borderRadius={6} testID="guide-content-2-1" />
												<SkeletonBox width="80%" height={12} borderRadius={6} testID="guide-content-2-2" />
											</View>
										</View>
										<View style={styles.actionsContainer}>
											<SkeletonBox width={32} height={32} borderRadius={16} testID="action-3" />
											<SkeletonBox width={32} height={32} borderRadius={16} testID="action-4" />
										</View>
									</View>
								</View>
							</View>

							{/* Question field - exact match to PlaceGuideCard */}
							<View style={styles.questionField}>
								{/* Custom query button */}
								<View style={styles.categoryButtonWrapper}>
									<SkeletonBox width={40} height={40} borderRadius={20} testID="custom-button" />
									<SkeletonBox
										width={30}
										height={10}
										borderRadius={5}
										style={styles.categoryLabelSkeleton}
										testID="custom-label"
									/>
								</View>

								{/* Category buttons (4 buttons) */}
								{[1, 2, 3, 4].map((index) => (
									<View key={index} style={styles.categoryButtonWrapper}>
										<SkeletonBox width={40} height={40} borderRadius={20} testID={`category-button-${index}`} />
										<SkeletonBox
											width={25}
											height={10}
											borderRadius={5}
											style={styles.categoryLabelSkeleton}
											testID={`category-label-${index}`}
										/>
									</View>
								))}
							</View>
						</LinearGradient>
					</View>
				</Animated.View>
			</View>

			{/* Loading message */}
			{showLogo && (
				<View style={styles.messageContainer}>
					<Text
						variant="bodyMedium"
						style={[styles.loadingMessage, { color: isDark ? Colors.dark.onSurface : Colors.light.onSurface }]}
						testID="loading-message">
						{message}
					</Text>
				</View>
			)}

			{/* Loading indicator dots */}
			<View style={styles.dotsContainer}>
				{[0, 1, 2].map((index) => (
					<LoadingDot key={index} delay={index * 200} isDark={isDark} />
				))}
			</View>
		</View>
	);
};

/**
 * 🔴 LoadingDot Component
 *
 * Individual animated dot for the loading indicator
 */
interface LoadingDotProps {
	delay: number;
	isDark: boolean;
}

const LoadingDot: React.FC<LoadingDotProps> = ({ delay, isDark }) => {
	const scaleAnim = useRef(new Animated.Value(0.5)).current;

	useEffect(() => {
		const animate = () => {
			Animated.sequence([
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 600,
					easing: Easing.out(Easing.cubic),
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 0.5,
					duration: 600,
					easing: Easing.in(Easing.cubic),
					useNativeDriver: true,
				}),
			]).start(() => animate());
		};

		const timer = setTimeout(animate, delay);
		return () => clearTimeout(timer);
	}, [scaleAnim, delay]);

	return (
		<Animated.View
			style={[
				{
					width: 8,
					height: 8,
					borderRadius: 4,
					backgroundColor: isDark ? Colors.dark.primary : Colors.light.primary,
					marginHorizontal: 4,
					transform: [{ scale: scaleAnim }],
				},
			]}
		/>
	);
};

/**
 * 🎨 Dynamic Styles Creator
 *
 * Creates styles that exactly match PlaceScreen and PlaceGuideCard
 */
const createStyles = (isDark: boolean) =>
	StyleSheet.create({
		// PlaceScreen container
		container: {
			flex: 1,
			backgroundColor: "#fafafa", // Exact match to PlaceScreen
		},

		// PlaceScreen carouselContainer
		carouselContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			paddingBottom: 10, // Exact match
			width,
		},

		// PlaceScreen cardContainer
		cardContainer: {
			height: "100%",
			borderRadius: 12, // Exact match
			alignItems: "center",
			backgroundColor: "#fff", // Exact match
			overflow: "hidden",
			// Exact shadow match
			elevation: 4,
			shadowColor: "#000",
			shadowOpacity: 0.25,
			shadowRadius: 8,
			shadowOffset: { width: 0, height: 2 },
		},

		// GuideBaseCard imageBackground
		imageBackground: {
			flex: 1,
			width: "100%",
			justifyContent: "space-between",
		},

		imageSkeleton: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},

		// GuideBaseCard headerOverlay
		headerOverlay: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: 20, // Exact match
			paddingVertical: 12, // Exact match
			paddingTop: 24, // Exact match (iOS default)
		},

		headerContent: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			width: "100%",
		},

		// GuideBaseCard contentOverlay
		contentOverlay: {
			justifyContent: "flex-end",
			paddingHorizontal: 20, // Exact match
			paddingBottom: 24, // Exact match
			height: "40%", // Exact match
		},

		// PlaceGuideCard guidesContent
		guidesContent: {
			gap: 16, // Exact match
		},

		// GuideInteractionSection firstGuide
		firstGuide: {
			paddingVertical: 0, // First guide has no top border
		},

		// GuideInteractionSection additionalGuide
		additionalGuide: {
			paddingVertical: 12, // Exact match
			borderTopWidth: 1,
			borderTopColor: "rgba(255, 255, 255, 0.15)", // Exact match
		},

		// GuideInteractionSection contentContainer
		guideContentContainer: {
			flexDirection: "row",
			alignItems: "flex-start",
		},

		// GuideInteractionSection textContainer
		textContainer: {
			flex: 1,
			marginRight: 12, // Exact match
		},

		// GuideInteractionSection actionsContainer
		actionsContainer: {
			flexDirection: "column",
			gap: 4, // Exact match
		},

		// First guide content lines
		firstContentLines: {
			gap: 8,
			marginTop: 8, // Match firstTitle marginBottom
		},

		// Regular guide content lines
		contentLines: {
			gap: 6,
			marginTop: 6, // Match title marginBottom
		},

		// PlaceGuideCard questionField
		questionField: {
			marginTop: 16, // Exact match
			paddingTop: 16, // Exact match
			borderTopWidth: 1,
			borderTopColor: "rgba(255, 255, 255, 0.2)", // Exact match
			flexDirection: "row",
			alignItems: "flex-start",
			gap: 8, // Exact match
		},

		// PlaceGuideCard categoryButtonWrapper
		categoryButtonWrapper: {
			alignItems: "center",
			minWidth: 60, // Exact match
		},

		categoryLabelSkeleton: {
			marginTop: 4, // Exact match
		},

		// Loading message
		messageContainer: {
			position: "absolute",
			top: height / 2 - 20,
			right: 0,
			left: 0,
			justifyContent: "center",
			alignItems: "center",
			paddingVertical: 16,
		},

		loadingMessage: {
			textAlign: "center",
			fontWeight: "500",
			letterSpacing: 0.5,
		},

		// Loading dots
		dotsContainer: {
			position: "absolute",
			bottom: 20,
			right: 0,
			left: 0,
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			paddingBottom: 40,
		},
	});

export default PlaceGuideLoading;
