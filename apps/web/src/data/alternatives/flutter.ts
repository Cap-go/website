import type { AlternativeCompetitor } from './types'

export const flutter: AlternativeCompetitor = {
  slug: 'flutter',
  name: 'Flutter',
  category: 'framework',
  metaTitle: 'Best Flutter Alternative in 2026 | Capgo',
  metaDescription:
    'Compare Flutter with Capacitor and Capgo. Keep your web stack instead of Dart, ship one codebase to web and mobile, and push live updates without store review.',
  keywords:
    'Flutter alternative, Flutter vs Capacitor, Flutter code push, Shorebird alternative, Capacitor live updates, Capgo',
  eyebrow: 'Flutter vs Capacitor + Capgo',
  heading: 'Flutter alternative: Capacitor with Capgo',
  lead: 'Flutter is Google\'s open-source UI toolkit, written in Dart, that draws its own UI on every platform. Capacitor takes the web app you already have, in React, Vue, Angular, or Svelte, and ships it to iOS and Android, while Capgo adds live updates and cloud builds.',
  verdict:
    'Choose Capacitor with Capgo if your team writes web code, you want the same app on the web and in the stores, and you need live updates for your whole UI, including assets. Choose Flutter if you are starting fresh, want pixel-identical custom UI on mobile, desktop, and embedded devices, and are happy to learn Dart.',
  status: 'Cross-platform framework',
  sources: [
    { label: 'Flutter website', href: 'https://flutter.dev/' },
    { label: 'Flutter GitHub repository', href: 'https://github.com/flutter/flutter' },
    { label: 'Flutter docs', href: 'https://docs.flutter.dev/' },
    { label: 'Shorebird docs: Code Push', href: 'https://docs.shorebird.dev/code-push/' },
    { label: 'Shorebird pricing', href: 'https://shorebird.dev/pricing/' },
  ],
  rows: {
    pricing: {
      text: 'The framework is free under the BSD-3-Clause license. Third-party code push from Shorebird has a free tier, then Pro at $20/month and Business at $400/month.',
      sources: [2, 5],
    },
    ota: {
      text: 'No official live updates. Shorebird, a separate company, patches Dart code over the air. Native code, assets such as images and fonts, and Flutter engine upgrades still need a store release.',
      sources: [4],
    },
    native_builds: {
      text: 'Build locally with the Flutter tooling plus Xcode and Android Studio, or use a third-party CI service. No first-party cloud build service.',
      sources: [3],
    },
    frameworks: {
      text: 'Dart with Flutter widgets. One codebase for mobile, web, desktop, and embedded, with Flutter drawing its own UI instead of using web or native components.',
      sources: [1, 3],
    },
    open_source: { text: 'BSD-3-Clause, developed on GitHub.', sources: [2] },
    rollback: {
      text: 'No official update channel, so rollback depends on the code push provider you add, such as Shorebird. Otherwise a fix means a new store release.',
      sources: [4],
    },
    support: {
      text: 'Large open-source community and official docs. No paid support plan from Google; code push support comes from Shorebird plans.',
      sources: [1, 5],
    },
    company: {
      text: 'Supported by Google and maintained with a global community of contributors.',
      sources: [1],
    },
  },
  capgoRows: {
    pricing:
      'Capacitor is free and MIT-licensed. Capgo live updates and cloud builds from $12/month billed yearly or $14 monthly. 14-day free trial, no credit card.',
    frameworks:
      'Capacitor runs any web app: React, Vue, Angular, Svelte, or plain JS, in HTML, CSS, and TypeScript. The same code ships to web, iOS, and Android. Capgo does not update Flutter apps.',
  },
  better: [
    {
      title: 'You want custom, pixel-identical UI',
      text: 'Flutter draws every pixel itself, so your design looks the same across iOS, Android, desktop, and embedded targets.',
      sources: [1],
    },
    {
      title: 'You also target desktop and embedded',
      text: 'One Flutter codebase covers mobile, web, desktop, and embedded devices, with natively compiled output.',
      sources: [1],
    },
    {
      title: 'You have no existing web app',
      text: 'If you start from zero and your team is ready to learn Dart, Flutter avoids the web view layer entirely.',
      sources: [1, 3],
    },
  ],
  alternatives: [
    {
      name: 'React Native',
      text: 'Meta-backed framework that renders native views from React code. Live updates need Expo EAS Update or a self-hosted CodePush server.',
      href: 'alternatives/react-native',
    },
    {
      name: 'Kotlin Multiplatform',
      text: 'Share Kotlin logic, and UI with Compose Multiplatform. Good for Android-first teams that want native iOS output.',
      href: 'alternatives/kotlin-multiplatform',
    },
    {
      name: 'NativeScript',
      text: 'JavaScript and TypeScript with direct native API access, usable with Angular, Vue, React, Svelte, or Solid.',
      href: 'alternatives/nativescript',
    },
    {
      name: '.NET MAUI',
      text: 'Microsoft cross-platform framework in C# and XAML for teams already on .NET.',
      href: 'alternatives/dotnet-maui',
    },
    {
      name: 'FlutterFlow',
      text: 'Visual builder that generates Flutter code. Faster for prototypes, with the same Flutter update limits.',
      href: 'alternatives/flutterflow',
    },
  ],
  migration: {
    title: 'Move from Flutter to Capacitor and Capgo',
    lead: 'Dart and Flutter widgets do not carry over, so this is a UI rewrite in web technology. Your backend, APIs, and design system stay the same.',
    steps: [
      {
        title: 'Build or reuse a web app',
        html: 'Rebuild your screens in React, Vue, Angular, or Svelte, or start from the web app you already have.',
      },
      {
        title: 'Add Capacitor',
        html: 'Run <code>bun add @capacitor/core @capacitor/cli</code>, then <code>bunx cap init</code> and <code>bunx cap add ios</code> and <code>bunx cap add android</code>. Swap Flutter plugins for Capacitor plugins.',
      },
      {
        title: 'Install Capgo',
        html: 'Run <code>bunx @capgo/cli@latest init</code> to add live updates, then ship changes with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Can Capgo push live updates to Flutter apps?',
      answer:
        'No. Capgo supports Capacitor, Cordova, and Electron apps. For Flutter, Shorebird is the main code push option, and it patches Dart code only.',
    },
    {
      question: 'Does Flutter support over-the-air updates?',
      answer:
        'Not officially. Shorebird, a third-party service, can patch Dart code. Native code, images, fonts, and Flutter engine upgrades still require a store release.',
    },
    {
      question: 'Why choose Capacitor over Flutter?',
      answer:
        'Capacitor reuses web skills and web code, so one app serves the browser, iOS, and Android. With Capgo, the whole web layer, including HTML, CSS, JavaScript, and assets, can be updated without store review.',
    },
    {
      question: 'Is Flutter faster than Capacitor?',
      answer:
        'Flutter compiles to machine code and draws its own UI, which helps for animation-heavy apps. For most business and content apps, a Capacitor web view performs well, and native plugins cover device features.',
    },
  ],
}
