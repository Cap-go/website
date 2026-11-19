import { createHash } from 'node:crypto'
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import sharp from 'sharp'
import { assertDemoFrameHasVisibleControl } from './lib/tailwind-capacitor-demo-frame-assert.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = process.env.OUT_DIR ?? join(__dirname, '..', 'pr-screenshots-out')
const afterBase = (process.env.AFTER_BASE ?? 'https://pr-1452-capgo-website.digitalshift-ee.workers.dev').replace(/\/$/, '')
const beforeBase = (process.env.BEFORE_BASE ?? 'https://capgo.app').replace(/\/$/, '')

const viewports = [
  { id: 'desktop', width: 1440, height: 900 },
  { id: 'mobile', width: 390, height: 844 },
]

const themeCombos = [
  { tag: 'ios-light', platform: 'ios', dark: false },
  { tag: 'ios-dark', platform: 'ios', dark: true },
  { tag: 'material-light', platform: 'material', dark: false },
  { tag: 'material-dark', platform: 'material', dark: true },
]

function sha(buf) {
  return createHash('sha256').update(buf).digest('hex')
}

/** @param {import('playwright').Page} page */
async function softenChrome(page) {
  await page.addStyleTag({
    content: `header.fixed { opacity: 0.12 !important; pointer-events: none !important; } footer { opacity: 0.12 !important; }`,
  })
}

/**
 * @param {import('playwright').Page} page
 * @param {'ios' | 'material'} platform
 * @param {boolean} dark
 */
async function applyDemoTheme(page, platform, dark) {
  const controls = page.locator('[data-tc-demo-controls]')
  await controls.waitFor({ state: 'visible', timeout: 60_000 })
  await controls.locator(`[data-tc-platform="${platform}"]`).click({ force: true })
  await controls.locator(`[data-tc-dark="${dark ? '1' : '0'}"]`).click({ force: true })
  const frame = page.frameLocator('iframe.tc-demo-state-iframe[data-tc-state="solid"]').first()
  const want = platform === 'ios' ? 'c-ios' : 'c-material'
  for (let i = 0; i < 50; i += 1) {
    const classes = (await frame.locator('#tc-demo-root').getAttribute('class').catch(() => '')) ?? ''
    const htmlDark = await frame.locator('html').evaluate((el) => el.classList.contains('dark')).catch(() => false)
    if (classes.includes(want) && htmlDark === dark) break
    await page.waitForTimeout(350)
  }
  await assertDemoFrameHasVisibleControl(frame)
  await page.waitForTimeout(400)
}

/**
 * @param {string} filePath
 */
async function assertButtonPixelsVisible(filePath) {
  const { data, info } = await sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let accentHits = 0
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (r > 40 && g > 90 && b > 180 && r < 120) accentHits += 1
  }
  const minHits = Math.max(120, Math.floor(info.width * info.height * 0.002))
  if (accentHits < minHits) {
    throw new Error(`Screenshot ${filePath} lacks visible button fill pixels (${accentHits} < ${minHits})`)
  }
}

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
const kept = []
const hashes = {}

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
    try {
      await page.goto(`${beforeBase}/plugins/tailwind-capacitor/`, { waitUntil: 'networkidle', timeout: 120_000 })
      await softenChrome(page)
      const beforeName = `${viewport.id}-before.png`
      await page.screenshot({ path: join(outDir, beforeName), fullPage: false })
      hashes[beforeName] = sha(await readFile(join(outDir, beforeName)))
      kept.push(beforeName)

      await page.goto(`${afterBase}/plugins/tailwind-capacitor/demo/`, { waitUntil: 'networkidle', timeout: 120_000 })
      await softenChrome(page)
      await page.locator('#tc-demo-page-intro').waitFor({ state: 'visible', timeout: 60_000 })
      const catalogName = `${viewport.id}-after-catalog.png`
      const catalogPath = join(outDir, catalogName)
      await page.screenshot({ path: catalogPath, fullPage: false })
      const catalogSha = sha(await readFile(catalogPath))
      if (catalogSha !== hashes[beforeName]) {
        hashes[catalogName] = catalogSha
        kept.push(catalogName)
      } else {
        await unlink(catalogPath)
      }

      await page.goto(`${afterBase}/plugins/tailwind-capacitor/demo/capacitor-button/`, {
        waitUntil: 'networkidle',
        timeout: 120_000,
      })
      await softenChrome(page)
      await page.locator('iframe.tc-demo-state-iframe[data-tc-state="solid"]').first().waitFor({ state: 'visible', timeout: 90_000 })

      for (const combo of themeCombos) {
        await applyDemoTheme(page, combo.platform, combo.dark)
        const phone = page.locator('.tc-demo-phone-frame:has(iframe[data-tc-state="solid"])').first()
        await phone.waitFor({ state: 'visible', timeout: 30_000 })
        const shotName = `${viewport.id}-after-button-${combo.tag}.png`
        const shotPath = join(outDir, shotName)
        await phone.screenshot({ path: shotPath })
        await assertButtonPixelsVisible(shotPath)
        hashes[shotName] = sha(await readFile(shotPath))
        kept.push(shotName)
      }
    } finally {
      await page.close()
    }
  }
} finally {
  await browser.close()
}

for (const tag of ['ios', 'material']) {
  if (hashes[`desktop-after-button-${tag}-light`] === hashes[`desktop-after-button-${tag}-dark`]) {
    throw new Error(`Desktop ${tag} light/dark screenshots are identical`)
  }
  if (hashes[`mobile-after-button-${tag}-light`] === hashes[`mobile-after-button-${tag}-dark`]) {
    throw new Error(`Mobile ${tag} light/dark screenshots are identical`)
  }
}

await writeFile(join(outDir, 'manifest.json'), `${JSON.stringify({ files: kept, hashes }, null, 2)}\n`)
console.log(JSON.stringify({ outDir, kept, hashes }, null, 2))