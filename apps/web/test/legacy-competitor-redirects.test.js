import { expect, test } from 'bun:test'
import { resolveLegacyPathRedirect } from '../../shared/legacyPathRedirects.ts'

const NON_DEFAULT_LOCALES = ['de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh']

/** Mirrors apps/web/src/worker/index.ts splitLocalePath + staticLegacyRedirect target. */
function localizedLegacyRedirectTarget(pathname) {
  const segments = pathname.split('/').filter(Boolean)
  let localePrefix = ''
  let path = pathname
  if (segments.length > 0 && NON_DEFAULT_LOCALES.includes(segments[0])) {
    const rest = segments.slice(1).join('/')
    localePrefix = `/${segments[0]}`
    path = rest ? `/${rest}${pathname.endsWith('/') ? '/' : ''}` : '/'
  }
  const legacyTarget = resolveLegacyPathRedirect(path)
  if (!legacyTarget) return null
  return `${localePrefix}${legacyTarget}`
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
}

for (const locale of NON_DEFAULT_LOCALES) {
  test(`worker-style ${locale}/capwesome/ keeps locale prefix`, () => {
    expect(localizedLegacyRedirectTarget(`/${locale}/capwesome/`)).toBe(`/${locale}/alternatives/capawesome/`)
  })
}

test('/eas/ was never a public competitor page (no redirect)', () => {
  expect(resolveLegacyPathRedirect('/eas/')).toBeNull()
})
