<script setup lang="ts">
import { openMessenger } from '~/services/crisp'
import { createMetaImage } from '~~/services/meta'

const router = useRouter()
router.afterEach((to) => {
  if (to.hash && to.hash.startsWith('#support'))
    openMessenger()
})
router.currentRoute.value.hash.startsWith('#support') && openMessenger()

const config = useRuntimeConfig()
const route = useRoute()
const image = `${config.public.domain}/capgo_banner.png`
useHead(() => ({
  link: [
    {
      rel: 'alternate',
      title: 'Capgo',
      href: `${config.public.domain}${route.fullPath}`,
    },
    {
      rel: 'canonical',
      title: 'Capgo',
      href: `${config.public.domain}${route.fullPath}`,
    },
  ],
  meta: [
    {
      hid: 'og:url',
      property: 'og:url',
      content: `${config.public.domain}${route.fullPath}`,
    },
    ...createMetaImage(image, 'Capgo banner'),
  ],
}))
</script>

<template>
  <div class="overflow-x-hidden bg-gray-900 text-white">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
