<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { NewsArticle, WithContext } from 'schema-dts'
import { createMeta } from '~/services/meta'
import { formatTime, randomArticle } from '~/services/blog'

const config = useRuntimeConfig()
const route = useRoute()
const page = await useAsyncData('articleData', async () => {
  return await queryContent('blog').where({ slug: route.params.id }).findOne()
})
const random = await useAsyncData('randomData', async () => {
  return page.data.value.next_blog !== ''
    ? await queryContent('blog')
      .where({ slug: page.data.value.next_blog })
      .findOne()
    : await randomArticle(page.data.value.slug)
})

const datePublished = new Date(page.data.value.created_at).toISOString()
const dateModified = new Date(page.data.value.updated_at).toISOString()
const structuredData: WithContext<NewsArticle> = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': `${config.getUrl}/${page.data.value.slug}`,
  },
  'headline': page.data.value.description,
  'image': [
    page.data.value.head_image,
  ],
  'datePublished': datePublished,
  'dateModified': dateModified,
  'author': {
    '@type': 'Person',
    'name': page.data.value.author,
    'url': page.data.value.author_url,
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'Capgo',
    'logo': {
      '@type': 'ImageObject',
      'url': `${config.getUrl}/icon.webp`,
    },
  },
}
useJsonld(structuredData)
useHead(() => ({
  titleTemplate: page.data.value.title || 'No title',
  script: [
    {
      hid: 'seo-schema-graph',
      type: 'application/ld+json',
      children: JSON.stringify(structuredData),
    },
  ],
  meta: createMeta(
    page.data.value.title || 'No title',
    page.data.value.description || 'No description',
    page.data.value.head_image || '',
    page.data.value.author || 'Capgo',
  ),
}))
</script>

<template>
  <main class="text-center text-white">
    <div class="relative pb-4 lg:max-w-1/2 mx-auto">
      <div class="block aspect-w-4 aspect-h-3">
        <img
          class="object-cover w-full h-full lg:rounded-lg"
          :src="page.data.value.head_image"
          :alt="`blog illustration ${page.data.value.title}`"
        >
      </div>

      <div class="absolute top-4 left-4 lg:top-15 lg:left-10">
        <span
          class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"
        >
          {{ page.data.value.tag }}
        </span>
      </div>
    </div>
    <span
      class="block mt-6 text-sm font-semibold tracking-widest text-white uppercase"
    >
      {{ formatTime(page.data.value.date) }}
    </span>

    <h1 class="py-5 text-3xl lg:text-4xl lg:max-w-1/2 px-4 font-800 mx-auto">
      {{ page.data.value.title }}
    </h1>
    <p class="py-5 px-4 lg:max-w-1/2 mx-auto text-left">
      {{ page.data.value.description }}
    </p>
    <article
      class="mx-auto text-left text-white prose text-white pb-4 px-4 lg:max-w-1/2"
    >
      <ContentRenderer :value="page.data.value" />
    </article>

    <a
      v-if="random"
      :href="`/blog/${random.data.value.slug}`"
      class="flex flex-col sm:flex-row py-8 lg:max-w-1/2 mx-auto lg:my-10 bg-gray-700 lg:rounded-lg"
    >
      <div class="relative mx-4 flex">
        <div :title="random.data.value.title" class="block w-full">
          <img
            class="object-cover w-full sm:w-52 h-full rounded-lg"
            :src="random.data.value.head_image"
            :alt="`blog illustration ${random.data.value.title}`"
          >
        </div>

        <div class="absolute top-2 left-2">
          <span
            class="px-4 py-2 text-tiny font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"
          >
            {{ random.data.value.tag }}
          </span>
        </div>
      </div>
      <div class="px-4 pt-2 sm:pt-0 text-left">
        <p class="text-lg font-bold">
          {{ random.data.value.title }}
        </p>
        <span
          class="block mt-3 text-sm font-semibold tracking-widest text-white uppercase"
        >
          {{ formatTime(random.data.value.date) }}
        </span>
        <p class="mt-1">
          {{ random.data.value.description }}
        </p>
      </div>
    </a>
  </main>
</template>
