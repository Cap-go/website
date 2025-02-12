<script setup lang="ts">
import { type Locales } from '@/services/locale'
import * as m from "../paraglide/messages.js"
import { useRuntimeConfig } from '@/config/app'
import { ref, computed } from 'vue'
import Testimonials from '@/components/Testimonials.vue'
import {
  ArrowPathIcon,
  BanknotesIcon,
  ArrowsRightLeftIcon,
  BoltIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  WrenchScrewdriverIcon,
  ServerIcon,
  BeakerIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/solid'

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()

const monthlyUpdates = ref(10000)
const yearlyPrice = computed(() => {
  const basePrice = 6000 // Appflow base price
  const updatePrice = Math.ceil(monthlyUpdates.value / 10000) * 1200 // $1200 per 10k MAU
  return basePrice + updatePrice
})
const capgoPrice = computed(() => {
  return Math.ceil(monthlyUpdates.value / 100000) * 1200 // $1200 per 100k MAU
})
const yearlySavings = computed(() => {
  return yearlyPrice.value - capgoPrice.value
})

const comparisonFeatures = [
  {
    name: m.ota_updates(),
    capgo: true,
    appflow: true,
    description: m.send_updates_without_app_store_review(),
  },
  {
    name: m.self_hosting(),
    capgo: true,
    appflow: false,
    description: m.self_hosting_option(),
  },
  {
    name: m.plugin_ecosystem(),
    capgo: true,
    appflow: false,
    description: m.largest_plugin_provider(),
  },
  {
    name: m.cost_effective(),
    capgo: true,
    appflow: false,
    description: m.significant_cost_savings(),
  },
  {
    name: m.update_channels(),
    capgo: true,
    appflow: true,
    description: m.manage_different_versions(),
  },
]

const filteredTestimonials = computed(() => {
  return [
    {
      image: '/LevarBerry.webp',
      name: 'LeVar Berry',
      handle: 'levarberry',
      message: 'Cancelled my @Appflow subscription after 4 years. Code-Push never seemed to work well, hopefully @CapGO has it figured out',
    },
    {
      image: '/jaythegeek.webp',
      name: 'jaythegeek',
      handle: 'jaythegeek',
      message: 'Did setup @Capgo and testing out this awesome replacement for @AppFlow!\n\n Thank you for the hard work, it has been easy so far. About to release to the app stores 🤞',
    },
    {
      image: '/avatar-male-2.webp',
      name: 'jermaine',
      handle: 'jermaine',
      message: "Jumped over to @Capgo after @AppFlow hit us with a $5000 bill for the year to continue.\n\nLoving CapoGo so far. Thanks for @Capgo, it's a great product.",
    },
    {
      image: '/osirisrex.webp',
      name: "NASA's OSIRIS-REx",
      handle: 'osirisrex',
      message: '@Capgo is a smart way to make hot code pushes (and not for all the money in the world like with @AppFlow) 🙂',
    },
  ]
})

const migrationSteps = [
  {
    title: m.assessment(),
    description: m.assess_current_setup(),
    icon: ClipboardDocumentCheckIcon,
  },
  {
    title: m.preparation(),
    description: m.prepare_migration_environment(),
    icon: WrenchScrewdriverIcon,
  },
  {
    title: m.configuration(),
    description: m.configure_capgo_settings(),
    icon: ServerIcon,
  },
  {
    title: m.testing(),
    description: m.test_migration_process(),
    icon: BeakerIcon,
  },
  {
    title: m.deployment(),
    description: m.deploy_to_production(),
    icon: ArrowPathIcon,
  },
  {
    title: m.verification(),
    description: m.verify_functionality(),
    icon: CheckCircleIcon,
  },
]

const benefits = [
  {
    name: m.cost_effective(),
    description: m.significant_cost_savings(),
    icon: BanknotesIcon,
  },
  {
    name: m.seamless_migration(),
    description: m.minimal_disruption(),
    icon: ArrowsRightLeftIcon,
  },
  {
    name: m.better_performance(),
    description: m.improved_update_delivery(),
    icon: BoltIcon,
  },
  {
    name: m.dedicated_migration_assistance(),
    description: m.expert_assistance_throughout(),
    icon: UserGroupIcon,
  },
]
</script>

<template>
  <div class="bg-white">
    <div class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
      <div class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div class="px-6 lg:px-0 lg:pt-4">
          <div class="mx-auto max-w-2xl">
            <div class="max-w-lg">
              <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{{ m.migrate_from_appflow() }}</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                {{ m.seamless_migration_from_appflow() }}
              </p>
              <div class="mt-10 flex items-center gap-x-6">
                <a
                  href="https://cal.com/martindonadieu/capgo-migration-consultation"
                  target="_blank"
                  class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {{ m.schedule_consultation() }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.why_migrate() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.benefits_of_migration() }}</p>
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

    <!-- Migration Steps -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.migration_process() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.how_it_works() }}</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div v-for="(step, index) in migrationSteps" :key="step.title" class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <span class="rounded-lg bg-indigo-600 px-3 py-1 text-white">{{ index + 1 }}</span>
                {{ step.title }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ step.description }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Feature Comparison -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.feature_comparison() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.capgo_vs_appflow() }}</p>
        </div>
        <div class="mt-16 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table class="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">{{ m.feature() }}</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Capgo</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Appflow</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{{ m.details() }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="feature in comparisonFeatures" :key="feature.name">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ feature.name }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <CheckCircleIcon v-if="feature.capgo" class="h-5 w-5 text-green-500" />
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <CheckCircleIcon v-if="feature.appflow" class="h-5 w-5 text-green-500" />
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-500">{{ feature.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Migration Success Stories -->
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.success_stories() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.hear_from_our_customers() }}</p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-sm leading-6 text-gray-600 sm:mt-20 sm:grid-cols-2 xl:grid-cols-2">
          <div v-for="testimonial in filteredTestimonials" :key="testimonial.handle" class="relative bg-white p-6 shadow-sm ring-1 ring-gray-900/5 rounded-lg">
            <figure>
              <blockquote class="text-gray-900">
                <p>"{{ testimonial.message }}"</p>
              </blockquote>
              <figcaption class="mt-6 flex items-center gap-x-4">
                <img :src="testimonial.image" :alt="testimonial.name" class="h-10 w-10 rounded-full bg-gray-50" />
                <div>
                  <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                  <div class="text-gray-600">@{{ testimonial.handle }}</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>

    <!-- Cost Calculator -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.cost_calculator() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.calculate_your_savings() }}</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div class="p-8 sm:p-10 lg:flex-auto">
            <div class="mt-10 flex items-center gap-x-4">
              <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">{{ m.monthly_updates() }}</h4>
              <div class="h-px flex-auto bg-gray-100"></div>
            </div>
            <div class="mt-6">
              <input
                type="number"
                v-model="monthlyUpdates"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div class="mt-10">
              <h3 class="text-2xl font-bold tracking-tight text-gray-900">{{ m.yearly_savings() }}</h3>
              <p class="mt-6 text-base leading-7 text-gray-600">
                {{ m.appflow_yearly_cost() }}: ${{ yearlyPrice }}<br />
                {{ m.capgo_yearly_cost() }}: ${{ capgoPrice }}<br />
                {{ m.total_savings() }}: ${{ yearlySavings }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Migration Steps -->
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.migration_guide() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.step_by_step_guide() }}</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            {{ m.migration_guide_description() }}
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div v-for="(step, index) in migrationSteps" :key="step.title" class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">{{ index + 1 }}</span>
                <component :is="step.icon" class="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {{ step.title }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ step.description }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Migration Success Stories -->
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.ready_to_migrate() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.start_your_migration() }}</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="https://cal.com/martindonadieu/capgo-migration-consultation"
              target="_blank"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ m.schedule_consultation() }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
