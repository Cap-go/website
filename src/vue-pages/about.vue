<script setup lang="ts">
import AboutMartin from '@/components/AboutMartin.vue';
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'
const props = defineProps<{
  locale: Locales
}>()
</script>

<template>
  <section class="relative pt-12 bg-gray-900 sm:pt-16 lg:pt-20">
    <div class="absolute inset-0 overflow-hidden">
      <img class="object-cover object-top w-full h-full transform opacity-20 -translate-y-80" src="/background-pattern.webp" alt="" />
    </div>

    <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="max-w-xl mx-auto text-center xl:max-w-3xl">
        <h2 class="text-3xl font-bold text-white sm:text-4xl xl:text-5xl font-pj">About Capgo</h2>
        <p class="max-w-xl mx-auto mt-4 text-base leading-7 text-gray-100 sm:mt-8 font-pj">Your Live Update Solution for Capacitor Apps</p>

        <div class="inline-block px-4 py-2 mt-8 text-sm font-semibold text-white bg-blue-600 rounded-full sm:mt-11">
          100% Open-Source
        </div>
      </div>
    </div>

    <div class="relative px-4 mx-auto mt-20 max-w-7xl sm:px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 class="text-2xl font-bold text-white mb-4">🚀 Welcome to Capgo</h3>
          <p class="text-gray-300 mb-6">
            Capgo is the cutting-edge live update system designed specifically for Capacitor applications.
            We empower developers to push updates instantly, ensuring your users always have the latest version of your app without the hassle of app store approvals.
          </p>

          <h3 class="text-2xl font-bold text-white mb-4">🌱 Our Story</h3>
          <p class="text-gray-300 mb-6">
            Capgo was born from a real need in the developer community. It all started with a GitHub issue where many developers voiced their frustration with the high costs of existing solutions like Appflow. This inspired me to create an affordable, efficient alternative.
          </p>
          <a href="https://capgo.app/blog/birth-of-capgo-my-challenging-journey-as-a-solo-maker/" class="text-blue-400 hover:underline">Read the full story of Capgo's challenging birth as a solo maker project</a>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-white mb-4">🔧 Key Features</h3>
          <ul class="list-disc list-inside text-gray-300 space-y-2 mb-6">
            <li>Instant updates: Deploy changes in real-time</li>
            <li>Version control: Manage multiple app versions effortlessly</li>
            <li>Rollback capability: Revert to previous versions if needed</li>
            <li>Analytics: Track update performance and user adoption</li>
            <li>Organization and app management: Thanks to our open-source nature</li>
          </ul>

          <h3 class="text-2xl font-bold text-white mb-4">🌟 Our Commitment</h3>
          <p class="text-gray-300 mb-6">
            As the largest ecosystem of open source plugins for Capacitor, we're committed to innovation, transparency, and community-driven development.
          </p>

          <h3 class="text-2xl font-bold text-white mb-4">💪 Practicing What We Preach</h3>
          <p class="text-gray-300 mb-6">
            We practice what we preach - Capgo is used to update its own apps, allowing us to continuously improve and refine our product through real-world usage.
          </p>

          <h3 class="text-2xl font-bold text-white mb-4">🚀 Our Dedication</h3>
          <p class="text-gray-300 mb-6">
            Since 2023, Capgo has been my full-time focus, ensuring dedicated development and support for our growing community of users.
          </p>
        </div>
      </div>
    </div>

    <div class="relative max-w-6xl mx-auto mt-20">
      <AboutMartin/>
    </div>
  </section>
</template>
