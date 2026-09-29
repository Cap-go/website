import { expect, test } from 'bun:test'
import { resolveLegacyPathRedirect } from '../../shared/legacyPathRedirects.ts'

const REDIRECTS = [
  ['/codepush/', '/alternatives/codepush/'],
  ['/compare/capgo-vs-capawesome/', '/alternatives/capawesome/'],
  ['/compare/capgo-vs-appflow/', '/alternatives/ionic-appflow/'],
  ['/compare/capgo-vs-expo/', '/alternatives/expo/'],
  ['/compare/capgo-vs-codepush/', '/alternatives/codepush/'],
  ['/best-ionic-live-update-service/', '/best/capacitor-live-updates/'],
]

for (const [from, to] of REDIRECTS) {
  test(`resolveLegacyPathRedirect ${from} → ${to}`, () => {
    expect(resolveLegacyPathRedirect(from)).toBe(to)
    expect(resolveLegacyPathRedirect(from.replace(/\/$/, ''))).toBe(to)
  })
}
