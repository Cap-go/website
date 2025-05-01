<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import type { Locales } from '@/services/locale'
import { renameCat, shortNumber } from '@/services/misc'
import { ref } from 'vue'
import * as m from '../paraglide/messages.js'

const config = useRuntimeConfig()
const props = defineProps<{ locale: Locales }>()
const description = m.top_cordova_apps({}, { locale: props.locale })

const apps = ref<any[]>([])
const usage = ref(7.21)

const others = ref(['top_capacitor_app', 'top_react_native_app', 'top_flutter_app'])

fetch(`${config.public.baseApiUrl}/private/store_top?mode=cordova`).then((res) => {
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
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{{ m.top_cordova_apps_title({}, { locale: props.locale }) }}</h1>
        <h2 class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-50">
          {{ description }}
        </h2>
        <p class="max-w-xl mx-auto mt-4 text-xs leading-relaxed text-gray-200">
          {{ m.cordova_power_aproximately_1_of_apps_on_google_play_store({}, { locale: props.locale }).replace('$1', usage.toString()) }}
        </p>
      </div>
      <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:max-w-full lg:grid-cols-3">
        <div v-for="(app, index) in apps" :key="index" class="overflow-hidden bg-white rounded shadow">
          <div class="p-5">
            <div class="relative">
              <a :href="app.url" :title="app.title" class="block aspect-w-4 aspect-h-3">
                <img class="object-cover w-full h-full rounded-lg" :src="app.icon" :alt="`app icon ${app.title}`" />
              </a>
              <div class="absolute left-4 top-4">
                <span class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full shadow-lg">
                  {{ renameCat(app.category) }}
                </span>
              </div>
              <div class="absolute right-4 top-4">
                <span class="px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase rounded-full shadow-lg bg-pumpkin-orange-500">
                  {{ index + 1 }}
                </span>
              </div>
            </div>
            <span class="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
              {{ shortNumber(app.installs) }} {{ m.downloads({}, { locale: props.locale }) }}
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
              {{ m.see_in_play_store({}, { locale: props.locale }) }}
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
      <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:max-w-full lg:grid-cols-3">
        <a
          v-for="l in others"
          :key="l"
          :href="`/${l}/`"
          class="flex flex-col py-8 text-center transition-all duration-200 bg-gray-700 rounded-lg hover:bg-blue-700 focus:bg-blue-900"
        >
          <div class="relative flex mx-auto">
            <div class="block w-full pb-4 mx-4">
              <img class="object-cover w-full h-full rounded-lg" :src="`/${l.replace('top_', '').replace('_app', '')}.webp`" :alt="`blog illustration ${l}`" />
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
