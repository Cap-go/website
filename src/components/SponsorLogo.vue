<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center">
    <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-2 overflow-hidden">
      <img :src="logo" :alt="name" class="w-full h-full object-cover" />
    </div>
    <span class="text-sm text-center">{{ name }}</span>
  </a>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})
</script>
