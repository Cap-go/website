import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const canonicalRoot = resolve('apps/docs/src/content/docs/docs/plugins')
const mirrorRoot = resolve('src/content/docs/docs/plugins')
// These plugin docs intentionally exist in both docs trees and must stay byte-for-byte aligned.
const mirroredPluginDirs = ['contentsquare', 'live-activities', 'twilio-video', 'widget-kit'] as const

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

const mismatches: string[] = []

for (const pluginDir of mirroredPluginDirs) {
  const canonicalDir = join(canonicalRoot, pluginDir)
  const mirrorDir = join(mirrorRoot, pluginDir)
  const hasCanonicalDir = existsSync(canonicalDir)
  const hasMirroredDir = existsSync(mirrorDir)

  if (hasCanonicalDir && !hasMirroredDir) {
    mismatches.push(`${pluginDir}: missing mirrored plugin directory`)
    continue
  }

  if (!hasCanonicalDir && hasMirroredDir) {
    mismatches.push(`${pluginDir}: missing canonical plugin directory`)
    continue
  }

  if (!hasCanonicalDir && !hasMirroredDir) {
    mismatches.push(`${pluginDir}: tracked plugin directory is missing from both docs trees`)
    continue
  }

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

console.log(`Verified mirrored plugin docs parity for ${mirroredPluginDirs.length} tracked plugin directories.`)
