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
    <h1>{{ translations.disclaimer_title[props.locale] }}</h1>
    <p>{{ translations.disclaimer_last_updated[props.locale] }}</p>
    <h2>{{ translations.interpretation_and_definitions_title[props.locale] }}</h2>
    <h3>{{ translations.interpretation_title[props.locale] }}</h3>
    <p>{{ translations.interpretation_text[props.locale] }}</p>
    <h3>{{ translations.definitions_title[props.locale] }}</h3>
    <p>{{ translations.definitions_purpose[props.locale] }}</p>
    <ul>
      <li>
        <p v-html="translations.company_definition"></p>
      </li>
      <li>
        <p v-html="translations.service_definition"></p>
      </li>
      <li>
        <p v-html="translations.you_definition"></p>
      </li>
      <li>
        <p v-html="translations.application_definition"></p>
      </li>
    </ul>
    <h2>{{ translations.disclaimer_title[props.locale] }}</h2>
    <p>{{ translations.disclaimer_text[props.locale] }}</p>
    <p>{{ translations.company_no_responsibility[props.locale] }}</p>
    <p v-html="translations.company_no_liability"></p>
    <p>{{ translations.no_virus_warranty[props.locale] }}</p>
    <h2>{{ translations.external_links_disclaimer_title[props.locale] }}</h2>
    <p>{{ translations.external_links_disclaimer_text[props.locale] }}</p>
    <p>{{ translations.external_links_no_guarantee[props.locale] }}</p>
    <h2>{{ translations.errors_and_omissions_disclaimer_title[props.locale] }}</h2>
    <p>{{ translations.errors_and_omissions_disclaimer_text[props.locale] }}</p>
    <p>{{ translations.company_not_responsible[props.locale] }}</p>
    <h2>{{ translations.fair_use_disclaimer_title[props.locale] }}</h2>
    <p>{{ translations.fair_use_disclaimer_text[props.locale] }}</p>
    <p>{{ translations.fair_use_belief[props.locale] }}</p>
    <p>{{ translations.copyright_permission[props.locale] }}</p>
    <h2>{{ translations.views_expressed_disclaimer_title[props.locale] }}</h2>
    <p>{{ translations.views_expressed_disclaimer_text[props.locale] }}</p>
    <p>{{ translations.user_comments_responsibility[props.locale] }}</p>
    <h2>{{ translations.no_responsibility_disclaimer_title[props.locale] }}</h2>
    <p>{{ translations.no_responsibility_disclaimer_text[props.locale] }}</p>
    <p>{{ translations.company_no_liability_for_access[props.locale] }}</p>
    <h2>{{ translations.use_at_your_own_risk_disclaimer_title[props.locale] }}</h2>
    <p>{{ translations.use_at_your_own_risk_disclaimer_text[props.locale] }}</p>
    <p>{{ translations.company_no_liability_for_decisions[props.locale] }}</p>
    <h2>{{ translations.contact_us_title[props.locale] }}</h2>
    <p>{{ translations.contact_us_text[props.locale] }}</p>
    <ul>
      <li>
        {{ translations['contact_us_website'][props.locale] }}: <a :href="`${domain}#support`" rel="external nofollow noopener" target="_blank">{{ domain }}#support</a>
      </li>
    </ul>
  </div>
</template>
