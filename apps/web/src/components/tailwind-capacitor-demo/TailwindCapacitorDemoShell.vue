<template>
  <App id="tc-demo-root" :theme="platform" :dark="dark" class="min-h-dvh">
    <Page class="safe-areas">
      <Navbar title="Components" :subtitle="platformLabel" />

      <section id="tc-demo-foundation" class="tc-demo-section px-1 pb-2">
        <h2 class="tc-demo-section-heading">Registry foundation</h2>
        <p class="tc-demo-section-description">Core styles, provider, shared tokens, and icon primitives from the shadcn registry.</p>
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
            <Link toolbar href="#" @click.prevent="sheetOpen = false" @keyup.enter="sheetOpen = false">Done</Link>
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

      <Toast :opened="toastOpen" position="center" @toast:closed="toastOpen = false"> Toast from registry demo </Toast>
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

const foundationNames = new Set(['capacitor-tailwind', 'capacitor-provider', 'capacitor-shared', 'capacitor-icons'])

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
  if (event.origin !== window.location.origin) return
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

function defineDemo(render) {
  return defineComponent({
    setup() {
      return render
    },
  })
}

/** @param {import('vue').Ref<boolean>} openRef */
function defineOpenShellButtonDemo(label, openRef) {
  return defineDemo(() => h(Button, { onClick: () => (openRef.value = true) }, { default: () => label }))
}

function defineActionsPreviewDemo(buttonLabel, groupContent) {
  return defineComponent({
    setup() {
      const open = ref(false)
      const close = () => {
        open.value = false
      }
      return () =>
        h('div', { class: 'flex flex-col gap-2' }, [
          h(Button, { onClick: () => (open.value = true) }, { default: () => buttonLabel }),
          h(
            Actions,
            { opened: open.value, onBackdropclick: close },
            {
              default: () => h(ActionsGroup, {}, { default: () => groupContent() }),
            },
          ),
        ])
    },
  })
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
  'capacitor-actions-button': defineActionsPreviewDemo('Preview ActionsButton', () => [
    h(ActionsLabel, {}, { default: () => 'Label' }),
    h(ActionsButton, { bold: true }, { default: () => 'Primary action' }),
    h(ActionsButton, {}, { default: () => 'Secondary' }),
  ]),
  'capacitor-actions-group': defineActionsPreviewDemo('Open grouped actions', () => [
    h(ActionsButton, {}, { default: () => 'One' }),
    h(ActionsButton, {}, { default: () => 'Two' }),
  ]),
  'capacitor-actions-label': defineActionsPreviewDemo('Open actions label', () => [
    h(ActionsLabel, {}, { default: () => 'Section title' }),
    h(ActionsButton, {}, { default: () => 'Item' }),
  ]),
  'capacitor-app': defineDemo(() =>
    h(
      Block,
      { strong: true, class: 'm-0' },
      {
        default: () => h('p', { class: 'p-3 text-sm' }, `Root App shell with ${platformLabel.value} theme and ${dark.value ? 'dark' : 'light'} mode.`),
      },
    ),
  ),
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
  'capacitor-dialog': defineOpenShellButtonDemo('Open dialog', dialogOpen),
  'capacitor-dialog-button': defineComponent({
    setup() {
      const open = ref(false)
      return () =>
        h('div', {}, [
          h(Button, { onClick: () => (open.value = true) }, { default: () => 'Dialog with buttons' }),
          h(
            Dialog,
            { opened: open.value, onBackdropclick: () => (open.value = false) },
            {
              title: () => 'Confirm',
              default: () => 'DialogButton styles appear below.',
              buttons: () => [
                h(DialogButton, { onClick: () => (open.value = false) }, { default: () => 'Cancel' }),
                h(DialogButton, { strong: true, onClick: () => (open.value = false) }, { default: () => 'OK' }),
              ],
            },
          ),
        ])
    },
  }),
  'capacitor-fab': defineDemo(() =>
    h('div', { class: 'relative min-h-24' }, [h(Fab, { class: 'relative right-0 bottom-0 ml-auto', href: '#' }, { default: () => h('span', { class: 'text-2xl' }, '+') })]),
  ),
  'capacitor-icon': defineDemo(() => h(Icon, { material: 'home', class: 'text-2xl' })),
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
              after: () => h(Toggle, { checked: toggleOn.value }),
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
  'capacitor-messagebar': defineDemo(() => h(Messagebar, { placeholder: 'Type a message' })),
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
  'capacitor-notification': defineDemo(() => h(Notification, { title: 'Notification', subtitle: 'Subtitle', text: 'Supporting text' })),
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
  'capacitor-popover': defineDemo(() => h('div', {}, [h(Button, { id: 'popover-target', onClick: () => (popoverOpen.value = true) }, { default: () => 'Open popover' })])),
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
  'capacitor-stepper': defineDemo(() => h(Stepper, { value: stepperValue.value, min: 0, max: 10 })),
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
  'capacitor-toast': defineOpenShellButtonDemo('Show toast', toastOpen),
  'capacitor-toggle': defineDemo(() => h(Toggle, { checked: toggleOn.value, onClick: () => (toggleOn.value = !toggleOn.value) })),
  'capacitor-toolbar': defineDemo(() =>
    h(
      Toolbar,
      { top: true },
      {
        left: () => h(Link, { toolbar: true }, { default: () => 'Left' }),
        title: () => 'Toolbar',
        right: () => h(Link, { toolbar: true }, { default: () => 'Right' }),
      },
    ),
  ),
}

/** @param {string} name */
function sectionFor(name) {
  return sectionMap[name]
}
</script>
