import { describe, expect, test } from 'bun:test'
import { hasMeaningfulBlogContentChange, normalizeBlogBodyForComparison } from './blog-updated-at'

const baseFrontmatter = `---
title: Example post
description: Short summary for SEO
slug: example-post
updated_at: 2024-01-01T00:00:00.000Z
created_at: 2024-01-01T00:00:00.000Z
tag: updates
---

`

describe('blog updated_at bump heuristics', () => {
  test('ignores frontmatter-only changes', () => {
    const before = `${baseFrontmatter}## Section\n\nSame body copy.\n`
    const after = before.replace('tag: updates', 'tag: guides').replace('2024-01-01T00:00:00.000Z', '2026-08-25T01:16:42.000Z')

    expect(hasMeaningfulBlogContentChange(before, after)).toBe(false)
  })

  test('detects title and description changes', () => {
    const before = `${baseFrontmatter}Body stays the same.\n`
    const titleChange = before.replace('Example post', 'Updated example post')
    const descriptionChange = before.replace('Short summary for SEO', 'A refreshed summary')

    expect(hasMeaningfulBlogContentChange(before, titleChange)).toBe(true)
    expect(hasMeaningfulBlogContentChange(before, descriptionChange)).toBe(true)
  })

  test('ignores formatting-only body edits and CTA injection', () => {
    const before = `${baseFrontmatter}Paragraph one.\n\nParagraph two.\n`
    const formatted = `${baseFrontmatter}Paragraph one.\n\n\nParagraph   two.\n`
    const withCta = `${baseFrontmatter}import BlogMidArticleCta from '@/components/BlogMidArticleCta.astro'\n\nParagraph one.\n\n<BlogMidArticleCta />\n\nParagraph two.\n`

    expect(normalizeBlogBodyForComparison('a   b')).toBe('a b')
    expect(hasMeaningfulBlogContentChange(before, formatted)).toBe(false)
    expect(hasMeaningfulBlogContentChange(before, withCta)).toBe(false)
  })

  test('detects real body edits', () => {
    const before = `${baseFrontmatter}Original guidance.\n`
    const after = `${baseFrontmatter}Original guidance with a new detail.\n`

    expect(hasMeaningfulBlogContentChange(before, after)).toBe(true)
  })
})
