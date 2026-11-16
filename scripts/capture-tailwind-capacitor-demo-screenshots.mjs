import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { chromium } from 'playwright'

const execFileAsync = promisify(execFile)

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

const themeCompareSections = [
  { slug: 'button', sectionId: 'capacitor-button' },
  { slug: 'select', sectionId: 'capacitor-select' },
  { slug: 'navbar', sectionId: 'capacitor-navbar' },
  { slug: 'toggle', sectionId: 'capacitor-toggle' },
  { slug: 'tabs', sectionId: 'capacitor-tabs' },
]

const onlyOpenShots = process.env.TC_DEMO_ONLY_OPEN === '1'

const componentTargets = [
  { slug: 'button', sectionId: 'capacitor-button', open: null, openExpect: null },
  { slug: 'notification', sectionId: 'capacitor-notification', open: null, openExpect: 'New message' },
  { slug: 'tabs', sectionId: 'capacitor-tabs', open: null, openExpect: null },
  { slug: 'toggle', sectionId: 'capacitor-toggle', open: null, openExpect: null },
  { slug: 'list', sectionId: 'capacitor-list', open: null, openExpect: null },
  { slug: 'list-input', sectionId: 'capacitor-list-input', open: null, openExpect: null },
  { slug: 'sheet-open', sectionId: 'capacitor-sheet', open: /open sheet/i, openExpect: 'Sheet overlay content' },
  { slug: 'actions-open', sectionId: 'capacitor-actions', open: /open actions/i, openExpect: 'Delete' },
  { slug: 'dialog-open', sectionId: 'capacitor-dialog', open: /open dialog/i, openExpect: 'Sample dialog' },
  { slug: 'popover-open', sectionId: 'capacitor-popover', open: /open popover/i, openExpect: 'Popover item', expectInSection: true },
  { slug: 'toast-open', sectionId: 'capacitor-toast', open: /show toast/i, openExpect: 'Toast from registry demo' },
]

/**
 * @param {import('playwright').Page} page
 * @param {import('playwright').FrameLocator} frame
 */
async function dismissOverlays(page, frame) {
  const host = frame.locator('.tc-demo-overlay-host')
  for (const label of ['Delete', 'Done', 'Close', 'Dismiss']) {
    const link = host.getByText(label, { exact: true })
    if (await link.count()) {
      await link
        .first()
        .evaluate((node) => {
          node.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
        })
        .catch(() => {})
    }
  }
  const backdrop = host.locator('.fixed.inset-0, [class*="backdrop"]')
  if (await backdrop.count()) {
    await backdrop.first().click({ force: true, position: { x: 8, y: 8 }, timeout: 4000 }).catch(() => {})
  }
  await page.keyboard.press('Escape').catch(() => {})
  await new Promise((resolve) => setTimeout(resolve, 450))
}

/**
 * @param {import('playwright').Page} page
 * @param {import('playwright').FrameLocator} frame
 * @param {'ios' | 'material'} platform
 */
async function assertThemeInFrame(page, frame, platform) {
  const want = platform === 'ios' ? 'c-ios' : 'c-material'
  const root = frame.locator('#tc-demo-root')
  await root.waitFor({ state: 'visible', timeout: 60_000 })
  const attempts = baseUrl.includes('workers.dev') ? 60 : 25
  for (let i = 0; i < attempts; i += 1) {
    const classes = (await root.getAttribute('class')) ?? ''
    if (classes.includes(want)) return
    await page.waitForTimeout(400)
  }
  const classes = (await root.getAttribute('class')) ?? ''
  throw new Error(`Expected #tc-demo-root to include ${want}, got: ${classes}`)
}

/**
 * @param {import('playwright').Page} page
 * @param {'ios' | 'material'} platform
 * @param {boolean} dark
 */
async function applyTheme(page, platform, dark) {
  await page.locator('#tc-demo-iframe').waitFor({ state: 'visible', timeout: 60_000 })
  const controls = page.locator('[data-tc-demo-controls]')
  await controls.waitFor({ state: 'visible', timeout: 30_000 })
  await controls.locator(`[data-tc-platform="${platform}"]`).click({ force: true })
  await controls.locator(`[data-tc-dark="${dark ? '1' : '0'}"]`).click({ force: true })
  const frame = page.frameLocator('#tc-demo-iframe')
  await assertThemeInFrame(page, frame, platform)
  await frame.locator('.tc-demo-section-heading').first().waitFor({ state: 'visible', timeout: 90_000 })
  await page.waitForTimeout(500)
}

/**
 * @param {import('playwright').FrameLocator} frame
 * @param {string} sectionId
 * @param {RegExp | null} openPattern
 * @param {string | null} openExpect
 * @param {boolean} [expectInSection]
 */
async function focusComponentInFrame(frame, sectionId, openPattern, openExpect, expectInSection = false) {
  await frame.locator('body').evaluate(() => {
    window.scrollTo(0, 0)
    document.querySelector('.tc-demo-page')?.scrollTo(0, 0)
  })
  const section = frame.locator(`#${sectionId}`)
  await section.scrollIntoViewIfNeeded()
  await section.locator('.registry-demo-block').waitFor({ state: 'visible', timeout: 20_000 })
  if (openPattern) {
    const trigger = section.getByRole('button', { name: openPattern })
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click({ timeout: 15_000, force: true })
    if (openExpect) {
      const scope = openPattern && !expectInSection ? frame.locator('.tc-demo-overlay-host') : section
      await scope.getByText(openExpect, { exact: false }).first().waitFor({ state: 'visible', timeout: 20_000 })
    } else {
      await frame.locator('.tc-demo-overlay-host :not(:empty)').first().waitFor({ state: 'visible', timeout: 12_000 }).catch(() => {})
    }
    await new Promise((resolve) => setTimeout(resolve, 900))
  } else if (openExpect) {
    await section.getByText(openExpect, { exact: false }).first().waitFor({ state: 'visible', timeout: 12_000 })
  }
  await section.scrollIntoViewIfNeeded()
}

/**
 * @param {string} leftPath
 * @param {string} rightPath
 * @param {string} outPath
 */
async function stitchSideBySide(leftPath, rightPath, outPath) {
  try {
    await execFileAsync('convert', [leftPath, rightPath, '+append', outPath])
    return true
  } catch {
    return false
  }
}

/**
 * @param {import('playwright').Page} page
 * @param {import('playwright').Browser} browser
 */
async function captureCombo(browser, { viewport, combo, label, urlBase, path, applyThemes }) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
  const manifest = []
  try {
    await page.goto(`${urlBase}${path}`, { waitUntil: 'domcontentloaded', timeout: 120_000 })
    if (applyThemes && combo) await applyTheme(page, combo.platform, combo.dark)
    const frame = page.frameLocator('#tc-demo-iframe')
    await frame.locator('#tc-demo-root').waitFor({ state: 'visible', timeout: 30_000 })

    const tag = combo?.tag ?? 'baseline'

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(300)
    const overviewName = `demo-page-${viewport.prefix}-${tag}-${label}.png`
    await page.screenshot({ path: join(outDir, overviewName), fullPage: false })
    manifest.push(await fileEntry(overviewName))

    if (applyThemes && combo) {
      for (const target of componentTargets) {
        if (onlyOpenShots && !target.open) continue
        await dismissOverlays(page, frame)
        await focusComponentInFrame(frame, target.sectionId, target.open, target.openExpect, target.expectInSection)
        await page.waitForTimeout(300)
        const fileName = `demo-${target.slug}-${viewport.prefix}-${tag}-${label}.png`
        await page.screenshot({ path: join(outDir, fileName), fullPage: false })
        manifest.push(await fileEntry(fileName))
        if (target.open) await dismissOverlays(page, frame)
      }

      if (onlyOpenShots) {
        return manifest
      }

      for (const section of themeCompareSections) {
        const iosName = `demo-compare-${section.slug}-ios-${viewport.prefix}-${tag}-${label}.png`
        const mdName = `demo-compare-${section.slug}-material-${viewport.prefix}-${tag}-${label}.png`
        const pairName = `demo-compare-${section.slug}-ios-vs-material-${viewport.prefix}-${tag}-${label}.png`

        await applyTheme(page, 'ios', combo.dark)
        await focusComponentInFrame(frame, section.sectionId, null, null)
        await page.waitForTimeout(250)
        await page.screenshot({ path: join(outDir, iosName), fullPage: false })
        manifest.push(await fileEntry(iosName))

        await applyTheme(page, 'material', combo.dark)
        await focusComponentInFrame(frame, section.sectionId, null, null)
        await page.waitForTimeout(250)
        await page.screenshot({ path: join(outDir, mdName), fullPage: false })
        manifest.push(await fileEntry(mdName))

        if (await stitchSideBySide(join(outDir, iosName), join(outDir, mdName), join(outDir, pairName))) {
          manifest.push(await fileEntry(pairName))
        }
      }

      if (viewport.prefix === 'desktop') {
        await page.evaluate(() => window.scrollTo(0, 0))
        const navLink = page.locator('aside [data-tc-nav="capacitor-button"]')
        if (await navLink.count()) {
          await navLink.scrollIntoViewIfNeeded()
          await navLink.click({ force: true })
          await page.waitForTimeout(1200)
          await frame.locator('#capacitor-button .registry-demo-block').waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {})
          const navShot = `demo-sidebar-nav-button-${tag}-${label}.png`
          await page.screenshot({ path: join(outDir, navShot), fullPage: false })
          manifest.push(await fileEntry(navShot))
        }
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

  if (onlyOpenShots) {
    let existing = []
    try {
      existing = JSON.parse(await readFile(join(outDir, 'sha256.json'), 'utf8'))
    } catch {
      existing = []
    }
    const byName = new Map(existing.map((entry) => [entry.fileName, entry]))
    for (const entry of manifest) byName.set(entry.fileName, entry)
    manifest = [...byName.values()].sort((a, b) => a.fileName.localeCompare(b.fileName))
  }

  await writeFile(join(outDir, 'sha256.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(JSON.stringify({ outDir, manifestCount: manifest.length }, null, 2))
} finally {
  await browser.close()
}