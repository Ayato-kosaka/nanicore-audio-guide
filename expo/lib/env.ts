import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export const env = {
  HELLO_ENV: extra.HELLO_ENV as string,
};