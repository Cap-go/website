import type { AlternativeCompetitor } from './types'

export const kotlinMultiplatform: AlternativeCompetitor = {
  slug: 'kotlin-multiplatform',
  name: 'Kotlin Multiplatform',
  category: 'framework',
  metaTitle: 'Best Kotlin Multiplatform Alternative in 2026 | Capgo',
  metaDescription:
    'Compare Kotlin Multiplatform and Compose Multiplatform with Capacitor and Capgo. Reuse web code, ship to web and mobile, and push live updates without review.',
  keywords:
    'Kotlin Multiplatform alternative, Compose Multiplatform alternative, KMP vs Capacitor, cross-platform mobile, Capacitor live updates, Capgo',
  eyebrow: 'Kotlin Multiplatform vs Capacitor + Capgo',
  heading: 'Kotlin Multiplatform alternative: Capacitor with Capgo',
  lead: 'Kotlin Multiplatform, from JetBrains, shares Kotlin code across Android, iOS, desktop, web, and server, and Compose Multiplatform can share the UI too. Capacitor takes a different path: your web app becomes the iOS and Android app, and Capgo adds live updates and cloud builds.',
  verdict:
    'Choose Capacitor with Capgo if your product is already a web app or your team writes TypeScript, and you want to fix bugs in production without waiting for store review. Choose Kotlin Multiplatform if you are an Android-first Kotlin team that wants shared logic with fully native UI, or Compose UI on iOS, and accepts store releases for every change.',
  status: 'Cross-platform framework',
  sources: [
    { label: 'Kotlin Multiplatform overview', href: 'https://kotlinlang.org/multiplatform/' },
    { label: 'Compose Multiplatform overview', href: 'https://kotlinlang.org/compose-multiplatform/' },
    { label: 'Compose Multiplatform GitHub repository', href: 'https://github.com/JetBrains/compose-multiplatform' },
    { label: 'Kotlin Multiplatform quickstart', href: 'https://kotlinlang.org/docs/multiplatform/quickstart.html' },
  ],
  rows: {
    pricing: {
      text: 'Free. Kotlin is licensed under Apache 2.0 and Compose Multiplatform is Apache-2.0 on GitHub. No paid tier from JetBrains for KMP itself.',
      sources: [1, 3],
    },
    ota: {
      text: 'No live update mechanism. Kotlin code is compiled into the native Android and iOS apps, so every change, logic or UI, ships through the app stores.',
      sources: [1, 4],
    },
    native_builds: {
      text: 'Local builds with Gradle in IntelliJ IDEA or Android Studio. iOS builds need a Mac with Xcode. No first-party cloud build service.',
      sources: [4],
    },
    frameworks: {
      text: 'Kotlin. Share logic only with native SwiftUI or Android UI, or share up to 100% including UI with Compose Multiplatform, stable on iOS, Android, and desktop, Beta on web.',
      sources: [1, 2],
    },
    open_source: {
      text: 'Kotlin is Apache 2.0 under the Kotlin Foundation. Compose Multiplatform is Apache-2.0.',
      sources: [1, 3],
    },
    rollback: {
      text: 'No update channel to roll back. Reverting a bad release means shipping a new store build or using store phased rollouts.',
      sources: [1],
    },
    support: {
      text: 'Supported and developed by JetBrains, with official docs and IDE tooling. Community help through the Kotlin ecosystem.',
      sources: [1, 4],
    },
    company: {
      text: 'Developed by JetBrains. Kotlin is protected under the Kotlin Foundation.',
      sources: [1, 2],
    },
  },
  capgoRows: {
    pricing:
      'Capacitor is free and MIT-licensed. Capgo live updates and cloud builds from $12/month billed yearly or $14 monthly. 14-day free trial, no credit card.',
    frameworks:
      'Capacitor runs any web app: React, Vue, Angular, Svelte, or plain JS. One codebase ships to web, iOS, and Android. Native Swift or Kotlin code can live in Capacitor plugins.',
    native_builds:
      'Capgo Builder builds and signs iOS and Android binaries in the cloud, typically in 2-3 minutes, with no Mac needed, and can upload them to the stores.',
  },
  better: [
    {
      title: 'You want fully native UI with shared logic',
      text: 'KMP lets you share data handling and business logic while keeping SwiftUI and Android UI fully native, which suits apps where platform fidelity matters.',
      sources: [1],
    },
    {
      title: 'Your team is Android and Kotlin first',
      text: 'Compose Multiplatform uses the same API as Jetpack Compose, so Android developers can bring their UI skills to iOS and desktop.',
      sources: [2, 3],
    },
    {
      title: 'You want to share code gradually',
      text: 'KMP can start with one isolated piece, such as validation rules or authentication, inside an existing native app.',
      sources: [1],
    },
  ],
  alternatives: [
    {
      name: 'Flutter',
      text: 'Google-backed toolkit in Dart that draws its own UI across mobile, web, and desktop. Live updates only through third parties.',
      href: 'alternatives/flutter',
    },
    {
      name: 'React Native',
      text: 'Meta-backed framework that renders native views from React. Updates via Expo EAS Update or self-hosted CodePush.',
      href: 'alternatives/react-native',
    },
    {
      name: 'Native development',
      text: 'Separate Swift and Kotlin apps. Maximum control and platform fit, with two codebases to maintain.',
      href: 'alternatives/native-development',
    },
    {
      name: '.NET MAUI',
      text: 'Microsoft cross-platform framework in C# and XAML for teams on .NET.',
      href: 'alternatives/dotnet-maui',
    },
    {
      name: 'NativeScript',
      text: 'JavaScript and TypeScript with direct access to native APIs and native UI.',
      href: 'alternatives/nativescript',
    },
  ],
  migration: {
    title: 'Move from Kotlin Multiplatform to Capacitor and Capgo',
    lead: 'Your UI moves to web technology. Native Kotlin and Swift code you rely on can be kept as Capacitor plugins.',
    steps: [
      {
        title: 'Build or reuse a web app',
        html: 'Rebuild screens in React, Vue, Angular, or Svelte, or reuse your existing web app. Keep your backend and APIs as they are.',
      },
      {
        title: 'Add Capacitor and keep native code in plugins',
        html: 'Run <code>bun add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android</code>, then <code>bunx cap init</code>, <code>bunx cap add ios</code>, and <code>bunx cap add android</code>. Wrap Kotlin or Swift modules you still need as Capacitor plugins.',
      },
      {
        title: 'Install Capgo',
        html: 'Run <code>bunx @capgo/cli@latest init</code> to add live updates, then ship changes with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Can Kotlin Multiplatform apps get live updates?',
      answer:
        'Not through KMP itself. Kotlin is compiled into the native app binaries, so changes ship through the App Store and Google Play. Capacitor apps with Capgo can update their web layer without store review.',
    },
    {
      question: 'Is Compose Multiplatform stable on iOS?',
      answer:
        'Yes. JetBrains lists iOS, Android, and desktop as stable for Compose Multiplatform, while web support is in Beta.',
    },
    {
      question: 'Can I keep my Kotlin code if I move to Capacitor?',
      answer:
        'Yes, for native features. Capacitor plugins are written in Kotlin or Java on Android and Swift on iOS, so existing native modules can be wrapped as plugins and called from your web app.',
    },
    {
      question: 'Do I need a Mac to build iOS apps?',
      answer:
        'With Kotlin Multiplatform, iOS builds need a Mac with Xcode. With Capgo Builder, iOS binaries are built and signed in the cloud.',
    },
  ],
}
