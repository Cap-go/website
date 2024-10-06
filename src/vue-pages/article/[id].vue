<script setup lang="ts">
import Blog from '@/components/Blog.vue'
import { formatTime } from '@/config/app'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'
import { onMounted, ref, type Ref } from 'vue'
import { getRelativeLocaleUrl } from 'astro:i18n'

const props = defineProps<{
  Content?: any
  toc?: any[]
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
  locale: Locales
}>()

const staticToc: Ref<HTMLElement | null> = ref(null)
const fixedToc: Ref<HTMLElement | null> = ref(null)
const article: Ref<HTMLElement | null> = ref(null)
const isFixedTocVisible = ref(false)
const activeSlug = ref<boolean | string>(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

function handleScroll() {
  if (staticToc.value && fixedToc.value) {
    const staticTocRect = staticToc.value.getBoundingClientRect()
    isFixedTocVisible.value = staticTocRect.top <= 80
  }
  observeArticleTitles()
}

function observeArticleTitles() {
  const headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6')
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i]
    const rect = heading.getBoundingClientRect()
    if (rect.top <= 50 && rect.bottom >= 50) {
      const tmp = heading.getAttribute('id')
      if (tmp) {
        activeSlug.value = tmp
        history.replaceState(null, null, `#${tmp}`)
        break
      }
    }
  }
}
</script>

<template>
  <main class="text-center text-white">
    <div
      ref="fixedToc"
      class="fixed left-10 top-20 z-10 hidden max-h-[calc(100vh-80px)] overflow-y-auto opacity-0 transition-opacity duration-300 xl:block"
      :class="{ 'opacity-100': isFixedTocVisible }"
    >
      <div class="w-[280px] rounded bg-white/10 p-5">
        <ul v-if="toc?.length" class="flex list-none flex-col text-left">
          <span class="border-b border-gray-600 pb-1 text-lg">{{ translations['table_of_contents'][props.locale] }}</span>
          <li v-for="item in toc" :key="item.slug" class="mt-2 block truncate text-gray-400 hover:text-gray-200">
            <a :class="`pl-${Math.max(0, (item.depth - 2) * 2)} ${activeSlug === item.slug && 'text-white'}`" :href="`#${item.slug}`">
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="lg:max-w-1/2 relative mx-auto pb-4">
      <div class="aspect-w-4 aspect-h-3 block">
        <img
          class="h-full w-full object-cover md:shadow-xl md:shadow-gray-700 lg:rounded-lg"
          :src="props?.head_image"
          loading="eager"
          height="486"
          width="864"
          :alt="`article illustration ${props?.title}`"
          :title="`article illustration ${props?.title}`"
        />
      </div>
      <div class="lg:top-15 absolute left-4 top-4 lg:left-10">
        <span class="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-900">
          {{ props?.tag }}
        </span>
      </div>
    </div>
    <span class="mt-6 block text-sm font-semibold uppercase tracking-widest text-white">
      {{ formatTime(props?.created_at || '') }}
    </span>
    <div class="toc-wrapper relative">
      <h1 class="lg:max-w-1/2 font-800 mx-auto px-4 py-5 text-3xl lg:text-4xl">
        {{ props?.title }}
      </h1>
      <p class="lg:max-w-1/2 mx-auto px-4 py-5 text-left">
        {{ props?.description }}
      </p>
      <div class="hidden pl-10 pl-2 pl-4 pl-6 pl-8" />
      <div ref="staticToc" class="absolute left-10 top-0 hidden max-h-screen overflow-y-auto transition-opacity duration-300 xl:block" :class="{ 'opacity-0': isFixedTocVisible }">
        <div class="w-[280px] rounded bg-white/10 p-5">
          <ul v-if="toc?.length" class="flex list-none flex-col text-left">
            <span class="border-b border-gray-600 pb-1 text-lg">{{ translations['table_of_contents'][props.locale] }}</span>
            <li v-for="item in toc" :key="item.slug" class="mt-2 block truncate text-gray-400 hover:text-gray-200">
              <a :class="`pl-${Math.max(0, (item.depth - 2) * 2)} ${activeSlug === item.slug && 'text-white'}`" :href="`#${item.slug}`">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="toc?.length" class="xl-hidden lg:max-w-1/2 mx-auto flex flex-col rounded px-4 text-left">
        <ul class="flex flex-col rounded bg-white/10 p-4">
          <span class="border-b border-gray-600 pb-1 text-lg">{{ translations['table_of_contents'][props.locale] }}</span>
          <div class="hidden pl-12 pl-16 pl-20 pl-4 pl-8" />
          <li v-for="item in toc" class="mt-2 block truncate text-gray-400 hover:text-gray-200">
            <a :class="`pl-${Math.max(0, (item.depth - 2) * 4)}`" :href="`#${item.slug}`">
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
      <article ref="article" v-if="props" class="prose lg:max-w-1/2 mx-auto px-4 pb-4 text-left text-white md:rounded-lg" v-html="props.Content" />
    </div>
    <section class="py-12 sm:py-16 lg:py-20 xl:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-xl text-center">
          <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{{ translations['latest_from_news'][props.locale] }}</h2>
          <p class="mt-4 text-base font-normal leading-7 text-gray-400 lg:mt-6 lg:text-lg lg:leading-8">
            {{ translations['capgo_gives_you_the_best_insights_you_need_to_create_a_truly_professional_mobile_app'][props.locale] }}
          </p>
        </div>
        <div v-if="related" class="mx-auto mt-12 grid max-w-md grid-cols-1 gap-5 sm:mt-16 lg:max-w-none lg:grid-cols-3 xl:gap-6">
          <Blog
            v-for="article in related"
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
        <div class="mt-12 text-center">
          <a
            :href="getRelativeLocaleUrl(props.locale, 'blog')"
            class="group inline-flex items-center text-sm font-semibold text-white transition-all duration-200 hover:text-gray-200 hover:underline"
          >
            {{ translations['see_all_from_our_blog'][props.locale] }}
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
