import { glob } from 'glob'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import os from 'node:os'

export function getBuildConcurrency() {
  const availableParallelism = typeof os.availableParallelism === 'function' ? os.availableParallelism() : os.cpus().length
  const configuredConcurrency = Number.parseInt(process.env.BUILD_CONCURRENCY ?? '', 10)
  return Number.isFinite(configuredConcurrency) && configuredConcurrency > 0 ? configuredConcurrency : availableParallelism
}
// test deploy

export function normalizeDirectoryPath(path) {
  const normalized = path.replaceAll('\\', '/')
  return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized
}

function isUpperCase(character) {
  return character >= 'A' && character <= 'Z'
}

function isLowerCase(character) {
  return character >= 'a' && character <= 'z'
}

function isDigit(character) {
  return character >= '0' && character <= '9'
}

function isLetter(character) {
  return isUpperCase(character) || isLowerCase(character)
}

export function toHeroiconName(value) {
  let normalizedValue = ''

  for (let index = 0; index < value.length; index += 1) {
    const currentCharacter = value[index]
    const previousCharacter = value[index - 1] ?? ''
    const nextCharacter = value[index + 1] ?? ''
    const shouldInsertDash =
      index > 0 &&
      ((isUpperCase(currentCharacter) && (isLowerCase(previousCharacter) || isDigit(previousCharacter))) ||
        (isUpperCase(currentCharacter) && isUpperCase(previousCharacter) && isLowerCase(nextCharacter)) ||
        (isDigit(currentCharacter) && isLetter(previousCharacter)) ||
        (isLetter(currentCharacter) && isDigit(previousCharacter)))

    if (shouldInsertDash) normalizedValue += '-'
    normalizedValue += currentCharacter.toLowerCase()
  }

  return `${normalizedValue}-solid`
}

export function buildPluginIcons(configPath) {
  try {
    const configSource = readFileSync(configPath, 'utf8')
    const iconMatches = [...configSource.matchAll(/icon:\s*'([^']+)'/g), ...configSource.matchAll(/'[^']+':\s*'([^']+)'/g)]
    const iconNames = iconMatches.map(([, iconName]) => toHeroiconName(iconName))
    return [...new Set(['arrow-up-right-solid', 'chevron-down', 'information-circle-solid', 'question-mark-circle-solid', ...iconNames])].sort((left, right) =>
      left.localeCompare(right),
    )
  } catch (error) {
    throw new Error(`Failed to read plugin config at ${configPath}. This build depends on apps/web/src/config/plugins.ts being present.`, { cause: error })
  }
}

export function getPageLastModDates() {
  const lastModMap = new Map()

  const blogFiles = glob.sync('src/content/blog/**/*.md')
  for (const file of blogFiles) {
    const content = readFileSync(file, 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (!frontmatterMatch) continue

    const frontmatter = frontmatterMatch[1]
    const updatedAtMatch = frontmatter.match(/updated_at:\s*(.+)/)
    const slugMatch = frontmatter.match(/slug:\s*(.+)/)
    if (!updatedAtMatch || !slugMatch) continue

    const slug = slugMatch[1].trim()
    const updatedAt = updatedAtMatch[1].trim()
    lastModMap.set(`/blog/${slug}`, new Date(updatedAt))
    lastModMap.set(`/blog/${slug}/`, new Date(updatedAt))
  }

  // File mtimes are the checkout time in CI, which stamped every page as modified on every deploy.
  // Search engines stop trusting lastmod once it is wrong, so pages only get one from their last commit.
  const commitDates = getPageCommitDates('src/pages')
  for (const [file, committedAt] of commitDates) {
    if (!file.endsWith('.astro')) continue
    let urlPath = file.replace('src/pages', '').replace('/index.astro', '/').replace('.astro', '/')
    if (!urlPath.endsWith('/')) urlPath += '/'
    if (!lastModMap.has(urlPath)) lastModMap.set(urlPath, committedAt)
  }

  for (const [file, committedAt] of getPageCommitDates('src/content/docs')) {
    if (!/\.mdx?$/.test(file) || !existsSync(file)) continue
    const content = readFileSync(file, 'utf8')
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
    const slug = frontmatter.match(/^slug:\s*['"]?([^'"\r\n]+)['"]?\s*$/m)?.[1]?.trim()
    const route =
      slug ??
      file
        .replace('src/content/docs/', '')
        .replace(/\.mdx?$/, '')
        .replace(/(?:^|\/)index$/, '')
    lastModMap.set(`/${route.replace(/^\/+|\/+$/g, '')}/`, committedAt)
  }

  return lastModMap
}

const GIT_BINARY_PATHS = ['/usr/bin/git', '/usr/local/bin/git', '/opt/homebrew/bin/git']

/**
 * Last commit date of every file under `directory`, keyed by its path relative to the app.
 * Returns an empty map when git history is missing or shallow, because a shallow clone
 * reports the same date for every file.
 */
export function getPageCommitDates(directory) {
  const commitDates = new Map()
  try {
    // Absolute path only: the build must not run whatever `git` happens to come first on PATH.
    const gitBinary = GIT_BINARY_PATHS.find((candidate) => existsSync(candidate))
    if (!gitBinary) return commitDates
    const git = (args) => execFileSync(gitBinary, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] })
    if (git(['rev-parse', '--is-shallow-repository']).trim() !== 'false') return commitDates

    let committedAt = null
    for (const line of git(['log', '--format=%x00%cI', '--name-only', '--relative', '--', directory]).split('\n')) {
      if (line.startsWith('\0')) committedAt = new Date(line.slice(1))
      else if (line && committedAt && !commitDates.has(line)) commitDates.set(line, committedAt)
    }
  } catch {
    return new Map()
  }
  return commitDates
}
