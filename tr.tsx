import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const translations: { [k: string]: { en?: string; fr?: string } } = {}

const loadYmlFiles = (directory: string) => {
  const files = fs.readdirSync(directory)
  files.forEach((file) => {
    const fileName = file.split('.')
    if (fileName[1] === 'yml') {
      const filePath = path.join(directory, file)
      const content = fs.readFileSync(filePath, 'utf8')
      const data = yaml.load(content) as { [p: string]: string }
      Object.keys(data).forEach((key) => {
        if (translations[key]) {
          translations[key] = {
            ...translations[key],
            [fileName[0]]: data[key],
          }
        } else {
          translations[key] = {
            [fileName[0]]: data[key],
          }
        }
      })
    }
  })
}

loadYmlFiles(path.join(process.cwd(), 'locales'))

const translationFile = path.join(process.cwd(), 'src', 'services', 'translations.ts')

fs.writeFileSync(translationFile, '', 'utf8')
fs.appendFileSync(translationFile, 'const translations = ', { encoding: 'utf8' })
fs.appendFileSync(translationFile, JSON.stringify(translations), { encoding: 'utf8' })
fs.appendFileSync(translationFile, '; \nexport default translations;', { encoding: 'utf8' })
