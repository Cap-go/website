<!-- eslint-disable no-console -->
<script setup lang="ts">
import { createMeta } from '~/services/meta'
import { formatTime, randomArticle } from '~/services/blog'

const route = useRoute()
const page = await useAsyncData('articleData', async () => {
  return await queryContent('doc').where({ slug: route.params.id }).findOne()
})
const random = await useAsyncData('randomData', async () => {
  return page.data.value.next_blog !== ''
    ? await queryContent('doc')
      .where({ slug: page.data.value.next_blog })
      .findOne()
    : await randomArticle(page.data.value.slug)
})
useHead(() => ({
  titleTemplate: page.data.value.title || 'No title',
  meta: createMeta(
    page.data.value.title || 'No title',
    page.data.value.description || 'No description',
    page.data.value.author || 'Capgo',
  ),
}))
</script>

<template>
  <main class="text-center text-white">
    <h1 class="py-5 text-3xl lg:text-4xl lg:max-w-1/2 px-4 font-800 mx-auto">
      {{ page.data.value.title }}
    </h1>
    <article
      class="mx-auto text-left text-white prose text-white pb-4 px-4 lg:max-w-1/2"
    >
      <ContentRenderer :value="page.data.value" />
    </article>
  </main>
</template>
