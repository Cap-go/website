<script setup lang="ts">
import { formatTime } from '@/config/app'
import type { Locales } from '@/services/locale'
import translations from '@/services/translations'
import { getRelativeLocaleUrl } from 'astro:i18n'
import { computed } from 'vue'

const props = defineProps<{
  tag: string
  link: string
  date: string
  title: string
  image?: string
  locale: Locales
}>()

const cannLink = computed(() => getRelativeLocaleUrl(props.locale, 'blog/' + props.link))
</script>

<template>
  <div class="overflow-hidden rounded-xl bg-gray-700">
    <div>
      <div class="relative p-2">
        <a :href="cannLink" :title="title" class="aspect-w-4 aspect-h-3 block">
          <img
            height="350"
            width="997"
            loading="lazy"
            class="h-full w-full rounded-lg object-cover"
            :src="image"
            :alt="`blog illustration ${title}`"
            :title="`blog illustration ${title}`"
          />
        </a>
        <div class="absolute left-4 top-4">
          <span class="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-900 shadow-lg">
            {{ tag }}
          </span>
        </div>
      </div>
      <span class="mt-3 block px-5 text-sm font-semibold uppercase tracking-widest text-gray-300">
        {{ formatTime(date) }}
      </span>
      <p class="mt-3 px-5 text-2xl font-semibold">
        <a :href="cannLink" :title="title" class="text-gray-100">
          {{ title }}
        </a>
      </p>
      <a
        :href="cannLink"
        :title="title"
        class="m-5 mt-5 inline-flex items-center justify-center border-b-2 border-blue-300 pb-0.5 text-base font-semibold text-gray-200 transition-all duration-200 hover:border-blue-600 focus:border-blue-600"
      >
        {{ translations['read_more'][props.locale] }}
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</template>
