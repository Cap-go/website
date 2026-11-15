import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const outDir = process.env.TC_DEMO_SCREENSHOT_DIR ?? join(repoRoot, '.tc-demo-screenshots')
const baseUrl = process.env.TC_DEMO_BASE_URL ?? 'http://127.0.0.1:4321'
const pluginBeforeBaseUrl = process.env.TC_PLUGIN_BEFORE_BASE_URL
const demoPath = '/plugins/tailwind-capacitor/demo/'
const pluginPath = '/plugins/tailwind-capacitor/'

const combos = [
  { platform: 'ios', dark: false, tag: 'ios-light' },
  { platform: 'ios', dark: true, tag: 'ios-dark' },
  { platform: 'material', dark: false, tag: 'material-light' },
  { platform: 'material', dark: true, tag: 'material-dark' },
]

const viewports = [
  { prefix: 'desktop', width: 1280, height: 900 },
  { prefix: 'mobile', width: 390, height: 844 },
]

const sectionShots = [
  { key: 'navbar', sectionId: 'capacitor-navbar' },
  { key: 'toolbar', sectionId: 'capacitor-toolbar' },
  { key: 'toggle', sectionId: 'capacitor-toggle' },
  { key: 'searchbar', sectionId: 'capacitor-searchbar' },
]

/**
 * @param {import('playwright').Page} page
 */
async function applyTheme(page, platform, dark) {
  const controls = page.locator('[data-tc-demo-controls]')
  await controls.scrollIntoViewIfNeeded()
  await controls.locator(`[data-tc-platform="${platform}"]`).click({ force: true })
  await controls.locator(`[data-tc-dark="${dark ? '1' : '0'}"]`).click({ force: true })
  const frame = page.frameLocator('#tc-demo-iframe')
  const platformLabel = platform === 'ios' ? 'iOS' : 'Material'
  await frame.getByText(platformLabel, { exact: true }).first().waitFor({ state: 'visible', timeout: 30000 })
  await frame.locator('#tc-demo-root').waitFor({ state: 'visible', timeout: 30000 })
  await frame.locator(dark ? 'html.dark' : 'html:not(.dark)').waitFor({ state: 'attached', timeout: 30000 })
  await page.waitForTimeout(400)
}

/**
 * @param {import('playwright').FrameLocator} frame
 */
async function scrollSectionIntoView(frame, sectionId) {
  const section = frame.locator(`#${sectionId}`)
  await section.scrollIntoViewIfNeeded({ timeout: 15000 })
  await section.waitFor({ state: 'visible', timeout: 15000 })
  await frame.locator(`#${sectionId}`).evaluate((el) => {
    el.scrollIntoView({ behavior: 'instant', block: 'start' })
  })
  await new Promise((r) => setTimeout(r, 350))
}

/**
 * @param {import('playwright').FrameLocator} frame
 */
async function closeOverlay(frame) {
  const host = frame.locator('[data-tc-overlay-host]')
  if ((await host.locator('> *').count()) > 0) {
    await frame.getByRole('button', { name: 'Delete' }).click({ timeout: 800 }).catch(() => {})
    await frame.getByRole('button', { name: 'Done' }).click({ timeout: 800 }).catch(() => {})
    await frame.getByRole('button', { name: 'Close' }).click({ timeout: 800 }).catch(() => {})
    if ((await host.locator('> *').count()) > 0) {
      await host.locator('.fixed, [class*="backdrop"]').first().click({ position: { x: 8, y: 8 }, force: true }).catch(() => {})
      await host.locator('> *').first().waitFor({ state: 'detached', timeout: 3000 }).catch(() => {})
    }
  }
  await new Promise((r) => setTimeout(r, 250))
}

/**
 * @param {import('playwright').Browser} browser
 */
async function captureDemoCatalog(browser, { viewport, combo }) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
  const manifest = []
  try {
    await page.goto(`${baseUrl}${demoPath}`, { waitUntil: 'domcontentloaded' })
    await applyTheme(page, combo.platform, combo.dark)
    const frame = page.frameLocator('#tc-demo-iframe')
    for (const shot of sectionShots) {
      await closeOverlay(frame)
      await scrollSectionIntoView(frame, shot.sectionId)
      const fileName = `demo-${viewport.prefix}-${combo.tag}-${shot.key}.png`
      await page.locator('#tc-demo-iframe').screenshot({ path: join(outDir, fileName) })
      const buffer = await readFile(join(outDir, fileName))
      manifest.push({ fileName, sha256: createHash('sha256').update(buffer).digest('hex') })
    }
    for (const overlay of [
      { key: 'actions-open', button: 'Open Actions' },
      { key: 'sheet-open', button: 'Open sheet' },
    ]) {
      await closeOverlay(frame)
      await scrollSectionIntoView(frame, overlay.key === 'actions-open' ? 'capacitor-actions' : 'capacitor-sheet')
      await frame.getByRole('button', { name: overlay.button, exact: true }).click()
      await frame.locator('[data-tc-overlay-host]').locator('> *').nth(0).waitFor({ state: 'visible', timeout: 15000 })
      await new Promise((r) => setTimeout(r, 400))
      const fileName = `demo-${viewport.prefix}-${combo.tag}-${overlay.key}.png`
      await page.locator('#tc-demo-iframe').screenshot({ path: join(outDir, fileName) })
      const buffer = await readFile(join(outDir, fileName))
      manifest.push({ fileName, sha256: createHash('sha256').update(buffer).digest('hex') })
      await closeOverlay(frame)
    }
    return manifest
  } finally {
    await page.close()
  }
}

/**
 * @param {import('playwright').Browser} browser
 */
async function capturePluginPage(browser, { viewport, label, urlBase }) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
  try {
    await page.goto(`${urlBase}${pluginPath}`, { waitUntil: 'domcontentloaded' })
    await page.locator('[data-tailwind-capacitor-install], h1').first().waitFor({ state: 'visible', timeout: 20000 })
    await new Promise((r) => setTimeout(r, 300))
    const fileName = `plugin-page-${viewport.prefix}-${label}.png`
    await page.screenshot({ path: join(outDir, fileName), fullPage: true })
    const buffer = await readFile(join(outDir, fileName))
    return { fileName, sha256: createHash('sha256').update(buffer).digest('hex') }
  } finally {
    await page.close()
  }
}

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
const manifest = []
try {
  for (const viewport of viewports) {
    for (const combo of combos) {
      const rows = await captureDemoCatalog(browser, { viewport, combo })
      manifest.push(...rows)
    }
    manifest.push(await capturePluginPage(browser, { viewport, label: 'after', urlBase: baseUrl }))
    if (pluginBeforeBaseUrl) {
      manifest.push(await capturePluginPage(browser, { viewport, label: 'before', urlBase: pluginBeforeBaseUrl }))
    }
  }
  const manifestPath = join(outDir, 'sha256.json')
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(JSON.stringify({ outDir, manifestCount: manifest.length }, null, 2))
} finally {
  await browser.close()
}