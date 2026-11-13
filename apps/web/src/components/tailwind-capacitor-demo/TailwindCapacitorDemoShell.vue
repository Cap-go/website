<template>
  <App id="tc-demo-root" :theme="platform" :dark="dark" class="min-h-dvh">
    <Page class="safe-areas">
      <Navbar title="Components" :subtitle="platformLabel" />

      <section id="tc-demo-foundation" class="tc-demo-section px-1 pb-2">
        <h2 class="tc-demo-section-heading">Registry foundation</h2>
        <p class="tc-demo-section-description">
          Core styles, provider, shared tokens, and icon primitives from the shadcn registry.
        </p>
        <Block strong inset class="registry-demo-block">
          <ul class="divide-y text-sm">
            <li v-for="item in foundationItems" :key="item.name" class="py-3 first:pt-0 last:pb-0">
              <p class="font-medium leading-snug">{{ item.title }}</p>
              <p class="mt-1 text-sm leading-relaxed opacity-70">{{ item.description }}</p>
            </li>
          </ul>
          <div class="mt-4 flex flex-wrap items-center gap-4 border-t border-black/10 pt-4 dark:border-white/10">
            <Icon material="home" class="text-2xl" aria-label="Home" />
            <Icon material="person" class="text-2xl" aria-label="Person" />
            <Icon material="settings" class="text-2xl" aria-label="Settings" />
            <Icon material="search" class="text-2xl" aria-label="Search" />
          </div>
        </Block>
      </section>

      <MotionBlock v-for="item in registryItems" :id="item.name" :key="item.name" class="tc-demo-section">
        <h2 class="tc-demo-section-heading">{{ item.title }}</h2>
        <p class="tc-demo-section-description">{{ item.description }}</p>
        <Block strong inset class="registry-demo-block">
          <component :is="sectionFor(item.name)" />
        </Block>
      </MotionBlock>

      <Actions :opened="actionsOpen" @backdropclick="actionsOpen = false">
        <ActionsGroup>
          <ActionsLabel>Actions</ActionsLabel>
          <ActionsButton>
            <template #media>
              <Icon material="share" />
            </template>
            Share
          </ActionsButton>
          <ActionsButton bold>Delete</ActionsButton>
        </ActionsGroup>
      </Actions>

      <Dialog :opened="dialogOpen" @backdropclick="dialogOpen = false">
        <template #title>Dialog</template>
        Sample dialog from the registry demo.
        <template #buttons>
          <DialogButton @click="dialogOpen = false">Close</DialogButton>
        </template>
      </Dialog>

      <Sheet :opened="sheetOpen" @sheet:closed="sheetOpen = false">
        <Toolbar top>
          <div class="left">
            <Link toolbar @click="sheetOpen = false">Done</Link>
          </div>
          <div class="title">Sheet</div>
        </Toolbar>
        <Block>
          <p class="p-4">Sheet overlay content.</p>
        </Block>
      </Sheet>

      <Popover :opened="popoverOpen" target-el="#popover-target" @popover:closed="popoverOpen = false">
        <List>
          <ListItem title="Popover item" />
        </List>
      </Popover>

      <Popup :opened="popupOpen" @popup:closed="popupOpen = false">
        <Block strong class="m-0">
          <p class="p-4">Popup content</p>
        </Block>
      </Popup>

      <Panel :opened="panelOpen" @panel:closed="panelOpen = false">
        <Page>
          <Navbar title="Panel" />
          <Block class="p-4">Panel side content</Block>
        </Page>
      </Panel>

      <Toast :opened="toastOpen" position="center" @toast:closed="toastOpen = false">
        Toast from registry demo
      </Toast>
    </Page>
  </App>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue'
import manifest from '../../tailwind-capacitor-snapshot/registry-manifest.json'
import {
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  App,
  Badge,
  Block,
  BlockFooter,
  BlockHeader,
  BlockTitle,
  Breadcrumbs,
  BreadcrumbsCollapsed,
  BreadcrumbsItem,
  BreadcrumbsSeparator,
  Button,
  Card,
  Checkbox,
  Chip,
  Dialog,
  DialogButton,
  Fab,
  Icon,
  Link,
  List,
  ListButton,
  ListGroup,
  ListInput,
  ListItem,
  MenuList,
  MenuListItem,
  Message,
  Messagebar,
  Messages,
  MessagesTitle,
  Navbar,
  NavbarBackLink,
  Notification,
  Page,
  Panel,
  Popover,
  Popup,
  Preloader,
  Progressbar,
  Radio,
  Range,
  Searchbar,
  Segmented,
  SegmentedButton,
  Sheet,
  Stepper,
  Tabbar,
  TabbarLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toast,
  Toggle,
  Toolbar,
} from '../../tailwind-capacitor-snapshot/capacitor/index.js'

const props = defineProps({
  platform: { type: String, default: 'ios' },
  dark: { type: Boolean, default: false },
})

const platform = ref(props.platform)
const dark = ref(props.dark)

watch(
  () => [props.platform, props.dark],
  ([nextPlatform, nextDark]) => {
    platform.value = nextPlatform
    dark.value = nextDark
  },
)

const platformLabel = computed(() => (platform.value === 'ios' ? 'iOS' : 'Material'))

const foundationNames = new Set([
  'capacitor-tailwind',
  'capacitor-provider',
  'capacitor-shared',
  'capacitor-icons',
])

const foundationItems = computed(() => manifest.items.filter((item) => foundationNames.has(item.name)))

const registryItems = computed(() => manifest.items.filter((item) => !foundationNames.has(item.name)))

function syncThemeToDocument() {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', dark.value)
}

watch([platform, dark], syncThemeToDocument, { immediate: true })

const actionsOpen = ref(false)
const dialogOpen = ref(false)
const sheetOpen = ref(false)
const popoverOpen = ref(false)
const popupOpen = ref(false)
const panelOpen = ref(false)
const toastOpen = ref(false)
const segmented = ref('tab1')
const rangeValue = ref(40)
const stepperValue = ref(2)
const toggleOn = ref(true)
const checkboxOn = ref(true)
const radioVal = ref('a')
const search = ref('')

/** @param {MessageEvent} event */
function onMessage(event) {
  if (event.data?.type === 'tc-demo-theme') {
    if (event.data.platform === 'ios' || event.data.platform === 'material') platform.value = event.data.platform
    if (typeof event.data.dark === 'boolean') dark.value = event.data.dark
    syncThemeToDocument()
    return
  }
  if (event.data?.type === 'tc-demo-scroll' && typeof event.data.id === 'string') {
    document.getElementById(event.data.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
}

onMounted(() => {
  readQueryTheme()
  window.addEventListener('message', onMessage)
})

onUnmounted(() => {
  window.removeEventListener('message', onMessage)
})

const MotionBlock = defineComponent({
  name: 'MotionBlock',
  props: { id: { type: String, required: true } },
  setup(blockProps, { slots }) {
    return () => h('section', { id: blockProps.id, class: 'scroll-mt-4' }, slots.default?.())
  },
})

const sectionMap = {
  'capacitor-actions': defineComponent({
    setup() {
      return () =>
        h(Button, { onClick: () => (actionsOpen.value = true) }, { default: () => 'Open Actions' })
    },
  }),
  'capacitor-actions-button': defineComponent({
    setup() {
      const open = ref(false)
      return () =>
        h('div', { class: 'flex flex-col gap-2' }, [
          h(Button, { onClick: () => (open.value = true) }, { default: () => 'Preview ActionsButton' }),
          h(Actions, { opened: open.value, onBackdropclick: () => (open.value = false) }, {
            default: () =>
              h(ActionsGroup, {}, {
                default: () => [
                  h(ActionsLabel, {}, { default: () => 'Label' }),
                  h(ActionsButton, { bold: true }, { default: () => 'Primary action' }),
                  h(ActionsButton, {}, { default: () => 'Secondary' }),
                ],
              }),
          }),
        ])
    },
  }),
  'capacitor-actions-group': defineComponent({
    setup() {
      const open = ref(false)
      return () =>
        h('div', {}, [
          h(Button, { onClick: () => (open.value = true) }, { default: () => 'Open grouped actions' }),
          h(Actions, { opened: open.value, onBackdropclick: () => (open.value = false) }, {
            default: () =>
              h(ActionsGroup, {}, {
                default: () => [
                  h(ActionsButton, {}, { default: () => 'One' }),
                  h(ActionsButton, {}, { default: () => 'Two' }),
                ],
              }),
          }),
        ])
    },
  }),
  'capacitor-actions-label': defineComponent({
    setup() {
      const open = ref(false)
      return () =>
        h('div', {}, [
          h(Button, { onClick: () => (open.value = true) }, { default: () => 'Open actions label' }),
          h(Actions, { opened: open.value, onBackdropclick: () => (open.value = false) }, {
            default: () =>
              h(ActionsGroup, {}, {
                default: () => [
                  h(ActionsLabel, {}, { default: () => 'Section title' }),
                  h(ActionsButton, {}, { default: () => 'Item' }),
                ],
              }),
          }),
        ])
    },
  }),
  'capacitor-app': defineComponent({
    setup() {
      return () =>
        h(Block, { strong: true, class: 'm-0' }, {
          default: () => h('p', { class: 'p-3 text-sm' }, `Root App shell with ${platformLabel.value} theme and ${dark.value ? 'dark' : 'light'} mode.`),
        })
    },
  }),
  'capacitor-badge': defineComponent({
    setup() {
      return () =>
        h('div', { class: 'flex flex-wrap gap-2' }, [
          h(Badge, {}, { default: () => 'Default' }),
          h(Badge, { colors: { bg: 'bg-red-500' } }, { default: () => 'Hot' }),
        ])
    },
  }),
  'capacitor-block': defineComponent({
    setup() {
      return () => h(Block, { inset: true, strong: true }, { default: () => 'Inset strong block' })
    },
  }),
  'capacitor-block-footer': defineComponent({
    setup() {
      return () =>
        h(Block, { strong: true, class: 'm-0' }, {
          default: () => [
            h('p', { class: 'p-4' }, 'Block body'),
            h(BlockFooter, {}, { default: () => 'Block footer' }),
          ],
        })
    },
  }),
  'capacitor-block-header': defineComponent({
    setup() {
      return () =>
        h(Block, { class: 'm-0' }, {
          default: () => [
            h(BlockHeader, {}, { default: () => 'Header' }),
            h('p', { class: 'p-4' }, 'Block body'),
          ],
        })
    },
  }),
  'capacitor-block-title': defineComponent({
    setup() {
      return () => h(BlockTitle, {}, { default: () => 'Block title' })
    },
  }),
  'capacitor-breadcrumbs': defineComponent({
    setup() {
      return () =>
        h(Breadcrumbs, {}, {
          default: () => [
            h(BreadcrumbsItem, { active: true }, { default: () => 'Home' }),
            h(BreadcrumbsSeparator),
            h(BreadcrumbsItem, {}, { default: () => 'Library' }),
            h(BreadcrumbsSeparator),
            h(BreadcrumbsCollapsed),
            h(BreadcrumbsItem, {}, { default: () => 'Data' }),
          ],
        })
    },
  }),
  'capacitor-breadcrumbs-collapsed': defineComponent({
    setup() {
      return () =>
        h(Breadcrumbs, {}, {
          default: () => [
            h(BreadcrumbsItem, {}, { default: () => 'Root' }),
            h(BreadcrumbsSeparator),
            h(BreadcrumbsCollapsed),
            h(BreadcrumbsItem, { active: true }, { default: () => 'Current' }),
          ],
        })
    },
  }),
  'capacitor-breadcrumbs-item': defineComponent({
    setup() {
      return () =>
        h(Breadcrumbs, {}, {
          default: () => [
            h(BreadcrumbsItem, {}, { default: () => 'Library' }),
            h(BreadcrumbsSeparator),
            h(BreadcrumbsItem, { active: true }, { default: () => 'Active item' }),
          ],
        })
    },
  }),
  'capacitor-breadcrumbs-separator': defineComponent({
    setup() {
      return () =>
        h(Breadcrumbs, {}, {
          default: () => [
            h(BreadcrumbsItem, {}, { default: () => 'Docs' }),
            h(BreadcrumbsSeparator),
            h(BreadcrumbsItem, { active: true }, { default: () => 'API' }),
          ],
        })
    },
  }),
  'capacitor-button': defineComponent({
    setup() {
      return () =>
        h('div', { class: 'flex flex-wrap gap-2' }, [
          h(Button, {}, { default: () => 'Solid' }),
          h(Button, { outline: true }, { default: () => 'Outline' }),
          h(Button, { clear: true }, { default: () => 'Clear' }),
        ])
    },
  }),
  'capacitor-card': defineComponent({
    setup() {
      return () =>
        h(Card, {}, {
          default: () => h('div', { class: 'p-4' }, [h('h3', { class: 'font-semibold' }, 'Card'), h('p', { class: 'text-sm mt-2 opacity-80' }, 'Card body text.')]),
        })
    },
  }),
  'capacitor-checkbox': defineComponent({
    setup() {
      return () => h(Checkbox, { checked: checkboxOn.value, onClick: () => (checkboxOn.value = !checkboxOn.value) })
    },
  }),
  'capacitor-chip': defineComponent({
    setup() {
      return () =>
        h('div', { class: 'flex flex-wrap gap-2' }, [
          h(Chip, {}, { default: () => 'Chip' }),
          h(Chip, { deleteButton: true }, { default: () => 'Removable' }),
        ])
    },
  }),
  'capacitor-dialog': defineComponent({
    setup() {
      return () => h(Button, { onClick: () => (dialogOpen.value = true) }, { default: () => 'Open dialog' })
    },
  }),
  'capacitor-dialog-button': defineComponent({
    setup() {
      const open = ref(false)
      return () =>
        h('div', {}, [
          h(Button, { onClick: () => (open.value = true) }, { default: () => 'Dialog with buttons' }),
          h(Dialog, { opened: open.value, onBackdropclick: () => (open.value = false) }, {
            title: () => 'Confirm',
            default: () => 'DialogButton styles appear below.',
            buttons: () => [
              h(DialogButton, { onClick: () => (open.value = false) }, { default: () => 'Cancel' }),
              h(DialogButton, { strong: true, onClick: () => (open.value = false) }, { default: () => 'OK' }),
            ],
          }),
        ])
    },
  }),
  'capacitor-fab': defineComponent({
    setup() {
      return () =>
        h('div', { class: 'relative min-h-24' }, [
          h(Fab, { class: 'relative right-0 bottom-0 ml-auto', href: '#' }, { default: () => h('span', { class: 'text-2xl' }, '+') }),
        ])
    },
  }),
  'capacitor-icon': defineComponent({
    setup() {
      return () => h(Icon, { material: 'home', class: 'text-2xl' })
    },
  }),
  'capacitor-link': defineComponent({
    setup() {
      return () => h(Link, { href: '#' }, { default: () => 'Link' })
    },
  }),
  'capacitor-list': defineComponent({
    setup() {
      return () =>
        h(List, {}, {
          default: () => [
            h(ListItem, { title: 'List item', subtitle: 'Subtitle', chevron: true }),
            h(ListButton, {}, { default: () => 'List button' }),
          ],
        })
    },
  }),
  'capacitor-list-button': defineComponent({
    setup() {
      return () =>
        h(List, {}, {
          default: () => h(ListButton, {}, { default: () => 'Standalone list button' }),
        })
    },
  }),
  'capacitor-list-group': defineComponent({
    setup() {
      return () =>
        h(List, {}, {
          default: () =>
            h(ListGroup, {}, {
              default: () => [h(ListItem, { title: 'Grouped' }), h(ListItem, { title: 'Items' })],
            }),
        })
    },
  }),
  'capacitor-list-input': defineComponent({
    setup() {
      return () =>
        h(List, {}, {
          default: () => h(ListInput, { label: 'Email', type: 'email', placeholder: 'you@example.com' }),
        })
    },
  }),
  'capacitor-list-item': defineComponent({
    setup() {
      return () =>
        h(List, {}, {
          default: () =>
            h(ListItem, {}, {
              title: () => 'Title slot',
              after: () => h(Toggle, { checked: toggleOn.value }),
            }),
        })
    },
  }),
  'capacitor-menu-list': defineComponent({
    setup() {
      return () =>
        h(MenuList, {}, {
          default: () => h(MenuListItem, { href: '#' }, { default: () => 'Menu item' }),
        })
    },
  }),
  'capacitor-menu-list-item': defineComponent({
    setup() {
      return () =>
        h(MenuList, {}, {
          default: () =>
            h(MenuListItem, { href: '#' }, { default: () => 'Dropdown menu item' }),
        })
    },
  }),
  'capacitor-message': defineComponent({
    setup() {
      return () =>
        h(Messages, {}, {
          default: () => [
            h(MessagesTitle, { name: 'Capgo' }),
            h(Message, { type: 'sent', text: 'Hello from the registry demo.', name: 'You' }),
            h(Message, { type: 'received', text: 'All components run in Vue.', name: 'Capgo' }),
          ],
        })
    },
  }),
  'capacitor-messagebar': defineComponent({
    setup() {
      return () => h(Messagebar, { placeholder: 'Type a message' })
    },
  }),
  'capacitor-messages': defineComponent({
    setup() {
      return () =>
        h(Messages, {}, {
          default: () =>
            h(Message, { type: 'received', text: 'Messages container layout.', name: 'Capgo' }),
        })
    },
  }),
  'capacitor-messages-title': defineComponent({
    setup() {
      return () =>
        h(Messages, {}, {
          default: () => [
            h(MessagesTitle, { name: 'Martin' }),
            h(Message, { type: 'received', text: 'MessagesTitle labels the thread.', name: 'Martin' }),
          ],
        })
    },
  }),
  'capacitor-navbar': defineComponent({
    setup() {
      return () =>
        h(Navbar, { title: 'Navbar', subtitle: 'Subtitle' }, {
          left: () => h(NavbarBackLink, { text: 'Back' }),
        })
    },
  }),
  'capacitor-navbar-back-link': defineComponent({
    setup() {
      return () => h(NavbarBackLink, { text: 'Back' })
    },
  }),
  'capacitor-notification': defineComponent({
    setup() {
      return () =>
        h(Notification, { title: 'Notification', subtitle: 'Subtitle', text: 'Supporting text' })
    },
  }),
  'capacitor-page': defineComponent({
    setup() {
      return () =>
        h(Block, { strong: true, inset: true, class: 'm-0' }, {
          default: () => h('p', { class: 'p-3 text-sm' }, 'The outer scroll view is a Page component wrapping this catalog.'),
        })
    },
  }),
  'capacitor-panel': defineComponent({
    setup() {
      return () => h(Button, { onClick: () => (panelOpen.value = true) }, { default: () => 'Open panel' })
    },
  }),
  'capacitor-popover': defineComponent({
    setup() {
      return () =>
        h('div', {}, [
          h(Button, { id: 'popover-target', onClick: () => (popoverOpen.value = true) }, { default: () => 'Open popover' }),
        ])
    },
  }),
  'capacitor-popup': defineComponent({
    setup() {
      return () => h(Button, { onClick: () => (popupOpen.value = true) }, { default: () => 'Open popup' })
    },
  }),
  'capacitor-preloader': defineComponent({
    setup() {
      return () => h(Preloader, { class: 'mx-auto' })
    },
  }),
  'capacitor-progressbar': defineComponent({
    setup() {
      return () => h(Progressbar, { progress: 65 })
    },
  }),
  'capacitor-radio': defineComponent({
    setup() {
      return () =>
        h(List, {}, {
          default: () => [
            h(ListItem, { radio: true, checked: radioVal.value === 'a', title: 'Option A', onClick: () => (radioVal.value = 'a') }),
            h(ListItem, { radio: true, checked: radioVal.value === 'b', title: 'Option B', onClick: () => (radioVal.value = 'b') }),
            h(Radio, { class: 'sr-only', checked: radioVal.value === 'a' }),
          ],
        })
    },
  }),
  'capacitor-range': defineComponent({
    setup() {
      return () => h(Range, { value: rangeValue.value, onRange: 'change', onInput: (e) => (rangeValue.value = Number(e.target?.value ?? 0)) })
    },
  }),
  'capacitor-searchbar': defineComponent({
    setup() {
      return () =>
        h(Searchbar, {
          value: search.value,
          placeholder: 'Search components',
          onSearchbarInput: (e) => (search.value = String(e.detail?.value ?? '')),
        })
    },
  }),
  'capacitor-segmented': defineComponent({
    setup() {
      return () =>
        h(Segmented, { strong: true }, {
          default: () => [
            h(SegmentedButton, { active: segmented.value === 'tab1', onClick: () => (segmented.value = 'tab1') }, { default: () => 'One' }),
            h(SegmentedButton, { active: segmented.value === 'tab2', onClick: () => (segmented.value = 'tab2') }, { default: () => 'Two' }),
          ],
        })
    },
  }),
  'capacitor-segmented-button': defineComponent({
    setup() {
      const active = ref('a')
      return () =>
        h(Segmented, { strong: true }, {
          default: () => [
            h(SegmentedButton, { active: active.value === 'a', onClick: () => (active.value = 'a') }, { default: () => 'A' }),
            h(SegmentedButton, { active: active.value === 'b', onClick: () => (active.value = 'b') }, { default: () => 'B' }),
          ],
        })
    },
  }),
  'capacitor-sheet': defineComponent({
    setup() {
      return () => h(Button, { onClick: () => (sheetOpen.value = true) }, { default: () => 'Open sheet' })
    },
  }),
  'capacitor-stepper': defineComponent({
    setup() {
      return () => h(Stepper, { value: stepperValue.value, min: 0, max: 10 })
    },
  }),
  'capacitor-tabbar': defineComponent({
    setup() {
      return () =>
        h(Tabbar, { labels: true }, {
          default: () => [
            h(TabbarLink, { active: true, icon: 'home', label: 'Home' }),
            h(TabbarLink, { icon: 'search', label: 'Search' }),
          ],
        })
    },
  }),
  'capacitor-tabbar-link': defineComponent({
    setup() {
      return () =>
        h(Tabbar, { labels: true }, {
          default: () => h(TabbarLink, { active: true, icon: 'today', label: 'Today' }),
        })
    },
  }),
  'capacitor-table': defineComponent({
    setup() {
      return () =>
        h(Table, {}, {
          default: () => [
            h(TableHead, {}, {
              default: () =>
                h(TableRow, {}, {
                  default: () => [h(TableCell, { header: true }, { default: () => 'Name' }), h(TableCell, { header: true }, { default: () => 'Value' })],
                }),
            }),
            h(TableBody, {}, {
              default: () =>
                h(TableRow, {}, {
                  default: () => [h(TableCell, {}, { default: () => 'Rows' }), h(TableCell, {}, { default: () => '2' })],
                }),
            }),
          ],
        })
    },
  }),
  'capacitor-table-body': defineComponent({
    setup() {
      return () =>
        h(Table, {}, {
          default: () =>
            h(TableBody, {}, {
              default: () =>
                h(TableRow, {}, {
                  default: () => h(TableCell, {}, { default: () => 'Body row' }),
                }),
            }),
        })
    },
  }),
  'capacitor-table-cell': defineComponent({
    setup() {
      return () =>
        h(Table, {}, {
          default: () =>
            h(TableBody, {}, {
              default: () =>
                h(TableRow, {}, {
                  default: () => [h(TableCell, {}, { default: () => 'Cell A' }), h(TableCell, {}, { default: () => 'Cell B' })],
                }),
            }),
        })
    },
  }),
  'capacitor-table-head': defineComponent({
    setup() {
      return () =>
        h(Table, {}, {
          default: () =>
            h(TableHead, {}, {
              default: () =>
                h(TableRow, {}, {
                  default: () => h(TableCell, { header: true }, { default: () => 'Header' }),
                }),
            }),
        })
    },
  }),
  'capacitor-table-row': defineComponent({
    setup() {
      return () =>
        h(Table, {}, {
          default: () =>
            h(TableBody, {}, {
              default: () =>
                h(TableRow, {}, {
                  default: () => h(TableCell, {}, { default: () => 'Single row' }),
                }),
            }),
        })
    },
  }),
  'capacitor-toast': defineComponent({
    setup() {
      return () => h(Button, { onClick: () => (toastOpen.value = true) }, { default: () => 'Show toast' })
    },
  }),
  'capacitor-toggle': defineComponent({
    setup() {
      return () => h(Toggle, { checked: toggleOn.value, onClick: () => (toggleOn.value = !toggleOn.value) })
    },
  }),
  'capacitor-toolbar': defineComponent({
    setup() {
      return () =>
        h(Toolbar, { top: true }, {
          left: () => h(Link, { toolbar: true }, { default: () => 'Left' }),
          title: () => 'Toolbar',
          right: () => h(Link, { toolbar: true }, { default: () => 'Right' }),
        })
    },
  }),
}

/** @param {string} name */
function sectionFor(name) {
  return sectionMap[name]
}
</script>
