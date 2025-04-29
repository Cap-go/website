<script setup lang="ts">
import type { Locales } from '@/services/locale'
import { getRelativeLocaleUrl } from 'astro:i18n'
import * as m from '../../paraglide/messages.js'

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <section class="py-10 bg-gray-900 sm:py-16 lg:py-24">
    <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {{ m.questions_and_answers({}, { locale: props.locale }) }}
        </h2>
        <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300">{{ m.explore_common_questions({}, { locale: props.locale }) }}</p>
      </div>
      <div class="grid grid-cols-1 mt-12 gap-x-20 gap-y-16 md:mt-20 md:grid-cols-2">
        <div class="flex items-start">
          <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">{{ m.how_are_mau_counted({}, { locale: props.locale }) }}</p>
            <p class="mt-4 text-base text-gray-400">
              {{ m.mau_counting_explanation({}, { locale: props.locale }) }}
            </p>
            <p class="mt-4 text-base text-gray-400">
              {{ m.capgo_usage_explanation({}, { locale: props.locale }) }}
              <a class="border-b-2 border-blue-600 hover:text-blue-600 focus:text-blue-600" :href="getRelativeLocaleUrl(props.locale, 'blog/how-your-usage-is-counted')">{{
                m.here()
              }}</a>
            </p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">{{ m.what_does_storage_mean({}, { locale: props.locale }) }}</p>
            <p class="mt-4 text-base text-gray-400">
              {{ m.storage_explanation({}, { locale: props.locale }) }}
            </p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">{{ m.how_is_bandwidth_counted({}, { locale: props.locale }) }}</p>
            <p class="mt-4 text-base text-gray-400">
              {{ m.bandwidth_explanation({}, { locale: props.locale }) }}
            </p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">{{ m.unsure_about_active_users({}, { locale: props.locale }) }}</p>
            <p class="mt-4 text-base text-gray-400">
              {{ m.free_trial_explanation({}, { locale: props.locale }) }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center mt-12 md:mt-20">
        <div class="px-8 py-4 text-center bg-gray-800 rounded-full">
          <p class="text-gray-50">
            {{ m.didnt_find_answer({}, { locale: props.locale }) }}
            <a class="text-yellow-300 transition-all duration-200 hover:text-yellow-400 hover:underline focus:text-yellow-400" href="mailto:support@capgo.app">
              {{ m.contact_support({}, { locale: props.locale }) }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
