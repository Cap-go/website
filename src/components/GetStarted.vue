<script setup lang="ts">
import type { Locales } from '@/services/locale'
import * as m from '../paraglide/messages.js'

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <div>
    <div class="relative max-w-4xl p-4 mx-4 my-6 sm:mx-auto sm:p-8 md:p-12 sm:my-10 md:my-14">
      <!-- Border design -->
      <div class="absolute inset-0 rounded-[20px] sm:rounded-[40px] border border-gray-700"></div>

      <div class="relative">
        <span class="text-3xl sm:text-4xl md:text-[44px] leading-tight text-white font-normal mb-4 sm:mb-6">
          {{ m.instant_updates_for_capacitor_apps({}, { locale: props.locale }) }}
        </span>

        <p class="max-w-3xl mb-6 text-lg font-normal leading-relaxed text-gray-300 sm:mb-8 md:mb-12 sm:text-xl">
          {{ m.instant_updates_for_capacitor_apps_description({}, { locale: props.locale }) }}
        </p>

        <a
          href="/register/"
          class="inline-flex items-center justify-center w-full px-6 py-3 text-lg text-white transition-colors duration-200 bg-black rounded-lg sm:w-auto sm:px-10 sm:py-4 sm:text-xl hover:bg-gray-800"
        >
          {{ m.get_started_now({}, { locale: props.locale }) }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add custom font if needed */
h1 {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Add a subtle glow effect to the button */
.shadow-blue-500\/50 {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}
</style>
