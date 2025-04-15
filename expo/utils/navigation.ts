import type { SpotGuideParams, SpotGuideSerializedParams } from '@/types/navigation';

export const serializeSpotGuideParams = (params: SpotGuideParams): SpotGuideSerializedParams => ({
  ...params,
  extSpots: JSON.stringify(params.extSpots),
});

export const deserializeSpotGuideParams = (params: SpotGuideSerializedParams): SpotGuideParams => ({
  ...params,
  extSpots: JSON.parse(params.extSpots),
});
