import type { AlternativeCompetitor } from './types'

export const otakit: AlternativeCompetitor = {
  slug: 'otakit',
  name: 'OtaKit',
  category: 'live-updates',
  metaTitle: 'Best OtaKit Alternative in 2026 | Capgo',
  metaDescription:
    'Compare OtaKit and Capgo for Capacitor live updates: pricing, rollback, channels, native builds, open source, and support. See which OTA tool fits your team.',
  keywords: 'OtaKit alternative, OtaKit vs Capgo, Capacitor live updates, Capacitor OTA updates, Capgo alternative',
  eyebrow: 'OtaKit vs Capgo',
  heading: 'OtaKit vs Capgo: Capacitor live updates compared',
  lead:
    'OtaKit and Capgo both ship web-layer updates to Capacitor apps without store review. OtaKit is a newer, MIT-licensed project with a free tier. Capgo adds cloud native builds, a larger production track record, and direct support from the team.',
  verdict:
    'Choose OtaKit for a small, low-cost Capacitor app where a free tier matters most. Choose Capgo when live updates are part of a production release process that also needs native builds, progressive rollouts, and proven scale.',
  status: 'Capacitor live updates',
  sources: [
    { label: 'OtaKit website and pricing', href: 'https://otakit.app' },
    { label: 'OtaKit on GitHub', href: 'https://github.com/OtaKit/otakit' },
  ],
  rows: {
    pricing: {
      text: 'Free up to 5,000 updates/month. Starter $10/month for 100,000 updates. Pro $25/month billed yearly ($50 monthly) for 1,000,000 updates. Enterprise on request.',
      sources: [1],
    },
    ota: {
      text: 'Ships web-layer changes to Capacitor apps with delta downloads, signed manifests, SHA-256 checks, and optional end-to-end encryption.',
      sources: [1],
    },
    native_builds: {
      text: 'No native build service in OtaKit itself. You build and publish the store binaries yourself. The site promotes NoMac, a separate iOS build service.',
      sources: [1],
    },
    frameworks: {
      text: 'Capacitor apps only, through the @otakit/capacitor-updater plugin.',
      sources: [1, 2],
    },
    open_source: {
      text: 'MIT-licensed. Self-hostable with a Next.js console, Postgres, and S3-compatible storage behind a CDN.',
      sources: [1, 2],
    },
    rollback: {
      text: 'Automatic rollback when notifyAppReady() is not called in time, release channels switchable at runtime, and instant rollback per channel.',
      sources: [1, 2],
    },
    support: {
      text: 'GitHub issues and contact form. Priority support on Pro, dedicated support and SLAs on Enterprise.',
      sources: [1, 2],
    },
    company: {
      text: 'Young project from the OtaKit GitHub organization. The site reports 1,000+ apps registered and 20M+ updates delivered.',
      sources: [1, 2],
    },
  },
  better: [
    {
      title: 'You need a free plan',
      text: 'OtaKit has a free tier with 5,000 updates per month. Capgo has a 14-day free trial but no free plan.',
      sources: [1],
    },
    {
      title: 'You want an MIT-licensed backend',
      text: 'The whole OtaKit stack is under MIT. Capgo\'s backend is AGPL-3.0, which matters to some teams that modify and host it.',
      sources: [2],
    },
    {
      title: 'Your app is small and budget is tight',
      text: 'The $10/month Starter plan covers 100,000 updates, which is enough for many small apps.',
      sources: [1],
    },
  ],
  alternatives: [
    {
      name: 'Capawesome Cloud',
      text: 'Live updates and native builds for Capacitor from a team that maintains many Capacitor plugins. A good fit if you already use their plugins.',
      href: 'alternatives/capawesome',
    },
    {
      name: 'Ionic Appflow',
      text: 'Ionic\'s hosted live updates and builds. Closed to new customers since February 2025, with access ending December 31, 2027.',
      href: 'alternatives/ionic-appflow',
    },
    {
      name: 'Self-hosted Capgo',
      text: 'Run the open-source Capgo updater plugin against your own update server. Full control, but you own uptime, storage, and security.',
      href: 'https://capgo.app/docs/plugins/updater/self-hosted/getting-started/',
    },
    {
      name: 'Expo EAS Update',
      text: 'The managed update service for Expo and React Native. Only relevant if you are moving away from Capacitor to React Native.',
      href: 'alternatives/expo',
    },
  ],
  migration: {
    title: 'Move from OtaKit to Capgo',
    lead: 'Both tools update the web layer of a Capacitor app, so the move is a plugin swap plus one store release. Your web code does not change.',
    steps: [
      {
        title: 'Swap the updater plugin',
        html: 'Remove <code>@otakit/capacitor-updater</code>, then run <code>bunx @capgo/cli@latest init</code> to install the Capgo updater and create your app.',
      },
      {
        title: 'Ship one store release',
        html: 'Run <code>bunx cap sync</code> and publish a new binary so devices get the Capgo plugin. Keep <code>notifyAppReady()</code> in your startup code.',
      },
      {
        title: 'Upload bundles with Capgo',
        html: 'Replace <code>otakit upload</code> in CI with <code>bunx @capgo/cli@latest bundle upload --channel production</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Is OtaKit a good Capgo alternative?',
      answer:
        'For small Capacitor apps, yes. It covers the core live update features with a free tier. Capgo is the better fit when you also need native cloud builds, progressive rollouts, and a service that already delivers over 1 billion updates per month.',
    },
    {
      question: 'Can I self-host both?',
      answer:
        'Yes. OtaKit is MIT-licensed and self-hostable. Capgo\'s updater plugin is MPL-2.0 and its backend is AGPL-3.0, so you can run your own update server or use licensed self-hosting on Enterprise.',
    },
    {
      question: 'Does OtaKit build iOS and Android apps?',
      answer:
        'Not as part of OtaKit. You build the store binaries yourself. Capgo Builder builds and signs iOS and Android apps in the cloud, typically in 2 to 3 minutes.',
    },
    {
      question: 'Is moving from OtaKit to Capgo hard?',
      answer:
        'No. Both use a Capacitor plugin with a ready signal on startup. You swap the plugin, ship one store release, and change the upload command in CI.',
    },
  ],
}
