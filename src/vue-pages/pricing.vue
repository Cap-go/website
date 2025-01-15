<script setup lang="ts">
import Calculator from '@/components/pricing/Calculator.vue'
import Faq from '@/components/pricing/Faq.vue'
import PayAsYouGo from '@/components/pricing/PayAsYouGo.vue'
import Plans from '@/components/pricing/Plans.vue'
import { useRuntimeConfig } from '@/config/app'
import { type Locales } from '@/services/locale'
import * as m from "../paraglide/messages.js"
import type { Database } from '@/services/supabase.types'
import { computed, ref } from 'vue'

const props = defineProps<{ locale: Locales }>()
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
        <h1 class="text-3xl font-bold text-gray-900 font-pj sm:text-4xl xl:text-6xl">{{ m.plans_that_scale_with_your_business() }}</h1>
        <p class="mt-6 text-xl font-normal text-gray-600 font-pj">{{ m.plans_that_scale_with_your_business_description() }}</p>
      </div>
      <p class="mt-5 text-center sm:mb-14">
        <button class="font-medium text-black border-blue-600 border-b-1 hover:text-blue-600 focus:text-blue-600" @click="scrollToId('calculator')">
          {{ m.calculate_your_usage() }}
        </button>
      </p>
      <Plans v-if="plans && plans.length > 0" :yearly="yearly" :pricing="plans" :locale="props.locale" />
      <div class="flex items-center justify-center pb-12 mt-8 space-x-6 sm:pb-16 lg:pb-20 xl:pb-24">
        <div class="flex items-center" @click="yearly = false">
          <input
            id="monthly"
            type="radio"
            name="pricing-plans"
            :checked="!yearly"
            class="w-4 h-4 text-blue-600 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <label for="monthly" class="block ml-3 text-sm font-medium text-gray-900 sm:text-base"> {{ m.monthly_plan() }} </label>
        </div>
        <div class="flex items-center" @click="yearly = true">
          <input
            id="yearly"
            type="radio"
            name="pricing-plans"
            class="w-4 h-4 text-blue-600 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-600"
            :checked="yearly"
          />
          <label for="yearly" class="block ml-3 text-sm font-medium text-gray-900 sm:text-base"> {{ m.yearly_plan() }} </label>
          <span class="ml-1 text-sm font-medium text-blue-600"> ({{ m.save() }} 20%) </span>
        </div>
      </div>
      <PayAsYouGo :locale="props.locale" v-if="payg" :yearly="yearly" :payg="payg" />
      <Calculator
        :yearly="yearly"
        :pricing="plansAll"
        :payg-base="payg_base"
        :locale="props.locale"
        :payg-units="payg_units"
        v-if="plansAll && payg_base && payg_units"
        class="pt-3 pb-6 bg-gray-50 sm:pb-10 sm:pt-6 lg:pb-14 lg:pt-10"
      />
      <p class="max-w-md mx-auto mb-8 text-base text-center text-gray-500 font-pj md:mt-16">
        {{ m.we_don_t_bill_you_automatically_until_your_confirmation() }}<br />
        {{ m.we_don_t_store_or_sell_your_data_to_anyone() }}
      </p>
    </div>
    <Faq :locale="props.locale" />
  </section>
</template>
