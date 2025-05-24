import fg from 'fast-glob'
import { existsSync, unlinkSync, rmSync, statSync } from 'fs'
import { createSpinner } from 'nanospinner'
import { join, dirname } from 'path'
import { defaultLocale, locales } from '../src/services/locale'

const contentDirectory = join(process.cwd(), 'src', 'content')
const blogDirectory = join(contentDirectory, 'docs')
const languages = locales.filter((lang) => lang !== defaultLocale)
const defaultBlogDirectory = join(blogDirectory, 'docs')

const isDirectoryEmpty = (dirPath: string): boolean => {
  try {
    const files = fg.globSync(['**/*'], { dot: true, cwd: dirPath })
    return files.length === 0
  } catch {
    return true
  }
}

const removeEmptyDirectories = (dirPath: string): void => {
  try {
    if (existsSync(dirPath) && statSync(dirPath).isDirectory() && isDirectoryEmpty(dirPath)) {
      rmSync(dirPath, { recursive: true, force: true })
      const parentDir = dirname(dirPath)
      if (parentDir !== dirPath) removeEmptyDirectories(parentDir)
    }
  } catch {}
}

const cleanupTranslations = async () => {
  console.log(`Starting cleanup for ${languages.length} languages`)
  
  for (const lang of languages) {
    const langBlogDirectory = join(blogDirectory, lang)
    const langDocsDirectory = join(langBlogDirectory, 'docs')
    
    if (!existsSync(langDocsDirectory)) {
      console.log(`No translations found for ${lang}, skipping...`)
      continue
    }
    
    const spinner = createSpinner(`Cleaning up ${lang} translations...`).start()
    
    try {
      const translatedFiles = fg.globSync(['**/*.md*'], { dot: true, cwd: langDocsDirectory })
      let deletedCount = 0
      
      for (const file of translatedFiles) {
        const originalFilePath = join(defaultBlogDirectory, file)
        const translatedFilePath = join(langDocsDirectory, file)
        
        if (!existsSync(originalFilePath)) {
          unlinkSync(translatedFilePath)
          deletedCount++
          console.log(`Deleted orphaned translation: ${lang}/docs/${file}`)
          
          // Clean up empty directories
          const fileDir = dirname(translatedFilePath)
          removeEmptyDirectories(fileDir)
        }
      }
      
      spinner.success({ text: `Cleaned up ${lang}: ${deletedCount} orphaned files deleted` })
    } catch (error) {
      spinner.error({ text: `Failed to cleanup ${lang}: ${error}` })
    }
  }
  
  console.log('Cleanup completed')
}

cleanupTranslations()
