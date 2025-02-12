<script setup lang="ts">
import { type Locales } from '@/services/locale'
import { getRelativeLocaleUrl } from 'astro:i18n'
import * as m from "../paraglide/messages.js"
import { useRuntimeConfig } from '@/config/app'
import { shortNumber } from '@/services/misc'
import { actions } from '@/config/plugins'
import { ref, reactive } from 'vue'
import Testimonials from '@/components/Testimonials.vue'
import {
  ArrowPathIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/vue/24/solid'

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()

const stats = reactive({
  plugins: actions.length,
  updates: shortNumber(947593631),
  apps: shortNumber(1400),
})

fetch(`${config.public.baseApiUrl}/private/website_stats`).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      stats.apps = shortNumber(data.apps ?? 1400)
      stats.updates = shortNumber(data.updates ?? 947593631)
    })
  }
})

const features = [
  {
    name: m.ota_updates(),
    description: m.send_updates_without_app_store_review(),
    icon: ArrowPathIcon,
  },
  {
    name: m.plugin_ecosystem(),
    description: m.largest_capacitor_plugin_provider(),
    icon: PuzzlePieceIcon,
  },
  {
    name: m.premium_support(),
    description: m.expert_capacitor_support(),
    icon: UserGroupIcon,
  },
  {
    name: m.migration_services(),
    description: m.seamless_migration_from_other_platforms(),
    icon: ArrowsRightLeftIcon,
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
              <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{{ m.capgo_services() }}</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                {{ m.complete_capacitor_development_platform() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.trusted_by_developers_worldwide() }}</h2>
            <p class="mt-4 text-lg leading-8 text-gray-600">{{ m.empowering_capacitor_development() }}</p>
            <p class="mt-4 text-lg leading-8 text-gray-600">{{ m.largest_capacitor_platform() }}</p>
          </div>
          <dl class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
            <div class="flex flex-col bg-gray-400/5 p-8">
              <dt class="text-sm font-semibold leading-6 text-gray-600">{{ m.plugins() }}</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900">{{ stats.plugins }}+</dd>
              <dd class="mt-2 text-sm text-gray-600">{{ m.largest_plugin_provider() }}</dd>
            </div>
            <div class="flex flex-col bg-gray-400/5 p-8">
              <dt class="text-sm font-semibold leading-6 text-gray-600">{{ m.updates_served() }}</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900">{{ stats.updates }}</dd>
              <dd class="mt-2 text-sm text-gray-600">{{ m.billions_of_updates_served() }}</dd>
            </div>
            <div class="flex flex-col bg-gray-400/5 p-8">
              <dt class="text-sm font-semibold leading-6 text-gray-600">{{ m.apps() }}</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900">{{ stats.apps }}</dd>
              <dd class="mt-2 text-sm text-gray-600">{{ m.trusted_by_developers() }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.complete_platform() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.everything_you_need() }}</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            {{ m.comprehensive_services_description() }}
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div v-for="feature in features" :key="feature.name" class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <component :is="feature.icon" class="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {{ feature.name }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ feature.description }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Plugins -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.plugin_ecosystem() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.extensive_plugin_library() }}</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            {{ m.largest_capacitor_plugin_provider() }}
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div v-for="plugin in actions" :key="plugin.name" class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <component :is="plugin.icon" class="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                {{ plugin.title }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ plugin.description }}</p>
                <p class="mt-6">
                  <a :href="plugin.href" class="text-sm font-semibold leading-6 text-indigo-600">
                    {{ m.learn_more() }} <span aria-hidden="true">→</span>
                  </a>
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- CI/CD Services -->
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.ci_cd_services() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.automated_builds_and_deployments() }}</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            {{ m.ci_cd_description() }}
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              :href="getRelativeLocaleUrl(props.locale, 'blog/setup-ci-and-cd-in-gitlab')"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ m.learn_more() }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Self-hosting -->
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">{{ m.self_hosting() }}</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ m.host_on_your_infrastructure() }}</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            {{ m.self_hosting_description() }}
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="https://github.com/Cap-go/capgo"
              target="_blank"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ m.view_on_github() }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials -->
    <Testimonials :locale="props.locale" />
  </div>
</template>
