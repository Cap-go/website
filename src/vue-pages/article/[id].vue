<script setup lang="ts">
import Blog from '../../components/Blog.vue'
import { formatTime } from '../../config/app'

const props = defineProps<{
  Content?: any
  slug?: string
  title?: string
  description?: string
  author?: string
  author_url?: string
  created_at?: string
  updated_at?: string
  head_image?: string
  head_image_alt?: string
  tag?: string
  published?: boolean
  next_blog?: string
  related?: any
}>()
</script>

<template>
  <main class="text-center text-white">
    <div class="relative pb-4 lg:max-w-1/2 mx-auto">
      <div v-if="props?.head_image" class="block aspect-w-4 aspect-h-3">
        <img class="object-cover w-full h-full lg:rounded-lg" :src="props?.head_image" :alt="`article illustration ${props?.title}`">
      </div>

      <div class="absolute top-4 left-4 lg:top-15 lg:left-10">
        <span class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
          {{ props?.tag }}
        </span>
      </div>
    </div>
    <span v-if="props?.created_at" class="block mt-6 text-sm font-semibold tracking-widest text-white uppercase">
      {{ formatTime(props?.created_at) }}
    </span>

    <h1 class="py-5 text-3xl lg:text-4xl lg:max-w-1/2 px-4 font-800 mx-auto">
      {{ props?.title }}
    </h1>
    <p class="py-5 px-4 lg:max-w-1/2 mx-auto text-left">
      {{ props?.description }}
    </p>
    <article v-if="props" class="mx-auto text-left text-white prose text-white pb-4 px-4 lg:max-w-1/2" v-html="props.Content.props.children" />
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

        <div v-if="related" class="grid max-w-md grid-cols-1 gap-5 mx-auto mt-12 xl:gap-6 lg:grid-cols-3 lg:max-w-none sm:mt-16">
          <Blog
            v-for="article in related"
            :key="article.frontmatter.slug"
            :tag="article.frontmatter.tag"
            :title="article.frontmatter.title"
            :date="article.frontmatter.created_at"
            :image="article.frontmatter.head_image"
            :link="`/blog/${article.frontmatter.slug}/`"
            :description="article.frontmatter.description"
          />
        </div>

        <div class="mt-12 text-center">
          <a href="/blog" title="" class="inline-flex items-center text-sm font-semibold text-white transition-all duration-200 group hover:text-gray-200 hover:underline">
            See all from our blog
            <svg
              class="w-5 h-5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
