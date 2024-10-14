<script setup lang="ts">
import type { Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <section class="bg-gray-50 py-12 sm:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-xl text-center xl:max-w-3xl">
        <h2 class="font-pj text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
          {{ translations['effortless_ci_cd_solutions'][props.locale] }}
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          {{
            translations[
              'we_configure_your_ci_cd_pipeline_directly_in_your_preferred_platform_whether_its_github_actions_gitlab_ci_or_others_we_dont_host_ci_cd_or_charge_you_to_maintain_it'
            ][props.locale]
          }}
        </p>
      </div>
      <div class="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-y-4 text-center sm:mt-12 sm:grid-cols-2 sm:gap-x-8 sm:text-left lg:mt-20">
        <div class="space-y-4 sm:space-y-8">
          <div class="overflow-hidden rounded-xl bg-white shadow-md">
            <div class="p-9">
              <svg class="mx-auto h-12 w-12 text-blue-600 sm:mx-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
              <h3 class="font-pj mt-8 text-2xl font-bold text-gray-900 sm:mt-10">{{ translations['seamless_integration'][props.locale] }}</h3>
              <p class="font-pj mt-6 text-base text-gray-600">
                {{
                  translations['we_set_up_your_ci_cd_workflow_to_work_seamlessly_with_your_current_development_process_no_need_to_switch_platforms_or_learn_new_tools'][
                    props.locale
                  ]
                }}
              </p>
            </div>
          </div>
          <div class="overflow-hidden rounded-xl bg-white shadow-md">
            <div class="p-9">
              <svg class="mx-auto h-12 w-12 text-blue-600 sm:mx-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <h3 class="font-pj mt-8 text-2xl font-bold text-gray-900 sm:mt-10">{{ translations['tailored_configuration'][props.locale] }}</h3>
              <p class="font-pj mt-6 text-base text-gray-600">
                {{ translations['our_team_customizes_the_ci_cd_setup_to_match_your_specific_project_requirements_ensuring_optimal_performance_and_efficiency'][props.locale] }}
              </p>
            </div>
          </div>
        </div>
        <div class="space-y-4 sm:space-y-8">
          <div class="relative">
            <div class="absolute -inset-1">
              <div
                class="h-full w-full rotate-180 opacity-30 blur-lg filter"
                style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
              ></div>
            </div>
            <div class="relative overflow-hidden rounded-xl bg-white shadow-md">
              <div class="p-9">
                <svg class="mx-auto h-12 w-12 text-blue-600 sm:mx-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <h3 class="font-pj mt-8 text-2xl font-bold text-gray-900 sm:mt-10">{{ translations['platform_independence'][props.locale] }}</h3>
                <p class="font-pj mt-6 text-base text-gray-600">
                  {{ translations['whether_you_use_github_gitlab_or_another_version_control_system_we_adapt_our_configuration_to_fit_your_existing_infrastructure'][props.locale] }}
                </p>
              </div>
            </div>
          </div>
          <div class="overflow-hidden rounded-xl bg-white shadow-md">
            <div class="p-9">
              <svg class="mx-auto h-12 w-12 text-blue-600 sm:mx-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
              <h3 class="font-pj mt-8 text-2xl font-bold text-gray-900 sm:mt-10">{{ translations['expert_guidance'][props.locale] }}</h3>
              <p class="font-pj mt-6 text-base text-gray-600">
                {{
                  translations['benefit_from_our_deep_expertise_in_mobile_app_ci_cd_best_practices_without_the_need_to_build_and_maintain_a_complex_system_yourself'][props.locale]
                }}
              </p>
              <p class="font-pj mt-6 text-base text-gray-600">
                {{ translations['we_already_setup_ci_cd_for_50_apps'][props.locale] }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto mt-12 max-w-4xl text-center">
        <h2 class="font-pj text-2xl font-bold text-gray-900">{{ translations['pricing'][props.locale] }}</h2>
        <p class="mt-4 text-lg text-gray-600">
          <span class="font-bold">{{ translations['running_your_ci_cd_costs_300'][props.locale] }}</span
          >, {{ translations['appflow_6000_annually'][props.locale] }}<br />
          {{ translations['our_one_time_setup_fee_of_2600_combined_with_ci_cd_results_in_less_than_half_the_first_year_fee_of_appflow'][props.locale] }}<br />
          <span class="font-bold"> {{ translations['in_5_years_you_save_26100'][props.locale] }}</span>
        </p>
        <a
          href="https://cal.com/martindonadieu/mobile-ci-cd-done-for-you"
          class="mt-8 inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-lg font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          {{ translations['setup_ci_cd_now'][props.locale] }}
        </a>
      </div>
    </div>
  </section>
</template>
