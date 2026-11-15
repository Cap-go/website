import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
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
const manifestPath = join(snapshotRoot, 'registry-manifest.json')

function migrateBackdropOpacityInClasses() {
  const classesDir = join(snapshotRoot, 'capacitor/shared/classes')
  if (!existsSync(classesDir)) return
  for (const name of readdirSync(classesDir)) {
    if (!name.endsWith('.js')) continue
    const classPath = join(classesDir, name)
    const source = readFileSync(classPath, 'utf8')
    const migrated = source.replaceAll('bg-black bg-opacity-50', 'bg-black/50')
    if (migrated !== source) writeFileSync(classPath, migrated)
  }
}

function patchSheetClassesForV4Demo() {
  const sheetPath = join(snapshotRoot, 'capacitor/shared/classes/SheetClasses.js')
  if (!existsSync(sheetPath)) return
  let source = readFileSync(sheetPath, 'utf8')
  let next = source.replace(
    "'left-0 top-full transition-transform duration-400 z-40 overflow-hidden'",
    "'left-0 top-full w-full transition-transform duration-400 z-40 overflow-hidden'",
  )
  next = next.replace(
    /ios: '',\s*material: `rounded-t-2xl ease-material-in \$\{colors\.bgIos\}`,\s*opened: `-translate-y-full \$\{colors\.bgMaterial\}`,/,
    'ios: colors.bgIos,\n      material: `rounded-t-2xl ease-material-in ${colors.bgMaterial}`,\n      opened: `-translate-y-full`,',
  )
  if (next !== source) writeFileSync(sheetPath, next)
}

if (
  !process.env.TC_REGISTRY_FORCE_SYNC &&
  existsSync(manifestPath) &&
  existsSync(join(snapshotRoot, 'capacitor/index.js'))
) {
  try {
    const existing = JSON.parse(readFileSync(manifestPath, 'utf8'))
    if (existing.commit === commit) {
      migrateBackdropOpacityInClasses()
      patchSheetClassesForV4Demo()
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
      clearTimeout(timer)
      if (res.ok) return res
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

const registryRes = await fetchWithRetry(registryJsonUrl)
const registry = await registryRes.json()

function targetToSnapshotPath(target) {
  if (target.startsWith('src/capacitor/')) return join(snapshotRoot, target.replace('src/capacitor/', 'capacitor/'))
  if (target.startsWith('registry/capacitor/')) return join(snapshotRoot, target.replace('registry/capacitor/', 'capacitor/'))
  return join(snapshotRoot, 'capacitor', target)
}

function assertInsideSnapshot(outPath) {
  const resolved = resolve(outPath)
  const rel = relative(snapshotRoot, resolved)
  if (rel.startsWith('..') || resolve(snapshotRoot, rel) !== resolved) {
    throw new Error(`Refusing to write outside snapshot root: ${resolved}`)
  }
}

async function fetchItem(name) {
  const res = await fetchWithRetry(`${itemBaseUrl}/${name}.json`)
  return res.json()
}

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
      const outPath = targetToSnapshotPath(target)
      assertInsideSnapshot(outPath)
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, content)
      writtenFiles.add(outPath)
    }
  }),
)

const componentsDir = join(snapshotRoot, 'capacitor/vue/components')
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

writeFileSync(join(snapshotRoot, 'capacitor/index.js'), `${barrelLines.join('\n')}\n`)

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

writeFileSync(
  join(snapshotRoot, 'registry-manifest.json'),
  JSON.stringify(
    {
      commit,
      syncedAt: new Date().toISOString(),
      itemCount: registry.items.length,
      vueComponentCount: componentNames.length,
      items: manifestItems,
    },
    null,
    2,
  ),
)

writeFileSync(
  join(snapshotRoot, 'README.md'),
  `Generated by \`bun run sync:tailwind-capacitor-registry\` from Cap-go/tailwind-capacitor @ \`${commit}\`.\nDo not edit by hand.\n`,
)

migrateBackdropOpacityInClasses()
patchSheetClassesForV4Demo()

console.log(`Synced ${writtenFiles.size} files from tailwind-capacitor @ ${commit}`)