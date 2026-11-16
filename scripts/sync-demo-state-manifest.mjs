import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const { tailwindCapacitorDemoStateManifest } = await import(
  '../apps/web/src/components/tailwind-capacitor-demo/tailwindCapacitorDemoGallery.ts'
)

const manifest = tailwindCapacitorDemoStateManifest()
const outPath = join(repoRoot, 'apps/web/src/components/tailwind-capacitor-demo/state-manifest.json')
await writeFile(outPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Wrote ${outPath}`)