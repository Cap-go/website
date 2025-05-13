import fg from 'fast-glob'
import matter from 'gray-matter'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'path'
import { locales } from '../../src/services/locale'

const contentDirectory = path.join(process.cwd(), 'src', 'content')

const patterns = locales.map((locale) => `blog/${locale}/**/*.{md,mdx}`)
const files = await fg(patterns, {
  absolute: true,
  onlyFiles: true,
  cwd: contentDirectory,
})
let changedCount = 0
for (const filePath of files) {
  const relPath = path.relative(contentDirectory, filePath)
  const parts = relPath.split(path.sep)
  const locale = parts[1]
  if (!locales.includes(locale)) continue
  const fileContent = await readFile(filePath, 'utf8')
  const parsed = matter(fileContent)
  if (parsed.data.locale !== locale) {
    parsed.data.locale = locale
    await writeFile(filePath, matter.stringify(parsed.content, parsed.data), 'utf8')
    changedCount++
  }
}
console.log(`Checked ${files.length} files. Updated ${changedCount} files.`)
