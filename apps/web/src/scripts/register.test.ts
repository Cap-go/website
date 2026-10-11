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
      password: { value: 'test-password' },
    }
    runInNewContext(transpiled, {
      document: { getElementById: (id: string) => values[id], querySelectorAll: () => [], querySelector: () => (captchaEnabled ? {} : null) },
      getRemoteConfig: () => Promise.resolve({}),
      isSupabaseConfigured: () => true,
      useSupabase: () => {
        authCalls++
        throw new Error('Stop the test before any auth IO')
      },
      Toastify: ({ text }: { text: string }) => ({ showToast: () => toasts.push(text) }),
      window: {},
      navigator: {},
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
    password: { value: 'test-password' },
  }
  const signupRequests: any[] = []
  const captures: any[] = []
  const referrals: any[] = []
  const windowStub = {
    location: { href: '', search: '?ref=initial-example' },
    posthog: { capture: (event: string, properties?: unknown) => captures.push({ event, properties }) },
    Affonso: { signup: (properties: unknown) => referrals.push(properties) },
  }
  runInNewContext(new Bun.Transpiler({ loader: 'ts' }).transformSync(source), {
    document: { getElementById: (id: string) => values[id], querySelector: () => null },
    getRemoteConfig: () => Promise.resolve({}),
    isSupabaseConfigured: () => true,
    getRegistrationDevice: () => ({ registration_device_type: 'desktop' }),
    useSupabase: () => ({
      rpc: async () => ({ data: true, error: null }),
      auth: {
        signUp: async (request: unknown) => {
          signupRequests.push(request)
          return { data: { user: { id: 'fake-user-id' } }, error: null }
        },
        getSession: async () => ({ data: { session: { access_token: 'fake-access', refresh_token: 'fake-refresh' } }, error: null }),
      },
    }),
    window: windowStub,
    navigator: { userAgent: 'test', maxTouchPoints: 0 },
    URLSearchParams,
    setTimeout: (callback: () => void) => callback(),
  })
  await Promise.resolve()
  windowStub.location.search = '?ref=readme-example'
  await handler({ preventDefault() {} })
  expect(signupRequests).toEqual([
    {
      email: 'signup@example.com',
      password: 'test-password',
      options: { captchaToken: undefined, data: { registration_device_type: 'desktop', ref: 'readme-example' } },
    },
  ])
  expect(captures.map(({ event }) => event)).toEqual(['website_signup_submit', 'user_signed_up'])
  expect(referrals).toEqual([{ email: 'signup@example.com', externalUserId: 'fake-user-id' }])
  expect(windowStub.location.href).toBe('https://console.capgo.app/login/?access_token=fake-access&refresh_token=fake-refresh&to=/app')
})
