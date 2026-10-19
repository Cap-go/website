import type { AlternativeCompetitor } from './types'

export const dotnetMaui: AlternativeCompetitor = {
  slug: 'dotnet-maui',
  name: '.NET MAUI',
  category: 'framework',
  publishedAt: '2026-10-12',
  updatedAt: '2026-10-12',
  metaTitle: 'Best .NET MAUI Alternative in 2026 | Capgo',
  metaDescription:
    'Compare .NET MAUI with Capacitor and Capgo. Reuse your web UI on iOS and Android, ship live updates without store review, and build in the cloud.',
  keywords: '.NET MAUI alternative, MAUI vs Capacitor, Xamarin alternative, Blazor Hybrid alternative, C# mobile app alternative, Capgo',
  eyebrow: '.NET MAUI vs Capgo',
  heading: '.NET MAUI alternative: Capacitor and Capgo',
  lead: '.NET MAUI lets C# teams build native apps for Android, iOS, macOS, and Windows from one project. Capacitor with Capgo takes the web route: your existing web app becomes the mobile app, and fixes reach users through live updates instead of store releases.',
  verdict:
    'Choose .NET MAUI if your team lives in C#, XAML, and Visual Studio and you need Windows desktop from the same codebase. Choose Capacitor with Capgo if your product is already a web app, you want one codebase for web and mobile, and you need to ship fixes in minutes with channels and rollback.',
  status: 'C# cross-platform framework',
  sources: [
    { label: '.NET MAUI GitHub repository', href: 'https://github.com/dotnet/maui' },
    { label: 'Microsoft Learn: What is .NET MAUI?', href: 'https://learn.microsoft.com/en-us/dotnet/maui/what-is-maui' },
    { label: '.NET MAUI support policy', href: 'https://dotnet.microsoft.com/en-us/platform/support/policy/maui' },
    { label: 'Microsoft Learn: ASP.NET Core Blazor Hybrid', href: 'https://learn.microsoft.com/en-us/aspnet/core/blazor/hybrid/' },
  ],
  rows: {
    pricing: {
      text: 'Free and open source under the MIT license. You still pay the Apple and Google developer account fees, and building for iOS requires a Mac.',
      sources: [1, 2],
    },
    ota: {
      text: 'No built-in live update service. iOS apps are fully ahead-of-time compiled to native code, so app changes ship as a new store release.',
      sources: [2],
    },
    native_builds: {
      text: 'You build and sign locally with the .NET SDK and Visual Studio, or set up your own CI. Android compiles to IL with JIT, iOS is AOT compiled, and iOS builds need a Mac.',
      sources: [2],
    },
    frameworks: {
      text: 'C# and XAML with .NET MAUI controls. Blazor Hybrid can render Razor components in a BlazorWebView, but standard web frameworks like React or Vue are not the main path.',
      sources: [2, 4],
    },
    open_source: {
      text: 'MIT-licensed, developed in the open in the dotnet GitHub organization.',
      sources: [1],
    },
    rollback: {
      text: 'No update rollback, because there are no update bundles. A bad release is fixed with a new build through App Store and Google Play review.',
      sources: [2],
    },
    support: {
      text: 'Microsoft Modern Lifecycle Policy. Each major version ships with .NET and is supported for at least 6 months after the next one ships. MAUI 10 support ends May 11, 2027.',
      sources: [3],
    },
    company: {
      text: 'Microsoft, as part of .NET. MAUI is the evolution of Xamarin.Forms.',
      sources: [1, 2],
    },
  },
  capgoRows: {
    pricing:
      'Capacitor is free and MIT-licensed. Capgo live updates and cloud builds start at $12/month billed yearly or $14 monthly, with a 14-day free trial and no credit card.',
    frameworks:
      'HTML, CSS, and TypeScript with any web framework: React, Vue, Angular, Svelte, or Ionic. The same code runs on the web, iOS, and Android.',
    open_source:
      'Capacitor is MIT. The Capgo updater plugin is MPL-2.0 and the backend is AGPL-3.0, so you can self-host the update server.',
  },
  better: [
    {
      title: 'Your team is all-in on C# and .NET',
      text: 'MAUI shares C# business logic, tests, and XAML layouts across platforms inside Visual Studio, with .NET and XAML hot reload during development.',
      sources: [2],
    },
    {
      title: 'You need Windows and macOS desktop from one project',
      text: 'A single MAUI project targets Android, iOS, macOS through Mac Catalyst, and Windows through WinUI 3.',
      sources: [2],
    },
    {
      title: 'You already have Blazor components',
      text: 'Blazor Hybrid in MAUI renders Razor components in a BlazorWebView with full .NET access to device APIs, so Blazor teams can reuse UI across web, mobile, and desktop.',
      sources: [4],
    },
  ],
  alternatives: [
    {
      name: 'Flutter',
      text: 'Google framework with its own rendering engine and Dart. Strong UI consistency, but no web-skills reuse and no official live updates.',
      href: 'alternatives/flutter',
    },
    {
      name: 'React Native',
      text: 'Native UI from React and JavaScript. A good fit for React teams; live updates come from third-party services after CodePush retired.',
      href: 'alternatives/react-native',
    },
    {
      name: 'Kotlin Multiplatform',
      text: 'Share Kotlin business logic across Android and iOS while keeping native UI, or use Compose Multiplatform for shared UI.',
      href: 'alternatives/kotlin-multiplatform',
    },
    {
      name: 'Native iOS and Android',
      text: 'Swift and Kotlin with the platform UI kits. Maximum control and performance, at the cost of two codebases.',
      href: 'alternatives/native-development',
    },
    {
      name: 'NativeScript',
      text: 'JavaScript or TypeScript with direct access to native APIs and native UI components.',
      href: 'alternatives/nativescript',
    },
  ],
  migration: {
    title: 'Move from .NET MAUI to Capacitor and Capgo',
    lead: 'There is no automatic converter from XAML to web UI, so this is a UI rewrite in web technologies. Your C# backend and APIs can stay as they are.',
    steps: [
      {
        title: 'Add Capacitor to your web app',
        html: 'In your web project, run <code>bun add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android</code> and <code>bunx cap init</code>, then <code>bunx cap add ios</code> and <code>bunx cap add android</code>.',
      },
      {
        title: 'Replace MAUI device APIs with plugins',
        html: 'Map MAUI cross-platform APIs to Capacitor plugins: <code>@capacitor/preferences</code> for plain settings, <code>@capgo/capacitor-native-biometric</code> for credentials in the iOS Keychain and Android Keystore, and <code>@capacitor/geolocation</code> for location.',
      },
      {
        title: 'Turn on live updates and cloud builds',
        html: 'Run <code>bunx @capgo/cli@latest init</code> to install the updater, then upload each web build with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Can I ship live updates to a .NET MAUI app?',
      answer: 'MAUI has no built-in live update service. iOS builds are ahead-of-time compiled to native code, so changes go through a new App Store and Google Play release. Capacitor apps run web code, which Capgo can update without a store release.',
    },
    {
      question: 'Is .NET MAUI free?',
      answer: 'Yes. MAUI is open source under the MIT license. You still need Apple and Google developer accounts, and a Mac to build for iOS.',
    },
    {
      question: 'How long is a .NET MAUI version supported?',
      answer: 'MAUI follows the Microsoft Modern Lifecycle Policy and ships with each .NET release. A major version is supported for at least 6 months after its successor ships. MAUI 10 support ends May 11, 2027.',
    },
    {
      question: 'What about Blazor Hybrid?',
      answer: 'Blazor Hybrid renders Razor components in a web view inside a MAUI app. It is a good path for Blazor teams. If your UI is built with React, Vue, Angular, or Svelte, Capacitor runs it directly with no .NET layer.',
    },
    {
      question: 'When should I choose Capgo over .NET MAUI?',
      answer: 'Choose Capacitor with Capgo when your product is a web app, your team writes TypeScript, and you want fixes to reach users in minutes with channels, progressive rollouts, and automatic rollback.',
    },
  ],
}
