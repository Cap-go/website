#!/usr/bin/env bun
/**
 * Post-build contrast gate. Serves apps/web/dist and fails when interactive
 * controls are unreadable after CSS is applied (the class of bug that hid
 * pricing CTAs), plus a CSS canary for product-hero dark buttons on white cards.
 *
 *   bun run build:web && bun run contrast:check
 */
import AxeBuilder from '@axe-core/playwright'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { chromium } from 'playwright'
import { ROOT, pathExists, startStaticServer } from './lib/static-preview.mjs'

const CONFIG_PATH = path.join(ROOT, 'visual-diff.config.json')
const PORT = 4175
const CTA_RATIO = 4.5
const GHOST_RATIO = 2
// Plan CTAs render a trial label and a paid-ads (offer=direct) label; CSS shows one of them.
// Measure the visible variant so both the normal and direct pricing pages are covered.
const PRICING_CTA = '[data-plan] a[data-plan-cta] > span:visible'

function installChromium() {
  const playwrightCli = path.join(ROOT, 'node_modules', 'playwright', 'cli.js')
  const proc = spawnSync(process.execPath, [playwrightCli, 'install', 'chromium'], {
    cwd: ROOT,
    stdio: 'inherit',
  })
  if (proc.status !== 0) {
    throw new Error('Failed to install Playwright Chromium')
  }
}

async function launchBrowser() {
  try {
    return await chromium.launch()
  } catch {
    installChromium()
    return chromium.launch()
  }
}

function isInteractiveTarget(target, html) {
  if (/^(a|button)([\.#:[,]|$)/i.test(target)) return true
  if (/\[role=["']button["']\]/i.test(target)) return true
  if (/^<(a|button)\b/i.test(html || '')) return true
  return /role=["']button["']/i.test(html || '')
}

function ratioFromNode(node) {
  const checks = [...(node.any || []), ...(node.all || []), ...(node.none || [])]
  for (const check of checks) {
    const ratio = check?.data?.contrastRatio
    if (typeof ratio === 'number') return ratio
  }
  const text = [...(node.any || []), ...(node.all || [])].map((check) => check.message || '').join(' ')
  const match = text.match(/contrast of ([\d.]+)/i)
  return match ? Number.parseFloat(match[1]) : null
}

/**
 * Runs in the browser via Playwright evaluate.
 * @param {HTMLElement[]} elements
 * @param {{ pageDefaultBg: { r: number, g: number, b: number, a: number }, preferOwnBackground?: boolean }} options
 */
function measureElementContrast(elements, options) {
  const pageDefaultBg = options?.pageDefaultBg ?? { r: 255, g: 255, b: 255, a: 1 }
  const preferOwnBackground = options?.preferOwnBackground ?? false

  function parseColor(color) {
    if (!color || color === 'transparent') return null
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.fillStyle = '#000'
    ctx.fillStyle = color
    const normalized = ctx.fillStyle
    const hex = /^#([0-9a-f]{6})$/i.exec(normalized)
    if (hex) {
      const value = Number.parseInt(hex[1], 16)
      return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255, a: 1 }
    }
    const match = normalized.match(/rgba?\(([^)]+)\)/)
    if (!match) return null
    const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()))
    const [r, g, b, a] = parts
    if (Number.isNaN(r) || (a ?? 1) === 0) return null
    return { r, g, b, a: a ?? 1 }
  }
  function channel(value) {
    const scaled = value / 255
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4
  }
  function luminance({ r, g, b }) {
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  }
  function blend(fg, bg) {
    const alpha = fg.a
    return {
      r: fg.r * alpha + bg.r * (1 - alpha),
      g: fg.g * alpha + bg.g * (1 - alpha),
      b: fg.b * alpha + bg.b * (1 - alpha),
      a: 1,
    }
  }
  function contrast(fg, bg) {
    const [hi, lo] = [luminance(fg), luminance(bg)].sort((left, right) => right - left)
    return (hi + 0.05) / (lo + 0.05)
  }
  function backgroundOf(el) {
    let node = el
    while (node && node !== document.documentElement) {
      const parsed = parseColor(getComputedStyle(node).backgroundColor)
      if (parsed) {
        if (parsed.a >= 0.99) return { r: parsed.r, g: parsed.g, b: parsed.b, a: 1 }
        const parent = node.parentElement ? backgroundOf(node.parentElement) : pageDefaultBg
        return blend(parsed, parent)
      }
      node = node.parentElement
    }
    return pageDefaultBg
  }

  return elements.map((el) => {
    const fg = parseColor(getComputedStyle(el).color)
    const ownBg = preferOwnBackground ? parseColor(getComputedStyle(el).backgroundColor) : null
    const bg =
      preferOwnBackground && ownBg && ownBg.a > 0.15
        ? { r: ownBg.r, g: ownBg.g, b: ownBg.b, a: 1 }
        : backgroundOf(el)
    const ratio = fg ? contrast(fg.a < 1 ? blend(fg, bg) : fg, bg) : 0
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ')
    return {
      text: text.slice(0, 80),
      ratio,
    }
  })
}

async function contrastSamples(page, selector) {
  return page.locator(selector).evaluateAll(measureElementContrast, { pageDefaultBg: { r: 255, g: 255, b: 255, a: 1 } })
}

async function assertProductHeroCtaCanary(page) {
  await page.setContent(`<!doctype html>
    <div class="product-hero">
      <div style="background:#fff;padding:24px">
        <a class="bg-gray-950" href="#" role="button" id="pricing-cta-canary">14-day unlimited free trial</a>
      </div>
    </div>`)
  await page.addStyleTag({ path: path.join(ROOT, 'apps/web/src/styles/product-surface.css') })
  await page.addStyleTag({ content: '#pricing-cta-canary { color: #fff; display: flex; min-height: 44px; }' })
  const [sample] = await contrastSamples(page, '#pricing-cta-canary')
  const ratio = sample?.ratio ?? 0
  if (ratio < CTA_RATIO) {
    throw new Error(`product-hero dark CTA canary contrast is ${ratio.toFixed(2)}:1 (need ${CTA_RATIO}:1). Dark buttons on white cards are unreadable again.`)
  }
  console.log(`ok  product-hero CTA canary (${ratio.toFixed(2)}:1)`)
}

function ghostIssuesFromAxe(results) {
  return results.violations.flatMap((violation) => violation.nodes).flatMap((node) => {
    const selector = node.target?.[0] || ''
    const ratio = ratioFromNode(node)
    if (!isInteractiveTarget(selector, node.html || '') || ratio == null || ratio >= GHOST_RATIO) {
      return []
    }
    return [
      {
        selector,
        text: (node.html || '').replace(/\s+/g, ' ').slice(0, 120),
        ratio,
      },
    ]
  })
}

async function pricingCtaIssues(page, label = '') {
  const samples = await contrastSamples(page, PRICING_CTA)
  if (samples.length === 0) {
    return [{ selector: PRICING_CTA, text: `pricing plan CTAs missing from built page${label}`, ratio: 0 }]
  }
  return samples.filter((sample) => sample.ratio < CTA_RATIO).map((sample) => ({ ...sample, text: `${sample.text}${label}` }))
}

/** @param {import('playwright').FrameLocator} frame */
async function overlayTriggerContrastIssues(frame, label, sectionId = null, fallbackLabel = 'Open sheet') {
  const triggerSelector = sectionId ? `#${sectionId} button.tc-demo-overlay-trigger` : 'button.tc-demo-overlay-trigger'
  const samples = await frame.locator(triggerSelector).evaluateAll(measureElementContrast, {
    pageDefaultBg: { r: 0, g: 0, b: 0, a: 1 },
    preferOwnBackground: true,
  })
  if (samples.length === 0) {
    return [{ selector: triggerSelector, text: `${fallbackLabel} trigger missing in iframe [${label}]`, ratio: 0 }]
  }
  return samples
    .filter((sample) => sample.ratio < CTA_RATIO)
    .map((sample) => ({
      selector: `${triggerSelector} (${label})`,
      text: `${sample.text || fallbackLabel} [${label}]`,
      ratio: sample.ratio,
    }))
}

/**
 * @param {import('playwright').Page} page
 * @param {{ platform: 'ios' | 'material', dark: boolean }} combo
 */
async function waitForDemoIframeReady(page, combo) {
  const iframe = page.locator('#tc-demo-iframe')
  await iframe.evaluate((el) => {
    if (el instanceof HTMLIFrameElement) {
      return new Promise((resolve) => {
        if (el.contentDocument?.readyState === 'complete') {
          resolve(undefined)
          return
        }
        el.addEventListener('load', () => resolve(undefined), { once: true })
      })
    }
    return undefined
  })
  const want = combo.platform === 'ios' ? 'c-ios' : 'c-material'
  const frame = page.frameLocator('#tc-demo-iframe')
  const root = frame.locator('#tc-demo-root')
  await root.waitFor({ state: 'visible', timeout: 60_000 })
  for (let attempt = 0; attempt < 45; attempt += 1) {
    const classes = (await root.getAttribute('class')) ?? ''
    const docDark = await frame.locator('html').evaluate((node) => node.classList.contains('dark')).catch(() => false)
    if (classes.includes(want) && docDark === combo.dark) return
    await page.waitForTimeout(400)
  }
  const classes = (await root.getAttribute('class')) ?? ''
  const docDark = await frame.locator('html').evaluate((node) => node.classList.contains('dark')).catch(() => false)
  throw new Error(
    `demo iframe theme not ready (want ${want}, dark=${combo.dark}; got classes="${classes}", html.dark=${docDark})`,
  )
}

async function tailwindCapacitorDemoOverlayTriggers(page) {
  const combos = [
    { platform: 'ios', dark: false, label: 'ios-light' },
    { platform: 'ios', dark: true, label: 'ios-dark' },
    { platform: 'material', dark: false, label: 'material-light' },
    { platform: 'material', dark: true, label: 'material-dark' },
  ]
  const issues = []
  await page.locator('[data-tc-demo-controls]').waitFor({ state: 'visible', timeout: 60_000 })
  const frame = page.frameLocator('#tc-demo-iframe')
  for (const combo of combos) {
    await page.locator(`[data-tc-platform="${combo.platform}"]`).click()
    await page.locator(`[data-tc-dark="${combo.dark ? '1' : '0'}"]`).click()
    await waitForDemoIframeReady(page, combo)
    await frame.locator('button.tc-demo-overlay-trigger').first().waitFor({ state: 'visible', timeout: 30_000 })
    issues.push(...(await overlayTriggerContrastIssues(frame, combo.label)))
  }
  return issues
}

async function scanRoute(page, route) {
  const axe = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
  const issues = ghostIssuesFromAxe(axe)
  if (route === '/pricing/') {
    issues.push(...(await pricingCtaIssues(page)))
  }
  if (route.startsWith('/plugins/tailwind-capacitor/demo/') && (await page.locator('#tc-demo-iframe').count())) {
    issues.push(...(await tailwindCapacitorDemoOverlayTriggers(page)))
  }
  return issues
}

/**
 * Paid-ads visitors (offer=direct) see the "Get started" / money-back variant of /pricing/.
 * The offer is persisted in a cookie and localStorage, so scan it in a throwaway browser context:
 * the shared context used for every other route must keep scanning normal visitors.
 */
async function scanDirectOfferPricing(browser, url) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  try {
    const page = await context.newPage()
    await page.goto(`${url}?offer=direct`, { waitUntil: 'load', timeout: 120000 })
    const label = ' (offer=direct)'
    const axe = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
    const issues = ghostIssuesFromAxe(axe).map((issue) => ({ ...issue, text: `${issue.text}${label}` }))
    issues.push(...(await pricingCtaIssues(page, label)))
    return issues
  } finally {
    await context.close()
  }
}

function formatIssue(route, issue) {
  const ratio = issue.ratio == null ? 'unknown' : `${issue.ratio.toFixed(2)}:1`
  return `${route}  ${ratio}  ${issue.text || issue.selector}`
}

async function main() {
  const config = JSON.parse(await Bun.file(CONFIG_PATH).text())
  const suite = config.suites.find((item) => item.name === 'web')
  if (!suite) throw new Error('visual-diff.config.json is missing the web suite')

  const distDir = path.join(ROOT, suite.distDir)
  if (!(await pathExists(path.join(distDir, 'index.html')))) {
    throw new Error(`Missing ${suite.distDir}/index.html. Run "bun run build:web" first.`)
  }

  const server = await startStaticServer(suite.distDir, PORT)
  const browser = await launchBrowser()
  const failures = []

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await context.newPage()
    await assertProductHeroCtaCanary(page)
    for (const route of suite.routes) {
      const url = `http://127.0.0.1:${PORT}${route}`
      await page.goto(url, { waitUntil: 'load', timeout: 120000 })
      const title = await page.title()
      if (!title || title.toLowerCase().includes('not found')) {
        throw new Error(`Failed to render ${route} (title: "${title}")`)
      }
      const issues = await scanRoute(page, route)
      if (route === '/pricing/') issues.push(...(await scanDirectOfferPricing(browser, url)))
      if (issues.length === 0) {
        console.log(`ok  ${route}`)
        continue
      }
      for (const issue of issues) {
        const line = formatIssue(route, issue)
        failures.push(line)
        console.error(`fail  ${line}`)
        if (process.env.GITHUB_ACTIONS) {
          console.error(`::error title=Contrast::${line}`)
        }
      }
    }
  } finally {
    await browser.close()
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())))
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} contrast failure(s) on built pages.`)
    process.exit(1)
  }

  console.log('\nContrast check passed.')
}

try {
  await main()
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
