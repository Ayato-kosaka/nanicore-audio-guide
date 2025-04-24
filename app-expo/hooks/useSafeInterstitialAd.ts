import { getAdMobInterstitialUnitId } from '@/constants/AdMob';

export function useSafeInterstitialAd() {
    const { show, isLoaded } = require('react-native-google-mobile-ads').useInterstitialAd(getAdMobInterstitialUnitId());
    return { show, isLoaded };
}
