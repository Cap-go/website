import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'
import { translationContextByText } from '../apps/shared/copy/translationContextByText.ts'

const MESSAGES_PATH = join(import.meta.dirname, '../apps/shared/copy/messages.ts')

function unwrapExpression(node: ts.Expression): ts.Expression {
  let current = node
  while (ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isParenthesizedExpression(current)) {
    current = current.expression
  }
  return current
}

function extractWhyPluginsMessages(source: string): Record<string, string> {
  const sourceFile = ts.createSourceFile(MESSAGES_PATH, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const messages: Record<string, string> = {}

  function readStringLiteral(node: ts.Expression): string | null {
    const value = unwrapExpression(node)
    if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) return value.text
    return null
  }

  function visit(node: ts.Node): void {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'messages' && node.initializer) {
      const initializer = unwrapExpression(node.initializer)
      if (!ts.isObjectLiteralExpression(initializer)) return
      for (const property of initializer.properties) {
        if (!ts.isPropertyAssignment(property)) continue
        const key =
          ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) || ts.isNumericLiteral(property.name)
            ? property.name.text
            : null
        const value = readStringLiteral(property.initializer)
        if (!key || !key.startsWith('why_plugins_') || value === null) continue
        messages[key] = value
      }
      return
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return messages
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

function requiredLookupTexts(text: string): string[] {
  const variants = new Set<string>()
  variants.add(text)
  const plain = stripHtml(text)
  if (plain !== normalizeLookupText(text)) variants.add(plain)
  for (const fragment of htmlTextFragments(text)) variants.add(fragment)
  return [...variants]
}

function contextForKey(context: string, key: string): boolean {
  return context.includes(`Message key \`${key}\``)
}

const messages = extractWhyPluginsMessages(readFileSync(MESSAGES_PATH, 'utf8'))
const keys = Object.keys(messages).sort((a, b) => a.localeCompare(b))

let failures = 0

console.log(`Checking ${keys.length} why_plugins_* messages against translationContextByText.ts\n`)

for (const key of keys) {
  const text = messages[key]
  let keyOk = true

  const primary = translationContextByText[text]
  if (!primary || !contextForKey(primary, key)) {
    console.log(`FAIL ${key}: primary lookup key missing or wrong context`)
    console.log(`  expected key bytes: ${JSON.stringify(text)}`)
    if (translationContextByText[text]) {
      console.log(`  got context: ${translationContextByText[text].slice(0, 120)}...`)
    }
    keyOk = false
    failures++
  } else if (text !== messages[key]) {
    console.log(`FAIL ${key}: internal messages desync`)
    keyOk = false
    failures++
  }

  for (const variant of requiredLookupTexts(text)) {
    if (variant === text) continue
    const ctx = translationContextByText[variant]
    if (!ctx || !contextForKey(ctx, key)) {
      console.log(`FAIL ${key}: missing fragment lookup ${JSON.stringify(variant.slice(0, 80))}...`)
      keyOk = false
      failures++
    }
  }

  for (const [lookupText, ctx] of Object.entries(translationContextByText)) {
    if (!contextForKey(ctx, key)) continue
    if (ctx.includes(' | ')) continue
    if (lookupText === text) continue
    const allowed = new Set(requiredLookupTexts(text))
    if (allowed.has(lookupText)) continue
    console.log(`FAIL ${key}: stray exclusive lookup ${JSON.stringify(lookupText.slice(0, 80))}...`)
    keyOk = false
    failures++
  }

  console.log(keyOk ? `OK   ${key}` : `---- ${key}`)
}

console.log(`\n${failures === 0 ? 'PASS' : 'FAIL'}: ${failures} issue(s)`)
if (failures > 0) process.exit(1)