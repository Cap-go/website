#!/usr/bin/env bun
/**
 * Backfill `origin: human | ai` on blog post frontmatter.
 *
 * - human: Capgo editorial team authors only (posts that show the 3-person byline)
 * - ai: everything else (listed under /articles)
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const BLOG_DIR = join(import.meta.dirname, '../apps/web/src/content/blog/en')

const HUMAN_AUTHORS = new Set(['WcaleNieWolny', 'Michael (WcaleNieWolny)', 'Anik Dhabal Babu', 'Rupert Barrow'])

function classifyOrigin(frontmatter) {
  const author = frontmatter.author ?? ''
  return HUMAN_AUTHORS.has(author) ? 'human' : 'ai'
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

  const origin = classifyOrigin(parsed.frontmatter)
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
