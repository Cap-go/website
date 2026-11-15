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

const onlySectionKeys = process.env.TC_DEMO_ONLY_KEYS?.split(',')
  .map((entry) => entry.trim())
  .filter(Boolean)

const activeSectionShots =
  onlySectionKeys && onlySectionKeys.length > 0
    ? sectionShots.filter((shot) => onlySectionKeys.includes(shot.key))
    : sectionShots

const captureOverlayShots = activeSectionShots.length === sectionShots.length

/**
 * @param {import('playwright').Page} page
 * @param {string} selector
 */
async function scrollBelowStickyHeader(page, selector) {
  await page.locator(selector).scrollIntoViewIfNeeded()
  await page.evaluate((sel) => {
    const header = document.querySelector('header.sticky')
    const target = document.querySelector(sel)
    if (!target) return
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0
    const top = target.getBoundingClientRect().top
    if (top < headerBottom + 12) {
      window.scrollBy({ top: top - headerBottom - 12, left: 0, behavior: 'instant' })
    }
  }, selector)
  await page.waitForTimeout(120)
}

/**
 * @param {import('playwright').Page} page
 */
async function applyTheme(page, platform, dark) {
  const controls = page.locator('[data-tc-demo-controls]')
  await scrollBelowStickyHeader(page, '[data-tc-demo-controls]')
  const platformBtn = controls.locator(`[data-tc-platform="${platform}"]`)
  const darkBtn = controls.locator(`[data-tc-dark="${dark ? '1' : '0'}"]`)
  await platformBtn.waitFor({ state: 'visible', timeout: 15000 })
  await platformBtn.click()
  await darkBtn.waitFor({ state: 'visible', timeout: 15000 })
  await darkBtn.click()
  const frame = page.frameLocator('#tc-demo-iframe')
  const platformLabel = platform === 'ios' ? 'iOS' : 'Material'
  await frame.getByText(platformLabel, { exact: true }).first().waitFor({ state: 'visible', timeout: 30000 })
  await frame.locator('#tc-demo-root').waitFor({ state: 'visible', timeout: 30000 })
  await frame.locator(dark ? 'html.dark' : 'html:not(.dark)').waitFor({ state: 'attached', timeout: 30000 })
  await page.waitForTimeout(400)
}

/**
 * The demo page uses the full site Layout; its sticky header can paint over the top of the
 * iframe when catalog scrolling moves the device frame upward. Nudge the parent scroll so
 * the iframe starts below the header before element screenshots.
 *
 * @param {import('playwright').Page} page
 */
async function clearStickyHeaderOverlap(page) {
  await page.locator('#tc-demo-iframe').scrollIntoViewIfNeeded()
  await page.evaluate(() => {
    const header = document.querySelector('header.sticky')
    const frame = document.getElementById('tc-demo-iframe')
    if (!frame) return
    const pad = 12
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0
    const frameTop = frame.getBoundingClientRect().top
    if (frameTop < headerBottom + pad) {
      window.scrollBy({ top: frameTop - headerBottom - pad, left: 0, behavior: 'instant' })
    }
  })
  await page.waitForTimeout(150)
}

/**
 * @param {import('playwright').Page} page
 * @param {string} filePath
 */
async function screenshotDeviceFrame(page, filePath) {
  await clearStickyHeaderOverlap(page)
  await page.locator('#tc-demo-iframe').screenshot({ path: filePath })
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
      const backdrop = host.locator('.fixed, [class*="backdrop"]').first()
      await backdrop.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {})
      await backdrop.click({ position: { x: 8, y: 8 } }).catch(() => {})
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
    await page.goto(`${baseUrl}${demoPath}`, { waitUntil: 'networkidle' })
    await page.locator('[data-tc-demo-controls]').waitFor({ state: 'visible', timeout: 30000 })
    await applyTheme(page, combo.platform, combo.dark)
    const frame = page.frameLocator('#tc-demo-iframe')
    for (const shot of activeSectionShots) {
      await closeOverlay(frame)
      await scrollSectionIntoView(frame, shot.sectionId)
      const fileName = `demo-${viewport.prefix}-${combo.tag}-${shot.key}.png`
      await screenshotDeviceFrame(page, join(outDir, fileName))
      const buffer = await readFile(join(outDir, fileName))
      manifest.push({ fileName, sha256: createHash('sha256').update(buffer).digest('hex') })
    }
    if (captureOverlayShots) {
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
        await screenshotDeviceFrame(page, join(outDir, fileName))
        const buffer = await readFile(join(outDir, fileName))
        manifest.push({ fileName, sha256: createHash('sha256').update(buffer).digest('hex') })
        await closeOverlay(frame)
      }
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
let manifest = []
try {
  const skipPluginShots = Boolean(onlySectionKeys?.length)

  for (const viewport of viewports) {
    for (const combo of combos) {
      const rows = await captureDemoCatalog(browser, { viewport, combo })
      manifest.push(...rows)
    }
    if (!skipPluginShots) {
      manifest.push(await capturePluginPage(browser, { viewport, label: 'after', urlBase: baseUrl }))
      if (pluginBeforeBaseUrl) {
        manifest.push(await capturePluginPage(browser, { viewport, label: 'before', urlBase: pluginBeforeBaseUrl }))
      }
    }
  }

  const mergePath = process.env.TC_DEMO_MANIFEST_MERGE
  if (mergePath) {
    const existing = JSON.parse(await readFile(mergePath, 'utf8'))
    const byName = Object.fromEntries(existing.map((row) => [row.fileName, row]))
    for (const row of manifest) byName[row.fileName] = row
    manifest = Object.values(byName).sort((a, b) => a.fileName.localeCompare(b.fileName))
  }

  const manifestPath = join(outDir, 'sha256.json')
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(JSON.stringify({ outDir, manifestCount: manifest.length }, null, 2))
} finally {
  await browser.close()
}