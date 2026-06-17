import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, resolve } from 'node:path'

const width = 2400
const height = 1260

type SocialImage = {
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
}

const images: SocialImage[] = [
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
    subtitle: 'Ship allowed web bundle fixes, roll them out by channel, and recover with rollback when a release misbehaves.',
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
  },
  {
    slug: 'native-build',
    output: 'apps/web/public/social/capgo-native-build.png',
    eyebrow: 'Native build',
    title: ['Signed iOS and', 'Android builds from CI'],
    subtitle: 'Trigger store-ready native builds from your pipeline without rebuilding every signing and runner detail yourself.',
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
]

const logoOuterPath =
  'M264.2 265.3 17 512.5 264.5 760 512 1007.5 759.5 760 1007 512.5 759.8 265.3C623.8 129.3 512.3 18 512 18c-.3 0-111.8 111.3-247.8 247.3zm438.5 55.9C807.4 425.9 893 511.9 893 512.5c0 .5-85.7 86.7-190.5 191.5L512 894.5l-191-191-191-191 190.7-190.7c105-105 191-190.8 191.3-190.8.3 0 86.1 85.6 190.7 190.2z'
const logoInnerPath =
  'M440.8 347c-12.6 12.6-22.8 23.3-22.8 23.7 0 .5 53 53.7 117.8 118.4l117.7 117.7 23.2-23.3 23.1-23.2-47.4-47.4-47.4-47.4 47.5-47.5 47.5-47.5-23.3-23.3-23.2-23.2-47.5 47.5-47.5 47.5-47.5-47.4-47.5-47.5-22.7 22.9zM347 441.2 324.5 464l47.3 47.3 47.2 47.2-47.4 47.7-47.3 47.6 23 23 23 23 47.5-47.5 47.5-47.5 47.3 47.3c26 26 47.5 47.1 47.8 46.9 6.6-6.3 45.6-45.5 45.6-45.9 0-1.2-234.5-235.1-235.5-234.9-.6 0-11.1 10.4-23.5 23z'

function escapeText(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function wrapText(value: string, maxChars: number) {
  const lines: string[] = []
  let current = ''

  for (const word of value.split(' ')) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }

  if (current) lines.push(current)
  return lines
}

function textLine(text: string, x: number, y: number, options: { size: number; color: string; weight?: number; anchor?: 'start' | 'middle'; opacity?: number }) {
  return `<text x="${x}" y="${y}" text-anchor="${options.anchor ?? 'start'}" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="${options.size}" font-weight="${options.weight ?? 500}" fill="${options.color}" opacity="${options.opacity ?? 1}">${escapeText(text)}</text>`
}

function logoTile(x: number, y: number, size: number, accent: string) {
  const scale = (size * 0.62) / 1024
  const offset = size * 0.19

  return `
    <rect x="${x + 10}" y="${y + 14}" width="${size}" height="${size}" rx="42" fill="#0f172a" opacity="0.16"/>
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="42" fill="#0f172a"/>
    <rect x="${x + 8}" y="${y + 8}" width="${size - 16}" height="${size - 16}" rx="36" fill="${accent}" opacity="0.12"/>
    <g transform="translate(${x + offset} ${y + offset}) scale(${scale})">
      <path fill="#ffffff" d="${logoOuterPath}"/>
      <path fill="#ffffff" d="${logoInnerPath}"/>
    </g>`
}

function chips(items: string[], y: number, accent: string) {
  const gap = 24
  const widths = items.map((item) => 42 + item.length * 20)
  const total = widths.reduce((sum, value) => sum + value, 0) + gap * (items.length - 1)
  let x = (width - total) / 2

  return items
    .map((item, index) => {
      const chipWidth = widths[index]
      const output = `
        <rect x="${x}" y="${y}" width="${chipWidth}" height="64" rx="32" fill="#ffffff" stroke="${accent}" stroke-opacity="0.22"/>
        <circle cx="${x + 32}" cy="${y + 32}" r="8" fill="${accent}"/>
        ${textLine(item, x + 56, y + 41, { size: 26, color: '#334155', weight: 700 })}`
      x += chipWidth + gap
      return output
    })
    .join('')
}

function renderCodePanel(image: SocialImage) {
  const x = 285
  const y = 900

  const lines = image.codeLines
    .map((line, index) => {
      const color = index === 0 ? image.accent : index === 1 ? '#dbeafe' : '#94a3b8'
      return textLine(line, x + 52, y + 92 + index * 52, { size: 30, color, weight: index === 0 ? 800 : 600 })
    })
    .join('')

  return `
    <rect x="${x}" y="${y}" width="900" height="352" rx="34" fill="#0f172a"/>
    <rect x="${x + 24}" y="${y + 24}" width="852" height="304" rx="24" fill="#020617"/>
    <circle cx="${x + 58}" cy="${y + 54}" r="11" fill="#ef4444"/>
    <circle cx="${x + 94}" cy="${y + 54}" r="11" fill="#f59e0b"/>
    <circle cx="${x + 130}" cy="${y + 54}" r="11" fill="#22c55e"/>
    ${lines}`
}

function renderCards(image: SocialImage) {
  return image.cards
    .map((card, index) => {
      const x = 1235
      const y = 914 + index * 176
      return `
        <rect x="${x + 8}" y="${y + 12}" width="392" height="138" rx="30" fill="#0f172a" opacity="0.12"/>
        <rect x="${x}" y="${y}" width="392" height="138" rx="30" fill="#ffffff" stroke="#d8e3f1"/>
        ${textLine(card.label, x + 34, y + 50, { size: 25, color: '#64748b', weight: 700 })}
        ${textLine(card.value, x + 34, y + 104, { size: 48, color: '#0f172a', weight: 900 })}`
    })
    .join('')
}

function renderPhone(image: SocialImage) {
  const x = 1695
  const y = 792
  const phoneHeight = 438
  const rowHeight = 52
  const rowGap = 18
  const rowStart = y + 188
  const rows = image.phoneRows
    .map((row, index) => {
      const rowY = rowStart + index * (rowHeight + rowGap)
      return `
        <rect x="${x + 54}" y="${rowY}" width="310" height="${rowHeight}" rx="18" fill="#111827"/>
        <circle cx="${x + 88}" cy="${rowY + rowHeight / 2}" r="9" fill="${image.accent}"/>
        ${textLine(row, x + 112, rowY + 35, { size: 23, color: '#e5e7eb', weight: 700 })}`
    })
    .join('')

  return `
    <rect x="${x + 18}" y="${y + 18}" width="430" height="${phoneHeight}" rx="66" fill="#0f172a" opacity="0.18"/>
    <rect x="${x}" y="${y}" width="430" height="${phoneHeight}" rx="66" fill="#020617"/>
    <rect x="${x + 26}" y="${y + 34}" width="378" height="${phoneHeight - 68}" rx="44" fill="#f8fbff"/>
    <rect x="${x + 152}" y="${y + 48}" width="126" height="18" rx="9" fill="#020617" opacity="0.82"/>
    <rect x="${x + 54}" y="${y + 94}" width="310" height="70" rx="24" fill="${image.accentSoft}"/>
    ${textLine(image.phoneTitle, x + 76, y + 138, { size: 26, color: '#0f172a', weight: 900 })}
    ${rows}`
}

function renderBrowserSurface(image: SocialImage) {
  return `
    <rect x="182" y="804" width="2036" height="570" rx="42" fill="#cdefff" opacity="0.48"/>
    <rect x="178" y="778" width="2044" height="590" rx="42" fill="#ffffff" stroke="#dce9f8"/>
    <rect x="178" y="778" width="2044" height="82" rx="42" fill="#f8fbff"/>
    <rect x="178" y="836" width="2044" height="532" fill="#f8fbff"/>
    <circle cx="240" cy="820" r="12" fill="#ef4444"/>
    <circle cx="278" cy="820" r="12" fill="#f59e0b"/>
    <circle cx="316" cy="820" r="12" fill="#22c55e"/>
    <rect x="384" y="797" width="390" height="46" rx="23" fill="#eef6ff"/>
    ${textLine('capgo.app / ' + image.slug, 424, 828, { size: 22, color: '#64748b', weight: 700 })}
    <circle cx="2092" cy="820" r="14" fill="${image.accent}" opacity="0.22"/>
    <circle cx="2134" cy="820" r="14" fill="${image.accent}" opacity="0.42"/>
    ${renderCodePanel(image)}
    ${renderCards(image)}
    ${renderPhone(image)}`
}

function renderSvg(image: SocialImage) {
  const titleSize = image.title.some((line) => line.length > 31) ? 104 : 118
  const titleLineGap = titleSize + 16
  const titleStart = image.title.length === 1 ? 486 : 454
  const titleEnd = titleStart + (image.title.length - 1) * titleLineGap
  const subtitleLines = wrapText(image.subtitle, 76)

  const titleSvg = image.title
    .map((line, index) => textLine(line, width / 2, titleStart + index * titleLineGap, { size: titleSize, color: '#101827', weight: 950, anchor: 'middle' }))
    .join('')

  const subtitleStart = titleEnd + 54
  const subtitleSvg = subtitleLines
    .map((line, index) => textLine(line, width / 2, subtitleStart + index * 44, { size: 32, color: '#475569', weight: 650, anchor: 'middle' }))
    .join('')

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbfdff"/>
      <stop offset="0.58" stop-color="#f7fbff"/>
      <stop offset="1" stop-color="${image.accentSoft}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1160 880) rotate(90) scale(620 1160)">
      <stop stop-color="${image.accent}" stop-opacity="0.24"/>
      <stop offset="0.55" stop-color="${image.accent}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="${image.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="#9eb7d1" opacity="0.42"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#dots)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  ${logoTile(1144, 52, 112, image.accent)}
  ${textLine(image.eyebrow.toUpperCase(), width / 2, 250, { size: 24, color: image.accent, weight: 900, anchor: 'middle' })}
  ${titleSvg}
  ${subtitleSvg}
  ${chips(image.chips, 704, image.accent)}
  ${chips(image.chips, 704, image.accent)}
  ${renderBrowserSurface(image)}
</svg>`
}

function commandExists(command: string) {
  return spawnSync('/bin/sh', ['-lc', `command -v ${command}`], { stdio: 'ignore' }).status === 0
}

function renderPng(svgPath: string, output: string) {
  mkdirSync(dirname(output), { recursive: true })

  if (commandExists('rsvg-convert')) {
    const result = spawnSync('rsvg-convert', ['-w', String(width), '-h', String(height), '-f', 'png', '-o', output, svgPath], { stdio: 'inherit' })
    if (result.status === 0) return
  }

  if (commandExists('magick')) {
    const result = spawnSync('magick', [svgPath, '-resize', `${width}x${height}!`, output], { stdio: 'inherit' })
    if (result.status === 0) return
  }

  throw new Error('Unable to render social images. Install rsvg-convert or ImageMagick.')
}

const tempDir = mkdtempSync(resolve(tmpdir(), 'capgo-social-'))

try {
  for (const image of images) {
    const svg = renderSvg(image)
    const svgPath = resolve(tempDir, `${image.slug}.svg`)
    const output = resolve(image.output)
    writeFileSync(svgPath, svg)
    renderPng(svgPath, output)
    console.log(`Generated ${output}`)
  }
} finally {
  if (existsSync(tempDir)) rmSync(tempDir, { recursive: true, force: true })
}
