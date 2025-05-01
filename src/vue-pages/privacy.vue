<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import * as m from '@/paraglide/messages'
import { type Locales, defaultLocale } from '@/services/locale'

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
    <h1>{{ m.privacy_title({}, { locale: props.locale }) }}</h1>
    <p>{{ m.privacy_last_updated({}, { locale: props.locale }) }}</p>
    <p>
      {{ m.privacy_description({}, { locale: props.locale }) }}
    </p>
    <p>
      {{ m.privacy_agreement({}, { locale: props.locale }) }}
    </p>
    <h2>{{ m.privacy_interpretation_title({}, { locale: props.locale }) }}</h2>
    <h3>{{ m.privacy_interpretation_subtitle({}, { locale: props.locale }) }}</h3>
    <p>
      {{ m.privacy_interpretation_text({}, { locale: props.locale }) }}
    </p>
    <h3>{{ m.privacy_definitions_subtitle({}, { locale: props.locale }) }}</h3>
    <p>{{ m.privacy_definitions_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        <p>{{ m.privacy_definition_account({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          {{ m.privacy_definition_affiliate({}, { locale: props.locale }) }}
        </p>
      </li>
      <li>
        <p>{{ m.privacy_definition_application({}, { locale: props.locale }).replace('$1', brand) }}</p>
      </li>
      <li>
        <p>
          {{ m.privacy_definition_business({}, { locale: props.locale }) }}
        </p>
      </li>
      <li>
        <p>
          {{ m.privacy_definition_company({}, { locale: props.locale }) }}
        </p>
        <p>{{ m.privacy_definition_company_gdpr({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          {{ m.privacy_definition_consumer({}, { locale: props.locale }) }}
        </p>
      </li>
      <li>
        <p>{{ m.privacy_definition_country({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          {{ m.privacy_definition_data_controller({}, { locale: props.locale }) }}
        </p>
      </li>
      <li>
        <p>{{ m.privacy_definition_device({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_do_not_track({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_personal_data({}, { locale: props.locale }) }}</p>
        <p>{{ m.privacy_definition_personal_data_gdpr({}, { locale: props.locale }) }}</p>
        <p>{{ m.privacy_definition_personal_data_ccpa({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_sale({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_service({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_service_provider({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_usage_data({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_you({}, { locale: props.locale }) }}</p>
        <p>{{ m.privacy_definition_you_gdpr({}, { locale: props.locale }) }}</p>
      </li>
    </ul>
    <h2>{{ m.privacy_collecting_data_title({}, { locale: props.locale }) }}</h2>
    <h3>{{ m.privacy_types_of_data_title({}, { locale: props.locale }) }}</h3>
    <h4>{{ m.privacy_personal_data_title({}, { locale: props.locale }) }}</h4>
    <p>{{ m.privacy_personal_data_description({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_personal_data_usage({}, { locale: props.locale }) }}</p>
    <h4>{{ m.privacy_usage_data_title({}, { locale: props.locale }) }}</h4>
    <p>{{ m.privacy_usage_data_description({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_usage_data_details({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_usage_data_mobile({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_usage_data_browser({}, { locale: props.locale }) }}</p>
    <h2>{{ m.privacy_use_of_data_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.privacy_use_of_data_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.privacy_use_of_data_provide_service({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_use_of_data_manage_account({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_use_of_data_performance({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_use_of_data_contact({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_use_of_data_offers({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_use_of_data_requests({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_use_of_data_business_transfers({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_use_of_data_other_purposes({}, { locale: props.locale }) }}</li>
    </ul>
    <p>{{ m.privacy_share_of_data_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.privacy_share_of_data_service_providers({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_share_of_data_business_transfers({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_share_of_data_affiliates({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_share_of_data_business_partners({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_share_of_data_other_users({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_share_of_data_consent({}, { locale: props.locale }) }}</li>
    </ul>
    <h2>{{ m.privacy_retention_of_data_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.privacy_retention_of_data_description({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_retention_of_usage_data({}, { locale: props.locale }) }}</p>
    <h2>{{ m.privacy_transfer_of_data_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.privacy_transfer_of_data_description({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_transfer_of_data_consent({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_transfer_of_data_safeguards({}, { locale: props.locale }) }}</p>
    <h2>{{ m.privacy_disclosure_of_data_title({}, { locale: props.locale }) }}</h2>
    <h3>{{ m.privacy_disclosure_business_transactions_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.privacy_disclosure_business_transactions_description({}, { locale: props.locale }) }}</p>
    <h3>{{ m.privacy_disclosure_law_enforcement_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.privacy_disclosure_law_enforcement_description({}, { locale: props.locale }) }}</p>
    <h3>{{ m.privacy_disclosure_other_legal_requirements_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.privacy_disclosure_other_legal_requirements_description({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.privacy_disclosure_other_legal_requirements_comply({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_disclosure_other_legal_requirements_protect({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_disclosure_other_legal_requirements_prevent({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_disclosure_other_legal_requirements_protect_personal({}, { locale: props.locale }) }}</li>
      <li>{{ m.privacy_disclosure_other_legal_requirements_protect_legal({}, { locale: props.locale }) }}</li>
    </ul>
    <h2>{{ m.privacy_security_of_data_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.privacy_security_of_data_description({}, { locale: props.locale }) }}</p>
    <h2>{{ m.privacy_children_privacy_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.privacy_children_privacy_description({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_children_privacy_consent({}, { locale: props.locale }) }}</p>
    <h2>{{ m.privacy_links_to_other_websites_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.privacy_links_to_other_websites_description({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_links_to_other_websites_control({}, { locale: props.locale }) }}</p>
    <h2>{{ m.privacy_changes_to_policy_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.privacy_changes_to_policy_description({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_changes_to_policy_notification({}, { locale: props.locale }) }}</p>
    <p>{{ m.privacy_changes_to_policy_review({}, { locale: props.locale }) }}</p>
    <h2>{{ m.privacy_contact_us_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.privacy_contact_us_description({}, { locale: props.locale }) }}</p>
    <p v-html="m.privacy_contact_us_website({}, { locale: props.locale }).replace('$1', `<a href='${domain}/#support' target='_blank'>${domain}/#support</a>`)" />
  </div>
</template>
