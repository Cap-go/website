<script setup lang="ts">
import sampleData from '../../lib/sample-data/pricing.json'

const pricing = sampleData['pay-as-you-go']
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
          <div
            class="w-full h-full mx-auto opacity-30 blur-lg filter"
            style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
          />
        </div>

        <div class="relative grid grid-cols-1 px-16 py-12 overflow-hidden text-center text-white bg-gray-900 sm:grid-cols-2 gap-y-12 lg:grid-cols-4 rounded-2xl gap-x-20">
          <div class="flex flex-col items-center">
            <h3 class="calc-label">
              MAU<br><span class="text-[0.6rem]">Monthly Active Users</span>
            </h3>
            <p class="text-lg text-white mt-3 font-pj">
              {{ pricing.mau.base }} included<br>
              {{ pricing.mau['price-per-unit'] }} per added user
            </p>
          </div>

          <div class="flex flex-col items-center">
            <h3 class="calc-label">
              Storage<br>(GB)
            </h3>
            <p class="text-lg text-white mt-3 font-pj">
              {{ pricing.storage.base }} included<br>
              {{ pricing.storage['price-per-unit'] }} per added GB
            </p>
          </div>

          <div class="flex flex-col items-center">
            <h3 class="calc-label">
              Updates<br>by month
            </h3>
            <p class="text-lg text-white mt-3 font-pj">
              Part of the Bandwidth price calculation
            </p>
          </div>

          <div class="flex flex-col items-center">
            <h3 class="calc-label">
              Updates Size<br>(MB)
            </h3>
            <p class="text-lg text-white mt-3 font-pj">
              Part of the Bandwidth price calculation
            </p>
          </div>

          <div class="lg:col-span-2 flex flex-col items-center">
            <h3 class="calc-label">
              Bandwidth
            </h3>
            <p class="text-lg text-white mt-3 font-pj">
              {{ pricing.bandwidth.base }} included<br>
              {{ pricing.bandwidth['price-per-unit'] }} per added GB
            </p>
          </div>
          <div class="lg:col-span-2 flex flex-col items-center">
            <h3 class="calc-label">
              Updates
            </h3>
            <p class="text-lg text-white mt-3 font-pj">
              Part of the Bandwidth price calculation
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
