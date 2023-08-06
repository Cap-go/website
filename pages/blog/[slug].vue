<script setup lang="ts">
// import type { NewsArticle, WithContext } from 'schema-dts'
import type { MyCustomParsedContent } from '~/services/blog'
import { formatTime } from '~/services/blog'

// const config = useRuntimeConfig()
const route = useRoute()

const { data: res } = await useFetch<{ blog: MyCustomParsedContent; related: MyCustomParsedContent[] }>(`/api/blog/${route.params.slug}`)

const data = ref(res.value?.blog)
const articles = ref(res.value?.related)
// if (data.value) {
//   const datePublished = new Date(data.value?.created_at).toISOString()
//   const dateModified = new Date(data.value?.updated_at).toISOString()
//   const structuredData: WithContext<NewsArticle> = {
//     '@context': 'https://schema.org',
//     '@type': 'NewsArticle',
//     'mainEntityOfPage': {
//       '@type': 'WebPage',
//       '@id': `${config.public.baseUrl}/${data.value?.slug}`,
//     },
//     'headline': data.value?.description,
//     'image': [
//       `${config.public.baseUrl}${data.value?.head_image || '/capgo_banner.webp'}`,
//     ],
//     'datePublished': datePublished,
//     'dateModified': dateModified,
//     'author': {
//       '@type': 'Person',
//       'name': data.value?.author,
//       'url': data.value?.author_url,
//     },
//     'publisher': {
//       '@type': 'Organization',
//       'name': 'Capgo',
//       'logo': {
//         '@type': 'ImageObject',
//         'url': `${config.public.baseUrl}/icon.webp`,
//       },
//     },
//   }
// useJsonld(structuredData)
// useHead(() => ({
//   title: data.value?.title || 'No title',
//   script: [
//     {
//       hid: 'seo-schema-graph',
//       type: 'application/ld+json',
//       children: JSON.stringify(structuredData),
//     },
//   ],
//   meta: createMeta(
//     data.value?.title || 'No title',
//     data.value?.description || 'No description',
//     `${config.public.baseUrl}${data.value?.head_image || '/capgo_banner.webp'}`,
//     data.value?.author || 'Capgo',
//   ),
// }))
// }
</script>

<template>
  <main class="text-center text-white">
    <div class="relative pb-4 lg:max-w-1/2 mx-auto">
      <div class="block aspect-w-4 aspect-h-3">
        <img
          class="object-cover w-full h-full lg:rounded-lg md:shadow-xl md:shadow-gray-700"
          :src="data?.head_image"
          loading="eager"
          height="486"
          width="864"
          :alt="`blog illustration ${data?.title}`"
          :title="`blog illustration ${data?.title}`"
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
      {{ formatTime(data?.created_at || "") }}
    </span>

    <h1 class="py-5 text-3xl lg:text-4xl lg:max-w-1/2 px-4 font-800 mx-auto">
      {{ data?.title }}
    </h1>
    <p class="py-5 px-4 lg:max-w-1/2 mx-auto text-left">
      {{ data?.description }}
    </p>
    <article
      v-if="data"
      class="mx-auto text-left text-white prose md:rounded-lg text-white pb-4 px-4 lg:max-w-1/2"
    >
      <ContentRenderer :value="data" />
    </article>

    <section class="py-12 sm:py-16 lg:py-20 xl:py-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="max-w-xl mx-auto text-center">
          <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Latest from news
          </h2>
          <p class="mt-4 text-base font-normal leading-7 text-gray-400 lg:text-lg lg:mt-6 lg:leading-8">
            capgo gives you the best insights you need to create a truly professional mobile app.
          </p>
        </div>

        <div class="grid max-w-md grid-cols-1 gap-5 mx-auto mt-12 xl:gap-6 lg:grid-cols-3 lg:max-w-none sm:mt-16">
          <Blog
            v-for="article in articles" :key="article._id"
            :link="article._path"
            :link="article.slug"
            :title="article.title"
            :description="article.description"
            :image="article.head_image"
            :date="article.created_at"
            :tag="article.tag"
          />
        </div>

        <div class="mt-12 text-center">
          <NuxtLink to="/blog" title="" class="inline-flex items-center text-sm font-semibold text-white transition-all duration-200 group hover:text-gray-200 hover:underline">
            See all from our blog
            <svg class="w-5 h-5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
