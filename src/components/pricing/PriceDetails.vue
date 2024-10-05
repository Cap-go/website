<script setup lang="ts">
import sampleData from '../../lib/sample-data/pricing.json'

const pricing = sampleData['pay-as-you-go']
</script>

<template>
  <section id="calculator" class="bg-gray-50 py-12 sm:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center xl:max-w-4xl">
        <h2 class="font-pj text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
          Calculate your usage<br />
          <span class="text-xl sm:text-2xl xl:text-3xl">for the Pay-as-you-go plan</span>
        </h2>
      </div>
      <div class="relative mt-12 lg:mx-auto lg:mt-20 lg:max-w-5xl">
        <div class="absolute -inset-2">
          <div
            class="mx-auto h-full w-full opacity-30 blur-lg filter"
            style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
          />
        </div>
        <div class="relative grid grid-cols-1 gap-x-20 gap-y-12 overflow-hidden rounded-2xl bg-gray-900 px-16 py-12 text-center text-white sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex flex-col items-center">
            <h3 class="calc-label">MAU<br /><span class="text-[0.6rem]">Monthly Active Users</span></h3>
            <p class="font-pj mt-3 text-lg text-white">
              {{ pricing.mau.base }} included<br />
              {{ pricing.mau['price-per-unit'] }} per added user
            </p>
          </div>
          <div class="flex flex-col items-center">
            <h3 class="calc-label">Storage<br />(GB)</h3>
            <p class="font-pj mt-3 text-lg text-white">
              {{ pricing.storage.base }} included<br />
              {{ pricing.storage['price-per-unit'] }} per added GB
            </p>
          </div>
          <div class="flex flex-col items-center">
            <h3 class="calc-label">Updates<br />by month</h3>
            <p class="font-pj mt-3 text-lg text-white">Part of the Bandwidth price calculation</p>
          </div>
          <div class="flex flex-col items-center">
            <h3 class="calc-label">Updates Size<br />(MB)</h3>
            <p class="font-pj mt-3 text-lg text-white">Part of the Bandwidth price calculation</p>
          </div>
          <div class="flex flex-col items-center lg:col-span-2">
            <h3 class="calc-label">Bandwidth</h3>
            <p class="font-pj mt-3 text-lg text-white">
              {{ pricing.bandwidth.base }} included<br />
              {{ pricing.bandwidth['price-per-unit'] }} per added GB
            </p>
          </div>
          <div class="flex flex-col items-center lg:col-span-2">
            <h3 class="calc-label">Updates</h3>
            <p class="font-pj mt-3 text-lg text-white">Part of the Bandwidth price calculation</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
