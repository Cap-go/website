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
  const newData = { ...data }
  console.log(`Translating en.yml to ${lang}.yml...`)
  // await Promise.all(
  //   Object.entries(data).map(async ([key, value]) => {
  //     newData[key] = await translateText(value, lang)
  //   }),
  // )
  for (const key in data) {
    newData[key] = await translateText(data[key], lang)
  }
  const newLocalePath = path.join(process.cwd(), 'locales', lang + '.yml')
  fs.writeFileSync(newLocalePath, dump(newData), 'utf8')
  console.log(`Wrote ${lang}.yml to locales directory.`)
  console.log('Done.\n')
}
