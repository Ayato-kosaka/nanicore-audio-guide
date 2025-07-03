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
	height: number;
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
 * A modern, polished loading UI component for PlaceGuide screens that provides:
 * - Skeleton loading patterns with shimmer animations
 * - Responsive design that adapts to different screen sizes
 * - Accessibility support with proper ARIA labels
 * - Dark/light theme support
 * - Smooth animations using React Native's Animated API
 * - TypeScript support with comprehensive prop types
 *
 * @param props - Component props
 * @returns JSX.Element - The rendered loading component
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
	const pulseAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		// Entrance animation
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

		// Continuous pulse animation for logo
		const pulse = () => {
			Animated.sequence([
				Animated.timing(pulseAnim, {
					toValue: 1.05,
					duration: 1000,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
				Animated.timing(pulseAnim, {
					toValue: 1,
					duration: 1000,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
			]).start(() => pulse());
		};

		if (showLogo) {
			pulse();
		}
	}, [fadeAnim, scaleAnim, pulseAnim, showLogo]);

	const styles = createStyles(isDark);

	return (
		<Animated.View
			style={[
				styles.container,
				{
					opacity: fadeAnim,
					transform: [{ scale: scaleAnim }],
				},
			]}
			testID={testID}
			accessibilityRole="progressbar"
			accessibilityLabel={message}
			accessibilityHint="Loading place guide content">
			{/* Background Gradient */}
			<LinearGradient
				colors={
					isDark ? [Colors.dark.background, Colors.dark.surface] : [Colors.light.background, Colors.light.surface]
				}
				style={StyleSheet.absoluteFill}
			/>

			{/* Main Content Container */}
			<View style={styles.contentContainer}>
				{/* Logo/Brand Section */}
				{showLogo && (
					<Animated.View
						style={[
							styles.logoContainer,
							{
								transform: [{ scale: pulseAnim }],
							},
						]}
						testID="loading-logo">
						<View style={styles.logoPlaceholder}>
							<Text style={styles.logoText}>🗺️</Text>
						</View>
					</Animated.View>
				)}

				{/* Loading Message */}
				<View style={styles.messageContainer}>
					<Text
						variant="titleMedium"
						style={[styles.loadingMessage, { color: isDark ? Colors.dark.onSurface : Colors.light.onSurface }]}
						testID="loading-message">
						{message}
					</Text>
				</View>

				{/* Skeleton Content */}
				<View style={styles.skeletonContainer}>
					{/* Header Skeleton */}
					<View style={styles.headerSkeleton}>
						<SkeletonBox width="60%" height={24} borderRadius={12} testID="header-skeleton" />
						<SkeletonBox
							width={40}
							height={40}
							borderRadius={20}
							style={styles.avatarSkeleton}
							testID="avatar-skeleton"
						/>
					</View>

					{/* Image Skeleton */}
					<SkeletonBox
						width="100%"
						height={200}
						borderRadius={16}
						style={styles.imageSkeleton}
						testID="image-skeleton"
					/>

					{/* Content Skeleton */}
					<View style={styles.contentSkeleton}>
						<SkeletonBox width="80%" height={20} borderRadius={10} testID="content-line-1" />
						<SkeletonBox width="65%" height={20} borderRadius={10} style={styles.contentLine} testID="content-line-2" />
						<SkeletonBox width="90%" height={20} borderRadius={10} style={styles.contentLine} testID="content-line-3" />
					</View>

					{/* Action Buttons Skeleton */}
					<View style={styles.actionsSkeleton}>
						<SkeletonBox width={80} height={40} borderRadius={20} testID="action-button-1" />
						<SkeletonBox width={80} height={40} borderRadius={20} testID="action-button-2" />
						<SkeletonBox width={80} height={40} borderRadius={20} testID="action-button-3" />
					</View>
				</View>
			</View>

			{/* Loading Indicator Dots */}
			<View style={styles.dotsContainer}>
				{[0, 1, 2].map((index) => (
					<LoadingDot key={index} delay={index * 200} isDark={isDark} />
				))}
			</View>
		</Animated.View>
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
 * Creates styles based on the current theme
 */
const createStyles = (isDark: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
		},
		contentContainer: {
			flex: 1,
			paddingHorizontal: 24,
			paddingTop: 60,
			paddingBottom: 40,
		},
		logoContainer: {
			alignItems: "center",
			marginBottom: 32,
		},
		logoPlaceholder: {
			width: 80,
			height: 80,
			borderRadius: 40,
			backgroundColor: isDark ? Colors.dark.primaryContainer : Colors.light.primaryContainer,
			justifyContent: "center",
			alignItems: "center",
			elevation: 8,
			shadowColor: "#000",
			shadowOpacity: 0.15,
			shadowRadius: 12,
			shadowOffset: { width: 0, height: 4 },
		},
		logoText: {
			fontSize: 32,
		},
		messageContainer: {
			alignItems: "center",
			marginBottom: 40,
		},
		loadingMessage: {
			textAlign: "center",
			fontWeight: "600",
			letterSpacing: 0.5,
		},
		skeletonContainer: {
			flex: 1,
			gap: 24,
		},
		headerSkeleton: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		avatarSkeleton: {
			marginLeft: 16,
		},
		imageSkeleton: {
			marginVertical: 8,
		},
		contentSkeleton: {
			gap: 12,
		},
		contentLine: {
			marginTop: 8,
		},
		actionsSkeleton: {
			flexDirection: "row",
			justifyContent: "space-around",
			marginTop: 16,
		},
		dotsContainer: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			paddingBottom: 40,
		},
	});

export default PlaceGuideLoading;
