import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const outDir = process.env.TC_DEMO_SCREENSHOT_DIR ?? join(repoRoot, 'apps/web/public/tailwind-capacitor-demo-screenshots')
const baseUrl = process.env.TC_DEMO_BASE_URL ?? 'http://127.0.0.1:4321'
const beforeBaseUrl = process.env.TC_DEMO_BEFORE_BASE_URL
const demoPath = '/plugins/tailwind-capacitor/demo/'
const beforePath = process.env.TC_DEMO_BEFORE_PATH ?? demoPath

const combos = [
  { platform: 'ios', dark: false, tag: 'ios-light' },
  { platform: 'ios', dark: true, tag: 'ios-dark' },
  { platform: 'material', dark: false, tag: 'material-light' },
  { platform: 'material', dark: true, tag: 'material-dark' },
]

const viewports = [
  { prefix: 'desktop', width: 1440, height: 900 },
  { prefix: 'mobile', width: 390, height: 844 },
]

/**
 * @param {import('playwright').Page} page
 */
async function applyTheme(page, platform, dark) {
  const controls = page.locator('[data-tc-demo-controls]')
  await controls.waitFor({ state: 'visible', timeout: 30000 })
  await controls.locator(`[data-tc-platform="${platform}"]`).click()
  await controls.locator(`[data-tc-dark="${dark ? '1' : '0'}"]`).click()
  const frame = page.frameLocator('#tc-demo-iframe')
  const platformLabel = platform === 'ios' ? 'iOS' : 'Material'
  await frame.getByText(platformLabel, { exact: true }).first().waitFor({ state: 'visible', timeout: 30000 })
  await frame.locator('#tc-demo-root').waitFor({ state: 'visible', timeout: 30000 })
  await page.waitForTimeout(400)
}

/**
 * @param {import('playwright').Browser} browser
 * @param {{ viewport: { prefix: string, width: number, height: number }, combo?: { platform: string, dark: boolean, tag: string }, label: string, urlBase: string, path: string, applyThemes: boolean }} options
 */
async function captureDemoPage(browser, { viewport, combo, label, urlBase, path, applyThemes }) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
  const manifest = []
  try {
    await page.goto(`${urlBase}${path}`, { waitUntil: 'networkidle', timeout: 60000 })
    if (applyThemes && combo) {
      await page.locator('[data-tc-demo-controls]').waitFor({ state: 'visible', timeout: 30000 })
      await applyTheme(page, combo.platform, combo.dark)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(250)
    const tag = combo?.tag ?? 'baseline'
    const fileName = `demo-page-${viewport.prefix}-${tag}-${label}.png`
    const filePath = join(outDir, fileName)
    await page.screenshot({ path: filePath, fullPage: false })
    const buffer = await readFile(filePath)
    manifest.push({ fileName, sha256: createHash('sha256').update(buffer).digest('hex') })
    return manifest
  } finally {
    await page.close()
  }
}

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
let manifest = []
try {
  for (const viewport of viewports) {
    for (const combo of combos) {
      const rows = await captureDemoPage(browser, {
        viewport,
        combo,
        label: 'after',
        urlBase: baseUrl,
        path: demoPath,
        applyThemes: true,
      })
      manifest.push(...rows)
    }
    if (beforeBaseUrl) {
      const rows = await captureDemoPage(browser, {
        viewport,
        label: 'before',
        urlBase: beforeBaseUrl,
        path: beforePath,
        applyThemes: false,
      })
      manifest.push(...rows)
    }
  }

  const manifestPath = join(outDir, 'sha256.json')
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(JSON.stringify({ outDir, manifestCount: manifest.length }, null, 2))
} finally {
  await browser.close()
}
