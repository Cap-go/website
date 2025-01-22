<script setup lang="ts">
import Blog from '@/components/Blog.vue'
import { formatTime } from '@/config/app'
import { type Locales } from '@/services/locale'
import * as m from "../../paraglide/messages.js"
import { getRelativeLocaleUrl } from 'astro:i18n'
import { onMounted, ref, type Ref } from 'vue'

const props = defineProps<{
  toc?: any[]
  tag?: string
  slug?: string
  related?: any
  Content?: any
  title?: string
  author?: string
  locale: Locales
  next_blog?: string
  published?: boolean
  author_url?: string
  created_at?: string
  updated_at?: string
  head_image?: string
  description?: string
  head_image_alt?: string
}>()

const isFixedTocVisible = ref(false)
const activeSlug = ref<boolean | string>(false)
const article: Ref<HTMLElement | null> = ref(null)
const fixedToc: Ref<HTMLElement | null> = ref(null)
const staticToc: Ref<HTMLElement | null> = ref(null)

const observeArticleTitles = () => {
  const headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6')
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i]
    const rect = heading.getBoundingClientRect()
    if (rect.top <= 50 && rect.bottom >= 50) {
      const tmp = heading.getAttribute('id')
      if (tmp) {
        activeSlug.value = tmp
        history.replaceState(null, '', `#${tmp}`)
        break
      }
    }
  }
}

const handleScroll = () => {
  if (staticToc.value && fixedToc.value) {
    const staticTocRect = staticToc.value.getBoundingClientRect()
    // const articleRect = article.value.getBoundingClientRect()
    isFixedTocVisible.value = staticTocRect.top <= 80
  }
  observeArticleTitles()
}

onMounted(() => window.addEventListener('scroll', handleScroll))
</script>

<template>
  <main class="text-center text-white">
    <div
      ref="fixedToc"
      class="fixed left-10 top-20 z-10 hidden max-h-[calc(100vh-80px)] overflow-y-auto opacity-0 transition-opacity duration-300 xl:block"
      :class="{ 'opacity-100': isFixedTocVisible }"
    >
      <div class="w-[280px] rounded bg-white/10 p-5">
        <ul v-if="toc?.length" class="flex flex-col text-left list-none">
          <span class="pb-1 text-lg border-b border-gray-600">{{ m.table_of_contents() }}</span>
          <li v-for="item in toc" :key="item.slug" class="block mt-2 text-gray-400 truncate hover:text-gray-200">
            <a :class="`pl-${Math.max(0, (item.depth - 2) * 2)} ${activeSlug === item.slug && 'text-white'}`" :href="`#${item.slug}`">
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="relative pb-4 mx-auto lg:max-w-1/2">
      <div class="block aspect-w-4 aspect-h-3">
        <img
          class="object-cover w-full h-full md:shadow-xl md:shadow-gray-700 lg:rounded-lg"
          :src="props?.head_image"
          loading="eager"
          height="486"
          width="864"
          :alt="`article illustration ${props?.title}`"
          :title="`article illustration ${props?.title}`"
        />
      </div>
      <div class="absolute lg:top-15 left-4 top-4 lg:left-10">
        <span class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
          {{ props?.tag }}
        </span>
      </div>
    </div>
    <span class="block mt-6 text-sm font-semibold tracking-widest text-white uppercase">
      {{ formatTime(props?.created_at || '') }}
    </span>
    <div class="relative toc-wrapper">
      <h1 class="px-4 py-5 mx-auto text-3xl lg:max-w-1/2 font-800 lg:text-4xl">
        {{ props?.title }}
      </h1>
      <p class="px-4 py-5 mx-auto text-left lg:max-w-1/2">
        {{ props?.description }}
      </p>
      <div class="hidden pl-2 pl-4 pl-6 pl-8 pl-10" />
      <div ref="staticToc" class="absolute top-0 hidden max-h-screen overflow-y-auto transition-opacity duration-300 left-10 xl:block" :class="{ 'opacity-0': isFixedTocVisible }">
        <div class="w-[280px] rounded bg-white/10 p-5">
          <ul v-if="toc?.length" class="flex flex-col text-left list-none">
            <span class="pb-1 text-lg border-b border-gray-600">{{ m.table_of_contents() }}</span>
            <li v-for="item in toc" :key="item.slug" class="block mt-2 text-gray-400 truncate hover:text-gray-200">
              <a :class="`pl-${Math.max(0, (item.depth - 2) * 2)} ${activeSlug === item.slug && 'text-white'}`" :href="`#${item.slug}`">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="toc?.length" class="flex flex-col px-4 mx-auto text-left rounded xl-hidden lg:max-w-1/2">
        <ul class="flex flex-col p-4 rounded bg-white/10">
          <span class="pb-1 text-lg border-b border-gray-600">{{ m.table_of_contents() }}</span>
          <div class="hidden pl-4 pl-8 pl-12 pl-16 pl-20" />
          <li v-for="item in toc" class="block mt-2 text-gray-400 truncate hover:text-gray-200">
            <a :class="`pl-${Math.max(0, (item.depth - 2) * 4)}`" :href="`#${item.slug}`">
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
      <article ref="article" v-if="props" class="px-4 pb-4 mx-auto prose text-left text-white lg:max-w-1/2 md:rounded-lg" v-html="props.Content" />
    </div>
    <section class="py-12 sm:py-16 lg:py-20 xl:py-24">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-xl mx-auto text-center">
          <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{{ m.latest_from_news() }}</h2>
          <p class="mt-4 text-base font-normal leading-7 text-gray-400 lg:mt-6 lg:text-lg lg:leading-8">
            {{ m.capgo_gives_you_the_best_insights_you_need_to_create_a_truly_professional_mobile_app() }}
          </p>
        </div>
        <div v-if="related" class="grid max-w-md grid-cols-1 gap-5 mx-auto mt-12 sm:mt-16 lg:max-w-none lg:grid-cols-3 xl:gap-6">
          <Blog
            v-for="article in related"
            :tag="article.data.tag"
            :key="article.data.slug"
            :link="article.data.slug"
            :title="article.data.title"
            :locale="article.data.locale"
            :date="article.data.created_at"
            :image="article.data.head_image"
            :description="article.data.description"
          />
        </div>
        <div class="mt-12 text-center">
          <a
            :href="getRelativeLocaleUrl(props.locale, 'blog')"
            class="inline-flex items-center text-sm font-semibold text-white transition-all duration-200 group hover:text-gray-200 hover:underline"
          >
            {{ m.see_all_from_our_blog() }}
            <svg
              class="ml-1 h-5 w-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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

<style scoped>
.transition-opacity {
  transition-property: opacity;
  transition-duration: 1s;
  transition-timing-function: ease-in-out;
}
</style>
