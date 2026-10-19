import { expect, test } from 'bun:test'
import { resolveLegacyPathRedirect } from '../../shared/legacyPathRedirects.ts'
import { NON_DEFAULT_LOCALE_CODES } from '../../shared/localizedLegacyPathRedirect.ts'
import { staticLegacyRedirect } from '../src/worker/index.ts'

function staticLegacyRedirectLocation(url) {
  const request = new Request(url)
  const pathname = new URL(url).pathname
  const response = staticLegacyRedirect(request, pathname)
  if (!response) return null
  expect(response.status).toBe(301)
  return new URL(response.headers.get('Location')).pathname
}

const COMPETITOR_ALIASES = [
  ['/capwesome/', '/alternatives/capawesome/'],
  ['/capawesome/', '/alternatives/capawesome/'],
  ['/alternatives/capwesome/', '/alternatives/capawesome/'],
  ['/ionic-appflow/', '/alternatives/ionic-appflow/'],
  ['/appflow/', '/alternatives/ionic-appflow/'],
  ['/alternatives/appflow/', '/alternatives/ionic-appflow/'],
  ['/expo/', '/alternatives/expo/'],
  ['/median/', '/alternatives/median/'],
]

for (const [from, to] of COMPETITOR_ALIASES) {
  test(`resolveLegacyPathRedirect ${from} → ${to}`, () => {
    expect(resolveLegacyPathRedirect(from)).toBe(to)
    expect(resolveLegacyPathRedirect(from.replace(/\/$/, ''))).toBe(to)
  })

  test(`staticLegacyRedirect ${from} → ${to}`, () => {
    expect(staticLegacyRedirectLocation(`https://capgo.app${from}`)).toBe(to)
  })
}

const LOCALIZED_SAMPLES = [
  ['de', '/capwesome/', '/de/alternatives/capawesome/'],
  ['fr', '/appflow/', '/fr/alternatives/ionic-appflow/'],
  ['ja', '/expo/', '/ja/alternatives/expo/'],
  ['ko', '/median/', '/ko/alternatives/median/'],
]

for (const [locale, fromPath, expected] of LOCALIZED_SAMPLES) {
  test(`staticLegacyRedirect /${locale}${fromPath} → ${expected}`, () => {
    expect(staticLegacyRedirectLocation(`https://capgo.app/${locale}${fromPath}`)).toBe(expected)
  })
}

for (const locale of NON_DEFAULT_LOCALE_CODES) {
  test(`staticLegacyRedirect /${locale}/capwesome/ keeps locale prefix`, () => {
    expect(staticLegacyRedirectLocation(`https://capgo.app/${locale}/capwesome/`)).toBe(`/${locale}/alternatives/capawesome/`)
  })
}

test('staticLegacyRedirect /build-status/ → /builder-data/', () => {
  expect(staticLegacyRedirectLocation('https://capgo.app/build-status/')).toBe('/builder-data/')
  expect(staticLegacyRedirectLocation('https://capgo.app/fr/build-status')).toBe('/fr/builder-data/')
})

test('staticLegacyRedirect /blog/uptime-guarantee/ → /sla/', () => {
  expect(staticLegacyRedirectLocation('https://capgo.app/blog/uptime-guarantee/')).toBe('/sla/')
  expect(staticLegacyRedirectLocation('https://capgo.app/de/blog/uptime-guarantee/')).toBe('/de/sla/')
})

test('staticLegacyRedirect /blog/developer-experience-tools/ → /blog/developer-experience/', () => {
  expect(staticLegacyRedirectLocation('https://capgo.app/blog/developer-experience-tools/')).toBe('/blog/developer-experience/')
  expect(staticLegacyRedirectLocation('https://capgo.app/de/blog/developer-experience-tools/')).toBe('/de/blog/developer-experience/')
})

test('staticLegacyRedirect removed portrait orientation blog → screen orientation docs', () => {
  expect(staticLegacyRedirectLocation('https://capgo.app/blog/what-is-a-portrait-orientation/')).toBe('/docs/plugins/screen-orientation/')
  expect(staticLegacyRedirectLocation('https://capgo.app/de/blog/what-is-a-portrait-orientation/')).toBe('/de/docs/plugins/screen-orientation/')
})

test('/eas/ was never a public competitor page (no redirect)', () => {
  expect(resolveLegacyPathRedirect('/eas/')).toBeNull()
  expect(staticLegacyRedirectLocation('https://capgo.app/eas/')).toBeNull()
})
