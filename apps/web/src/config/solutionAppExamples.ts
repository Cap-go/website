export type SolutionAppExampleKey =
  | 'agencies'
  | 'beta-testing'
  | 'build-without-mac'
  | 'cordova-to-capacitor'
  | 'cordova-to-capacitor-ai'
  | 'direct-updates'
  | 'ecommerce'
  | 'enterprise'
  | 'fintech'
  | 'healthcare'
  | 'ionic-enterprise-plugins'
  | 'lovable-vibecoding-to-mobile'
  | 'pr-preview'
  | 'production-updates'
  | 'qsr'
  | 'set-and-forget'
  | 'solo-developers'
  | 'startups'
  | 'version-targeting'
  | 'white-label'

export interface SolutionAppExample {
  appId: string
  label: string
  headline: string
  useCase: string
  plays: string[]
}

export const solutionAppExamples: Record<SolutionAppExampleKey, SolutionAppExample> = {
  agencies: {
    appId: 'com.freelancer.android.messenger',
    label: 'Agency delivery',
    headline: 'Marketplace apps need client-safe release lanes',
    useCase:
      'A service marketplace has buyer, seller, messaging, payment, and support journeys changing at different speeds. An agency can use Capgo channels to review each client request, ship the web-layer change, and keep rollback ready for launch day.',
    plays: ['Client review channel before production', 'Segmented fixes for marketplace roles', 'Rollback plan for campaign windows'],
  },
  'beta-testing': {
    appId: 'org.lichess.mobileapp',
    label: 'Beta testing',
    headline: 'Game communities need careful feature exposure',
    useCase: 'A chess app can validate tournament screens, analysis flows, or social features with a closed tester group before every player receives the new experience.',
    plays: ['Internal and public beta channels', 'Fast feedback loops between builds', 'Promotion only after stability signals'],
  },
  'build-without-mac': {
    appId: 'uk.co.parentmail.parentmail',
    label: 'Cloud builds',
    headline: 'Operational apps should not wait on one local Mac',
    useCase:
      'A school communication app still needs signed mobile releases when the team is mostly web, support, or operations. Hosted build workflows remove the single-machine bottleneck while keeping signing steps repeatable.',
    plays: ['Repeatable iOS and Android signing', 'Release handoff without local hardware', 'CI-owned build records'],
  },
  'cordova-to-capacitor': {
    appId: 'br.jus.tse.resultados',
    label: 'Migration',
    headline: 'Public-service utilities need low-risk hybrid migration',
    useCase:
      'A results and information app is the kind of hybrid workload where teams want to modernize the native shell without interrupting the public-facing interface users already know.',
    plays: ['Inventory plugin and permission risks', 'Move web code first, native shell second', 'Use live updates during migration QA'],
  },
  'cordova-to-capacitor-ai': {
    appId: 'com.mushroomcloud.cars',
    label: 'AI-assisted migration',
    headline: 'Marketplace apps expose the hidden migration checklist',
    useCase:
      'A vehicle marketplace combines search, account, media, location, and listing flows. AI-assisted migration helps turn that feature surface into a Capacitor plugin map, test plan, and staged rollout checklist.',
    plays: ['Generate plugin replacement tables', 'Draft QA plans from app features', 'Prioritize risky native flows first'],
  },
  'direct-updates': {
    appId: 'gov.fema.mobile.android',
    label: 'Direct updates',
    headline: 'Emergency information apps need urgent content fixes',
    useCase:
      'An emergency readiness app cannot wait days to correct a broken checklist, resource link, or location-specific notice. Direct updates let the web layer move as soon as the fix is approved.',
    plays: ['Push approved guidance immediately', 'Bypass store delay for web fixes', 'Keep rollback available for bad copy'],
  },
  ecommerce: {
    appId: 'com.morrisons.matchandmore.app',
    label: 'Ecommerce',
    headline: 'Retail apps live on offers, loyalty, and checkout polish',
    useCase: 'A grocery and loyalty app can change promotions, rewards entry points, onboarding, and checkout messaging faster than a binary release cycle allows.',
    plays: ['Launch campaign UI on schedule', 'Patch checkout friction quickly', 'A/B test loyalty surfaces'],
  },
  enterprise: {
    appId: 'com.paylocity.paylocitymobile',
    label: 'Enterprise',
    headline: 'Workforce apps need governed changes at scale',
    useCase:
      'A payroll and workforce app serves many roles and regulated workflows. Enterprise teams need staged rollout, audit-friendly release records, and controlled recovery when an update misbehaves.',
    plays: ['Roll out by channel or cohort', 'Track production adoption signals', 'Recover without forcing a store release'],
  },
  fintech: {
    appId: 'com.infrasoft.uboi',
    label: 'Fintech',
    headline: 'Banking apps need safe, staged interface fixes',
    useCase:
      'A banking app with accounts, payments, offers, investments, and support flows has to move quickly while preserving trust. Capgo fits fixes that can be shipped through the approved web layer and expanded gradually.',
    plays: ['Stage rollout after compliance review', 'Patch transactional UI copy fast', 'Keep native version rules strict'],
  },
  healthcare: {
    appId: 'au.com.hotdoc.android.hotdoc',
    label: 'Healthcare',
    headline: 'Patient flows change faster than app review',
    useCase:
      'An appointment and care-navigation app can update intake screens, booking instructions, provider messaging, and patient education without destabilizing the native shell.',
    plays: ['Target updates to care workflows', 'Fix form and booking copy quickly', 'Keep rollback ready for patient impact'],
  },
  'ionic-enterprise-plugins': {
    appId: 'ua.vodafone.myvodafone',
    label: 'Plugin replacement',
    headline: 'Carrier self-service apps depend on native integrations',
    useCase:
      'A telecom account app touches authentication, device state, notifications, support, and payments. Open Capacitor plugins help replace expensive closed SDK coverage one capability at a time.',
    plays: ['Map native features to open plugins', 'Replace SDKs incrementally', 'Ship web updates around native capability work'],
  },
  'lovable-vibecoding-to-mobile': {
    appId: 'com.greetingsisland.sam',
    label: 'Web-to-mobile',
    headline: 'Template-driven products are natural mobile candidates',
    useCase:
      'A card and invitation design app shows how a web-style creation flow can become a store-ready mobile experience when packaging, signing, and updates are handled cleanly.',
    plays: ['Wrap responsive web flows in Capacitor', 'Use hosted builds for store packages', 'Improve templates through live updates'],
  },
  'pr-preview': {
    appId: 'com.studysmarter',
    label: 'PR preview',
    headline: 'Learning apps need reviewable product changes',
    useCase:
      'A study app can have onboarding, course, practice, and subscription changes under review at the same time. PR previews let product, QA, and support inspect a mobile-ready build before merge.',
    plays: ['Preview every pull request on device', 'Share review links with stakeholders', 'Catch mobile layout issues pre-merge'],
  },
  'production-updates': {
    appId: 'com.windyty.android',
    label: 'Production updates',
    headline: 'Weather apps need reliable UI changes in production',
    useCase:
      'A forecast and radar app depends on accurate map layers, alerts, and navigation. Production updates help ship approved interface fixes while monitoring adoption before expanding further.',
    plays: ['Start with a small rollout', 'Watch adoption and failure signals', 'Expand only when the update is healthy'],
  },
  qsr: {
    appId: 'de.burgerking.kingfinder',
    label: 'QSR',
    headline: 'Restaurant apps change menus and campaigns constantly',
    useCase:
      'A quick-service restaurant app can update promotions, restaurant finder content, ordering notices, and regional campaign entry points without waiting for store approval.',
    plays: ['Launch local campaign surfaces', 'Fix ordering copy during rush periods', 'Route changes by region or channel'],
  },
  'set-and-forget': {
    appId: 'com.swisscom.myswisscom',
    label: 'Set and forget',
    headline: 'Account apps need quiet, automatic maintenance',
    useCase:
      'A telecom self-service app has billing, plan, support, and device workflows that must stay current without asking users to install a new binary for every small improvement.',
    plays: ['Install once, update automatically', 'Keep support flows current', 'Reduce manual release overhead'],
  },
  'solo-developers': {
    appId: 'com.jernung.infinite.jpn',
    label: 'Solo developers',
    headline: 'Niche learning apps reward fast iteration',
    useCase:
      'A focused language-learning app can improve lessons, onboarding, and upgrade prompts without a big release process. A solo developer keeps momentum by shipping small, reversible web-layer changes.',
    plays: ['Ship course polish without app review', 'Fix onboarding issues quickly', 'Rollback when an experiment misses'],
  },
  startups: {
    appId: 'com.polleverywhere.mobile',
    label: 'Startups',
    headline: 'Audience apps need rapid product iteration',
    useCase:
      'An interactive presentation app can tune onboarding, live event flows, and engagement prompts every week. Startups can use Capgo to learn faster without turning every experiment into a store release.',
    plays: ['Test activation changes quickly', 'Patch live event friction', 'Move from beta to production channels'],
  },
  'version-targeting': {
    appId: 'br.jus.tse.eleitoral.etitulo',
    label: 'Version targeting',
    headline: 'Government apps must support old and new native versions',
    useCase:
      'A public identity app may support older Android versions and different device generations. Version targeting keeps each native build on the newest compatible web bundle without forcing one update path for everyone.',
    plays: ['Serve bundles by native version', 'Protect older devices from incompatible UI', 'Move modern users ahead safely'],
  },
  'white-label': {
    appId: 'gt.com.tigosports',
    label: 'White label',
    headline: 'Regional media apps share a core but need local control',
    useCase: 'A sports streaming brand can reuse the same app foundation while changing schedules, campaigns, and regional content for each market.',
    plays: ['Separate channels by brand or region', 'Reuse one release workflow', 'Patch market-specific content fast'],
  },
}
