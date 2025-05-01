<script setup lang="ts">
import * as m from '@/paraglide/messages'
import type { Locales } from '@/services/locale'
import { ref } from 'vue'

const props = defineProps<{ locale: Locales }>()

const features = ref([
  {
    subtitle: m.multiple_organizations({}, { locale: props.locale }),
    title: m.manage_various_teams({}, { locale: props.locale }),
    description: m.create_oversee_organizations_from_single_account({}, { locale: props.locale }),
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    color: 'blue',
  },
  {
    subtitle: m.granular_permissions({}, { locale: props.locale }),
    title: m.control_access_levels({}, { locale: props.locale }),
    description: m.assign_specific_rights_and_access_levels_to_each_user_within_your_organizations({}, { locale: props.locale }),
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    color: 'purple',
  },
  {
    subtitle: m.flexible_management({}, { locale: props.locale }),
    title: m.adapt_as_you_grow({}, { locale: props.locale }),
    description: m.easily_adjust_user_roles_and_permissions_as_your_team_and_projects_evolve_maintaining_optimal_organization_structure({}, { locale: props.locale }),
    icon: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
    color: 'teal',
  },
])
</script>

<template>
  <section class="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:py-24">
    <!-- Grid background pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-600/70 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="orgs-grid-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-indigo-800/30">
          <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
        </svg>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#orgs-grid-pattern)" />
      </svg>
    </div>

    <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto text-center lg:max-w-4xl">
        <h2 class="text-3xl font-semibold text-white sm:mt-8 sm:text-4xl lg:text-5xl xl:text-6xl">
          {{ m.flexible_organization_management_for_your_team({}, { locale: props.locale }) }}
        </h2>
        <p class="mt-6 text-lg font-normal text-gray-400">{{ m.create_manage_organizations_with_ease({}, { locale: props.locale }) }}</p>
      </div>
      <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-12 text-center sm:mt-16 lg:mt-20 lg:max-w-none lg:grid-cols-3">
        <div v-for="feature in features" :key="feature.title" class="flex p-px overflow-hidden rounded-lg">
          <div class="w-full overflow-hidden bg-gray-800 rounded-lg ring-1 ring-white/15">
            <div
              :class="`flex flex-col items-center justify-center h-80 bg-linear-to-br from-${feature.color}-500/20 to-${feature.color === 'blue' ? 'purple' : feature.color === 'purple' ? 'pink' : 'blue'}-500/20`"
            >
              <div :class="`flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-${feature.color}-900`">
                <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <g v-html="feature.icon"></g>
                </svg>
              </div>
              <h3 class="text-sm font-normal tracking-widest uppercase">
                <span :class="`text-${feature.color}-400`">{{ feature.subtitle }}</span>
              </h3>
              <p class="mt-3 text-2xl font-bold text-white xl:text-3xl">{{ feature.title }}</p>
            </div>
            <div class="p-10">
              <p class="mt-2 text-base font-normal text-gray-400">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
