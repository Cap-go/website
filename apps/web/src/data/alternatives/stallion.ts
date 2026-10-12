import type { AlternativeCompetitor } from './types'

export const stallion: AlternativeCompetitor = {
  slug: 'stallion',
  name: 'Stallion',
  category: 'live-updates',
  metaTitle: 'Best Stallion Alternative in 2026 | Capgo',
  metaDescription:
    'Stallion vs Capgo: managed React Native OTA or Capacitor live updates with cloud builds. Compare pricing, patch updates, rollback, open source, and support.',
  keywords: 'Stallion alternative, Stallion vs Capgo, React Native Stallion, React Native OTA updates, CodePush alternative, Capacitor live updates',
  eyebrow: 'Stallion vs Capgo',
  heading: 'Stallion vs Capgo: React Native OTA or Capacitor?',
  lead:
    'Stallion is a managed OTA update platform for React Native and Expo, positioned as a CodePush and Expo Updates replacement. Capgo is the managed live update and native build service for Capacitor apps built with any web framework.',
  verdict:
    'Stay with Stallion if your app is React Native. If your team builds with web technologies, Capacitor with Capgo lets one codebase serve web, iOS, and Android, with live updates, progressive rollouts, cloud builds, and an open-source backend you can self-host.',
  status: 'React Native OTA service',
  sources: [
    { label: 'Stallion pricing', href: 'https://stalliontech.io/pricing' },
    { label: 'Stallion website', href: 'https://stalliontech.io' },
    { label: 'react-native-stallion on GitHub', href: 'https://github.com/stallion-tech/react-native-stallion' },
  ],
  rows: {
    pricing: {
      text: 'Free up to 10,000 MAU with capped usage. Pro $64/month, or $51/month billed yearly, for 100,000 MAU. Enterprise, Enterprise+, and On-Premise on request.',
      sources: [1],
    },
    ota: {
      text: 'JavaScript bundle updates with file-level patch updates, which Stallion says make updates up to 98% smaller. Patch updates are limited on Free.',
      sources: [1, 2],
    },
    native_builds: {
      text: 'No native build service. It integrates with GitHub Actions, CircleCI, Bitrise, and other CI tools where you build the app.',
      sources: [2],
    },
    frameworks: {
      text: 'React Native, including 0.76+ and the New Architecture, and Expo. Not for Capacitor or Flutter.',
      sources: [2],
    },
    open_source: {
      text: 'The react-native-stallion SDK is MIT-licensed. The platform is proprietary, with self-hosting only on the On-Premise plan.',
      sources: [1, 3],
    },
    rollback: {
      text: 'Automatic crash-aware rollback, manual rollback, gradual rollouts, one-click promotion, and in-app QA testing of OTA releases.',
      sources: [2],
    },
    support: {
      text: 'Standard support on Free, business-hours email on Pro, dedicated support and uptime SLA on Enterprise.',
      sources: [1],
    },
    company: {
      text: 'Redhorse Technologies Private Limited. The site reports 3,000+ organizations and SOC 2 Type I.',
      sources: [1, 2],
    },
  },
  better: [
    {
      title: 'Your app is React Native or Expo',
      text: 'Capgo does not update React Native apps. Stallion supports React Native and Expo, including the New Architecture.',
      sources: [2],
    },
    {
      title: 'You want a generous free tier',
      text: 'Stallion Free covers up to 10,000 MAU with no overage bills. Capgo has a 14-day trial but no free plan.',
      sources: [1],
    },
    {
      title: 'QA tests OTA builds inside the app',
      text: 'Stallion has a built-in way for testers to pick and validate an OTA release from inside the app before promotion.',
      sources: [2, 3],
    },
  ],
  alternatives: [
    {
      name: 'Expo EAS Update',
      text: 'The managed update service built into the Expo toolchain for React Native apps.',
      href: 'alternatives/expo',
    },
    {
      name: 'Revopush',
      text: 'Hosted CodePush replacement that keeps the CodePush SDK, with a free tier up to 1K MAU.',
      href: 'alternatives/revopush',
    },
    {
      name: 'Hot Updater',
      text: 'Free, self-hosted React Native OTA running in your own Cloudflare, Supabase, AWS, or Firebase account.',
      href: 'alternatives/hot-updater',
    },
    {
      name: 'Pushy',
      text: 'React Native hot updates with Hermes-optimized diff patches, widely used in China.',
      href: 'alternatives/pushy',
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
        html: 'In your React, Vue, Angular, or Svelte project, run <code>bun add @capacitor/core @capacitor/cli</code> and <code>bunx cap init</code>.',
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
      question: 'Does Capgo support React Native like Stallion?',
      answer:
        'No. Capgo supports Capacitor, Cordova, and Electron apps. For React Native, compare Stallion with Expo EAS Update, Revopush, Hot Updater, and Pushy.',
    },
    {
      question: 'Which is cheaper?',
      answer:
        'Stallion is free up to 10,000 MAU, then $64 per month for Pro. Capgo starts at $12 per month billed yearly with a 14-day free trial and includes native build time.',
    },
    {
      question: 'Can I self-host?',
      answer:
        'Stallion offers self-hosting on its On-Premise plan. Capgo\'s updater plugin is MPL-2.0 and its backend is AGPL-3.0, so you can run your own update server or use licensed self-hosting on Enterprise.',
    },
    {
      question: 'Do both roll back bad updates automatically?',
      answer:
        'Yes. Stallion has crash-aware rollback. Capgo rolls back automatically when a bundle fails to start and lets you revert to any previous bundle in one click.',
    },
  ],
}
