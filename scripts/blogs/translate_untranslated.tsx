import { execSync } from 'child_process'
import { existsSync } from 'node:fs'
import { defaultLocale, locales } from '../../apps/web/src/services/locale'
import {
  buildBlogTranslationTasks,
  getBlogTranslationPaths,
  getDefaultBlogFiles,
  runBlogTranslationBatches,
} from './shared'

const localeArgIndex = process.argv.findIndex((arg) => arg.startsWith('--locale='))
const keepPushingArgIndex = process.argv.findIndex((arg) => arg === '--keep-pushing')
const languages = localeArgIndex !== -1 ? [process.argv[localeArgIndex].split('=')[1]] : locales.filter((lang) => lang !== defaultLocale)

const getUntranslatedLocales = async (file: string): Promise<string[]> => {
  const untranslatedLocales: string[] = []
  for (const lang of languages) {
    const { destinationPath } = getBlogTranslationPaths(file, lang)
    if (!existsSync(destinationPath)) untranslatedLocales.push(lang)
  }
  return untranslatedLocales
}

const mapUntranslatedBlogToLocales = async (): Promise<{ [file: string]: string[] }> => {
  const files = await getDefaultBlogFiles()
  const map: { [file: string]: string[] } = {}
  await Promise.all(
    files.map(async (file) => {
      const tmp = await getUntranslatedLocales(file)
      if (tmp.length > 0) map[file] = tmp
    }),
  )
  return map
}

const map = await mapUntranslatedBlogToLocales()
console.log(map)

await runBlogTranslationBatches(buildBlogTranslationTasks(map), () => {
  if (keepPushingArgIndex === -1) return

  try {
    execSync('git pull', { stdio: 'inherit' })
    execSync('git config --local user.email "github-actions[bot]@users.noreply.github.com"', { stdio: 'inherit' })
    execSync('git config --local user.name "github-actions[bot]"', { stdio: 'inherit' })
    execSync('git add -A', { stdio: 'inherit' })
    execSync('git commit -m "chore: translate untranslated blogs"', { stdio: 'inherit' })
    execSync('git push', { stdio: 'inherit' })
  } catch (err: any) {
    if (err?.status !== 1) {
      console.error('Error during git operations:', err)
      throw err
    }
  }
})
