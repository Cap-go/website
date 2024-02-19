<script setup lang="ts">
import { openMessenger } from '../../services/chatwoot'
</script>

<template>
  <section class="py-10 bg-gray-900 sm:py-16 lg:py-24">
    <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Questions & Answers</h2>
        <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300">Explore the common questions and answers about Capgo</p>
      </div>

      <div class="grid grid-cols-1 mt-12 md:mt-20 md:grid-cols-2 gap-y-16 gap-x-20">
        <div class="flex items-start">
          <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">How are Monthly Active Users (MAU) counted?</p>
            <p class="mt-4 text-base text-gray-400">
              We count MAU (Monthly Active Users) by tracking unique users who open your app within a 30-day period. Each user is counted once, regardless of how many times they
              engage with the app.
            </p>
            <p class="mt-4 text-base text-gray-400">
              At Capgo, we don't count emulators and dev builds in your usage. Learn more about this
              <a class="border-b-2 border-blue-600 border-blue-600 hover:text-blue-600 focus:text-blue-600" href="/blog/how-your-usage-is-counted/"> here.</a>
            </p>
          </div>
        </div>

        <div class="flex items-start">
          <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">What does storage mean?</p>
            <p class="mt-4 text-base text-gray-400">
              Storage, specifically edge storage, refers to the total capacity Capgo provides at edge locations to store all your update bundles. This ensures that users receive
              the latest version of your app or service quickly and efficiently.
            </p>
          </div>
        </div>

        <div class="flex items-start">
          <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">How is Bandwidth Counted ?</p>
            <p class="mt-4 text-base text-gray-400">
              At Capgo, we measure bandwidth by tracking the amount of data transmitted between the storage location and user devices through edge servers. This helps us deliver
              real-time updates.
            </p>
          </div>
        </div>

        <div class="flex items-start">
          <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
            <span class="text-lg font-semibold text-white">?</span>
          </div>
          <div class="ml-4">
            <p class="text-xl font-semibold text-white">Not sure about your number of active users?</p>
            <p class="mt-4 text-base text-gray-400">
              If you're unsure about the number of active users you have and worried about reaching your plan limit, take advantage of Capgo's free trial. It's a great way to test
              our service, find the right plan, avoid unexpected charges, and ensure everything works smoothly.
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center mt-12 md:mt-20">
        <div class="px-8 py-4 text-center bg-gray-800 rounded-full">
          <p class="text-gray-50">
            Didn’t find the answer you were looking for?
            <button class="text-yellow-300 transition-all duration-200 hover:text-yellow-400 focus:text-yellow-400 hover:underline" @click="openMessenger()">
              Contact our support
            </button>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
