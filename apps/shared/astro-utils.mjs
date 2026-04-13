import { glob } from 'glob'
import { readFileSync, statSync } from 'node:fs'
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
    const shouldInsertDash = index > 0
      && (
        (isUpperCase(currentCharacter) && (isLowerCase(previousCharacter) || isDigit(previousCharacter)))
        || (isUpperCase(currentCharacter) && isUpperCase(previousCharacter) && isLowerCase(nextCharacter))
        || (isDigit(currentCharacter) && isLetter(previousCharacter))
        || (isLetter(currentCharacter) && isDigit(previousCharacter))
      )

    if (shouldInsertDash) normalizedValue += '-'
    normalizedValue += currentCharacter.toLowerCase()
  }

  return `${normalizedValue}-solid`
}

export function buildPluginIcons(configPath) {
  try {
    const configSource = readFileSync(configPath, 'utf8')
    const iconMatches = [
      ...configSource.matchAll(/icon:\s*'([^']+)'/g),
      ...configSource.matchAll(/'[^']+':\s*'([^']+)'/g),
    ]
    const iconNames = iconMatches.map(([, iconName]) => toHeroiconName(iconName))
    return [...new Set(['arrow-up-right-solid', ...iconNames])].sort((left, right) => left.localeCompare(right))
  } catch (error) {
    throw new Error(
      `Failed to read plugin config at ${configPath}. This build depends on apps/web/src/config/plugins.ts being present.`,
      { cause: error },
    )
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

  const pageFiles = glob.sync('src/pages/**/*.astro')
  for (const file of pageFiles) {
    const stat = statSync(file)
    let urlPath = file.replace('src/pages', '').replace('/index.astro', '/').replace('.astro', '/')
    if (!urlPath.endsWith('/')) urlPath += '/'
    if (!lastModMap.has(urlPath)) {
      lastModMap.set(urlPath, stat.mtime)
    }
  }

  return lastModMap
}
