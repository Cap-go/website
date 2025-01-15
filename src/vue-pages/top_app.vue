<script setup lang="ts">
import { renameCat } from '@/services/misc'
import * as m from "../paraglide/messages.js"
import { ref } from 'vue'

const description = m.top_100_app_using_different_framworks_on_android_store()
const others = ref(['top_capacitor_app', 'top_cordova_app', 'top_flutter_app', 'top_kotlin_app', 'top_react_native_app', 'top_native_script_app'])
</script>

<template>
  <section class="py-10 sm:py-12 lg:py-20">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{{ m.top_apps_by_framework() }}</h1>
        <h2 class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-50">
          {{ description }}
        </h2>
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
