<script setup lang="ts">
import type { Action } from '@/config/plugins'
import { actions } from '@/config/plugins'
import { getSlug } from '@/services/github'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'
import { ArrowUpRightIcon } from '@heroicons/vue/20/solid'
import { marked } from 'marked'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  locale: Locales
}>()
const plugins = ref<Action[]>(actions)

onMounted(() => {
  plugins.value.forEach((i) => {
    i.description = marked.parse(i.description)
  })
})
</script>

<template>
  <div class="z-10 mb-24 mt-24 flex w-full flex-col md:items-center">
    <h1 class="px-10 text-4xl font-bold md:text-center md:text-6xl">{{ actions.length }} {{ translations['powerful_app_plugins'][props.locale] }}</h1>
    <h2 class="mt-8 max-w-full px-10 text-2xl font-light md:text-center lg:max-w-[75%]">
      {{ translations['powerful_app_plugins_description'][props.locale] }}
    </h2>
    <div v-if="plugins" class="mt-12 flex w-full flex-col items-start px-10 sm:mt-24 sm:flex-row sm:justify-center lg:max-w-6xl xl:px-0">
      <div class="mt-8 grid grid-cols-1 gap-4 sm:mt-0 md:grid-cols-2 xl:grid-cols-3">
        <a
          v-for="item in plugins"
          :key="item.href"
          :href="item.href !== 'N/A' ? `/plugins/${getSlug(item.href)}/` : '#'"
          class="group flex flex-col overflow-hidden rounded border border-gray-600 shadow hover:shadow-white md:max-w-sm"
        >
          <div class="flex flex-col px-5 py-3">
            <component :is="item.icon" v-if="item.icon" class="mb-6 mt-3 w-[30px] fill-gray-400 group-hover:fill-white" />
            <div class="text-lg font-bold text-white">{{ item.title }}</div>
            <div class="mt-3 line-clamp-2 w-full break-all text-sm text-gray-200" v-html="item.description" />
          </div>
          <div class="mb-3 mt-auto flex flex-row items-center justify-between px-5 pb-3">
            <span class="text-sm font-light text-gray-400">by {{ item.author }}</span>
            <component :is="ArrowUpRightIcon" v-if="item.href !== 'N/A'" class="h-[18px] w-[18px] fill-gray-500 group-hover:fill-white" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
