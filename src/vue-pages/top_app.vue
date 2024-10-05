<script setup lang="ts">
import { ref } from 'vue'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{
  locale: Locales
}>()
const description = 'List of top 100 app using Diffrents Framworks on android store'
const others = ref(['top_capacitor_app', 'top_cordova_app', 'top_flutter_app', 'top_kotlin_app', 'top_react_native_app', 'top_native_script_app'])
</script>

<template>
  <section class="py-10 sm:py-12 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Top apps by framework</h1>
        <h2 class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-50">
          {{ description }}
        </h2>
      </div>
      <!-- check other top list cordova, react naitve, flutter -->
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
              {{ l.replaceAll('_', ' ') }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
