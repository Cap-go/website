<script setup lang="ts">
import { marked } from 'marked'
import { ArrowUpRightIcon } from '@heroicons/vue/20/solid'

interface Action {
  icon?: any
  href: string
  title: string
  name?: string
  author: string
  description: string
  iconForeground?: string
  iconBackground?: string
}
const actions: Action[] = [
  {
    name: '@capgo/cli',
    author: 'github.com/riderx',
    description: 'A CLI to upload to capgo servers',
    href: 'https://github.com/Cap-go/capgo-cli',
    title: 'CLI',
  },
  {
    name: '@capgo/standard-version',
    author: 'Martin Donadieu',
    description: 'replacement for `npm version` with automatic CHANGELOG generation',
    href: 'https://github.com/Cap-go/standard-version',
    title: 'Standard Version',
  },
  {
    name: '@capgo/native-market',
    author: 'Martin Donadieu',
    description: 'A native market plugin for linking to google play or app store.',
    href: 'https://github.com/riderx/native-market',
    title: 'Native Market',
  },
  {
    name: '@capgo/capacitor-native-biometric',
    author: 'Jose Martinez',
    description: 'This plugin gives access to the native biometric apis for android and iOS',
    href: 'https://github.com/Cap-go/capacitor-native-biometric',
    title: 'Native Biometric',
  },
  {
    name: '@capgo/camera-preview',
    author: 'Martin Donadieu',
    description: 'Camera preview',
    href: 'https://github.com/Cap-go/camera-preview',
    title: 'Camera Preview',
  },
  {
    name: '@capgo/google-play-scraper',
    author: 'Facundo Olano',
    description: 'scrapes app data from google play store',
    href: 'https://github.com/facundoolano/google-play-scraper',
    title: 'Google Play Scraper',
  },
  {
    name: '@capgo/ngx-intl-tel-input-app',
    author: 'Unknown',
    description: '[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)',
    href: 'N/A',
    title: 'International Telephone Input',
  },
  {
    name: '@capgo/konsta',
    author: 'Vladimir Kharlampidi',
    description: 'Mobile UI components made with Tailwind CSS',
    href: 'https://github.com/konstaui/konsta',
    title: 'Konsta',
  },
  {
    name: '@capgo/capacitor-updater',
    author: 'Martin Donadieu',
    description: 'Live update for capacitor apps',
    href: 'https://github.com/Cap-go/capacitor-updater',
    title: 'Updater',
  },
  {
    name: '@capgo/capacitor-purchases',
    author: 'Martin Donadieu',
    description: 'In-app Subscriptions Made Easy with RevenueCat sdk',
    href: 'https://github.com/Cap-go/capacitor-purchases',
    title: 'Purchases',
  },
  {
    name: '@capgo/capacitor-flash',
    author: 'Martin Donadieu',
    description: 'Switch the Flashlight / Torch of your device.',
    href: 'https://github.com/riderx/capacitor-flash',
    title: 'Flash',
  },
  {
    name: '@capgo/capacitor-screen-recorder',
    author: 'Martin Donadieu',
    description: "Record device's screen",
    href: 'https://github.com/riderx/capacitor-screen-recorder',
    title: 'Screen Recorder',
  },
  {
    name: '@capgo/capacitor-crisp',
    author: 'Martin Donadieu',
    description: 'Crisp native SDK for capacitor',
    href: 'https://github.com/Cap-go/capacitor-crisp',
    title: 'Crisp',
  },
  {
    name: '@capgo/nativegeocoder',
    author: 'Martin Donadieu',
    description: 'Capacitor plugin for native forward and reverse geocoding',
    href: 'https://github.com/Cap-go/capacitor-nativegeocoder',
    title: 'Native Geocoder',
  },
  {
    name: '@capgo/inappbrowser',
    author: 'Martin Donadieu',
    description: 'Capacitor plugin in app browser',
    href: 'https://github.com/Cap-go/capacitor-inappbrowser',
    title: 'In App Browser',
  },
  {
    name: '@capgo/capacitor-mute',
    author: 'Martin donadieu',
    description: 'Detect if the mute switch is enabled/disabled on a device',
    href: 'https://github.com/riderx/capacitor-mute',
    title: 'Mute',
  },
  {
    name: '@capgo/angular-ng-stepper',
    author: 'Giorgi Merabishvili',
    description: 'Angular stepper',
    href: 'https://github.com/gmerabishvili/angular-ng-stepper',
    title: 'Stepper',
  },
  {
    name: '@capgo/native-audio',
    author: 'Martin Donadieu',
    description: 'A native plugin for native audio engine',
    href: 'https://github.com/Cap-go/native-audio',
    title: 'Native Audio',
  },
  {
    name: '@capgo/capacitor-shake',
    author: 'Martin Donadieu',
    description: 'Detect shake gesture in device',
    href: 'https://github.com/Cap-go/capacitor-shake',
    title: 'Shake',
  },
  {
    name: '@capgo/capacitor-navigation-bar',
    author: 'Martin Donadieu',
    description: 'Set navigation bar color for android lolipop and higher',
    href: 'https://github.com/Cap-go/capacitor-navigation-bar',
    title: 'Navigation Bar',
  },
  {
    name: '@capgo/ivs-player',
    author: 'Martin Donadieu',
    description: 'Ivs player for capacitor app',
    href: 'https://github.com/Cap-go/ivs-player',
    title: 'IVS Player',
  },
  {
    name: '@capgo/home-indicator',
    author: 'Martin Donadieu',
    description: 'hide and show home button indicator in Capacitor app',
    href: 'https://github.com/Cap-go/home-indicator',
    title: 'Indicator',
  },
  {
    name: '@capgo/find-package-manager',
    author: 'github.com/riderx',
    description: 'Live update for capacitor apps',
    href: 'https://github.com/Cap-go/find-package-manager',
    title: 'Package Manager',
  },
  {
    name: '@capgo/native-purchases',
    author: 'Martin donadieu',
    description: 'In-app Subscriptions Made Easy',
    href: 'https://github.com/Cap-go/native-purchases',
    title: 'Native Purchases',
  },
  {
    name: '@capgo/capacitor-fingerprint',
    author: 'Martin Donadieu',
    description: 'Capacitor client for Fingerprint PRO. 100% accurate device identification for fraud detection.',
    href: 'https://github.com/Cap-go/capacitor-fingerprint',
    title: 'Fingerprint',
  },
  {
    name: '@capgo/capacitor-callkit-voip',
    author: 'Martin Donadieu',
    description: 'Provide PushKit functionality to ionic capacitor',
    href: 'https://github.com/Cap-go/capacitor-callkit-voip',
    title: 'CallKit VOIP',
  },
  {
    name: '@capgo/logsnag',
    author: 'Shayan',
    description: 'LogSnag Client',
    href: 'https://github.com/LogSnag/logsnag.js',
    title: 'LogSang',
  },
  {
    name: '@capgo/walletconnect',
    author: 'Martin Donadieu',
    description: 'WIP: Capacitor plugin for WalletConnect',
    href: 'N/A',
    title: 'WalletConnect',
  },
].map((i: Action) => ({
  ...i,
  description: marked.parse(i.description),
}))
</script>

<template>
  <div class="z-10 mt-24 mb-24 flex w-full flex-col md:items-center">
    <h1 class="px-10 text-4xl font-bold md:text-center md:text-6xl">Powerful App Plugins</h1>
    <h2 class="mt-8 px-10 max-w-full lg:max-w-[75%] text-2xl font-light md:text-center">
      Enterprise-grade plugins with great documentation, ongoing updates, code snippets and premium support so you can focus on building your app.
    </h2>
    <div v-if="actions" class="mt-12 flex w-full flex-col items-start px-10 sm:mt-24 sm:flex-row sm:justify-center lg:max-w-6xl xl:px-0">
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:mt-0 xl:grid-cols-3">
        <a
          v-for="item in actions"
          :key="item.href"
          :href="`/plugins/${item.href.substring(item.href.lastIndexOf('/') + 1)}`"
          class="group flex flex-col overflow-hidden rounded border border-gray-600 shadow hover:shadow-white md:max-w-sm"
        >
          <div class="flex flex-col p-3">
            <div class="text-lg font-bold text-white">{{ item.title }}</div>
            <div class="mt-3 line-clamp-2 w-full break-all text-sm text-gray-200" v-html="item.description" />
          </div>
          <div class="mt-auto flex flex-row items-center justify-between p-3">
            <span class="text-sm font-light text-gray-400">by {{ item.author }}</span>
            <component :is="ArrowUpRightIcon" class="h-[18px] w-[18px] fill-gray-500 group-hover:fill-white" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
