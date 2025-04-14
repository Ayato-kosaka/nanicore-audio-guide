import type { SpotGuideParams, SpotGuideSerializedParams } from '@/types/navigation';

export const serializeSpotGuideParams = (params: SpotGuideParams): SpotGuideSerializedParams => ({
  ...params,
  ext_spots: JSON.stringify(params.ext_spots),
});

export const deserializeSpotGuideParams = (params: SpotGuideSerializedParams): SpotGuideParams => ({
  ...params,
  ext_spots: JSON.parse(params.ext_spots),
});
