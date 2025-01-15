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
    <h1>{{ m.eula_title()}}</h1>
    <p>{{ m.eula_last_updated()}}</p>
    <p>{{ m.eula_read_carefully()}}</p>
    <h2>{{ m.eula_interpretation_title()}}</h2>
    <h3>{{ m.eula_interpretation_subtitle()}}</h3>
    <p>
      {{ m.eula_interpretation_text() }}
    </p>
    <h3>{{ m.eula_definitions_subtitle()}}</h3>
    <p>{{ m.eula_definitions_intro()}}</p>
    <ul>
      <li>
        <p>{{ m.eula_definition_agreement()}}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_application()}}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_application_store()}}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_company()}}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_content()}}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_country()}}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_device()}}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_family_sharing()}}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_third_party_services()}}</p>
      </li>
      <li>
        <p>{{ m.eula_definition_you()}}</p>
      </li>
    </ul>
    <h2>{{ m.eula_acknowledgment_title()}}</h2>
    <p>{{ m.eula_acknowledgment_text_1()}}</p>
    <p>{{ m.eula_acknowledgment_text_2()}}</p>
    <p>{{ m.eula_acknowledgment_text_3()}}</p>
    <p>{{ m.eula_acknowledgment_text_4()}}</p>
    <p>{{ m.eula_acknowledgment_text_5()}}</p>
    <h2>{{ m.eula_license_title()}}</h2>
    <h3>{{ m.eula_license_scope_subtitle()}}</h3>
    <p>{{ m.eula_license_scope_text_1()}}</p>
    <p>{{ m.eula_license_scope_text_2()}}</p>
    <p>{{ m.eula_license_scope_text_3()}}</p>
    <h3>{{ m.eula_license_restrictions_subtitle()}}</h3>
    <p>{{ m.eula_license_restrictions_intro()}}</p>
    <ul>
      <li>{{ m.eula_license_restrictions_1()}}</li>
      <li>{{ m.eula_license_restrictions_2()}}</li>
      <li>{{ m.eula_license_restrictions_3()}}</li>
      <li>{{ m.eula_license_restrictions_4()}}</li>
    </ul>
    <h2>{{ m.eula_intellectual_property_title()}}</h2>
    <p>{{ m.eula_intellectual_property_text_1()}}</p>
    <p>{{ m.eula_intellectual_property_text_2()}}</p>
    <h2>{{ m.eula_your_suggestions_title()}}</h2>
    <p>{{ m.eula_your_suggestions_text_1()}}</p>
    <p>{{ m.eula_your_suggestions_text_2()}}</p>
    <h2>{{ m.eula_modifications_title()}}</h2>
    <p>{{ m.eula_modifications_text()}}</p>
    <h3>{{ m.eula_updates_subtitle()}}</h3>
    <p>{{ m.eula_updates_text_1()}}</p>
    <p>{{ m.eula_updates_text_2()}}</p>
    <p>{{ m.eula_updates_text_3()}}</p>
    <h3>{{ m.eula_maintenance_subtitle()}}</h3>
    <p>{{ m.eula_maintenance_text()}}</p>
    <h2>{{ m.eula_third_party_services_title()}}</h2>
    <p>{{ m.eula_third_party_services_text_1()}}</p>
    <p>{{ m.eula_third_party_services_text_2()}}</p>
    <p>{{ m.eula_third_party_services_text_3()}}</p>
    <h2>{{ m.eula_term_and_termination_title()}}</h2>
    <p>{{ m.eula_term_and_termination_text_1()}}</p>
    <p>{{ m.eula_term_and_termination_text_2()}}</p>
    <p>{{ m.eula_term_and_termination_text_3()}}</p>
    <p>{{ m.eula_term_and_termination_text_4()}}</p>
    <h2>{{ m.eula_indemnification_title()}}</h2>
    <p>{{ m.eula_indemnification_text()}}</p>
    <h2>{{ m.eula_no_warranties_title()}}</h2>
    <p>{{ m.eula_no_warranties_text_1()}}</p>
    <p>{{ m.eula_no_warranties_text_2()}}</p>
    <p>{{ m.eula_no_warranties_text_3()}}</p>
    <h2>{{ m.eula_limitation_of_liability_title()}}</h2>
    <p>{{ m.eula_limitation_of_liability_text_1()}}</p>
    <p>{{ m.eula_limitation_of_liability_text_2()}}</p>
    <p>{{ m.eula_limitation_of_liability_text_3()}}</p>
    <p>{{ m.eula_limitation_of_liability_text_4()}}</p>
    <h2>{{ m.eula_severability_and_waiver_title()}}</h2>
    <h3>{{ m.eula_severability_subtitle()}}</h3>
    <p>{{ m.eula_severability_text()}}</p>
    <h3>{{ m.eula_waiver_subtitle()}}</h3>
    <p>{{ m.eula_waiver_text()}}</p>
    <h2>{{ m.eula_product_claims_title()}}</h2>
    <p>{{ m.eula_product_claims_text()}}</p>
    <h2>{{ m.eula_us_legal_compliance_title()}}</h2>
    <p>{{ m.eula_us_legal_compliance_text()}}</p>
    <h2>{{ m.eula_changes_title()}}</h2>
    <p>{{ m.eula_changes_text_1()}}</p>
    <p>{{ m.eula_changes_text_2()}}</p>
    <h2>{{ m.eula_governing_law_title()}}</h2>
    <p>{{ m.eula_governing_law_text()}}</p>
    <h2>{{ m.eula_entire_agreement_title()}}</h2>
    <p>{{ m.eula_entire_agreement_text_1()}}</p>
    <p>{{ m.eula_entire_agreement_text_2()}}</p>
    <h2>{{ m.eula_contact_us_title()}}</h2>
    <p>{{ m.eula_contact_us_text()}}</p>
    <p>
      {{ m.eula_contact_us_link() }} <a :href="`${domain}/#support`" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
    </p>
  </div>
</template>
