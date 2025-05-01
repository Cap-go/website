<script setup lang="ts">
import * as m from '@/paraglide/messages'
import type { Locales } from '@/services/locale'
import { getRelativeLocaleUrl } from 'astro:i18n'

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <div class="mx-auto max-w-7xl rounded-lg px-4 py-8 text-[#a1a1aa] shadow-lg md:px-0">
    <div class="flex flex-col items-start gap-8 md:flex-row">
      <img
        src="/martindonadieu.webp"
        :alt="m.martin_donadieu_on_a_motorcycle_with_a_rainbow_in_the_background({}, { locale: props.locale })"
        class="object-cover w-3/4 h-auto mx-auto rounded-lg md:w-144 md:mx-0"
      />
      <div class="flex-1 space-y-4">
        <p class="text-2xl text-white">
          <span class="font-bold">👋 {{ m.hi_there_im_martin_donadieu({}, { locale: props.locale }) }} </span>
        </p>
        <p>
          🇫🇷 {{ m.im_a_french_software_engineer({}, { locale: props.locale }) }}<br />
          {{ m.living_best_life({}, { locale: props.locale }) }} 🏝️. <br />{{ m.made_capgo_with_passion({}, { locale: props.locale }) }}
        </p>
        <p>
          <span class="font-bold">🌟 {{ m.i_m_a_huge_believer_in_open_source({}, { locale: props.locale }) }}</span
          ><br />
          {{ m.capgo_proudly_stands_as_the_largest_ecosystem_of_open_source_plugins_for_capacitor({}, { locale: props.locale }) }} <br />{{
            m.we_re_committed_to_fostering_a_community_where_developers_can_learn_contribute_and_grow_together({}, { locale: props.locale })
          }}
        </p>
        <p>
          📧 {{ m.each_time_you_contact_capgo_you_re_reaching_out_to_me_directly({}, { locale: props.locale }) }}<br />
          {{ m.i_personally_handle_all_support_through_email_chat_or_discord_because_i_believe_in_real_connections({}, { locale: props.locale }) }} <br /><span class="font-bold"
            >🫶 {{ m.your_challenges_are_my_challenges({}, { locale: props.locale }) }}</span
          >
        </p>
        <p>
          {{ m.when_im_not_working_on_capgo_you_ll_find_me_scaling_climbing_walls_dancing_to_zouk_rhythms_or_exploring_madeiras_stunning_nature({}, { locale: props.locale }) }}
        </p>
        <p>
          🐦 {{ m.my_commitment_to_transparency_extends_to_everything_i_do({}, { locale: props.locale }) }} <br />{{
            m.you_can_see_my_entire_process_unfold_on_twitter({}, { locale: props.locale })
          }}
          <a href="https://twitter.com/martindonadieu" class="text-white hover:underline">@martindonadieu</a>
          {{ m.and_hear_more_about_my_journey_on_the({}, { locale: props.locale }) }}
          <a href="https://solos.ventures" class="text-white hover:underline">solos.ventures</a> podcast.
        </p>
        <p class="font-bold text-white">{{ m.lets_make_app_development_amazing_together({}, { locale: props.locale }) }} 🤝</p>
        <div class="pt-4">
          <div class="relative inline-flex mt-10 group">
            <div
              class="transitiona-all animate-tilt absolute -inset-px rounded-xl bg-linear-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-70 blur-lg duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200"
            />
            <a
              :href="getRelativeLocaleUrl(props.locale, 'register')"
              :title="m.get_quote_now({}, { locale: props.locale })"
              class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              role="button"
            >
              {{ m.start_now({}, { locale: props.locale }) }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
