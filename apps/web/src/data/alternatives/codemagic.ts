import type { AlternativeCompetitor } from './types'

export const codemagic: AlternativeCompetitor = {
  slug: 'codemagic',
  name: 'Codemagic',
  category: 'ci-cd',
  publishedAt: '2026-10-12',
  updatedAt: '2026-10-13',
  metaTitle: 'Best Codemagic Alternative in 2026 | Capgo',
  metaDescription:
    'Codemagic vs Capgo for Capacitor: compare Codemagic CI/CD and Codemagic Patch with Capgo hosted live updates, channels, rollback, and cloud native builds.',
  keywords: 'Codemagic alternative, Codemagic vs Capgo, Codemagic Patch alternative, Codemagic Patch Capacitor, Capacitor CI/CD, Capacitor live updates, Ionic Capacitor cloud build, Capgo Builder',
  eyebrow: 'Codemagic vs Capgo',
  heading: 'Codemagic alternative for Capacitor apps: Capgo',
  lead: 'Codemagic is a general mobile CI/CD service for Flutter, React Native, native, Ionic, and Unity projects. In October 2026 it added Codemagic Patch for Capacitor, a self-hosted live update server with an Apache 2.0 SDK and CLI. Capgo is built for Capacitor: hosted live updates with channels and rollback, plus Capgo Builder for signed iOS and Android binaries in the cloud.',
  verdict:
    'Choose Codemagic if you run several mobile stacks, need custom YAML pipelines with tests and many steps, or want to run your own live update server. Choose Capgo if your app is Capacitor and you want hosted live updates, runtime channels, rollback, and native builds from one tool, without operating a server or maintaining a CI pipeline.',
  status: 'Mobile CI/CD and OTA updates',
  sources: [
    { label: 'Codemagic pricing', href: 'https://codemagic.io/pricing/' },
    { label: 'Codemagic docs: Ionic Capacitor apps', href: 'https://docs.codemagic.io/yaml-quick-start/building-an-ionic-app/' },
    { label: 'Codemagic CodePush for React Native', href: 'https://codemagic.io/ota' },
    { label: 'Codemagic about us', href: 'https://codemagic.io/about-us/' },
    { label: 'Codemagic docs: CodePush concepts', href: 'https://docs.codemagic.io/rn-codepush/concepts/' },
    { label: 'Codemagic blog: Codemagic Patch for Capacitor', href: 'https://blog.codemagic.io/codemagic-patch-capacitor-ota-updates/' },
  ],
  rows: {
    pricing: {
      text: 'Free for individuals with 500 Mac mini M2 minutes per month. Pay as you go at $0.095/minute on M2 after the free 500, $0.114 on M4, $0.045 on Linux and Windows. Fixed annual plans from $3,990/year, Enterprise from $12,000/year. Codemagic Patch for Capacitor is free to self-host up to 1,000,000 monthly active devices. Hosting by Codemagic is sales-led, for companies above one million monthly active users.',
      sources: [1, 6],
    },
    ota: {
      text: 'Codemagic Patch ships HTML, CSS, and JavaScript updates to Capacitor apps with differential downloads, install modes, and optional signed releases. It is new (Capacitor SDK and CLI v0.1.0) and you run the server yourself with Docker Compose, PostgreSQL, and S3-compatible storage. Each release targets one exact native version, and iOS and Android need separate apps and deployment keys. React Native apps use CodePush by Codemagic.',
      sources: [3, 6],
    },
    native_builds: {
      text: 'Core product. You write a codemagic.yaml pipeline that installs dependencies, runs cap sync, signs, and builds with Gradle or Xcode, then publishes to Google Play or App Store Connect. Builds run on Mac mini M2/M4, Linux, or Windows machines.',
      sources: [1, 2],
    },
    frameworks: {
      text: 'CI/CD for Flutter, React Native, native iOS and Android, Ionic Capacitor, and Unity. Codemagic Patch supports the two latest Capacitor major versions (7 and 8) and Android minSdkVersion 24 or higher.',
      sources: [2, 4, 6],
    },
    open_source: {
      text: 'CI/CD is a proprietary hosted service. Codemagic Patch SDKs and CLIs are Apache 2.0. The Patch server uses the Codemagic Server License, free up to 1,000,000 monthly active devices, which converts to Apache 2.0 two years after each release and forbids reselling it as a competing OTA service.',
      sources: [2, 6],
    },
    rollback: {
      text: 'Codemagic Patch rolls a release back automatically if the app never reports the new bundle as healthy, and supports staged percentage rollouts with promotion from Staging to Production. There is no runtime channel switching; beta programs need separate builds pointing at a Beta deployment.',
      sources: [6],
    },
    support: {
      text: 'Community support on the free plan. Enterprise adds priority support, SSO, and signed SLAs, non-disclosure agreements, and DPAs.',
      sources: [1],
    },
    company: {
      text: 'Nevercode Ltd. Started in 2012 as Greenhouse after a hackathon at Mobi Lab in Tartu, Estonia, renamed Nevercode in 2017.',
      sources: [4],
    },
  },
  better: [
    {
      title: 'You ship Flutter, React Native, or Unity apps',
      text: 'Codemagic builds Flutter, React Native, native, and Unity projects. Capgo Builder and Capgo live updates are made for Capacitor apps.',
      sources: [4],
    },
    {
      title: 'You need a fully custom pipeline',
      text: 'A codemagic.yaml workflow can run tests, scripts, versioning, and publishing steps of your choice on Mac, Linux, or Windows machines.',
      sources: [1, 2],
    },
    {
      title: 'You want to self-host live updates',
      text: 'The Codemagic Patch server is free to run on your own infrastructure up to 1,000,000 monthly active devices, with Apache 2.0 SDKs and CLIs.',
      sources: [6],
    },
  ],
  alternatives: [
    {
      name: 'Bitrise',
      text: 'Mobile CI/CD with a large step library and a free Hobby plan. Good for multi-stack teams, but you still maintain the pipeline and it has no Capacitor live updates.',
      href: 'alternatives/bitrise',
    },
    {
      name: 'Appcircle',
      text: 'Mobile CI/CD with distribution, an enterprise app store, and a self-hosted option. Strong for regulated enterprises, sales-led beyond the free tier.',
      href: 'alternatives/appcircle',
    },
    {
      name: 'Ionic Appflow',
      text: 'Cloud builds and live updates for Ionic and Capacitor from the Ionic team. Check its current roadmap and pricing before committing.',
      href: 'alternatives/ionic-appflow',
    },
    {
      name: 'GitHub Actions',
      text: 'General CI with macOS runners next to your code. Flexible and cheap for small volumes, but you own every signing and store upload step.',
      href: 'https://github.com/features/actions',
    },
    {
      name: 'VoltBuilder',
      text: 'Simple cloud builds for Cordova and Capacitor projects from a zip upload. No live updates.',
      href: 'alternatives/voltbuilder',
    },
  ],
  migration: {
    title: 'Move a Capacitor app from Codemagic to Capgo',
    lead: 'Your Capacitor project does not change. You replace the codemagic.yaml build and publish steps with Capgo Builder, and swap the Codemagic Patch plugin for the Capgo updater if you use it.',
    steps: [
      {
        title: 'Install the Capgo updater',
        html: 'Remove <code>@codemagic/capacitor-patch</code> if installed, then run <code>bunx @capgo/cli@latest init</code> in your Capacitor project to add the updater plugin and create your app in Capgo.',
      },
      {
        title: 'Move signing to Capgo Builder',
        html: 'Run <code>bunx @capgo/cli@latest build init</code> and store your certificates and keystore with <code>bunx @capgo/cli@latest build credentials save</code>.',
      },
      {
        title: 'Build and ship',
        html: 'Request native builds with <code>bunx @capgo/cli@latest build request --platform ios</code>, and ship web changes with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Can Codemagic build Capacitor apps?',
      answer: 'Yes. Codemagic has a quick start for Ionic Capacitor apps using codemagic.yaml, with signing and publishing to Google Play and App Store Connect. You write and maintain that pipeline yourself.',
    },
    {
      question: 'Does Codemagic offer live updates for Capacitor?',
      answer: 'Yes, since October 2026. Codemagic Patch for Capacitor is a self-hosted server, free up to 1,000,000 monthly active devices, with hosting by Codemagic only for companies above one million monthly active users. Capgo is a hosted service, so you get live updates, channels, and rollback without running a server.',
    },
    {
      question: 'Is Capgo cheaper than Codemagic?',
      answer: 'It depends on volume. Codemagic is free for 500 Mac minutes a month and then billed per minute. Capgo starts at $12/month billed yearly and includes native build time plus live updates, so a team that also needs OTA updates pays for one tool instead of two.',
    },
    {
      question: 'Can I keep Codemagic and use Capgo for live updates?',
      answer: 'Yes. Many teams keep their existing CI for native builds and add a bundle upload step with the Capgo CLI to ship JavaScript, HTML, and CSS changes as live updates.',
    },
    {
      question: 'When should I choose Codemagic?',
      answer: 'Choose Codemagic when you build Flutter, React Native, native, or Unity apps, need custom multi-step pipelines across several stacks, or want to self-host your live update server.',
    },
  ],
}
