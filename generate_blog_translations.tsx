import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { locales } from './src/services/locale'

const languages = locales.filter((lang) => lang !== 'en')
const contentDirectory = join(process.cwd(), 'src', 'content')
const blogDirectory = join(contentDirectory, 'blog')

const translateBlogFiles = async () => {
  const translationPromises = languages.map(async (lang) => {
    const langBlogDirectory = join(contentDirectory, lang, 'blog')
    if (!existsSync(langBlogDirectory)) mkdirSync(langBlogDirectory)
    const blogFiles = readdirSync(blogDirectory)
    for (const file of blogFiles) {
      const filePath = join(blogDirectory, file)
      const destinationPath = join(langBlogDirectory, file)
      writeFileSync(destinationPath, '', 'utf8')
      const content = readFileSync(filePath, 'utf8')
      const grayMatterEnd = content.indexOf('---', 4)
      const { data: grayMatterJson } = matter(content);
      if (grayMatterJson.title) {
        const translatedTitle = await translateText(grayMatterJson.title, lang)
        if (translatedTitle) grayMatterJson['title'] = translatedTitle
      }
      if (grayMatterJson.description) {
        const translatedTitle = await translateText(grayMatterJson.description, lang)
        if (translatedTitle) grayMatterJson['description'] = translatedTitle
      }
      appendFileSync(destinationPath, matter.stringify('', grayMatterJson), 'utf8')
      const blogContent = content.substring(grayMatterEnd + 4)
      const codeBlockRegex = /```[\s\S]*?```/g;
      const codeBlocks = [...blogContent.matchAll(codeBlockRegex)];
      const blogContentWithoutCodeBlocks = blogContent.replace(codeBlockRegex, '[[CODE_BLOCK]]');
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
      let translatedContent = await readFileSync(destinationPath, 'utf8');
      codeBlocks.forEach((match, index) => {
        translatedContent = translatedContent.replace('[[CODE_BLOCK]]', match[0]);
      });
      writeFileSync(destinationPath, translatedContent, 'utf8');
    }
  })
  await Promise.all(translationPromises)
}

const translateText = async (text: string, lang: string) => {
  const urlParams = new URLSearchParams({
    string: text,
    from_lang: 'en',
    to_lang: lang,
  })
  const response = await fetch(`https://api.datpmt.com/api/v2/dictionary/translate?${urlParams.toString()}`)
  if (response.status !== 200) {
    console.error(response.statusText)
    process.exit(1)
  }
  return await response.json()
}

translateBlogFiles()
