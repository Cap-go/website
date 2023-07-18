<script setup>
import {
  BoltIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  GlobeEuropeAfricaIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ViewfinderCircleIcon,
} from '@heroicons/vue/20/solid'

const actions = [
  {
    title: 'Updater',
    description: 'Update Ionic Capacitor apps without App/Play Store review (Code-push / hot-code updates).',
    href: 'https://github.com/Cap-go/capacitor-updater',
    icon: ClockIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'Crisp',
    description: 'Crisp native SDK integration.',
    href: 'https://github.com/Cap-go/capacitor-crisp',
    icon: ChatBubbleLeftIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'Purchases',
    description: 'In-app purchases and subscriptions made easy.',
    href: 'https://github.com/Cap-go/capacitor-purchases',
    icon: CurrencyDollarIcon,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'Native geocoder',
    description: 'Capacitor plugin for native forward and reverse geocoding.',
    href: 'https://github.com/Cap-go/capacitor-nativegeocoder',
    icon: GlobeEuropeAfricaIcon,
    iconForeground: 'text-pumpkinOrange-500',
    iconBackground: 'bg-pumpkinOrange-50',
  },
  // {
  //   title: 'Video recorder',
  //   description: 'A video recording plugin for Capacitor that allows applications to use the native camera and microphone.',
  //   href: 'https://github.com/Cap-go/capacitor-video-recorder',
  //   icon: VideoCameraIcon,
  //   iconForeground: 'text-rose-700',
  //   iconBackground: 'bg-rose-50',
  // },
  // {
  //   title: 'Rate app',
  //   description: 'Let users rate your app using native review app dialog for both Android and iOS.',
  //   href: 'https://github.com/Cap-go/capacitor-rate-app',
  //   icon: StarIcon,
  //   iconForeground: 'text-indigo-700',
  //   iconBackground: 'bg-indigo-50',
  // },
  {
    title: 'Native market',
    description: 'Capacitor community plugin for native market for Play Store/App Store.',
    href: 'https://github.com/Cap-go/native-market',
    icon: BuildingStorefrontIcon,
    iconForeground: 'text-emerald-700',
    iconBackground: 'bg-emerald-50',
  },
  {
    title: 'In app browser',
    description: 'Capacitor plugin in app browser with urlChangeEvent.',
    href: 'https://github.com/Cap-go/capacitor-inappbrowser',
    icon: GlobeAltIcon,
    iconForeground: 'text-amber-700',
    iconBackground: 'bg-amber-50',
  },
  {
    title: 'Mute detection',
    description: 'Detect if the mute switch is enabled/disabled on a IOS device.',
    href: 'https://github.com/Cap-go/capacitor-mute',
    icon: SpeakerXMarkIcon,
    iconForeground: 'text-lime-700',
    iconBackground: 'bg-lime-50',
  },
  {
    title: 'Screen recorder',
    description: 'Record the screen of the phone with native API.',
    href: 'https://github.com/Cap-go/capacitor-screen-recorder',
    icon: ViewfinderCircleIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'Flash',
    description: 'Switch the Flashlight / Torch of your device.',
    href: 'https://github.com/Cap-go/capacitor-flash',
    icon: BoltIcon,
    iconForeground: 'text-amber-700',
    iconBackground: 'bg-amber-50',
  },
  {
    title: 'Native audio',
    description: 'Play sound with native audio engine.',
    href: 'https://github.com/Cap-go/native-audio',
    icon: SpeakerWaveIcon,
    iconForeground: 'text-fuchsia-700',
    iconBackground: 'bg-fuchsia-50',
  },
]
useHead({
  title: 'Capgo plugins',
  meta: createMeta(
    'Capgo plugins',
    'Move forward with confidence. Capgo offer multiple plugins to help you build your app faster and better.'),
})
</script>

<template>
  <div>
    <div class="relative py-16 lg:py-24 px-4 sm:px-16 mx-auto max-w-7xl">
      <div class="text-center">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block text-indigo-600">Powerful </span><span class="block text-white"><span /> App plugins</span>
        </h1><p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Enterprise-grade
          <span /> plugins with great documentation,
          <span />ongoing updates, code snippets and premium support so you can focus on building your <span /> app.
        </p>
      </div>
    </div>

    <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 w-1/2 mx-auto my-10">
      <div v-for="(action, actionIdx) in actions" :key="action.title" class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500" :class="[actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '', actionIdx === 1 ? 'sm:rounded-tr-lg' : '', actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '', actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '']">
        <div>
          <span class="rounded-lg inline-flex p-3 ring-4 ring-white" :class="[action.iconBackground, action.iconForeground]">
            <component :is="action.icon" class="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <div class="mt-8">
          <h3 class="text-lg font-medium">
            <NuxtLink :to="action.href" target="_blank" class="focus:outline-none text-black">
              <!-- Extend touch target to entire panel -->
              <span class="absolute inset-0" aria-hidden="true" />
              {{ action.title }}
            </NuxtLink>
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ action.description }}
          </p>
        </div>
        <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>
