<script setup lang="ts">
import type { Locales } from '@/services/locale'
import * as m from "../paraglide/messages.js"
import { ref } from 'vue'
import Tweet from './Tweet.vue'

const props = defineProps<{ locale: Locales }>()

const tweets = ref([
  {
    image: '/andrew.webp',
    name: 'Andrew Peacock',
    handle: '_andypeacock',
    message:
      "Here's my view:\n\nReact-native: Too many moving parts that eventually broke.\n\nFlutterflow: new language, stumbled on first attempt to add a plugin.\n\nNow: @Capacitor + @vue or @react + @VoltBuilder + @Capgo 🤘",
  },
  {
    image: '/lincoln.webp',
    name: 'Lincoln Baxter',
    handle: 'lincolnthree',
    message: 'The community needed this and @Capgo is doing something really important!',
  },
  {
    image: '/avatar-female-1.webp',
    name: 'Bessie Cooper',
    handle: 'bessiecooper',
    message: '@Capgo is a must have tools for developers, who want to be more productive. Avoiding review for bugfix is golden.',
  },
  {
    image: '/LevarBerry.webp',
    name: 'LeVar Berry',
    handle: 'levarberry',
    message: 'Cancelled my @Appflow subscription after 4 years. Code-Push never seemed to work well, hopefully @CapGO has it figured out',
  },
  {
    image: '/mallats.webp',
    name: 'Mallats',
    handle: 'mallats',
    message: 'We really appreciate @Capgo, will be supporting this project from the Mallats team.\nAwaiting approval from the App Stores.',
  },
  {
    image: '/mantica.webp',
    name: 'Rodrigo Mantica',
    handle: 'manticarodrigo',
    message:
      ' We practice agile development and @Capgo is mission-critical in delivering continuously to our users!\n\n Thanks @martindonadieu for your hard work and I will definitely be supporting this community as well.',
  },
  {
    image: '/jaythegeek.webp',
    name: 'jaythegeek',
    handle: 'jaythegeek',
    message:
      'Did setup @Capgo and testing out this awesome replacement for @AppFlow!\n\n Thank you for the hard work, it has been easy so far. About to release to the app stores 🤞',
  },
  {
    image: '/colenso.webp',
    name: 'colenso',
    handle: 'colenso',
    message:
      "We rolled out Capgo OTA updates in production for our user base of +5000.\n\ We're seeing very smooth operation almost all our users are upto date within minutes of the OTA being deployed to @Capgo.",
  },
  {
    image: '/avatar-male-2.webp',
    name: 'jermaine',
    handle: 'jermaine',
    message: "Jumped over to @Capgo after @AppFlow hit us with a $5000 bill for the year to continue.\n\nLoving CapoGo so far. Thanks for @Capgo, it's a great product.",
  },
  {
    image: '/osirisrex.webp',
    name: "NASA's OSIRIS-REx",
    handle: 'osirisrex',
    message: '@Capgo is a smart way to make hot code pushes (and not for all the money in the world like with @AppFlow) 🙂',
  },
  {
    image: '/avatar-male-3.webp',
    name: 'SP-CMingay',
    handle: 'SP-CMingay',
    message:
      "I've got self hosted updates working with very little work on my part! \n\nI've proposed with my bosses that we consider @Capgo app for automated updates as well so I will begin giving that a go now too.",
  },
  {
    image: '/simon.webp',
    name: 'Simon Flack',
    handle: 'simonflack',
    message: 'We are currently giving a try to @Capgo since Appcenter stopped live updates support on hybrid apps and @AppFlow is way too expensive.',
  },
])
</script>

<template>
  <section class="bg-gray-800">
    <div class="p-0 m-0 leading-6 text-black align-baseline border-0 border-solid">
      <div class="grid px-0 py-20 m-auto text-black align-baseline border-0 border-solid" style="row-gap: 40px; max-width: 1248px">
        <h2
          class="px-8 py-0 m-0 text-3xl tracking-tight text-center text-gray-200 align-baseline border-0 border-solid font-boldSave time with auto font-pj sm:text-4xl xl:text-5xl"
        >
          {{ m.they_love_capgo() }}
        </h2>
        <div class="md:max-h[1000px] m-0 flex flex-wrap items-center border-0 border-solid p-0 align-baseline md:flex-col">
          <Tweet v-for="tweet in tweets" :key="tweet.handle" :tweet="tweet" />
        </div>
      </div>
    </div>
  </section>
</template>
