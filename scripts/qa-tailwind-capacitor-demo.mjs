import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const manifest = JSON.parse(await readFile(join(repoRoot, 'apps/web/src/tailwind-capacitor-snapshot/registry-manifest.json'), 'utf8'))
const stateManifest = JSON.parse(
  await readFile(join(repoRoot, 'apps/web/src/components/tailwind-capacitor-demo/state-manifest.json'), 'utf8'),
)

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
  const metrics = await page.evaluate(() => {
    const header = document.querySelector('header')
    const headerRect = header?.getBoundingClientRect()
    const introNodes = [
      ...document.querySelectorAll('[data-tc-demo-intro]'),
      document.getElementById('tc-demo-registry-counts'),
    ].filter((node) => node instanceof HTMLElement)
  return {
    docScrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    headerBottom: headerRect?.bottom ?? null,
    introHits: introNodes
      .map((node) => {
        const r = node.getBoundingClientRect()
        const hb = headerRect?.bottom ?? 0
        if (headerRect && r.top < hb - 1) {
          return `${node.id || node.tagName}:${Math.round(r.top)}<${Math.round(hb)}`
        }
        return null
      })
      .filter(Boolean),
  }
  })
  record(
    metrics.docScrollWidth <= metrics.clientWidth + 1,
    `${label}: horizontal overflow on page (${metrics.docScrollWidth} > ${metrics.clientWidth})`,
  )
  record(
    metrics.introHits.length === 0,
    `${label}: site header intersects intro text (${metrics.introHits.join('; ')})`,
  )
}

/**
 * @param {import('playwright').Frame} frame
 * @param {string} stateId
 * @param {string} label
 */
async function assertStateClipping(frame, stateId, label) {
  const clipped = await frame.evaluate((id) => {
    const stage = document.querySelector(`[data-tc-demo-state="${id}"]`)
    if (!stage) return ['missing state element']
    const bad = []
    for (const el of stage.querySelectorAll('button, p, span, a, label')) {
      if (!(el instanceof HTMLElement)) continue
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
 * @param {import('playwright').Frame} frame
 * @param {string} slug
 */
async function exerciseInteractions(frame, slug) {
  try {
    if (slug === 'capacitor-toggle' || slug === 'capacitor-checkbox' || slug === 'capacitor-radio') {
      const control = frame.locator('[data-tc-demo-state="on"] .toggle, [data-tc-demo-state="on"] input, [data-tc-demo-state="on"] [role="checkbox"]').first()
      if (await control.count()) await control.click({ timeout: 3000 }).catch(() => {})
    }
    if (slug === 'capacitor-tabs' || slug === 'capacitor-segmented') {
      const tab = frame.locator('[data-tc-demo-state] button, [data-tc-demo-state] .tab, [data-tc-demo-state] .segmented button').nth(1)
      if (await tab.count()) await tab.click({ timeout: 3000 }).catch(() => {})
    }
    if (slug === 'capacitor-list-input' || slug === 'capacitor-textarea' || slug === 'capacitor-searchbar') {
      const field = frame.locator('[data-tc-demo-state="filled"] input, [data-tc-demo-state="filled"] textarea').first()
      if (await field.count()) await field.fill('demo', { timeout: 3000 })
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
async function qaSlug(page, slug, viewport, theme) {
  const path = `/plugins/tailwind-capacitor/demo/${encodeURIComponent(slug)}/`
  const states = stateManifest[slug] ?? [{ id: 'default', label: 'Default' }]
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'domcontentloaded', timeout: 120_000 })
  await page.waitForSelector('[data-tc-demo-state-section]', { timeout: 30_000 })
  await page.click(`[data-tc-platform="${theme.platform}"]`).catch(() => {})
  await page.click(`[data-tc-dark="${theme.dark ? '1' : '0'}"]`)
  await page.waitForTimeout(900)
  const pageLabel = `${slug} ${viewport.id} ${theme.id}`
  await assertPageLayout(page, pageLabel)

  const shotDir = join(outRoot, slug)
  await mkdir(shotDir, { recursive: true })

  for (const state of states) {
    const label = `${slug} ${state.id} ${viewport.id} ${theme.id}`
    const section = page.locator(`[data-tc-demo-state-section="${state.id}"]`)
    await section.scrollIntoViewIfNeeded({ timeout: 20_000 }).catch(() => {})
    const iframeLocator = section.locator('iframe.tc-demo-state-iframe')
    await iframeLocator.waitFor({ state: 'visible', timeout: 30_000 })
    const frameHandle = await iframeLocator.elementHandle()
    const content = await frameHandle?.contentFrame()
    if (!content) {
      record(false, `${label}: missing iframe content`)
      continue
    }
    await content.waitForSelector('#tc-demo-root', { timeout: 30_000 }).catch(() => {})
    await page.waitForTimeout(200)
    await exerciseInteractions(content, slug)
    await assertStateClipping(content, state.id, label)

    if (theme.dark) {
      const darkOk = await content.evaluate(() => {
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

    const phone = section.locator('.tc-demo-phone-frame')
    const frameFile = `${viewport.id}-frame-${theme.id}-${state.id}.png`
    await phone.screenshot({ path: join(shotDir, frameFile) })
    record(true, `${label}: captured frame`)

    if (viewport.id === 'mobile') {
      const pageFile = `${viewport.id}-page-${theme.id}-${state.id}.png`
      await section.screenshot({ path: join(shotDir, pageFile) })
      record(true, `${label}: captured page`)
    }
  }
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

const browser = await chromium.launch()
const context = await browser.newContext()
const page = await context.newPage()
try {
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