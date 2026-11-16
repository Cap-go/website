import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import manifest from '../apps/web/src/tailwind-capacitor-snapshot/registry-manifest.json' with { type: 'json' }

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')

const baseUrl = (process.env.TC_DEMO_BASE_URL ?? 'https://pr-1452-cursor-tailwind-capa-capgo-website.digitalshift-ee.workers.dev')
  .replace(/\/$/, '')
const shellUrl = `${baseUrl}/plugins/tailwind-capacitor/demo/shell/?platform=ios&dark=0`
const reportPath = process.env.TC_DEMO_AUDIT_REPORT ?? join(repoRoot, 'tailwind-capacitor-demo-audit.json')

const foundationNames = new Set(['capacitor-tailwind', 'capacitor-provider', 'capacitor-shared', 'capacitor-icons'])

/** @param {string} name */
function sectionSelector(name) {
  if (foundationNames.has(name)) return '#tc-demo-foundation'
  return `#${name}`
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
const consoleErrors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push({ text: msg.text(), location: msg.location() })
})
page.on('pageerror', (err) => {
  consoleErrors.push({ text: err.message, location: {} })
})

await page.goto(shellUrl, { waitUntil: 'networkidle', timeout: 120_000 })

const failures = []
let checked = 0

for (const item of manifest.items) {
  checked += 1
  const beforeErrorCount = consoleErrors.length
  const selector = sectionSelector(item.name)
  const block = page.locator(`${selector} .registry-demo-block`)
  const section = page.locator(selector)
  try {
    await section.scrollIntoViewIfNeeded({ timeout: 15000 })
    await block.waitFor({ state: 'visible', timeout: 15000 })
    const box = await block.boundingBox()
    const text = (await block.innerText()).trim()
    const tiny = !box || box.height < 6
    if (tiny && text.length < 1) {
      failures.push({ name: item.name, reason: 'empty or hidden demo block', textLen: text.length, height: box?.height ?? 0 })
    }
  } catch (error) {
    failures.push({
      name: item.name,
      reason: 'section or demo block not found',
      detail: error instanceof Error ? error.message : String(error),
    })
  }
  const newErrors = consoleErrors.slice(beforeErrorCount)
  if (newErrors.length > 0) {
    failures.push({
      name: item.name,
      reason: 'console errors while scrolling to demo',
      console: newErrors.map((e) => e.text).slice(0, 5),
    })
  }
}

await browser.close()

const report = {
  checked,
  manifestCount: manifest.items.length,
  shellUrl,
  consoleErrorCount: consoleErrors.length,
  uniqueConsoleErrors: [...new Set(consoleErrors.map((e) => e.text))],
  failures,
  passed: failures.length === 0,
}

await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify({ reportPath, checked, failureCount: failures.length, passed: report.passed }, null, 2))
if (failures.length) process.exit(1)