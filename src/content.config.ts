import { glob } from 'astro/loaders'
import type { Locales } from './services/locale'
import { defineCollection, z } from 'astro:content'
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema'
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders"

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "src/content/blog" }),
  schema: z.object({
    slug: z.string().transform((s) => s.includes('__') ? s.split('__')[1] : s),
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
    locale: z.string() as z.ZodType<Locales>,
    next_blog: z.string().optional().nullable(),
  })
});

export const collections = {
  blog,
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
}
