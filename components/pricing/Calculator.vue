<script setup lang="ts">
import { ref } from 'vue'
import type { definitions } from '~~/types/supabase'

const props = defineProps({
  pricing: {
    type: Array<definitions['plans']>,
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
})

const payg = props.pricing.find(plan => plan.name === 'Pay as you go')!
const solo = props.pricing.find(plan => plan.name === 'Solo')!
const maker = props.pricing.find(plan => plan.name === 'Maker')!
const team = props.pricing.find(plan => plan.name === 'Team')!

const mau = ref(props.paygBase.mau)
const storage = ref(props.paygBase.storage)
const updatesByMonth = ref(1)
const updatesSize = ref(10)

const updates = ref(mau.value * updatesByMonth.value)
const bandwidth = ref(updates.value * updatesSize.value / 1000)

const basePrice = payg.price_m
const totalPrice = ref(basePrice)

const suggestion = ref('')

const roundNumber = (number: number) => {
  return Math.round(number * 100) / 100
}

const suggestBestPlan = () => {
  if (mau.value <= solo.mau && storage.value <= solo.storage && bandwidth.value <= solo.bandwidth)
    suggestion.value = 'Solo'
  else if (mau.value <= maker.mau && storage.value <= maker.storage && bandwidth.value <= maker.bandwidth)
    suggestion.value = 'Maker'
  else if (mau.value <= team.mau && storage.value <= team.storage && bandwidth.value <= team.bandwidth)
    suggestion.value = 'Team'
  else suggestion.value = ''
}

const calculateTotal = () => {
  const mauPrice = mau.value > props.paygBase.mau ? (mau.value - props.paygBase.mau) * props.paygUnits.mau : 0
  const storagePrice = storage.value > props.paygBase.storage ? (storage.value - props.paygBase.storage) * props.paygUnits.storage : 0
  const bandwidthPrice = bandwidth.value > props.paygBase.bandwidth ? ((bandwidth.value - props.paygBase.bandwidth) / 1000) * props.paygUnits.bandwidth : 0
  const sum = mauPrice + storagePrice + bandwidthPrice
  if (sum > 0) { totalPrice.value = roundNumber(basePrice + sum) }
  else {
    suggestBestPlan()
    totalPrice.value = suggestion.value ? roundNumber(props.pricing.find(plan => plan.name === suggestion.value)!.price_m) : basePrice
  }
}

const calculateBandwidth = () => {
  bandwidth.value = updates.value * updatesSize.value / 1000
  calculateTotal()
}

const calculateUpdates = () => {
  updates.value = mau.value * updatesByMonth.value
  calculateBandwidth()
}
</script>

<template>
  <section id="calculator" class="py-12 bg-gray-50 sm:py-16 lg:py-20">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center xl:max-w-4xl">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
          Calculate your usage<br>
          <span class="text-xl sm:text-2xl xl:text-3xl">for the Pay-as-you-go plan</span>
        </h2>
      </div>

      <div class="relative mt-12 lg:mt-20 lg:max-w-5xl lg:mx-auto">
        <div class="absolute -inset-2">
          <div class="w-full h-full mx-auto opacity-30 blur-lg filter" style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)" />
        </div>

        <div class="relative grid grid-cols-1 px-16 py-12 overflow-hidden text-center text-white bg-gray-900 sm:grid-cols-2 gap-y-12 lg:grid-cols-4 rounded-2xl gap-x-20">
          <div class="flex flex-col items-center">
            <h3 class="calc-label">
              MAU<br><span class="text-[0.6rem]">Monthly Active Users</span>
            </h3>
            <input
              v-model.number="mau"
              placeholder="0"
              class="break-all w-full p-2 border-b bg-gray-900 border-gray-300 text-3xl text-center font-bold lg:mt-3"
              @input="calculateUpdates"
            >
          </div>

          <div class="flex flex-col items-center">
            <h3 class="calc-label">
              Storage<br>(GB)
            </h3>
            <input
              v-model.number="storage"
              placeholder="0"
              class="break-all w-full p-2 border-b bg-gray-900 border-gray-300 text-3xl text-center font-bold lg:mt-3"
              @input="calculateTotal"
            >
          </div>

          <div class="flex flex-col items-center">
            <h3 class="calc-label">
              Updates<br>by month
            </h3>
            <input
              v-model.number="updatesByMonth"
              placeholder="0"
              class="break-all w-full p-2 border-b bg-gray-900 border-gray-300 text-3xl text-center font-bold lg:mt-3"
              @input="calculateUpdates"
            >
          </div>

          <div class="flex flex-col items-center">
            <h3 class="calc-label">
              Updates Size<br>(MB)
            </h3>
            <input
              v-model.number="updatesSize"
              placeholder="0"
              class="break-all w-full p-2 border-b bg-gray-900 border-gray-300 text-3xl text-center font-bold lg:mt-3"
              @input="calculateBandwidth"
            >
          </div>

          <div class="lg:col-span-2 flex flex-col items-center">
            <h3 class="calc-label">
              Bandwidth<br>(GB)
            </h3>
            <p class="break-all text-3xl font-bold text-white mt-3 font-pj">
              {{ bandwidth }}
            </p>
          </div>
          <div class="lg:col-span-2 flex flex-col items-center">
            <h3 class="calc-label">
              Updates<br>(Total)
            </h3>
            <p class="break-all text-3xl font-bold text-white mt-3 font-pj">
              {{ updates }}
            </p>
          </div>
          <div class="sm:col-span-2 lg:col-span-4 flex flex-col items-center">
            <h3 class="mt-5 text-md font-bold tracking-widest text-white uppercase mt-0 font-pj">
              Monthly Price
            </h3>
            <p class="break-all text-3xl font-bold text-gray-900 mt-3 font-pj p-2 bg-white rounded-xl">
              {{ totalPrice }}€
            </p>
            <h3 v-show="suggestion" class="mt-5 text-sm font-bold tracking-widest text-red-400 mt-0 font-pj">
              We suggest you to choose the <a href="#plans" class="font-bold text-white uppercase">{{ suggestion }}</a> plan
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
