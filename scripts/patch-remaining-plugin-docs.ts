import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
const root = join(import.meta.dir, '..', 'apps/docs/src/content/docs/docs/plugins')
const apply = (slug: string, indexBefore: string, indexInsert: string, gsBefore: string, gsInsert: string) => {
  const ip = join(root, slug, 'index.mdx')
  if (existsSync(ip) && !readFileSync(ip, 'utf8').includes('## Platform support')) {
    const c = readFileSync(ip, 'utf8')
    if (c.includes(indexBefore)) writeFileSync(ip, c.replace(indexBefore, indexInsert + indexBefore))
  }
  const gp = join(root, slug, 'getting-started.mdx')
  if (existsSync(gp) && !readFileSync(gp, 'utf8').includes('## Common pitfalls') && gsBefore) {
    const c = readFileSync(gp, 'utf8')
    if (c.includes(gsBefore)) writeFileSync(gp, c.replace(gsBefore, gsInsert + gsBefore))
  }
}
const plat = (rows: string) => `## Platform support\n\n| Platform | Support | Notes |\n| --- | --- | --- |\n${rows}\n\n`
const gs = (code: string, tips: string[]) =>
  `## Quick start\n\n\`\`\`typescript\n${code}\n\`\`\`\n\n## Common pitfalls\n\n${tips.map((t) => `- ${t}`).join('\n')}\n\n`

apply(
  'transitions',
  '## When To Use It',
  plat('| iOS | Web layer | WKWebView transitions |\n| Android | Web layer | WebView transitions |\n| Web | Yes | Same components |'),
  '## React Setup',
  gs("import '@capgo/capacitor-transitions';", ['Import once at bootstrap.', 'Set direction before route changes.', 'Run bunx cap sync after upgrades.']),
)
apply(
  'notifications',
  '## What Capgo Stores',
  plat('| iOS | Yes | APNs via Capgo |\n| Android | Yes | FCM via Capgo |\n| Web | No | Use web push separately |'),
  '## 1. Configure Capgo Platform Credentials',
  gs("import { CapacitorNotifications } from '@capgo/capacitor-notifications';\nawait CapacitorNotifications.register({ customerUserId: 'signed-id' });", [
    'Use signed customerUserId values from your backend.',
    'Request notification permission before registering.',
    'Verify Capgo credentials in the dashboard.',
  ]),
)
apply(
  'native-map',
  '## Core Capabilities',
  plat('| iOS | Yes | MapKit |\n| Android | Yes | Google Maps |\n| Web | Yes | Google Maps JS |'),
  '## Platform setup',
  gs("import { NativeMap } from '@capgo/capacitor-native-map';\nawait NativeMap.create({ id: 'map', element: document.getElementById('map')!, config: { center: { lat: 0, lng: 0 }, zoom: 10 } });", [
    'Configure Google Maps API keys on Android and web.',
    'Call updateLayout when the container resizes.',
    'Destroy maps when leaving screens.',
  ]),
)
apply(
  'electron-updater',
  '## Key Features',
  plat('| Windows | Yes | Electron |\n| macOS | Yes | Electron |\n| Linux | Yes | Electron |\n| iOS / Android | No | Use capacitor-updater |'),
  '## Setup',
  gs("import { ElectronUpdater } from '@capgo/electron-updater';\nawait ElectronUpdater.notifyAppReady();", [
    'Call notifyAppReady after UI boots.',
    'Match Capgo signing in the main process.',
    'Set update channels before shipping.',
  ]),
)
apply(
  'capacitor-patch',
  '## What it patches',
  plat('| iOS | Hook | cap sync patches |\n| Android | Hook | cap sync patches |\n| Web | N/A | CLI only |'),
  '## Select patch IDs',
  gs('bun add @capgo/capacitor-patch\nbunx cap sync', ['Review version gates before upgrading Capacitor.', 'Install in CI before cap sync.', 'Re-run sync after native edits.']),
)
apply(
  'capacitor-plus',
  '## Philosophy',
  plat('| iOS | Yes | @capacitor/ios replacement |\n| Android | Yes | @capacitor/android replacement |\n| Web | Yes | Web packages |'),
  '## New Project Installation',
  gs('bun add @capgo/capacitor-plus\nbunx cap sync', ['Replace all @capacitor/* deps.', 'Regenerate native projects after migration.', 'Read release notes before bumping.']),
)
apply(
  'pretty-toast',
  '## Demo',
  plat('| iOS | Yes | Native |\n| Android | Yes | Native |\n| Web | Yes | DOM |'),
  '## Show A Toast',
  gs("import { toast } from '@capgo/capacitor-pretty-toast';\nawait toast.success('Saved');", ['Dismiss long running toasts.', 'Register action handlers early.', 'Tune web CSS variables.']),
)
apply(
  'twilio-video',
  '## Core Capabilities',
  plat('| iOS | Yes | Native UI |\n| Android | Yes | Native UI |\n| Web | No | Twilio Video JS |'),
  '## API Overview',
  gs("import { TwilioVideo } from '@capgo/capacitor-twilio-video';\nawait TwilioVideo.login({ accessToken: 'token' });\nawait TwilioVideo.joinRoom({ roomName: 'room' });", [
    'Mint tokens on your server only.',
    'Request camera and microphone permissions.',
    'Handle iOS audio interruptions.',
  ]),
)
apply('contentsquare', '', '', '## Basic usage', gs("import { ContentsquarePlugin } from '@capgo/capacitor-contentsquare';\nawait ContentsquarePlugin.optIn();", ['Respect consent before optIn.', 'Configure dashboard keys.', 'Follow replay privacy rules.']))
apply('cordova-updater', '', '', '## JavaScript usage', `## Quick start\n\n\`\`\`javascript\nawait cordova.plugins.CapgoUpdater.notifyAppReady();\n\`\`\`\n\n## Common pitfalls\n\n- Do not use cordova-plugin-ionic-webview with this plugin.\n- Call notifyAppReady after boot.\n- Keep Cordova scheme settings correct.\n\n`)
const cordova = join(root, 'cordova-updater/index.mdx')
if (existsSync(cordova)) writeFileSync(cordova, readFileSync(cordova, 'utf8').replace('## Supported platforms', '## Platform support'))
