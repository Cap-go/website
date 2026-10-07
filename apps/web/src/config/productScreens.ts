export interface ProductScreen {
  id: string
  label: string
  title: string
  text: string
  points?: string[]
  image: string
  mobileImage?: string
  /** Intrinsic size of `image`; defaults to the 1440x900 desktop capture. */
  width?: number
  height?: number
  alt: string
  href?: string
  linkLabel?: string
}

// Real console screenshots captured from the Capgo demo app (fake data, no customer info).
// Desktop: 1440px-wide viewport at 1.5x. Mobile: 430px viewport at 2x.
const base = '/landing-demos/observe'
const consoleBase = '/landing-demos/console'

export type ProductScreenId =
  | 'live-release'
  | 'update-health'
  | 'native-health'
  | 'compatibility'
  | 'plugins'
  | 'logs'
  | 'rollout'
  | 'channels'
  | 'bundle-dependencies'
  | 'device-history'
  | 'builds'
  | 'notifications'
  | 'security'
  | 'members'
  | 'app-access'
  | 'audit-logs'
  | 'api-keys'
  | 'webhooks'

const screens: Record<ProductScreenId, ProductScreen> = {
  'live-release': {
    id: 'live-release',
    label: 'Live release',
    title: 'Watch a release land, minute by minute',
    text: 'The moment a bundle goes live, Observe tracks installs, failed attempts, adoption, and success rate for that exact version and channel in 5-minute buckets.',
    points: [
      'Know within minutes whether a rollout is healthy, not after support tickets',
      'Top failure reasons ranked for the release that is live right now',
      'Jump from the release to its bundle or channel statistics',
    ],
    image: `${base}/observe-live-release.webp`,
    mobileImage: `${base}/observe-live-release-mobile.webp`,
    alt: 'Capgo Observe live release view showing version 4.8.1 on production with adoption, installs, failed attempts, success rate, an installs and failures chart, and top failure reasons',
  },
  'update-health': {
    id: 'update-health',
    label: 'Update health',
    title: 'See which update failures actually matter',
    text: 'Failed downloads, checksum mismatches, unzip errors, and rollbacks are grouped by cause, so you can tell a flaky network from a broken bundle.',
    points: [
      'Every failure tagged as network or device, bundle, or rollback',
      'Daily trend per failure type for the selected period',
      'Top affected versions and devices, one click from their logs',
    ],
    image: `${base}/observe-update-health.webp`,
    mobileImage: `${base}/observe-update-health-mobile.webp`,
    alt: 'Capgo Observe update health view showing update failures, affected devices, failure types by cause, a daily failure chart, and top affected versions and devices',
  },
  'native-health': {
    id: 'native-health',
    label: 'Native health',
    title: 'Compare app health by version, not by guesswork',
    text: 'Launch time, WebView load time, crashes, ANRs, and JavaScript errors reported by the Capgo updater, broken down by version, platform, and channel.',
    points: ['Launch P90 and WebView P90 for every reported version', 'Spot the release that introduced a regression', 'Signals come from the updater plugin you already ship'],
    image: `${base}/observe-native-health.webp`,
    mobileImage: `${base}/observe-native-health-mobile.webp`,
    alt: 'Capgo Observe native health view showing tracked devices, launch P90, WebView P90, app health signals, timing charts, and a version breakdown table',
  },
  compatibility: {
    id: 'compatibility',
    label: 'Compatibility',
    title: 'Know when an update needs a new native build',
    text: 'When a channel serves a bundle whose native packages differ from what installed apps were built with, Observe flags it, names the blocking packages, and links the dependency diff.',
    points: [
      'Catch a native mismatch before it reaches devices',
      'Accept the change or roll the channel back from the same screen',
      'A full history of every compatibility decision',
    ],
    image: `${base}/observe-compatibility.webp`,
    mobileImage: `${base}/observe-compatibility-mobile.webp`,
    alt: 'Capgo Observe compatibility view warning that a new native build is needed, listing channel changes, blocking native packages, and resolution status',
  },
  plugins: {
    id: 'plugins',
    label: 'Plugin versions',
    title: 'See which updater versions your users really run',
    text: 'Updater plugin versions across production devices, grouped by Capacitor major, with the exact install command for the version to move to.',
    points: [
      'Devices behind the latest updater for their Capacitor major',
      'Plan native releases with real fleet data',
      'A clear reminder that plugin upgrades ship through the stores',
    ],
    image: `${base}/observe-plugins.webp`,
    mobileImage: `${base}/observe-plugins-mobile.webp`,
    alt: 'Capgo Observe plugin versions view showing the suggested updater version, plugin version distribution, and devices per Capacitor major',
  },
  logs: {
    id: 'logs',
    label: 'Logs',
    title: 'Follow any signal down to the device',
    text: 'Every updater and app event with its device ID, version, and error details attached. Filter by action, time range, or device, then export to CSV.',
    points: ['Error messages and status codes stay attached to each event', 'Filter by action, device, or time window', 'CSV export for support tickets and post-mortems'],
    image: `${base}/observe-logs.webp`,
    mobileImage: `${base}/observe-logs-mobile.webp`,
    alt: 'Capgo Observe logs view listing device events with timestamps, device IDs, versions, actions, and attached error messages',
  },
  rollout: {
    id: 'rollout',
    label: 'Progressive rollout',
    title: 'Roll out to a share of devices, pause when it fails',
    text: 'Serve a new bundle to a sticky percentage of devices while everyone else stays on a stable fallback. Auto-pause stops the rollout when the failure rate crosses your threshold.',
    points: [
      'Start small, then promote to every device in one click',
      'Auto-pause on failure rate, with a minimum sample size',
      'Revert to the stable bundle without a store review',
    ],
    image: `${consoleBase}/rollout.webp`,
    width: 1440,
    height: 1100,
    alt: 'Capgo channel page showing 25% of devices receiving bundle 4.8.1, a stable fallback on 4.8.0, progressive rollout controls, and auto-pause settings',
  },
  channels: {
    id: 'channels',
    label: 'Channels',
    title: 'One channel per audience',
    text: 'Production, beta, staging: each channel serves its own bundle to its own devices, and the list shows what every channel is serving right now.',
    points: ['Serving bundle and rollout state for every channel', 'Let testers switch themselves to beta', 'Target iOS, Android, or Electron per channel'],
    image: `${consoleBase}/channels.webp`,
    alt: 'Capgo channels list showing production, beta, staging, and electron channels with their serving bundles and a 25% progressive rollout on production',
  },
  'bundle-dependencies': {
    id: 'bundle-dependencies',
    label: 'Native diff',
    title: 'See exactly which native packages changed',
    text: 'Compare any bundle with the one it replaces. Capgo lists changed, added, and removed native packages and tells you when an update cannot ship over the air.',
    points: ['Changed versions highlighted package by package', 'A clear verdict: OTA-safe or needs a store build', 'The same check the CLI runs before upload'],
    image: `${consoleBase}/bundle-dependencies.webp`,
    alt: 'Capgo bundle dependencies view comparing 4.8.2-beta.1 with 4.8.1, flagging @capacitor/camera and social login version changes as not compatible over the air',
  },
  'device-history': {
    id: 'device-history',
    label: 'Device debug',
    title: 'Debug one device without asking the user',
    text: 'Look up any device by its ID or your own user ID to see the bundle it runs, its channel, and every install or failure it reported.',
    points: ['Search by device ID or your own custom ID', 'Full install and failure history per device', 'Override a device channel for a quick test'],
    image: `${consoleBase}/device-history.webp`,
    alt: 'Capgo device deployments view listing installs and a bundle download failure for one iOS device over the last 30 days',
  },
  builds: {
    id: 'builds',
    label: 'Native builds',
    title: 'Every iOS and Android build in one place',
    text: 'Cloud builds for both stores with status, duration, and failure reasons, plus the build time you used over the period.',
    points: ['Succeeded, failed, and running builds per platform', 'The failure reason stays attached to the build', 'Build minutes tracked against your plan'],
    image: `${consoleBase}/builds.webp`,
    width: 1440,
    height: 1180,
    alt: 'Capgo builds page showing build statistics by platform, build time over 30 days, and a table of iOS and Android release builds with durations and status',
  },
  notifications: {
    id: 'notifications',
    label: 'Notifications',
    title: 'Push campaigns with delivery you can measure',
    text: 'Send broadcasts or targeted pushes from the same console as your releases, and follow each campaign from queued to opened.',
    points: ['APNs and FCM credentials stored encrypted', 'Per-campaign funnel: sent, received, opened', 'Silent update checks to speed up rollouts'],
    image: `${consoleBase}/notifications.webp`,
    width: 1440,
    height: 1100,
    alt: 'Capgo notifications broadcasts view with a campaign list and delivery stats for a campaign: queued, sent, received, opened, and failed',
  },
  security: {
    id: 'security',
    label: 'Security policies',
    title: 'Enforce 2FA and password rules for the whole org',
    text: 'Require two-factor authentication, set a password policy, hash API keys, and require encrypted bundles. See who is compliant before you flip the switch.',
    points: ['2FA enforcement with per-member status', 'Password policy and hashed API keys', 'Encrypted bundles required for every upload'],
    image: `${consoleBase}/security.webp`,
    alt: 'Capgo organization security settings with two-factor authentication enforced and every member compliant',
  },
  members: {
    id: 'members',
    label: 'Roles',
    title: 'Give each person the access they need',
    text: 'Super admin, admin, billing, and member roles at the organization level, with pending invites tracked in the same list.',
    points: ['Org roles from super admin to billing', 'Invite teammates and track pending invites', 'Remove access in one click when someone leaves'],
    image: `${consoleBase}/members.webp`,
    alt: 'Capgo organization members list with super admin, admin, member, and billing manager roles and a pending invite',
  },
  'app-access': {
    id: 'app-access',
    label: 'App access',
    title: 'Scope access per app and per group',
    text: 'Grant a group or a person one role on a single app, such as developer, uploader, preview, or read-only, instead of org-wide rights.',
    points: ['Groups for engineering, QA, and support', 'Least-privilege roles like uploader or reader', 'Channel-level roles when you need them'],
    image: `${consoleBase}/app-access.webp`,
    alt: 'Capgo app access table granting Mobile engineers, QA, and Support groups and individual users scoped app roles',
  },
  'audit-logs': {
    id: 'audit-logs',
    label: 'Audit logs',
    title: 'Know who changed what, and when',
    text: 'Every change to channels, bundles, apps, members, and organization settings is logged with the person or API key behind it.',
    points: ['Rollout changes with before and after values', 'CI uploads attributed to their API key', 'Filter by resource and action for reviews'],
    image: `${consoleBase}/audit-logs.webp`,
    alt: 'Capgo audit log listing channel rollout changes by a teammate, bundle uploads by a CI API key, and organization security changes',
  },
  'api-keys': {
    id: 'api-keys',
    label: 'API keys',
    title: 'Scoped keys for CI, scripts, and AI agents',
    text: 'Create keys limited to one organization or app, with an upload, read, or write mode and an expiry date. Keys can be stored hashed and never shown again.',
    points: ['Upload-only keys for CI pipelines', 'An expiry date on every key', 'Hashed storage when your org requires it'],
    image: `${consoleBase}/api-keys.webp`,
    alt: 'Capgo API keys page listing keys for GitHub Actions, Fastlane, a read-only support dashboard, and the Capgo MCP server, each with an expiry date',
  },
  webhooks: {
    id: 'webhooks',
    label: 'Webhooks',
    title: 'Send release events to Slack, Datadog, or your own service',
    text: 'Subscribe endpoints to bundle, channel, member, and organization changes, and inspect every delivery with its status and response.',
    points: ['Pick the events each endpoint receives', 'Delivery log with response codes and retries', 'Send a test event before going live'],
    image: `${consoleBase}/webhooks.webp`,
    alt: 'Capgo webhooks page with Slack, Datadog, and internal audit endpoints subscribed to bundle, channel, member, and organization events',
  },
}

export function getProductScreens(ids: ProductScreenId[]): ProductScreen[] {
  return ids.map((id) => screens[id])
}
