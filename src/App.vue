<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Captime | Crossfit timer',
  meta: [
    { name: 'description', content: 'The best crossfit timer you can find. Available in iOS and Android.' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: 'Captime | Crossfit timer' },
    { name: 'twitter:title', content: 'Captime | Crossfit timer' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:description', content: 'The best crossfit timer you can find. Available in iOS and Android.' },
    { name: 'twitter:domain', content: import.meta.env.domain },
    { name: 'twitter:image', content: `https://${import.meta.env.domain}/alternative_to_1.webp` },
    { name: 'og:image:alt', content: 'Crossfit Time App illustration' },
    { name: 'og:image', content: `https://${import.meta.env.domain}/alternative_to_1.webp` },
    { name: 'og:alt', content: 'crossfit image' },
    { name: 'og:url', content: `https://${import.meta.env.domain}/${router.currentRoute.value.path}` },
  ],
})
</script>

<template>
  <router-view />
</template>
