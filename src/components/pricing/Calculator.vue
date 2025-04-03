<script setup lang="ts">
import { roundNumber } from '@/services/misc'
import type { Database } from '@/services/supabase.types'
import { computed, ref } from 'vue'
import * as m from "../../paraglide/messages.js"

const props = defineProps({
  pricing: {
    type: Array<Database['public']['Tables']['plans']['Row']>,
    required: true,
  },
  paygBase: {
    type: Object,
    required: true,
  },
  paygUnits: {
    type: Object,
    required: true,
  },
  yearly: {
    type: Boolean,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
})

const solo = props.pricing.find((plan) => plan.name === 'Solo')!
const team = props.pricing.find((plan) => plan.name === 'Team')!
const maker = props.pricing.find((plan) => plan.name === 'Maker')!
const payg = props.pricing.find((plan) => plan.name === 'Pay as you go')!
const basePrice = payg.price_m

const mau = ref(maker.mau)
const updatesSize = ref(4)
const updatesByMonth = ref(5)

const updates = computed(() => mau.value * updatesByMonth.value)
const bandwidth = computed(() => (updates.value * updatesSize.value) / 1000)
const storage = computed(() => (updatesByMonth.value * updatesSize.value * 12) / 1000)

const suggestion = computed(() => {
  if (mau.value <= solo.mau && storage.value <= solo.storage && bandwidth.value <= solo.bandwidth) return 'Solo'
  else if (mau.value <= maker.mau && storage.value <= maker.storage && bandwidth.value <= maker.bandwidth) return 'Maker'
  else if (mau.value <= team.mau && storage.value <= team.storage && bandwidth.value <= team.bandwidth) return 'Team'
  return 'Pay as you go'
})

function suggestionClick() {
  if (suggestion.value === 'Pay as you go') {
    window.scrollTo({
      top: document.getElementById('pay-as-you-go')!.offsetTop,
      behavior: 'smooth',
    })
  } else {
    window.scrollTo({
      top: document.getElementById('plans')!.offsetTop,
      behavior: 'smooth',
    })
  }
}

const totalPrice = computed(() => {
  const mauPrice = mau.value > props.paygBase.mau ? (mau.value - props.paygBase.mau) * props.paygUnits.mau : 0
  const storagePrice = storage.value > props.paygBase.storage ? (storage.value - props.paygBase.storage) * props.paygUnits.storage : 0
  const bandwidthPrice = bandwidth.value > props.paygBase.bandwidth ? (bandwidth.value - props.paygBase.bandwidth) * props.paygUnits.bandwidth : 0
  const sum = mauPrice + storagePrice + bandwidthPrice
  if (sum > 0) return roundNumber(basePrice + sum) * (props.yearly ? 12 : 1)
  return (suggestion.value ? roundNumber(props.pricing.find((plan) => plan.name === suggestion.value)!.price_m) : basePrice) * (props.yearly ? 12 : 1)
})
</script>

<template>
  <section id="calculator">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center xl:max-w-4xl">
        <h2 class="text-3xl font-bold text-gray-900 font-pj sm:text-4xl xl:text-5xl">{{ m.calculate_your_usage() }}<br /></h2>
        <p class="mt-6 text-sm font-normal text-gray-600 font-pj">
          {{ m.enter_your_estimated_monthly_active_users() }}
        </p>
      </div>
      <div class="relative mt-6 lg:mx-auto lg:mt-12 lg:max-w-5xl">
        <div class="absolute -inset-2">
          <div
            class="w-full h-full mx-auto opacity-30 blur-lg filter"
            style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
          />
        </div>
        <div class="relative grid grid-cols-1 px-16 py-12 overflow-hidden text-center text-white bg-gray-900 gap-x-20 gap-y-12 rounded-2xl md:grid-cols-3">
          <div class="flex flex-col items-center">
            <p class="calc-label">
              MAU<br /><span class="text-[0.6rem]">{{ m.monthly_active_users() }}</span>
            </p>
            <input
              v-model.number="mau"
              placeholder="0"
              class="w-full p-2 text-3xl font-bold text-center break-all bg-gray-900 border-b border-gray-300 cursor-text hover:bg-gray-800 lg:mt-3"
            />
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label" v-html="m.updates_by_month()" />
            <input
              v-model.number="updatesByMonth"
              placeholder="0"
              class="w-full p-2 text-3xl font-bold text-center break-all bg-gray-900 border-b border-gray-300 cursor-text hover:bg-gray-800 lg:mt-3"
            />
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label" v-html="m.updates_size()" />
            <input
              v-model.number="updatesSize"
              placeholder="0"
              class="w-full p-2 text-3xl font-bold text-center break-all bg-gray-900 border-b border-gray-300 cursor-text hover:bg-gray-800 lg:mt-3"
            />
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label" v-html="m.updates_total()" />
            <p class="mt-3 text-3xl font-bold text-white break-all font-pj">
              {{ updates.toLocaleString() }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label" v-html="m.bandwidth_gb()" />
            <p class="mt-3 text-3xl font-bold text-white break-all font-pj">
              {{ bandwidth.toLocaleString() }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label" v-html="m.storage()" />
            <p class="mt-3 text-3xl font-bold text-white break-all font-pj">
              {{ storage.toLocaleString() }}
            </p>
          </div>
          <div class="flex flex-col items-center col-span-1 md:col-span-3">
            <p class="mt-0 mt-5 font-bold tracking-widest text-white uppercase text-md font-pj">
              {{ yearly ? m.yearly() : m.monthly() }} Price
            </p>
            <p class="p-2 mt-3 text-3xl font-bold text-gray-900 break-all bg-white font-pj rounded-xl">{{ totalPrice }}€</p>
            <p v-show="suggestion" class="mt-0 mt-5 text-sm font-bold tracking-widest text-white font-pj">
              {{ m.we_suggest_you_to_choose_the() }}
              <button class="font-bold text-red-400 underline uppercase cursor-pointer underline-current" @click="suggestionClick">
                {{ suggestion }}
              </button>
              {{ m.plan() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
