<script setup lang="ts">
import { ref } from 'vue'
import type { Plugin } from '../../config/plugins'

const props = defineProps<Plugin>()

const showReadme = ref(1)
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-full flex flex-row flex-wrap px-10 lg:max-w-6xl xl:px-0">
      <a aria-label="Back To Plugins" href="/plugins/" class="max-w-max border-b border-white/10 pb-0.5 text-white/50 hover:text-white">← Back To Plugins</a>
    </div>
    <div class="mt-6 w-full flex flex-row flex-wrap px-10 gap-8 lg:max-w-6xl xl:px-0">
      <button class="text-sm px-3 py-1" :class="showReadme === 0 ? 'border border-white rounded' : 'border rounded border-white/10'" @click="showReadme = 0">
        About {{ props.title }}
      </button>
      <button class="text-sm px-3 py-1" :class="showReadme !== 0 ? 'border border-white rounded' : 'border rounded border-white/10'" @click="showReadme = 1">
        Tutorial on {{ props.title }}
      </button>
    </div>
    <div class="mt-6 flex w-full flex-col items-center">
      <div :class="showReadme === 1 ? 'hidden' : 'flex'" class="z-10 w-full flex-row flex-wrap gap-10 px-10 md:flex-nowrap lg:max-w-6xl xl:px-0 mb-8">
        <div class="flex w-full flex-col md:w-1/3">
          <h1 class="mt-4 text-2xl font-bold md:text-4xl">
            {{ props.title }}
          </h1>
          <h1 class="mt-8 text-lg font-light md:text-xl">
            {{ props.description }}
          </h1>
          <div v-if="props.githubStars" class="mt-8 flex flex-row items-center justify-between border-t border-white/10 pt-2">
            <span class="text-sm font-semibold text-gray-400">GitHub Stars</span> <span class="text-gray-600">{{ props.githubStars }}</span>
          </div>
          <div v-if="props.npmDownloads" class="mt-4 flex flex-row items-center justify-between border-t border-white/10 pt-2">
            <span class="text-sm font-semibold text-gray-400">NPM Downloads</span> <span class="text-gray-600">{{ props.npmDownloads }}</span>
          </div>
          <div class="flex flex-row flex-wrap items-center justify-between">
            <a
              v-if="props.href"
              aria-label="View Repo URL"
              class="mt-8 w-full rounded border border-white/50 px-6 py-2 text-center text-sm hover:border-white sm:w-auto"
              :href="props.href"
              target="_blank"
            >
              View Repo &rarr;
            </a>
            <a
              v-if="props.name"
              aria-label="View NPM"
              class="mt-8 w-full rounded border border-white/50 px-6 py-2 text-center text-sm hover:border-white sm:w-auto"
              :href="`https://www.npmjs.com/package/${props.name}`"
              target="_blank"
            >
              View on NPM &rarr;
            </a>
          </div>
        </div>
        <div v-if="props.readme" id="readme" class="flex w-full flex-col md:w-2/3 md:border-l border-white/10 md:pl-10">
          <div class="prose my-8" v-html="props.readme" />
        </div>
      </div>
    </div>
    <div v-if="props.tutorial" id="tutorial" :class="showReadme !== 1 ? 'hidden' : 'block'" class="prose w-full px-10 lg:max-w-6xl xl:px-0" v-html="props.tutorial" />
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
