import type { AlternativeCompetitor } from './types'

export const revopush: AlternativeCompetitor = {
  slug: 'revopush',
  name: 'Revopush',
  category: 'live-updates',
  metaTitle: 'Best Revopush Alternative in 2026 | Capgo',
  metaDescription:
    'Revopush vs Capgo: CodePush-compatible React Native updates or Capacitor live updates with cloud builds. Compare pricing, rollback, open source, and support.',
  keywords: 'Revopush alternative, Revopush vs Capgo, CodePush alternative, React Native OTA updates, Capacitor live updates',
  eyebrow: 'Revopush vs Capgo',
  heading: 'Revopush vs Capgo: which OTA update service fits?',
  lead:
    'Revopush is a hosted CodePush replacement for React Native and Expo apps. Capgo does the same job for Capacitor apps, the stack that turns any React, Vue, Angular, or Svelte web app into iOS and Android apps, and adds cloud native builds.',
  verdict:
    'If your app is React Native and you want to keep the CodePush SDK, Revopush is a direct fit. If you are building with web skills, Capacitor with Capgo gives you one codebase for web and mobile, live updates, native builds, and an open-source path you can self-host.',
  status: 'React Native OTA service',
  sources: [
    { label: 'Revopush pricing', href: 'https://revopush.org/pricing' },
    { label: 'Revopush website', href: 'https://revopush.org/' },
    { label: 'Revopush documentation', href: 'https://docs.revopush.org/' },
    { label: 'Revopush on GitHub', href: 'https://github.com/revopush' },
  ],
  rows: {
    pricing: {
      text: 'Free up to 1K MAU and 10 GB egress. Startup $25/month (50K MAU), Growing $100 (300K), Business $250 (500K), Professional $500 (1M). Overage $1 per 1,000 users and $0.03/GB.',
      sources: [1],
    },
    ota: {
      text: 'CodePush-compatible JavaScript bundle updates. Revopush 2.0 builds patches against the shipped IPA or APK, which it says makes updates 10 to 20 times smaller.',
      sources: [2, 3],
    },
    native_builds: {
      text: 'No native build service. It plugs into CI tools such as GitHub Actions, Bitrise, and CircleCI, where you build the app yourself.',
      sources: [2, 3],
    },
    frameworks: {
      text: 'React Native, including the New Architecture, and Expo projects. Not for Capacitor, Cordova, or Flutter.',
      sources: [2, 3],
    },
    open_source: {
      text: 'Open-source client SDK and CLI, forked from Microsoft CodePush. The hosted backend is proprietary. Enterprise can be deployed on AWS, GCP, or your provider.',
      sources: [1, 2, 4],
    },
    rollback: {
      text: 'Release rollback and gradual rollouts with adoption monitoring.',
      sources: [2],
    },
    support: {
      text: 'Community support on Free and Startup, then support, extended, and priority support on higher tiers.',
      sources: [1],
    },
    company: {
      text: 'Revopush, a UK-based team. The site reports 3,000+ applications and 300M+ MAU, and says it is working toward SOC 2 Type II.',
      sources: [2, 4],
    },
  },
  better: [
    {
      title: 'Your app is React Native',
      text: 'Capgo updates Capacitor, Cordova, and Electron apps, not React Native. Revopush supports React Native and Expo directly.',
      sources: [3],
    },
    {
      title: 'You are leaving App Center CodePush',
      text: 'Revopush keeps compatibility with the CodePush SDK and offers a migration path from App Center, so code changes stay small.',
      sources: [2, 3],
    },
    {
      title: 'You want a free tier',
      text: 'Revopush has a free Starter plan up to 1K MAU. Capgo has a 14-day trial but no free plan.',
      sources: [1],
    },
  ],
  alternatives: [
    {
      name: 'Expo EAS Update',
      text: 'The default managed update service for Expo and React Native apps, with tight Expo tooling integration.',
      href: 'alternatives/expo',
    },
    {
      name: 'Stallion',
      text: 'Managed React Native OTA with patch updates, crash-aware rollback, and a free tier up to 10,000 MAU.',
      href: 'alternatives/stallion',
    },
    {
      name: 'Hot Updater',
      text: 'Self-hosted, MIT-licensed React Native OTA that runs on your own Cloudflare, Supabase, AWS, or Firebase account.',
      href: 'alternatives/hot-updater',
    },
    {
      name: 'Pushy',
      text: 'React Native hot updates with Hermes-optimized diff patches, popular with teams serving China.',
      href: 'alternatives/pushy',
    },
    {
      name: 'Standalone CodePush server',
      text: 'Microsoft\'s open-source CodePush server, run on your own infrastructure. Full control, more operations work.',
      href: 'alternatives/codepush',
    },
  ],
  migration: {
    title: 'Move to Capacitor and Capgo',
    lead: 'There is no direct path from React Native to Capacitor. This route fits teams with a web app, or teams that want to rebuild the UI with web technologies.',
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
      question: 'Can Capgo update my React Native app?',
      answer:
        'No. Capgo supports Capacitor, Cordova, and Electron apps. For React Native, Revopush, Expo EAS Update, Stallion, Hot Updater, and Pushy are the options to compare.',
    },
    {
      question: 'Why compare Revopush with Capgo then?',
      answer:
        'Many teams choose their mobile stack and update service together. If your team already builds for the web, Capacitor with Capgo lets one codebase run on web, iOS, and Android with live updates and cloud builds.',
    },
    {
      question: 'Is Revopush open source?',
      answer:
        'The client SDK and CLI are open source forks of Microsoft CodePush. The hosted service is not. Capgo publishes its updater plugin under MPL-2.0 and its backend under AGPL-3.0.',
    },
    {
      question: 'How do the prices compare?',
      answer:
        'Revopush is free up to 1K MAU, then $25 to $500 per month by MAU tier. Capgo starts at $12 per month billed yearly with a 14-day free trial and includes native build time.',
    },
  ],
}
