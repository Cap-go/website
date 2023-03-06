<!-- eslint-disable vue/one-component-per-file -->
<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { openMessenger } from '~/services/crisp'
const router = useRouter()
router.afterEach((to) => {
  if (to.hash && to.hash.startsWith('#support'))
    openMessenger()
})
router.currentRoute.value.hash.startsWith('#support') && openMessenger()
const config = useRuntimeConfig()
const brand = config.brand
const year = new Date().getFullYear()
// no-rel target="_blank"
const navigation = {
  solutions: [
    { name: 'Community', href: 'https://discord.gg/VnYRvBfgA6', target: '_blank' },
    { name: 'App mobile', href: '/app_mobile/' },
    { name: 'Documentation', href: 'https://docs.capgo.app/', target: '_blank' },
    { name: 'Plugins', href: '/plugins/' },
    { name: 'Awesome capacitor', href: 'https://github.com/riderx/awesome-capacitor', target: '_blank' },
    { name: 'Top capacitor app', href: '/top_capacitor_app' },
    // { name: 'Top cordova app', href: '/top_cordova_app' },
    // { name: 'Top react native app', href: '/top_react_native_app' },
    // { name: 'Top flutter app', href: '/top_flutter_app' },
    // { name: 'Top kotlin app', href: '/top_kotlin_app' },
    // { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '/pricing/' },
    { name: 'Guides', href: '/blog/' },
    { name: 'Status', href: 'https://status.capgo.app/', target: '_blank' },
    { name: 'Chat', href: '#support' },
  ],
  company: [
    // { name: 'About', href: '#' },
    // { name: 'Blog', href: '#' },
    // { name: 'Jobs', href: '#' },
    { name: 'Imprint', href: '/imprint/' },
    { name: 'Contributing', href: '/contributing/' },
    { name: 'Security', href: '/trust/' },
    { name: 'Consulting', href: '/consulting/' },
    { name: 'Affiliate', href: 'https://capgo.getrewardful.com/', target: '_blank' },
  ],
  legal: [
    // { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '/privacy/' },
    { name: 'Terms', href: '/tos/' },
    { name: 'Privacy Board', href: 'https://www.privacyboard.co/company/capgo/', target: '_blank' },
  ],
  hero: [
    {
      name: '5% of revenue go to carbon removal',
      href: 'https://climate.stripe.com/vxDf62',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'inline w-6 h-6 text-blue-600' }, [
            h('path', {
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': 2,
              'd': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
            }),
          ]),
      }),
    },
    {
      name: '100% open-source',
      href: 'https://github.com/Cap-go',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'inline w-6 h-6 text-blue-600' }, [
            h('path', {
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': 2,
              'd': 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
            }),
          ]),
      }),
    },
    {
      name: 'Built with Supabase',
      href: 'https://supabase.com/',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'inline w-6 h-6 text-blue-600' }, [
            h('path', {
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': 2,
              'd': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
            }),
          ]),
      }),
    },
    {
      name: 'Build in public on Twitter',
      href: 'https://twitter.com/Capgo_app',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', class: 'inline w-6 h-6 text-blue-600' }, [
            h('path', {
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': 2,
              'd': 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
            }),
          ]),
      }),
    },
  ],
}
</script>

<template>
  <footer class="bg-white" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">
      Footer
    </h2>
    <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <!-- <img class="h-10" src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=300" alt="Company name"> -->
          <p class="text-base text-gray-500">
            Making the world a better place through constructing elegant apps.
          </p>
          <ul role="list" class="mt-4 space-y-4">
            <li v-for="item in navigation.hero" :key="item.name">
              <a :href="item.href" target="_blank" no-rel>
                <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                <span class="ml-3 text-base font-bold text-gray-400 duration-200 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"> {{ item.name }} </span>
              </a>
            </li>
          </ul>
        </div>
        <div class="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-base font-medium text-gray-900">
                Solutions
              </h3>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in navigation.solutions" :key="item.name">
                  <a :href="item.href" :target="item.target" no-rel class="text-base text-gray-500 hover:text-gray-900 duration-200 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-base font-medium text-gray-900">
                Support
              </h3>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in navigation.support" :key="item.name">
                  <a :href="item.href" :target="item.target" no-rel class="text-base text-gray-500 hover:text-gray-900 duration-200 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-base font-medium text-gray-900">
                Company
              </h3>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in navigation.company" :key="item.name">
                  <a :href="item.href" class="text-base text-gray-500 hover:text-gray-900 duration-200 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-base font-medium text-gray-900">
                Legal
              </h3>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in navigation.legal" :key="item.name">
                  <a :href="item.href" class="text-base text-gray-500 hover:text-gray-900 duration-200 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 border-t border-gray-200 pt-8">
        <p class="text-base text-gray-400 xl:text-center">
          &copy; {{ year }} {{ brand }}, Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
