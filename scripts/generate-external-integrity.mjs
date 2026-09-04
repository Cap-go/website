import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repoRoot = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const registryPath = path.resolve(repoRoot, 'apps/shared/security/external-assets.json')
const writeMode = process.argv.includes('--write')
const checkMode = process.argv.includes('--check') || !writeMode

function computeSriSha384(bytes) {
  const digest = createHash('sha384').update(bytes).digest('base64')
  return `sha384-${digest}`
}

async function fetchAssetBytes(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'capgo-website-integrity-check/1.0',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`)
  }

  return Buffer.from(await response.arrayBuffer())
}

async function main() {
  const registry = JSON.parse(await readFile(registryPath, 'utf8'))
  const mismatches = []
  let updated = false

  if (!Array.isArray(registry.assets)) {
    console.error('Invalid external asset registry: "assets" must be an array.')
    process.exitCode = 1
    return
  }

  for (const asset of registry.assets) {
    if (!asset?.id || !asset?.url) {
      console.error('Each asset entry must include "id" and "url".')
      process.exitCode = 1
      continue
    }

    const bytes = await fetchAssetBytes(asset.url)
    const actualIntegrity = computeSriSha384(bytes)

    if (asset.integrity !== actualIntegrity) {
      mismatches.push({
        id: asset.id,
        url: asset.url,
        expected: asset.integrity ?? '(missing)',
        actual: actualIntegrity,
      })

      if (writeMode) {
        asset.integrity = actualIntegrity
        updated = true
      }
    }
  }

  if (writeMode && updated) {
    await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`, 'utf8')
    console.log(`Updated integrity hashes in ${path.relative(repoRoot, registryPath)}`)
    return
  }

  if (mismatches.length === 0) {
    if (checkMode) {
      console.log('External asset integrity hashes are up to date.')
    }
    return
  }

  for (const mismatch of mismatches) {
    console.error(
      `Integrity mismatch for ${mismatch.id} (${mismatch.url}): expected ${mismatch.expected}, got ${mismatch.actual}`,
    )
  }

  if (checkMode) {
    console.error('Run `bun run security:integrity:write` to refresh hashes after verifying CDN changes.')
  }

  process.exitCode = 1
}

await main()
