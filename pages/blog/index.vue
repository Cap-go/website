<script setup lang="ts">
import dayjs from 'dayjs'
import { createMeta } from '~/services/meta'
import type { MyCustomParsedContent } from '~~/services/blog'

const title = 'Capgo | Capacitor Blog'
const description = 'The best articles to enhance your Capacitor app. Do more with Capacitor and Capgo. Learn how to build a modern app with Capacitor.'
const { data: articles } = await useAsyncData('allArticles', () =>
  queryContent<MyCustomParsedContent>('blog').where({ published: true }).find())

const articlesOrder = computed(() =>
  articles.value?.sort((a: MyCustomParsedContent, b: MyCustomParsedContent) => {
    return dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf()
  }),
)

useHead(() => ({
  titleTemplate: title,
  meta: createMeta(title, description),
}))

const formatTime = (s: string) => {
  // use dayjs to parse dd-mm-yyyy
  const d = dayjs(s, 'YYYY-MM-DD')
  return d.format('MMMM DD, YYYY')
}
</script>

<template>
  <section class="py-10 sm:py-12 lg:py-20">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div class="max-w-2xl mx-auto text-center">
        <h1
          class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          Latest from our blog
        </h1>
        <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-50">
          The best articles to enhance your Capacitor experience.
        </p>
      </div>

      <div
        class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full"
      >
        <div
          v-for="(article, index) in articlesOrder"
          :key="index"
          class="overflow-hidden bg-white rounded shadow"
        >
          <div class="p-5">
            <div class="relative">
              <NuxtLink
                :to="`/blog/${article.slug}/`"
                :title="article.title"
                class="block aspect-w-4 aspect-h-3"
              >
                <img
                  class="object-cover w-full h-full rounded-lg"
                  :src="article.head_image"
                  :alt="`blog illustration ${article.title}`"
                >
              </NuxtLink>

              <div class="absolute top-4 left-4">
                <span
                  class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"
                >
                  {{ article.tag }}
                </span>
              </div>
            </div>
            <span
              class="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"
            >
              {{ formatTime(article.created_at) }}
            </span>
            <p class="mt-5 text-2xl font-semibold">
              <NuxtLink :to="`/blog/${article.slug}/`" :title="article.title" class="text-black">
                {{ article.title }}
              </NuxtLink>
            </p>
            <p class="mt-4 text-base text-gray-600">
              {{ article.description }}
            </p>
            <NuxtLink
              :to="`/blog/${article.slug}/`"
              :title="article.title"
              class="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-gray-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
            >
              Continue Reading
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

