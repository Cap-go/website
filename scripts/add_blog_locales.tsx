import { readdirSync, readFileSync, writeFileSync } from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const contentDirectory = join(process.cwd(), 'src', 'content')
const blogDirectory = join(contentDirectory, 'blog')
const lang = 'en'

const blogFiles = readdirSync(blogDirectory)
const batchSize = blogFiles.length

const processFile = async (file: string) => {
  const filePath = join(blogDirectory, file)
  const destinationPath = filePath
  const content = readFileSync(filePath, 'utf8')
  const { data: grayMatterJson, content: translatedContent } = matter(content)
  grayMatterJson['locale'] = lang
  writeFileSync(destinationPath, matter.stringify(translatedContent, grayMatterJson), 'utf8')
}

for (let i = 0; i < blogFiles.length; i += batchSize) {
  const batch = blogFiles.slice(i, i + batchSize)
  const promises = []
  promises.push(...batch.map((file) => processFile(file)))
  await Promise.all(promises)
}
