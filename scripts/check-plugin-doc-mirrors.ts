import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const canonicalRoot = resolve('apps/docs/src/content/docs/docs/plugins')
const mirrorRoot = resolve('src/content/docs/docs/plugins')

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

if (!existsSync(canonicalRoot) || !existsSync(mirrorRoot)) {
  throw new Error('Plugin docs roots are missing; cannot verify mirrored docs parity.')
}

const mirroredPluginDirs = readdirSync(mirrorRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(canonicalRoot, entry.name)))
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right))

const mismatches: string[] = []

for (const pluginDir of mirroredPluginDirs) {
  const canonicalDir = join(canonicalRoot, pluginDir)
  const mirrorDir = join(mirrorRoot, pluginDir)

  for (const mirrorFile of listFiles(mirrorDir)) {
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

console.log(`Verified mirrored plugin docs parity for ${mirroredPluginDirs.length} plugin directories.`)
