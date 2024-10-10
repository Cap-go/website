<script setup lang="ts">
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{
  locale: Locales
}>()
</script>

<template>
  <div class="relative bg-indigo-800">
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true" />
    </div>
    <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{{ translations['get_in_touch'][props.locale] }}</h1>
      <p class="mt-6 max-w-3xl text-xl text-indigo-100">
        {{ translations['company_name'][props.locale] }}: Digital shift OÜ <br />
        {{ translations['register_code'][props.locale] }}: 14236508 <br />
        {{ translations['address'][props.locale] }}: Sepapaja 6, 15551 , Tallinn, Estonia <br />
        {{ translations['hosting'][props.locale] }}: Cloudflare Egde, Netlify Egde<br />
        {{ translations['data_storage'][props.locale] }}: AWS eu-west-2 (London) <br />
        {{ translations['data_processing'][props.locale] }}: Cloudflare Egde and Netlify Egde, Supabase <br />
      </p>
    </div>
  </div>
</template>
