import { expect, test } from 'bun:test'
import { resolveLegacyPathRedirect } from '../../shared/legacyPathRedirects.ts'

const REDIRECTS = [
  ['/blog/expo-development-client/', '/blog/alternative-to-expo/'],
  ['/blog/privacy-manifest-for-capacitor-apps-guide/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/blog/datenschutz-manifest-für-capacitor-apps-leitfaden/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/blog/guide-sur-la-politique-de-confidentialité-pour-les-apps-capacitor/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/blog/manifiesto-de-privacidad-para-apps-de-capacitor-guia/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/blog/sentry-react-native/', '/blog/app-health-monitoring/'],
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
