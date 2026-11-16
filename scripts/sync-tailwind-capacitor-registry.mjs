import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const pinPath = join(repoRoot, 'apps/shared/config/tailwindCapacitorRegistry.ts')
const pinSource = readFileSync(pinPath, 'utf8')
const commitMatch = pinSource.match(/TAILWIND_CAPACITOR_REGISTRY_COMMIT = '([0-9a-f]{40})'/)
if (!commitMatch) {
  console.error('Could not read TAILWIND_CAPACITOR_REGISTRY_COMMIT from tailwindCapacitorRegistry.ts')
  process.exit(1)
}
const commit = commitMatch[1]

const snapshotRoot = resolve(repoRoot, 'apps/web/src/tailwind-capacitor-snapshot')
const stagingRoot = join(snapshotRoot, '.registry-sync-staging')
const manifestPath = join(snapshotRoot, 'registry-manifest.json')

if (
  !process.env.TC_REGISTRY_FORCE_SYNC &&
  existsSync(manifestPath) &&
  existsSync(join(snapshotRoot, 'capacitor/index.js'))
) {
  try {
    const existing = JSON.parse(readFileSync(manifestPath, 'utf8'))
    if (existing.commit === commit) {
      console.log('tailwind-capacitor snapshot already at pinned commit; skip sync')
      process.exit(0)
    }
  } catch {
    // stale or corrupt manifest, continue with full sync
  }
}
const registryJsonUrl = `https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/${commit}/registry.json`
const itemBaseUrl = `https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/${commit}/public/r`

const FETCH_TIMEOUT_MS = 30_000
const FETCH_RETRIES = 4

async function fetchWithRetry(url) {
  let lastError
  for (let attempt = 1; attempt <= FETCH_RETRIES; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    try {
      const res = await fetch(url, { signal: controller.signal })
      if (res.ok) {
        const data = await res.json()
        clearTimeout(timer)
        return data
      }
      clearTimeout(timer)
      lastError = new Error(`HTTP ${res.status} for ${url}`)
    } catch (error) {
      clearTimeout(timer)
      lastError = error
    }
    if (attempt < FETCH_RETRIES) {
      await new Promise((r) => setTimeout(r, 500 * 2 ** (attempt - 1)))
    }
  }
  throw lastError
}

const registry = await fetchWithRetry(registryJsonUrl)

function targetToStagingPath(target) {
  if (target.startsWith('src/capacitor/')) return join(stagingRoot, target.replace('src/capacitor/', 'capacitor/'))
  if (target.startsWith('registry/capacitor/')) return join(stagingRoot, target.replace('registry/capacitor/', 'capacitor/'))
  return join(stagingRoot, 'capacitor', target)
}

function assertInsideStaging(outPath) {
  const resolved = resolve(outPath)
  const rel = relative(stagingRoot, resolved)
  if (rel.startsWith('..') || resolve(stagingRoot, rel) !== resolved) {
    throw new Error(`Refusing to write outside staging root: ${resolved}`)
  }
}

async function fetchItem(name) {
  return fetchWithRetry(`${itemBaseUrl}/${name}.json`)
}

rmSync(stagingRoot, { recursive: true, force: true })
mkdirSync(stagingRoot, { recursive: true })

const writtenFiles = new Set()

await Promise.all(
  registry.items.map(async (entry) => {
    const item = await fetchItem(entry.name)
    for (const file of item.files ?? []) {
      const content = file.content
      if (typeof content !== 'string') {
        console.warn('Skip registry item with missing inline content')
        continue
      }
      const target = file.target ?? file.path
      const outPath = targetToStagingPath(target)
      assertInsideStaging(outPath)
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, content)
      writtenFiles.add(outPath)
    }
  }),
)

const componentsDir = join(stagingRoot, 'capacitor/vue/components')
const componentNames = readdirSync(componentsDir)
  .filter((name) => name.endsWith('.vue'))
  .map((name) => name.replace(/\.vue$/, ''))
  .sort()

const barrelLines = [
  "import tcProvider from './vue/shared/TailwindCapacitorProvider.vue'",
  "export { tcProvider as TailwindCapacitorProvider, tcProvider as Provider }",
  '',
]

for (const name of componentNames) {
  const cName = `c${name}`
  barrelLines.push(
    `import ${cName} from './vue/components/${name}.vue'`,
    `export { ${cName} as ${name} }`,
  )
}

const stagingBarrel = join(stagingRoot, 'capacitor/index.js')
writeFileSync(stagingBarrel, `${barrelLines.join('\n')}\n`)
writtenFiles.add(stagingBarrel)

const manifestItems = registry.items.map((item) => {
  const vueFile = (item.files ?? []).find((f) => (f.target ?? f.path)?.includes('/vue/components/'))
  const component =
    vueFile?.path?.match(/\/([^/]+)\.vue$/)?.[1] ??
    item.name
      .replace(/^capacitor-/, '')
      .replaceAll(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
      .replaceAll('-', '')
  return {
    name: item.name,
    title: item.title ?? item.name,
    description: item.description ?? '',
    component,
    hasVue: Boolean(vueFile),
  }
})

const manifestPayload = JSON.stringify(
  {
    commit,
    syncedAt: new Date().toISOString(),
    itemCount: registry.items.length,
    vueComponentCount: componentNames.length,
    items: manifestItems,
  },
  null,
  2,
)
const stagingManifest = join(stagingRoot, 'registry-manifest.json')
writeFileSync(stagingManifest, manifestPayload)
writtenFiles.add(stagingManifest)

const stagingReadme = join(stagingRoot, 'README.md')
writeFileSync(
  stagingReadme,
  `Generated by \`bun run sync:tailwind-capacitor-registry\` from Cap-go/tailwind-capacitor @ \`${commit}\`.\nDo not edit by hand.\n`,
)
writtenFiles.add(stagingReadme)

for (const stagedPath of writtenFiles) {
  const rel = relative(stagingRoot, stagedPath)
  const dest = join(snapshotRoot, rel)
  mkdirSync(dirname(dest), { recursive: true })
  copyFileSync(stagedPath, dest)
}

rmSync(stagingRoot, { recursive: true, force: true })

console.log(`Synced ${writtenFiles.size} files from tailwind-capacitor @ ${commit}`)