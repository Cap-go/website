#!/usr/bin/env bun
/**
 * Visual regression helper for PRs with UI changes.
 *
 * Usage:
 *   bun run visual-diff:setup
 *   bun run build && bun run visual-diff:capture:before
 *   # apply visual changes, rebuild
 *   bun run build && bun run visual-diff:capture:after
 *   bun run visual-diff:compare
 *   bun run visual-diff:report
 *
 * Override routes for a focused PR:
 *   bun run visual-diff:capture:before -- --suite web --routes /,/pricing/
 */
import { spawn, spawnSync } from 'node:child_process'
import { accessSync } from 'node:fs'
import { access, mkdir, readdir, readFile, rm, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DEFAULT_CONFIG_PATH = path.join(ROOT, 'visual-diff.config.json')
const CAPTURE_LABELS = new Set(['before', 'after'])
const COMPARE_CANDIDATES = [
  '/opt/homebrew/bin/compare',
  '/usr/local/bin/compare',
  '/usr/bin/compare',
]

function resolveCompareBinary() {
  for (const candidate of COMPARE_CANDIDATES) {
    try {
      accessSync(candidate)
      return candidate
    } catch {
      // try next candidate
    }
  }

  throw new Error(
    'ImageMagick compare not found. Install ImageMagick (brew install imagemagick) before running visual diff compare.',
  )
}

function isPathWithinRoot(filePath, rootDir) {
  const resolvedFile = path.resolve(filePath)
  const resolvedRoot = path.resolve(rootDir)
  const relative = path.relative(resolvedRoot, resolvedFile)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}


function parseArgs(argv) {
  const args = {
    configPath: DEFAULT_CONFIG_PATH,
    suite: null,
    routes: null,
    strict: false,
    label: null,
    command: null,
  }

  const positional = []
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--config') {
      args.configPath = path.resolve(ROOT, argv[++i])
      continue
    }
    if (arg === '--suite') {
      args.suite = argv[++i]
      continue
    }
    if (arg === '--routes') {
      args.routes = argv[++i].split(',').map((route) => route.trim()).filter(Boolean)
      continue
    }
    if (arg === '--strict') {
      args.strict = true
      continue
    }
    positional.push(arg)
  }

  args.command = positional[0] ?? null
  args.label = positional[1] ?? null
  return args
}

async function loadConfig(configPath) {
  const raw = await readFile(configPath, 'utf8')
  return JSON.parse(raw)
}

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8'
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8'
  if (filePath.endsWith('.js')) return 'text/javascript; charset=utf-8'
  if (filePath.endsWith('.webp')) return 'image/webp'
  if (filePath.endsWith('.png')) return 'image/png'
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg'
  if (filePath.endsWith('.svg')) return 'image/svg+xml'
  if (filePath.endsWith('.woff2')) return 'font/woff2'
  if (filePath.endsWith('.woff')) return 'font/woff'
  if (filePath.endsWith('.json')) return 'application/json'
  return 'application/octet-stream'
}

function routeSlug(route) {
  return route.replaceAll('/', '_').replace(/^_/, '') || 'home'
}

function screenshotName(route, viewportName, suiteName) {
  return `${suiteName}__${routeSlug(route)}__${viewportName}.png`
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function pathExists(target) {
  try {
    await access(target)
    return true
  } catch {
    return false
  }
}

async function assertDistReady(distDir) {
  const indexPath = path.join(ROOT, distDir, 'index.html')
  if (!(await pathExists(indexPath))) {
    throw new Error(`Missing build output at ${distDir}/index.html. Run "bun run build" first.`)
  }
}

function resolveSuites(config, args) {
  let suites = config.suites
  if (args.suite) {
    suites = suites.filter((suite) => suite.name === args.suite)
    if (suites.length === 0) {
      throw new Error(`Unknown suite "${args.suite}". Available: ${config.suites.map((s) => s.name).join(', ')}`)
    }
  }

  if (args.routes) {
    suites = suites.map((suite) => ({ ...suite, routes: args.routes }))
  }

  return suites
}

async function startStaticServer(distDir, port) {
  const absoluteDist = path.join(ROOT, distDir)
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', `http://127.0.0.1:${port}`)
      let pathname = decodeURIComponent(url.pathname)
      if (pathname.endsWith('/')) pathname += 'index.html'
      const filePath = path.resolve(absoluteDist, `.${pathname}`)
      if (!isPathWithinRoot(filePath, absoluteDist)) {
        res.writeHead(403).end('Forbidden')
        return
      }
      const data = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': contentType(filePath) })
      res.end(data)
    } catch {
      res.writeHead(404).end('Not found')
    }
  })

  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve))
  return server
}

async function captureSuite({ label, suite, config, outputDir }) {
  await assertDistReady(suite.distDir)
  const server = await startStaticServer(suite.distDir, suite.port)
  const browser = await chromium.launch()
  const context = await browser.newContext({ deviceScaleFactor: 1 })
  const captures = []

  try {
    for (const viewport of config.viewports) {
      const page = await context.newPage()
      await page.setViewportSize({ width: viewport.width, height: viewport.height })

      for (const route of suite.routes) {
        const fileName = screenshotName(route, viewport.name, suite.name)
        const outPath = path.join(outputDir, fileName)

        await page.goto(`http://127.0.0.1:${suite.port}${route}`, {
          waitUntil: config.capture.waitUntil,
          timeout: config.capture.navigationTimeoutMs,
        })
        await page.waitForTimeout(config.capture.settleMs)

        const title = await page.title()
        if (!title || title.toLowerCase().includes('not found')) {
          throw new Error(`[${label}] Failed to render ${suite.name}${route} (title: "${title}")`)
        }

        await page.screenshot({ path: outPath, fullPage: true })
        const fileSize = (await stat(outPath)).size
        if (fileSize < config.capture.minScreenshotBytes) {
          throw new Error(
            `[${label}] Screenshot for ${suite.name}${route} (${viewport.name}) is only ${fileSize} bytes. Page likely did not render.`,
          )
        }

        const capture = {
          suite: suite.name,
          route,
          viewport: viewport.name,
          file: fileName,
          bytes: fileSize,
        }
        captures.push(capture)
        console.log(`[${label}] ${suite.name}${route} (${viewport.name}) -> ${path.relative(ROOT, outPath)} (${fileSize} bytes)`)
      }

      await page.close()
    }
  } finally {
    await browser.close()
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())))
  }

  return captures
}

async function capture(label, config, args) {
  if (!CAPTURE_LABELS.has(label)) {
    throw new Error(`Invalid capture label: ${label}`)
  }

  const outputDir = path.resolve(ROOT, config.outputDir, label)
  if (!isPathWithinRoot(outputDir, path.resolve(ROOT, config.outputDir))) {
    throw new Error(`Invalid capture output directory for label: ${label}`)
  }

  await rm(outputDir, { recursive: true, force: true })
  await ensureDir(outputDir)

  const suites = resolveSuites(config, args)
  const manifest = {
    label,
    capturedAt: new Date().toISOString(),
    configPath: path.relative(ROOT, args.configPath),
    suites: [],
  }

  for (const suite of suites) {
    const captures = await captureSuite({ label, suite, config, outputDir })
    manifest.suites.push({ name: suite.name, distDir: suite.distDir, routes: suite.routes, captures })
  }

  const manifestPath = path.join(outputDir, 'manifest.json')
  await Bun.write(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`\nCaptured ${manifest.suites.reduce((n, s) => n + s.captures.length, 0)} screenshots -> ${path.relative(ROOT, outputDir)}`)
}

function compareImages(compareBinary, beforePath, afterPath, fuzzPercent) {
  const args = ['-metric', 'AE']
  if (fuzzPercent > 0) args.push('-fuzz', `${fuzzPercent}%`)
  args.push(beforePath, afterPath, 'null:')

  const proc = spawnSync(compareBinary, args, { encoding: 'utf8' })
  const stderr = (proc.stderr || '').trim()
  const diffPixels = Number.parseFloat(stderr)
  if (!Number.isFinite(diffPixels)) {
    throw new Error(`Image comparison failed: ${stderr || 'no metric output'}`)
  }
  return diffPixels
}

function classifyDiff(diffPixels, compareConfig) {
  if (diffPixels <= compareConfig.identicalMaxPixels) return 'identical'
  if (diffPixels <= compareConfig.minorMaxPixels) return 'minor'
  return 'changed'
}

async function compare(config, args) {
  const beforeDir = path.join(ROOT, config.outputDir, 'before')
  const afterDir = path.join(ROOT, config.outputDir, 'after')
  const diffDir = path.join(ROOT, config.outputDir, 'diff')

  if (!(await pathExists(beforeDir))) {
    throw new Error('Missing before captures. Run: bun run visual-diff:capture:before')
  }
  if (!(await pathExists(afterDir))) {
    throw new Error('Missing after captures. Run: bun run visual-diff:capture:after')
  }

  await ensureDir(diffDir)
  const beforeFiles = (await readdir(beforeDir)).filter((file) => file.endsWith('.png')).sort()
  const afterFiles = (await readdir(afterDir)).filter((file) => file.endsWith('.png')).sort()
  if (beforeFiles.length !== afterFiles.length || beforeFiles.some((file, index) => file !== afterFiles[index])) {
    throw new Error('Before/after screenshot sets do not match. Re-run capture for both labels.')
  }

  const compareBinary = resolveCompareBinary()
  const files = beforeFiles
  const results = []

  for (const file of files) {
    const beforePath = path.join(beforeDir, file)
    const afterPath = path.join(afterDir, file)

    if (!(await pathExists(afterPath))) {
      results.push({ file, diffPixels: null, status: 'missing-after' })
      continue
    }

    try {
      const diffPixels = compareImages(compareBinary, beforePath, afterPath, config.compare.fuzzPercent)
      const status = classifyDiff(diffPixels, config.compare)
      results.push({ file, diffPixels, status })

      if (status === 'changed' || status === 'minor') {
        const diffPath = path.join(diffDir, file.replace('.png', '-diff.png'))
        spawnSync(compareBinary, [beforePath, afterPath, diffPath])
      }
    } catch (error) {
      results.push({ file, diffPixels: null, status: 'error', error: String(error) })
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    fuzzPercent: config.compare.fuzzPercent,
    summary: {
      total: results.length,
      identical: results.filter((r) => r.status === 'identical').length,
      minor: results.filter((r) => r.status === 'minor').length,
      changed: results.filter((r) => r.status === 'changed').length,
      missingAfter: results.filter((r) => r.status === 'missing-after').length,
      unknown: results.filter((r) => r.status === 'unknown').length,
      error: results.filter((r) => r.status === 'error').length,
    },
    results,
  }

  const reportPath = path.join(ROOT, config.outputDir, 'report.json')
  await Bun.write(reportPath, JSON.stringify(report, null, 2))

  console.log(`\nVisual diff summary (${report.summary.total} screenshots, fuzz ${config.compare.fuzzPercent}%):`)
  console.log(`  identical: ${report.summary.identical}`)
  console.log(`  minor:     ${report.summary.minor}`)
  console.log(`  changed:   ${report.summary.changed}`)
  if (report.summary.missingAfter > 0) console.log(`  missing:   ${report.summary.missingAfter}`)
  console.log(`Report: ${path.relative(ROOT, reportPath)}`)
  console.log(`Diff images: ${path.relative(ROOT, diffDir)}/`)

  for (const row of results.filter((r) => r.status !== 'identical')) {
    console.log(`  ${row.status}: ${row.file}${row.diffPixels != null ? ` (${row.diffPixels} px)` : ''}`)
  }

  if (args.strict && (report.summary.changed > 0 || report.summary.missingAfter > 0 || report.summary.unknown > 0 || report.summary.error > 0)) {
    return false
  }

  return true
}

function parseScreenshotName(file) {
  const match = /^(.+?)__(.+?)__(desktop|mobile)\.png$/.exec(file)
  if (!match) return { suite: 'unknown', route: file, viewport: 'unknown' }
  const [, suite, slug, viewport] = match
  const route = slug === 'home' ? '/' : `/${slug.replaceAll('_', '/')}/`
  return { suite, route, viewport }
}

function renderMarkdownReport(report) {
  const lines = [
    '## Visual diff',
    '',
    `Generated with \`bun run visual-diff:compare\` (${report.summary.total} screenshots, fuzz ${report.fuzzPercent}%).`,
    '',
    '| Status | Suite | Route | Viewport | Diff (px) |',
    '| --- | --- | --- | --- | ---: |',
  ]

  for (const row of report.results) {
    const { suite, route, viewport } = parseScreenshotName(row.file)
    const statusLabel =
      row.status === 'identical'
        ? 'identical'
        : row.status === 'minor'
          ? 'minor'
          : row.status === 'changed'
            ? 'changed'
            : row.status
    const diff = row.diffPixels == null ? '—' : String(Math.round(row.diffPixels))
    lines.push(`| ${statusLabel} | ${suite} | ${route} | ${viewport} | ${diff} |`)
  }

  lines.push(
    '',
    '**Summary:**',
    `- identical: ${report.summary.identical}`,
    `- minor: ${report.summary.minor}`,
    `- changed: ${report.summary.changed}`,
  )

  if (report.summary.changed > 0 || report.summary.minor > 0) {
    lines.push('', 'Diff images are in `.visual-diff/diff/` (local only, gitignored).')
  }

  return `${lines.join('\n')}\n`
}

async function report(config) {
  const reportPath = path.join(ROOT, config.outputDir, 'report.json')
  if (!(await pathExists(reportPath))) {
    throw new Error('Missing report.json. Run: bun run visual-diff:compare')
  }

  const reportData = JSON.parse(await readFile(reportPath, 'utf8'))
  const markdown = renderMarkdownReport(reportData)
  const markdownPath = path.join(ROOT, config.outputDir, 'report.md')
  await Bun.write(markdownPath, markdown)

  console.log(markdown)
  console.log(`Saved markdown report -> ${path.relative(ROOT, markdownPath)}`)
}

async function installBrowsers() {
  const playwrightCli = path.join(ROOT, 'node_modules', 'playwright', 'cli.js')
  const proc = spawnSync(process.execPath, [playwrightCli, 'install', 'chromium'], {
    cwd: ROOT,
    stdio: 'inherit',
  })
  if (proc.status !== 0) process.exit(proc.status ?? 1)
}

function printHelp() {
  console.log(`Visual diff helper

Commands:
  capture <before|after>   Capture screenshots from built dist folders
  compare                  Compare before/after screenshots
  report                   Print PR-ready markdown from report.json
  install                  Install Playwright Chromium browser

Options:
  --config <path>          Config file (default: visual-diff.config.json)
  --suite <name>           Limit to one suite (web|docs)
  --routes <a,b,c>         Override routes for selected suite(s)
  --strict                 Exit 1 when compare finds changed/missing screenshots

Examples:
  bun run build && bun run visual-diff:capture:before
  bun run build && bun run visual-diff:capture:after
  bun run visual-diff:compare
  bun run visual-diff:report
  bun run visual-diff:capture:before -- --suite web --routes /,/pricing/
`)
}

const args = parseArgs(process.argv.slice(2))

if (!args.command || args.command === 'help' || args.command === '--help') {
  printHelp()
  process.exit(args.command ? 0 : 1)
}

const config = await loadConfig(args.configPath)

try {
  if (args.command === 'capture') {
    if (!args.label || !['before', 'after'].includes(args.label)) {
      console.error('Usage: bun run visual-diff:capture:before|after')
      process.exit(1)
    }
    await capture(args.label, config, args)
  } else if (args.command === 'compare') {
    const ok = await compare(config, args)
    process.exit(ok ? 0 : 1)
  } else if (args.command === 'report') {
    await report(config)
  } else if (args.command === 'install') {
    await installBrowsers()
  } else {
    printHelp()
    process.exit(1)
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
