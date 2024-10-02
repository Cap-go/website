import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { defaultLocale, locales } from './src/services/locale'
import { translateText } from './translate'

const languages = locales.filter((lang) => lang !== defaultLocale)
const contentDirectory = join(process.cwd(), 'src', 'content')
const blogDirectory = join(contentDirectory, 'blog')

for (const lang of languages) {
  console.log(`Preparing the blogs for locale: ${lang}...`)
  const langBlogDirectory = join(contentDirectory, lang, 'blog')
  if (!existsSync(langBlogDirectory)) mkdirSync(langBlogDirectory, { recursive: true })
  const blogFiles = readdirSync(blogDirectory)
  for (const file of blogFiles) {
    const filePath = join(blogDirectory, file)
    const destinationPath = join(langBlogDirectory, file)
    writeFileSync(destinationPath, '', 'utf8')
    const content = readFileSync(filePath, 'utf8')
    const grayMatterEnd = content.indexOf('---', 4)
    const { data: grayMatterJson } = matter(content)
    if (grayMatterJson.title) {
      const translatedTitle = await translateText(grayMatterJson.title, lang)
      if (translatedTitle) grayMatterJson['title'] = translatedTitle
    }
    if (grayMatterJson.description) {
      const translatedTitle = await translateText(grayMatterJson.description, lang)
      if (translatedTitle) grayMatterJson['description'] = translatedTitle
    }
    grayMatterJson['locale'] = lang
    appendFileSync(destinationPath, matter.stringify('', grayMatterJson), 'utf8')
    const blogContent = content.substring(grayMatterEnd + 4)
    const codeBlockRegex = /```[\s\S]*?```/g
    const codeBlocks = [...blogContent.matchAll(codeBlockRegex)]
    const blogContentWithoutCodeBlocks = blogContent.replace(codeBlockRegex, '[[CODE_BLOCK]]')
    const sentences = blogContentWithoutCodeBlocks.split('.')
    let currentChunk = ''
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > 4000) {
        const tmp = await translateText(currentChunk, lang)
        if (tmp) appendFileSync(destinationPath, tmp, 'utf8')
        currentChunk = sentence
      } else currentChunk += sentence
    }
    if (currentChunk) {
      const tmp = await translateText(currentChunk, lang)
      if (tmp) appendFileSync(destinationPath, tmp, 'utf8')
    }
    let translatedContent = await readFileSync(destinationPath, 'utf8')
    codeBlocks.forEach((match, _) => {
      translatedContent = translatedContent.replace('[[CODE_BLOCK]]', match[0])
    })
    writeFileSync(destinationPath, translatedContent, 'utf8')
    console.log(`Blog translated: ${file}`)
  }
}
