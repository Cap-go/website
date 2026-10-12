import type { AlternativeCompetitor } from './types'

export const natively: AlternativeCompetitor = {
  slug: 'natively',
  name: 'Natively',
  category: 'web-to-app',
  metaTitle: 'Best Natively Alternative in 2026 | Capgo',
  metaDescription:
    'Compare Natively (BuildNatively) and Capgo. A no-code website-to-app wrapper vs Capacitor with live updates, rollback, and cloud native builds.',
  keywords: 'natively alternative, buildnatively alternative, natively vs capgo, bubble to app, website to app, capacitor',
  eyebrow: 'Natively vs Capgo',
  heading: 'Natively alternative: Capacitor and Capgo for web apps',
  lead: 'Natively (BuildNatively) wraps your website in a native WebView shell with no code. Capacitor with Capgo gives developers an open-source native project, plugins, and controlled live updates.',
  verdict:
    'Choose Natively if you build on Bubble or another no-code tool and want an app in the stores without touching native code. Choose Capacitor with Capgo if you have developers and want an open-source app you own, with channels, rollback, and cloud builds.',
  status: 'No-code website-to-app',
  sources: [
    { label: 'Natively pricing', href: 'https://buildnatively.com/pricing' },
    { label: 'Natively documentation', href: 'https://docs.buildnatively.com/' },
    { label: 'Natively homepage', href: 'https://buildnatively.com/' },
  ],
  rows: {
    pricing: {
      text: 'Free to test (no binaries or publishing). Essential $19/month or $12/month billed yearly with 4 rebuilds. Unlimited $49/month or $32/month yearly. Lifetime $699 once. Store publishing service from $600.',
      sources: [1],
    },
    ota: {
      text: 'The app shows your live website, so site changes appear without a rebuild or store review. Dashboard changes such as features, icon, or permissions need a rebuild.',
      sources: [2, 3],
    },
    native_builds: {
      text: 'Natively builds IPA, APK, and AAB files in its cloud, with automatic iOS upload on paid plans.',
      sources: [1],
    },
    frameworks: {
      text: 'Any website, with Bubble, Webflow, Wix, WordPress, Shopify, Lovable, Base44, and Replit projects highlighted. Native features via the dashboard, a JS SDK, or the Bubble plugin.',
      sources: [2, 3],
    },
    open_source: {
      text: 'Closed, managed platform. The native shell is provided by Natively and is not published as open source.',
      sources: [2],
    },
    rollback: {
      text: 'Not applicable: the app loads your website, so rollback follows your web deploys.',
      sources: [2],
    },
    support: {
      text: 'Community support on Free, standard support on Essential, dedicated support and App Store approval help on Unlimited. Discord community and paid custom development.',
      sources: [1],
    },
    company: {
      text: 'BuildNatively, a team from Ukraine. 9,500+ apps created with Natively.',
      sources: [1, 3],
    },
  },
  better: [
    {
      title: 'Your app is built on Bubble',
      text: 'Natively has a dedicated Bubble plugin for native features, so Bubble apps can ship without native code.',
      sources: [2, 3],
    },
    {
      title: 'You want a one-time price',
      text: 'The Lifetime plan is $699 once with the same features as Unlimited, which can cost less than a subscription over several years.',
      sources: [1],
    },
    {
      title: 'You need someone to publish for you',
      text: 'Natively offers a paid App Store publishing service from $600 and custom development from $2,000.',
      sources: [1],
    },
  ],
  alternatives: [
    { name: 'Despia', text: 'One-time priced web-to-app runtime with an offline local server and source code export.', href: 'alternatives/despia' },
    { name: 'Median', text: 'Established web-to-app platform with a free test license and managed plans.', href: 'alternatives/median' },
    { name: 'WebToNative', text: 'Budget website-to-app builder with many add-ons and paid publishing.', href: 'alternatives/webtonative' },
    { name: 'AppMySite', text: 'No-code app builder with WordPress and WooCommerce sync and a free Android tier.', href: 'alternatives/appmysite' },
    { name: 'PWABuilder', text: 'Free, open-source Microsoft tool for packaging a PWA for app stores.', href: 'alternatives/pwabuilder' },
  ],
  migration: {
    title: 'Move from Natively to Capacitor and Capgo',
    lead: 'Natively loads your website, so the move is about building a Capacitor shell around the same web app and replacing Natively SDK calls.',
    steps: [
      {
        title: 'Add Capacitor',
        html: 'In your web project run <code>bun add @capacitor/core @capacitor/cli</code>, <code>bunx cap init</code>, <code>bunx cap add ios</code>, and <code>bunx cap add android</code>.',
      },
      {
        title: 'Replace Natively SDK calls',
        html: 'Swap push, purchases, biometrics, and scanning calls for Capacitor plugins such as <code>@capacitor/push-notifications</code>.',
      },
      {
        title: 'Ship with Capgo',
        html: 'Run <code>bunx @capgo/cli@latest init</code>, build in Capgo Cloud, and push web updates with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Is Natively the same as natively.dev?',
      answer: 'No. This page covers Natively by BuildNatively (buildnatively.com), a website-to-app wrapper. natively.dev was a separate AI app builder that now redirects to Newly.',
    },
    {
      question: 'Does Natively support live updates?',
      answer: 'The app loads your website, so web changes appear immediately. There are no update bundles, channels, or rollback controls. Capgo ships bundles inside the app with channels, progressive rollouts, and automatic rollback.',
    },
    {
      question: 'Is Natively cheaper than Capgo?',
      answer: 'Natively Essential is $12/month billed yearly with 4 rebuilds, about the same entry price as Capgo. Capgo includes cloud build time and live updates for Capacitor apps you fully own.',
    },
    {
      question: 'When should I choose Capgo?',
      answer: 'Choose Capgo when you have developers and want an open-source Capacitor app with full native access, live updates, rollback, and the option to self-host.',
    },
  ],
}
