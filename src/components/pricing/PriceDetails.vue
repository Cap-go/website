<script setup lang="ts">
import sampleData from '@/lib/sample-data/pricing.json'
import type { Locales } from '@/services/locale'
import * as m from '../../paraglide/messages.js'

const pricing = sampleData['pay-as-you-go']
const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <section id="calculator" class="py-12 bg-gray-50 sm:py-16 lg:py-20">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center xl:max-w-4xl">
        <h2 class="text-3xl font-bold text-gray-900 font-pj sm:text-4xl xl:text-5xl">
          {{ m.calculate_your_usage({}, { locale: props.locale }) }}<br />
          <span class="text-xl sm:text-2xl xl:text-3xl">{{ m.for_the_pay_as_you_go_plan({}, { locale: props.locale }) }}</span>
        </h2>
      </div>
      <div class="relative mt-12 lg:mx-auto lg:mt-20 lg:max-w-5xl">
        <div class="absolute -inset-2">
          <div
            class="w-full h-full mx-auto opacity-30 blur-lg filter"
            style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
          />
        </div>
        <div class="relative grid grid-cols-1 px-16 py-12 overflow-hidden text-center text-white bg-gray-900 gap-x-20 gap-y-12 rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex flex-col items-center">
            <h3 class="calc-label">
              MAU<br /><span class="text-[0.6rem]">{{ m.monthly_active_users({}, { locale: props.locale }) }}</span>
            </h3>
            <p class="mt-3 text-lg text-white font-pj">
              {{ pricing.mau.base }} {{ m.included({}, { locale: props.locale }) }}<br />
              {{ pricing.mau['price-per-unit'] }} {{ m.per_added_user({}, { locale: props.locale }) }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <h3 class="calc-label">Storage<br />(GB)</h3>
            <p class="mt-3 text-lg text-white font-pj">
              {{ pricing.storage.base }} {{ m.included({}, { locale: props.locale }) }}<br />
              {{ pricing.storage['price-per-unit'] }} {{ m.per_added_gb({}, { locale: props.locale }) }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <h3 class="calc-label" v-html="m.updates_by_month()" />
            <p class="mt-3 text-lg text-white font-pj">{{ m.updates_explanation({}, { locale: props.locale }) }}</p>
          </div>
          <div class="flex flex-col items-center">
            <h3 class="calc-label" v-html="m.updates_size()" />
            <p class="mt-3 text-lg text-white font-pj">{{ m.updates_explanation({}, { locale: props.locale }) }}</p>
          </div>
          <div class="flex flex-col items-center lg:col-span-2">
            <h3 class="calc-label">{{ m.bandwidth({}, { locale: props.locale }) }}</h3>
            <p class="mt-3 text-lg text-white font-pj">
              {{ pricing.bandwidth.base }} {{ m.included({}, { locale: props.locale }) }}<br />
              {{ pricing.bandwidth['price-per-unit'] }} {{ m.per_added_gb({}, { locale: props.locale }) }}
            </p>
          </div>
          <div class="flex flex-col items-center lg:col-span-2">
            <h3 class="calc-label">{{ m.updates({}, { locale: props.locale }) }}</h3>
            <p class="mt-3 text-lg text-white font-pj">{{ m.updates_explanation({}, { locale: props.locale }) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
