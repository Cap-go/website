import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const outDir = process.env.TC_DEMO_SCREENSHOT_DIR ?? join(repoRoot, '.tc-demo-screenshots')
const baseUrl = process.env.TC_DEMO_BASE_URL ?? 'http://127.0.0.1:4321'
const demoPath = '/plugins/tailwind-capacitor/demo/'

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

async function applyTheme(page, platform, dark) {
  const root = page.locator('[data-tc-demo-controls]')
  await root.locator(`[data-tc-platform="${platform}"]`).click()
  await root.locator(`[data-tc-dark="${dark ? '1' : '0'}"]`).click()
  const iframe = page.locator('#tc-demo-iframe')
  await page.waitForFunction(
    ({ platform: p, dark: d }) => {
      const frame = document.getElementById('tc-demo-iframe')
      if (!(frame instanceof HTMLIFrameElement) || !frame.contentWindow) return false
      const doc = frame.contentWindow.document
      const isDark = doc.documentElement.classList.contains('dark')
      const app = doc.querySelector('#tc-demo-root')
      const isIos = app?.classList.contains('c-ios')
      const isMaterial = app?.classList.contains('c-material')
      const platformOk = p === 'ios' ? isIos : isMaterial
      return platformOk && isDark === d
    },
    { platform, dark },
    { timeout: 15000 },
  )
  await page.waitForTimeout(400)
}

async function main() {
  await mkdir(outDir, { recursive: true })
  const browser = await chromium.launch()
  const manifest = []
  try {
    for (const viewport of viewports) {
      for (const combo of combos) {
        const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
        await page.goto(`${baseUrl}${demoPath}`, { waitUntil: 'networkidle' })
        await applyTheme(page, combo.platform, combo.dark)
        const fileName = `${viewport.prefix}-${combo.tag}.png`
        const filePath = join(outDir, fileName)
        await page.screenshot({ path: filePath, fullPage: true })
        const buffer = await readFile(filePath)
        const sha256 = createHash('sha256').update(buffer).digest('hex')
        manifest.push({ fileName, sha256 })
        await page.close()
      }
    }
  } finally {
    await browser.close()
  }
  const manifestPath = join(outDir, 'sha256.json')
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(JSON.stringify({ outDir, manifest }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
