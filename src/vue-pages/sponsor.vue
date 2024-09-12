<template>
  <div class="bg-gray-900 min-h-screen text-white py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">Capgo Sponsors</h1>
      <p class="text-xl text-gray-300 mb-8 max-w-3xl">
        Capgo is an open-source framework totally free to use thanks to our
        generous sponsors. If you use Capgo in your daily work and feel that it
        has made your life easier, please consider backing us.
      </p>
      <a
        href="https://github.com/sponsors/riderx"
        class="inline-block bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 mb-16"
      >
        Become a sponsor
      </a>

      <div v-if="platinumSponsors.length > 0" class="mb-16">
        <h2 class="text-2xl font-bold mb-8">Platinum</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          <SponsorLogo
            v-for="sponsor in platinumSponsors"
            :key="sponsor.id"
            :name="sponsor.name"
            :logo="sponsor.imageUrl"
            :url="sponsor.url"
          />
        </div>
      </div>

      <div v-if="goldSponsors.length > 0">
        <h2 class="text-2xl font-bold mb-8">Gold</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          <SponsorLogo
            v-for="sponsor in goldSponsors"
            :key="sponsor.id"
            :name="sponsor.name"
            :logo="sponsor.imageUrl"
            :url="sponsor.url"
          />
        </div>
      </div>

      <div v-if="silverSponsors.length > 0">
        <h2 class="text-2xl font-bold mb-8">Silver</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          <SponsorLogo
            v-for="sponsor in siverSponsors"
            :key="sponsor.id"
            :name="sponsor.name"
            :logo="sponsor.imageUrl"
            :url="sponsor.url"
          />
        </div>
      </div>

      <div v-if="bakerSponsors.length > 0">
        <h2 class="text-2xl font-bold mb-8">Baker</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          <SponsorLogo
            v-for="sponsor in bakerSponsors"
            :key="sponsor.id"
            :name="sponsor.name"
            :logo="sponsor.imageUrl"
            :url="sponsor.url"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SponsorLogo from '../components/SponsorLogo.vue'
const fetchSponsors = async () => {
  try {
    const response = await fetch('/sponsors.json')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return []
  }
}
const bakerSponsors = ref([])
const silverSponsors = ref([])
const goldSponsors = ref([])
const platinumSponsors = ref([])

onMounted(async () => {
  const sponsors = await fetchSponsors()
  console.log('sponsors', sponsors)
  bakerSponsors.value = sponsors.filter(sponsor => sponsor.tier === 'baker')
  silverSponsors.value = sponsors.filter(sponsor => sponsor.tier === 'silver')
  goldSponsors.value = sponsors.filter(sponsor => sponsor.tier === 'gold')
  platinumSponsors.value = sponsors.filter(sponsor => sponsor.tier === 'platinum')
})
</script>
