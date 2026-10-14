import { MARTIN_PROFILE_URL } from '@/config/blogEditorialTeam'
import type { BestShortlistPage } from './types'

// Facts checked on 2026-10-14 against the vendors' public pricing pages and docs:
// capgo.app/pricing, capawesome.io/cloud/pricing, otakit.app, ionic.io/blog/the-future-of-ionics-commercial-products,
// github.com/Cap-go/capacitor-updater. Re-check every product before bumping `updatedAt`.

export const capacitorLiveUpdates: BestShortlistPage = {
  slug: 'capacitor-live-updates',
  category: 'Capacitor Live Update Tools',
  categorySingular: 'Capacitor live update tool',
  year: 2026,
  keyword: 'Capacitor live update tool',
  keywords:
    'best Capacitor live update tool, Capacitor live updates, Capacitor OTA updates, Ionic live updates, Appflow alternative, Capawesome alternative, OtaKit alternative, Capgo',
  metaDescription: 'Compare the 5 best Capacitor live update tools in 2026 by price, rollback, rollout control, and scale. Capgo, Capawesome, OtaKit, Appflow, and self-hosting.',
  author: {
    name: 'Martin Donadieu',
    role: 'Founder of Capgo',
    imageUrl: 'https://avatars.githubusercontent.com/u/4084527?v=4',
    profileUrl: MARTIN_PROFILE_URL,
    sameAs: ['https://github.com/riderx', 'https://www.linkedin.com/company/capgo'],
  },
  publishedAt: '2026-10-14',
  updatedAt: '2026-10-14',
  intro:
    "A live update ships JavaScript, HTML, and CSS fixes to a Capacitor app in minutes instead of waiting days for store review. We compared five options on price, rollout control, rollback, and proven scale. Capgo ranks first: it is the most widely used Capacitor live update tool, delivers over 1 billion updates a month, and pairs updates with native cloud builds and release health data. Disclosure: we build Capgo, so every competitor claim below comes from that vendor's own pricing page or docs.",
  keyTakeaways: [
    'Capgo is the best pick for most production teams. It combines live updates, progressive rollouts, automatic rollback, and native cloud builds from $12 per month billed yearly.',
    'Capawesome Cloud is the closest alternative. It fits teams that already rely on Capawesome plugins and want builds started from a git branch or tag.',
    'OtaKit is the cheapest way to start. Its free tier covers 5,000 updates per month and the full stack is MIT-licensed, but it has no native build service and a short track record.',
    'Ionic Appflow is no longer an option for new apps. It stopped accepting new customers on February 11, 2025, and access for existing customers ends on December 31, 2027.',
    'Self-hosting is possible but costs engineering time. The open-source Capgo updater plugin can point at your own server, which means you own uptime, storage, signing, and security.',
  ],
  definition: {
    is: [
      'A Capacitor live update tool, also called an OTA (over-the-air) update service, replaces the web bundle inside an installed Capacitor app. Your JavaScript, HTML, CSS, images, and other web assets change on the device without a new App Store or Google Play release. The native shell, plugins, and permissions stay exactly as the store approved them.',
      'A complete tool has three parts: a plugin inside the app that downloads, verifies, and swaps bundles; a cloud service that stores bundles and decides which device gets which version; and a CLI that uploads new bundles from your laptop or CI. Good tools add channels (production, beta, QA), progressive rollouts, automatic rollback when a bundle fails to boot, delta downloads, and end-to-end encryption.',
      'Apple and Google both allow this for interpreted code, as long as the update does not change the primary purpose of the app or add features that would need a new review.',
    ],
    isNot: [
      'It is not a way to ship native changes. A new Capacitor plugin, a Swift or Kotlin change, a new permission, or a Capacitor major upgrade still needs a store release. It is not a CI/CD system by itself, although some vendors bundle cloud builds. It is not a feature-flag tool: flags turn existing code on or off, while live updates replace the code. And it is not a loophole around store policy: shipping a different app through live updates can still get your app removed.',
    ],
  },
  methodology: [
    {
      title: 'Price at 10,000 monthly active users',
      text: "Monthly cost of the cheapest public plan that covers 10,000 MAU (or the equivalent update volume), billed monthly, from each vendor's pricing page.",
    },
    {
      title: 'Release safety controls',
      text: 'Count of shipped safety features: channels, percentage rollouts, automatic rollback on boot failure, manual one-click revert, and native compatibility checks before upload.',
    },
    {
      title: 'Proven production scale',
      text: 'Publicly stated updates delivered, apps, or teams served, plus how many years the service has run in production.',
    },
    {
      title: 'Coverage beyond live updates',
      text: 'Whether the same account also builds and signs native iOS and Android binaries, and whether device-level release health data is available.',
    },
    {
      title: 'Lock-in and openness',
      text: 'License of the plugin and backend, and whether you can self-host or migrate away without rewriting app code.',
    },
  ],
  listIntro:
    'Five tools are worth considering for Capacitor live updates in 2026. We ranked them on the five criteria above, using public pricing and documentation checked in October 2026. Capgo ranks first because it scores highest on safety controls, scale, and coverage at a mid-market price. Each entry ends with the type of team it fits best.',
  products: [
    {
      name: 'Capgo',
      bestFor: 'production teams that ship every week',
      href: 'https://capgo.app',
      paragraphs: [
        'Capgo is an independent, bootstrapped live update platform for Capacitor, founded in 2021 by Martin Donadieu. It is the most widely used dedicated Capacitor live update service: more than 9,400 teams and 4,700 apps use it, reaching over 90 million devices and more than 1 billion updates per month. The @capgo/capacitor-updater plugin has 870+ GitHub stars and is free under MPL-2.0.',
        'Releases run from one CLI command, so they fit any CI. Capgo ships delta downloads (only changed files), end-to-end encryption, dynamic channels, per-device overrides, progressive rollouts, and automatic rollback when a bundle fails to start. Before upload it checks that the bundle is compatible with the native code already on devices, which prevents a common class of broken updates.',
        'Capgo also covers what happens after a release. Devices report downloads, installs, failures, rollbacks, launches, and crashes, so you can see adoption and failure causes by version and pause a bad rollout automatically. Capgo Builder builds and signs iOS and Android binaries in the cloud, typically in 2 to 3 minutes, and build time is included in every plan.',
        'Pricing starts at $12 per month billed yearly ($14 monthly) for 2,000 MAU, with tiers at $39, $99, and $249 per month for 10,000, 100,000, and 1 million MAU. There is a 14-day free trial with no credit card, but no free plan. Enterprise adds SOC 2 Type II, ISO 27001, and licensed self-hosting. Customers include Tellent, drivolino, and NuTriQ.',
      ],
      facts: [
        { label: 'Price', value: '$12/month billed yearly for 2K MAU; $39/month for 10K MAU' },
        { label: 'Trial', value: '14 days, no credit card' },
        { label: 'Scale', value: '1B+ updates/month, 4.7K+ apps, 9.4K+ teams' },
        { label: 'Founded', value: '2021, by Martin Donadieu' },
        { label: 'License', value: 'Plugin MPL-2.0, backend AGPL-3.0' },
      ],
      bestSuitedFor:
        'Teams with real users who ship web changes weekly and need rollouts they can trust. It also fits agencies and companies leaving Appflow that want live updates and native builds in one account.',
    },
    {
      name: 'Capawesome Cloud',
      bestFor: 'teams already using Capawesome plugins',
      href: 'https://capawesome.io/cloud/',
      paragraphs: [
        'Capawesome Cloud comes from Capawesome (Genz IT Solutions GmbH), a German company that maintains a large set of Capacitor plugins. Its live update service launched in 2024 and supports Capacitor, Ionic, and Cordova apps.',
        'Live updates include channels for development, staging, production, and customer-specific tracks, rollouts at fixed steps of 10, 25, 50, or 100 percent, and automatic rollback to the last healthy bundle after a crash. A distinctive feature is the Cloud Runner: you point the CLI at a git branch or tag, and Capawesome clones, builds, and ships the update for you.',
        'Native builds are sold separately on Platform plans, from 200 to 5,000 build minutes per month, with publishing to TestFlight, Google Play, Huawei AppGallery, and Firebase App Distribution. That is a wider set of store destinations than most rivals.',
        'The main gap is release analytics. Its plugin calls two endpoints, the channel list and the latest bundle, and does not report device events, so adoption is inferred from update checks and there is no per-device failure timeline or crash data by version.',
        'Live Updates plans cost $9, $29, $79, or $249 per month for 1K, 10K, 50K, or 250K MAU. Platform plans that add native builds cost $19, $49, $149, or $499 per month for the same user tiers, with 200 to 5,000 build minutes. Every plan has a 14-day free trial, and open-source projects can apply for a free plan.',
      ],
      facts: [
        { label: 'Price', value: 'Live Updates from $9/month for 1K MAU; $29/month for 10K MAU' },
        { label: 'With builds', value: '$49/month for 10K users (Platform)' },
        { label: 'Trial', value: '14 days' },
        { label: 'Company', value: 'Genz IT Solutions GmbH, Germany' },
        { label: 'Live updates since', value: '2024' },
      ],
      bestSuitedFor:
        'Teams that already depend on several Capawesome plugins and release a few times a year. It is also a good match if you want the vendor to build updates directly from a git ref.',
      compareLink: { label: 'Capgo vs Capawesome Cloud', href: 'alternatives/capawesome' },
    },
    {
      name: 'OtaKit',
      bestFor: 'small apps on a tight budget',
      href: 'https://otakit.app',
      paragraphs: [
        'OtaKit is a young, MIT-licensed live update project for Capacitor. Its site reports more than 1,000 apps registered and 20 million updates delivered. It is the only option here with a permanent free tier.',
        'The free plan covers 5,000 updates per month with unlimited apps. Starter costs $10 per month for 100,000 updates, and Pro costs $25 per month billed yearly ($50 monthly) for 1 million updates. Enterprise is priced on request. Billing is based on update downloads instead of active users, which favors apps with many users and few releases.',
        "On the technical side, OtaKit ships delta downloads, signed manifests, SHA-256 integrity checks, optional AES-256-GCM end-to-end encryption, runtime channel switching, and automatic rollback when notifyAppReady() is not called in time. Delivery runs through Cloudflare's CDN, and the whole stack (Next.js console, Postgres, S3-compatible storage) can be self-hosted.",
        'The trade-offs are scope and maturity. OtaKit has no native build service, so you still build and sign store binaries yourself or with another vendor. Support is through GitHub issues and a contact form, with priority support on Pro and SLAs only on Enterprise. The project has a much shorter production history than Capgo or Capawesome, which matters if you have thousands of paying users depending on each release.',
      ],
      facts: [
        { label: 'Price', value: 'Free for 5K updates/month; $10/month for 100K updates' },
        { label: 'Billing unit', value: 'Updates delivered, not MAU' },
        { label: 'Scale', value: '1,000+ apps, 20M+ updates (self-reported)' },
        { label: 'License', value: 'MIT, self-hostable' },
        { label: 'Native builds', value: 'Not included' },
      ],
      bestSuitedFor:
        'Solo developers, side projects, and small apps where a free tier matters more than a long track record. It also suits teams that want an MIT-licensed backend they can modify and host.',
      compareLink: { label: 'Capgo vs OtaKit', href: 'alternatives/otakit' },
    },
    {
      name: 'Ionic Appflow',
      bestFor: 'existing customers until the 2027 shutdown',
      href: 'https://ionic.io/appflow',
      paragraphs: [
        'Ionic Appflow was the original hosted live update and build service for Ionic and Capacitor apps. Ionic has been part of OutSystems since October 2022, and in 2025 it announced it was winding down its commercial products.',
        'Appflow stopped accepting new customers on February 11, 2025. Existing customers keep access until December 31, 2027, after which live updates and cloud builds stop working. Any app still on Appflow needs a migration plan before then.',
        'Feature-wise, Appflow offers Live Updates for Capacitor and Cordova apps with channels and rollback to a previous build on a channel. Cloud builds cover Capacitor, Cordova, React Native, and native iOS and Android projects, with publishing to the App Store and Google Play. Apple uploads require an Apple ID and an app-specific password.',
        'Before the change, Live Updates started at $499 per month, the highest entry price in this list. Since it can no longer be bought, we rank it for completeness and because many teams are evaluating replacements right now.',
        'Migration to another tool is mostly a plugin swap plus one store release; your web code does not change. Capgo publishes a step-by-step Appflow migration guide and direct replacements for Ionic enterprise plugins such as Identity Vault and Auth Connect.',
      ],
      facts: [
        { label: 'Status', value: 'Closed to new customers since Feb 11, 2025' },
        { label: 'End of access', value: 'December 31, 2027' },
        { label: 'Last list price', value: 'Live Updates from $499/month' },
        { label: 'Owner', value: 'OutSystems (since October 2022)' },
      ],
      bestSuitedFor: 'Only teams already on Appflow whose app retires before 2028. Everyone else should pick a replacement now, while there is time to test it.',
      compareLink: { label: 'Capgo vs Ionic Appflow', href: 'alternatives/ionic-appflow' },
    },
    {
      name: 'Self-hosted updater',
      bestFor: 'teams that must keep everything on their own servers',
      href: 'https://capgo.app/docs/plugins/updater/self-hosted/getting-started/',
      paragraphs: [
        'You can run live updates without a vendor. The open-source @capgo/capacitor-updater plugin (MPL-2.0) supports a self-hosted mode where the app asks your own endpoint for the latest bundle and downloads it from your storage.',
        'The cost is engineering time, not a subscription. You build and operate the update API, bundle storage, a CDN, version targeting, and signing or encryption keys. Channels, progressive rollouts, rollback rules, and analytics are yours to design. A minimal version takes a few days; a safe production version with rollouts and monitoring usually takes weeks, plus ongoing on-call.',
        'Self-hosting makes sense when data cannot leave your infrastructure, for example in some government, defense, or air-gapped deployments, or when a security review rules out any third-party update service. In regulated industries, also check whether you need a signed agreement such as a HIPAA BAA, which a managed vendor may already offer.',
        'If you need self-hosting with vendor support, Capgo Enterprise includes licensed self-hosting of the full backend (AGPL-3.0 source on GitHub), so you keep the dashboard, channels, and rollouts without building them.',
      ],
      facts: [
        { label: 'Price', value: 'Free software; you pay hosting and engineering time' },
        { label: 'License', value: 'Plugin MPL-2.0' },
        { label: 'Effort', value: 'Days for a prototype, weeks for production' },
        { label: 'Supported option', value: 'Licensed self-hosting on Capgo Enterprise' },
      ],
      bestSuitedFor:
        'Organizations whose policy forbids third-party update infrastructure and that have backend engineers to spare. Small teams usually spend less with a managed plan than with the hours needed to run their own.',
    },
  ],
  comparison: {
    lead: 'The table repeats the five ranking criteria: price at 10,000 MAU, release safety, proven scale, coverage beyond live updates, and openness. Prices are public list prices checked in October 2026.',
    rows: [
      {
        label: 'Price at ~10K MAU (monthly billing)',
        cells: [
          '$39/month, builds included',
          '$29/month live updates only; $49/month with builds',
          'Free to $10/month, depending on update volume',
          'Not sold since 2025 (was from $499/month)',
          'Hosting plus engineering time',
        ],
      },
      {
        label: 'Free plan or trial',
        cells: ['14-day trial, no credit card', '14-day trial', 'Free tier: 5K updates/month', 'None', 'Free software'],
      },
      {
        label: 'Channels',
        cells: ['Yes, dynamic, with per-device overrides', 'Yes', 'Yes, switchable at runtime', 'Yes', 'Build your own'],
      },
      {
        label: 'Progressive rollouts',
        cells: ['Any percentage, auto-pause on failures', '10, 25, 50, or 100%', 'Not documented', 'Not documented', 'Build your own'],
      },
      {
        label: 'Automatic rollback',
        cells: ['Yes, plus one-click revert', 'Yes, after a crash', 'Yes, via notifyAppReady()', 'Manual, per channel', 'Plugin supports it'],
      },
      {
        label: 'Native compatibility check before upload',
        cells: ['Yes', 'No', 'Yes', 'No', 'No'],
      },
      {
        label: 'Device-level release analytics',
        cells: ['Installs, failures, crashes, per-device timeline', 'Update checks only', 'Real-time device activity', 'Not documented', 'Build your own'],
      },
      {
        label: 'Native cloud builds',
        cells: ['Included in every plan', 'Platform plans, 200-5,000 min/month', 'No', 'Yes, until end of 2027', 'No'],
      },
      {
        label: 'Proven scale',
        cells: ['1B+ updates/month since 2021', 'Live updates since 2024', '20M+ updates total', 'Closing December 31, 2027', 'Depends on you'],
      },
      {
        label: 'Open source',
        cells: ['Plugin MPL-2.0, backend AGPL-3.0', 'Plugin only', 'Full stack, MIT', 'No', 'Plugin MPL-2.0'],
      },
    ],
  },
  useCases: {
    lead: 'Use this table to map your team and app to the right tool. Most teams fall clearly into one row.',
    columns: ['Use case or team', 'Best pick', 'Why', 'Runner-up'],
    rows: [
      ['Production SaaS or consumer app shipping weekly', 'Capgo', 'Percentage rollouts that pause on failures and device-level health data', 'Capawesome Cloud'],
      ['Leaving Ionic Appflow before 2028', 'Capgo', 'Live updates and native builds in one account, with an Appflow migration guide', 'Capawesome Cloud'],
      ['Agency managing many client apps', 'Capgo', 'Organizations, per-app channels, and native builds included in plans', 'Capawesome Cloud'],
      ['Heavy user of Capawesome plugins', 'Capawesome Cloud', 'One vendor for plugins and updates, builds from a git ref', 'Capgo'],
      ['Side project or prototype with no budget', 'OtaKit', 'Free tier of 5,000 updates per month, no card needed', 'Capgo trial'],
      ['Regulated or air-gapped environment', 'Capgo Enterprise (self-hosted)', 'Licensed self-hosting with SOC 2 Type II and ISO 27001', 'DIY self-hosting'],
    ],
  },
  results: {
    title: 'What results look like with Capgo',
    lead: 'A few results from teams running Capgo in production, in their own words.',
    items: [
      { metric: 'Days to minutes', text: 'drivolino GmbH went from multi-day release cycles to shipping updates in minutes.', source: 'Sergiu S, Lead Developer, drivolino GmbH' },
      { metric: 'Instant fixes', text: 'NuTriQ pushes production fixes instantly instead of waiting for each App Store review cycle.', source: 'Kapil, Founder, NuTriQ' },
      {
        metric: 'Under 1 day',
        text: 'A CTO went from zero to channel-based rollouts in less than a day, testing on their own device before production.',
        source: 'Nate van Jole, CTO',
      },
      { metric: '1B+ per month', text: 'Updates delivered across more than 4,700 apps on the same infrastructure your app would use.', source: 'Capgo platform data, 2026' },
    ],
    link: { label: 'Read more Capgo customer reviews', href: '#testimonials' },
  },
  faq: [
    {
      question: 'What is the best Capacitor live update tool in 2026?',
      answer:
        'Capgo is the best fit for most teams. It combines channels, progressive rollouts, automatic rollback, release health data, and native cloud builds, and it already delivers over 1 billion updates per month.',
    },
    {
      question: 'How much does a Capacitor live update service cost?',
      answer:
        'For about 10,000 monthly active users, expect $29 to $49 per month: $29 on Capawesome for live updates only, $39 on Capgo with native builds included, or $49 on Capawesome with builds. OtaKit can be free for small update volumes, and self-hosting trades the subscription for engineering time.',
    },
    {
      question: 'Are live updates allowed by Apple and Google?',
      answer:
        "Yes, for web code such as JavaScript, HTML, and CSS. Apple guideline 3.3.1 and Google Play policy allow it as long as the update does not change the app's primary purpose or add features that need a new review.",
    },
    {
      question: 'What can I not change with a live update?',
      answer:
        'Native code. New plugins, Swift or Kotlin changes, new permissions, and Capacitor major upgrades still need a store release, which a cloud build service can automate.',
    },
    {
      question: 'How do I migrate from Ionic Appflow?',
      answer:
        'Swap the Appflow plugin for another updater, ship one store release, and change the upload step in CI. Your web code stays the same, and Capgo has a step-by-step guide for it.',
    },
    {
      question: 'How do rollbacks work if an update breaks the app?',
      answer:
        'The app must confirm each new bundle with notifyAppReady() after it starts. If that call does not arrive in time, the plugin restores the last working bundle on the next launch.',
    },
    {
      question: 'What is the difference between MAU and update-based pricing?',
      answer:
        'MAU pricing counts devices that check for updates in a 30-day window, so cost follows your user base. Update-based pricing counts downloads, so it follows how often you release.',
    },
  ],
  cta: {
    title: 'Try Capgo for free (no credit card required)',
    sentences: [
      'Setup takes one command and about 10 minutes.',
      'Your first live update can reach devices the same day.',
      'Channels let you test on your own phone before any user sees the change.',
      'If a bundle fails to start, devices roll back on their own.',
      'Native builds are included, so store releases live in the same place.',
      'You get 14 days to try everything, and you talk to the engineers who build it.',
    ],
    inlineLink: { before: 'Prefer a guided tour? ', label: 'Book a 15-minute demo', href: 'https://book.capgo.app/demo/', after: ' with our team.' },
  },
  leadMagnet: {
    text: 'Not sure live updates pass store review? Read our free guide:',
    label: 'Do Apple and Google allow live updates?',
    href: 'blog/do-apple-allow-live-updates',
  },
  imageCtas: {
    early: {
      image: '/landing-demos/console/rollout.webp',
      width: 2160,
      height: 1650,
      alt: 'Capgo console showing a progressive rollout of a live update to a percentage of devices',
      title: 'Roll out to 5% first, then everyone',
      text: 'Ship a live update to a slice of devices, watch failures in real time, and let Capgo pause the rollout if something breaks.',
      button: { label: 'Start free trial', href: 'register' },
    },
    final: {
      image: '/landing-demos/observe/observe-live-release.webp',
      width: 2160,
      height: 1350,
      alt: 'Capgo live release dashboard with installs, failed attempts, adoption, and success rate for the current release',
      title: 'Ship your next fix today, not next week',
      text: '14-day free trial. No credit card. Live updates and native builds in one account.',
      button: { label: 'Try Capgo for free', href: 'register' },
    },
  },
  video: {
    youtubeId: 'NzXXKoyhTIo',
    title: 'Capgo, CapacitorJS plugin for live updates',
    caption: 'See a Capacitor live update ship from the CLI to a device with Capgo.',
  },
  closing: {
    before: 'If your team ships web changes every week, the fastest way to compare is to try it on your own app: ',
    link: { label: 'start a free Capgo trial', href: 'register' },
    after: ' and push your first live update today.',
  },
  related: [
    { label: 'Capgo live updates', href: 'live-update' },
    { label: 'Capgo native builds', href: 'native-build' },
    { label: 'All Capgo alternatives', href: 'alternatives' },
    { label: 'Migrate from Ionic Appflow', href: 'docs/upgrade/from-appflow-to-capgo/' },
    { label: 'Migrate from Capawesome', href: 'docs/upgrade/from-capawesome-to-capgo/' },
    { label: 'Best Appflow alternative', href: 'best/appflow-alternative' },
    { label: 'Best CodePush alternative', href: 'best/codepush-alternative' },
  ],
}
