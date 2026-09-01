#!/usr/bin/env bun
/**
 * Post-build WCAG contrast gate for interactive controls.
 *
 * Serves apps/web/dist and fails when buttons/links are unreadable
 * after CSS is applied (the class of bug that hid pricing CTAs).
 *
 *   bun run build:web && bun run contrast:check
 */
import AxeBuilder from '@axe-core/playwright'
import { spawnSync } from 'node:child_process'
import { access, readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CONFIG_PATH = path.join(ROOT, 'visual-diff.config.json')
const PORT = 4175
const CTA_RATIO = 4.5
const UNREADABLE_RATIO = 3
const PRICING_CTA = '[data-plan] a[role="button"]'

function isPathWithinRoot(filePath, rootDir) {
  const resolvedFile = path.resolve(filePath)
  const resolvedRoot = path.resolve(rootDir)
  const relative = path.relative(resolvedRoot, resolvedFile)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8'
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8'
  if (filePath.endsWith('.js')) return 'text/javascript; charset=utf-8'
  if (filePath.endsWith('.webp')) return 'image/webp'
  if (filePath.endsWith('.png')) return 'image/png'
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg'
  if (filePath.endsWith('.svg')) return 'image/svg+xml'
  if (filePath.endsWith('.woff2')) return 'font/woff2'
  if (filePath.endsWith('.woff')) return 'font/woff'
  if (filePath.endsWith('.json')) return 'application/json'
  return 'application/octet-stream'
}

async function pathExists(target) {
  try {
    await access(target)
    return true
  } catch {
    return false
  }
}

async function startStaticServer(distDir, port) {
  const absoluteDist = path.join(ROOT, distDir)
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', `http://127.0.0.1:${port}`)
      let pathname = decodeURIComponent(url.pathname)
      if (pathname.endsWith('/')) pathname += 'index.html'
      const filePath = path.resolve(absoluteDist, `.${pathname}`)
      if (!isPathWithinRoot(filePath, absoluteDist)) {
        res.writeHead(403).end('Forbidden')
        return
      }
      const data = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': contentType(filePath) })
      res.end(data)
    } catch {
      res.writeHead(404).end('Not found')
    }
  })

  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve))
  return server
}

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

function formatIssue(route, issue) {
  const ratio = issue.ratio == null ? 'unknown' : `${issue.ratio.toFixed(2)}:1`
  return `${route}  ${ratio}  ${issue.text || issue.selector}`
}

async function pricingCtaIssues(page) {
  return page.evaluate(
    ({ selector, minRatio }) => {
      function parseRgb(color) {
        if (!color || color === 'transparent') return null
        const match = color.match(/rgba?\(([^)]+)\)/)
        if (!match) return null
        const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()))
        const [r, g, b, a] = parts
        if (Number.isNaN(r)) return null
        if ((a ?? 1) === 0) return null
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
        const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a)
        return (hi + 0.05) / (lo + 0.05)
      }

      function backgroundOf(el) {
        let node = el
        while (node && node !== document.documentElement) {
          const parsed = parseRgb(getComputedStyle(node).backgroundColor)
          if (parsed) {
            if (parsed.a >= 0.99) return { r: parsed.r, g: parsed.g, b: parsed.b, a: 1 }
            const parent = node.parentElement ? backgroundOf(node.parentElement) : { r: 255, g: 255, b: 255, a: 1 }
            return blend(parsed, parent)
          }
          node = node.parentElement
        }
        return { r: 255, g: 255, b: 255, a: 1 }
      }

      return [...document.querySelectorAll(selector)]
        .map((el) => {
          const style = getComputedStyle(el)
          const fg = parseRgb(style.color)
          const bg = backgroundOf(el)
          if (!fg) {
            return { text: (el.textContent || '').trim().slice(0, 80), ratio: 0, selector }
          }
          const blended = fg.a < 1 ? blend(fg, bg) : fg
          return {
            text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
            ratio: contrast(blended, bg),
            selector,
          }
        })
        .filter((issue) => issue.ratio < minRatio)
    },
    { selector: PRICING_CTA, minRatio: CTA_RATIO },
  )
}

async function scanRoute(page, route) {
  const issues = []
  const axe = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
  for (const violation of axe.violations) {
    for (const node of violation.nodes) {
      const selector = node.target?.[0] || ''
      if (!isInteractiveTarget(selector, node.html || '')) continue
      const ratio = ratioFromNode(node)
      if (ratio != null && ratio >= UNREADABLE_RATIO && !/role=["']button["']/i.test(node.html || '') && !/^<button/i.test(node.html || '')) {
        continue
      }
      if (ratio != null && ratio >= CTA_RATIO) continue
      issues.push({
        selector,
        text: (node.html || '').replace(/\s+/g, ' ').slice(0, 120),
        ratio,
      })
    }
  }

  if (route === '/pricing/') {
    const ctas = await page.locator(PRICING_CTA).count()
    if (ctas === 0) {
      issues.push({ selector: PRICING_CTA, text: 'pricing plan CTAs missing from built page', ratio: 0 })
    } else {
      for (const issue of await pricingCtaIssues(page)) issues.push(issue)
    }
  }

  return issues
}

async function main() {
  const config = JSON.parse(await readFile(CONFIG_PATH, 'utf8'))
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
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    for (const route of suite.routes) {
      const url = `http://127.0.0.1:${PORT}${route}`
      await page.goto(url, { waitUntil: 'load', timeout: 120000 })
      const title = await page.title()
      if (!title || title.toLowerCase().includes('not found')) {
        throw new Error(`Failed to render ${route} (title: "${title}")`)
      }
      const issues = await scanRoute(page, route)
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
