import { describe, expect, test } from 'bun:test'
import { AFFONSO_PROGRAM_ID, getAffonsoTrackingId, withAffonsoClick } from '../../../shared/affonso'

const env = { AFFONSO_API_KEY: 'sk_test' }
const navigation = { 'Sec-Fetch-Dest': 'document', 'User-Agent': 'Mozilla/5.0', 'CF-Connecting-IP': '203.0.113.9', Referer: 'https://partner.example/' }
const html = () => new Response('<html></html>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } })

function recorder(response: Response | Error) {
  const calls: { url: string; init: RequestInit }[] = []
  const fetcher = async (url: string, init: RequestInit) => {
    calls.push({ url, init })
    if (response instanceof Error) throw response
    return response.clone()
  }
  return { calls, fetcher }
}

const clickResponse = () => new Response(JSON.stringify({ success: true, data: { id: 'clk_abc123' } }), { status: 201 })

describe('getAffonsoTrackingId', () => {
  test('reads the same parameters as the Affonso pixel, in order', () => {
    expect(getAffonsoTrackingId(new URL('https://capgo.app/?ref=r&via=v'))).toBe('v')
    expect(getAffonsoTrackingId(new URL('https://capgo.app/?ref=partner'))).toBe('partner')
    expect(getAffonsoTrackingId(new URL('https://capgo.app/?affonso=a&ref=r'))).toBe('a')
    expect(getAffonsoTrackingId(new URL('https://capgo.app/'))).toBeNull()
    expect(getAffonsoTrackingId(new URL('https://capgo.app/?via=%3Cscript%3E'))).toBeNull()
  })
})

describe('withAffonsoClick', () => {
  test('records the click server-side and stores the click id for the console', async () => {
    const { calls, fetcher } = recorder(clickResponse())
    const request = new Request('https://capgo.app/pricing/?via=partner&utm_source=youtube&sub1=video', { headers: navigation })
    const response = await withAffonsoClick(request, html(), env, fetcher)

    expect(calls).toHaveLength(1)
    expect(calls[0].url).toBe('https://api.affonso.io/v1/clicks')
    expect(new Headers(calls[0].init.headers).get('Authorization')).toBe('Bearer sk_test')
    expect(JSON.parse(String(calls[0].init.body))).toEqual({
      programId: AFFONSO_PROGRAM_ID,
      trackingId: 'partner',
      referrer: 'https://partner.example/',
      userAgent: 'Mozilla/5.0',
      ip: '203.0.113.9',
      sub1: 'video',
      utmSource: 'youtube',
    })
    const cookie = response.headers.get('Set-Cookie') ?? ''
    expect(cookie).toContain('affonso_referral=clk_abc123;')
    expect(cookie).toContain('Domain=capgo.app')
    expect(cookie).toContain('Max-Age=2592000')
    expect(cookie).not.toContain('HttpOnly')
    expect(response.headers.get('Cache-Control')).toBe('private, no-store')
    expect(await response.text()).toBe('<html></html>')
  })

  test('skips crawlers, prefetches, translation-origin fetches, assets and pages without a tracking parameter', async () => {
    const { calls, fetcher } = recorder(clickResponse())
    const crawler = new Request('https://capgo.app/?via=partner', { headers: { 'User-Agent': 'Googlebot' } })
    const prefetch = new Request('https://capgo.app/?via=partner', { headers: { ...navigation, 'Sec-Purpose': 'prefetch' } })
    const plain = new Request('https://capgo.app/', { headers: navigation })
    // The translation Worker records localized clicks itself; its origin fetch must not count twice.
    const translationOrigin = new Request('https://capgo.app/?via=partner', { headers: { ...navigation, 'X-Capgo-Translation-Origin': 'english' } })
    const asset = new Request('https://capgo.app/logo.svg?via=partner', { headers: navigation })
    const svg = new Response('<svg/>', { headers: { 'Content-Type': 'image/svg+xml' } })

    for (const response of [
      await withAffonsoClick(crawler, html(), env, fetcher),
      await withAffonsoClick(prefetch, html(), env, fetcher),
      await withAffonsoClick(plain, html(), env, fetcher),
      await withAffonsoClick(translationOrigin, html(), env, fetcher),
      await withAffonsoClick(asset, svg, env, fetcher),
      await withAffonsoClick(new Request('https://capgo.app/?via=partner', { headers: navigation }), html(), {}, fetcher),
    ]) {
      expect(response.headers.get('Set-Cookie')).toBeNull()
    }
    expect(calls).toHaveLength(0)
  })

  test('serves the page unchanged when Affonso rejects or fails', async () => {
    for (const failure of [new Response('{"success":false}', { status: 404 }), new Error('timeout')]) {
      const { fetcher } = recorder(failure)
      const page = html()
      const response = await withAffonsoClick(new Request('https://capgo.app/?ref=not-an-affiliate', { headers: navigation }), page, env, fetcher)
      expect(response).toBe(page)
    }
  })

  test('keeps the cookie host-only on preview hosts', async () => {
    const { fetcher } = recorder(clickResponse())
    const request = new Request('https://web-preview.capgo.workers.dev/?via=partner', { headers: navigation })
    const response = await withAffonsoClick(request, html(), env, fetcher)
    expect(response.headers.get('Set-Cookie')).not.toContain('Domain=')
  })
})
