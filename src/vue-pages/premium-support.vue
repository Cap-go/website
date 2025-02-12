<script setup lang="ts">
import { type Locales } from '@/services/locale'
import * as m from "../paraglide/messages.js"
import { useRuntimeConfig } from '@/config/app'
import { ref } from 'vue'
import {
  UserGroupIcon,
  ClockIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  CpuChipIcon
} from '@heroicons/vue/24/solid'

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()

const benefits = [
  {
    name: m.expert_team(),
    description: m.expert_team_description(),
    icon: UserGroupIcon,
  },
  {
    name: m.fast_response(),
    description: m.fast_response_description(),
    icon: ClockIcon,
  },
  {
    name: m.comprehensive_support(),
    description: m.comprehensive_support_description(),
    icon: AcademicCapIcon,
  },
  {
    name: m.dedicated_resources(),
    description: m.dedicated_resources_description(),
    icon: MagnifyingGlassIcon,
  },
]

const features = [
  {
    name: m.dedicated_support(),
    description: m.direct_access_to_experts(),
    icon: UserGroupIcon,
  },
  {
    name: m.priority_response(),
    description: m.guaranteed_response_time(),
    icon: ClockIcon,
  },
  {
    name: m.technical_guidance(),
    description: m.expert_advice_and_best_practices(),
    icon: AcademicCapIcon,
  },
  {
    name: m.code_review(),
    description: m.thorough_code_analysis(),
    icon: MagnifyingGlassIcon,
  },
]

const supportCases = [
  {
    title: m.performance_optimization(),
    description: m.optimize_app_performance(),
    icon: RocketLaunchIcon,
  },
  {
    title: m.bug_investigation(),
    description: m.identify_and_fix_issues(),
    icon: MagnifyingGlassIcon,
  },
  {
    title: m.architecture_review(),
    description: m.review_app_architecture(),
    icon: CommandLineIcon,
  },
  {
    title: m.security_audit(),
    description: m.assess_security_measures(),
    icon: ShieldCheckIcon,
  },
  {
    title: m.plugin_development(),
    description: m.custom_plugin_development(),
    icon: CpuChipIcon,
  }
]
</script>

<template>
  <div class="bg-white">
    <div class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
      <div class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div class="px-6 lg:px-0 lg:pt-4">
          <div class="mx-auto max-w-2xl">
            <div class="max-w-lg">
              <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{{ m.premium_support() }}</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                {{ m.expert_capacitor_support() }}
              </p>
              <div class="mt-10 flex items-center gap-x-6">
                <a
                  href="https://cal.com/martindonadieu/capgo-premium-support"
                  target="_blank"
                  class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {{ m.get_started() }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl sm:text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.premium_support_pricing() }}</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            {{ m.premium_support_description() }}
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div class="p-8 sm:p-10 lg:flex-auto">
            <h3 class="text-2xl font-bold tracking-tight text-gray-900">{{ m.premium_support() }}</h3>
            <p class="mt-6 text-base leading-7 text-gray-600">
              {{ m.premium_support_features() }}
            </p>
            <div class="mt-10 flex items-center gap-x-4">
              <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">{{ m.what_is_included() }}</h4>
              <div class="h-px flex-auto bg-gray-100"></div>
            </div>
            <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              <li v-for="feature in features" :key="feature.name" class="flex gap-x-3">
                <component :is="feature.icon" class="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {{ feature.name }}
              </li>
            </ul>
          </div>
          <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div class="mx-auto max-w-xs px-8">
                <p class="text-base font-semibold text-gray-600">{{ m.monthly_retainer() }}</p>
                <p class="mt-6 flex items-baseline justify-center gap-x-2">
                  <span class="text-5xl font-bold tracking-tight text-gray-900">$250</span>
                  <span class="text-sm font-semibold leading-6 tracking-wide text-gray-600">/{{ m.hour() }}</span>
                </p>
                <p class="mt-3 text-sm leading-6 text-gray-600">{{ m.two_day_minimum() }}</p>
                <a
                  href="https://cal.com/martindonadieu/capgo-premium-support"
                  target="_blank"
                  class="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {{ m.get_started() }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits -->
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.premium_support_benefits() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.why_choose_premium_support() }}</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div v-for="benefit in benefits" :key="benefit.name" class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <component :is="benefit.icon" class="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {{ benefit.name }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ benefit.description }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Benefits -->
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.premium_support_benefits() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.why_choose_premium_support() }}</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div v-for="benefit in benefits" :key="benefit.name" class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <component :is="benefit.icon" class="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {{ benefit.name }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ benefit.description }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Support Cases -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.expert_support() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.how_we_can_help() }}</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div v-for="supportCase in supportCases" :key="supportCase.title" class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <component :is="supportCase.icon" class="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {{ supportCase.title }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ supportCase.description }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
