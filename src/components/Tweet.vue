<script setup lang="ts">
defineProps({
  tweet: {
    type: Object,
    required: true,
  },
})
function messageFormatter(message: string) {
  // find all @mentions and make it in a span with class text-blue-400
  return message.replace(/(@\w+)/g, '<span class="text-blue-400">$1</span>').replace('\n', '<br/>')
}
</script>

<template>
  <div
    class="p-4 mx-auto md:mx-3 mt-0 mb-6 max-w-80 md:max-w-72 align-baseline border border-solid border-zinc-700 bg-gray-800"
    style="border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
  >
    <div class="flex justify-between p-0 m-0 align-baseline border-0 border-solid">
      <div class="grid gap-3 items-center p-0 mx-0 mt-0 mb-3 align-baseline border-0 border-solid" style="grid-template-columns: auto 1fr">
        <picture class="border-0 border-solid">
          <img
            height="44"
            width="44"
            loading="lazy"
            class="block p-0 m-0 w-10 max-w-full h-10 align-middle border-0 border-solid"
            :src="tweet.image"
            :title="`${tweet.name}'s avatar`"
            :alt="`${tweet.name}'s avatar`"
            style="border-radius: 22px"
          />
        </picture>
        <div class="p-0 m-0 align-baseline border-0 border-solid">
          <p class="p-0 m-0 text-base font-normal tracking-normal leading-relaxed text-gray-200 align-baseline border-0 border-solid">
            <span class="p-0 m-0 font-semibold align-baseline border-0 border-solid">{{ tweet.name }}</span>
          </p>
          <p class="p-0 m-0 text-base font-normal tracking-normal leading-relaxed align-baseline border-0 border-solid text-zinc-400">@{{ tweet.handle }}</p>
        </div>
      </div>
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20" role="img" color="#03A9F4" size="10" class="block align-middle border-0 border-solid text-sky-500">
        <title class="border-0 border-solid">Twitter-icon</title>
        <path
          d="M6.283 18.75c7.546 0 11.676-6.254 11.676-11.668 0-.176 0-.352-.008-.527A8.357 8.357 0 0020 4.426a8.322 8.322 0 01-2.36.648 4.126 4.126 0 001.808-2.271 8.167 8.167 0 01-2.61.992A4.107 4.107 0 009.74 6.603c0 .32.04.631.105.935a11.657 11.657 0 01-8.46-4.286A4.111 4.111 0 002.658 8.73 4.153 4.153 0 01.8 8.218v.056a4.11 4.11 0 003.29 4.022 4.007 4.007 0 01-1.08.144c-.265 0-.521-.024-.77-.072a4.103 4.103 0 003.834 2.847 8.235 8.235 0 01-5.098 1.76A7.9 7.9 0 010 16.919a11.68 11.68 0 006.283 1.831z"
          fill="#03A9F4"
          class="border-0 border-solid"
        />
      </svg>
    </div>
    <p class="p-0 m-0 text-base font-normal tracking-normal leading-relaxed text-gray-200 align-baseline whitespace-pre-line border-0 border-solid">
      <span class="p-0 m-0 align-baseline border-0 border-solid" v-html="messageFormatter(tweet.message)" />
    </p>
  </div>
</template>
