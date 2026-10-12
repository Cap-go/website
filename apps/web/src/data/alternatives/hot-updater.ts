import type { AlternativeCompetitor } from './types'

export const hotUpdater: AlternativeCompetitor = {
  slug: 'hot-updater',
  name: 'Hot Updater',
  category: 'live-updates',
  metaTitle: 'Best Hot Updater Alternative in 2026 | Capgo',
  metaDescription:
    'Hot Updater vs Capgo: self-hosted React Native OTA or managed Capacitor live updates with cloud builds. Compare cost, rollback, open source, and support.',
  keywords: 'Hot Updater alternative, hot-updater vs Capgo, self-hosted OTA updates, React Native CodePush alternative, Capacitor live updates',
  eyebrow: 'Hot Updater vs Capgo',
  heading: 'Hot Updater vs Capgo: self-hosted or managed OTA?',
  lead:
    'Hot Updater is a free, self-hosted CodePush alternative for React Native that runs on your own cloud account. Capgo is a managed live update and native build service for Capacitor apps, with an open-source plugin and backend you can also self-host.',
  verdict:
    'For a React Native team happy to run its own storage and database, Hot Updater is a strong free option. For teams building with web technologies, Capacitor with Capgo removes the update infrastructure work and adds cloud native builds and support from the engineers who build it.',
  status: 'Self-hosted React Native OTA',
  sources: [
    { label: 'Hot Updater on GitHub', href: 'https://github.com/gronxb/hot-updater' },
    { label: 'Hot Updater website', href: 'https://hot-updater.dev' },
    { label: 'Hot Updater docs: introduction', href: 'https://hot-updater.dev/docs/get-started/introduction' },
  ],
  rows: {
    pricing: {
      text: 'Free software. You pay your own provider for storage, database, and bandwidth on Cloudflare, Supabase, AWS, Firebase, or a custom server.',
      sources: [1, 3],
    },
    ota: {
      text: 'Ships JavaScript and asset updates over the air, with bundle diffing to shrink downloads. Native code changes need a new store build.',
      sources: [1, 3],
    },
    native_builds: {
      text: 'No build service. Hot Updater builds bundles through Metro, Expo, or Rock adapters, and you build the store binaries yourself.',
      sources: [1, 3],
    },
    frameworks: {
      text: 'React Native, new and legacy versions, with Metro, Expo, and Rock build adapters. Not for Capacitor or Flutter.',
      sources: [1, 2],
    },
    open_source: {
      text: 'MIT, with one added condition: if you host the server or console as a service for other people\'s apps, you must show "Powered by hot-updater".',
      sources: [1],
    },
    rollback: {
      text: 'Rollbacks to earlier versions, automatic crash rollback, version targeting rules, and rollout cohorts.',
      sources: [2, 3],
    },
    support: {
      text: 'Community support through GitHub. No paid support plan is listed.',
      sources: [1, 2],
    },
    company: {
      text: 'Open-source project maintained by gronxb on GitHub, with about 1.8k stars.',
      sources: [1],
    },
  },
  better: [
    {
      title: 'Your app is React Native',
      text: 'Capgo does not update React Native apps. Hot Updater is built for React Native and works with Expo build adapters.',
      sources: [1],
    },
    {
      title: 'You want zero vendor fees',
      text: 'Hot Updater is free and runs in your own cloud account, so your only cost is your provider bill.',
      sources: [1, 3],
    },
    {
      title: 'You already run Supabase or Cloudflare',
      text: 'Ready-made storage and database adapters for Supabase, Cloudflare R2 and D1, AWS, and Firebase fit into infrastructure you already pay for.',
      sources: [1],
    },
  ],
  alternatives: [
    {
      name: 'Expo EAS Update',
      text: 'Managed updates for Expo and React Native. Less setup than self-hosting, priced by monthly active users.',
      href: 'alternatives/expo',
    },
    {
      name: 'Revopush',
      text: 'Hosted CodePush replacement for React Native with a free tier up to 1K MAU and CodePush SDK compatibility.',
      href: 'alternatives/revopush',
    },
    {
      name: 'Stallion',
      text: 'Managed React Native OTA with patch updates, crash-aware rollback, and an on-premise option for large teams.',
      href: 'alternatives/stallion',
    },
    {
      name: 'Standalone CodePush server',
      text: 'Microsoft\'s open-source CodePush server on your own infrastructure, for teams that want to keep the CodePush SDK.',
      href: 'alternatives/codepush',
    },
    {
      name: 'Pushy',
      text: 'React Native hot updates with Hermes-optimized diff patches and a free plan.',
      href: 'alternatives/pushy',
    },
  ],
  migration: {
    title: 'Move to Capacitor and Capgo',
    lead: 'React Native code does not port directly to Capacitor. This path fits teams with an existing web app or teams ready to build the UI with web technologies.',
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
      question: 'Is Hot Updater really free?',
      answer:
        'The software is free under MIT with a branding condition for hosted resale. You still pay for the storage, database, and bandwidth it uses in your own cloud account.',
    },
    {
      question: 'Can Capgo replace Hot Updater for React Native?',
      answer:
        'No. Capgo supports Capacitor, Cordova, and Electron apps. If you stay on React Native, compare Hot Updater with Expo EAS Update, Revopush, Stallion, and Pushy.',
    },
    {
      question: 'Can I self-host Capgo like Hot Updater?',
      answer:
        'Yes. The Capgo updater plugin is MPL-2.0 and the backend is AGPL-3.0, so you can point the plugin at your own update server or use licensed self-hosting on Enterprise.',
    },
    {
      question: 'What do I get from a managed service instead?',
      answer:
        'No servers to run, uptime and CDN handled for you, progressive rollouts, automatic rollback, cloud native builds, and direct support. Capgo starts at $12 per month billed yearly.',
    },
  ],
}
