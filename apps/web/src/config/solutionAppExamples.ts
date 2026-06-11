import type { SolutionStoreAppId } from './solutionStoreApps'

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

export interface SolutionAppReference {
  appId: SolutionStoreAppId
  note: string
}

export interface SolutionAppExample {
  label: string
  headline: string
  useCase: string
  apps: SolutionAppReference[]
  plays: string[]
}

export const solutionAppExamples: Record<SolutionAppExampleKey, SolutionAppExample> = {
  agencies: {
    label: 'Agency delivery',
    headline: 'Marketplace apps need client-safe release lanes',
    useCase:
      'Service, marketplace, and booking apps have buyer, seller, messaging, payment, and support journeys changing at different speeds. Agencies can use Capgo channels to review each client request, ship the web-layer change, and keep rollback ready for launch day.',
    apps: [
      { appId: 'com.freelancer.android.messenger', note: 'Marketplace flows where client-requested fixes can touch hiring, messaging, and account screens.' },
      { appId: 'com.mushroomcloud.cars', note: 'Vehicle listings and lead flows that benefit from staged feature checks before broad rollout.' },
      { appId: 'com.kai.kaiticketing', note: 'Booking and ticketing journeys where operational copy and schedule surfaces change often.' },
    ],
    plays: ['Client review channel before production', 'Segmented fixes for marketplace roles', 'Rollback plan for campaign windows'],
  },
  'beta-testing': {
    label: 'Beta testing',
    headline: 'Community apps need careful feature exposure',
    useCase: 'High-usage consumer apps can validate game, learning, or forecast flows with a closed tester group before every user receives the new experience.',
    apps: [
      { appId: 'org.lichess.mobileapp', note: 'Large community app where tournaments, analysis, and social features need careful validation.' },
      { appId: 'com.studysmarter', note: 'Education workflows where onboarding and practice changes should be reviewed before release.' },
      { appId: 'com.windyty.android', note: 'Forecast and map interactions where product changes need confidence before expanding.' },
    ],
    plays: ['Internal and public beta channels', 'Fast feedback loops between builds', 'Promotion only after stability signals'],
  },
  'build-without-mac': {
    label: 'Cloud builds',
    headline: 'Operational apps should not wait on one local Mac',
    useCase:
      'School, transport, and support apps still need signed mobile releases when the team is mostly web, support, or operations. Hosted build workflows remove the single-machine bottleneck while keeping signing steps repeatable.',
    apps: [
      { appId: 'uk.co.parentmail.parentmail', note: 'School communications app where non-native teams still need reliable signed releases.' },
      { appId: 'com.kai.kaiticketing', note: 'Transport booking app where release handoff should not depend on one developer machine.' },
      { appId: 'br.com.oi.tecnicovirtual', note: 'Support utility where operations teams need repeatable mobile build records.' },
    ],
    plays: ['Repeatable iOS and Android signing', 'Release handoff without local hardware', 'CI-owned build records'],
  },
  'cordova-to-capacitor': {
    label: 'Migration',
    headline: 'Hybrid apps need low-risk migration paths',
    useCase:
      'Established Cordova-style apps can modernize their native shell without interrupting the public-facing interface users already know. Capgo helps keep web-layer QA and rollback available during the migration window.',
    apps: [
      { appId: 'br.jus.tse.resultados', note: 'Public-service utility showing a migration surface with broad device support expectations.' },
      { appId: 'com.windyty.android', note: 'Weather maps and alerts where a native-shell migration must protect familiar workflows.' },
      { appId: 'de.burgerking.kingfinder', note: 'Restaurant promotions and finder features that can move through staged hybrid migration.' },
    ],
    plays: ['Inventory plugin and permission risks', 'Move web code first, native shell second', 'Use live updates during migration QA'],
  },
  'cordova-to-capacitor-ai': {
    label: 'AI-assisted migration',
    headline: 'Complex apps expose the hidden migration checklist',
    useCase:
      'Marketplace, banking, and ticketing apps combine search, account, media, location, and transaction flows. AI-assisted migration helps turn that feature surface into a Capacitor plugin map, test plan, and staged rollout checklist.',
    apps: [
      { appId: 'com.mushroomcloud.cars', note: 'Marketplace app with media, search, account, and lead-generation paths to map.' },
      { appId: 'com.infrasoft.uboi', note: 'Banking app with payments, offers, support, and security-sensitive screens.' },
      { appId: 'com.kai.kaiticketing', note: 'Ticketing app with booking, rescheduling, and travel-status flows to prioritize.' },
    ],
    plays: ['Generate plugin replacement tables', 'Draft QA plans from app features', 'Prioritize risky native flows first'],
  },
  'direct-updates': {
    label: 'Direct updates',
    headline: 'Public information apps need urgent content fixes',
    useCase:
      'Emergency, health, and civic apps cannot wait days to correct a broken checklist, resource link, or location-specific notice. Direct updates let the web layer move as soon as the fix is approved.',
    apps: [
      { appId: 'gov.fema.mobile.android', note: 'Emergency guidance where small content mistakes can become urgent.' },
      { appId: 'br.gov.datasus.cnsdigital', note: 'Health records and guidance surfaces where approved copy changes need fast delivery.' },
      { appId: 'br.jus.tse.eleitoral.etitulo', note: 'Civic identity workflows where version-safe guidance matters across devices.' },
    ],
    plays: ['Push approved guidance immediately', 'Bypass store delay for web fixes', 'Keep rollback available for bad copy'],
  },
  ecommerce: {
    label: 'Ecommerce',
    headline: 'Retail apps live on offers, loyalty, and checkout polish',
    useCase: 'Grocery and loyalty apps can change promotions, rewards entry points, onboarding, and checkout messaging faster than a binary release cycle allows.',
    apps: [
      { appId: 'com.morrisons.matchandmore.app', note: 'Grocery loyalty app where campaign and rewards surfaces need scheduled updates.' },
      { appId: 'net.groceryshopping.SproutsFarmersMarket', note: 'Retail shopping app where offer content and browse paths change continuously.' },
      { appId: 'com.wegmans.wegmansapp', note: 'Grocery app where checkout, list, and loyalty polish can move independently.' },
    ],
    plays: ['Launch campaign UI on schedule', 'Patch checkout friction quickly', 'A/B test loyalty surfaces'],
  },
  enterprise: {
    label: 'Enterprise',
    headline: 'Workforce and account apps need governed changes at scale',
    useCase:
      'Payroll, carrier, and customer account apps serve many roles and regulated workflows. Enterprise teams need staged rollout, audit-friendly release records, and controlled recovery when an update misbehaves.',
    apps: [
      { appId: 'com.paylocity.paylocitymobile', note: 'Workforce app where payroll, HR, and employee self-service changes need governance.' },
      { appId: 'ua.vodafone.myvodafone', note: 'Carrier account app with payments, plan management, support, and device workflows.' },
      { appId: 'com.orange.miorange', note: 'Telecom self-service app where account and billing surfaces need staged rollout.' },
    ],
    plays: ['Roll out by channel or cohort', 'Track production adoption signals', 'Recover without forcing a store release'],
  },
  fintech: {
    label: 'Fintech',
    headline: 'Banking apps need safe, staged interface fixes',
    useCase:
      'Banking and money apps with accounts, payments, offers, investments, and support flows have to move quickly while preserving trust. Capgo fits fixes that can be shipped through the approved web layer and expanded gradually.',
    apps: [
      { appId: 'com.infrasoft.uboi', note: 'Banking app with account, payment, loan, and offer flows that need controlled rollout.' },
      { appId: 'com.IndianBank.IndOASIS', note: 'Mobile banking surface where reviewed interface changes should expand gradually.' },
      { appId: 'com.orange.mobile.orangemoney', note: 'Wallet app where support copy and transactional UI changes need caution.' },
    ],
    plays: ['Stage rollout after compliance review', 'Patch transactional UI copy fast', 'Keep native version rules strict'],
  },
  healthcare: {
    label: 'Healthcare',
    headline: 'Patient flows change faster than app review',
    useCase:
      'Appointment, health-record, and benefits apps can update intake screens, booking instructions, provider messaging, and patient education without destabilizing the native shell.',
    apps: [
      { appId: 'au.com.hotdoc.android.hotdoc', note: 'Appointment flow where booking instructions and intake copy can change often.' },
      { appId: 'br.gov.datasus.cnsdigital', note: 'Health-record app with public guidance and document flows that must stay current.' },
      { appId: 'br.com.beneficiario.odontoprev', note: 'Benefits app where provider, eligibility, and support journeys need careful patching.' },
    ],
    plays: ['Target updates to care workflows', 'Fix form and booking copy quickly', 'Keep rollback ready for patient impact'],
  },
  'ionic-enterprise-plugins': {
    label: 'Plugin replacement',
    headline: 'Enterprise self-service apps depend on native integrations',
    useCase:
      'Telecom and account apps touch authentication, device state, notifications, support, and payments. Open Capacitor plugins help replace expensive closed SDK coverage one capability at a time.',
    apps: [
      { appId: 'ua.vodafone.myvodafone', note: 'Carrier app with account, top-up, support, and notification surfaces.' },
      { appId: 'com.swisscom.myswisscom', note: 'Self-service app with billing, plan, support, and device-management paths.' },
      { appId: 'com.orange.miorange', note: 'Telecom account app where native capabilities can be replaced incrementally.' },
    ],
    plays: ['Map native features to open plugins', 'Replace SDKs incrementally', 'Ship web updates around native capability work'],
  },
  'lovable-vibecoding-to-mobile': {
    label: 'Web-to-mobile',
    headline: 'Template and learning products are natural mobile candidates',
    useCase: 'Creation and learning apps show how web-style flows can become store-ready mobile experiences when packaging, signing, and updates are handled cleanly.',
    apps: [
      { appId: 'com.greetingsisland.sam', note: 'Template-driven design flow that maps naturally from responsive web to mobile.' },
      { appId: 'com.jernung.infinite.jpn', note: 'Focused learning app where small lesson and onboarding improvements compound.' },
      { appId: 'com.studysmarter', note: 'Study workflow where web product iteration can continue after app packaging.' },
    ],
    plays: ['Wrap responsive web flows in Capacitor', 'Use hosted builds for store packages', 'Improve templates through live updates'],
  },
  'pr-preview': {
    label: 'PR preview',
    headline: 'Product apps need reviewable mobile changes',
    useCase:
      'Learning, event, and community apps can have onboarding, practice, live-session, and subscription changes under review at the same time. PR previews let product, QA, and support inspect a mobile-ready build before merge.',
    apps: [
      { appId: 'com.studysmarter', note: 'Education app where lesson, course, and subscription changes need stakeholder review.' },
      { appId: 'com.polleverywhere.mobile', note: 'Live engagement app where event flows should be tested before merge.' },
      { appId: 'org.lichess.mobileapp', note: 'Community app where tournament and analysis screens benefit from device previews.' },
    ],
    plays: ['Preview every pull request on device', 'Share review links with stakeholders', 'Catch mobile layout issues pre-merge'],
  },
  'production-updates': {
    label: 'Production updates',
    headline: 'High-traffic apps need reliable UI changes in production',
    useCase:
      'Forecast and game apps depend on accurate interfaces, events, and navigation. Production updates help ship approved interface fixes while monitoring adoption before expanding further.',
    apps: [
      { appId: 'com.windyty.android', note: 'Weather app where maps, alerts, and navigation fixes need careful production expansion.' },
      { appId: 'air.com.playtika.slotomania', note: 'High-traffic game surface where event and promotion UI needs fast recovery.' },
      { appId: 'com.playtika.caesarscasino', note: 'Casino game app where live content and interface polish move frequently.' },
    ],
    plays: ['Start with a small rollout', 'Watch adoption and failure signals', 'Expand only when the update is healthy'],
  },
  qsr: {
    label: 'QSR',
    headline: 'Restaurant apps change menus and campaigns constantly',
    useCase:
      'Quick-service restaurant apps can update promotions, restaurant finder content, ordering notices, and regional campaign entry points without waiting for store approval.',
    apps: [
      { appId: 'de.burgerking.kingfinder', note: 'Restaurant app with vouchers, finder content, and campaign surfaces.' },
      { appId: 'com.jackintheboxinc.JackMobileApp', note: 'Ordering app where menu, rewards, and checkout guidance can change quickly.' },
      { appId: 'com.dennys.mobile', note: 'Restaurant app where loyalty and food-ordering paths need frequent polish.' },
    ],
    plays: ['Launch local campaign surfaces', 'Fix ordering copy during rush periods', 'Route changes by region or channel'],
  },
  'set-and-forget': {
    label: 'Set and forget',
    headline: 'Account apps need quiet, automatic maintenance',
    useCase:
      'Telecom and support apps have billing, plan, support, and device workflows that must stay current without asking users to install a new binary for every small improvement.',
    apps: [
      { appId: 'com.swisscom.myswisscom', note: 'Account app where support, plan, and billing changes should ship quietly.' },
      { appId: 'ua.vodafone.myvodafone', note: 'Carrier self-service app where users should not manage every minor update.' },
      { appId: 'br.com.oi.tecnicovirtual', note: 'Support app where diagnostic and help flows need maintenance without release overhead.' },
    ],
    plays: ['Install once, update automatically', 'Keep support flows current', 'Reduce manual release overhead'],
  },
  'solo-developers': {
    label: 'Solo developers',
    headline: 'Focused apps reward fast iteration',
    useCase:
      'Learning, community, and creator apps can improve lessons, onboarding, templates, and upgrade prompts without a big release process. A solo developer keeps momentum by shipping small, reversible web-layer changes.',
    apps: [
      { appId: 'com.jernung.infinite.jpn', note: 'Focused language-learning app where small course improvements matter.' },
      { appId: 'org.lichess.mobileapp', note: 'Open community app where product polish can ship in smaller steps.' },
      { appId: 'com.greetingsisland.sam', note: 'Creator app where template and onboarding changes can be tested quickly.' },
    ],
    plays: ['Ship course polish without app review', 'Fix onboarding issues quickly', 'Rollback when an experiment misses'],
  },
  startups: {
    label: 'Startups',
    headline: 'Audience apps need rapid product iteration',
    useCase:
      'Interactive, education, and survey apps can tune onboarding, live event flows, and engagement prompts every week. Startups can use Capgo to learn faster without turning every experiment into a store release.',
    apps: [
      { appId: 'com.polleverywhere.mobile', note: 'Live audience app where activation and event-flow experiments need quick turns.' },
      { appId: 'com.studysmarter', note: 'Learning app where onboarding, study paths, and subscription surfaces need iteration.' },
      { appId: 'net.bitburst.pollpay', note: 'Survey app where rewards and engagement prompts can be adjusted frequently.' },
    ],
    plays: ['Test activation changes quickly', 'Patch live event friction', 'Move from beta to production channels'],
  },
  'version-targeting': {
    label: 'Version targeting',
    headline: 'Public apps must support old and new native versions',
    useCase:
      'Civic, health, and forecast apps may support older Android versions and different device generations. Version targeting keeps each native build on the newest compatible web bundle without forcing one update path for everyone.',
    apps: [
      { appId: 'br.jus.tse.eleitoral.etitulo', note: 'Civic identity app with broad public device compatibility needs.' },
      { appId: 'br.gov.datasus.cnsdigital', note: 'Health app where older and newer native shells may need different web bundles.' },
      { appId: 'com.windyty.android', note: 'Weather app where device capability and map performance can vary by version.' },
    ],
    plays: ['Serve bundles by native version', 'Protect older devices from incompatible UI', 'Move modern users ahead safely'],
  },
  'white-label': {
    label: 'White label',
    headline: 'Regional media and carrier apps share a core but need local control',
    useCase:
      'Regional sports, entertainment, and telecom brands can reuse one app foundation while changing schedules, campaigns, support, and market-specific content for each brand or country.',
    apps: [
      { appId: 'gt.com.tigosports', note: 'Regional sports media app where schedules and local content need market control.' },
      { appId: 'de.tvspielfilm', note: 'Entertainment guide where content surfaces vary by market and programming window.' },
      { appId: 'com.orange.miorange', note: 'Carrier app where shared account patterns still need local product and support content.' },
    ],
    plays: ['Separate channels by brand or region', 'Reuse one release workflow', 'Patch market-specific content fast'],
  },
}
