<script setup lang="ts">
import type { Action } from '@/config/plugins'
import { actions } from '@/config/plugins'
import { getSlug } from '@/services/github'
import { type Locales } from '@/services/locale'
import { ArrowUpRightIcon } from '@heroicons/vue/20/solid'
import { getRelativeLocaleUrl } from 'astro:i18n'
import { marked } from 'marked'
import { onMounted, ref } from 'vue'
import * as m from '../paraglide/messages.js'

const props = defineProps<{ locale: Locales }>()
const plugins = ref<Action[]>(actions)

onMounted(() => {
  plugins.value.forEach(async (i) => {
    i.description = await marked.parse(i.description)
  })
})
</script>

<template>
  <div class="z-10 flex flex-col w-full mt-24 mb-24 md:items-center">
    <h1 class="px-10 text-4xl font-bold md:text-center md:text-6xl">{{ actions.length }} {{ m.powerful_app_plugins({}, { locale: props.locale }) }}</h1>
    <h2 class="mt-8 max-w-full px-10 text-2xl font-light md:text-center lg:max-w-[75%]">
      {{ m.powerful_app_plugins_description({}, { locale: props.locale }) }}
    </h2>
    <div v-if="plugins" class="flex flex-col items-start w-full px-10 mt-12 sm:mt-24 sm:flex-row sm:justify-center lg:max-w-6xl xl:px-0">
      <div class="grid grid-cols-1 gap-4 mt-8 sm:mt-0 md:grid-cols-2 xl:grid-cols-3">
        <a
          v-for="item in plugins"
          :key="item.href"
          :href="item.href !== 'N/A' ? getRelativeLocaleUrl(props.locale, `plugins/${getSlug(item.href)}`) : '#'"
          class="flex flex-col overflow-hidden border border-gray-600 rounded shadow group hover:shadow-white md:max-w-sm"
        >
          <div class="flex flex-col px-5 py-3">
            <component :is="item.icon" v-if="item.icon" class="mb-6 mt-3 w-[30px] fill-gray-400 group-hover:fill-white" />
            <div class="text-lg font-bold text-white">{{ item.title }}</div>
            <div class="w-full mt-3 text-sm text-gray-200 break-all line-clamp-2" v-html="item.description" />
          </div>
          <div class="flex flex-row items-center justify-between px-5 pb-3 mt-auto mb-3">
            <span class="text-sm font-light text-gray-400">by {{ item.author }}</span>
            <component :is="ArrowUpRightIcon" v-if="item.href !== 'N/A'" class="h-[18px] w-[18px] fill-gray-500 group-hover:fill-white" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
