import { expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

test('a slow CAPTCHA cannot send an unverified registration request', async () => {
  const source = readFileSync(new URL('./register.ts', import.meta.url), 'utf8').replace(/^import .*\n/gm, '')
  const transpiled = new Bun.Transpiler({ loader: 'ts' }).transformSync(source)
  for (const captchaEnabled of [true, false]) {
    let handler: (event: { preventDefault(): void }) => Promise<void> = async () => {}
    let authCalls = 0
    const toasts: string[] = []
    const button = { disabled: false }
    const values: Record<string, unknown> = {
      registerForm: { querySelector: () => button, addEventListener: (_name: string, callback: typeof handler) => (handler = callback) },
      email: { value: 'test@example.com' },
      password: { value: 'test-password', setAttribute() {}, removeAttribute() {}, focus() {} },
    }
    runInNewContext(transpiled, {
      document: { getElementById: (id: string) => values[id], querySelectorAll: () => [], querySelector: () => (captchaEnabled ? {} : null) },
      registerUser: async () => {
        authCalls++
        throw new Error('Stop the test before any auth IO')
      },
      RegisterApiError: Error,
      getPasswordRequirementErrors: () => [],
      formatPasswordRequirementErrors: () => '',
      getSignupUserMetadataForRegistration: () => ({}),
      getSignupAttributionForEvents: () => ({}),
      getRegistrationDevice: () => ({}),
      Toastify: ({ text }: { text: string }) => ({ showToast: () => toasts.push(text) }),
      window: { location: { search: '' } },
      navigator: {},
      URLSearchParams,
      setTimeout,
    })
    await Promise.resolve()
    expect(button.disabled).toBe(false)
    await handler({ preventDefault() {} })
    expect(authCalls).toBe(captchaEnabled ? 0 : 1)
    if (captchaEnabled) expect(toasts).toEqual(['Security verification is not ready. Please wait a moment and try again, or refresh the page.'])
    else expect(toasts.some((text) => text.includes('Security verification'))).toBe(false)
    if (captchaEnabled) expect(button.disabled).toBe(false)
  }
})

test('registration without profile names preserves referral attribution and the console handoff', async () => {
  const source = readFileSync(new URL('./register.ts', import.meta.url), 'utf8').replace(/^import .*\n/gm, '')
  let handler: (event: { preventDefault(): void }) => Promise<void> = async () => {}
  const button = { disabled: false }
  const values: Record<string, unknown> = {
    registerForm: { querySelector: () => button, addEventListener: (_name: string, callback: typeof handler) => (handler = callback) },
    email: { value: 'signup@example.com' },
    password: { value: 'test-password', setAttribute() {}, removeAttribute() {}, focus() {} },
  }
  const signupRequests: any[] = []
  const captures: any[] = []
  const referrals: any[] = []
  const adsConversions: unknown[] = []
  const windowStub = {
    location: { href: '', search: '?ref=initial-example' },
    posthog: { capture: (event: string, properties?: unknown) => captures.push({ event, properties }) },
    oaiq: (...args: unknown[]) => adsConversions.push(args),
    Affonso: { signup: (properties: unknown) => referrals.push(properties) },
  }
  runInNewContext(new Bun.Transpiler({ loader: 'ts' }).transformSync(source), {
    document: { getElementById: (id: string) => values[id], querySelector: () => null },
    getSignupUserMetadataForRegistration: () => ({
      ref: new URLSearchParams(windowStub.location.search).get('ref'),
      first_touch_type: 'plugin',
      first_touch_path: '/plugins/example/',
      signup_source: 'plugin_example',
      offer: 'direct',
    }),
    getSignupAttributionForEvents: () => ({ signup_source: 'plugin_example', signup_offer: 'direct' }),
    getRegistrationDevice: () => ({ registration_device_type: 'desktop' }),
    registerUser: async (request: unknown) => {
      signupRequests.push(request)
      return { user: { id: 'fake-user-id' }, session: { access_token: 'fake-access', refresh_token: 'fake-refresh' } }
    },
    RegisterApiError: Error,
    getPasswordRequirementErrors: () => [],
    formatPasswordRequirementErrors: () => '',
    window: windowStub,
    navigator: { userAgent: 'test', maxTouchPoints: 0 },
    URLSearchParams,
    URL,
    crypto,
    TextEncoder,
    setTimeout: (callback: () => void) => callback(),
  })
  await Promise.resolve()
  windowStub.location.search = '?ref=readme-example'
  await handler({ preventDefault() {} })
  expect(signupRequests).toEqual([
    {
      email: 'signup@example.com',
      password: 'test-password',
      captcha_token: undefined,
      registration_device_type: 'desktop',
      ref: 'readme-example',
      first_touch_type: 'plugin',
      first_touch_path: '/plugins/example/',
      signup_source: 'plugin_example',
      offer: 'direct',
    },
  ])
  expect(captures.map(({ event }) => event)).toEqual(['website_signup_submit', 'user_signed_up'])
  const sha256Hex = async (value: string) => {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
  }
  const hashedId = await sha256Hex('fake-user-id')
  expect(adsConversions).toEqual([
    ['init', { user: { email_sha256: await sha256Hex('signup@example.com'), external_id_sha256: hashedId } }],
    ['measure', 'registration_completed', { type: 'customer_action' }, { event_id: `registration_${hashedId}` }],
  ])
  expect(captures[1].properties.signup_source).toBe('plugin_example')
  expect(captures[1].properties.signup_offer).toBe('direct')
  expect(referrals).toEqual([{ email: 'signup@example.com', externalUserId: 'fake-user-id' }])
  const redirect = new URL(windowStub.location.href)
  expect(redirect.origin).toBe('https://console.capgo.app')
  expect(redirect.searchParams.get('access_token')).toBe('fake-access')
  expect(redirect.searchParams.get('refresh_token')).toBe('fake-refresh')
  expect(redirect.searchParams.get('to')).toBe('/app')
})

test('a failed API request restores signup for retry without reporting success', async () => {
  const source = readFileSync(new URL('./register.ts', import.meta.url), 'utf8').replace(/^import .*\n/gm, '')
  let handler: (event: { preventDefault(): void }) => Promise<void> = async () => {}
  const button = { disabled: false }
  const captures: string[] = []
  let resets = 0
  let calls = 0
  const windowStub = {
    location: { href: '', search: '' },
    turnstile: { getResponse: () => 'captcha', reset: () => resets++ },
    posthog: { capture: (event: string) => captures.push(event) },
  }
  const values: Record<string, unknown> = {
    registerForm: { querySelector: () => button, addEventListener: (_name: string, callback: typeof handler) => (handler = callback) },
    email: { value: 'signup@example.com' },
    password: { value: 'Password123!', setAttribute() {}, removeAttribute() {}, focus() {} },
  }
  runInNewContext(new Bun.Transpiler({ loader: 'ts' }).transformSync(source), {
    document: { getElementById: (id: string) => values[id], querySelector: () => ({}) },
    registerUser: async () => {
      calls++
      throw new TypeError('Network unavailable')
    },
    RegisterApiError: class extends Error {},
    getPasswordRequirementErrors: () => [],
    formatPasswordRequirementErrors: () => '',
    getSignupUserMetadataForRegistration: () => ({}),
    getSignupAttributionForEvents: () => ({}),
    getRegistrationDevice: () => ({}),
    Toastify: () => ({ showToast() {} }),
    window: windowStub,
    navigator: {},
    URLSearchParams,
  })
  await handler({ preventDefault() {} })
  expect(button.disabled).toBe(false)
  expect(resets).toBe(1)
  expect(windowStub.location.href).toBe('')
  expect(captures).toEqual(['website_signup_submit', 'website_signup_error'])
  await handler({ preventDefault() {} })
  expect(calls).toBe(2)
})
