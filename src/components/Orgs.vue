<script setup lang="ts">
import type { Locales } from '@/services/locale'
import translations from '@/services/translations'
import { ref } from 'vue'

const props = defineProps<{ locale: Locales }>()

const features = ref([
  {
    subtitle: translations['multiple_organizations'][props.locale],
    title: translations['manage_various_teams'][props.locale],
    description: translations['create_oversee_organizations_from_single_account'][props.locale],
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  },
  {
    subtitle: translations['granular_permissions'][props.locale],
    title: translations['control_access_levels'][props.locale],
    description: translations['assign_specific_rights_and_access_levels_to_each_user_within_your_organizations'][props.locale],
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
  },
  {
    subtitle: translations['flexible_management'][props.locale],
    title: translations['adapt_as_you_grow'][props.locale],
    description: translations['easily_adjust_user_roles_and_permissions_as_your_team_and_projects_evolve_maintaining_optimal_organization_structure'][props.locale],
    icon: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
  },
])
</script>

<template>
  <section class="bg-black py-12 sm:py-16 lg:py-20 xl:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg text-center lg:max-w-2xl">
        <h2 class="text-3xl font-normal text-white sm:mt-8 sm:text-4xl lg:text-5xl xl:text-6xl">
          {{ translations['flexible_organization_management_for_your_team'][props.locale] }}
        </h2>
        <p class="mt-6 text-lg font-normal text-gray-400">{{ translations['create_manage_organizations_with_ease'][props.locale] }}</p>
      </div>
      <div class="mx-auto mt-12 grid max-w-md grid-cols-1 gap-6 text-center sm:mt-16 lg:mt-20 lg:max-w-none lg:grid-cols-3">
        <div v-for="feature in features" :key="feature.title" class="bg-base-900 relative overflow-hidden rounded-2xl">
          <div class="px-6 pb-8 pt-8 sm:px-12 sm:pt-14 lg:px-8 xl:px-12">
            <div class="mb-6 flex justify-center">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <g v-html="feature.icon"></g>
                </svg>
              </div>
            </div>
            <h3 class="text-sm font-normal uppercase tracking-widest">
              <span class="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">{{ feature.subtitle }}</span>
            </h3>
            <p class="mt-3 text-2xl font-normal text-white xl:text-3xl">{{ feature.title }}</p>
            <p class="mt-4 text-base font-normal text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
