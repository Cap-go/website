import { afterEach, expect, test } from 'bun:test'
import { cachedJsonResponse } from '../src/worker/cached-json.ts'

const previousCaches = globalThis.caches

function memoryCache() {
  const store = new Map()
  return {
    store,
    match: async (request) => store.get(request.url)?.clone(),
    put: async (request, response) => {
      store.set(request.url, response.clone())
    },
  }
}

afterEach(() => {
  globalThis.caches = previousCaches
})

const request = new Request('https://capgo.app/metrics.json')

test('cachedJsonResponse stores fresh and stale copies on success', async () => {
  const cache = memoryCache()
  globalThis.caches = { default: cache }
  const response = await cachedJsonResponse(request, '/metrics.json', 300, async () => ({ value: 1 }), 'down')
  expect(response.status).toBe(200)
  expect(await response.json()).toEqual({ value: 1 })
  expect([...cache.store.keys()].sort()).toEqual(['https://capgo.app/metrics.json', 'https://capgo.app/metrics.json?stale'])
})

test('cachedJsonResponse serves the stale copy and refreshes in the background', async () => {
  const cache = memoryCache()
  cache.store.set('https://capgo.app/metrics.json?stale', new Response(JSON.stringify({ value: 'old' })))
  globalThis.caches = { default: cache }
  const pending = []
  const response = await cachedJsonResponse(request, '/metrics.json', 300, async () => ({ value: 'new' }), 'down', {
    waitUntil: (promise) => pending.push(promise),
  })
  expect(await response.json()).toEqual({ value: 'old' })
  await Promise.all(pending)
  expect(await cache.store.get('https://capgo.app/metrics.json').json()).toEqual({ value: 'new' })
})

test('cachedJsonResponse falls back to the stale copy when the load fails', async () => {
  const cache = memoryCache()
  cache.store.set('https://capgo.app/metrics.json?stale', new Response(JSON.stringify({ value: 'old' })))
  globalThis.caches = { default: cache }
  const response = await cachedJsonResponse(request, '/metrics.json', 300, async () => {
    throw new Error('boom')
  }, 'down')
  expect(response.status).toBe(200)
  expect(await response.json()).toEqual({ value: 'old' })
})

test('cachedJsonResponse returns 503 when nothing is cached and the load fails', async () => {
  globalThis.caches = { default: memoryCache() }
  const response = await cachedJsonResponse(request, '/metrics.json', 300, async () => {
    throw new Error('boom')
  }, 'down')
  expect(response.status).toBe(503)
})
