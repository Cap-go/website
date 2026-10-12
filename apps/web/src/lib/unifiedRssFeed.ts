import { filterBlogPosts } from '@/lib/blog'
import { buildRssXml, collectDocsRssItems, collectGithubReleaseRssItems, mergeUnifiedRssItems, SITE_ORIGIN, type UnifiedRssItem } from '@/lib/unifiedRss'
import { getCollection } from 'astro:content'

function truncateDescription(value: string, maxLength = 500): string {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 3)}...`
}

export async function collectBlogRssItems(): Promise<UnifiedRssItem[]> {
  const posts = filterBlogPosts(await getCollection('blog'), { origin: 'human', locale: 'en' })
  return posts.map((post) => {
    const link = `${SITE_ORIGIN}/blog/${post.data.slug}/`
    const description = post.data.description?.trim() || post.data.title
    const pubDate = new Date(post.data.updated_at || post.data.created_at)
    return {
      category: 'blog' as const,
      title: post.data.title,
      link,
      guid: link,
      pubDate,
      description: truncateDescription(description),
    }
  })
}

export async function buildUnifiedRssFeed(options: { fetchImpl?: typeof fetch } = {}): Promise<string> {
  const fetchImpl = options.fetchImpl ?? fetch
  const [blog, docs, releases] = await Promise.all([collectBlogRssItems(), Promise.resolve(collectDocsRssItems()), collectGithubReleaseRssItems(fetchImpl)])
  const items = mergeUnifiedRssItems([...blog, ...docs, ...releases])
  return buildRssXml(items)
}
