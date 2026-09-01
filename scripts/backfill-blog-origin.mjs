#!/usr/bin/env bun
/**
 * Backfill `origin: human | ai` on EN blog post frontmatter from git history.
 *
 * - human: first meaningful commit that added the article was by a person (not import automation)
 * - ai: Outrank/Distrib/GitHub Action imports and other bot-authored adds (listed under /articles)
 *
 * Run: bun run scripts/backfill-blog-origin.mjs
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { isAbsolute, join, relative } from 'node:path'

const REPO_ROOT = join(import.meta.dirname, '..')
const BLOG_DIR = join(REPO_ROOT, 'apps/web/src/content/blog/en')

const MECHANICAL_COMMIT_PATTERNS = [
  /^chore: auto-bump updated_at dates for modified blog posts$/i,
  /^feat\(blog\): separate human and AI article listings/i,
]

const AUTOMATION_IMPORT_MESSAGES = [
  /^chore: import outrank articles$/i,
  /^chore: import distrib articles$/i,
  /^chore: sync blog posts from seobot$/i,
]

const OUTRANK_ATTRIBUTION =
  /(?:Prepared with|Written with)\s+\[(?:Outrank (?:app|tool))\]\(https:\/\/outrank\.so\)/i

const TRUSTED_GIT_BINARIES = ['/usr/bin/git', '/usr/local/bin/git', '/opt/homebrew/bin/git']

function resolveTrustedGitBinary() {
  const override = process.env.GIT_BINARY_PATH
  if (override) {
    if (!isAbsolute(override) || !existsSync(override)) {
      throw new Error(`GIT_BINARY_PATH must be an existing absolute path: ${override}`)
    }
    return override
  }

  for (const gitPath of TRUSTED_GIT_BINARIES) {
    if (existsSync(gitPath)) {
      return gitPath
    }
  }

  throw new Error(`No trusted git binary found. Expected one of: ${TRUSTED_GIT_BINARIES.join(', ')}`)
}

const GIT_BINARY = resolveTrustedGitBinary()

function execGit(args) {
  try {
    return execFileSync(GIT_BINARY, args, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
    }).trim()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`git ${args.join(' ')} failed: ${message}`, { cause: error })
  }
}

function assertGitRepositoryReady() {
  execGit(['rev-parse', '--git-dir'])

  if (execGit(['rev-parse', '--is-shallow-repository']) === 'true') {
    throw new Error('Shallow clone detected. Run `git fetch --unshallow` before backfilling origins.')
  }
}

function parseGitLog(output) {
  if (!output) return []

  return output
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const parts = line.split('|')
      const [hash, date, author, email, ...messageParts] = parts
      return {
        hash,
        date,
        author,
        email,
        message: messageParts.join('|'),
      }
    })
}

function getAddsForPath(path, { follow = false, all = false } = {}) {
  const args = ['log', '--diff-filter=A', '--format=%H|%aI|%an|%ae|%s']
  if (all) args.push('--all')
  if (follow) args.push('--follow')
  args.push('--', path)

  return parseGitLog(execGit(args))
}

function legacyPathPatterns(slug) {
  const names = [`${slug}.md`, `${slug}.mdx`]
  const prefixes = [
    'apps/web/src/content/blog/en',
    'src/content/blog/en',
    'src/content/blog',
    'content/blog',
    'src/content/article',
    'content/article',
  ]

  const paths = new Set()
  for (const prefix of prefixes) {
    for (const name of names) {
      paths.add(`${prefix}/${name}`)
    }
  }

  return [...paths]
}

function isMechanicalCommit(message) {
  return MECHANICAL_COMMIT_PATTERNS.some((pattern) => pattern.test(message.trim()))
}

function isAutomationAuthor({ author, email }) {
  const authorLower = author.toLowerCase()
  const emailLower = email.toLowerCase()

  if (authorLower === 'github action') return true
  if (authorLower === 'actions-user') return true
  if (authorLower.includes('[bot]')) return true
  if (emailLower === 'action@github.com') return true
  if (authorLower.includes('cursor agent')) return true
  if (authorLower.includes('devin ai')) return true
  if (authorLower.endsWith('-bot')) return true

  return false
}

function isAutomationImportMessage(message) {
  return AUTOMATION_IMPORT_MESSAGES.some((pattern) => pattern.test(message.trim()))
}

function classifyCommit(commit) {
  if (isAutomationAuthor(commit) || isAutomationImportMessage(commit.message)) {
    return 'ai'
  }

  return 'human'
}

function findIntroducingCommit(slug, currentRelPath) {
  const byHash = new Map()

  const addCandidates = (commits) => {
    for (const commit of commits) {
      if (!byHash.has(commit.hash)) {
        byHash.set(commit.hash, commit)
      }
    }
  }

  addCandidates(getAddsForPath(currentRelPath, { follow: true }))
  for (const path of legacyPathPatterns(slug)) {
    addCandidates(getAddsForPath(path, { all: true }))
  }

  const meaningful = [...byHash.values()]
    .filter((commit) => !isMechanicalCommit(commit.message))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return meaningful[0] ?? null
}

function classifyOrigin(slug, currentRelPath, body) {
  const commit = findIntroducingCommit(slug, currentRelPath)

  if (!commit) {
    if (OUTRANK_ATTRIBUTION.test(body)) {
      return { origin: 'ai', commit: null, reason: 'outrank-attribution' }
    }

    return { origin: 'ai', commit: null, reason: 'default-unclassified' }
  }

  const origin = classifyCommit(commit)

  if (origin === 'human' && OUTRANK_ATTRIBUTION.test(body)) {
    return { origin: 'ai', commit, reason: 'outrank-attribution-overrides-human-commit' }
  }

  return { origin, commit, reason: 'git-introducing-commit' }
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

assertGitRepositoryReady()

const files = readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
const counts = { human: 0, ai: 0, updated: 0 }
const examples = { human: [], ai: [] }

for (const file of files) {
  const filePath = join(BLOG_DIR, file)
  const content = readFileSync(filePath, 'utf8')
  const parsed = parseFrontmatter(content)
  if (!parsed) {
    console.warn(`Skipping ${file}: no frontmatter`)
    continue
  }

  const slug = parsed.frontmatter.slug || file.replace(/\.(md|mdx)$/, '')
  const currentRelPath = relative(REPO_ROOT, filePath)
  const { origin, commit } = classifyOrigin(slug, currentRelPath, parsed.body)
  counts[origin]++

  if (examples[origin].length < 5) {
    examples[origin].push({
      slug,
      author: commit?.author ?? 'n/a',
      message: commit?.message ?? 'n/a',
    })
  }

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
console.log('')
console.log('Example human slugs:')
for (const example of examples.human) {
  console.log(`  - ${example.slug} (${example.author}: ${example.message})`)
}
console.log('')
console.log('Example ai slugs:')
for (const example of examples.ai) {
  console.log(`  - ${example.slug} (${example.author}: ${example.message})`)
}
