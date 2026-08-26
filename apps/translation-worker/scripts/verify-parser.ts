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

const staleTocTranslated = `<!doctype html>
<html lang="de">
  <head>
    <title>App-Initialisierung</title>
    <script type="application/ld+json" id="seo-schema-graph">{"headline":"App-Initialisierung","inLanguage":"de"}</script>
    <script src="https://static.cloudflareinsights.com/beacon.min.js/v-stale" type="module"></script>
    <script src="/_astro/page.old1234.js"></script>
  </head>
  <body>
    <h1>App-Initialisierung Schritt für Schritt</h1>
    <script id="capgo-edge-language-selector-hash">(() => { /* keep worker script */ })();</script>
    <script type="module">
      document.addEventListener("DOMContentLoaded",()=>{const l=()=>{const e=document.querySelectorAll("h1,h2,h3");for(const c of e){const i=c.getAttribute("id");i&&document.querySelector(\`#\${i}-link\`)?.classList.remove("text-white")}history.replaceState(null,"",window.location.hash)}});
    </script>
    <p>Übersetzter Anleitungstext bleibt erhalten.</p>
  </body>
</html>`
const currentEnglish = `<!doctype html>
<html lang="en">
  <head>
    <title>App initialization</title>
    <script type="application/ld+json" id="seo-schema-graph">{"headline":"App initialization","inLanguage":"en"}</script>
    <script src="/_astro/extra.aaa111.js"></script>
    <script src="/_astro/page.new5678.js"></script>
  </head>
  <body>
    <h1>Capacitor app initialization step by step</h1>
    <script type="module">
      document.addEventListener("DOMContentLoaded",()=>{const r=t=>document.getElementById(\`\${t}-link\`);let l=window.location.hash,i;const d=t=>{t!==l&&(i&&clearTimeout(i),i=setTimeout(()=>{history.replaceState(null,"",t)},150))}});
    </script>
    <p>Keep the English source article body out of the localized page.</p>
  </body>
</html>`
const syncedFromEnglish = __translationWorkerTest.syncExecutableScriptsFromEnglish(staleTocTranslated, currentEnglish)
assert(syncedFromEnglish.includes('App-Initialisierung Schritt für Schritt'), 'Script sync wiped translated visible copy')
assert(syncedFromEnglish.includes('Übersetzter Anleitungstext bleibt erhalten.'), 'Script sync wiped translated body copy')
assert(syncedFromEnglish.includes('"headline":"App-Initialisierung"'), 'Script sync replaced locale-specific JSON-LD')
assert(syncedFromEnglish.includes('id="capgo-edge-language-selector-hash"'), 'Script sync dropped the worker-owned language selector script')
assert(syncedFromEnglish.includes('getElementById(`${t}-link`)'), 'Script sync did not copy the current English TOC helper')
assert(syncedFromEnglish.includes('setTimeout(') && syncedFromEnglish.includes('150'), 'Script sync did not copy the current English replaceState debounce')
assert(!syncedFromEnglish.includes('querySelector(`#${i}-link`)'), 'Script sync left the stale digit-leading TOC querySelector')
assert(syncedFromEnglish.includes('src="/_astro/page.new5678.js"'), 'Script sync did not replace the stale hashed English script src')
assert(!syncedFromEnglish.includes('src="/_astro/page.old1234.js"'), 'Script sync left the stale hashed English script src')
assert(syncedFromEnglish.includes('https://static.cloudflareinsights.com/beacon.min.js/v-stale'), 'Script sync removed an unmatched third-party script from the translated page')
assert(syncedFromEnglish.includes('src="/_astro/extra.aaa111.js"'), 'Script sync dropped a newly added English script')
const syncedHead = syncedFromEnglish.slice(0, syncedFromEnglish.indexOf('</head>'))
const syncedHeadSrcs = [...syncedHead.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map((match) => match[1])
const extraHeadIndex = syncedHeadSrcs.indexOf('/_astro/extra.aaa111.js')
const pageHeadIndex = syncedHeadSrcs.indexOf('/_astro/page.new5678.js')
assert(extraHeadIndex >= 0 && pageHeadIndex === extraHeadIndex + 1, 'Script sync did not insert the new English head script immediately before page.new5678.js')
assert(
  syncedFromEnglish.includes('https://static.cloudflareinsights.com/beacon.min.js/v-stale') && syncedFromEnglish.includes('src="/_astro/extra.aaa111.js"'),
  'Script sync replaced an unmatched third-party script with a newly added English script',
)
assert(!syncedFromEnglish.includes('Keep the English source article body'), 'Script sync leaked current English visible copy')

const extraTranslatedInline = __translationWorkerTest.syncExecutableScriptsFromEnglish(
  `<!doctype html><html lang="de"><body><h1>Bleibt Deutsch</h1><script>window.staleExtra=1</script></body></html>`,
  `<!doctype html><html lang="en"><body><h1>English only</h1></body></html>`,
)
assert(extraTranslatedInline.includes('Bleibt Deutsch'), 'Extra-inline fixture wiped translated copy')
assert(extraTranslatedInline.includes('window.staleExtra=1'), 'Script sync removed an unmatched translated inline script')

const extraEnglishInline = __translationWorkerTest.syncExecutableScriptsFromEnglish(
  `<!doctype html><html lang="de"><body><h1>Bleibt Deutsch</h1></body></html>`,
  `<!doctype html><html lang="en"><body><h1>English only</h1><script>window.capgoNewInline=1</script></body></html>`,
)
assert(extraEnglishInline.includes('Bleibt Deutsch'), 'Extra English inline fixture wiped translated copy')
assert(
  extraEnglishInline.includes('window.capgoNewInline=1') && extraEnglishInline.indexOf('window.capgoNewInline=1') < extraEnglishInline.indexOf('</body>'),
  'Script sync did not insert an unmatched English inline script before </body>',
)

const extraBeforeEnglishInline = __translationWorkerTest.syncExecutableScriptsFromEnglish(
  `<!doctype html><html lang="de"><body><h1>Bleibt Deutsch</h1><script>window.staleExtra=1</script><script type="module">document.querySelector(\`#\${i}-link\`)</script></body></html>`,
  `<!doctype html><html lang="en"><body><h1>English only</h1><script type="module">document.getElementById(\`\${t}-link\`)</script></body></html>`,
)
assert(extraBeforeEnglishInline.includes('Bleibt Deutsch'), 'Preceding inline fixture wiped translated copy')
assert(extraBeforeEnglishInline.includes('window.staleExtra=1'), 'Script sync replaced an unmatched translated inline that precedes the English TOC script')
assert(extraBeforeEnglishInline.includes('getElementById(`${t}-link`)'), 'Script sync did not pair the English TOC script past a preceding unmatched inline')
assert(!extraBeforeEnglishInline.includes('querySelector(`#${i}-link`)'), 'Script sync left the stale TOC script after a preceding unmatched inline')

const sameTypeExtraBeforeEnglishInline = __translationWorkerTest.syncExecutableScriptsFromEnglish(
  `<!doctype html><html lang="de"><body><h1>Bleibt Deutsch</h1><script>window.staleExtra=1</script><script>document.querySelector(\`#\${i}-link\`)</script></body></html>`,
  `<!doctype html><html lang="en"><body><h1>English only</h1><script>document.getElementById(\`\${t}-link\`)</script></body></html>`,
)
assert(sameTypeExtraBeforeEnglishInline.includes('window.staleExtra=1'), 'Same-type leftover pairing dropped the unmatched translated inline')
assert(sameTypeExtraBeforeEnglishInline.includes('getElementById(`${t}-link`)'), 'Same-type leftover pairing did not update the matching TOC script')
assert(!sameTypeExtraBeforeEnglishInline.includes('querySelector(`#${i}-link`)'), 'Same-type leftover pairing left the stale TOC script')

const titleSegmentIndex = segments.findIndex((segment) => segment.text.includes('Capgo - Live Updates for Capacitor Apps'))
assert(titleSegmentIndex >= 0, 'Parser did not collect the title segment')
const emptyTitleTranslations = segments.map((segment, index) => (index === titleSegmentIndex ? '' : segment.text))
const renderedEmptyTitleFallback = __translationWorkerTest.renderTranslatedHtml(parts, segments, emptyTitleTranslations)
assert(
  renderedEmptyTitleFallback.includes('<title>Capgo - Live Updates for Capacitor Apps</title>'),
  'Renderer did not preserve the source title when a translated title was empty',
)

const aboutContext = __translationWorkerTest.resolveTranslationContexts(['About'])[0]
assert(typeof aboutContext === 'string' && aboutContext.includes('navigation'), 'Missing translation context for About')
const pricingContext = __translationWorkerTest.resolveTranslationContexts(['Pricing'])[0]
assert(typeof pricingContext === 'string' && pricingContext.toLowerCase().includes('pricing'), 'Missing translation context for Pricing')
const updatesContext = __translationWorkerTest.resolveTranslationContexts(['Updates'])[0]
assert(typeof updatesContext === 'string' && updatesContext.includes('updates_by_month'), 'HTML-split Updates segment did not keep parent pricing calculator context')
const supportContext = __translationWorkerTest.resolveTranslationContexts(['Support'])[0]
assert(typeof supportContext === 'string' && supportContext.includes('support') && supportContext.includes('capwesome'), 'Duplicate Support text dropped one of its contexts')
const emptySuffixContext = __translationWorkerTest.resolveTranslationContexts(['1 build hour'])[0]
assert(typeof emptySuffixContext === 'string' && emptySuffixContext.includes('native_build_builder_build_hour'), 'Empty placeholder suffix did not resolve build-hour context')
assert(__translationWorkerTest.TRANSLATION_CACHE_VERSION.includes('message-context'), 'Cache version was not bumped for message context support')
assert(__translationWorkerTest.TRANSLATION_CACHE_VERSION.includes('fr-elision'), 'Cache version was not bumped for French elision polish')
assert(__translationWorkerTest.TRANSLATION_CACHE_VERSION.includes('length-translate-no'), 'Cache version was not bumped for length + translate=no support')
assert(__translationWorkerTest.TRANSLATION_CACHE_VERSION.includes('unquoted-cjk'), 'Cache version was not bumped for unquoted attrs + CJK length support')
assert(
  __translationWorkerTest.applyFrenchArticleElision('Évitez la attente. Livrez la correction.') === 'Évitez l\u2019attente. Livrez la correction.',
  'French elision did not fix "la attente"',
)
assert(
  __translationWorkerTest.applyFrenchArticleElision('Évitez la attente de l\u2019App Store.') === 'Évitez l\u2019attente de l\u2019App Store.',
  'French elision did not fix subtitle "la attente"',
)
assert(
  __translationWorkerTest.applyFrenchArticleElision('la haute disponibilité et le héros') === 'la haute disponibilité et le héros',
  'French elision must not touch aspirate-h words',
)
assert(__translationWorkerTest.polishTranslatedText('French', 'Évitez la attente.') === 'Évitez l\u2019attente.', 'French polish path did not apply article elision')
assert(__translationWorkerTest.polishTranslatedText('Spanish', 'Évitez la attente.') === 'Évitez la attente.', 'Non-French polish path should leave text unchanged')
const heroHeadlineContext = __translationWorkerTest.resolveTranslationContexts(['Skip the wait. Ship the fix.'])[0]
assert(typeof heroHeadlineContext === 'string' && heroHeadlineContext.toLowerCase().includes('hotfix'), 'Missing marketing context override for live update hero headline')

const noTranslateHtml = `<!doctype html>
<html lang="en">
  <body>
    <h1>Live Update delivery data</h1>
    <p>Translate this chrome copy.</p>
    <tbody translate="no"><tr><td>United States</td><td title="A long failure explanation that must stay intact">Download failure (46%)</td></tr></tbody>
    <div class="notranslate"><p>Keep metrics English</p></div>
    <p>Translate the trailing chrome too.</p>
  </body>
</html>`
const noTranslateParsed = __translationWorkerTest.collectSegments(noTranslateHtml)
const noTranslateBody = noTranslateParsed.segments.filter((segment) => segment.inBody).map((segment) => segment.text)
assert(
  noTranslateBody.some((text) => text.includes('Translate this chrome copy')),
  'Parser skipped normal body copy near translate=no',
)
assert(
  noTranslateBody.some((text) => text.includes('Translate the trailing chrome too')),
  'Parser did not resume after translate=no',
)
assert(
  noTranslateBody.every((text) => !text.includes('United States') && !text.includes('Download failure') && !text.includes('Keep metrics English')),
  'Parser collected text from translate=no / notranslate regions',
)
assert(
  noTranslateParsed.parts.some((part) => typeof part === 'string' && part.includes('United States') && part.includes('Download failure (46%)')),
  'Parser did not preserve translate=no markup as raw HTML',
)
const noTranslateRaw = noTranslateParsed.parts.filter((part): part is string => typeof part === 'string').join('')
assert(
  noTranslateRaw.includes('class="notranslate"') && noTranslateRaw.includes('<p>Keep metrics English</p>') && noTranslateRaw.includes('</div>'),
  'Parser did not preserve notranslate fragment as raw HTML',
)

const skipAttrHtml = `<!doctype html><html><body><section translate="no" title="Metric region label"><p>99%</p></section></body></html>`
const skipAttrParsed = __translationWorkerTest.collectSegments(skipAttrHtml)
assert(
  !skipAttrParsed.segments.some((segment) => segment.mode === 'attribute' && segment.text.includes('Metric region label')),
  'Parser collected translatable attributes from translate=no element',
)

const unquotedSkipHtml = `<!doctype html><html><body><section translate=no class=notranslate><p>Keep KPI English</p></section><p>Translate this chrome.</p></body></html>`
const unquotedSkipParsed = __translationWorkerTest.collectSegments(unquotedSkipHtml)
const unquotedSkipBody = unquotedSkipParsed.segments.filter((segment) => segment.inBody).map((segment) => segment.text)
assert(
  unquotedSkipBody.some((text) => text.includes('Translate this chrome')),
  'Parser did not resume after unquoted translate=no',
)
assert(
  unquotedSkipBody.every((text) => !text.includes('Keep KPI English')),
  'Parser collected text from unquoted translate=no / notranslate regions',
)

assert(
  __translationWorkerTest.translationLengthViolation(
    'Deploy updates safely to every device',
    'Deploy updates safely to every device with detailed guidance for all supported environments and release channels',
  ),
  'Length guard did not flag an overlong translation',
)
assert(
  !__translationWorkerTest.translationLengthViolation('Deploy updates safely to every device', '全デバイスへ安全に配信', 'ja'),
  'Length guard flagged a valid shorter Japanese translation',
)
assert(
  !__translationWorkerTest.translationLengthViolation('Deploy updates safely to every device', '全デバイスへ安全に配信', 'Japanese'),
  'Length guard flagged a valid shorter Japanese translation for production language name',
)
assert(
  !__translationWorkerTest.translationLengthViolation('Deploy updates safely to every device', '모든 기기에 안전하게 배포', 'ko'),
  'Length guard flagged a valid shorter Korean translation',
)
assert(
  !__translationWorkerTest.translationLengthViolation('Deploy updates safely to every device', '모든 기기에 안전하게 배포', 'Korean'),
  'Length guard flagged a valid shorter Korean translation for production language name',
)

const quotedAttrFalsePositiveHtml = `<!doctype html><html><body><div data-note="translate=no"><p>Translate this paragraph.</p></div></body></html>`
const quotedAttrFalsePositiveParsed = __translationWorkerTest.collectSegments(quotedAttrFalsePositiveHtml)
assert(
  quotedAttrFalsePositiveParsed.segments.some((segment) => segment.inBody && segment.text.includes('Translate this paragraph')),
  'Parser skipped translatable text after translate=no substring inside quoted attribute value',
)

const unquotedHrefHtml = `<!doctype html><html><body><a href=/pricing/ tier>Plans</a></body></html>`
const unquotedHrefParsed = __translationWorkerTest.collectSegments(unquotedHrefHtml)
assert(
  unquotedHrefParsed.parts.some((part) => typeof part === 'string' && part.includes('href=/pricing/')),
  'Unquoted attribute scanner truncated / inside attribute values',
)

const unquotedTitleHtml = `<!doctype html><html><body><section title=Overview><p>99%</p></section></body></html>`
const unquotedTitleParsed = __translationWorkerTest.collectSegments(unquotedTitleHtml)
const unquotedTitleSegmentIndex = unquotedTitleParsed.segments.findIndex((segment) => segment.mode === 'attribute' && segment.text === 'Overview')
assert(unquotedTitleSegmentIndex >= 0, 'Parser did not collect unquoted translatable title attribute')
const unquotedTitleRendered = __translationWorkerTest.renderTranslatedHtml(
  unquotedTitleParsed.parts,
  unquotedTitleParsed.segments,
  unquotedTitleParsed.segments.map((segment, index) => (index === unquotedTitleSegmentIndex ? 'Vue d\u2019ensemble' : segment.text)),
)
assert(
  unquotedTitleRendered.includes('title="Vue d\u2019ensemble"'),
  'Rendered translation of unquoted attribute must quote values containing spaces',
)
assert(
  __translationWorkerTest.guardTranslatedBatchLengths(
    ['Deploy updates safely to every device'],
    ['Deploy updates safely to every device with detailed guidance for all supported environments and release channels'],
  )[0] === 'Deploy updates safely to every device',
  'Batch length guard did not fall back to source for overlong translation',
)
assert(
  !__translationWorkerTest.translationLengthViolation('Deploy updates safely to every device', 'Déployez les mises à jour en toute sécurité'),
  'Length guard flagged a reasonably sized translation',
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
assert(localizedLinksHtml.includes('href="/fr/docs/cli/"'), 'Link rewrite did not keep CLI docs root links')
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
  const sourceHtml = '<!doctype html><html lang="en"><head><title>Docs title</title></head><body><main><h1>Read our guides</h1><p>About</p></main></body></html>'
  let capturedAiPayload: {
    pagePath?: string
    texts?: string[]
    text?: string
    items?: Array<{ text: string; context?: string }>
  } | null = null
  const env = {
    AI: {
      run: async (_model: string, input: { messages: Array<{ content: string }> }) => {
        const lastMessage = input.messages[input.messages.length - 1]
        const payload = JSON.parse(lastMessage?.content ?? '{}') as {
          pagePath?: string
          texts?: string[]
          text?: string
          items?: Array<{ text: string; context?: string }>
        }
        capturedAiPayload = payload
        assert(Array.isArray(payload.items), 'Translation AI request did not send items[] with context support')
        assert(typeof payload.pagePath === 'string' && payload.pagePath.length > 0, 'Translation AI request missed pagePath')
        assert(!payload.texts, 'Translation AI request still used legacy texts[] payload')

        const aboutItem = payload.items.find((item) => item.text === 'About')
        if (aboutItem) {
          assert(typeof aboutItem.context === 'string' && aboutItem.context.includes('navigation'), 'About item missed translator context')
        }

        const translateText = (text: string) => {
          if (text.includes('Read our guides')) return 'Leggi le guide'
          if (text.includes('Docs title')) return 'Titolo doc'
          if (text === 'About') return 'Chi siamo'
          return 'IT ' + text
        }

        const sourceTexts = payload.items.map((item) => item.text)
        return {
          response: JSON.stringify({
            translations: sourceTexts.map((text) => translateText(text)),
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
  assert(capturedAiPayload !== null, 'Translation AI mock never received a request payload')
  assert(Array.isArray(capturedAiPayload.items), 'Queued translation did not send items[]')
  assert(capturedAiPayload.pagePath === '/it/docs/', 'Queued translation used the wrong pagePath')
  const aboutItem = capturedAiPayload.items?.find((item) => item.text === 'About')
  assert(aboutItem?.context?.includes('navigation'), 'Queued translation missed About context')

  const translatedResponse = await worker.fetch(request, env as any)
  const translatedHtml = await translatedResponse.text()

  assert(translatedResponse.status === 200, 'A completed cache-miss translation was not served successfully')
  assert(translatedResponse.headers.get('X-Capgo-Translation-Cache') === 'HIT', 'A completed cache-miss translation was not cached')
  assert(translatedHtml.includes('Leggi le guide'), 'A completed cache-miss translation did not contain the translated document')
  assert(translatedHtml.includes('Chi siamo'), 'A completed cache-miss translation did not keep context-backed About copy')

  const staleBlogUrl = new URL('https://capgo.app/de/blog/capacitor-app-initialization-step-by-step-guide/')
  const staleBlogCacheKey = __translationWorkerTest.cacheKeyFor(staleBlogUrl, 'de')
  const staleBlogHtml = `<!doctype html>
<html lang="de">
  <head>
    <title>App-Initialisierung</title>
    <script type="application/ld+json" id="seo-schema-graph">{"headline":"App-Initialisierung"}</script>
  </head>
  <body>
    <h1>App-Initialisierung Schritt für Schritt</h1>
    <script type="module">document.querySelector(\`#\${i}-link\`);history.replaceState(null,"",window.location.hash);</script>
    <p>Übersetzter Anleitungstext bleibt erhalten.</p>
  </body>
</html>`
  const currentBlogHtml = `<!doctype html>
<html lang="en">
  <head>
    <title>App initialization</title>
    <script type="application/ld+json" id="seo-schema-graph">{"headline":"App initialization"}</script>
  </head>
  <body>
    <h1>Capacitor app initialization step by step</h1>
    <script type="module">const r=t=>document.getElementById(\`\${t}-link\`);setTimeout(()=>history.replaceState(null,"",t),150);</script>
    <p>English source copy must stay off the localized response.</p>
  </body>
</html>`
  cacheEntries.set(
    staleBlogCacheKey.url,
    new Response(staleBlogHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Capgo-Translated-At': String(Date.now() - 48 * 60 * 60 * 1000),
        'X-Capgo-Translation-Source-Hash': 'b'.repeat(64),
      },
    }),
  )
  let blogOriginFetches = 0
  const blogEnv = {
    ...env,
    WEB: {
      fetch: async () => {
        blogOriginFetches += 1
        return new Response(currentBlogHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
      },
    },
    DOCS: {
      fetch: async () => {
        throw new Error('The blog request unexpectedly used the docs origin')
      },
    },
  }
  const staleBlogResponse = await worker.fetch(new Request(staleBlogUrl), blogEnv as any)
  const staleBlogBody = await staleBlogResponse.text()
  assert(staleBlogResponse.status === 200, 'A stale localized blog was not served successfully')
  assert(staleBlogResponse.headers.get('X-Capgo-Translation-Cache') === 'STALE', 'A stale localized blog did not report STALE')
  assert(staleBlogResponse.headers.get('X-Capgo-Translation-Scripts') === 'synced', 'A stale localized blog did not sync current English scripts')
  assert(staleBlogBody.includes('App-Initialisierung Schritt für Schritt'), 'Script sync on STALE wipe translated heading')
  assert(staleBlogBody.includes('Übersetzter Anleitungstext bleibt erhalten.'), 'Script sync on STALE wipe translated paragraph')
  assert(staleBlogBody.includes('"headline":"App-Initialisierung"'), 'Script sync on STALE replaced translated JSON-LD')
  assert(staleBlogBody.includes('getElementById(`${t}-link`)'), 'STALE localized blog did not receive the current English TOC helper')
  assert(staleBlogBody.includes('150'), 'STALE localized blog did not receive the current English replaceState debounce')
  assert(!staleBlogBody.includes('querySelector(`#${i}-link`)'), 'STALE localized blog kept the stale TOC querySelector')
  assert(!staleBlogBody.includes('English source copy must stay off the localized response.'), 'STALE script sync leaked current English copy')
  const staleBlogHead = await worker.fetch(new Request(staleBlogUrl, { method: 'HEAD' }), blogEnv as any)
  assert((await staleBlogHead.text()) === '', 'A HEAD stale localized blog returned a body')
  assert(staleBlogHead.headers.get('X-Capgo-Translation-Cache') === 'STALE', 'A HEAD stale localized blog lost its cache state')

  const freshBlogUrl = new URL('https://capgo.app/de/blog/fresh-hit-script-skip/')
  cacheEntries.set(
    __translationWorkerTest.cacheKeyFor(freshBlogUrl, 'de').url,
    new Response(staleBlogHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Capgo-Translated-At': String(Date.now()),
        'X-Capgo-Translation-Source-Hash': 'c'.repeat(64),
      },
    }),
  )
  cacheEntries.set(__translationWorkerTest.sourceCheckKeyFor(freshBlogUrl, 'de').url, new Response('already-checked'))
  let freshOriginFetches = 0
  const freshBlogEnv = {
    ...env,
    WEB: {
      fetch: async () => {
        freshOriginFetches += 1
        throw new Error('A fresh HIT unexpectedly fetched the English origin')
      },
    },
    DOCS: {
      fetch: async () => {
        throw new Error('A fresh HIT unexpectedly used the docs origin')
      },
    },
  }
  const freshBlogResponse = await worker.fetch(new Request(freshBlogUrl), freshBlogEnv as any)
  const freshBlogBody = await freshBlogResponse.text()
  assert(freshBlogResponse.headers.get('X-Capgo-Translation-Cache') === 'HIT', 'A fresh localized blog did not report HIT')
  assert(freshBlogResponse.headers.get('X-Capgo-Translation-Scripts') !== 'synced', 'A fresh HIT synced scripts on the response path')
  assert(freshBlogBody.includes('querySelector(`#${i}-link`)'), 'A fresh HIT should keep cached scripts inside the source-check window')
  assert(freshOriginFetches === 0, 'A fresh HIT fetched the English origin on the response path')

  const agedHitUrl = new URL('https://capgo.app/de/blog/aged-hit-script-sync/')
  cacheEntries.set(
    __translationWorkerTest.cacheKeyFor(agedHitUrl, 'de').url,
    new Response(staleBlogHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Capgo-Translated-At': String(Date.now() - 10 * 60 * 1000),
        'X-Capgo-Translation-Source-Hash': 'd'.repeat(64),
      },
    }),
  )
  const fetchesBeforeAgedHit = blogOriginFetches
  const agedHitResponse = await worker.fetch(new Request(agedHitUrl), blogEnv as any)
  const agedHitBody = await agedHitResponse.text()
  assert(agedHitResponse.headers.get('X-Capgo-Translation-Cache') === 'HIT', 'A 10-minute HIT did not report HIT')
  assert(agedHitResponse.headers.get('X-Capgo-Translation-Scripts') === 'synced', 'A 10-minute HIT with a source-hash mismatch did not sync scripts')
  assert(agedHitBody.includes('getElementById(`${t}-link`)'), 'A 10-minute HIT did not receive the current English TOC helper')
  assert(!agedHitBody.includes('querySelector(`#${i}-link`)'), 'A 10-minute HIT kept the stale TOC querySelector')
  assert(blogOriginFetches === fetchesBeforeAgedHit + 1, 'A 10-minute HIT loaded the English source more than once')
  const fetchesAfterAgedHit = blogOriginFetches
  const agedHitReuseResponse = await worker.fetch(new Request(agedHitUrl), blogEnv as any)
  assert(agedHitReuseResponse.headers.get('X-Capgo-Translation-Scripts') === 'synced', 'A repeated 10-minute HIT lost script sync')
  assert(blogOriginFetches === fetchesAfterAgedHit, 'A repeated 10-minute HIT did not reuse the cached English source')

  const jsonHitUrl = new URL('https://capgo.app/de/blog/json-hit-skip-script-sync/')
  cacheEntries.set(__translationWorkerTest.sourceCheckKeyFor(jsonHitUrl, 'de').url, new Response('already-checked'))
  cacheEntries.set(
    __translationWorkerTest.cacheKeyFor(jsonHitUrl, 'de').url,
    new Response('{"ok":true}', {
      headers: {
        'Content-Type': 'application/json',
        'X-Capgo-Translated-At': String(Date.now() - 10 * 60 * 1000),
        'X-Capgo-Translation-Source-Hash': 'e'.repeat(64),
      },
    }),
  )
  const fetchesBeforeJsonHit = blogOriginFetches
  const jsonHitResponse = await worker.fetch(new Request(jsonHitUrl), blogEnv as any)
  const jsonHitBody = await jsonHitResponse.text()
  assert(jsonHitResponse.headers.get('X-Capgo-Translation-Cache') === 'HIT', 'A cached JSON HIT did not report HIT')
  assert(jsonHitResponse.headers.get('X-Capgo-Translation-Scripts') !== 'synced', 'A cached JSON HIT entered HTML script sync')
  assert(jsonHitBody === '{"ok":true}', 'A cached JSON HIT was rewritten as HTML')
  assert(fetchesBeforeJsonHit === blogOriginFetches, 'A cached JSON HIT fetched the English origin')
  await new Promise((resolve) => setTimeout(resolve, 25))

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
