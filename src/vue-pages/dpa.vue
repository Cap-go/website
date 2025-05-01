<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import * as m from '@/paraglide/messages'
import { type Locales, defaultLocale } from '@/services/locale'

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()
const domain = config.public.baseUrl
</script>

<template>
  <div class="px-3 m-auto prose-sm prose text-left">
    <span class="text-xs" v-if="props.locale !== defaultLocale">
      Note: This is an automatic translated page from it's English source. Only the English version should be used for legal actions, associated with only link to English source.
    </span>
    <h1>{{ m.dpa_title({}, { locale: props.locale }) }}</h1>
    <p>{{ m.dpa_last_updated({}, { locale: props.locale }) }}</p>
    <h2>{{ m.dpa_definitions_title({}, { locale: props.locale }) }}</h2>
    <ul>
      <li>{{ m.dpa_definitions_1({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_definitions_2({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_definitions_3({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_definitions_4({}, { locale: props.locale }) }}</li>
    </ul>
    <h2>{{ m.dpa_privacy_security_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.dpa_privacy_security_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.dpa_privacy_security_2({}, { locale: props.locale }) }}</p>
    <p>{{ m.dpa_privacy_security_3({}, { locale: props.locale }) }}</p>
    <p>{{ m.dpa_privacy_security_4({}, { locale: props.locale }) }}</p>
    <p>{{ m.dpa_privacy_security_5({}, { locale: props.locale }) }}</p>
    <p>{{ m.dpa_privacy_security_6({}, { locale: props.locale }) }}</p>
    <p>{{ m.dpa_privacy_security_7({}, { locale: props.locale }) }}</p>
    <p>
      {{ m.dpa_privacy_security_8({}, { locale: props.locale }) }}
      <a href="https://www.apple.com/legal/privacy/en-ww/" rel="external nofollow noopener" target="_blank">{{ m.data_policy_title({}, { locale: props.locale }) }}</a
      >.
    </p>
    <h2>{{ m.dpa_security_measures_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.dpa_security_measures_1({}, { locale: props.locale }) }}</p>
    <p>{{ m.dpa_security_measures_2({}, { locale: props.locale }) }}</p>
    <p>{{ m.dpa_security_measures_3({}, { locale: props.locale }) }}</p>
    <h2>{{ m.dpa_processor_obligations_title({}, { locale: props.locale }) }}</h2>
    <ul>
      <li>{{ m.dpa_processor_obligations_1({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_processor_obligations_2({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_processor_obligations_3({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_processor_obligations_4({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_processor_obligations_5({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_processor_obligations_6({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_processor_obligations_7({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_processor_obligations_8({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_processor_obligations_9({}, { locale: props.locale }) }}</li>
    </ul>
    <h2>{{ m.dpa_customer_undertakings_title({}, { locale: props.locale }) }}</h2>
    <ul>
      <li>{{ m.dpa_customer_undertakings_1({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_customer_undertakings_2({}, { locale: props.locale }) }}</li>
      <li>{{ m.dpa_customer_undertakings_3({}, { locale: props.locale }) }}</li>
      <ol>
        <li>{{ m.dpa_customer_undertakings_4({}, { locale: props.locale }) }}</li>
        <li>{{ m.dpa_customer_undertakings_5({}, { locale: props.locale }) }}</li>
        <li>{{ m.dpa_customer_undertakings_6({}, { locale: props.locale }) }}</li>
        <li>{{ m.dpa_customer_undertakings_7({}, { locale: props.locale }) }}</li>
      </ol>
    </ul>
    <h2>{{ m.dpa_liability_indemnity_title({}, { locale: props.locale }) }}</h2>
    <ul>
      <li>{{ m.dpa_liability_indemnity_1({}, { locale: props.locale }) }}</li>
    </ul>
    <h2>{{ m.dpa_signing_required_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.dpa_signing_required_1({}, { locale: props.locale }) }}</p>
    <h2>{{ m.dpa_sharing_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.dpa_sharing_1({}, { locale: props.locale }) }}</p>
    <h2>{{ m.dpa_notification_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.dpa_notification_1({}, { locale: props.locale }) }}</p>
    <h2>{{ m.dpa_contact_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.dpa_contact_1({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        {{ m.dpa_contact_2({}, { locale: props.locale }) }}
        <a href="mailto:support@capgo.app" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
  </div>
</template>
