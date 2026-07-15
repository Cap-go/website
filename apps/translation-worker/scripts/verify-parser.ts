import worker, { __translationWorkerTest, TranslationCoordinator } from '../src/index'

function assert(condition: unknown, message: string): void {
  if (!condition) throw new Error(message)
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <title>Capgo - Live Updates for Capacitor Apps</title>
    <script>
      !function(){for(var n=0;n<o.length;n++)g(o[n]);}();
    </script>
  </head>
  <body>
    <a href="#main-content">Skip to main content</a>
    <h1>Ship mobile updates instantly to every user</h1>
    <svg><svg><text>Do not collect nested SVG text</text></svg><text>Do not collect outer SVG text</text></svg>
    <p>Translate the paragraph after a nested skipped SVG.</p>
    <script>if (current < total) console.log(current)</script>
    <p>Deploy fixes and features without waiting for app store review delays.</p>
  </body>
</html>`

const { parts, segments } = __translationWorkerTest.collectSegments(html)
const bodySegments = segments.filter((segment) => segment.inBody).map((segment) => segment.text)

assert(
  bodySegments.some((text) => text.includes('Skip to main content')),
  'Parser did not collect body text after a script with a less-than operator',
)
assert(
  bodySegments.some((text) => text.includes('Ship mobile updates instantly')),
  'Parser did not collect the body heading',
)
assert(
  bodySegments.every((text) => !text.includes('Do not collect')),
  'Parser collected text from a nested skipped SVG',
)
assert(
  bodySegments.some((text) => text.includes('paragraph after a nested skipped SVG')),
  'Parser did not resume body text after a nested skipped SVG',
)
assert(
  bodySegments.some((text) => text.includes('Deploy fixes and features')),
  'Parser did not collect the body paragraph after a skipped body script',
)

const translations = segments.map((segment) => (segment.inBody ? `FR: ${segment.text}` : segment.text))
const stats = __translationWorkerTest.bodyTranslationStats(segments, translations)
assert(stats.candidateCount > 0, 'Body translation validator found no body candidates')
assert(stats.changedCount > 0, 'Body translation validator did not detect changed body text')

const rendered = __translationWorkerTest.renderTranslatedHtml(parts, segments, translations)
assert(rendered.includes('FR: Ship mobile updates instantly to every user'), 'Renderer did not write translated body text')
assert(rendered.includes('current < total'), 'Renderer changed skipped script content')

const titleSegmentIndex = segments.findIndex((segment) => segment.text.includes('Capgo - Live Updates for Capacitor Apps'))
assert(titleSegmentIndex >= 0, 'Parser did not collect the title segment')
const emptyTitleTranslations = segments.map((segment, index) => (index === titleSegmentIndex ? '' : segment.text))
const renderedEmptyTitleFallback = __translationWorkerTest.renderTranslatedHtml(parts, segments, emptyTitleTranslations)
assert(
  renderedEmptyTitleFallback.includes('<title>Capgo - Live Updates for Capacitor Apps</title>'),
  'Renderer did not preserve the source title when a translated title was empty',
)

const localizedMeta = __translationWorkerTest.expandShortMetaDescriptions(
  '<head><meta name="description" content="短い説明"><meta property="og:description" content="短い説明"></head>',
  'ja',
)
const localizedDescription = /name="description" content="([^"]+)"/.exec(localizedMeta)?.[1] ?? ''
const localizedOgDescription = /property="og:description" content="([^"]+)"/.exec(localizedMeta)?.[1] ?? ''
assert(localizedDescription.length >= 120, 'Localized meta description stayed too short')
assert(localizedDescription.length <= 159, 'Localized meta description exceeded the SEO limit')
assert(localizedOgDescription === localizedDescription, 'Localized Open Graph description was not expanded consistently')
const localizedLinksHtml = __translationWorkerTest.rewriteMetadataAndLinks(
  `<!doctype html>
<html lang="en">
  <head>
    <link rel="canonical" href="https://capgo.app/pricing" />
    <meta property="og:url" content="https://capgo.app/pricing" />
  </head>
  <body>
    <a href="/pricing">Pricing</a>
    <a href="/es/pricing/">Spanish pricing</a>
    <a href="https://capgo.app/docs/">Docs</a>
    <a href="https://capgo.app/de/docs/">German docs</a>
    <a href="//capgo.app/plugins">Plugins</a>
    <a href="support-policy">Support policy</a>
    <a href="/docs/cli/">CLI docs</a>
    <a href="/docs/cli/cloud-build/ios/">iOS build docs</a>
    <a href="/#faq">FAQ</a>
    <a href="#local">Local anchor</a>
    <a href="https://github.com/Cap-go/capgo">GitHub</a>
    <a href="mailto:hello@capgo.app">Email</a>
    <a href="/images/logo.png">Logo</a>
    <form action="/register"></form>
  </body>
</html>`,
  new URL('https://capgo.app/fr/pricing?ref=nav'),
  'fr',
)
assert(localizedLinksHtml.includes('hreflang="en" href="https://capgo.app/pricing"'), 'Link rewrite changed the English hreflang alternate')
assert(localizedLinksHtml.includes('hreflang="fr" href="https://capgo.app/fr/pricing"'), 'Link rewrite changed the French hreflang alternate')
assert(localizedLinksHtml.includes('href="/fr/pricing/"'), 'Link rewrite did not localize root-relative internal links')
assert(localizedLinksHtml.includes('href="/es/pricing/"'), 'Link rewrite changed an already localized root-relative link')
assert(localizedLinksHtml.includes('href="https://capgo.app/de/docs/"'), 'Link rewrite changed an already localized absolute same-site link')
assert(localizedLinksHtml.includes('href="https://capgo.app/fr/docs/"'), 'Link rewrite did not localize absolute same-site links')
assert(localizedLinksHtml.includes('href="//capgo.app/fr/plugins/"'), 'Link rewrite did not localize protocol-relative same-site links')
assert(localizedLinksHtml.includes('href="/fr/support-policy/"'), 'Link rewrite did not localize relative internal links')
assert(localizedLinksHtml.includes('href="/fr/docs/cli/overview/"'), 'Link rewrite did not canonicalize CLI docs links')
assert(localizedLinksHtml.includes('href="/fr/docs/builder/ios/"'), 'Link rewrite did not canonicalize legacy build docs links')
assert(localizedLinksHtml.includes('href="/fr/#faq"'), 'Link rewrite did not localize root anchor links')
assert(localizedLinksHtml.includes('href="#local"'), 'Link rewrite changed same-page anchors')
assert(localizedLinksHtml.includes('href="https://github.com/Cap-go/capgo"'), 'Link rewrite changed an external URL')
assert(localizedLinksHtml.includes('href="mailto:hello@capgo.app"'), 'Link rewrite changed a mail link')
assert(localizedLinksHtml.includes('href="/images/logo.png"'), 'Link rewrite changed an asset URL')
assert(localizedLinksHtml.includes('action="/fr/register/"'), 'Link rewrite did not localize internal form actions')

function coordinatorRequest(body: unknown, path = '/enqueue'): Request {
  return new Request(`https://translation-coordinator${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

const stored = new Map<string, unknown>()
const queued: unknown[] = []
const priorityQueued: unknown[] = []
const coordinator = new TranslationCoordinator(
  {
    storage: {
      get: async (key: string) => stored.get(key),
      put: async (key: string, value: unknown) => {
        stored.set(key, value)
      },
      delete: async (key: string) => stored.delete(key),
    },
  },
  {
    TRANSLATION_QUEUE: {
      send: async (message: unknown) => {
        queued.push(message)
      },
    },
    TRANSLATION_PRIORITY_QUEUE: {
      send: async (message: unknown) => {
        priorityQueued.push(message)
      },
    },
  } as any,
)
const queueJob = {
  url: 'https://capgo.app/fr/',
  locale: 'fr',
  cacheVersion: __translationWorkerTest.TRANSLATION_CACHE_VERSION,
  reason: 'miss',
}

let response = await coordinator.fetch(coordinatorRequest(queueJob))
assert(response.ok, 'Coordinator rejected initial queue job')
assert((await response.json()).queued === true, 'Coordinator did not enqueue the initial job')
response = await coordinator.fetch(coordinatorRequest(queueJob))
assert(response.ok, 'Coordinator rejected duplicate queue job')
assert((await response.json()).queued === false, 'Coordinator enqueued a duplicate job for the same page')
assert(queued.length === 1, 'Coordinator sent duplicate normal queue messages')

response = await coordinator.fetch(coordinatorRequest({ ...queueJob, priority: true }))
assert(response.ok, 'Coordinator rejected priority promotion')
assert((await response.json()).queued === true, 'Coordinator did not promote a pending non-priority job')
assert(priorityQueued.length === 1, 'Coordinator did not send the promoted job to the priority queue')

const sourceHash = 'a'.repeat(64)
response = await coordinator.fetch(coordinatorRequest({ ...queueJob, priority: true, sourceHash }))
assert(response.ok, 'Coordinator rejected source-specific refresh')
assert((await response.json()).queued === true, 'Coordinator dropped a source-specific refresh behind an older pending job')
assert(priorityQueued.length === 2, 'Coordinator did not queue the source-specific refresh')

response = await coordinator.fetch(coordinatorRequest(queueJob, '/complete'))
assert(response.ok, 'Coordinator rejected completion for older pending job')
assert((await response.json()).cleared === true, 'Coordinator did not accept completion for older pending job')

response = await coordinator.fetch(coordinatorRequest({ ...queueJob, priority: true, sourceHash }))
assert(response.ok, 'Coordinator rejected duplicate source-specific refresh')
assert((await response.json()).queued === false, 'Coordinator enqueued a duplicate source-specific refresh after older job completion')
assert(priorityQueued.length === 2, 'Coordinator sent duplicate source-specific refresh messages')

const originalCaches = Object.getOwnPropertyDescriptor(globalThis, 'caches')
const cacheEntries = new Map<string, Response>()
const cacheKey = (key: RequestInfo | URL): string => {
  if (typeof key === 'string') return key
  if (key instanceof URL) return key.toString()
  return key.url
}

Object.defineProperty(globalThis, 'caches', {
  configurable: true,
  value: {
    default: {
      match: async (key: RequestInfo | URL) => cacheEntries.get(cacheKey(key))?.clone(),
      put: async (key: RequestInfo | URL, response: Response) => {
        cacheEntries.set(cacheKey(key), response.clone())
      },
      delete: async (key: RequestInfo | URL) => cacheEntries.delete(cacheKey(key)),
    },
  },
})

try {
  const storedTranslations = new Map<string, string>()
  const translationJobs: Array<Record<string, unknown>> = []
  const sourceHtml = '<!doctype html><html lang="en"><head><title>Docs title</title></head><body><main><h1>Read our guides</h1></main></body></html>'
  const env = {
    AI: {
      run: async (_model: string, input: { messages: Array<{ content: string }> }) => {
        const lastMessage = input.messages[input.messages.length - 1]
        const payload = JSON.parse(lastMessage?.content ?? '{}') as { texts?: string[] }
        return {
          response: JSON.stringify({
            translations: (payload.texts ?? []).map((text) => {
              if (text.includes('Read our guides')) return 'Leggi le nostre guide'
              if (text.includes('Docs title')) return 'Titolo documentazione'
              return 'IT ' + text
            }),
          }),
        }
      },
    },
    WEB: {
      fetch: async () => {
        throw new Error('The docs request unexpectedly used the web origin')
      },
    },
    DOCS: {
      fetch: async () => new Response(sourceHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }),
    },
    TRANSLATION_QUEUE: {
      send: async (job: Record<string, unknown>) => {
        translationJobs.push(job)
      },
    },
    TRANSLATION_STORE: {
      get: async (key: string) => {
        const value = storedTranslations.get(key)
        return value === undefined ? null : { text: async () => value }
      },
      put: async (key: string, value: string) => {
        storedTranslations.set(key, value)
      },
      delete: async (key: string) => {
        storedTranslations.delete(key)
      },
    },
  }
  const request = new Request('https://capgo.app/it/docs/')
  const pendingResponse = await worker.fetch(request, env as any)

  assert(pendingResponse.status === 503, 'A translation cache miss did not return a temporary localized response')
  assert(pendingResponse.headers.get('Location') === null, 'A translation cache miss redirected visitors away from the localized URL')
  assert(pendingResponse.headers.get('Refresh') === '5', 'A translation cache miss did not schedule a localized retry')
  assert(pendingResponse.headers.get('Retry-After') === '5', 'A translation cache miss did not advertise when to retry')
  assert(pendingResponse.headers.get('X-Capgo-Translation-Cache') === 'MISS', 'A translation cache miss did not report its cache state')
  assert(pendingResponse.headers.get('X-Capgo-Translation-Fallback') === 'temporary-english-retry', 'A translation cache miss did not report the retry fallback')
  assert((await pendingResponse.text()).includes('Read our guides'), 'A translation cache miss did not keep the source document available while it is translated')
  assert(translationJobs.length === 1, 'A translation cache miss did not enqueue the localized document')
  assert(translationJobs[0]?.url === 'https://capgo.app/it/docs/', 'The cache-miss job lost the localized URL')
  assert(translationJobs[0]?.locale === 'it', 'The cache-miss job lost the requested locale')
  assert(translationJobs[0]?.reason === 'miss', 'The cache-miss job did not identify the cache-miss reason')

  const pendingHeadResponse = await worker.fetch(new Request(request.url, { method: 'HEAD' }), env as any)
  assert(pendingHeadResponse.status === 503, 'A HEAD translation cache miss did not match the GET temporary response')
  assert(pendingHeadResponse.headers.get('Location') === null, 'A HEAD translation cache miss redirected visitors away from the localized URL')
  assert(pendingHeadResponse.headers.get('Refresh') === '5', 'A HEAD translation cache miss did not schedule a localized retry')
  assert((await pendingHeadResponse.text()) === '', 'A HEAD translation cache miss returned a response body')
  assert(translationJobs.length === 1, 'A HEAD translation cache miss enqueued a duplicate localized document')

  await worker.queue({ messages: [{ body: translationJobs[0] as any }] }, env as any)
  const translatedResponse = await worker.fetch(request, env as any)

  assert(translatedResponse.status === 200, 'A completed cache-miss translation was not served successfully')
  assert(translatedResponse.headers.get('X-Capgo-Translation-Cache') === 'HIT', 'A completed cache-miss translation was not cached')
  assert((await translatedResponse.text()).includes('Leggi le nostre guide'), 'A completed cache-miss translation did not contain the translated document')

  const originalConsoleError = console.error
  let enqueueFailureResponse: Response | null = null
  try {
    console.error = () => undefined
    enqueueFailureResponse = await worker.fetch(new Request('https://capgo.app/fr/docs/'), {
      ...env,
      TRANSLATION_QUEUE: {
        send: async () => {
          throw new Error('Expected queue failure')
        },
      },
    } as any)
  } finally {
    console.error = originalConsoleError
  }
  if (!enqueueFailureResponse) throw new Error('A queue failure did not return a response')
  assert(enqueueFailureResponse.status === 302, 'A failed translation enqueue did not use the safe English fallback')
  assert(enqueueFailureResponse.headers.get('Location') === '/docs/', 'A failed translation enqueue redirected to the wrong English document')
  assert(enqueueFailureResponse.headers.get('X-Capgo-Translation-Fallback') === 'temporary-english-redirect', 'A failed translation enqueue kept retrying without a queued job')
} finally {
  if (originalCaches) {
    Object.defineProperty(globalThis, 'caches', originalCaches)
  } else {
    delete (globalThis as { caches?: unknown }).caches
  }
}
