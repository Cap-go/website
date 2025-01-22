<script setup lang="ts">
import Blog from '@/components/Blog.vue'
import { useRuntimeConfig } from '@/config/app'
import { type Locales } from '@/services/locale'
import * as m from "../../paraglide/messages.js"
import { computed, ref } from 'vue'
import type { CollectionEntry } from 'astro:content';

const props = defineProps<{
  locale: Locales
  Content: CollectionEntry<'blog'>[]
}>()
const selectedTag = ref('all')
const config = useRuntimeConfig()

const filteredPosts = computed(() => {
  if (selectedTag.value === 'all') return props.Content
  return props.Content.filter((article) => article.data.tag.toUpperCase() === selectedTag.value.toUpperCase())
})

const uniqueTags = computed(() => {
  const tags = new Set<string>()
  props.Content.forEach((article) => tags.add(article.data.tag.toUpperCase()))
  return Array.from(tags)
    .map((tag) => tag[0].toUpperCase() + tag.substring(1, tag.length).toLowerCase())
    .sort()
})
</script>

<template>
  <section class="py-10 sm:py-12 lg:py-20">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{{ m.latest_from_the_blog() }}</h1>
        <h2 class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-50">
          {{ config.public.blog_description }}
        </h2>
      </div>
      <div class="max-w-3xl mx-auto mt-8 text-center">
        <div class="mb-4">
          <div class="flex flex-wrap justify-center gap-2 mt-5">
            <button
              @click="selectedTag = 'all'"
              :class="{ 'bg-gray-500': selectedTag === 'all', 'border border-gray-300 bg-transparent': selectedTag !== 'all' }"
              class="px-3 py-2 text-base font-medium transition-colors duration-300 ease-in-out rounded-md hover:border-transparent hover:bg-gray-500 hover:text-white"
            >
              All
            </button>
            <button
              v-for="(tag, index) in uniqueTags"
              :key="index"
              @click="selectedTag = tag"
              :class="{ 'bg-gray-500': selectedTag === tag, 'border border-gray-300 bg-transparent': selectedTag !== tag }"
              class="px-3 py-2 text-base font-medium transition-colors duration-300 ease-in-out rounded-md hover:border-transparent hover:bg-gray-500 hover:text-white"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
      <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:max-w-full lg:grid-cols-3">
        <Blog
          v-for="article in filteredPosts"
          :tag="article.data.tag"
          :key="article.data.slug"
          :link="article.data.slug"
          :title="article.data.title"
          :locale="article.data.locale"
          :date="article.data.created_at"
          :image="article.data.head_image"
        />
      </div>
    </div>
  </section>
</template>
