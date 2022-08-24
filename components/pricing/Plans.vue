<script setup lang="ts">
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
</script>

<template>
  <div id="plans">
    <section class="pt-32 mt-8">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 px-12 text-center sm:text-left sm:px-0 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="plan in props.pricing" :key="plan.name" class="">
            <h3 class="text-lg font-bold text-gray-900 font-pj">
              {{ plan.name }}<br>
            </h3>
            <p class="mt-3 text-sm font-normal text-gray-600 font-pj">
              {{ plan.market_desc }}
            </p>
            <div class="flex items-end justify-center mt-6 sm:justify-start">
              <p class="text-5xl font-bold text-gray-900 font-pj">
                {{ plan.price_m }}€{{ plan.name === 'Pay as you go' ? "+" : "" }}
              </p>
              <p class="text-lg font-medium text-gray-400 font-pj">
                /month
              </p>
            </div>

            <svg class="w-auto h-4 mx-auto mt-8 text-gray-300 sm:mx-0" viewBox="0 0 172 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)" />
            </svg>

            <ul v-if="plan.name !== 'Pay as you go'" class="mt-6 space-y-3 text-base font-medium text-gray-900">
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ plan.mau }} Monthly Active Users
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ plan.storage }} GB/mo of Storage
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ plan.bandwidth }} GB/mo of Bandwidth
              </li>

              <li class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ plan.name === 'Solo' ? 'Limited' : 'Advanced' }} Reporting
              </li>

              <li v-if="plan.progressive_deploy" class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Progressive Deployment
              </li>

              <li v-if="plan.abtest" class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                AB Testing
              </li>
            </ul>

            <ul v-else class="mt-6 space-y-3 text-base font-medium text-gray-900">
              <li class="">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>{{ props.paygBase.mau }} Monthly Active Users<br> <span class="text-gray-500">{{ props.paygUnits.mau }}€ per added user</span></div>
                </div>
              </li>

              <li class="flex items-center">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>{{ props.paygBase.storage }} GB/mo of Storage<br> <span class="text-gray-500">{{ props.paygUnits.storage }}€ per added GB</span></div>
                </div>
              </li>

              <li class="flex items-center">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>{{ props.paygBase.bandwidth }} GB/mo of Bandwidth<br> <span class="text-gray-500">{{ props.paygUnits.bandwidth }}€ per added GB</span></div>
                </div>
              </li>

              <li class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Advanced Reporting
              </li>

              <li v-if="plan.progressive_deploy" class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Progressive Deployment
              </li>

              <li v-if="plan.abtest" class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                AB Testing
              </li>
            </ul>

            <a
              href="https://web.capgo.app/register"
              title="Register on Capgo"
              target="_blank"
              class="
                        w-full
                        inline-flex
                        items-center
                        justify-center
                        px-4
                        py-3
                        mt-10
                        text-base
                        font-bold
                        text-gray-900
                        transition-all
                        duration-200
                        bg-transparent
                        border border-gray-400
                        rounded
                        font-pj
                        hover:bg-gray-900 hover:text-white
                        focus:bg-gray-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                    "
              role="button"
            >
              Start trial
            </a>
            <a
              v-if="plan.name === 'Pay as you go'"
              href="#calculator"
              title="Calculate your monthly cost"
              class="
                        w-full
                        inline-flex
                        items-center
                        justify-center
                        px-4
                        py-3
                        mt-2
                        text-base
                        font-bold
                        text-gray-900
                        transition-all
                        duration-200
                        bg-transparent
                        border border-gray-400
                        rounded
                        font-pj
                        hover:bg-gray-900 hover:text-white
                        focus:bg-gray-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                    "
              role="button"
            >
              Calculate your monthly cost
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>

</style>
