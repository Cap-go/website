import { execSync } from 'child_process'
import { existsSync } from 'node:fs'
import matter from 'gray-matter'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { defaultLocale, locales } from '../../src/services/locale'
import { commonReplacements } from '../commonReplacements'
import { translateText } from '../translate'

const contentDirectory = join(process.cwd(), 'src', 'content')
const blogDirectory = join(contentDirectory, 'blog')
const defaultBlogDirectory = join(blogDirectory, defaultLocale)
const localeArgIndex = process.argv.findIndex((arg) => arg.startsWith('--locale='))
const keepPushingArgIndex = process.argv.findIndex((arg) => arg === '--keep-pushing')
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
    const sourceFilePath = join(process.cwd(), 'src', 'content', 'blog', 'en', file)
    const destinationDir = join(process.cwd(), 'src', 'content', 'blog', lang)
    if (!existsSync(destinationDir)) mkdirSync(destinationDir, { recursive: true })
    const destinationPath = join(process.cwd(), 'src', 'content', 'blog', lang, file)
    const content = readFileSync(sourceFilePath, 'utf8')
    const { data: frontmatter, content: extractedContent } = matter(content)
    const newFrontmatter: Record<string, any> = { ...frontmatter, locale: lang }
    const fieldsToTranslate = ['title', 'description', 'head_image_alt']
    await Promise.all(
      fieldsToTranslate.map(async (field) => {
        if (newFrontmatter[field]) {
          const translated = await translateText(newFrontmatter[field], lang)
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
    writeFileSync(destinationPath, matter.stringify(commonReplacements(translatedContent), newFrontmatter), 'utf8')
  } catch (error) {
    console.log(`Translation failed for: ${file} in ${lang} locale.`)
    throw error
  }
}

const map = await mapUntranslatedBlogToLocales()
console.log(map)

const tasks: Array<{ file: string; lang: string }> = []
for (const [file, locales] of Object.entries(map)) {
  for (const lang of locales) {
    tasks.push({ file, lang })
  }
}

const BATCH_SIZE = 15

for (let i = 0; i < tasks.length; i += BATCH_SIZE) {
  const batch = tasks.slice(i, i + BATCH_SIZE)
  console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(tasks.length / BATCH_SIZE)}`)
  await Promise.all(batch.map(({ file, lang }) => processFile(file, lang)))

  // If --keep-pushing is set, do a git pull, add, commit, and push after each batch
  if (keepPushingArgIndex !== -1) {
    try {
      // Pull latest changes
      execSync('git pull', { stdio: 'inherit' })
      // Set git config (email and name) as in the workflow
      execSync('git config --local user.email "github-actions[bot]@users.noreply.github.com"', { stdio: 'inherit' })
      execSync('git config --local user.name "github-actions[bot]"', { stdio: 'inherit' })
      // Add all changes
      execSync('git add -A', { stdio: 'inherit' })
      // Commit
      execSync('git commit -m "chore: translate untranslated blogs"', { stdio: 'inherit' })
      // Push
      execSync('git push', { stdio: 'inherit' })
    } catch (err: any) {
      // If nothing to commit, git commit will fail, that's ok
      if (err?.status !== 1) {
        console.error('Error during git operations:', err)
        throw err
      }
    }
  }
}
