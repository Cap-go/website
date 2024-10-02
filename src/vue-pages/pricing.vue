<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import Faq from '../components/pricing/Faq.vue'
import { useRuntimeConfig } from '@/config/app'
import Plans from '../components/pricing/Plans.vue'
import type { Database } from '../types/supabase.types'
import PayAsYouGo from '../components/pricing/PayAsYouGo.vue'
import Calculator from '../components/pricing/Calculator.vue'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{
  locale: Locales
}>()
const config = useRuntimeConfig()

const yearly = ref(true)
const plansAll = ref<Database['public']['Tables']['plans']['Row'][]>([])
await fetch(`${config.public.baseApiUrl}/private/plans`)
  .then((r) => r.json() as Promise<Array<Database['public']['Tables']['plans']['Row']>>)
  .then((res) => plansAll.value.push(...res))

const plans = computed(() => (plansAll.value.length ? plansAll.value.filter((p) => p.name !== 'Pay as you go' && p.name !== 'Free') : []))
const payg = computed(() => (plansAll.value.length ? plansAll.value.filter((p) => p.name === 'Pay as you go')[0] : undefined))

function scrollToId(id: string) {
  window.scrollTo({
    top: document.getElementById(id)!.offsetTop,
    behavior: 'smooth',
  })
}
const payg_base = computed(() =>
  payg.value
    ? {
        mau: payg.value.mau,
        storage: payg.value.storage,
        bandwidth: payg.value.bandwidth,
      }
    : undefined,
)
const payg_units = computed(() =>
  payg.value
    ? {
        mau: payg.value.mau_unit,
        storage: payg.value.storage_unit,
        bandwidth: payg.value.bandwidth_unit,
      }
    : undefined,
)
</script>

<template>
  <section class="py-12 bg-gray-50 sm:py-16 lg:py-20">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="mx-auto text-center">
        <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-6xl font-pj">Plans that scale with your business</h1>
        <p class="mt-6 text-xl font-normal text-gray-600 font-pj">Enterprise-grade cloud that enhance Capacitor application functionality and security.</p>
      </div>

      <p class="mt-5 sm:mb-14 text-center">
        <button class="font-medium text-black border-b-1 border-blue-600 border-blue-600 hover:text-blue-600 focus:text-blue-600" @click="scrollToId('calculator')">
          Calculate your usage
        </button>
      </p>
      <Plans v-if="plans && plans.length > 0" :yearly="yearly" :pricing="plans" :payg-base="payg_base" :payg-units="payg_units" />

      <div class="flex items-center justify-center space-x-6 mt-8 pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
        <div class="flex items-center" @click="yearly = false">
          <input
            id="monthly"
            type="radio"
            name="pricing-plans"
            class="w-4 h-4 text-blue-600 border border-gray-200 focus:ring-1 focus:outline-none focus:ring-blue-600"
            :checked="!yearly"
          />
          <label for="monthly" class="block ml-3 text-sm font-medium text-gray-900 sm:text-base"> Monthly Plan </label>
        </div>

        <div class="flex items-center" @click="yearly = true">
          <input
            id="yearly"
            type="radio"
            name="pricing-plans"
            class="w-4 h-4 text-blue-600 border border-gray-200 focus:ring-1 focus:outline-none focus:ring-blue-600"
            :checked="yearly"
          />
          <label for="yearly" class="block ml-3 text-sm font-medium text-gray-900 sm:text-base"> Yearly Plan </label>
          <span class="ml-1 text-sm font-medium text-blue-600"> (Save 20%) </span>
        </div>
      </div>

      <PayAsYouGo v-if="payg_base" :yearly="yearly" :payg="payg" />

      <Calculator
        v-if="plansAll && payg_base"
        class="pb-6 bg-gray-50 sm:pb-10 lg:pb-14 pt-3 sm:pt-6 lg:pt-10"
        :yearly="yearly"
        :pricing="plansAll"
        :payg-base="payg_base"
        :payg-units="payg_units"
      />

      <p class="max-w-md mx-auto text-base text-center text-gray-500 md:mt-16 font-pj mb-8">
        We don’t bill you automatically until your confirmation.<br />
        We don’t store or sell your data to anyone.
      </p>
    </div>
    <Faq />
  </section>
</template>
