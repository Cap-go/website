<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales, defaultLocale } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()
const domain = config.public.baseUrl
</script>

<template>
  <div class="prose prose-sm m-auto px-3 text-left">
    <span class="text-xs" v-if="props.locale !== defaultLocale">
      Note: This is an automatic translated page from it's English source. Only the English version should be used for legal actions, associated with only link to English source.
    </span>
    <h1>{{ translations['dpa_title'][props.locale] }}</h1>
    <p>{{ translations['dpa_last_updated'][props.locale] }}</p>
    <h2>{{ translations['dpa_definitions_title'][props.locale] }}</h2>
    <ul>
      <li>{{ translations['dpa_definitions_1'][props.locale] }}</li>
      <li>{{ translations['dpa_definitions_2'][props.locale] }}</li>
      <li>{{ translations['dpa_definitions_3'][props.locale] }}</li>
      <li>{{ translations['dpa_definitions_4'][props.locale] }}</li>
    </ul>
    <h2>{{ translations['dpa_privacy_security_title'][props.locale] }}</h2>
    <p>{{ translations['dpa_privacy_security_1'][props.locale] }}</p>
    <p>{{ translations['dpa_privacy_security_2'][props.locale] }}</p>
    <p>{{ translations['dpa_privacy_security_3'][props.locale] }}</p>
    <p>{{ translations['dpa_privacy_security_4'][props.locale] }}</p>
    <p>{{ translations['dpa_privacy_security_5'][props.locale] }}</p>
    <p>{{ translations['dpa_privacy_security_6'][props.locale] }}</p>
    <p>{{ translations['dpa_privacy_security_7'][props.locale] }}</p>
    <p>
      {{ translations['dpa_privacy_security_8'][props.locale] }}
      <a href="https://www.apple.com/legal/privacy/en-ww/" rel="external nofollow noopener" target="_blank">{{ translations['data_policy_title'][props.locale] }}</a
      >.
    </p>
    <h2>{{ translations['dpa_security_measures_title'][props.locale] }}</h2>
    <p>{{ translations['dpa_security_measures_1'][props.locale] }}</p>
    <p>{{ translations['dpa_security_measures_2'][props.locale] }}</p>
    <p>{{ translations['dpa_security_measures_3'][props.locale] }}</p>
    <h2>{{ translations['dpa_processor_obligations_title'][props.locale] }}</h2>
    <ul>
      <li>{{ translations['dpa_processor_obligations_1'][props.locale] }}</li>
      <li>{{ translations['dpa_processor_obligations_2'][props.locale] }}</li>
      <li>{{ translations['dpa_processor_obligations_3'][props.locale] }}</li>
      <li>{{ translations['dpa_processor_obligations_4'][props.locale] }}</li>
      <li>{{ translations['dpa_processor_obligations_5'][props.locale] }}</li>
      <li>{{ translations['dpa_processor_obligations_6'][props.locale] }}</li>
      <li>{{ translations['dpa_processor_obligations_7'][props.locale] }}</li>
      <li>{{ translations['dpa_processor_obligations_8'][props.locale] }}</li>
      <li>{{ translations['dpa_processor_obligations_9'][props.locale] }}</li>
    </ul>
    <h2>{{ translations['dpa_customer_undertakings_title'][props.locale] }}</h2>
    <ul>
      <li>{{ translations['dpa_customer_undertakings_1'][props.locale] }}</li>
      <li>{{ translations['dpa_customer_undertakings_2'][props.locale] }}</li>
      <li>{{ translations['dpa_customer_undertakings_3'][props.locale] }}</li>
      <ol>
        <li>{{ translations['dpa_customer_undertakings_4'][props.locale] }}</li>
        <li>{{ translations['dpa_customer_undertakings_5'][props.locale] }}</li>
        <li>{{ translations['dpa_customer_undertakings_6'][props.locale] }}</li>
        <li>{{ translations['dpa_customer_undertakings_7'][props.locale] }}</li>
      </ol>
    </ul>
    <h2>{{ translations['dpa_liability_indemnity_title'][props.locale] }}</h2>
    <ul>
      <li>{{ translations['dpa_liability_indemnity_1'][props.locale] }}</li>
    </ul>
    <h2>{{ translations['dpa_signing_required_title'][props.locale] }}</h2>
    <p>{{ translations['dpa_signing_required_1'][props.locale] }}</p>
    <h2>{{ translations['dpa_sharing_title'][props.locale] }}</h2>
    <p>{{ translations['dpa_sharing_1'][props.locale] }}</p>
    <h2>{{ translations['dpa_notification_title'][props.locale] }}</h2>
    <p>{{ translations['dpa_notification_1'][props.locale] }}</p>
    <h2>{{ translations['dpa_contact_title'][props.locale] }}</h2>
    <p>{{ translations['dpa_contact_1'][props.locale] }}</p>
    <ul>
      <li>
        {{ translations['dpa_contact_2'][props.locale] }}
        <a :href="`${domain}/#support`" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
  </div>
</template>
