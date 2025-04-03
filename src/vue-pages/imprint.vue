<script setup lang="ts">
import * as m from "../paraglide/messages.js"

</script>

<template>
  <div class="relative bg-indigo-800">
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true" />
    </div>
    <div class="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8">
      <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{{ m.get_in_touch() }}</h1>
      <p class="max-w-3xl mt-6 text-xl text-indigo-100">
        {{ m.company_name() }}: Digital shift OÜ <br />
        {{ m.register_code() }}: 14236508 <br />
        {{ m.address() }}: Sepapaja 6, 15551 , Tallinn, Estonia <br />
        {{ m.hosting() }}: Cloudflare Egde, Netlify Egde<br />
        {{ m.data_storage() }}: AWS eu-west-2 (London) <br />
        {{ m.data_processing() }}: Cloudflare Egde and Netlify Egde, Supabase <br />
      </p>
    </div>
  </div>
</template>
