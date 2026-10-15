export const APPLE_CONSOLE_LOGIN_URL = 'https://console.capgo.app/login'

export interface AppleCompletion {
  is_new_user: boolean
  user: { id?: string; email?: string }
}

export function readAppleCompletion(event: MessageEvent, popup: Window, state: string): AppleCompletion | null {
  const data = event.data
  if (
    event.origin !== new URL(APPLE_CONSOLE_LOGIN_URL).origin ||
    event.source !== popup ||
    !state ||
    !data ||
    data.type !== 'capgo:apple-auth-complete' ||
    data.state !== state ||
    typeof data.is_new_user !== 'boolean'
  )
    return null
  const user: AppleCompletion['user'] = {}
  if (typeof data.user?.id === 'string' && data.user.id.length <= 128) user.id = data.user.id
  if (typeof data.user?.email === 'string' && data.user.email.length <= 320) user.email = data.user.email
  return { is_new_user: data.is_new_user, user }
}

const METADATA_KEYS = [
  'registration_device_type',
  'registration_os',
  'registration_browser',
  'signup_ref',
  'signup_plugin',
  'signup_source',
  'first_touch_type',
  'first_touch_path',
  'first_utm_source',
  'first_utm_medium',
  'first_utm_campaign',
  'first_utm_content',
  'first_utm_term',
  'registration_variant',
  'registration_experiment',
  'registration_experiment_variant',
] as const

export async function isAppleSignupAvailable(apiBaseUrl: string, fetcher: (url: string, init?: RequestInit) => Promise<Response> = fetch): Promise<boolean> {
  try {
    const response = await fetcher(`${apiBaseUrl.replace(/\/+$/, '')}/auth/apple/capabilities`, {
      credentials: 'omit',
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) return false
    const capabilities = await response.json()
    return capabilities?.web?.enabled === true && Array.isArray(capabilities.web.redirect_uris) && capabilities.web.redirect_uris.includes(APPLE_CONSOLE_LOGIN_URL)
  } catch {
    return false
  }
}

export function buildAppleSignupUrl(metadata: Record<string, string>, websiteState?: string): string {
  const url = new URL(APPLE_CONSOLE_LOGIN_URL)
  url.searchParams.set('apple_oauth', '1')
  if (websiteState && /^[A-Za-z0-9_-]{32,128}$/.test(websiteState)) url.searchParams.set('apple_website_state', websiteState)
  for (const key of METADATA_KEYS) {
    const value = metadata[key]
    if (typeof value === 'string' && value.trim() && value.length <= 500) url.searchParams.set(key, value.trim())
  }
  return url.toString()
}
