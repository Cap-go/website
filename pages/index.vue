<script setup lang="ts">
import { crispLoader } from '~~/services/crisp'

const config = useRuntimeConfig()
const brand = config.brand || ''

if (process.client)
  crispLoader()
const shortNumber = (number: number) => {
  if (number > 1000000)
    return `${(number / 1000000).toFixed(1)}M`

  if (number > 1000)
    return `${(number / 1000).toFixed(1)}k`

  return `${number}`
}
const stats = reactive({
  apps: shortNumber(190),
  updates: shortNumber(70000),
  stars: shortNumber(125),
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
          <p class="inline-flex px-4 py-2 text-base border border-gray-200 rounded-full font-pj">
            Made by Developers, for Developers
          </p>
          <h1 class="mt-5 text-4xl font-bold leading-tight sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
            Live updates for Capacitor
          </h1>
          <h2 class="max-w-md mx-auto mt-6 text-base leading-7 text-gray-400 font-inter">
            Unlock Continuous Delivery for your app. Ship live updates, bug fixes, content changes, features, and more without struggle with the App store review.
          </h2>

          <div class="relative inline-flex mt-10 group">
            <div class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt" />
            <a no-rel href="/register/" title="Get quote now" class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" role="button">
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
            <svg class="w-auto mx-auto text-white h-14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!-- ! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M228.7 299.3C222.4 293.1 222.4 282.9 228.7 276.7C234.9 270.4 245.1 270.4 251.3 276.7L304 329.4V176C304 167.2 311.2 160 320 160C328.8 160 336 167.2 336 176V329.4L388.7 276.7C394.9 270.4 405.1 270.4 411.3 276.7C417.6 282.9 417.6 293.1 411.3 299.3L331.3 379.3C325.1 385.6 314.9 385.6 308.7 379.3L228.7 299.3zM272 32C331.5 32 384.1 61.55 416 106.8C430.5 99.87 446.8 96 464 96C525.9 96 576 146.1 576 208C576 218.7 574.5 228.1 571.7 238.8C612.3 260.2 640 302.9 640 352C640 422.7 582.7 480 512 480H144C64.47 480 0 415.5 0 336C0 273.2 40.15 219.9 96.17 200.1C100.3 106.6 177.4 32 272 32zM272 64C194.6 64 131.5 125 128.1 201.5C127.6 214.6 119.1 225.1 106.8 230.3C63.18 245.7 32 287.2 32 336C32 397.9 82.14 448 144 448H512C565 448 608 405 608 352C608 315.2 587.3 283.2 556.8 267.1C543.4 259.1 536.8 244.5 540.9 229.1C542.9 223 544 215.7 544 208C544 163.8 508.2 128 464 128C451.7 128 440.1 130.8 429.7 135.7C415.7 142.4 398.8 137.9 389.8 125.2C363.7 88.12 320.7 64 272 64V64z" /></svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">
              Immediate Updates
            </h3>
            <p class="mt-3 text-sm text-gray-400">
              Release now, not one week later.
              <!-- Release in matter on seconds, not one week later. -->
              <!-- Reach 90% of first day deployment instead of a month. -->
            </p>
          </div>

          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-auto mx-auto text-white h-14" fill="currentColor" viewBox="0 0 448 512"><!-- ! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4L127 384.5zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2-20.5-35.4c-5.5-9.6-2.2-21.8 7.3-27.3 9.6-5.5 21.8-2.2 27.3 7.3l8.9 15.4 8.9-15.4c5.5-9.6 17.8-12.8 27.3-7.3 9.6 5.5 12.8 17.8 7.3 27.3l-85.8 148.6h62.1c20.2 0 31.5 23.7 22.7 40zm98.1 0h-29l19.6 33.9c5.5 9.6 2.2 21.8-7.3 27.3-9.6 5.5-21.8 2.2-27.3-7.3-32.9-56.9-57.5-99.7-74-128.1-16.7-29-4.8-58 7.1-67.8 13.1 22.7 32.7 56.7 58.9 102h52c11 0 20 9 20 20 0 11.1-9 20-20 20z" /></svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">
              App Store Compliant
            </h3>
            <p class="mt-3 text-sm text-gray-400">
              100% compliant with Apple and Android requirements.
            </p>
          </div>

          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-auto mx-auto text-white h-14" fill="currentColor" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M304 480H64c-17.67 0-32-14.33-32-32V64c0-17.67 14.33-32 32-32h128v112C192 170.5 213.5 192 240 192h122.5C374.4 192 384 182.4 384 170.5c0-16.97-6.742-33.25-18.74-45.25L258.7 18.75C246.7 6.742 230.5 0 213.5 0H64C28.65 0 .0007 28.65 .0007 64l.0059 384c0 35.35 28.65 64 64 64H304c8.836 0 16-7.164 16-16C320 487.2 312.8 480 304 480zM224 34.08c4.477 1.566 8.664 3.846 12.12 7.299l106.5 106.5C346.1 151.3 348.4 155.5 349.9 160H240C231.2 160 224 152.8 224 144V34.08zM528 320L528 256c0-35.28-28.72-64-64-64s-64 28.72-64 64v64c-26.51 0-48 21.49-48 48v96c0 26.51 21.49 48 48 48h128c26.51 0 48-21.49 48-48v-96C576 341.5 554.5 320 528 320zM432 256c0-17.66 14.34-32 32-32s32 14.34 32 32v64h-64V256zM544 464c0 8.822-7.178 16-16 16h-128c-8.822 0-16-7.178-16-16v-96c0-8.822 7.178-16 16-16h128c8.822 0 16 7.178 16 16V464z"/></svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">
              End-to-end encryption
            </h3>
            <p class="mt-3 text-sm text-gray-400">
              Only your users can decrypt your updates, no one else.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="relative my-20 py-20 bg-gray-800">
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
      <div class="text-center">
        <h2 class="text-5xl font-semibold">
          Send updates in less than 5 mins !
        </h2>
        <p class="my-10 text-xl">
          Install the plugin in your app<br>
          Send your first build<br>
          See it appear in your app by magic
        </p>
      </div>
    </section>
    <section class="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:items-center gap-y-8 md:grid-cols-2 md:gap-x-16">
          <div>
            <img class="w-auto h-auto" src="/stats_demo.webp" alt="Manage app illustration">
          </div>

          <div class="lg:pr-12">
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Manage version by channel from the cloud
            </h2>
            <p class="mt-5 text-lg font-medium text-gray-900 sm:mt-8 font-pj">
              All apps have multiple channels, each channel can be managed separately.
            </p>
            <p class="mt-4 text-lg text-gray-700 sm:mt-5 font-pj">
              Upgrade users, revert to previous versions, or rollback to a specific one, just with a click.
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base font-semibold text-pumpkinOrange-600 tracking-wide uppercase">
            CI/CD
          </h2>
          <p class="mt-1 text-4xl font-extrabold text-gray-100 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Save time with fully automatic deploy
          </p>
          <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Fully automate your delivery pipeline to never worry about deploying your app again.
          </p>
        </div>
      </div>
    </div>
    <section class="py-12 bg-white sm:py-16 lg:py-20">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            Customers say about {{ brand }}
          </h2>
          <p class="mt-4 text-lg font-medium text-gray-600 font-pj sm:mt-8">
            Many people have said how good {{ brand }} is
          </p>
        </div>

        <div class="grid max-w-lg grid-cols-1 gap-10 mx-auto mt-8 md:max-w-4xl md:mt-16 md:grid-cols-2 md:gap-x-16">
          <div class="space-y-10">
            <div>
              <blockquote class="py-6 bg-gray-100 rounded-2xl px-7">
                <p class="text-lg font-normal leading-relaxed text-gray-900 font-pj">
                  “The community needs this and you are doing something really important!”
                </p>
              </blockquote>
              <div class="flex items-center mt-5">
                <img class="flex-shrink-0 object-cover rounded-full w-11 h-11" src="/lincoln.webp" alt="Lincoln Baxter photo">
                <div class="ml-2">
                  <p class="text-base font-bold text-gray-900 font-pj">
                    Lincoln Baxter
                  </p>
                  <p class="mt-0.5 font-pj text-sm text-gray-600">
                    CEO at TopDecked
                  </p>
                </div>
              </div>
            </div>

            <div>
              <blockquote class="py-6 bg-gray-100 rounded-2xl px-7">
                <p class="text-lg font-normal leading-relaxed text-gray-900 font-pj">
                  “This project works flawless, its dead simple you got control. you dont have to rely on anyone for your code push you can use your own api, perfect 🔥”
                </p>
              </blockquote>
              <div class="flex items-center mt-5">
                <img class="flex-shrink-0 object-cover rounded-full w-11 h-11" src="/avatar-female-1.webp" alt="Bessie Cooper photo">
                <div class="ml-2">
                  <p class="text-base font-bold text-gray-900 font-pj">
                    Bessie Cooper
                  </p>
                  <p class="mt-0.5 font-pj text-sm text-gray-600">
                    Senior software developer at Shopify
                  </p>
                </div>
              </div>
            </div>

            <div>
              <blockquote class="py-6 bg-gray-100 rounded-2xl px-7">
                <p class="text-lg font-normal leading-relaxed text-gray-900 font-pj">
                  “Must have tools for developers, who want to be more productive. Avoiding review for bugfix is golden.”
                </p>
              </blockquote>
              <div class="flex items-center mt-5">
                <img class="flex-shrink-0 object-cover rounded-full w-11 h-11" src="/avatar-female-2.webp" alt="Aakash Chandran photo">
                <div class="ml-2">
                  <p class="text-base font-bold text-gray-900 font-pj">
                    Aakash Chandran
                  </p>
                  <p class="mt-0.5 font-pj text-sm text-gray-600">
                    Founder of SAAS
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-10">
            <div>
              <blockquote class="py-6 bg-gray-100 rounded-2xl px-7">
                <p class="text-lg font-normal leading-relaxed text-gray-900 font-pj">
                  “So Capgo’s over the air update feature just saved us on launch day. We had a crash happening on a critical path but narrowed it down and deployed a fix using OTA in about an hour.”
                </p>
              </blockquote>
              <div class="flex items-center mt-5">
                <img class="flex-shrink-0 object-cover rounded-full w-11 h-11" src="/avatar-male-2.webp" alt="Jamon Holmgren photo">
                <div class="ml-2">
                  <p class="text-base font-bold text-gray-900 font-pj">
                    Jamon Holmgren
                  </p>
                  <p class="mt-0.5 font-pj text-sm text-gray-600">
                    CTO at Infinite Red
                  </p>
                </div>
              </div>
            </div>

            <div>
              <blockquote class="py-6 bg-gray-100 rounded-2xl px-7">
                <p class="text-lg font-normal leading-relaxed text-gray-900 font-pj">
                  “As a career-long ionic developer, getting over the air update working in Ionic via Capacitor feels like black magic. Loving it.”
                </p>
              </blockquote>
              <div class="flex items-center mt-5">
                <img class="flex-shrink-0 object-cover rounded-full w-11 h-11" src="/avatar-female-3.webp" alt="Wes Johnson photo">
                <div class="ml-2">
                  <p class="text-base font-bold text-gray-900 font-pj">
                    Wes Johnson
                  </p>
                  <p class="mt-0.5 font-pj text-sm text-gray-600">
                    Web Development Manager at RSR Group
                  </p>
                </div>
              </div>
            </div>

            <div>
              <blockquote class="py-6 bg-gray-100 rounded-2xl px-7">
                <p class="text-lg font-normal leading-relaxed text-gray-900 font-pj">
                  “It is so easy to build your own mobile app nowadays. With technologies like Capacitor and Capgo, literally anyone with an idea can rapidly build their dream app. What a time to be alive!”
                </p>
              </blockquote>
              <div class="flex items-center mt-5">
                <img class="flex-shrink-0 object-cover rounded-full w-11 h-11" src="/avatar-male-3.webp" alt="Trevor Hartman photo">
                <div class="ml-2">
                  <p class="text-base font-bold text-gray-900 font-pj">
                    Trevor Hartman
                  </p>
                  <p class="mt-0.5 font-pj text-sm text-gray-600">
                    Senior Staff cartainc
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
      <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Numbers tell the story
          </h2>
          <p class="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
            Shared transparently with you since day 1.
          </p>
          <p class="text-base mt-5 text-gray-500 text-center">
            ( updated every day )
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-24 sm:gap-x-8 md:grid-cols-3">
          <div>
            <h3 class="font-bold text-7xl">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-pumpkinOrange-600 to-azure-600"> {{ stats.stars }}+ </span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-900">
              Stars in GitHub
            </p>
            <p class="text-base mt-0.5 text-gray-500">
              Creating the open-source path
            </p>
          </div>

          <div>
            <h3 class="font-bold text-7xl">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-pumpkinOrange-600 to-azure-600">{{ stats.updates }}+</span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-900">
              Updates delivered
            </p>
            <p class="text-base mt-0.5 text-gray-500">
              Since january 2022
            </p>
          </div>

          <div>
            <h3 class="font-bold text-7xl">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-pumpkinOrange-600 to-azure-600"> {{ stats.apps }}+ </span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-900">
              Apps
            </p>
            <p class="text-base mt-0.5 text-gray-500">
              Already using us in production
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="mx-10 lg:px-32 lg:mx-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 py-20">
        <div class="order-last md:order-none">
          <h2 class="text-4xl md:text-8xl font-extrabold my-10">
            Release
          </h2>
          <p class="text-lg lg:w-2/3">
            By choosing {{ brand }}, you'll boost your chances of launching multiple releases per week by 81%, compared to those who don't utilize {{ brand }}.
          </p>
        </div>
        <img
          class="mx-auto h-62 rounded-lg"
          src="/develop_illu.svg"
          alt="productivity illustration"
        >
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 py-20">
        <img
          class="mx-auto h-62 rounded-lg my-10"
          src="/build_illustration.svg"
          alt="build illustration"
        >
        <div>
          <h2 class="text-4xl md:text-8xl font-extrabold my-10">
            Integration
          </h2>
          <p class="text-lg lg:w-2/3">
            Easily combine {{ brand }} features into your current CI/CD platform with our user-friendly CLI.<br/><br/>

It's compatible with Azure DevOps, GitLab, GitHub, Jenkins, Cloudbees, Travis, Azure DevOps, GitLab, GitHub, CircleCI, and many more.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 py-20">
        <div class="order-last md:order-none">
          <h2 class="text-4xl md:text-8xl font-extrabold my-10">
            Update
          </h2>
          <p class="text-lg lg:w-2/3">
            Got a bug? No problem: just one command lets users see the fix right away, no app re-download needed!
          </p>
        </div>
        <img
          class="mx-auto h-62 rounded-lg"
          src="/update_illustration.svg"
          alt="send update illustration"
        >
      </div>
    </section>
    <section class="relative py-12 overflow-hidden bg-gray-50 sm:py-16 lg:py-20 xl:py-32">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid items-center grid-cols-1 xl:grid-cols-2">
            <div class="px-8 text-center xl:text-left xl:pr-16 md:max-w-2xl md:mx-auto xl:max-w-none">
                <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">You’re in good company.</h2>
                <p class="mt-6 text-lg font-normal text-gray-600 font-pj">Capgo enables development teams at some of the most innovative companies.</p>
            </div>

            <div class="relative mt-8 sm:mt-12 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mt-0">
                <div class="absolute inset-16">
                    <div class="w-full h-full mx-auto rotate-180 opacity-30 rounded-3xl blur-lg filter" style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"></div>
                </div>

                <div class="relative space-y-5">
                    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                            <img class="w-auto h-8" src="/pizza_hut_logo.webp" alt="Pizza hut" />
                        </div>

                        <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                            <img class="w-auto h-8" src="/fiksuruoka_logo.webp" alt="fiksuruoka" />
                        </div>

                        <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                            <img class="w-auto h-8" src="/remnote_logo.svg" alt="remnote" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:translate-x-6">
                        <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                            <img class="w-auto h-8 " src="/revel_logo.svg" alt="hello revel" />
                        </div>

                        <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                            <img class="w-auto h-8" src="/xbe_logo.webp" alt="x-b-e" />
                        </div>

                        <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                            <img class="w-auto h-8" src="/mangroove_logo.svg" alt="mangroove" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:translate-x-12">
                        <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                            <img class="w-auto h-8" src="/irec_logo.webp" alt="irec" />
                        </div>

                        <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                            <img class="w-auto h-8" src="/vella_logo.svg" alt="vella" />
                        </div>

                        <div class="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full">
                            <img class="w-auto h-8" src="/ourliving_logo.webp" alt="ourliving" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="absolute inset-0 bg-gradient-to-b xl:bg-gradient-to-r from-transparent via-transparent to-gray-50"></div>
</section>

    <section class="py-10 bg-white sm:py-16 lg:py-24">
      <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-xl font-medium text-gray-900">
            Trusted by world class companies
          </h2>
        </div>

        <div class="grid items-center grid-cols-2 gap-10 mt-12 md:grid-cols-4 sm:gap-y-16">
          <div>
            <img class="object-contain w-auto mx-auto h-14" src="/fiksuruoka_logo.webp" alt="fiksuruoka app">
          </div>

          <div>
            <img class="object-contain w-auto mx-auto h-14" src="/pizza_hut_logo.webp" alt="Pizza hut AU app">
          </div>

          <div>
            <img class="object-contain w-auto h-10 mx-auto" src="/remnote_logo.svg" alt="Remnote app">
          </div>

          <div>
            <img class="object-contain w-auto mx-auto h-14" src="/revel_logo.webp" alt="Hello revel app">
          </div>
        </div>
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
              <h2 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Push hot code updates
              </h2>
              <p class="mt-6 mx-auto max-w-2xl text-lg text-gray-100">
                Like you push a commit
              </p>
            </div>
            <a no-rel href="/register/" class="w-auto inline-block mt-5 mx-auto rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10">
              Get started &RightArrow;
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
