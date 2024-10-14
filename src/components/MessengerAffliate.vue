<script setup lang="ts">
import { openMessenger } from '@/services/bento'
import { initAffiliate } from '@/services/reflio'
import { onMounted } from 'vue'

onMounted(() => {
  initAffiliate()
  if (window.location.hash.includes('#support')) openMessenger()
})
</script>
