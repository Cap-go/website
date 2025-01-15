<script setup lang="ts">
import { type Locales, defaultLocale } from '@/services/locale'
import * as m from "../paraglide/messages.js"

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <div class="px-3 m-auto prose-sm prose text-left">
    <span class="text-xs" v-if="props.locale !== defaultLocale">
      Note: This is an automatic translated page from it's English source. Only the English version should be used for legal actions, associated with only link to English source.
    </span>
    <h1 id="capgo-security-">{{ m.trust_capgo_security() }}</h1>
    <p>{{ m.trust_move_forward_with_confidence() }}</p>
    <h2 id="product-security">{{ m.trust_product_security() }}</h2>
    <h3 id="source-code-protection">{{ m.trust_source_code_protection() }}</h3>
    <ul>
      <li>{{ m.trust_source_code_vulnerabilities() }}</li>
    </ul>
    <h2 id="data-security">{{ m.trust_data_security() }}</h2>
    <h3 id="encryption-communication">{{ m.trust_encryption_communication() }}</h3>
    <ul>
      <li>{{ m.trust_data_traffic_encrypted() }}</li>
    </ul>
    <h3 id="source-code-encryption">{{ m.trust_source_code_encryption() }}</h3>
    <ul>
      <li>{{ m.trust_source_code_encrypted_in_transit() }}</li>
    </ul>
    <h3 id="data-backup">{{ m.trust_data_backup() }}</h3>
    <ul>
      <li>{{ m.trust_data_backup_policy() }}</li>
    </ul>
    <h2 id="network-security">{{ m.trust_network_security() }}</h2>
    <h3 id="architecture">{{ m.trust_architecture() }}</h3>
    <ul>
      <li>{{ m.trust_architecture_layers() }}</li>
    </ul>
    <h2 id="application-security">{{ m.trust_application_security() }}</h2>
    <h3 id="secure-coding">{{ m.trust_secure_coding() }}</h3>
    <ul>
      <li>{{ m.trust_code_review() }}</li>
    </ul>
    <h3 id="site-reliability">{{ m.trust_site_reliability() }}</h3>
    <ul>
      <li>{{ m.trust_serverless_infrastructure() }}</li>
    </ul>
    <h3 id="application-penetration-testing">{{ m.trust_application_penetration_testing() }}</h3>
    <ul>
      <li>{{ m.trust_third_party_testing() }}</li>
    </ul>
    <h2 id="business-security">{{ m.trust_business_security() }}</h2>
    <h3 id="background-checks">{{ m.trust_background_checks() }}</h3>
    <ul>
      <li>{{ m.trust_access_to_production_database() }}</li>
    </ul>
    <h3 id="security-awareness">{{ m.trust_security_awareness() }}</h3>
    <ul>
      <li>{{ m.trust_security_training() }}</li>
    </ul>
    <h3 id="security-coding-education">{{ m.trust_security_coding_education() }}</h3>
    <ul>
      <li>{{ m.trust_open_source_security() }}</li>
    </ul>
    <h3 id="partner-management">{{ m.trust_partner_management() }}</h3>
    <ul>
      <li>
        {{ m.trust_soc2_certification() }}
        <ul>
          <li><a href="https://www.netlify.com/security/">Netlify SOC 2</a></li>
          <li><a href="https://supabase.com/security">Supabase SOC 2</a></li>
        </ul>
      </li>
    </ul>
    <h3 id="incident-response">{{ m.trust_incident_response() }}</h3>
    <ul>
      <li>{{ m.trust_dedicated_incident_response() }}</li>
    </ul>
    <h3 id="incident-response-policy-plan">{{ m.trust_incident_response_policy_plan() }}</h3>
    <ul>
      <li>{{ m.trust_incident_response_policy() }}</li>
    </ul>
    <h3 id="communication">{{ m.trust_communication() }}</h3>
    <ul>
      <li>
        {{ m.trust_system_wide_issues_notification() }}
      </li>
    </ul>
  </div>
</template>
