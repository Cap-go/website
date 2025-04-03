<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales, defaultLocale } from '@/services/locale'
import * as m from "../paraglide/messages.js"

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()
const brand = config.public.brand
const domain = config.public.baseUrl
</script>

<template>
  <div class="px-3 m-auto prose-sm prose text-left">
    <span class="text-xs" v-if="props.locale !== defaultLocale">
      Note: This is an automatic translated page from it's English source. Only the English version should be used for legal actions, associated with only link to English source.
    </span>
    <h1>{{ m.tos_title() }}</h1>
    <p>{{ m.tos_last_updated() }}</p>
    <p>{{ m.tos_please_read() }}</p>
    <h2>{{ m.tos_interpretation_title() }}</h2>
    <h3>{{ m.tos_interpretation_subtitle() }}</h3>
    <p>
      {{ m.tos_interpretation_text() }}
    </p>
    <h3>{{ m.tos_definitions_subtitle() }}</h3>
    <p>{{ m.tos_definitions_intro() }}</p>
    <ul>
      <li>
        <p>{{ m.tos_definition_application().replace('$1', brand) }}</p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_application_store() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_affiliate() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_account() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_country() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_company() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_device() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_feedback() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_free_trial() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_in_app_purchase() }}
        </p>
      </li>
      <li>
        <p>{{ m.tos_definition_service() }}</p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_subscriptions() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_terms() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_third_party_social_media() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.tos_definition_you() }}
        </p>
      </li>
    </ul>
    <h2>{{ m.tos_acknowledgment_title() }}</h2>
    <p>
      {{ m.tos_acknowledgment_text_1() }}
    </p>
    <p>
      {{ m.tos_acknowledgment_text_2() }}
    </p>
    <p>
      {{ m.tos_acknowledgment_text_3() }}
    </p>
    <p>
      {{ m.tos_acknowledgment_text_4() }}
    </p>
    <p>
      {{ m.tos_acknowledgment_text_5() }}
    </p>
    <h2>{{ m.tos_subscriptions_title() }}</h2>
    <h3>{{ m.tos_subscriptions_period_subtitle() }}</h3>
    <p>
      {{ m.tos_subscriptions_period_text_1() }}
    </p>
    <p>
      {{ m.tos_subscriptions_period_text_2() }}
    </p>
    <h3>{{ m.tos_subscriptions_cancellations_subtitle() }}</h3>
    <p>
      {{ m.tos_subscriptions_cancellations_text_1() }}
    </p>
    <p>
      {{ m.tos_subscriptions_cancellations_text_2() }}
    </p>
    <h3>{{ m.tos_subscriptions_billing_subtitle() }}</h3>
    <p>
      {{ m.tos_subscriptions_billing_text_1() }}
    </p>
    <p>
      {{ m.tos_subscriptions_billing_text_2() }}
    </p>
    <p>
      {{ m.tos_subscriptions_billing_text_3() }}
    </p>
    <h3>{{ m.tos_subscriptions_fee_changes_subtitle() }}</h3>
    <p>
      {{ m.tos_subscriptions_fee_changes_text_1() }}
    </p>
    <p>
      {{ m.tos_subscriptions_fee_changes_text_2() }}
    </p>
    <p>
      {{ m.tos_subscriptions_fee_changes_text_3() }}
    </p>
    <h3>{{ m.tos_subscriptions_refunds_subtitle() }}</h3>
    <p>
      {{ m.tos_subscriptions_refunds_text_1() }}
    </p>
    <p>
      {{ m.tos_subscriptions_refunds_text_2() }}
    </p>
    <p>
      {{ m.tos_subscriptions_refunds_text_3() }}
    </p>
    <h3>{{ m.tos_subscriptions_free_trial_subtitle() }}</h3>
    <p>
      {{ m.tos_subscriptions_free_trial_text_1() }}
    </p>
    <p>
      {{ m.tos_subscriptions_free_trial_text_2() }}
    </p>
    <p>
      {{ m.tos_subscriptions_free_trial_text_3() }}
    </p>
    <p>
      {{ m.tos_subscriptions_free_trial_text_4() }}
    </p>
    <h2>{{ m.tos_in_app_purchases_title() }}</h2>
    <p>
      {{ m.tos_in_app_purchases_text_1() }}
    </p>
    <p>
      {{ m.tos_in_app_purchases_text_2() }}
    </p>
    <p>
      {{ m.tos_in_app_purchases_text_3() }}
    </p>
    <p>
      {{ m.tos_in_app_purchases_text_4() }}
    </p>
    <p>
      {{ m.tos_in_app_purchases_text_5() }}
    </p>
    <p>{{ m.tos_in_app_purchases_text_6() }}</p>
    <h2>{{ m.tos_user_accounts_title() }}</h2>
    <p>
      {{ m.tos_user_accounts_text_1() }}
    </p>
    <p>
      {{ m.tos_user_accounts_text_2() }}
    </p>
    <p>
      {{ m.tos_user_accounts_text_3() }}
    </p>
    <p>
      {{ m.tos_user_accounts_text_4() }}
    </p>
    <h2>{{ m.tos_intellectual_property_title() }}</h2>
    <p>
      {{ m.tos_intellectual_property_text_1() }}
    </p>
    <p>
      {{ m.tos_intellectual_property_text_2() }}
    </p>
    <p>
      {{ m.tos_intellectual_property_text_3() }}
    </p>
    <h2>{{ m.tos_your_feedback_title() }}</h2>
    <p>
      {{ m.tos_your_feedback_text() }}
    </p>
    <h2>{{ m.tos_links_to_other_websites_title() }}</h2>
    <p>
      {{ m.tos_links_to_other_websites_text_1() }}
    </p>
    <p>
      {{ m.tos_links_to_other_websites_text_2() }}
    </p>
    <p>
      {{ m.tos_links_to_other_websites_text_3() }}
    </p>
    <h2>{{ m.tos_termination_title() }}</h2>
    <p>
      {{ m.tos_termination_text_1() }}
    </p>
    <p>
      {{ m.tos_termination_text_2() }}
    </p>
    <h2>{{ m.tos_limitation_of_liability_title() }}</h2>
    <p>
      {{ m.tos_limitation_of_liability_text_1() }}
    </p>
    <p>
      {{ m.tos_limitation_of_liability_text_2() }}
    </p>
    <p>
      {{ m.tos_limitation_of_liability_text_3() }}
    </p>
    <h2>
      {{ m.tos_disclaimer_title() }}
    </h2>
    <p>
      {{ m.tos_disclaimer_text_1() }}
    </p>
    <p>
      {{ m.tos_disclaimer_text_2() }}
    </p>
    <p>
      {{ m.tos_disclaimer_text_3() }}
    </p>
    <h2>{{ m.tos_governing_law_title() }}</h2>
    <p>
      {{ m.tos_governing_law_text() }}
    </p>
    <h2>{{ m.tos_disputes_resolution_title() }}</h2>
    <p>
      {{ m.tos_disputes_resolution_text() }}
    </p>
    <h2>{{ m.tos_eu_users_title() }}</h2>
    <p>
      {{ m.tos_eu_users_text() }}
    </p>
    <h2>{{ m.tos_us_federal_government_title() }}</h2>
    <p>
      {{ m.tos_us_federal_government_text() }}
    </p>
    <h2>{{ m.tos_us_legal_compliance_title() }}</h2>
    <p>
      {{ m.tos_us_legal_compliance_text() }}
    </p>
    <h2>{{ m.tos_severability_waiver_title() }}</h2>
    <h3>{{ m.tos_severability_subtitle() }}</h3>
    <p>
      {{ m.tos_severability_text() }}
    </p>
    <h3>{{ m.tos_waiver_subtitle() }}</h3>
    <p>
      {{ m.tos_waiver_text() }}
    </p>
    <h2>{{ m.tos_translation_title() }}</h2>
    <p>
      {{ m.tos_translation_text() }}
    </p>
    <h2>{{ m.tos_changes_title() }}</h2>
    <p>
      {{ m.tos_changes_text_1() }}
    </p>
    <p>
      {{ m.tos_changes_text_2() }}
    </p>
    <h2>{{ m.tos_contact_us_title() }}</h2>
    <p>
      {{ m.tos_contact_us_text() }}
    </p>
    <ul>
      <li>
        {{ m.tos_contact_us_website() }}
        <a href="mailto:support@capgo.app" rel="external nofollow noopener" target="_blank">{{ domain }}#support</a>
      </li>
    </ul>
  </div>
</template>
