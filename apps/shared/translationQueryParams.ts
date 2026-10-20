/** Query keys ignored when building translation cache keys (tracking must not bust locale cache). */
export const IGNORED_TRANSLATION_QUERY_KEYS = new Set([
  '_branch_match_id',
  '_branch_referrer',
  '_gl',
  '_hsenc',
  '_hsmi',
  'fbclid',
  'first_touch_path',
  'first_touch_type',
  'gad_source',
  'gbraid',
  'gclid',
  'igshid',
  'mc_cid',
  'mc_eid',
  'msclkid',
  'ref',
  'ref_src',
  'session',
  'session_id',
  'sessionid',
  'signup_source',
  'twclid',
  'wbraid',
  'yclid',
])

export function shouldIgnoreTranslationQueryParam(name: string): boolean {
  const normalizedName = name.toLowerCase()
  return normalizedName.startsWith('utm_') || IGNORED_TRANSLATION_QUERY_KEYS.has(normalizedName)
}
