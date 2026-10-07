export interface ProductScreen {
  id: string
  label: string
  title: string
  text: string
  points?: string[]
  image: string
  mobileImage?: string
  alt: string
  href?: string
  linkLabel?: string
}

// Real console screenshots captured from the Capgo demo app (fake data, no customer info).
// Desktop: 1440x900 viewport at 1.5x. Mobile: 430px viewport at 2x.
const base = '/landing-demos/observe'

export type ObserveScreenId = 'live-release' | 'update-health' | 'native-health' | 'compatibility' | 'plugins' | 'logs'

const screens: Record<ObserveScreenId, ProductScreen> = {
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
}

export function getObserveScreens(ids: ObserveScreenId[]): ProductScreen[] {
  return ids.map((id) => screens[id])
}
