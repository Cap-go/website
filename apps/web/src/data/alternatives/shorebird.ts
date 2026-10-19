import type { AlternativeCompetitor } from './types'

export const shorebird: AlternativeCompetitor = {
  slug: 'shorebird',
  name: 'Shorebird',
  category: 'live-updates',
  publishedAt: '2026-10-12',
  updatedAt: '2026-10-13',
  metaTitle: 'Best Shorebird Alternative in 2026 | Capgo',
  metaDescription:
    'Shorebird vs Capgo: Flutter code push or Capacitor live updates with cloud native builds. Compare pricing, what you can update, rollback, and open source.',
  keywords: 'Shorebird alternative, Shorebird vs Capgo, Flutter code push, Flutter OTA updates, Capacitor live updates, Flutter alternative',
  eyebrow: 'Shorebird vs Capgo',
  heading: 'Shorebird vs Capgo: Flutter code push or Capacitor?',
  lead:
    'Shorebird brings code push to Flutter, patching Dart code without a store release. Capgo does the same for Capacitor apps, which run your React, Vue, Angular, or Svelte web app on iOS and Android, and adds cloud native builds.',
  verdict:
    'If your app is Flutter, Shorebird is the code push tool built for it, from the creator of Flutter. If your team already writes web code, Capacitor with Capgo lets one codebase serve web and mobile, updates JavaScript, HTML, CSS, and assets, and builds your binaries in the cloud.',
  status: 'Flutter code push',
  sources: [
    { label: 'Shorebird pricing', href: 'https://shorebird.dev/pricing' },
    { label: 'Shorebird docs: Code Push', href: 'https://docs.shorebird.dev/code-push/' },
    { label: 'Shorebird docs: Rollback', href: 'https://docs.shorebird.dev/code-push/rollback/' },
    { label: 'Shorebird on GitHub', href: 'https://github.com/shorebirdtech/shorebird' },
    { label: 'About Shorebird', href: 'https://shorebird.dev/about' },
  ],
  rows: {
    pricing: {
      text: 'Free up to 5,000 patch installs/month. Pro $20/month for 50,000, Business $400/month for 1,000,000, then $1 per 2,500 installs. Enterprise custom.',
      sources: [1],
    },
    ota: {
      text: 'Patches any Dart code and pure-Dart dependencies. Assets, native code, and Flutter engine changes still need a store release.',
      sources: [2],
    },
    native_builds: {
      text: 'You build releases through the Shorebird CLI on your own machine or CI. Shorebird also sells Shorebird CI as a separate product.',
      sources: [1, 2],
    },
    frameworks: {
      text: 'Flutter only. Dart patching works on Android, iOS, macOS, Windows, and Linux.',
      sources: [2],
    },
    open_source: {
      text: 'The shorebird repository is dual-licensed Apache 2.0 or MIT. Patch hosting runs on the Shorebird cloud service.',
      sources: [1, 4],
    },
    rollback: {
      text: 'Manual rollback and roll forward from the Console or CLI. Devices discard patches that fail integrity checks or will not load. Staging tracks for testing.',
      sources: [1, 3],
    },
    support: {
      text: 'Community Discord on Free, email on Pro, private Discord on Business, private Discord or Slack on Enterprise.',
      sources: [1],
    },
    company: {
      text: 'Founded in 2023 by Eric Seidel, creator of Flutter, and backed by Accel.',
      sources: [5],
    },
  },
  capgoRows: {
    ota: 'Ships JavaScript, HTML, CSS, and asset changes, including images and fonts, without store review, with delta downloads and end-to-end encryption. 1B+ updates per month.',
  },
  better: [
    {
      title: 'Your app is Flutter',
      text: 'Capgo does not update Flutter apps. Shorebird is built for Flutter and lets you patch Dart code without a rewrite.',
      sources: [2],
    },
    {
      title: 'You also ship Flutter desktop apps',
      text: 'Shorebird patches Dart code on macOS, Windows, and Linux as well as Android and iOS.',
      sources: [2],
    },
    {
      title: 'You want a free tier',
      text: 'Shorebird Free covers 5,000 patch installs per month. Capgo has a 14-day trial but no free plan.',
      sources: [1],
    },
  ],
  alternatives: [
    {
      name: 'Flutter without code push',
      text: 'Ship every fix through the App Store and Google Play. No extra cost, but every change waits for store review.',
      href: 'alternatives/flutter',
    },
    {
      name: 'Expo EAS Update',
      text: 'If you are open to React Native, EAS Update gives managed JavaScript updates inside the Expo toolchain.',
      href: 'alternatives/expo',
    },
    {
      name: 'Codemagic',
      text: 'CI/CD built with Flutter in mind. Automates builds and store uploads, and offers OTA updates for React Native and Capacitor, not Flutter.',
      href: 'alternatives/codemagic',
    },
    {
      name: 'Stallion',
      text: 'Managed OTA for React Native, for teams leaving Flutter for React Native.',
      href: 'alternatives/stallion',
    },
  ],
  migration: {
    title: 'Move from Flutter to Capacitor and Capgo',
    lead: 'Dart and Flutter widgets do not port to Capacitor. This path fits teams that have, or want, a web app, and want the same code on web, iOS, and Android.',
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
      question: 'Can Capgo push updates to a Flutter app?',
      answer:
        'No. Capgo supports Capacitor, Cordova, and Electron apps. For Flutter, Shorebird is the main code push option.',
    },
    {
      question: 'What can Shorebird not update?',
      answer:
        'Shorebird patches Dart code. Assets such as images and fonts, native code, and Flutter engine changes need a new store release. Capgo live updates cover web code and assets; native code changes also need a store release.',
    },
    {
      question: 'Does Shorebird roll back bad patches automatically?',
      answer:
        'Devices drop patches that fail integrity checks or will not load, but rolling back a published patch is a manual action in the Console or CLI. Capgo rolls back automatically when a bundle fails to start.',
    },
    {
      question: 'How does pricing compare?',
      answer:
        'Shorebird is free up to 5,000 patch installs per month, then $20 per month for 50,000. Capgo starts at $12 per month billed yearly with a 14-day free trial, and native build time is included.',
    },
    {
      question: 'Why would a Flutter team look at Capacitor?',
      answer:
        'Teams that also maintain a web app can share one codebase across web, iOS, and Android with Capacitor, hire from the larger web developer pool, and use Capgo for live updates and cloud builds.',
    },
  ],
}
