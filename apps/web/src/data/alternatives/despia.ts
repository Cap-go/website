import type { AlternativeCompetitor } from './types'

export const despia: AlternativeCompetitor = {
  slug: 'despia',
  name: 'Despia',
  category: 'web-to-app',
  metaTitle: 'Best Despia Alternative in 2026 | Capgo',
  metaDescription:
    'Compare Despia and Capgo for shipping a web app to iOS and Android. One-time Despia packs vs open-source Capacitor with live updates, rollback, cloud builds.',
  keywords: 'despia alternative, despia vs capgo, despia vs capacitor, web app to native app, lovable to app store, despia pricing',
  eyebrow: 'Despia vs Capgo',
  heading: 'Despia alternative: Capacitor and Capgo for web apps',
  lead: 'Despia wraps any web app in its native runtime and sells one-time packs. Capacitor with Capgo gives you an open-source native project you own, plus live updates with channels, rollback, and cloud builds.',
  verdict:
    'Choose Despia if you want a one-time price, a no-code dashboard, and a hosted runtime that loads your web build. Choose Capacitor with Capgo if you want an open-source native project, a large plugin ecosystem, and controlled releases with channels, progressive rollouts, and automatic rollback.',
  status: 'Web-to-app runtime',
  sources: [
    { label: 'Despia homepage and pricing', href: 'https://www.despia.com/' },
    { label: 'Despia documentation', href: 'https://setup.despia.com/' },
    { label: 'Despia docs: Local Server', href: 'https://setup.despia.com/local-server/introduction' },
  ],
  rows: {
    pricing: {
      text: 'One-time payments: Solo Pack $249 (one platform, 200 M2 build minutes) and Hybrid Pack $498 (iOS and Android, 400 M2 build minutes). Platform API for white-label use is quote-based.',
      sources: [1],
    },
    ota: {
      text: 'By default the app loads your current build from your own hosting on launch. The optional Local Server caches the full web build on device and applies a new version atomically on the next launch. Native changes need a store release.',
      sources: [2, 3],
    },
    native_builds: {
      text: 'Builds run on Apple Silicon M2 machines in the Despia cloud, with one-click submission to the App Store and Google Play. Build minutes come with each pack.',
      sources: [1],
    },
    frameworks: {
      text: 'Any web stack, including React, Vue, Svelte, and plain HTML. Native features are called from JavaScript through the despia() SDK or no-code plugins.',
      sources: [1],
    },
    open_source: {
      text: 'The JavaScript SDK, the @despia/local bundler, and despia-version-guard are MIT licensed. Full Xcode and Android Studio source export is included; the docs do not state a license for the native runtime.',
      sources: [1, 2],
    },
    rollback: {
      text: 'No channels or rollback controls are described in the docs. In remote mode the app shows what your hosting serves, so rollback follows your web deploys.',
      sources: [2, 3],
    },
    support: {
      text: 'Documentation, an MCP server for AI tools, and contact by email at hey@despia.com. Enterprise sales for the Platform API.',
      sources: [1, 2],
    },
    company: {
      text: 'Despia LLC-FZ, based in Dubai, UAE. Formerly Advanced WebView, with the runtime dating back to 2011.',
      sources: [1],
    },
  },
  better: [
    {
      title: 'You want to pay once',
      text: 'Despia sells one-time packs from $249 per platform with build minutes included, while Capgo is a monthly or yearly subscription.',
      sources: [1],
    },
    {
      title: 'You build with no-code or AI tools',
      text: 'Despia offers no-code plugins and an MCP server, so teams working in AI or no-code builders can add native features without touching Xcode.',
      sources: [1, 2],
    },
    {
      title: 'You need a white-label runtime for your platform',
      text: 'The Despia Platform API adds white-label apps and a custom-branded runtime to a no-code or AI platform.',
      sources: [1],
    },
  ],
  alternatives: [
    { name: 'Median', text: 'Managed web-to-app platform with a free tier for testing. Fits no-code sites, with yearly fees for paid licenses.', href: 'alternatives/median' },
    { name: 'Natively', text: 'Website-to-app wrapper popular with Bubble users, with a free test tier and a lifetime option.', href: 'alternatives/natively' },
    { name: 'WebToNative', text: 'Low-cost website-to-app builder with monthly, yearly, and one-time plans. The app loads your live site.', href: 'alternatives/webtonative' },
    { name: 'PWABuilder', text: 'Free, open-source Microsoft tool that packages a PWA for the Microsoft Store, Google Play, and the App Store.', href: 'alternatives/pwabuilder' },
    { name: 'VoltBuilder', text: 'Cloud builds for Cordova and Capacitor projects without a Mac. No live update service.', href: 'alternatives/voltbuilder' },
  ],
  migration: {
    title: 'Move from Despia to Capacitor and Capgo',
    lead: 'Your web app stays the same. You replace the Despia runtime with a Capacitor native project and swap despia() calls for Capacitor plugins.',
    steps: [
      {
        title: 'Add Capacitor to your web app',
        html: 'Run <code>bun add @capacitor/core @capacitor/cli</code>, then <code>bunx cap init</code> and add the platforms with <code>bunx cap add ios</code> and <code>bunx cap add android</code>.',
      },
      {
        title: 'Swap despia() calls for plugins',
        html: 'Replace push, in-app purchases, biometrics, haptics, and deep links with Capacitor plugins, for example <code>@capacitor/push-notifications</code> and <code>@capacitor/haptics</code>.',
      },
      {
        title: 'Set up live updates and builds',
        html: 'Run <code>bunx @capgo/cli@latest init</code> to install the updater, then ship web changes with <code>bunx @capgo/cli@latest bundle upload</code> and build binaries in Capgo Cloud.',
      },
    ],
  },
  faq: [
    {
      question: 'Is Despia a webview?',
      answer: 'Despia runs your web app inside its native runtime and exposes native features through a JavaScript SDK. Capacitor works the same way at the core, with your web app in a native WebView and plugins for native APIs.',
    },
    {
      question: 'Does Despia have live updates?',
      answer: 'Yes. By default the app loads your build from your hosting, and the optional Local Server caches it on device and updates on the next launch. Capgo adds channels, progressive rollouts, update statistics, and automatic rollback on top of bundles that ship inside the app.',
    },
    {
      question: 'Is Despia cheaper than Capgo?',
      answer: 'For a single app that rarely changes, the Despia one-time pack can cost less. Capgo is a subscription from $12/month billed yearly, which covers live updates and cloud native builds for apps that ship often.',
    },
    {
      question: 'Can I leave Despia later?',
      answer: 'Despia includes a source code export of the Xcode and Android Studio projects. Moving to Capacitor means replacing despia() calls with Capacitor plugins while your web code stays as it is.',
    },
    {
      question: 'When should I choose Capgo?',
      answer: 'Choose Capgo when you want an open-source Capacitor app you control, with live updates, channels, rollback, cloud builds, and the option to self-host the update server.',
    },
  ],
}
