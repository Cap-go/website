<script setup lang="ts">
import Blog from '../../components/Blog.vue'
import { formatTime } from '../../config/app'
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

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
}>()

const staticToc: Ref<HTMLElement | null> = ref(null)
const fixedToc: Ref<HTMLElement | null> = ref(null)
const article: Ref<HTMLElement | null> = ref(null)
const isFixedTocVisible = ref(false)
const activeSlug = ref('')

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  observeArticleTitles()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


function handleScroll() {
  const headings = document.querySelectorAll('h2,h3,h4,h5,h6')
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i]
    const rect = heading.getBoundingClientRect()
    if (rect.top <= 50 && rect.bottom >= 50) {
      activeSlug.value = heading.getAttribute('id')
      break
    }
  }
  if (staticToc.value && fixedToc.value) {
    const staticTocRect = staticToc.value.getBoundingClientRect()

    if (staticTocRect.top <= 80) {
      isFixedTocVisible.value = true
    } else {
      isFixedTocVisible.value = false
    }
  }
}

function observeArticleTitles() {
  console.log('observeArticleTitles', article.value)
  if (article.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.id
            activeSlug.value = slug
            updateURL(slug)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    const titles = article.value.querySelectorAll('h1, h2, h3, h4, h5, h6')
    titles.forEach((title) => {
      observer.observe(title)
    })

    // Check if the first title is already in view
    const firstTitle = titles[0]
    if (firstTitle) {
      const firstTitleRect = firstTitle.getBoundingClientRect()
      const articleRect = article.value.getBoundingClientRect()
      if (firstTitleRect.top >= articleRect.top) {
        activeSlug.value = firstTitle.id
      }
    }
  }
}

function updateURL(slug: string) {
  // console.log('updateURL', slug)
  window.location.hash = slug
}
</script>

<template>
  <main class="text-center text-white">
    <div ref="fixedToc" class="hidden xl:block fixed top-20 left-10 max-h-[calc(100vh-80px)] overflow-y-auto z-10 opacity-0 transition-opacity duration-300" :class="{ 'opacity-100': isFixedTocVisible }">
        <div class="bg-white/10 p-5 rounded w-[280px]">
          <ul v-if="toc?.length" class="list-none flex flex-col text-left">
            <span class="text-lg border-b pb-1 border-gray-600">Table Of Contents</span>
            <li v-for="item in toc" :key="item.slug" class="truncate block mt-2 text-gray-400 hover:text-gray-200" :class="{ 'text-white': activeSlug === item.slug }">
              <a :class="`pl-${Math.max(0, (item.depth - 2) * 2)}`" :href="`#${item.slug}`">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    <div class="relative pb-4 lg:max-w-1/2 mx-auto">
      <div class="block aspect-w-4 aspect-h-3">
        <img
          class="object-cover w-full h-full lg:rounded-lg md:shadow-xl md:shadow-gray-700"
          :src="props?.head_image"
          loading="eager"
          height="486"
          width="864"
          :alt="`article illustration ${props?.title}`"
          :title="`article illustration ${props?.title}`"
        />
      </div>
      <div class="absolute top-4 left-4 lg:top-15 lg:left-10">
        <span class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
          {{ props?.tag }}
        </span>
      </div>
    </div>
    <span class="block mt-6 text-sm font-semibold tracking-widest text-white uppercase">
      {{ formatTime(props?.created_at || '') }}
    </span>
    <div class="relative toc-wrapper">
      <h1 class="py-5 text-3xl lg:text-4xl lg:max-w-1/2 px-4 font-800 mx-auto">
        {{ props?.title }}
      </h1>
      <p class="py-5 px-4 lg:max-w-1/2 mx-auto text-left">
        {{ props?.description }}
      </p>
      <div class="hidden pl-2 pl-4 pl-6 pl-8 pl-10" />
      <div ref="staticToc" class="hidden xl:block absolute top-0 left-10 max-h-screen overflow-y-auto transition-opacity duration-300" :class="{ 'opacity-0': isFixedTocVisible }">
        <div class="bg-white/10 p-5 rounded w-[280px]">
          <ul v-if="toc?.length" class="list-none flex flex-col text-left">
            <span class="text-lg border-b pb-1 border-gray-600">Table Of Contents</span>
            <li v-for="item in toc" :key="item.slug" class="truncate block mt-2 text-gray-400 hover:text-gray-200" :class="{ 'text-white': activeSlug === item.slug }">
              <a :class="`pl-${Math.max(0, (item.depth - 2) * 2)}`" :href="`#${item.slug}`">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="toc?.length" class="flex flex-col xl-hidden mx-auto lg:max-w-1/2 rounded text-left px-4">
        <ul class="flex flex-col p-4 rounded bg-white/10">
          <span class="text-lg border-b pb-1 border-gray-600">Table Of Contents</span>
          <div class="hidden pl-4 pl-8 pl-12 pl-16 pl-20" />
          <li v-for="item in toc" class="truncate block mt-2 text-gray-400 hover:text-gray-200">
            <a :class="`pl-${Math.max(0, (item.depth - 2) * 4)}`" :href="`#${item.slug}`">
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
      <article ref="article" v-if="props" class="mx-auto text-left text-white prose md:rounded-lg text-white pb-4 px-4 lg:max-w-1/2" v-html="props.Content" />
    </div>
    <section class="py-12 sm:py-16 lg:py-20 xl:py-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="max-w-xl mx-auto text-center">
          <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">Latest from news</h2>
          <p class="mt-4 text-base font-normal leading-7 text-gray-400 lg:text-lg lg:mt-6 lg:leading-8">
            capgo gives you the best insights you need to create a truly professional mobile app.
          </p>
        </div>
        <div v-if="related" class="grid max-w-md grid-cols-1 gap-5 mx-auto mt-12 xl:gap-6 lg:grid-cols-3 lg:max-w-none sm:mt-16">
          <Blog
            v-for="article in related"
            :key="article.frontmatter.slug"
            :tag="article.frontmatter.tag"
            :link="article.frontmatter.slug"
            :title="article.frontmatter.title"
            :date="article.frontmatter.created_at"
            :image="article.frontmatter.head_image"
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
<style scoped>
.transition-opacity {
  transition-property: opacity;
  transition-duration: 1s;
  transition-timing-function: ease-in-out;
}
</style>
