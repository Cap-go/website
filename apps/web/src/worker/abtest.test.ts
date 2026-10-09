import { describe, expect, test } from 'bun:test'
import { AB_COOKIE, AB_VERSION_KEY_HEADER, withAbTest } from './abtest'

const env = { AB_FLAG: 'website-abtest', AB_VARIANT: 'test' }
const html = () => new Response('<html><head><title>x</title></head><body></body></html>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } })

describe('withAbTest', () => {
  test('passes responses through when no experiment is configured', async () => {
    const response = html()
    expect(withAbTest(new Request('https://capgo.app/'), response, {})).toBe(response)
  })

  test('tags HTML and persists the routed version key', async () => {
    const request = new Request('https://capgo.app/pricing/', { headers: { [AB_VERSION_KEY_HEADER]: '203.0.113.7' } })
    const response = withAbTest(request, html(), env)
    expect(response.headers.get('X-Capgo-Ab-Variant')).toBe('test')
    expect(response.headers.get('Set-Cookie')).toContain(`${AB_COOKIE}=203.0.113.7;`)
    const body = await response.text()
    expect(body).toContain('<meta name="capgo-ab-flag" content="website-abtest">')
    expect(body).toContain('<meta name="capgo-ab-variant" content="test">')
  })

  test('keeps an existing affinity cookie', () => {
    const request = new Request('https://capgo.app/', { headers: { cookie: `${AB_COOKIE}=abc` } })
    expect(withAbTest(request, html(), env).headers.get('Set-Cookie')).toBeNull()
  })

  test('skips translation origin fetches and non-HTML responses', () => {
    const translation = new Request('https://capgo.app/', { headers: { 'X-Capgo-Translation-Origin': 'english' } })
    const translated = html()
    expect(withAbTest(translation, translated, env)).toBe(translated)
    const css = new Response('body{}', { headers: { 'Content-Type': 'text/css' } })
    expect(withAbTest(new Request('https://capgo.app/a.css'), css, env)).toBe(css)
  })

  test('ignores unsafe variables', () => {
    const response = html()
    expect(withAbTest(new Request('https://capgo.app/'), response, { AB_FLAG: '"><script>', AB_VARIANT: 'test' })).toBe(response)
  })
})
