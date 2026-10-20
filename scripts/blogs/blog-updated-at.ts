import matter from 'gray-matter'
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const BLOG_PATH_PATTERN = /^apps\/web\/src\/content\/blog\/.*\.md$/

const CTA_IMPORT_PATTERN = /^import\s+BlogMidArticleCta\s+from\s+['"][^'"]+['"];?\s*$/gm
const CTA_COMPONENT_PATTERN = /<BlogMidArticleCta\s*\/?>/gi

export function normalizeBlogBodyForComparison(body: string): string {
  return body
    .replace(/\r\n?/g, '\n')
    .replace(CTA_IMPORT_PATTERN, '')
    .replace(CTA_COMPONENT_PATTERN, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function normalizeScalar(value: unknown): string {
  if (value === undefined || value === null) return ''
  return String(value).replace(/\s+/g, ' ').trim()
}

export function hasMeaningfulBlogContentChange(previousRaw: string, nextRaw: string): boolean {
  const previous = matter(previousRaw)
  const next = matter(nextRaw)

  if (normalizeScalar(previous.data.title) !== normalizeScalar(next.data.title)) return true
  if (normalizeScalar(previous.data.description) !== normalizeScalar(next.data.description)) return true
  if (normalizeBlogBodyForComparison(previous.content) !== normalizeBlogBodyForComparison(next.content)) return true

  return false
}

function gitShow(ref: string, filePath: string): string | null {
  try {
    return execFileSync('git', ['show', `${ref}:${filePath}`], { encoding: 'utf8' })
  } catch {
    return null
  }
}

function listChangedBlogFiles(baseRef: string, headRef: string): string[] {
  const output = execFileSync('git', ['diff', '--name-only', baseRef, headRef], { encoding: 'utf8' })
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && BLOG_PATH_PATTERN.test(line))
}

function upsertUpdatedAt(filePath: string, isoDate: string): boolean {
  const raw = readFileSync(filePath, 'utf8')
  const nextRaw = raw.replace(/^updated_at: [0-9T:.-]+Z$/m, `updated_at: ${isoDate}`)
  if (nextRaw === raw) {
    console.warn(`Skipping ${filePath}: missing updated_at frontmatter field`)
    return false
  }

  writeFileSync(filePath, nextRaw, 'utf8')
  return true
}

function main(): void {
  const baseRef = process.env.BLOG_BUMP_BASE_REF || 'HEAD~1'
  const headRef = process.env.BLOG_BUMP_HEAD_REF || 'HEAD'
  const changedFiles = listChangedBlogFiles(baseRef, headRef)

  if (changedFiles.length === 0) {
    console.log('No changed blog files to evaluate.')
    return
  }

  const currentDate = new Date().toISOString().replace(/\.\d{3}Z$/, '.000Z')
  let bumped = 0

  for (const filePath of changedFiles) {
    const previousRaw = gitShow(baseRef, filePath)
    const nextRaw = readFileSync(filePath, 'utf8')

    if (!previousRaw) {
      console.log(`Bumping ${filePath}: new blog post`)
      if (upsertUpdatedAt(filePath, currentDate)) bumped++
      continue
    }

    if (!hasMeaningfulBlogContentChange(previousRaw, nextRaw)) {
      console.log(`Skipping ${filePath}: no meaningful title, description, or body change`)
      continue
    }

    console.log(`Bumping ${filePath}: meaningful content change detected`)
    if (upsertUpdatedAt(filePath, currentDate)) bumped++
  }

  console.log(`Updated updated_at on ${bumped} file(s).`)
}

if (import.meta.main) {
  main()
}
