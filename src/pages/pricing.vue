<script setup lang="ts">
import Crisp from '~/services/crisp'

const crisp = Crisp()
const openSupport = () => {
  crisp.sendMessage({ value: 'I need a custom plan' })
  crisp.openMessenger()
}
</script>
<template>
  <section class="py-12 bg-gray-50 sm:py-16 lg:py-20">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-8xl font-pj">
          The right plan can change your work
        </h2>
        <p class="mt-6 text-xl font-normal text-gray-600 font-pj">
          Enterprise-grade cloud that enhance Capacitor application functionality and security.
        </p>
      </div>

      <div class="grid items-center max-w-md grid-cols-1 mx-auto mt-8 md:max-w-5xl gap-y-6 md:mt-16 md:grid-cols-3">
        <div class="bg-white">
          <div class="p-6 lg:px-10 lg:py-9">
            <div class="text-center">
              <p class="text-4xl">
                🚀
              </p>
              <h3 class="mt-6 text-sm text-gray-900 font-bold tracking-widest uppercase font-pj">
                Solo
              </h3>
              <p class="mt-1.5 font-pj text-sm text-gray-600">
                Best for independent developers
              </p>
              <div class="flex items-end justify-center mt-6">
                <p class="text-lg font-bold text-gray-400 font-pj">
                  $
                </p>
                <p class="text-4xl ml-0.5 font-bold text-gray-900 font-pj">
                  14
                </p>
                <p class="text-lg font-bold text-gray-400 font-pj">
                  /month
                </p>
              </div>
            </div>

            <ul class="space-y-3 text-base font-medium text-gray-900 mt-9">
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                1 App
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                2 channels
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                2,500 Monthly Live Updates
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                10 Version history
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Limited Reporting
              </li>
            </ul>

            <div class="mt-12 text-center">
              <a
                href="https://web.capgo.app/register"
                title="register"
                class="
                                flex
                                items-center
                                justify-center
                                w-full
                                px-4
                                py-4
                                text-base
                                font-bold
                                text-gray-900
                                transition-all
                                duration-200
                                bg-gray-100
                                border border-transparent
                                lg:px-8
                                hover:bg-gray-900 hover:text-white
                                focus:text-white focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                font-pj
                            "
                role="button"
              >
                <!-- Start 14 Days Trial -->
                Start Trial
              </a>

              <p class="mt-4 text-sm text-gray-600 font-pj">
                No credit card required
              </p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -inset-x-2 -inset-y-px">
            <div class="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter" style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)" />
          </div>

          <div class="relative bg-white shadow-xl">
            <div class="py-2 text-center bg-gray-700">
              <p class="text-xs font-bold tracking-widest text-white uppercase font-pj">
                Most Popular
              </p>
            </div>
            <div class="p-6 lg:px-10 lg:py-9">
              <div class="text-center">
                <p class="text-4xl">
                  ⚡️
                </p>
                <h3 class="mt-6 text-sm text-gray-900 font-bold tracking-widest uppercase font-pj">
                  Maker
                </h3>
                <p class="mt-1.5 font-pj text-sm text-gray-600">
                  Best for small business owners
                </p>
                <div class="flex items-end justify-center mt-6">
                  <p class="text-lg font-bold text-gray-400 font-pj">
                    $
                  </p>
                  <p class="text-4xl ml-0.5 font-bold text-gray-900 font-pj">
                    39
                  </p>
                  <p class="text-lg font-bold text-gray-400 font-pj">
                    /month
                  </p>
                </div>
              </div>

              <ul class="space-y-3 text-base font-medium text-gray-900 mt-9">
                <li class="flex items-center">
                  <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  3 Apps
                </li>

                <li class="flex items-center">
                  <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  10 channels¹
                </li>

                <li class="flex items-center">
                  <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  25,000 Monthly Live Updates¹
                </li>

                <li class="flex items-center">
                  <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  100 Version history¹
                </li>

                <li class="flex items-center">
                  <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  10 Shared Channel¹
                </li>

                <li class="flex items-center text-gray-400">
                  <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Advanced Reporting
                </li>
              </ul>

              <div class="mt-12 text-center">
                <a
                  href="https://web.capgo.app/register"
                  title="register"
                  class="
                                    flex
                                    items-center
                                    justify-center
                                    w-full
                                    px-4
                                    py-4
                                    text-base
                                    font-bold
                                    text-white
                                    transition-all
                                    duration-200
                                    bg-gray-900
                                    border border-transparent
                                    lg:px-8
                                    hover:bg-gray-700
                                    focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                    font-pj
                                "
                  role="button"
                >
                  <!-- Start 14 Days Trial -->
                  Start Trial
                </a>

                <p class="mt-4 text-sm text-gray-600 font-pj">
                  No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white">
          <div class="p-6 lg:px-10 lg:py-9">
            <div class="text-center">
              <p class="text-4xl">
                👓
              </p>
              <h3 class="mt-6 text-sm text-gray-900 font-bold tracking-widest uppercase font-pj">
                Team
              </h3>
              <p class="mt-1.5 font-pj text-sm text-gray-600">
                Best for medium Enterprise
              </p>
              <div class="flex items-end justify-center mt-6">
                <p class="text-lg font-bold text-gray-400 font-pj">
                  $
                </p>
                <p class="text-4xl ml-0.5 font-bold text-gray-900 font-pj">
                  99
                </p>
                <p class="text-lg font-bold text-gray-400 font-pj">
                  /month
                </p>
              </div>
            </div>

            <ul class="space-y-3 text-base font-medium text-gray-900 mt-9">
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                10 Apps
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                50 channels¹
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                250,000 Monthly Live Updates¹
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                1000 Version history¹
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                1000 Shared Channel¹
              </li>

              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Priority Support
              </li>

              <li class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Advanced Reporting
              </li>

              <li class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Progressive deployment
              </li>

              <li class="flex items-center text-gray-400">
                <svg class="w-5 h-5 mr-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                AB testing
              </li>
            </ul>

            <div class="mt-12 text-center">
              <a
                href="https://web.capgo.app/register"
                title="register"
                class="
                                flex
                                items-center
                                justify-center
                                w-full
                                px-4
                                py-4
                                text-base
                                font-bold
                                text-gray-900
                                transition-all
                                duration-200
                                bg-gray-100
                                border border-transparent
                                lg:px-8
                                hover:bg-gray-900 hover:text-white
                                focus:text-white focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                font-pj
                            "
                role="button"
              >
                <!-- Start 14 Days Trial -->
                Start Trial
              </a>

              <p class="mt-4 text-sm text-gray-600 font-pj">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>

      <p class="max-w-md mx-auto mt-8 text-2xl font-800 text-center text-pumpkin-orange-500 md:mt-16 font-pj">
        1 month free trial for all plans
      </p>
      <section class="py-12 sm:py-16 lg:py-20">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Need more ? Contact us for tailored plan
            </h2>
          </div>

          <div class="relative max-w-5xl mx-auto mt-8 md:mt-16">
            <div class="absolute -inset-4">
              <div class="w-full h-full mx-auto opacity-30 blur-lg filter" style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)" />
            </div>

            <div class="relative overflow-hidden bg-gray-900 rounded-2xl">
              <div class="px-16 py-8 sm:px-8 lg:px-16 lg:py-14">
                <div class="md:flex md:items-center md:space-x-12 lg:space-x-24">
                  <div class="grid grid-cols-1 gap-y-3 sm:grid-cols-2 gap-x-12 xl:gap-x-24">
                    <div>
                      <ul class="space-y-3 text-base font-medium text-white font-pj">
                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Unlimited updates
                        </li>

                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Bigger app size
                        </li>

                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          More version Storage
                        </li>
                      </ul>
                    </div>

                    <div>
                      <ul class="space-y-3 text-base font-medium text-white font-pj">
                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Custom domain
                        </li>

                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Special API access
                        </li>

                        <li class="flex items-center">
                          <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Bulk upload
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="block md:hidden lg:block">
                    <div class="hidden lg:block">
                      <svg class="w-4 h-auto text-gray-600" viewBox="0 0 16 123" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 11)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 46)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 81)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 116)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 18)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 53)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 88)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 123)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 25)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 60)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 95)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 32)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 67)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 102)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 39)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 74)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 109)" />
                      </svg>
                    </div>

                    <div class="block mt-10 md:hidden">
                      <svg class="w-auto h-4 text-gray-600" viewBox="0 0 172 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)" />
                        <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)" />
                      </svg>
                    </div>
                  </div>

                  <div class="mt-10 md:mt-0">
                    <a
                      href="#"
                      title="Get quote now"
                      class="
                                    inline-flex
                                    items-center
                                    justify-center
                                    px-9
                                    py-3.5
                                    mt-5
                                    text-base
                                    font-bold
                                    text-gray-900
                                    transition-all
                                    duration-200
                                    bg-white
                                    border border-transparent
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                                    font-pj
                                    hover:bg-opacity-90
                                    rounded-xl
                                "
                      role="button"
                      @click="openSupport()"
                    >
                      Get quote now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <p class="max-w-md mx-auto mt-8 text-base text-center text-gray-500 md:mt-16 font-pj">
        We don’t bill you automatically until your confirmation. We don’t store or sell your data to anyone.
      </p>
      <p class="max-w-md mx-auto mt-8 text-base text-center text-gray-500 md:mt-16 font-pj">
        (¹) each App can have this number.
      </p>
    </div>
  </section>
</template>
