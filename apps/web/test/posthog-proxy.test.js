import { afterEach, expect, test } from 'bun:test'
import { handlePostHogProxy, isPostHogProxyPath } from '../src/worker/posthog-proxy.ts'

const originalFetch = globalThis.fetch
const originalCaches = globalThis.caches

afterEach(() => {
  globalThis.fetch = originalFetch
  globalThis.caches = originalCaches
})

function captureFetch() {
  const calls = []
  globalThis.fetch = async (request) => {
    calls.push(request)
    return new Response('ok', { status: 200, headers: { 'Content-Type': 'text/plain' } })
  }
  return calls
}

test('matches only the relay prefix', () => {
  expect(isPostHogProxyPath('/cg-relay')).toBe(true)
  expect(isPostHogProxyPath('/cg-relay/e/')).toBe(true)
  expect(isPostHogProxyPath('/cg-relay-other')).toBe(false)
  expect(isPostHogProxyPath('/pricing/')).toBe(false)
})

test('static SDK files go to the EU assets host and are cached', async () => {
  const calls = captureFetch()
  const store = new Map()
  globalThis.caches = {
    default: {
      match: async (request) => store.get(request.url)?.clone(),
      put: async (request, response) => void store.set(request.url, response),
    },
  }
  const request = new Request('https://capgo.app/cg-relay/static/array.js?v=1', { headers: { cookie: 'session=secret' } })
  const response = await handlePostHogProxy(request)
  expect(response.status).toBe(200)
  expect(calls).toHaveLength(1)
  expect(calls[0].url).toBe('https://eu-assets.i.posthog.com/static/array.js?v=1')
  expect(calls[0].headers.get('cookie')).toBeNull()

  await handlePostHogProxy(new Request('https://capgo.app/cg-relay/static/array.js?v=1'))
  expect(calls).toHaveLength(1)
})

test('events go to the EU ingestion host with the body and client IP', async () => {
  const calls = captureFetch()
  const request = new Request('https://capgo.app/cg-relay/e/?ip=1', {
    method: 'POST',
    body: '{"event":"$pageview"}',
    headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '203.0.113.7', cookie: 'a=b' },
  })
  await handlePostHogProxy(request)
  expect(calls).toHaveLength(1)
  expect(calls[0].url).toBe('https://eu.i.posthog.com/e/?ip=1')
  expect(calls[0].method).toBe('POST')
  expect(calls[0].headers.get('x-forwarded-for')).toBe('203.0.113.7')
  expect(calls[0].headers.get('cookie')).toBeNull()
  expect(await calls[0].text()).toBe('{"event":"$pageview"}')
})
