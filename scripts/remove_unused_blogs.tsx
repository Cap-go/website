import { readdirSync, readFileSync, statSync, unlinkSync } from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const contentDirectory = join(process.cwd(), 'src', 'content', 'blog')

const removeUnusedBlogs = (directory: string) => {
  const filesAndDirs = readdirSync(directory)
  filesAndDirs.forEach((fileOrDir) => {
    const fullPath = join(directory, fileOrDir)
    const stats = statSync(fullPath)
    if (stats.isDirectory()) removeUnusedBlogs(fullPath)
    else if (stats.isFile()) {
      const content = readFileSync(fullPath, 'utf8')
      const { data: frontmatter } = matter(content)
      if (!content.trim() || Object.keys(frontmatter).length === 0) {
        console.log(`Deleting unused blog file: ${fullPath}`)
        unlinkSync(fullPath)
      }
    }
  })
}

removeUnusedBlogs(contentDirectory)
