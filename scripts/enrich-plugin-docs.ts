import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  buildFallbackExample,
  parseMetadata,
  readDefinitions,
  registryPlugins,
  type MethodInfo,
  type PluginMetadata,
} from './sync-plugin-docs-from-definitions.ts'

const docsRoot = join(import.meta.dir, '..', 'apps/docs/src/content/docs/docs/plugins')
const args = process.argv.slice(2)
const allMissing = args.includes('--all-missing')
const gsOnly = args.includes('--getting-started-only')
const indexOnly = args.includes('--index-only')
const slugsArg = args.find((a) => a.startsWith('--slugs='))?.slice('--slugs='.length) ?? args[args.indexOf('--slugs') + 1]

const hasIndex = (slug: string) => {
  const c = readFileSync(join(docsRoot, slug, 'index.mdx'), 'utf8')
  return c.includes('## Platform support') || c.includes('## Supported platforms')
}
const hasGs = (slug: string) => {
  const p = join(docsRoot, slug, 'getting-started.mdx')
  if (!existsSync(p)) return true
  const c = readFileSync(p, 'utf8')
  return c.includes('## Common pitfalls') && /## Quick start[\s\S]*?```/.test(c)
}

const inferPlatforms = (m: PluginMetadata, def: string) => {
  const lower = def.toLowerCase()
  const hasWeb = lower.includes("'web'") || lower.includes('"web"') || /@platform[^\n]*web/i.test(def)
  if (m.packageName.includes('electron')) {
    return '| Platform | Support | Notes |\n| --- | --- | --- |\n| Windows | Yes | Electron |\n| macOS | Yes | Electron |\n| Linux | Yes | Electron |\n| iOS / Android | No | Use capacitor-updater |'
  }
  if (hasWeb) {
    return '| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Native |\n| Android | Yes | Native |\n| Web | Partial | See getting started |'
  }
  return '| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Native |\n| Android | Yes | Native |\n| Web | No | Guard with Capacitor.getPlatform() |'
}

const overview = (m: PluginMetadata) => {
  const lead = m.plugin.description.length > 40 && !m.plugin.description.startsWith('Capacitor plugin') ? m.plugin.description : m.pluginSummary.replace(/\.$/, '')
  const tail = m.featureMethods[0] ? `Start with \`${m.featureMethods[0].displayName}()\` and the other core methods listed below.` : 'See getting started for install steps and examples.'
  return `${lead}\n\n${tail}`
}

const pitfalls = (m: PluginMetadata) => {
  const n = new Set(m.methods.map((x) => x.name))
  const b: string[] = []
  if (n.has('requestPermissions') || n.has('checkPermissions')) b.push('**Permissions**: call `checkPermissions()` then `requestPermissions()` when needed.')
  if (n.has('addListener')) b.push('**Listeners**: remove handles when screens unmount.')
  if (n.has('initialize') || n.has('configure')) b.push('**Initialize once**: run setup during app bootstrap.')
  if (b.length < 2) b.push('**Native sync**: run `bunx cap sync` after plugin upgrades.')
  if (b.length < 3) b.push('**Source of truth**: trust `src/definitions.ts` in the GitHub repo.')
  return `## Common pitfalls\n\n${b.slice(0, 3).map((x) => `- ${x}`).join('\n')}\n`
}

const examples = (m: PluginMetadata) => {
  const pool = m.featureMethods.filter((x) => x.example).length ? m.featureMethods.filter((x) => x.example) : m.featureMethods
  const pick: MethodInfo[] = []
  for (const method of pool) {
    if (pick.length >= 3) break
    if (!pick.some((p) => p.displayName === method.displayName)) pick.push(method)
  }
  return pick
}

const gsBlock = (m: PluginMetadata) => {
  const pick = examples(m)
  if (!pick.length) return ''
  let out = `## Quick start\n\n${pick[0].example ?? buildFallbackExample(m, pick[0])}\n`
  for (const method of pick.slice(1, 3)) {
    out += `\n## Example: ${method.displayName}\n\n${method.example ?? buildFallbackExample(m, method)}\n`
  }
  return `${out}\n${pitfalls(m)}`
}

const patchIndex = (m: PluginMetadata, def: string, content: string) => {
  if (content.includes('## Platform support')) return content
  const plat = `## Platform support\n\n${inferPlatforms(m, def)}\n\n`
  const ov = overview(m)
  content = content.replace(/tagline: [^\n]+/, `tagline: ${JSON.stringify(ov.split('\n\n')[0].slice(0, 160))}`)
  if (/## Overview\n\n[\s\S]*?\n\n## /.test(content)) return content.replace(/## Overview\n\n[\s\S]*?\n\n## /, `## Overview\n\n${ov}\n\n${plat}## `)
  if (content.includes('## Overview\n\n')) return content.replace(/## Overview\n\n/, `## Overview\n\n${ov}\n\n${plat}`)
  if (content.includes('</CardGrid>')) return content.replace('</CardGrid>\n\n', `</CardGrid>\n\n${plat}`)
  return content
}

const patchGs = (slug: string, m: PluginMetadata, content: string) => {
  content = content.replace(/npm install (@capgo\/[^\n`]+)/g, 'bun add $1').replace(/npx cap sync/g, 'bunx cap sync').replace(/npx skills add/g, 'bunx skills add')
  if (hasGs(slug)) return content
  const block = gsBlock(m)
  if (!block) return content
  for (const re of [/## Import\n\n```typescript\n[\s\S]*?```\n/, /## Installation[\s\S]*?<\/Steps>\n/, /## Install\n\n[\s\S]*?(?=\n## )/]) {
    const match = content.match(re)
    if (match) {
      const end = match.index! + match[0].length
      return `${content.slice(0, end)}\n${block}${content.slice(end)}`
    }
  }
  for (const re of [/^## API Overview/m, /^## Capacitor Safe Areas/m, /^### `/m]) {
    if (re.test(content)) return content.replace(re, `${block}$&`)
  }
  console.error('no gs insert', slug)
  return content
}

const slugs = allMissing
  ? registryPlugins.map((p) => p.docsSlug).filter((slug) => existsSync(join(docsRoot, slug, 'index.mdx')) && (indexOnly ? !hasIndex(slug) : gsOnly ? !hasGs(slug) : !hasIndex(slug) || !hasGs(slug)))
  : (slugsArg ?? '').split(',').map((s) => s.trim()).filter(Boolean)

const bySlug = new Map(registryPlugins.map((p) => [p.docsSlug, p]))
for (const slug of slugs) {
  const plugin = bySlug.get(slug)
  if (!plugin) continue
  const meta = await parseMetadata(plugin)
  if (!meta) {
    console.error('metadata failed', slug)
    continue
  }
  const def = (await readDefinitions(plugin)) ?? ''
  if (!indexOnly && !gsOnly && !hasIndex(slug)) writeFileSync(join(docsRoot, slug, 'index.mdx'), patchIndex(meta, def, readFileSync(join(docsRoot, slug, 'index.mdx'), 'utf8')))
  if (indexOnly && !hasIndex(slug)) writeFileSync(join(docsRoot, slug, 'index.mdx'), patchIndex(meta, def, readFileSync(join(docsRoot, slug, 'index.mdx'), 'utf8')))
  const gsPath = join(docsRoot, slug, 'getting-started.mdx')
  if (!indexOnly && existsSync(gsPath)) writeFileSync(gsPath, patchGs(slug, meta, readFileSync(gsPath, 'utf8')))
  console.error('ok', slug)
}
