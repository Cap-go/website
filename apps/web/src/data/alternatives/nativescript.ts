import type { AlternativeCompetitor } from './types'

export const nativescript: AlternativeCompetitor = {
  slug: 'nativescript',
  name: 'NativeScript',
  category: 'framework',
  metaTitle: 'Best NativeScript Alternative in 2026 | Capgo',
  metaDescription:
    'Compare NativeScript with Capacitor and Capgo. Ship your existing web app to iOS and Android, reuse it on the web, and get live updates and cloud builds.',
  keywords:
    'NativeScript alternative, NativeScript vs Capacitor, NativeScript live updates, JavaScript mobile framework, Capacitor live updates, Capgo',
  eyebrow: 'NativeScript vs Capacitor + Capgo',
  heading: 'NativeScript alternative: Capacitor with Capgo',
  lead: 'NativeScript renders native platform UI from JavaScript and TypeScript, with direct access to iOS and Android APIs. Capacitor runs your web app in a native shell, so the same code serves the browser and the stores, and Capgo adds live updates and cloud builds with commercial support.',
  verdict:
    'Choose Capacitor with Capgo if you want one codebase for web and mobile, a large plugin ecosystem, and a live update service that is actively supported. Choose NativeScript if you want native UI components and like calling platform APIs directly from TypeScript, and you are fine with a smaller community.',
  status: 'Cross-platform framework',
  sources: [
    { label: 'NativeScript website', href: 'https://nativescript.org/' },
    { label: 'NativeScript docs', href: 'https://docs.nativescript.org/' },
    { label: 'NativeScript GitHub repository', href: 'https://github.com/NativeScript/NativeScript' },
    { label: 'nativescript-app-sync GitHub repository', href: 'https://github.com/EddyVerbruggen/nativescript-app-sync' },
    { label: 'Norrix', href: 'https://norrix.net/' },
  ],
  rows: {
    pricing: {
      text: 'The framework is free under the MIT license. Norrix, a third-party service for builds, store submissions, and OTA updates, has a free tier, then Pro at $19/month and Enterprise at $199/month.',
      sources: [3, 5],
    },
    ota: {
      text: 'No built-in live updates. The nativescript-app-sync plugin, based on CodePush, is in beta and not supported by the core team. Norrix also offers OTA updates.',
      sources: [4, 5],
    },
    native_builds: {
      text: 'Local builds with the NativeScript CLI after setting up your machine for iOS and Android development. Cloud builds through third parties such as Norrix.',
      sources: [2, 5],
    },
    frameworks: {
      text: 'JavaScript or TypeScript, standalone or with Angular, React, Solid, Svelte, or Vue, rendering native UI instead of a web view.',
      sources: [1, 3],
    },
    open_source: { text: 'MIT-licensed, a member of the OpenJS Foundation.', sources: [3, 2] },
    rollback: {
      text: 'Depends on the update plugin or service you add. Without one, fixes ship as new store releases.',
      sources: [4, 5],
    },
    support: {
      text: 'Community support through Discord, Stack Overflow, and GitHub. No official paid support plan listed.',
      sources: [1],
    },
    company: {
      text: 'Open-source project under the OpenJS Foundation, in production use since 2014.',
      sources: [1, 3],
    },
  },
  capgoRows: {
    pricing:
      'Capacitor is free and MIT-licensed. Capgo live updates and cloud builds from $12/month billed yearly or $14 monthly. 14-day free trial, no credit card.',
    frameworks:
      'Capacitor runs any web app: React, Vue, Angular, Svelte, Solid, or plain JS. The same code ships to web, iOS, and Android. Capgo also updates Cordova and Electron apps.',
  },
  better: [
    {
      title: 'You want native UI from JavaScript',
      text: 'NativeScript renders real platform UI, so screens use native components rather than a web view.',
      sources: [1],
    },
    {
      title: 'You call platform APIs a lot',
      text: 'NativeScript exposes iOS and Android APIs directly to TypeScript, without writing a plugin for each one.',
      sources: [1],
    },
    {
      title: 'You want to mix in SwiftUI, Compose, or Flutter',
      text: 'NativeScript can host UIKit, SwiftUI, Android View, Jetpack Compose, and Flutter UI inside the same app.',
      sources: [3],
    },
  ],
  alternatives: [
    {
      name: 'React Native',
      text: 'Meta-backed framework with native views and a large community. Updates via Expo EAS Update or self-hosted CodePush.',
      href: 'alternatives/react-native',
    },
    {
      name: 'Flutter',
      text: 'Google-backed toolkit in Dart that draws its own UI. Code push only through third parties such as Shorebird.',
      href: 'alternatives/flutter',
    },
    {
      name: 'Ionic Appflow',
      text: 'Ionic\'s hosted build and deploy service for Capacitor apps.',
      href: 'alternatives/ionic-appflow',
    },
    {
      name: 'Cordova',
      text: 'The original web-to-native wrapper. Still maintained, but most teams now pick Capacitor for new apps.',
      href: 'alternatives/cordova',
    },
    {
      name: 'Kotlin Multiplatform',
      text: 'Share Kotlin logic, and UI with Compose Multiplatform, across Android and iOS.',
      href: 'alternatives/kotlin-multiplatform',
    },
  ],
  migration: {
    title: 'Move from NativeScript to Capacitor and Capgo',
    lead: 'If you use NativeScript with Angular, Vue, React, Svelte, or Solid, your logic and services carry over. Templates move from native UI elements to HTML.',
    steps: [
      {
        title: 'Build or reuse a web app',
        html: 'Port your views to web components in the same framework, or start from your existing web app. Services and state usually stay.',
      },
      {
        title: 'Add Capacitor',
        html: 'Run <code>bun add @capacitor/core @capacitor/cli</code>, then <code>bunx cap init</code>, <code>bunx cap add ios</code>, and <code>bunx cap add android</code>. Replace direct native API calls with Capacitor plugins.',
      },
      {
        title: 'Install Capgo',
        html: 'Run <code>bunx @capgo/cli@latest init</code> to add live updates, then ship changes with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Does NativeScript support live updates?',
      answer:
        'Not out of the box. The nativescript-app-sync plugin offers CodePush-style updates but is in beta and not supported by the core team. Norrix is a paid third-party option.',
    },
    {
      question: 'Is NativeScript still maintained?',
      answer:
        'Yes. NativeScript is an open-source project under the OpenJS Foundation with ongoing development on GitHub.',
    },
    {
      question: 'Can Capgo update NativeScript apps?',
      answer:
        'No. Capgo live updates work for Capacitor, Cordova, and Electron apps. Moving to Capacitor gives you Capgo channels, rollback, and cloud builds.',
    },
    {
      question: 'Why choose Capacitor over NativeScript?',
      answer:
        'Capacitor reuses your web app as is, so one codebase ships to the browser, iOS, and Android, and it has a large plugin ecosystem. Capgo adds supported live updates and native cloud builds.',
    },
  ],
}
