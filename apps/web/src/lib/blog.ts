import type { CollectionEntry } from 'astro:content'

export type BlogOrigin = 'human' | 'ai'

export function isPublishedBlogPost(data: CollectionEntry<'blog'>['data']): boolean {
  return data.published !== false
}

export function filterBlogPosts(posts: CollectionEntry<'blog'>[], options: { origin?: BlogOrigin; locale?: string } = {}): CollectionEntry<'blog'>[] {
  return posts.filter((post) => {
    if (!isPublishedBlogPost(post.data)) return false
    if (options.locale && post.data.locale !== options.locale) return false
    if (options.origin && post.data.origin !== options.origin) return false
    return true
  })
}

export function getBlogListingBasePath(origin: BlogOrigin): string {
  return origin === 'ai' ? 'articles' : 'blog'
}
