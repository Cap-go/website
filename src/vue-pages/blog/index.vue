<script setup lang="ts">
import Blog from '@/components/Blog.vue'
import { useRuntimeConfig } from '@/config/app'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'
import { computed, ref } from 'vue'

const props = defineProps<{
  Content?: any
  locale: Locales
}>()
const selectedTag = ref('all')
const config = useRuntimeConfig()

const filteredPosts = computed(() => {
  if (selectedTag.value === 'all') return props.Content
  return props.Content.filter((article) => article.frontmatter.tag.toUpperCase() === selectedTag.value.toUpperCase())
})

const uniqueTags = computed(() => {
  const tags = new Set<string[]>()
  props.Content.forEach((article) => {
    tags.add(article.frontmatter.tag.toUpperCase())
  })
  return Array.from(tags)
    .map((tag) => tag[0].toUpperCase() + tag.slice(1).toLowerCase())
    .sort()
})
</script>

<template>
  <section class="py-10 sm:py-12 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{{ translations['latest_from_the_blog'][props.locale] }}</h1>
        <h2 class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-50">
          {{ config.public.blog_description }}
        </h2>
      </div>
      <div class="mx-auto mt-8 max-w-3xl text-center">
        <div class="mb-4">
          <div class="mt-5 flex flex-wrap justify-center gap-2">
            <button
              @click="selectedTag = 'all'"
              :class="{ 'bg-gray-500': selectedTag === 'all', 'border border-gray-300 bg-transparent': selectedTag !== 'all' }"
              class="rounded-md px-3 py-2 text-base font-medium transition-colors duration-300 ease-in-out hover:border-transparent hover:bg-gray-500 hover:text-white"
            >
              All
            </button>
            <button
              v-for="(tag, index) in uniqueTags"
              :key="index"
              @click="selectedTag = tag"
              :class="{ 'bg-gray-500': selectedTag === tag, 'border border-gray-300 bg-transparent': selectedTag !== tag }"
              class="rounded-md px-3 py-2 text-base font-medium transition-colors duration-300 ease-in-out hover:border-transparent hover:bg-gray-500 hover:text-white"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-md grid-cols-1 gap-6 lg:mt-16 lg:max-w-full lg:grid-cols-3">
        <Blog
          v-for="article in filteredPosts"
          :tag="article.frontmatter.tag"
          :key="article.frontmatter.slug"
          :link="article.frontmatter.slug"
          :title="article.frontmatter.title"
          :locale="article.frontmatter.locale"
          :date="article.frontmatter.created_at"
          :image="article.frontmatter.head_image"
          :description="article.frontmatter.description"
        />
      </div>
    </div>
  </section>
</template>
