<script setup lang="ts">
import { ref } from 'vue'
import { useRuntimeConfig } from '../config/app'
import type { Database } from '../types/supabase.types'

const config = useRuntimeConfig()
const title = 'Capgo | Top React Native apps'
const description = 'List of top 100 app using React Native on android store'

const apps = ref<Database['public']['Tables']['store_apps']['Row'][]>([])
const usage = ref(5.22)

function shortNumber(number: number) {
  if (number > 1000000000) return `${(number / 1000000).toFixed(1)}B`

  if (number > 1000000) return `${(number / 1000000).toFixed(1)}M`

  if (number > 1000) return `${(number / 1000).toFixed(1)}k`

  return `${number}`
}

function renameCat(text: string) {
  return text.replaceAll('_', ' ')
}

// useHead(() => ({
//   title,
//   meta: createMeta(title, description, `${config.public.baseUrl}/react_native.webp`),
// }))
const others = ref(['top_capacitor_app', 'top_flutter_app', 'top_cordova_app'])

fetch(`${config.public.baseApiUrl}/store_top?mode=reactNative`).then((res) => {
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
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Top React Native Script apps</h1>
        <h2 class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-50">
          {{ description }}
        </h2>
        <p class="max-w-xl mx-auto mt-4 text-xs leading-relaxed text-gray-200">React native power aproximately {{ usage }}% of apps on Google Play Store</p>
      </div>

      <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
        <div v-for="(app, index) in apps" :key="index" class="overflow-hidden bg-white rounded shadow">
          <div class="p-5">
            <div class="relative">
              <a :href="app.url" :title="app.title" class="block aspect-w-4 aspect-h-3">
                <img class="object-cover w-full h-full rounded-lg" :src="app.icon" :alt="`app icon ${app.title}`" />
              </a>

              <div class="absolute top-4 left-4">
                <span class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full shadow-lg">
                  {{ renameCat(app.category) }}
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <span class="px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-pumpkin-orange-500 rounded-full shadow-lg">
                  {{ index + 1 }}
                </span>
              </div>
            </div>
            <span class="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> {{ shortNumber(app.installs) }} Downloads </span>
            <p class="mt-5 text-2xl font-semibold">
              <a :href="app.url" :title="app.title" class="text-black">
                {{ app.title }}
              </a>
            </p>
            <a
              :href="app.url"
              :title="app.title"
              class="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-gray-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
            >
              See in Play store
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
      <!-- check other top list cordova, react naitve, flutter -->
      <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
        <a
          v-for="l in others"
          :key="l"
          :href="`/${l}/`"
          class="flex flex-col py-8 text-center bg-gray-700 rounded-lg transition-all duration-200 hover:bg-blue-700 focus:bg-blue-900"
        >
          <div class="relative mx-auto flex">
            <div class="block w-full mx-4 pb-4">
              <img class="object-cover w-full h-full rounded-lg" :src="`/${l.replace('top_', '').replace('_app', '')}.webp`" :alt="`blog illustration ${l}`" />
            </div>
          </div>
          <div class="px-4 pt-2 sm:pt-0 w-full">
            <p class="text-lg font-bold capitalize">
              {{ l.replaceAll('_', ' ') }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
