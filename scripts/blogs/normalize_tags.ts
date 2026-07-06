import matter from 'gray-matter'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { normalizeBlogTags } from '../../apps/web/src/constants/blogTags'

const blogDirectory = process.env.OUTRANK_BLOG_DIR || 'apps/web/src/content/blog/en'

function main(): void {
  const files = readdirSync(blogDirectory).filter((file) => file.endsWith('.md'))
  let changed = 0

  for (const file of files) {
    const filePath = join(blogDirectory, file)
    const content = readFileSync(filePath, 'utf8')
    const { data, content: body } = matter(content)
    const rawTags = String(data.tag ?? '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
    const title = typeof data.title === 'string' ? data.title : ''
    const keywords = typeof data.keywords === 'string' ? data.keywords : ''
    const tag = normalizeBlogTags(rawTags, title, keywords)

    if (tag === data.tag) continue

    writeFileSync(filePath, matter.stringify(body, { ...data, tag }), 'utf8')
    console.log(`${file}: ${data.tag} -> ${tag}`)
    changed++
  }

  console.log(`Updated ${changed} file(s).`)
}

main()
