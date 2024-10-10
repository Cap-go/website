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
    <h1>{{ translations['eula_title'][props.locale] }}</h1>
    <p>{{ translations['eula_last_updated'][props.locale] }}</p>
    <p>{{ translations['eula_read_carefully'][props.locale].replace('$1', brand) }}</p>
    <h2>{{ translations['eula_interpretation_title'][props.locale] }}</h2>
    <h3>{{ translations['eula_interpretation_subtitle'][props.locale] }}</h3>
    <p>
      {{ translations['eula_interpretation_text'][props.locale] }}
    </p>
    <h3>{{ translations['eula_definitions_subtitle'][props.locale] }}</h3>
    <p>{{ translations['eula_definitions_intro'][props.locale] }}</p>
    <ul>
      <li>
        <p>{{ translations['eula_definition_agreement'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['eula_definition_application'][props.locale].replace('$1', brand) }}</p>
      </li>
      <li>
        <p>{{ translations['eula_definition_application_store'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['eula_definition_company'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['eula_definition_content'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['eula_definition_country'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['eula_definition_device'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['eula_definition_family_sharing'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['eula_definition_third_party_services'][props.locale] }}</p>
      </li>
      <li>
        <p>{{ translations['eula_definition_you'][props.locale] }}</p>
      </li>
    </ul>
    <h2>{{ translations['eula_acknowledgment_title'][props.locale] }}</h2>
    <p>{{ translations['eula_acknowledgment_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_acknowledgment_text_2'][props.locale] }}</p>
    <p>{{ translations['eula_acknowledgment_text_3'][props.locale] }}</p>
    <p>{{ translations['eula_acknowledgment_text_4'][props.locale] }}</p>
    <p>{{ translations['eula_acknowledgment_text_5'][props.locale] }}</p>
    <h2>{{ translations['eula_license_title'][props.locale] }}</h2>
    <h3>{{ translations['eula_license_scope_subtitle'][props.locale] }}</h3>
    <p>{{ translations['eula_license_scope_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_license_scope_text_2'][props.locale] }}</p>
    <p>{{ translations['eula_license_scope_text_3'][props.locale] }}</p>
    <h3>{{ translations['eula_license_restrictions_subtitle'][props.locale] }}</h3>
    <p>{{ translations['eula_license_restrictions_intro'][props.locale] }}</p>
    <ul>
      <li>{{ translations['eula_license_restrictions_1'][props.locale] }}</li>
      <li>{{ translations['eula_license_restrictions_2'][props.locale] }}</li>
      <li>{{ translations['eula_license_restrictions_3'][props.locale] }}</li>
      <li>{{ translations['eula_license_restrictions_4'][props.locale] }}</li>
    </ul>
    <h2>{{ translations['eula_intellectual_property_title'][props.locale] }}</h2>
    <p>{{ translations['eula_intellectual_property_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_intellectual_property_text_2'][props.locale] }}</p>
    <h2>{{ translations['eula_your_suggestions_title'][props.locale] }}</h2>
    <p>{{ translations['eula_your_suggestions_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_your_suggestions_text_2'][props.locale] }}</p>
    <h2>{{ translations['eula_modifications_title'][props.locale] }}</h2>
    <p>{{ translations['eula_modifications_text'][props.locale] }}</p>
    <h3>{{ translations['eula_updates_subtitle'][props.locale] }}</h3>
    <p>{{ translations['eula_updates_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_updates_text_2'][props.locale] }}</p>
    <p>{{ translations['eula_updates_text_3'][props.locale] }}</p>
    <h3>{{ translations['eula_maintenance_subtitle'][props.locale] }}</h3>
    <p>{{ translations['eula_maintenance_text'][props.locale] }}</p>
    <h2>{{ translations['eula_third_party_services_title'][props.locale] }}</h2>
    <p>{{ translations['eula_third_party_services_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_third_party_services_text_2'][props.locale] }}</p>
    <p>{{ translations['eula_third_party_services_text_3'][props.locale] }}</p>
    <h2>{{ translations['eula_term_and_termination_title'][props.locale] }}</h2>
    <p>{{ translations['eula_term_and_termination_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_term_and_termination_text_2'][props.locale] }}</p>
    <p>{{ translations['eula_term_and_termination_text_3'][props.locale] }}</p>
    <p>{{ translations['eula_term_and_termination_text_4'][props.locale] }}</p>
    <h2>{{ translations['eula_indemnification_title'][props.locale] }}</h2>
    <p>{{ translations['eula_indemnification_text'][props.locale] }}</p>
    <h2>{{ translations['eula_no_warranties_title'][props.locale] }}</h2>
    <p>{{ translations['eula_no_warranties_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_no_warranties_text_2'][props.locale] }}</p>
    <p>{{ translations['eula_no_warranties_text_3'][props.locale] }}</p>
    <h2>{{ translations['eula_limitation_of_liability_title'][props.locale] }}</h2>
    <p>{{ translations['eula_limitation_of_liability_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_limitation_of_liability_text_2'][props.locale] }}</p>
    <p>{{ translations['eula_limitation_of_liability_text_3'][props.locale] }}</p>
    <p>{{ translations['eula_limitation_of_liability_text_4'][props.locale] }}</p>
    <h2>{{ translations['eula_severability_and_waiver_title'][props.locale] }}</h2>
    <h3>{{ translations['eula_severability_subtitle'][props.locale] }}</h3>
    <p>{{ translations['eula_severability_text'][props.locale] }}</p>
    <h3>{{ translations['eula_waiver_subtitle'][props.locale] }}</h3>
    <p>{{ translations['eula_waiver_text'][props.locale] }}</p>
    <h2>{{ translations['eula_product_claims_title'][props.locale] }}</h2>
    <p>{{ translations['eula_product_claims_text'][props.locale] }}</p>
    <h2>{{ translations['eula_us_legal_compliance_title'][props.locale] }}</h2>
    <p>{{ translations['eula_us_legal_compliance_text'][props.locale] }}</p>
    <h2>{{ translations['eula_changes_title'][props.locale] }}</h2>
    <p>{{ translations['eula_changes_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_changes_text_2'][props.locale] }}</p>
    <h2>{{ translations['eula_governing_law_title'][props.locale] }}</h2>
    <p>{{ translations['eula_governing_law_text'][props.locale] }}</p>
    <h2>{{ translations['eula_entire_agreement_title'][props.locale] }}</h2>
    <p>{{ translations['eula_entire_agreement_text_1'][props.locale] }}</p>
    <p>{{ translations['eula_entire_agreement_text_2'][props.locale] }}</p>
    <h2>{{ translations['eula_contact_us_title'][props.locale] }}</h2>
    <p>{{ translations['eula_contact_us_text'][props.locale] }}</p>
    <ul>
      <li>
        {{ translations['eula_contact_us_link'][props.locale].replace('$1', `<a href="${domain}/#support" rel="external nofollow noopener" target="_blank">${domain}/#support</a>`)
        }}
      </li>
    </ul>
  </div>
</template>
