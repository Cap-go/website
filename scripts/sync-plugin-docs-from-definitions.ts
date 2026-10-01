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
  // Unfiltered JSDoc example as the previous generator emitted it, used to recognise old pages.
  legacyExample?: string
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
  exportedTypes: Map<string, ExportedType>
  iconSlug?: string
}

const registryPath = resolve('apps/web/src/config/plugins.ts')
const docsRoot = resolve('apps/docs/src/content/docs/docs/plugins')
const mirrorRoot = resolve('src/content/docs/docs/plugins')
const tutorialRoot = resolve('apps/web/src/content/plugins-tutorials/en')
const sidebarPath = resolve('apps/docs/src/config/sidebar.mjs')
const webIconsRoot = resolve('apps/web/public/icons/plugins')
const mirroredDocSlugs = new Set(['contentsquare', 'live-activities', 'twilio-video', 'widget-kit'])
const githubToken = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? ''
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
      // raw.githubusercontent.com serves the default branch without consuming the REST API rate limit.
      const url = `https://raw.githubusercontent.com/${plugin.owner}/${plugin.repo}/HEAD/${encodedPath}`
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'capgo-plugin-doc-sync',
          ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
        },
      })

      if (response.status === 404) continue
      if (!response.ok) {
        throw new Error(`GitHub raw fetch failed for ${plugin.owner}/${plugin.repo}/${fullPath}: ${response.status} ${response.statusText}`)
      }

      return await response.text()
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
  const match = /const\s+(\w+)(?:\s*:\s*[^=]+)?\s*=\s*registerPlugin/.exec(indexSource)
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
  // JSDoc examples that call another identifier (e.g. `SimPlugin.x()` when the export is `Sim`) would not compile.
  const example = doc.examples
    .filter((item) => item.includes(`${importName}.`))
    .map((item) => cleanExample(item, importName, packageName))
    .find(Boolean)
  const legacyExample = doc.examples.map((item) => cleanExample(item, importName, packageName)).find(Boolean)
  return {
    name,
    displayName: name,
    signature,
    summary: doc.summary,
    description: doc.text.trim(),
    example,
    legacyExample,
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

// Option types often live in sibling files (e.g. `import type { AFInit } from './appsflyer_interfaces'`).
// Pull their exports in so examples can build real objects instead of `{}`.
const addImportedTypes = async (plugin: RegistryPlugin, sourceFile: ts.SourceFile, exportedTypes: Map<string, ExportedType>, depth = 0) => {
  if (depth > 2) return
  const relativeImports = sourceFile.statements
    .filter((statement): statement is ts.ImportDeclaration | ts.ExportDeclaration => ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement))
    .map((statement) => (statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier) ? statement.moduleSpecifier.text : ''))
    .filter((specifier) => specifier.startsWith('./'))

  for (const specifier of [...new Set(relativeImports)]) {
    const base = `src/${specifier.slice(2).replace(/\.(js|ts)$/, '')}`
    const source = (await fetchGitHubFile(plugin, `${base}.ts`)) ?? (await fetchGitHubFile(plugin, `${base}/index.ts`))
    if (!source) continue
    const importedFile = ts.createSourceFile(`${base}.ts`, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
    for (const [name, exported] of collectExportedDefinitions(importedFile).exportedTypes) {
      if (!exportedTypes.has(name)) exportedTypes.set(name, exported)
    }
    await addImportedTypes(plugin, importedFile, exportedTypes, depth + 1)
  }
}

const parseMetadata = async (plugin: RegistryPlugin): Promise<PluginMetadata | null> => {
  const [packageSource, indexSource, definitionsSource] = await Promise.all([
    fetchGitHubFile(plugin, 'package.json'),
    fetchGitHubFile(plugin, 'src/index.ts'),
    readDefinitions(plugin),
  ])

  if (!packageSource || !indexSource || !definitionsSource) return null
  // The registered plugin can live in a sibling module that index.ts re-exports (e.g. `export { SocialLogin } from './social-login'`).
  let registrationSource = indexSource
  let wrappedRegistration = false
  if (!/registerPlugin\s*[<(]/.test(indexSource)) {
    const siblings = [...indexSource.matchAll(/from\s+['"](\.\/[^'"]+)['"]/g)].map((match) => match[1])
    for (const sibling of siblings) {
      const base = `src/${sibling.slice(2).replace(/\.(js|ts)$/, '')}`
      const source = (await fetchGitHubFile(plugin, `${base}.ts`)) ?? (await fetchGitHubFile(plugin, `${base}/index.ts`))
      const registered = source && /const\s+(\w+)(?:\s*:\s*[^=]+)?\s*=\s*registerPlugin/.exec(source)?.[1]
      if (registered && new RegExp(`\\b${registered}\\b`).test(indexSource)) {
        registrationSource = source
        break
      }
      // A thin wrapper around a privately registered plugin keeps the interface name minus "Plugin" (SocialLoginPlugin -> SocialLogin).
      if (registered) wrappedRegistration = true
    }
  }
  // Packages that wrap the native plugin in a custom JS API (e.g. `export { toast }`) can't be described from definitions.ts.
  if (!/registerPlugin\s*[<(]/.test(registrationSource) && !wrappedRegistration) return null

  const packageJson = JSON.parse(packageSource) as { name?: string; description?: string }
  const sourceFile = ts.createSourceFile('definitions.ts', definitionsSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const { exportedTypes, pluginInterfaces } = collectExportedDefinitions(sourceFile)
  await addImportedTypes(plugin, sourceFile, exportedTypes)

  const mainInterface = pluginInterfaces.find((item) => item.name.text !== 'PluginsConfig') ?? pluginInterfaces[0]

  if (!mainInterface) return null

  const wrapperName = mainInterface.name.text.replace(/Plugin$/, '')
  if (!/registerPlugin\s*[<(]/.test(registrationSource) && !new RegExp(`export\\s*\\{[^}]*\\b${wrapperName}\\b`).test(indexSource)) return null
  const importName = /registerPlugin\s*[<(]/.test(registrationSource) ? getImportName(registrationSource, mainInterface.name.text) : wrapperName
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
    exportedTypes,
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
    .concat(methods.map((method) => `| \`${method.displayName}\` | ${(method.summary || 'See the source definitions for current behavior.').replaceAll('|', '\\|')} |`))
    .join('\n')

type ExampleContext = {
  exportedTypes: Map<string, ExportedType>
  valueImports: Set<string>
  typeParameters: Map<string, ts.TypeNode | undefined>
}

type ObjectEntries = Map<string, string>

const toKebabCase = (value: string) =>
  value
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replaceAll(/[^a-zA-Z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '')
    .toLowerCase()

const hintWords = (nameHint?: string) => toKebabCase(nameHint ?? '').split('-').filter(Boolean)

const indentLines = (value: string, indent: string) =>
  value
    .split('\n')
    .map((line, index) => (index === 0 ? line : `${indent}${line}`))
    .join('\n')

const exampleString = (nameHint?: string) => {
  const words = hintWords(nameHint)
  const last = words.at(-1) ?? ''
  const has = (...candidates: string[]) => candidates.some((candidate) => words.includes(candidate))
  if (['id', 'identifier', 'token', 'key'].includes(last)) return `'${toKebabCase(nameHint ?? 'example')}-123'`
  if (['url', 'uri', 'href', 'link', 'endpoint', 'origin'].includes(last)) return "'https://example.com'"
  if (['server', 'host', 'domain', 'hostname'].includes(last)) return "'example.com'"
  if (has('email')) return "'user@example.com'"
  if (has('phone')) return "'+15555550123'"
  if (has('currency')) return "'USD'"
  if (has('scope')) return "'openid'"
  if (has('locale', 'language', 'lang')) return "'en-US'"
  if (has('country')) return "'US'"
  if (has('path', 'directory', 'folder', 'filename') || (last === 'file' && words.length === 1)) return "'path/to/file'"
  if (has('title', 'message', 'body', 'text', 'description', 'label', 'content')) return "'Hello from Capacitor'"
  if (last === 'name') return `'${words.length > 1 ? toKebabCase(words.slice(0, -1).join('-')) : 'example'}'`
  return nameHint ? `'${toKebabCase(nameHint)}'` : "'value'"
}

const exampleNumber = (nameHint?: string) => {
  const words = hintWords(nameHint)
  const has = (...candidates: string[]) => candidates.some((candidate) => words.includes(candidate))
  if (has('lat', 'latitude')) return '48.8566'
  if (has('lng', 'lon', 'longitude')) return '2.3522'
  if (has('port')) return '8080'
  if (has('timeout', 'interval', 'duration', 'delay', 'ms', 'millis')) return '1000'
  if (has('volume', 'opacity', 'alpha', 'ratio', 'brightness', 'level')) return '0.5'
  return '1'
}

// A JSDoc @example or @default value is reused when it is a single-line literal.
const getDocumentedLiteral = (node: ts.Node) => {
  const jsDocs = 'jsDoc' in node && Array.isArray(node.jsDoc) ? node.jsDoc : []
  for (const tagName of ['example', 'default']) {
    for (const doc of jsDocs) {
      for (const tag of doc.tags ?? []) {
        if (tag.tagName.getText() !== tagName) continue
        const value = serializeJsDocComment(tag.comment)
          .trim()
          .replace(/^`+|`+$/g, '')
          .trim()
        if (!value || value.includes('\n')) continue
        if (/^(['"]).*\1$|^-?\d+(\.\d+)?$|^(true|false)$/.test(value)) return value
      }
    }
  }
  return undefined
}

const renderObject = (entries: ObjectEntries) => {
  const rendered = [...entries].map(([key, value]) => `${key}: ${value}`)
  if (rendered.length === 0) return '{}'
  if (rendered.length === 1 && !rendered[0].includes('\n') && rendered[0].length <= 60) return `{ ${rendered[0]} }`
  return ['{', ...rendered.map((entry) => `  ${indentLines(entry, '  ')},`), '}'].join('\n')
}

const literalValues = (typeNode: ts.TypeNode | undefined, context: ExampleContext, depth = 0): string[] | undefined => {
  if (!typeNode || depth > 4) return undefined
  if (ts.isLiteralTypeNode(typeNode)) return [typeNode.literal.getText()]
  if (ts.isUnionTypeNode(typeNode)) {
    const values = typeNode.types.map((member) => literalValues(member, context, depth + 1))
    return values.every(Boolean) ? values.flat() as string[] : undefined
  }
  if (ts.isTypeReferenceNode(typeNode)) {
    const exported = context.exportedTypes.get(typeNode.typeName.getText())
    if (exported && ts.isTypeAliasDeclaration(exported.node)) return literalValues(exported.node.type, context, depth + 1)
  }
  return undefined
}

const isFunctionLike = (typeNode?: ts.TypeNode) => Boolean(typeNode && ts.isFunctionTypeNode(typeNode))

const propertyValue = (member: ts.PropertySignature, context: ExampleContext, depth: number) => {
  const key = member.name.getText().replaceAll(/['"]/g, '')
  const documented = getDocumentedLiteral(member)
  const allowed = literalValues(member.type, context)
  if (documented && (!allowed || allowed.includes(documented))) return documented
  return buildExampleValue(member.type, context, depth + 1, key)
}

// Returns the properties an example should pass for an object-like type, or undefined when the type is not an object.
const getObjectEntries = (typeNode: ts.TypeNode | undefined, context: ExampleContext, depth: number, omit = new Set<string>()): ObjectEntries | undefined => {
  if (!typeNode || depth > 4) return undefined
  if (ts.isParenthesizedTypeNode(typeNode)) return getObjectEntries(typeNode.type, context, depth, omit)
  if (ts.isTypeLiteralNode(typeNode)) return getMemberEntries(typeNode.members, context, depth, omit)
  if (ts.isIntersectionTypeNode(typeNode)) {
    const merged: ObjectEntries = new Map()
    let objectLike = false
    for (const part of typeNode.types) {
      const entries = getObjectEntries(part, context, depth, omit)
      if (!entries) continue
      objectLike = true
      for (const [key, value] of entries) merged.set(key, value)
    }
    return objectLike ? merged : undefined
  }
  if (!ts.isTypeReferenceNode(typeNode)) return undefined
  return getReferenceEntries(typeNode.typeName.getText(), typeNode.typeArguments ?? [], context, depth, omit)
}

const getReferenceEntries = (
  typeName: string,
  typeArguments: readonly ts.TypeNode[],
  context: ExampleContext,
  depth: number,
  omit: Set<string>,
): ObjectEntries | undefined => {
  if (depth > 4) return undefined
  if (typeName === 'Omit') {
    const omitted = new Set([...omit, ...(literalValues(typeArguments[1], context) ?? []).map((value) => value.replaceAll(/['"]/g, ''))])
    return getObjectEntries(typeArguments[0], context, depth, omitted)
  }
  if (['Required', 'Readonly', 'Pick', 'Extract', 'Exclude', 'NonNullable'].includes(typeName)) return getObjectEntries(typeArguments[0], context, depth, omit)
  if (['Partial', 'Record'].includes(typeName)) return new Map()

  const exported = context.exportedTypes.get(typeName.split('.')[0])
  if (!exported) return undefined
  if (ts.isInterfaceDeclaration(exported.node)) {
    const merged: ObjectEntries = new Map()
    for (const clause of exported.node.heritageClauses ?? []) {
      for (const inherited of clause.types) {
        const parent = getReferenceEntries(inherited.expression.getText(), inherited.typeArguments ?? [], context, depth + 1, omit)
        for (const [key, value] of parent ?? []) merged.set(key, value)
      }
    }
    for (const [key, value] of getMemberEntries(exported.node.members, context, depth, omit)) merged.set(key, value)
    return merged
  }
  if (ts.isTypeAliasDeclaration(exported.node)) {
    const aliased = exported.node.type
    if (ts.isUnionTypeNode(aliased)) {
      const first = aliased.types.find((member) => member.kind !== ts.SyntaxKind.UndefinedKeyword)
      return getObjectEntries(first, context, depth + 1, omit)
    }
    return getObjectEntries(aliased, context, depth + 1, omit)
  }
  return undefined
}

const getMemberEntries = (members: ts.NodeArray<ts.TypeElement>, context: ExampleContext, depth: number, omit: Set<string>): ObjectEntries => {
  const entries: ObjectEntries = new Map()
  const properties = members.filter((member): member is ts.PropertySignature => ts.isPropertySignature(member) && Boolean(member.name) && !omit.has(member.name.getText().replaceAll(/['"]/g, '')))
  for (const member of properties) {
    if (member.questionToken) continue
    entries.set(member.name.getText(), propertyValue(member, context, depth))
  }
  // When every option is optional, show the first simple one so the call still demonstrates something useful.
  if (entries.size === 0 && depth === 0) {
    const candidates = properties.filter((member) => !isFunctionLike(member.type)).map((member) => [member.name.getText(), propertyValue(member, context, depth)] as const)
    const firstOptional = candidates.find(([, value]) => value !== '{}' && value !== '[]') ?? candidates[0]
    if (firstOptional) entries.set(firstOptional[0], firstOptional[1])
  }
  return entries
}

// Property names of an interface or type literal, used for `keyof X` parameters such as event names.
const getObjectKeys = (typeNode: ts.TypeNode, context: ExampleContext) => {
  if (ts.isTypeLiteralNode(typeNode)) return typeNode.members.map((member) => member.name?.getText() ?? '').filter(Boolean)
  if (!ts.isTypeReferenceNode(typeNode)) return undefined
  const exported = context.exportedTypes.get(typeNode.typeName.getText())
  if (exported && ts.isInterfaceDeclaration(exported.node)) return exported.node.members.map((member) => member.name?.getText() ?? '').filter(Boolean)
  if (exported && ts.isTypeAliasDeclaration(exported.node)) return getObjectKeys(exported.node.type, context)
  return undefined
}

const pickEnumMember = (declaration: ts.EnumDeclaration) =>
  declaration.members.find((member) => !/unknown|none|unspecified|invalid|undefined|default/i.test(member.name.getText())) ?? declaration.members[0]

const singular = (nameHint?: string) => (nameHint && nameHint.endsWith('s') && nameHint.length > 3 ? nameHint.slice(0, -1) : nameHint)

const buildExampleValue = (typeNode: ts.TypeNode | undefined, context: ExampleContext, depth = 0, nameHint?: string): string => {
  if (!typeNode || depth > 5) return '{}'

  switch (typeNode.kind) {
    case ts.SyntaxKind.StringKeyword:
      return exampleString(nameHint)
    case ts.SyntaxKind.NumberKeyword:
      return exampleNumber(nameHint)
    case ts.SyntaxKind.BooleanKeyword:
      return 'true'
    case ts.SyntaxKind.NullKeyword:
      return 'null'
    case ts.SyntaxKind.UndefinedKeyword:
    case ts.SyntaxKind.VoidKeyword:
      return 'undefined'
  }

  if (ts.isParenthesizedTypeNode(typeNode)) return buildExampleValue(typeNode.type, context, depth, nameHint)
  if (ts.isLiteralTypeNode(typeNode)) return typeNode.literal.getText()
  if (ts.isTypeOperatorNode(typeNode) && typeNode.operator === ts.SyntaxKind.KeyOfKeyword) {
    const keys = [...(getObjectKeys(typeNode.type, context) ?? [])]
    return keys.length > 0 ? `'${keys[0].replaceAll(/['"]/g, '')}'` : exampleString(nameHint)
  }
  if (ts.isTypeReferenceNode(typeNode) && context.typeParameters.has(typeNode.typeName.getText())) {
    return buildExampleValue(context.typeParameters.get(typeNode.typeName.getText()), context, depth + 1, nameHint)
  }
  if (ts.isTupleTypeNode(typeNode)) {
    const elements = typeNode.elements.map((element) => buildExampleValue(ts.isNamedTupleMember(element) ? element.type : element, context, depth + 1, ts.isNamedTupleMember(element) ? element.name.getText() : nameHint))
    const words = hintWords(nameHint)
    if (elements.length === 2 && elements.every((element) => element === '1') && words.some((word) => ['destination', 'start', 'coordinates', 'position', 'location', 'center', 'origin'].includes(word))) return '[48.8566, 2.3522]'
    return `[${elements.join(', ')}]`
  }
  if (ts.isArrayTypeNode(typeNode)) return buildArrayValue(typeNode.elementType, context, depth, nameHint)
  if (ts.isFunctionTypeNode(typeNode)) {
    const parameterNames = typeNode.parameters.map((parameter) => parameter.name.getText())
    if (parameterNames.length === 0) return "() => {\n  console.log('called');\n}"
    return `(${parameterNames.join(', ')}) => {\n  console.log(${parameterNames[0]});\n}`
  }
  if (ts.isUnionTypeNode(typeNode)) {
    const candidates = typeNode.types.filter(
      (member) => member.kind !== ts.SyntaxKind.UndefinedKeyword && member.kind !== ts.SyntaxKind.NullKeyword && !(ts.isLiteralTypeNode(member) && member.literal.kind === ts.SyntaxKind.NullKeyword),
    )
    return buildExampleValue(candidates[0] ?? typeNode.types[0], context, depth, nameHint)
  }
  if (ts.isTypeReferenceNode(typeNode)) {
    const typeName = typeNode.typeName.getText()
    if (typeName === 'Array' || typeName === 'ReadonlyArray') return buildArrayValue(typeNode.typeArguments?.[0], context, depth, nameHint)
    if (typeName === 'Date') return 'new Date()'
    if (typeName === 'Promise') return buildExampleValue(typeNode.typeArguments?.[0], context, depth, nameHint)
    if (['Record', 'Partial', 'Map', 'Object'].includes(typeName)) return '{}'
    const exported = context.exportedTypes.get(typeName.split('.')[0])
    if (exported?.kind === 'enum' && ts.isEnumDeclaration(exported.node)) {
      const member = pickEnumMember(exported.node)
      if (member) {
        context.valueImports.add(exported.name)
        return `${exported.name}.${member.name.getText()}`
      }
    }
    if (exported && ts.isTypeAliasDeclaration(exported.node) && !getObjectEntries(typeNode, context, depth)) return buildExampleValue(exported.node.type, context, depth + 1, nameHint)
  }

  const entries = getObjectEntries(typeNode, context, depth)
  return entries ? renderObject(entries) : '{}'
}

const buildArrayValue = (elementType: ts.TypeNode | undefined, context: ExampleContext, depth: number, nameHint?: string) => {
  if (!elementType || depth > 3) return '[]'
  const element = buildExampleValue(elementType, context, depth + 1, singular(nameHint))
  if (element === '{}' || element === 'undefined') return '[]'
  return element.includes('\n') ? `[\n  ${indentLines(element, '  ')},\n]` : `[${element}]`
}

const isVoidReturn = (typeNode?: ts.TypeNode) => {
  if (!typeNode) return true
  const text = typeNode.getText().replaceAll(/\s+/g, '')
  return text === 'void' || text === 'Promise<void>' || text === 'Promise<undefined>'
}

const sensitivePattern = /password|credential|secret|token|jwt|private/i

const buildFallbackExample = (metadata: PluginMetadata, method: MethodInfo) => {
  const context: ExampleContext = {
    exportedTypes: metadata.exportedTypes,
    valueImports: new Set(),
    typeParameters: new Map((method.source.typeParameters ?? []).map((parameter) => [parameter.name.text, parameter.constraint ?? parameter.default])),
  }
  const parameters: string[] = []
  for (const parameter of method.source.parameters) {
    if (parameter.questionToken || parameter.initializer) break
    parameters.push(buildExampleValue(parameter.type, context, 0, parameter.name.getText()))
  }

  const callArguments = parameters.join(', ')
  const call = `${metadata.importName}.${method.displayName}(${callArguments})`
  const returnText = method.source.type?.getText() ?? ''
  const isListener = /PluginListenerHandle/.test(returnText)

  let body: string
  if (isListener) {
    body = `const handle = await ${call};\n\n// Later, stop listening:\nawait handle.remove();`
  } else if (isVoidReturn(method.source.type)) {
    body = `await ${call};`
  } else if (sensitivePattern.test(method.displayName) || sensitivePattern.test(returnText)) {
    body = `const result = await ${call};\n// The result holds sensitive values: use it without logging it.`
  } else {
    body = `const result = await ${call};\nconsole.log(result);`
  }

  const importNames = [metadata.importName, ...[...context.valueImports].sort()]
  return ['```typescript', `import { ${importNames.join(', ')} } from '${metadata.packageName}';`, '', body, '```'].join('\n')
}

// Previous generator output, kept so the sync can recognise pages it produced itself.
const buildLegacyFallbackExample = (metadata: PluginMetadata, method: MethodInfo) => {
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

const renderLegacyTutorial = (metadata: PluginMetadata) => {
  const docsLink = metadata.plugin.docsWanted ? `/docs/plugins/${metadata.plugin.docsSlug}/` : undefined
  const overview = asBulletList(metadata.featureMethods)
  const firstMethods = metadata.featureMethods.slice(0, 4)

  const methodBlocks = firstMethods
    .map((method) => {
      const body = method.legacyExample ? method.legacyExample : buildLegacyFallbackExample(metadata, method)

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

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

\`\`\`bash
bunx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
\`\`\`

Then use the following prompt:

\`\`\`text
Use the \`capacitor-plugins\` skill from \`Cap-go/capgo-skills\` to install the \`${metadata.packageName}\` plugin in my project.
\`\`\`

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

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
  const exampleMethods = metadata.featureMethods.slice(0, 6)
  const methodBlocks = exampleMethods
    .map((method) => {
      const body = method.example ? method.example : buildFallbackExample(metadata, method)
      return `### \`${method.displayName}()\`\n\n${method.summary || 'See the API reference for the current contract.'}\n\n${body}`
    })
    .join('\n\n')
  const remaining = metadata.featureMethods.length - exampleMethods.length
  const listenerMethod = metadata.methods.find((method) => method.name === 'addListener')
  const hasRemoveAll = metadata.methods.some((method) => method.name === 'removeAllListeners')

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

\`bunx cap sync\` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

\`\`\`typescript
import { ${metadata.importName} } from '${metadata.packageName}';
\`\`\`

## API at a glance

${asApiTable(metadata.featureMethods)}

## Examples

${methodBlocks}
${remaining > 0 ? `\nThe table above lists all ${metadata.featureMethods.length} methods; check the [GitHub repository](${metadata.plugin.href}) for the full contract of each one.\n` : ''}${
    listenerMethod
      ? `
## Listen to events

\`addListener\` returns a handle. Call \`handle.remove()\` when the screen unmounts${hasRemoveAll ? `, or \`${metadata.importName}.removeAllListeners()\` to clear every listener` : ''}.
`
      : ''
  }
## Full reference

- [GitHub repository](${metadata.plugin.href})
${docsLink ? `- [Documentation](${docsLink})\n- [API reference](${docsLink}getting-started/)` : ''}
`
}

const ensureDirectory = (path: string) => mkdirSync(path, { recursive: true })

const writeTextFile = (path: string, content: string) => {
  ensureDirectory(dirname(path))
  writeFileSync(path, content.replaceAll('\r\n', '\n').trimEnd() + '\n', 'utf8')
}

const skippedHandWritten: string[] = []

const splitKeepGoing = (content: string) => {
  const index = content.search(/^## Keep going from /m)
  return index >= 0 ? { main: content.slice(0, index).trim(), keepGoing: content.slice(index).trim() } : { main: content.trim(), keepGoing: '' }
}

const normalizeForCompare = (content: string) => content.replaceAll('\r\n', '\n').replaceAll(/\n{3,}/g, '\n\n').trim()

// Swap only the exact snippets the previous generator emitted (e.g. `toggle({} as Options)`) for typed examples.
// Everything else on the page, including hand-written text, stays as it is.
const refreshGeneratedExamples = (content: string, metadata: PluginMetadata) => {
  let next = content
  for (const method of metadata.methods) {
    const replacement = method.example ?? buildFallbackExample(metadata, method)
    // Old fallback snippets, and JSDoc examples that call an identifier the package doesn't export.
    const legacySnippets = [method.legacyExample ? undefined : buildLegacyFallbackExample(metadata, method), method.legacyExample !== method.example ? method.legacyExample : undefined]
    for (const legacy of legacySnippets) {
      if (legacy && legacy !== replacement && next.includes(legacy)) next = next.replaceAll(legacy, replacement)
    }
  }
  return next
}

const writePage = (path: string, content: string) => {
  const { main, keepGoing } = splitKeepGoing(content)
  writeTextFile(path, keepGoing ? `${main}\n\n${keepGoing}` : main)
}

// Tutorials are fully regenerated only when they still match the previous generator output byte for byte
// (ignoring the "Keep going" link section). Edited or curated tutorials only get their old snippets refreshed.
const writeTutorialPage = (path: string, metadata: PluginMetadata) => {
  if (!isRegularFile(path)) {
    writePage(path, renderTutorial(metadata))
    return
  }
  const previous = readFileSync(path, 'utf8')
  const frontmatter = previous.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1]
  const curated = Boolean(frontmatter && /^curated:\s*['"]?true['"]?\s*(?:#.*)?$/im.test(frontmatter))
  const { main, keepGoing } = splitKeepGoing(previous)
  const untouched = !curated && normalizeForCompare(main) === normalizeForCompare(renderLegacyTutorial(metadata))
  if (untouched) {
    writePage(path, keepGoing ? `${renderTutorial(metadata).trimEnd()}\n\n${keepGoing}` : renderTutorial(metadata))
    return
  }
  skippedHandWritten.push(relative(process.cwd(), path))
  const refreshed = refreshGeneratedExamples(previous, metadata)
  if (refreshed !== previous) writeTextFile(path, refreshed)
}

// Existing docs pages are never rewritten wholesale: many were extended by hand after the first sync.
const writeDocsPage = (path: string, content: string, metadata: PluginMetadata) => {
  if (!isRegularFile(path)) {
    writePage(path, content)
    return
  }
  const previous = readFileSync(path, 'utf8')
  const refreshed = refreshGeneratedExamples(previous, metadata)
  if (refreshed !== previous) writeTextFile(path, refreshed)
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
    writeDocsPage(join(dir, 'index.mdx'), renderIndexDoc(metadata), metadata)
    writeDocsPage(join(dir, 'getting-started.mdx'), renderGettingStartedDoc(metadata), metadata)
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
    if (isRegularFile(indexPath)) writeDocsPage(indexPath, renderIndexDoc(metadata), metadata)
  }
}

const writeTutorials = (items: Array<PluginMetadata | null>) => {
  for (const metadata of items) {
    if (!metadata) continue
    writeTutorialPage(join(tutorialRoot, `${metadata.plugin.tutorialSlug}.md`), metadata)
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

  if (skippedHandWritten.length > 0) console.log(`Kept ${skippedHandWritten.length} edited tutorials (examples refreshed only):\n${skippedHandWritten.map((path) => `- ${path}`).join('\n')}`)
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
