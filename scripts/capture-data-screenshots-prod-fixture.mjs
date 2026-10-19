import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { join, extname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
import { buildContiguousDailyPlatformRows, sliceSparklineRows, TREND_HISTORY_DAYS } from '../apps/web/src/lib/metricsTrendChart.ts'

const dist = resolve(repoRoot, 'apps/web/dist')
const outDir = resolve(repoRoot, '.github/pull-request-assets')
const fixturePath = resolve(repoRoot, 'apps/web/test/fixtures/live-update-metrics-prod-2026-09-24.json')

function resolveDistFile(urlPath) {
  const pathname = urlPath.split('?')[0] || '/'
  if (pathname.includes('..') || pathname.includes('\0')) return null
  const rel =
    pathname === '/'
      ? 'index.html'
      : pathname.endsWith('/')
        ? `${pathname.slice(1)}index.html`
        : pathname.replace(/^\//, '')
  const filePath = resolve(dist, rel)
  const relToDist = relative(dist, filePath)
  if (relToDist.startsWith('..') || relToDist.includes('..')) return null
  return filePath
}

const raw = JSON.parse(await readFile(fixturePath, 'utf8'))
const now = new Date(raw.updated_at)
const daily_platforms = buildContiguousDailyPlatformRows(raw.daily_platforms, now, TREND_HISTORY_DAYS)
const metrics = {
  ...raw,
  period_days: raw.period_days ?? 30,
  daily_window_days: TREND_HISTORY_DAYS,
  daily_platforms,
  daily_platforms_sparkline: sliceSparklineRows(daily_platforms, now),
}

const metricsJson = JSON.stringify(metrics)
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
}

const server = createServer(async (req, res) => {
  const path = req.url?.split('?')[0] || '/'
  if (path === '/live-update-metrics.json') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(metricsJson)
    return
  }
  const filePath = resolveDistFile(path)
  if (!filePath) {
    res.writeHead(400)
    res.end('bad path')
    return
  }
  try {
    const body = await readFile(filePath)
    res.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404)
    res.end('not found')
  }
})

await mkdir(outDir, { recursive: true })
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const port = server.address().port

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()
await page.goto(`http://127.0.0.1:${port}/data/`, { waitUntil: 'networkidle', timeout: 120_000 })

async function captureChart(range, filename) {
  await page.getByRole('button', { name: range }).click()
  await page.waitForTimeout(2500)
  await page.locator('[data-trend]').screenshot({ path: join(outDir, filename), type: 'png' })
  const start = await page.locator('[data-trend-start]').textContent()
  const end = await page.locator('[data-trend-end]').textContent()
  console.log(`${filename}: ${start?.trim()} -> ${end?.trim()}`)
}

await captureChart('3M', 'data-3m-chart-desktop.png')
await captureChart('1M', 'data-1m-chart-desktop.png')
await captureChart('1D', 'data-1d-chart-desktop.png')

await browser.close()
server.close()

console.log('earliest_real_day', raw.daily_platforms[0]?.date)
console.log('zero_fill_start', daily_platforms[0]?.date)
