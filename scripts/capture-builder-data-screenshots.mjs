#!/usr/bin/env bun
/**
 * Captures /builder-data/ chart crops using the production D1 rollup snapshot and real metrics pipeline.
 */
import { mkdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { chromium } from 'playwright'
import { $ } from 'bun'
import { fetchPublicBuilderMetricsFromD1 } from '../apps/web/src/lib/builderMetricsD1.ts'
import { BUILDER_METRICS_PROD_SNAPSHOT_AT, loadBuilderMetricsProdSnapshot } from './builder-metrics-prod-snapshot.mjs'

const webDir = resolve(import.meta.dir, '../apps/web')
const distDir = resolve(webDir, 'dist')
const assetsDir = resolve(import.meta.dir, '../.github/pull-request-assets')
const port = 8791
const baseUrl = `http://127.0.0.1:${port}`
const referenceDate = new Date(BUILDER_METRICS_PROD_SNAPSHOT_AT)

mkdirSync(assetsDir, { recursive: true })

await $`bun run build`.cwd(webDir).env({ ...process.env, BUILD_CONCURRENCY: '1' })

const snapshot = loadBuilderMetricsProdSnapshot()
const metricsPayload = await fetchPublicBuilderMetricsFromD1({
  db: { prepare: () => ({ bind: () => ({ all: async () => ({ results: [] }) }) }) },
  now: referenceDate,
  client: {
    async queryAggregatedRollups() {
      return snapshot.rows
    },
  },
})

function resolveDistPath(pathname) {
  let filePath = pathname
  if (filePath.endsWith('/')) filePath += 'index.html'
  if (!filePath.includes('.')) filePath = join(filePath, 'index.html')
  const candidate = join(distDir, filePath.replace(/^\//, ''))
  try {
    if (statSync(candidate).isFile()) return candidate
  } catch {
    // fall through
  }
  const htmlFallback = join(distDir, `${filePath.replace(/^\//, '').replace(/\/$/, '')}/index.html`)
  return htmlFallback
}

const server = Bun.serve({
  port,
  hostname: '127.0.0.1',
  async fetch(request) {
    const url = new URL(request.url)
    if (url.pathname === '/builder-metrics.json') {
      return Response.json(metricsPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      })
    }
    const filePath = resolveDistPath(url.pathname)
    try {
      const file = Bun.file(filePath)
      if (await file.exists()) {
        return new Response(file)
      }
    } catch {
      // 404 below
    }
    return new Response('Not found', { status: 404 })
  },
})

async function captureRange(page, rangeKey, filename) {
  await page.click(`[data-trend-range="${rangeKey}"]`)
  await page.waitForTimeout(400)
  await page.locator('[data-trend]').screenshot({ path: resolve(assetsDir, filename) })
}

try {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } })
  await page.addInitScript(() => {
    localStorage.clear()
  })
  await page.goto(`${baseUrl}/builder-data/`, { waitUntil: 'networkidle' })
  await page.waitForSelector('[data-trend-svg]')
  await page.waitForFunction(() => {
    const svg = document.querySelector('[data-trend-svg]')
    return svg && getComputedStyle(svg).display !== 'none'
  })

  await captureRange(page, '3m', 'builder-data-3m-prod.png')
  await captureRange(page, '1m', 'builder-data-1m-prod.png')
  await captureRange(page, '1d', 'builder-data-1d-prod.png')

  await browser.close()
  console.log('Saved production-snapshot chart crops to .github/pull-request-assets/')
} finally {
  server.stop()
}
