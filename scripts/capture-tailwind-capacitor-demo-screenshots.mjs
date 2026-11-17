import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { chromium } from 'playwright'
import sharp from 'sharp'
import {
  analyzeDialogChromeScreenshot,
  assertDialogBodyOpaque,
  dialogMetricsRelativeToRootCrop,
  effectiveHairlineCss,
} from './lib/tailwind-capacitor-dialog-chrome.mjs'

const execFileAsync = promisify(execFile)

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const outDir =
  process.env.TC_DEMO_SCREENSHOT_DIR ??
  join(repoRoot, 'pr-assets', 'tailwind-capacitor-demo-screenshots', String(process.env.TC_DEMO_PR_NUMBER ?? '1452'))
const baseUrl = process.env.TC_DEMO_BASE_URL ?? 'http://127.0.0.1:4321'
const beforeBaseUrl = process.env.TC_DEMO_BEFORE_BASE_URL
const demoPath = '/plugins/tailwind-capacitor/demo/'

/**
 * @param {string} sectionId
 */
function demoComponentPagePath(sectionId) {
  return `/plugins/tailwind-capacitor/demo/${encodeURIComponent(sectionId)}/`
}

/**
 * @param {import('playwright').Page} page
 */
function resolveDemoFrameLocator(page) {
  return page
    .locator('iframe.tc-demo-state-iframe[data-tc-state="screen"]')
    .first()
    .or(page.locator('iframe.tc-demo-state-iframe').first())
    .or(page.locator('#tc-demo-iframe'))
}

/**
 * @param {import('playwright').Page} page
 */
async function resolveDemoFrame(page) {
  const hasScreen = await page.locator('iframe.tc-demo-state-iframe[data-tc-state="screen"]').count()
  if (hasScreen) return page.frameLocator('iframe.tc-demo-state-iframe[data-tc-state="screen"]').first()
  const hasStateGallery = await page.locator('iframe.tc-demo-state-iframe').count()
  if (hasStateGallery) return page.frameLocator('iframe.tc-demo-state-iframe').first()
  return page.frameLocator('#tc-demo-iframe')
}

/**
 * @param {import('playwright').Page} page
 */
async function resolveDemoContentFrame(page) {
  const loc = resolveDemoFrameLocator(page)
  const handle = await loc.elementHandle()
  return handle?.contentFrame() ?? null
}
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
const pageOnlyShots = process.env.TC_DEMO_PAGE_ONLY === '1'
const captureInstall = process.env.TC_CAPTURE_INSTALL === '1'
const captureInstallOnly = process.env.TC_CAPTURE_INSTALL_ONLY === '1'
const installBeforeUrl = process.env.TC_INSTALL_BEFORE_URL ?? 'https://capgo.app'
const openShotSlugs = process.env.TC_DEMO_OPEN_SLUGS?.split(',')
  .map((slug) => slug.trim())
  .filter(Boolean)

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
  { slug: 'alert-open', sectionId: 'capacitor-alert', open: /show alert/i, openExpect: 'Registry Alert' },
  { slug: 'popover-open', sectionId: 'capacitor-popover', open: /open popover/i, openExpect: 'Popover item', expectInSection: false },
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
  const attempts = baseUrl.includes('workers.dev') ? 60 : 45
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
async function waitForDemoIframeReady(page) {
  const iframe = resolveDemoFrameLocator(page)
  await iframe.evaluate((el) => {
    if (el instanceof HTMLIFrameElement) {
      return new Promise((resolve) => {
        if (el.contentDocument?.readyState === 'complete') {
          resolve(undefined)
          return
        }
        el.addEventListener('load', () => resolve(undefined), { once: true })
      })
    }
    return undefined
  })
}

async function applyTheme(page, platform, dark) {
  const controls = page.locator('[data-tc-demo-controls]')
  const iframeCount = await page.locator('iframe.tc-demo-state-iframe, #tc-demo-iframe').count()
  if (!iframeCount && !(await controls.count())) return
  if (await controls.count()) {
    await controls.waitFor({ state: 'visible', timeout: 30_000 })
    await controls.locator(`[data-tc-platform="${platform}"]`).click({ force: true })
    await controls.locator(`[data-tc-dark="${dark ? '1' : '0'}"]`).click({ force: true })
  }
  if (!iframeCount) return
  await resolveDemoFrameLocator(page).waitFor({ state: 'visible', timeout: 60_000 })
  await page.evaluate(
    ([plat, isDark]) => {
      for (const iframe of document.querySelectorAll('iframe.tc-demo-state-iframe, #tc-demo-iframe')) {
        if (!(iframe instanceof HTMLIFrameElement)) continue
        const u = new URL(iframe.src, window.location.origin)
        u.searchParams.set('platform', plat)
        u.searchParams.set('dark', isDark ? '1' : '0')
        iframe.src = `${u.pathname}${u.search}`
      }
    },
    [platform, dark],
  )
  await waitForDemoIframeReady(page)
  await page.waitForTimeout(600)
  const frame = await resolveDemoFrame(page)
  await assertThemeInFrame(page, frame, platform)
  await frame.locator('#tc-demo-root').waitFor({ state: 'visible', timeout: 90_000 })
  await page.waitForTimeout(400)
}

/**
 * @param {import('playwright').FrameLocator} frame
 * @param {string} sectionId
 * @param {RegExp | null} openPattern
 * @param {string | null} openExpect
 * @param {boolean} [expectInSection]
 */
/**
 * @param {import('playwright').Page} page
 */
async function preparePhoneFrameForCapture(page, stateId = 'screen') {
  const phone = page.locator(`.tc-demo-phone-frame:has(iframe[data-tc-state="${stateId}"])`).first()
  const fallback = page.locator('.tc-demo-phone-frame').first()
  const target = (await phone.count()) ? phone : fallback
  await target.waitFor({ state: 'visible', timeout: 30_000 })
  await target.scrollIntoViewIfNeeded()
  await target.evaluate((el) => {
    const margin = 16
    let rect = el.getBoundingClientRect()
    if (rect.bottom > window.innerHeight - margin) {
      window.scrollBy(0, rect.bottom - window.innerHeight + margin)
    }
    rect = el.getBoundingClientRect()
    if (rect.top < margin) {
      window.scrollBy(0, rect.top - margin)
    }
  })
  await page.waitForTimeout(300)
}

/**
 * @param {import('playwright').Page} page
 * @param {string} filePath
 */
/**
 * @param {import('playwright').FrameLocator} frame
 */
async function stabilizePopoverForCapture(frame) {
  await frame.locator('.tc-demo-page').evaluate(() => {
    const page = document.querySelector('.tc-demo-page')
    const btn = document.querySelector('#popover-target-inline')
    if (!page || !btn) return
    const pageBox = page.getBoundingClientRect()
    const btnBox = btn.getBoundingClientRect()
    const targetTop = pageBox.top + pageBox.height * 0.58
    page.scrollTop += btnBox.top - targetTop
  })
  await frame.locator('#tc-demo-root').evaluate(() => window.dispatchEvent(new Event('resize')))
  await new Promise((resolve) => setTimeout(resolve, 500))
}

async function screenshotPhoneFrame(page, filePath) {
  await preparePhoneFrameForCapture(page)
  const frame = await resolveDemoContentFrame(page)
  if (!frame) throw new Error('Tailwind Capacitor demo iframe is not ready')
  await page.waitForTimeout(150)
  await frame.locator('#tc-demo-root').screenshot({ path: filePath })
}

/**
 * @param {import('playwright').Frame} frame
 * @param {string} filePath
 */
async function validateDialogChromeScreenshot(frame, filePath) {
  const metrics = await frame.evaluate(() => {
    const root = document.getElementById('tc-demo-root')
    const dialog = document.querySelector('[role="dialog"]')
    if (!dialog || !root) return { error: 'no dialog' }
    const rootRect = root.getBoundingClientRect()
    const dRect = dialog.getBoundingClientRect()
    const sep = dialog.querySelector('.hairline-b')
    const sepRect = sep instanceof HTMLElement ? sep.getBoundingClientRect() : null
    const hairlineCss = getComputedStyle(document.documentElement).getPropertyValue('--c-hairline-color').trim()
    const dark = document.documentElement.classList.contains('dark')
    const bg = getComputedStyle(dialog).backgroundColor
    const bm = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    const dialogSurfaceRgb = bm ? Math.round((Number(bm[1]) + Number(bm[2]) + Number(bm[3])) / 3) : dark ? 38 : 255
    return {
      hasHairline: Boolean(sepRect),
      dividerY: sepRect ? sepRect.bottom - 0.5 : dRect.top + dRect.height * 0.65,
      sampleAboveY: sepRect ? sepRect.bottom - 6 : dRect.top + dRect.height * 0.5,
      dialog: {
        left: dRect.left,
        right: dRect.right,
        bottom: dRect.bottom,
        top: dRect.top,
      },
      root: { x: rootRect.left, y: rootRect.top },
      hairlineCss,
      dark,
      dialogSurfaceRgb,
    }
  })
  if (metrics && 'error' in metrics) throw new Error(metrics.error)
  const cropped = dialogMetricsRelativeToRootCrop(metrics)
  cropped.hairlineCss = effectiveHairlineCss(cropped.hairlineCss, cropped.dark)
  const result = await analyzeDialogChromeScreenshot(sharp(filePath), { ...cropped, scale: 1 })
  if (!result.ok) throw new Error(result.errors.join('; '))
}

/**
 * @param {import('playwright').FrameLocator} frame
 * @param {string} text
 */
async function waitOverlayTextInShellViewport(frame, text) {
  const content = frame.locator('.tc-demo-overlay-host').getByText(text, { exact: false }).first()
  await content.waitFor({ state: 'visible', timeout: 25_000 })
  await content.evaluate((node) => {
      const root = document.getElementById('tc-demo-root')
      if (!root) throw new Error('missing #tc-demo-root')
      const rootBox = root.getBoundingClientRect()
      let el = node
      while (el && el !== root) {
        el = el.parentElement
      }
      const box = node.getBoundingClientRect()
      const visibleW = Math.max(0, Math.min(box.right, rootBox.right) - Math.max(box.left, rootBox.left))
      const visibleH = Math.max(0, Math.min(box.bottom, rootBox.bottom) - Math.max(box.top, rootBox.top))
      if (visibleW < 12 || visibleH < 12) {
        throw new Error(`overlay "${node.textContent?.trim().slice(0, 40)}" outside shell viewport`)
      }
      const visibleArea = visibleW * visibleH
      const totalArea = Math.max(1, box.width * box.height)
      if (visibleArea / totalArea < 0.12) {
        throw new Error(`overlay "${node.textContent?.trim().slice(0, 40)}" mostly outside shell viewport`)
      }
    })
}

/**
 * @param {import('playwright').FrameLocator} frame
 * @param {string} sectionId
 * @param {RegExp | null} openPattern
 * @param {string | null} openExpect
 * @param {boolean} [expectInSection]
 */
async function focusComponentInFrame(frame, sectionId, openPattern, openExpect, expectInSection = false) {
  if (!openPattern) {
    await frame.locator('body').evaluate(() => {
      window.scrollTo(0, 0)
      document.querySelector('.tc-demo-page')?.scrollTo(0, 0)
    })
  }
  const section = frame.locator(`#${sectionId}`)
  if (await section.count()) {
    await section.scrollIntoViewIfNeeded({ timeout: 20_000 })
    await section.locator('.registry-demo-block').waitFor({ state: 'visible', timeout: 20_000 })
  }
  if (openPattern) {
    const trigger = (await section.count())
      ? section.getByRole('button', { name: openPattern })
      : frame.getByRole('button', { name: openPattern })
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click({ timeout: 15_000, force: true })
    if (openExpect) {
      const scope = openPattern && !expectInSection ? frame.locator('.tc-demo-overlay-host') : section
      if (!expectInSection) {
        await waitOverlayTextInShellViewport(frame, openExpect)
      } else {
        await scope.getByText(openExpect, { exact: false }).first().waitFor({ state: 'visible', timeout: 20_000 })
      }
    } else {
      await frame.locator('.tc-demo-overlay-host :not(:empty)').first().waitFor({ state: 'visible', timeout: 12_000 }).catch(() => {})
    }
    const settleMs = openExpect?.includes('Toast') ? 1400 : openExpect === 'Popover item' ? 1200 : 900
    await new Promise((resolve) => setTimeout(resolve, settleMs))
  } else if (openExpect) {
    await section.getByText(openExpect, { exact: false }).first().waitFor({ state: 'visible', timeout: 12_000 })
  }
  if (!openPattern) {
    await section.scrollIntoViewIfNeeded()
  }
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
    if (applyThemes && combo && !pageOnlyShots && !onlyOpenShots) await applyTheme(page, combo.platform, combo.dark)

    const tag = combo?.tag ?? 'baseline'

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(300)

    if (pageOnlyShots) {
      await page.waitForSelector('#tc-demo-registry-counts', { timeout: 30_000 })
      const baseShot = `demo-page-${viewport.prefix}-index-${label}.png`
      await page.screenshot({ path: join(outDir, baseShot), fullPage: false })
      for (const themeCombo of combos) {
        const overviewName = `demo-page-${viewport.prefix}-${themeCombo.tag}-${label}.png`
        await writeFile(join(outDir, overviewName), await readFile(join(outDir, baseShot)))
        manifest.push(await fileEntry(overviewName))
      }
      return manifest
    }

    const overviewName = `demo-page-${viewport.prefix}-${tag}-${label}.png`

    if (!onlyOpenShots) {
      const hasEmbeddedFrame = (await page.locator('iframe.tc-demo-state-iframe, #tc-demo-iframe').count()) > 0
      if (hasEmbeddedFrame) {
        const frame = await resolveDemoFrame(page)
        await frame.locator('#tc-demo-root').waitFor({ state: 'visible', timeout: 30_000 })
        await preparePhoneFrameForCapture(page)
      }
      await page.screenshot({ path: join(outDir, overviewName), fullPage: false })
      manifest.push(await fileEntry(overviewName))
    }

    if (applyThemes && combo) {
      for (const target of componentTargets) {
        if (onlyOpenShots && !target.open) continue
        if (openShotSlugs?.length && !openShotSlugs.includes(target.slug)) continue
        if (target.open) {
          await page.goto(`${urlBase}${demoComponentPagePath(target.sectionId)}`, {
            waitUntil: 'domcontentloaded',
            timeout: 120_000,
          })
          await applyTheme(page, combo.platform, combo.dark)
        }
        const shotFrame = await resolveDemoFrame(page)
        await dismissOverlays(page, shotFrame)
        await focusComponentInFrame(shotFrame, target.sectionId, target.open, target.openExpect, target.expectInSection)
        if (target.slug === 'popover-open') await stabilizePopoverForCapture(shotFrame)
        await page.waitForTimeout(300)
        if (
          (target.slug === 'dialog-open' || target.slug === 'alert-open') &&
          combo.platform === 'ios' &&
          !combo.dark
        ) {
          const rawFrame = await resolveDemoContentFrame(page)
          if (!rawFrame) throw new Error('iframe missing for dialog opacity check')
          const opaque = await assertDialogBodyOpaque(rawFrame)
          if (!opaque.ok) {
            const detail = 'error' in opaque ? opaque.error : `mean diff ${opaque.mean?.toFixed(2)} > ${opaque.threshold}`
            throw new Error(`dialog body see-through: ${detail}`)
          }
        }
        const fileName = `demo-${target.slug}-${viewport.prefix}-${tag}-${label}.png`
        const outPath = join(outDir, fileName)
        await screenshotPhoneFrame(page, outPath)
        if (target.slug === 'dialog-open' || target.slug === 'alert-open') {
          const rawFrame = await resolveDemoContentFrame(page)
          if (!rawFrame) throw new Error('iframe missing for dialog validation')
          await validateDialogChromeScreenshot(rawFrame, outPath)
        }
        manifest.push(await fileEntry(fileName))
        if (target.open) await dismissOverlays(page, shotFrame)
      }

      if (onlyOpenShots || pageOnlyShots) {
        return manifest
      }

      for (const section of themeCompareSections) {
        const iosName = `demo-compare-${section.slug}-ios-${viewport.prefix}-${tag}-${label}.png`
        const mdName = `demo-compare-${section.slug}-material-${viewport.prefix}-${tag}-${label}.png`
        const pairName = `demo-compare-${section.slug}-ios-vs-material-${viewport.prefix}-${tag}-${label}.png`

        await applyTheme(page, 'ios', combo.dark)
        await focusComponentInFrame(frame, section.sectionId, null, null)
        await page.waitForTimeout(250)
        await screenshotPhoneFrame(page, join(outDir, iosName))
        manifest.push(await fileEntry(iosName))

        await applyTheme(page, 'material', combo.dark)
        await focusComponentInFrame(frame, section.sectionId, null, null)
        await page.waitForTimeout(250)
        await screenshotPhoneFrame(page, join(outDir, mdName))
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
/**
 * @param {import('playwright').Page} page
 * @param {import('playwright').Locator} block
 */
async function scrollInstallBelowHeader(page, block) {
  await block.evaluate((el) => {
    const header = document.querySelector('header')
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 16
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(350)
}

/**
 * @param {import('playwright').Page} page
 * @param {import('playwright').Locator} block
 * @param {number} viewportWidth
 */
async function measureInstallBlock(page, block, viewportWidth) {
  return block.evaluate(
    (el, width) => {
      const rect = el.getBoundingClientRect()
      const overflowsViewport = el.scrollWidth > width + 1
      return {
        top: rect.top,
        height: Math.ceil(rect.height),
        scrollWidth: el.scrollWidth,
        overflowsViewport,
      }
    },
    viewportWidth,
  )
}

/**
 * @param {import('playwright').Page} page
 * @param {import('playwright').Locator} block
 * @param {string} filePath
 * @param {{ width: number, height: number }} viewport
 */
async function screenshotMobileInstall(page, block, filePath, viewport) {
  await scrollInstallBelowHeader(page, block)
  const metrics = await measureInstallBlock(page, block, viewport.width)
  const clipY = Math.max(0, Math.floor(metrics.top))
  const clipHeight = Math.min(Math.ceil(metrics.height) + 8, viewport.height - clipY)
  await page.screenshot({
    path: filePath,
    clip: { x: 0, y: clipY, width: viewport.width, height: clipHeight },
  })
  return metrics.overflowsViewport
}

/**
 * @param {import('playwright').Page} page
 */
async function resolveInstallBlock(page) {
  const tailwind = page.locator('[data-tailwind-capacitor-install]')
  if ((await tailwind.count()) > 0) {
    return tailwind.first()
  }
  const installCard = page
    .locator('[data-plugin-copy]')
    .first()
    .locator(
      'xpath=ancestor::div[contains(@class,"overflow-hidden") and (contains(@class,"mt-8") or contains(@class,"mt-8,"))][1]',
    )
  if ((await installCard.count()) > 0) {
    return installCard.first()
  }
  return page.locator('[data-plugin-copy]').first().locator('xpath=ancestor::div[contains(@class,"mt-8")][1]').first()
}

/** @type {{ before?: boolean, after?: boolean }} */
const mobileInstallOverflow = {}

/**
 * @param {import('playwright').Browser} browser
 */
async function captureInstallSections(browser) {
  const manifest = []
  const viewports = [
    { prefix: '', width: 1280, height: 900, mobile: false },
    { prefix: 'mobile-', width: 390, height: 844, mobile: true },
  ]
  const mobileOnly = process.env.TC_CAPTURE_INSTALL_MOBILE_ONLY === '1'
  const installJobs = [
    { label: 'before', urlBase: installBeforeUrl },
    { label: 'after', urlBase: baseUrl },
  ]
  for (const { prefix, width, height, mobile } of viewports) {
    if (mobileOnly && !mobile) continue
    for (const { label, urlBase } of installJobs) {
      const page = await browser.newPage({
        viewport: { width, height },
        deviceScaleFactor: 1,
      })
      try {
        await page.goto(`${urlBase}/plugins/tailwind-capacitor/`, { waitUntil: 'networkidle', timeout: 120_000 })
        const block = await resolveInstallBlock(page)
        await block.waitFor({ state: 'visible', timeout: 30_000 })
        const fileName = `install-section-${prefix}${label}.png`
        const filePath = join(outDir, fileName)
        if (mobile) {
          const overflows = await screenshotMobileInstall(page, block, filePath, { width, height })
          if (label === 'before') mobileInstallOverflow.before = overflows
          if (label === 'after') mobileInstallOverflow.after = overflows
        } else {
          await scrollInstallBelowHeader(page, block)
          await block.screenshot({ path: filePath })
        }
        manifest.push(await fileEntry(fileName))
      } finally {
        await page.close()
      }
    }
  }
  if (mobileOnly) {
    await writeFile(
      join(outDir, 'install-mobile-overflow.json'),
      `${JSON.stringify(mobileInstallOverflow, null, 2)}\n`,
    )
  }
  return manifest
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
  if (captureInstallOnly) {
    manifest.push(...(await captureInstallSections(browser)))
    await writeFile(join(outDir, 'sha256.json'), `${JSON.stringify(manifest, null, 2)}\n`)
    console.log(JSON.stringify({ outDir, manifestCount: manifest.length }, null, 2))
    await browser.close()
    process.exit(0)
  }

  for (const viewport of viewports) {
    if (pageOnlyShots) {
      manifest.push(
        ...(await captureCombo(browser, {
          viewport,
          combo: null,
          label: 'after',
          urlBase: baseUrl,
          path: demoPath,
          applyThemes: false,
        })),
      )
      continue
    }
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

  if (captureInstall) {
    manifest.push(...(await captureInstallSections(browser)))
  }

  if (onlyOpenShots || pageOnlyShots) {
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