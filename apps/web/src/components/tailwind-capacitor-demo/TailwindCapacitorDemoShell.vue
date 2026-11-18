<template>
  <App id="tc-demo-root" :theme="platform" :dark="dark" class="tc-demo-app h-full w-full">
    <Page class="safe-areas tc-demo-page" :class="{ 'tc-demo-page-single-state': singleStateMode }">
      <Navbar
        v-if="showCatalogChrome"
        class="tc-demo-chrome-navbar"
        :title="pageTitle"
        :subtitle="platformLabel"
        :outline="platform === 'ios'"
        :center-title="platform === 'ios'"
        :translucent="false"
      />

      <div class="tc-demo-below-navbar tc-demo-app-screen" :class="{ 'tc-demo-app-screen-single': singleStateMode }">
        <section v-if="!singleStateMode" class="tc-demo-single-component px-3 pb-8">
          <component :is="sceneComponent" v-if="sceneComponent" class="tc-demo-scene tc-demo-scene-stage mb-4" />
        </section>

        <article
          v-for="state in visibleStates"
          :key="state.id"
          class="tc-demo-state-block"
          :class="singleStateMode ? 'tc-demo-state-block-single' : 'mb-6 last:mb-2 px-3'"
        >
          <h3 v-if="!singleStateMode" class="tc-demo-state-heading">{{ state.label }}</h3>
          <div
            :data-tc-demo-state="state.id"
            class="tc-demo-component-stage tc-demo-state-fill"
            :class="stateScreenClass"
          >
            <component :is="state.component" />
          </div>
        </article>
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
          <ActionsButton bold :colors="destructiveActionColors" @click="actionsOpen = false">Delete</ActionsButton>
        </ActionsGroup>
      </Actions>

      <Dialog v-if="dialogOpen" :opened="true" @backdropclick="dialogOpen = false">
        <template #title>Dialog</template>
        Sample dialog from the registry demo.
        <template #buttons>
          <DialogButton @click="dialogOpen = false">Close</DialogButton>
        </template>
      </Dialog>

      <Dialog v-if="alertOpen" :opened="true" @backdropclick="alertOpen = false">
        <template #title>Heads up</template>
        Registry Alert styles.
        <template #buttons>
          <DialogButton strong @click="alertOpen = false">OK</DialogButton>
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

      <template v-if="popupOpen">
        <div
          class="tc-demo-popup-backdrop fixed inset-0 z-40 bg-black/50"
          data-tc-demo-popup-backdrop
          role="button"
          tabindex="-1"
          aria-label="Close popup"
          @click="popupOpen = false"
          @keydown.enter="popupOpen = false"
          @keydown.space.prevent="popupOpen = false"
        />
        <Popup :opened="true" :backdrop="false" @backdropclick="popupOpen = false">
          <Block strong class="m-0">
            <p class="p-4">Popup content</p>
            <Button class="m-4 mt-0 w-[calc(100%-2rem)]" @click="popupOpen = false">Close</Button>
          </Block>
        </Popup>
      </template>

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
          position="left"
          :translucent="false"
          @toast:closed="toastOpen = false"
        >
          Bundle uploaded to the preview channel
        </Toast>

      <Popover
        v-if="popoverOpen"
        class="tc-demo-registry-popover pointer-events-auto"
        :opened="true"
        :backdrop="true"
        :angle="true"
        size="w-52"
        target="#popover-target-inline"
        @backdropclick="popoverOpen = false"
      >
        <List class="tc-demo-popover-list">
          <ListItem title="Popover item" content-class="tc-demo-popover-list-item-content" />
        </List>
      </Popover>

      <div
        v-if="modalOpen"
        class="fixed inset-0 z-40 bg-black/50"
        data-tc-demo-modal-backdrop
        role="button"
        tabindex="-1"
        aria-label="Close modal"
        @click="modalOpen = false"
        @keydown.enter="modalOpen = false"
        @keydown.space.prevent="modalOpen = false"
      />
      <Modal
        v-if="modalOpen"
        class="tc-demo-overlay-modal fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-xs -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl"
      >
        <div class="p-4">
          <h3 class="font-semibold">Save changes?</h3>
          <p class="mt-2 text-sm opacity-80">Your draft channel name is updated but not published yet.</p>
          <div class="mt-4 flex gap-2">
            <Button outline class="flex-1" @click="modalOpen = false">Cancel</Button>
            <Button class="flex-1" @click="modalOpen = false">Save</Button>
          </div>
        </div>
      </Modal>

      <Notification
        v-if="notificationOpen"
        class="tc-demo-overlay-notification"
        :opened="true"
        button="Dismiss"
        title="New message"
        subtitle="Capgo"
        text="Your bundle finished uploading to the preview channel."
        @close="notificationOpen = false"
      >
        <template #icon>
          <Icon material="notifications" class="text-xl" aria-label="Notification" />
        </template>
      </Notification>
    </div>
  </App>
</template>

<script setup>
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { resolveTailwindCapacitorDemoSlug, tailwindCapacitorDemoTitle } from '@/lib/tailwindCapacitorDemoCatalog'
import { destructiveActionColors } from './demoOverlayHelpers'
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
  Modal,
  Notification,
  Popup,
  Sheet,
  Toast,
  Toolbar,
} from '../../tailwind-capacitor-snapshot/capacitor/index.js'

const props = defineProps({
  platform: { type: String, default: 'ios' },
  dark: { type: Boolean, default: false },
  slug: { type: String, default: 'foundation' },
  activeState: { type: String, default: '' },
})

const platform = ref(props.platform)
const dark = ref(props.dark)
const activeSlug = ref(props.slug)
const activeStateId = ref(props.activeState?.trim() ?? '')

watch(
  () => [props.platform, props.dark, props.slug, props.activeState],
  ([nextPlatform, nextDark, nextSlug, nextState]) => {
    platform.value = nextPlatform
    dark.value = nextDark
    if (typeof nextSlug === 'string' && nextSlug.length > 0) activeSlug.value = nextSlug
    activeStateId.value = typeof nextState === 'string' ? nextState.trim() : ''
  },
)

const singleStateMode = computed(() => activeStateId.value.length > 0)

const platformLabel = computed(() => (platform.value === 'ios' ? 'iOS' : 'Material'))

const pageTitle = computed(() => {
  const resolved = resolveTailwindCapacitorDemoSlug(activeSlug.value)
  return resolved ? tailwindCapacitorDemoTitle(resolved) : 'Component'
})

const showCatalogChrome = computed(() => !singleStateMode.value)

const stateScreenClass = computed(() => {
  const ios = platform.value === 'ios'
  const d = dark.value
  if (ios && d) return 'tc-demo-screen-ios-dark'
  if (ios) return 'tc-demo-screen-ios-light'
  if (d) return 'tc-demo-screen-material-dark'
  return 'tc-demo-screen-material-light'
})

const galleryContext = computed(() =>
  attachGalleryContext({
    platform,
    dark,
    actionsOpen,
    dialogOpen,
    alertOpen,
    sheetOpen,
    popupOpen,
    panelOpen,
    toastOpen,
    popoverOpen,
    modalOpen,
    notificationOpen,
    segmented,
    rangeValue,
    stepperValue,
    stepperMinValue,
    stepperMaxValue,
    toggleOffChecked,
    toggleOnChecked,
    toggleAfterChecked,
    checkboxOffChecked,
    checkboxOnChecked,
    chipFilledActive,
    chipRemovableVisible,
    radioOptionA,
    radioOptionB,
    toggleOn,
    checkboxOn,
    radioVal,
    search,
    tabsDemoActive,
    tabbarDemoActive,
    accordionDemoOpen,
    accordionItemCollapsedOpen,
    accordionItemExpandedCopy,
    itemSlidingSwiped,
    itemSlidingTouchStartX,
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

const visibleStates = computed(() => {
  if (!singleStateMode.value) return galleryStates.value
  const match = galleryStates.value.find((s) => s.id === activeStateId.value)
  return match ? [match] : galleryStates.value.slice(0, 1)
})

const sceneComponent = computed(() => {
  if (singleStateMode.value) return null
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

watch([activeSlug, activeStateId], (next, prev) => {
  if (prev === undefined) return
  const [slug, state] = next
  const [prevSlug, prevState] = prev
  if (slug === prevSlug && state === prevState) return
  closeDemoOverlays()
})

const actionsOpen = ref(false)
const dialogOpen = ref(false)
const alertOpen = ref(false)
const sheetOpen = ref(false)
const popupOpen = ref(false)
const panelOpen = ref(false)
const toastOpen = ref(false)
const popoverOpen = ref(false)
const modalOpen = ref(false)
const notificationOpen = ref(false)
const segmented = ref('tab1')
const rangeValue = ref(40)
const stepperValue = ref(2)
const stepperMinValue = ref(0)
const stepperMaxValue = ref(10)
const toggleOffChecked = ref(false)
const toggleOnChecked = ref(true)
const toggleAfterChecked = ref(true)
const checkboxOffChecked = ref(false)
const checkboxOnChecked = ref(true)
const chipFilledActive = ref(false)
const chipRemovableVisible = ref(true)
const radioOptionA = ref('a')
const radioOptionB = ref('b')
const toggleOn = ref(true)
const checkboxOn = ref(true)
const radioVal = ref('a')
const search = ref('')
const tabsDemoActive = ref('a')
const tabbarDemoActive = ref('home')
const accordionDemoOpen = ref(false)
const accordionItemCollapsedOpen = ref(false)
const accordionItemExpandedCopy = ref(true)
const itemSlidingSwiped = ref(false)
const itemSlidingTouchStartX = ref<number | null>(null)

/** @param {MessageEvent} event */
function onMessage(event) {
  if (event.origin !== window.location.origin) return
  if (event.data?.type === 'tc-demo-theme') {
    if (event.data.platform === 'ios' || event.data.platform === 'material') platform.value = event.data.platform
    if (typeof event.data.dark === 'boolean') dark.value = event.data.dark
    syncThemeToDocument()
    return
  }
  if (event.data?.type === 'tc-demo-state' && typeof event.data.state === 'string') {
    activeStateId.value = event.data.state
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
  const state = params.get('state')
  if (state) activeStateId.value = state
}

function onDemoPageScroll() {
  if (popoverOpen.value) window.dispatchEvent(new Event('resize'))
}

function closeDemoOverlays() {
  actionsOpen.value = false
  dialogOpen.value = false
  alertOpen.value = false
  sheetOpen.value = false
  popupOpen.value = false
  panelOpen.value = false
  toastOpen.value = false
  popoverOpen.value = false
  modalOpen.value = false
  notificationOpen.value = false
}

function onKeydown(event) {
  if (event.key !== 'Escape') return
  closeDemoOverlays()
}

onMounted(() => {
  readQueryTheme()
  window.addEventListener('message', onMessage)
  window.addEventListener('keydown', onKeydown)
  document.querySelector('.tc-demo-page')?.addEventListener('scroll', onDemoPageScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('message', onMessage)
  window.removeEventListener('keydown', onKeydown)
  document.querySelector('.tc-demo-page')?.removeEventListener('scroll', onDemoPageScroll)
})
</script>