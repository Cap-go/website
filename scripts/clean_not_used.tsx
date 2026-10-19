import fg from 'fast-glob'
import { readFileSync, unlinkSync } from 'node:fs'
import path from 'node:path'

const unusedFiles = new Set<string>()
const [publicFiles, srcFiles] = await Promise.all([
  fg(['apps/web/public/**/*'], {
    dot: true,
    onlyFiles: true,
    ignore: [
      // Used with platforms
      'apps/web/public/_headers',
      'apps/web/public/_redirects',
      // Fonts used with astro-font
      'apps/web/public/fonts/**/*',
      // Used in redirects
      'apps/web/public/deepLink/**/*',
      // Used in top_y_x.astro pages
      'apps/web/public/react_native.webp',
      'apps/web/public/flutter.webp',
      'apps/web/public/kotlin.webp',
      'apps/web/public/native_script.webp',
    ],
  }),
  fg(['apps/web/src/**/*', 'apps/docs/src/**/*', 'apps/web/astro.config.mjs', 'apps/docs/astro.config.mjs'], { dot: true, onlyFiles: true }),
])

const publicFileNames = publicFiles.map((file) => path.relative('apps/web/public', file))
const srcFileContents = srcFiles.map((srcFile) => readFileSync(srcFile, 'utf8'))

for (const publicFileName of publicFileNames) {
  const fileName = path.basename(publicFileName)
  const isUsed = srcFileContents.some((content) => content.includes(fileName))
  if (!isUsed) unusedFiles.add(path.join('apps/web/public', publicFileName))
}

for (const unusedFile of unusedFiles) {
  try {
    unlinkSync(unusedFile)
  } catch (err) {
    console.error(err)
  }
}
