import { execSync } from 'child_process'
import fg from 'fast-glob'
import fs from 'fs'
import path from 'path'
import { locales } from '../src/services/locale'

const newLocale = 'fr'

const copyDirectory = (source: string, destination: string) => {
  if (!fs.existsSync(destination)) fs.mkdirSync(destination, { recursive: true })
  const files = fg.globSync(['**/*'], { dot: true, cwd: source }).filter((file) => !locales.includes(file.split('/')[0]) && !file.includes('.json.ts'))
  files.forEach((file) => {
    const sourceFile = path.join(source, file)
    const destFile = path.join(destination, file)
    const destDir = path.dirname(destFile)
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })
    const modifiedDestFile = fs
      .readFileSync(sourceFile, 'utf8')
      .replace('content/blog', `content/${newLocale}/blog`)
      .replace('content/plugins-tutorials', `content/${newLocale}/plugins-tutorials`)
      .replace('locale: en', `locale: ${newLocale}`)
    fs.copyFileSync(sourceFile, destFile)
    fs.writeFileSync(destFile, modifiedDestFile, 'utf8')
  })
}

console.log(`Copying src/pages to src/pages/${newLocale}...`)
copyDirectory(path.join(process.cwd(), 'src', 'pages'), path.join(process.cwd(), 'src', 'pages', newLocale))
console.log(`Done.\n`)
console.log(`Copying src/content/blog to src/content/${newLocale}/blog...`)
copyDirectory(path.join(process.cwd(), 'src', 'content', 'blog'), path.join(process.cwd(), 'src', 'content', newLocale, 'blog'))
console.log(`Done.\n`)

console.log('Generating locale translations...')
execSync(`npm run generate:locale:translations -- --locale=${newLocale}`, { stdio: 'inherit' })
console.log('Generating translation.ts...')
execSync(`npm run generate:translation.ts -- --locale=${newLocale}`, { stdio: 'inherit' })
console.log('Generating blog translations...')
execSync(`npm run generate:blog:translations -- --locale=${newLocale}`, { stdio: 'inherit' })
console.log('Generating plugin translations...')
execSync(`npm run generate:plugin:translations -- --locale=${newLocale}`, { stdio: 'inherit' })
