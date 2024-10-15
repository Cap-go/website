<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales, defaultLocale } from '@/services/locale'
import translations from '@/services/translations'

const config = useRuntimeConfig()
const domain = config.public.baseUrl
const brand = config.public.brand

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <div class="prose prose-sm m-auto px-3 text-left">
    <span class="text-xs" v-if="props.locale !== defaultLocale">
      Note: This is an automatic translated page from it's English source. Only the English version should be used for legal actions, associated with only link to English source.
    </span>
    <h1>{{ translations['privacy_title'][props.locale] }}</h1>
    <p>{{ translations['privacy_last_updated'][props.locale] }}</p>
    <p>
      {{ translations['privacy_description'][props.locale] }}
    </p>
    <p>
      {{ translations['privacy_agreement'][props.locale] }}
    </p>
    <h2>{{ translations['privacy_interpretation_title'][props.locale] }}</h2>
    <h3>{{ translations['privacy_interpretation_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['privacy_interpretation_text'][props.locale] }}
    </p>
    <h3>{{ translations['privacy_definitions_subtitle'][props.locale] }}</h3>
    <p>{{ translations['privacy_definitions_intro'][props.locale] }}</p>
    <ul>
      <li>
        <p>{{ translations['privacy_definition_account'][props.locale] }}</p>
      </li>
      <li>
        <p>
          {{ translations['privacy_definition_affiliate'][props.locale] }}
        </p>
      </li>
      <li>
        <p>{{ translations['privacy_definition_application'][props.locale].replace('$1', brand) }}</p>
      </li>
      <li>
        <p>
          {{ translations['privacy_definition_business'][props.locale] }}
        </p>
      </li>
      <li>
        <p>
          {{ translations['privacy_definition_company'][props.locale] }}
        </p>
        <p>{{ translations['privacy_definition_company_gdpr'][props.locale] }}</p>
      </li>
      <li>
        <p>
          {{ translations['privacy_definition_consumer'][props.locale] }}
        </p>
      </li>
      <li>
        <p>{{ translations['privacy_definition_country'][props.locale] }}</p>
      </li>
      <li>
        <p>
          {{ translations['privacy_definition_data_controller'][props.locale] }}
        </p>
      </li>
      <li>
        <p>{{ translations['privacy_definition_device'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['privacy_definition_do_not_track'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['privacy_definition_personal_data'][props.locale] }}</p>
        <p>{{ translations['privacy_definition_personal_data_gdpr'][props.locale] }}</p>
        <p>{{ translations['privacy_definition_personal_data_ccpa'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['privacy_definition_sale'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['privacy_definition_service'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['privacy_definition_service_provider'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['privacy_definition_usage_data'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['privacy_definition_you'][props.locale] }}</p>
        <p>{{ translations['privacy_definition_you_gdpr'][props.locale] }}</p>
      </li>
    </ul>
    <h2>{{ translations['privacy_collecting_data_title'][props.locale] }}</h2>
    <h3>{{ translations['privacy_types_of_data_title'][props.locale] }}</h3>
    <h4>{{ translations['privacy_personal_data_title'][props.locale] }}</h4>
    <p>{{ translations['privacy_personal_data_description'][props.locale] }}</p>
    <p>{{ translations['privacy_personal_data_usage'][props.locale] }}</p>
    <h4>{{ translations['privacy_usage_data_title'][props.locale] }}</h4>
    <p>{{ translations['privacy_usage_data_description'][props.locale] }}</p>
    <p>{{ translations['privacy_usage_data_details'][props.locale] }}</p>
    <p>{{ translations['privacy_usage_data_mobile'][props.locale] }}</p>
    <p>{{ translations['privacy_usage_data_browser'][props.locale] }}</p>
    <h2>{{ translations['privacy_use_of_data_title'][props.locale] }}</h2>
    <p>{{ translations['privacy_use_of_data_intro'][props.locale] }}</p>
    <ul>
      <li>{{ translations['privacy_use_of_data_provide_service'][props.locale] }}</li>
      <li>{{ translations['privacy_use_of_data_manage_account'][props.locale] }}</li>
      <li>{{ translations['privacy_use_of_data_performance'][props.locale] }}</li>
      <li>{{ translations['privacy_use_of_data_contact'][props.locale] }}</li>
      <li>{{ translations['privacy_use_of_data_offers'][props.locale] }}</li>
      <li>{{ translations['privacy_use_of_data_requests'][props.locale] }}</li>
      <li>{{ translations['privacy_use_of_data_business_transfers'][props.locale] }}</li>
      <li>{{ translations['privacy_use_of_data_other_purposes'][props.locale] }}</li>
    </ul>
    <p>{{ translations['privacy_share_of_data_intro'][props.locale] }}</p>
    <ul>
      <li>{{ translations['privacy_share_of_data_service_providers'][props.locale] }}</li>
      <li>{{ translations['privacy_share_of_data_business_transfers'][props.locale] }}</li>
      <li>{{ translations['privacy_share_of_data_affiliates'][props.locale] }}</li>
      <li>{{ translations['privacy_share_of_data_business_partners'][props.locale] }}</li>
      <li>{{ translations['privacy_share_of_data_other_users'][props.locale] }}</li>
      <li>{{ translations['privacy_share_of_data_consent'][props.locale] }}</li>
    </ul>
    <h2>{{ translations['privacy_retention_of_data_title'][props.locale] }}</h2>
    <p>{{ translations['privacy_retention_of_data_description'][props.locale] }}</p>
    <p>{{ translations['privacy_retention_of_usage_data'][props.locale] }}</p>
    <h2>{{ translations['privacy_transfer_of_data_title'][props.locale] }}</h2>
    <p>{{ translations['privacy_transfer_of_data_description'][props.locale] }}</p>
    <p>{{ translations['privacy_transfer_of_data_consent'][props.locale] }}</p>
    <p>{{ translations['privacy_transfer_of_data_safeguards'][props.locale] }}</p>
    <h2>{{ translations['privacy_disclosure_of_data_title'][props.locale] }}</h2>
    <h3>{{ translations['privacy_disclosure_business_transactions_title'][props.locale] }}</h3>
    <p>{{ translations['privacy_disclosure_business_transactions_description'][props.locale] }}</p>
    <h3>{{ translations['privacy_disclosure_law_enforcement_title'][props.locale] }}</h3>
    <p>{{ translations['privacy_disclosure_law_enforcement_description'][props.locale] }}</p>
    <h3>{{ translations['privacy_disclosure_other_legal_requirements_title'][props.locale] }}</h3>
    <p>{{ translations['privacy_disclosure_other_legal_requirements_description'][props.locale] }}</p>
    <ul>
      <li>{{ translations['privacy_disclosure_other_legal_requirements_comply'][props.locale] }}</li>
      <li>{{ translations['privacy_disclosure_other_legal_requirements_protect'][props.locale] }}</li>
      <li>{{ translations['privacy_disclosure_other_legal_requirements_prevent'][props.locale] }}</li>
      <li>{{ translations['privacy_disclosure_other_legal_requirements_protect_personal'][props.locale] }}</li>
      <li>{{ translations['privacy_disclosure_other_legal_requirements_protect_legal'][props.locale] }}</li>
    </ul>
    <h2>{{ translations['privacy_security_of_data_title'][props.locale] }}</h2>
    <p>{{ translations['privacy_security_of_data_description'][props.locale] }}</p>
    <h2>{{ translations['privacy_children_privacy_title'][props.locale] }}</h2>
    <p>{{ translations['privacy_children_privacy_description'][props.locale] }}</p>
    <p>{{ translations['privacy_children_privacy_consent'][props.locale] }}</p>
    <h2>{{ translations['privacy_links_to_other_websites_title'][props.locale] }}</h2>
    <p>{{ translations['privacy_links_to_other_websites_description'][props.locale] }}</p>
    <p>{{ translations['privacy_links_to_other_websites_control'][props.locale] }}</p>
    <h2>{{ translations['privacy_changes_to_policy_title'][props.locale] }}</h2>
    <p>{{ translations['privacy_changes_to_policy_description'][props.locale] }}</p>
    <p>{{ translations['privacy_changes_to_policy_notification'][props.locale] }}</p>
    <p>{{ translations['privacy_changes_to_policy_review'][props.locale] }}</p>
    <h2>{{ translations['privacy_contact_us_title'][props.locale] }}</h2>
    <p>{{ translations['privacy_contact_us_description'][props.locale] }}</p>
    <p v-html="translations['privacy_contact_us_website'][props.locale].replace('$1', `<a href='${domain}/#support' target='_blank'>${domain}/#support</a>`)" />
  </div>
</template>
