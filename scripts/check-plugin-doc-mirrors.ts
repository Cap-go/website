import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const canonicalRootRelative = 'apps/docs/src/content/docs/docs/plugins'
const mirrorRootRelative = 'src/content/docs/docs/plugins'
const canonicalRoot = resolve(canonicalRootRelative)
const mirrorRoot = resolve(mirrorRootRelative)

function listPluginDirs(root: string): string[] {
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right))
}

function listFiles(root: string): string[] {
  const entries = readdirSync(root, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const entryPath = join(root, entry.name)
    if (entry.isDirectory()) {
      files.push(...listFiles(entryPath))
      continue
    }

    if (entry.isFile()) files.push(entryPath)
  }

  return files
}

function getChangedPluginDirs(): string[] {
  let mergeBase = ''

  for (const ref of ['origin/main', 'main']) {
    try {
      mergeBase = execFileSync('git', ['merge-base', ref, 'HEAD'], { encoding: 'utf8' }).trim()
      break
    } catch {
      continue
    }
  }

  if (!mergeBase) return []

  const diffOutput = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMR', `${mergeBase}...HEAD`, '--', canonicalRootRelative, mirrorRootRelative], {
    encoding: 'utf8',
  })

  return [
    ...new Set(
      diffOutput
        .split('\n')
        .map((filePath) => filePath.trim())
        .filter(Boolean)
        .map((filePath) => {
          if (filePath.startsWith(`${canonicalRootRelative}/`)) {
            return filePath.slice(canonicalRootRelative.length + 1).split('/')[0]
          }

          if (filePath.startsWith(`${mirrorRootRelative}/`)) {
            return filePath.slice(mirrorRootRelative.length + 1).split('/')[0]
          }

          return ''
        })
        .filter(Boolean),
    ),
  ]
}

if (!existsSync(canonicalRoot) || !existsSync(mirrorRoot)) {
  throw new Error('Plugin docs roots are missing; cannot verify mirrored docs parity.')
}

const canonicalPluginDirs = listPluginDirs(canonicalRoot)
const mirroredPluginDirs = listPluginDirs(mirrorRoot)
const canonicalPluginDirSet = new Set(canonicalPluginDirs)
const mirroredPluginDirSet = new Set(mirroredPluginDirs)
const changedPluginDirs = getChangedPluginDirs()
const sharedPluginDirs = canonicalPluginDirs.filter((pluginDir) => mirroredPluginDirSet.has(pluginDir))

const mismatches: string[] = []

for (const pluginDir of changedPluginDirs) {
  const hasCanonicalDir = canonicalPluginDirSet.has(pluginDir)
  const hasMirroredDir = mirroredPluginDirSet.has(pluginDir)

  if (hasCanonicalDir && !hasMirroredDir) {
    mismatches.push(`${pluginDir}: missing mirrored plugin directory`)
    continue
  }

  if (!hasCanonicalDir && hasMirroredDir) {
    mismatches.push(`${pluginDir}: missing canonical plugin directory`)
  }
}

for (const pluginDir of sharedPluginDirs) {
  const canonicalDir = join(canonicalRoot, pluginDir)
  const mirrorDir = join(mirrorRoot, pluginDir)
  const canonicalFiles = listFiles(canonicalDir)
  const mirrorFiles = listFiles(mirrorDir)
  const mirroredRelativeFiles = new Set(mirrorFiles.map((mirrorFile) => relative(mirrorDir, mirrorFile)))

  for (const canonicalFile of canonicalFiles) {
    const relativePath = relative(canonicalDir, canonicalFile)
    if (!mirroredRelativeFiles.has(relativePath)) {
      mismatches.push(`${pluginDir}/${relativePath}: missing mirrored file`)
    }
  }

  for (const mirrorFile of mirrorFiles) {
    const relativePath = relative(mirrorDir, mirrorFile)
    const canonicalFile = join(canonicalDir, relativePath)

    if (!existsSync(canonicalFile)) {
      mismatches.push(`${pluginDir}/${relativePath}: missing canonical file`)
      continue
    }

    if (!statSync(canonicalFile).isFile()) {
      mismatches.push(`${pluginDir}/${relativePath}: canonical path is not a file`)
      continue
    }

    const canonicalContent = readFileSync(canonicalFile, 'utf8')
    const mirrorContent = readFileSync(mirrorFile, 'utf8')

    if (canonicalContent !== mirrorContent) {
      mismatches.push(`${pluginDir}/${relativePath}: content differs`)
    }
  }
}

if (mismatches.length > 0) {
  console.error('Mirrored plugin docs are out of sync:')
  for (const mismatch of mismatches) console.error(`- ${mismatch}`)
  process.exit(1)
}

console.log(`Verified mirrored plugin docs parity for ${sharedPluginDirs.length} shared plugin directories.`)
