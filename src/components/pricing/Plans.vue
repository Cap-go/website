<script setup lang="ts">
import * as m from '@/paraglide/messages'
import { numberWithSpaces } from '@/services/misc'
import type { Database } from '@/services/supabase.types'
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
  locale: {
    type: String,
    required: true,
  },
})

function descToText(desc: string) {
  switch (desc) {
    case 'plan.solo.desc':
      return m.plan_solo_desc({}, { locale: props.locale })
    case 'plan.maker.desc':
      return m.plan_maker_desc({}, { locale: props.locale })
    case 'plan.team.desc':
      return m.plan_team_desc({}, { locale: props.locale })
    default:
      return desc
  }
}

function descToEmoji(desc: string) {
  switch (desc) {
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
    <div class="grid grid-cols-1 mt-6 space-y-14 sm:mt-8 sm:space-y-0 lg:mt-10 lg:grid-cols-3 lg:gap-8">
      <div
        v-for="plan in props.pricing"
        :key="plan.name"
        :class="{
          'divide-blue-200 border-blue-600': plan.name === 'Maker',
          'divide-gray-200 border-gray-200': plan.name !== 'Maker',
        }"
        class="relative bg-white border divide-y divide-gray-200 shadow-xl rounded-2xl sm:rounded-3xl"
      >
        <div v-if="plan.name === 'Maker'" class="absolute top-0 right-0 flex items-start -mt-8">
          <svg class="w-auto h-16 text-blue-600" viewBox="0 0 83 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.27758 62.7565C4.52847 63.5461 5.37189 63.9827 6.16141 63.7318L19.0274 59.6434C19.817 59.3925 20.2536 58.5491 20.0027 57.7595C19.7518 56.97 18.9084 56.5334 18.1189 56.7842L6.68242 60.4184L3.04824 48.982C2.79735 48.1924 1.95394 47.7558 1.16441 48.0067C0.374889 48.2576 -0.0617613 49.101 0.189127 49.8905L4.27758 62.7565ZM13.4871 47.8215L12.229 47.0047L13.4871 47.8215ZM39.0978 20.5925L38.1792 19.4067L39.0978 20.5925ZM7.03921 62.9919C8.03518 61.0681 13.1417 51.1083 14.7453 48.6383L12.229 47.0047C10.5197 49.6376 5.30689 59.8127 4.37507 61.6126L7.03921 62.9919ZM14.7453 48.6383C22.0755 37.3475 29.8244 29.6738 40.0164 21.7784L38.1792 19.4067C27.7862 27.4579 19.7827 35.3698 12.229 47.0047L14.7453 48.6383ZM40.0164 21.7784C52.6582 11.9851 67.634 7.57932 82.2576 3.44342L81.4412 0.556653C66.8756 4.67614 51.3456 9.20709 38.1792 19.4067L40.0164 21.7784Z"
            />
          </svg>
          <span class="ml-2 -mt-2 text-sm font-semibold text-blue-600"> {{ m.most_popular({}, { locale: props.locale }) }} </span>
        </div>
        <div class="px-4 py-5 rounded-t-2xl bg-gray-50 sm:rounded-t-3xl sm:p-6">
          <div class="flex items-start">
            <span class="text-3xl shrink-0">
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
            <p class="py-1 text-sm font-normal text-gray-500">/{{ m.month({}, { locale: props.locale }) }}</p>
          </div>
          <p v-if="yearly" class="mt-8">
            <span class="text-gray-900">{{ m.billed_annually_at({}, { locale: props.locale }) }} ${{ plan.price_y }}</span>
          </p>
          <div class="mt-6">
            <a
              :href="getRelativeLocaleUrl(props.locale, 'register')"
              target="_blank"
              title="register"
              :class="{
                'bg-linear-to-r from-fuchsia-600 to-blue-600': plan.name === 'Maker',
                'bg-blue-500': plan.name !== 'Maker',
              }"
              class="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white transition-all duration-200 border border-transparent rounded-xl hover:opacity-80 focus:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
              role="button"
            >
              {{ m.days_free_trial({}, { locale: props.locale }) }}
            </a>
          </div>
          <ul class="mt-8 space-y-4 text-black">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-1 text-blue-600 shrink-0" width="32" height="32" viewBox="0 0 32 32">
                <path
                  fill="currentColor"
                  d="M23 23c-5.656 0-7.858-6.41-7.949-6.684C15.034 16.265 13.208 11 9 11c-2.757 0-5 2.243-5 5s2.243 5 5 5c1.588 0 3.013-.732 4.237-2.176l1.526 1.293C13.164 22.003 11.172 23 9 23c-3.86 0-7-3.14-7-7s3.14-7 7-7c5.656 0 7.858 6.41 7.949 6.684C16.966 15.735 18.792 21 23 21c2.757 0 5-2.243 5-5s-2.243-5-5-5c-1.588 0-3.013.732-4.237 2.176l-1.526-1.293C18.836 9.997 20.828 9 23 9c3.86 0 7 3.14 7 7s-3.14 7-7 7"
                />
              </svg>
              <span>
                {{ m.unlimited_live_updates({}, { locale: props.locale }) }}
              </span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 448 512">
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
              <span
                ><span class="font-bold">{{ numberWithSpaces(plan.mau) }}</span> {{ m.monthly_active_users({}, { locale: props.locale }) }}</span
              >
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 448 512">
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
              <span
                ><span class="font-bold">{{ numberWithSpaces(plan.bandwidth) }}</span> GB/{{ m.month({}, { locale: props.locale }) }}
                {{ m.of_bandwidth({}, { locale: props.locale }) }}</span
              >
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 448 512">
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
              <span
                ><span class="font-bold">{{ numberWithSpaces(plan.storage) }}</span> GB {{ m.of_storage({}, { locale: props.locale }) }}</span
              >
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 448 512">
                <path
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
              <span v-html="m.priority_support_for_all_capgo_plugins({}, { locale: props.locale })" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
