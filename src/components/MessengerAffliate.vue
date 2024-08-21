<script setup lang="ts">
import { onMounted } from 'vue'
import { initAffiliate } from '../services/reflio'
import { openMessenger } from '../services/bento'

onMounted(() => {
  initAffiliate()
  if (window.location.hash.includes('#support')) openMessenger()
})
</script>
