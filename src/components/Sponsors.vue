<template>
  <section class="bg-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-4">
        Our Sponsors
      </h2>
      <p class="text-lg text-gray-600 text-center mb-8">
        Open-source sponsorship drives innovation and supports our community. We're grateful for our sponsors' support.
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 mb-12">
        <div 
          v-for="sponsor in sponsors" 
          :key="sponsor.id" 
          @click="navigateToSponsor(sponsor.url)"
          class="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 cursor-pointer"
        >
          <div class="w-20 h-20 mb-3">
            <img 
              :src="sponsor.imageUrl" 
              :alt="sponsor.name" 
              class="w-full h-full object-cover rounded-full border-2 border-gray-300"
            />
          </div>
          <h3 class="text-sm font-medium text-gray-900 text-center">
            {{ sponsor.name }}
          </h3>
        </div>
      </div>

      <div class="text-center">
        <a 
          href="#become-sponsor" 
          class="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Become a Sponsor
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  sponsors: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(sponsor => 
        typeof sponsor.id === 'number' &&
        typeof sponsor.name === 'string' &&
        typeof sponsor.imageUrl === 'string' &&
        typeof sponsor.url === 'string'
      )
    }
  }
})

const navigateToSponsor = (url) => {
  window.open(url, '_blank')
}
</script>
