
/**
 * Prebid.js & GAM bootstrap placeholders.
 * In production, load a pruned Prebid bundle and set bidders below.
 */
export const PREBID_TIMEOUT = Number(process.env.PREBID_TIMEOUT_MS || 1000)
export const BIDDERS = (process.env.PREBID_BIDDERS_JSON ? JSON.parse(process.env.PREBID_BIDDERS_JSON) : [
  'appnexus','pubmatic','openx','indexExchange','triplelift','magnite','criteo'
])
export const GAM_NETWORK_CODE = process.env.GAM_NETWORK_CODE || ''
export const GAM_AD_UNIT_BASE = process.env.GAM_AD_UNIT_BASE || '/YOUR_NETWORK/anaptiras'
