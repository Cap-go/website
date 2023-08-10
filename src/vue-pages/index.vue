<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRuntimeConfig } from '../config/app'
import { chatLoader } from '../services/chatwoot'
import Testimonials from '../components/Testimonials.vue'

const config = useRuntimeConfig()
const brand = config.public.brand || ''

onMounted(() => {
  chatLoader()
})

function shortNumber(number: number) {
  if (number > 1000000) return `${(number / 1000000).toFixed(1)}M`
  if (number > 1000) return `${(number / 1000).toFixed(1)}k`
  return `${number}`
}

const stats = reactive({
  apps: shortNumber(2900),
  updates: shortNumber(1000000),
  stars: shortNumber(336),
})

fetch(`${config.public.baseApiUrl}/website_stats`).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      stats.apps = shortNumber(data.apps)
      stats.updates = shortNumber(data.updates)
      stats.stars = shortNumber(data.stars)
    })
  }
})
</script>

<template>
  <div>
    <section class="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
      <div class="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="max-w-3xl mx-auto text-center">
          <p class="inline-flex px-4 py-2 text-base border border-gray-200 rounded-full font-pj">Made by Developers, for Developers</p>
          <h1 class="mt-5 font-bold leading-tight text-3xl sm:text-4xl xl:text-5xl sm:leading-tight lg:leading-tight font-pj">Live updates for Capacitor</h1>
          <h2 class="max-w-md mx-auto mt-6 text-base leading-7 text-gray-400 font-inter">
            Unlock Continuous Delivery for your app. Ship live updates, bug fixes, content changes, features, and more without struggle with the App store review.
          </h2>

          <div class="relative inline-flex mt-10 group">
            <div
              class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
            />
            <a
              href="/register/"
              title="Get quote now"
              class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              role="button"
            >
              Get it now
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="py-12 bg-gray-900 sm:py-16 lg:py-20">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 px-16 mx-auto text-center sm:px-0 lg:max-w-4xl sm:grid-cols-3 gap-x-12 lg:gap-x-24 gap-y-8">
          <div>
            <svg class="w-auto mx-auto text-white h-14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <!-- ! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M228.7 299.3C222.4 293.1 222.4 282.9 228.7 276.7C234.9 270.4 245.1 270.4 251.3 276.7L304 329.4V176C304 167.2 311.2 160 320 160C328.8 160 336 167.2 336 176V329.4L388.7 276.7C394.9 270.4 405.1 270.4 411.3 276.7C417.6 282.9 417.6 293.1 411.3 299.3L331.3 379.3C325.1 385.6 314.9 385.6 308.7 379.3L228.7 299.3zM272 32C331.5 32 384.1 61.55 416 106.8C430.5 99.87 446.8 96 464 96C525.9 96 576 146.1 576 208C576 218.7 574.5 228.1 571.7 238.8C612.3 260.2 640 302.9 640 352C640 422.7 582.7 480 512 480H144C64.47 480 0 415.5 0 336C0 273.2 40.15 219.9 96.17 200.1C100.3 106.6 177.4 32 272 32zM272 64C194.6 64 131.5 125 128.1 201.5C127.6 214.6 119.1 225.1 106.8 230.3C63.18 245.7 32 287.2 32 336C32 397.9 82.14 448 144 448H512C565 448 608 405 608 352C608 315.2 587.3 283.2 556.8 267.1C543.4 259.1 536.8 244.5 540.9 229.1C542.9 223 544 215.7 544 208C544 163.8 508.2 128 464 128C451.7 128 440.1 130.8 429.7 135.7C415.7 142.4 398.8 137.9 389.8 125.2C363.7 88.12 320.7 64 272 64V64z"
              />
            </svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">Immediate Updates</h3>
            <p class="mt-3 text-sm text-gray-400">
              Release now, not one week later.
              <!-- Release in matter on seconds, not one week later. -->
              <!-- Reach 90% of first day deployment instead of a month. -->
            </p>
          </div>

          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-auto mx-auto text-white h-14" fill="currentColor" viewBox="0 0 448 512">
              <!-- ! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4L127 384.5zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2-20.5-35.4c-5.5-9.6-2.2-21.8 7.3-27.3 9.6-5.5 21.8-2.2 27.3 7.3l8.9 15.4 8.9-15.4c5.5-9.6 17.8-12.8 27.3-7.3 9.6 5.5 12.8 17.8 7.3 27.3l-85.8 148.6h62.1c20.2 0 31.5 23.7 22.7 40zm98.1 0h-29l19.6 33.9c5.5 9.6 2.2 21.8-7.3 27.3-9.6 5.5-21.8 2.2-27.3-7.3-32.9-56.9-57.5-99.7-74-128.1-16.7-29-4.8-58 7.1-67.8 13.1 22.7 32.7 56.7 58.9 102h52c11 0 20 9 20 20 0 11.1-9 20-20 20z"
              />
            </svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">App Store Compliant</h3>
            <p class="mt-3 text-sm text-gray-400">100% compliant with Apple and Android requirements.</p>
          </div>

          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-auto mx-auto text-white h-14" fill="currentColor" viewBox="0 0 576 512">
              <!-- ! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M304 480H64c-17.67 0-32-14.33-32-32V64c0-17.67 14.33-32 32-32h128v112C192 170.5 213.5 192 240 192h122.5C374.4 192 384 182.4 384 170.5c0-16.97-6.742-33.25-18.74-45.25L258.7 18.75C246.7 6.742 230.5 0 213.5 0H64C28.65 0 .0007 28.65 .0007 64l.0059 384c0 35.35 28.65 64 64 64H304c8.836 0 16-7.164 16-16C320 487.2 312.8 480 304 480zM224 34.08c4.477 1.566 8.664 3.846 12.12 7.299l106.5 106.5C346.1 151.3 348.4 155.5 349.9 160H240C231.2 160 224 152.8 224 144V34.08zM528 320L528 256c0-35.28-28.72-64-64-64s-64 28.72-64 64v64c-26.51 0-48 21.49-48 48v96c0 26.51 21.49 48 48 48h128c26.51 0 48-21.49 48-48v-96C576 341.5 554.5 320 528 320zM432 256c0-17.66 14.34-32 32-32s32 14.34 32 32v64h-64V256zM544 464c0 8.822-7.178 16-16 16h-128c-8.822 0-16-7.178-16-16v-96c0-8.822 7.178-16 16-16h128c8.822 0 16 7.178 16 16V464z"
              />
            </svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">End-to-end encryption</h3>
            <p class="mt-3 text-sm text-gray-400">Only your users can decrypt your updates, no one else.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-10 bg-white sm:py-16 lg:py-24">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="font-bold leading-tight text-black text-3xl sm:text-4xl xl:text-5xl">How does it work?</h2>
          <p class="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Send your first update in less than 5 mins !</p>
        </div>

        <div class="relative mt-12 lg:mt-20">
          <div class="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
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

          <div class="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            <div>
              <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span class="text-2xl font-bold text-gray-700"> 1 </span>
              </div>
              <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Install the plugin</h3>
              <p class="mt-4 text-base text-gray-600">It's one simple command, who will guide you step by step.</p>
            </div>

            <div>
              <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span class="text-2xl font-bold text-gray-700"> 2 </span>
              </div>
              <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Send your first update</h3>
              <p class="mt-4 text-base text-gray-600">Build your app as usual, and then send it to Capgo with one command.</p>
            </div>

            <div>
              <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span class="text-2xl font-bold text-gray-700"> 3 </span>
              </div>
              <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Get the update</h3>
              <p class="mt-4 text-base text-gray-600">The download happen in background while you are in the app, next open you have the update.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="relative md:my-20 py-20 bg-gray-800">
      <svg class="hidden absolute md:block md:-top-5 md:m-0 md:-left-1/3 lg:-left-16" width="404" height="392" fill="none" viewBox="0 0 404 392">
        <defs>
          <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
      </svg>
      <svg class="hidden absolute md:block md:-bottom-5 md:m-0 md:-right-1/3 lg:-right-16" width="404" height="392" fill="none" viewBox="0 0 404 392">
        <defs>
          <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
      </svg>
      <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">Numbers tell the story</h2>
          <p class="mt-3 text-base leading-relaxed text-gray-300 md:mt-8">Shared transparently with you since january 2022.</p>
          <p class="text-base mt-5 text-gray-400 text-center">Updated every day</p>
        </div>

        <div class="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-24 sm:gap-x-8 md:grid-cols-3">
          <div>
            <h3 class="font-bold text-7xl">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF44EC] to-[#44BCFF]">+{{ stats.stars }}</span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-300">Stars in GitHub</p>
            <p class="text-base mt-0.5 text-gray-400">Creating the open-source path</p>
          </div>

          <div>
            <h3 class="font-bold text-7xl">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF44EC] to-[#44BCFF]">+{{ stats.updates }}</span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-300">Updates delivered</p>
            <p class="text-base mt-0.5 text-gray-400">To users all around the globe</p>
          </div>

          <div>
            <h3 class="font-bold text-7xl">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF44EC] to-[#44BCFF]">+{{ stats.apps }}</span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-300">Apps</p>
            <p class="text-base mt-0.5 text-gray-400">Already using us in production</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:items-center gap-y-8 md:grid-cols-2 md:gap-x-16">
          <div>
            <img loading="lazy" height="332" width="576" class="w-auto h-auto" src="/stats_demo_2.webp" alt="Manage app illustration" title="Manage app illustration" />
          </div>
          <div class="md:pr-12">
            <h3 class="text-3xl font-bold text-gray-900 sm:text-7xl xl:text-7xl font-pj">Manage update</h3>
            <div class="">
              <div class="py-8 md:py-11">
                <div class="space-y-12">
                  <div class="flex items-start">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-gray-900 rounded-full">
                      <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>

                    <div class="ml-5">
                      <h3 class="text-lg font-bold text-gray-900 font-pj">Assign user</h3>
                      <p class="mt-3 text-lg font-normal text-gray-600 font-pj">Send to your private or public tester the last update.</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-gray-900 rounded-full">
                      <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-2.21-6H13V9c0-.55-.45-1-1-1s-1 .45-1 1v4H9.21c-.45 0-.67.54-.35.85l2.79 2.79c.2.2.51.2.71 0l2.79-2.79a.5.5 0 0 0-.36-.85z"
                        />
                      </svg>
                    </div>

                    <div class="ml-5">
                      <h3 class="text-lg font-bold text-gray-900 font-pj">Set update</h3>
                      <p class="mt-3 text-lg font-normal text-gray-600 font-pj">When ready, deploy to all your users.</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-gray-900 rounded-full">
                      <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 2048 2048">
                        <path
                          fill="currentColor"
                          d="M1152 512H896V256h128v128h128v128zm512 1032q42 11 77 35t60 57t40 73t15 83q0 53-20 99t-55 82t-81 55t-100 20q-53 0-99-20t-82-55t-55-81t-20-100q0-43 14-83t39-73t61-57t78-35v-264h-512v264q42 11 77 35t60 57t40 73t15 83q0 53-20 99t-55 82t-81 55t-100 20q-53 0-99-20t-82-55t-55-81t-20-100q0-43 14-83t39-73t61-57t78-35v-264H384v264q42 11 77 35t60 57t40 73t15 83q0 53-20 99t-55 82t-81 55t-100 20q-53 0-99-20t-82-55t-55-81t-20-100q0-43 14-83t39-73t61-57t78-35v-392h640V891q-83-11-153-50t-122-99t-80-135t-29-159q0-93 35-174t96-143t142-96T960 0q93 0 174 35t143 96t96 142t35 175q0 83-29 158t-80 135t-121 99t-154 51v261h640v392zM640 448q0 66 25 124t68 102t102 69t125 25q66 0 124-25t101-68t69-102t26-125q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124zM448 1792q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50zm640 0q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50zm512 128q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50q0 27 10 50t27 40t41 28t50 10z"
                        />
                      </svg>
                    </div>

                    <div class="ml-5">
                      <h3 class="text-lg font-bold text-gray-900 font-pj">Manage all in one place</h3>
                      <p class="mt-3 text-lg font-normal text-gray-600 font-pj">All configutarion can be managed via the web interface.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="relative py-12 overflow-hidden sm:py-16 lg:py-20 xl:py-32">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid items-center grid-cols-1 xl:grid-cols-2">
          <div class="px-8 text-center xl:text-left xl:pr-16 md:max-w-2xl md:mx-auto xl:max-w-none">
            <h2 class="font-bold text-gray-100 text-3xl sm:text-4xl xl:text-5xl font-pj">You’re in good company.</h2>
            <p class="mt-6 text-lg font-normal text-gray-400 font-pj">Capgo enables development teams at some of the most innovative companies.</p>
          </div>

          <div class="relative mt-8 sm:mt-12 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mt-0">
            <div class="absolute inset-16">
              <div
                class="w-full h-full mx-auto rotate-180 opacity-30 rounded-3xl blur-lg filter"
                style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
              />
            </div>

            <div class="relative space-y-5">
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" height="64" width="189" class="w-auto h-8" src="/pizza_hut_logo.webp" alt="Pizza hut" title="Pizza hut" />
                </div>

                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" height="64" width="189" class="w-auto h-8" src="/fiksuruoka_logo.webp" alt="fiksuruoka" title="fiksuruoka" />
                </div>

                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" height="64" width="189" class="w-auto h-8" src="/remnote_logo.svg" alt="remnote" title="remnote" />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:translate-x-6">
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" height="64" width="189" class="w-auto h-8" src="/revel_logo.svg" alt="hello revel" title="hello revel" />
                </div>

                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" height="64" width="189" class="w-auto h-8" src="/xbe_logo.webp" alt="x-b-e" title="x-b-e" />
                </div>

                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" height="64" width="189" class="w-auto h-8" src="/mangroove_logo.svg" alt="mangroove" title="mangroove" />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:translate-x-12">
                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" height="64" width="189" class="w-auto h-8" src="/irec_logo.webp" alt="irec" title="irec" />
                </div>

                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" height="64" width="189" class="w-auto h-8" src="/vella_logo.svg" alt="vella" title="vella" />
                </div>

                <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                  <img loading="lazy" height="64" width="189" class="w-auto h-8" src="/ourliving_logo.webp" alt="ourliving" title="ourliving" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute inset-0 bg-gradient-to-b xl:bg-gradient-to-r from-transparent via-transparent to-gray-800" />
    </section>
    <Testimonials />
    <section class="bg-gray-50">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base font-semibold text-pumpkinOrange-600 tracking-wide uppercase">CI/CD</h2>
          <p class="mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-7xl">Fully automatic deploy</p>
          <p class="max-w-xl mt-5 mx-auto text-xl text-gray-700">Save time with automatic delivery pipeline, never worry about deploying your app again.</p>
        </div>
      </div>
    </section>
    <section class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 py-10 md:py-20">
        <div class="order-last md:order-none">
          <h2 class="text-4xl md:text-7xl font-extrabold my-10">Release</h2>
          <p class="text-lg lg:w-2/3">
            By choosing {{ brand }}, you'll boost your chances of launching multiple releases per week by 81%, compared to those who don't utilize {{ brand }}.
          </p>
        </div>
        <img
          width="310"
          height="248"
          loading="lazy"
          class="mx-auto h-full md:h-62 rounded-lg"
          src="/develop_illu.svg"
          title="productivity illustration"
          alt="productivity illustration"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 py-10 md:py-20">
        <img
          width="310"
          height="248"
          loading="lazy"
          class="mx-auto h-full md:h-62 rounded-lg my-10"
          src="/build_illustration.svg"
          alt="build illustration"
          title="build illustration"
        />
        <div>
          <h2 class="text-4xl md:text-7xl font-extrabold my-10">Integration</h2>
          <p class="text-lg lg:w-2/3">
            Easily combine {{ brand }} features into your current CI/CD platform with our user-friendly CLI.<br /><br />

            It's compatible with Azure DevOps, GitLab, GitHub, Jenkins, Cloudbees, Travis, Azure DevOps, GitLab, GitHub, CircleCI, and many more.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 py-10 md:py-20">
        <div class="order-last md:order-none">
          <h2 class="text-4xl md:text-7xl font-extrabold my-10">Update</h2>
          <p class="text-lg lg:w-2/3">Got a bug? No problem: just one command lets users see the fix right away, no app re-download needed!</p>
        </div>
        <img
          width="310"
          height="248"
          loading="lazy"
          class="mx-auto h-full md:h-62 rounded-lg"
          src="/update_illustration.svg"
          alt="send update illustration"
          title="send update illustration"
        />
      </div>
    </section>

    <div class="relative mt-24 sm:mt-32 sm:py-16">
      <div aria-hidden="true" class="hidden sm:block">
        <div class="absolute inset-y-0 left-0 w-1/2 bg-gray-800 rounded-r-3xl" />
        <svg class="absolute top-8 left-1/2 -ml-3" width="404" height="392" fill="none" viewBox="0 0 404 392">
          <defs>
            <pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="392" fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
        </svg>
      </div>
      <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="relative rounded-2xl px-6 py-10 bg-gray-700 overflow-hidden shadow-xl sm:px-12 sm:py-20">
          <div aria-hidden="true" class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
            <svg class="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
              <path class="text-gray-600 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
              <path class="text-gray-800 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
            </svg>
          </div>
          <div class="relative flex flex-col">
            <div class="sm:text-center">
              <h3 class="font-bold text-white tracking-tight text-3xl sm:text-4xl xl:text-5xl">Push hot code updates</h3>
              <p class="mt-6 mx-auto max-w-2xl text-lg text-gray-100">Like you push a commit</p>
            </div>
            <a
              href="/register/"
              class="w-auto inline-block mt-5 mx-auto rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10"
            >
              Get started &RightArrow;
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
