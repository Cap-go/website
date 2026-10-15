import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { chromium, type Browser, type Page } from 'playwright'
import { startStaticServer } from '../lib/static-preview.mjs'

const origin = 'http://127.0.0.1:4377'
const consoleLogin = 'https://console.capgo.app/login'
let browser: Browser
let server: Awaited<ReturnType<typeof startStaticServer>>

beforeAll(async () => {
  server = await startStaticServer('apps/web/dist', 4377)
  browser = await chromium.launch()
})
afterAll(async () => {
  await browser?.close()
  await new Promise<void>((resolve) => server?.close(() => resolve()))
})

async function fixture(enabled = true) {
  const context = await browser.newContext()
  const events: Array<{ event: string; props: any }> = []
  const requests: Array<{ url: string; body: any }> = []
  const control = { enabled }
  await context.exposeFunction('recordSignupEvent', (event: string, props: unknown) => {
    events.push({ event, props })
  })
  await context.route('**/*', async (route) => {
    const request = route.request()
    const url = new URL(request.url())
    if (url.pathname === '/auth/apple/capabilities') return route.fulfill({ json: { web: { enabled: control.enabled, redirect_uris: [consoleLogin] } } })
    if (url.pathname === '/private/config') return route.fulfill({ json: { supaHost: 'https://website-test.supabase.co', supaKey: 'test-anon-key' } })
    if (url.origin === 'https://website-test.supabase.co') {
      requests.push({ url: url.toString(), body: request.postDataJSON() })
      if (url.pathname === '/rest/v1/rpc/is_not_deleted') return route.fulfill({ json: true })
      return route.fulfill({ status: 422, json: { code: 'weak_password', msg: 'Please choose a stronger password.' } })
    }
    if (url.origin === origin) return route.continue()
    if (url.origin === 'https://console.capgo.app')
      return route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Console fixture</title><h1>Console fixture</h1>' })
    return route.abort()
  })
  const page = await context.newPage()
  await page.goto(`${origin}/register/?ref=plugin_original&utm_source=github`, { waitUntil: 'load' })
  await page.waitForFunction(() => !(document.querySelector('button[type="submit"]') as HTMLButtonElement)?.disabled)
  await page.evaluate(() => {
    const record = (window as any).recordSignupEvent
    ;(window as any).posthog = { capture: (event: string, props: unknown) => record(event, props) }
    ;(window as any).oaiq = (_command: string, event: string, props: unknown) => record(event, props)
    ;(window as any).datafast = (event: string, props: unknown) => record(event, props)
    ;(window as any).Affonso = { signup: (props: unknown) => record('affiliate_signup', props) }
    ;(window as any).turnstile = { getResponse: () => 'test-captcha', reset: () => {} }
    for (const [name, content] of [
      ['capgo-ab-flag', 'website-hero-v2'],
      ['capgo-ab-variant', 'control'],
    ]) {
      const meta = document.createElement('meta')
      meta.name = name
      meta.content = content
      document.head.append(meta)
    }
  })
  return { context, page, events, requests, control }
}

async function openApple(page: Page) {
  await page.locator('#appleSignupButton').waitFor({ state: 'visible' })
  const opened = page.waitForEvent('popup')
  await page.locator('#appleSignupButton').click()
  const popup = await opened
  await popup.waitForURL('https://console.capgo.app/login?*')
  await popup.waitForLoadState('domcontentloaded')
  return popup
}

async function complete(popup: Page, isNew: boolean) {
  await popup.evaluate(
    ({ origin, isNew }) => {
      const state = new URL(location.href).searchParams.get('apple_website_state')
      const receipt = { type: 'capgo:apple-auth-complete', state, is_new_user: isNew, user: { id: 'verified-account', email: 'apple@example.com' } }
      opener.postMessage(receipt, origin)
      opener.postMessage(receipt, origin)
    },
    { origin, isNew },
  )
}

describe('built registration Apple entry', () => {
  test('new-account receipt reports one conversion with the original experiment and attribution', async () => {
    const { page, context, events } = await fixture()
    try {
      const popup = await openApple(page)
      const entry = new URL(popup.url())
      expect(entry.searchParams.get('signup_ref')).toBe('plugin_original')
      expect(entry.searchParams.get('first_utm_source')).toBe('github')
      expect(entry.searchParams.get('registration_experiment_variant')).toBe('control')
      expect(entry.searchParams.get('apple_website_state')).toMatch(/^[A-Za-z0-9_-]{32,128}$/)
      expect(entry.searchParams.has('access_token')).toBe(false)
      expect(entry.searchParams.has('refresh_token')).toBe(false)
      // The completion must use the exposure captured before leaving the website.
      await page.evaluate(() => {
        ;(document.querySelector('meta[name="capgo-ab-variant"]') as HTMLMetaElement).content = 'changed'
      })
      await complete(popup, true)
      await page.waitForURL(consoleLogin)
      expect(events.filter(({ event }) => event === 'user_signed_up')).toHaveLength(1)
      expect(events.find(({ event }) => event === 'user_signed_up')?.props).toMatchObject({
        signup_ref: 'plugin_original',
        '$feature/website-hero-v2': 'control',
        signup_provider: 'apple',
      })
      expect(events.filter(({ event }) => event === 'registration_completed')).toHaveLength(1)
      expect(events.filter(({ event }) => event === 'affiliate_signup')).toHaveLength(1)
      expect(events.some(({ props }) => props && ('access_token' in props || 'refresh_token' in props))).toBe(false)
    } finally {
      await context.close()
    }
  }, 30_000)

  test('returning Apple users sign in without signup or affiliate conversions', async () => {
    const { page, context, events } = await fixture()
    try {
      await complete(await openApple(page), false)
      await page.waitForURL(consoleLogin)
      expect(events.map(({ event }) => event)).toEqual(['website_apple_signin_start'])
    } finally {
      await context.close()
    }
  }, 30_000)

  test('closing/cancelling the popup restores the email and Apple actions without a conversion', async () => {
    const { page, context, events } = await fixture()
    try {
      await (await openApple(page)).close()
      await page.waitForFunction(() => !(document.querySelector('#appleSignupButton') as HTMLButtonElement).disabled)
      expect(await page.locator('#appleSignupError').innerText()).toContain('closed')
      expect(await page.locator('button[type="submit"]').isEnabled()).toBe(true)
      expect(events.map(({ event }) => event)).toEqual(['website_apple_signin_start'])
    } finally {
      await context.close()
    }
  }, 30_000)

  test('uses translated status text rendered by the edge worker', async () => {
    const { page, context } = await fixture()
    try {
      await page.evaluate(() => {
        document.querySelector('[data-apple-status="closed"]')!.textContent = 'La connexion Apple a été fermée.'
      })
      await (await openApple(page)).close()
      await page.waitForFunction(() => !(document.querySelector('#appleSignupButton') as HTMLButtonElement).disabled)
      expect(await page.locator('#appleSignupError').innerText()).toBe('La connexion Apple a été fermée.')
    } finally {
      await context.close()
    }
  }, 30_000)

  test('a revoked capability closes the popup, shows a clear error and leaves email usable', async () => {
    const { page, context, events, control } = await fixture()
    try {
      await page.locator('#appleSignupButton').waitFor({ state: 'visible' })
      control.enabled = false
      await page.locator('#appleSignupButton').click()
      await page.locator('#appleSignup').waitFor({ state: 'hidden' })
      expect(await page.locator('#appleSignupError').innerText()).toContain('unavailable')
      expect(await page.locator('button[type="submit"]').isEnabled()).toBe(true)
      expect(events).toHaveLength(0)
    } finally {
      await context.close()
    }
  }, 30_000)

  test('popup-blocked browsers use the console in the same tab without fabricating conversions', async () => {
    const { page, context, events } = await fixture()
    try {
      await page.evaluate(() => {
        window.open = () => null
      })
      await page.locator('#appleSignupButton').click()
      await page.waitForURL('https://console.capgo.app/login?*')
      expect(events.map(({ event }) => event)).toEqual(['website_apple_signin_start'])
    } finally {
      await context.close()
    }
  }, 30_000)

  test('unconfigured Apple stays hidden and the existing email registration request still works', async () => {
    const { page, context, events, requests } = await fixture(false)
    try {
      expect(await page.locator('#appleSignupButton').isVisible()).toBe(false)
      await page.locator('#email').fill('email@example.com')
      await page.locator('#firstName').fill('Email')
      await page.locator('#lastName').fill('User')
      await page.locator('#password').fill('test-password')
      await page.locator('button[type="submit"]').click()
      await page.waitForFunction(() => document.body.textContent?.includes('Please choose a stronger password.'))
      expect(requests.find(({ url }) => url.includes('/auth/v1/signup'))?.body).toMatchObject({
        email: 'email@example.com',
        password: 'test-password',
        data: { first_name: 'Email', last_name: 'User', ref: 'plugin_original' },
      })
      expect(events.some(({ event }) => event === 'website_signup_submit')).toBe(true)
      expect(events.some(({ event }) => event === 'user_signed_up')).toBe(false)
      expect(await page.locator('button[type="submit"]').isEnabled()).toBe(true)
    } finally {
      await context.close()
    }
  }, 30_000)
})
