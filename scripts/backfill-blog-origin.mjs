#!/usr/bin/env bun
/**
 * Backfill `origin: human | ai` on blog post frontmatter.
 *
 * Heuristics (prefer false negatives → default `ai`):
 * - ai (override): rebelgrowth S3 images, "supplied research" boilerplate, chat-gpt credits
 * - human: known team/guest authors; Story/Company tags; legacy /public root images (when not ai)
 * - human: Martin posts with x.com/martindonadieu author_url; capgo.app head_image; explicit slug list
 * - ai: everything else (bulk SEO pipeline, cdnimg.co, /blog-images/ mass content)
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const BLOG_DIR = join(import.meta.dirname, '../apps/web/src/content/blog/en')

const HUMAN_AUTHORS = new Set(['WcaleNieWolny', 'Michael (WcaleNieWolny)', 'Anik Dhabal Babu', 'Rupert Barrow'])
const HUMAN_TAGS = new Set(['Story', 'Company'])

/** Hand-written Martin/founder posts that lack stronger automated signals. */
const HUMAN_SLUGS = new Set([
  'android-emulator-terminal',
  'barcode-scanner-cordova',
  'benefits-of-continuous-integration',
  'capacitor-edge-to-edge-display-native-config',
  'capgo-integration-with-github-actions-guide',
  'how-capgo-handles-version-control-and-rollbacks',
])

function hasAiPipelineBody(body) {
  return body.includes('rebelgrowth.s3') || /supplied research/i.test(body) || /chat-gpt|chatgpt/i.test(body)
}

function classifyOrigin(frontmatter, rawContent) {
  const body = rawContent.replace(/^---[\s\S]*?---/, '')
  const slug = frontmatter.slug ?? ''
  const author = frontmatter.author ?? ''
  const tag = frontmatter.tag ?? ''
  const headImage = frontmatter.head_image ?? ''
  const authorUrl = frontmatter.author_url ?? ''

  if (hasAiPipelineBody(body)) return 'ai'

  if (HUMAN_SLUGS.has(slug)) return 'human'

  if (HUMAN_AUTHORS.has(author)) return 'human'

  const tags = tag.split(',').map((item) => item.trim())
  if (tags.some((item) => HUMAN_TAGS.has(item))) return 'human'

  if (authorUrl.includes('x.com/martindonadieu') || rawContent.includes('x.com/martindonadieu')) return 'human'

  if (/capgo\.app/i.test(headImage)) return 'human'

  if (headImage.startsWith('/') && !headImage.startsWith('/blog-images/')) return 'human'

  return 'ai'
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null

  const frontmatter = {}
  for (const line of match[1].split('\n')) {
    const keyValue = line.match(/^([a-z_]+):\s*(.*)$/i)
    if (keyValue) frontmatter[keyValue[1]] = keyValue[2].replace(/^['"]|['"]$/g, '')
  }

  return { frontmatter, block: match[0], body: content.slice(match[0].length) }
}

function upsertOrigin(frontmatterBlock, origin) {
  if (/^origin:/m.test(frontmatterBlock)) {
    return frontmatterBlock.replace(/^origin:.*$/m, `origin: ${origin}`)
  }

  if (/^locale:/m.test(frontmatterBlock)) {
    return frontmatterBlock.replace(/^(locale:.*)$/m, `$1\norigin: ${origin}`)
  }

  return `${frontmatterBlock}\norigin: ${origin}`
}

const files = readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
const counts = { human: 0, ai: 0, updated: 0 }

for (const file of files) {
  const filePath = join(BLOG_DIR, file)
  const content = readFileSync(filePath, 'utf8')
  const parsed = parseFrontmatter(content)
  if (!parsed) {
    console.warn(`Skipping ${file}: no frontmatter`)
    continue
  }

  const origin = classifyOrigin(parsed.frontmatter, content)
  counts[origin]++

  const nextFrontmatter = upsertOrigin(parsed.block.slice(4, -4), origin)
  const nextContent = `---\n${nextFrontmatter}\n---${parsed.body}`

  if (nextContent !== content) {
    writeFileSync(filePath, nextContent)
    counts.updated++
  }
}

console.log(`Backfilled ${files.length} EN posts (${counts.updated} files changed)`)
console.log(`  human: ${counts.human}`)
console.log(`  ai: ${counts.ai}`)
