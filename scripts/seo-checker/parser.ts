/**
 * HTML Parser for SEO Checker
 * Parses HTML files and extracts SEO-relevant data
 */

import { load, type CheerioAPI } from 'cheerio'
import * as fs from 'node:fs'
import * as path from 'node:path'
import type { PageData, SiteData, SEOCheckerConfig } from './types'

/**
 * Parse a single HTML file and extract SEO data
 */
export function parseHtmlFile(
  filePath: string,
  distPath: string,
  config: SEOCheckerConfig
): PageData {
  const html = fs.readFileSync(filePath, 'utf-8')
  const $ = load(html)
  const relativePath = path.relative(distPath, filePath)

  // Determine the URL from the file path
  const urlPath = relativePath.replace(/index\.html$/, '').replace(/\.html$/, '')
  const url = `${config.baseUrl}/${urlPath}`.replace(/\/+$/, '') || config.baseUrl

  // Extract headings with their order
  const headingOrder: PageData['headingOrder'] = []
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const tagName = $(el).prop('tagName')?.toLowerCase() || ''
    const level = parseInt(tagName.replace('h', ''), 10)
    if (!isNaN(level)) {
      headingOrder.push({
        level,
        text: $(el).text().trim(),
      })
    }
  })

  // Extract links
  const links: PageData['links'] = []
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || ''
    const text = $(el).text().trim()
    const rel = $(el).attr('rel')
    const target = $(el).attr('target')
    const isInternal = isInternalUrl(href, config.baseUrl)
    const isExternal = isExternalUrl(href, config.baseUrl)

    links.push({
      href,
      text,
      rel,
      target,
      isInternal,
      isExternal,
    })
  })

  // Extract images
  const images: PageData['images'] = []
  $('img').each((_, el) => {
    images.push({
      src: $(el).attr('src') || '',
      alt: $(el).attr('alt'),
      width: $(el).attr('width'),
      height: $(el).attr('height'),
    })
  })

  // Extract JSON-LD
  const jsonLd: unknown[] = []
  $('script[type="application/ld+json"]').each((_, el) => {
    const content = $(el).html()
    if (content) {
      try {
        jsonLd.push(JSON.parse(content))
      } catch {
        // Store the raw content for error reporting
        jsonLd.push({ _parseError: true, _raw: content })
      }
    }
  })

  // Extract hreflangs
  const hreflangs: PageData['hreflangs'] = []
  $('link[rel="alternate"][hreflang]').each((_, el) => {
    hreflangs.push({
      lang: $(el).attr('hreflang') || '',
      url: $(el).attr('href') || '',
    })
  })

  // Extract element IDs for duplicate check
  const elementIds: string[] = []
  $('[id]').each((_, el) => {
    const id = $(el).attr('id')
    if (id) elementIds.push(id)
  })

  // Calculate word count from main content
  const mainContent = $('main').text() || $('body').text()
  const wordCount = countWords(mainContent)

  return {
    filePath,
    relativePath,
    url,
    html,
    title: $('title').first().text().trim() || undefined,
    metaDescription: $('meta[name="description"]').attr('content')?.trim(),
    metaRobots: $('meta[name="robots"]').attr('content')?.trim(),
    canonical: $('link[rel="canonical"]').attr('href')?.trim(),
    htmlLang: $('html').attr('lang')?.trim(),
    charset: getCharset($),
    h1s: extractTextContent($, 'h1'),
    h2s: extractTextContent($, 'h2'),
    h3s: extractTextContent($, 'h3'),
    h4s: extractTextContent($, 'h4'),
    h5s: extractTextContent($, 'h5'),
    h6s: extractTextContent($, 'h6'),
    headingOrder,
    og: {
      title: $('meta[property="og:title"]').attr('content')?.trim(),
      description: $('meta[property="og:description"]').attr('content')?.trim(),
      image: $('meta[property="og:image"]').attr('content')?.trim(),
      url: $('meta[property="og:url"]').attr('content')?.trim(),
      type: $('meta[property="og:type"]').attr('content')?.trim(),
    },
    twitter: {
      card: $('meta[name="twitter:card"]').attr('content')?.trim(),
      title: $('meta[name="twitter:title"]').attr('content')?.trim(),
      description: $('meta[name="twitter:description"]').attr('content')?.trim(),
      image: $('meta[name="twitter:image"]').attr('content')?.trim(),
    },
    hreflangs,
    links,
    images,
    jsonLd,
    wordCount,
    hasDoctype: html.toLowerCase().includes('<!doctype html'),
    hasMainLandmark: $('main').length > 0 || $('[role="main"]').length > 0,
    viewport: $('meta[name="viewport"]').attr('content')?.trim(),
    elementIds,
  }
}

/**
 * Get charset from meta tag
 */
function getCharset($: CheerioAPI): string | undefined {
  const charsetMeta = $('meta[charset]').attr('charset')
  if (charsetMeta) return charsetMeta

  const httpEquivMeta = $('meta[http-equiv="Content-Type"]').attr('content')
  if (httpEquivMeta) {
    const match = httpEquivMeta.match(/charset=([^\s;]+)/i)
    if (match) return match[1]
  }

  return undefined
}

/**
 * Extract text content from all matching elements
 */
function extractTextContent($: CheerioAPI, selector: string): string[] {
  const texts: string[] = []
  $(selector).each((_, el) => {
    texts.push($(el).text().trim())
  })
  return texts
}

/**
 * Check if URL is internal
 */
function isInternalUrl(href: string, baseUrl: string): boolean {
  if (!href) return false
  if (href.startsWith('#')) return false
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false
  if (href.startsWith('/')) return true
  if (href.startsWith('./') || href.startsWith('../')) return true

  try {
    const url = new URL(href, baseUrl)
    const base = new URL(baseUrl)
    return url.hostname === base.hostname
  } catch {
    return false
  }
}

/**
 * Check if URL is external
 */
function isExternalUrl(href: string, baseUrl: string): boolean {
  if (!href) return false
  if (href.startsWith('#')) return false
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false
  if (href.startsWith('/')) return false
  if (href.startsWith('./') || href.startsWith('../')) return false

  try {
    const url = new URL(href, baseUrl)
    const base = new URL(baseUrl)
    return url.hostname !== base.hostname
  } catch {
    return false
  }
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter((w) => w.length > 0).length
}

/**
 * Scan all HTML files in the dist folder
 */
export async function scanDistFolder(config: SEOCheckerConfig): Promise<SiteData> {
  const distPath = config.distPath
  const pages = new Map<string, PageData>()
  const titles = new Map<string, string[]>()
  const descriptions = new Map<string, string[]>()
  const h1s = new Map<string, string[]>()
  const canonicals = new Map<string, string[]>()
  const imageFiles = new Map<string, { path: string; size: number }>()

  // Find all HTML files
  const htmlFiles = await findFiles(distPath, '.html')

  // Minimum file size to consider a valid page (skip error/placeholder pages)
  const MIN_FILE_SIZE = 500 // bytes
  // Maximum file size for redirect pages (they're typically small)
  const MAX_REDIRECT_SIZE = 1000 // bytes

  // Parse each HTML file
  for (const filePath of htmlFiles) {
    // Skip very small files (likely error pages or placeholders)
    const stats = fs.statSync(filePath)
    if (stats.size < MIN_FILE_SIZE) {
      continue
    }

    // Skip redirect pages (small files with meta refresh)
    if (stats.size < MAX_REDIRECT_SIZE) {
      const content = fs.readFileSync(filePath, 'utf-8')
      if (content.includes('http-equiv="refresh"') || content.includes("http-equiv='refresh'")) {
        continue
      }
    }

    const pageData = parseHtmlFile(filePath, distPath, config)
    pages.set(pageData.relativePath, pageData)

    // Track duplicates
    if (pageData.title) {
      const existing = titles.get(pageData.title) || []
      existing.push(pageData.relativePath)
      titles.set(pageData.title, existing)
    }

    if (pageData.metaDescription) {
      const existing = descriptions.get(pageData.metaDescription) || []
      existing.push(pageData.relativePath)
      descriptions.set(pageData.metaDescription, existing)
    }

    if (pageData.h1s.length > 0) {
      for (const h1 of pageData.h1s) {
        const existing = h1s.get(h1) || []
        existing.push(pageData.relativePath)
        h1s.set(h1, existing)
      }
    }

    if (pageData.canonical) {
      const existing = canonicals.get(pageData.canonical) || []
      existing.push(pageData.relativePath)
      canonicals.set(pageData.canonical, existing)
    }
  }

  // Find all image files
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif']
  for (const ext of imageExtensions) {
    const files = await findFiles(distPath, ext)
    for (const filePath of files) {
      const stats = fs.statSync(filePath)
      const relativePath = path.relative(distPath, filePath)
      imageFiles.set(relativePath, {
        path: filePath,
        size: stats.size,
      })
    }
  }

  return {
    pages,
    titles,
    descriptions,
    h1s,
    canonicals,
    imageFiles,
  }
}

/**
 * Find all files with a specific extension
 */
async function findFiles(dir: string, extension: string): Promise<string[]> {
  const files: string[] = []

  async function walk(currentDir: string): Promise<void> {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)

      if (entry.isDirectory()) {
        await walk(fullPath)
      } else if (entry.isFile() && entry.name.endsWith(extension)) {
        files.push(fullPath)
      }
    }
  }

  await walk(dir)
  return files
}

/**
 * Check if a file exists at the given path
 */
export function fileExists(filePath: string): boolean {
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

/**
 * Resolve a relative URL to a file path
 */
export function resolveToFilePath(
  href: string,
  currentPagePath: string,
  distPath: string
): string | null {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null
  }

  // Remove query string and fragment
  const cleanHref = href.split('?')[0].split('#')[0]

  if (cleanHref.startsWith('/')) {
    // Absolute path from root
    const targetPath = path.join(distPath, cleanHref)
    // Check for both direct file and index.html
    if (fileExists(targetPath)) return targetPath
    if (fileExists(path.join(targetPath, 'index.html'))) return path.join(targetPath, 'index.html')
    if (fileExists(targetPath + '.html')) return targetPath + '.html'
    return targetPath
  }

  // Relative path
  const currentDir = path.dirname(path.join(distPath, currentPagePath))
  const targetPath = path.resolve(currentDir, cleanHref)

  if (fileExists(targetPath)) return targetPath
  if (fileExists(path.join(targetPath, 'index.html'))) return path.join(targetPath, 'index.html')
  if (fileExists(targetPath + '.html')) return targetPath + '.html'

  return targetPath
}
