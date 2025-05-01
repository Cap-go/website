<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales, defaultLocale } from '@/services/locale'
import * as m from '../paraglide/messages.js'

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
    <h1>{{ m.eula_title({}, { locale: props.locale }) }}</h1>
    <p>{{ m.eula_last_updated({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_read_carefully({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_interpretation_title({}, { locale: props.locale }) }}</h2>
    <h3>{{ m.eula_interpretation_subtitle({}, { locale: props.locale }) }}</h3>
    <p>
      {{ m.eula_interpretation_text({}, { locale: props.locale }) }}
    </p>
    <h3>{{ m.eula_definitions_subtitle({}, { locale: props.locale }) }}</h3>
    <p>{{ m.eula_definitions_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        <p>{{ m.eula_definition_agreement({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_application({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_application_store({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_company({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_content({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_country({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_device({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_family_sharing({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_third_party_services({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_you({}, { locale: props.locale }) }}</p>
      </li>
    </ul>
    <h2>{{ m.eula_acknowledgment_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_acknowledgment_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_acknowledgment_text_2({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_acknowledgment_text_3({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_acknowledgment_text_4({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_acknowledgment_text_5({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_license_title({}, { locale: props.locale }) }}</h2>
    <h3>{{ m.eula_license_scope_subtitle({}, { locale: props.locale }) }}</h3>
    <p>{{ m.eula_license_scope_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_license_scope_text_2({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_license_scope_text_3({}, { locale: props.locale }) }}</p>
    <h3>{{ m.eula_license_restrictions_subtitle({}, { locale: props.locale }) }}</h3>
    <p>{{ m.eula_license_restrictions_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.eula_license_restrictions_1({}, { locale: props.locale }) }}</li>
      <li>{{ m.eula_license_restrictions_2({}, { locale: props.locale }) }}</li>
      <li>{{ m.eula_license_restrictions_3({}, { locale: props.locale }) }}</li>
      <li>{{ m.eula_license_restrictions_4({}, { locale: props.locale }) }}</li>
    </ul>
    <h2>{{ m.eula_intellectual_property_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_intellectual_property_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_intellectual_property_text_2({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_your_suggestions_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_your_suggestions_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_your_suggestions_text_2({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_modifications_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_modifications_text({}, { locale: props.locale }) }}</p>
    <h3>{{ m.eula_updates_subtitle({}, { locale: props.locale }) }}</h3>
    <p>{{ m.eula_updates_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_updates_text_2({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_updates_text_3({}, { locale: props.locale }) }}</p>
    <h3>{{ m.eula_maintenance_subtitle({}, { locale: props.locale }) }}</h3>
    <p>{{ m.eula_maintenance_text({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_third_party_services_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_third_party_services_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_third_party_services_text_2({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_third_party_services_text_3({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_term_and_termination_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_term_and_termination_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_term_and_termination_text_2({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_term_and_termination_text_3({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_term_and_termination_text_4({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_indemnification_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_indemnification_text({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_no_warranties_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_no_warranties_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_no_warranties_text_2({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_no_warranties_text_3({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_limitation_of_liability_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_limitation_of_liability_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_limitation_of_liability_text_2({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_limitation_of_liability_text_3({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_limitation_of_liability_text_4({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_severability_and_waiver_title({}, { locale: props.locale }) }}</h2>
    <h3>{{ m.eula_severability_subtitle({}, { locale: props.locale }) }}</h3>
    <p>{{ m.eula_severability_text({}, { locale: props.locale }) }}</p>
    <h3>{{ m.eula_waiver_subtitle({}, { locale: props.locale }) }}</h3>
    <p>{{ m.eula_waiver_text({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_product_claims_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_product_claims_text({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_us_legal_compliance_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_us_legal_compliance_text({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_changes_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_changes_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_changes_text_2({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_governing_law_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_governing_law_text({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_entire_agreement_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_entire_agreement_text_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.eula_entire_agreement_text_2({}, { locale: props.locale }) }}</p>
    <h2>{{ m.eula_contact_us_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.eula_contact_us_text({}, { locale: props.locale }) }}</p>
    <p>
      {{ m.eula_contact_us_link({}, { locale: props.locale }) }} <a :href="`${domain}/#support`" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
    </p>
  </div>
</template>
