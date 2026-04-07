import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { locales, type Locales } from './services/locale'

const localeSchema = z.custom<Locales>(
  (value) => typeof value === 'string' && locales.includes(value as Locales),
  { message: 'Invalid locale' },
)

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog', generateId: ({ entry }) => entry }),
  schema: z.object({
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
    tag: z.string().transform((value) =>
      value
        .trim()
        .split(',')
        .map((item) => item.trim())
        .join(','),
    ),
    published: z.boolean().optional(),
    locale: localeSchema,
    next_blog: z.string().optional().nullable(),
  }),
})

const plugin = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/plugins-tutorials' }),
  schema: z.object({
    published: z.boolean().optional(),
    locale: localeSchema.optional(),
  }),
})

export const collections = {
  blog,
  plugin,
}
