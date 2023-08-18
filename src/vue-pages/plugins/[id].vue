<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Action } from '../../config/plugins'

const props = defineProps<Action>()

const stars = ref('...')
const npmDownloads = ref('...')

onMounted(() => {
  if (props.href) {
    const githubSlug = new URL(props.href).pathname
    fetch(`https://api.github.com/repos${githubSlug}`)
      .then((res: any) => res.json())
      .then((res) => {
        stars.value = res.stargazers_count
      })
      .catch(console.error)
  }
  if (props.name) {
    const npmCall = new URL(`downloads/point/last-month/${props.name}`, 'https://api.npmjs.org/').toString()
    fetch(npmCall)
      .then((res: any) => res.json())
      .then((res) => {
        npmDownloads.value = res.downloads
      })
      .catch(console.error)
  }
})
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <div class="z-10 flex w-full flex-row flex-wrap gap-10 px-10 md:flex-nowrap lg:max-w-6xl xl:px-0">
      <div class="mt-24 flex w-full flex-col md:w-1/3">
        <a aria-label="Back To Plugins" href="/plugins/" class="max-w-max border-b border-white/10 pb-0.5 text-white/50 hover:text-white">← Back To Plugins</a>
        <h1 class="mt-8 text-2xl font-bold md:text-4xl">
          {{ props.title }}
        </h1>
        <h1 class="mt-8 text-lg font-light md:text-xl">
          {{ props.description }}
        </h1>
        <div class="mt-8 flex flex-row items-center justify-between border-t border-white/10 pt-2">
          <span class="text-sm font-semibold text-gray-400">GitHub Stars</span> <span class="text-gray-600">{{ stars }}</span>
        </div>
        <div class="mt-4 flex flex-row items-center justify-between border-t border-white/10 pt-2">
          <span class="text-sm font-semibold text-gray-400">NPM Downloads</span> <span class="text-gray-600">{{ npmDownloads }}</span>
        </div>
        <div class="flex flex-row flex-wrap items-center justify-between">
          <a
            aria-label="View Repo URL"
            class="mt-8 w-full rounded border border-white/50 px-6 py-2 text-center text-sm hover:border-white sm:w-auto"
            :href="props.href"
            target="_blank"
          >
            View Repo &rarr;
          </a>
          <a
            aria-label="View NPM"
            class="mt-8 w-full rounded border border-white/50 px-6 py-2 text-center text-sm hover:border-white sm:w-auto"
            :href="`https://www.npmjs.com/package/${props.name}`"
            target="_blank"
          >
            View on NPM &rarr;
          </a>
        </div>
      </div>
      <!-- <div class="flex w-full flex-col md:w-2/3 md:border-l border-white/10 md:pl-10">
        <div class="prose my-8">
        </div>
      </div> -->
    </div>
  </div>
</template>
