import type { AlternativeCompetitor } from './types'

export const pushy: AlternativeCompetitor = {
  slug: 'pushy',
  name: 'Pushy',
  category: 'live-updates',
  metaTitle: 'Best Pushy Alternative in 2026 | Capgo',
  metaDescription:
    'Pushy (react-native-update) vs Capgo: React Native hot updates or Capacitor live updates with cloud builds. Compare pricing, diff patches, rollback, support.',
  keywords: 'Pushy alternative, react-native-update alternative, Pushy vs Capgo, Cresc, React Native hot update, CodePush alternative, Capacitor live updates',
  eyebrow: 'Pushy vs Capgo',
  heading: 'Pushy vs Capgo: React Native hot updates or Capacitor?',
  lead:
    'Pushy is the hosted hot update service behind the open-source react-native-update SDK, run from China at reactnative.cn, with an international version called Cresc. Capgo is the live update and native build service for Capacitor apps built with any web framework.',
  verdict:
    'Pushy is a solid pick for React Native apps, especially with users in China or on HarmonyOS. If your team builds with web technologies, Capacitor with Capgo gives you one codebase for web and mobile, live updates, progressive rollouts, cloud builds, and English support from the team.',
  status: 'React Native hot updates',
  sources: [
    { label: 'Pushy pricing', href: 'https://pushy.reactnative.cn/pricing.html' },
    { label: 'react-native-update on GitHub', href: 'https://github.com/reactnativecn/react-native-update' },
    { label: 'Cresc website', href: 'https://cresc.dev/' },
    { label: 'react-native-update license', href: 'https://github.com/reactnativecn/react-native-update/blob/master/LICENSE' },
  ],
  rows: {
    pricing: {
      text: 'Free plan with 3 apps and 1,000 update checks/day. Standard 960 CNY/year, Advanced 2,400 CNY/year, Professional 7,200 CNY/year. CDN traffic included. iOS and Android count as separate apps.',
      sources: [1],
    },
    ota: {
      text: 'Incremental patches optimized for Hermes bytecode, about 3.4 KB for a one-line change, with multi-version updates in one package.',
      sources: [2, 3],
    },
    native_builds: {
      text: 'No cloud build service. You build iOS and Android binaries yourself. Plans include storage for uploaded native packages.',
      sources: [1, 2],
    },
    frameworks: {
      text: 'React Native on iOS, Android, and HarmonyOS, including Expo and the New Architecture. Not for Capacitor or Flutter.',
      sources: [2],
    },
    open_source: {
      text: 'The react-native-update SDK is MIT-licensed. The Pushy and Cresc update services are hosted and proprietary.',
      sources: [2, 3, 4],
    },
    rollback: {
      text: 'Automatic rollback of crashing updates, native cold-start recovery, staged rollouts, and auto-pausing of risky releases.',
      sources: [2, 3],
    },
    support: {
      text: 'Dedicated support on Standard, priority support on Advanced, enterprise support on Professional. Paid technical support is also offered.',
      sources: [1, 2],
    },
    company: {
      text: 'Built by the reactnativecn team in Wuhan, China. Cresc is run by Charmlot Pte. Ltd.',
      sources: [1, 3, 4],
    },
  },
  better: [
    {
      title: 'Your app is React Native',
      text: 'Capgo does not update React Native apps. Pushy supports React Native, Expo, and the New Architecture.',
      sources: [2],
    },
    {
      title: 'Your users are in China or on HarmonyOS',
      text: 'Pushy runs a China-hosted service with included CDN traffic and supports HarmonyOS alongside iOS and Android.',
      sources: [1, 2],
    },
    {
      title: 'You want the smallest patches',
      text: 'Hermes-optimized diffs keep small fixes to a few kilobytes.',
      sources: [2, 3],
    },
  ],
  alternatives: [
    {
      name: 'Expo EAS Update',
      text: 'The managed update service built into Expo for React Native apps.',
      href: 'alternatives/expo',
    },
    {
      name: 'Revopush',
      text: 'Hosted CodePush replacement for React Native with CodePush SDK compatibility and a free tier.',
      href: 'alternatives/revopush',
    },
    {
      name: 'Stallion',
      text: 'Managed React Native OTA with patch updates, crash-aware rollback, and a free tier up to 10,000 MAU.',
      href: 'alternatives/stallion',
    },
    {
      name: 'Hot Updater',
      text: 'Free, self-hosted React Native OTA running in your own cloud account.',
      href: 'alternatives/hot-updater',
    },
    {
      name: 'Standalone CodePush server',
      text: 'Microsoft\'s open-source CodePush server on your own infrastructure.',
      href: 'alternatives/codepush',
    },
  ],
  migration: {
    title: 'Move to Capacitor and Capgo',
    lead: 'React Native code does not port directly to Capacitor. This path fits teams with a web app already, or teams ready to build the UI with web technologies.',
    steps: [
      {
        title: 'Add Capacitor to your web app',
        html: 'In your React, Vue, Angular, or Svelte project, run <code>bun add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android</code> and <code>bunx cap init</code>.',
      },
      {
        title: 'Add the native platforms',
        html: 'Run <code>bun add @capacitor/ios @capacitor/android</code>, then <code>bunx cap add ios</code> and <code>bunx cap add android</code>.',
      },
      {
        title: 'Set up Capgo live updates',
        html: 'Run <code>bunx @capgo/cli@latest init</code> to install the updater, create your app, and upload your first bundle.',
      },
    ],
  },
  faq: [
    {
      question: 'What is the difference between Pushy and Cresc?',
      answer:
        'Both use the open-source react-native-update SDK. Pushy is the China service at pushy.reactnative.cn, and Cresc at cresc.dev is the international version with English docs.',
    },
    {
      question: 'Can Capgo update a React Native app?',
      answer:
        'No. Capgo supports Capacitor, Cordova, and Electron apps. For React Native, compare Pushy with Expo EAS Update, Revopush, Stallion, and Hot Updater.',
    },
    {
      question: 'How does Pushy pricing compare to Capgo?',
      answer:
        'Pushy has a free plan and paid plans from 960 CNY per year, billed per app and platform. Capgo starts at $12 per month billed yearly with a 14-day free trial and includes native build time.',
    },
    {
      question: 'Are both open source?',
      answer:
        'Pushy\'s SDK is MIT-licensed and the service is hosted. Capgo\'s updater plugin is MPL-2.0 and its backend is AGPL-3.0, so you can also self-host the update server.',
    },
  ],
}
