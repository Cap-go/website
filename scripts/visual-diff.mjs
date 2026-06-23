#!/usr/bin/env bun
/**
 * Visual regression helper for Astro upgrades.
 * Usage:
 *   bun run scripts/visual-diff.mjs capture before
 *   bun run scripts/visual-diff.mjs capture after
 *   bun run scripts/visual-diff.mjs compare
 */
import { spawn } from 'node:child_process'
import { mkdir, readdir, rm } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, '.visual-diff')

const WEB_PAGES = [
  '/',
  '/pricing/',
  '/plugins/',
  '/blog/',
  '/docs/',
  '/solutions/live-updates/',
  '/about/',
]

const DOCS_PAGES = [
  '/docs/',
  '/docs/getting-started/quickstart/',
  '/docs/plugins/updater/',
]

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8'
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8'
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8'
  if (filePath.endsWith('.webp')) return 'image/webp'
  if (filePath.endsWith('.png')) return 'image/png'
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg'
  if (filePath.endsWith('.svg')) return 'image/svg+xml'
  if (filePath.endsWith('.woff2')) return 'font/woff2'
  if (filePath.endsWith('.woff')) return 'font/woff'
  if (filePath.endsWith('.json')) return 'application/json'
  return 'application/octet-stream'
}

async function startStaticServer(distDir, port) {
  const { readFile } = await import('node:fs/promises')
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', `http://127.0.0.1:${port}`)
      let pathname = decodeURIComponent(url.pathname)
      if (pathname.endsWith('/')) pathname += 'index.html'
      const filePath = path.join(distDir, pathname)
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

async function captureSet(label, distDir, pages, port, outputDir) {
  const server = await startStaticServer(distDir, port)
  const browser = await chromium.launch()
  const context = await browser.newContext({ deviceScaleFactor: 1 })

  try {
    for (const viewport of VIEWPORTS) {
      const page = await context.newPage()
      await page.setViewportSize({ width: viewport.width, height: viewport.height })

      for (const route of pages) {
        const slug = route.replaceAll('/', '_').replace(/^_/, '') || 'home'
        const fileName = `${slug}__${viewport.name}.png`
        const outPath = path.join(outputDir, fileName)

        await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle', timeout: 120_000 })
        await page.waitForTimeout(500)
        const title = await page.title()
        if (!title || title.toLowerCase().includes('not found')) {
          throw new Error(`[${label}] Failed to render ${route} (title: "${title}")`)
        }
        await page.screenshot({ path: outPath, fullPage: true })
        console.log(`[${label}] ${route} (${viewport.name}) -> ${path.relative(ROOT, outPath)}`)
      }

      await page.close()
    }
  } finally {
    await browser.close()
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())))
  }
}

async function capture(label) {
  const outputDir = path.join(OUT_DIR, label)
  await rm(outputDir, { recursive: true, force: true })
  await ensureDir(outputDir)

  const webDist = path.join(ROOT, 'apps/web/dist')
  const docsDist = path.join(ROOT, 'apps/docs/dist')

  await captureSet(label, webDist, WEB_PAGES, 4173, outputDir)
  await captureSet(label, docsDist, DOCS_PAGES, 4174, outputDir)
}

async function compareImages(beforePath, afterPath) {
  const proc = spawn('compare', ['-metric', 'AE', beforePath, afterPath, 'null:'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  const stderr = await new Promise((resolve) => {
    let data = ''
    proc.stderr.on('data', (chunk) => {
      data += chunk.toString()
    })
    proc.on('close', () => resolve(data.trim()))
  })

  const diffPixels = Number.parseFloat(stderr)
  return Number.isFinite(diffPixels) ? diffPixels : null
}

async function compare() {
  const beforeDir = path.join(OUT_DIR, 'before')
  const afterDir = path.join(OUT_DIR, 'after')
  const diffDir = path.join(OUT_DIR, 'diff')
  await ensureDir(diffDir)

  const files = (await readdir(beforeDir)).filter((f) => f.endsWith('.png')).sort()
  const results = []

  for (const file of files) {
    const beforePath = path.join(beforeDir, file)
    const afterPath = path.join(afterDir, file)

    try {
      const diffPixels = await compareImages(beforePath, afterPath)
      const status = diffPixels === 0 ? 'identical' : diffPixels === null ? 'unknown' : 'changed'
      results.push({ file, diffPixels, status })

      if (status === 'changed') {
        const diffPath = path.join(diffDir, file.replace('.png', '-diff.png'))
        spawn('compare', [beforePath, afterPath, diffPath], { stdio: 'ignore' })
      }
    } catch (error) {
      results.push({ file, diffPixels: null, status: 'error', error: String(error) })
    }
  }

  const reportPath = path.join(OUT_DIR, 'report.json')
  await Bun.write(reportPath, JSON.stringify(results, null, 2))

  const identical = results.filter((r) => r.status === 'identical').length
  const changed = results.filter((r) => r.status === 'changed').length
  console.log(`\nVisual diff: ${identical} identical, ${changed} changed (${results.length} total)`)
  console.log(`Report: ${path.relative(ROOT, reportPath)}`)

  for (const row of results.filter((r) => r.status === 'changed')) {
    console.log(`  changed: ${row.file} (${row.diffPixels} pixels differ)`)
  }

  return changed === 0
}

const [command, label] = process.argv.slice(2)

if (command === 'capture') {
  if (!label) {
    console.error('Usage: bun run scripts/visual-diff.mjs capture <before|after>')
    process.exit(1)
  }
  await capture(label)
} else if (command === 'compare') {
  const ok = await compare()
  process.exit(ok ? 0 : 1)
} else {
  console.error('Usage: bun run scripts/visual-diff.mjs <capture before|after|compare>')
  process.exit(1)
}
