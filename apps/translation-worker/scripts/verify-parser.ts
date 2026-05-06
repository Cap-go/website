import { __translationWorkerTest, TranslationCoordinator } from '../src/index'

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

const localizedMeta = __translationWorkerTest.expandShortMetaDescriptions(
  '<head><meta name="description" content="短い説明"><meta property="og:description" content="短い説明"></head>',
  'ja',
)
const localizedDescription = /name="description" content="([^"]+)"/.exec(localizedMeta)?.[1] ?? ''
const localizedOgDescription = /property="og:description" content="([^"]+)"/.exec(localizedMeta)?.[1] ?? ''
assert(localizedDescription.length >= 120, 'Localized meta description stayed too short')
assert(localizedDescription.length <= 159, 'Localized meta description exceeded the SEO limit')
assert(localizedOgDescription === localizedDescription, 'Localized Open Graph description was not expanded consistently')

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
