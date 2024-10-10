<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{
  locale: Locales
}>()
const config = useRuntimeConfig()
const brand = config.public.brand
const domain = config.public.baseUrl
</script>

<template>
  <div class="prose prose-sm m-auto px-3 text-left">
    <h1>{{ translations['tos_title'][props.locale] }}</h1>
    <p>{{ translations['tos_last_updated'][props.locale] }}</p>
    <p>{{ translations['tos_please_read'][props.locale] }}</p>
    <h2>{{ translations['tos_interpretation_title'][props.locale] }}</h2>
    <h3>{{ translations['tos_interpretation_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['tos_interpretation_text'][props.locale] }}
    </p>
    <h3>{{ translations['tos_definitions_subtitle'][props.locale] }}</h3>
    <p>{{ translations['tos_definitions_intro'][props.locale] }}</p>
    <ul>
      <li>
        <p>{{ translations['tos_definition_application'][props.locale].replace('$1', brand) }}</p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_application_store'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_affiliate'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_account'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_country'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_company'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_device'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_feedback'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_free_trial'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_in_app_purchase'][props.locale] }}
        </p>
      </li>
      <li>
        <p>{{ translations['tos_definition_service'][props.locale] }}</p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_subscriptions'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_terms'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_third_party_social_media'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['tos_definition_you'][props.locale] }}
        </p>
      </li>
    </ul>
    <h2>{{ translations['tos_acknowledgment_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_acknowledgment_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_acknowledgment_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_acknowledgment_text_3'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_acknowledgment_text_4'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_acknowledgment_text_5'][props.locale] }}
    </p>
    <h2>{{ translations['tos_subscriptions_title'][props.locale] }}</h2>
    <h3>{{ translations['tos_subscriptions_period_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['tos_subscriptions_period_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_period_text_2'][props.locale] }}
    </p>
    <h3>{{ translations['tos_subscriptions_cancellations_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['tos_subscriptions_cancellations_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_cancellations_text_2'][props.locale] }}
    </p>
    <h3>{{ translations['tos_subscriptions_billing_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['tos_subscriptions_billing_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_billing_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_billing_text_3'][props.locale] }}
    </p>
    <h3>{{ translations['tos_subscriptions_fee_changes_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['tos_subscriptions_fee_changes_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_fee_changes_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_fee_changes_text_3'][props.locale] }}
    </p>
    <h3>{{ translations['tos_subscriptions_refunds_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['tos_subscriptions_refunds_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_refunds_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_refunds_text_3'][props.locale] }}
    </p>
    <h3>{{ translations['tos_subscriptions_free_trial_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['tos_subscriptions_free_trial_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_free_trial_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_free_trial_text_3'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_subscriptions_free_trial_text_4'][props.locale] }}
    </p>
    <h2>{{ translations['tos_in_app_purchases_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_in_app_purchases_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_in_app_purchases_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_in_app_purchases_text_3'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_in_app_purchases_text_4'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_in_app_purchases_text_5'][props.locale] }}
    </p>
    <p>If you have any payment related issues with In-app Purchases, then you need to contact the Application Store directly.</p>
    <h2>{{ translations['tos_user_accounts_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_user_accounts_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_user_accounts_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_user_accounts_text_3'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_user_accounts_text_4'][props.locale] }}
    </p>
    <h2>{{ translations['tos_intellectual_property_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_intellectual_property_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_intellectual_property_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_intellectual_property_text_3'][props.locale] }}
    </p>
    <h2>{{ translations['tos_your_feedback_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_your_feedback_text'][props.locale] }}
    </p>
    <h2>{{ translations['tos_links_to_other_websites_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_links_to_other_websites_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_links_to_other_websites_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_links_to_other_websites_text_3'][props.locale] }}
    </p>
    <h2>{{ translations['tos_termination_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_termination_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_termination_text_2'][props.locale] }}
    </p>
    <h2>{{ translations['tos_limitation_of_liability_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_limitation_of_liability_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_limitation_of_liability_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_limitation_of_liability_text_3'][props.locale] }}
    </p>
    <h2>
      {{ translations['tos_disclaimer_title'][props.locale] }}
    </h2>
    <p>
      {{ translations['tos_disclaimer_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_disclaimer_text_2'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_disclaimer_text_3'][props.locale] }}
    </p>
    <h2>{{ translations['tos_governing_law_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_governing_law_text'][props.locale] }}
    </p>
    <h2>{{ translations['tos_disputes_resolution_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_disputes_resolution_text'][props.locale] }}
    </p>
    <h2>{{ translations['tos_eu_users_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_eu_users_text'][props.locale] }}
    </p>
    <h2>{{ translations['tos_us_federal_government_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_us_federal_government_text'][props.locale] }}
    </p>
    <h2>{{ translations['tos_us_legal_compliance_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_us_legal_compliance_text'][props.locale] }}
    </p>
    <h2>{{ translations['tos_severability_waiver_title'][props.locale] }}</h2>
    <h3>{{ translations['tos_severability_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['tos_severability_text'][props.locale] }}
    </p>
    <h3>{{ translations['tos_waiver_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['tos_waiver_text'][props.locale] }}
    </p>
    <h2>{{ translations['tos_translation_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_translation_text'][props.locale] }}
    </p>
    <h2>{{ translations['tos_changes_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_changes_text_1'][props.locale] }}
    </p>
    <p>
      {{ translations['tos_changes_text_2'][props.locale] }}
    </p>
    <h2>{{ translations['tos_contact_us_title'][props.locale] }}</h2>
    <p>
      {{ translations['tos_contact_us_text'][props.locale] }}
    </p>
    <ul>
      <li>
        {{ translations['tos_contact_us_website'][props.locale] }}
        <a :href="`${domain}#support`" rel="external nofollow noopener" target="_blank">{{ domain }}#support</a>
      </li>
    </ul>
  </div>
</template>
