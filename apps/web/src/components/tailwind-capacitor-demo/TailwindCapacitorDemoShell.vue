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
        <section v-if="activeSlug === 'foundation'" class="tc-demo-single-component px-3 pb-6">
          <p class="tc-demo-section-description !px-0">Core styles, provider, shared tokens, and icon primitives from the shadcn registry.</p>
          <Block strong inset class="tc-demo-component-stage">
            <ul class="divide-y text-sm">
              <li v-for="item in foundationItems" :key="item.name" class="py-3 first:pt-0 last:pb-0">
                <p class="font-medium leading-snug">{{ item.title }}</p>
                <p class="mt-1 text-sm leading-relaxed opacity-70">{{ demoDescription(item.name) }}</p>
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

        <section v-else class="tc-demo-single-component px-3 pb-6">
          <List v-if="showListChrome" class="tc-demo-app-list mb-4">
            <ListItem title="Today" after="9:41" />
            <ListItem title="Notifications" badge="3" />
          </List>
          <div class="tc-demo-component-stage">
            <component :is="sectionFor(activeSlug)" />
          </div>
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
import { computed, defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue'
import manifest from '../../tailwind-capacitor-snapshot/registry-manifest.json'
import { tailwindCapacitorDemoDescriptions } from './tailwindCapacitorDemoDescriptions'
import {
  Accordion,
  AccordionItem,
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  Alert,
  App,
  Avatar,
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
  Datetime,
  Dialog,
  DialogButton,
  Fab,
  Footer,
  Header,
  Icon,
  InfiniteScroll,
  InputOtp,
  ItemSliding,
  Link,
  List,
  ListButton,
  ListGroup,
  ListInput,
  ListItem,
  MenuList,
  MenuListItem,
  Message,
  Modal,
  Note,
  Messagebar,
  Messages,
  MessagesTitle,
  Navbar,
  NavbarBackLink,
  Notification,
  Page,
  Panel,
  Picker,
  Popover,
  Popup,
  Preloader,
  Progressbar,
  Radio,
  Range,
  Refresher,
  Reorder,
  Searchbar,
  Segmented,
  SegmentedButton,
  Select,
  Sheet,
  Skeleton,
  SplitPane,
  Stepper,
  Tab,
  Tabbar,
  Tabs,
  TabbarLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Textarea,
  Thumbnail,
  Toast,
  Toggle,
  Toolbar,
  TouchRipple,
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

const showListChrome = computed(() => {
  const slug = activeSlug.value
  return slug.startsWith('capacitor-actions') || slug.startsWith('capacitor-button') || slug.startsWith('capacitor-list')
})

const foundationNames = new Set(['capacitor-tailwind', 'capacitor-provider', 'capacitor-shared', 'capacitor-icons'])

const foundationItems = computed(() => manifest.items.filter((item) => foundationNames.has(item.name)))

/** @param {string} name */
function demoDescription(name) {
  return tailwindCapacitorDemoDescriptions[name] ?? manifest.items.find((item) => item.name === name)?.description ?? ''
}

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

function defineDemo(render) {
  return defineComponent({
    setup() {
      return render
    },
  })
}

/** @param {import('vue').Ref<boolean>} openRef */
/** @param {{ id?: string }} [options] */
function defineOpenShellButtonDemo(label, openRef, options = {}) {
  return defineComponent({
    setup() {
      return () =>
        h(
          'button',
          {
            type: 'button',
            id: options.id,
            class:
              'tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white',
            onClick: () => (openRef.value = true),
          },
          label,
        )
    },
  })
}

function defineInlineActionsDemo(renderContent) {
  return defineDemo(() =>
    h(
      'div',
      {
        class:
          'tc-demo-actions-static pointer-events-auto overflow-visible rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900',
      },
      [
        h(
          Actions,
          {
            opened: true,
            backdrop: false,
            class: 'tc-demo-actions-inline-preview pointer-events-auto !relative !inset-auto !transform-none w-full',
          },
          { default: () => renderContent() },
        ),
      ],
    ),
  )
}

function tableWithBodyRow(label) {
  return h(
    Table,
    {},
    {
      default: () =>
        h(
          TableBody,
          {},
          {
            default: () => h(TableRow, {}, { default: () => h(TableCell, {}, { default: () => label }) }),
          },
        ),
    },
  )
}

function tableWithHeaderCell(label) {
  return h(
    Table,
    {},
    {
      default: () =>
        h(
          TableHead,
          {},
          {
            default: () => h(TableRow, {}, { default: () => h(TableCell, { header: true }, { default: () => label }) }),
          },
        ),
    },
  )
}

function tableBodyRowCells(...labels) {
  return h(
    TableRow,
    {},
    {
      default: () => labels.map((label) => h(TableCell, {}, { default: () => label })),
    },
  )
}

function tableWithBodyCells(...labels) {
  return h(
    Table,
    {},
    {
      default: () => h(TableBody, {}, { default: () => tableBodyRowCells(...labels) }),
    },
  )
}

const tableNameValueHeadRow = () =>
  h(
    TableRow,
    {},
    {
      default: () => [h(TableCell, { header: true }, { default: () => 'Name' }), h(TableCell, { header: true }, { default: () => 'Value' })],
    },
  )

const tableRowsCountBodyRow = () =>
  h(
    TableRow,
    {},
    {
      default: () => [h(TableCell, {}, { default: () => 'Rows' }), h(TableCell, {}, { default: () => '2' })],
    },
  )

function demoTableSample() {
  return h(
    Table,
    {},
    {
      default: () => [h(TableHead, {}, { default: () => tableNameValueHeadRow() }), h(TableBody, {}, { default: () => tableRowsCountBodyRow() })],
    },
  )
}

const sectionMap = {
  'capacitor-actions': defineOpenShellButtonDemo('Open Actions', actionsOpen),
  'capacitor-actions-button': defineInlineActionsDemo(() =>
    h(ActionsGroup, {}, {
      default: () => [
        h(ActionsLabel, {}, { default: () => 'Label' }),
        h(ActionsButton, { bold: true }, { default: () => 'Primary action' }),
        h(ActionsButton, {}, { default: () => 'Secondary' }),
      ],
    }),
  ),
  'capacitor-actions-group': defineInlineActionsDemo(() =>
    h(ActionsGroup, {}, {
      default: () => [h(ActionsButton, {}, { default: () => 'One' }), h(ActionsButton, {}, { default: () => 'Two' })],
    }),
  ),
  'capacitor-actions-label': defineInlineActionsDemo(() =>
    h(ActionsGroup, {}, {
      default: () => [h(ActionsLabel, {}, { default: () => 'Section title' }), h(ActionsButton, {}, { default: () => 'Item' })],
    }),
  ),
  'capacitor-accordion': defineDemo(() =>
    h(
      Accordion,
      {},
      {
        default: () => [h(AccordionItem, {}, { default: () => 'Accounts' }), h(AccordionItem, {}, { default: () => 'Billing' })],
      },
    ),
  ),
  'capacitor-accordion-item': defineDemo(() => h(Accordion, {}, { default: () => h(AccordionItem, {}, { default: () => 'Accordion item' }) })),
  'capacitor-alert': defineDemo(() => h(Alert, { class: 'p-4' }, { default: () => 'Heads up: registry Alert styles.' })),
  'capacitor-app': defineDemo(() =>
    h(
      Block,
      { strong: true, class: 'm-0' },
      {
        default: () => h('p', { class: 'p-3 text-sm' }, `Root App shell with ${platformLabel.value} theme and ${dark.value ? 'dark' : 'light'} mode.`),
      },
    ),
  ),
  'capacitor-avatar': defineDemo(() => h(Avatar, { class: 'inline-flex size-12 items-center justify-center text-sm font-semibold' }, { default: () => 'CG' })),
  'capacitor-badge': defineDemo(() =>
    h('div', { class: 'flex flex-wrap gap-2' }, [h(Badge, {}, { default: () => 'Default' }), h(Badge, { colors: { bg: 'bg-red-500' } }, { default: () => 'Hot' })]),
  ),
  'capacitor-block': defineDemo(() => h(Block, { inset: true, strong: true }, { default: () => 'Inset strong block' })),
  'capacitor-block-footer': defineDemo(() =>
    h(
      Block,
      { strong: true, class: 'm-0' },
      {
        default: () => [h('p', { class: 'p-4' }, 'Block body'), h(BlockFooter, {}, { default: () => 'Block footer' })],
      },
    ),
  ),
  'capacitor-block-header': defineDemo(() =>
    h(
      Block,
      { class: 'm-0' },
      {
        default: () => [h(BlockHeader, {}, { default: () => 'Header' }), h('p', { class: 'p-4' }, 'Block body')],
      },
    ),
  ),
  'capacitor-block-title': defineDemo(() => h(BlockTitle, {}, { default: () => 'Block title' })),
  'capacitor-breadcrumbs': defineDemo(() =>
    h(
      Breadcrumbs,
      {},
      {
        default: () => [
          h(BreadcrumbsItem, { active: true }, { default: () => 'Home' }),
          h(BreadcrumbsSeparator),
          h(BreadcrumbsItem, {}, { default: () => 'Library' }),
          h(BreadcrumbsSeparator),
          h(BreadcrumbsCollapsed),
          h(BreadcrumbsItem, {}, { default: () => 'Data' }),
        ],
      },
    ),
  ),
  'capacitor-breadcrumbs-collapsed': defineDemo(() =>
    h(
      Breadcrumbs,
      {},
      {
        default: () => [
          h(BreadcrumbsItem, {}, { default: () => 'Root' }),
          h(BreadcrumbsSeparator),
          h(BreadcrumbsCollapsed),
          h(BreadcrumbsItem, { active: true }, { default: () => 'Current' }),
        ],
      },
    ),
  ),
  'capacitor-breadcrumbs-item': defineDemo(() =>
    h(
      Breadcrumbs,
      {},
      {
        default: () => [h(BreadcrumbsItem, {}, { default: () => 'Library' }), h(BreadcrumbsSeparator), h(BreadcrumbsItem, { active: true }, { default: () => 'Active item' })],
      },
    ),
  ),
  'capacitor-breadcrumbs-separator': defineDemo(() =>
    h(
      Breadcrumbs,
      {},
      {
        default: () => [h(BreadcrumbsItem, {}, { default: () => 'Docs' }), h(BreadcrumbsSeparator), h(BreadcrumbsItem, { active: true }, { default: () => 'API' })],
      },
    ),
  ),
  'capacitor-button': defineDemo(() =>
    h('div', { class: 'flex flex-wrap gap-2' }, [
      h(Button, {}, { default: () => 'Solid' }),
      h(Button, { outline: true }, { default: () => 'Outline' }),
      h(Button, { clear: true }, { default: () => 'Clear' }),
    ]),
  ),
  'capacitor-card': defineDemo(() =>
    h(
      Card,
      {},
      {
        default: () => h('div', { class: 'p-4' }, [h('h3', { class: 'font-semibold' }, 'Card'), h('p', { class: 'text-sm mt-2 opacity-80' }, 'Card body text.')]),
      },
    ),
  ),
  'capacitor-checkbox': defineDemo(() => h(Checkbox, { checked: checkboxOn.value, onClick: () => (checkboxOn.value = !checkboxOn.value) })),
  'capacitor-chip': defineDemo(() =>
    h('div', { class: 'flex flex-wrap gap-2' }, [h(Chip, {}, { default: () => 'Chip' }), h(Chip, { deleteButton: true }, { default: () => 'Removable' })]),
  ),
  'capacitor-datetime': defineDemo(() => h(Datetime, { class: 'p-3 text-sm' }, { default: () => 'Nov 15, 2026' })),
  'capacitor-dialog': defineOpenShellButtonDemo('Open dialog', dialogOpen),
  'capacitor-dialog-button': defineDemo(() =>
    h('div', { class: 'flex flex-wrap gap-2' }, [h(DialogButton, {}, { default: () => 'Cancel' }), h(DialogButton, { strong: true }, { default: () => 'OK' })]),
  ),
  'capacitor-footer': defineDemo(() => h(Footer, {}, { default: () => h('p', { class: 'p-3 text-sm' }, 'Footer region') })),
  'capacitor-fab': defineDemo(() =>
    h('div', { class: 'relative min-h-24' }, [h(Fab, { class: 'relative right-0 bottom-0 ml-auto', href: '#' }, { default: () => h('span', { class: 'text-2xl' }, '+') })]),
  ),
  'capacitor-header': defineDemo(() => h(Header, {}, { default: () => h('p', { class: 'p-3 text-sm' }, 'Header region') })),
  'capacitor-icon': defineDemo(() => h(Icon, { material: 'home', class: 'text-2xl' })),
  'capacitor-infinite-scroll': defineDemo(() => h(InfiniteScroll, { class: 'p-3 text-sm' }, { default: () => 'Load more when scrolled' })),
  'capacitor-input-otp': defineDemo(() =>
    h(InputOtp, { class: 'p-2' }, { default: () => [h('span', { class: 'px-2 py-1 border rounded' }, '1'), h('span', { class: 'px-2 py-1 border rounded' }, '2')] }),
  ),
  'capacitor-item-sliding': defineDemo(() =>
    h(
      List,
      {},
      {
        default: () =>
          h(
            ItemSliding,
            {},
            {
              default: () => h(ListItem, { title: 'Swipe row', link: true }),
            },
          ),
      },
    ),
  ),
  'capacitor-link': defineDemo(() => h(Link, { href: '#' }, { default: () => 'Link' })),
  'capacitor-list': defineDemo(() =>
    h(
      List,
      {},
      {
        default: () => [h(ListItem, { title: 'List item', subtitle: 'Subtitle', chevron: true }), h(ListButton, {}, { default: () => 'List button' })],
      },
    ),
  ),
  'capacitor-list-button': defineDemo(() =>
    h(
      List,
      {},
      {
        default: () => h(ListButton, {}, { default: () => 'Standalone list button' }),
      },
    ),
  ),
  'capacitor-list-group': defineDemo(() =>
    h(
      List,
      {},
      {
        default: () =>
          h(
            ListGroup,
            {},
            {
              default: () => [h(ListItem, { title: 'Grouped' }), h(ListItem, { title: 'Items' })],
            },
          ),
      },
    ),
  ),
  'capacitor-list-input': defineDemo(() =>
    h(
      List,
      {},
      {
        default: () => h(ListInput, { label: 'Email', type: 'email', placeholder: 'you@example.com' }),
      },
    ),
  ),
  'capacitor-list-item': defineDemo(() =>
    h(
      List,
      {},
      {
        default: () =>
          h(
            ListItem,
            {},
            {
              title: () => 'Title slot',
              after: () => h(Toggle, { checked: toggleOn.value, onClick: () => (toggleOn.value = !toggleOn.value) }),
            },
          ),
      },
    ),
  ),
  'capacitor-menu-list': defineDemo(() =>
    h(
      MenuList,
      {},
      {
        default: () => h(MenuListItem, { href: '#' }, { default: () => 'Menu item' }),
      },
    ),
  ),
  'capacitor-menu-list-item': defineDemo(() =>
    h(
      MenuList,
      {},
      {
        default: () => h(MenuListItem, { href: '#' }, { default: () => 'Dropdown menu item' }),
      },
    ),
  ),
  'capacitor-modal': defineDemo(() =>
    h(
      Modal,
      { class: 'm-0 overflow-hidden rounded-xl' },
      {
        default: () =>
          h('div', { class: 'p-4' }, [
            h('h3', { class: 'font-semibold' }, 'Save changes?'),
            h('p', { class: 'mt-2 text-sm opacity-80' }, 'Your draft channel name is updated but not published yet.'),
            h('div', { class: 'mt-4 flex gap-2' }, [
              h(Button, { outline: true, class: 'flex-1' }, { default: () => 'Cancel' }),
              h(Button, { class: 'flex-1' }, { default: () => 'Save' }),
            ]),
          ]),
      },
    ),
  ),
  'capacitor-note': defineDemo(() => h(Note, {}, { default: () => 'Note block from registry' })),
  'capacitor-message': defineDemo(() =>
    h(
      Messages,
      {},
      {
        default: () => [
          h(MessagesTitle, { name: 'Capgo' }),
          h(Message, { type: 'sent', text: 'Hello from the registry demo.', name: 'You' }),
          h(Message, { type: 'received', text: 'All components run in Vue.', name: 'Capgo' }),
        ],
      },
    ),
  ),
  'capacitor-messagebar': defineDemo(() =>
    h('div', { class: 'tc-demo-messagebar-host space-y-2' }, [
      h('p', { class: 'text-xs opacity-70' }, 'Compose a reply'),
      h(Messagebar, { placeholder: 'Type a message', value: 'On my way' }),
    ]),
  ),
  'capacitor-messages': defineDemo(() =>
    h(
      Messages,
      {},
      {
        default: () => h(Message, { type: 'received', text: 'Messages container layout.', name: 'Capgo' }),
      },
    ),
  ),
  'capacitor-messages-title': defineDemo(() =>
    h(
      Messages,
      {},
      {
        default: () => [h(MessagesTitle, { name: 'Martin' }), h(Message, { type: 'received', text: 'MessagesTitle labels the thread.', name: 'Martin' })],
      },
    ),
  ),
  'capacitor-navbar': defineDemo(() =>
    h(
      Navbar,
      { title: 'Navbar', subtitle: 'Subtitle' },
      {
        left: () => h(NavbarBackLink, { text: 'Back' }),
      },
    ),
  ),
  'capacitor-navbar-back-link': defineDemo(() => h(NavbarBackLink, { text: 'Back' })),
  'capacitor-notification': defineDemo(() =>
    h(
      Notification,
      {
        opened: true,
        button: 'Dismiss',
        title: 'New message',
        subtitle: 'Capgo',
        text: 'Your bundle finished uploading to the preview channel.',
        class: 'tc-demo-notification-inline',
      },
      {
        icon: () => h(Icon, { material: 'notifications', class: 'text-xl', 'aria-label': 'Notification' }),
      },
    ),
  ),
  'capacitor-page': defineDemo(() =>
    h(
      Block,
      { strong: true, inset: true, class: 'm-0' },
      {
        default: () => h('p', { class: 'p-3 text-sm' }, 'The outer scroll view is a Page component wrapping this catalog.'),
      },
    ),
  ),
  'capacitor-panel': defineOpenShellButtonDemo('Open panel', panelOpen),
  'capacitor-picker': defineDemo(() =>
    h(Picker, { class: 'p-4 text-sm' }, { default: () => ['Morning', 'Afternoon', 'Evening'].map((label) => h('div', { class: 'block py-2' }, label)) }),
  ),
  'capacitor-popover': defineOpenShellButtonDemo('Open popover', popoverOpen, { id: 'popover-target-inline' }),
  'capacitor-popup': defineOpenShellButtonDemo('Open popup', popupOpen),
  'capacitor-preloader': defineDemo(() => h(Preloader, { class: 'mx-auto' })),
  'capacitor-progressbar': defineDemo(() => h(Progressbar, { progress: 65 })),
  'capacitor-radio': defineDemo(() =>
    h(
      List,
      {},
      {
        default: () => [
          h(ListItem, { radio: true, checked: radioVal.value === 'a', title: 'Option A', onClick: () => (radioVal.value = 'a') }),
          h(ListItem, { radio: true, checked: radioVal.value === 'b', title: 'Option B', onClick: () => (radioVal.value = 'b') }),
          h(Radio, { class: 'sr-only', checked: radioVal.value === 'a' }),
        ],
      },
    ),
  ),
  'capacitor-range': defineDemo(() => h(Range, { value: rangeValue.value, onRange: 'change', onInput: (e) => (rangeValue.value = Number(e.target?.value ?? 0)) })),
  'capacitor-refresher': defineDemo(() => h(Refresher, { class: 'p-3 text-center text-sm' }, { default: () => 'Pull to refresh' })),
  'capacitor-reorder': defineDemo(() =>
    h(
      List,
      {},
      {
        default: () =>
          h(
            Reorder,
            {},
            {
              default: () => [h(ListItem, { title: 'First' }), h(ListItem, { title: 'Second' })],
            },
          ),
      },
    ),
  ),
  'capacitor-select': defineDemo(() =>
    h(Select, { label: 'Fruit', 'aria-label': 'Fruit' }, { default: () => [h('option', { value: 'apple' }, 'Apple'), h('option', { value: 'pear' }, 'Pear')] }),
  ),
  'capacitor-searchbar': defineDemo(() =>
    h(Searchbar, {
      value: search.value,
      placeholder: 'Search components',
      onSearchbarInput: (e) => (search.value = String(e.detail?.value ?? '')),
    }),
  ),
  'capacitor-segmented': defineDemo(() =>
    h(
      Segmented,
      { strong: true },
      {
        default: () => [
          h(SegmentedButton, { active: segmented.value === 'tab1', onClick: () => (segmented.value = 'tab1') }, { default: () => 'One' }),
          h(SegmentedButton, { active: segmented.value === 'tab2', onClick: () => (segmented.value = 'tab2') }, { default: () => 'Two' }),
        ],
      },
    ),
  ),
  'capacitor-segmented-button': defineComponent({
    setup() {
      const active = ref('a')
      return () =>
        h(
          Segmented,
          { strong: true },
          {
            default: () => [
              h(SegmentedButton, { active: active.value === 'a', onClick: () => (active.value = 'a') }, { default: () => 'A' }),
              h(SegmentedButton, { active: active.value === 'b', onClick: () => (active.value = 'b') }, { default: () => 'B' }),
            ],
          },
        )
    },
  }),
  'capacitor-sheet': defineOpenShellButtonDemo('Open sheet', sheetOpen),
  'capacitor-skeleton': defineDemo(() => h(Skeleton, { class: 'h-10 w-full rounded-lg' })),
  'capacitor-split-pane': defineDemo(() =>
    h(SplitPane, { class: 'min-h-24 grid grid-cols-2 gap-2 p-2 text-sm' }, { default: () => [h('div', 'Left pane'), h('div', 'Right pane')] }),
  ),
  'capacitor-stepper': defineComponent({
    setup() {
      const value = ref(stepperValue.value)
      return () =>
        h(Stepper, {
          value: value.value,
          onPlus: () => {
            value.value = Math.min(10, value.value + 1)
            stepperValue.value = value.value
          },
          onMinus: () => {
            value.value = Math.max(0, value.value - 1)
            stepperValue.value = value.value
          },
        })
    },
  }),
  'capacitor-tab': defineComponent({
    setup() {
      const active = ref('a')
      return () =>
        h(
          Tabs,
          {},
          {
            default: () => [
              h(Tab, { active: active.value === 'a', onClick: () => (active.value = 'a') }, { default: () => 'Tab A' }),
              h(Tab, { active: active.value === 'b', onClick: () => (active.value = 'b') }, { default: () => 'Tab B' }),
            ],
          },
        )
    },
  }),
  'capacitor-tabs': defineComponent({
    setup() {
      const active = ref('one')
      return () =>
        h(
          Tabs,
          {},
          {
            default: () => [
              h(Tab, { active: active.value === 'one', onClick: () => (active.value = 'one') }, { default: () => 'One' }),
              h(Tab, { active: active.value === 'two', onClick: () => (active.value = 'two') }, { default: () => 'Two' }),
            ],
          },
        )
    },
  }),
  'capacitor-tabbar': defineDemo(() =>
    h(
      Tabbar,
      { labels: true },
      {
        default: () => [h(TabbarLink, { active: true, icon: 'home', label: 'Home' }), h(TabbarLink, { icon: 'search', label: 'Search' })],
      },
    ),
  ),
  'capacitor-tabbar-link': defineDemo(() =>
    h(
      Tabbar,
      { labels: true },
      {
        default: () => h(TabbarLink, { active: true, icon: 'today', label: 'Today' }),
      },
    ),
  ),
  'capacitor-table': defineDemo(() => demoTableSample()),
  'capacitor-table-body': defineDemo(() => tableWithBodyRow('Body row')),
  'capacitor-table-cell': defineDemo(() => tableWithBodyCells('Cell A', 'Cell B')),
  'capacitor-table-head': defineDemo(() => tableWithHeaderCell('Header')),
  'capacitor-table-row': defineDemo(() => tableWithBodyRow('Single row')),
  'capacitor-textarea': defineDemo(() => h(Textarea, { value: 'Hello', label: 'Message', placeholder: 'Type here', 'aria-label': 'Message' })),
  'capacitor-thumbnail': defineDemo(() =>
    h('div', { class: 'flex items-center gap-3' }, [
      h(Thumbnail, { class: 'size-16 rounded-lg bg-neutral-200 dark:bg-neutral-700' }),
      h('p', { class: 'text-sm' }, 'List row media'),
    ]),
  ),
  'capacitor-toast': defineOpenShellButtonDemo('Show toast', toastOpen),
  'capacitor-touch-ripple': defineDemo(() => h(TouchRipple, { class: 'inline-flex' }, { default: () => h(Button, {}, { default: () => 'Ripple target' }) })),
  'capacitor-toggle': defineDemo(() => h(Toggle, { checked: toggleOn.value, onClick: () => (toggleOn.value = !toggleOn.value) })),
  'capacitor-toolbar': defineDemo(() =>
    h(
      Toolbar,
      { top: true },
      {
        default: () => [
          h('div', { class: 'left' }, [h(Link, { toolbar: true, href: '#' }, { default: () => 'Cancel' })]),
          h('div', { class: 'title' }, 'Edit item'),
          h('div', { class: 'right flex items-center gap-4' }, [
            h(Link, { toolbar: true, href: '#' }, { default: () => 'Save' }),
            h(Link, { toolbar: true, href: '#', class: 'ml-1' }, { default: () => 'More' }),
          ]),
        ],
      },
    ),
  ),
}

/** @param {string} name */
function sectionFor(name) {
  return sectionMap[name] ?? defineDemo(() => h('p', { class: 'p-3 text-sm opacity-70' }, `No demo registered for ${name}.`))
}
</script>
