import type { AlternativeCompetitor } from './types'

export const nativeDevelopment: AlternativeCompetitor = {
  slug: 'native-development',
  name: 'Native iOS and Android development',
  category: 'framework',
  publishedAt: '2026-10-12',
  updatedAt: '2026-10-12',
  metaTitle: 'Native App Development Alternative in 2026 | Capgo',
  metaDescription:
    'Compare native Swift and Kotlin development with Capacitor and Capgo. One web codebase for iOS, Android, and web, plus live updates and cloud builds.',
  keywords: 'native app development alternative, Swift vs Capacitor, Kotlin vs Capacitor, SwiftUI alternative, Jetpack Compose alternative, native vs hybrid app, Capgo',
  eyebrow: 'Native vs Capacitor + Capgo',
  heading: 'Native iOS and Android alternative: Capacitor and Capgo',
  lead: 'Building natively means a Swift and SwiftUI app for iOS and a Kotlin and Jetpack Compose app for Android. Capacitor with Capgo ships one web codebase to both stores and the web, updates it live, and still lets you write native code where it matters.',
  verdict:
    'Choose native development when the app is the product and you need the best possible performance, the newest platform APIs on day one, and two dedicated mobile teams. Choose Capacitor with Capgo when you want one team and one codebase for web, iOS, and Android, and fixes that reach users in minutes instead of after store review.',
  status: 'Two native codebases',
  sources: [
    { label: 'Apple: SwiftUI', href: 'https://developer.apple.com/swiftui/' },
    { label: 'Android Developers: Jetpack Compose', href: 'https://developer.android.com/compose' },
    { label: 'Apple App Store Review Guidelines', href: 'https://developer.apple.com/app-store/review/guidelines/' },
    { label: 'Apple Developer Program: what is included', href: 'https://developer.apple.com/programs/whats-included/' },
    { label: 'Google Play Console: registration fee', href: 'https://support.google.com/googleplay/android-developer/answer/6112435' },
  ],
  rows: {
    pricing: {
      text: 'The SDKs and IDEs are free. Apple charges 99 USD per membership year and Google Play a 25 USD one-time fee. The main cost is staffing two codebases.',
      sources: [4, 5],
    },
    ota: {
      text: 'No live updates for compiled Swift or Kotlin code. App Store guideline 2.5.2 bars downloading code that changes app features, so every change is a store release.',
      sources: [3],
    },
    native_builds: {
      text: 'Xcode builds the iOS app on a Mac and Android Studio with Gradle builds the Android app. CI and signing are up to you.',
      sources: [1, 2],
    },
    frameworks: {
      text: 'Swift with SwiftUI or UIKit on Apple platforms, and Kotlin with Jetpack Compose on Android. Two separate UI codebases.',
      sources: [1, 2],
    },
    open_source: {
      text: 'Swift and Kotlin are open source. SwiftUI and the iOS SDK are proprietary Apple frameworks; Jetpack Compose is part of Android Jetpack.',
      sources: [1, 2],
    },
    rollback: {
      text: 'No instant rollback. A bad release is fixed by shipping a new version through store review.',
      sources: [3],
    },
    support: {
      text: 'Official documentation, sample code, and developer forums from Apple and Google, plus the largest pool of mobile developers to hire from.',
      sources: [1, 2],
    },
    company: {
      text: 'Apple for iOS and Google for Android.',
      sources: [1, 2],
    },
  },
  capgoRows: {
    pricing:
      'Capacitor is free and MIT-licensed. Capgo live updates and cloud builds start at $12/month billed yearly or $14 monthly, 14-day free trial. Store fees still apply.',
    frameworks:
      'One web codebase in React, Vue, Angular, Svelte, or Ionic for iOS, Android, and web. Drop into Swift or Kotlin with a Capacitor plugin when you need to.',
    open_source:
      'Capacitor is MIT. The Capgo updater plugin is MPL-2.0 and the backend is AGPL-3.0, so you can self-host the update server.',
  },
  better: [
    {
      title: 'Performance is the product',
      text: 'Games, camera and video apps, heavy animation, and AR get the most from SwiftUI, Jetpack Compose, and direct platform APIs.',
      sources: [1, 2],
    },
    {
      title: 'You need new platform features on day one',
      text: 'Widgets, watchOS, visionOS, Wear OS, and new OS APIs land first in the native SDKs. SwiftUI covers iOS, iPadOS, macOS, tvOS, visionOS, and watchOS.',
      sources: [1, 2],
    },
    {
      title: 'You already have two strong mobile teams',
      text: 'If iOS and Android engineers are in place and the release cadence fits store review, native keeps each app fully idiomatic.',
    },
  ],
  alternatives: [
    {
      name: 'Kotlin Multiplatform',
      text: 'Keep native UI and share Kotlin business logic across Android and iOS. The closest step from native for Android-first teams.',
      href: 'alternatives/kotlin-multiplatform',
    },
    {
      name: 'Flutter',
      text: 'One Dart codebase with its own rendering engine. Consistent UI everywhere, but no web-skills reuse.',
      href: 'alternatives/flutter',
    },
    {
      name: 'React Native',
      text: 'Native UI components driven by React. Good for React teams that want native widgets.',
      href: 'alternatives/react-native',
    },
    {
      name: '.NET MAUI',
      text: 'C# and XAML for Android, iOS, macOS, and Windows. A fit for .NET shops.',
      href: 'alternatives/dotnet-maui',
    },
    {
      name: 'Expo',
      text: 'Tooling and cloud services for React Native, including EAS Build and EAS Update.',
      href: 'alternatives/expo',
    },
  ],
  migration: {
    title: 'Move from native apps to Capacitor and Capgo',
    lead: 'Start from your web app, or build one, and wrap it with Capacitor. Native screens and SDKs you want to keep can live on as Capacitor plugins.',
    steps: [
      {
        title: 'Wrap your web app',
        html: 'Run <code>bun add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android</code> and <code>bunx cap init</code> with your existing bundle id, then <code>bunx cap add ios</code> and <code>bunx cap add android</code>.',
      },
      {
        title: 'Keep the native code that matters',
        html: 'Move native modules into Capacitor plugins, or reuse community plugins such as <code>@capacitor/camera</code> and <code>@capacitor/push-notifications</code>, then run <code>bunx cap sync</code>.',
      },
      {
        title: 'Ship updates without review',
        html: 'Run <code>bunx @capgo/cli@latest init</code>, then publish each web build with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Is a Capacitor app slower than a native app?',
      answer: 'For forms, lists, dashboards, and content apps, users rarely notice a difference. For games, heavy animation, or real-time media, native is faster. Capacitor lets you write those parts natively as plugins.',
    },
    {
      question: 'Can native apps get live updates?',
      answer: 'Not for compiled Swift or Kotlin code. Apple guideline 2.5.2 bars downloading code that changes app features, so native changes go through store review. Capacitor apps can update their web layer with Capgo.',
    },
    {
      question: 'Can I keep some native screens with Capacitor?',
      answer: 'Yes. Capacitor generates real Xcode and Android Studio projects that you own, so you can add native views, SDKs, and custom plugins next to the web layer.',
    },
    {
      question: 'Do I still need Apple and Google developer accounts?',
      answer: 'Yes. Apple charges 99 USD per membership year and Google Play charges a 25 USD one-time fee, whichever framework you use. Capgo Builder can build and upload to both stores.',
    },
    {
      question: 'When should I choose Capgo over native development?',
      answer: 'Choose Capacitor with Capgo when you want one team shipping web, iOS, and Android from one codebase, with live updates, channels, progressive rollouts, and automatic rollback.',
    },
  ],
}
