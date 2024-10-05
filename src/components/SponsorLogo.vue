<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center hover:scale-105 transition duration-300 hover:bg-gray-800 m-3 rounded-lg p-2">
    <div :class="['bg-white rounded-full flex items-center justify-center mb-2 overflow-hidden', sizeClass]">
      <img :src="logo" :alt="name" class="w-full h-full object-cover" />
    </div>
    <span class="text-sm text-center">{{ name }}</span>
  </a>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 20,
    validator: (value) => [24, 20, 16, 14].includes(value),
  },
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 24:
      return 'w-24 h-24'
    case 20:
      return 'w-20 h-20'
    case 16:
      return 'w-16 h-16'
    case 14:
      return 'w-14 h-14'
    default:
      return 'w-20 h-20'
  }
})
</script>
