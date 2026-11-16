import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import manifest from '../apps/web/src/tailwind-capacitor-snapshot/registry-manifest.json' with { type: 'json' }

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')

const baseUrl = (process.env.TC_DEMO_BASE_URL ?? 'https://pr-1452-cursor-tailwind-capa-capgo-website.digitalshift-ee.workers.dev').replace(
  /\/$/,
  '',
)
const reportPath = process.env.TC_DEMO_AUDIT_REPORT ?? join(repoRoot, 'tailwind-capacitor-demo-audit.json')

const foundationNames = new Set(['capacitor-tailwind', 'capacitor-provider', 'capacitor-shared', 'capacitor-icons'])

/** @param {string} name */
function sectionSelector(name) {
  if (foundationNames.has(name)) return '#tc-demo-foundation'
  return `#${name}`
}

const overlayChecks = [
  { section: 'capacitor-sheet', trigger: /open sheet/i, expect: 'Sheet overlay content' },
  { section: 'capacitor-actions', trigger: /open actions/i, expect: 'Delete' },
  { section: 'capacitor-dialog', trigger: /open dialog/i, expect: 'Sample dialog' },
  { section: 'capacitor-popover', trigger: /open popover/i, expect: 'Popover item' },
  { section: 'capacitor-toast', trigger: /show toast/i, expect: 'Toast from registry demo' },
]

const browser = await chromium.launch()
const failures = []
const consoleErrors = []

/**
 * @param {import('playwright').Page} page
 * @param {'ios' | 'material'} platform
 * @param {boolean} dark
 */
async function loadShell(page, platform, dark) {
  const consoleErrorsLocal = []
  page.removeAllListeners('console')
  page.removeAllListeners('pageerror')
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrorsLocal.push(msg.text())
  })
  page.on('pageerror', (err) => {
    consoleErrorsLocal.push(err.message)
  })
  const shellUrl = `${baseUrl}/plugins/tailwind-capacitor/demo/shell/?platform=${platform}&dark=${dark ? '1' : '0'}`
  await page.goto(shellUrl, { waitUntil: 'networkidle', timeout: 120_000 })
  return { shellUrl, consoleErrorsLocal }
}

/**
 * @param {import('playwright').Page} page
 * @param {'ios' | 'material'} platform
 */
async function assertRootTheme(page, platform) {
  const want = platform === 'ios' ? 'c-ios' : 'c-material'
  const classes = (await page.locator('#tc-demo-root').getAttribute('class')) ?? ''
  if (!classes.includes(want)) {
    failures.push({ name: `theme:${platform}`, reason: `missing ${want} on #tc-demo-root`, classes })
  }
}

const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
let checked = 0

const iosLoad = await loadShell(page, 'ios', false)
await assertRootTheme(page, 'ios')
const iosRoot = (await page.locator('#tc-demo-root').getAttribute('class')) ?? ''
consoleErrors.push(...iosLoad.consoleErrorsLocal)

const materialLoad = await loadShell(page, 'material', false)
await assertRootTheme(page, 'material')
const materialRoot = (await page.locator('#tc-demo-root').getAttribute('class')) ?? ''

consoleErrors.push(...materialLoad.consoleErrorsLocal)
if (iosRoot === materialRoot) {
  failures.push({ name: 'theme:compare', reason: 'iOS and Material roots share identical class lists', iosRoot, materialRoot })
} else if (!iosRoot.includes('c-ios') || !materialRoot.includes('c-material')) {
  failures.push({ name: 'theme:compare', reason: 'theme roots missing expected platform markers', iosRoot, materialRoot })
}

await loadShell(page, 'ios', false)
for (const item of manifest.items) {
  checked += 1
  const beforeErrorCount = consoleErrors.length
  const selector = sectionSelector(item.name)
  const block = page.locator(`${selector} .registry-demo-block`)
  const section = page.locator(selector)
  try {
    await section.scrollIntoViewIfNeeded({ timeout: 15_000 })
    await block.waitFor({ state: 'visible', timeout: 15_000 })
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
      console: newErrors.slice(0, 5),
    })
  }
}

for (const check of overlayChecks) {
  try {
    const section = page.locator(`#${check.section}`)
    await section.scrollIntoViewIfNeeded({ timeout: 15_000 })
    await section.getByRole('button', { name: check.trigger }).click({ timeout: 10_000, force: true })
    await page.getByText(check.expect, { exact: false }).first().waitFor({ state: 'visible', timeout: 10_000 })
  } catch (error) {
    failures.push({
      name: check.section,
      reason: 'overlay did not open after trigger click',
      expect: check.expect,
      detail: error instanceof Error ? error.message : String(error),
    })
  }
  await page.keyboard.press('Escape').catch(() => {})
  await page.waitForTimeout(250)
}

const notificationText = await page.locator('#capacitor-notification').innerText().catch(() => '')
if (!notificationText.includes('New message') || !notificationText.includes('Your bundle finished uploading')) {
  failures.push({
    name: 'capacitor-notification',
    reason: 'notification demo missing expected title or body',
    notificationText: notificationText.slice(0, 200),
  })
}

await browser.close()

const report = {
  checked,
  manifestCount: manifest.items.length,
  baseUrl,
  consoleErrorCount: consoleErrors.length,
  uniqueConsoleErrors: [...new Set(consoleErrors)],
  failures,
  passed: failures.length === 0,
}

await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify({ reportPath, checked, failureCount: failures.length, passed: report.passed }, null, 2))
if (failures.length) process.exit(1)