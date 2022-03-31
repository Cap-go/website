<script setup lang="ts">
import { useRouter } from 'vue-router'
const brand = import.meta.env.brand
const router = useRouter()
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: `${brand} | Capacitor auto update tooling`,
  meta: [
    { name: 'description', content: 'Send and manage OTA update for your capacitor app without store hassle, 5 min to install in your app.' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: `${brand} | Capacitor auto update tooling` },
    { name: 'twitter:title', content: `${brand} | Capacitor auto update tooling` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:description', content: 'App to test your capacitor app without store hassle.' },
    { name: 'twitter:domain', content: import.meta.env.domain },
    { name: 'twitter:image', content: `https://${import.meta.env.domain}/featured.webp` },
    { name: 'og:image:alt', content: `${brand} App illustration` },
    { name: 'og:image', content: `https://${import.meta.env.domain}/featured.webp` },
    { name: 'og:alt', content: `${brand} logo` },
    { name: 'og:url', content: `https://${import.meta.env.domain}/${router.currentRoute.value.path}` },
  ],
})
</script>

<template>
  <router-view />
</template>
