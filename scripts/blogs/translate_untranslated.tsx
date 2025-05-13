import { existsSync } from 'fs'
import matter from 'gray-matter'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'path'
import { defaultLocale, locales } from '../../src/services/locale'
import { translateText } from '../translate'

const contentDirectory = join(process.cwd(), 'src', 'content')
const blogDirectory = join(contentDirectory, 'blog')
const defaultBlogDirectory = join(blogDirectory, defaultLocale)
const localeArgIndex = process.argv.findIndex((arg) => arg.startsWith('--locale='))
const languages = localeArgIndex !== -1 ? [process.argv[localeArgIndex].split('=')[1]] : locales.filter((lang) => lang !== defaultLocale)

const getUntranslatedLocales = async (file: string): Promise<string[]> => {
  const untranslatedLocales: string[] = []
  for (const lang of languages) {
    const langBlogDirectory = join(blogDirectory, lang)
    const destinationPath = join(langBlogDirectory, file)
    if (!existsSync(destinationPath)) untranslatedLocales.push(lang)
  }
  return untranslatedLocales
}

const getDefaultBlogFiles = async (): Promise<string[]> => {
  const files = await readdir(defaultBlogDirectory)
  return files.filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
}

const mapUntranslatedBlogToLocales = async (): Promise<{ [file: string]: string[] }> => {
  const files = await getDefaultBlogFiles()
  const map: { [file: string]: string[] } = {}
  await Promise.all(
    files.map(async (file) => {
      const tmp = await getUntranslatedLocales(file)
      if (tmp.length > 0) map[file] = tmp
    }),
  )
  return map
}

const processFile = async (file: string, lang: string): Promise<void> => {
  try {
    const sourceFilePath = join(process.cwd(), 'src', 'content', 'blog', file)
    const destinationPath = join(process.cwd(), 'src', 'content', 'blog', lang, file)
    const content = await readFile(sourceFilePath, 'utf8')
    const { data: frontmatter, content: extractedContent } = matter(content)
    const fieldsToTranslate = ['title', 'description', 'head_image_alt']
    for (const field of fieldsToTranslate) {
      if (frontmatter[field]) {
        const translated = await translateText(frontmatter[field], lang)
        if (translated) frontmatter[field] = translated
        else throw new Error(`Empty translation for ${field}`)
      }
    }
    frontmatter['locale'] = lang
    const codeBlockRegex = /```[\s\S]*?```/g
    const htmlTagRegex = /<[^>]+>/g
    const codeBlocks = [...extractedContent.matchAll(codeBlockRegex)]
    const htmlTags = [...extractedContent.matchAll(htmlTagRegex)]
    const contentWithoutCodeBlocks = extractedContent.replace(codeBlockRegex, '[[CODE_BLOCK]]')
    const contentWithoutHtmlTags = contentWithoutCodeBlocks.replace(htmlTagRegex, '[[HTML_TAG]]')
    let currentChunk = ''
    const maxChunkSize = 10000
    let translatedParts: string[] = []
    const paragraphs = contentWithoutHtmlTags.split('\n\n')
    for (const paragraph of paragraphs) {
      if ((currentChunk + paragraph).length > maxChunkSize) {
        const translated = await translateText(currentChunk, lang)
        if (translated) translatedParts.push(translated)
        else throw new Error('Empty translation')
        currentChunk = paragraph
      } else currentChunk += (currentChunk ? '\n\n' : '') + paragraph
    }
    if (currentChunk) {
      const translated = await translateText(currentChunk, lang)
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
    await writeFile(destinationPath, matter.stringify(translatedContent, frontmatter), 'utf8')
  } catch (error) {
    console.log(`Translation failed for: ${file} in ${lang} locale.`)
    throw error
  }
}

const translateBlogInAllLocales = async (file: string, locales: string[]) => {
  await Promise.all(locales.map((lang) => processFile(file, lang)))
}

const translateBlogsInAllLocales = async (): Promise<void> => {
  const map = await mapUntranslatedBlogToLocales()
  console.log(JSON.stringify(map))
  const entries = Object.entries(map)
  let processedCount = 0
  const totalCount = entries.length
  for (const [file, locales] of entries) {
    console.log(`Processing ${file} (${++processedCount}/${totalCount})`)
    await translateBlogInAllLocales(file, locales)
    console.log(`Processed ${processedCount}/${totalCount}`)
  }
}

translateBlogsInAllLocales()
