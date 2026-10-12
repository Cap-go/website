import type { AlternativeCompetitor } from './types'

export const reactNative: AlternativeCompetitor = {
  slug: 'react-native',
  name: 'React Native',
  category: 'framework',
  metaTitle: 'Best React Native Alternative in 2026 | Capgo',
  metaDescription:
    'Compare React Native with Capacitor and Capgo. Reuse your web app and web skills, ship live updates without CodePush, and build iOS and Android in the cloud.',
  keywords:
    'React Native alternative, React Native vs Capacitor, CodePush alternative, Capacitor live updates, web to mobile app, Capgo',
  eyebrow: 'React Native vs Capacitor + Capgo',
  heading: 'React Native alternative: Capacitor with Capgo',
  lead: 'React Native renders native views from React code and is backed by Meta. Capacitor runs your existing web app in a native shell, so React, Vue, Angular, or Svelte code ships to the web, iOS, and Android from one codebase, and Capgo adds live updates and cloud builds on top.',
  verdict:
    'Choose Capacitor with Capgo if you already have a web app or a web team, want one codebase for web and mobile, and need live updates now that App Center CodePush is retired. Choose React Native if your team is React-only, wants native UI components on every screen, and is fine with Expo or a self-hosted CodePush server for updates.',
  status: 'Cross-platform framework',
  sources: [
    { label: 'React Native website', href: 'https://reactnative.dev/' },
    { label: 'React Native docs: Get started', href: 'https://reactnative.dev/docs/environment-setup' },
    { label: 'React Native GitHub repository', href: 'https://github.com/facebook/react-native' },
    { label: 'Microsoft: App Center retirement', href: 'https://learn.microsoft.com/en-us/appcenter/retirement' },
    { label: 'Expo docs: EAS Update', href: 'https://docs.expo.dev/eas-update/introduction/' },
    { label: 'Expo pricing', href: 'https://expo.dev/pricing' },
  ],
  rows: {
    pricing: {
      text: 'The framework is free under the MIT license. Expo, the framework React Native recommends, has a free EAS plan, then Starter at $19/month and Production at $199/month plus usage.',
      sources: [3, 2, 6],
    },
    ota: {
      text: 'No built-in live updates. App Center, which hosted CodePush, was retired on March 31, 2025. Options are Expo EAS Update for JS, styling, and images, or running the standalone CodePush server yourself.',
      sources: [4, 5],
    },
    native_builds: {
      text: 'Build locally with Xcode and Android Studio, or in the cloud with Expo EAS Build. EAS free plan includes up to 15 Android and 15 iOS builds per month.',
      sources: [2, 6],
    },
    frameworks: {
      text: 'React only, in JavaScript or TypeScript, rendering native views. Web output needs the separate React Native Web project.',
      sources: [1],
    },
    open_source: { text: 'MIT-licensed, developed on GitHub.', sources: [3] },
    rollback: {
      text: 'Depends on your update service. EAS Update and the standalone CodePush server each handle rollbacks of JS bundles. Native code changes need a new store release.',
      sources: [5, 4],
    },
    support: {
      text: 'Large community. Commercial help comes from partners such as Expo, Callstack, Infinite Red, and Software Mansion.',
      sources: [1],
    },
    company: {
      text: 'Released by Meta in 2015 and maintained by Meta since, with contributions from Microsoft, Expo, Callstack, and others.',
      sources: [1],
    },
  },
  capgoRows: {
    pricing:
      'Capacitor is free and MIT-licensed. Capgo live updates and cloud builds from $12/month billed yearly or $14 monthly. 14-day free trial, no credit card.',
    frameworks:
      'Capacitor runs any web app: React, Vue, Angular, Svelte, Solid, or plain JS. The same code ships to web, iOS, and Android. Capgo also updates Cordova and Electron apps, not React Native.',
  },
  better: [
    {
      title: 'You want native UI components',
      text: 'React Native renders real platform views instead of a web view, which some teams prefer for scroll-heavy or animation-heavy screens.',
      sources: [1],
    },
    {
      title: 'Your team is all-in on React and Expo',
      text: 'Expo gives React Native file-based routing, a library of native modules, cloud builds, and EAS Update in one toolchain.',
      sources: [2, 5],
    },
    {
      title: 'You hire from the React Native talent pool',
      text: 'React Native has a large community and companies such as Microsoft, Callstack, and Software Mansion contribute to it.',
      sources: [1],
    },
  ],
  alternatives: [
    {
      name: 'Flutter',
      text: 'Google-backed UI toolkit with its own rendering engine and Dart language. Strong UI consistency, but no web code reuse.',
      href: 'alternatives/flutter',
    },
    {
      name: 'Kotlin Multiplatform',
      text: 'Share Kotlin business logic, and optionally UI with Compose Multiplatform. A good fit for Android-first teams.',
      href: 'alternatives/kotlin-multiplatform',
    },
    {
      name: 'NativeScript',
      text: 'JavaScript and TypeScript with direct access to native APIs and native UI. Smaller community than React Native.',
      href: 'alternatives/nativescript',
    },
    {
      name: '.NET MAUI',
      text: 'Microsoft cross-platform framework in C# and XAML. Fits teams already invested in .NET.',
      href: 'alternatives/dotnet-maui',
    },
    {
      name: 'Native development',
      text: 'Swift and Kotlin apps per platform. Full control and best platform fit, at the cost of two codebases.',
      href: 'alternatives/native-development',
    },
  ],
  migration: {
    title: 'Move from React Native to Capacitor and Capgo',
    lead: 'React Native UI code does not run in Capacitor as is, but your React logic, state, and API code can move to a React web app that Capacitor wraps.',
    steps: [
      {
        title: 'Build or reuse a React web app',
        html: 'Port screens from React Native components to web components, or start from your existing web app. Business logic and API calls can usually stay.',
      },
      {
        title: 'Add Capacitor',
        html: 'Run <code>bun add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android</code>, then <code>bunx cap init</code> and <code>bunx cap add ios</code> and <code>bunx cap add android</code>. Replace native modules with Capacitor plugins.',
      },
      {
        title: 'Install Capgo',
        html: 'Run <code>bunx @capgo/cli@latest init</code> to add live updates, then ship web changes with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Can Capgo update React Native apps?',
      answer:
        'No. Capgo live updates work for Capacitor, Cordova, and Electron apps. React Native teams can use Expo EAS Update or the standalone CodePush server that Microsoft published when App Center was retired.',
    },
    {
      question: 'Is Capacitor slower than React Native?',
      answer:
        'Capacitor renders your UI in the system web view, while React Native renders native views. For most business, content, and form-based apps the difference is not noticeable, and you can still call native code through Capacitor plugins when needed.',
    },
    {
      question: 'What replaced CodePush for React Native?',
      answer:
        'Microsoft retired App Center on March 31, 2025 and published a standalone CodePush server you can host yourself. Expo EAS Update is the main hosted option.',
    },
    {
      question: 'Why pick Capacitor over React Native?',
      answer:
        'Capacitor lets you ship one web codebase to the browser, iOS, and Android, and works with any web framework, not only React. With Capgo you get live updates, channels, rollback, and cloud native builds for that app.',
    },
    {
      question: 'Do I need to rewrite my app to use Capacitor?',
      answer:
        'If you already have a web app, no: Capacitor wraps it. If your app exists only in React Native, the UI layer needs porting to web components, while most logic can be reused.',
    },
  ],
}
