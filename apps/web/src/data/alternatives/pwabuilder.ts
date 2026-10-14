import type { AlternativeCompetitor } from './types'

export const pwabuilder: AlternativeCompetitor = {
  slug: 'pwabuilder',
  name: 'PWABuilder',
  category: 'web-to-app',
  publishedAt: '2026-10-12',
  updatedAt: '2026-10-12',
  metaTitle: 'Best PWABuilder Alternative in 2026 | Capgo',
  metaDescription:
    'Compare PWABuilder and Capgo. Free PWA store packaging from Microsoft vs Capacitor with native plugins, live updates, rollback, and cloud native builds.',
  keywords: 'pwabuilder alternative, pwabuilder vs capacitor, pwa to app store, pwa to ios app, trusted web activity, capgo',
  eyebrow: 'PWABuilder vs Capgo',
  heading: 'PWABuilder alternative: Capacitor and Capgo',
  lead: 'PWABuilder, from Microsoft, packages an existing PWA for the Microsoft Store, Google Play, and the App Store for free. Capacitor with Capgo is for teams that need native plugins, offline bundles, and managed releases.',
  verdict:
    'Choose PWABuilder if you already have a solid PWA, want a free package, and need little native access. Choose Capacitor with Capgo if you need native APIs on iOS and Android, a reliable App Store path, live updates with rollback, and cloud builds without a Mac.',
  status: 'Free PWA packager',
  sources: [
    { label: 'PWABuilder', href: 'https://www.pwabuilder.com/' },
    { label: 'PWABuilder GitHub repository', href: 'https://github.com/pwa-builder/PWABuilder' },
    { label: 'PWABuilder docs: Quick start', href: 'https://docs.pwabuilder.com/#/builder/quick-start' },
    { label: 'PWABuilder docs: App Store', href: 'https://docs.pwabuilder.com/#/builder/app-store' },
    { label: 'PWABuilder docs: Android', href: 'https://docs.pwabuilder.com/#/builder/android' },
  ],
  capgoRows: {
    frameworks:
      'Capacitor apps built with React, Vue, Angular, Svelte, or any web framework, bundled inside the app with full native plugin access on iOS and Android. Live updates also work for Cordova and Electron.',
  },
  rows: {
    pricing: {
      text: 'Free. You only pay store developer accounts: $19 once for Microsoft, $25 once for Google Play, $99/year for Apple.',
      sources: [3],
    },
    ota: {
      text: 'The packaged app loads your PWA from the web, so updating your site updates every store version. No bundles or staged releases.',
      sources: [3],
    },
    native_builds: {
      text: 'Generates store packages. Android uses Bubblewrap to create a Trusted Web Activity AAB. iOS produces a Swift WebView project you build yourself with Xcode on a Mac.',
      sources: [4, 5],
    },
    frameworks: {
      text: 'Any PWA with a web manifest, served over HTTPS at a public URL. Targets Windows, Android, and iOS.',
      sources: [3],
    },
    open_source: {
      text: 'Open source on GitHub under the MIT License, maintained by Microsoft.',
      sources: [2],
    },
    rollback: {
      text: 'Not applicable: the app shows what your web server serves, so rollback follows your web deploys.',
      sources: [3],
    },
    support: {
      text: 'Community support through GitHub issues and the docs. No paid support plan.',
      sources: [2, 3],
    },
    company: {
      text: 'Microsoft open-source project, actively maintained on GitHub.',
      sources: [2],
    },
  },
  better: [
    {
      title: 'You want it free',
      text: 'PWABuilder has no fee and is MIT licensed. You only pay for the store developer accounts.',
      sources: [2, 3],
    },
    {
      title: 'You target the Microsoft Store',
      text: 'PWABuilder is built by Microsoft and has first-class packaging for Windows and the Microsoft Store.',
      sources: [3],
    },
    {
      title: 'Your PWA already does everything you need',
      text: 'If your app needs little native access, a Trusted Web Activity on Android keeps it identical to your web version with no extra code.',
      sources: [5],
    },
  ],
  alternatives: [
    { name: 'Despia', text: 'One-time priced runtime with a native SDK for web apps and an offline local server.', href: 'alternatives/despia' },
    { name: 'Median', text: 'Managed web-to-app platform with native plugins and a free test license.', href: 'alternatives/median' },
    { name: 'Natively', text: 'No-code website-to-app wrapper with cloud builds and store publishing.', href: 'alternatives/natively' },
    { name: 'Apache Cordova', text: 'Open-source WebView runtime with a long plugin history, now less active than Capacitor.', href: 'alternatives/cordova' },
    { name: 'VoltBuilder', text: 'Cloud builds for Cordova and Capacitor without a Mac.', href: 'alternatives/voltbuilder' },
  ],
  migration: {
    title: 'Move from PWABuilder to Capacitor and Capgo',
    lead: 'Your PWA stays the same web app. Capacitor bundles it in a native project and adds plugins; Capgo handles builds and updates.',
    steps: [
      {
        title: 'Add Capacitor to your PWA',
        html: 'Run <code>bun add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android</code>, then <code>bunx cap init</code>, <code>bunx cap add ios</code>, and <code>bunx cap add android</code>.',
      },
      {
        title: 'Add native plugins',
        html: 'Use plugins like <code>@capacitor/push-notifications</code> for native push on iOS, and reuse your existing Android signing key to update the same Play listing.',
      },
      {
        title: 'Build and update with Capgo',
        html: 'Run <code>bunx @capgo/cli@latest init</code>, build in Capgo Cloud without a Mac, and ship web changes with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Is PWABuilder free?',
      answer: 'Yes. PWABuilder is a free, MIT-licensed Microsoft project. You pay only the store developer account fees.',
    },
    {
      question: 'Can PWABuilder publish to the Apple App Store?',
      answer: 'PWABuilder generates a Swift WebView project that you build in Xcode on a Mac. Its docs call iOS packaging experimental and note that acceptance depends on the UI and the use of native capabilities.',
    },
    {
      question: 'What is the difference between PWABuilder and Capacitor?',
      answer: 'PWABuilder wraps a hosted PWA. Capacitor bundles your web app inside a native project and gives it native APIs through plugins, which helps with App Store review and offline use.',
    },
    {
      question: 'When should I choose Capgo?',
      answer: 'Choose Capgo when you need native features on iOS and Android, cloud builds without a Mac, and live updates with channels and rollback for a Capacitor app.',
    },
  ],
}
