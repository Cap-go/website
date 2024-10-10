import fs from 'fs'
import { dump, load } from 'js-yaml'
import path from 'path'
import { translateText } from './translate'

const batchSize = 100
const locales = ['fr']

const localePath = path.join(process.cwd(), 'locales', 'en.yml')

console.log('Loading data from locales/en.yml...')
const enLocaleContent = fs.readFileSync(localePath, 'utf8')
const data = load(enLocaleContent) as { [p: string]: string }

for (const lang of locales) {
  console.log(`Translating en.yml to ${lang}.yml...`)
  const newLocalePath = path.join(process.cwd(), 'locales', lang + '.yml')
  fs.writeFileSync(newLocalePath, ``, 'utf8')
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i += batchSize) {
    const batchKeys = keys.slice(i, i + batchSize)
    const translations = await Promise.all(batchKeys.map((key) => translateText(data[key], lang)))
    for (let j = 0; j < batchKeys.length; j++) {
      const tmp = { [batchKeys[j]]: translations[j] }
      fs.appendFileSync(newLocalePath, dump(tmp), 'utf8')
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  console.log(`Wrote ${lang}.yml to locales directory.`)
  console.log('Done.\n')
}
