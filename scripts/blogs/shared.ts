import matter from 'gray-matter'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { defaultLocale } from '../../apps/web/src/services/locale'
import { commonReplacements } from '../commonReplacements'
import { translateText } from '../translate'

export const webContentDirectory = join(process.cwd(), 'apps', 'web', 'src', 'content')
export const webBlogDirectory = join(webContentDirectory, 'blog')
export const defaultBlogDirectory = join(webBlogDirectory, defaultLocale)
const frontmatterFieldsToTranslate = ['title', 'description', 'head_image_alt']
const maxChunkSize = 10000

export function getBlogTranslationPaths(file: string, locale: string) {
  return {
    sourceFilePath: join(webBlogDirectory, 'en', file),
    destinationDir: join(webBlogDirectory, locale),
    destinationPath: join(webBlogDirectory, locale, file),
  }
}

export async function getDefaultBlogFiles(): Promise<string[]> {
  const files = await readdir(defaultBlogDirectory)
  return files.filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
}

async function translateOrThrow(text: string, locale: string, errorMessage: string): Promise<string> {
  const translated = await translateText(text, locale)
  if (!translated) throw new Error(errorMessage)
  return translated
}

async function translateFrontmatter(frontmatter: Record<string, any>, locale: string): Promise<Record<string, any>> {
  const translatedFrontmatter: Record<string, any> = { ...frontmatter, locale }

  await Promise.all(
    frontmatterFieldsToTranslate.map(async (field) => {
      if (translatedFrontmatter[field]) {
        translatedFrontmatter[field] = await translateOrThrow(
          translatedFrontmatter[field],
          locale,
          `Empty translation for ${field}`,
        )
      }
    }),
  )

  return translatedFrontmatter
}

function replaceMatchesWithTokens(content: string, regex: RegExp, tokenPrefix: string) {
  const replacements: Array<[string, string]> = []

  return {
    content: content.replaceAll(regex, (match) => {
      const token = `[[${tokenPrefix}_${replacements.length}]]`
      replacements.push([token, match])
      return token
    }),
    replacements,
  }
}

function restoreProtectedContent(content: string, replacements: Array<[string, string]>): string {
  return replacements.reduce(
    (restoredContent, [token, value]) => restoredContent.replaceAll(token, value),
    content,
  )
}

async function translateContentParagraphs(content: string, locale: string): Promise<string> {
  const paragraphs = content.split('\n\n')
  const translatedParts: string[] = []
  let currentChunk = ''

  for (const paragraph of paragraphs) {
    if (currentChunk && (currentChunk + paragraph).length > maxChunkSize) {
      translatedParts.push(await translateOrThrow(currentChunk, locale, 'Empty translation'))
      currentChunk = paragraph
    } else currentChunk += (currentChunk ? '\n\n' : '') + paragraph
  }

  if (currentChunk) {
    translatedParts.push(await translateOrThrow(currentChunk, locale, 'Empty translation for final chunk'))
  }

  return translatedParts.join('\n\n')
}

async function translateMarkdownContent(content: string, locale: string): Promise<string> {
  const htmlTags = replaceMatchesWithTokens(content, /<[^>]+>/g, 'HTML_TAG')
  const codeBlocks = replaceMatchesWithTokens(htmlTags.content, /```[\s\S]*?(?:```|$)/g, 'CODE_BLOCK')
  const translatedContent = await translateContentParagraphs(codeBlocks.content, locale)
  return restoreProtectedContent(
    restoreProtectedContent(translatedContent, codeBlocks.replacements),
    htmlTags.replacements,
  )
}

export async function translateBlogFile(file: string, locale: string): Promise<void> {
  try {
    const { sourceFilePath, destinationDir, destinationPath } = getBlogTranslationPaths(file, locale)
    if (!existsSync(destinationDir)) mkdirSync(destinationDir, { recursive: true })
    const content = readFileSync(sourceFilePath, 'utf8')
    const { data: frontmatter, content: extractedContent } = matter(content)
    const newFrontmatter = await translateFrontmatter(frontmatter, locale)
    const translatedContent = await translateMarkdownContent(extractedContent, locale)
    writeFileSync(destinationPath, matter.stringify(commonReplacements(translatedContent), newFrontmatter), 'utf8')
  } catch (error) {
    console.log(`Translation failed for: ${file} in ${locale} locale.`)
    throw error
  }
}

export function buildBlogTranslationTasks(map: Record<string, string[]>): Array<{ file: string; lang: string }> {
  const tasks: Array<{ file: string; lang: string }> = []

  for (const [file, locales] of Object.entries(map)) {
    for (const lang of locales) {
      tasks.push({ file, lang })
    }
  }

  return tasks
}

export async function runBlogTranslationBatches(
  tasks: Array<{ file: string; lang: string }>,
  onBatchComplete?: (batch: Array<{ file: string; lang: string }>) => Promise<void> | void,
): Promise<void> {
  const BATCH_SIZE = 15
  const totalBatches = Math.ceil(tasks.length / BATCH_SIZE)

  for (let index = 0; index < tasks.length; index += BATCH_SIZE) {
    const batch = tasks.slice(index, index + BATCH_SIZE)
    console.log(`Processing batch ${Math.floor(index / BATCH_SIZE) + 1} of ${totalBatches}`)
    await Promise.all(batch.map(({ file, lang }) => translateBlogFile(file, lang)))
    await onBatchComplete?.(batch)
  }
}
