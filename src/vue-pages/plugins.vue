<script setup lang="ts">
import { marked } from 'marked'
import { onMounted, ref } from 'vue'
import { ArrowUpRightIcon } from '@heroicons/vue/20/solid'
import { actions } from '../config/plugins'
import type { Action } from '../config/plugins'

const plugins = ref<Action[]>(actions)

onMounted(() => {
  plugins.value.forEach((i) => {
    i.description = marked.parse(i.description)
  })
})
</script>

<template>
  <div class="z-10 mt-24 mb-24 flex w-full flex-col md:items-center">
    <h1 class="px-10 text-4xl font-bold md:text-center md:text-6xl">
      Powerful App Plugins
    </h1>
    <h2 class="mt-8 px-10 max-w-full lg:max-w-[75%] text-2xl font-light md:text-center">
      Enterprise-grade plugins with great documentation, ongoing updates, code snippets and premium support so you can focus on building your app.
    </h2>
    <div v-if="plugins" class="mt-12 flex w-full flex-col items-start px-10 sm:mt-24 sm:flex-row sm:justify-center lg:max-w-6xl xl:px-0">
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:mt-0 xl:grid-cols-3">
        <a
          v-for="item in plugins"
          :key="item.href"
          :href="item.href !== 'N/A' ? `/plugins/${item.href.substring(item.href.lastIndexOf('/') + 1)}` : '#'"
          class="group flex flex-col overflow-hidden rounded border border-gray-600 shadow hover:shadow-white md:max-w-sm"
        >
          <div class="flex flex-col px-5 py-3">
            <component :is="item.icon" v-if="item.icon" class="mt-3 w-[30px] fill-gray-400 group-hover:fill-white mb-6" />
            <div class="text-lg font-bold text-white">{{ item.title }}</div>
            <div class="mt-3 line-clamp-2 w-full break-all text-sm text-gray-200" v-html="item.description" />
          </div>
          <div class="mt-auto flex flex-row items-center justify-between px-5 pb-3 mb-3">
            <span class="text-sm font-light text-gray-400">by {{ item.author }}</span>
            <component :is="ArrowUpRightIcon" v-if="item.href !== 'N/A'" class="h-[18px] w-[18px] fill-gray-500 group-hover:fill-white" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
