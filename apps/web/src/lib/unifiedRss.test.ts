import { describe, expect, test } from 'bun:test'
import { buildRssXml, collectDocsRssItems, collectGithubReleaseRssItems, countItemsByCategory, docsFileToUrl, mergeUnifiedRssItems, type UnifiedRssItem } from './unifiedRss'

describe('unifiedRss', () => {
  test('maps docs paths to public URLs', () => {
    expect(docsFileToUrl('getting-started/quickstart.mdx')).toBe('https://capgo.app/docs/getting-started/quickstart/')
    expect(docsFileToUrl('plugins/updater/index.mdx')).toBe('https://capgo.app/docs/plugins/updater/')
  })

  test('builds valid RSS with required fields and categories', () => {
    const items: UnifiedRssItem[] = [
      {
        category: 'blog',
        title: 'Blog post',
        link: 'https://capgo.app/blog/example/',
        guid: 'https://capgo.app/blog/example/',
        pubDate: new Date('2026-01-02T00:00:00.000Z'),
        description: 'Blog description',
      },
      {
        category: 'docs',
        title: 'Docs page',
        link: 'https://capgo.app/docs/example/',
        guid: 'https://capgo.app/docs/example/',
        pubDate: new Date('2026-01-01T00:00:00.000Z'),
        description: 'Docs description',
      },
      {
        category: 'changelog',
        title: 'capgo-1.0.0',
        link: 'https://github.com/Cap-go/capgo.app/releases/tag/capgo-1.0.0',
        guid: 'https://github.com/Cap-go/capgo.app/releases/tag/capgo-1.0.0',
        pubDate: new Date('2025-12-31T00:00:00.000Z'),
        description: 'Changelog body',
      },
      {
        category: 'release',
        title: 'capacitor-updater 1.0.0',
        link: 'https://github.com/Cap-go/capacitor-updater/releases/tag/1.0.0',
        guid: 'https://github.com/Cap-go/capacitor-updater/releases/tag/1.0.0',
        pubDate: new Date('2025-12-30T00:00:00.000Z'),
        description: 'Release body',
      },
    ]

    const xml = buildRssXml(mergeUnifiedRssItems(items))
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('<rss version="2.0">')
    expect(xml).toContain('<title>Blog post</title>')
    expect(xml).toContain('<category>blog</category>')
    expect(xml).toContain('<category>docs</category>')
    expect(xml).toContain('<category>changelog</category>')
    expect(xml).toContain('<category>release</category>')
    expect(xml).toContain('<guid isPermaLink="true">')
    expect(xml).toContain('<pubDate>')
    expect(xml).toContain('<description>')
  })

  test('collects docs items from the docs content tree', () => {
    const docs = collectDocsRssItems()
    expect(docs.length).toBeGreaterThan(0)
    expect(docs.every((item) => item.category === 'docs')).toBe(true)
    expect(docs.every((item) => item.link.startsWith('https://capgo.app/docs/'))).toBe(true)
  })

  test('merges GitHub release fixtures into changelog and release categories', async () => {
    const fetchImpl = (async (input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString()
      if (url.includes('Cap-go/capgo.app/releases')) {
        return new Response(
          JSON.stringify([
            {
              tag_name: 'capgo-99.0.0',
              html_url: 'https://github.com/Cap-go/capgo.app/releases/tag/capgo-99.0.0',
              published_at: '2026-02-01T12:00:00Z',
              body: 'Platform release',
            },
          ]),
          { status: 200 },
        )
      }
      if (url.includes('Cap-go/capacitor-updater/releases')) {
        return new Response(
          JSON.stringify([
            {
              tag_name: '10.0.0',
              html_url: 'https://github.com/Cap-go/capacitor-updater/releases/tag/10.0.0',
              published_at: '2026-02-02T12:00:00Z',
              body: 'Updater release',
            },
          ]),
          { status: 200 },
        )
      }
      return new Response('[]', { status: 200 })
    }) as typeof fetch

    const releaseItems = await collectGithubReleaseRssItems(fetchImpl)
    const counts = countItemsByCategory(releaseItems)
    expect(counts.changelog).toBeGreaterThan(0)
    expect(counts.release).toBeGreaterThan(0)
  })
})
