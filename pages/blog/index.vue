<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import { createMeta } from '~/services/meta'

const config = useRuntimeConfig()

// const { data } = await useFetch<MyCustomParsedContent[]>('/api/blogs')

const query: QueryBuilderParams = { path: '/blog', where: [{ published: true }], sort: [{ created_at: -1 }] }
useHead(() => ({
  title: config.public.blog_tile,
  meta: createMeta(config.public.blog_tile, config.public.blog_description),
}))
</script>

<template>
  <section class="py-10 sm:py-12 lg:py-20">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div class="max-w-2xl mx-auto text-center">
        <h1
          class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          Latest from the blog
        </h1>
        <h2 class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-50">
          {{ config.public.blog_description }}
        </h2>
      </div>

      <div
        class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full"
      >
        <ContentList v-slot="{ list }" :query="query">
          <Blog
            v-for="article in list" :key="article.slug"
            :link="article.slug"
            :title="article.title"
            :description="article.description"
            :image="article.head_image"
            :date="article.created_at"
            :tag="article.tag"
          />
        </ContentList>
      </div>
    </div>
  </section>
</template>
