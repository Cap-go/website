<template>
  <App id="tc-demo-root" :theme="platform" :dark="dark" class="tc-demo-app h-full w-full">
    <Page class="safe-areas tc-demo-page">
      <Navbar
        class="tc-demo-chrome-navbar"
        :title="pageTitle"
        :subtitle="platformLabel"
        :outline="platform === 'ios'"
        :center-title="platform === 'ios'"
        :translucent="false"
      />

      <div class="tc-demo-below-navbar tc-demo-app-screen">
        <section class="tc-demo-single-component px-3 pb-8">
          <component :is="sceneComponent" v-if="sceneComponent" class="tc-demo-scene tc-demo-scene-stage mb-4" />
          <article v-for="state in galleryStates" :key="state.id" class="tc-demo-state-block mb-6 last:mb-2">
            <h3 class="tc-demo-state-heading">{{ state.label }}</h3>
            <div
              :data-tc-demo-state="state.id"
              class="tc-demo-component-stage"
              :class="state.id === 'sheet-open' || state.id === 'open' ? 'tc-demo-state-overlay-preview' : undefined"
            >
              <component :is="state.component" />
            </div>
          </article>
        </section>
      </div>
    </Page>

    <div class="tc-demo-overlay-host" data-tc-overlay-host>
        <Actions v-if="actionsOpen" :opened="true" @backdropclick="actionsOpen = false">
          <ActionsGroup>
            <ActionsLabel>Actions</ActionsLabel>
            <ActionsButton @click="actionsOpen = false">
              <template #media>
                <Icon material="share" />
              </template>
              Share
            </ActionsButton>
            <ActionsButton bold @click="actionsOpen = false">Delete</ActionsButton>
          </ActionsGroup>
        </Actions>

        <Dialog v-if="dialogOpen" :opened="true" @backdropclick="dialogOpen = false">
          <template #title>Dialog</template>
          Sample dialog from the registry demo.
          <template #buttons>
            <DialogButton @click="dialogOpen = false">Close</DialogButton>
          </template>
        </Dialog>

        <Sheet v-if="sheetOpen" class="tc-demo-registry-sheet" :opened="true" @backdropclick="sheetOpen = false">
          <Toolbar top inner-class="tc-demo-sheet-toolbar-inner">
            <div class="left">
              <Link toolbar href="#" @click.prevent="sheetOpen = false" @keyup.enter="sheetOpen = false">Done</Link>
            </div>
            <div class="title">Sheet</div>
          </Toolbar>
          <Block>
            <p class="p-4">Sheet overlay content.</p>
          </Block>
        </Sheet>

        <Popup v-if="popupOpen" :opened="true" @backdropclick="popupOpen = false">
          <Block strong class="m-0">
            <p class="p-4">Popup content</p>
            <Button class="m-4 mt-0 w-[calc(100%-2rem)]" @click="popupOpen = false">Close</Button>
          </Block>
        </Popup>

        <Panel v-if="panelOpen" :opened="true" @backdropclick="panelOpen = false">
          <Page>
            <Navbar title="Panel" />
            <Block class="p-4">Panel side content</Block>
          </Page>
        </Panel>

        <Toast
          v-if="toastOpen"
          class="tc-demo-registry-toast"
          :opened="true"
          position="center"
          @toast:closed="toastOpen = false"
        >
          Toast from registry demo
        </Toast>

        <Popover
          v-if="popoverOpen"
          class="tc-demo-registry-popover pointer-events-auto"
          :opened="true"
          :backdrop="false"
          :angle="true"
          size="w-52"
          target="#popover-target-inline"
          @backdropclick="popoverOpen = false"
        >
          <List class="tc-demo-popover-list">
            <ListItem title="Popover item" content-class="tc-demo-popover-list-item-content" />
          </List>
        </Popover>
    </div>
  </App>
</template>

<script setup>
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import manifest from '../../tailwind-capacitor-snapshot/registry-manifest.json'
import { attachGalleryContext, demoSceneVNode, demoStatesForSlug } from './tailwindCapacitorDemoGallery'
import {
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  App,
  Block,
  Button,
  Dialog,
  DialogButton,
  Icon,
  Link,
  List,
  ListItem,
  Navbar,
  Page,
  Panel,
  Popover,
  Popup,
  Sheet,
  Toast,
  Toolbar,
} from '../../tailwind-capacitor-snapshot/capacitor/index.js'

const props = defineProps({
  platform: { type: String, default: 'ios' },
  dark: { type: Boolean, default: false },
  slug: { type: String, default: 'foundation' },
})

const platform = ref(props.platform)
const dark = ref(props.dark)
const activeSlug = ref(props.slug)

watch(
  () => [props.platform, props.dark, props.slug],
  ([nextPlatform, nextDark, nextSlug]) => {
    platform.value = nextPlatform
    dark.value = nextDark
    if (typeof nextSlug === 'string' && nextSlug.length > 0) activeSlug.value = nextSlug
  },
)

const platformLabel = computed(() => (platform.value === 'ios' ? 'iOS' : 'Material'))

const pageTitle = computed(() => {
  if (activeSlug.value === 'foundation') return 'Foundation'
  const item = manifest.items.find((entry) => entry.name === activeSlug.value)
  return item?.component ?? item?.title?.replace(/\s*\(Vue\)\s*$/i, '') ?? 'Component'
})

const galleryContext = computed(() =>
  attachGalleryContext({
    platform,
    dark,
    actionsOpen,
    dialogOpen,
    sheetOpen,
    popupOpen,
    panelOpen,
    toastOpen,
    popoverOpen,
    segmented,
    rangeValue,
    stepperValue,
    toggleOn,
    checkboxOn,
    radioVal,
    search,
    tabsDemoActive,
  }),
)

const galleryStates = computed(() =>
  demoStatesForSlug(activeSlug.value, galleryContext.value).map((state) => ({
    ...state,
    component: defineComponent({
      name: `TcDemoState_${state.id}`,
      setup: () => () => state.render(),
    }),
  })),
)

const sceneComponent = computed(() => {
  const vnode = demoSceneVNode(activeSlug.value, galleryContext.value)
  if (!vnode) return null
  return defineComponent({
    name: 'TcDemoScene',
    setup: () => () => vnode,
  })
})

function syncThemeToDocument() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', dark.value)
  root.classList.remove('ios', 'material', 'md', 'c-ios', 'c-material')
  if (platform.value === 'material') {
    root.classList.add('material', 'md', 'c-material')
  } else {
    root.classList.add('ios', 'c-ios')
  }
}

watch([platform, dark], syncThemeToDocument, { immediate: true })

const actionsOpen = ref(false)
const dialogOpen = ref(false)
const sheetOpen = ref(false)
const popupOpen = ref(false)
const panelOpen = ref(false)
const toastOpen = ref(false)
const popoverOpen = ref(false)
const segmented = ref('tab1')
const rangeValue = ref(40)
const stepperValue = ref(2)
const toggleOn = ref(true)
const checkboxOn = ref(true)
const radioVal = ref('a')
const search = ref('')
const tabsDemoActive = ref('a')

/** @param {MessageEvent} event */
function onMessage(event) {
  if (event.origin !== window.location.origin) return
  if (event.data?.type === 'tc-demo-theme') {
    if (event.data.platform === 'ios' || event.data.platform === 'material') platform.value = event.data.platform
    if (typeof event.data.dark === 'boolean') dark.value = event.data.dark
    syncThemeToDocument()
    return
  }
}

function readQueryTheme() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const p = params.get('platform')
  if (p === 'ios' || p === 'material') platform.value = p
  const d = params.get('dark')
  if (d === '1' || d === 'true') dark.value = true
  if (d === '0' || d === 'false') dark.value = false
  const slug = params.get('slug')
  if (slug) activeSlug.value = slug
}

function onDemoPageScroll() {
  if (popoverOpen.value) window.dispatchEvent(new Event('resize'))
}

onMounted(() => {
  readQueryTheme()
  window.addEventListener('message', onMessage)
  document.querySelector('.tc-demo-page')?.addEventListener('scroll', onDemoPageScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('message', onMessage)
  document.querySelector('.tc-demo-page')?.removeEventListener('scroll', onDemoPageScroll)
})
</script>
