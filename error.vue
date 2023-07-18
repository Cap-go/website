<script setup lang="ts">
import { openMessenger } from '~/services/crisp'

useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
const router = useRouter()
router.afterEach((to) => {
  if (to.hash && to.hash.startsWith('#support'))
    openMessenger()
})
router.currentRoute.value.hash.startsWith('#support') && openMessenger()
</script>

<template>
  <div class="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="max-w-max mx-auto">
      <main class="sm:flex">
        <p class="text-4xl font-extrabold text-cornFlower-600 sm:text-5xl">
          404
        </p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Page not found
            </h1>
            <p class="mt-1 text-base text-gray-500">
              Please check the URL in the address bar and try again.
            </p>
          </div>
          <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <NuxtLink to="/" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cornFlower-600 hover:bg-cornFlower-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cornFlower-500">
              Go back home
              </NuxtLink>
              <NuxtLink to="#support" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-cornFlower-700 bg-cornFlower-100 hover:bg-cornFlower-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cornFlower-500">
                Contact support
              </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
