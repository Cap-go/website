<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import type { Locales } from '@/services/locale'
import translations from '@/services/translations'
import { getRelativeLocaleUrl } from 'astro:i18n'
import { ref } from 'vue'

const config = useRuntimeConfig()
const brand = config.public.brand
const props = defineProps<{
  locale: Locales
}>()

const menuMobile = ref(false)
</script>

<template>
  <header class="relative py-2">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between">
        <div class="flex-shrink-0">
          <a :href="getRelativeLocaleUrl(props.locale)" title="Capgo home" aria-label="Capgo home" class="font-prompt flex items-center pr-3 text-4xl font-medium">
            <img class="h-18 w-auto pr-1" loading="eager" height="72" width="133" :alt="`${brand} logo`" :title="`${brand} logo`" src="/capgo_logo.webp" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="text-white" title="Expand menu" @click="menuMobile = !menuMobile">
            <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
          <a
            :href="getRelativeLocaleUrl(props.locale, 'pricing')"
            title="Pricing"
            class="border-b-2 border-transparent text-base font-medium transition-all duration-200 hover:border-blue-600 focus:border-blue-600"
          >
            {{ translations['pricing'][props.locale] }}
          </a>
          <a
            :href="getRelativeLocaleUrl(props.locale, 'blog')"
            title="Blog"
            class="border-b-2 border-transparent text-base font-medium transition-all duration-200 hover:border-blue-600 focus:border-blue-600"
          >
            {{ translations['blog'][props.locale] }}
          </a>
          <a
            :href="getRelativeLocaleUrl(props.locale, 'docs')"
            title="Documentation"
            class="border-b-2 border-transparent text-base font-medium transition-all duration-200 hover:border-blue-600 focus:border-blue-600"
          >
            {{ translations['documentation'][props.locale] }}
          </a>
          <a
            :href="getRelativeLocaleUrl(props.locale, 'login')"
            title="Login"
            target="_blank"
            class="border-b-2 border-transparent text-base font-medium transition-all duration-200 hover:border-blue-600 focus:border-blue-600"
          >
            {{ translations['login'][props.locale] }}
          </a>
          <a
            :href="getRelativeLocaleUrl(props.locale, 'register')"
            target="_blank"
            title="Register"
            class="font-pj rounded-xl border border-gray-300 bg-transparent px-5 py-2 text-base font-semibold leading-7 text-gray-300 transition-all duration-200 hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            role="button"
          >
            {{ translations['register'][props.locale] }}
          </a>
        </div>
      </div>
    </div>
    <div :class="{ hidden: !menuMobile }">
      <div class="mt-2 space-y-1 bg-gray-700 px-2 pb-3 pt-2">
        <a
          :href="getRelativeLocaleUrl(props.locale, 'pricing')"
          :title="translations['pricing'][props.locale]"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Pricing
        </a>
        <a
          :href="getRelativeLocaleUrl(props.locale, 'blog')"
          :title="translations['blog'][props.locale]"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Blog
        </a>
        <a
          :href="getRelativeLocaleUrl(props.locale, 'docs')"
          :title="translations['documentation'][props.locale]"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Documentation
        </a>
        <a
          href="https://web.capgo.app/login/"
          target="_blank"
          :title="translations['login'][props.locale]"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Login
        </a>
        <a
          :href="getRelativeLocaleUrl(props.locale, 'register')"
          target="_blank"
          :title="translations['register'][props.locale]"
          class="font-pj block rounded-md rounded-xl border border-gray-300 bg-gray-900 bg-transparent px-5 py-2 text-base font-medium font-semibold leading-7 text-gray-300 text-white transition-all duration-200 hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          Register
        </a>
      </div>
    </div>
  </header>
</template>
