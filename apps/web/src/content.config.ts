import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'
import { normalizeBlogTags } from './constants/blogTags'
import { locales, type Locales } from './services/locale'

const localeSchema = z.custom<Locales>((value) => typeof value === 'string' && locales.includes(value as Locales), { message: 'Invalid locale' })

const faqSchema = z
  .array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  )
  .optional()

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/blog', generateId: ({ entry }) => entry }),
  schema: z
    .object({
      slug: z.string(),
      title: z.string(),
      description: z.string().optional().nullable(),
      author: z.string(),
      author_image_url: z.string(),
      author_url: z.string(),
      created_at: z.date().transform((dat) => dat.toISOString()),
      updated_at: z.date().transform((dat) => dat.toISOString()),
      head_image: z.string().optional(),
      head_image_alt: z.string().optional(),
      keywords: z.string().optional(),
      tag: z.string(),
      published: z.boolean().optional(),
      /** `human` = person-authored in git history (shows editorial byline); `ai` = import pipeline (shows author byline, listed under /articles). */
      origin: z.enum(['human', 'ai']).default('ai'),
      locale: localeSchema,
      next_blog: z.string().optional().nullable(),
      faq: faqSchema,
    })
    .transform((data) => ({
      ...data,
      tag: normalizeBlogTags(
        data.tag
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        data.title,
        data.keywords ?? '',
      ),
    })),
})

const plugin = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/plugins-tutorials' }),
  schema: z.object({
    published: z.boolean().optional(),
    locale: localeSchema.optional(),
    // Hand-written tutorials set `curated: true` so the definitions sync script leaves them alone.
    curated: z.boolean().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    keywords: z.string().optional(),
    summary: z.string().optional(),
    platforms: z
      .array(
        z.object({
          name: z.string(),
          status: z.enum(['supported', 'partial', 'unsupported']),
          note: z.string().optional(),
        }),
      )
      .optional(),
    faq: faqSchema,
  }),
})

export const collections = {
  blog,
  plugin,
}
