import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import matter from 'gray-matter'
import { createSpinner } from 'nanospinner'
import { join } from 'path'
import { defaultLocale, locales } from '../src/services/locale'
import { translateText } from './translate'

const batchSize = 20
const contentDirectory = join(process.cwd(), 'src', 'content')
const blogDirectory = join(contentDirectory, 'blog')
const localeArgIndex = process.argv.findIndex((arg) => arg.startsWith('--locale='))
const languages = localeArgIndex !== -1 ? [process.argv[localeArgIndex].split('=')[1]] : locales.filter((lang) => lang !== defaultLocale)

for (const lang of languages) {
  console.log(`Preparing the blogs for locale: ${lang}...`)
  const langBlogDirectory = join(contentDirectory, lang, 'blog')
  if (!existsSync(langBlogDirectory)) mkdirSync(langBlogDirectory, { recursive: true })
  const blogFiles = readdirSync(blogDirectory)
  const failedTranslations: { [file: string]: boolean } = {}
  const processFile = async (file: string) => {
    const filePath = join(blogDirectory, file)
    const destinationPath = join(langBlogDirectory, file)
    writeFileSync(destinationPath, '', 'utf8')
    const content = readFileSync(filePath, 'utf8')
    const grayMatterEnd = content.indexOf('---', 4)
    const { data: grayMatterJson } = matter(content)
    const spinner = createSpinner(`Translating ${file}...`).start()
    if (grayMatterJson.title) {
      const translatedTitle = await translateText(grayMatterJson.title, lang)
      if (translatedTitle) grayMatterJson['title'] = translatedTitle
      else failedTranslations[file] = true
    }
    if (grayMatterJson.description) {
      const translatedDescription = await translateText(grayMatterJson.description, lang)
      if (translatedDescription) grayMatterJson['description'] = translatedDescription
      else failedTranslations[file] = true
    }
    if (grayMatterJson.head_image_alt) {
      const translatedHeadImageAlt = await translateText(grayMatterJson.head_image_alt, lang)
      if (translatedHeadImageAlt) grayMatterJson['head_image_alt'] = translatedHeadImageAlt
      else failedTranslations[file] = true
    }
    grayMatterJson['locale'] = lang
    appendFileSync(destinationPath, matter.stringify('', grayMatterJson), 'utf8')
    const blogContent = content.substring(grayMatterEnd + 4)
    const codeBlockRegex = /```[\s\S]*?```/g
    const htmlTagRegex = /<[^>]+>/g
    const codeBlocks = [...blogContent.matchAll(codeBlockRegex)]
    const htmlTags = [...blogContent.matchAll(htmlTagRegex)]
    const blogContentWithoutCodeBlocks = blogContent.replace(codeBlockRegex, '[[CODE_BLOCK]]')
    const blogContentWithoutHtmlTags = blogContentWithoutCodeBlocks.replace(htmlTagRegex, '[[HTML_TAG]]')
    const sentences = blogContentWithoutHtmlTags.split('.')
    let currentChunk = ''
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > 4000) {
        const tmp = await translateText(currentChunk, lang)
        if (tmp) appendFileSync(destinationPath, tmp, 'utf8')
        else failedTranslations[file] = true
        currentChunk = sentence
      } else currentChunk += sentence
    }
    if (currentChunk) {
      const tmp = await translateText(currentChunk, lang)
      if (tmp) appendFileSync(destinationPath, tmp, 'utf8')
      else failedTranslations[file] = true
    }
    let translatedContent = readFileSync(destinationPath, 'utf8')
    codeBlocks.forEach((match, _) => {
      translatedContent = translatedContent.replace('[[CODE_BLOCK]]', match[0])
    })
    htmlTags.forEach((match, _) => {
      translatedContent = translatedContent.replace('[[HTML_TAG]]', match[0])
    })
    writeFileSync(destinationPath, translatedContent, 'utf8')
    spinner.success({ text: `Blog translated: ${file}` })
  }
  for (let i = 0; i < blogFiles.length; i += batchSize) {
    const batch = blogFiles.slice(i, i + batchSize)
    const promises = []
    promises.push(...batch.map((file) => processFile(file)))
    await Promise.all(promises)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  const failedFiles = Object.keys(failedTranslations)
  if (failedFiles.length > 0) {
    console.log(`Retrying failed translations for ${lang}...`)
    for (const file of failedFiles) {
      await processFile(file)
    }
  }
}
