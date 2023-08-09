<script setup lang="ts">
import { createMeta } from '~/services/meta'

const title = 'Capgo | Top apps by framework'
const description = 'List of top 100 app using Diffrents Framworks on android store'
useHead(() => ({
  title,
  meta: createMeta(title, description),
}))
const others = ref(['top_capacitor_app', 'top_cordova_app', 'top_flutter_app', 'top_kotlin_app', 'top_react_native_app', 'top_native_script_app'])
</script>

<template>
  <section class="py-10 sm:py-12 lg:py-20">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Top apps by framework</h1>
        <h2 class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-50">
          {{ description }}
        </h2>
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
