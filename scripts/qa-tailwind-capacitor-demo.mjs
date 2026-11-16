import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const manifest = JSON.parse(await readFile(join(repoRoot, 'apps/web/src/tailwind-capacitor-snapshot/registry-manifest.json'), 'utf8'))

const slugs = ['foundation', ...manifest.items.filter((i) => !['capacitor-tailwind', 'capacitor-provider', 'capacitor-shared', 'capacitor-icons'].includes(i.name)).map((i) => i.name)]

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

/**
 * @param {import('playwright').Page} page
 */
async function assertPageLayout(page, label) {
  const metrics = await page.evaluate(() => ({
    docScrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    introTop: document.getElementById('tc-demo-registry-counts')?.getBoundingClientRect().top ?? null,
    headerBottom: document.querySelector('header')?.getBoundingClientRect().bottom ?? null,
  }))
  record(
    metrics.docScrollWidth <= metrics.clientWidth + 1,
    `${label}: horizontal overflow on page (${metrics.docScrollWidth} > ${metrics.clientWidth})`,
  )
  if (metrics.introTop != null && metrics.headerBottom != null) {
    record(metrics.introTop >= metrics.headerBottom - 2, `${label}: intro overlaps site header (top ${metrics.introTop} < header ${metrics.headerBottom})`)
  }
}

/**
 * @param {import('playwright').Frame} frame
 * @param {string} label
 */
async function assertFrameClipping(frame, label) {
  const clipped = await frame.evaluate(() => {
    const root = document.getElementById('tc-demo-root')
    if (!root) return []
    const bad = []
    for (const el of root.querySelectorAll('button, p, span, a, label')) {
      if (!(el instanceof HTMLElement)) continue
      if (el.scrollHeight > el.clientHeight + 2 && el.innerText.trim().length > 0) {
        bad.push(`${el.tagName}:${el.innerText.slice(0, 24)} scroll ${el.scrollHeight}/${el.clientHeight}`)
      }
      const parent = el.parentElement
      if (parent && parent instanceof HTMLElement && parent.scrollHeight > parent.clientHeight + 4) {
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
    return bad.slice(0, 5)
  })
  record(clipped.length === 0, `${label}: clipped text in iframe: ${clipped.join('; ')}`)
}

/**
 * @param {import('playwright').Frame} frame
 * @param {string} slug
 */
async function exerciseInteractions(frame, slug) {
  const overlaySlugs = new Set([
    'capacitor-actions',
    'capacitor-dialog',
    'capacitor-sheet',
    'capacitor-popup',
    'capacitor-panel',
    'capacitor-popover',
    'capacitor-toast',
    'capacitor-notification',
  ])
  try {
    if (overlaySlugs.has(slug)) {
      const trigger = frame.locator('button.tc-demo-overlay-trigger').first()
      if (await trigger.count()) {
        await trigger.click({ timeout: 5000 })
        await frame.waitForTimeout(400)
        const backdrop = frame.locator('.tc-demo-overlay-host [class*="backdrop"], .tc-demo-overlay-host .actions, .tc-demo-overlay-host .dialog').first()
        if (await backdrop.count()) {
          await frame.locator('.tc-demo-overlay-host').click({ position: { x: 8, y: 8 }, timeout: 2000 }).catch(() => {})
        }
      }
    }
    if (slug === 'capacitor-toggle' || slug === 'capacitor-checkbox' || slug === 'capacitor-radio') {
      const control = frame.locator('#tc-demo-root input, #tc-demo-root .toggle, #tc-demo-root [role="checkbox"], #tc-demo-root label').first()
      if (await control.count()) await control.click({ timeout: 3000 }).catch(() => {})
    }
    if (slug === 'capacitor-tabs' || slug === 'capacitor-segmented') {
      const tab = frame.locator('#tc-demo-root button, #tc-demo-root .tab, #tc-demo-root .segmented button').nth(1)
      if (await tab.count()) await tab.click({ timeout: 3000 }).catch(() => {})
    }
    if (slug === 'capacitor-input' || slug === 'capacitor-textarea' || slug === 'capacitor-searchbar') {
      const field = frame.locator('#tc-demo-root input, #tc-demo-root textarea').first()
      if (await field.count()) {
        await field.fill('demo', { timeout: 3000 })
      }
    }
  } catch (error) {
    record(false, `interaction failed on ${slug}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * @param {import('playwright').Page} page
 * @param {string} slug
 * @param {{ id: string, width: number, height: number }} viewport
 * @param {{ id: string, platform: string, dark: boolean }} theme
 */
async function qaComponent(page, slug, viewport, theme) {
  const label = `${slug} ${viewport.id} ${theme.id}`
  const path = `/plugins/tailwind-capacitor/demo/${encodeURIComponent(slug)}/`
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'domcontentloaded', timeout: 120_000 })
  await page.waitForSelector('#tc-demo-iframe', { timeout: 30_000 })
  await page.click(`[data-tc-platform="${theme.platform}"]`).catch(() => {})
  await page.click(`[data-tc-dark="${theme.dark ? '1' : '0'}"]`)
  await page.waitForTimeout(600)
  const iframe = page.frameLocator('#tc-demo-iframe')
  await iframe.locator('#tc-demo-root').waitFor({ state: 'visible', timeout: 30_000 })
  await assertPageLayout(page, label)
  const frameHandle = await page.locator('#tc-demo-iframe').elementHandle()
  const content = await frameHandle?.contentFrame()
  if (!content) {
    record(false, `${label}: missing iframe content`)
    return
  }
  await assertFrameClipping(content, label)
  await exerciseInteractions(content, slug)
  const shotDir = join(outRoot, slug)
  await mkdir(shotDir, { recursive: true })
  const fileName = `${viewport.id}-${theme.id}.png`
  await page.locator('.tc-demo-phone-frame').screenshot({ path: join(shotDir, fileName) })
}

async function writeQaIndex() {
  const lines = [
    '# Tailwind Capacitor demo QA shots',
    '',
    `Base URL: ${baseUrl}`,
    '',
    `Pass: ${summary.pass}, Fail: ${summary.fail}`,
    '',
  ]
  if (summary.errors.length) {
    lines.push('## Failures', '', ...summary.errors.map((e) => `- ${e}`), '')
  }
  for (const slug of slugs) {
    lines.push(`## ${slug}`, '')
    for (const viewport of viewports) {
      for (const theme of themes) {
        const rel = `${slug}/${viewport.id}-${theme.id}.png`
        const url = `https://raw.githubusercontent.com/Cap-go/website/ASSETS_SHA/tailwind-capacitor-demo-screenshots/${prNumber}/qa/${rel}`
        lines.push(`### ${viewport.id} ${theme.id}`, '', `![${slug} ${theme.id}](${url})`, '')
      }
    }
  }
  await writeFile(join(outRoot, 'README.md'), `${lines.join('\n')}\n`)
  const htmlParts = [
    '<!doctype html><html><head><meta charset="utf-8"/><title>Tailwind Capacitor demo QA</title></head><body>',
    `<h1>QA shots (pass ${summary.pass}, fail ${summary.fail})</h1>`,
    '<ul>',
    ...slugs.map((slug) => `<li><a href="#${slug}">${slug}</a></li>`),
    '</ul>',
  ]
  for (const slug of slugs) {
    htmlParts.push(`<h2 id="${slug}">${slug}</h2>`)
    for (const viewport of viewports) {
      for (const theme of themes) {
        const rel = `${slug}/${viewport.id}-${theme.id}.png`
        htmlParts.push(`<h3>${viewport.id} ${theme.id}</h3><img src="${rel}" alt="${slug}" width="390" loading="lazy"/>`)
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

const browser = await chromium.launch()
const context = await browser.newContext()
const page = await context.newPage()
try {
  for (const slug of slugs) {
    for (const viewport of viewports) {
      for (const theme of themes) {
        await qaComponent(page, slug, viewport, theme)
      }
    }
  }
} finally {
  await browser.close()
}
await writeQaIndex()
console.log(JSON.stringify({ outRoot, ...summary }, null, 2))
if (summary.fail > 0) process.exit(1)