<script setup lang="ts">
import type { Plugin } from '@/config/plugins'
import * as m from '@/paraglide/messages'
import { getRelativeLocaleUrl } from 'astro:i18n'
import { ref } from 'vue'

const props = defineProps<Plugin>()
const showReadme = ref(1)
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div class="flex flex-row flex-wrap w-full px-10 lg:max-w-6xl xl:px-0">
      <a
        aria-label="Back To Plugins"
        :href="getRelativeLocaleUrl(props.locale || 'en', 'plugins')"
        class="max-w-max border-b border-white/10 pb-0.5 text-white/50 hover:text-white"
      >
        ← Back To Plugins
      </a>
    </div>
    <div class="flex flex-row flex-wrap w-full gap-8 px-10 mt-6 lg:max-w-6xl xl:px-0">
      <button class="px-3 py-1 text-sm" :class="showReadme !== 0 ? 'rounded border border-white' : 'rounded border border-white/10'" @click="showReadme = 1">
        {{ m.tutorial_on({}, { locale: props.locale }) }} {{ props.title }}
      </button>
      <button class="px-3 py-1 text-sm" :class="showReadme === 0 ? 'rounded border border-white' : 'rounded border border-white/10'" @click="showReadme = 0">
        {{ m.about({}, { locale: props.locale }) }} {{ props.title }}
      </button>
    </div>
    <div class="flex flex-col items-center w-full mt-6">
      <div :class="showReadme === 1 ? 'hidden' : 'flex'" class="z-10 flex-row flex-wrap w-full gap-10 px-10 mb-8 md:flex-nowrap lg:max-w-6xl xl:px-0">
        <div class="flex flex-col w-full">
          <h1 class="mt-4 text-2xl font-bold md:text-4xl">
            {{ props.title }}
          </h1>
          <h1 class="mt-8 text-lg font-light md:text-xl">
            {{ props.description }}
          </h1>
          <div v-if="props.githubStars" class="flex flex-row items-center justify-between pt-2 mt-8 border-t border-white/10">
            <span class="text-sm font-semibold text-gray-400">GitHub Stars</span> <span class="text-gray-600">{{ props.githubStars }}</span>
          </div>
          <div v-if="props.npmDownloads" class="flex flex-row items-center justify-between pt-2 mt-4 border-t border-white/10">
            <span class="text-sm font-semibold text-gray-400">NPM Downloads</span> <span class="text-gray-600">{{ props.npmDownloads }}</span>
          </div>
          <div class="flex flex-row flex-wrap items-center justify-between">
            <a
              v-if="props.href"
              aria-label="View Repo URL"
              class="w-full px-6 py-2 mt-8 text-sm text-center border rounded border-white/50 hover:border-white sm:w-auto"
              :href="props.href"
              target="_blank"
            >
              {{ m.view_repo({}, { locale: props.locale }) }} &rarr;
            </a>
            <a
              v-if="props.name"
              aria-label="View NPM"
              class="w-full px-6 py-2 mt-8 text-sm text-center border rounded border-white/50 hover:border-white sm:w-auto"
              :href="`https://www.npmjs.com/package/${props.name}`"
              target="_blank"
            >
              {{ m.view_npm({}, { locale: props.locale }) }} &rarr;
            </a>
          </div>
          <div v-if="props.readme" id="readme" class="my-8 prose" v-html="props.readme" />
        </div>
      </div>
    </div>
    <div :class="showReadme !== 1 ? 'hidden' : 'block'" id="tutorial" v-if="props.tutorial">
      <div class="w-full px-10 prose lg:max-w-6xl xl:px-0" v-html="props.tutorial" />
    </div>
  </div>
</template>

<style>
img[src*='badge'] {
  width: auto;
  height: 25px;
  margin-bottom: 10px;
}

img[src*='shields.io'] {
  width: auto;
  height: 25px;
  margin-bottom: 10px;
}
</style>
