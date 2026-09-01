import { appendFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve, sep } from 'node:path'
import { commonReplacements } from '../commonReplacements'

export const DEFAULT_BLOG_DIR = 'apps/web/src/content/blog/en'
export const DEFAULT_AUTHOR = 'Martin Donadieu'
export const DEFAULT_AUTHOR_IMAGE_URL = 'https://avatars.githubusercontent.com/u/4084527?v=4'
export const DEFAULT_AUTHOR_URL = 'https://github.com/riderx'
export const DEFAULT_HEAD_IMAGE = '/capgo_banner.png'

export function readTrustedImportJson(filePath: string, trustedRunnerTempFilename: string): unknown {
  const resolvedPath = resolve(filePath)
  const workspaceRoot = resolve(process.cwd())
  const runnerTemp = process.env.RUNNER_TEMP
  const trustedRunnerTempPath = runnerTemp ? resolve(runnerTemp, trustedRunnerTempFilename) : null
  const isWorkspacePath = resolvedPath === workspaceRoot || resolvedPath.startsWith(`${workspaceRoot}${sep}`)
  const isTrustedRunnerTempPath = trustedRunnerTempPath !== null && resolvedPath === trustedRunnerTempPath

  if (!isWorkspacePath && !isTrustedRunnerTempPath) {
    throw new Error(`Refusing to read path outside workspace: ${filePath}`)
  }
  if (!existsSync(resolvedPath)) {
    throw new Error(`Payload file not found: ${filePath}`)
  }
  return JSON.parse(readFileSync(resolvedPath, 'utf8'))
}

export function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function assertInsideDirectory(directory: string, filePath: string): void {
  const resolvedDirectory = resolve(directory)
  const resolvedFilePath = resolve(filePath)

  if (resolvedFilePath !== resolvedDirectory && !resolvedFilePath.startsWith(`${resolvedDirectory}${sep}`)) {
    throw new Error(`Refusing to write outside blog directory: ${filePath}`)
  }
}

export function frontmatterString(frontmatter: Record<string, unknown>, key: string): string {
  const value = frontmatter[key]
  return typeof value === 'string' ? value : ''
}

export function toDate(value: Date | string | undefined, fallback: Date): Date {
  const date = value ? new Date(value) : new Date(fallback)
  if (Number.isNaN(date.getTime())) return new Date(fallback)
  return date
}

export function firstText(content: string, maxLength = 155): string {
  const text = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}...`
}

export function removeLeadingFrontmatter(content: string): string {
  return content.replace(/^\s*---\n[\s\S]*?\n---\n+/, '')
}

export function removeDuplicateTitle(content: string, title: string): string {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return content.replace(new RegExp(`^\\s*#\\s+${escapedTitle}\\s*\\n+`, 'i'), '')
}

export function normalizeMarkdown(content: string, title: string): string {
  const normalized = removeDuplicateTitle(removeLeadingFrontmatter(content.replace(/\r\n?/g, '\n')), title)
    .replace(/https:\/\/capgo\.app\/(de|en|es|fr|id|it|ja|ko)\/(.*?)\//g, 'https://capgo.app/$2/')
    .trim()

  return `${commonReplacements(normalized)}\n`
}

export function normalizeHeadImage(imageUrl: string | undefined): string {
  if (!imageUrl) return DEFAULT_HEAD_IMAGE

  const imagePath = imageUrl.split(/[?#]/)[0]?.toLowerCase() || ''
  if (imagePath.endsWith('.webp')) return DEFAULT_HEAD_IMAGE

  return imageUrl
}

export function writeGithubOutput(files: string[], articleCount: number): void {
  if (!process.env.GITHUB_OUTPUT) return

  appendFileSync(process.env.GITHUB_OUTPUT, `article_count=${articleCount}\n`)
  appendFileSync(process.env.GITHUB_OUTPUT, 'files<<EOF\n')
  appendFileSync(process.env.GITHUB_OUTPUT, `${files.join('\n')}\n`)
  appendFileSync(process.env.GITHUB_OUTPUT, 'EOF\n')
}
