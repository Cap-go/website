import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourcePublicDir = resolve(docsDir, '../web/public')
const targetPublicDir = resolve(docsDir, 'public')
const trackedFiles = new Map([
  ['.gitignore', '*\n!.gitignore\n'],
])

const referencePatterns = [
  /~public\/([^'"`\s)]+)/g,
  /(?:src|href)=["']\/([^"'?#]+)["']/g,
  /url\(["']?\/([^)"'?#]+)["']?\)/g,
  /!\[[^\]]*]\(\/([^)"'#?]+)(?:[?#][^)]*)?\)/g,
  /\[[^\]]*]\(\/([^)"'#?]+)(?:[?#][^)]*)?\)/g,
  /["'`]\/([^"'`?#]+)["'`]/g,
]

function walkFiles(rootDir: string): string[] {
  const stack = [rootDir]
  const discovered: string[] = []

  while (stack.length > 0) {
    const currentDir = stack.pop()!
    for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
      const entryPath = join(currentDir, entry.name)
      if (entry.isDirectory()) stack.push(entryPath)
      else discovered.push(entryPath)
    }
  }

  return discovered
}

function collectReferencedAssets(scanPath: string, referencedAssets: Set<string>) {
  const content = readFileSync(scanPath, 'utf8')

  for (const pattern of referencePatterns) {
    for (const match of content.matchAll(pattern)) {
      const rawPath = match[1]?.trim()
      if (!rawPath) continue

      const normalizedPath = rawPath.replace(/^\/+/, '')
      if (!normalizedPath || normalizedPath.endsWith('/')) continue

      const sourcePath = resolve(sourcePublicDir, normalizedPath)
      if (!existsSync(sourcePath)) continue
      if (!statSync(sourcePath).isFile()) continue

      referencedAssets.add(normalizedPath)
    }
  }
}

rmSync(targetPublicDir, { recursive: true, force: true })
mkdirSync(targetPublicDir, { recursive: true })

for (const [relativePath, content] of trackedFiles) {
  const outputPath = join(targetPublicDir, relativePath)
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, content, 'utf8')
}

if (!existsSync(sourcePublicDir)) {
  throw new Error(`Docs asset sync expects ${sourcePublicDir} to exist.`)
}

if (existsSync(sourcePublicDir) && lstatSync(sourcePublicDir).isSymbolicLink()) {
  throw new Error(`Expected ${sourcePublicDir} to be a real directory, not a symlink.`)
}

const referencedAssets = new Set<string>()
const scanTargets = [resolve(docsDir, 'astro.config.mjs'), ...walkFiles(resolve(docsDir, 'src'))]

for (const scanTarget of scanTargets) {
  collectReferencedAssets(scanTarget, referencedAssets)
}

let copiedBytes = 0

for (const assetPath of [...referencedAssets].sort((left, right) => left.localeCompare(right))) {
  const sourcePath = resolve(sourcePublicDir, assetPath)
  const outputPath = resolve(targetPublicDir, assetPath)
  mkdirSync(dirname(outputPath), { recursive: true })
  copyFileSync(sourcePath, outputPath)
  copiedBytes += statSync(sourcePath).size
}

const copiedMegabytes = (copiedBytes / 1024 / 1024).toFixed(2)
console.log(`Synced ${referencedAssets.size} docs public assets (${copiedMegabytes} MB) from ${relative(docsDir, sourcePublicDir)}.`)
