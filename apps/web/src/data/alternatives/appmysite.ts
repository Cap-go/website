import type { AlternativeCompetitor } from './types'

export const appmysite: AlternativeCompetitor = {
  slug: 'appmysite',
  name: 'AppMySite',
  category: 'web-to-app',
  publishedAt: '2026-10-12',
  updatedAt: '2026-10-12',
  metaTitle: 'Best AppMySite Alternative in 2026 | Capgo',
  metaDescription:
    'Compare AppMySite and Capgo. A no-code app builder with WordPress sync vs Capacitor with live updates, rollback, and cloud native builds you own.',
  keywords: 'appmysite alternative, appmysite vs capgo, wordpress to app, woocommerce app builder, no-code app builder, capacitor',
  eyebrow: 'AppMySite vs Capgo',
  heading: 'AppMySite alternative: Capacitor and Capgo',
  lead: 'AppMySite is a no-code builder that turns WordPress, WooCommerce, Shopify, or any website into iOS and Android apps. Capacitor with Capgo is for developers who want to ship their own web app with full native control.',
  verdict:
    'Choose AppMySite if you run a WordPress or WooCommerce site, have no developers, and want a drag-and-drop builder. Choose Capacitor with Capgo if you have a web app and developers, and want an open-source native project with live updates, rollback, and cloud builds.',
  status: 'No-code app builder',
  sources: [
    { label: 'AppMySite website-to-app pricing', href: 'https://www.appmysite.com/web-to-app-pricing/' },
    { label: 'AppMySite homepage', href: 'https://www.appmysite.com/' },
    { label: 'AppMySite WordPress app builder', href: 'https://www.appmysite.com/wordpress-mobile-app-builder/' },
  ],
  rows: {
    pricing: {
      text: 'Free for 1 Android app up to 1,000 downloads. Starter $19/month yearly (Android), Pro $29/month yearly, Premium $49/month yearly (Android and iPhone). Lifetime from $699.',
      sources: [1],
    },
    ota: {
      text: 'WordPress apps sync posts, pages, and products through the AppMySite plugin and REST APIs, so content updates without a store release. Native changes need a new build.',
      sources: [3],
    },
    native_builds: {
      text: 'Generates APK, AAB, and IPA builds in the AppMySite cloud. Assisted publishing is manual on lower plans and automated on Premium.',
      sources: [1, 2],
    },
    frameworks: {
      text: 'WordPress, WooCommerce, Shopify, any website, or no website with an AI builder. Apps are designed in a drag-and-drop editor.',
      sources: [2],
    },
    open_source: {
      text: 'Closed, hosted platform. AppMySite handles the infrastructure, hosting, and maintenance of the app.',
      sources: [2],
    },
    rollback: {
      text: 'No release channels or bundle rollback. Content follows your website.',
      sources: [3],
    },
    support: {
      text: 'Help center, community, and roadmap. Higher plans add advanced features such as analytics and automated publishing.',
      sources: [1, 2],
    },
    company: {
      text: 'AppMySite Inc., Middletown, Delaware, operating since 2018. Reports 800,000+ customers and 1 million+ apps built.',
      sources: [2],
    },
  },
  better: [
    {
      title: 'You run WordPress or WooCommerce',
      text: 'The AppMySite plugin syncs posts, pages, products, categories, custom post types, and users into native app screens.',
      sources: [3],
    },
    {
      title: 'You want to start for free',
      text: 'The Free plan builds one Android app with up to 1,000 downloads at no cost.',
      sources: [1],
    },
    {
      title: 'You have no developers',
      text: 'Drag-and-drop design, toggle-based features, and an AI builder let non-technical users build the app.',
      sources: [2],
    },
  ],
  alternatives: [
    { name: 'MobiLoud', text: 'Managed service that builds and maintains ecommerce apps, from $1,499/month.', href: 'alternatives/mobiloud' },
    { name: 'Median', text: 'Web-to-app platform that wraps any site, with a free test license.', href: 'alternatives/median' },
    { name: 'Natively', text: 'Low-cost website-to-app wrapper, popular with Bubble users.', href: 'alternatives/natively' },
    { name: 'WebToNative', text: 'Budget website-to-app builder with many add-ons.', href: 'alternatives/webtonative' },
    { name: 'FlutterFlow', text: 'Visual builder that generates Flutter code, for teams that want a low-code native UI.', href: 'alternatives/flutterflow' },
  ],
  migration: {
    title: 'Move from AppMySite to Capacitor and Capgo',
    lead: 'AppMySite builds native screens from your site data, so moving to Capacitor means shipping your own web front end inside a native project.',
    steps: [
      {
        title: 'Prepare a web app and add Capacitor',
        html: 'In your web project run <code>bun add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android</code> and <code>bunx cap init</code> with your existing bundle ID.',
      },
      {
        title: 'Add platforms and plugins',
        html: 'Run <code>bunx cap add ios</code> and <code>bunx cap add android</code>, then add plugins like <code>@capacitor/push-notifications</code>.',
      },
      {
        title: 'Build and update with Capgo',
        html: 'Run <code>bunx @capgo/cli@latest init</code>, build in Capgo Cloud, and ship web changes with <code>bunx @capgo/cli@latest bundle upload</code>.',
      },
    ],
  },
  faq: [
    {
      question: 'Is AppMySite a webview app?',
      answer: 'For WordPress and WooCommerce, AppMySite syncs content into app screens through its plugin and REST APIs. For other websites it builds the app around your site.',
    },
    {
      question: 'Does AppMySite have a free plan?',
      answer: 'Yes. The Free plan covers one Android app with up to 1,000 downloads. iPhone apps start on the Pro plan.',
    },
    {
      question: 'How is Capgo different?',
      answer: 'Capgo is a developer tool for Capacitor apps. You own the code and native project, and Capgo adds live updates, channels, rollback, and cloud native builds.',
    },
    {
      question: 'When should I choose Capgo?',
      answer: 'Choose Capgo when you have a custom web app and developers, and want full control over the app, its plugins, and how updates reach users.',
    },
  ],
}
