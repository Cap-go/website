<script setup lang="ts">
// import { useRuntimeConfig } from '../config/app'

// const config = useRuntimeConfig()
// const brand = config.public.brand
// useHead({
//   title: `${brand} | Imprint`,
//   meta: [
//     { name: 'title', hid: 'title', content: 'Capgo imprint' },
//     { name: 'og:title', hid: 'og:title', content: 'Capgo imprint' },
//     { name: 'description', hid: 'description', content: `Find the info of ${brand} compnay here` },
//     { name: 'og:description', hid: 'og:description', content: `Find the info of ${brand} compnay here` },
//     { name: 'robots', content: 'noindex, nofollow' },
//   ],
// })
// const domain = config.public.baseUrl
</script>

<template>
  <div class="relative bg-indigo-800">
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true" />
    </div>
    <div class="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Get in touch</h1>
      <p class="mt-6 max-w-3xl text-xl text-indigo-100">
        Company name: Digital shift OÜ <br />
        Register code : 14236508 <br />
        Address: Sepapaja 6, 15551 , Tallinn, Estonia <br />
        Hosting: Cloudflare Egde, Netlify Egde<br />
        Data storage: AWS eu-west-2 (London) <br />
        Data processing: Cloudflare Egde and Netlify Egde, Supabase <br />
      </p>
    </div>
  </div>
</template>
