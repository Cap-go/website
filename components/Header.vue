<script setup lang="ts">
import { ref } from 'vue'

const config = useRuntimeConfig()
const brand = config.public.brand

const menuMobile = ref(false)
</script>

<template>
  <header class="relative py-2">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between">
        <div class="flex-shrink-0">
          <NuxtLink
            to="/"
            title="Capgo home" aria-label="Capgo home"
            class="flex text-4xl font-medium font-prompt items-center pr-3"
          >
            <img class="w-auto h-18 pr-1" loading="eager" height="72" width="133" :alt="`${brand} logo`" :title="`${brand} logo`" src="/capgo_logo.webp">
          </NuxtLink>
        </div>

        <div class="flex lg:hidden">
          <button type="button" class="text-white" title="Expand menu" @click="menuMobile = !menuMobile">
            <svg
              class="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div class="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
          <NuxtLink
            to="/pricing/"
            title="Pricing"
            class="text-base font-medium duration-200 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
          >
            Pricing
          </NuxtLink>
          <NuxtLink
            to="/blog/"
            title="Blog"
            class="text-base font-medium duration-200 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
          >
            Blog
          </NuxtLink>
          <NuxtLink
            to="https://docs.capgo.app/"
            title="Documentation"
            target="_blank"
            class="text-base font-medium duration-200 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
          >
            Documentation
          </NuxtLink>
          <NuxtLink
            to="https://web.capgo.app/login/"
            title="Login"
            target="_blank"
            class="text-base font-medium duration-200 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
          >
            Login
          </NuxtLink>

          <NuxtLink
            to="/register"
            target="_blank"
            title="Join discord"
            class="px-5 py-2 text-base font-semibold leading-7 text-gray-300 transition-all duration-200 bg-transparent border border-gray-300 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white"
            role="button"
          >
            Register
          </NuxtLink>
        </div>
      </div>
    </div>
    <div :class="{ hidden: !menuMobile }">
      <div class="px-2 pt-2 mt-2 pb-3 space-y-1 bg-gray-700">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <NuxtLink
          to="/pricing/"
          title="Pricing"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Pricing
        </NuxtLink>
        <NuxtLink
          to="/blog/"
          title="Blog"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Blog
        </NuxtLink>
        <NuxtLink
          to="https://docs.capgo.app/"
          title="Documentation"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Documentation
        </NuxtLink>
        <NuxtLink
          to="https://web.capgo.app/login"
          target="_blank"
          title="Login"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Login
        </NuxtLink>
        <NuxtLink
          to="/register"
          title="Communauty"
          target="_blank"
          class="bg-gray-900 text-white block rounded-md text-base font-medium px-5 py-2 text-base font-semibold leading-7 text-gray-300 transition-all duration-200 bg-transparent border border-gray-300 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white"
        >
          Register
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
