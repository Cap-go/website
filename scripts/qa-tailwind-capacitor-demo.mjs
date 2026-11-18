import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import sharp from 'sharp'
import {
  analyzeDialogChromeScreenshot,
  assertDialogBodyOpaque,
  dialogMetricsRelativeToRootCrop,
  effectiveHairlineCss,
} from './lib/tailwind-capacitor-dialog-chrome.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const manifest = JSON.parse(await readFile(join(repoRoot, 'apps/web/src/tailwind-capacitor-snapshot/registry-manifest.json'), 'utf8'))
const stateManifest = JSON.parse(
  await readFile(join(repoRoot, 'apps/web/src/components/tailwind-capacitor-demo/state-manifest.json'), 'utf8'),
)

const allSlugs = ['foundation', ...manifest.items.filter((i) => !['capacitor-tailwind', 'capacitor-provider', 'capacitor-shared', 'capacitor-icons'].includes(i.name)).map((i) => i.name)]
const slugs = process.env.TC_QA_ONLY_SLUG ? [process.env.TC_QA_ONLY_SLUG] : allSlugs

const baseUrl = process.env.TC_QA_BASE_URL ?? 'http://127.0.0.1:4321'
const prNumber = process.env.TC_DEMO_PR_NUMBER ?? '1452'
const outRoot =
  process.env.TC_QA_OUT_DIR ?? join(repoRoot, 'pr-assets', 'tailwind-capacitor-demo-screenshots', prNumber, 'qa')

const viewports = [
  { id: 'desktop', width: 1440, height: 900 },
  { id: 'mobile', width: 390, height: 844 },
]

const themes = [
  { id: 'ios-light', platform: 'ios', dark: false },
  { id: 'ios-dark', platform: 'ios', dark: true },
  { id: 'material-light', platform: 'material', dark: false },
  { id: 'material-dark', platform: 'material', dark: true },
]

/** @type {{ pass: number, fail: number, errors: string[] }} */
const summary = { pass: 0, fail: 0, errors: [] }

function record(ok, message) {
  if (ok) summary.pass += 1
  else {
    summary.fail += 1
    summary.errors.push(message)
  }
}

function assertStateManifestUsesNamedStates() {
  for (const [slug, states] of Object.entries(stateManifest)) {
    for (const state of states) {
      record(
        state.id !== 'default',
        `state-manifest: ${slug} must not use id "default" (got "${state.label}")`,
      )
      record(
        state.id !== 'alternate',
        `state-manifest: ${slug} must not use id "alternate" (got "${state.label}")`,
      )
    }
  }
}

assertStateManifestUsesNamedStates()

/**
 * @param {import('playwright').Page} page
 */
/**
 * @param {import('playwright').Page} page
 * @param {string} label
 * @param {{ checkIntroClearance?: boolean }} [options]
 */
async function assertPageLayout(page, label, options = {}) {
  const checkIntro = options.checkIntroClearance ?? true
  const metrics = await page.evaluate((checkIntroClearance) => {
    const header = document.querySelector('header')
    const headerRect = header?.getBoundingClientRect()
    const introNodes = [
      ...new Set(
        [
          ...document.querySelectorAll('[data-tc-demo-intro]'),
          document.getElementById('tc-demo-registry-counts'),
        ].filter((node) => node instanceof HTMLElement),
      ),
    ]
  return {
    docScrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    headerBottom: headerRect?.bottom ?? null,
    introHits: checkIntroClearance
      ? introNodes
          .map((node) => {
            const r = node.getBoundingClientRect()
            const hb = headerRect?.bottom ?? 0
            if (headerRect && r.top < hb - 1 && r.bottom > hb + 1) {
              return `${node.id || node.tagName}:${Math.round(r.top)}<${Math.round(hb)}`
            }
            return null
          })
          .filter(Boolean)
      : [],
  }
  }, checkIntro)
  record(
    metrics.docScrollWidth <= metrics.clientWidth + 1,
    `${label}: horizontal overflow on page (${metrics.docScrollWidth} > ${metrics.clientWidth})`,
  )
  if (checkIntro) {
    record(
      metrics.introHits.length === 0,
      `${label}: site header intersects intro text (${metrics.introHits.join('; ')})`,
    )
  }
}

/**
 * @param {import('playwright').Page} page
 * @param {string} label
 * @param {{ scrolled?: boolean }} [options]
 */
async function assertDemoCatalogChrome(page, label, options = {}) {
  const scrolled = options.scrolled ?? false
  const metrics = await page.evaluate(() => {
    const header = document.querySelector('header')
    const breadcrumb = document.querySelector('#tc-demo-page-intro nav[aria-label="Breadcrumb"]')
    const headerStyle = header ? getComputedStyle(header) : null
    const headerRect = header?.getBoundingClientRect()
    const crumbRect = breadcrumb?.getBoundingClientRect()
    const gap = headerRect && crumbRect ? crumbRect.top - headerRect.bottom : null
    const parseAlpha = (bg) => {
      if (!bg || bg === 'transparent') return 0
      const slash = bg.match(/rgba?\([^)]+[/\s]([\d.]+)\)/)
      if (slash) return Number(slash[1])
      return bg.startsWith('rgb') ? 1 : 0
    }
    const headerAlpha = headerStyle ? parseAlpha(headerStyle.backgroundColor) : 0
    const headerHasBackdrop = Boolean(headerStyle?.backdropFilter && headerStyle.backdropFilter !== 'none')
    const menuBtn = document.querySelector('#menu-toggle')
    let contentBleedsThroughHeader = false
    if (menuBtn) {
      const menuRect = menuBtn.getBoundingClientRect()
      const cx = menuRect.left + menuRect.width / 2
      const cy = menuRect.top + menuRect.height / 2
      const stack = document.elementsFromPoint(cx, cy)
      const under = stack.find((el) => el !== menuBtn && !(header?.contains(el)))
      if (under && (under.closest('#tc-demo-page-intro') || under.closest('#tc-demo-registry-counts'))) {
        contentBleedsThroughHeader = true
      }
    }
    return { gap, headerAlpha, headerHasBackdrop, contentBleedsThroughHeader }
  })
  if (!scrolled) {
    record(
      metrics.gap !== null && metrics.gap >= 0 && metrics.gap <= 32,
      `${label}: header-to-breadcrumb gap ${metrics.gap}px (want ≤32)`,
    )
  }
  if (scrolled) {
    record(
      metrics.headerHasBackdrop || metrics.headerAlpha >= 0.85,
      `${label}: sticky header backdrop on scroll (alpha=${metrics.headerAlpha}, backdrop=${metrics.headerHasBackdrop})`,
    )
    record(!metrics.contentBleedsThroughHeader, `${label}: intro content bleeds through sticky header`)
  }
}

/**
 * @param {import('playwright').Page} page
 * @param {string} label
 */
async function assertDialogHairlineWithinDialog(page, label) {
  const metrics = await page.evaluate(() => {
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

  if (metrics && 'error' in metrics) {
    record(false, `${label}: dialog chrome (${metrics.error})`)
    return
  }

  const viewport = page.viewportSize()
  const shot = sharp(await page.locator('#tc-demo-root').screenshot())
  const meta = await shot.metadata()
  const scale = (meta.height ?? 720) / (viewport?.height ?? 720)
  const cropped = dialogMetricsRelativeToRootCrop(metrics)
  cropped.hairlineCss = effectiveHairlineCss(cropped.hairlineCss, cropped.dark)
  const result = await analyzeDialogChromeScreenshot(shot, { ...cropped, scale })
  record(
    result.ok,
    `${label}: dialog chrome (${result.ok ? 'ok' : result.errors.join('; ')}; ${JSON.stringify(result.detail)})`,
  )
}

/**
 * @param {import('playwright').Page} page
 * @param {string} label
 */
/**
 * @param {import('playwright').Page} page
 * @param {string} slug
 * @param {string} label
 */
async function assertDialogBodyNotSeeThrough(page, slug, label) {
  if (!(await page.locator('[role="dialog"]').count())) {
    const open = page.getByRole('button', { name: /open dialog|show alert/i }).first()
    if (await open.count()) await open.click({ timeout: 8000 }).catch(() => {})
  }
  await page.waitForSelector('[role="dialog"]', { timeout: 12_000 }).catch(() => {})
  await page.waitForTimeout(400)
  const opaque = await assertDialogBodyOpaque(page)
  const detail =
    'error' in opaque
      ? opaque.error
      : opaque.ok
        ? `mean ${opaque.mean.toFixed(2)}`
        : `mean diff ${opaque.mean.toFixed(2)} > ${opaque.threshold}`
  record(opaque.ok, `${label}: dialog body opaque (${detail})`)
}

async function assertDialogButtonPreviewNoStrayRule(page, label) {
  const ok = await page.evaluate(() => {
    const wrap = document.querySelector('.tc-demo-dialog-button-preview')
    if (!wrap) return 'no preview'
    const hairlineButtons = [...wrap.querySelectorAll('button.hairline-r')]
    if (!hairlineButtons.length) return true
    const last = hairlineButtons[hairlineButtons.length - 1]
    const w = getComputedStyle(last).borderRightWidth
    return Number.parseFloat(w) < 0.5 ? true : `trailing hairline-r ${w}`
  })
  record(ok === true, `${label}: dialog button preview (${String(ok)})`)
}

/**
 * @param {import('playwright').Page} page
 * @param {string} label
 */
async function assertToastHasVisibleSurface(page, label) {
  const ok = await page.evaluate(() => {
    const toast = document.querySelector('.tc-demo-registry-toast')
    const fill = document.querySelector('.tc-demo-state-fill')
    if (!toast || !fill) return 'missing toast or stage'
    const lum = (rgb) => {
      const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      if (!m) return 0
      return (Number(m[1]) * 0.2126 + Number(m[2]) * 0.7152 + Number(m[3]) * 0.0722) / 255
    }
    const toastLum = lum(getComputedStyle(toast).backgroundColor)
    const screenLum = lum(getComputedStyle(fill).backgroundColor)
    return Math.abs(toastLum - screenLum) > 0.07 ? true : `toast blends (t=${toastLum.toFixed(2)} screen=${screenLum.toFixed(2)})`
  })
  record(ok === true, `${label}: toast visible surface (${String(ok)})`)
}

/**
 * @param {import('playwright').Page | import('playwright').Frame} pageOrFrame
 * @param {string} stateId
 * @param {string} label
 */
async function assertStateClipping(pageOrFrame, stateId, label) {
  const clipped = await pageOrFrame.evaluate((id) => {
    const stage = document.querySelector(`[data-tc-demo-state="${id}"]`)
    if (!stage) return ['missing state element']
    const bad = []
    for (const el of stage.querySelectorAll('button, p, span, a, label')) {
      if (!(el instanceof HTMLElement)) continue
      if (el.closest('.tc-demo-badge-count, .badge, [class*="badge"]')) continue
      if (el.tagName === 'SPAN' && /^\d{1,2}$/.test(el.innerText.trim())) continue
      if (el.scrollHeight > el.clientHeight + 2 && el.innerText.trim().length > 0) {
        bad.push(`${el.tagName}:${el.innerText.slice(0, 24)} scroll ${el.scrollHeight}/${el.clientHeight}`)
      }
      const parent = el.parentElement
      if (parent && parent instanceof HTMLElement && parent !== stage && parent.scrollHeight > parent.clientHeight + 4) {
        const style = getComputedStyle(parent)
        if (style.overflow === 'hidden' || style.overflowY === 'hidden') {
          const rect = el.getBoundingClientRect()
          const parentRect = parent.getBoundingClientRect()
          if (rect.top < parentRect.top - 1 || rect.bottom > parentRect.bottom + 1) {
            bad.push(`clipped:${el.innerText.slice(0, 24)}`)
          }
        }
      }
    }
    const rect = stage.getBoundingClientRect()
    const root = document.getElementById('tc-demo-root')
    const rootRect = root?.getBoundingClientRect()
    if (rootRect && (rect.bottom > rootRect.bottom + 2 || rect.right > rootRect.right + 2)) {
      bad.push(`state outside root bbox`)
    }
    return bad.slice(0, 5)
  }, stateId)
  record(clipped.length === 0, `${label}: clipped text in state: ${clipped.join('; ')}`)
}

/**
 * @param {Buffer} a
 * @param {Buffer} b
 */
async function screenshotDiffMean(a, b) {
  const imgA = await sharp(a).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const imgB = await sharp(b).ensureAlpha().resize(imgA.info.width, imgA.info.height).raw().toBuffer()
  const ch = imgA.info.channels
  const n = imgA.info.width * imgA.info.height
  let sum = 0
  for (let i = 0; i < n; i += 1) {
    const o = i * ch
    for (let c = 0; c < 3; c += 1) sum += Math.abs(imgA.data[o + c] - imgB.data[o + c])
  }
  return sum / (n * 3)
}

/**
 * @param {import('playwright').Page} page
 * @param {string} slug
 * @param {string} stateId
 * @param {string} label
 * @param {() => Promise<void>} action
 */
async function assertClickChangesPixels(page, slug, stateId, label, action) {
  const root = page.locator('#tc-demo-root')
  const before = await root.screenshot()
  await action()
  await page.waitForTimeout(280)
  const after = await root.screenshot()
  const mean = await screenshotDiffMean(before, after)
  record(mean > 2.5, `${label}: click pixel change on ${slug}/${stateId} (mean ${mean.toFixed(2)})`)
}

/**
 * @param {import('playwright').Page | import('playwright').Frame} target
 * @param {string} slug
 * @param {string} stateId
 * @param {string} label
 */
async function exerciseInteractions(target, slug, stateId, label) {
  const page = /** @type {import('playwright').Page} */ (target)
  try {
    if (slug === 'capacitor-toggle' && stateId === 'off') {
      await assertClickChangesPixels(page, slug, stateId, label, async () => {
        const track = page.locator('label, .toggle').filter({ has: page.locator('input[role="switch"]') }).first()
        await track.click({ timeout: 4000, force: true })
      })
    }
    if (slug === 'capacitor-toggle' && stateId === 'on') {
      await assertClickChangesPixels(page, slug, stateId, label, async () => {
        const track = page.locator('label, .toggle').filter({ has: page.locator('input[role="switch"]') }).first()
        await track.click({ timeout: 4000, force: true })
      })
    }
    if (slug === 'capacitor-checkbox' && (stateId === 'off' || stateId === 'on')) {
      await assertClickChangesPixels(page, slug, stateId, label, async () => {
        const row = page.locator('label, .checkbox').filter({ has: page.locator('input[type="checkbox"]') }).first()
        await row.click({ timeout: 4000, force: true })
      })
    }
    if (slug === 'capacitor-radio' && stateId === 'option-b') {
      await assertClickChangesPixels(page, slug, stateId, label, async () => {
        await page.getByText('Option B', { exact: true }).click({ timeout: 4000 })
      })
    }
    if (slug === 'capacitor-stepper' && stateId === 'min') {
      await assertClickChangesPixels(page, slug, stateId, label, async () => {
        await page.locator('.stepper button').last().click({ timeout: 4000 })
      })
    }
    if (slug === 'capacitor-accordion-item' && stateId === 'expanded-copy') {
      await assertClickChangesPixels(page, slug, stateId, label, async () => {
        await page.locator('.accordion-item button, .accordion-item').first().click({ timeout: 4000 })
      })
    }
    if (slug === 'capacitor-chip' && stateId === 'removable') {
      await assertClickChangesPixels(page, slug, stateId, label, async () => {
        const del = page.locator('.chip button, [class*="delete"]').first()
        if (await del.count()) await del.click({ timeout: 4000 })
      })
    }
    if (slug === 'capacitor-tabs' || slug === 'capacitor-tab' || slug === 'capacitor-segmented' || slug === 'capacitor-segmented-button') {
      const tab = target.locator('[data-tc-demo-state] .tab-link, [data-tc-demo-state] .tab, [data-tc-demo-state] .segmented button, [data-tc-demo-state] button.tab').nth(1)
      if (await tab.count()) await tab.click({ timeout: 3000 }).catch(() => {})
    }
    if (slug === 'capacitor-tabbar' || slug === 'capacitor-tabbar-link') {
      const link = page.locator('.tabbar a, .tabbar-link').nth(1)
      if (await link.count()) await link.click({ timeout: 3000 }).catch(() => {})
    }
    if (slug === 'capacitor-actions' && stateId === 'sheet-open') {
      const hairlineOk = await page.evaluate(() => {
        const expected = getComputedStyle(document.documentElement).getPropertyValue('--c-hairline-color').trim()
        const btn = document.querySelector('.tc-demo-overlay-host button.hairline-b')
        if (!btn) return 'no hairline button'
        const bc = getComputedStyle(btn).borderBottomColor
        return bc && expected ? true : `missing colors ${bc}/${expected}`
      })
      record(hairlineOk === true, `${label}: actions hairline color (${String(hairlineOk)})`)
    }
    if (slug === 'capacitor-list-input' || slug === 'capacitor-textarea' || slug === 'capacitor-searchbar') {
      const field = target.locator('[data-tc-demo-state="filled"] input, [data-tc-demo-state="filled"] textarea, [data-tc-demo-state="with-cancel"] input').first()
      if (await field.count()) await field.fill('demo', { timeout: 3000 })
    }
    const overlaySlugs = new Set([
      'capacitor-actions',
      'capacitor-sheet',
      'capacitor-popover',
      'capacitor-popup',
      'capacitor-panel',
      'capacitor-dialog',
      'capacitor-alert',
      'capacitor-toast',
      'capacitor-notification',
      'capacitor-modal',
    ])
    if (overlaySlugs.has(slug)) {
      const host = page.locator('.tc-demo-overlay-host')
      const isOpenState = stateId === 'open' || stateId === 'sheet-open' || stateId === 'inline-open'
      if (!isOpenState) {
        const trigger = page.getByRole('button', { name: /open|show/i }).first()
        if (await trigger.count()) await trigger.click({ timeout: 5000 })
        await page.waitForTimeout(400)
      }
      const hadOverlay = await host.locator('[role="dialog"], .actions-modal, .sheet-modal, .popup, .panel, .popover, .toast, .notification, .modal').count()
      if (hadOverlay) {
        await page.keyboard.press('Escape')
        await page.waitForTimeout(300)
        const afterEsc = await host.evaluate((el) => el.children.length)
        record(afterEsc === 0, `${label}: escape closes overlay (children=${afterEsc})`)
        if (!isOpenState) {
          const trigger = page.getByRole('button', { name: /open|show/i }).first()
          if (await trigger.count()) await trigger.click({ timeout: 5000 })
        } else {
          await page.reload({ waitUntil: 'domcontentloaded' })
          await page.waitForSelector('#tc-demo-root', { timeout: 30_000 })
          await page.waitForTimeout(400)
        }
        const backdrop = host.locator('.sheet-backdrop, .popup-backdrop, .panel-backdrop, .popover-backdrop, [class*="backdrop"]').first()
        if (await backdrop.count()) {
          await backdrop.click({ position: { x: 8, y: 8 }, timeout: 4000 })
          await page.waitForTimeout(300)
          const afterBd = await host.evaluate((el) => el.children.length)
          record(afterBd === 0, `${label}: backdrop closes overlay (children=${afterBd})`)
        }
      }
    }
    if ((slug === 'capacitor-dialog' || slug === 'capacitor-alert') && (stateId === 'open' || stateId === 'screen')) {
      const firstChar = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]')
        if (!dialog) return { ok: false, reason: 'no dialog' }
        const title = dialog.querySelector('.text-lg, .font-semibold, [class*="title"]')
        const body = dialog.querySelector('.text-sm')
        const nodes = [title, body].filter(Boolean)
        for (const el of nodes) {
          if (!(el instanceof HTMLElement)) continue
          const text = el.innerText.trim()
          if (!text) continue
          const textNode = [...el.childNodes].find(
            (n) => n.nodeType === Node.TEXT_NODE && (n.textContent?.trim().length ?? 0) > 0,
          )
          if (!textNode || !(textNode.textContent && textNode.textContent.length > 0)) continue
          const r = document.createRange()
          r.setStart(textNode, 0)
          r.setEnd(textNode, 1)
          const rects = r.getClientRects()
          const box = el.getBoundingClientRect()
          if (rects.length && rects[0].left < box.left - 1) return { ok: false, reason: `clipped first glyph ${text.slice(0, 12)}` }
        }
        return { ok: true }
      })
      record(Boolean(firstChar.ok), `${label}: dialog first letter (${firstChar.reason ?? 'ok'})`)
    }
  } catch (error) {
    record(false, `interaction failed on ${slug}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * @param {import('playwright').Page} page
 * @param {string} slug
 * @param {string} label
 */
async function assertOuterPageThemeSwitch(page, slug, label) {
  const pageErrors = []
  const onConsole = (msg) => {
    if (msg.type() === 'error') pageErrors.push(msg.text())
  }
  page.on('console', onConsole)
  await page.click('[data-tc-platform="material"]')
  await page.waitForTimeout(600)
  const firstFrame = page.locator('iframe.tc-demo-state-iframe').first()
  const materialSrc = (await firstFrame.getAttribute('src')) ?? ''
  const materialOk = materialSrc.includes('platform=material')
  record(materialOk, `${label}: outer page platform switch updates iframe src`)
  await page.click('[data-tc-dark="1"]')
  await page.waitForTimeout(700)
  const darkSrc = (await firstFrame.getAttribute('src')) ?? ''
  const darkOk = darkSrc.includes('dark=1')
  record(darkOk, `${label}: outer page dark switch updates iframe src`)
  record(pageErrors.length === 0, `${label}: no console errors during theme switch (${pageErrors.join('; ')})`)
  page.off('console', onConsole)
}

function shellUrl(slug, stateId, theme) {
  const q = new URLSearchParams({
    slug,
    state: stateId,
    platform: theme.platform,
    dark: theme.dark ? '1' : '0',
  })
  return `/plugins/tailwind-capacitor/demo/shell/?${q}`
}

/**
 * @param {import('playwright').Page} page
 */
async function assertDarkPhoneBackground(page, label) {
  const darkOk = await page.evaluate(() => {
    const fill = document.querySelector('[data-tc-demo-state].tc-demo-state-fill')
    if (!fill) return 'missing fill'
    const bg = getComputedStyle(fill).backgroundColor
    const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (!m) return `no rgb ${bg}`
    const lum = (Number(m[1]) * 0.2126 + Number(m[2]) * 0.7152 + Number(m[3]) * 0.0722) / 255
    return lum < 0.35 ? true : `bg too light ${bg}`
  })
  record(darkOk === true, `${label}: dark frame background (${String(darkOk)})`)
}

/**
 * @param {import('playwright').Page} page
 * @param {string} slug
 * @param {{ id: string, width: number, height: number }} viewport
 * @param {{ id: string, platform: string, dark: boolean }} theme
 */
async function qaSlug(page, slug, viewport, theme) {
  const path = `/plugins/tailwind-capacitor/demo/${encodeURIComponent(slug)}/`
  const states = stateManifest[slug] ?? [{ id: 'preview', label: 'Preview' }]
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'domcontentloaded', timeout: 120_000 })
  await page.waitForSelector('[data-tc-demo-state-section]', { timeout: 30_000 })
  await page.click(`[data-tc-platform="${theme.platform}"]`).catch(() => {})
  await page.click(`[data-tc-dark="${theme.dark ? '1' : '0'}"]`)
  await page.waitForTimeout(900)
  const pageLabel = `${slug} ${viewport.id} ${theme.id}`
  if (viewport.id === 'desktop' && theme.id === 'ios-light') {
    await assertOuterPageThemeSwitch(page, slug, `${pageLabel} catalog theme`)
  }
  await assertPageLayout(page, pageLabel)

  const shotDir = join(outRoot, slug)
  await mkdir(shotDir, { recursive: true })

  if (viewport.id === 'mobile') {
    for (const state of states) {
      const label = `${slug} ${state.id} ${viewport.id} ${theme.id}`
      const section = page.locator(`[data-tc-demo-state-section="${state.id}"]`)
      await section.scrollIntoViewIfNeeded({ timeout: 20_000 }).catch(() => {})
      await page.waitForTimeout(150)
      const pageFile = `${viewport.id}-page-${theme.id}-${state.id}.png`
      await section.screenshot({ path: join(shotDir, pageFile) })
      record(true, `${label}: captured page`)
    }
  }

  const phoneViewport = { width: 390, height: 720 }
  await page.setViewportSize(phoneViewport)

  for (const state of states) {
    const label = `${slug} ${state.id} ${viewport.id} ${theme.id}`
    await page.goto(`${baseUrl}${shellUrl(slug, state.id, theme)}`, { waitUntil: 'domcontentloaded', timeout: 120_000 })
    await page.waitForSelector('[data-tc-demo-state]', { timeout: 30_000 })
    await page.waitForSelector('#tc-demo-root', { timeout: 30_000 })
    await page.waitForTimeout(250)
    await exerciseInteractions(page, slug, state.id, label)
    await assertStateClipping(page, state.id, label)
    if (theme.dark) await assertDarkPhoneBackground(page, label)
    if ((slug === 'capacitor-dialog' || slug === 'capacitor-alert') && state.id === 'open') {
      await assertDialogHairlineWithinDialog(page, label)
    }
    if (
      (slug === 'capacitor-dialog' || slug === 'capacitor-alert') &&
      theme.platform === 'ios' &&
      !theme.dark &&
      (state.id === 'open' || state.id === 'screen')
    ) {
      await assertDialogBodyNotSeeThrough(page, slug, label)
    }
    if (slug === 'capacitor-dialog-button' && state.id === 'cancel-ok') {
      await assertDialogButtonPreviewNoStrayRule(page, label)
    }
    if (slug === 'capacitor-toast' && state.id === 'open') {
      await assertToastHasVisibleSurface(page, label)
    }

    const frameFile = `${viewport.id}-frame-${theme.id}-${state.id}.png`
    await page.locator('#tc-demo-root').screenshot({ path: join(shotDir, frameFile) })
    record(true, `${label}: captured frame`)
  }

  await page.setViewportSize({ width: viewport.width, height: viewport.height })
}

async function writeQaIndex() {
  const lines = [
    '# Tailwind Capacitor demo QA shots',
    '',
    `Base URL: ${baseUrl}`,
    '',
    `Pass: ${summary.pass}, Fail: ${summary.fail}`,
    '',
    'Each component lists every state with phone-frame and (on mobile) full 390px viewport page shots.',
    '',
  ]
  if (summary.errors.length) {
    lines.push('## Failures', '', ...summary.errors.map((e) => `- ${e}`), '')
  }
  for (const slug of slugs) {
    const states = stateManifest[slug] ?? []
    lines.push(`## ${slug}`, '')
    for (const state of states) {
      lines.push(`### ${state.id} (${state.label})`, '')
      for (const viewport of viewports) {
        for (const theme of themes) {
          const frame = `${slug}/${viewport.id}-frame-${theme.id}-${state.id}.png`
          const url = `https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/${prNumber}/qa/${frame}`
          lines.push(`#### ${viewport.id} ${theme.id} (frame)`, '', `![${slug} ${state.id} frame](${url})`, '')
          if (viewport.id === 'mobile') {
            const page = `${slug}/${viewport.id}-page-${theme.id}-${state.id}.png`
            const pageUrl = `https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/${prNumber}/qa/${page}`
            lines.push(`#### ${viewport.id} ${theme.id} (page)`, '', `![${slug} ${state.id} page](${pageUrl})`, '')
          }
        }
      }
    }
  }
  await writeFile(join(outRoot, 'README.md'), `${lines.join('\n')}\n`)

  const htmlParts = [
    '<!doctype html><html><head><meta charset="utf-8"/><title>Tailwind Capacitor demo QA</title>',
    '<style>body{font-family:system-ui,sans-serif;margin:1rem;max-width:1200px} img{max-width:100%;height:auto;border:1px solid #ccc;margin:0.5rem 0} h2{margin-top:2rem} h3{margin-top:1.25rem} h4{margin:0.75rem 0 0.25rem}</style>',
    '</head><body>',
    `<h1>QA shots (pass ${summary.pass}, fail ${summary.fail})</h1>`,
    '<ul>',
    ...slugs.map((slug) => `<li><a href="#${slug}">${slug}</a></li>`),
    '</ul>',
  ]
  for (const slug of slugs) {
    htmlParts.push(`<h2 id="${slug}">${slug}</h2>`)
    for (const state of stateManifest[slug] ?? []) {
      htmlParts.push(`<h3>${state.id} <small>(${state.label})</small></h3>`)
      for (const viewport of viewports) {
        for (const theme of themes) {
          const frame = `${slug}/${viewport.id}-frame-${theme.id}-${state.id}.png`
          htmlParts.push(`<h4>${viewport.id} ${theme.id} frame</h4><img src="${frame}" alt="${slug} ${state.id}" loading="lazy"/>`)
          if (viewport.id === 'mobile') {
            const page = `${slug}/${viewport.id}-page-${theme.id}-${state.id}.png`
            htmlParts.push(`<h4>${viewport.id} ${theme.id} page</h4><img src="${page}" alt="${slug} ${state.id} page" loading="lazy"/>`)
          }
        }
      }
    }
  }
  htmlParts.push('</body></html>')
  await writeFile(join(outRoot, 'index.html'), `${htmlParts.join('\n')}\n`)

  const manifestPath = join(outRoot, 'sha256.json')
  const entries = []
  async function walk(dir, prefix = '') {
    const { readdir } = await import('node:fs/promises')
    for (const name of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, name.name)
      if (name.isDirectory()) await walk(full, `${prefix}${name.name}/`)
      else if (name.name.endsWith('.png')) {
        const buf = await readFile(full)
        entries.push({
          fileName: `${prefix}${name.name}`,
          sha256: createHash('sha256').update(buf).digest('hex'),
        })
      }
    }
  }
  await walk(outRoot)
  entries.sort((a, b) => a.fileName.localeCompare(b.fileName))
  await writeFile(manifestPath, `${JSON.stringify(entries, null, 2)}\n`)
}

/**
 * @param {import('playwright').Page} page
 */
async function qaLayoutSmoke(page) {
  if (process.env.TC_QA_ONLY_SLUG) return
  const layoutDir = join(outRoot, 'layout-smoke')
  await mkdir(layoutDir, { recursive: true })
  const routes = [
    { path: '/plugins/tailwind-capacitor/demo/', file: 'demo-index' },
    { path: '/plugins/tailwind-capacitor/demo/capacitor-button/', file: 'capacitor-button' },
  ]
  await page.setViewportSize({ width: 390, height: 844 })
  for (const route of routes) {
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'load', timeout: 120_000 })
    await page.waitForSelector('[data-tc-demo-intro]', { state: 'visible', timeout: 60_000 })
    const labelTop = `layout-smoke ${route.file} top`
    await assertPageLayout(page, labelTop, { checkIntroClearance: true })
    await assertDemoCatalogChrome(page, labelTop, { scrolled: false })
    await page.screenshot({ path: join(layoutDir, `${route.file}-390x844-top.png`), fullPage: false })
    record(true, `${labelTop}: captured`)
    await page.evaluate(() => window.scrollTo({ top: 600, left: 0 }))
    await page.waitForTimeout(400)
    const labelScroll = `layout-smoke ${route.file} scroll-600`
    await assertPageLayout(page, labelScroll, { checkIntroClearance: false })
    await assertDemoCatalogChrome(page, labelScroll, { scrolled: true })
    await page.screenshot({ path: join(layoutDir, `${route.file}-390x844-scroll-600.png`), fullPage: false })
    record(true, `${labelScroll}: captured`)
  }
}

const browser = await chromium.launch()
const context = await browser.newContext()
const page = await context.newPage()
try {
  await qaLayoutSmoke(page)
  for (const slug of slugs) {
    for (const viewport of viewports) {
      for (const theme of themes) {
        await qaSlug(page, slug, viewport, theme)
      }
    }
  }
} finally {
  await browser.close()
}
await writeQaIndex()
console.log(JSON.stringify({ outRoot, states: Object.values(stateManifest).flat().length, ...summary }, null, 2))
if (summary.fail > 0) process.exit(1)