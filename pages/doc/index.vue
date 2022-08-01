<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import { ChevronRightIcon } from '@heroicons/vue/solid'
import { indexDocContent } from '~/services/search'
import { createMeta } from '~/services/meta'

indexDocContent()

const route = useRoute()
// eslint-disable-next-line no-console
console.log(route.hash)

const title = 'Capgo | Documentation'
const description = 'The Official Capgo Documentation.'
const { data: sections } = await useAsyncData('count', () =>
  queryContent('doc').find(),
)

const sectionsOrder = computed(() =>
  // Move the 'Home' section to the top of the list
  sections.value.filter(section => section.slug === 'Home').concat(
    sections.value.filter(section => section.slug !== 'Home'),
  ),
)

const selectedSectionName = ref(route.hash.slice(1) || 'Home')

// Close the mobile panel when the user clicks on a section link of it
async function accept(close: () => void) {
  close()
}

useHead(() => ({
  titleTemplate: title,
  meta: createMeta(
    title,
    description,
    'Capgo',
  ),
}))
</script>

<template>
  <section class="py-12 bg-white sm:py-16 lg:py-20">
    <div class="px-4 mx-5">
      <div class="grid grid-cols-1 gap-y-8 lg:grid-cols-8 lg:gap-x-12 xl:gap-x-20">
        <div id="mobile-menu" class="lg:hidden mx-auto w-full rounded-2xl bg-white">
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full justify-between rounded-lg text-black py-2 text-left text-3xl font-medium ">
              <span>Sections</span>
              <ChevronRightIcon :class="open ? 'transform rotate-90' : ''" class="h-8 w-8 text-gray-900" />
            </DisclosureButton>
            <DisclosurePanel v-slot="{ close }" class="text-lg font-bold text-gray-900">
              <ul class="list-none">
                <li v-for="section in sectionsOrder" :key="section.title" class="py-2">
                  <a
                    :href="`#${section.slug}`"
                    class="text-gray-900"
                    :class="{
                      'text-gray-900': section.slug === selectedSectionName,
                      'text-gray-600': section.slug !== selectedSectionName,
                    }"
                    @click="selectedSectionName = section.slug; accept(close)"
                  >
                    {{ section.title }}
                  </a>
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
        </div>
        <div id="desktop-menu" class="hidden lg:block lg:col-span-2">
          <p class="text-lg font-bold text-gray-900">
            Sections
          </p>

          <div class="relative mt-5">
            <hr class="border-t border-gray-200">
            <hr class="absolute inset-y-0 left-0 w-1/3 border-t border-gray-900">
          </div>

          <div class="mt-6 space-y-6">
            <div
              v-for="(section, index) in sectionsOrder"
              :key="index" class="relative flex items-start"
            >
              <div class="flex-1">
                <p class="text-base font-bold text-gray-900">
                  <a
                    :href="`#${section.slug}`" :title="section.title" @click="selectedSectionName = section.slug"
                  >
                    {{ section.title }}
                    <span class="absolute inset-0" aria-hidden="true" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-6 rounded-xl">
          <article
            class="mx-auto text-left text-gray-800"
          >
            <h1 class="py-5 text-4xl lg:text-6xl font-800">
              {{ sections.find((value) => value.slug === selectedSectionName)?.title }}
            </h1>
            <hr class="py-3">
            <ContentRenderer
              class="prose"
              :value="sections.find((value) => value.slug === selectedSectionName)"
            />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
