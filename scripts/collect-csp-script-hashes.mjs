import { createHash } from 'node:crypto'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repoRoot = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const outputPath = path.resolve(repoRoot, 'apps/shared/security/csp-script-hashes.json')
const checkMode = process.argv.includes('--check') || !process.argv.includes('--write')
const suiteArgIndex = process.argv.indexOf('--suite')
const suiteFilter = suiteArgIndex === -1 ? null : process.argv[suiteArgIndex + 1]

const targets = [
  { key: 'web', distDir: path.resolve(repoRoot, 'apps/web/dist') },
  { key: 'docs', distDir: path.resolve(repoRoot, 'apps/docs/dist') },
].filter((target) => !suiteFilter || target.key === suiteFilter)

const nonExecutableScriptTypePattern = /type\s*=\s*["'](?:application\/(?:ld\+json|json)|importmap)["']/i

async function walkHtmlFiles(dir) {
  const files = []
  let entries

  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch (error) {
    if (error && typeof error === 'object' && error.code === 'ENOENT') return files
    throw error
  }

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkHtmlFiles(entryPath)))
      continue
    }
    if (entry.name.endsWith('.html')) files.push(entryPath)
  }

  return files
}

function collectHashesFromHtml(html) {
  const hashes = new Set()
  const pattern = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi
  let match = pattern.exec(html)

  while (match) {
    const openTag = match[0].slice(0, match[0].indexOf('>') + 1)
    if (/\bsrc\s*=/.test(openTag)) {
      match = pattern.exec(html)
      continue
    }
    if (nonExecutableScriptTypePattern.test(openTag)) {
      match = pattern.exec(html)
      continue
    }

    const body = match[1]
    if (!body.trim()) {
      match = pattern.exec(html)
      continue
    }

    const digest = createHash('sha256').update(body, 'utf8').digest('base64')
    hashes.add(`sha256-${digest}`)
    match = pattern.exec(html)
  }

  return hashes
}

async function collectTargetHashes(distDir) {
  const hashes = new Set()
  for (const filePath of await walkHtmlFiles(distDir)) {
    const html = await readFile(filePath, 'utf8')
    for (const hash of collectHashesFromHtml(html)) hashes.add(hash)
  }
  return [...hashes].sort((a, b) => a.localeCompare(b))
}

async function main() {
  const current = await readFile(outputPath, 'utf8').catch(() => null)
  const existing = current ? JSON.parse(current) : {}
  const next = { ...existing }

  for (const target of targets) {
    next[target.key] = await collectTargetHashes(target.distDir)
  }
  const normalized = `${JSON.stringify(next, null, 2)}\n`

  if (current === normalized) {
    if (checkMode) console.log('csp-script-hashes.json is up to date.')
    return
  }

  if (checkMode) {
    console.error('csp-script-hashes.json is out of date. Run `bun run security:csp-hashes:write` after building web and docs.')
    process.exitCode = 1
    return
  }

  await writeFile(outputPath, normalized, 'utf8')
  console.log(`Updated ${path.relative(repoRoot, outputPath)}`)
}

await main()
