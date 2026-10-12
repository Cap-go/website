import type { AlternativeCompetitor } from './types'

export const cordova: AlternativeCompetitor = {
  slug: 'cordova',
  name: 'Apache Cordova',
  category: 'framework',
  metaTitle: 'Best Apache Cordova Alternative in 2026 | Capgo',
  metaDescription:
    'Compare Apache Cordova with Capacitor and Capgo. Keep your web code and Cordova plugins, add live updates, rollback, and cloud native builds.',
  keywords: 'Cordova alternative, Apache Cordova alternative, Cordova vs Capacitor, PhoneGap alternative, Cordova live updates, CodePush Cordova replacement, Capgo',
  eyebrow: 'Cordova vs Capgo',
  heading: 'Apache Cordova alternative: Capacitor and Capgo',
  lead: 'Apache Cordova pioneered packaging web apps for the app stores, and it is still maintained. Capacitor is its modern successor for the same web code, and Capgo adds the live updates and cloud builds that Cordova teams used to get from CodePush and App Center.',
  verdict:
    'Choose Cordova if you have a stable app and a team that knows its CLI and config.xml workflow. Choose Capacitor with Capgo if you want native projects you own, modern plugins, and live updates with channels and rollback now that App Center CodePush is retired. Capacitor still runs most Cordova plugins, so the move is incremental.',
  status: 'Web-based framework, still maintained',
  sources: [
    { label: 'Apache Cordova', href: 'https://cordova.apache.org/' },
    { label: 'Cordova docs: Overview', href: 'https://cordova.apache.org/docs/en/latest/guide/overview/index.html' },
    { label: 'Apache Cordova blog', href: 'https://cordova.apache.org/blog/' },
    { label: 'Visual Studio App Center retirement', href: 'https://learn.microsoft.com/en-us/appcenter/retirement' },
    { label: 'Capacitor docs: Migrating from Cordova', href: 'https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor' },
  ],
  rows: {
    pricing: {
      text: 'Free and open source from the Apache Software Foundation. No paid tier.',
      sources: [1],
    },
    ota: {
      text: 'No built-in live updates. Many Cordova apps used App Center CodePush, which was retired on March 31, 2025; Microsoft now only offers a self-hosted CodePush server.',
      sources: [4],
    },
    native_builds: {
      text: 'The cordova CLI generates platform projects that you build locally with Xcode and Android Studio, or in your own CI. No hosted build service from the project.',
      sources: [2],
    },
    frameworks: {
      text: 'HTML, CSS, and JavaScript in a WebView, with any web framework. Targets Android, iOS, and Electron. Native access comes from Cordova plugins.',
      sources: [2],
    },
    open_source: {
      text: 'Apache License 2.0, governed by the Apache Software Foundation.',
      sources: [1],
    },
    rollback: {
      text: 'Not available in Cordova itself. Rollback depends on the live update service you add, or on shipping a new store release.',
      sources: [2, 4],
    },
    support: {
      text: 'Community support through the Apache project. Releases continue, including cordova-android 15.1.0 in July 2026 and cordova-ios 8.1.1 in July 2026.',
      sources: [3],
    },
    company: {
      text: 'Apache Software Foundation, maintained by volunteer committers.',
      sources: [1],
    },
  },
  capgoRows: {
    pricing:
      'Capacitor is free and MIT-licensed. Capgo live updates and cloud builds start at $12/month billed yearly or $14 monthly, with a 14-day free trial and no credit card.',
    frameworks:
      'Capacitor apps built with any web framework, and Capacitor runs most Cordova plugins. Capgo live updates also work for Cordova and Electron apps.',
  },
  better: [
    {
      title: 'Your app is stable and rarely changes',
      text: 'Cordova is still maintained with regular platform releases, so a mature app with a working pipeline does not have to move.',
      sources: [3],
    },
    {
      title: 'You rely on the config.xml and CLI workflow',
      text: 'Cordova regenerates platform projects from config.xml and the CLI. Teams that never touch Xcode or Android Studio directly may prefer that model.',
      sources: [2],
    },
    {
      title: 'You want a project with Apache governance',
      text: 'Cordova is an Apache Software Foundation project under the Apache License 2.0, with no single company behind it.',
      sources: [1],
    },
  ],
  alternatives: [
    {
      name: 'Ionic Appflow',
      text: 'Live updates and cloud builds for Capacitor and Cordova apps from the Ionic team. Check its current roadmap before committing.',
      href: 'alternatives/ionic-appflow',
    },
    {
      name: 'Capawesome Cloud',
      text: 'Live updates and builds for Capacitor apps, with fewer rollout and analytics features than Capgo.',
      href: 'alternatives/capawesome',
    },
    {
      name: 'Self-hosted CodePush server',
      text: 'Microsoft open-sourced a standalone CodePush server after App Center retired. No license fee, but you run and secure it yourself.',
      href: 'alternatives/codepush',
    },
    {
      name: 'VoltBuilder',
      text: 'Cloud builds for Cordova and Capacitor projects without a Mac. No live updates.',
      href: 'alternatives/voltbuilder',
    },
    {
      name: 'React Native',
      text: 'A rewrite with native UI components. Worth it only if you want to leave the web stack.',
      href: 'alternatives/react-native',
    },
  ],
  migration: {
    title: 'Move from Cordova to Capacitor and Capgo',
    lead: 'Capacitor can run alongside Cordova and supports most Cordova plugins, so you can migrate one plugin at a time. Your web code stays as it is.',
    steps: [
      {
        title: 'Add Capacitor to the project',
        html: 'Run <code>bun add @capacitor/core @capacitor/cli</code> and <code>bunx cap init</code> with the app id from <code>config.xml</code>, build your web app, then <code>bunx cap add ios</code> and <code>bunx cap add android</code>.',
      },
      {
        title: 'Move plugins over',
        html: 'Keep working Cordova plugins, replace the rest with Capacitor plugins, and run <code>bunx cap sync</code>. Preferences from <code>config.xml</code> move into <code>capacitor.config.ts</code>.',
      },
      {
        title: 'Add live updates',
        html: 'Run <code>bunx @capgo/cli@latest init</code>, then ship each web build with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Is Apache Cordova dead?',
      answer: 'No. Cordova is still maintained by the Apache project, with cordova-android 15.1.0 and cordova-ios 8.1.1 released in July 2026. Most new web-to-native projects now start on Capacitor instead.',
    },
    {
      question: 'What replaced CodePush for Cordova apps?',
      answer: 'App Center, including CodePush, was retired on March 31, 2025. Options are a self-hosted CodePush server, or a managed service such as Capgo, which supports live updates for Cordova and Capacitor apps.',
    },
    {
      question: 'Can I keep my Cordova plugins in Capacitor?',
      answer: 'Yes, most of them. Capacitor works alongside Cordova plugins, and incompatible ones are skipped automatically during sync, so you can replace them one at a time.',
    },
    {
      question: 'Is Capacitor free like Cordova?',
      answer: 'Yes. Capacitor is free and MIT-licensed. Capgo is the paid part, for live updates and cloud native builds, starting at $12/month billed yearly.',
    },
    {
      question: 'When should I choose Capgo over plain Cordova?',
      answer: 'Choose Capacitor with Capgo when you ship often and need fixes to reach users without waiting for store review, with channels, progressive rollouts, and automatic rollback.',
    },
  ],
}
