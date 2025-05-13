import fg from 'fast-glob'
import { promises as fs } from 'fs'
import path from 'path'

const CONTENT_DIR = path.join('src', 'content')

async function fixMarkdownLanguagesInFile(filePath: string) {
  let content = await fs.readFile(filePath, 'utf8')
  let updated = content
  // Replace ```gradle with ```kotlin
  updated = updated.replace(/```gradle(\r?\n)/g, '```kotlin$1')
  // Replace ```env with ```
  updated = updated.replace(/```env(\r?\n)/g, '```$1')
  // Replace ```proguard with ```java
  updated = updated.replace(/```proguard(\r?\n)/g, '```java$1')
  if (updated !== content) {
    await fs.writeFile(filePath, updated, 'utf8')
    console.log(`Fixed: ${filePath}`)
  }
}

async function main() {
  const files = await fg(['**/*.md', '**/*.mdx'], { cwd: CONTENT_DIR, absolute: true })
  for (let i = 0; i < files.length; i += 100) {
    const batch = files.slice(i, i + 100)
    await Promise.all(batch.map((file) => fixMarkdownLanguagesInFile(file)))
  }
}

main()
