import matter from 'gray-matter'
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve, sep } from 'node:path'
import { commonReplacements } from '../commonReplacements'
import { normalizeBlogTags } from '../../apps/web/src/constants/blogTags'

const DEFAULT_BLOG_DIR = 'apps/web/src/content/blog/en'
const DEFAULT_AUTHOR = 'Martin Donadieu'
const DEFAULT_AUTHOR_IMAGE_URL = 'https://avatars.githubusercontent.com/u/4084527?v=4'
const DEFAULT_AUTHOR_URL = 'https://github.com/riderx'
const DEFAULT_HEAD_IMAGE = '/capgo_banner.png'
const IMPORTED_FILES_PATH = '.outrank-imported-files'

interface OutrankArticle {
  id?: string
  title?: string
  content_markdown?: string
  content_html?: string
  meta_description?: string
  created_at?: string
  image_url?: string
  slug?: string
  tags?: unknown[]
}

interface OutrankPayload {
  event_type?: string
  timestamp?: string
  data?: {
    article?: OutrankArticle
    articles?: OutrankArticle[]
  }
}

const SUPPORTED_OUTRANK_EVENT_TYPES = new Set(['publish_articles', 'update_article'])

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function payloadFromGithubEvent(event: any): OutrankPayload {
  if (typeof event?.inputs?.payload === 'string') return JSON.parse(event.inputs.payload)
  if (event?.client_payload?.event_type) return event.client_payload
  if (event?.event_type) return event
  throw new Error('No Outrank payload found. Pass a payload file or dispatch client_payload.')
}

function loadPayload(): OutrankPayload {
  const inputPath = process.argv[2]
  if (inputPath) return readJson(inputPath) as OutrankPayload

  if (!process.env.GITHUB_EVENT_PATH) {
    throw new Error('GITHUB_EVENT_PATH is missing. Pass the Outrank payload file path as the first argument.')
  }

  return payloadFromGithubEvent(readJson(process.env.GITHUB_EVENT_PATH))
}

function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function assertInsideDirectory(directory: string, filePath: string): void {
  const resolvedDirectory = resolve(directory)
  const resolvedFilePath = resolve(filePath)

  if (resolvedFilePath !== resolvedDirectory && !resolvedFilePath.startsWith(`${resolvedDirectory}${sep}`)) {
    throw new Error(`Refusing to write outside blog directory: ${filePath}`)
  }
}

function isSupportedEventType(eventType: string | undefined): boolean {
  return typeof eventType === 'string' && SUPPORTED_OUTRANK_EVENT_TYPES.has(eventType)
}

function payloadArticles(payload: OutrankPayload): OutrankArticle[] {
  if (Array.isArray(payload.data?.articles)) return payload.data.articles
  if (payload.data?.article) return [payload.data.article]
  return []
}

function frontmatterString(frontmatter: Record<string, unknown>, key: string): string {
  const value = frontmatter[key]
  return typeof value === 'string' ? value : ''
}

function toDate(value: Date | string | undefined, fallback: Date): Date {
  const date = value ? new Date(value) : new Date(fallback)
  if (Number.isNaN(date.getTime())) return new Date(fallback)
  return date
}

function firstText(content: string, maxLength = 155): string {
  const text = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}...`
}

function removeLeadingFrontmatter(content: string): string {
  return content.replace(/^\s*---\n[\s\S]*?\n---\n+/, '')
}

function removeDuplicateTitle(content: string, title: string): string {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return content.replace(new RegExp(`^\\s*#\\s+${escapedTitle}\\s*\\n+`, 'i'), '')
}

function normalizeMarkdown(content: string, title: string): string {
  const normalized = removeDuplicateTitle(removeLeadingFrontmatter(content.replace(/\r\n?/g, '\n')), title)
    .replace(/https:\/\/capgo\.app\/(de|en|es|fr|id|it|ja|ko)\/(.*?)\//g, 'https://capgo.app/$2/')
    .trim()

  return `${commonReplacements(normalized)}\n`
}

function normalizeHeadImage(imageUrl: string | undefined): string {
  if (!imageUrl) return DEFAULT_HEAD_IMAGE

  const imagePath = imageUrl.split(/[?#]/)[0]?.toLowerCase() || ''
  if (imagePath.endsWith('.webp')) return DEFAULT_HEAD_IMAGE

  return imageUrl
}

function writeGithubOutput(files: string[], articleCount: number): void {
  if (!process.env.GITHUB_OUTPUT) return

  appendFileSync(process.env.GITHUB_OUTPUT, `article_count=${articleCount}\n`)
  appendFileSync(process.env.GITHUB_OUTPUT, 'files<<EOF\n')
  appendFileSync(process.env.GITHUB_OUTPUT, `${files.join('\n')}\n`)
  appendFileSync(process.env.GITHUB_OUTPUT, 'EOF\n')
}

function writeArticle(article: OutrankArticle, payloadTimestamp: Date, blogDirectory: string): string {
  const title = article.title?.trim()
  if (!title) throw new Error(`Outrank article is missing title: ${JSON.stringify(article)}`)
  if (!article.content_markdown?.trim()) throw new Error(`Outrank article "${title}" is missing content_markdown.`)

  const slug = toSlug(article.slug || title || article.id || '')
  if (!slug) throw new Error(`Outrank article "${title}" does not have a usable slug.`)

  const filePath = join(blogDirectory, `${slug}.md`)
  assertInsideDirectory(blogDirectory, filePath)

  const existingContent = existsSync(filePath) ? readFileSync(filePath, 'utf8') : ''
  const existingFrontmatter = existingContent ? (matter(existingContent).data as Record<string, unknown>) : {}
  const existingTag = frontmatterString(existingFrontmatter, 'tag')
  const existingKeywords = frontmatterString(existingFrontmatter, 'keywords')
  const tags = Array.isArray(article.tags)
    ? article.tags
        .filter((tag): tag is string => typeof tag === 'string')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : existingTag
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
  const markdown = normalizeMarkdown(article.content_markdown, title)
  const createdAt = toDate(article.created_at, toDate(existingFrontmatter.created_at as Date | string | undefined, payloadTimestamp))
  const updatedAt = new Date(payloadTimestamp)
  const keywords = Array.isArray(article.tags) ? tags.join(', ') : existingKeywords || tags.join(', ')
  const tag = normalizeBlogTags(tags, title, keywords || article.meta_description?.trim() || '')
  const headImage = article.image_url ? normalizeHeadImage(article.image_url) : frontmatterString(existingFrontmatter, 'head_image') || DEFAULT_HEAD_IMAGE
  
  const frontmatter = {
    slug,
    title,
    description: article.meta_description?.trim() || firstText(markdown),
    author: process.env.OUTRANK_BLOG_AUTHOR || DEFAULT_AUTHOR,
    author_image_url: process.env.OUTRANK_BLOG_AUTHOR_IMAGE_URL || DEFAULT_AUTHOR_IMAGE_URL,
    author_url: process.env.OUTRANK_BLOG_AUTHOR_URL || DEFAULT_AUTHOR_URL,
    created_at: createdAt,
    updated_at: updatedAt,
    head_image: headImage,
    head_image_alt: title,
    keywords,
    tag,
    published: true,
    locale: 'en',
    next_blog: '',
  }

  const content = matter.stringify(markdown, frontmatter, { lineWidth: -1 })
  if (existingContent === content) return ''

  writeFileSync(filePath, content, 'utf8')
  return filePath
}

function main(): void {
  const payload = loadPayload()
  if (!isSupportedEventType(payload.event_type)) {
    throw new Error(`Unsupported Outrank event_type "${payload.event_type}". Expected one of: ${Array.from(SUPPORTED_OUTRANK_EVENT_TYPES).join(', ')}.`)
  }

  const articles = payloadArticles(payload)
  if (articles.length === 0) throw new Error('Outrank payload does not contain any articles.')

  const payloadTimestamp = toDate(payload.timestamp, new Date())
  const blogDirectory = process.env.OUTRANK_BLOG_DIR || DEFAULT_BLOG_DIR

  if (!existsSync(blogDirectory)) mkdirSync(blogDirectory, { recursive: true })

  const writtenFiles = articles.map((article) => writeArticle(article, payloadTimestamp, blogDirectory)).filter(Boolean)
  writeFileSync(IMPORTED_FILES_PATH, writtenFiles.join('\n') + (writtenFiles.length ? '\n' : ''), 'utf8')
  writeGithubOutput(writtenFiles, articles.length)

  console.log(`Processed ${articles.length} Outrank article(s).`)
  console.log(`Changed ${writtenFiles.length} file(s).`)
}

main()
