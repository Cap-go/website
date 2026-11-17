import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const outDir = join(repoRoot, '.pr-screenshots-staging', '1460')

const shots = [
  { key: 'docs-cli-reference-build', path: '/docs/cli/reference/build/' },
  { key: 'docs-plugins-sheets-getting-started', path: '/docs/plugins/sheets/getting-started/' },
]

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
}

async function waitForPreviewReady(port, timeoutMs = 180_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}${shots[0].path}`)
      if (res.ok) return
    } catch {
      // preview still starting
    }
    await new Promise((r) => setTimeout(r, 2000))
  }
  throw new Error(`Preview on port ${port} did not become ready`)
}

function resolveBunExecutable() {
  const home = process.env.HOME ?? ''
  const candidates = [join(home, '.bun', 'bin', 'bun'), '/usr/local/bin/bun', '/usr/bin/bun']
  return candidates.find((candidate) => candidate && existsSync(candidate)) ?? 'bun'
}

function startPreview() {
  return new Promise((resolve, reject) => {
    const child = spawn(resolveBunExecutable(), ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4783'], {
      cwd: join(repoRoot, 'apps/docs'),
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    child.on('error', reject)
    resolve(child)
  })
}

async function captureSet(browser, baseUrl, prefix, theme) {
  for (const shot of shots) {
    for (const [vpName, viewport] of Object.entries(viewports)) {
      const context = await browser.newContext({
        viewport,
        colorScheme: theme,
      })
      const page = await context.newPage()
      await page.goto(`${baseUrl}${shot.path}`, { waitUntil: 'networkidle', timeout: 120_000 })
      await page.waitForTimeout(500)
      const file = join(outDir, `${prefix}-${shot.key}-${vpName}-${theme}.png`)
      await page.screenshot({ path: file, fullPage: false })
      await context.close()
      console.log('wrote', file)
    }
  }
}

await mkdir(outDir, { recursive: true })
const preview = await startPreview()
await waitForPreviewReady(4783)

const browser = await chromium.launch({ headless: true })
try {
  await captureSet(browser, 'https://capgo.app', 'before', 'light')
  await captureSet(browser, 'https://capgo.app', 'before', 'dark')
  await captureSet(browser, 'http://127.0.0.1:4783', 'after', 'light')
  await captureSet(browser, 'http://127.0.0.1:4783', 'after', 'dark')
} finally {
  await browser.close()
  preview.kill('SIGTERM')
}