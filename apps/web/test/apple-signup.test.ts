import { describe, expect, test } from 'bun:test'
import { APPLE_CONSOLE_LOGIN_URL, buildAppleSignupUrl, isAppleSignupAvailable, readAppleCompletion } from '../src/services/apple-signup'
import { reportAppleRegistration } from '../src/services/registration-analytics'

describe('Apple signup capability gate', () => {
  test('requires explicit backend availability and the exact supported console callback', async () => {
    for (const [body, available] of [
      [{ web: { enabled: true, redirect_uris: [APPLE_CONSOLE_LOGIN_URL] } }, true],
      [{ web: { enabled: false, redirect_uris: [APPLE_CONSOLE_LOGIN_URL] } }, false],
      [{ web: { enabled: true, redirect_uris: ['https://evil.example/login'] } }, false],
      [{ web: { enabled: true, redirect_uris: [`${APPLE_CONSOLE_LOGIN_URL}/`] } }, false],
      [{ web: { enabled: 'true', redirect_uris: [APPLE_CONSOLE_LOGIN_URL] } }, false],
      [{}, false],
      [null, false],
    ] as const) {
      const calls: Array<[string, RequestInit | undefined]> = []
      const fetcher = async (url: string | URL | Request, init?: RequestInit) => {
        calls.push([String(url), init])
        return Response.json(body)
      }
      expect(await isAppleSignupAvailable('https://api.capgo.app/', fetcher)).toBe(available)
      expect(calls[0][0]).toBe('https://api.capgo.app/auth/apple/capabilities')
      expect(calls[0][1]).toMatchObject({ credentials: 'omit', cache: 'no-store' })
    }
  })

  test('fails closed on undeployed endpoints, malformed JSON and network failures', async () => {
    for (const fetcher of [
      async () => new Response('', { status: 404 }),
      async () => new Response('', { status: 503 }),
      async () => new Response('<html>Not configured</html>'),
      async () => {
        throw new Error('network')
      },
    ])
      expect(await isAppleSignupAvailable('https://api.capgo.app', fetcher)).toBe(false)
  })
})

describe('Apple completion receipt', () => {
  const popup = {} as Window
  const state = 'random-website-state'
  const data = { type: 'capgo:apple-auth-complete', state, is_new_user: true, user: { id: 'verified-id', email: 'apple@example.com' } }
  const event = { origin: 'https://console.capgo.app', source: popup, data } as MessageEvent

  test('accepts only the console origin, retained popup and retained state', () => {
    expect(readAppleCompletion(event, popup, state)).toEqual({ is_new_user: true, user: data.user })
    for (const change of [
      { origin: 'https://console.capgo.app.evil.example' },
      { origin: 'https://capgo.app' },
      { source: {} },
      { source: null },
      { data: { ...data, state: 'wrong' } },
      { data: { ...data, type: 'other' } },
      { data: { ...data, is_new_user: 'true' } },
      { data: null },
    ])
      expect(readAppleCompletion({ ...event, ...change } as MessageEvent, popup, state)).toBeNull()
  })

  test('fires conversion only for an authoritative new account, with original attribution and experiment', () => {
    const events: Array<[string, unknown]> = []
    const analytics = {
      posthog: {
        capture: (event: string, props: unknown) => {
          events.push([event, props])
        },
      },
      oaiq: (...args: unknown[]) => {
        events.push(['oaiq', args])
      },
      datafast: (...args: unknown[]) => {
        events.push(['datafast', args])
      },
      Affonso: {
        signup: (props: unknown) => {
          events.push(['affiliate', props])
        },
      },
    }
    reportAppleRegistration(analytics, { is_new_user: false, user: data.user }, { signup_ref: 'plugin_original', '$feature/hero-test': 'control' })
    expect(events).toEqual([])
    reportAppleRegistration(analytics, { is_new_user: true, user: data.user }, { signup_ref: 'plugin_original', '$feature/hero-test': 'control' })
    expect(events.map(([event]) => event)).toEqual(['oaiq', 'datafast', 'user_signed_up', 'affiliate'])
    expect(events.find(([event]) => event === 'user_signed_up')?.[1]).toMatchObject({
      signup_confirmation: 'client',
      signup_provider: 'apple',
      signup_ref: 'plugin_original',
      '$feature/hero-test': 'control',
      email: 'apple@example.com',
    })
    expect(events.find(([event]) => event === 'affiliate')?.[1]).toMatchObject({ email: 'apple@example.com', externalUserId: 'verified-id' })
  })

  test('allows missing names and analytics integrations without interrupting sign-in', () => {
    expect(() => reportAppleRegistration({}, { is_new_user: true, user: {} }, {})).not.toThrow()
    expect(() =>
      reportAppleRegistration(
        {
          oaiq: () => {
            throw new Error('blocked')
          },
        },
        { is_new_user: true, user: {} },
        {},
      ),
    ).not.toThrow()
  })
})

describe('console-owned Apple signup entry', () => {
  test('passes signup attribution, device and experiment tags without credentials or names', () => {
    const url = new URL(
      buildAppleSignupUrl({
        signup_ref: 'plugin_capacitor-updater',
        signup_source: 'plugin_capacitor-updater',
        signup_plugin: 'capacitor-updater',
        first_touch_path: '/fr/plugins/capacitor-updater/',
        first_touch_type: 'plugin',
        first_utm_source: 'github',
        registration_device_type: 'mobile',
        registration_os: 'iOS',
        registration_browser: 'Safari',
        registration_experiment: 'website-hero-v2',
        registration_experiment_variant: 'control',
        access_token: 'secret',
        refresh_token: 'secret',
        first_name: 'Private',
        email: 'private@example.com',
        redirect_uri: 'https://evil.example/',
        user_id: 'untrusted',
      }),
    )
    expect(`${url.origin}${url.pathname}`).toBe(APPLE_CONSOLE_LOGIN_URL)
    expect(url.searchParams.get('apple_oauth')).toBe('1')
    expect(url.searchParams.get('signup_ref')).toBe('plugin_capacitor-updater')
    expect(url.searchParams.get('first_touch_path')).toBe('/fr/plugins/capacitor-updater/')
    expect(url.searchParams.get('registration_experiment_variant')).toBe('control')
    expect(url.searchParams.get('registration_browser')).toBe('Safari')
    for (const key of ['access_token', 'refresh_token', 'first_name', 'email', 'redirect_uri', 'user_id']) expect(url.searchParams.has(key)).toBe(false)
    expect(url.hash).toBe('')
  })

  test('omits empty, non-string and oversized metadata', () => {
    const url = new URL(buildAppleSignupUrl({ signup_ref: '', signup_source: ' '.repeat(10), first_utm_source: 'x'.repeat(501), registration_os: 123 } as any))
    expect([...url.searchParams]).toEqual([['apple_oauth', '1']])
  })
})
