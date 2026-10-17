import { expect, test } from 'bun:test'
import { resolveLegacyPathRedirect } from '../../shared/legacyPathRedirects.ts'

const REDIRECTS = [
  ['/blog/expo-development-client/', '/blog/alternative-to-expo/'],
  ['/blog/sentry-react-native/', '/blog/app-health-monitoring/'],
  [
    '/blog/what-is-enabled-by-the-continuous-delivery-pipeline/',
    '/blog/what-is-continuous-delivery/',
  ],
  ['/blog/what-is-soc-2-certification/', '/security-questionnaire/'],
  ['/blog/how-chinas-cybersecurity-law-impacts-app-developers/', '/blog/checklist-for-cybersecurity-compliance-in-china/'],
  ['/blog/wie-sich-das-chinesische-cybersicherheitsgesetz-auf-app-entwickler-auswirkt/', '/blog/checklist-for-cybersecurity-compliance-in-china/'],
  ['/blog/uptime-guarantee/', '/sla/'],
  ['/blog/what-is-a-portrait-orientation/', '/docs/plugins/screen-orientation/'],
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
