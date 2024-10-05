import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const newLocale = 'es'

const copyDirectory = (source: string, destination: string) => {
  if (!fs.existsSync(destination)) fs.mkdirSync(destination, { recursive: true })
  const files = fs.readdirSync(source)
  files.forEach((file) => {
    const sourceFile = path.join(source, file)
    const destFile = path.join(destination, file)
    const stats = fs.statSync(sourceFile)
    if (stats.isDirectory()) copyDirectory(sourceFile, destFile)
    else {
      console.log(`Replacing /fr/blog/ with /${newLocale}/blog/ in ${destFile}...`)
      const modifiedDestFile = fs.readFileSync(sourceFile, 'utf8').replace('/fr/blog/', `/${newLocale}/blog/`)
      fs.copyFileSync(sourceFile, destFile)
      fs.writeFileSync(destFile, modifiedDestFile, 'utf8')
    }
  })
}

console.log(`Copying src/pages/fr to src/pages/${newLocale}...`)
copyDirectory(path.join(process.cwd(), 'src', 'pages', 'fr'), path.join(process.cwd(), 'src', 'pages', newLocale))
console.log(`Done.\n`)
console.log(`Copying src/content/blog to src/content/${newLocale}/blog...`)
copyDirectory(path.join(process.cwd(), 'src', 'content', 'blog'), path.join(process.cwd(), 'src', 'content', newLocale, 'blog'))
console.log(`Done.\n`)

execSync('npm run generate:locale:translations')
execSync('npm run generate:translation.ts')
execSync('npm run generate:blog:translations')
