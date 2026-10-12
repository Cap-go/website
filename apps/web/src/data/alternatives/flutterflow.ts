import type { AlternativeCompetitor } from './types'

export const flutterflow: AlternativeCompetitor = {
  slug: 'flutterflow',
  name: 'FlutterFlow',
  category: 'framework',
  metaTitle: 'Best FlutterFlow Alternative in 2026 | Capgo',
  metaDescription:
    'Compare FlutterFlow with Capacitor and Capgo. Turn your web code into iOS and Android apps, ship live updates without store review, and build in the cloud.',
  keywords: 'FlutterFlow alternative, FlutterFlow vs Capacitor, low-code app builder alternative, Flutter low-code alternative, web to mobile app, Capgo',
  eyebrow: 'FlutterFlow vs Capgo',
  heading: 'FlutterFlow alternative: Capacitor and Capgo',
  lead: 'FlutterFlow is a visual builder that generates Flutter apps for mobile and web. Capacitor with Capgo takes a code-first web route: your React, Vue, Angular, or Svelte app becomes the iOS and Android app, Capgo Builder signs it in the cloud, and fixes reach users through live updates.',
  verdict:
    'Choose FlutterFlow if you want to design screens visually, your team does not write web code, and you are fine with Flutter and Dart as the exported stack. Choose Capacitor with Capgo if you already have or want a web app, want one codebase for web and mobile in a mainstream web framework, and need to ship fixes in minutes with channels and rollback.',
  status: 'Low-code Flutter builder',
  sources: [
    { label: 'FlutterFlow pricing', href: 'https://www.flutterflow.io/pricing' },
    { label: 'FlutterFlow docs: App Store deployment', href: 'https://docs.flutterflow.io/deployment/apple-app-store-deployment' },
    { label: 'FlutterFlow docs: Push to GitHub', href: 'https://docs.flutterflow.io/exporting/push-to-github' },
    { label: 'FlutterFlow on Y Combinator', href: 'https://www.ycombinator.com/companies/flutterflow' },
  ],
  rows: {
    pricing: {
      text: 'Free plan for 1 editor. Basic $39/month, Growth $80/month for the first seat and $55 for the second, Business $150/month for the first seat and $85 for seats 2 to 5. Annual billing saves about 25%. Enterprise is custom.',
      sources: [1],
    },
    ota: {
      text: 'No live update service is documented. Changes reach users through a new build deployed to the App Store and Google Play.',
      sources: [2],
    },
    native_builds: {
      text: 'Deploy To App Store builds from FlutterFlow and uploads to App Store Connect with an auto-incremented build number. On Android, the first AAB must be uploaded by hand, then FlutterFlow handles later releases. One-click deploy starts on Basic.',
      sources: [1, 2],
    },
    frameworks: {
      text: 'Visual editor that generates Flutter and Dart code for mobile, web, and desktop. Custom code is written in Dart.',
      sources: [3, 4],
    },
    open_source: {
      text: 'Proprietary builder. Paid plans can download the generated Flutter code or push it to a GitHub branch, which FlutterFlow overwrites on each push.',
      sources: [1, 3],
    },
    rollback: {
      text: 'No update rollback, because there are no update bundles. A bad release is fixed by shipping a new store build.',
      sources: [2],
    },
    support: {
      text: 'Plans list community, email, in-app, and account and billing support rows, with coverage varying by tier. Enterprise is arranged through sales.',
      sources: [1],
    },
    company: {
      text: 'FlutterFlow, Inc., founded in 2020 by former Google engineers Abel Mengistu and Alex Greaves. Y Combinator W21, based in the San Francisco Bay Area.',
      sources: [4],
    },
  },
  capgoRows: {
    pricing:
      'Capacitor is free and MIT-licensed. Capgo live updates and cloud builds start at $12/month billed yearly or $14 monthly, with a 14-day free trial and no credit card.',
    frameworks:
      'Code-first. Any web framework (React, Vue, Angular, Svelte, Ionic) runs on iOS and Android through Capacitor, so the same codebase also serves your website.',
    open_source:
      'Capacitor is MIT-licensed. The Capgo updater plugin is MPL-2.0 and the backend is AGPL-3.0, so you can self-host. Your app code is plain web code you fully own.',
  },
  better: [
    {
      title: 'You want to build visually without writing code',
      text: 'FlutterFlow lets you design screens and logic in a visual editor and deploy to the App Store from the same tool.',
      sources: [2],
    },
    {
      title: 'You want to start for free',
      text: 'FlutterFlow has a free plan for one editor. Capgo has a 14-day trial but no free plan, though Capacitor itself is free.',
      sources: [1],
    },
    {
      title: 'Your team already works in Flutter',
      text: 'FlutterFlow generates Flutter and Dart code, so Flutter developers can take over the exported project.',
      sources: [3],
    },
  ],
  alternatives: [
    {
      name: 'Flutter',
      text: 'Write the Flutter app by hand instead of generating it. Full control, but no web-code reuse and no built-in live updates.',
      href: 'alternatives/flutter',
    },
    {
      name: 'React Native',
      text: 'Native UI from JavaScript and React. Good for React teams that want native components, with live updates through third-party services.',
      href: 'alternatives/react-native',
    },
    {
      name: 'Expo',
      text: 'The React Native toolchain with EAS builds and updates. Strong for React teams that accept a React Native rewrite.',
      href: 'alternatives/expo',
    },
    {
      name: 'Median',
      text: 'Managed web-to-app shell for an existing website. Fast for no-code sites, with platform lock-in.',
      href: 'alternatives/median',
    },
    {
      name: 'Shorebird',
      text: 'Code push for Flutter apps. Relevant if you export FlutterFlow code and want over-the-air patches.',
      href: 'alternatives/shorebird',
    },
  ],
  migration: {
    title: 'Move from FlutterFlow to Capacitor and Capgo',
    lead: 'FlutterFlow exports Flutter code, which does not convert to Capacitor. This is a rebuild of the UI in a web framework, after which one codebase serves web, iOS, and Android.',
    steps: [
      {
        title: 'Build the app in a web framework',
        html: 'Recreate your screens in React, Vue, Angular, or Svelte, then add Capacitor with <code>bun add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android</code> and <code>bunx cap init</code>.',
      },
      {
        title: 'Add the native platforms',
        html: 'Run <code>bun add @capacitor/ios @capacitor/android</code>, then <code>bunx cap add ios</code> and <code>bunx cap add android</code>, and use Capacitor plugins for native features.',
      },
      {
        title: 'Add Capgo live updates and builds',
        html: 'Run <code>bunx @capgo/cli@latest init</code> to set up live updates, and <code>bunx @capgo/cli@latest build request --platform ios</code> to build in the cloud.',
      },
    ],
  },
  faq: [
    {
      question: 'Is Capgo a FlutterFlow replacement?',
      answer: 'Not one to one. FlutterFlow is a visual builder for Flutter apps. Capacitor with Capgo is a code-first path that turns a web app into iOS and Android apps, with live updates and cloud builds.',
    },
    {
      question: 'Does Capgo support live updates for FlutterFlow or Flutter apps?',
      answer: 'No. Capgo live updates work for Capacitor, Cordova, and Electron apps. Flutter teams can look at Shorebird for code push.',
    },
    {
      question: 'Can I keep my FlutterFlow code if I leave?',
      answer: 'On paid plans you can download the generated Flutter code or push it to GitHub. Moving to Capacitor means rebuilding the UI in a web framework, since Flutter code does not convert.',
    },
    {
      question: 'When should I choose FlutterFlow?',
      answer: 'Choose FlutterFlow when you want to build visually, your team does not write web code, and Flutter is an acceptable long-term stack.',
    },
    {
      question: 'When should I choose Capacitor and Capgo?',
      answer: 'Choose Capacitor with Capgo when you have or want a web app, want one codebase for web and mobile, and need to ship fixes without store review, with channels, rollback, and cloud builds.',
    },
  ],
}
