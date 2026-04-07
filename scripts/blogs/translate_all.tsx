import { defaultLocale, locales } from '../../apps/web/src/services/locale'
import { buildBlogTranslationTasks, getDefaultBlogFiles, runBlogTranslationBatches } from './shared'

const localeArgIndex = process.argv.findIndex((arg) => arg.startsWith('--locale='))
const languages = localeArgIndex !== -1 ? [process.argv[localeArgIndex].split('=')[1]] : locales.filter((lang) => lang !== defaultLocale)

const mapUntranslatedBlogToLocales = async (): Promise<{ [file: string]: string[] }> => {
  const files = await getDefaultBlogFiles()
  const map: { [file: string]: string[] } = {}
  files.forEach((file) => {
    map[file] = languages
  })
  return map
}

const map = await mapUntranslatedBlogToLocales()
console.log(map)

await runBlogTranslationBatches(buildBlogTranslationTasks(map))
