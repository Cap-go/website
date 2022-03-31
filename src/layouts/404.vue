<script setup lang="ts">
useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>
<template>
  <!-- https://images.unsplash.com/photo-1517963628607-235ccdd5476c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3571&q=80 -->
  <main class="min-h-full bg-cover bg-top sm:bg-top" style="background-image: url('https://images.unsplash.com/photo-1517963628607-235ccdd5476c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=0&con=0&sat=0')">
    <div class="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
      <p class="text-sm font-semibold text-gray-300 uppercase tracking-wide">
        404 error
      </p>
      <h1 class="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
        Uh oh! I think you’re lost.
      </h1>
      <p class="mt-2 text-lg font-medium text-gray-300">
        It looks like the page you’re looking for doesn't exist.
      </p>
      <div class="mt-6">
        <a href="/" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white"> Go back home </a>
      </div>
    </div>
  </main>
</template>
