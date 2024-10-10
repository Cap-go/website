<script setup lang="ts">
defineProps({
  tweet: {
    type: Object,
    required: true,
  },
})

const messageFormatter = (message: string) => message.replace(/(@\w+)/g, '<span class="text-blue-400">$1</span>').replace('\n', '<br/>')
</script>

<template>
  <div
    class="mx-auto mb-6 mt-0 max-w-80 border border-solid border-zinc-700 bg-gray-800 p-4 align-baseline md:mx-3 md:max-w-72"
    style="border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
  >
    <div class="m-0 flex justify-between border-0 border-solid p-0 align-baseline">
      <div class="mx-0 mb-3 mt-0 grid items-center gap-3 border-0 border-solid p-0 align-baseline" style="grid-template-columns: auto 1fr">
        <picture class="border-0 border-solid">
          <img
            height="44"
            width="44"
            loading="lazy"
            :src="tweet.image"
            style="border-radius: 22px"
            :alt="`${tweet.name}'s avatar`"
            :title="`${tweet.name}'s avatar`"
            class="m-0 block h-10 w-10 max-w-full border-0 border-solid p-0 align-middle"
          />
        </picture>
        <div class="m-0 border-0 border-solid p-0 align-baseline">
          <p class="m-0 border-0 border-solid p-0 align-baseline text-base font-normal leading-relaxed tracking-normal text-gray-200">
            <span class="m-0 border-0 border-solid p-0 align-baseline font-semibold">{{ tweet.name }}</span>
          </p>
          <p class="m-0 border-0 border-solid p-0 align-baseline text-base font-normal leading-relaxed tracking-normal text-zinc-400">@{{ tweet.handle }}</p>
        </div>
      </div>
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20" role="img" color="#03A9F4" size="10" class="block border-0 border-solid align-middle text-sky-500">
        <title class="border-0 border-solid">twitter-icon</title>
        <path
          d="M6.283 18.75c7.546 0 11.676-6.254 11.676-11.668 0-.176 0-.352-.008-.527A8.357 8.357 0 0020 4.426a8.322 8.322 0 01-2.36.648 4.126 4.126 0 001.808-2.271 8.167 8.167 0 01-2.61.992A4.107 4.107 0 009.74 6.603c0 .32.04.631.105.935a11.657 11.657 0 01-8.46-4.286A4.111 4.111 0 002.658 8.73 4.153 4.153 0 01.8 8.218v.056a4.11 4.11 0 003.29 4.022 4.007 4.007 0 01-1.08.144c-.265 0-.521-.024-.77-.072a4.103 4.103 0 003.834 2.847 8.235 8.235 0 01-5.098 1.76A7.9 7.9 0 010 16.919a11.68 11.68 0 006.283 1.831z"
          fill="#03A9F4"
          class="border-0 border-solid"
        />
      </svg>
    </div>
    <p class="m-0 whitespace-pre-line border-0 border-solid p-0 align-baseline text-base font-normal leading-relaxed tracking-normal text-gray-200">
      <span class="m-0 border-0 border-solid p-0 align-baseline" v-html="messageFormatter(tweet.message)" />
    </p>
  </div>
</template>
