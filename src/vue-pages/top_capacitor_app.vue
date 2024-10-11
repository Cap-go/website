<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales } from '@/services/locale'
import { renameCat, shortNumber } from '@/services/misc'
import translations from '@/services/translations'
import type { Database } from '@/types/supabase.types'
import { ref } from 'vue'

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()
const description = translations['top_100_app_using_capacitor_on_android_play_store'][props.locale]

const apps = ref<Database['public']['Tables']['store_apps']['Row'][]>([])
const usage = ref(7.21)

const others = ref(['top_cordova_app', 'top_react_native_app', 'top_flutter_app'])

fetch(`${config.public.baseApiUrl}/private/store_top`).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      apps.value = data.apps
      usage.value = data.usage
    })
  }
})
</script>

<template>
  <section class="py-10 sm:py-12 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{{ translations['top_capacitor_apps'][props.locale] }}</h1>
        <h2 class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-50">
          {{ description }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-gray-200">
          {{ translations['capacitor_power_aproximately_1_of_apps_on_google_play_store'][props.locale].replace('$1', usage.toString()) }}
        </p>
      </div>
      <div class="mx-auto mt-8 grid max-w-md grid-cols-1 gap-6 lg:mt-16 lg:max-w-full lg:grid-cols-3">
        <div v-for="(app, index) in apps" :key="index" class="overflow-hidden rounded bg-white shadow">
          <div class="p-5">
            <div class="relative">
              <a :href="app.url" :title="app.title" class="aspect-w-4 aspect-h-3 block">
                <img class="h-full w-full rounded-lg object-cover" :src="app.icon" :alt="`app icon ${app.title}`" />
              </a>
              <div class="absolute left-4 top-4">
                <span class="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-900 shadow-lg">
                  {{ renameCat(app.category) }}
                </span>
              </div>
              <div class="absolute right-4 top-4">
                <span class="bg-pumpkin-orange-500 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-lg">
                  {{ index + 1 }}
                </span>
              </div>
            </div>
            <span class="mt-6 block text-sm font-semibold uppercase tracking-widest text-gray-500">
              {{ shortNumber(app.installs) }} {{ translations['downloads'][props.locale] }}
            </span>
            <p class="mt-5 text-2xl font-semibold">
              <a :href="app.url" :title="app.title" class="text-black">
                {{ app.title }}
              </a>
            </p>
            <a
              :href="app.url"
              :title="app.title"
              class="mt-5 inline-flex items-center justify-center border-b-2 border-transparent pb-0.5 text-base font-semibold text-gray-600 transition-all duration-200 hover:border-blue-600 focus:border-blue-600"
            >
              {{ translations['see_in_play_store'][props.locale] }}
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-md grid-cols-1 gap-6 lg:mt-16 lg:max-w-full lg:grid-cols-3">
        <a
          v-for="l in others"
          :key="l"
          :href="`/${l}/`"
          class="flex flex-col rounded-lg bg-gray-700 py-8 text-center transition-all duration-200 hover:bg-blue-700 focus:bg-blue-900"
        >
          <div class="relative mx-auto flex">
            <div class="mx-4 block w-full pb-4">
              <img class="h-full w-full rounded-lg object-cover" :src="`/${l.replace('top_', '').replace('_app', '')}.webp`" :alt="`blog illustration ${l}`" />
            </div>
          </div>
          <div class="w-full px-4 pt-2 sm:pt-0">
            <p class="text-lg font-bold capitalize">
              {{ renameCat(l) }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
