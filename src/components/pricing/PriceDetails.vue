<script setup lang="ts">
import sampleData from '@/lib/sample-data/pricing.json'
import type { Locales } from '@/services/locale'
import translations from '@/services/translations'

const pricing = sampleData['pay-as-you-go']
const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <section id="calculator" class="bg-gray-50 py-12 sm:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center xl:max-w-4xl">
        <h2 class="font-pj text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
          {{ translations['calculate_your_usage'][props.locale] }}<br />
          <span class="text-xl sm:text-2xl xl:text-3xl">{{ translations['for_the_pay_as_you_go_plan'][props.locale] }}</span>
        </h2>
      </div>
      <div class="relative mt-12 lg:mx-auto lg:mt-20 lg:max-w-5xl">
        <div class="absolute -inset-2">
          <div
            class="mx-auto h-full w-full opacity-30 blur-lg filter"
            style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
          />
        </div>
        <div class="relative grid grid-cols-1 gap-x-20 gap-y-12 overflow-hidden rounded-2xl bg-gray-900 px-16 py-12 text-center text-white sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex flex-col items-center">
            <h3 class="calc-label">
              MAU<br /><span class="text-[0.6rem]">{{ translations['monthly_active_users'][props.locale] }}</span>
            </h3>
            <p class="font-pj mt-3 text-lg text-white">
              {{ pricing.mau.base }} {{ translations['included'][props.locale] }}<br />
              {{ pricing.mau['price-per-unit'] }} {{ translations['per_added_user'][props.locale] }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <h3 class="calc-label">Storage<br />(GB)</h3>
            <p class="font-pj mt-3 text-lg text-white">
              {{ pricing.storage.base }} {{ translations['included'][props.locale] }}<br />
              {{ pricing.storage['price-per-unit'] }} {{ translations['per_added_gb'][props.locale] }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <h3 class="calc-label" v-html="translations['updates_by_month'][props.locale]" />
            <p class="font-pj mt-3 text-lg text-white">{{ translations['updates_explanation'][props.locale] }}</p>
          </div>
          <div class="flex flex-col items-center">
            <h3 class="calc-label" v-html="translations['updates_size'][props.locale]" />
            <p class="font-pj mt-3 text-lg text-white">{{ translations['updates_explanation'][props.locale] }}</p>
          </div>
          <div class="flex flex-col items-center lg:col-span-2">
            <h3 class="calc-label">{{ translations['bandwidth'][props.locale] }}</h3>
            <p class="font-pj mt-3 text-lg text-white">
              {{ pricing.bandwidth.base }} {{ translations['included'][props.locale] }}<br />
              {{ pricing.bandwidth['price-per-unit'] }} {{ translations['per_added_gb'][props.locale] }}
            </p>
          </div>
          <div class="flex flex-col items-center lg:col-span-2">
            <h3 class="calc-label">{{ translations['updates'][props.locale] }}</h3>
            <p class="font-pj mt-3 text-lg text-white">{{ translations['updates_explanation'][props.locale] }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
