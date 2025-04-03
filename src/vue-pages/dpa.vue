<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales, defaultLocale } from '@/services/locale'
import * as m from "../paraglide/messages.js"

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()
const domain = config.public.baseUrl
</script>

<template>
  <div class="px-3 m-auto prose-sm prose text-left">
    <span class="text-xs" v-if="props.locale !== defaultLocale">
      Note: This is an automatic translated page from it's English source. Only the English version should be used for legal actions, associated with only link to English source.
    </span>
    <h1>{{ m.dpa_title() }}</h1>
    <p>{{ m.dpa_last_updated() }}</p>
    <h2>{{ m.dpa_definitions_title() }}</h2>
    <ul>
      <li>{{ m.dpa_definitions_1() }}</li>
      <li>{{ m.dpa_definitions_2() }}</li>
      <li>{{ m.dpa_definitions_3() }}</li>
      <li>{{ m.dpa_definitions_4() }}</li>
    </ul>
    <h2>{{ m.dpa_privacy_security_title() }}</h2>
    <p>{{ m.dpa_privacy_security_1() }}</p>
    <p>{{ m.dpa_privacy_security_2() }}</p>
    <p>{{ m.dpa_privacy_security_3() }}</p>
    <p>{{ m.dpa_privacy_security_4() }}</p>
    <p>{{ m.dpa_privacy_security_5() }}</p>
    <p>{{ m.dpa_privacy_security_6() }}</p>
    <p>{{ m.dpa_privacy_security_7() }}</p>
    <p>
      {{ m.dpa_privacy_security_8() }}
      <a href="https://www.apple.com/legal/privacy/en-ww/" rel="external nofollow noopener" target="_blank">{{ m.data_policy_title() }}</a
      >.
    </p>
    <h2>{{ m.dpa_security_measures_title() }}</h2>
    <p>{{ m.dpa_security_measures_1() }}</p>
    <p>{{ m.dpa_security_measures_2() }}</p>
    <p>{{ m.dpa_security_measures_3() }}</p>
    <h2>{{ m.dpa_processor_obligations_title() }}</h2>
    <ul>
      <li>{{ m.dpa_processor_obligations_1() }}</li>
      <li>{{ m.dpa_processor_obligations_2() }}</li>
      <li>{{ m.dpa_processor_obligations_3() }}</li>
      <li>{{ m.dpa_processor_obligations_4() }}</li>
      <li>{{ m.dpa_processor_obligations_5() }}</li>
      <li>{{ m.dpa_processor_obligations_6() }}</li>
      <li>{{ m.dpa_processor_obligations_7() }}</li>
      <li>{{ m.dpa_processor_obligations_8() }}</li>
      <li>{{ m.dpa_processor_obligations_9() }}</li>
    </ul>
    <h2>{{ m.dpa_customer_undertakings_title() }}</h2>
    <ul>
      <li>{{ m.dpa_customer_undertakings_1() }}</li>
      <li>{{ m.dpa_customer_undertakings_2() }}</li>
      <li>{{ m.dpa_customer_undertakings_3() }}</li>
      <ol>
        <li>{{ m.dpa_customer_undertakings_4() }}</li>
        <li>{{ m.dpa_customer_undertakings_5() }}</li>
        <li>{{ m.dpa_customer_undertakings_6() }}</li>
        <li>{{ m.dpa_customer_undertakings_7() }}</li>
      </ol>
    </ul>
    <h2>{{ m.dpa_liability_indemnity_title() }}</h2>
    <ul>
      <li>{{ m.dpa_liability_indemnity_1() }}</li>
    </ul>
    <h2>{{ m.dpa_signing_required_title() }}</h2>
    <p>{{ m.dpa_signing_required_1() }}</p>
    <h2>{{ m.dpa_sharing_title() }}</h2>
    <p>{{ m.dpa_sharing_1() }}</p>
    <h2>{{ m.dpa_notification_title() }}</h2>
    <p>{{ m.dpa_notification_1() }}</p>
    <h2>{{ m.dpa_contact_title() }}</h2>
    <p>{{ m.dpa_contact_1() }}</p>
    <ul>
      <li>
        {{ m.dpa_contact_2() }}
        <a href="mailto:support@capgo.app" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
  </div>
</template>
