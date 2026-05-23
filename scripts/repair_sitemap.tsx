import { XMLParser } from 'fast-xml-parser'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { SitemapStream, streamToPromise } from 'sitemap'
import { defaultLocale, locales } from '../apps/web/src/services/locale'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: number
}

const HOSTNAME = 'https://capgo.app'
const EXCLUDED_SITEMAP_PATHS = new Set(['/tools/ios-udid-finder/result/'])

const parser = new XMLParser()

function stripLocalePath(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1) || '/'
  }
  return pathname
}

function localizedUrl(loc: string, locale: string): string {
  const url = new URL(loc)
  const basePath = stripLocalePath(url.pathname)
  url.pathname = locale === defaultLocale ? basePath : basePath === '/' ? `/${locale}/` : `/${locale}${basePath}`
  return url.toString()
}

function isAllowedSitemapUrl(item: SitemapUrl): boolean {
  const url = new URL(item.loc)
  const pathname = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`
  return !EXCLUDED_SITEMAP_PATHS.has(stripLocalePath(pathname))
}

function expandLocalizedUrls(urls: SitemapUrl[]): SitemapUrl[] {
  const expanded = new Map<string, SitemapUrl>()

  for (const item of urls) {
    for (const locale of locales) {
      const loc = localizedUrl(item.loc, locale)
      if (!expanded.has(loc)) {
        expanded.set(loc, {
          ...item,
          loc,
        })
      }
    }
  }

  return [...expanded.values()].sort((left, right) => left.loc.localeCompare(right.loc))
}

function appendSupportedLanguagePaths(content: string): string {
  const localizedPaths = locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}/`)
    .join(', ')

  return [
    content.trimEnd(),
    '',
    '## Supported language paths',
    '',
    `The canonical English source is served at /. Translated pages are served at request time for these language prefixes: ${localizedPaths}.`,
    '',
  ].join('\n')
}

function resolveDistDir(appName: 'web' | 'docs'): string {
  const distRoot = join('apps', appName, 'dist')
  const clientDist = join(distRoot, 'client')
  return existsSync(clientDist) ? clientDist : distRoot
}

const WEB_DIST = resolveDistDir('web')
const DOCS_DIST = resolveDistDir('docs')

async function normalizeSitemap(inputPath: string, outputPath = inputPath): Promise<boolean> {
  if (!existsSync(inputPath)) return false

  const xmlData = readFileSync(inputPath, 'utf-8')
  const jsonObj = parser.parse(xmlData)
  const rawUrls = jsonObj?.urlset?.url
  let sitemapUrls: SitemapUrl[] = []
  if (Array.isArray(rawUrls)) {
    sitemapUrls = rawUrls
  } else if (rawUrls) {
    sitemapUrls = [rawUrls]
  }

  const urls = sitemapUrls.filter(isAllowedSitemapUrl)
  const smStream = new SitemapStream({ hostname: HOSTNAME })

  expandLocalizedUrls(urls).forEach((item) => {
    smStream.write({
      url: item.loc,
      lastmod: item.lastmod,
      changefreq: item.changefreq,
      priority: item.priority,
    })
  })

  smStream.end()
  const sitemap = await streamToPromise(smStream)
  writeFileSync(outputPath, sitemap.toString(), 'utf-8')
  return true
}

const sitemapEntries: string[] = []

if (await normalizeSitemap(join(WEB_DIST, 'sitemap-0.xml'))) {
  sitemapEntries.push(`${HOSTNAME}/sitemap-0.xml`)
}

if (await normalizeSitemap(join(DOCS_DIST, 'sitemap-0.xml'), join(WEB_DIST, 'docs-sitemap-0.xml'))) {
  sitemapEntries.push(`${HOSTNAME}/docs-sitemap-0.xml`)
}

for (const docsArtifact of ['llms.txt', 'llms-full.txt']) {
  const sourcePath = join(DOCS_DIST, docsArtifact)
  if (existsSync(sourcePath)) {
    writeFileSync(join(WEB_DIST, docsArtifact), appendSupportedLanguagePaths(readFileSync(sourcePath, 'utf-8')), 'utf-8')
  }
}

if (sitemapEntries.length > 0) {
  const sitemapIndex = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapEntries.map((loc) => `  <sitemap><loc>${loc}</loc></sitemap>`),
    '</sitemapindex>',
    '',
  ].join('\n')

  writeFileSync(join(WEB_DIST, 'sitemap-index.xml'), sitemapIndex, 'utf-8')
}
