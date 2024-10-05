<script setup lang="ts">
import type { Locales } from '@/services/locale'
import translations from '@/services/translations'
import type { Database } from '@/types/supabase.types'
import { computed, ref } from 'vue'

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

const payg = props.pricing.find((plan) => plan.name === 'Pay as you go')!
const solo = props.pricing.find((plan) => plan.name === 'Solo')!
const maker = props.pricing.find((plan) => plan.name === 'Maker')!
const team = props.pricing.find((plan) => plan.name === 'Team')!

const mau = ref(maker.mau)
const updatesByMonth = ref(5)
const updatesSize = ref(4)

const updates = computed(() => {
  return mau.value * updatesByMonth.value
})
const storage = computed(() => {
  return (updatesByMonth.value * updatesSize.value * 12) / 1000
})
const bandwidth = computed(() => {
  return (updates.value * updatesSize.value) / 1000
})

const suggestion = computed(() => {
  if (mau.value <= solo.mau && storage.value <= solo.storage && bandwidth.value <= solo.bandwidth) return 'Solo'
  else if (mau.value <= maker.mau && storage.value <= maker.storage && bandwidth.value <= maker.bandwidth) return 'Maker'
  else if (mau.value <= team.mau && storage.value <= team.storage && bandwidth.value <= team.bandwidth) return 'Team'
  else return 'Pay as you go'
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
const basePrice = payg.price_m

const totalPrice = computed(() => {
  const mauPrice = mau.value > props.paygBase.mau ? (mau.value - props.paygBase.mau) * props.paygUnits.mau : 0
  const storagePrice = storage.value > props.paygBase.storage ? (storage.value - props.paygBase.storage) * props.paygUnits.storage : 0
  const bandwidthPrice = bandwidth.value > props.paygBase.bandwidth ? (bandwidth.value - props.paygBase.bandwidth) * props.paygUnits.bandwidth : 0
  const sum = mauPrice + storagePrice + bandwidthPrice
  if (sum > 0) return roundNumber(basePrice + sum) * (props.yearly ? 12 : 1)
  else return (suggestion.value ? roundNumber(props.pricing.find((plan) => plan.name === suggestion.value)!.price_m) : basePrice) * (props.yearly ? 12 : 1)
})

function roundNumber(number: number) {
  return Math.round(number * 100) / 100
}
</script>

<template>
  <section id="calculator">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center xl:max-w-4xl">
        <h2 class="font-pj text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">{{ translations['calculate_your_usage'][props.locale as Locales] }}<br /></h2>
        <p class="font-pj mt-6 text-sm font-normal text-gray-600">
          {{ translations['enter_your_estimated_monthly_active_users'][props.locale as Locales] }}
        </p>
      </div>
      <div class="relative mt-6 lg:mx-auto lg:mt-12 lg:max-w-5xl">
        <div class="absolute -inset-2">
          <div
            class="mx-auto h-full w-full opacity-30 blur-lg filter"
            style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
          />
        </div>
        <div class="relative grid grid-cols-1 gap-x-20 gap-y-12 overflow-hidden rounded-2xl bg-gray-900 px-16 py-12 text-center text-white md:grid-cols-3">
          <div class="flex flex-col items-center">
            <p class="calc-label">
              MAU<br /><span class="text-[0.6rem]">{{ translations['monthly_active_users'][props.locale as Locales] }}</span>
            </p>
            <input
              v-model.number="mau"
              placeholder="0"
              class="w-full cursor-text break-all border-b border-gray-300 bg-gray-900 p-2 text-center text-3xl font-bold hover:bg-gray-800 lg:mt-3"
            />
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label" v-html="translations['updates_by_month'][props.locale as Locales]" />
            <input
              v-model.number="updatesByMonth"
              placeholder="0"
              class="w-full cursor-text break-all border-b border-gray-300 bg-gray-900 p-2 text-center text-3xl font-bold hover:bg-gray-800 lg:mt-3"
            />
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label" v-html="translations['updates_size'][props.locale as Locales]" />
            <input
              v-model.number="updatesSize"
              placeholder="0"
              class="w-full cursor-text break-all border-b border-gray-300 bg-gray-900 p-2 text-center text-3xl font-bold hover:bg-gray-800 lg:mt-3"
            />
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label" v-html="translations['updates_total'][props.locale as Locales]" />
            <p class="font-pj mt-3 break-all text-3xl font-bold text-white">
              {{ updates.toLocaleString() }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label" v-html="translations['bandwidth_gb'][props.locale as Locales]" />
            <p class="font-pj mt-3 break-all text-3xl font-bold text-white">
              {{ bandwidth.toLocaleString() }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label" v-html="translations['storage'][props.locale as Locales]" />
            <p class="font-pj mt-3 break-all text-3xl font-bold text-white">
              {{ storage.toLocaleString() }}
            </p>
          </div>
          <div class="col-span-1 flex flex-col items-center md:col-span-3">
            <p class="text-md font-pj mt-0 mt-5 font-bold uppercase tracking-widest text-white">
              {{ yearly ? translations['yearly'][props.locale as Locales] : translations['monthly'][props.locale as Locales] }} Price
            </p>
            <p class="font-pj mt-3 break-all rounded-xl bg-white p-2 text-3xl font-bold text-gray-900">{{ totalPrice }}€</p>
            <p v-show="suggestion" class="font-pj mt-0 mt-5 text-sm font-bold tracking-widest text-white">
              {{ translations['we_suggest_you_to_choose_the'][props.locale as Locales] }}
              <button class="underline-current cursor-pointer font-bold uppercase text-red-400 underline" @click="suggestionClick">
                {{ suggestion }}
              </button>
              {{ translations['plan'][props.locale as Locales] }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
