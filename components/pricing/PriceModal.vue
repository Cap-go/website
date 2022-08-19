<script setup lang="ts">
import { ref } from 'vue'
import Calculator from './Calculator.vue'
import PriceDetails from './PriceDetails.vue'

const isOpen = ref(false)
</script>

<template>
  <div class="container mx-auto -mt-8">
    <PriceDetails v-if="isOpen" />
    <Calculator v-else />
    <div class="flex justify-center">
      <button
        class="px-6 py-2 text-gray-900 underline rounded shadow"
        type="button"
        @click="isOpen = !isOpen"
      >
        {{ !isOpen ? "Pricing details" : "Calculator" }}
      </button>
    </div>
  </div>
</template>
