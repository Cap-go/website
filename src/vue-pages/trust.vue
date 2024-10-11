<script setup lang="ts">
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <div class="prose prose-sm m-auto px-3 text-left">
    <h1 id="capgo-security-">{{ translations.trust_capgo_security[props.locale] }}</h1>
    <p>{{ translations.trust_move_forward_with_confidence[props.locale] }}</p>
    <h2 id="product-security">{{ translations.trust_product_security[props.locale] }}</h2>
    <h3 id="source-code-protection">{{ translations.trust_source_code_protection[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_source_code_vulnerabilities[props.locale] }}</li>
    </ul>
    <h2 id="data-security">{{ translations.trust_data_security[props.locale] }}</h2>
    <h3 id="encryption-communication">{{ translations.trust_encryption_communication[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_data_traffic_encrypted[props.locale] }}</li>
    </ul>
    <h3 id="source-code-encryption">{{ translations.trust_source_code_encryption[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_source_code_encrypted_in_transit[props.locale] }}</li>
    </ul>
    <h3 id="data-backup">{{ translations.trust_data_backup[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_data_backup_policy[props.locale] }}</li>
    </ul>
    <h2 id="network-security">{{ translations.trust_network_security[props.locale] }}</h2>
    <h3 id="architecture">{{ translations.trust_architecture[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_architecture_layers[props.locale] }}</li>
    </ul>
    <h2 id="application-security">{{ translations.trust_application_security[props.locale] }}</h2>
    <h3 id="secure-coding">{{ translations.trust_secure_coding[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_code_review[props.locale] }}</li>
    </ul>
    <h3 id="site-reliability">{{ translations.trust_site_reliability[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_serverless_infrastructure[props.locale] }}</li>
    </ul>
    <h3 id="application-penetration-testing">{{ translations.trust_application_penetration_testing[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_third_party_testing[props.locale] }}</li>
    </ul>
    <h2 id="business-security">{{ translations.trust_business_security[props.locale] }}</h2>
    <h3 id="background-checks">{{ translations.trust_background_checks[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_access_to_production_database[props.locale] }}</li>
    </ul>
    <h3 id="security-awareness">{{ translations.trust_security_awareness[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_security_training[props.locale] }}</li>
    </ul>
    <h3 id="security-coding-education">{{ translations.trust_security_coding_education[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_open_source_security[props.locale] }}</li>
    </ul>
    <h3 id="partner-management">{{ translations.trust_partner_management[props.locale] }}</h3>
    <ul>
      <li>
        {{ translations.trust_soc2_certification[props.locale] }}
        <ul>
          <li><a href="https://www.netlify.com/security/">Netlify SOC 2</a></li>
          <li><a href="https://supabase.com/security">Supabase SOC 2</a></li>
        </ul>
      </li>
    </ul>
    <h3 id="incident-response">{{ translations.trust_incident_response[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_dedicated_incident_response[props.locale] }}</li>
    </ul>
    <h3 id="incident-response-policy-plan">{{ translations.trust_incident_response_policy_plan[props.locale] }}</h3>
    <ul>
      <li>{{ translations.trust_incident_response_policy[props.locale] }}</li>
    </ul>
    <h3 id="communication">{{ translations.trust_communication[props.locale] }}</h3>
    <ul>
      <li>
        {{ translations.trust_system_wide_issues_notification[props.locale] }}
      </li>
    </ul>
  </div>
</template>
