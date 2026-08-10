import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'

const ROOT = join(import.meta.dirname, '..')
const MESSAGES_PATH = join(ROOT, 'apps/shared/copy/messages.ts')
const CONTEXTS_PATH = join(ROOT, 'apps/shared/copy/messageContexts.ts')
const OVERRIDES_PATH = join(ROOT, 'apps/shared/copy/messageContextOverrides.ts')
const DATA_PATH = join(ROOT, 'apps/shared/copy/translationContextByText.ts')

type MessageMap = Record<string, string>

function unwrapExpression(node: ts.Expression): ts.Expression {
  let current = node
  while (ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isParenthesizedExpression(current)) {
    current = current.expression
  }
  return current
}

function extractMessages(source: string): MessageMap {
  const sourceFile = ts.createSourceFile(MESSAGES_PATH, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const messages: MessageMap = {}

  function readStringLiteral(node: ts.Expression): string | null {
    const value = unwrapExpression(node)
    if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) return value.text
    return null
  }

  function visit(node: ts.Node): void {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'messages' && node.initializer) {
      const initializer = unwrapExpression(node.initializer)
      if (!ts.isObjectLiteralExpression(initializer)) {
        throw new Error('messages initializer must be an object literal')
      }
      for (const property of initializer.properties) {
        if (!ts.isPropertyAssignment(property)) {
          throw new Error(`Unsupported messages entry near ${property.getStart(sourceFile)}: expected property assignment`)
        }
        const key = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) || ts.isNumericLiteral(property.name) ? property.name.text : null
        const value = readStringLiteral(property.initializer)
        if (!key || value === null) {
          throw new Error(`Unsupported messages entry near ${property.getStart(sourceFile)}: keys and values must be string literals`)
        }
        messages[key] = value
      }
      return
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  if (Object.keys(messages).length === 0) throw new Error('messages object not found or empty')
  return messages
}

function humanizeKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bSeo\b/g, 'SEO')
    .replace(/\bCta\b/g, 'CTA')
    .replace(/\bFaq\b/g, 'FAQ')
    .replace(/\bApi\b/g, 'API')
    .replace(/\bCli\b/g, 'CLI')
    .replace(/\bSdk\b/g, 'SDK')
    .replace(/\bOta\b/g, 'OTA')
    .replace(/\bGdpr\b/g, 'GDPR')
    .replace(/\bCcpa\b/g, 'CCPA')
    .replace(/\bDpa\b/g, 'DPA')
    .replace(/\bEula\b/g, 'EULA')
    .replace(/\bSla\b/g, 'SLA')
    .replace(/\bTos\b/g, 'Terms of Service')
    .replace(/\bAup\b/g, 'Acceptable Use Policy')
}

const PREFIX_CONTEXT: Array<{ test: (key: string) => boolean; label: string }> = [
  { test: (key) => key.startsWith('solutions_'), label: 'Capgo solutions marketing page' },
  { test: (key) => key.startsWith('solution_app_examples_'), label: 'Solution page app examples section' },
  { test: (key) => key.startsWith('native_build_'), label: 'Capgo Builder / native cloud build product page' },
  { test: (key) => key.startsWith('native_'), label: 'Native build / Capgo Builder marketing copy' },
  { test: (key) => key.startsWith('live_update_'), label: 'Live updates product page' },
  { test: (key) => key.startsWith('enterprise_'), label: 'Enterprise product/pricing page' },
  { test: (key) => key.startsWith('alternatives_'), label: 'Capacitor live-update alternatives comparison page' },
  { test: (key) => key.startsWith('appflow_'), label: 'Appflow comparison / migration marketing copy' },
  { test: (key) => key.startsWith('capwesome_'), label: 'Capawesome comparison page' },
  { test: (key) => key.startsWith('privacy_'), label: 'Privacy policy legal page' },
  { test: (key) => key.startsWith('data_policy_'), label: 'Data / CCPA privacy policy page' },
  { test: (key) => key.startsWith('tos_'), label: 'Terms of Service legal page' },
  { test: (key) => key.startsWith('eula_'), label: 'End User License Agreement legal page' },
  { test: (key) => key.startsWith('dpa_') || key.startsWith('dp_'), label: 'Data Processing Agreement legal page' },
  { test: (key) => key.startsWith('aup_'), label: 'Acceptable Use Policy legal page' },
  { test: (key) => key.startsWith('bug_bounty_'), label: 'Bug bounty program page' },
  { test: (key) => key.startsWith('trust_'), label: 'Trust / security / compliance page' },
  { test: (key) => key.startsWith('security_'), label: 'Security documentation or trust copy' },
  { test: (key) => key.startsWith('support_'), label: 'Support / premium support page or footer support section' },
  { test: (key) => key.startsWith('pricing_') || key.startsWith('plans_') || key.startsWith('credit_'), label: 'Pricing page or plan calculator UI' },
  { test: (key) => key.startsWith('landing_'), label: 'Homepage landing product feature section' },
  { test: (key) => key.startsWith('cli_'), label: 'CLI product or documentation marketing copy' },
  { test: (key) => key.startsWith('consulting_'), label: 'Consulting services page' },
  { test: (key) => key.startsWith('plugins_') || key.startsWith('powerful_app_plugins'), label: 'Plugins directory / plugins marketing page' },
  { test: (key) => key.startsWith('footer_'), label: 'Site footer navigation or footer blurb' },
  { test: (key) => key.startsWith('home_'), label: 'Homepage marketing copy' },
  { test: (key) => key.startsWith('problem_') || key.startsWith('ps_'), label: 'Homepage problem/solution section' },
  { test: (key) => key.startsWith('built_'), label: 'Built for developers homepage section' },
  { test: (key) => key.startsWith('how_'), label: 'How it works section' },
  { test: (key) => key.startsWith('integrations_'), label: 'Integrations marketing section' },
  { test: (key) => key.startsWith('companies_'), label: 'Customer logos / social proof section' },
  { test: (key) => key.startsWith('imprint_'), label: 'Imprint / legal company info page' },
  { test: (key) => key.startsWith('contributing_'), label: 'Contributing page' },
  { test: (key) => key.startsWith('about_'), label: 'About Capgo page' },
  { test: (key) => key.startsWith('capflow_'), label: 'Appflow vs Capgo comparison page' },
  { test: (key) => key.startsWith('capgo_'), label: 'Capgo brand/product marketing copy' },
]

const SUFFIX_ROLE: Array<{ test: (key: string) => boolean; role: string }> = [
  { test: (key) => /_meta_description$|_description$/.test(key) && key.includes('meta'), role: 'SEO meta description' },
  { test: (key) => /_meta_title$|_seo_title$/.test(key), role: 'SEO page title' },
  { test: (key) => /_description$/.test(key), role: 'Supporting description paragraph or meta description' },
  { test: (key) => /_title$|_headline$|_heading$/.test(key), role: 'Section or page heading' },
  { test: (key) => /_subtitle$|_tagline$|_eyebrow$/.test(key), role: 'Section subtitle or tagline' },
  { test: (key) => /_cta$|_button$|_link_text$|_link$/.test(key), role: 'Call-to-action button or link label' },
  { test: (key) => /_label$|_name$/.test(key), role: 'UI label' },
  { test: (key) => /_faq_/.test(key) || /_question$/.test(key), role: 'FAQ question or answer' },
  { test: (key) => /_li\d+$|_item_\d+$|_point_/.test(key) || /_play_\d+$/.test(key), role: 'Bullet list item' },
  { test: (key) => /_note$|_footnote$/.test(key), role: 'Supporting note or footnote' },
  { test: (key) => /_placeholder$/.test(key), role: 'Form input placeholder' },
  { test: (key) => /_aria_label$/.test(key), role: 'Accessible aria-label for assistive tech' },
  { test: (key) => /_alt$/.test(key), role: 'Image alt text' },
]

const SHORT_WORD_HINTS: Record<string, string> = {
  about: 'Short navigation label for the About page. Translate as a nav menu item, not a full sentence.',
  address: 'Form field label for a postal/street address.',
  alternatives: 'Navigation/menu label for the alternatives comparison page.',
  blog: 'Short navigation label for the Blog section.',
  chat: 'Short label for live chat / Discord support entry.',
  community: 'Navigation label for community resources.',
  company: 'Footer section heading for company links.',
  contact: 'Navigation or form label meaning contact Capgo.',
  copyright: 'Footer copyright notice fragment.',
  docs: 'Short navigation label for Documentation.',
  documentation: 'Navigation label for Documentation.',
  downloads: 'Metric label meaning package/download count.',
  enterprise: 'Product/plan name and navigation label for Enterprise.',
  footer: 'Landmark/section name for the site footer; keep short.',
  free: 'Pricing adjective meaning no cost; not “available”.',
  guides: 'Navigation label for guides content.',
  home: 'Short breadcrumb/navigation label for the homepage.',
  imprint: 'Legal imprint page navigation label (company disclosure).',
  jobs: 'Navigation label for careers/jobs.',
  legal: 'Footer section heading for legal links.',
  login: 'Authentication button/link: sign in to Capgo account.',
  name: 'Form field label for a person or organization name.',
  open: 'UI verb meaning open a panel/dialog, not “open source”.',
  plugins: 'Navigation/label for Capgo Capacitor plugins directory.',
  pricing: 'Navigation/label for the Pricing page.',
  register: 'Authentication button/link: create a Capgo account.',
  solutions: 'Navigation label for Solutions pages.',
  sponsor: 'Navigation label for sponsoring Capgo.',
  status: 'Navigation label for system status page.',
  support: 'Navigation/section label for customer support.',
  trust: 'Navigation/label for Trust & compliance page.',
  channel: 'Capgo release channel concept (update distribution channel), not a TV channel.',
  channels: 'Capgo release channels feature name.',
  rollback: 'Product action: revert an OTA update.',
  bundle: 'Capgo update bundle (web assets package), not a commercial product bundle.',
  bundles: 'Capgo update bundles.',
  update: 'Software OTA update, not a news update.',
  updates: 'Software OTA updates.',
}

function roleForKey(key: string, text: string): string {
  for (const entry of SUFFIX_ROLE) {
    if (entry.test(key)) return entry.role
  }

  const trimmed = text.trim()
  if (trimmed.length <= 24 && !/[.!?]$/.test(trimmed) && trimmed.split(/\s+/).length <= 4) {
    return 'Short UI label or navigation item'
  }
  if (trimmed.length > 160) return 'Long marketing or legal paragraph'
  if (/^[A-Z0-9 .:-]+$/.test(trimmed) && trimmed === trimmed.toUpperCase() && trimmed.length <= 40) {
    return 'Acronym or uppercase heading'
  }
  return 'Website copy sentence'
}

function pageForKey(key: string): string {
  for (const entry of PREFIX_CONTEXT) {
    if (entry.test(key)) return entry.label
  }
  return 'Capgo marketing website'
}

function collectUsages(): Map<string, string[]> {
  const usages = new Map<string, Set<string>>()
  const roots = [join(ROOT, 'apps/web/src'), join(ROOT, 'apps/docs/src')]

  function walk(dir: string): void {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.astro') continue
        walk(path)
        continue
      }
      if (!/\.(astro|ts|tsx|js|mjs)$/.test(entry.name)) continue
      const content = readFileSync(path, 'utf8')
      if (!content.includes('m.')) continue
      const relative = path.slice(ROOT.length + 1)
      for (const match of content.matchAll(/\b(?:m|copy)\.([A-Za-z0-9_]+)\s*\(/g)) {
        const key = match[1]
        const set = usages.get(key) ?? new Set<string>()
        set.add(relative)
        usages.set(key, set)
      }
      for (const match of content.matchAll(/\b(?:m|copy)\(\s*['"]([A-Za-z0-9_]+)['"]/g)) {
        const key = match[1]
        const set = usages.get(key) ?? new Set<string>()
        set.add(relative)
        usages.set(key, set)
      }
      for (const match of content.matchAll(/\b(?:m|copy)\[\s*['"]([A-Za-z0-9_]+)['"]\s*\]/g)) {
        const key = match[1]
        const set = usages.get(key) ?? new Set<string>()
        set.add(relative)
        usages.set(key, set)
      }
    }
  }

  for (const root of roots) walk(root)
  return new Map([...usages.entries()].map(([key, set]) => [key, [...set].sort()]))
}

function usageHint(files: string[] | undefined): string {
  if (!files || files.length === 0) return ''
  const sample = files.slice(0, 3).map((file) => {
    if (file.includes('/components/Header.')) return 'site header'
    if (file.includes('/components/Footer.')) return 'site footer'
    if (file.includes('/components/SEO.')) return 'SEO component'
    if (file.includes('/pages/')) return `page ${file.split('/pages/')[1]}`
    if (file.includes('/components/')) return `component ${file.split('/components/')[1]}`
    return file
  })
  return `Seen in: ${sample.join(', ')}.`
}

function buildContext(key: string, text: string, files: string[] | undefined): string {
  const shortHint = SHORT_WORD_HINTS[key] || SHORT_WORD_HINTS[text.trim().toLowerCase()]
  const page = pageForKey(key)
  const role = roleForKey(key, text)
  const usage = usageHint(files)
  const keyHint = `Message key \`${key}\` (${humanizeKey(key)}).`

  if (shortHint) {
    return [shortHint, `Page/area: ${page}.`, `Role: ${role}.`, usage, keyHint].filter(Boolean).join(' ')
  }

  const preserve = /Capgo|Capacitor|Appflow|CodePush|OTA|CLI|SDK|API|npm|bun|GitHub|Cloudflare|Supabase|Discord/.test(text)
    ? 'Preserve Capgo product/brand and developer terms exactly.'
    : ''

  return [`Page/area: ${page}.`, `Role: ${role}.`, usage, preserve, keyHint].filter(Boolean).join(' ')
}

function escapeTsString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r')
}

function normalizeLookupText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function stripHtml(value: string): string {
  return normalizeLookupText(value.replace(/<[^>]+>/g, ' '))
}

function htmlTextFragments(value: string): string[] {
  if (!/<[^>]+>/.test(value)) return []
  return value
    .split(/<[^>]+>/g)
    .map((part) => normalizeLookupText(part))
    .filter((part) => part.length > 0 && /[A-Za-z0-9]/.test(part))
}

function addLookupEntry(byText: Map<string, Set<string>>, text: string, context: string): void {
  const normalized = normalizeLookupText(text)
  if (!normalized) return
  const set = byText.get(normalized) ?? new Set<string>()
  set.add(context)
  byText.set(normalized, set)
}

function writeContextsFile(contexts: Record<string, string>): void {
  const keys = Object.keys(contexts).sort((a, b) => a.localeCompare(b))
  const lines = [
    '// Translator context for English copy in messages.ts.',
    '// Used by the edge translation worker so short/ambiguous strings keep the right meaning.',
    '// Auto-generated by scripts/generate-message-contexts.ts.',
    '// Put durable manual refinements in ./messageContextOverrides.ts so regenerating keeps them.',
    '',
    "import type { MessageKey } from './messages'",
    '',
    'export const messageContexts = {',
  ]

  for (const key of keys) {
    lines.push(`  ${key}: '${escapeTsString(contexts[key])}',`)
  }

  lines.push('} as const satisfies Record<MessageKey, string>', '')
  lines.push('export type MessageContextKey = keyof typeof messageContexts', '')
  writeFileSync(CONTEXTS_PATH, `${lines.join('\n')}\n`)
}

function loadContextOverrides(): Record<string, string> {
  try {
    const source = readFileSync(OVERRIDES_PATH, 'utf8')
    const start = source.indexOf('export const messageContextOverrides')
    if (start < 0) return {}
    const objectStart = source.indexOf('{', start)
    const objectEnd = source.indexOf('} as const', objectStart)
    if (objectStart < 0 || objectEnd < 0) return {}

    const sourceFile = ts.createSourceFile(OVERRIDES_PATH, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
    const overrides: Record<string, string> = {}

    function visit(node: ts.Node): void {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'messageContextOverrides' && node.initializer) {
        const initializer = unwrapExpression(node.initializer)
        if (!ts.isObjectLiteralExpression(initializer)) return
        for (const property of initializer.properties) {
          if (!ts.isPropertyAssignment(property)) continue
          const key = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) || ts.isNumericLiteral(property.name) ? property.name.text : null
          const valueNode = unwrapExpression(property.initializer)
          if (!key) continue
          if (ts.isStringLiteral(valueNode) || ts.isNoSubstitutionTemplateLiteral(valueNode)) {
            overrides[key] = valueNode.text
          }
        }
      }
      ts.forEachChild(node, visit)
    }

    visit(sourceFile)
    return overrides
  } catch {
    return {}
  }
}

function writeDataFile(messages: MessageMap, contexts: Record<string, string>): void {
  const byText = new Map<string, Set<string>>()

  for (const [key, text] of Object.entries(messages)) {
    const context = contexts[key]
    if (!context) continue

    addLookupEntry(byText, text, context)
    const plain = stripHtml(text)
    if (plain !== normalizeLookupText(text)) addLookupEntry(byText, plain, context)

    for (const fragment of htmlTextFragments(text)) {
      addLookupEntry(byText, fragment, `HTML text fragment from a longer Capgo UI string (parent key \`${key}\`). ${context}`)
    }
  }

  const entries = [...byText.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  const lines = [
    '// Auto-generated English-text → translator-context lookup data for the translation worker.',
    '// Regenerate with: bun run scripts/generate-message-contexts.ts',
    '// Resolver lives in ./translationContextLookup.ts',
    '',
    'export const translationContextByText: Record<string, string> = {',
  ]

  for (const [text, contextSet] of entries) {
    const merged = [...contextSet].sort().join(' | ')
    lines.push(`  '${escapeTsString(text)}': '${escapeTsString(merged)}',`)
  }

  lines.push('}', '')
  writeFileSync(DATA_PATH, `${lines.join('\n')}\n`)
}

const source = readFileSync(MESSAGES_PATH, 'utf8')
const messages = extractMessages(source)
const usages = collectUsages()
const overrides = loadContextOverrides()
const contexts: Record<string, string> = {}

for (const [key, text] of Object.entries(messages)) {
  contexts[key] = overrides[key] ?? buildContext(key, text, usages.get(key))
}

writeContextsFile(contexts)
writeDataFile(messages, contexts)

console.log(
  JSON.stringify(
    {
      messages: Object.keys(messages).length,
      contexts: Object.keys(contexts).length,
      overrides: Object.keys(overrides).length,
      usedKeys: usages.size,
    },
    null,
    2,
  ),
)
