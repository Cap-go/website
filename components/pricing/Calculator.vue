<script setup lang="ts">
import { ref } from 'vue'
import sampleData from '../../assets/sample-data/pricing.json'

const pricing: {
  [key: string]: any
} = sampleData

const mau = ref(pricing['pay-as-you-go'].mau.base)
const storage = ref(pricing['pay-as-you-go'].storage.base)
const updatesByMonth = ref(1)
const updatesSize = ref(1)

const updates = ref(mau.value * updatesByMonth.value)
const bandwidth = ref(updates.value * updatesSize.value / 1000)

const basePrice = pricing['pay-as-you-go'].price
const totalPrice = ref(basePrice)

const suggestion = ref('')

const roundNumber = (number: number) => {
  return Math.round(number * 100) / 100
}

const suggestBestPlan = () => {
  if (mau.value <= pricing.solo.mau && storage.value <= pricing.solo.storage && bandwidth.value <= pricing.solo.bandwidth)
    suggestion.value = 'solo'
  else if (mau.value <= pricing.maker.mau && storage.value <= pricing.maker.storage && bandwidth.value <= pricing.maker.bandwidth)
    suggestion.value = 'maker'
  else if (mau.value <= pricing.team.mau && storage.value <= pricing.team.storage && bandwidth.value <= pricing.team.bandwidth)
    suggestion.value = 'team'
  else suggestion.value = ''
}

const calculateTotal = () => {
  const mauPrice = mau.value > pricing['pay-as-you-go'].mau.base ? (mau.value - pricing['pay-as-you-go'].mau.base) * pricing['pay-as-you-go'].mau['price-per-unit'] : 0
  const storagePrice = storage.value > pricing['pay-as-you-go'].storage.base ? (storage.value - pricing['pay-as-you-go'].storage.base) * pricing['pay-as-you-go'].storage['price-per-unit'] : 0
  const bandwidthPrice = bandwidth.value > pricing['pay-as-you-go'].bandwidth.base ? (bandwidth.value - pricing['pay-as-you-go'].bandwidth.base) * pricing['pay-as-you-go'].bandwidth['price-per-unit'] : 0
  const sum = mauPrice + storagePrice + bandwidthPrice
  if (sum > 0) { totalPrice.value = roundNumber(basePrice + sum) }
  else {
    suggestBestPlan()
    totalPrice.value = suggestion.value ? roundNumber(pricing[suggestion.value].price) : basePrice
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
              Updates Size<br>(MB)
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
              Bandwidth
            </h3>
            <p class="break-all text-3xl font-bold text-white mt-3 font-pj">
              {{ bandwidth }}
            </p>
          </div>
          <div class="lg:col-span-2 flex flex-col items-center">
            <h3 class="calc-label">
              Updates
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
