<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ArrowNarrowRightIcon } from '@heroicons/vue/solid'
import Calculator from '~~/components/pricing/Calculator.vue'
import Plans from '~~/components/pricing/Plans.vue'
import type { definitions } from '~~/types/supabase'
const config = useRuntimeConfig()

const { data: plans } = await useAsyncData('plans', async () => {
  const res = await fetch(`${config.domain}/api/plans`)
  const json = await res.json()
  if (res.ok)
    return json as Array<definitions['plans']>
  return []
})

const { data: pay_as_you_go_plan } = await useAsyncData('paygo', async () => {
  const res = await fetch(`${config.domain}/api/pay_as_you_go`)
  const json = await res.json()
  if (res.ok)
    return json as Array<definitions['pay_as_you_go']>
  else return []
})

const pricing: {
  [key: string]: any
} = plans.value

const payg_base = pay_as_you_go_plan.value.filter(plan => plan.type === 'base')[0]
const payg_units = pay_as_you_go_plan.value.filter(plan => plan.type === 'units')[0]
</script>

<template>
  <section class="py-12 bg-gray-50 sm:py-16 lg:py-20">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="mx-auto text-center">
        <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-8xl font-pj">
          The right plan can change your work
        </h1>
        <h2 class="mt-6 text-xl font-normal text-gray-600 font-pj">
          Enterprise-grade cloud that enhance Capacitor application functionality and security.
        </h2>
      </div>

      <Plans v-if="plans.length > 0" :pricing="pricing" :payg-base="payg_base" :payg-units="payg_units" />

      <p class="max-w-md mx-auto mt-8 text-2xl font-800 text-center text-pumpkinOrange-500 md:mt-16 font-pj">
        1 month free trial for all plans
      </p>
      <section class="py-12 sm:py-16 lg:py-20">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Need more ? Contact us for tailored plan
            </h2>
          </div>

          <div class="relative max-w-5xl mx-auto mt-8 md:mt-16">
            <div class="absolute -inset-4">
              <div class="w-full h-full mx-auto opacity-30 blur-lg filter" style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)" />
            </div>

            <div class="relative overflow-hidden bg-gray-900 rounded-2xl">
              <div class="px-16 py-8 sm:px-8 lg:px-16 lg:py-14">
                <div class="md:flex md:items-center md:space-x-12 lg:space-x-24">
                  <div class="grid grid-cols-1 gap-y-3 sm:grid-cols-2 gap-x-12 xl:gap-x-24">
                    <div>
                      <ul class="space-y-3 text-base font-medium text-white font-pj">
                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Unlimited updates
                        </li>

                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Bigger app size
                        </li>

                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          More version Storage
                        </li>
                      </ul>
                    </div>

                    <div>
                      <ul class="space-y-3 text-base font-medium text-white font-pj">
                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Custom domain
                        </li>

                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Special API access
                        </li>

                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Bulk upload
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="block md:hidden lg:block">
                    <div class="hidden lg:block">
                      <svg class="w-4 h-auto text-gray-600" viewBox="0 0 16 123" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 11)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 46)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 81)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 116)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 18)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 53)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 88)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 123)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 25)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 60)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 95)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 32)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 67)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 102)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 39)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 74)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 109)" />
                      </svg>
                    </div>

                    <div class="block mt-10 md:hidden">
                      <svg class="w-auto h-4 text-gray-600" viewBox="0 0 172 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
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
                    </div>
                  </div>

                  <div class="mt-10 md:mt-0">
                    <a
                      title="Get quote now"
                      class="
                                    inline-flex
                                    items-center
                                    justify-center
                                    px-9
                                    py-3.5
                                    mt-5
                                    text-base
                                    font-bold
                                    text-gray-900
                                    transition-all
                                    duration-200
                                    bg-white
                                    border border-transparent
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                                    font-pj
                                    hover:bg-opacity-90
                                    rounded-xl
                                "
                      href="#support"
                    >
                      Get quote now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Calculator v-if="pay_as_you_go_plan.length > 0" :pricing="pricing" :payg-base="payg_base" :payg-units="payg_units" />

      <div class="flex max-w-md mx-auto items-center justify-center mt-3">
        <a href="https://web.capgo.app/register" class="text-center text-2xl text-white p-3 px-5 border bg-gray-900 rounded-xl hover:bg-transparent hover:border-gray-900 hover:text-gray-900 group transition ease-in-out">
          Subscribe now <ArrowNarrowRightIcon class="h-5 w-5 inline-block text-white group-hover:text-gray-900" />
        </a>
      </div>

      <p class="max-w-md mx-auto mt-8 text-base text-center text-gray-500 md:mt-16 font-pj">
        We don’t bill you automatically until your confirmation.<br> We don’t store or sell your data to anyone.
      </p>
      <p class="max-w-md mx-auto mt-8 text-base text-center text-gray-500 md:mt-16 font-pj">
        (¹) each App can have this number.
      </p>
    </div>
  </section>
</template>
