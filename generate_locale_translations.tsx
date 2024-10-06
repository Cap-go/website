import fs from 'fs'
import { dump, load } from 'js-yaml'
import path from 'path'
import { translateText } from './translate'

const locales = ['fr']

const localePath = path.join(process.cwd(), 'locales', 'en.yml')

console.log('Loading data from locales/en.yml...')
const enLocaleContent = fs.readFileSync(localePath, 'utf8')
const data = load(enLocaleContent) as { [p: string]: string }

for (const lang of locales) {
  console.log(`Translating en.yml to ${lang}.yml...`)
  const newLocalePath = path.join(process.cwd(), 'locales', lang + '.yml')
  fs.writeFileSync(newLocalePath, ``, 'utf8')
  for (const key in data) {
    const tmp: any = {}
    tmp[key] = await translateText(data[key], lang)
    fs.appendFileSync(newLocalePath, dump(tmp), 'utf8')
  }
  console.log(`Wrote ${lang}.yml to locales directory.`)
  console.log('Done.\n')
}
