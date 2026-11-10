/** Bento tag the backend applies when subscribing (documented for integration; not sent from this site). */
export const BENTO_SECURITY_ADVISORY_SUBSCRIBER_TAG = 'security-updates'

/**
 * POST target for `{ email }` JSON with header `X-Turnstile-Token`.
 * Planned value once live: https://security-api.capgo.app/v1/security-subscriptions
 */
export const SECURITY_ADVISORY_SUBSCRIBE_URL = 'https://security-api.capgo.app/v1/security-subscriptions'

/** Cloudflare Turnstile site key for the advisory form (public site key, Capgo PROD widget). */
export const SECURITY_ADVISORY_TURNSTILE_SITE_KEY = '0x4AAAAAAAxItBa5rCQ3Vvhl'

const PENDING_SUBSCRIBE_URL = 'pending endpoint URL'
const PENDING_TURNSTILE_SITE_KEY = 'pending turnstile site key'

export function isSecurityAdvisorySubscribeUrlReady(url: string = SECURITY_ADVISORY_SUBSCRIBE_URL): boolean {
  const trimmed = url.trim()
  if (!trimmed || trimmed === PENDING_SUBSCRIBE_URL) return false
  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

export function isSecurityAdvisoryTurnstileSiteKeyReady(siteKey: string = SECURITY_ADVISORY_TURNSTILE_SITE_KEY): boolean {
  const trimmed = siteKey.trim()
  return !!trimmed && trimmed !== PENDING_TURNSTILE_SITE_KEY
}

/** Advisory signup UI is shown only when the backend URL and Turnstile site key are both configured. */
export function isSecurityAdvisorySubscribeFormReady(): boolean {
  return isSecurityAdvisorySubscribeUrlReady() && isSecurityAdvisoryTurnstileSiteKeyReady()
}
