<script setup lang="ts">
import * as m from "../paraglide/messages.js"
import { ref } from 'vue'

const features = ref([
  {
    subtitle: m.multiple_organizations(),
    title: m.manage_various_teams(),
    description: m.create_oversee_organizations_from_single_account(),
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  },
  {
    subtitle: m.granular_permissions(),
    title: m.control_access_levels(),
    description: m.assign_specific_rights_and_access_levels_to_each_user_within_your_organizations(),
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
  },
  {
    subtitle: m.flexible_management(),
    title: m.adapt_as_you_grow(),
    description: m.easily_adjust_user_roles_and_permissions_as_your_team_and_projects_evolve_maintaining_optimal_organization_structure(),
    icon: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
  },
])
</script>

<template>
  <section class="py-12 bg-black sm:py-16 lg:py-20 xl:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto text-center lg:max-w-2xl">
        <h2 class="text-3xl font-normal text-white sm:mt-8 sm:text-4xl lg:text-5xl xl:text-6xl">
          {{ m.flexible_organization_management_for_your_team() }}
        </h2>
        <p class="mt-6 text-lg font-normal text-gray-400">{{ m.create_manage_organizations_with_ease() }}</p>
      </div>
      <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-12 text-center sm:mt-16 lg:mt-20 lg:max-w-none lg:grid-cols-3">
        <div v-for="feature in features" :key="feature.title" class="relative overflow-hidden bg-base-900 rounded-2xl">
          <div class="px-6 pt-8 pb-8 sm:px-12 sm:pt-14 lg:px-8 xl:px-12">
            <div class="flex justify-center mb-6">
              <div class="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full">
                <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <g v-html="feature.icon"></g>
                </svg>
              </div>
            </div>
            <h3 class="text-sm font-normal tracking-widest uppercase">
              <span class="text-transparent bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text">{{ feature.subtitle }}</span>
            </h3>
            <p class="mt-3 text-2xl font-normal text-white xl:text-3xl">{{ feature.title }}</p>
            <p class="mt-4 text-base font-normal text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
