import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import ts from 'typescript'

type RegistryPlugin = {
  name: string
  title: string
  description: string
  href: string
  owner: string
  repo: string
  repoPath: string
  repoName: string
  packageSegment: string
  tutorialSlug: string
  docsSlug: string
  docsWanted: boolean
  docsIsComplex: boolean
}

type DocInfo = {
  text: string
  summary: string
  examples: string[]
}

type ExportedType = {
  name: string
  kind: 'interface' | 'type' | 'enum'
  info: DocInfo
  text: string
  node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration | ts.EnumDeclaration
}

type MethodInfo = {
  name: string
  displayName: string
  signature: string
  summary: string
  description: string
  example?: string
  source: ts.MethodSignature | ts.CallSignatureDeclaration
}

type PluginMetadata = {
  plugin: RegistryPlugin
  packageName: string
  packageDescription: string
  importName: string
  pluginSummary: string
  methods: MethodInfo[]
  featureMethods: MethodInfo[]
  referencedTypes: ExportedType[]
  iconSlug?: string
}

const registryPath = resolve('apps/web/src/config/plugins.ts')
const docsRoot = resolve('apps/docs/src/content/docs/docs/plugins')
const mirrorRoot = resolve('src/content/docs/docs/plugins')
const tutorialRoot = resolve('apps/web/src/content/plugins-tutorials/en')
const sidebarPath = resolve('apps/docs/src/config/sidebar.mjs')
const webIconsRoot = resolve('apps/web/public/icons/plugins')
const mirroredDocSlugs = new Set(['contentsquare', 'live-activities', 'twilio-video', 'widget-kit'])
const apiBase = 'https://api.github.com'
const githubToken = execFileSync('gh', ['auth', 'token'], { encoding: 'utf8' }).trim()
const builtinTypeNames = new Set([
  'Array',
  'Blob',
  'Boolean',
  'Date',
  'Error',
  'File',
  'Map',
  'Partial',
  'Pick',
  'Promise',
  'ReadonlyArray',
  'Record',
  'Set',
  'String',
  'Uint8Array',
  'Omit',
  'Exclude',
  'Extract',
  'NonNullable',
  'PluginListenerHandle',
])
const lifecycleMethods = new Set(['addListener', 'removeAllListeners', 'getPluginVersion'])

const normalizeWhitespace = (value: string) => value.replaceAll(/\s+/g, ' ').trim()

const sentenceCase = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  return trimmed.endsWith('.') ? trimmed : `${trimmed}.`
}

const firstParagraph = (value: string) =>
  value
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .find(Boolean) ?? ''

const serializeJsDocComment = (comment: ts.JSDoc['comment'] | ts.JSDocTag['comment'] | undefined): string => {
  if (!comment) return ''
  if (typeof comment === 'string') return comment

  return comment
    .map((part) => {
      if (typeof part === 'string') return part
      if ('text' in part && typeof part.text === 'string') return part.text
      return part.getText()
    })
    .join('')
}

const getDocInfo = (node: ts.Node): DocInfo => {
  const jsDocs = 'jsDoc' in node && Array.isArray(node.jsDoc) ? node.jsDoc : []
  const textParts: string[] = []
  const examples: string[] = []

  for (const doc of jsDocs) {
    const commentText = serializeJsDocComment(doc.comment).trim()
    if (commentText) textParts.push(commentText)

    for (const tag of doc.tags ?? []) {
      if (tag.tagName.getText() !== 'example') continue
      const exampleText = serializeJsDocComment(tag.comment).trim()
      if (exampleText) examples.push(exampleText)
    }
  }

  const text = textParts.join('\n\n').trim()
  const summary = sentenceCase(normalizeWhitespace(firstParagraph(text)))
  return { text, summary, examples }
}

const isExported = (node: ts.Node) => Boolean(node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword))

const parseRegistryRows = () => {
  const source = readFileSync(registryPath, 'utf8')
  const match = source.match(/String\.raw`([\s\S]*?)`\s*\.trim\(\)/)
  if (!match) throw new Error(`Unable to parse plugin registry from ${registryPath}`)

  return match[1]
    .trim()
    .split('\n')
    .map((row) => {
      const [name, author, description, href, title] = row.split('|')
      if (!name || !href || !title) throw new Error(`Invalid plugin registry row: ${row}`)
      return { name, author, description, href, title }
    })
}

const addCandidate = (values: string[], nextValue?: string) => {
  if (nextValue && !values.includes(nextValue)) values.push(nextValue)
}

const addNormalizedCandidates = (values: string[], input: string) => {
  addCandidate(values, input)

  if (input.startsWith('capacitor-')) {
    const withoutPrefix = input.slice('capacitor-'.length)
    addCandidate(values, withoutPrefix)
    if (withoutPrefix.startsWith('android-')) addCandidate(values, withoutPrefix.slice('android-'.length))
  }

  if (input.endsWith('-plugin')) addCandidate(values, input.slice(0, -'-plugin'.length))
  if (input.startsWith('capacitor-') && input.endsWith('-plugin')) addCandidate(values, input.slice('capacitor-'.length, -'-plugin'.length))
}

const getDocsSlugCandidates = (name: string, href: string) => {
  const values: string[] = []
  const packageSegment = name.includes('/') ? name.split('/')[1] : name

  if (packageSegment.startsWith('capacitor-plus')) addCandidate(values, 'capacitor-plus')
  if (packageSegment) addNormalizedCandidates(values, packageSegment)

  const normalizedHref = href.replace(/\/$/, '')
  const repoHref = normalizedHref.includes('/tree/') ? normalizedHref.slice(0, normalizedHref.indexOf('/tree/')) : normalizedHref
  const repoName = repoHref.slice(repoHref.lastIndexOf('/') + 1)
  if (repoName) addNormalizedCandidates(values, repoName)

  return values
}

const parseGitHubHref = (href: string) => {
  const url = new URL(href)
  const parts = url.pathname.split('/').filter(Boolean)
  if (parts.length < 2) throw new Error(`Invalid GitHub URL: ${href}`)

  const [owner, repo, ...rest] = parts
  const tutorialSlug = rest.length > 0 ? (rest.at(-1) ?? repo) : repo
  const repoPath = rest[0] === 'tree' ? rest.slice(2).join('/') : ''
  return { owner, repo, repoPath, tutorialSlug }
}

const listFiles = (root: string): string[] => {
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

const docDirectories = readdirSync(docsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
const existingDocs = new Set(docDirectories)
const complexDocs = new Set(
  docDirectories.filter((dir) => {
    const files = listFiles(join(docsRoot, dir))
      .map((file) => relative(join(docsRoot, dir), file).replaceAll('\\', '/'))
      .sort((left, right) => left.localeCompare(right))
    return files.join('|') !== 'getting-started.mdx|index.mdx'
  }),
)

const chooseFallbackDocsSlug = (candidates: string[]) => candidates.find((candidate) => !candidate.startsWith('capacitor-')) ?? candidates[0]

const registryPlugins: RegistryPlugin[] = parseRegistryRows().map((row) => {
  const { owner, repo, repoPath, tutorialSlug } = parseGitHubHref(row.href)
  const docsCandidates = getDocsSlugCandidates(row.name, row.href)
  const docsSlug = docsCandidates.find((candidate) => existingDocs.has(candidate)) ?? chooseFallbackDocsSlug(docsCandidates)
  const packageSegment = row.name.includes('/') ? row.name.split('/')[1] : row.name
  const docsWanted = owner.toLowerCase() === 'cap-go' || row.name.startsWith('@capgo/') || row.name.startsWith('@capacitor-plus/')

  return {
    name: row.name,
    title: row.title,
    description: row.description,
    href: row.href,
    owner,
    repo,
    repoPath,
    repoName: repo,
    packageSegment,
    tutorialSlug,
    docsSlug,
    docsWanted,
    docsIsComplex: complexDocs.has(docsSlug),
  }
})

const fetchCache = new Map<string, Promise<string | null>>()

const getRepoPathVariants = (repoPath: string) => {
  const variants = [repoPath]
  if (!repoPath) return variants

  const parts = repoPath.split('/').filter(Boolean)
  if (parts.length === 0) return variants

  const last = parts[parts.length - 1]
  const collapsed = last.replaceAll('-', '')
  if (collapsed !== last) {
    const nextParts = [...parts.slice(0, -1), collapsed]
    variants.push(nextParts.join('/'))
  }

  return [...new Set(variants)]
}

const fetchGitHubFile = async (plugin: RegistryPlugin, relativePath: string): Promise<string | null> => {
  const basePaths = getRepoPathVariants(plugin.repoPath)
  const cacheKey = `${plugin.owner}/${plugin.repo}:${basePaths.join('|')}:${relativePath}`
  const cached = fetchCache.get(cacheKey)
  if (cached !== undefined) return cached

  const request = (async () => {
    for (const basePath of basePaths) {
      const fullPath = basePath ? `${basePath}/${relativePath}` : relativePath
      const encodedPath = fullPath
        .split('/')
        .filter(Boolean)
        .map((segment) => encodeURIComponent(segment))
        .join('/')
      const url = `${apiBase}/repos/${plugin.owner}/${plugin.repo}/contents/${encodedPath}`
      const response = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${githubToken}`,
          'User-Agent': 'capgo-plugin-doc-sync',
        },
      })

      if (response.status === 404) continue
      if (!response.ok) {
        throw new Error(`GitHub API failed for ${plugin.owner}/${plugin.repo}/${fullPath}: ${response.status} ${response.statusText}`)
      }

      const data = (await response.json()) as { content?: string; encoding?: string; type?: string }
      if (data.type !== 'file' || !data.content || data.encoding !== 'base64') return null
      return Buffer.from(data.content, 'base64').toString('utf8')
    }

    return null
  })()

  fetchCache.set(cacheKey, request)
  return request
}

const readDefinitions = async (plugin: RegistryPlugin) => {
  const direct = await fetchGitHubFile(plugin, 'src/definitions.ts')
  if (direct) return direct

  const singular = await fetchGitHubFile(plugin, 'src/definition.ts')
  if (singular) return singular

  return null
}

const getImportName = (indexSource: string, interfaceName?: string) => {
  const match = /const\s+(\w+)\s*=\s*registerPlugin/.exec(indexSource)
  if (match?.[1]) return match[1]
  if (!interfaceName) return 'Plugin'
  return interfaceName.replace(/Plugin$/, '')
}

const collectTypeNames = (node: ts.Node, values: Set<string>) => {
  ts.forEachChild(node, (child) => {
    if (ts.isTypeReferenceNode(child)) {
      const typeName = child.typeName.getText()
      if (!builtinTypeNames.has(typeName)) values.add(typeName)
    }
    collectTypeNames(child, values)
  })
}

const cleanExample = (value: string, importName: string, packageName: string) => {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (trimmed.includes('import ') || trimmed.includes(`from '${packageName}'`) || trimmed.includes(`from "${packageName}"`)) return trimmed

  if (trimmed.startsWith('```')) {
    return [`\`\`\`typescript`, `import { ${importName} } from '${packageName}';`, '', trimmed.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/, ''), '```'].join('\n').trim()
  }

  return ['```typescript', `import { ${importName} } from '${packageName}';`, '', trimmed, '```'].join('\n')
}

const getMethodInfo = (method: ts.MethodSignature | ts.CallSignatureDeclaration, sourceFile: ts.SourceFile, importName: string, packageName: string): MethodInfo => {
  const doc = getDocInfo(method)
  const name = 'name' in method && method.name ? method.name.getText(sourceFile) : 'call'
  const signature = method.getText(sourceFile).replace(/;$/, '').trim()
  const example = doc.examples.map((item) => cleanExample(item, importName, packageName)).find(Boolean)
  return {
    name,
    displayName: name,
    signature,
    summary: doc.summary,
    description: doc.text.trim(),
    example,
    source: method,
  }
}

const buildReferencedTypes = (exportsByName: Map<string, ExportedType>, methods: MethodInfo[]) => {
  const referenced = new Set<string>()

  for (const method of methods) {
    collectTypeNames(method.source, referenced)
  }

  const queue = [...referenced]
  const resolved = new Set<string>()

  while (queue.length > 0) {
    const current = queue.shift()!
    if (resolved.has(current)) continue
    resolved.add(current)

    const exported = exportsByName.get(current)
    if (!exported) continue

    const nested = new Set<string>()
    collectTypeNames(exported.node, nested)
    for (const child of nested) {
      if (!resolved.has(child) && !builtinTypeNames.has(child)) queue.push(child)
    }
  }

  return [...resolved]
    .map((name) => exportsByName.get(name))
    .filter((item): item is ExportedType => Boolean(item))
    .filter((item) => item.name !== 'PluginListenerHandle')
}

const chooseIconSlug = (plugin: RegistryPlugin) => {
  const candidates = [
    plugin.docsSlug,
    plugin.tutorialSlug,
    plugin.packageSegment,
    plugin.packageSegment.replace(/^capacitor-/, ''),
    plugin.repoName,
    plugin.repoName.replace(/^capacitor-/, ''),
  ]

  return candidates.find((candidate) => isRegularFile(join(webIconsRoot, `${candidate}.svg`))) ?? plugin.docsSlug
}

const pathExists = (path: string) => {
  try {
    statSync(path)
    return true
  } catch {
    return false
  }
}

const isRegularFile = (path: string) => {
  try {
    return statSync(path).isFile()
  } catch {
    return false
  }
}

const collectExportedDefinitions = (sourceFile: ts.SourceFile) => {
  const exportedTypes = new Map<string, ExportedType>()
  const pluginInterfaces: ts.InterfaceDeclaration[] = []

  for (const statement of sourceFile.statements) {
    if (ts.isInterfaceDeclaration(statement) && isExported(statement)) {
      const exported: ExportedType = {
        name: statement.name.text,
        kind: 'interface',
        info: getDocInfo(statement),
        text: statement.getText(sourceFile).trim(),
        node: statement,
      }
      exportedTypes.set(exported.name, exported)

      if (statement.members.some((member) => ts.isMethodSignature(member) || ts.isCallSignatureDeclaration(member))) {
        pluginInterfaces.push(statement)
      }
      continue
    }

    if (ts.isTypeAliasDeclaration(statement) && isExported(statement)) {
      const exported: ExportedType = {
        name: statement.name.text,
        kind: 'type',
        info: getDocInfo(statement),
        text: statement.getText(sourceFile).trim(),
        node: statement,
      }
      exportedTypes.set(exported.name, exported)
      continue
    }

    if (ts.isEnumDeclaration(statement) && isExported(statement)) {
      const exported: ExportedType = {
        name: statement.name.text,
        kind: 'enum',
        info: getDocInfo(statement),
        text: statement.getText(sourceFile).trim(),
        node: statement,
      }
      exportedTypes.set(exported.name, exported)
    }
  }

  return { exportedTypes, pluginInterfaces }
}

const parseMetadata = async (plugin: RegistryPlugin): Promise<PluginMetadata | null> => {
  const [packageSource, indexSource, definitionsSource] = await Promise.all([
    fetchGitHubFile(plugin, 'package.json'),
    fetchGitHubFile(plugin, 'src/index.ts'),
    readDefinitions(plugin),
  ])

  if (!packageSource || !indexSource || !definitionsSource) return null

  const packageJson = JSON.parse(packageSource) as { name?: string; description?: string }
  const sourceFile = ts.createSourceFile('definitions.ts', definitionsSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const { exportedTypes, pluginInterfaces } = collectExportedDefinitions(sourceFile)

  const mainInterface = pluginInterfaces.find((item) => item.name.text !== 'PluginsConfig') ?? pluginInterfaces[0]

  if (!mainInterface) return null

  const importName = getImportName(indexSource, mainInterface.name.text)
  const methods = mainInterface.members
    .filter((member): member is ts.MethodSignature | ts.CallSignatureDeclaration => ts.isMethodSignature(member) || ts.isCallSignatureDeclaration(member))
    .map((member) => getMethodInfo(member, sourceFile, importName, packageJson.name ?? plugin.name))

  const featureMethods = methods.filter((method) => !lifecycleMethods.has(method.name.replaceAll(/['"]/g, '')))
  const referencedTypes = buildReferencedTypes(exportedTypes, methods)

  return {
    plugin,
    packageName: packageJson.name ?? plugin.name,
    packageDescription: sentenceCase(packageJson.description ?? plugin.description),
    importName,
    pluginSummary: sentenceCase(getDocInfo(mainInterface).summary || packageJson.description || plugin.description),
    methods,
    featureMethods: featureMethods.length > 0 ? featureMethods : methods,
    referencedTypes,
    iconSlug: chooseIconSlug(plugin),
  }
}

const asBulletList = (methods: MethodInfo[]) =>
  methods
    .slice(0, 4)
    .map((method) => {
      const suffix = method.summary ? ` - ${method.summary}` : ''
      return `- \`${method.displayName}\`${suffix}`
    })
    .join('\n')

const asApiTable = (methods: MethodInfo[]) =>
  ['| Method | Description |', '| --- | --- |']
    .concat(methods.map((method) => `| \`${method.displayName}\` | ${method.summary || 'See the source definitions for current behavior.'} |`))
    .join('\n')

const buildFallbackExample = (metadata: PluginMetadata, method: MethodInfo) => {
  const requiredParameters = method.source.parameters.filter((parameter) => !parameter.questionToken)
  const parameters = requiredParameters.map((parameter) => {
    const typeText = parameter.type?.getText() ?? 'unknown'

    if (typeText === 'string') return "'value'"
    if (typeText === 'number') return '1'
    if (typeText === 'boolean') return 'true'
    if (typeText.endsWith('[]')) return '[]'
    return `{} as ${typeText}`
  })

  const callArguments = parameters.join(', ')

  return [
    '```typescript',
    `import { ${metadata.importName} } from '${metadata.packageName}';`,
    '',
    `await ${metadata.importName}.${method.displayName}(${callArguments});`,
    '```',
  ].join('\n')
}

const asMethodSections = (metadata: PluginMetadata) =>
  metadata.featureMethods
    .map((method) => {
      const sections = [`### \`${method.displayName}\``, '', method.description || method.summary || 'See the source definitions for the current contract.', '']

      if (method.example) {
        sections.push(method.example, '')
      } else {
        sections.push(buildFallbackExample(metadata, method), '')
      }

      return sections.join('\n').trim()
    })
    .join('\n\n')

const asTypeSections = (types: ExportedType[]) => {
  if (types.length === 0) return ''

  return types
    .slice(0, 12)
    .map((exported) => ['### `' + exported.name + '`', '', exported.info.summary || '', '', '```typescript', exported.text, '```'].filter(Boolean).join('\n'))
    .join('\n\n')
}

const renderIndexDoc = (metadata: PluginMetadata) => {
  const { docsSlug } = metadata.plugin
  return `---
title: "${metadata.packageName}"
description: ${JSON.stringify(metadata.packageDescription)}
tableOfContents: false
next: false
prev: false
sidebar:
  order: 1
  label: "Introduction"
hero:
  tagline: ${JSON.stringify(metadata.pluginSummary)}
  actions:
    - text: Get started
      link: /docs/plugins/${docsSlug}/getting-started/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: ${metadata.plugin.href}
      icon: external
      variant: minimal
---

## Overview

${metadata.pluginSummary}

## Core Capabilities

${asBulletList(metadata.featureMethods)}

## Public API

${asApiTable(metadata.methods)}

## Source Of Truth

This reference is synced from \`src/definitions.ts\` in [${metadata.plugin.repo}](https://github.com/${metadata.plugin.owner}/${metadata.plugin.repo}/).
`
}

const renderGettingStartedDoc = (metadata: PluginMetadata) => {
  const typeSections = asTypeSections(metadata.referencedTypes)
  return `---
title: Getting Started
description: ${JSON.stringify(`Install ${metadata.packageName} and start using its current Capacitor API.`)}
sidebar:
  order: 2
---

## Install

\`\`\`bash
bun add ${metadata.packageName}
bunx cap sync
\`\`\`

## Import

\`\`\`typescript
import { ${metadata.importName} } from '${metadata.packageName}';
\`\`\`

## API Overview

${asMethodSections(metadata)}

${typeSections ? `## Type Reference\n\n${typeSections}\n\n` : ''}## Source Of Truth

This page is generated from the plugin's \`src/definitions.ts\`. Re-run the sync when the public API changes upstream.
`
}

const renderTutorial = (metadata: PluginMetadata) => {
  const docsLink = metadata.plugin.docsWanted ? `/docs/plugins/${metadata.plugin.docsSlug}/` : undefined
  const overview = asBulletList(metadata.featureMethods)
  const firstMethods = metadata.featureMethods.slice(0, 4)

  const methodBlocks = firstMethods
    .map((method) => {
      const body = method.example ? method.example : buildFallbackExample(metadata, method)

      return `### \`${method.displayName}\`\n\n${method.summary || 'See the upstream definitions for the current contract.'}\n\n${body}`
    })
    .join('\n\n')

  return `---
locale: en
---
# Using ${metadata.packageName}

${metadata.pluginSummary}

## Install

\`\`\`bash
bun add ${metadata.packageName}
bunx cap sync
\`\`\`

## What This Plugin Exposes

${overview}

## Example Usage

${methodBlocks}

## Full Reference

- GitHub: ${metadata.plugin.href}
${docsLink ? `- Docs: ${docsLink}` : ''}
`
}

const ensureDirectory = (path: string) => mkdirSync(path, { recursive: true })

const writeTextFile = (path: string, content: string) => {
  ensureDirectory(dirname(path))
  writeFileSync(path, content.replaceAll('\r\n', '\n').trimEnd() + '\n', 'utf8')
}

const copyDirectory = (sourceDir: string, destinationDir: string) => {
  rmSync(destinationDir, { recursive: true, force: true })
  ensureDirectory(destinationDir)

  for (const file of listFiles(sourceDir)) {
    const target = join(destinationDir, relative(sourceDir, file))
    writeTextFile(target, readFileSync(file, 'utf8'))
  }
}

const normalizePluginCommands = (content: string) =>
  content
    .replaceAll("pkgManagers={['npm', 'pnpm', 'yarn', 'bun']}", "pkgManagers={['bun']}")
    .replaceAll("pkgManagers={['npm','pnpm','yarn','bun']}", "pkgManagers={['bun']}")
    .replaceAll('npm install', 'bun add')
    .replaceAll('npx cap sync', 'bunx cap sync')

const syncSidebarEntries = () => {
  const source = readFileSync(sidebarPath, 'utf8')
  const anchor = "  ['Flash', 'flash'],\n"
  const firebaseBlock = [
    "  ['Firebase Analytics', 'firebase-analytics'],",
    "  ['Firebase App', 'firebase-app'],",
    "  ['Firebase App Check', 'firebase-app-check'],",
    "  ['Firebase Authentication', 'firebase-authentication'],",
    "  ['Firebase Crashlytics', 'firebase-crashlytics'],",
    "  ['Firebase Firestore', 'firebase-firestore'],",
    "  ['Firebase Functions', 'firebase-functions'],",
    "  ['Firebase Messaging', 'firebase-messaging'],",
    "  ['Firebase Performance', 'firebase-performance'],",
    "  ['Firebase Remote Config', 'firebase-remote-config'],",
    "  ['Firebase Storage', 'firebase-storage'],",
  ].join('\n')

  let updated = source
  if (!updated.includes("['Firebase Analytics', 'firebase-analytics']")) {
    updated = updated.replace(anchor, `${anchor}${firebaseBlock}\n`)
  }

  if (!updated.includes("['WebView Guardian', 'webview-guardian']")) {
    updated = updated.replace("  ['Watch', 'watch'],\n", "  ['Watch', 'watch'],\n  ['WebView Guardian', 'webview-guardian'],\n")
  }

  if (updated !== source) writeTextFile(sidebarPath, updated)
}

const simpleDocs = registryPlugins.filter((plugin) => plugin.docsWanted && !plugin.docsIsComplex)
const complexDocsToRefreshIndex = registryPlugins.filter((plugin) => plugin.docsWanted && plugin.docsIsComplex)
const tutorialPlugins = new Map<string, RegistryPlugin>()
for (const plugin of registryPlugins) {
  if (!tutorialPlugins.has(plugin.tutorialSlug)) tutorialPlugins.set(plugin.tutorialSlug, plugin)
}

const mapLimit = async <T, R>(items: T[], limit: number, worker: (item: T) => Promise<R>) => {
  const results: R[] = new Array(items.length)
  let index = 0

  const runners = new Array(Math.min(limit, items.length)).fill(null).map(async () => {
    while (true) {
      const currentIndex = index
      index += 1
      if (currentIndex >= items.length) return
      results[currentIndex] = await worker(items[currentIndex])
    }
  })

  await Promise.all(runners)
  return results
}

const writeSimpleDocs = (items: Array<PluginMetadata | null>) => {
  for (const metadata of items) {
    if (!metadata) continue
    const dir = join(docsRoot, metadata.plugin.docsSlug)
    writeTextFile(join(dir, 'index.mdx'), renderIndexDoc(metadata))
    writeTextFile(join(dir, 'getting-started.mdx'), renderGettingStartedDoc(metadata))
  }
}

const normalizeComplexGettingStartedDocs = () => {
  for (const plugin of registryPlugins) {
    if (!plugin.docsWanted || !complexDocs.has(plugin.docsSlug)) continue

    const dir = join(docsRoot, plugin.docsSlug)
    const gettingStartedPath = join(dir, 'getting-started.mdx')
    if (isRegularFile(gettingStartedPath)) {
      writeTextFile(gettingStartedPath, normalizePluginCommands(readFileSync(gettingStartedPath, 'utf8')))
    }
  }
}

const writeComplexIndexes = (items: Array<PluginMetadata | null>) => {
  for (const metadata of items) {
    if (!metadata) continue
    const indexPath = join(docsRoot, metadata.plugin.docsSlug, 'index.mdx')
    if (isRegularFile(indexPath)) writeTextFile(indexPath, renderIndexDoc(metadata))
  }
}

const writeTutorials = (items: Array<PluginMetadata | null>) => {
  for (const metadata of items) {
    if (!metadata) continue
    writeTextFile(join(tutorialRoot, `${metadata.plugin.tutorialSlug}.md`), renderTutorial(metadata))
  }
}

const syncMirrors = () => {
  for (const slug of mirroredDocSlugs) {
    const sourceDir = join(docsRoot, slug)
    if (pathExists(sourceDir) && isRegularFile(join(sourceDir, 'index.mdx'))) {
      copyDirectory(sourceDir, join(mirrorRoot, slug))
    }
  }
}

const main = async () => {
  syncSidebarEntries()

  const simpleMetadata = await mapLimit(simpleDocs, 6, parseMetadata)
  const complexMetadata = await mapLimit(complexDocsToRefreshIndex, 6, parseMetadata)
  const tutorialMetadata = await mapLimit([...tutorialPlugins.values()], 6, parseMetadata)

  writeSimpleDocs(simpleMetadata)
  writeComplexIndexes(complexMetadata)
  normalizeComplexGettingStartedDocs()
  writeTutorials(tutorialMetadata)
  syncMirrors()

  console.log(
    `Synced ${simpleMetadata.filter(Boolean).length} simple doc directories, ${complexMetadata.filter(Boolean).length} complex index pages, and ${tutorialMetadata.filter(Boolean).length} tutorials.`,
  )
}

try {
  await main()
} catch (error) {
  console.error(error)
  process.exit(1)
}
