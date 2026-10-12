import type { AlternativeCompetitor } from './types'

export const codemagic: AlternativeCompetitor = {
  slug: 'codemagic',
  name: 'Codemagic',
  category: 'ci-cd',
  metaTitle: 'Best Codemagic Alternative in 2026 | Capgo',
  metaDescription:
    'Compare Codemagic and Capgo for Capacitor apps. Capgo Builder signs iOS and Android builds in the cloud and adds live updates, channels, and rollback.',
  keywords: 'Codemagic alternative, Codemagic vs Capgo, Capacitor CI/CD, Ionic Capacitor cloud build, mobile CI/CD alternative, Capgo Builder, live updates',
  eyebrow: 'Codemagic vs Capgo',
  heading: 'Codemagic alternative for Capacitor apps: Capgo',
  lead: 'Codemagic is a general mobile CI/CD service for Flutter, React Native, native, Ionic, and Unity projects. Capgo is built for Capacitor: Capgo Builder produces signed iOS and Android binaries in the cloud, and the same plan ships live updates so most fixes never wait for a new build.',
  verdict:
    'Choose Codemagic if you run several mobile stacks, need custom YAML pipelines with tests and many steps, or build Flutter and React Native apps. Choose Capgo if your app is Capacitor and you want native builds plus live updates, channels, and rollback from one tool, without writing and maintaining a CI pipeline.',
  status: 'Mobile CI/CD service',
  sources: [
    { label: 'Codemagic pricing', href: 'https://codemagic.io/pricing/' },
    { label: 'Codemagic docs: Ionic Capacitor apps', href: 'https://docs.codemagic.io/yaml-quick-start/building-an-ionic-app/' },
    { label: 'Codemagic CodePush for React Native', href: 'https://codemagic.io/ota' },
    { label: 'Codemagic about us', href: 'https://codemagic.io/about-us/' },
    { label: 'Codemagic docs: CodePush concepts', href: 'https://docs.codemagic.io/rn-codepush/concepts/' },
  ],
  rows: {
    pricing: {
      text: 'Free for individuals with 500 Mac mini M2 minutes per month. Pay as you go at $0.095/minute on M2 after the free 500, $0.114 on M4, $0.045 on Linux and Windows. Fixed annual plans from $3,990/year, Enterprise from $12,000/year.',
      sources: [1],
    },
    ota: {
      text: 'Over-the-air updates are offered for React Native only, through CodePush by Codemagic and Codemagic Patch, priced separately from CI/CD by installs or monthly active users. There is no live update product for Capacitor apps.',
      sources: [1, 3],
    },
    native_builds: {
      text: 'Core product. You write a codemagic.yaml pipeline that installs dependencies, runs cap sync, signs, and builds with Gradle or Xcode, then publishes to Google Play or App Store Connect. Builds run on Mac mini M2/M4, Linux, or Windows machines.',
      sources: [1, 2],
    },
    frameworks: {
      text: 'Flutter, React Native, native iOS and Android, Ionic Capacitor, and Unity.',
      sources: [2, 4],
    },
    open_source: {
      text: 'Proprietary hosted service. Pipelines live in your repository as codemagic.yaml.',
      sources: [2],
    },
    rollback: {
      text: 'No rollback for Capacitor apps beyond shipping a new store build. For React Native CodePush, staged percentage rollouts and rollback are supported.',
      sources: [3, 5],
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
      title: 'You build rarely and want a free tier',
      text: 'Individuals get 500 free Mac mini M2 minutes per month. Capgo has a 14-day trial but no free plan.',
      sources: [1],
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
    lead: 'Your Capacitor project does not change. You replace the codemagic.yaml build and publish steps with Capgo Builder and add live updates on top.',
    steps: [
      {
        title: 'Install the Capgo updater',
        html: 'Run <code>bunx @capgo/cli@latest init</code> in your Capacitor project to add the updater plugin and create your app in Capgo.',
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
      answer: 'No. Codemagic over-the-air updates (CodePush by Codemagic and Codemagic Patch) target React Native. Capacitor apps need a service like Capgo for live updates.',
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
      answer: 'Choose Codemagic when you build Flutter, React Native, native, or Unity apps, or need custom multi-step pipelines across several stacks.',
    },
  ],
}
