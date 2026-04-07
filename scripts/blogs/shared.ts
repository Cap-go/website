import { join } from 'node:path'

export const webContentDirectory = join(process.cwd(), 'apps', 'web', 'src', 'content')
export const webBlogDirectory = join(webContentDirectory, 'blog')

export function getBlogTranslationPaths(file: string, locale: string) {
  return {
    sourceFilePath: join(webBlogDirectory, 'en', file),
    destinationDir: join(webBlogDirectory, locale),
    destinationPath: join(webBlogDirectory, locale, file),
  }
}
