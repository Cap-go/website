<script setup lang="ts">
import { ref } from 'vue'

const mau = ref(1000000)
const storage = ref(30)
const updatesByMonth = ref(1)
const updatesSize = ref(15)

const updates = ref(mau.value * updatesByMonth.value)
const bandwidth = ref(updates.value * updatesSize.value / 1000)

const totalPrice = ref((mau.value - 200000) * 0.005 + (storage.value - 30) * 0.5 + (bandwidth.value - 300) * 0.2)

const calculateTotal = () => {
  const mauPrice = mau.value > 200000 ? (mau.value - 200000) * 0.005 : 0
  const storagePrice = storage.value > 30 ? (storage.value - 30) * 0.5 : 0
  const bandwidthPrice = bandwidth.value > 300 ? (bandwidth.value - 300) * 0.2 : 0
  const sum = mauPrice + storagePrice + bandwidthPrice
  if (sum > 0)
    totalPrice.value = sum
  else
    totalPrice.value = 0
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
  <section class="py-12 bg-gray-50 sm:py-16 lg:py-20">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center xl:max-w-4xl">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-3xl font-pj">
          Calculate your usage
        </h2>
      </div>

      <div class="relative mt-12 lg:mt-20 lg:max-w-5xl lg:mx-auto">
        <div class="absolute -inset-2">
          <div class="w-full h-full mx-auto opacity-30 blur-lg filter" style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)" />
        </div>

        <div class="relative grid grid-cols-1 px-16 py-12 overflow-hidden text-center bg-white sm:grid-cols-2 gap-y-12 lg:grid-cols-4 rounded-2xl gap-x-20">
          <div class="flex flex-col items-center">
            <input
              v-model.number="mau"
              :placeholder="0"
              class="break-all w-full p-2 rounded-xl border-b border-blue-700 text-3xl text-center font-bold text-gray-900 lg:mt-3 lg:order-2 font-pj"
              @input="calculateUpdates"
            >
            <h3 class="mt-5 text-sm font-bold tracking-widest text-gray-600 uppercase lg:mt-0 lg:order-1 font-pj">
              MAU
            </h3>
          </div>

          <div class="flex flex-col items-center">
            <input
              v-model.number="storage"
              :placeholder="0"
              class="break-all w-full p-2 rounded-xl border-b border-blue-700 text-3xl text-center font-bold text-gray-900 lg:mt-3 lg:order-2 font-pj"
              @input="calculateTotal"
            >
            <h3 class="mt-5 text-sm font-bold tracking-widest text-gray-600 uppercase lg:mt-0 lg:order-1 font-pj">
              Storage (GB)
            </h3>
          </div>

          <div class="flex flex-col items-center">
            <input
              v-model.number="updatesByMonth"
              :placeholder="0"
              class="break-all w-full p-2 rounded-xl border-b border-blue-700 text-3xl text-center font-bold text-gray-900 lg:mt-3 lg:order-2 font-pj"
              @input="calculateUpdates"
            >
            <h3 class="mt-5 text-sm font-bold tracking-widest text-gray-600 uppercase lg:mt-0 lg:order-1 font-pj">
              Updates/month
            </h3>
          </div>

          <div class="flex flex-col items-center">
            <input
              v-model.number="updatesSize"
              :placeholder="0"
              class="break-all w-full p-2 rounded-xl border-b border-blue-700 text-3xl text-center font-bold text-gray-900 lg:mt-3 lg:order-2 font-pj"
              @input="calculateBandwidth"
            >
            <h3 class="mt-5 text-sm font-bold tracking-widest text-gray-600 uppercase lg:mt-0 lg:order-1 font-pj">
              Updates Size (MB)
            </h3>
          </div>

          <div class="lg:col-span-2 flex flex-col items-center">
            <p class="break-all text-3xl font-bold text-gray-900 lg:mt-3 lg:order-2 font-pj">
              {{ bandwidth }}
            </p>
            <h3 class="mt-5 text-sm font-bold tracking-widest text-gray-600 uppercase lg:mt-0 lg:order-1 font-pj">
              Bandwidth
            </h3>
          </div>
          <div class="lg:col-span-2 flex flex-col items-center">
            <p class="break-all text-3xl font-bold text-gray-900 lg:mt-3 lg:order-2 font-pj">
              {{ updates }}
            </p>
            <h3 class="mt-5 text-sm font-bold tracking-widest text-gray-600 uppercase lg:mt-0 lg:order-1 font-pj">
              Updates
            </h3>
          </div>
          <div class="sm:col-span-2 lg:col-span-4 flex flex-col items-center">
            <p class="break-all text-3xl font-bold text-gray-900 lg:mt-3 lg:order-2 font-pj  p-2 border border-blue-900 rounded-xl">
              {{ totalPrice }}$
            </p>
            <h3 class="mt-5 text-md font-bold tracking-widest text-gray-900 uppercase lg:mt-0 lg:order-1 font-pj">
              Total Price
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
