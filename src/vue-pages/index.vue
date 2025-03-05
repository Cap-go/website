<script setup lang="ts">
import CIExpert from '@/components/CIExpert.vue'
import Orgs from '@/components/Orgs.vue'
import Testimonials from '@/components/Testimonials.vue'
import { useRuntimeConfig } from '@/config/app'
import { type Locales } from '@/services/locale'
import { shortNumber } from '@/services/misc'
import * as m from "../paraglide/messages.js"
import { getRelativeLocaleUrl } from 'astro:i18n'
import dayjs from 'dayjs'
import { reactive } from 'vue'


const config = useRuntimeConfig()
const brand = config.public.brand || ''
const props = defineProps<{ locale: Locales }>()


const stats = reactive({
  stars: shortNumber(499),
  apps: shortNumber(1400),
  updates: shortNumber(947593631),
})

fetch(`${config.public.baseApiUrl}/private/website_stats`).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      stats.apps = shortNumber(data.apps ?? shortNumber(1400))
      stats.updates = shortNumber(data.updates ?? shortNumber(947593631))
      stats.stars = shortNumber(data.stars ?? shortNumber(499))
    })
  }
})
</script>

<template>
  <div>
    <div>
      <!-- Animated teleport lines -->
      <div class="absolute inset-0 teleport-lines-container">
      <div v-for="i in 20" :key="i" class="teleport-line"
           :style="{
             top: `${(i * 5) - 2}%`,
             animationDelay: `${Math.random() * 3}s`,
             height: `${Math.random() * 1 + 1}px`,
             opacity: Math.random() * 0.5 + 0.3
           }">
      </div>
    </div>
    
    <!-- Glowing portal effect -->
    <div class="absolute portal-glow"></div>
    
    <!-- Vertical data streams -->
    <div class="absolute inset-0 data-streams-container">
      <div v-for="i in 10" :key="`stream-${i}`" class="data-stream"
           :style="{
             left: `${i * 10}%`,
             animationDuration: `${Math.random() * 4 + 6}s`,
             animationDelay: `${Math.random() * 2}s`,
             opacity: Math.random() * 0.3 + 0.1
           }">
      </div>
    </div>
    <section class="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">

      <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <p class="inline-flex px-4 py-2 text-base border border-gray-200 rounded-full font-pj">{{ m.open_source() }}</p>
          <h1 class="mt-5 text-3xl font-bold leading-tight font-pj sm:text-4xl sm:leading-tight lg:leading-tight xl:text-5xl">
            {{ m.instant_updates_for_capacitor() }}
          </h1>
          <h2 class="max-w-md mx-auto mt-6 text-base leading-7 text-gray-400 font-inter">
            {{ m.ship_updates_fixes_changes_and_features() }}
            <br /><span class="font-bold">{{ m.within_minutes() }}</span
            ><br />
          </h2>
          <div class="relative inline-flex mt-10 group">
            <div
              class="transitiona-all animate-tilt absolute -inset-px rounded-xl bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-70 blur-lg duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200"
            />
            <a
              :href="getRelativeLocaleUrl(props.locale, 'register')"
              title="Get quote now"
              target="_blank"
              class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              role="button"
            >
              {{ m.try_for_free() }}
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="py-12 bg-gray-900 sm:py-16 lg:py-20">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 px-16 mx-auto text-center gap-x-12 gap-y-8 sm:grid-cols-3 sm:px-0 lg:max-w-4xl lg:gap-x-24">
          <div>
            <svg class="w-auto mx-auto text-white h-14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path
                d="M228.7 299.3C222.4 293.1 222.4 282.9 228.7 276.7C234.9 270.4 245.1 270.4 251.3 276.7L304 329.4V176C304 167.2 311.2 160 320 160C328.8 160 336 167.2 336 176V329.4L388.7 276.7C394.9 270.4 405.1 270.4 411.3 276.7C417.6 282.9 417.6 293.1 411.3 299.3L331.3 379.3C325.1 385.6 314.9 385.6 308.7 379.3L228.7 299.3zM272 32C331.5 32 384.1 61.55 416 106.8C430.5 99.87 446.8 96 464 96C525.9 96 576 146.1 576 208C576 218.7 574.5 228.1 571.7 238.8C612.3 260.2 640 302.9 640 352C640 422.7 582.7 480 512 480H144C64.47 480 0 415.5 0 336C0 273.2 40.15 219.9 96.17 200.1C100.3 106.6 177.4 32 272 32zM272 64C194.6 64 131.5 125 128.1 201.5C127.6 214.6 119.1 225.1 106.8 230.3C63.18 245.7 32 287.2 32 336C32 397.9 82.14 448 144 448H512C565 448 608 405 608 352C608 315.2 587.3 283.2 556.8 267.1C543.4 259.1 536.8 244.5 540.9 229.1C542.9 223 544 215.7 544 208C544 163.8 508.2 128 464 128C451.7 128 440.1 130.8 429.7 135.7C415.7 142.4 398.8 137.9 389.8 125.2C363.7 88.12 320.7 64 272 64V64z"
              />
            </svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">{{ m.instant_updates() }}</h3>
            <p class="mt-3 text-sm text-gray-400">
              {{ m.reach_users_now_not_weeks_later() }}
            </p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-auto mx-auto text-white h-14" fill="currentColor" viewBox="0 0 448 512">
              <path
                d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4L127 384.5zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2-20.5-35.4c-5.5-9.6-2.2-21.8 7.3-27.3 9.6-5.5 21.8-2.2 27.3 7.3l8.9 15.4 8.9-15.4c5.5-9.6 17.8-12.8 27.3-7.3 9.6 5.5 12.8 17.8 7.3 27.3l-85.8 148.6h62.1c20.2 0 31.5 23.7 22.7 40zm98.1 0h-29l19.6 33.9c5.5 9.6 2.2 21.8-7.3 27.3-9.6 5.5-21.8 2.2-27.3-7.3-32.9-56.9-57.5-99.7-74-128.1-16.7-29-4.8-58 7.1-67.8 13.1 22.7 32.7 56.7 58.9 102h52c11 0 20 9 20 20 0 11.1-9 20-20 20z"
              />
            </svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">{{ m.app_store_compliant() }}</h3>
            <p class="mt-3 text-sm text-gray-400">{{ m.compliant_with_apple_and_android_requirements() }}</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-auto mx-auto text-white h-14" fill="currentColor" viewBox="0 0 576 512">
              <path
                d="M304 480H64c-17.67 0-32-14.33-32-32V64c0-17.67 14.33-32 32-32h128v112C192 170.5 213.5 192 240 192h122.5C374.4 192 384 182.4 384 170.5c0-16.97-6.742-33.25-18.74-45.25L258.7 18.75C246.7 6.742 230.5 0 213.5 0H64C28.65 0 .0007 28.65 .0007 64l.0059 384c0 35.35 28.65 64 64 64H304c8.836 0 16-7.164 16-16C320 487.2 312.8 480 304 480zM224 34.08c4.477 1.566 8.664 3.846 12.12 7.299l106.5 106.5C346.1 151.3 348.4 155.5 349.9 160H240C231.2 160 224 152.8 224 144V34.08zM528 320L528 256c0-35.28-28.72-64-64-64s-64 28.72-64 64v64c-26.51 0-48 21.49-48 48v96c0 26.51 21.49 48 48 48h128c26.51 0 48-21.49 48-48v-96C576 341.5 554.5 320 528 320zM432 256c0-17.66 14.34-32 32-32s32 14.34 32 32v64h-64V256zM544 464c0 8.822-7.178 16-16 16h-128c-8.822 0-16-7.178-16-16v-96c0-8.822 7.178-16 16-16h128c8.822 0 16 7.178 16 16V464z"
              />
            </svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">{{ m.end_to_end_encryption() }}</h3>
            <p class="mt-3 text-sm text-gray-400">{{ m.only_your_users_can_decrypt_your_updates_no_one_else() }}</p>
          </div>
        </div>
        <h3 class="hidden max-w-xl mx-auto mt-12 text-xl leading-7 text-gray-400 font-inter md:block">
          <span class="font-bold">&#128075; {{ m.no_more_wait() }}</span>
          {{ m.for_apple_and_google_app_updates_distribution() }}
        </h3>
        <h3 class="block max-w-sm mx-auto mt-12 text-xl leading-7 text-center text-gray-400 font-inter md:hidden">
          <span class="font-bold">&#128075; {{ m.no_more_wait() }}</span>
        </h3>
        <h3 class="block max-w-sm mx-auto text-xl leading-7 text-center text-gray-400 font-inter md:hidden">
          {{ m.for_apple_and_google_app_updates_distribution() }}
        </h3>
      </div>
    </section>
  </div>
    <section class="relative py-12 overflow-hidden bg-white sm:py-16 lg:py-20 xl:py-32">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid items-center grid-cols-1 xl:grid-cols-2">
          <div class="px-8 text-center md:mx-auto md:max-w-2xl xl:max-w-none xl:pr-16 xl:text-left">
            <h2 class="text-3xl font-bold text-gray-900 font-pj sm:text-4xl xl:text-5xl">{{ m.youre_in_good_company() }}</h2>
            <p class="mt-6 text-lg font-normal text-gray-800 font-pj">
              {{ m.capgo_enables_development_teams_at_some_of_the_most_innovative_companies() }}
            </p>
          </div>
          <div class="relative mt-8 sm:mt-12 lg:mx-auto lg:max-w-4xl xl:mt-0 xl:max-w-none">
            <div class="absolute inset-16">
              <div
                class="w-full h-full mx-auto rotate-180 rounded-3xl opacity-30 blur-lg filter"
                style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
              />
            </div>
            <div class="relative space-y-5">
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" class="w-auto h-auto max-h-20" src="/kick_logo.webp" alt="Kick" title="Kick" />
                </div>
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" class="w-auto h-auto max-h-20" src="/pizza_hut_logo.webp" alt="Pizza hut" title="Pizza hut" />
                </div>
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" class="w-auto h-auto max-h-20" src="/remnote_logo.svg" alt="remnote" title="remnote" />
                </div>
              </div>
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:translate-x-6">
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" class="w-auto h-auto max-h-20" src="/revel_logo.svg" alt="hello revel" title="hello revel" />
                </div>
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" class="w-auto h-auto max-h-20" src="/xbe_logo.webp" alt="x-b-e" title="x-b-e" />
                </div>
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" class="w-auto h-auto max-h-20" src="/suez_logo.webp" alt="suez moneau" title="suez moneau" />
                </div>
              </div>
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:translate-x-12">
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" class="w-auto h-auto max-h-20" src="/irec_logo.webp" alt="irec" title="irec" />
                </div>
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" class="w-auto h-auto max-h-20" src="/vella_logo.svg" alt="vella" title="vella" />
                </div>
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" class="w-auto h-auto max-h-20" src="/ourliving_logo.webp" alt="ourliving" title="ourliving" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-500 xl:bg-gradient-to-r" />
    </section>
    <section class="relative py-20 bg-gray-800 md:my-20">
      <svg class="absolute hidden opacity-30 md:-left-1/3 md:-top-5 md:m-0 md:block lg:-left-16" width="404" height="392" fill="none" viewBox="0 0 404 392">
        <defs>
          <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
      </svg>
      <svg class="absolute hidden opacity-30 md:-bottom-5 md:-right-1/3 md:m-0 md:block lg:-right-16" width="404" height="392" fill="none" viewBox="0 0 404 392">
        <defs>
          <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
      </svg>
      <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
            {{ m.apps_with_20m_users() }}
          </h2>
          <h2 class="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
            {{ m.use_capgo() }}
          </h2>
          <p class="mt-3 text-base leading-relaxed text-gray-300 md:mt-8">
            {{ m.our_numbers_are_shared_transparently_since_december_2021() }}
          </p>
          <p class="mt-5 text-base text-center text-gray-400">{{ m.last_update() }}: {{ dayjs().format('MMMM DD, YYYY') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-8 mt-10 text-center sm:gap-x-8 md:grid-cols-3 lg:mt-24">
          <div>
            <h3 class="font-bold text-7xl">
              <span class="bg-gradient-to-r from-[#FF44EC] to-[#44BCFF] bg-clip-text text-transparent">{{ stats.updates }}</span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-300">{{ m.updates_delivered() }}</p>
            <p class="mt-0.5 text-base text-gray-400">{{ m.all_around_the_globe() }}</p>
          </div>
          <div>
            <h3 class="font-bold text-7xl">
              <span class="bg-gradient-to-r from-[#FF44EC] to-[#44BCFF] bg-clip-text text-transparent">{{ stats.apps }}</span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-300">{{ m.apps() }}</p>
            <p class="mt-0.5 text-base text-gray-400">{{ m.using_us_in_production() }}</p>
          </div>
          <div>
            <h3 class="font-bold text-7xl">
              <span class="bg-gradient-to-r from-[#FF44EC] to-[#44BCFF] bg-clip-text text-transparent">{{ stats.stars }}★</span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-300">{{ m.stars_in_github() }}</p>
            <p class="mt-0.5 text-base text-gray-400">{{ m.open_source() }}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 mt-10 text-center sm:gap-x-8 md:grid-cols-2 lg:mt-24">
          <div class="p-6 bg-gray-700 rounded-xl">
            <h3 class="text-2xl font-bold text-white">{{ m.update_metrics() }}</h3>
            <div class="p-4 space-y-4">
              <div>
                <p class="text-4xl font-bold text-[#FF675E]">95%</p>
                <p class="text-gray-300">{{ m.active_users_up_to_date() }}</p>
              </div>
              <div>
                <p class="text-4xl font-bold text-[#44BCFF]">82%</p>
                <p class="text-gray-300">{{ m.worldwide_success_rate() }}</p>
              </div>
            </div>
          </div>
          <div class="p-6 bg-gray-700 rounded-xl">
            <h3 class="text-2xl font-bold text-white">{{ m.performance_metrics() }}</h3>
            <div class="p-4 space-y-4">
              <div>
                <p class="text-4xl font-bold text-[#00AA5E]">114ms</p>
                <p class="text-gray-300">{{ m.download_time_globally() }}</p>
              </div>
              <div>
                <p class="text-4xl font-bold text-[#FF44EC]">434ms</p>
                <p class="text-gray-300">{{ m.average_api_response_time() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-10 bg-white sm:py-16 lg:py-24">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl xl:text-5xl">
            {{ m.how_it_work() }}
          </h2>
          <p class="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">{{ m.ship_your_first_update_in_less_than_15_minutes() }}</p>
        </div>
        <div class="relative mt-12 lg:mt-20">
          <div class="absolute inset-x-0 hidden top-2 md:block md:px-20 lg:px-28 xl:px-44">
            <img
              loading="lazy"
              height="47"
              width="864"
              class="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt="curved dot line"
              title="curved dot line"
            />
          </div>
          <div class="relative grid grid-cols-1 text-center gap-x-12 gap-y-12 md:grid-cols-3">
            <div>
              <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span class="text-2xl font-bold text-gray-700"> 1 </span>
              </div>
              <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                {{ m.install_the_plugin() }}
              </h3>
              <p class="mt-4 text-base text-gray-600">Run <span class="font-bold text-gray-900">npx @capgo/cli init</span> that it !</p>
            </div>
            <div>
              <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span class="text-2xl font-bold text-gray-700"> 2 </span>
              </div>
              <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                {{ m.send_your_first_update() }}
              </h3>
              <p class="mt-4 text-base text-gray-600">
                {{ m.build_your_app_as_usual_then_send_with_the_cli() }}
              </p>
            </div>
            <div>
              <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span class="text-2xl font-bold text-gray-700"> 3 </span>
              </div>
              <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                {{ m.get_the_update() }}
              </h3>
              <p class="mt-4 text-base text-gray-600">
                {{ m.open_the_app_it_update_in_the_background() }}
              </p>
            </div>
          </div>
        </div>
        <div class="max-w-3xl mx-auto text-center">
          <div class="relative inline-flex mt-10 group">
            <div
              class="transitiona-all animate-tilt absolute -inset-px rounded-xl bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-70 blur-lg duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200"
            />
            <a
              :href="getRelativeLocaleUrl(props.locale, 'register')"
              title="Get quote now"
              target="_blank"
              class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              role="button"
            >
              {{ m.start_now() }}
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="py-12 bg-gray-800 sm:py-16 lg:py-20">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl xl:text-5xl">
            {{ m.key_features_title() }}
          </h2>
          <p class="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-300">{{ m.key_features_subtitle() }}</p>
        </div>
        <div class="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          <div class="p-6 bg-gray-700 rounded-xl">
            <div class="flex items-center justify-center w-12 h-12 mb-4 bg-blue-900 rounded-lg">
              <svg class="w-6 h-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">{{ m.instant_updates() }}</h3>
            <p class="text-gray-300">{{ m.push_updates_to_your_users_in_seconds() }}</p>
          </div>
          <div class="p-6 bg-gray-700 rounded-xl">
            <div class="flex items-center justify-center w-12 h-12 mb-4 bg-green-900 rounded-lg">
              <svg class="w-6 h-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">{{ m.secure() }}</h3>
            <p class="text-gray-300">{{ m.end_to_end_encryption_for_your_updates() }}</p>
          </div>
          <div class="p-6 bg-gray-700 rounded-xl">
            <div class="flex items-center justify-center w-12 h-12 mb-4 bg-purple-900 rounded-lg">
              <svg class="w-6 h-6 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">{{ m.analytics() }}</h3>
            <p class="text-gray-300">{{ m.track_update_success_and_user_engagement() }}</p>
          </div>
          <div class="p-6 bg-gray-700 rounded-xl">
            <div class="flex items-center justify-center w-12 h-12 mb-4 bg-yellow-900 rounded-lg">
              <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">{{ m.rollback() }}</h3>
            <p class="text-gray-300">{{ m.instantly_rollback_to_previous_version_if_needed() }}</p>
          </div>
          <div class="p-6 bg-gray-700 rounded-xl">
            <div class="flex items-center justify-center w-12 h-12 mb-4 bg-red-900 rounded-lg">
              <svg class="w-6 h-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">{{ m.error_tracking() }}</h3>
            <p class="text-gray-300">{{ m.catch_and_fix_issues_before_they_affect_users() }}</p>
          </div>
          <div class="p-6 bg-gray-700 rounded-xl">
            <div class="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-900 rounded-lg">
              <svg class="w-6 h-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">{{ m.user_management() }}</h3>
            <p class="text-gray-300">{{ m.manage_testers_and_beta_users_easily() }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-12 bg-white sm:py-16 lg:py-20">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
            {{ m.with_and_without_capgo_title() }}
          </h2>
          <p class="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">{{ m.with_and_without_capgo_subtitle() }}</p>
        </div>
        <div class="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-2">
          <div class="p-8 border-2 border-red-200 bg-red-50 rounded-xl">
            <h3 class="mb-6 text-2xl font-bold text-red-900">{{ m.without_capgo() }}</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="font-medium text-red-700">{{ m.app_store_rating_bad() }}</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="font-medium text-red-700">{{ m.users_stuck_with_bugs_for_weeks() }}</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="font-medium text-red-700">{{ m.no_way_to_track_update_success() }}</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="font-medium text-red-700">{{ m.high_risk_of_bad_user_experience() }}</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="font-medium text-red-700">{{ m.wrong_app_testing() }}</span>
              </li>
            </ul>
          </div>
          <div class="p-8 transition-transform duration-200 transform border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-green-50 rounded-xl hover:scale-105">
            <h3 class="mb-6 text-2xl font-bold text-blue-900">{{ m.with_capgo() }}</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="font-medium text-blue-700">{{ m.app_store_rating_good() }}</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="font-medium text-blue-700">{{ m.instant_updates_to_all_users() }}</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="font-medium text-blue-700">{{ m.detailed_analytics_and_error_tracking() }}</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="font-medium text-blue-700">{{ m.instant_rollback_if_something_goes_wrong() }}</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="font-medium text-blue-700">{{ m.test_pr_in_production() }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="py-24 bg-gray-900 sm:py-32">
      <div class="max-w-2xl px-6 mx-auto lg:max-w-7xl lg:px-8">
        <h2 class="font-semibold text-blue-400 text-base/7">{{ m.faster_releases() }}</h2>
        <p class="max-w-2xl mt-2 text-4xl font-semibold tracking-tight text-white text-pretty sm:text-5xl">{{ m.everything_you_need_to_ship_updates_instantly() }}</p>
        <p class="max-w-2xl mt-4 text-lg text-gray-400">{{ m.ship_updates_fixes_changes_and_features() }}</p>
        <div class="grid grid-cols-1 gap-4 mt-10 sm:mt-16 lg:grid-cols-6 lg:grid-rows-3">
          <div class="flex p-px lg:col-span-4">
            <div class="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] w-full">
              <div class="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-[#44BCFF]/20 via-[#FF44EC]/20 to-[#FF675E]/20">
                <svg class="w-32 h-32 text-[#44BCFF] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 class="text-2xl font-bold text-white">Live Updates in Real Time</h3>
              </div>
              <div class="p-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white">Ship updates instantly to your users</p>
                <p class="max-w-lg mt-2 text-gray-400 text-sm/6">Push live code changes directly to users without app store delays. Deploy critical fixes and features when they're ready.</p>
              </div>
            </div>
          </div>
          <div class="flex p-px lg:col-span-2">
            <div class="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem] w-full">
              <div class="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <svg class="w-24 h-24 mb-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <h3 class="text-xl font-bold text-white">End User Experience</h3>
              </div>
              <div class="p-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white">Seamless background updates</p>
                <p class="max-w-lg mt-2 text-gray-400 text-sm/6">Updates install automatically in the background with no user interaction required</p>
              </div>
            </div>
          </div>
          <div class="flex p-px lg:col-span-3">
            <div class="w-full overflow-hidden bg-gray-800 rounded-lg ring-1 ring-white/15">
              <div class="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-green-500/20 to-blue-500/20">
                <svg class="w-24 h-24 mb-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 class="text-xl font-bold text-white">Enhanced Workflow</h3>
              </div>
              <div class="p-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white">Streamlined deployment process</p>
                <p class="max-w-lg mt-2 text-gray-400 text-sm/6">Build and deploy updates with a single command using our CLI tool</p>
              </div>
            </div>
          </div>
          <div class="flex p-px lg:col-span-3">
            <div class="w-full overflow-hidden bg-gray-800 rounded-lg ring-1 ring-white/15">
              <div class="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <svg class="w-24 h-24 mb-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <h3 class="text-xl font-bold text-white">Broad Compatibility</h3>
              </div>
              <div class="p-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white">Support for Capacitor 6 & 7</p>
                <p class="max-w-lg mt-2 text-gray-400 text-sm/6">Full compatibility with latest Capacitor versions and all major platforms</p>
              </div>
            </div>
          </div>
          <div class="flex p-px lg:col-span-2">
            <div class="w-full overflow-hidden bg-gray-800 rounded-lg ring-1 ring-white/15">
              <div class="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                <svg class="w-24 h-24 mb-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <h3 class="text-xl font-bold text-white">Partial Updates</h3>
              </div>
              <div class="p-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white">Smart differential updates</p>
                <p class="max-w-lg mt-2 text-gray-400 text-sm/6">Only download what's changed, saving bandwidth and time</p>
              </div>
            </div>
          </div>
          <div class="flex p-px lg:col-span-2">
            <div class="w-full overflow-hidden bg-gray-800 rounded-lg ring-1 ring-white/15">
              <div class="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                <svg class="w-24 h-24 mb-4 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 class="text-xl font-bold text-white">Public API</h3>
              </div>
              <div class="p-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white">Flexible integration</p>
                <p class="max-w-lg mt-2 text-gray-400 text-sm/6">Manage Capgo from your own software and create white label experiences</p>
              </div>
            </div>
          </div>
          <div class="flex p-px lg:col-span-2">
            <div class="w-full overflow-hidden bg-gray-800 rounded-lg ring-1 ring-white/15">
              <div class="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-indigo-500/20 to-blue-500/20">
                <svg class="w-24 h-24 mb-4 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                <h3 class="text-xl font-bold text-white">Channel System</h3>
              </div>
              <div class="p-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white">Advanced update distribution</p>
                <p class="max-w-lg mt-2 text-gray-400 text-sm/6">Target specific user groups with different versions using channels for beta testing and staged rollouts</p>
              </div>
            </div>
          </div>
          <div class="flex p-px lg:col-span-3">
            <div class="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-bl-[2rem] w-full">
              <div class="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-red-500/20 to-pink-500/20">
                <svg class="w-24 h-24 mb-4 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                <h3 class="text-xl font-bold text-white">Flexible Hosting</h3>
              </div>
              <div class="p-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white">Cloud or Self-hosted</p>
                <p class="max-w-lg mt-2 text-gray-400 text-sm/6">Choose between our secure cloud or host on your own infrastructure</p>
              </div>
            </div>
          </div>
          <div class="flex p-px lg:col-span-3">
            <div class="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-br-[2rem] w-full">
              <div class="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-teal-500/20 to-green-500/20">
                <svg class="w-24 h-24 mb-4 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 class="text-xl font-bold text-white">CI/CD Integration</h3>
              </div>
              <div class="p-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-white">Seamless automation</p>
                <p class="max-w-lg mt-2 text-gray-400 text-sm/6">Works with GitHub Actions, GitLab CI, Jenkins, and more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Testimonials :locale="props.locale" />
    <Orgs :locale="props.locale" />
    <CIExpert :locale="props.locale" />
    <div class="relative mt-14 sm:mt-24 sm:py-16">
      <div aria-hidden="true" class="hidden sm:block">
        <div class="absolute inset-y-0 left-0 w-1/2 bg-gray-800 rounded-r-3xl" />
        <svg class="absolute -ml-3 left-1/2 top-8" width="404" height="392" fill="none" viewBox="0 0 404 392">
          <defs>
            <pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="392" fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
        </svg>
      </div>
      <div class="max-w-md px-4 pb-3 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="relative px-6 py-10 overflow-hidden bg-gray-700 shadow-xl rounded-2xl sm:px-12 sm:py-20">
          <div aria-hidden="true" class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
            <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
              <path class="text-gray-600 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
              <path class="text-gray-800 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
            </svg>
          </div>
          <div class="relative flex flex-col md:flex-row">
            <div class="sm:text-center md:w-1/2">
              <h3 class="text-3xl tracking-tight text-white sm:text-4xl xl:text-5xl" v-html="m.push_updates_like_your_commits()" />
            </div>
            <div class="sm:text-center md:w-1/2">
              <p class="text-xl tracking-tight text-white">
                {{ m.try_risk_free_with_a_15_days_free_trial() }}
              </p>
              <a
                :href="getRelativeLocaleUrl(props.locale, 'register')"
                target="_blank"
                class="inline-block w-auto px-5 py-3 mx-auto mt-5 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10"
              >
                {{ m.get_started() }} &RightArrow;
              </a>
              <p class="pt-4 tracking-tight text-white">{{ m.no_credit_card_required() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Teleport lines animation */
.teleport-line {
  position: absolute;
  left: -100%;
  width: 100%;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(56, 189, 248, 0.1) 10%, 
    rgba(56, 189, 248, 0.3) 50%, 
    rgba(56, 189, 248, 0.1) 90%, 
    transparent 100%);
  animation: teleport-line 5s cubic-bezier(0.1, 0.9, 0.2, 1) infinite;
}

@keyframes teleport-line {
  0% {
    transform: translateX(0) scaleX(0.1);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(200%) scaleX(1);
    opacity: 0;
  }
}

/* Portal glow effect */
.portal-glow {
  right: -10%;
  top: 50%;
  transform: translateY(-50%);
  width: 20%;
  height: 60%;
  background: radial-gradient(
    ellipse at center,
    rgba(56, 189, 248, 0.15) 0%,
    rgba(56, 189, 248, 0.05) 40%,
    transparent 70%
  );
  filter: blur(20px);
  animation: portal-pulse 8s ease-in-out infinite;
}

@keyframes portal-pulse {
  0%, 100% {
    opacity: 0.5;
    transform: translateY(-50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translateY(-50%) scale(1.1);
  }
}

/* Vertical data streams */
.data-stream {
  position: absolute;
  top: -100%;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(56, 189, 248, 0.1) 10%,
    rgba(56, 189, 248, 0.3) 50%,
    rgba(56, 189, 248, 0.1) 90%,
    transparent 100%
  );
  animation: data-stream 8s linear infinite;
}

@keyframes data-stream {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(200%);
    opacity: 0;
  }
}

/* Button animation */
.teleport-button-line {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  animation: teleport-button 3s cubic-bezier(0.1, 0.9, 0.2, 1) infinite;
}

@keyframes teleport-button {
  0% {
    transform: translateX(0) skewX(-20deg);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(200%) skewX(-20deg);
    opacity: 0;
  }
}
</style>
