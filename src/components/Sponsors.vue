<template>
    <section class="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold text-white text-center mb-8">
          Our Sponsors
        </h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
          <div 
            v-for="sponsor in sponsors" 
            :key="sponsor.id" 
            @click="navigateToSponsor(sponsor.url)"
            class="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-700 cursor-pointer"
          >
            <div class="w-20 h-20 mb-3">
              <img 
                :src="sponsor.imageUrl" 
                :alt="sponsor.name" 
                class="w-full h-full object-cover rounded-full border-2 border-gray-600"
              />
            </div>
            <h3 class="text-sm font-medium text-white text-center">
              {{ sponsor.name }}
            </h3>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    sponsors: {
      type: Array,
      required: true
    }
  })
  
  const navigateToSponsor = (url) => {
    window.open(url, '_blank')
  }
  </script>