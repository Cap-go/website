export type BlogOrigin = 'human' | 'ai'

/** Human posts show the editorial byline; AI posts keep the single author block. */
export function isHumanBlogPost(origin?: BlogOrigin): boolean {
  return origin !== 'ai'
}
