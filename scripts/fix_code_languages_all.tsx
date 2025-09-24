import fg from 'fast-glob'
import { promises as fs } from 'node:fs'
import { commonReplacements } from './commonReplacements'

const files = await fg(['src/content/**/*.md*'], { absolute: true, onlyFiles: true })
let changedCount = 0
for (const filePath of files) {
  let content = await fs.readFile(filePath, 'utf8')
  let updated = commonReplacements(
    content
      .replace(/```gradle(\r?\n)/g, '```kotlin$1')
      .replace(/```env(\r?\n)/g, '```$1')
      .replace(/```proguard(\r?\n)/g, '```java$1'),
  )
  if (updated !== content) {
    changedCount++
    await fs.writeFile(filePath, updated, 'utf8')
  }
}
console.log(`Checked ${files.length} files. Updated ${changedCount} files.`)
