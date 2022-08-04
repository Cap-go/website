<script setup lang="ts">
import { openMessenger } from '~/services/crisp'

const router = useRouter()
router.afterEach((to) => {
  if (to.hash && to.hash.startsWith('#support'))
    openMessenger()
})
router.currentRoute.value.hash.startsWith('#support') && openMessenger()
</script>

<template>
  <div class="overflow-x-hidden bg-gray-900 text-white">
    <Header />
    <router-view class="pt-10" />
    <Footer />
  </div>
</template>
