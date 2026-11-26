import { afterEach, beforeEach, expect, test } from 'bun:test'
import { availableXcodeVersions, BUILDER_VARIANTS_CACHE_TTL_SECONDS, normalizeBuilderVariants, readBuilderVariants } from '../src/lib/builderVariants.ts'
import { handleBuilderVariants } from '../src/worker/builder-variants.ts'

const builderPayload = {
  defaultXcodeMajor: '26',
  variants: [
    { platform: 'ios', id: 'xcode-27.1-linux', xcodeVersion: '27.1', macosVersion: null, backend: 'linux', default: false },
    { platform: 'ios', id: 'xcode-26.2-macos-26.1', xcodeVersion: '26.2', macosVersion: '26.1', backend: 'mac', default: true },
    { platform: 'ios', id: 'xcode-26.2-macos-26.2', xcodeVersion: '26.2', macosVersion: '26.2', backend: 'mac', default: true },
  ],
}

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
  const normalized = normalizeBuilderVariants({
    ...builderPayload,
    variants: [...builderPayload.variants, { id: 'bad', xcodeVersion: '26; rm -rf /', macosVersion: null, backend: 'mac' }, { id: 'x', xcodeVersion: '26', backend: 'windows' }],
  })
  expect(normalized.default_xcode_major).toBe('26')
  expect(normalized.variants.map((v) => v.id)).toEqual(['xcode-27.1-linux', 'xcode-26.2-macos-26.1', 'xcode-26.2-macos-26.2'])
  expect(normalized.variants[1]).toEqual({ id: 'xcode-26.2-macos-26.1', xcode_version: '26.2', macos_version: '26.1', backend: 'mac', default: true })
  expect(availableXcodeVersions(normalized.variants)).toEqual(['27.1', '26.2'])
  expect(normalizeBuilderVariants({ variants: 'nope' })).toBeNull()
})

test('serves the builder list cached for a day', async () => {
  const { calls, fetchImpl } = upstream(builderPayload)
  const response = await handleBuilderVariants(request(), env, undefined, fetchImpl)
  expect(response.status).toBe(200)
  expect(response.headers.get('Cache-Control')).toContain(`max-age=${BUILDER_VARIANTS_CACHE_TTL_SECONDS}`)
  expect(BUILDER_VARIANTS_CACHE_TTL_SECONDS).toBe(86400)
  expect((await response.json()).variants).toHaveLength(3)
  expect(calls).toEqual(['https://builder.example.test/variants/public'])

  // Second read within the day comes from the cache, not the builder.
  const again = await handleBuilderVariants(request(), env, undefined, fetchImpl)
  expect(again.status).toBe(200)
  expect(calls).toHaveLength(1)
})

test('the page reads back what the worker serves', async () => {
  const served = await (await handleBuilderVariants(request(), env, undefined, upstream(builderPayload).fetchImpl)).json()
  const read = readBuilderVariants(served)
  expect(read).toEqual(served)
  expect(availableXcodeVersions(read.variants)).toEqual(['27.1', '26.2'])
  expect(readBuilderVariants({ variants: [{ id: 'x', xcode_version: '26 && curl', backend: 'mac' }] }).variants).toEqual([])
  expect(readBuilderVariants(null)).toBeNull()
})

test('is unavailable when misconfigured or the builder fails', async () => {
  expect((await handleBuilderVariants(request(), {})).status).toBe(503)
  expect((await handleBuilderVariants(request(), env, undefined, upstream({}, 500).fetchImpl)).status).toBe(503)
  expect((await handleBuilderVariants(request(), env, undefined, upstream({ defaultXcodeMajor: '26', variants: [] }).fetchImpl)).status).toBe(503)
})
