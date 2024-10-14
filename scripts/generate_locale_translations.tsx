import fs from 'fs'
import { dump, load } from 'js-yaml'
import path from 'path'
import { translateText } from './translate'

const batchSize = 200
const locales = ['fr']

const localePath = path.join(process.cwd(), 'locales', 'en.yml')

console.log(`Loading data from ${localePath}...`)
const enLocaleContent = fs.readFileSync(localePath, 'utf8')
const data = load(enLocaleContent) as { [p: string]: string }

for (const lang of locales) {
  console.log(`Translating en.yml to ${lang}.yml...`)
  const newLocalePath = path.join(process.cwd(), 'locales', lang + '.yml')
  fs.writeFileSync(newLocalePath, ``, 'utf8')
  const keys = Object.keys(data)
  const failedTranslations: { [key: string]: string } = {}
  for (let i = 0; i < keys.length; i += batchSize) {
    const batchKeys = keys.slice(i, i + batchSize)
    const translations = await Promise.all(batchKeys.map((key) => translateText(data[key], lang)))
    for (let j = 0; j < batchKeys.length; j++) {
      if (translations[j] === null) failedTranslations[batchKeys[j]] = data[batchKeys[j]]
      else {
        const tmp = { [batchKeys[j]]: translations[j] }
        fs.appendFileSync(newLocalePath, dump(tmp).replaceAll('1$', '$1'), 'utf8')
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  const failedKeys = Object.keys(failedTranslations)
  if (failedKeys.length > 0) {
    console.log(`Retrying failed translations for ${lang}.yml...`)
    for (let i = 0; i < failedKeys.length; i += batchSize) {
      const batchKeys = failedKeys.slice(i, i + batchSize)
      const translations = await Promise.all(batchKeys.map((key) => translateText(failedTranslations[key], lang)))
      for (let j = 0; j < batchKeys.length; j++) {
        if (translations[j] !== null) {
          const tmp = { [batchKeys[j]]: translations[j] }
          fs.appendFileSync(newLocalePath, dump(tmp).replaceAll('1$', '$1'), 'utf8')
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
  console.log(`Wrote ${lang}.yml to locales directory.`)
  console.log('Done.\n')
}
