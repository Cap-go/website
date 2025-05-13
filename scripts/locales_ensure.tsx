import fg from 'fast-glob'
import { readFile, writeFile } from 'node:fs/promises'
import matter from 'gray-matter'
import path from 'path'
import { locales } from '../src/services/locale'

const contentDirectory = path.join(process.cwd(), 'src', 'content')

// Find all .md and .mdx files in all locale subdirectories of blog
async function ensureLocaleFrontmatter() {
  // Build glob patterns for all locales
  const patterns = locales.map(
    (locale) => `blog/${locale}/**/*.{md,mdx}`
  )
  // Use fast-glob to get all files
  const files = await fg(patterns, {
    cwd: contentDirectory,
    onlyFiles: true,
    absolute: true,
  })

  let changedCount = 0

  for (const filePath of files) {
    // Extract the locale from the path: blog/<locale>/...
    // e.g. /.../src/content/blog/ko/somefile.md
    const relPath = path.relative(contentDirectory, filePath)
    const parts = relPath.split(path.sep)
    const locale = parts[1] // blog/<locale>/...

    if (!locales.includes(locale)) {
      // Not a known locale, skip
      continue
    }

    const fileContent = await readFile(filePath, 'utf8')
    const parsed = matter(fileContent)
    if (parsed.data.locale !== locale) {
      parsed.data.locale = locale
      await writeFile(filePath, matter.stringify(parsed.content, parsed.data), 'utf8')
      changedCount++
    }
  }

  console.log(`Checked ${files.length} files. Updated ${changedCount} files.`)
}

ensureLocaleFrontmatter()
