<template>
  <div class="min-h-screen bg-gray-900 px-4 py-16 text-white sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <h1 class="mb-4 text-4xl font-bold">Capgo Sponsors</h1>
      <p class="mb-8 max-w-3xl text-xl text-gray-300">
        Capgo is an open-source framework free to use thanks to our generous sponsors. If you use Capgo in your daily work and can't use our cloud service, please consider backing
        us.
      </p>
      <a
        href="https://github.com/sponsors/riderx"
        class="mb-16 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition-colors duration-300 hover:bg-gray-200"
      >
        Become a sponsor
      </a>
      <div v-if="platinumSponsors.length > 0" class="mb-16">
        <h2 class="mb-8 text-2xl font-bold">Platinum</h2>
        <div class="-mt-4 grid grid-cols-2 gap-8 gap-x-4 sm:grid-cols-3 md:grid-cols-4">
          <SponsorLogo size="24" v-for="sponsor in platinumSponsors" :key="sponsor.id" :name="sponsor.name" :logo="sponsor.imageUrl" :url="sponsor.url" />
        </div>
      </div>
      <div v-if="goldSponsors.length > 0">
        <h2 class="mb-8 text-2xl font-bold">Gold</h2>
        <div class="-mt-4 grid grid-cols-3 gap-8 gap-x-4 sm:grid-cols-4 md:grid-cols-5">
          <SponsorLogo size="20" v-for="sponsor in goldSponsors" :key="sponsor.id" :name="sponsor.name" :logo="sponsor.imageUrl" :url="sponsor.url" />
        </div>
      </div>
      <div v-if="silverSponsors.length > 0">
        <h2 class="mb-8 text-2xl font-bold">Silver</h2>
        <div class="-mt-4 grid grid-cols-4 gap-8 gap-x-4 sm:grid-cols-5 md:grid-cols-6">
          <SponsorLogo size="16" v-for="sponsor in siverSponsors" :key="sponsor.id" :name="sponsor.name" :logo="sponsor.imageUrl" :url="sponsor.url" />
        </div>
      </div>
      <div v-if="bakerSponsors.length > 0">
        <h2 class="mb-8 text-2xl font-bold">Baker</h2>
        <div class="ml-12 flex flex-wrap gap-8">
          <SponsorLogo size="14" v-for="sponsor in bakerSponsors" :key="sponsor.id" :name="sponsor.name" :logo="sponsor.imageUrl" :url="sponsor.url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SponsorLogo from '@/components/SponsorLogo.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  sponsors: {
    type: Array,
    required: true,
  },
})

const bakerSponsors = ref([])
const silverSponsors = ref([])
const goldSponsors = ref([])
const platinumSponsors = ref([])

onMounted(async () => {
  const sponsors = props.sponsors ?? []
  console.log('sponsors', sponsors)
  bakerSponsors.value = sponsors.filter((sponsor) => sponsor.tier === 'baker')
  silverSponsors.value = sponsors.filter((sponsor) => sponsor.tier === 'silver')
  goldSponsors.value = sponsors.filter((sponsor) => sponsor.tier === 'gold')
  platinumSponsors.value = sponsors.filter((sponsor) => sponsor.tier === 'platinum')
})
</script>
