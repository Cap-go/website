import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const outDir =
  process.env.TC_DEMO_SCREENSHOT_DIR ??
  join(repoRoot, 'pr-assets', 'tailwind-capacitor-demo-screenshots', String(process.env.TC_DEMO_PR_NUMBER ?? '1452'))
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

const componentTargets = [
  { slug: 'button', sectionId: 'capacitor-button', openLabel: null },
  { slug: 'notification', sectionId: 'capacitor-notification', openLabel: null },
  { slug: 'tabs', sectionId: 'capacitor-tabs', openLabel: null },
  { slug: 'toggle', sectionId: 'capacitor-toggle', openLabel: null },
  { slug: 'list', sectionId: 'capacitor-list', openLabel: null },
  { slug: 'list-input', sectionId: 'capacitor-list-input', openLabel: null },
  { slug: 'sheet-open', sectionId: 'capacitor-sheet', openLabel: 'Open sheet' },
  { slug: 'actions-open', sectionId: 'capacitor-actions', openLabel: 'Open Actions' },
]

/**
 * @param {import('playwright').FrameLocator} frame
 */
async function dismissOverlays(frame) {
  await frame
    .locator('.tc-demo-overlay-host .fixed.inset-0, .tc-demo-overlay-host .fixed.top-0')
    .first()
    .click({ force: true, position: { x: 4, y: 4 }, timeout: 3000 })
    .catch(() => {})
  await new Promise((resolve) => setTimeout(resolve, 200))
}

/**
 * @param {import('playwright').Page} page
 */
async function applyTheme(page, platform, dark) {
  await page.locator('#tc-demo-iframe').waitFor({ state: 'visible', timeout: 60000 })
  const controls = page.locator('[data-tc-demo-controls]')
  await controls.waitFor({ state: 'visible', timeout: 30000 })
  await controls.locator(`[data-tc-platform="${platform}"]`).scrollIntoViewIfNeeded()
  await controls.locator(`[data-tc-platform="${platform}"]`).click({ force: true })
  await controls.locator(`[data-tc-dark="${dark ? '1' : '0'}"]`).scrollIntoViewIfNeeded()
  await controls.locator(`[data-tc-dark="${dark ? '1' : '0'}"]`).click({ force: true })
  const frame = page.frameLocator('#tc-demo-iframe')
  const platformLabel = platform === 'ios' ? 'iOS' : 'Material'
  await frame.locator('#tc-demo-root').waitFor({ state: 'visible', timeout: 90000 })
  await frame.locator('.tc-demo-section-heading').first().waitFor({ state: 'visible', timeout: 90000 })
  await frame.getByText(platformLabel, { exact: true }).first().waitFor({ state: 'visible', timeout: 90000 })
  await frame.locator('#tc-demo-root').waitFor({ state: 'visible', timeout: 30000 })
  await page.waitForTimeout(400)
}

/**
 * @param {import('playwright').FrameLocator} frame
 * @param {string} sectionId
 * @param {string | null} openLabel
 */
async function focusComponentInFrame(frame, sectionId, openLabel) {
  // Frame-only helper; callers wait after overlays.
  const section = frame.locator(`#${sectionId}`)
  await section.scrollIntoViewIfNeeded()
  await section.locator('.registry-demo-block').waitFor({ state: 'visible', timeout: 20000 })
  if (openLabel) {
    await section.getByText(openLabel, { exact: true }).click({ timeout: 15000, force: true })
    await frame.locator('.tc-demo-overlay-host').waitFor({ state: 'attached', timeout: 15000 }).catch(() => {})
    await new Promise((resolve) => setTimeout(resolve, 400))
  }
  await section.scrollIntoViewIfNeeded()
}

/**
 * @param {import('playwright').Page} page
 * @param {import('playwright').Browser} browser
 */
async function captureCombo(browser, { viewport, combo, label, urlBase, path, applyThemes }) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
  const manifest = []
  try {
    await page.goto(`${urlBase}${path}`, { waitUntil: 'domcontentloaded', timeout: 120000 })
    if (applyThemes && combo) await applyTheme(page, combo.platform, combo.dark)
    const frame = page.frameLocator('#tc-demo-iframe')
    await frame.locator('#tc-demo-root').waitFor({ state: 'visible', timeout: 30000 })

    const tag = combo?.tag ?? 'baseline'

    // Full page chrome (nav, switches, device frame at top).
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(250)
    const overviewName = `demo-page-${viewport.prefix}-${tag}-${label}.png`
    await page.screenshot({ path: join(outDir, overviewName), fullPage: false })
    manifest.push(await fileEntry(overviewName))

    if (applyThemes && combo) {
      for (const target of componentTargets) {
        await focusComponentInFrame(frame, target.sectionId, target.openLabel)
        await page.waitForTimeout(350)
        const fileName = `demo-${target.slug}-${viewport.prefix}-${tag}-${label}.png`
        await page.screenshot({ path: join(outDir, fileName), fullPage: false })
        manifest.push(await fileEntry(fileName))
        if (target.openLabel) await dismissOverlays(frame)
      }
    }

    return manifest
  } finally {
    await page.close()
  }
}

/**
 * @param {string} fileName
 */
async function fileEntry(fileName) {
  const filePath = join(outDir, fileName)
  const buffer = await readFile(filePath)
  return { fileName, sha256: createHash('sha256').update(buffer).digest('hex') }
}

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
let manifest = []
try {
  for (const viewport of viewports) {
    for (const combo of combos) {
      const rows = await captureCombo(browser, {
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
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
      try {
        await page.goto(`${beforeBaseUrl}${beforePath}`, { waitUntil: 'domcontentloaded', timeout: 120000 })
        const fileName = `demo-page-${viewport.prefix}-baseline-before.png`
        await page.screenshot({ path: join(outDir, fileName), fullPage: false })
        manifest.push(await fileEntry(fileName))
      } finally {
        await page.close()
      }
    }
  }

  await writeFile(join(outDir, 'sha256.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(JSON.stringify({ outDir, manifestCount: manifest.length }, null, 2))
} finally {
  await browser.close()
}