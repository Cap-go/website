<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Database } from '../../types/supabase.types'

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
})

const payg = props.pricing.find(plan => plan.name === 'Pay as you go')!
const solo = props.pricing.find(plan => plan.name === 'Solo')!
const maker = props.pricing.find(plan => plan.name === 'Maker')!
const team = props.pricing.find(plan => plan.name === 'Team')!

const mau = ref(maker.mau)
// const storage = ref(props.paygBase.storage)
const updatesByMonth = ref(5)
const updatesSize = ref(5)

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
  if (mau.value <= solo.mau && storage.value <= solo.storage && bandwidth.value <= solo.bandwidth)
    return 'Solo'
  else if (mau.value <= maker.mau && storage.value <= maker.storage && bandwidth.value <= maker.bandwidth)
    return 'Maker'
  else if (mau.value <= team.mau && storage.value <= team.storage && bandwidth.value <= team.bandwidth)
    return 'Team'
  else return 'Pay as you go'
})
function suggestionClick() {
  if (suggestion.value === 'Pay as you go') {
    // scroll to pay-as-you-go
    window.scrollTo({
      top: document.getElementById('pay-as-you-go')!.offsetTop,
      behavior: 'smooth',
    })
  }
  else {
    // scroll to plans
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
  if (sum > 0)
    return roundNumber(basePrice + sum) * (props.yearly ? 12 : 1)
  else return (suggestion.value ? roundNumber(props.pricing.find(plan => plan.name === suggestion.value)!.price_m) : basePrice) * (props.yearly ? 12 : 1)
})

function roundNumber(number: number) {
  return Math.round(number * 100) / 100
}
</script>

<template>
  <section id="calculator">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center xl:max-w-4xl">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
          Calculate your usage<br>
        </h2>
        <p class="mt-6 text-sm font-normal text-gray-600 font-pj">
          Enter your estimated monthly active users, updates per month and update size to get your estimated monthly cost.
        </p>
      </div>

      <div class="relative mt-6 lg:mt-12 lg:max-w-5xl lg:mx-auto">
        <div class="absolute -inset-2">
          <div
            class="w-full h-full mx-auto opacity-30 blur-lg filter"
            style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
          />
        </div>

        <div class="relative grid grid-cols-1 px-16 py-12 overflow-hidden text-center text-white bg-gray-900 gap-y-12 md:grid-cols-3 rounded-2xl gap-x-20">
          <div class="flex flex-col items-center">
            <p class="calc-label">
              MAU<br><span class="text-[0.6rem]">Monthly Active Users</span>
            </p>
            <input
              v-model.number="mau"
              placeholder="0"
              class="break-all w-full p-2 cursor-text hover:bg-gray-800 border-b bg-gray-900 border-gray-300 text-3xl text-center font-bold lg:mt-3"
            >
          </div>

          <div class="flex flex-col items-center">
            <p class="calc-label">
              Updates<br>by month
            </p>
            <input
              v-model.number="updatesByMonth"
              placeholder="0"
              class="break-all w-full p-2 hover:bg-gray-800 cursor-text border-b bg-gray-900 border-gray-300 text-3xl text-center font-bold lg:mt-3"
            >
          </div>

          <div class="flex flex-col items-center">
            <p class="calc-label">
              Updates Size<br>(MB)
            </p>
            <input
              v-model.number="updatesSize"
              placeholder="0"
              class="break-all w-full p-2 cursor-text hover:bg-gray-800 border-b bg-gray-900 border-gray-300 text-3xl text-center font-bold lg:mt-3"
            >
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label">
              Updates<br>(Total)
            </p>
            <p class="break-all text-3xl font-bold text-white mt-3 font-pj">
              {{ updates.toLocaleString() }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label">
              Bandwidth<br>(GB)
            </p>
            <p class="break-all text-3xl font-bold text-white mt-3 font-pj">
              {{ bandwidth.toLocaleString() }}
            </p>
          </div>
          <div class="flex flex-col items-center">
            <p class="calc-label">
              Storage<br>(GB)
            </p>
            <p class="break-all text-3xl font-bold text-white mt-3 font-pj">
              {{ storage.toLocaleString() }}
            </p>
          </div>
          <div class="col-span-1 md:col-span-3 flex flex-col items-center">
            <p class="mt-5 text-md font-bold tracking-widest text-white uppercase mt-0 font-pj">
              {{ yearly ? 'Yearly' : 'Monthly' }} Price
            </p>
            <p class="break-all text-3xl font-bold text-gray-900 mt-3 font-pj p-2 bg-white rounded-xl">
              {{ totalPrice }}€
            </p>
            <p v-show="suggestion" class="mt-5 text-sm font-bold tracking-widest text-white mt-0 font-pj">
              We suggest you to choose the
              <button class="font-bold underline underline-current text-red-400 uppercase cursor-pointer" @click="suggestionClick">
                {{ suggestion }}
              </button>
              plan
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
