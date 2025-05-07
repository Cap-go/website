import fg from 'fast-glob'
import fs from 'fs/promises'
import LinkifyIt from 'linkify-it'

const linkify = new LinkifyIt()

async function extractImageUrlsFromDir() {
  const allUrls = []
  const filePaths = await fg([`./src/**/*`], {
    dot: true,
    onlyFiles: true,
    ignore: ['**/node_modules/**', '**/.git/**'],
  })
  for (const filePath of filePaths) {
    try {
      const content = await fs.readFile(filePath, 'utf8')
      const links = linkify.match(content) || []
      const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.avif']
      for (const { url } of links) {
        try {
          const tmp = new URL(url)
          if (imageExtensions.some((ext) => tmp.pathname.toLowerCase().endsWith(ext))) allUrls.push(url)
        } catch {}
      }
    } catch (e) {
      continue
    }
  }
  return allUrls
}

async function checkImagesInSrcFolder() {
  try {
    const imageUrls = await extractImageUrlsFromDir()
    const batchSize = 200
    console.log('Total links to check:', imageUrls.length)
    for (let i = 0; i < imageUrls.length; i += batchSize) {
      const batch = imageUrls.slice(i, i + batchSize)
      const batchPromises = batch.map(async (url) => {
        try {
          const res = await fetch(url, { method: 'HEAD' })
          if (res.status >= 400) console.log(url)
        } catch (err) {
          console.log(url)
        }
      })
      await Promise.all(batchPromises)
    }
  } catch (error) {
    console.error('Error processing images:', error)
  }
}

checkImagesInSrcFolder()
