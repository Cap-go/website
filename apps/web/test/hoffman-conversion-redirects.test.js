// Hoffman conversion legacy redirect coverage (default + locale-prefixed paths).
import { expect, test } from 'bun:test'
import { resolveLegacyPathRedirect } from '../../shared/legacyPathRedirects.ts'
import {
  NON_DEFAULT_LOCALE_CODES,
  resolveLocalizedLegacyRedirectPath,
} from '../../shared/localizedLegacyPathRedirect.ts'

const REDIRECTS = [
  ['/blog/expo-development-client/', '/blog/alternative-to-expo/'],
  ['/blog/privacy-manifest-for-capacitor-apps-guide/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/blog/datenschutz-manifest-für-capacitor-apps-leitfaden/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/blog/guide-sur-la-politique-de-confidentialité-pour-les-apps-capacitor/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/blog/manifiesto-de-privacidad-para-apps-de-capacitor-guia/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/blog/sentry-react-native/', '/blog/app-health-monitoring/'],
  ['/blog/what-is-enabled-by-the-continuous-delivery-pipeline/', '/blog/what-is-continuous-delivery/'],
  ['/blog/what-is-soc-2-certification/', '/security-questionnaire/'],
  ['/blog/app-health-check/', '/blog/app-health-monitoring/'],
  ['/blog/what-is-observability/', '/blog/app-health-monitoring/'],
  ['/blog/multi-platform-software-development/', '/blog/cross-platform-mobile-app-development-vs-native/'],
  ['/blog/how-chinas-cybersecurity-law-impacts-app-developers/', '/blog/how-chinas-data-laws-impact-app-store-submissions/'],
  ['/blog/wie-sich-das-chinesische-cybersicherheitsgesetz-auf-app-entwickler-auswirkt/', '/blog/how-chinas-data-laws-impact-app-store-submissions/'],
  ['/blog/uptime-guarantee/', '/sla/'],
  ['/blog/what-is-a-portrait-orientation/', '/docs/plugins/screen-orientation/'],
  ['/blog/understanding-apples-privacy-manifest/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/blog/app-access-management/', '/blog/how-rbac-secures-ota-updates-in-capacitor-apps/'],
  ['/blog/app-behavior-tracking/', '/blog/capgo-plugin-for-custom-event-tracking/'],
  ['/blog/app-risk-assessment/', '/blog/ota-security-checklist-for-capacitor-apps/'],
  ['/blog/jest-unit-testing/', '/blog/unit-tests-javascript/'],
  ['/blog/understanding-regulatory-compliance/', '/blog/compliance-checks-in-cicd-for-capacitor-apps/'],
  ['/blog/what-is-incident-response/', '/blog/incident-response-guide/'],
  ['/blog/deployment-automation/', '/blog/app-release-automation/'],
  ['/blog/app-security-best-practices/', '/blog/5-security-best-practices-for-mobile-app-live-updates/'],
  ['/blog/updating-from-capacitor-4-to-capacitor-5/', '/blog/upgrade-capacitor-app-to-capacitor-8/'],
  ['/blog/aggiornamento-da-capacitor-4-a-capacitor-5/', '/blog/upgrade-capacitor-app-to-capacitor-8/'],
  ['/blog/mise-a-jour-de-capacitor-4-vers-capacitor-5/', '/blog/upgrade-capacitor-app-to-capacitor-8/'],
  ['/blog/developer-experience-tools/', '/blog/developer-experience/'],
  ['/blog/comprendiendo-el-manifiesto-de-privacidad-de-apple/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/blog/das-datenschutzmanifest-von-apple-verstehen/', '/blog/privacy-manifest-for-ios-apps/'],
  ['/codepush/', '/alternatives/codepush/'],
  ['/compare/capgo-vs-capawesome/', '/alternatives/capawesome/'],
  ['/compare/capgo-vs-appflow/', '/alternatives/ionic-appflow/'],
  ['/compare/capgo-vs-expo/', '/alternatives/expo/'],
  ['/compare/capgo-vs-codepush/', '/alternatives/codepush/'],
  ['/best-ionic-live-update-service/', '/best/capacitor-live-updates/'],
  ['/blog/alternative-to-voltbuilder/', '/alternatives/voltbuilder/'],
  ['/blog/alternativa-a-voltbuilder/', '/alternatives/voltbuilder/'],
  ['/blog/alternative-a-voltbuilder/', '/alternatives/voltbuilder/'],
  ['/blog/best-live-updates-system-for-mobile-app/', '/blog/best-live-update-tools-for-capacitor-apps/'],
  ['/blog/best-ionic-live-update-service/', '/blog/best-live-update-tools-for-capacitor-apps/'],
  ['/blog/best-capacitor-ota-updates/', '/blog/best-live-update-tools-for-capacitor-apps/'],
  ['/blog/best-over-the-air-app-updates-saas/', '/blog/best-live-update-tools-for-capacitor-apps/'],
  ['/blog/ios-live-updates-allowed-stacks/', '/blog/do-apple-allow-live-updates/'],
  ['/blog/android-live-updates-allowed-stacks/', '/blog/do-google-allow-live-updates/'],
  ['/blog/new-deal-pwa/', '/blog/pwa-vs-native-apps/'],
  ['/blog/cross-platform-mobile-app-development-guide-2024/', '/blog/cross-platform-mobile-app-development-vs-native/'],
  [
    "/blog/guide-du-développement-d'applications-mobiles-multiplateformes-2024/",
    '/blog/cross-platform-mobile-app-development-vs-native/',
  ],
  ['/blog/app-store-review-management/', '/blog/how-to-pass-app-store-review-2026/'],
]

for (const [from, to] of REDIRECTS) {
  test(`resolveLegacyPathRedirect ${from} → ${to}`, () => {
    expect(resolveLegacyPathRedirect(from)).toBe(to)
    expect(resolveLegacyPathRedirect(from.replace(/\/$/, ''))).toBe(to)
    for (const locale of NON_DEFAULT_LOCALE_CODES) {
      expect(resolveLocalizedLegacyRedirectPath(`/${locale}${from}`)).toBe(`/${locale}${to}`)
    }
  })
}
