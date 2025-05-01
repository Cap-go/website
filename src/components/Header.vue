<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import * as m from '@/paraglide/messages'
import type { Locales } from '@/services/locale'
import { getRelativeLocaleUrl } from 'astro:i18n'
import { ref } from 'vue'

const config = useRuntimeConfig()
const brand = config.public.brand
const props = defineProps<{ locale: Locales }>()

const menuMobile = ref(false)
</script>

<template>
  <header class="relative py-2">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between">
        <div class="shrink-0">
          <a :href="getRelativeLocaleUrl(props.locale)" title="Capgo home" aria-label="Capgo home" class="flex items-center pr-3 text-4xl font-medium font-prompt">
            <img class="w-auto pr-1 h-18" loading="eager" height="72" width="133" :alt="`${brand} logo`" :title="`${brand} logo`" src="/capgo_logo.webp" />
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
            class="text-base font-medium transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
          >
            {{ m.pricing({}, { locale: props.locale }) }}
          </a>
          <a
            :href="getRelativeLocaleUrl(props.locale, 'blog')"
            title="Blog"
            class="text-base font-medium transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
          >
            {{ m.blog({}, { locale: props.locale }) }}
          </a>
          <a
            :href="getRelativeLocaleUrl(props.locale, 'docs')"
            title="Documentation"
            class="text-base font-medium transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
          >
            {{ m.documentation({}, { locale: props.locale }) }}
          </a>
          <a
            href="https://web.capgo.app/login/"
            title="Login"
            target="_blank"
            class="text-base font-medium transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
          >
            {{ m.login({}, { locale: props.locale }) }}
          </a>
          <a
            :href="getRelativeLocaleUrl(props.locale, 'register')"
            target="_blank"
            title="Register"
            class="px-5 py-2 text-base font-semibold leading-7 text-gray-300 transition-all duration-200 bg-transparent border border-gray-300 font-pj rounded-xl hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            role="button"
          >
            {{ m.register({}, { locale: props.locale }) }}
          </a>
        </div>
      </div>
    </div>
    <div :class="{ hidden: !menuMobile }">
      <div class="px-2 pt-2 pb-3 mt-2 space-y-1 bg-gray-700">
        <a
          :href="getRelativeLocaleUrl(props.locale, 'pricing')"
          :title="m.pricing({}, { locale: props.locale })"
          class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          Pricing
        </a>
        <a
          :href="getRelativeLocaleUrl(props.locale, 'blog')"
          :title="m.blog({}, { locale: props.locale })"
          class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          Blog
        </a>
        <a
          :href="getRelativeLocaleUrl(props.locale, 'docs')"
          :title="m.documentation({}, { locale: props.locale })"
          class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          Documentation
        </a>
        <a
          href="https://web.capgo.app/login/"
          target="_blank"
          :title="m.login({}, { locale: props.locale })"
          class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          Login
        </a>
        <a
          :href="getRelativeLocaleUrl(props.locale, 'register')"
          target="_blank"
          :title="m.register({}, { locale: props.locale })"
          class="block px-5 py-2 text-base font-medium font-semibold leading-7 text-white text-gray-300 transition-all duration-200 bg-transparent bg-gray-900 border border-gray-300 rounded-md font-pj rounded-xl hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          Register
        </a>
      </div>
    </div>
  </header>
</template>
