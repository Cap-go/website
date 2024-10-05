<script setup lang="ts">
import { onMounted } from 'vue'
import { openMessenger } from '@/services/bento'
import { initAffiliate } from '@/services/reflio'

onMounted(() => {
  initAffiliate()
  if (window.location.hash.includes('#support')) openMessenger()
})
</script>
