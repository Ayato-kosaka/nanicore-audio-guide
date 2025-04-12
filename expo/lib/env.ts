import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export const env = {
  APP_VERSION: Constants.expoConfig?.version as string,
  COMMIT_ID: extra.EXPO_PUBLIC_COMMIT_ID as string,
  NODE_ENV: extra.EXPO_PUBLIC_NODE_ENV as string,
  SUPABASE_URL: extra.EXPO_PUBLIC_SUPABASE_URL as string,
  SUPABASE_ANON_KEY: extra.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
  DB_SCHEMA: extra.EXPO_PUBLIC_DB_SCHEMA as string,
};