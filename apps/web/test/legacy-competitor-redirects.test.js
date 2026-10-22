import { expect, test } from 'bun:test'
import { resolveAppleRejectionStoriesPathRedirect } from '../../shared/appleRejectionStoriesPathRedirect.ts'
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

const BLOG_LEGACY_REDIRECTS = [
  ['/blog/app-access-management/', '/blog/how-rbac-secures-ota-updates-in-capacitor-apps/'],
  ['/blog/app-behavior-tracking/', '/blog/capgo-plugin-for-custom-event-tracking/'],
  ['/blog/app-risk-assessment/', '/blog/ota-security-checklist-for-capacitor-apps/'],
  ['/blog/uptime-guarantee/', '/sla/'],
  ['/blog/developer-experience-tools/', '/blog/developer-experience/'],
  ['/blog/what-is-a-portrait-orientation/', '/docs/plugins/screen-orientation/'],
]

// English slug redirects; locale prefixes are applied in staticLegacyRedirect.
const LIVE_UPDATE_ROUNDUP_REDIRECTS = [
  ['/blog/best-live-updates-system-for-mobile-app/', '/blog/best-live-update-tools-for-capacitor-apps/'],
  ['/blog/best-ionic-live-update-service/', '/blog/best-live-update-tools-for-capacitor-apps/'],
  ['/blog/best-capacitor-ota-updates/', '/blog/best-live-update-tools-for-capacitor-apps/'],
  ['/blog/best-over-the-air-app-updates-saas/', '/blog/best-live-update-tools-for-capacitor-apps/'],
]

const VOLTBUILDER_BLOG_REDIRECTS = [
  ['/blog/alternative-to-voltbuilder/', '/alternatives/voltbuilder/'],
  ['/blog/alternativa-a-voltbuilder/', '/alternatives/voltbuilder/'],
  ['/blog/alternative-a-voltbuilder/', '/alternatives/voltbuilder/'],
]

test('staticLegacyRedirect /build-status/ → /builder-data/', () => {
  expect(staticLegacyRedirectLocation('https://capgo.app/build-status/')).toBe('/builder-data/')
  expect(staticLegacyRedirectLocation('https://capgo.app/fr/build-status')).toBe('/fr/builder-data/')
})

for (const [from, to] of BLOG_LEGACY_REDIRECTS) {
  test(`staticLegacyRedirect ${from} → ${to}`, () => {
    expect(staticLegacyRedirectLocation(`https://capgo.app${from}`)).toBe(to)
    expect(staticLegacyRedirectLocation(`https://capgo.app/de${from}`)).toBe(`/de${to}`)
  })
}

for (const [from, to] of LIVE_UPDATE_ROUNDUP_REDIRECTS) {
  test(`resolveLegacyPathRedirect ${from} → ${to}`, () => {
    expect(resolveLegacyPathRedirect(from)).toBe(to)
    expect(resolveLegacyPathRedirect(from.replace(/\/$/, ''))).toBe(to)
  })

  test(`staticLegacyRedirect ${from} → ${to}`, () => {
    expect(staticLegacyRedirectLocation(`https://capgo.app${from}`)).toBe(to)
    for (const locale of NON_DEFAULT_LOCALE_CODES) {
      expect(staticLegacyRedirectLocation(`https://capgo.app/${locale}${from}`)).toBe(`/${locale}${to}`)
    }
  })
}

for (const [from, to] of VOLTBUILDER_BLOG_REDIRECTS) {
  test(`resolveLegacyPathRedirect ${from} → ${to}`, () => {
    expect(resolveLegacyPathRedirect(from)).toBe(to)
    expect(resolveLegacyPathRedirect(from.replace(/\/$/, ''))).toBe(to)
  })

  test(`staticLegacyRedirect ${from} → ${to}`, () => {
    expect(staticLegacyRedirectLocation(`https://capgo.app${from}`)).toBe(to)
    expect(staticLegacyRedirectLocation(`https://capgo.app/de${from}`)).toBe(`/de${to}`)
    expect(staticLegacyRedirectLocation(`https://capgo.app/es${from.replace(/\/$/, '')}`)).toBe(`/es${to}`)
  })
}

test('/eas/ was never a public competitor page (no redirect)', () => {
  expect(resolveLegacyPathRedirect('/eas/')).toBeNull()
  expect(staticLegacyRedirectLocation('https://capgo.app/eas/')).toBeNull()
})

const APPLE_REJECTION_STORIES_REDIRECTS = [
  ['/apple-rejection-stories/', '/app-store-refusal-horror-story/'],
  ['/apple-rejection-stories/screenshots/foo.webp', '/app-store-refusal-horror-story/screenshots/foo.webp'],
  ['/apple-rejection-stories/future-story-slug/', '/app-store-refusal-horror-story/future-story-slug/'],
]

for (const [from, to] of APPLE_REJECTION_STORIES_REDIRECTS) {
  test(`resolveAppleRejectionStoriesPathRedirect ${from} → ${to}`, () => {
    expect(resolveAppleRejectionStoriesPathRedirect(from)).toBe(to)
    expect(resolveAppleRejectionStoriesPathRedirect(from.replace(/\/$/, ''))).toBe(to)
  })

  test(`staticLegacyRedirect ${from} → ${to}`, () => {
    expect(staticLegacyRedirectLocation(`https://capgo.app${from}`)).toBe(to)
    expect(staticLegacyRedirectLocation(`https://capgo.app/de${from}`)).toBe(`/de${to}`)
  })
}

test('resolveLegacyPathRedirect /apple-rejection-stories/ → /app-store-refusal-horror-story/', () => {
  expect(resolveLegacyPathRedirect('/apple-rejection-stories/')).toBe('/app-store-refusal-horror-story/')
})
