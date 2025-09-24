import fg from 'fast-glob'
import { readFileSync, unlinkSync } from 'node:fs'
import matter from 'gray-matter'

const blogFiles = fg.sync(['src/content/blog/**/*.md*'], { dot: true, absolute: true })
let changedCount = 0
for (const filePath of blogFiles) {
  const content = readFileSync(filePath, 'utf8')
  const { data: frontmatter } = matter(content)
  if (!content.trim() || Object.keys(frontmatter).length === 0) {
    unlinkSync(filePath)
    changedCount++
  }
}
console.log(`Checked ${blogFiles.length} files. Deleted ${changedCount} files.`)
