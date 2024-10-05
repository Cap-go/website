<script setup lang="ts">
import type { Locales } from '@/services/locale'
import translations from '@/services/translations'
import type { Database } from '@/types/supabase.types'
import { getRelativeLocaleUrl } from 'astro:i18n'

const props = defineProps({
  pricing: {
    type: Array<Database['public']['Tables']['plans']['Row']>,
    required: true,
  },
  yearly: {
    type: Boolean,
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
  locale: {
    type: String,
    required: true,
  },
})

function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function updateCalc(plan: Database['public']['Tables']['plans']['Row']) {
  // return aprox number of updates per month
  return plan.mau * 5
}

function descToText(desc: string) {
  switch (desc) {
    case 'plan.free.desc':
      return translations['plan.free.desc'][props.locale as Locales]
    case 'plan.solo.desc':
      return translations['plan.solo.desc'][props.locale as Locales]
    case 'plan.maker.desc':
      return translations['plan.maker.desc'][props.locale as Locales]
    case 'plan.team.desc':
      return translations['plan.team.desc'][props.locale as Locales]
    default:
      return desc
  }
}
function descToEmoji(desc: string) {
  switch (desc) {
    case 'plan.free.desc':
      return '👋'
    case 'plan.solo.desc':
      return '🤘'
    case 'plan.maker.desc':
      return '💪'
    case 'plan.team.desc':
      return '🚀'
    default:
      return desc
  }
}
</script>

<template>
  <section id="plans">
    <div class="mt-6 grid grid-cols-1 space-y-14 sm:mt-8 sm:space-y-0 lg:mt-10 lg:grid-cols-3 lg:gap-8">
      <div
        v-for="plan in props.pricing"
        :key="plan.name"
        :class="{
          'divide-blue-200 border-blue-600': plan.name === 'Maker',
          'divide-gray-200 border-gray-200': plan.name !== 'Maker',
        }"
        class="relative divide-y divide-gray-200 rounded-2xl border bg-white shadow-xl sm:rounded-3xl"
      >
        <div v-if="plan.name === 'Maker'" class="absolute right-0 top-0 -mt-8 flex items-start">
          <svg class="h-16 w-auto text-blue-600" viewBox="0 0 83 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.27758 62.7565C4.52847 63.5461 5.37189 63.9827 6.16141 63.7318L19.0274 59.6434C19.817 59.3925 20.2536 58.5491 20.0027 57.7595C19.7518 56.97 18.9084 56.5334 18.1189 56.7842L6.68242 60.4184L3.04824 48.982C2.79735 48.1924 1.95394 47.7558 1.16441 48.0067C0.374889 48.2576 -0.0617613 49.101 0.189127 49.8905L4.27758 62.7565ZM13.4871 47.8215L12.229 47.0047L13.4871 47.8215ZM39.0978 20.5925L38.1792 19.4067L39.0978 20.5925ZM7.03921 62.9919C8.03518 61.0681 13.1417 51.1083 14.7453 48.6383L12.229 47.0047C10.5197 49.6376 5.30689 59.8127 4.37507 61.6126L7.03921 62.9919ZM14.7453 48.6383C22.0755 37.3475 29.8244 29.6738 40.0164 21.7784L38.1792 19.4067C27.7862 27.4579 19.7827 35.3698 12.229 47.0047L14.7453 48.6383ZM40.0164 21.7784C52.6582 11.9851 67.634 7.57932 82.2576 3.44342L81.4412 0.556653C66.8756 4.67614 51.3456 9.20709 38.1792 19.4067L40.0164 21.7784Z"
            />
          </svg>
          <span class="-mt-2 ml-2 text-sm font-semibold text-blue-600"> {{ translations['most_popular'][props.locale as Locales] }} </span>
        </div>
        <div class="rounded-t-2xl bg-gray-50 px-4 py-5 sm:rounded-t-3xl sm:p-6">
          <div class="flex items-start">
            <span class="shrink-0 text-3xl">
              {{ descToEmoji(plan.description) }}
            </span>
            <div class="ml-6">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ plan.name.toUpperCase() }}
              </h3>
              <p class="mt-2 text-sm font-normal text-gray-500">
                {{ descToText(plan.description) }}
              </p>
            </div>
          </div>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-end">
            <p class="text-5xl font-semibold text-gray-900">${{ yearly ? (plan.price_y / 12).toFixed() : plan.price_m }}</p>
            <p class="py-1 text-sm font-normal text-gray-500">/month</p>
          </div>
          <div class="mt-6">
            <a
              :href="getRelativeLocaleUrl(props.locale, 'register')"
              target="_blank"
              title="register"
              :class="{
                'bg-gradient-to-r from-fuchsia-600 to-blue-600': plan.name === 'Maker',
                'bg-blue-500': plan.name !== 'Maker',
              }"
              class="inline-flex w-full items-center justify-center rounded-xl border border-transparent px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:opacity-80 focus:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
              role="button"
            >
              {{ translations['14_days_free_trial'][props.locale as Locales] }}
            </a>
          </div>
          <p v-if="yearly" class="mt-8">
            <span class="text-gray-900 dark:text-white">{{ translations['billed_annually_at'][props.locale as Locales] }} ${{ plan.price_y }}</span>
          </p>
          <p class="mt-8 text-xs font-semibold uppercase tracking-widest text-gray-500">{{ translations['you_get'][props.locale as Locales] }}</p>
          <ul class="mt-8 space-y-4 text-black">
            <li class="flex items-center">
              <svg class="mr-2 h-5 w-5 shrink-0 fill-blue-600 text-blue-600" xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 448 512">
                <path
                  d="M99.9 192C80.1 192 64 208.1 64 227.9V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V227.9C0 172.7 44.7 128 99.9 128c26.5 0 51.9 10.5 70.6 29.3L322.7 309.5c6.7 6.7 15.9 10.5 25.4 10.5c19.8 0 35.9-16.1 35.9-35.9V192c0-17.7 14.3-32 32-32s32 14.3 32 32v92.1c0 55.2-44.7 99.9-99.9 99.9c-26.5 0-51.9-10.5-70.6-29.3L125.3 202.5c-6.7-6.7-15.9-10.5-25.4-10.5z"
                />
              </svg>
              <span>
                <span class="font-bold">{{ numberWithSpaces(updateCalc(plan)) }}</span>
                {{ translations['live_updates_per_month'][props.locale as Locales] }}
              </span>
            </li>
            <li class="flex items-center">
              <svg class="mr-2 h-5 w-5 shrink-0 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 448 512">
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
              <span
                ><span class="font-bold">{{ numberWithSpaces(plan.mau) }}</span
                >{{ translations['monthly_active_users'][props.locale as Locales] }}</span
              >
            </li>
            <li class="flex items-center">
              <svg class="mr-2 h-5 w-5 shrink-0 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 448 512">
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
              <span
                ><span class="font-bold">{{ numberWithSpaces(plan.bandwidth) }}</span> GB/mo {{ translations['of_bandwidth'][props.locale as Locales] }}</span
              >
            </li>
            <li class="flex items-center">
              <svg class="mr-2 h-5 w-5 shrink-0 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 448 512">
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
              <span
                ><span class="font-bold">{{ numberWithSpaces(plan.storage) }}</span> GB {{ translations['of_storage'][props.locale as Locales] }}</span
              >
            </li>
            <li class="flex items-center">
              <svg class="mr-2 h-5 w-5 shrink-0 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 448 512">
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
              <span v-html="translations['priority_support_for_all_capgo_plugins'][props.locale as Locales]" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
