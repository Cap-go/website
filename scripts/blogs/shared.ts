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

export async function translateBlogFile(file: string, locale: string): Promise<void> {
  try {
    const { sourceFilePath, destinationDir, destinationPath } = getBlogTranslationPaths(file, locale)
    if (!existsSync(destinationDir)) mkdirSync(destinationDir, { recursive: true })
    const content = readFileSync(sourceFilePath, 'utf8')
    const { data: frontmatter, content: extractedContent } = matter(content)
    const newFrontmatter: Record<string, any> = { ...frontmatter, locale }
    const fieldsToTranslate = ['title', 'description', 'head_image_alt']

    await Promise.all(
      fieldsToTranslate.map(async (field) => {
        if (newFrontmatter[field]) {
          const translated = await translateText(newFrontmatter[field], locale)
          if (translated) newFrontmatter[field] = translated
          else throw new Error(`Empty translation for ${field}`)
        }
      }),
    )

    const codeBlockRegex = /```[\s\S]*?```/g
    const htmlTagRegex = /<[^>]+>/g
    const codeBlocks = [...extractedContent.matchAll(codeBlockRegex)]
    const htmlTags = [...extractedContent.matchAll(htmlTagRegex)]
    const contentWithoutCodeBlocks = extractedContent.replace(codeBlockRegex, '[[CODE_BLOCK]]')
    const contentWithoutHtmlTags = contentWithoutCodeBlocks.replace(htmlTagRegex, '[[HTML_TAG]]')
    const paragraphs = contentWithoutHtmlTags.split('\n\n')
    const translatedParts: string[] = []
    const maxChunkSize = 10000
    let currentChunk = ''

    for (const paragraph of paragraphs) {
      if ((currentChunk + paragraph).length > maxChunkSize) {
        const translated = await translateText(currentChunk, locale)
        if (translated) translatedParts.push(translated)
        else throw new Error('Empty translation')
        currentChunk = paragraph
      } else currentChunk += (currentChunk ? '\n\n' : '') + paragraph
    }

    if (currentChunk) {
      const translated = await translateText(currentChunk, locale)
      if (translated) translatedParts.push(translated)
      else throw new Error('Empty translation for final chunk')
    }

    let translatedContent = translatedParts.join('\n\n')
    codeBlocks.forEach((match) => {
      translatedContent = translatedContent.replace('[[CODE_BLOCK]]', match[0])
    })
    htmlTags.forEach((match) => {
      translatedContent = translatedContent.replace('[[HTML_TAG]]', match[0])
    })

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
