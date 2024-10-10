<script setup lang="ts">
import AboutMartin from '@/components/AboutMartin.vue'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{
  locale: Locales
}>()
</script>

<template>
  <section class="relative bg-gray-900 pt-12 sm:pt-16 lg:pt-20">
    <div class="absolute inset-0 overflow-hidden">
      <img class="h-full w-full -translate-y-80 transform object-cover object-top opacity-20" src="/background-pattern.webp" alt="" />
    </div>
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-xl text-center xl:max-w-3xl">
        <h2 class="font-pj text-3xl font-bold text-white sm:text-4xl xl:text-5xl">{{ translations['about_capgo'][props.locale] }}</h2>
        <p class="font-pj mx-auto mt-4 max-w-xl text-base leading-7 text-gray-100 sm:mt-8">{{ translations['your_live_update_solution_for_capacitor_apps'][props.locale] }}</p>
        <div class="mt-8 inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white sm:mt-11">
          {{ translations['open_source'][props.locale] }}
        </div>
      </div>
    </div>
    <div class="relative mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 class="mb-4 text-2xl font-bold text-white">🚀 {{ translations['welcome_to_capgo'][props.locale] }}</h3>
          <p class="mb-6 text-gray-300">
            {{ translations['capgo_is_the_cutting_edge_live_update_system_designed_specifically_for_capacitor_applications'][props.locale] }}
            {{
              translations[
                'we_empower_developers_to_push_updates_instantly_ensuring_your_users_always_have_the_latest_version_of_your_app_without_the_hassle_of_app_store_approvals'
              ][props.locale]
            }}
          </p>
          <h3 class="mb-4 text-2xl font-bold text-white">🌱 {{ translations['our_story'][props.locale] }}</h3>
          <p class="mb-6 text-gray-300">
            {{ translations['capgo_was_born_from_a_real_need_in_the_developer_community'][props.locale] }}
            {{
              translations['it_all_started_with_a_github_issue_where_many_developers_voiced_their_frustration_with_the_high_costs_of_existing_solutions_like_appflow'][props.locale]
            }}
            {{ translations['this_inspired_me_to_create_an_affordable_efficient_alternative'][props.locale] }}
          </p>
          <a href="https://capgo.app/blog/birth-of-capgo-my-challenging-journey-as-a-solo-maker/" class="text-blue-400 hover:underline">{{
            translations['read_the_full_story_of_capgos_challenging_birth_as_a_solo_maker_project'][props.locale]
          }}</a>
        </div>
        <div>
          <h3 class="mb-4 text-2xl font-bold text-white">🔧 {{ translations['key_features'][props.locale] }}</h3>
          <ul class="mb-6 list-inside list-disc space-y-2 text-gray-300">
            <li>{{ translations['instant_updates'][props.locale] }}: {{ translations['deploy_changes_in_real_time'][props.locale] }}</li>
            <li>{{ translations['version_control'][props.locale] }}: {{ translations['manage_multiple_app_versions_effortlessly'][props.locale] }}</li>
            <li>{{ translations['rollback_capability'][props.locale] }}: {{ translations['revert_to_previous_versions_if_needed'][props.locale] }}</li>
            <li>{{ translations['analytics'][props.locale] }}: {{ translations['track_update_performance_and_user_adoption'][props.locale] }}</li>
            <li>{{ translations['organization_and_app_management'][props.locale] }}: {{ translations['thanks_to_our_open_source_nature'][props.locale] }}</li>
          </ul>
          <h3 class="mb-4 text-2xl font-bold text-white">🌟 {{ translations['our_commitment'][props.locale] }}</h3>
          <p class="mb-6 text-gray-300">
            {{
              translations['as_the_largest_ecosystem_of_open_source_plugins_for_capacitor_we_re_committed_to_innovation_transparency_and_community_driven_development'][
                props.locale
              ]
            }}
          </p>
          <h3 class="mb-4 text-2xl font-bold text-white">💪 {{ translations['practicing_what_we_preach'][props.locale] }}</h3>
          <p class="mb-6 text-gray-300">
            {{ translations['we_practice_what_we_preach'][props.locale] }}
            {{ translations['capgo_is_used_to_update_its_own_apps_allowing_us_to_continuously_improve_and_refine_our_product_through_real_world_usage'][props.locale] }}
          </p>
          <h3 class="mb-4 text-2xl font-bold text-white">🚀 {{ translations['our_dedication'][props.locale] }}</h3>
          <p class="mb-6 text-gray-300">
            {{ translations['since_2023_capgo_has_been_my_full_time_focus_ensuring_dedicated_development_and_support_for_our_growing_community_of_users'][props.locale] }}
          </p>
        </div>
      </div>
    </div>
    <div class="relative mx-auto mt-20 max-w-6xl">
      <AboutMartin :locale="props.locale" />
    </div>
  </section>
</template>
