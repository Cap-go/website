import fs from 'fs'
import { dump, load } from 'js-yaml'
import path from 'path'

const newLocale = ['es', 'fr']

const localePath = path.join(process.cwd(), 'locales', 'en.yml')

const translateText = async (text: string, lang: string) => {
  const urlParams = new URLSearchParams({
    string: text,
    from_lang: 'en',
    to_lang: lang,
  })
  const response = await fetch(`https://api.datpmt.com/api/v2/dictionary/translate?${urlParams.toString()}`)
  if (response.status !== 200) {
    console.error(response.statusText)
    process.exit(1)
  }
  return await response.json()
}

console.log('Loading data from locales/en.yml...')
const enLocaleContent = fs.readFileSync(localePath, 'utf8')
const data = load(enLocaleContent) as { [p: string]: string }

for (const lang of newLocale) {
  const newData = { ...data }
  console.log(`Translating en.yml to ${lang}.yml...`)
  await Promise.all(
    Object.keys(data).map(async (key) => {
      newData[key] = await translateText(data[key], lang)
    }),
  )
  const newLocalePath = path.join(process.cwd(), 'locales', lang + '.yml')
  fs.writeFileSync(newLocalePath, dump(newData), 'utf8')
  console.log(`Wrote ${lang}.yml to locales directory.`)
  console.log('Done.\n')
}
