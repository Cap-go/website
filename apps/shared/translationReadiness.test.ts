import { expect, test } from 'bun:test'
import { __translationWorkerTest } from '../translation-worker/src/index'
import {
  isReadyTranslation,
  readyTranslationLocales,
  rewriteReadyAlternates,
  storedTranslationPageKey,
  TRANSLATION_CACHE_VERSION,
  withTranslationReadiness,
} from './translationReadiness'

const url = new URL('https://capgo.app/docs/guide/')
const frenchUrl = new URL('https://capgo.app/fr/docs/guide/')
const french = {
  cacheVersion: TRANSLATION_CACHE_VERSION,
  locale: 'fr',
  status: 200,
  bodyEncoding: 'text',
  headers: [['content-type', 'text/html']],
  body: '<html lang="fr"><head><link rel="canonical" href="https://capgo.app/fr/docs/guide/" /></head><body>Guide en français</body></html>',
}

test('only successful, indexable, self-canonical translations are ready', () => {
  expect(isReadyTranslation(french, frenchUrl, 'fr')).toBe(true)
  for (const patch of [
    { status: 404 },
    { status: 301 },
    { cacheVersion: 'old' },
    { bodyEncoding: 'base64' },
    { body: french.body.replace('lang="fr"', 'lang="en"') },
    { body: french.body.replace('/fr/docs/', '/docs/') },
    { body: french.body.replace('</head>', '<meta name="robots" content="noindex,follow"></head>') },
    {
      headers: [
        ['content-type', 'text/html'],
        ['X-Robots-Tag', 'noindex'],
      ],
    },
    {
      headers: [
        ['content-type', 'text/html'],
        ['X-Capgo-Translation-Fallback', 'temporary-english-canonical'],
      ],
    },
  ])
    expect(isReadyTranslation({ ...french, ...patch }, frenchUrl, 'fr')).toBe(false)
})

test('readiness finds existing R2 pages and emits identical reciprocal HTML links', async () => {
  const key = await storedTranslationPageKey(frenchUrl.toString(), 'fr')
  expect(key).toBe(await __translationWorkerTest.translationStoreKey('pages', frenchUrl, 'fr'))
  let reads = 0
  const store = {
    get: async (candidate: string) => {
      reads++
      return candidate === key ? { text: async () => JSON.stringify(french) } : null
    },
  }
  const cached = new Map<string, Response>()
  const cache = {
    match: async (request: Request) => cached.get(request.url)?.clone(),
    put: async (request: Request, response: Response) => {
      cached.set(request.url, response)
    },
  } as Cache
  const locales = await readyTranslationLocales(store, url, cache)
  expect(locales).toEqual(['en', 'fr'])
  expect(reads).toBe(8)
  expect(await readyTranslationLocales(store, frenchUrl, cache)).toEqual(locales)
  expect(reads).toBe(8)
  const original =
    '<html><head><link href="/feed.xml" rel="alternate" type="application/rss+xml"><link rel="alternate" hreflang="ja" href="/ja/docs/guide/"></head><body>Keep this</body></html>'
  const english = rewriteReadyAlternates(original, url, locales)
  expect(english).toBe(rewriteReadyAlternates(original, frenchUrl, locales))
  expect(english).toContain('application/rss+xml')
  expect(english).not.toContain('hreflang="ja"')
  expect(english).toContain('hreflang="fr" href="https://capgo.app/fr/docs/guide/"')
  expect(english).toContain('<body>Keep this</body>')
})

test('storage failures fail closed and are not cached', async () => {
  let writes = 0
  const locales = await readyTranslationLocales(
    {
      get: async () => {
        throw new Error('R2 unavailable')
      },
    },
    url,
    {
      match: async () => undefined,
      put: async () => {
        writes++
      },
    } as unknown as Cache,
  )
  expect(locales).toEqual(['en'])
  expect(writes).toBe(0)
})

test('internal English source reads stay deterministic and do not recurse into readiness checks', async () => {
  const source = '<html><head></head><body>English source</body></html>'
  const response = await withTranslationReadiness(
    new Request(url, { headers: { 'X-Capgo-Skip-AI-Crawler-Tracking': '1' } }),
    new Response(source, { headers: { 'Content-Type': 'text/html' } }),
    {
      get: async () => {
        throw new Error('Must not read R2')
      },
    },
  )
  expect(await response.text()).toBe(source)
})

test('English response removes speculative links and stale entity headers', async () => {
  const response = await withTranslationReadiness(
    new Request(url),
    new Response('<html><head><link rel="alternate" hreflang="ja" href="/ja/docs/guide/"></head></html>', {
      headers: { 'Content-Type': 'text/html', ETag: 'old', 'Content-Length': '10' },
    }),
  )
  expect(response.headers.get('ETag')).toBeNull()
  expect(response.headers.get('Content-Length')).toBeNull()
  expect(await response.text()).not.toContain('hreflang="ja"')
})

test('canonical aliases use the canonical path and preserve private caching', async () => {
  const response = await withTranslationReadiness(
    new Request('https://capgo.app/index.html'),
    new Response('<html><head><link rel="canonical" href="https://capgo.app/"></head></html>', {
      headers: { 'Content-Type': 'text/html', 'Cache-Control': 'private, no-store', 'Content-Encoding': 'gzip' },
    }),
  )
  const html = await response.text()
  expect(html).toContain('hreflang="en" href="https://capgo.app/"')
  expect(html).not.toContain('hreflang="en" href="https://capgo.app/index.html/')
  expect(response.headers.get('Cache-Control')).toBe('private, no-store')
  expect(response.headers.get('Content-Encoding')).toBeNull()
})
