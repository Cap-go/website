<script setup lang="ts">
import type { Locales } from '@/services/locale'
import translations from '@/services/translations'
import { getRelativeLocaleUrl } from 'astro:i18n'

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <section class="bg-gray-900 py-10 sm:py-16 lg:py-24">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {{ translations['questions_and_answers'][props.locale] }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-300">{{ translations['explore_common_questions'][props.locale] }}</p>
      </div>
      <div class="mt-12 grid grid-cols-1 gap-x-20 gap-y-16 md:mt-20 md:grid-cols-2">
        <div class="flex items-start">
          <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">{{ translations['how_are_mau_counted'][props.locale] }}</p>
            <p class="mt-4 text-base text-gray-400">
              {{ translations['mau_counting_explanation'][props.locale] }}
            </p>
            <p class="mt-4 text-base text-gray-400">
              {{ translations['capgo_usage_explanation'][props.locale] }}
              <a class="border-b-2 border-blue-600 hover:text-blue-600 focus:text-blue-600" :href="getRelativeLocaleUrl(props.locale, 'blog/how-your-usage-is-counted')">{{
                translations['here'][props.locale]
              }}</a>
            </p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">{{ translations['what_does_storage_mean'][props.locale] }}</p>
            <p class="mt-4 text-base text-gray-400">
              {{ translations['storage_explanation'][props.locale] }}
            </p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">{{ translations['how_is_bandwidth_counted'][props.locale] }}</p>
            <p class="mt-4 text-base text-gray-400">
              {{ translations['bandwidth_explanation'][props.locale] }}
            </p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">{{ translations['unsure_about_active_users'][props.locale] }}</p>
            <p class="mt-4 text-base text-gray-400">
              {{ translations['free_trial_explanation'][props.locale] }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-12 flex items-center justify-center md:mt-20">
        <div class="rounded-full bg-gray-800 px-8 py-4 text-center">
          <p class="text-gray-50">
            {{ translations['didnt_find_answer'][props.locale] }}
            <button class="text-yellow-300 transition-all duration-200 hover:text-yellow-400 hover:underline focus:text-yellow-400" @click="openMessenger()">
              {{ translations['contact_support'][props.locale] }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
