import type { AlternativeCompetitor } from './types'

export const lynx: AlternativeCompetitor = {
  slug: 'lynx',
  name: 'Lynx',
  category: 'framework',
  publishedAt: '2026-10-12',
  updatedAt: '2026-10-12',
  metaTitle: 'Best Lynx Alternative in 2026 | Capgo',
  metaDescription:
    'Compare ByteDance Lynx with Capacitor and Capgo. Run your existing web app on iOS and Android, ship live updates with rollback, and build in the cloud.',
  keywords: 'Lynx alternative, Lynx vs Capacitor, ReactLynx alternative, ByteDance Lynx framework, Lynx vs React Native, Capgo',
  eyebrow: 'Lynx vs Capgo',
  heading: 'Lynx alternative: Capacitor and Capgo',
  lead: 'Lynx is the cross-platform UI framework ByteDance open-sourced in March 2025. It renders natively from web-style markup, CSS, and ReactLynx. Capacitor with Capgo runs the web app you already have, with a mature plugin ecosystem, live updates, and cloud builds.',
  verdict:
    'Choose Lynx if you want native rendering with web-like authoring and are ready to work with a young ecosystem and a native host app. Choose Capacitor with Capgo if you want to ship your existing web app to the stores now, reuse any web framework and library, and push fixes in minutes with channels and rollback.',
  status: 'ByteDance UI framework',
  sources: [
    { label: 'Lynx GitHub repository', href: 'https://github.com/lynx-family/lynx' },
    { label: 'Lynx blog: Lynx, unlock native for more', href: 'https://lynxjs.org/blog/lynx-unlock-native-for-more.html' },
    { label: 'Lynx docs: Quick start', href: 'https://lynxjs.org/guide/start/quick-start.html' },
    { label: 'Lynx docs: Integrate with existing apps', href: 'https://lynxjs.org/guide/start/integrate-with-existing-apps.html' },
  ],
  rows: {
    pricing: {
      text: 'Free and open source under the Apache License 2.0. No paid services from the Lynx project.',
      sources: [1],
    },
    ota: {
      text: 'No official live update service. The host app supplies a template provider that decides where the Lynx bundle comes from, so remote delivery, versioning, and rollback are yours to build.',
      sources: [4],
    },
    native_builds: {
      text: 'Rspeedy builds the JavaScript bundle. You add Lynx to a native host app through CocoaPods and Gradle and build it with Xcode and Android Studio. No hosted build service.',
      sources: [2, 4],
    },
    frameworks: {
      text: 'Web-style markup and CSS with ReactLynx as the first framework, running on the PrimJS engine with a dual-thread model. Renders natively on Android, iOS, and web.',
      sources: [1, 2],
    },
    open_source: {
      text: 'Apache License 2.0, developed in the lynx-family GitHub organization.',
      sources: [1],
    },
    rollback: {
      text: 'No built-in update rollback. Releases go through the stores unless you build your own bundle delivery.',
      sources: [4],
    },
    support: {
      text: 'Open-source community support through GitHub and the Lynx docs. Lynx Explorer lets you preview pages without a native toolchain.',
      sources: [1, 3],
    },
    company: {
      text: 'Built by a ByteDance engineering team that still drives development, with TikTok backing the open-source release. Open-sourced on March 5, 2025.',
      sources: [2],
    },
  },
  capgoRows: {
    pricing:
      'Capacitor is free and MIT-licensed. Capgo live updates and cloud builds start at $12/month billed yearly or $14 monthly, with a 14-day free trial and no credit card.',
    frameworks:
      'Your existing web app in React, Vue, Angular, Svelte, or Ionic, with the full browser DOM and npm ecosystem. The same code runs on the web, iOS, and Android.',
    open_source:
      'Capacitor is MIT. The Capgo updater plugin is MPL-2.0 and the backend is AGPL-3.0, so you can self-host the update server.',
  },
  better: [
    {
      title: 'You need native rendering with web-style authoring',
      text: 'Lynx renders natively instead of in a WebView and keeps the UI thread light with its dual-thread architecture, which suits animation-heavy, high-traffic surfaces.',
      sources: [1, 2],
    },
    {
      title: 'You are embedding screens in a large native app',
      text: 'Lynx is designed as a UI building block inside existing native apps through LynxView, which is how TikTok uses it for Search, Shop, and LIVE surfaces.',
      sources: [2, 4],
    },
    {
      title: 'You also target HarmonyOS',
      text: 'Lynx documents HarmonyOS integration and ships Lynx Explorer for the HarmonyOS simulator.',
      sources: [3, 4],
    },
  ],
  alternatives: [
    {
      name: 'React Native',
      text: 'The most established way to render native UI from React, with a large library ecosystem.',
      href: 'alternatives/react-native',
    },
    {
      name: 'Flutter',
      text: 'One Dart codebase with its own rendering engine. Mature tooling, but no web-skills reuse.',
      href: 'alternatives/flutter',
    },
    {
      name: 'NativeScript',
      text: 'JavaScript or TypeScript with direct access to native APIs and native UI components.',
      href: 'alternatives/nativescript',
    },
    {
      name: 'Kotlin Multiplatform',
      text: 'Share Kotlin logic across Android and iOS while keeping native UI.',
      href: 'alternatives/kotlin-multiplatform',
    },
    {
      name: 'Native iOS and Android',
      text: 'Swift and Kotlin with the platform UI kits. Full control, two codebases.',
      href: 'alternatives/native-development',
    },
  ],
  migration: {
    title: 'Move from Lynx to Capacitor and Capgo',
    lead: 'Lynx elements and ReactLynx are not the browser DOM, so plan to port views to standard web components. React logic, state, and API code usually carry over.',
    steps: [
      {
        title: 'Create or reuse a web app',
        html: 'Port ReactLynx views to React DOM, or use your existing web app, then run <code>bun add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android</code> and <code>bunx cap init</code>.',
      },
      {
        title: 'Add the native platforms',
        html: 'Run <code>bunx cap add ios</code> and <code>bunx cap add android</code>, and replace native modules with Capacitor plugins, then <code>bunx cap sync</code>.',
      },
      {
        title: 'Turn on live updates',
        html: 'Run <code>bunx @capgo/cli@latest init</code>, then ship each web build with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'What is Lynx?',
      answer: 'Lynx is an open-source family of technologies from ByteDance for building native mobile and web UI from one codebase, using web-style markup, CSS, and ReactLynx. It was open-sourced on March 5, 2025, under the Apache License 2.0.',
    },
    {
      question: 'Does Lynx support live updates?',
      answer: 'Lynx has no official live update service. The host app decides where bundles are loaded from, so teams can build their own delivery, but versioning, channels, and rollback are up to them. Capgo provides those for Capacitor apps.',
    },
    {
      question: 'Can I run my existing React web app with Lynx?',
      answer: 'Not directly. ReactLynx renders Lynx elements rather than the browser DOM, so web UI needs porting. Capacitor runs your existing web app as is.',
    },
    {
      question: 'Is Lynx a replacement for React Native?',
      answer: 'It targets similar needs, native rendering driven by JavaScript, with a different engine and threading model. It is younger, so check that the libraries and native modules you need exist.',
    },
    {
      question: 'When should I choose Capgo over Lynx?',
      answer: 'Choose Capacitor with Capgo when you want to ship your current web app to the stores quickly, keep one codebase for web and mobile, and push fixes in minutes with channels, progressive rollouts, and automatic rollback.',
    },
  ],
}
