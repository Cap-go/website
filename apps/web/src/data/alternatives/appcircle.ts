import type { AlternativeCompetitor } from './types'

export const appcircle: AlternativeCompetitor = {
  slug: 'appcircle',
  name: 'Appcircle',
  category: 'ci-cd',
  metaTitle: 'Best Appcircle Alternative in 2026 | Capgo',
  metaDescription:
    'Compare Appcircle and Capgo for Capacitor apps. Capgo Builder signs iOS and Android builds in the cloud and adds live updates, with pricing from $12/month.',
  keywords: 'Appcircle alternative, Appcircle vs Capgo, Capacitor CI/CD, Ionic cloud build, enterprise mobile CI/CD alternative, Capgo Builder, live updates',
  eyebrow: 'Appcircle vs Capgo',
  heading: 'Appcircle alternative for Capacitor apps: Capgo',
  lead: 'Appcircle is an enterprise mobile CI/CD platform with builds, testing distribution, an enterprise app store, and a self-hosted edition. Capgo is built for Capacitor: Capgo Builder produces signed iOS and Android binaries in the cloud, and the same plan ships live updates with public, self-serve pricing.',
  verdict:
    'Choose Appcircle if you are an enterprise that needs on-prem CI/CD, an internal enterprise app store, and SSO across many teams and stacks. Choose Capgo if your app is Capacitor and you want native builds plus live updates, channels, and rollback, with a price you can see and start on today.',
  status: 'Enterprise mobile CI/CD',
  sources: [
    { label: 'Appcircle pricing', href: 'https://appcircle.io/pricing' },
    { label: 'Appcircle docs: CodePush', href: 'https://docs.appcircle.io/code-push' },
    { label: 'Appcircle docs: Build', href: 'https://docs.appcircle.io/build' },
    { label: 'Self-hosted Appcircle', href: 'https://appcircle.io/self-hosted' },
  ],
  rows: {
    pricing: {
      text: 'Starter is free with 1 concurrent build, 20 builds a month, a 30-minute build limit, and 1,000 CodePush updates. Corporate is tailored and sold through sales on annual licenses, with no public price.',
      sources: [1],
    },
    ota: {
      text: 'Appcircle CodePush ships over-the-air updates for React Native projects only. Other mobile technologies, including Capacitor, are not supported.',
      sources: [1, 2],
    },
    native_builds: {
      text: 'Core product. The Build module builds and signs iOS and Android apps, then hands off to testing distribution, the enterprise app store, or store publishing (5 store publishes a month on Starter).',
      sources: [1, 3],
    },
    frameworks: {
      text: 'Build guides for iOS, Android, React Native, Flutter, and Ionic.',
      sources: [3],
    },
    open_source: {
      text: 'Proprietary. A fully self-hosted edition runs on Docker, Podman, Kubernetes, or OpenShift, sold as an enterprise deployment.',
      sources: [1, 4],
    },
    rollback: {
      text: 'No live update rollback for Capacitor apps; a bad release is fixed with a new store build. CodePush is for React Native only.',
      sources: [2],
    },
    support: {
      text: 'Corporate plans include dedicated SLA support, SSO and LDAP, multi-tenancy, and role-based access.',
      sources: [1],
    },
    company: {
      text: 'Appcircle Inc., an enterprise mobile DevOps vendor offering public cloud, private cloud, and on-prem deployments.',
      sources: [1, 4],
    },
  },
  better: [
    {
      title: 'You need CI/CD fully on-prem',
      text: 'Self-hosted Appcircle keeps source code, signing identities, and build artifacts inside your own network on Docker, Kubernetes, or OpenShift.',
      sources: [4],
    },
    {
      title: 'You distribute internal apps to employees',
      text: 'Appcircle includes testing distribution and an enterprise app store alongside builds, useful for large internal app catalogs.',
      sources: [1],
    },
    {
      title: 'You want a free tier for occasional builds',
      text: 'Appcircle Starter is free with 20 builds a month. Capgo has a 14-day trial but no free plan.',
      sources: [1],
    },
  ],
  alternatives: [
    {
      name: 'Bitrise',
      text: 'Mobile CI/CD with a large step library, public pricing, and a free Hobby plan. No live updates for Capacitor.',
      href: 'alternatives/bitrise',
    },
    {
      name: 'Codemagic',
      text: 'Mobile CI/CD with 500 free Mac minutes a month for individuals and a Capacitor quick start. Codemagic Patch adds self-hosted Capacitor live updates.',
      href: 'alternatives/codemagic',
    },
    {
      name: 'Ionic Appflow',
      text: 'Cloud builds and live updates for Ionic and Capacitor from the Ionic team. Check its current roadmap and pricing before committing.',
      href: 'alternatives/ionic-appflow',
    },
    {
      name: 'GitHub Actions',
      text: 'General CI with macOS runners and self-hosted runners for on-prem needs. You own every signing and store upload step.',
      href: 'https://github.com/features/actions',
    },
    {
      name: 'Capawesome Cloud',
      text: 'Live updates and native builds for Capacitor apps. A smaller Capacitor-focused option.',
      href: 'alternatives/capawesome',
    },
  ],
  migration: {
    title: 'Move a Capacitor app from Appcircle to Capgo',
    lead: 'Your Capacitor project does not change. You replace the Appcircle build and publish steps with Capgo Builder and add live updates on top.',
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
      question: 'Can Appcircle build Capacitor apps?',
      answer: 'Appcircle has build guides for Ionic, iOS, and Android. Capacitor is not named in its build docs, so confirm your setup with Appcircle. Either way, you configure the workflow and signing yourself.',
    },
    {
      question: 'Does Appcircle CodePush work with Capacitor?',
      answer: 'No. Appcircle documents its CodePush module as designed for React Native projects only. Capacitor apps need a service like Capgo for live updates.',
    },
    {
      question: 'How much does Appcircle cost?',
      answer: 'Starter is free with limits. Corporate pricing is tailored and arranged through sales on annual licenses, so there is no public price to compare. Capgo starts at $12/month billed yearly.',
    },
    {
      question: 'Can Capgo be self-hosted like Appcircle?',
      answer: 'Yes, for live updates. The Capgo updater plugin is MPL-2.0 and the backend is AGPL-3.0, so you can run your own update server, or use licensed self-hosting on Enterprise.',
    },
    {
      question: 'When should I choose Appcircle?',
      answer: 'Choose Appcircle when you need enterprise CI/CD on your own infrastructure, an internal enterprise app store, and SSO across many teams and mobile stacks.',
    },
  ],
}
