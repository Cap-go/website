import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
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
  /["'`]\/([^"'`?#]+)["'`]/g,
]

function isWithinRoot(root: string, candidate: string): boolean {
  const candidatePath = resolve(candidate)
  const relativePath = relative(root, candidatePath)
  return relativePath === '' || (!relativePath.startsWith('..') && !isAbsolute(relativePath))
}

function walkFiles(rootDir: string): string[] {
  const stack = [rootDir]
  const discovered: string[] = []

  while (stack.length > 0) {
    const currentDir = stack.pop()
    if (!currentDir) continue

    for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
      const entryPath = join(currentDir, entry.name)
      if (entry.isDirectory()) stack.push(entryPath)
      else discovered.push(entryPath)
    }
  }

  return discovered
}

function resolveReferencedAsset(rawPath: string | undefined): string | null {
  const normalizedPath = rawPath?.trim().replace(/^\/+/, '')
  if (!normalizedPath || normalizedPath.endsWith('/')) return null

  const sourcePath = resolve(sourcePublicDir, normalizedPath)
  if (!isWithinRoot(sourcePublicDir, sourcePath)) return null
  if (!existsSync(sourcePath)) return null
  if (!statSync(sourcePath).isFile()) return null

  return normalizedPath
}

function addReferencedAssets(content: string, pattern: RegExp, referencedAssets: Set<string>) {
  for (const match of content.matchAll(pattern)) {
    const assetPath = resolveReferencedAsset(match[1])
    if (assetPath) referencedAssets.add(assetPath)
  }
}

function addMarkdownReferencedAssets(content: string, referencedAssets: Set<string>) {
  let searchIndex = 0

  while (searchIndex < content.length) {
    const referenceIndex = content.indexOf('](/', searchIndex)
    if (referenceIndex === -1) return

    const pathStart = referenceIndex + 3
    let pathEnd = pathStart
    while (pathEnd < content.length) {
      const char = content[pathEnd]
      if (char === ')' || char === '"' || char === '\'' || char === '#' || char === '?' || /\s/.test(char)) break
      pathEnd += 1
    }

    const assetPath = resolveReferencedAsset(content.slice(pathStart, pathEnd))
    if (assetPath) referencedAssets.add(assetPath)

    searchIndex = pathEnd > pathStart ? pathEnd : pathStart
  }
}

function collectReferencedAssets(scanPath: string, referencedAssets: Set<string>) {
  const content = readFileSync(scanPath, 'utf8')

  for (const pattern of referencePatterns) {
    addReferencedAssets(content, pattern, referencedAssets)
  }

  addMarkdownReferencedAssets(content, referencedAssets)
}

if (!existsSync(sourcePublicDir)) {
  throw new Error(`Docs asset sync expects ${sourcePublicDir} to exist.`)
}

if (lstatSync(sourcePublicDir).isSymbolicLink()) {
  throw new Error(`Expected ${sourcePublicDir} to be a real directory, not a symlink.`)
}

rmSync(targetPublicDir, { recursive: true, force: true })
mkdirSync(targetPublicDir, { recursive: true })

for (const [relativePath, content] of trackedFiles) {
  const outputPath = join(targetPublicDir, relativePath)
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, content, 'utf8')
}

const referencedAssets = new Set<string>()
const scanTargets = [resolve(docsDir, 'astro.config.mjs'), ...walkFiles(resolve(docsDir, 'src'))]

for (const scanTarget of scanTargets) {
  collectReferencedAssets(scanTarget, referencedAssets)
}

let copiedBytes = 0

for (const assetPath of [...referencedAssets].sort((left, right) => left.localeCompare(right))) {
  const sourcePath = resolve(sourcePublicDir, assetPath)
  if (!isWithinRoot(sourcePublicDir, sourcePath)) continue
  const outputPath = resolve(targetPublicDir, assetPath)
  if (!isWithinRoot(targetPublicDir, outputPath)) continue
  mkdirSync(dirname(outputPath), { recursive: true })
  copyFileSync(sourcePath, outputPath)
  copiedBytes += statSync(sourcePath).size
}

const copiedMegabytes = (copiedBytes / 1024 / 1024).toFixed(2)
console.log(`Synced ${referencedAssets.size} docs public assets (${copiedMegabytes} MB) from ${relative(docsDir, sourcePublicDir)}.`)
