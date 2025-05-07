import Constants from "expo-constants";
import { Database } from "@shared/supabase/database.types";

const extra = Constants.expoConfig?.extra ?? {};

export const Env = {
	APP_VERSION: Constants.expoConfig?.version as string,
	COMMIT_ID: extra.EXPO_PUBLIC_COMMIT_ID as string,
	NODE_ENV: extra.EXPO_PUBLIC_NODE_ENV as string,
	APP_STORE_URL: extra.EXPO_PUBLIC_APP_STORE_URL as string,
	PLAY_STORE_URL: extra.EXPO_PUBLIC_PLAY_STORE_URL as string,
	CLOUD_FUNCTION_BASE_URL: extra.EXPO_PUBLIC_CLOUD_FUNCTION_BASE_URL as string,
	SUPABASE_URL: extra.EXPO_PUBLIC_SUPABASE_URL as string,
	SUPABASE_ANON_KEY: extra.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
	DB_SCHEMA: extra.EXPO_PUBLIC_DB_SCHEMA as keyof Database,
	GCS_BUCKET_NAME: extra.EXPO_PUBLIC_GCS_BUCKET_NAME as string,
	GCS_STATIC_MASTER_DIR_PATH: extra.EXPO_PUBLIC_GCS_STATIC_MASTER_DIR_PATH as string,
	ADMOB_ANDROID_INTERSTITIAL_UNIT_ID: extra.EXPO_PUBLIC_ADMOB_ANDROID_INTERSTITIAL_UNIT_ID as string,
	ADMOB_IOS_INTERSTITIAL_UNIT_ID: extra.EXPO_PUBLIC_ADMOB_IOS_INTERSTITIAL_UNIT_ID as string,
	ADMOB_ANDROID_BANNER_UNIT_ID: extra.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_UNIT_ID as string,
	ADMOB_IOS_BANNER_UNIT_ID: extra.EXPO_PUBLIC_ADMOB_IOS_BANNER_UNIT_ID as string,
};
