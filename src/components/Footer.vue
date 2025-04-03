<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { locales, type Locales } from '@/services/locale'
import * as m from "../paraglide/messages.js"
import { getRelativeLocaleUrl } from 'astro:i18n'
import { defineComponent, h, onMounted, onUnmounted, ref } from 'vue'

const isOpen = ref(false)
const currentPath = ref('')
const config = useRuntimeConfig()
const brand = config.public.brand
const year = new Date().getFullYear()
const props = defineProps<{ locale: Locales }>()
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
const systemStatus = ref({ indicator: 'unknown', uptime: 'N/A' })

const decidePath = () => {
  if (typeof window !== 'undefined') {
    const tmp = window.location.pathname
    if (tmp.substring(0, 1) === '/' && tmp.substring(3, 4) === '/') currentPath.value = tmp.substring(3)
    else currentPath.value = tmp
  }
}

const statusChecker = async () => {
  try {
    const response = await fetch('/status.json')
    if (response.ok) systemStatus.value = await response.json()
    else console.error('Error fetching Capgo status:', response.statusText)
  } catch (error) {
    console.error('Error fetching Capgo status:')
    console.log(error)
  }
}

onMounted(() => {
  decidePath()
  statusChecker()
  window.addEventListener('hashchange', decidePath)
})

onUnmounted(() => window.removeEventListener('hashchange', decidePath))

interface NavigationItem {
  name: string | (() => void) | ReturnType<typeof defineComponent>
  href: string
  target?: string
  rel?: string
  icon?: string | (() => void) | ReturnType<typeof defineComponent>
  execute?: () => void
}

const navigation: Record<string, NavigationItem[]> = {
  solutions: [
    { name: m.register(), href: getRelativeLocaleUrl(props.locale, 'register'), target: '_blank' },
    { name: m.app_mobile(), href: getRelativeLocaleUrl(props.locale, 'app_mobile') },
    {
      name: m.documentation(),
      href: getRelativeLocaleUrl(props.locale, 'docs'),
    },
    { name: m.plugins(), href: getRelativeLocaleUrl(props.locale, 'plugins') },
    {
      name: m.awesome_capacitor(),
      href: 'https://github.com/riderx/awesome-capacitor/',
      target: '_blank',
    },
    { name: m.top_app_by_framework(), href: getRelativeLocaleUrl(props.locale, 'top_app') },
  ],
  support: [
    {
      name: m.community(),
      href: 'https://discord.com/invite/VnYRvBfgA6',
      target: '_blank',
    },
    {
      name: m.pricing(),
      href: getRelativeLocaleUrl(props.locale, 'pricing'),
    },
    { name: m.guides(), href: getRelativeLocaleUrl(props.locale, 'blog') },
    {
      name: () => (systemStatus.value.indicator === 'up' ? m.all_systems_normal() : m.systems_are_disturbed()),
      href: 'https://status.capgo.app/',
      target: '_blank',
      icon: () => (systemStatus.value.indicator === 'up' ? '🟢' : '🟠'),
    },
    { name: m.status(), href: 'https://status.capgo.app/', target: '_blank' },
    {
      name: m.chat(),
      href: 'mailto:support@capgo.app',
      rel: 'nofollow',
    },
    {
      name: m.sponsor(),
      href: getRelativeLocaleUrl(props.locale, 'sponsor'),
    },
  ],
  company: [
    { name: m.about(), href: getRelativeLocaleUrl(props.locale, 'about') },
    { name: m.imprint(), href: getRelativeLocaleUrl(props.locale, 'imprint') },
    { name: m.jobs(), href: 'https://console.algora.io/org/capgo/bounties?status=open/' },
    { name: m.contributing(), href: getRelativeLocaleUrl(props.locale, 'contributing') },
    { name: m.trust(), href: getRelativeLocaleUrl(props.locale, 'trust') },
    { name: m.consulting(), href: getRelativeLocaleUrl(props.locale, 'consulting') },
  ],
  legal: [
    { name: m.privacy(), href: getRelativeLocaleUrl(props.locale, 'privacy'), rel: 'nofollow' },
    { name: m.support_policy(), href: getRelativeLocaleUrl(props.locale, 'support-policy'), rel: 'nofollow' },
    { name: m.sla(), href: getRelativeLocaleUrl(props.locale, 'sla'), rel: 'nofollow' },
    { name: m.aup(), href: getRelativeLocaleUrl(props.locale, 'aup'), rel: 'nofollow' },
    { name: m.terms(), href: getRelativeLocaleUrl(props.locale, 'tos'), rel: 'nofollow' },
    { name: m.security_txt(), href: getRelativeLocaleUrl(props.locale, 'security'), rel: 'nofollow' },
    {
      name: m.privacy(),
      href: 'https://www.privacyboard.co/company/capgo/',
      target: '_blank',
    },
    { name: m.dp(), href: getRelativeLocaleUrl(props.locale, 'dp'), rel: 'nofollow' },
    { name: m.dpa(), href: getRelativeLocaleUrl(props.locale, 'dpa'), rel: 'nofollow' },
  ],
  hero: [
    {
      name: m.carbon_removal(),
      href: 'https://climate.stripe.com/vxDf62',
      icon: defineComponent({
        render: () =>
          h(
            'svg',
            {
              fill: 'currentColor',
              viewBox: '0 0 24 24',
              class: 'inline w-6 h-6 text-blue-600',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
              }),
            ],
          ),
      }),
    },
    {
      name: m.open_source(),
      href: 'https://github.com/Cap-go/',
      icon: `

      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 16 15" version="1.1">
<g id="surface1">
<path style=" stroke:none;fill-rule:evenodd;fill:#2664EC;fill-opacity:1;" d="M 7.976562 0 C 3.566406 0 0 3.4375 0 7.691406 C 0 11.089844 2.285156 13.96875 5.453125 14.984375 C 5.851562 15.0625 5.996094 14.820312 5.996094 14.617188 C 5.996094 14.4375 5.980469 13.828125 5.980469 13.191406 C 3.761719 13.648438 3.300781 12.273438 3.300781 12.273438 C 2.945312 11.382812 2.417969 11.152344 2.417969 11.152344 C 1.691406 10.683594 2.46875 10.683594 2.46875 10.683594 C 3.273438 10.734375 3.699219 11.472656 3.699219 11.472656 C 4.410156 12.644531 5.558594 12.3125 6.023438 12.109375 C 6.085938 11.613281 6.300781 11.269531 6.523438 11.078125 C 4.753906 10.898438 2.890625 10.238281 2.890625 7.28125 C 2.890625 6.441406 3.207031 5.753906 3.710938 5.21875 C 3.632812 5.027344 3.355469 4.238281 3.789062 3.183594 C 3.789062 3.183594 4.464844 2.980469 5.980469 3.972656 C 6.632812 3.804688 7.300781 3.71875 7.976562 3.71875 C 8.648438 3.71875 9.335938 3.808594 9.96875 3.972656 C 11.488281 2.980469 12.164062 3.183594 12.164062 3.183594 C 12.597656 4.238281 12.320312 5.027344 12.242188 5.21875 C 12.757812 5.753906 13.058594 6.441406 13.058594 7.28125 C 13.058594 10.238281 11.199219 10.886719 9.414062 11.078125 C 9.707031 11.320312 9.957031 11.777344 9.957031 12.503906 C 9.957031 13.535156 9.945312 14.363281 9.945312 14.617188 C 9.945312 14.820312 10.089844 15.0625 10.484375 14.984375 C 13.65625 13.96875 15.9375 11.089844 15.9375 7.691406 C 15.953125 3.4375 12.375 0 7.976562 0 Z M 7.976562 0 "/>
</g>
</svg>
      `,
    },
    {
      name: m.built_with_supabase(),
      href: 'https://supabase.com/',
      icon: defineComponent({
        render: () =>
          h(
            'svg',
            {
              fill: 'currentColor',
              viewBox: '0 0 24 24',
              class: 'inline w-6 h-6 text-blue-600',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
              }),
            ],
          ),
      }),
    },
    {
      name: m.build_in_public_on_twitter(),
      href: 'https://x.com/martindonadieu/',
      icon: defineComponent({
        render: () =>
          h(
            'svg',
            {
              fill: 'currentColor',
              viewBox: '0 0 26 26',
              class: 'inline w-6 h-6 text-blue-600',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                d: 'M 6 4 C 4.895 4 4 4.895 4 6 L 4 24 C 4 25.105 4.895 26 6 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 6 C 26 4.895 25.105 4 24 4 L 6 4 z M 8.6484375 9 L 13.259766 9 L 15.951172 12.847656 L 19.28125 9 L 20.732422 9 L 16.603516 13.78125 L 21.654297 21 L 17.042969 21 L 14.056641 16.730469 L 10.369141 21 L 8.8945312 21 L 13.400391 15.794922 L 8.6484375 9 z M 10.878906 10.183594 L 17.632812 19.810547 L 19.421875 19.810547 L 12.666016 10.183594 L 10.878906 10.183594 z',
              }),
            ],
          ),
      }),
    },
  ],
}
</script>

<template>
  <footer class="bg-white" aria-labelledby="footer-heading">
    [
    <h2 id="footer-heading" class="sr-only">{{ m.footer() }}</h2>
    <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-16">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <p class="text-base text-gray-500">{{ m.making_world_better() }}</p>
          <ul role="list" class="mt-4 space-y-4">
            <li v-for="item in navigation.hero" :key="item.name">
              <a :href="item.href" target="_blank" rel="noreferrer" class="flex">
                <div v-if="typeof item.icon === 'string'" class="w-6 h-6" aria-hidden="true" v-html="item.icon" />
                <component :is="item.icon" v-else class="w-6 h-6" aria-hidden="true" />
                <span class="ml-3 text-base font-bold text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                  {{ item.name }}
                </span>
              </a>
            </li>
          </ul>
          <div class="relative inline-block text-left">
            <div>
              <button
                type="button"
                @click="toggleDropdown"
                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-haspopup="true"
              >
                {{ props.locale.toUpperCase() }}
                <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              v-if="isOpen"
              class="absolute right-0 z-10 w-56 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <a
                  v-for="item in locales"
                  :href="getRelativeLocaleUrl(item.toLowerCase(), currentPath)"
                  role="menuitem"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {{ item.toUpperCase() }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-8 mt-12 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-base font-medium text-gray-900">{{ m.solutions() }}</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in navigation.solutions" :key="item.name">
                  <a
                    rel="noreferrer"
                    :href="item.href"
                    :target="item.target"
                    class="text-base text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 hover:text-gray-900 focus:border-blue-600"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-base font-medium text-gray-900">{{ m.support() }}</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in navigation.support" :key="item.name">
                  <a
                    :rel="item.rel"
                    :href="item.href"
                    :target="item.target"
                    class="text-base text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 hover:text-gray-900 focus:border-blue-600"
                    @click="item.execute && item.execute()"
                  >
                    <span v-if="item.icon" class="mr-2">{{ typeof item.icon === 'function' ? item.icon() : item.icon }}</span>
                    {{ typeof item.name === 'function' ? item.name() : item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-base font-medium text-gray-900">{{ m.company() }}</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in navigation.company" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-base text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 hover:text-gray-900 focus:border-blue-600"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-base font-medium text-gray-900">{{ m.legal() }}</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in navigation.legal" :key="item.name">
                  <a
                    :rel="item.rel"
                    :href="item.href"
                    class="text-base text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 hover:text-gray-900 focus:border-blue-600"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-8 mt-12 border-t border-gray-200">
        <p class="text-base text-gray-500 xl:text-center">&copy; {{ year }} {{ brand }}, Inc. {{ m.copyright() }}</p>
      </div>
    </div>
  </footer>
</template>
