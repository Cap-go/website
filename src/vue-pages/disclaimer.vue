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
    <h1>{{ m.disclaimer_title() }}</h1>
    <p>{{ m.disclaimer_last_updated() }}</p>
    <h2>{{ m.interpretation_and_definitions_title() }}</h2>
    <h3>{{ m.interpretation_title() }}</h3>
    <p>{{ m.interpretation_text() }}</p>
    <h3>{{ m.definitions_title() }}</h3>
    <p>{{ m.definitions_purpose() }}</p>
    <ul>
      <li>
        <p v-html="m.company_definition"></p>()
      </li>
      <li>
        <p v-html="m.service_definition"></p>()
      </li>
      <li>
        <p v-html="m.you_definition"></p>()
      </li>
      <li>
        <p v-html="m.application_definition"></p>()
      </li>
    </ul>
    <h2>{{ m.disclaimer_title() }}</h2>
    <p>{{ m.disclaimer_text() }}</p>
    <p>{{ m.company_no_responsibility() }}</p>
    <p v-html="m.company_no_liability()"></p>()
    <p>{{ m.no_virus_warranty() }}</p>
    <h2>{{ m.external_links_disclaimer_title() }}</h2>
    <p>{{ m.external_links_disclaimer_text() }}</p>
    <p>{{ m.external_links_no_guarantee() }}</p>
    <h2>{{ m.errors_and_omissions_disclaimer_title() }}</h2>
    <p>{{ m.errors_and_omissions_disclaimer_text() }}</p>
    <p>{{ m.company_not_responsible() }}</p>
    <h2>{{ m.fair_use_disclaimer_title() }}</h2>
    <p>{{ m.fair_use_disclaimer_text() }}</p>
    <p>{{ m.fair_use_belief() }}</p>
    <p>{{ m.copyright_permission() }}</p>
    <h2>{{ m.views_expressed_disclaimer_title() }}</h2>
    <p>{{ m.views_expressed_disclaimer_text() }}</p>
    <p>{{ m.user_comments_responsibility() }}</p>
    <h2>{{ m.no_responsibility_disclaimer_title() }}</h2>
    <p>{{ m.no_responsibility_disclaimer_text() }}</p>
    <p>{{ m.company_no_liability_for_access() }}</p>
    <h2>{{ m.use_at_your_own_risk_disclaimer_title() }}</h2>
    <p>{{ m.use_at_your_own_risk_disclaimer_text() }}</p>
    <p>{{ m.company_no_liability_for_decisions() }}</p>
    <h2>{{ m.contact_us_title() }}</h2>
    <p>{{ m.contact_us_text() }}</p>
    <ul>
      <li>
        {{ m.contact_us_website() }}: <a :href="`${domain}#support`" rel="external nofollow noopener" target="_blank">{{ domain }}#support</a>
      </li>
    </ul>
  </div>
</template>
