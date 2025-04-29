<script setup lang="ts">
import { ref } from 'vue'
import * as m from '../paraglide/messages.js'

const plugins = ref([
  {
    name: 'capacitor-updater',
    description: 'Instant updates for Capacitor apps',
    stars: 508,
    language: 'Android & iOS',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />',
  },
  {
    name: 'purchases-capacitor',
    description: 'In-app purchases and subscriptions made easy (transferred to RevenueCat)',
    stars: 140,
    language: 'Android & iOS',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
  },
  {
    name: 'capacitor-data-storage-sqlite',
    description: 'SQLite Plugin for iOS and Android',
    stars: 79,
    language: 'Android & iOS',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />',
  },
  {
    name: 'capacitor-inappbrowser',
    description: 'In-app browser with urlChangeEvent',
    stars: 64,
    language: 'Android & iOS',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />',
  },
  {
    name: 'capacitor-native-biometric',
    description: 'Use biometrics to authenticate users',
    stars: 43,
    language: 'Android & iOS',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />',
  },
  {
    name: 'native-audio',
    description: 'Native audio engine plugin',
    stars: 29,
    language: 'Android & iOS',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />',
  },
])
</script>

<template>
  <section class="px-4 py-16 bg-indigo-600 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">{{ m.consulting_forged_plugins_community_embraced() }}</h2>
        <p class="mt-4 text-xl text-indigo-200">
          {{ m.consulting_forged_plugins_community_embraced_description() }} <br />
          {{ m.each_solution_represents_a_consulting_success_story_battle_tested_and_refined_for_the_community() }}
        </p>
      </div>
      <div class="mt-12">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="plugin in plugins" :key="plugin.name" class="pt-6">
            <div class="flow-root px-6 pb-8 bg-indigo-500 rounded-lg">
              <div class="-mt-6">
                <div>
                  <span class="inline-flex items-center justify-center p-3 bg-indigo-700 rounded-md shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-html="plugin.icon"></svg>
                  </span>
                </div>
                <h3 class="mt-8 text-lg font-medium tracking-tight text-white">{{ plugin.name }}</h3>
                <p class="mt-5 text-base text-indigo-200">
                  {{ plugin.description }}
                </p>
                <div class="flex items-center mt-4 text-sm text-indigo-300">
                  <span class="mr-2">{{ plugin.language }}</span>
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  {{ plugin.stars }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 text-center">
        <a
          href="https://cal.com/martindonadieu/get-your-custom-capacitor-plugin"
          target="_blank"
          class="inline-flex items-center px-6 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md shadow-sm hover:bg-indigo-50"
        >
          {{ m.get_your_custom_plugin_built() }}
          <svg class="w-5 h-5 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
