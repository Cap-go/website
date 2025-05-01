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
    <h1>{{ m.disclaimer_title({}, { locale: props.locale }) }}</h1>
    <p>{{ m.disclaimer_last_updated({}, { locale: props.locale }) }}</p>
    <h2>{{ m.interpretation_and_definitions_title({}, { locale: props.locale }) }}</h2>
    <h3>{{ m.interpretation_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.interpretation_text({}, { locale: props.locale }) }}</p>
    <h3>{{ m.definitions_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.definitions_purpose({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        <p v-html="m.company_definition({}, { locale: props.locale })"></p>
      </li>
      <li>
        <p v-html="m.service_definition({}, { locale: props.locale })"></p>
      </li>
      <li>
        <p v-html="m.you_definition({}, { locale: props.locale })"></p>
      </li>
      <li>
        <p v-html="m.application_definition({ brand: config.public.brand }, { locale: props.locale })"></p>
      </li>
    </ul>
    <h2>{{ m.disclaimer_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.disclaimer_text({}, { locale: props.locale }) }}</p>
    <p>{{ m.company_no_responsibility({}, { locale: props.locale }) }}</p>
    <p v-html="m.company_no_liability({}, { locale: props.locale })"></p>
    <p>{{ m.no_virus_warranty({}, { locale: props.locale }) }}</p>
    <h2>{{ m.external_links_disclaimer_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.external_links_disclaimer_text({}, { locale: props.locale }) }}</p>
    <p>{{ m.external_links_no_guarantee({}, { locale: props.locale }) }}</p>
    <h2>{{ m.errors_and_omissions_disclaimer_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.errors_and_omissions_disclaimer_text({}, { locale: props.locale }) }}</p>
    <p>{{ m.company_not_responsible({}, { locale: props.locale }) }}</p>
    <h2>{{ m.fair_use_disclaimer_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.fair_use_disclaimer_text({}, { locale: props.locale }) }}</p>
    <p>{{ m.fair_use_belief({}, { locale: props.locale }) }}</p>
    <p>{{ m.copyright_permission({}, { locale: props.locale }) }}</p>
    <h2>{{ m.views_expressed_disclaimer_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.views_expressed_disclaimer_text({}, { locale: props.locale }) }}</p>
    <p>{{ m.user_comments_responsibility({}, { locale: props.locale }) }}</p>
    <h2>{{ m.no_responsibility_disclaimer_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.no_responsibility_disclaimer_text({}, { locale: props.locale }) }}</p>
    <p>{{ m.company_no_liability_for_access({}, { locale: props.locale }) }}</p>
    <h2>{{ m.use_at_your_own_risk_disclaimer_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.use_at_your_own_risk_disclaimer_text({}, { locale: props.locale }) }}</p>
    <p>{{ m.company_no_liability_for_decisions({}, { locale: props.locale }) }}</p>
    <h2>{{ m.contact_us_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.contact_us_text({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        {{ m.contact_us_website({}, { locale: props.locale }) }}: <a href="mailto:support@capgo.app" rel="external nofollow noopener" target="_blank">{{ domain }}#support</a>
      </li>
    </ul>
  </div>
</template>
