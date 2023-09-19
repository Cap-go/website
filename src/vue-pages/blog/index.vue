<script setup lang="ts">
import { computed, ref } from 'vue'
import Blog from '../../components/Blog.vue'
import { useRuntimeConfig } from '../../config/app'

const props = defineProps<{
  Content?: any
}>()
const config = useRuntimeConfig()
const selectedTag = ref('all')

const filteredPosts = computed(() => {
  if (selectedTag.value === 'all')
    return props.Content

  else
    return props.Content.filter(article => article.frontmatter.tag.toUpperCase() === selectedTag.value.toUpperCase())
})

const uniqueTags = computed(() => {
  const tags = new Set()
  for (const article of props.Content)
    tags.add(article.frontmatter.tag.toUpperCase())

  const uniqueTagsArray = Array.from(tags).map(tag => tag[0].toUpperCase() + tag.slice(1)).sort()
  return uniqueTagsArray
})
</script>

<template>
  <section class="py-10 sm:py-12 lg:py-20">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Latest from the blog
        </h1>
        <h2 class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-50">
          {{ config.public.blog_description }}
        </h2>
      </div>
      <div class="mx-auto max-w-3xl mt-8 text-center">
        <div class="mb-4">
          <div class="flex justify-center flex-wrap mt-5 gap-2">
            <button
              :class="{ ' bg-gray-500': selectedTag === 'all', ' bg-transparent border border-gray-300': selectedTag !== 'all' }"
              class="px-3 py-2 rounded-md hover:bg-gray-500 hover:border-transparent text-base font-medium hover:text-white transition-colors duration-300 ease-in-out"
              @click="selectedTag = 'all'"
            >
              ALL
            </button>
            <button
              v-for="(tag, index) in uniqueTags"
              :key="index"
              :class="{ 'bg-gray-500': selectedTag === tag, 'bg-transparent border border-gray-300': selectedTag !== tag }"
              class="px-3 py-2 rounded-md hover:bg-gray-500 hover:border-transparent text-base font-medium hover:text-white transition-colors duration-300 ease-in-out"
              @click="selectedTag = tag"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
      <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
        <Blog
          v-for="article in filteredPosts"
          :key="article.frontmatter.slug"
          :tag="article.frontmatter.tag"
          :link="article.frontmatter.slug"
          :title="article.frontmatter.title"
          :date="article.frontmatter.created_at"
          :image="article.frontmatter.head_image"
          :description="article.frontmatter.description"
        />
      </div>
    </div>
  </section>
</template>
