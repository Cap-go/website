<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales, defaultLocale } from '@/services/locale'
import * as m from "../paraglide/messages.js"

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
    <h1>{{ m.privacy_title() }}</h1>
    <p>{{ m.privacy_last_updated() }}</p>
    <p>
      {{ m.privacy_description() }}
    </p>
    <p>
      {{ m.privacy_agreement() }}
    </p>
    <h2>{{ m.privacy_interpretation_title() }}</h2>
    <h3>{{ m.privacy_interpretation_subtitle() }}</h3>
    <p>
      {{ m.privacy_interpretation_text() }}
    </p>
    <h3>{{ m.privacy_definitions_subtitle() }}</h3>
    <p>{{ m.privacy_definitions_intro() }}</p>
    <ul>
      <li>
        <p>{{ m.privacy_definition_account() }}</p>
      </li>
      <li>
        <p>
          {{ m.privacy_definition_affiliate() }}
        </p>
      </li>
      <li>
        <p>{{ m.privacy_definition_application().replace('$1', brand) }}</p>
      </li>
      <li>
        <p>
          {{ m.privacy_definition_business() }}
        </p>
      </li>
      <li>
        <p>
          {{ m.privacy_definition_company() }}
        </p>
        <p>{{ m.privacy_definition_company_gdpr() }}</p>
      </li>
      <li>
        <p>
          {{ m.privacy_definition_consumer() }}
        </p>
      </li>
      <li>
        <p>{{ m.privacy_definition_country() }}</p>
      </li>
      <li>
        <p>
          {{ m.privacy_definition_data_controller() }}
        </p>
      </li>
      <li>
        <p>{{ m.privacy_definition_device() }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_do_not_track() }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_personal_data() }}</p>
        <p>{{ m.privacy_definition_personal_data_gdpr() }}</p>
        <p>{{ m.privacy_definition_personal_data_ccpa() }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_sale() }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_service() }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_service_provider() }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_usage_data() }}</p>
      </li>
      <li>
        <p>{{ m.privacy_definition_you() }}</p>
        <p>{{ m.privacy_definition_you_gdpr() }}</p>
      </li>
    </ul>
    <h2>{{ m.privacy_collecting_data_title() }}</h2>
    <h3>{{ m.privacy_types_of_data_title() }}</h3>
    <h4>{{ m.privacy_personal_data_title() }}</h4>
    <p>{{ m.privacy_personal_data_description() }}</p>
    <p>{{ m.privacy_personal_data_usage() }}</p>
    <h4>{{ m.privacy_usage_data_title() }}</h4>
    <p>{{ m.privacy_usage_data_description() }}</p>
    <p>{{ m.privacy_usage_data_details() }}</p>
    <p>{{ m.privacy_usage_data_mobile() }}</p>
    <p>{{ m.privacy_usage_data_browser() }}</p>
    <h2>{{ m.privacy_use_of_data_title() }}</h2>
    <p>{{ m.privacy_use_of_data_intro() }}</p>
    <ul>
      <li>{{ m.privacy_use_of_data_provide_service() }}</li>
      <li>{{ m.privacy_use_of_data_manage_account() }}</li>
      <li>{{ m.privacy_use_of_data_performance() }}</li>
      <li>{{ m.privacy_use_of_data_contact() }}</li>
      <li>{{ m.privacy_use_of_data_offers() }}</li>
      <li>{{ m.privacy_use_of_data_requests() }}</li>
      <li>{{ m.privacy_use_of_data_business_transfers() }}</li>
      <li>{{ m.privacy_use_of_data_other_purposes() }}</li>
    </ul>
    <p>{{ m.privacy_share_of_data_intro() }}</p>
    <ul>
      <li>{{ m.privacy_share_of_data_service_providers() }}</li>
      <li>{{ m.privacy_share_of_data_business_transfers() }}</li>
      <li>{{ m.privacy_share_of_data_affiliates() }}</li>
      <li>{{ m.privacy_share_of_data_business_partners() }}</li>
      <li>{{ m.privacy_share_of_data_other_users() }}</li>
      <li>{{ m.privacy_share_of_data_consent() }}</li>
    </ul>
    <h2>{{ m.privacy_retention_of_data_title() }}</h2>
    <p>{{ m.privacy_retention_of_data_description() }}</p>
    <p>{{ m.privacy_retention_of_usage_data() }}</p>
    <h2>{{ m.privacy_transfer_of_data_title() }}</h2>
    <p>{{ m.privacy_transfer_of_data_description() }}</p>
    <p>{{ m.privacy_transfer_of_data_consent() }}</p>
    <p>{{ m.privacy_transfer_of_data_safeguards() }}</p>
    <h2>{{ m.privacy_disclosure_of_data_title() }}</h2>
    <h3>{{ m.privacy_disclosure_business_transactions_title() }}</h3>
    <p>{{ m.privacy_disclosure_business_transactions_description() }}</p>
    <h3>{{ m.privacy_disclosure_law_enforcement_title() }}</h3>
    <p>{{ m.privacy_disclosure_law_enforcement_description() }}</p>
    <h3>{{ m.privacy_disclosure_other_legal_requirements_title() }}</h3>
    <p>{{ m.privacy_disclosure_other_legal_requirements_description() }}</p>
    <ul>
      <li>{{ m.privacy_disclosure_other_legal_requirements_comply() }}</li>
      <li>{{ m.privacy_disclosure_other_legal_requirements_protect() }}</li>
      <li>{{ m.privacy_disclosure_other_legal_requirements_prevent() }}</li>
      <li>{{ m.privacy_disclosure_other_legal_requirements_protect_personal() }}</li>
      <li>{{ m.privacy_disclosure_other_legal_requirements_protect_legal() }}</li>
    </ul>
    <h2>{{ m.privacy_security_of_data_title() }}</h2>
    <p>{{ m.privacy_security_of_data_description() }}</p>
    <h2>{{ m.privacy_children_privacy_title() }}</h2>
    <p>{{ m.privacy_children_privacy_description() }}</p>
    <p>{{ m.privacy_children_privacy_consent() }}</p>
    <h2>{{ m.privacy_links_to_other_websites_title() }}</h2>
    <p>{{ m.privacy_links_to_other_websites_description() }}</p>
    <p>{{ m.privacy_links_to_other_websites_control() }}</p>
    <h2>{{ m.privacy_changes_to_policy_title() }}</h2>
    <p>{{ m.privacy_changes_to_policy_description() }}</p>
    <p>{{ m.privacy_changes_to_policy_notification() }}</p>
    <p>{{ m.privacy_changes_to_policy_review() }}</p>
    <h2>{{ m.privacy_contact_us_title() }}</h2>
    <p>{{ m.privacy_contact_us_description() }}</p>
    <p v-html="m.privacy_contact_us_website().replace('$1', `<a href='${domain}/#support' target='_blank'>${domain}/#support</a>`)" />
  </div>
</template>
