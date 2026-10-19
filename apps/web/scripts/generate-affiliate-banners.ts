/**
 * Generates the affiliate banners and social creatives in public/affiliate.
 * Copy comes from the home page hero (shared/copy/messages.ts) and the logo from src/config,
 * so rerun this after either changes.
 * Run: bun run apps/web/scripts/generate-affiliate-banners.ts
 */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'
import sharp from 'sharp'
import { CAPGO_MARK_PATH } from '../src/config/capgoMark'
import { CAPGO_LOCKUP_MARK_TRANSFORM, CAPGO_LOCKUP_TEXT_X, CAPGO_LOCKUP_VIEWBOX_ATTR, CAPGO_WORDTYPE_PATH, CAPGO_WORDTYPE_TRANSFORM } from '../src/config/capgoWordtype'
import m from '../src/copy/messages'

const PUBLIC_DIR = join(import.meta.dir, '../public')
const OUT_DIR = join(PUBLIC_DIR, 'affiliate')

const copy = {
  line1: m.hero_title_line1(),
  line2: m.hero_title_line2(),
  subtitle: m.hero_subtitle_v2(),
  cta: m.hero_cta_try_free(),
  note: `${m.days_free_trial()}. ${m.no_credit_card_required()}`,
  pill: 'Native builds for CapacitorJS apps',
  features: ['AI agent skills', 'Live updates', 'Native builds', 'One-click rollback'],
}

type Layout = 'bar' | 'stack' | 'split' | 'hero'

interface Creative {
  file: string
  width: number
  height: number
  layout: Layout
  /** Base unit in CSS px; everything scales from it and shrinks until nothing overflows. */
  unit: number
  scale: number
  subtitle?: boolean
  note?: boolean
  /** Let headline lines wrap (narrow formats). */
  wrap?: boolean
  /** Show only the mark instead of the full lockup (tiny formats). */
  markOnly?: boolean
}

const creatives: Creative[] = [
  { file: 'banner-728x90-leaderboard.png', width: 728, height: 90, layout: 'bar', unit: 16, scale: 3 },
  { file: 'banner-468x60.png', width: 468, height: 60, layout: 'bar', unit: 12, scale: 3 },
  { file: 'banner-320x100-mobile.png', width: 320, height: 100, layout: 'stack', unit: 12, scale: 3 },
  { file: 'banner-320x50-mobile.png', width: 320, height: 50, layout: 'bar', unit: 12, scale: 3, markOnly: true },
  { file: 'banner-300x250-medium-rectangle.png', width: 300, height: 250, layout: 'stack', unit: 16, scale: 3, note: true },
  { file: 'banner-300x600-half-page.png', width: 300, height: 600, layout: 'stack', unit: 24, scale: 3, subtitle: true, note: true, wrap: true },
  { file: 'banner-160x600-skyscraper.png', width: 160, height: 600, layout: 'stack', unit: 24, scale: 3, subtitle: true, note: true, wrap: true },
  { file: 'social-1200x628-open-graph.png', width: 1200, height: 628, layout: 'split', unit: 40, scale: 2, subtitle: true, note: true },
  { file: 'social-1080x1080-square.png', width: 1080, height: 1080, layout: 'stack', unit: 60, scale: 2, subtitle: true, note: true },
  { file: 'social-1080x1920-story.png', width: 1080, height: 1920, layout: 'stack', unit: 90, scale: 2, subtitle: true, note: true, wrap: true },
  { file: 'capgo-example-og.png', width: 1200, height: 628, layout: 'split', unit: 40, scale: 2, subtitle: true, note: true },
  { file: 'capgo-example-rectangle.png', width: 800, height: 600, layout: 'split', unit: 30, scale: 2, subtitle: true, note: true, wrap: true },
  { file: 'capgo-example-square.png', width: 1080, height: 1080, layout: 'stack', unit: 60, scale: 2, subtitle: true, note: true },
  { file: 'capgo-example-story.png', width: 1080, height: 1920, layout: 'stack', unit: 90, scale: 2, subtitle: true, note: true, wrap: true },
  { file: 'official-capgo-social-2400x1260.png', width: 2400, height: 1260, layout: 'hero', unit: 80, scale: 1, subtitle: true, note: true },
]

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const markSvg = `<svg class="lockup" xmlns="http://www.w3.org/2000/svg" viewBox="-340 -340 680 680" role="img" aria-label="Capgo"><path fill="#fff" fill-rule="evenodd" transform="rotate(-45) scale(0.7)" d="${CAPGO_MARK_PATH}"/></svg>`

const lockupSvg = `<svg class="lockup" xmlns="http://www.w3.org/2000/svg" viewBox="${CAPGO_LOCKUP_VIEWBOX_ATTR}" role="img" aria-label="Capgo"><g fill="#fff">
  <path fill-rule="evenodd" transform="${CAPGO_LOCKUP_MARK_TRANSFORM}" d="${CAPGO_MARK_PATH}"/>
  <path transform="translate(${CAPGO_LOCKUP_TEXT_X} 0) ${CAPGO_WORDTYPE_TRANSFORM}" d="${CAPGO_WORDTYPE_PATH}"/>
</g></svg>`

function creativeHtml(c: Creative, fontDataUrl: string): string {
  const headline = `<h1><span>${escapeHtml(copy.line1)}</span> <span class="accent">${escapeHtml(copy.line2)}</span></h1>`
  const subtitle = c.subtitle ? `<p class="subtitle">${escapeHtml(copy.subtitle)}</p>` : ''
  const cta = `<div class="cta-wrap"><span class="cta">${escapeHtml(copy.cta)}</span>${c.note ? `<span class="note">${escapeHtml(copy.note)}</span>` : ''}</div>`

  const logo = c.markOnly ? markSvg : lockupSvg
  let body: string
  if (c.layout === 'bar') {
    body = `<div class="content">${logo}<div class="divider"></div>${headline}<span class="cta">${escapeHtml(copy.cta)}</span></div>`
  } else if (c.layout === 'split') {
    body = `<div class="content"><div class="text">${lockupSvg}${headline}${subtitle}${cta}</div><div class="mark"><svg viewBox="-340 -340 680 680"><path fill="#fff" fill-rule="evenodd" transform="rotate(-45) scale(0.7)" d="${CAPGO_MARK_PATH}"/></svg></div></div>`
  } else if (c.layout === 'hero') {
    const chips = copy.features.map((f) => `<span class="chip"><i></i>${escapeHtml(f)}</span>`).join('')
    body = `<div class="content">${lockupSvg}<span class="pill"><b>What's new?</b>${escapeHtml(copy.pill)}</span>${headline}${subtitle}<div class="chips">${chips}</div>${cta}</div>`
  } else {
    body = `<div class="content">${lockupSvg}${headline}${subtitle}${cta}</div>`
  }

  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Satoshi; src: url(${fontDataUrl}) format('woff2'); font-weight: 300 900; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: ${c.width}px; height: ${c.height}px; overflow: hidden; }
body {
  --u: ${c.unit}px;
  font-family: Satoshi, sans-serif; color: #fff; -webkit-font-smoothing: antialiased;
  background:
    radial-gradient(ellipse 60% 70% at 85% 0%, rgba(17, 158, 255, 0.22), transparent 70%),
    radial-gradient(ellipse 50% 60% at 0% 100%, rgba(21, 93, 252, 0.18), transparent 70%),
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px) 0 0 / calc(var(--u) * 3) calc(var(--u) * 3),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px) 0 0 / calc(var(--u) * 3) calc(var(--u) * 3),
    oklch(0.129 0.042 264.695);
}
.content { position: absolute; inset: 0; display: flex; }
.lockup { height: calc(var(--u) * 2.1); width: auto; flex: none; }
h1 { font-weight: 800; letter-spacing: -0.02em; line-height: 1.05; font-size: calc(var(--u) * 3); text-wrap: balance; }
h1 span { display: block; white-space: nowrap; }
.wrap h1 span { white-space: normal; }
.accent { color: #119eff; }
.subtitle { color: oklch(0.707 0.022 261.325); font-weight: 500; line-height: 1.4; font-size: calc(var(--u) * 1.15); text-wrap: pretty; }
.cta-wrap { display: flex; flex-direction: column; gap: calc(var(--u) * 0.7); align-items: inherit; }
.cta {
  display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; flex: none;
  background: oklch(0.546 0.245 262.881); color: #fff; font-weight: 700;
  font-size: calc(var(--u) * 1.2); padding: calc(var(--u) * 0.85) calc(var(--u) * 1.8); border-radius: calc(var(--u) * 0.75);
  box-shadow: 0 0 calc(var(--u) * 2.5) rgba(68, 188, 255, 0.45), 0 calc(var(--u) * 0.4) calc(var(--u) * 1.2) rgba(21, 93, 252, 0.35);
}
.note { color: oklch(0.872 0.01 258.338); font-weight: 500; font-size: calc(var(--u) * 0.8); }

/* Horizontal ad bar */
.bar .content { align-items: center; gap: calc(var(--u) * 1.4); padding: 0 calc(var(--u) * 1.6); }
.bar .lockup { height: calc(var(--u) * 2); }
.bar .divider { width: 1px; align-self: stretch; margin: calc(var(--u) * 1.4) 0; background: rgba(255, 255, 255, 0.15); flex: none; }
.bar h1 { flex: 1; min-width: 0; font-size: calc(var(--u) * 2); }
.bar h1 span { display: block; }
.bar .cta { font-size: calc(var(--u) * 1.15); padding: calc(var(--u) * 0.75) calc(var(--u) * 1.3); }

/* Vertical stack */
.stack .content { flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: calc(var(--u) * 1.5); padding: calc(var(--u) * 1.6); }
.stack .cta-wrap { align-items: center; }
.stack .note { text-align: center; }

/* Landscape split */
.split .content { align-items: center; padding: calc(var(--u) * 2.2) calc(var(--u) * 2.6); gap: calc(var(--u) * 2); }
.split .text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: calc(var(--u) * 1.2); align-items: flex-start; }
.split .text .lockup { margin-bottom: calc(var(--u) * 0.4); }
.split h1 span { display: block; }
.split .mark { flex: none; width: 34%; aspect-ratio: 1; border-radius: 22%; background: #001827; display: grid; place-items: center;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 calc(var(--u) * 5) rgba(17, 158, 255, 0.25); }
.split .mark svg { width: 70%; height: 70%; }

/* Centered hero */
.hero .content { flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: calc(var(--u) * 1.3); padding: calc(var(--u) * 2); }
.hero .pill { display: inline-flex; align-items: center; gap: calc(var(--u) * 0.5); padding: calc(var(--u) * 0.25) calc(var(--u) * 0.8) calc(var(--u) * 0.25) calc(var(--u) * 0.25);
  border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.05); border-radius: 999px; color: oklch(0.869 0.022 252.894); font-size: calc(var(--u) * 0.7); font-weight: 500; }
.hero .pill b { background: #fff; color: oklch(0.129 0.042 264.695); border-radius: 999px; padding: calc(var(--u) * 0.2) calc(var(--u) * 0.6); }
.hero h1 { font-size: calc(var(--u) * 2.7); }
.hero h1 span { display: block; }
.hero .subtitle { max-width: 34em; font-size: calc(var(--u) * 0.85); }
.chips { display: flex; gap: calc(var(--u) * 0.5); }
.chip { display: inline-flex; align-items: center; gap: calc(var(--u) * 0.35); padding: calc(var(--u) * 0.35) calc(var(--u) * 0.75); border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.05); font-size: calc(var(--u) * 0.6); font-weight: 600; }
.chip i { width: calc(var(--u) * 0.3); height: calc(var(--u) * 0.3); border-radius: 50%; background: #119eff; }
.hero .cta { font-size: calc(var(--u) * 0.85); }
.hero .note { font-size: calc(var(--u) * 0.6); }
</style></head><body class="${c.layout}${c.wrap ? ' wrap' : ''}">${body}</body></html>`
}

/** Shrinks --u until every element sits inside the canvas with a small safe margin. */
async function fitToCanvas(page: import('playwright').Page, c: Creative) {
  await page.evaluate(
    ({ width, height, unit }) => {
      const margin = Math.max(2, Math.min(width, height) * 0.04)
      const overflows = () => {
        for (const el of Array.from(document.querySelectorAll('.content *'))) {
          const r = el.getBoundingClientRect()
          if (r.width === 0) continue
          if (r.left < margin - 0.5 || r.top < margin - 0.5 || r.right > width - margin + 0.5 || r.bottom > height - margin + 0.5) return true
          // Catches nowrap text spilling out of its box (e.g. a headline running under the CTA).
          if (el instanceof HTMLElement && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1) return true
        }
        // Siblings in a row must not touch.
        const row = document.querySelector('.bar .content, .split .content')
        if (row) {
          const kids = Array.from(row.children).map((k) => k.getBoundingClientRect())
          for (let i = 1; i < kids.length; i++) if (kids[i].left < kids[i - 1].right + 2) return true
        }
        return false
      }
      let u = unit
      while (overflows() && u > 1) {
        u *= 0.97
        document.body.style.setProperty('--u', `${u}px`)
      }
    },
    { width: c.width, height: c.height, unit: c.unit },
  )
}

async function main() {
  const font = await readFile(join(PUBLIC_DIR, 'fonts/satoshi/Satoshi-Variable.woff2'))
  const fontDataUrl = `data:font/woff2;base64,${font.toString('base64')}`

  const browser = await chromium.launch()
  try {
    for (const c of creatives) {
      const page = await browser.newPage({ viewport: { width: c.width, height: c.height }, deviceScaleFactor: c.scale })
      await page.setContent(creativeHtml(c, fontDataUrl), { waitUntil: 'load' })
      await page.evaluate(() => document.fonts.ready)
      await fitToCanvas(page, c)
      const png = await page.screenshot({ type: 'png' })
      await sharp(png).png({ compressionLevel: 9, palette: false }).toFile(join(OUT_DIR, c.file))
      await page.close()
      console.log('Wrote', c.file, `${c.width * c.scale}x${c.height * c.scale}`)
    }
  } finally {
    await browser.close()
  }

  const icon = await readFile(join(PUBLIC_DIR, 'brand/capgo-icon.svg'))
  await sharp(icon, { density: 300 }).resize(1024, 1024).png({ compressionLevel: 9 }).toFile(join(OUT_DIR, 'logo-1024x1024.png'))
  console.log('Wrote logo-1024x1024.png')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
