<script setup lang="ts">
import Calculator from '@/components/pricing/Calculator.vue'
import Faq from '@/components/pricing/Faq.vue'
import PayAsYouGo from '@/components/pricing/PayAsYouGo.vue'
import Plans from '@/components/pricing/Plans.vue'
import { useRuntimeConfig } from '@/config/app'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'
import type { Database } from '@/types/supabase.types'
import { computed, ref } from 'vue'

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
  <section class="bg-gray-50 py-12 sm:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto text-center">
        <h1 class="font-pj text-3xl font-bold text-gray-900 sm:text-4xl xl:text-6xl">{{ translations['plans_that_scale_with_your_business'][props.locale] }}</h1>
        <p class="font-pj mt-6 text-xl font-normal text-gray-600">{{ translations['plans_that_scale_with_your_business_description'][props.locale] }}</p>
      </div>
      <p class="mt-5 text-center sm:mb-14">
        <button class="border-b-1 border-blue-600 font-medium text-black hover:text-blue-600 focus:text-blue-600" @click="scrollToId('calculator')">
          {{ translations['calculate_your_usage'][props.locale] }}
        </button>
      </p>
      <Plans v-if="plans && plans.length > 0" :yearly="yearly" :pricing="plans" :payg-base="payg_base" :payg-units="payg_units" :locale="props.locale" />
      <div class="mt-8 flex items-center justify-center space-x-6 pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
        <div class="flex items-center" @click="yearly = false">
          <input
            id="monthly"
            type="radio"
            name="pricing-plans"
            :checked="!yearly"
            class="h-4 w-4 border border-gray-200 text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <label for="monthly" class="ml-3 block text-sm font-medium text-gray-900 sm:text-base"> {{ translations['monthly_plan'][props.locale] }} </label>
        </div>
        <div class="flex items-center" @click="yearly = true">
          <input
            id="yearly"
            type="radio"
            name="pricing-plans"
            class="h-4 w-4 border border-gray-200 text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            :checked="yearly"
          />
          <label for="yearly" class="ml-3 block text-sm font-medium text-gray-900 sm:text-base"> {{ translations['yearly_plan'][props.locale] }} </label>
          <span class="ml-1 text-sm font-medium text-blue-600"> ({{ translations['save'][props.locale] }} 20%) </span>
        </div>
      </div>
      <PayAsYouGo :locale="props.locale" v-if="payg_base" :yearly="yearly" :payg="payg" />
      <Calculator
        :locale="props.locale"
        v-if="plansAll && payg_base"
        class="bg-gray-50 pb-6 pt-3 sm:pb-10 sm:pt-6 lg:pb-14 lg:pt-10"
        :yearly="yearly"
        :pricing="plansAll"
        :payg-base="payg_base"
        :payg-units="payg_units"
      />
      <p class="font-pj mx-auto mb-8 max-w-md text-center text-base text-gray-500 md:mt-16">
        {{ translations['we_don_t_bill_you_automatically_until_your_confirmation'][props.locale] }}<br />
        {{ translations['we_don_t_store_or_sell_your_data_to_anyone'][props.locale] }}
      </p>
    </div>
    <Faq :locale="props.locale" />
  </section>
</template>
