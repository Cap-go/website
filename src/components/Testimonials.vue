<script setup lang="ts">
import * as m from '@/paraglide/messages'
import type { Locales } from '@/services/locale'

const props = defineProps<{ locale: Locales }>()

// Define featured testimonial
const featuredTestimonial = {
  author: {
    name: 'Andrew Peacock',
    handle: '_andypeacock',
    imageUrl: '/andrew.webp',
  },
  body: "Here's my view:\nReact-native: Too many moving parts that eventually broke.\nFlutterflow: new language, stumbled on first attempt to add a plugin.\nNow: @Capacitor + @vue or @react + @VoltBuilder + @Capgo 🤘",
}

// Define other testimonials
const testimonials = [
  [
    [
      {
        author: {
          name: 'Lincoln Baxter',
          handle: 'lincolnthree',
          imageUrl: '/lincoln.webp',
        },
        body: 'The community needed this and @Capgo is doing something really important!',
      },
      {
        author: {
          name: "NASA's OSIRIS-REx",
          handle: 'osirisrex',
          imageUrl: '/osirisrex.webp',
        },
        body: '@Capgo is a smart way to make hot code pushes (and not for all the money in the world like with @AppFlow) 🙂',
      },
      {
        author: {
          name: 'Bessie Cooper',
          handle: 'bessiecooper',
          imageUrl: '/avatar-female-1.webp',
        },
        body: '@Capgo is a must have tools for developers, who want to be more productive. Avoiding review for bugfix is golden.',
      },
      {
        author: {
          name: 'Simon Flack',
          handle: 'simonflack',
          imageUrl: '/simon.webp',
        },
        body: 'We are currently giving a try to @Capgo since Appcenter stopped live updates support on hybrid apps and @AppFlow is way too expensive.',
      },
    ],
    [
      {
        author: {
          name: 'LeVar Berry',
          handle: 'levarberry',
          imageUrl: '/LevarBerry.webp',
        },
        body: 'Cancelled my @Appflow subscription after 4 years. Code-Push never seemed to work well, hopefully @CapGO has it figured out',
      },
      {
        author: {
          name: 'Mallats',
          handle: 'mallats',
          imageUrl: '/mallats.webp',
        },
        body: 'We really appreciate @Capgo, will be supporting this project from the Mallats team.\nAwaiting approval from the App Stores.',
      },
    ],
  ],
  [
    [
      {
        author: {
          name: 'Rodrigo Mantica',
          handle: 'manticarodrigo',
          imageUrl: '/mantica.webp',
        },
        body: 'We practice agile development and @Capgo is mission-critical in delivering continuously to our users!\n\nThanks @martindonadieu for your hard work and I will definitely be supporting this community as well.',
      },
      {
        author: {
          name: 'jaythegeek',
          handle: 'jaythegeek',
          imageUrl: '/jaythegeek.webp',
        },
        body: 'Did setup @Capgo and testing out this awesome replacement for @AppFlow!\n\nThank you for the hard work, it has been easy so far. About to release to the app stores 🤞',
      },
    ],
    [
      {
        author: {
          name: 'colenso',
          handle: 'colenso',
          imageUrl: '/colenso.webp',
        },
        body: "We rolled out Capgo OTA updates in production for our user base of +5000.\nWe're seeing very smooth operation almost all our users are upto date within minutes of the OTA being deployed to @Capgo.",
      },
      {
        author: {
          name: 'SP-CMingay',
          handle: 'SP-CMingay',
          imageUrl: '/avatar-male-3.webp',
        },
        body: "I've got self hosted updates working with very little work on my part! \n\nI've proposed with my bosses that we consider @Capgo app for automated updates as well so I will begin giving that a go now too.",
      },
      {
        author: {
          name: 'jermaine',
          handle: 'jermaine',
          imageUrl: '/avatar-male-2.webp',
        },
        body: "Jumped over to @Capgo after @AppFlow hit us with a $5000 bill for the year to continue.\n\nLoving CapoGo so far. Thanks for @Capgo, it's a great product.",
      },
    ],
  ],
]

// Format message to highlight Twitter handles
const messageFormatter = (message: string) => message.replace(/(@\w+)/g, '<span class="text-indigo-400">$1</span>').replace(/\n/g, '<br/>')
</script>

<template>
  <section class="relative pt-24 pb-32 bg-gray-900 isolate sm:pt-32">
    <!-- Background effects -->
    <div class="absolute inset-x-0 overflow-hidden -translate-y-1/2 top-1/2 -z-10 transform-gpu opacity-30 blur-3xl" aria-hidden="true">
      <div
        class="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-indigo-500 to-blue-500"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div class="absolute inset-x-0 top-0 flex pt-32 overflow-hidden opacity-25 -z-10 transform-gpu blur-3xl sm:pt-40 xl:justify-end" aria-hidden="true">
      <div
        class="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-indigo-500 to-blue-500 xl:ml-0 xl:mr-[calc(50%-12rem)]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>

    <div class="px-6 mx-auto max-w-7xl lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="font-semibold text-indigo-400 text-base/7">Testimonials</h2>
        <p class="mt-2 text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl">
          {{ m.they_love_capgo({}, { locale: props.locale }) }}
        </p>
      </div>

      <div class="grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 mx-auto mt-16 text-gray-300 text-sm/6 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
        <figure class="bg-gray-800 shadow-lg rounded-2xl ring-1 ring-gray-700 sm:col-span-2 xl:col-start-2 xl:row-end-1">
          <blockquote class="p-6 tracking-tight text-white text-lg/4 sm:p-12 sm:text-xl/8">
            <p v-html="messageFormatter(featuredTestimonial.body)"></p>
          </blockquote>
          <figcaption class="flex flex-wrap items-center px-6 py-4 border-t border-gray-700 gap-x-4 gap-y-4 sm:flex-nowrap">
            <img class="flex-none bg-gray-800 rounded-full size-10" :src="featuredTestimonial.author.imageUrl" :alt="featuredTestimonial.author.name" />
            <div class="flex-auto">
              <div class="font-semibold text-white">{{ featuredTestimonial.author.name }}</div>
              <div class="text-gray-400">{{ `@${featuredTestimonial.author.handle}` }}</div>
            </div>
            <div class="size-5">
              <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                  fill="white"
                />
              </svg>
            </div>
          </figcaption>
        </figure>

        <div v-for="(columnGroup, columnGroupIdx) in testimonials" :key="columnGroupIdx" class="space-y-8 xl:contents xl:space-y-0">
          <div
            v-for="(column, columnIdx) in columnGroup"
            :key="columnIdx"
            :class="[
              (columnGroupIdx === 0 && columnIdx === 0) || (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                ? 'xl:row-span-2'
                : 'xl:row-start-1',
              'space-y-8',
            ]"
          >
            <figure v-for="testimonial in column" :key="testimonial.author.handle" class="p-6 bg-gray-800 shadow-lg rounded-2xl ring-1 ring-gray-700">
              <blockquote class="text-white">
                <p v-html="messageFormatter(testimonial.body)"></p>
              </blockquote>
              <figcaption class="flex items-center mt-6 gap-x-4">
                <img class="bg-gray-800 rounded-full size-10" :src="testimonial.author.imageUrl" :alt="testimonial.author.name" />
                <div>
                  <div class="font-semibold text-white">{{ testimonial.author.name }}</div>
                  <div class="text-gray-400">{{ `@${testimonial.author.handle}` }}</div>
                </div>
                <div class="ml-auto size-4">
                  <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
