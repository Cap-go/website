/** Bento tag the backend applies when subscribing (documented for integration; not sent from this site). */
export const BENTO_SECURITY_ADVISORY_SUBSCRIBER_TAG = 'security-updates'

/** POST target for `{ email }` JSON. pending endpoint URL until the backend owner ships the route. */
export const SECURITY_ADVISORY_SUBSCRIBE_URL = 'pending endpoint URL'

export function isSecurityAdvisorySubscribeUrlReady(
  url: string = SECURITY_ADVISORY_SUBSCRIBE_URL,
): boolean {
  const trimmed = url.trim()
  if (!trimmed || trimmed === 'pending endpoint URL') return false
  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}
