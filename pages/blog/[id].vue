<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { NewsArticle, WithContext } from 'schema-dts'
import { createMeta } from '~/services/meta'
import type { MyCustomParsedContent } from '~/services/blog'
import { formatTime, randomArticle } from '~/services/blog'

const config = useRuntimeConfig()
const route = useRoute()
const { data } = await useAsyncData('articleData', () => queryContent<MyCustomParsedContent>('blog', route.params.id as string).findOne())
const { data: randomData } = await useAsyncData('randomData', async () => {
  return data.value?.next_blog && data.value?.next_blog !== ''
    ? await queryContent<MyCustomParsedContent>('blog', data.value.next_blog)
      .findOne()
    : await randomArticle(data.value?.slug)
})

const datePublished = new Date(data.value?.created_at).toISOString()
const dateModified = new Date(data.value?.updated_at).toISOString()
const structuredData: WithContext<NewsArticle> = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': `${config.getUrl}/${data.value?.slug}`,
  },
  'headline': data.value?.description,
  'image': [
    data.value?.head_image,
  ],
  'datePublished': datePublished,
  'dateModified': dateModified,
  'author': {
    '@type': 'Person',
    'name': data.value?.author,
    'url': data.value?.author_url,
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
  titleTemplate: data.value?.title || 'No title',
  script: [
    {
      hid: 'seo-schema-graph',
      type: 'application/ld+json',
      children: JSON.stringify(structuredData),
    },
  ],
  meta: createMeta(
    data.value?.title || 'No title',
    data.value?.description || 'No description',
    data.value?.head_image || '',
    data.value?.author || 'Capgo',
  ),
}))
</script>

<template>
  <main class="text-center text-white">
    <div class="relative pb-4 lg:max-w-1/2 mx-auto">
      <div class="block aspect-w-4 aspect-h-3">
        <img
          class="object-cover w-full h-full lg:rounded-lg"
          :src="data?.head_image"
          :alt="`blog illustration ${data?.title}`"
        >
      </div>

      <div class="absolute top-4 left-4 lg:top-15 lg:left-10">
        <span
          class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"
        >
          {{ data?.tag }}
        </span>
      </div>
    </div>
    <span
      class="block mt-6 text-sm font-semibold tracking-widest text-white uppercase"
    >
      {{ formatTime(data?.created_at) }}
    </span>

    <h1 class="py-5 text-3xl lg:text-4xl lg:max-w-1/2 px-4 font-800 mx-auto">
      {{ data?.title }}
    </h1>
    <p class="py-5 px-4 lg:max-w-1/2 mx-auto text-left">
      {{ data?.description }}
    </p>
    <article
      v-if="data"
      class="mx-auto text-left text-white prose text-white pb-4 px-4 lg:max-w-1/2"
    >
      <ContentRenderer :value="data" />
    </article>

    <a
      v-if="randomData"
      :href="`/blog/${randomData.slug}`"
      class="flex flex-col sm:flex-row py-8 lg:max-w-1/2 mx-auto lg:my-10 bg-gray-700 lg:rounded-lg"
    >
      <div class="relative mx-4 flex">
        <div :title="randomData.title" class="block w-full">
          <img
            class="object-cover w-full sm:w-52 h-full rounded-lg"
            :src="randomData.head_image"
            :alt="`blog illustration ${randomData.title}`"
          >
        </div>

        <div class="absolute top-2 left-2">
          <span
            class="px-4 py-2 text-tiny font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"
          >
            {{ randomData.tag }}
          </span>
        </div>
      </div>
      <div class="px-4 pt-2 sm:pt-0 text-left">
        <p class="text-lg font-bold">
          {{ randomData.title }}
        </p>
        <span
          class="block mt-3 text-sm font-semibold tracking-widest text-white uppercase"
        >
          {{ formatTime(randomData.created_at) }}
        </span>
        <p class="mt-1">
          {{ randomData.description }}
        </p>
      </div>
    </a>
  </main>
</template>
