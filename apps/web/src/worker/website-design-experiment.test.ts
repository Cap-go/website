import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import {
  createWebsiteDesignAssignment,
  readWebsiteDesignAssignment,
  WEBSITE_DESIGN_COOKIE,
  WEBSITE_DESIGN_EXPERIMENT,
  WEBSITE_DESIGN_INTERNAL_PREFIX,
  WEBSITE_DESIGN_MAX_AGE,
  WEBSITE_DESIGN_SIGNUP_PATH,
  websiteDesignCookie,
  websiteDesignPublicUrl,
  websiteDesignRoute,
} from '../lib/websiteDesignExperiment'
import { confirmWebsiteDesignSignup, websiteDesignSignupMetadata } from '../lib/websiteDesignExperiment.client'
import { websiteDesignHtmlResponse, websiteDesignSignupResponse } from './website-design-experiment'

const oldId = '00000000-0000-4000-8000-000000000000'
const newId = '00000000-0000-4000-8000-00000000000f'
const now = Date.now()
const assignment = { visitorId: oldId, issuedAt: now, variant: 'control' as const }
const cookie = websiteDesignCookie(assignment).split(';')[0]
const request = (path = '/', extra: RequestInit = {}) => new Request(`https://capgo.app${path}`, { ...extra, headers: { 'user-agent': 'Mozilla/5.0', ...extra.headers } })
const assetPaths: string[] = []
const env = {
  WEBSITE_DESIGN_EXPERIMENT,
  ASSETS: {
    async fetch(input: RequestInfo | URL) {
      const url = new URL(input instanceof Request ? input.url : String(input))
      assetPaths.push(url.pathname)
      return new Response(`<html><head><meta name="robots" content="noindex"></head><body>${url.pathname}</body></html>`, {
        headers: { 'content-type': 'text/html', ETag: 'original', 'Cache-Control': 'public, max-age=1000' },
      })
    },
  },
}

test('structured data identifies the public URL rather than its private build path', () => {
  expect(websiteDesignPublicUrl(new URL('https://capgo.app/website-experiment/control/consulting/?preview=1'))).toBe('https://capgo.app/consulting/')
  expect(websiteDesignPublicUrl(new URL('https://capgo.app/website-experiment/control/'))).toBe('https://capgo.app/')
  expect(websiteDesignPublicUrl(new URL('https://capgo.app/native-build/'))).toBe('https://capgo.app/native-build/')
})

describe('browser exposure and signup identity', () => {
  const meta = {
    'website-design-experiment': WEBSITE_DESIGN_EXPERIMENT,
    'website-design-variant': 'control',
    'website-design-visitor': oldId,
    'website-design-issued-at': String(now),
  }
  const documentStub = (values: Record<string, string>) => ({ querySelector: (selector: string) => ({ content: values[/name="([^"]+)"/.exec(selector)?.[1] ?? ''] }) })

  test('captures one pageview per load and does not persist the exposure marker on shared pages', () => {
    const source = readFileSync(new URL('../components/posthog.astro', import.meta.url), 'utf8')
      .split('<script is:inline>')[1]
      .split('</script>')[0]
    for (const [values, hostname] of [
      [meta, 'capgo.app'],
      [{}, 'capgo.app'],
      [meta, 'development.capgo.app'],
      [{ ...meta, 'website-design-issued-at': '' }, 'capgo.app'],
      [{ ...meta, 'website-design-issued-at': 'invalid' }, 'capgo.app'],
    ] as const) {
      const registered: any[] = []
      const events: any[] = []
      const ph = {
        __loaded: true,
        register: (properties: unknown) => registered.push(properties),
        capture: (...event: unknown[]) => events.push(event),
        init: (_token: string, config: any) => {
          expect(config.capture_pageview).toBe(false)
          expect(config.advanced_disable_feature_flags).toBe(true)
          config.loaded(ph)
        },
      }
      runInNewContext(source, { document: documentStub(values), window: { posthog: ph, location: { hostname } }, posthog: ph })
      expect(events).toHaveLength(1)
      expect(events[0][0]).toBe('$pageview')
      if (values === meta && hostname === 'capgo.app') {
        expect(events[0][1].website_design_page_exposed).toBe(true)
        expect(events[0][1].website_design_issued_at).toBe(now)
        expect(events[0][1][`$feature/${WEBSITE_DESIGN_EXPERIMENT}`]).toBe('control')
        expect(registered[0].website_design_page_exposed).toBeUndefined()
      } else {
        expect(registered).toHaveLength(0)
        expect(events[0][1].website_design_page_exposed).toBeUndefined()
      }
    }
  })

  test('uses the existing PostHog identity, respects opt-out, and keeps confirmation alive across redirects', async () => {
    const previous = { window: (globalThis as any).window, document: (globalThis as any).document, fetch: globalThis.fetch }
    try {
      const ph = { get_distinct_id: () => 'existing-anonymous-id', has_opted_out_capturing: () => false }
      ;(globalThis as any).window = { posthog: ph }
      ;(globalThis as any).document = documentStub(meta)
      expect(websiteDesignSignupMetadata()).toEqual({
        website_design_experiment: WEBSITE_DESIGN_EXPERIMENT,
        website_design_variant: 'control',
        website_design_visitor_id: oldId,
        website_design_anonymous_id: 'existing-anonymous-id',
      })
      const confirmations: any[] = []
      globalThis.fetch = ((url: string, options: RequestInit) => {
        confirmations.push({ url, options })
        return Promise.resolve(new Response())
      }) as any
      confirmWebsiteDesignSignup('fake-session-token')
      expect(confirmations).toHaveLength(1)
      expect(confirmations[0].url).toBe(WEBSITE_DESIGN_SIGNUP_PATH)
      expect(confirmations[0].options.keepalive).toBe(true)
      expect(confirmations[0].options.headers.Authorization).toBe('Bearer fake-session-token')
      ph.has_opted_out_capturing = () => true
      expect(websiteDesignSignupMetadata()).toEqual({})
      confirmWebsiteDesignSignup('fake-session-token')
      expect(confirmations).toHaveLength(1)
      ;(globalThis as any).document = documentStub({})
      expect(websiteDesignSignupMetadata()).toEqual({})
      ph.has_opted_out_capturing = () => false
      ;(ph as any).get_property = (key: string) =>
        ({ website_design_experiment: WEBSITE_DESIGN_EXPERIMENT, website_design_variant: 'control', website_design_visitor_id: oldId, website_design_issued_at: now })[
          key as 'website_design_issued_at'
        ]
      expect(websiteDesignSignupMetadata().website_design_visitor_id).toBe(oldId)
      confirmWebsiteDesignSignup('fake-session-token')
      expect(confirmations).toHaveLength(2)
    } finally {
      ;(globalThis as any).window = previous.window
      ;(globalThis as any).document = previous.document
      globalThis.fetch = previous.fetch
    }
  })
})

test('a slow CAPTCHA cannot send an unverified registration request in either design', async () => {
  const source = readFileSync(new URL('../scripts/register.ts', import.meta.url), 'utf8').replace(/^import .*\n/gm, '')
  const transpiled = new Bun.Transpiler({ loader: 'ts' }).transformSync(source)
  for (const captchaEnabled of [true, false]) {
    let handler: (event: { preventDefault(): void }) => Promise<void> = async () => {}
    let registerCalls = 0
    const toasts: string[] = []
    const button = { disabled: false }
    const values: Record<string, unknown> = {
      registerForm: { querySelector: () => button, addEventListener: (_name: string, callback: typeof handler) => (handler = callback) },
      email: { value: 'test@example.com' },
      firstName: { value: 'Test' },
      lastName: { value: 'Visitor' },
      password: { value: 'test-password' },
    }
    runInNewContext(transpiled, {
      document: { getElementById: (id: string) => values[id], querySelectorAll: () => [], querySelector: () => (captchaEnabled ? {} : null) },
      getRegistrationDevice: () => ({
        registration_device_type: 'desktop',
        registration_os: 'test',
        registration_browser: 'test',
      }),
      registerUser: async () => {
        registerCalls++
        throw new Error('Stop the test before any registration IO')
      },
      getRegisterUserMessage: () => 'Registration failed',
      RegisterApiError: class RegisterApiError extends Error {},
      confirmWebsiteDesignSignup: () => {},
      Toastify: ({ text }: { text: string }) => ({ showToast: () => toasts.push(text) }),
      window: {},
      navigator: { userAgent: 'test', maxTouchPoints: 0 },
      setTimeout,
    })
    await Promise.resolve()
    expect(button.disabled).toBe(false)
    await handler({ preventDefault() {} })
    expect(registerCalls).toBe(captchaEnabled ? 0 : 1)
    if (captchaEnabled) expect(toasts).toEqual(['Security verification is not ready. Please wait a moment and try again, or refresh the page.'])
    else expect(toasts.some((text) => text.includes('Security verification'))).toBe(false)
    if (captchaEnabled) expect(button.disabled).toBe(false)
  }
})

describe('persistent equal assignment', () => {
  test('reads and preserves assignment, rejecting malformed, expired and future cookies', () => {
    expect(readWebsiteDesignAssignment(cookie, now)).toEqual(assignment)
    expect(readWebsiteDesignAssignment(`${WEBSITE_DESIGN_COOKIE}=control`, now)).toBeNull()
    expect(readWebsiteDesignAssignment(cookie, now + WEBSITE_DESIGN_MAX_AGE * 1000 + 1)).toBeNull()
    expect(readWebsiteDesignAssignment(cookie, now - 60_001)).toBeNull()
    expect(readWebsiteDesignAssignment(`${WEBSITE_DESIGN_COOKIE}=v1.${newId}.${now}`, now)?.variant).toBe('test')
    expect(websiteDesignCookie(assignment)).toContain('HttpOnly; SameSite=Lax; Secure')
  })

  test('random assignment is balanced and persisted across page navigation', async () => {
    let controls = 0
    for (let i = 0; i < 10000; i++) controls += Number(createWebsiteDesignAssignment().variant === 'control')
    expect(controls).toBeGreaterThan(4700)
    expect(controls).toBeLessThan(5300)
    for (const path of ['/', '/pricing/', '/register/']) {
      const response = await websiteDesignHtmlResponse(request(path, { headers: { cookie } }), env)
      expect(response?.headers.get('X-Website-Design-Variant')).toBe('control')
      expect(response?.headers.get('set-cookie')).toBeNull()
      expect(await response?.text()).toContain(`${WEBSITE_DESIGN_INTERNAL_PREFIX}${path}`)
    }
  })
})

describe('HTML serving and isolation', () => {
  test('new arrivals get a secure cookie and bootstrap matching their actual HTML', async () => {
    const response = await websiteDesignHtmlResponse(request(), env)
    const saved = readWebsiteDesignAssignment(response?.headers.get('set-cookie') ?? null)
    expect(saved).not.toBeNull()
    expect(response?.headers.get('Cache-Control')).toBe('private, no-store')
    expect(response?.headers.get('Vary')).toContain('Cookie')
    expect(response?.headers.has('etag')).toBe(false)
    const html = await response?.text()
    expect(html).toContain(`name="website-design-variant" content="${saved?.variant}"`)
    expect(html).toContain(`name="website-design-visitor" content="${saved?.visitorId}"`)
    expect(html).toContain('content="index, follow"')
  })

  test('same public URL serves different separately cached assets by assignment', async () => {
    const oldResponse = await websiteDesignHtmlResponse(request('/', { headers: { cookie } }), env)
    const newCookie = websiteDesignCookie({ ...assignment, visitorId: newId, variant: 'test' })
    const newResponse = await websiteDesignHtmlResponse(request('/', { headers: { cookie: newCookie } }), env)
    expect(await oldResponse?.text()).toContain(`${WEBSITE_DESIGN_INTERNAL_PREFIX}/`)
    expect(await newResponse?.text()).not.toContain(`${WEBSITE_DESIGN_INTERNAL_PREFIX}/`)
    expect(assetPaths).toContain(`${WEBSITE_DESIGN_INTERNAL_PREFIX}/`)
    expect(assetPaths).toContain('/')
  })

  test('private assets and encoded aliases cannot bypass allocation', async () => {
    for (const path of ['/website-experiment/control/', '/%77ebsite-experiment/control/', '//website-experiment/control/']) {
      const response = await websiteDesignHtmlResponse(request(path), env)
      expect(response?.status).toBe(404)
      expect(response?.headers.get('X-Robots-Tag')).toBe('noindex')
    }
  })

  test('bots, translations, unaffected pages and disabled experiment get shared current site', async () => {
    expect(await websiteDesignHtmlResponse(request('/', { headers: { 'user-agent': 'Googlebot' } }), env)).toBeNull()
    expect(await websiteDesignHtmlResponse(request('/', { headers: { 'X-Capgo-Translation-Locale': 'fr', cookie } }), env)).toBeNull()
    expect(await websiteDesignHtmlResponse(request('/', { headers: { 'X-Capgo-Translation-Origin': 'english', cookie } }), env)).toBeNull()
    expect(
      (await websiteDesignHtmlResponse(request('/', { headers: { 'X-Capgo-Translation-Origin': 'english', 'X-Capgo-Translation-Locale': 'en', cookie } }), env))?.headers.get(
        'X-Website-Design-Variant',
      ),
    ).toBe('control')
    expect(await websiteDesignHtmlResponse(request('/blog/example/'), env)).toBeNull()
    expect(await websiteDesignHtmlResponse(request(), { ...env, WEBSITE_DESIGN_EXPERIMENT: 'off' })).toBeNull()
  })

  test('canonical redirects happen before assignment and production ignores preview override', async () => {
    const redirect = await websiteDesignHtmlResponse(request('/pricing'), env)
    expect(redirect?.status).toBe(301)
    expect(redirect?.headers.has('set-cookie')).toBe(false)
    expect(websiteDesignRoute('/index.html')).toBe('/')
    const response = await websiteDesignHtmlResponse(request('/?website_variant=test', { headers: { cookie } }), env)
    expect(response?.headers.get('X-Website-Design-Variant')).toBe('control')
  })
})

describe('Supabase-confirmed signup attribution', () => {
  const user = {
    id: '00000000-0000-4000-8000-000000000001',
    created_at: new Date(now + 1).toISOString(),
    user_metadata: {
      website_design_experiment: WEBSITE_DESIGN_EXPERIMENT,
      website_design_variant: 'control',
      website_design_visitor_id: oldId,
      website_design_anonymous_id: 'existing-posthog-anonymous-id',
    },
  }
  const signupRequest = (headers: Record<string, string> = {}) =>
    request(WEBSITE_DESIGN_SIGNUP_PATH, { method: 'POST', headers: { cookie, origin: 'https://capgo.app', authorization: 'Bearer fake-test-token', ...headers } })
  const captures: any[] = []
  const mockFetcher = (account = user, authStatus = 200) =>
    (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input)
      if (url.endsWith('/private/config')) return Response.json({ supaHost: 'https://sb.capgo.app', supaKey: 'public-test-key' })
      if (url.endsWith('/auth/v1/user')) return Response.json(account, { status: authStatus })
      if (url.includes('eu.i.posthog.com')) {
        captures.push(JSON.parse(String(init?.body)))
        return Response.json({ status: 1 })
      }
      throw new Error('Unexpected fetch')
    }) as typeof fetch

  test('counts a verified new account under the same exposure ID without email or tokens', async () => {
    const response = await websiteDesignSignupResponse(signupRequest(), env, undefined, mockFetcher())
    expect(response?.status).toBe(202)
    const event = captures.at(-1)
    expect(event.event).toBe('user_signed_up')
    expect(event.distinct_id).toBe(user.user_metadata.website_design_anonymous_id)
    expect(event.properties.signup_confirmation).toBe('supabase_verified')
    expect(event.properties['$feature/website-design-v1']).toBe('control')
    expect(event.uuid).toBe(user.id)
    expect(event.properties).not.toHaveProperty('email')
    expect(JSON.stringify(event)).not.toContain('fake-test-token')
    await websiteDesignSignupResponse(signupRequest(), env, undefined, mockFetcher())
    expect(captures.at(-1).uuid).toBe(event.uuid)
    expect(captures.at(-1).properties.$insert_id).toBe(event.properties.$insert_id)
  })

  test('rejects forged cross-origin, invalid auth, prior accounts and mismatched assignments', async () => {
    const count = captures.length
    expect((await websiteDesignSignupResponse(signupRequest({ origin: 'https://attacker.example' }), env, undefined, mockFetcher()))?.status).toBe(403)
    expect((await websiteDesignSignupResponse(signupRequest(), env, undefined, mockFetcher(user, 401)))?.status).toBe(401)
    expect((await websiteDesignSignupResponse(signupRequest(), env, undefined, mockFetcher({ ...user, created_at: new Date(now - 3600_000).toISOString() })))?.status).toBe(409)
    expect(
      (await websiteDesignSignupResponse(signupRequest(), env, undefined, mockFetcher({ ...user, user_metadata: { ...user.user_metadata, website_design_visitor_id: newId } })))
        ?.status,
    ).toBe(409)
    expect(captures.length).toBe(count)
  })
})
