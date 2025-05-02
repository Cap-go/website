import { existsSync, mkdirSync } from 'fs'
import matter from 'gray-matter'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'path'
import { defaultLocale, locales } from '../src/services/locale'
import { translateText } from './translate'

const contentDirectory = join(process.cwd(), 'src', 'content')
const blogDirectory = join(contentDirectory, 'blog')
const localeArgIndex = process.argv.findIndex((arg) => arg.startsWith('--locale='))
const languages = localeArgIndex !== -1 ? [process.argv[localeArgIndex].split('=')[1]] : locales.filter((lang) => lang !== defaultLocale)

const defaultBlogDirectory = join(blogDirectory, defaultLocale)
let blogFiles: string[] = []
let totalFiles = 0
const progress: { [lang: string]: number } = {}

// Process languages in batches to avoid API rate limits
const processAllLanguages = async () => {
  blogFiles = await readdir(defaultBlogDirectory)
  // Filter out non-markdown files
  blogFiles = blogFiles.filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
  totalFiles = blogFiles.length

  console.log(`Starting translation of ${totalFiles} files for ${languages.length} languages`)

  // Process languages in smaller batches (2 languages at a time)
  const languageChunks = chunkArray(languages, 2)

  for (const langChunk of languageChunks) {
    const languagePromises = langChunk.map(async (lang) => {
      console.log(`Preparing the blogs for locale: ${lang}...`)
      progress[lang] = 0
      const langBlogDirectory = join(blogDirectory, lang)
      if (!existsSync(langBlogDirectory)) mkdirSync(langBlogDirectory, { recursive: true })

      // Track failed translations for retry
      const failedTranslations: { [file: string]: { retries: number } } = {}

      // Process files in smaller batches to avoid memory issues
      const fileChunks = chunkArray(blogFiles, 5)

      for (const fileChunk of fileChunks) {
        await Promise.allSettled(fileChunk.map((file) => processFile(file, lang, langBlogDirectory, failedTranslations)))
        progress[lang] += fileChunk.length

        const totalProgress = Object.values(progress).reduce((a, b) => a + b, 0)
        console.log(`Progress: ${totalProgress}/${totalFiles * languages.length} (${Math.round((totalProgress / (totalFiles * languages.length)) * 100)}%)`)
      }

      // Retry failed translations with exponential backoff (max 3 attempts)
      const failedFiles = Object.keys(failedTranslations)
      if (failedFiles.length > 0) {
        console.log(`Retrying ${failedFiles.length} failed translations for ${lang}...`)

        for (let attempt = 1; attempt <= 3; attempt++) {
          console.log(`Retry attempt ${attempt}/3...`)
          const filesToRetry = failedFiles.filter((file) => failedTranslations[file].retries < attempt)

          if (filesToRetry.length === 0) break

          for (const file of filesToRetry) {
            try {
              await processFile(file, lang, langBlogDirectory, failedTranslations)
              delete failedTranslations[file] // Remove from failed list if successful
            } catch (error) {
              failedTranslations[file].retries++
              console.error(`Failed to translate ${file} to ${lang} (attempt ${failedTranslations[file].retries}/3): ${error}`)
            }
            // Add a small delay between retries to avoid rate limits
            await new Promise((resolve) => setTimeout(resolve, 500))
          }
        }

        // Report any files that still failed after all retries
        const permanentlyFailedFiles = Object.keys(failedTranslations)
        if (permanentlyFailedFiles.length > 0) {
          console.error(`Failed to translate ${permanentlyFailedFiles.length} files after 3 attempts for ${lang}:`)
          permanentlyFailedFiles.forEach((file) => console.error(`- ${file}`))
        }
      }
    })

    await Promise.all(languagePromises)
  }
}

const processFile = async (file: string, lang: string, langBlogDirectory: string, failedTranslations: { [file: string]: { retries: number } }): Promise<void> => {
  try {
    const filePath = join(defaultBlogDirectory, file)
    const destinationPath = join(langBlogDirectory, file)

    // Skip files that already exist
    if (existsSync(destinationPath)) return

    // Read the source file content
    const content = await readFile(filePath, 'utf8')
    const { data: frontmatter, content: extractedContent } = matter(content)

    // Save original English slug
    const originalSlug = frontmatter.slug || file.replace(/\.(md|mdx)$/, '')

    // Translate frontmatter fields
    const fieldsToTranslate = ['title', 'description', 'head_image_alt', 'slug']
    for (const field of fieldsToTranslate) {
      if (frontmatter[field]) {
        try {
          const translated = await translateText(frontmatter[field], lang)
          if (translated) frontmatter[field] = translated
          else throw new Error(`Empty translation for ${field}`)
        } catch (error) {
          markAsFailed(file, failedTranslations)
          throw error
        }
      }
    }

    // Add original English slug to frontmatter
    frontmatter['original_slug'] = originalSlug
    frontmatter['locale'] = lang

    // Create an empty file first
    await writeFile(destinationPath, '', 'utf8')

    // Extract and preserve code blocks and HTML tags
    const codeBlockRegex = /```[\s\S]*?```/g
    const htmlTagRegex = /<[^>]+>/g
    const codeBlocks = [...extractedContent.matchAll(codeBlockRegex)]
    const htmlTags = [...extractedContent.matchAll(htmlTagRegex)]
    const contentWithoutCodeBlocks = extractedContent.replace(codeBlockRegex, '[[CODE_BLOCK]]')
    const contentWithoutHtmlTags = contentWithoutCodeBlocks.replace(htmlTagRegex, '[[HTML_TAG]]')

    // Optimize content chunking (paragraph-based instead of sentence-based)
    const paragraphs = contentWithoutHtmlTags.split('\n\n')
    let translatedParts: string[] = []
    let currentChunk = ''
    const maxChunkSize = 10000 // Smaller chunks for better translation quality

    for (const paragraph of paragraphs) {
      if ((currentChunk + paragraph).length > maxChunkSize) {
        // Translate accumulated chunk
        try {
          const translated = await translateText(currentChunk, lang)
          if (translated) translatedParts.push(translated)
          else throw new Error('Empty translation')
        } catch (error) {
          markAsFailed(file, failedTranslations)
          throw error
        }

        currentChunk = paragraph
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph
      }
    }

    // Translate the final chunk
    if (currentChunk) {
      try {
        const translated = await translateText(currentChunk, lang)
        if (translated) translatedParts.push(translated)
        else throw new Error('Empty translation for final chunk')
      } catch (error) {
        markAsFailed(file, failedTranslations)
        throw error
      }
    }

    // Combine all translated parts
    let translatedContent = translatedParts.join('\n\n')

    // Restore code blocks and HTML tags
    codeBlocks.forEach((match) => {
      translatedContent = translatedContent.replace('[[CODE_BLOCK]]', match[0])
    })

    htmlTags.forEach((match) => {
      translatedContent = translatedContent.replace('[[HTML_TAG]]', match[0])
    })

    // Write the final translated file
    await writeFile(destinationPath, matter.stringify(translatedContent, frontmatter), 'utf8')
  } catch (error) {
    markAsFailed(file, failedTranslations)
    throw error
  }
}

// Helper function to mark a file as failed
function markAsFailed(file: string, failedTranslations: { [file: string]: { retries: number } }): void {
  if (!failedTranslations[file]) {
    failedTranslations[file] = { retries: 0 }
  }
}

// Helper function to split array into chunks
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

// Start the process with proper error handling
processAllLanguages().catch((error) => {
  console.error('Translation process failed:', error)
  process.exit(1)
})
