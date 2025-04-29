<script setup lang="ts">
import AboutMartin from '@/components/AboutMartin.vue'
import { type Locales } from '@/services/locale'
import * as m from '../paraglide/messages.js'

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <section class="relative pt-12 bg-gray-900 sm:pt-16 lg:pt-20">
    <div class="absolute inset-0 overflow-hidden">
      <img class="object-cover object-top w-full h-full transform -translate-y-80 opacity-20" src="/background-pattern.webp" alt="" />
    </div>
    <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-xl mx-auto text-center xl:max-w-3xl">
        <h2 class="text-3xl font-bold text-white font-pj sm:text-4xl xl:text-5xl">{{ m.about_capgo() }}</h2>
        <p class="max-w-xl mx-auto mt-4 text-base leading-7 text-gray-100 font-pj sm:mt-8">{{ m.your_live_update_solution_for_capacitor_apps() }}</p>
        <div class="inline-block px-4 py-2 mt-8 text-sm font-semibold text-white bg-blue-600 rounded-full sm:mt-11">
          {{ m.open_source() }}
        </div>
      </div>
    </div>
    <div class="relative px-4 mx-auto mt-20 max-w-7xl sm:px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 class="mb-4 text-2xl font-bold text-white">🚀 {{ m.welcome_to_capgo() }}</h3>
          <p class="mb-6 text-gray-300">
            {{ m.capgo_is_the_cutting_edge_live_update_system_designed_specifically_for_capacitor_applications() }}
            {{ m.we_empower_developers_to_push_updates_instantly_ensuring_your_users_always_have_the_latest_version_of_your_app_without_the_hassle_of_app_store_approvals() }}
          </p>
          <h3 class="mb-4 text-2xl font-bold text-white">🌱 {{ m.our_story() }}</h3>
          <p class="mb-6 text-gray-300">
            {{ m.capgo_was_born_from_a_real_need_in_the_developer_community() }}
            {{ m.it_all_started_with_a_github_issue_where_many_developers_voiced_their_frustration_with_the_high_costs_of_existing_solutions_like_appflow() }}
            {{ m.this_inspired_me_to_create_an_affordable_efficient_alternative() }}
          </p>
          <a href="https://capgo.app/blog/birth-of-capgo-my-challenging-journey-as-a-solo-maker/" class="text-blue-400 hover:underline">{{
            m.read_the_full_story_of_capgos_challenging_birth_as_a_solo_maker_project()
          }}</a>
        </div>
        <div>
          <h3 class="mb-4 text-2xl font-bold text-white">🔧 {{ m.key_features() }}</h3>
          <ul class="mb-6 space-y-2 text-gray-300 list-disc list-inside">
            <li>{{ m.instant_updates() }}: {{ m.deploy_changes_in_real_time() }}</li>
            <li>{{ m.version_control() }}: {{ m.manage_multiple_app_versions_effortlessly() }}</li>
            <li>{{ m.rollback_capability() }}: {{ m.revert_to_previous_versions_if_needed() }}</li>
            <li>{{ m.analytics() }}: {{ m.track_update_performance_and_user_adoption() }}</li>
            <li>{{ m.organization_and_app_management() }}: {{ m.thanks_to_our_open_source_nature() }}</li>
          </ul>
          <h3 class="mb-4 text-2xl font-bold text-white">🌟 {{ m.our_commitment() }}</h3>
          <p class="mb-6 text-gray-300">
            {{ m.as_the_largest_ecosystem_of_open_source_plugins_for_capacitor_we_re_committed_to_innovation_transparency_and_community_driven_development() }}
          </p>
          <h3 class="mb-4 text-2xl font-bold text-white">💪 {{ m.practicing_what_we_preach() }}</h3>
          <p class="mb-6 text-gray-300">
            {{ m.we_practice_what_we_preach() }}
            {{ m.capgo_is_used_to_update_its_own_apps_allowing_us_to_continuously_improve_and_refine_our_product_through_real_world_usage() }}
          </p>
          <h3 class="mb-4 text-2xl font-bold text-white">🚀 {{ m.our_dedication() }}</h3>
          <p class="mb-6 text-gray-300">
            {{ m.since_2023_capgo_has_been_my_full_time_focus_ensuring_dedicated_development_and_support_for_our_growing_community_of_users() }}
          </p>
        </div>
      </div>
    </div>
    <div class="relative max-w-6xl mx-auto mt-20">
      <AboutMartin :locale="props.locale" />
    </div>
  </section>
</template>
