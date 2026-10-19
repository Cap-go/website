import type { AlternativeCompetitor } from './types'

export const bitrise: AlternativeCompetitor = {
  slug: 'bitrise',
  name: 'Bitrise',
  category: 'ci-cd',
  publishedAt: '2026-10-12',
  updatedAt: '2026-10-13',
  metaTitle: 'Best Bitrise Alternative in 2026 | Capgo',
  metaDescription:
    'Compare Bitrise and Capgo for Capacitor apps. Capgo Builder signs iOS and Android builds in the cloud and adds live updates and rollback from $12/month.',
  keywords: 'Bitrise alternative, Bitrise vs Capgo, Capacitor CI/CD, Ionic cloud build, mobile CI/CD alternative, Capgo Builder, Capacitor live updates',
  eyebrow: 'Bitrise vs Capgo',
  heading: 'Bitrise alternative for Capacitor apps: Capgo',
  lead: 'Bitrise is a mobile CI/CD platform with a large step library, used by thousands of teams across native and cross-platform stacks. Capgo is built for Capacitor: Capgo Builder produces signed iOS and Android binaries in the cloud, and the same plan ships live updates so most fixes skip the store.',
  verdict:
    'Choose Bitrise if you run many apps across native, Flutter, and React Native, need test automation and release management in one CI platform, and have someone to maintain workflows. Choose Capgo if your app is Capacitor and you want native builds plus live updates, channels, and rollback from one tool at a fraction of the price.',
  status: 'Mobile CI/CD platform',
  sources: [
    { label: 'Bitrise pricing', href: 'https://bitrise.io/pricing' },
    { label: 'Bitrise CodePush', href: 'https://bitrise.io/platform/codepush' },
    { label: 'Bitrise docs: Ionic and Cordova apps', href: 'https://docs.bitrise.io/en/getting-started/quick-start-guides/getting-started-with-ionic-cordova-apps.html' },
    { label: 'About Bitrise', href: 'https://bitrise.io/about' },
  ],
  rows: {
    pricing: {
      text: 'Hobby is free with limited build credits and 1 private app. Starter from $89/month billed annually ($99 monthly) for up to 3 private apps. Pro from $200/month billed annually ($218 monthly). Enterprise is custom.',
      sources: [1],
    },
    ota: {
      text: 'Bitrise CodePush ships over-the-air updates for bare React Native and Expo apps, free up to 100,000 MAU and from $294/month on Pro. It does not list Capacitor or Ionic support.',
      sources: [1, 2],
    },
    native_builds: {
      text: 'Core product. Workflows of steps build, sign, test, and deploy to Google Play and App Store Connect. Dedicated steps exist for Ionic and Cordova; a Capacitor project is configured with the native iOS and Android steps.',
      sources: [1, 3],
    },
    frameworks: {
      text: 'iOS, Android, Flutter, React Native, Ionic, Cordova, and Unity.',
      sources: [3, 4],
    },
    open_source: {
      text: 'Proprietary hosted platform. Many workflow steps are community or Bitrise-maintained integrations.',
      sources: [4],
    },
    rollback: {
      text: 'No rollback for Capacitor apps beyond a new store build. For React Native CodePush, staged rollouts and one-click rollback to any prior bundle are included on all plans.',
      sources: [2],
    },
    support: {
      text: 'Community support on Hobby. Paid plans add Bitrise support, and Enterprise adds dedicated support and custom limits.',
      sources: [1],
    },
    company: {
      text: 'Bitrise, founded in 2014 as a spin-off of app agency Bitfall. Backed by Y Combinator, Partech, and Insight Partners with over $95M raised. Offices in San Francisco, London, and Budapest.',
      sources: [4],
    },
  },
  better: [
    {
      title: 'You run many apps across stacks',
      text: 'Bitrise builds iOS, Android, Flutter, React Native, Ionic, Cordova, and Unity apps from one platform. Capgo Builder is focused on Capacitor apps.',
      sources: [4],
    },
    {
      title: 'You need release management and testing in CI',
      text: 'Bitrise bundles test steps, caching, and a Release Management product for automated store distribution across many apps.',
      sources: [1, 3],
    },
    {
      title: 'Your app is React Native',
      text: 'Bitrise CodePush covers React Native and Expo with a free tier up to 100,000 MAU. Capgo live updates do not support React Native.',
      sources: [2],
    },
  ],
  alternatives: [
    {
      name: 'Codemagic',
      text: 'Mobile CI/CD with 500 free Mac minutes a month for individuals and a Capacitor quick start. Codemagic Patch adds self-hosted Capacitor live updates.',
      href: 'alternatives/codemagic',
    },
    {
      name: 'Appcircle',
      text: 'Mobile CI/CD with distribution, an enterprise app store, and a self-hosted option for regulated teams.',
      href: 'alternatives/appcircle',
    },
    {
      name: 'Ionic Appflow',
      text: 'Cloud builds and live updates for Ionic and Capacitor from the Ionic team. Check its current roadmap and pricing before committing.',
      href: 'alternatives/ionic-appflow',
    },
    {
      name: 'GitHub Actions',
      text: 'General CI with macOS runners next to your code. Flexible, but you own every signing and store upload step.',
      href: 'https://github.com/features/actions',
    },
    {
      name: 'Expo EAS',
      text: 'Builds and updates for React Native and Expo apps. A strong pick if you are on React Native rather than Capacitor.',
      href: 'alternatives/expo',
    },
  ],
  migration: {
    title: 'Move a Capacitor app from Bitrise to Capgo',
    lead: 'Your Capacitor project does not change. You replace the Bitrise build and deploy workflow with Capgo Builder and add live updates on top.',
    steps: [
      {
        title: 'Install the Capgo updater',
        html: 'Run <code>bunx @capgo/cli@latest init</code> in your Capacitor project to add the updater plugin and create your app in Capgo.',
      },
      {
        title: 'Move signing to Capgo Builder',
        html: 'Run <code>bunx @capgo/cli@latest build init</code> and store your certificates and keystore with <code>bunx @capgo/cli@latest build credentials save</code>.',
      },
      {
        title: 'Build and ship',
        html: 'Request native builds with <code>bunx @capgo/cli@latest build request --platform ios</code>, and ship web changes with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Can Bitrise build Capacitor apps?',
      answer: 'Yes, with configuration. Bitrise documents dedicated Ionic and Cordova steps, and a Capacitor project can be built with its native iOS and Android steps. You maintain that workflow yourself.',
    },
    {
      question: 'Does Bitrise CodePush work with Capacitor?',
      answer: 'Bitrise CodePush is listed for bare React Native and Expo apps. Capacitor apps need a service like Capgo for live updates.',
    },
    {
      question: 'Is Capgo cheaper than Bitrise?',
      answer: 'For a Capacitor app, usually yes. Bitrise Starter starts at $89/month billed annually for CI only. Capgo starts at $12/month billed yearly and includes native build time plus live updates.',
    },
    {
      question: 'Can I keep Bitrise and use Capgo for live updates?',
      answer: 'Yes. Keep Bitrise for native builds and add a step that runs the Capgo CLI bundle upload, so JavaScript, HTML, and CSS changes ship as live updates.',
    },
    {
      question: 'When should I choose Bitrise?',
      answer: 'Choose Bitrise when you manage many apps across native and cross-platform stacks and need test automation, caching, and release management in one CI platform.',
    },
  ],
}
