// Social card catalog for scripts/generate-social-images.ts: one same-shaped entry per page.

export type SocialImage = {
  slug: string
  output: string
  eyebrow: string
  title: string[]
  subtitle: string
  accent: string
  accentSoft: string
  chips: string[]
  codeLines: string[]
  cards: { label: string; value: string }[]
  phoneTitle: string
  phoneRows: string[]
  /** Real console capture under apps/web/public/landing-demos, cropped in image pixels. */
  screenshot?: { file: string; crop: Crop }
}

type Crop = { x: number; y: number; width: number; height: number }

/** Card framing a real console capture: the screenshot replaces the subtitle, chips, and drawn mock UI. */
function screenshotCard(slug: string, eyebrow: string, title: string[], file: string, crop: Crop): SocialImage {
  return {
    slug,
    output: `apps/web/public/social/capgo-${slug}.png`,
    eyebrow,
    title,
    subtitle: '',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    chips: [],
    codeLines: [],
    cards: [],
    phoneTitle: '',
    phoneRows: [],
    screenshot: { file, crop },
  }
}

export const images: SocialImage[] = [
  {
    slug: 'home',
    output: 'apps/web/public/capgo_social.png',
    eyebrow: 'Capgo platform',
    title: ['Ship Capacitor', 'apps faster'],
    subtitle: 'Live updates, native builds, plugins, and release control for teams that cannot wait on store review.',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    chips: ['Live updates', 'Cloud builds', 'Rollback', 'Plugins'],
    codeLines: ['capgo upload --channel production', 'Bundle signed and encrypted', 'Rollout started at 10 percent', 'Monitoring crash-free sessions'],
    cards: [
      { label: 'Release path', value: 'Web + native' },
      { label: 'Control', value: 'Channels' },
    ],
    phoneTitle: 'Production rollout',
    phoneRows: ['Beta 100%', 'Prod 10%', 'Rollback ready'],
  },
  {
    slug: 'live-update',
    output: 'apps/web/public/social/capgo-live-update.png',
    eyebrow: 'Live updates',
    title: ['Fix production', 'without review delay'],
    subtitle: 'Roll bundles out to a share of devices, pause automatically when failures rise, and revert in one click.',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    chips: ['Instant fixes', 'Version targeting', 'Audit logs', 'Rollback'],
    codeLines: ['capgo upload --channel hotfix', 'Target: iOS 4.18.0 and newer', 'Rollout: 25 percent of production', 'Health check passed before promotion'],
    cards: [
      { label: 'Release guard', value: 'Staged' },
      { label: 'Recovery', value: '1 click' },
    ],
    phoneTitle: 'Hotfix channel',
    phoneRows: ['Staged rollout', 'Crash guard', 'Promote when healthy'],
    screenshot: { file: 'console/rollout.webp', crop: { x: 400, y: 890, width: 1760, height: 498 } },
  },
  {
    slug: 'observe',
    output: 'apps/web/public/social/capgo-observe.png',
    eyebrow: 'Capgo Observe',
    title: ['See what every release', 'does on real devices'],
    subtitle: 'Live release health, failure causes, native app health, and device logs, reported by real devices.',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    chips: ['Version health', 'Release markers', 'Logs Insights', 'Raw logs'],
    codeLines: ['Reported version health', 'Launch and WebView timing', 'Release markers for timing', 'Open Logs Insights evidence'],
    cards: [
      { label: 'Version signals', value: 'Reported' },
      { label: 'Next step', value: 'Investigate' },
    ],
    phoneTitle: 'Observe health',
    phoneRows: ['Version health', 'Release markers', 'Logs Insights'],
    screenshot: { file: 'observe/observe-live-release.webp', crop: { x: 400, y: 380, width: 1700, height: 480 } },
  },
  {
    slug: 'native-build',
    output: 'apps/web/public/social/capgo-native-build.png',
    eyebrow: 'Native build',
    title: ['Signed iOS and', 'Android builds from CI'],
    subtitle: 'Signed iOS and Android builds with status, duration, and failure reasons in one console.',
    accent: '#0f766e',
    accentSoft: '#ccfbf1',
    chips: ['GitHub Actions', 'Build logs', 'Signing', 'Artifacts'],
    codeLines: ['capgo build ios --profile release', 'Credentials loaded from secure vault', 'Xcode archive finished', 'Android bundle queued next'],
    cards: [
      { label: 'Platforms', value: 'iOS + Android' },
      { label: 'Output', value: 'Store ready' },
    ],
    phoneTitle: 'Build pipeline',
    phoneRows: ['Checkout', 'Sign', 'Archive'],
    screenshot: { file: 'console/builds.webp', crop: { x: 400, y: 240, width: 1760, height: 498 } },
  },
  {
    slug: 'app-mobile',
    output: 'apps/web/public/social/capgo-app-mobile.png',
    eyebrow: 'Mobile app',
    title: ['Run releases', 'from your phone'],
    subtitle: 'Test versions, watch rollouts, switch channels, and recover when you are away from your desk.',
    accent: '#7c3aed',
    accentSoft: '#ede9fe',
    chips: ['Test builds', 'Monitor', 'Deploy', 'Rollback'],
    codeLines: ['Release approved from mobile', 'Beta testers moved to v42', 'Production stays pinned', 'Alert acknowledged by owner'],
    cards: [
      { label: 'Action', value: 'Deploy' },
      { label: 'Fallback', value: 'Rollback' },
    ],
    phoneTitle: 'Release control',
    phoneRows: ['Test version', 'Promote beta', 'Rollback prod'],
  },
  {
    slug: 'plugins',
    output: 'apps/web/public/social/capgo-plugins.png',
    eyebrow: 'Capacitor plugins',
    title: ['Native plugins', 'ready for production'],
    subtitle: 'Use maintained, auditable Capacitor plugins with docs, examples, and native support when your app needs more than the web.',
    accent: '#059669',
    accentSoft: '#d1fae5',
    chips: ['Open source', 'Documented', 'Native APIs', 'Support'],
    codeLines: ['Install the plugin package', 'Sync the native project', 'Use native APIs without rewrites', 'Ship with implementation guides'],
    cards: [
      { label: 'Native access', value: 'iOS + Android' },
      { label: 'Source', value: 'Auditable' },
    ],
    phoneTitle: 'Plugin stack',
    phoneRows: ['Auth', 'Files', 'Purchases'],
  },
  {
    slug: 'ionic-plugins',
    output: 'apps/web/public/social/capgo-ionic-plugins.png',
    eyebrow: 'Ionic plugin path',
    title: ['Replace closed plugin', 'contracts with control'],
    subtitle: 'Move plugin risk into open source code, public migration guides, and paid help only where your team needs it.',
    accent: '#16a34a',
    accentSoft: '#dcfce7',
    chips: ['Open source first', 'Migration guides', 'Native help', 'No lock-in'],
    codeLines: ['Audit native code before shipping', 'Map plugin usage to open packages', 'Keep migration work visible', 'Get expert help when needed'],
    cards: [
      { label: 'Model', value: 'Open code' },
      { label: 'Help', value: 'On demand' },
    ],
    phoneTitle: 'Migration plan',
    phoneRows: ['Audit', 'Replace', 'Verify'],
  },
  {
    slug: 'security-scanner',
    output: 'apps/web/public/social/capgo-security-scanner.png',
    eyebrow: 'Security scanner',
    title: ['Find Capacitor', 'security issues early'],
    subtitle: 'Scan locally for hardcoded secrets, risky native config, and release blockers before they reach production.',
    accent: '#9333ea',
    accentSoft: '#f3e8ff',
    chips: ['Local scan', 'CI ready', 'Secrets', 'Config rules'],
    codeLines: ['bunx @capgo/capgo-sec scan', 'Checking AndroidManifest.xml', 'Checking Info.plist', 'No secrets uploaded'],
    cards: [
      { label: 'Scan', value: 'Local' },
      { label: 'Pipeline', value: 'CI ready' },
    ],
    phoneTitle: 'Security report',
    phoneRows: ['Secrets', 'Permissions', 'Native config'],
  },
  {
    slug: 'ci-cd',
    output: 'apps/web/public/social/capgo-ci-cd.png',
    eyebrow: 'Mobile CI/CD',
    title: ['Automate signed', 'mobile releases'],
    subtitle: 'Connect builds, signing, artifacts, live updates, and rollback into a pipeline your mobile team can trust.',
    accent: '#dc2626',
    accentSoft: '#fee2e2',
    chips: ['Build', 'Sign', 'Submit', 'Release'],
    codeLines: ['github actions: capgo build', 'Artifacts signed and stored', 'Live update channel prepared', 'Release notes attached'],
    cards: [
      { label: 'Pipeline', value: 'Repeatable' },
      { label: 'Release', value: 'Traceable' },
    ],
    phoneTitle: 'CI/CD flow',
    phoneRows: ['Commit', 'Build', 'Release'],
  },
  {
    slug: 'integrations',
    output: 'apps/web/public/social/capgo-integrations.png',
    eyebrow: 'Integrations',
    title: ['Connect Capgo', 'to your stack'],
    subtitle: 'Bring release automation into the tools your team already uses for builds, alerts, analytics, and deployment work.',
    accent: '#0891b2',
    accentSoft: '#cffafe',
    chips: ['CI providers', 'Alerts', 'Analytics', 'Partners'],
    codeLines: ['Connect existing CI provider', 'Send release events to your stack', 'Route alerts to the right owner', 'Keep delivery visible'],
    cards: [
      { label: 'Workflow', value: 'Connected' },
      { label: 'Ops', value: 'Visible' },
    ],
    phoneTitle: 'Release signals',
    phoneRows: ['Build', 'Deploy', 'Alert'],
  },
  {
    slug: 'skills',
    output: 'apps/web/public/social/capgo-skills.png',
    eyebrow: 'Capgo skills',
    title: ['Teach your AI agent', 'Capacitor and Capgo'],
    subtitle: 'Open-source skills that give Claude Code, Codex, Cursor, and other agents real Capacitor, live update, and build knowledge.',
    accent: '#7c3aed',
    accentSoft: '#ede9fe',
    chips: ['Open source', 'Live updates', 'Native builds', 'Migrations'],
    codeLines: ['npx skills add Cap-go/capgo-skills', 'capgo-cli-usage installed', 'capacitor-plugins installed', 'Agent ready to ship releases'],
    cards: [
      { label: 'Agents', value: 'Any agent' },
      { label: 'Source', value: 'Open' },
    ],
    phoneTitle: 'Agent skills',
    phoneRows: ['CLI usage', 'Plugins', 'Migrations'],
  },
  {
    slug: 'agents',
    output: 'apps/web/public/social/capgo-agents.png',
    eyebrow: 'AI agents',
    title: ['Ship mobile apps', 'from your AI agent'],
    subtitle: 'Connect Claude Code, Codex, or Cursor to Capgo with MCP to build, sign, and release Capacitor apps without leaving the chat.',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    chips: ['MCP server', 'Claude Code', 'Codex', 'Cursor'],
    codeLines: ['agent: release this fix to beta', 'capgo_upload_bundle via MCP', 'Channel beta updated', 'Devices updating now'],
    cards: [
      { label: 'Interface', value: 'MCP' },
      { label: 'Output', value: 'Live release' },
    ],
    phoneTitle: 'Agent release',
    phoneRows: ['Build', 'Upload', 'Rollout'],
  },
  screenshotCard('notifications', 'Capgo Notifications', ['Push campaigns you', 'can actually measure'], 'console/notifications.webp', {
    x: 400,
    y: 430,
    width: 1760,
    height: 498,
  }),
  screenshotCard('enterprise', 'Capgo Enterprise', ['Governed releases', 'your security team trusts'], 'console/audit-logs.webp', { x: 400, y: 400, width: 1760, height: 498 }),
  screenshotCard('cli', 'Capgo CLI', ['Release from your terminal,', 'CI, or AI agent'], 'console/api-keys.webp', { x: 400, y: 370, width: 1760, height: 498 }),
  screenshotCard('vs-capawesome', 'Capgo vs Capawesome', ['Real device stats,', 'not network guesses'], 'observe/observe-native-health.webp', {
    x: 400,
    y: 430,
    width: 1700,
    height: 480,
  }),
]
