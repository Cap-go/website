<script setup lang="ts">
import type { Locales } from '@/services/locale'
import { numberWithSpaces, toTb, updateCalc } from '@/services/misc'
import translations from '@/services/translations'
import { getRelativeLocaleUrl } from 'astro:i18n'

const props = defineProps({
  payg: {
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
</script>

<template>
  <section id="pay-as-you-go" class="py-12 bg-gray-50 sm:py-16 lg:py-20">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="flex items-center justify-center">
          <div class="inline-flex items-center justify-center text-lg bg-gray-900 rounded-full h-9 w-9">🔥</div>
          <h2 class="ml-3 text-4xl font-bold text-gray-900 font-pj">{{ translations['pay_as_you_go'][props.locale as Locales] }}</h2>
        </div>
        <p class="mt-4 text-base font-normal text-gray-600 font-pj">
          {{ numberWithSpaces(updateCalc(props.payg)) }} {{ translations['pay_as_you_go_description'][props.locale as Locales] }}
        </p>
      </div>
      <div class="relative max-w-sm mx-auto mt-8 md:mt-12 md:max-w-3xl">
        <div class="absolute -inset-4">
          <div
            class="w-full h-full mx-auto opacity-30 blur-lg filter"
            style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
          />
        </div>
        <div class="relative overflow-hidden bg-white border border-gray-200 rounded-2xl">
          <div class="p-6 md:px-10 md:py-9">
            <div class="grid items-center grid-cols-1 gap-y-9 md:grid-cols-7 md:gap-y-0">
              <div class="space-y-9 md:col-span-3 xl:pr-2">
                <div class="flex items-center">
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full">
                    <svg class="w-5 h-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-lg font-bold text-gray-900 font-pj">{{ translations['monthly_active_users'][props.locale as Locales] }}</p>
                    <p class="mt-1 text-sm font-normal text-gray-600 font-pj">
                      <span class="font-bold">{{ props.payg?.mau.toLocaleString() }}</span>
                      {{ translations['users_included'][props.locale as Locales] }}, {{ translations['then'][props.locale as Locales] }} ${{ props.payg?.mau_unit }}/{{ translations['user'][props.locale as Locales] }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full">
                    <svg class="w-5 h-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-lg font-bold text-gray-900 font-pj">{{ translations['bandwidth'][props.locale as Locales] }}</p>
                    <p class="mt-1 text-sm font-normal text-gray-600 font-pj">
                      <span class="font-bold">{{ toTb(props.payg?.bandwidth) }}</span>
                      {{ translations['TB_included'][props.locale as Locales] }}, {{ translations['then'][props.locale as Locales] }} ${{ props.payg?.bandwidth_unit }}
                      {{ translations['per_GB'][props.locale as Locales] }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full">
                    <svg class="w-5 h-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-lg font-bold text-gray-900 font-pj">{{ translations['cloud_storage'][props.locale as Locales] }}</p>
                    <p class="mt-1 text-sm font-normal text-gray-600 font-pj">
                      <span class="font-bold">{{ props.payg?.storage.toLocaleString() }}</span>
                      {{ translations['GB_included'][props.locale as Locales] }}, {{ translations['then'][props.locale as Locales] }} ${{ props.payg?.storage_unit }}
                      {{ translations['per_GB'][props.locale as Locales] }}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div class="hidden md:block">
                  <svg class="w-4 h-auto mx-auto text-gray-300" viewBox="0 0 16 172" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 11)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 46)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 81)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 116)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 151)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 18)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 53)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 88)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 123)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 158)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 25)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 60)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 95)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 130)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 165)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 32)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 67)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 102)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 137)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 172)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 39)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 74)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 109)" />
                    <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 144)" />
                  </svg>
                </div>
                <div class="block md:hidden">
                  <svg class="w-auto h-4 mx-auto text-gray-300" viewBox="0 0 172 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
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
              <div class="space-y-9 md:col-span-3 xl:pr-2">
                <div class="flex items-center">
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full">
                    <svg class="w-5 h-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-lg font-bold text-gray-900 font-pj">{{ translations['API_access'][props.locale as Locales] }}</p>
                    <p class="mt-1 text-sm font-normal text-gray-600 font-pj">{{ translations['create_anything_you_want'][props.locale as Locales] }}</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full">
                    <svg class="w-5 h-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-lg font-bold text-gray-900 font-pj">{{ translations['dedicated_support'][props.locale as Locales] }}</p>
                    <p class="mt-1 text-sm font-normal text-gray-600 font-pj">{{ translations['get_an_answer_in_less_than_6h'][props.locale as Locales] }}</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full">
                    <svg class="w-5 h-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-lg font-bold text-gray-900 font-pj">{{ translations['custom_domain'][props.locale as Locales] }}</p>
                    <p class="mt-1 text-sm font-normal text-gray-600 font-pj">{{ translations['add_your_own_domain'][props.locale as Locales] }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 text-center">
        <p class="text-base font-medium text-gray-600 font-pj">{{ translations['all_our_features_are_available_to_all_users'][props.locale as Locales] }}</p>
        <div class="flex items-end justify-center mt-10">
          <p class="text-lg font-bold text-gray-400 font-pj">$</p>
          <p class="text-6xl font-bold text-gray-900 font-pj">
            {{ props.yearly ? props.payg.price_y.toLocaleString() : props.payg?.price_m.toLocaleString() }}
          </p>
          <p class="text-lg font-bold text-gray-400 font-pj">/{{ translations['month'][props.locale as Locales] }}</p>
        </div>
        <a
          role="button"
          target="_blank"
          title="Register"
          :href="getRelativeLocaleUrl(props.locale, 'register')"
          class="font-pj relative mt-9 inline-flex items-center justify-center rounded-xl border border-transparent bg-gray-900 px-8 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          {{ translations['get_started_for_free'][props.locale as Locales] }}
        </a>
      </div>
    </div>
  </section>
</template>
