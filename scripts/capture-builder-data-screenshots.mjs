#!/usr/bin/env bun
/**
 * Captures /builder-data/ screenshots against local wrangler + seeded D1 fixture.
 */
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'
import { $ } from 'bun'

const webDir = resolve(import.meta.dir, '../apps/web')
const assetsDir = resolve(import.meta.dir, '../.github/pull-request-assets')
const port = 8791
const baseUrl = `http://127.0.0.1:${port}`

mkdirSync(assetsDir, { recursive: true })

await $`bun run scripts/seed-builder-metrics-d1.mjs`.cwd(resolve(import.meta.dir, '..'))
await $`bunx wrangler@4.126.0 d1 execute capgo_builder --local --file=test/fixtures/builder-metrics-d1-schema.sql`.cwd(webDir)
await $`bunx wrangler@4.126.0 d1 execute capgo_builder --local --file=test/fixtures/builder-metrics-d1-seed.sql`.cwd(webDir)
await $`bun run build`.cwd(webDir).env({ ...process.env, BUILD_CONCURRENCY: '1' })

const wrangler = Bun.spawn(['bunx', 'wrangler@4.126.0', 'dev', '--local', `--port=${port}`, '--ip=127.0.0.1'], {
  cwd: webDir,
  stdout: 'pipe',
  stderr: 'pipe',
  env: process.env,
})

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/builder-metrics.json`)
      if (response.ok) return
    } catch {
      // retry
    }
    await Bun.sleep(1000)
  }
  throw new Error('wrangler dev did not become ready')
}

try {
  await waitForServer()
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1280, height: 2000 } })
  await page.goto(`${baseUrl}/builder-data/`, { waitUntil: 'networkidle' })
  await page.waitForSelector('[data-trend-svg]')
  await page.waitForFunction(() => {
    const svg = document.querySelector('[data-trend-svg]')
    return svg && getComputedStyle(svg).display !== 'none'
  })

  await page.screenshot({ path: resolve(assetsDir, 'builder-data-1m-fixture.png'), fullPage: true })

  await page.click('[data-trend-range="3m"]')
  await page.waitForTimeout(500)
  await page.screenshot({ path: resolve(assetsDir, 'builder-data-3m-fixture.png'), fullPage: true })

  await browser.close()
  console.log('Saved builder-data screenshots to .github/pull-request-assets/')
} finally {
  wrangler.kill()
}
