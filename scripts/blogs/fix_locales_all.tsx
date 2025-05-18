import fg from 'fast-glob'
import matter from 'gray-matter'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'path'
import { locales } from '../../src/services/locale'
import { commonReplacements } from '../commonReplacements'

const contentDirectory = path.join(process.cwd(), 'src', 'content')

const patterns = locales.map((locale) => `**/${locale}/**/*.{md,mdx}`)
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
  let fileContent = await readFile(filePath, 'utf8')
  const parsed = matter(fileContent)
  if (parsed.data.locale !== locale) {
    parsed.data.locale = locale
    fileContent = matter.stringify(parsed.content, parsed.data)
    changedCount++
  }
  await writeFile(filePath, commonReplacements(fileContent), 'utf8')
}
console.log(`Checked ${files.length} files. Updated ${changedCount} files.`)
