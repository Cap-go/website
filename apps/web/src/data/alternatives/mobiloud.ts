import type { AlternativeCompetitor } from './types'

export const mobiloud: AlternativeCompetitor = {
  slug: 'mobiloud',
  name: 'MobiLoud',
  category: 'web-to-app',
  metaTitle: 'Best MobiLoud Alternative in 2026 | Capgo',
  metaDescription:
    'Compare MobiLoud and Capgo. A managed ecommerce app service from $1,499/month vs Capacitor with Capgo live updates and cloud builds from $12/month.',
  keywords: 'mobiloud alternative, mobiloud vs capgo, mobiloud pricing, shopify app builder alternative, website to app, capacitor',
  eyebrow: 'MobiLoud vs Capgo',
  heading: 'MobiLoud alternative: own your app with Capacitor',
  lead: 'MobiLoud is a done-for-you service that turns ecommerce stores into apps and maintains them for a monthly fee. Capacitor with Capgo is for teams that want to build and ship the app themselves, at a fraction of the cost.',
  verdict:
    'Choose MobiLoud if you run an ecommerce brand, have no mobile team, and want a managed service with push marketing guidance. Choose Capacitor with Capgo if you have web developers and want to own the native project, ship live updates, and keep costs low.',
  status: 'Managed ecommerce app service',
  sources: [
    { label: 'MobiLoud pricing', href: 'https://www.mobiloud.com/pricing' },
    { label: 'About MobiLoud', href: 'https://www.mobiloud.com/about' },
    { label: 'How MobiLoud works', href: 'https://www.mobiloud.com/how-it-works' },
  ],
  rows: {
    pricing: {
      text: 'Business is $1,499/month, or $1,274/month billed annually, up to 10,000 monthly active users, then $50 per extra 1,000 MAU. Plus a one-time app development and submission fee. Enterprise is custom.',
      sources: [1],
    },
    ota: {
      text: 'The app is built on your existing website, so site changes appear in the app automatically. Native changes are made and released by the MobiLoud team.',
      sources: [1, 2],
    },
    native_builds: {
      text: 'The MobiLoud team builds, tests, and submits the iOS and Android apps, typically live in 6 to 8 weeks. Apps publish under your own developer accounts.',
      sources: [1, 3],
    },
    frameworks: {
      text: 'Ecommerce sites on Shopify, Shopify Plus, BigCommerce, Adobe Commerce, Magento, Salesforce Commerce Cloud, WooCommerce, PrestaShop, and custom or headless stacks.',
      sources: [2],
    },
    open_source: {
      text: 'Closed, managed platform. MobiLoud keeps the platform; on request it exports your app configurations and native build settings within 30 days after the engagement ends.',
      sources: [1],
    },
    rollback: {
      text: 'Not exposed as a feature: web content follows your site deploys, and native releases are handled by MobiLoud.',
      sources: [1, 2],
    },
    support: {
      text: 'Customer success, launch, and push marketing guidance on Business. Enterprise adds a dedicated success manager, weekly meetings, an SLA, and 24/7 support.',
      sources: [1, 3],
    },
    company: {
      text: 'Fifty Pixels Ltd, founded in 2013 by Pietro Saccomani and bootstrapped. 2,000+ apps published since 2013.',
      sources: [1, 2],
    },
  },
  better: [
    {
      title: 'You have no mobile or web developers',
      text: 'MobiLoud builds, designs, submits, and maintains the app for you, including native updates when your site, vendors, or OS versions change.',
      sources: [1],
    },
    {
      title: 'You want app marketing help',
      text: 'Plans include launch support, push notification programs, cart abandonment sequences, and customer success guidance focused on ecommerce revenue.',
      sources: [1, 3],
    },
    {
      title: 'You need an enterprise contract and SLA',
      text: 'Enterprise offers custom contracts, an SLA with 24/7 support, and a dedicated success manager.',
      sources: [1],
    },
  ],
  alternatives: [
    { name: 'Median', text: 'Self-serve web-to-app platform with optional managed plans. Much cheaper entry than MobiLoud.', href: 'alternatives/median' },
    { name: 'AppMySite', text: 'No-code builder with WordPress, WooCommerce, and Shopify sync and a free Android tier.', href: 'alternatives/appmysite' },
    { name: 'Natively', text: 'Low-cost website-to-app wrapper with store publishing and a done-for-you option.', href: 'alternatives/natively' },
    { name: 'WebToNative', text: 'Budget website-to-app builder with monthly, yearly, and one-time plans.', href: 'alternatives/webtonative' },
    { name: 'Despia', text: 'One-time priced runtime for web apps, with source code export and cloud builds.', href: 'alternatives/despia' },
  ],
  migration: {
    title: 'Move from MobiLoud to Capacitor and Capgo',
    lead: 'MobiLoud apps publish under your own developer accounts, so a Capacitor build can ship as an update to the same store listings.',
    steps: [
      {
        title: 'Create a Capacitor app around your site',
        html: 'In your web project run <code>bun add @capacitor/core @capacitor/cli</code> and <code>bunx cap init</code>, using the same bundle ID as your current store listing.',
      },
      {
        title: 'Add native features with plugins',
        html: 'Add push, deep links, and analytics with plugins such as <code>@capacitor/push-notifications</code>, then run <code>bunx cap add ios</code> and <code>bunx cap add android</code>.',
      },
      {
        title: 'Ship with Capgo',
        html: 'Run <code>bunx @capgo/cli@latest init</code>, build signed binaries in Capgo Cloud, and push later web changes with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'How much does MobiLoud cost compared to Capgo?',
      answer: 'MobiLoud Business is $1,499/month, or $1,274/month billed annually, plus a one-time development fee. Capgo starts at $12/month billed yearly, but you or your developers build the app with Capacitor.',
    },
    {
      question: 'Is MobiLoud a service or a tool?',
      answer: 'MobiLoud is a managed service: its team builds, launches, and maintains your app. Capgo is a tool for developers, with live updates and cloud native builds for Capacitor apps.',
    },
    {
      question: 'Can I keep my store listings if I leave MobiLoud?',
      answer: 'Yes. MobiLoud apps publish under your own Apple and Google accounts, and a new app ships as an update to the same listing, so your users and ratings carry over.',
    },
    {
      question: 'When should I choose Capgo?',
      answer: 'Choose Capgo when you have web developers, want to own the native code, and want live updates, channels, rollback, and cloud builds without a per-user monthly fee.',
    },
  ],
}
