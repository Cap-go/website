/**
 * One-off generator for fallback SVG illustrations (Capgo palette, iconographic).
 * Run: node scripts/generate-app-store-refusal-illustrations.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../apps/web/public/app-store-refusal-horror-story/illustrations')

const ACCENT = '#44BCFF'
const INK = '#111827'
const MUTED = '#374151'
const SOFT = '#9CA3AF'
const BG = '#0F172A'

function wrap(body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" role="img" aria-label="${title}">
  <title>${title}</title>
  <rect width="320" height="200" fill="${BG}" rx="16"/>
  ${body}
</svg>`
}

function accentDot(x, y, r = 10, opacity = 0.35) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${ACCENT}" opacity="${opacity}"/>`
}

const drawers = {
  '4-3': (v) => {
    const n = 3 + (v % 4)
    const cards = []
    for (let i = 0; i < n; i++) {
      const y = 48 + i * 14
      const w = 140 - i * 8
      cards.push(`<rect x="${90 + i * 6}" y="${y}" width="${w}" height="52" rx="10" fill="${INK}" stroke="${i === n - 1 ? ACCENT : MUTED}" stroke-width="2"/>`)
    }
    return wrap(
      `${accentDot(48, 42, 28)}${accentDot(270, 160, 18, 0.25)}${cards.join('')}
      <path d="M72 150h176" stroke="${SOFT}" stroke-width="2" stroke-dasharray="6 6" opacity="0.5"/>`,
      'Stacked app cards, guideline 4.3 spam',
    )
  },
  '4-2-6': (v) =>
    wrap(
      `${accentDot(260, 36, 22)}
      <rect x="56" y="44" width="96" height="112" rx="8" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <rect x="${168 + v * 4}" y="56" width="96" height="112" rx="8" fill="${INK}" stroke="${ACCENT}" stroke-width="2" opacity="0.95"/>
      <path d="M88 72h32M88 92h56M88 112h40" stroke="${SOFT}" stroke-width="3" stroke-linecap="round"/>
      <path d="M200 72h32M200 92h56" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round" opacity="0.8"/>`,
      'Duplicate template windows',
    ),
  '3-1-2': (v) =>
    wrap(
      `${accentDot(52, 156, 24, 0.3)}
      <rect x="88" y="48" width="144" height="104" rx="12" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <text x="160" y="${110 + v * 2}" text-anchor="middle" fill="${ACCENT}" font-family="system-ui,sans-serif" font-size="42" font-weight="700">$</text>
      <rect x="108" y="132" width="104" height="8" rx="4" fill="${SOFT}" opacity="0.5"/>`,
      'Subscription price prominence',
    ),
  '5-1-2': (v) =>
    wrap(
      `${accentDot(270, 48, 20)}
      <path d="M160 44 L210 64 V104 C210 132 160 156 160 156 C160 156 110 132 110 104 V64 Z" fill="${INK}" stroke="${ACCENT}" stroke-width="2"/>
      <circle cx="160" cy="98" r="22" fill="none" stroke="${ACCENT}" stroke-width="2"/>
      <circle cx="160" cy="98" r="8" fill="${ACCENT}" opacity="${0.5 + v * 0.1}"/>`,
      'Privacy and tracking shield',
    ),
  '2-1': (v) =>
    wrap(
      `${accentDot(44, 160, 18, 0.28)}
      <rect x="92" y="52" width="136" height="96" rx="10" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <circle cx="160" cy="100" r="36" fill="none" stroke="${ACCENT}" stroke-width="3"/>
      <path d="M142 100h36M160 82v36" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round" transform="rotate(${v * 8} 160 100)"/>`,
      'App completeness stamp',
    ),
  metadata: (v) =>
    wrap(
      `${accentDot(268, 152, 22, 0.25)}
      <rect x="72" y="40" width="176" height="120" rx="10" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <rect x="92" y="60" width="16" height="16" rx="3" fill="none" stroke="${v % 2 ? ACCENT : SOFT}" stroke-width="2"/>
      <path d="M116 68h96" stroke="${SOFT}" stroke-width="3" stroke-linecap="round"/>
      <rect x="92" y="88" width="16" height="16" rx="3" fill="${ACCENT}" opacity="0.2" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M116 96h72" stroke="${SOFT}" stroke-width="3" stroke-linecap="round"/>`,
      'Metadata and IAP checkboxes',
    ),
  'endless-review': (v) =>
    wrap(
      `${accentDot(52, 48, 20, 0.3)}
      <circle cx="160" cy="104" r="56" fill="none" stroke="${MUTED}" stroke-width="3"/>
      <path d="M160 48 V104 L200 124" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M216 88 A56 56 0 0 1 160 160" fill="none" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round" opacity="${0.6 + v * 0.08}"/>`,
      'Long review wait clock',
    ),
  'account-termination': (v) =>
    wrap(
      `${accentDot(270, 160, 24, 0.22)}
      <rect x="100" y="48" width="120" height="104" rx="12" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <path d="M130 88 L190 128 M190 88 L130 128" stroke="${ACCENT}" stroke-width="4" stroke-linecap="round" opacity="${0.85 + v * 0.05}"/>`,
      'Account termination',
    ),
  'login-requirement': (v) =>
    wrap(
      `${accentDot(48, 56, 18)}
      <rect x="118" y="70" width="84" height="72" rx="10" fill="${INK}" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M148 108 C148 96 172 96 172 108 V118 C172 130 148 130 148 118 Z" fill="none" stroke="${ACCENT}" stroke-width="2"/>
      <circle cx="160" cy="104" r="6" fill="${ACCENT}"/>
      <path d="M88 140h144" stroke="${SOFT}" stroke-width="2" stroke-dasharray="5 5" opacity="${0.4 + v * 0.1}"/>`,
      'Sign in required lock',
    ),
  login: (v) =>
    wrap(
      `${accentDot(262, 52, 20, 0.28)}
      <rect x="108" y="64" width="104" height="88" rx="12" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <path d="M136 112 H184" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round"/>
      <path d="M168 96 L184 112 L168 128" fill="none" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(${v * 2} 0)"/>`,
      'Social login flow',
    ),
  'objectionable-content': (v) =>
    wrap(
      `${accentDot(56, 164, 16, 0.35)}
      <path d="M160 52 L220 164 H100 Z" fill="${INK}" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M160 88 V124" stroke="${ACCENT}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="160" cy="136" r="4" fill="${ACCENT}" opacity="${0.7 + v * 0.1}"/>`,
      'Objectionable content warning',
    ),
  'enrollment-account': (v) =>
    wrap(
      `${accentDot(270, 44, 18, 0.3)}
      <rect x="88" y="56" width="144" height="88" rx="10" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <circle cx="128" cy="96" r="16" fill="none" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M156 84 H200 M156 100 H188 M156 116 H196" stroke="${SOFT}" stroke-width="3" stroke-linecap="round" opacity="${0.5 + v * 0.15}"/>`,
      'Developer enrollment ID card',
    ),
  'simulated-gambling': (v) =>
    wrap(
      `${accentDot(48, 148, 22, 0.25)}
      <circle cx="160" cy="104" r="44" fill="${INK}" stroke="${ACCENT}" stroke-width="3"/>
      <text x="160" y="118" text-anchor="middle" fill="${ACCENT}" font-family="system-ui,sans-serif" font-size="28" font-weight="700">$</text>
      <circle cx="${200 + v * 2}" cy="72" r="6" fill="${ACCENT}" opacity="0.6"/>`,
      'Simulated gambling coin',
    ),
  'fake-documents': (v) =>
    wrap(
      `${accentDot(264, 156, 20, 0.22)}
      <path d="M96 48 H200 L224 72 V152 H96 Z" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <circle cx="184" cy="120" r="20" fill="none" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M176 120 L182 126 L192 112" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round" opacity="${0.7 + v * 0.1}"/>`,
      'Document with seal',
    ),
  'ai-data-sharing': (v) =>
    wrap(
      `${accentDot(52, 52, 18, 0.32)}
      <rect x="72" y="88" width="48" height="48" rx="10" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <rect x="200" y="72" width="56" height="56" rx="14" fill="${INK}" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M120 112 H200" stroke="${ACCENT}" stroke-width="2" stroke-dasharray="6 4" opacity="${0.5 + v * 0.12}"/>
      <circle cx="228" cy="100" r="8" fill="${ACCENT}" opacity="0.5"/>`,
      'AI data sharing nodes',
    ),
  '2-3-7': (v) =>
    wrap(
      `${accentDot(268, 44, 18, 0.28)}
      <rect x="80" y="48" width="72" height="128" rx="12" fill="${INK}" stroke="${v % 2 ? ACCENT : MUTED}" stroke-width="2"/>
      <rect x="168" y="48" width="72" height="128" rx="12" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <path d="M104 120h24" stroke="${SOFT}" stroke-width="3" stroke-linecap="round"/>
      <path d="M192 100h24" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round" opacity="0.85"/>`,
      'Screenshot metadata frames',
    ),
  '2-3-6': (v) =>
    wrap(
      `${accentDot(52, 44, 20, 0.3)}
      <rect x="96" y="56" width="128" height="88" rx="12" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <text x="160" y="108" text-anchor="middle" fill="${ACCENT}" font-family="system-ui,sans-serif" font-size="36" font-weight="700">18+</text>
      <path d="M120 132h80" stroke="${SOFT}" stroke-width="3" stroke-linecap="round" opacity="${0.45 + v * 0.1}"/>`,
      'Age rating metadata',
    ),
  '2-3-2': (v) =>
    wrap(
      `${accentDot(270, 160, 18, 0.25)}
      <rect x="72" y="44" width="176" height="112" rx="10" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <path d="M96 72h120 M96 96h96 M96 120h108" stroke="${SOFT}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="220" cy="88" r="10" fill="${ACCENT}" opacity="${0.5 + v * 0.15}"/>`,
      'App metadata lines',
    ),
  '4-2': (v) =>
    wrap(
      `${accentDot(48, 152, 22, 0.28)}
      <rect x="108" y="52" width="104" height="96" rx="8" fill="${INK}" stroke="${MUTED}" stroke-width="2"/>
      <path d="M128 76h64 M128 96h48 M128 116h56" stroke="${SOFT}" stroke-width="3" stroke-linecap="round"/>
      <rect x="${140 + v * 4}" y="128" width="40" height="8" rx="4" fill="${ACCENT}" opacity="0.75"/>`,
      'Minimum functionality book block',
    ),
}

const maxVariants = {
  '4-3': 11,
  '2-1': 6,
  'endless-review': 6,
  'account-termination': 2,
  '4-2-6': 1,
  '3-1-2': 1,
  '5-1-2': 1,
  metadata: 6,
  'login-requirement': 1,
  login: 1,
  'objectionable-content': 1,
  'enrollment-account': 2,
  'simulated-gambling': 1,
  'fake-documents': 1,
  'ai-data-sharing': 1,
  '2-3-7': 1,
  '2-3-6': 1,
  '2-3-2': 1,
  '4-2': 1,
}

await mkdir(outDir, { recursive: true })
let count = 0
for (const [tag, draw] of Object.entries(drawers)) {
  const max = maxVariants[tag] ?? 1
  for (let v = 0; v < max; v++) {
    const svg = draw(v)
    const file = join(outDir, `${tag}-${v}.svg`)
    await writeFile(file, svg, 'utf8')
    count++
  }
}
console.log(`Wrote ${count} illustration SVGs to ${outDir}`)
