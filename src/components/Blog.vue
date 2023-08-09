<script setup lang="ts">
import { computed } from "vue";
import { formatTime } from "../config/app";

const props = defineProps<{
  link: string;
  title: string;
  image: string;
  description: string;
  date: string;
  tag: string;
}>();
const cannLink = computed(() => `/blog/${props.link}/`);
</script>

<template>
  <div class="overflow-hidden bg-gray-700 rounded-xl">
    <div>
      <div class="relative p-2">
        <a :href="cannLink" :title="title" class="block aspect-w-4 aspect-h-3">
          <img
            height="350"
            width="997"
            loading="lazy"
            class="object-cover w-full h-full rounded-lg"
            :src="image"
            :alt="`blog illustration ${title}`"
            :title="`blog illustration ${title}`"
          />
        </a>
        <div class="absolute top-4 left-4">
          <span
            class="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full shadow-lg"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <span
        class="px-5 block mt-3 text-sm font-semibold tracking-widest text-gray-300 uppercase"
      >
        {{ formatTime(date) }}
      </span>
      <p class="px-5 mt-3 text-2xl font-semibold">
        <a :href="cannLink" :title="title" class="text-gray-100">
          {{ title }}
        </a>
      </p>
      <a
        :href="cannLink"
        :title="title"
        class="m-5 inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-gray-200 transition-all duration-200 border-b-2 border-blue-300 hover:border-blue-600 focus:border-blue-600"
      >
        Read more
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
  </div>
</template>
