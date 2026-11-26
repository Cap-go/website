import { afterEach, beforeEach, expect, test } from 'bun:test'
import { BUILDER_VARIANTS_CACHE_TTL_SECONDS, normalizeBuilderVariants, readBuilderVariants } from '../src/lib/builderVariants.ts'
import { handleBuilderVariants } from '../src/worker/builder-variants.ts'

const builderPayload = { defaultXcodeMajor: '26', xcodeVersions: ['27.1', '26.2', '26.1'] }

let previousCaches
let store
beforeEach(() => {
  previousCaches = globalThis.caches
  store = new Map()
  globalThis.caches = {
    default: {
      match: async (request) => store.get(request.url)?.clone(),
      put: async (request, response) => {
        store.set(request.url, response.clone())
      },
    },
  }
})
afterEach(() => {
  globalThis.caches = previousCaches
})

function upstream(body, status = 200) {
  const calls = []
  const fetchImpl = async (url) => {
    calls.push(String(url))
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  }
  return { calls, fetchImpl }
}

const env = { BUILDER_VARIANTS_URL: 'https://builder.example.test/variants/public' }
const request = () => new Request('https://capgo.app/builder-variants.json')

test('normalizes the builder list and keeps only safe versions', () => {
  const normalized = normalizeBuilderVariants({ defaultXcodeMajor: '26', xcodeVersions: ['27.1', '26.2', '26.2', '26; rm -rf /', 26, null] })
  expect(normalized).toEqual({ default_xcode_major: '26', xcode_versions: ['27.1', '26.2'] })
  expect(normalizeBuilderVariants({ defaultXcodeMajor: 'x', xcodeVersions: [] })).toEqual({ default_xcode_major: null, xcode_versions: [] })
  expect(normalizeBuilderVariants({ xcodeVersions: 'nope' })).toBeNull()
})

test('serves the builder list cached for a day', async () => {
  const { calls, fetchImpl } = upstream(builderPayload)
  const response = await handleBuilderVariants(request(), env, undefined, fetchImpl)
  expect(response.status).toBe(200)
  expect(response.headers.get('Cache-Control')).toContain(`max-age=${BUILDER_VARIANTS_CACHE_TTL_SECONDS}`)
  expect(BUILDER_VARIANTS_CACHE_TTL_SECONDS).toBe(86400)
  expect(await response.json()).toEqual({ default_xcode_major: '26', xcode_versions: ['27.1', '26.2', '26.1'] })
  expect(calls).toEqual(['https://builder.example.test/variants/public'])

  // Second read within the day comes from the cache, not the builder.
  const again = await handleBuilderVariants(request(), env, undefined, fetchImpl)
  expect(again.status).toBe(200)
  expect(calls).toHaveLength(1)
})

test('sorts versions newest first by number', () => {
  expect(normalizeBuilderVariants({ xcodeVersions: ['9.4', '26.1', '26.10', '27', '26.2'] }).xcode_versions).toEqual(['27', '26.10', '26.2', '26.1', '9.4'])
})

test('keeps serving the last good list when a refresh fails or comes back empty', async () => {
  const good = upstream(builderPayload)
  expect((await handleBuilderVariants(request(), env, undefined, good.fetchImpl)).status).toBe(200)
  // The day is over: only the stale copy is left.
  store.delete('https://capgo.app/builder-variants.json')

  for (const failing of [upstream({}, 500), upstream({ defaultXcodeMajor: '26', xcodeVersions: [] })]) {
    const response = await handleBuilderVariants(request(), env, undefined, failing.fetchImpl)
    expect(response.status).toBe(200)
    expect((await response.json()).xcode_versions).toEqual(['27.1', '26.2', '26.1'])
    expect(failing.calls).toHaveLength(1)
  }
})

test('the page reads back what the worker serves', async () => {
  const served = await (await handleBuilderVariants(request(), env, undefined, upstream(builderPayload).fetchImpl)).json()
  expect(readBuilderVariants(served)).toEqual(served)
  expect(readBuilderVariants({ xcode_versions: ['26 && curl'] }).xcode_versions).toEqual([])
  expect(readBuilderVariants(null)).toBeNull()
})

test('is unavailable when misconfigured or the builder fails', async () => {
  expect((await handleBuilderVariants(request(), {})).status).toBe(503)
  expect((await handleBuilderVariants(request(), env, undefined, upstream({}, 500).fetchImpl)).status).toBe(503)
  expect((await handleBuilderVariants(request(), env, undefined, upstream({ defaultXcodeMajor: '26', xcodeVersions: [] }).fetchImpl)).status).toBe(503)
})
