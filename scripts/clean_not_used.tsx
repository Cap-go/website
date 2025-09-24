import fg from 'fast-glob'
import { readFileSync, unlinkSync } from 'node:fs'
import path from 'node:path'

const unusedFiles = new Set<string>()
const [publicFiles, srcFiles] = await Promise.all([
  fg(['public/**/*'], {
    dot: true,
    onlyFiles: true,
    ignore: [
      // Used with platforms
      'public/_headers',
      'public/_redirects',
      // Fonts used with astro-font
      'public/fonts/**/*',
      // Used in redirects
      'public/deepLink/**/*',
      // Used in top_y_x.astro pages
      'public/react_native.webp',
      'public/flutter.webp',
      'public/kotlin.webp',
      'public/native_script.webp',
    ],
  }),
  fg(['src/**/*', 'astro.config.mjs'], { dot: true, onlyFiles: true }),
])

const publicFileNames = publicFiles.map((file) => path.relative('public', file))
const srcFileContents = srcFiles.map((srcFile) => readFileSync(srcFile, 'utf8'))

for (const publicFileName of publicFileNames) {
  const fileName = path.basename(publicFileName)
  const isUsed = srcFileContents.some((content) => content.includes(fileName))
  if (!isUsed) unusedFiles.add(path.join('public', publicFileName))
}

for (const unusedFile of unusedFiles) {
  try {
    unlinkSync(unusedFile)
  } catch (err) {
    console.error(err)
  }
}
