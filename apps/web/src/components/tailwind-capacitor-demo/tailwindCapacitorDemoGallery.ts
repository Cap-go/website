import { foundationPackageNames } from '@/lib/tailwindCapacitorDemoCatalog'
import { h, ref, type Ref, type VNode } from 'vue'
import {
  Accordion,
  AccordionItem,
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  Alert,
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
  Messagebar,
  Messages,
  MessagesTitle,
  Modal,
  Navbar,
  NavbarBackLink,
  Note,
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
  TabbarLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Textarea,
  Thumbnail,
  Toast,
  Toggle,
  Toolbar,
  TouchRipple,
} from '../../tailwind-capacitor-snapshot/capacitor/index.js'
import manifest from '../../tailwind-capacitor-snapshot/registry-manifest.json'

export type DemoState = { id: string; label: string; render: () => VNode }

export type GalleryContext = {
  h: typeof h
  platform: Ref<'ios' | 'material'>
  dark: Ref<boolean>
  actionsOpen: Ref<boolean>
  dialogOpen: Ref<boolean>
  sheetOpen: Ref<boolean>
  popupOpen: Ref<boolean>
  panelOpen: Ref<boolean>
  toastOpen: Ref<boolean>
  popoverOpen: Ref<boolean>
  segmented: Ref<string>
  rangeValue: Ref<number>
  stepperValue: Ref<number>
  toggleOn: Ref<boolean>
  checkboxOn: Ref<boolean>
  radioVal: Ref<string>
  search: Ref<string>
  tabsDemoActive: Ref<string>
  overlayTrigger: (label: string, openRef: Ref<boolean>, options?: { id?: string }) => VNode
}

type SlugStateDef = { id: string; label: string; render: (ctx: GalleryContext) => VNode }

const foundationPackageNameSet = new Set<string>(foundationPackageNames)

const DEMO_SLUGS = ['foundation', ...manifest.items.filter((item) => !foundationPackageNameSet.has(item.name)).map((item) => item.name)]

export function attachGalleryContext(partial: Omit<GalleryContext, 'overlayTrigger' | 'h'>): GalleryContext {
  const overlayTrigger = (label: string, openRef: Ref<boolean>, opts: { id?: string } = {}) =>
    h(
      'button',
      {
        type: 'button',
        id: opts.id,
        class:
          'tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white',
        onClick: () => {
          openRef.value = true
        },
      },
      label,
    )
  return { h, ...partial, overlayTrigger }
}

export function createGalleryContext(options?: Partial<{ platform: 'ios' | 'material'; dark: boolean }>): GalleryContext {
  const platform = ref<'ios' | 'material'>(options?.platform ?? 'ios')
  const dark = ref(options?.dark ?? false)
  const ctxBase = {
    h,
    platform,
    dark,
    actionsOpen: ref(false),
    dialogOpen: ref(false),
    sheetOpen: ref(false),
    popupOpen: ref(false),
    panelOpen: ref(false),
    toastOpen: ref(false),
    popoverOpen: ref(false),
    segmented: ref('tab1'),
    rangeValue: ref(40),
    stepperValue: ref(2),
    toggleOn: ref(true),
    checkboxOn: ref(true),
    radioVal: ref('a'),
    search: ref(''),
    tabsDemoActive: ref('a'),
  }

  const overlayTrigger = (label: string, openRef: Ref<boolean>, opts: { id?: string } = {}) =>
    h(
      'button',
      {
        type: 'button',
        id: opts.id,
        class: 'tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white',
        onClick: () => {
          openRef.value = true
        },
      },
      label,
    )

  return { ...ctxBase, overlayTrigger }
}

export function platformLabel(ctx: GalleryContext): string {
  return ctx.platform.value === 'ios' ? 'iOS' : 'Material'
}

function overlayTrigger(ctx: GalleryContext, label: string, openRef: Ref<boolean>, options: { id?: string } = {}) {
  return ctx.overlayTrigger(label, openRef, options)
}

function tableWithBodyRow(ctx: GalleryContext, label: string) {
  const { h } = ctx
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

function tableWithHeaderCell(ctx: GalleryContext, label: string) {
  const { h } = ctx
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

function tableWithBodyCells(ctx: GalleryContext, ...labels: string[]) {
  const { h } = ctx
  return h(
    Table,
    {},
    {
      default: () =>
        h(
          TableBody,
          {},
          {
            default: () =>
              h(
                TableRow,
                {},
                {
                  default: () => labels.map((label) => h(TableCell, {}, { default: () => label })),
                },
              ),
          },
        ),
    },
  )
}

function demoTableSample(ctx: GalleryContext) {
  const { h } = ctx
  const headRow = h(
    TableRow,
    {},
    {
      default: () => [h(TableCell, { header: true }, { default: () => 'Name' }), h(TableCell, { header: true }, { default: () => 'Value' })],
    },
  )
  const bodyRow = h(
    TableRow,
    {},
    {
      default: () => [h(TableCell, {}, { default: () => 'Rows' }), h(TableCell, {}, { default: () => '2' })],
    },
  )
  return h(
    Table,
    {},
    {
      default: () => [h(TableHead, {}, { default: () => headRow }), h(TableBody, {}, { default: () => bodyRow })],
    },
  )
}

function settingsScene(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    List,
    { strong: true, inset: true, class: 'tc-demo-gallery-scene mb-3 opacity-90' },
    {
      default: () => [
        h(ListItem, { title: 'Push notifications', subtitle: 'Alerts and sounds' }),
        h(ListItem, {
          title: 'Sync over cellular',
          after: () =>
            h(Toggle, {
              checked: ctx.toggleOn.value,
              onClick: () => {
                ctx.toggleOn.value = !ctx.toggleOn.value
              },
            }),
        }),
        h(ListItem, { title: 'Account', subtitle: 'Signed in', chevron: true }),
      ],
    },
  )
}

function formScene(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    List,
    { strong: true, inset: true, class: 'tc-demo-gallery-scene mb-3 opacity-90' },
    {
      default: () => [
        h(ListInput, { label: 'Channel', type: 'text', value: 'Preview', readonly: true }),
        h(ListInput, { label: 'Bundle id', type: 'text', placeholder: 'com.example.app' }),
      ],
    },
  )
}

function feedScene(ctx: GalleryContext) {
  const { h } = ctx
  return h('div', { class: 'tc-demo-gallery-scene mb-3 space-y-3 opacity-90' }, [
    h(
      Card,
      {},
      {
        default: () =>
          h('div', { class: 'p-3' }, [h('p', { class: 'text-sm font-medium' }, 'Build finished'), h('p', { class: 'mt-1 text-xs opacity-70' }, '2m ago · Preview channel')]),
      },
    ),
    h(
      Messages,
      { class: 'max-h-24 overflow-hidden' },
      {
        default: () => h(Message, { type: 'received', text: 'Deploy looks good from here.', name: 'Team' }),
      },
    ),
  ])
}

function editorScene(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Block,
    { strong: true, inset: true, class: 'tc-demo-gallery-scene mb-3 opacity-90' },
    {
      default: () => [
        h('p', { class: 'p-3 text-sm font-medium' }, 'Edit release notes'),
        h(Textarea, {
          class: 'mx-3 mb-3',
          value: 'Fixed startup crash on cold launch.',
          label: 'Notes',
          'aria-label': 'Notes',
        }),
      ],
    },
  )
}

function minimalScene(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Block,
    { class: 'tc-demo-gallery-scene mb-3 border border-black/5 p-3 text-xs opacity-60 dark:border-white/10' },
    { default: () => `Component preview · ${platformLabel(ctx)}` },
  )
}

function foundationScene(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Block,
    { strong: true, inset: true, class: 'tc-demo-gallery-scene mb-3' },
    {
      default: () => [
        h('p', { class: 'p-3 text-sm' }, 'Registry foundation: Tailwind utilities, provider, shared tokens, and icons.'),
        h('div', { class: 'flex flex-wrap gap-4 px-3 pb-3' }, [
          h(Icon, { material: 'home', class: 'text-2xl', 'aria-label': 'Home' }),
          h(Icon, { material: 'settings', class: 'text-2xl', 'aria-label': 'Settings' }),
        ]),
      ],
    },
  )
}

function threadFeedScene(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Messages,
    { class: 'tc-demo-gallery-scene mb-3 max-h-32 overflow-hidden opacity-90' },
    {
      default: () => [h(MessagesTitle, { name: 'Release bot' }), h(Message, { type: 'received', text: 'Channel preview is ready.', name: 'Capgo' })],
    },
  )
}

const SETTINGS_SLUGS = new Set([
  'capacitor-toggle',
  'capacitor-checkbox',
  'capacitor-radio',
  'capacitor-range',
  'capacitor-stepper',
  'capacitor-segmented',
  'capacitor-segmented-button',
  'capacitor-select',
  'capacitor-notification',
  'capacitor-picker',
  'capacitor-datetime',
])

const FORM_SLUGS = new Set([
  'capacitor-list-input',
  'capacitor-textarea',
  'capacitor-searchbar',
  'capacitor-input-otp',
  'capacitor-list',
  'capacitor-list-button',
  'capacitor-list-group',
  'capacitor-list-item',
])

const FEED_SLUGS = new Set(['capacitor-card', 'capacitor-infinite-scroll', 'capacitor-refresher', 'capacitor-reorder', 'capacitor-item-sliding'])

const THREAD_SLUGS = new Set(['capacitor-message', 'capacitor-messages', 'capacitor-messages-title', 'capacitor-messagebar'])

const EDITOR_SLUGS = new Set([
  'capacitor-button',
  'capacitor-actions',
  'capacitor-actions-button',
  'capacitor-actions-group',
  'capacitor-actions-label',
  'capacitor-fab',
  'capacitor-link',
  'capacitor-modal',
  'capacitor-dialog',
  'capacitor-dialog-button',
  'capacitor-toolbar',
  'capacitor-touch-ripple',
])

function sceneKindForSlug(slug: string) {
  if (slug === 'foundation') return 'foundation'
  if (SETTINGS_SLUGS.has(slug)) return 'settings'
  if (FORM_SLUGS.has(slug)) return 'form'
  if (FEED_SLUGS.has(slug)) return 'feed'
  if (THREAD_SLUGS.has(slug)) return 'thread'
  if (EDITOR_SLUGS.has(slug)) return 'editor'
  return 'minimal'
}

export function demoSceneVNode(slug: string, ctx: GalleryContext): VNode | null {
  const kind = sceneKindForSlug(slug)
  switch (kind) {
    case 'foundation':
      return foundationScene(ctx)
    case 'settings':
      return settingsScene(ctx)
    case 'form':
      return formScene(ctx)
    case 'feed':
      return feedScene(ctx)
    case 'thread':
      return threadFeedScene(ctx)
    case 'editor':
      return editorScene(ctx)
    default:
      return minimalScene(ctx)
  }
}

function actionsSheetOpen(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Actions,
    { opened: true },
    {
      default: () => [
        h(
          ActionsGroup,
          {},
          {
            default: () => [
              h(ActionsLabel, {}, { default: () => 'Actions' }),
              h(
                ActionsButton,
                {},
                {
                  media: () => h(Icon, { material: 'share' }),
                  default: () => 'Share',
                },
              ),
              h(ActionsButton, { bold: true }, { default: () => 'Delete' }),
            ],
          },
        ),
        h(
          ActionsGroup,
          {},
          {
            default: () => h(ActionsButton, {}, { default: () => 'Cancel' }),
          },
        ),
      ],
    },
  )
}

function buttonFillColors() {
  return {
    fillBgIos: 'bg-red-500',
    fillBgMaterial: 'bg-red-600',
    fillTextIos: 'text-white',
    fillTextMaterial: 'text-white',
  }
}

function buttonOutlineColors() {
  return {
    outlineBorderIos: 'border-red-500',
    outlineBorderMaterial: 'border-red-500',
    textIos: 'text-red-500',
    textMaterial: 'text-red-500',
  }
}

function buildFoundationStates(ctx: GalleryContext): SlugStateDef[] {
  const { h } = ctx
  return [
    {
      id: 'packages',
      label: 'Packages',
      render: (c) =>
        h(
          Block,
          { strong: true, inset: true, class: 'm-0' },
          {
            default: () =>
              h('ul', { class: 'divide-y p-3 text-sm' }, [
                h('li', { class: 'py-2' }, 'Tailwind utilities, safe areas, and platform variants'),
                h('li', { class: 'py-2' }, 'Shared tokens and provider wiring'),
              ]),
          },
        ),
    },
    {
      id: 'icons',
      label: 'Icons',
      render: (c) =>
        h('div', { class: 'flex flex-wrap items-center gap-4 p-3' }, [
          h(Icon, { material: 'home', class: 'text-2xl', 'aria-label': 'Home' }),
          h(Icon, { material: 'person', class: 'text-2xl', 'aria-label': 'Person' }),
          h(Icon, { material: 'search', class: 'text-2xl', 'aria-label': 'Search' }),
          h(Icon, { material: 'settings', class: 'text-2xl', 'aria-label': 'Settings' }),
        ]),
    },
  ]
}

function buildButtonStates(ctx: GalleryContext): SlugStateDef[] {
  const { h } = ctx
  return [
    { id: 'solid', label: 'Solid', render: () => h(Button, {}, { default: () => 'Solid' }) },
    { id: 'outline', label: 'Outline', render: () => h(Button, { outline: true }, { default: () => 'Outline' }) },
    { id: 'clear', label: 'Clear', render: () => h(Button, { clear: true }, { default: () => 'Clear' }) },
    { id: 'tonal', label: 'Tonal', render: () => h(Button, { tonal: true }, { default: () => 'Tonal' }) },
    { id: 'small', label: 'Small', render: () => h(Button, { small: true }, { default: () => 'Small' }) },
    { id: 'large', label: 'Large', render: () => h(Button, { large: true }, { default: () => 'Large' }) },
    { id: 'raised', label: 'Raised', render: () => h(Button, { raised: true }, { default: () => 'Raised' }) },
    { id: 'disabled', label: 'Disabled', render: () => h(Button, { disabled: true }, { default: () => 'Disabled' }) },
    {
      id: 'with-icon',
      label: 'With icon',
      render: () =>
        h(
          Button,
          {},
          {
            default: () => [h(Icon, { material: 'share', class: 'mr-1 inline text-base', 'aria-hidden': 'true' }), 'Share'],
          },
        ),
    },
    { id: 'block', label: 'Block', render: () => h(Button, { class: 'block w-full' }, { default: () => 'Full width' }) },
    { id: 'fill-color', label: 'Fill color', render: () => h(Button, { colors: buttonFillColors() }, { default: () => 'Delete' }) },
    {
      id: 'outline-color',
      label: 'Outline color',
      render: () => h(Button, { outline: true, colors: buttonOutlineColors() }, { default: () => 'Delete' }),
    },
  ]
}

function buildActionsFamilyStates(ctx: GalleryContext, focus: 'root' | 'button' | 'group' | 'label'): SlugStateDef[] {
  const screen: SlugStateDef = {
    id: 'screen',
    label: 'Screen',
    render: (c) => overlayTrigger(c, 'Open actions', c.actionsOpen),
  }
  const sheetOpen: SlugStateDef = {
    id: 'sheet-open',
    label: 'Sheet open',
    render: (c) => h('div', { class: 'tc-demo-inline-actions-host' }, [actionsSheetOpen(c)]),
  }
  if (focus === 'button') {
    return [
      screen,
      sheetOpen,
      {
        id: 'primary-row',
        label: 'Primary row',
        render: (c) => {
          const { h } = c
          return h(ActionsButton, {}, { default: () => 'Primary action' })
        },
      },
    ]
  }
  if (focus === 'group') {
    return [
      screen,
      sheetOpen,
      {
        id: 'single-group',
        label: 'Single group',
        render: (c) => {
          const { h } = c
          return h(
            ActionsGroup,
            {},
            {
              default: () => [h(ActionsButton, {}, { default: () => 'Share' }), h(ActionsButton, {}, { default: () => 'Edit' })],
            },
          )
        },
      },
    ]
  }
  if (focus === 'label') {
    return [
      screen,
      sheetOpen,
      {
        id: 'section-label',
        label: 'Section label',
        render: (c) => {
          const { h } = c
          return h(ActionsLabel, {}, { default: () => 'Options' })
        },
      },
    ]
  }
  return [screen, sheetOpen]
}

function buildOverlayStates(
  ctx: GalleryContext,
  slug: string,
  triggerLabel: string,
  openRef: keyof GalleryContext,
  openRenderer: (ctx: GalleryContext) => VNode,
  options?: { id?: string },
): SlugStateDef[] {
  return [
    {
      id: 'screen',
      label: 'Screen',
      render: (c) => overlayTrigger(c, triggerLabel, c[openRef] as Ref<boolean>, options),
    },
    {
      id: 'open',
      label: 'Open',
      render: (c) => h('div', { class: 'tc-demo-state-overlay-preview' }, [openRenderer(c)]),
    },
  ]
}

function buildToggleStates(ctx: GalleryContext): SlugStateDef[] {
  const { h } = ctx
  return [
    { id: 'off', label: 'Off', render: (c) => h(Toggle, { checked: false }) },
    { id: 'on', label: 'On', render: (c) => h(Toggle, { checked: true }) },
    { id: 'disabled', label: 'Disabled', render: (c) => h(Toggle, { checked: false, disabled: true }) },
  ]
}

function buildBadgeStates(ctx: GalleryContext): SlugStateDef[] {
  const { h } = ctx
  return [
    { id: 'default', label: 'Default', render: () => h(Badge, {}, { default: () => 'New' }) },
    { id: 'color', label: 'Color', render: () => h(Badge, { colors: { bg: 'bg-red-500' } }, { default: () => 'Hot' }) },
    {
      id: 'on-avatar',
      label: 'On avatar',
      render: () =>
        h('div', { class: 'relative inline-flex' }, [
          h(Avatar, { class: 'inline-flex size-12 items-center justify-center text-sm font-semibold' }, { default: () => 'CG' }),
          h(Badge, { class: 'absolute -right-1 -top-1' }, { default: () => '3' }),
        ]),
    },
  ]
}

function buildChipStates(ctx: GalleryContext): SlugStateDef[] {
  const { h } = ctx
  return [
    { id: 'filled', label: 'Filled', render: () => h(Chip, {}, { default: () => 'Capgo' }) },
    { id: 'removable', label: 'Removable', render: () => h(Chip, { deleteButton: true }, { default: () => 'Removable' }) },
    { id: 'outline', label: 'Outline', render: () => h(Chip, { outline: true }, { default: () => 'Outline' }) },
  ]
}

function buildCardStates(ctx: GalleryContext): SlugStateDef[] {
  const { h } = ctx
  return [
    {
      id: 'feed',
      label: 'Feed card',
      render: () =>
        h(Card, {}, {
          default: () =>
            h('div', { class: 'p-4' }, [
              h('h3', { class: 'font-semibold' }, 'Release 2.4.0'),
              h('p', { class: 'mt-2 text-sm opacity-80' }, 'OTA bundle is live on the preview channel.'),
            ]),
        }),
    },
    {
      id: 'media',
      label: 'Media card',
      render: () =>
        h(Card, {}, {
          default: () =>
            h('div', { class: 'p-4 flex gap-3 items-center' }, [
              h(Thumbnail, { class: 'size-14 rounded-lg bg-neutral-200 dark:bg-neutral-700' }),
              h('div', {}, [h('p', { class: 'font-semibold text-sm' }, 'Plugin docs'), h('p', { class: 'text-xs opacity-70' }, 'Updated today')]),
            ]),
        }),
    },
    {
      id: 'outline',
      label: 'Outline card',
      render: () =>
        h(Card, { outline: true }, {
          default: () => h('div', { class: 'p-4 text-sm' }, 'Outline card for secondary content.'),
        }),
    },
  ]
}

function buildListItemStates(ctx: GalleryContext): SlugStateDef[] {
  const { h } = ctx
  return [
    { id: 'standard', label: 'Standard', render: () => h(ListItem, { title: 'Updates', subtitle: 'Push and email' }) },
    { id: 'chevron', label: 'Chevron link', render: () => h(ListItem, { title: 'Account', subtitle: 'Profile', chevron: true, link: true }) },
    {
      id: 'toggle-after',
      label: 'Toggle after',
      render: (c) =>
        h(ListItem, {}, {
          title: () => 'Analytics',
          after: () => h(Toggle, { checked: c.toggleOn.value, onClick: () => (c.toggleOn.value = !c.toggleOn.value) }),
        }),
    },
    { id: 'badge', label: 'Badge', render: () => h(ListItem, { title: 'Inbox', badge: '12' }) },
  ]
}

function buildListStates(ctx: GalleryContext): SlugStateDef[] {
  const { h } = ctx
  return [
    {
      id: 'inset',
      label: 'Inset list',
      render: () =>
        h(
          List,
          { strong: true, inset: true },
          {
            default: () => [h(ListItem, { title: 'Home', link: true }), h(ListItem, { title: 'Billing', link: true })],
          },
        ),
    },
    {
      id: 'buttons',
      label: 'List buttons',
      render: () =>
        h(List, { inset: true }, {
          default: () => [h(ListButton, {}, { default: () => 'Sign in' }), h(ListButton, {}, { default: () => 'Create account' })],
        }),
    },
    {
      id: 'media',
      label: 'Media rows',
      render: () =>
        h(List, { inset: true }, {
          default: () => [
            h(ListItem, { title: 'Tailwind Capacitor', subtitle: 'Registry plugin', media: () => h(Icon, { material: 'extension', class: 'text-xl' }) }),
            h(ListItem, { title: 'Live updates', subtitle: 'Capgo channel', media: () => h(Icon, { material: 'bolt', class: 'text-xl' }) }),
          ],
        }),
    },
  ]
}

function buildCheckboxStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    { id: 'off', label: 'Off', render: (c) => h(Checkbox, { checked: false }) },
    { id: 'on', label: 'On', render: (c) => h(Checkbox, { checked: true }) },
    { id: 'disabled', label: 'Disabled', render: (c) => h(Checkbox, { checked: false, disabled: true }) },
  ]
}

function buildRadioStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    {
      id: 'option-a',
      label: 'Option A',
      render: (c) =>
        h(
          List,
          {},
          {
            default: () => [h(ListItem, { radio: true, checked: true, title: 'Option A' }), h(ListItem, { radio: true, checked: false, title: 'Option B' })],
          },
        ),
    },
    {
      id: 'option-b',
      label: 'Option B',
      render: (c) =>
        h(
          List,
          {},
          {
            default: () => [h(ListItem, { radio: true, checked: false, title: 'Option A' }), h(ListItem, { radio: true, checked: true, title: 'Option B' })],
          },
        ),
    },
  ]
}

function buildSegmentedStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    {
      id: 'one-selected',
      label: 'One selected',
      render: (c) => {
        const { h } = c
        return h(
          Segmented,
          { strong: true },
          {
            default: () => [h(SegmentedButton, { active: true }, { default: () => 'One' }), h(SegmentedButton, { active: false }, { default: () => 'Two' })],
          },
        )
      },
    },
    {
      id: 'two-selected',
      label: 'Two selected',
      render: (c) => {
        const { h } = c
        return h(
          Segmented,
          { strong: true },
          {
            default: () => [h(SegmentedButton, { active: false }, { default: () => 'One' }), h(SegmentedButton, { active: true }, { default: () => 'Two' })],
          },
        )
      },
    },
  ]
}

function buildSegmentedButtonStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    {
      id: 'a-selected',
      label: 'A selected',
      render: (c) => {
        const { h } = c
        return h(
          Segmented,
          { strong: true },
          {
            default: () => [h(SegmentedButton, { active: true }, { default: () => 'A' }), h(SegmentedButton, { active: false }, { default: () => 'B' })],
          },
        )
      },
    },
    {
      id: 'b-selected',
      label: 'B selected',
      render: (c) => {
        const { h } = c
        return h(
          Segmented,
          { strong: true },
          {
            default: () => [h(SegmentedButton, { active: false }, { default: () => 'A' }), h(SegmentedButton, { active: true }, { default: () => 'B' })],
          },
        )
      },
    },
  ]
}

function buildTabsStates(ctx: GalleryContext, slug: 'capacitor-tab' | 'capacitor-tabs'): SlugStateDef[] {
  const labels =
    slug === 'capacitor-tab'
      ? [
          ['tab-a', 'Tab A selected', 'a', 'Tab A', 'Tab B'],
          ['tab-b', 'Tab B selected', 'b', 'Tab A', 'Tab B'],
        ]
      : [
          ['tab-one', 'One selected', 'one', 'One', 'Two'],
          ['tab-two', 'Two selected', 'two', 'One', 'Two'],
        ]
  return labels.map(([id, label, activeKey, left, right]) => ({
    id,
    label,
    render: (c) => {
      const { h } = c
      const keys = slug === 'capacitor-tab' ? ['a', 'b'] : ['one', 'two']
      return h(
        Tabs,
        {},
        {
          default: () => [h(Tab, { active: activeKey === keys[0] }, { default: () => left }), h(Tab, { active: activeKey === keys[1] }, { default: () => right })],
        },
      )
    },
  }))
}

function buildListInputStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    {
      id: 'empty',
      label: 'Empty',
      render: (c) => {
        const { h } = c
        return h(List, {}, { default: () => h(ListInput, { label: 'Email', type: 'email', placeholder: 'you@example.com' }) })
      },
    },
    {
      id: 'filled',
      label: 'Filled',
      render: (c) => {
        const { h } = c
        return h(List, {}, { default: () => h(ListInput, { label: 'Email', type: 'email', value: 'dev@capgo.app' }) })
      },
    },
    {
      id: 'focused',
      label: 'Focused',
      render: (c) => {
        const { h } = c
        return h(List, {}, { default: () => h(ListInput, { label: 'Email', type: 'email', value: 'dev@capgo.app', autofocus: true }) })
      },
    },
  ]
}

function buildSearchbarStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    {
      id: 'empty',
      label: 'Empty',
      render: (c) => h(Searchbar, { value: '', placeholder: 'Search components' }),
    },
    {
      id: 'filled',
      label: 'Filled',
      render: (c) => h(Searchbar, { value: 'capacitor-button', placeholder: 'Search components' }),
    },
  ]
}

function buildTextareaStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    { id: 'empty', label: 'Empty', render: (c) => h(Textarea, { value: '', label: 'Message', placeholder: 'Type here', 'aria-label': 'Message' }) },
    { id: 'filled', label: 'Filled', render: (c) => h(Textarea, { value: 'Hello', label: 'Message', placeholder: 'Type here', 'aria-label': 'Message' }) },
  ]
}

function buildInputOtpStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    {
      id: 'empty',
      label: 'Empty',
      render: (c) => {
        const { h } = c
        return h(InputOtp, { class: 'p-2' }, { default: () => [h('span', { class: 'px-2 py-1 border rounded' }, '·'), h('span', { class: 'px-2 py-1 border rounded' }, '·')] })
      },
    },
    {
      id: 'filled',
      label: 'Filled',
      render: (c) => {
        const { h } = c
        return h(InputOtp, { class: 'p-2' }, { default: () => [h('span', { class: 'px-2 py-1 border rounded' }, '1'), h('span', { class: 'px-2 py-1 border rounded' }, '2')] })
      },
    },
  ]
}

function dialogOpenVNode(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Dialog,
    { opened: true },
    {
      title: () => 'Dialog',
      default: () => 'Sample dialog from the registry demo.',
      buttons: () => h(DialogButton, {}, { default: () => 'Close' }),
    },
  )
}

function sheetOpenVNode(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Sheet,
    { class: 'tc-demo-registry-sheet', opened: true },
    {
      default: () => [
        h(
          Toolbar,
          { top: true, 'inner-class': 'tc-demo-sheet-toolbar-inner' },
          {
            default: () => [h('div', { class: 'title' }, 'Sheet')],
          },
        ),
        h(Block, {}, { default: () => h('p', { class: 'p-4' }, 'Sheet overlay content.') }),
      ],
    },
  )
}

function popupOpenVNode(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Popup,
    { opened: true },
    {
      default: () =>
        h(
          Block,
          { strong: true, class: 'm-0' },
          {
            default: () => [h('p', { class: 'p-4' }, 'Popup content'), h(Button, { class: 'm-4 mt-0 w-[calc(100%-2rem)]' }, { default: () => 'Close' })],
          },
        ),
    },
  )
}

function panelOpenVNode(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Panel,
    { opened: true },
    {
      default: () =>
        h(
          Page,
          {},
          {
            default: () => [h(Navbar, { title: 'Panel' }), h(Block, { class: 'p-4' }, { default: () => 'Panel side content' })],
          },
        ),
    },
  )
}

function popoverOpenVNode(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Popover,
    {
      class: 'tc-demo-registry-popover pointer-events-auto',
      opened: true,
      backdrop: false,
      angle: true,
      size: 'w-52',
      target: '#popover-target-inline',
    },
    {
      default: () =>
        h(
          List,
          { class: 'tc-demo-popover-list' },
          {
            default: () => h(ListItem, { title: 'Popover item', 'content-class': 'tc-demo-popover-list-item-content' }),
          },
        ),
    },
  )
}

function toastOpenVNode(ctx: GalleryContext) {
  const { h } = ctx
  return h(Toast, { class: 'tc-demo-registry-toast', opened: true, position: 'center' }, { default: () => 'Toast from registry demo' })
}

const legacyDemoRenderers: Record<string, (ctx: GalleryContext) => VNode> = {
  'capacitor-accordion': (ctx) => {
    const { h } = ctx
    return h(
      Accordion,
      {},
      {
        default: () => [h(AccordionItem, {}, { default: () => 'Accounts' }), h(AccordionItem, {}, { default: () => 'Billing' })],
      },
    )
  },
  'capacitor-accordion-item': (ctx) => {
    const { h } = ctx
    return h(Accordion, {}, { default: () => h(AccordionItem, {}, { default: () => 'Accordion item' }) })
  },
  'capacitor-actions': (ctx) => overlayTrigger(ctx, 'Open actions', ctx.actionsOpen),
  'capacitor-actions-button': (ctx) => overlayTrigger(ctx, 'Open actions', ctx.actionsOpen),
  'capacitor-actions-group': (ctx) => overlayTrigger(ctx, 'Open actions', ctx.actionsOpen),
  'capacitor-actions-label': (ctx) => overlayTrigger(ctx, 'Open actions', ctx.actionsOpen),
  'capacitor-alert': (ctx) => {
    const { h } = ctx
    return h(Alert, { class: 'p-4' }, { default: () => 'Heads up: registry Alert styles.' })
  },
  'capacitor-app': (ctx) => {
    const { h } = ctx
    return h(
      Block,
      { strong: true, class: 'm-0' },
      {
        default: () => h('p', { class: 'p-3 text-sm' }, `Root App shell with ${platformLabel(ctx)} theme and ${ctx.dark.value ? 'dark' : 'light'} mode.`),
      },
    )
  },
  'capacitor-avatar': (ctx) => {
    const { h } = ctx
    return h(Avatar, { class: 'inline-flex size-12 items-center justify-center text-sm font-semibold' }, { default: () => 'CG' })
  },
  'capacitor-badge': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'flex flex-wrap gap-2' }, [h(Badge, {}, { default: () => 'Default' }), h(Badge, { colors: { bg: 'bg-red-500' } }, { default: () => 'Hot' })])
  },
  'capacitor-block': (ctx) => {
    const { h } = ctx
    return h(Block, { inset: true, strong: true }, { default: () => 'Inset strong block' })
  },
  'capacitor-block-footer': (ctx) => {
    const { h } = ctx
    return h(
      Block,
      { strong: true, class: 'm-0' },
      {
        default: () => [h('p', { class: 'p-4' }, 'Block body'), h(BlockFooter, {}, { default: () => 'Block footer' })],
      },
    )
  },
  'capacitor-block-header': (ctx) => {
    const { h } = ctx
    return h(
      Block,
      { class: 'm-0' },
      {
        default: () => [h(BlockHeader, {}, { default: () => 'Header' }), h('p', { class: 'p-4' }, 'Block body')],
      },
    )
  },
  'capacitor-block-title': (ctx) => {
    const { h } = ctx
    return h(BlockTitle, {}, { default: () => 'Block title' })
  },
  'capacitor-breadcrumbs': (ctx) => {
    const { h } = ctx
    return h(
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
    )
  },
  'capacitor-breadcrumbs-collapsed': (ctx) => {
    const { h } = ctx
    return h(
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
    )
  },
  'capacitor-breadcrumbs-item': (ctx) => {
    const { h } = ctx
    return h(
      Breadcrumbs,
      {},
      {
        default: () => [h(BreadcrumbsItem, {}, { default: () => 'Library' }), h(BreadcrumbsSeparator), h(BreadcrumbsItem, { active: true }, { default: () => 'Active item' })],
      },
    )
  },
  'capacitor-breadcrumbs-separator': (ctx) => {
    const { h } = ctx
    return h(
      Breadcrumbs,
      {},
      {
        default: () => [h(BreadcrumbsItem, {}, { default: () => 'Docs' }), h(BreadcrumbsSeparator), h(BreadcrumbsItem, { active: true }, { default: () => 'API' })],
      },
    )
  },
  'capacitor-button': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'flex flex-wrap gap-2' }, [
      h(Button, {}, { default: () => 'Solid' }),
      h(Button, { outline: true }, { default: () => 'Outline' }),
      h(Button, { clear: true }, { default: () => 'Clear' }),
    ])
  },
  'capacitor-card': (ctx) => {
    const { h } = ctx
    return h(
      Card,
      {},
      {
        default: () => h('div', { class: 'p-4' }, [h('h3', { class: 'font-semibold' }, 'Card'), h('p', { class: 'text-sm mt-2 opacity-80' }, 'Card body text.')]),
      },
    )
  },
  'capacitor-checkbox': (ctx) => {
    const { h } = ctx
    return h(Checkbox, { checked: ctx.checkboxOn.value, onClick: () => (ctx.checkboxOn.value = !ctx.checkboxOn.value) })
  },
  'capacitor-chip': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'flex flex-wrap gap-2' }, [h(Chip, {}, { default: () => 'Chip' }), h(Chip, { deleteButton: true }, { default: () => 'Removable' })])
  },
  'capacitor-datetime': (ctx) => {
    const { h } = ctx
    return h(Datetime, { class: 'p-3 text-sm' }, { default: () => 'Nov 15, 2026' })
  },
  'capacitor-dialog': (ctx) => {
    const { h } = ctx
    return overlayTrigger(ctx, 'Open dialog', ctx.dialogOpen)
  },
  'capacitor-dialog-button': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'flex flex-wrap gap-2' }, [h(DialogButton, {}, { default: () => 'Cancel' }), h(DialogButton, { strong: true }, { default: () => 'OK' })])
  },
  'capacitor-fab': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'relative min-h-24' }, [h(Fab, { class: 'relative right-0 bottom-0 ml-auto', href: '#' }, { default: () => h('span', { class: 'text-2xl' }, '+') })])
  },
  'capacitor-footer': (ctx) => {
    const { h } = ctx
    return h(Footer, {}, { default: () => h('p', { class: 'p-3 text-sm' }, 'Footer region') })
  },
  'capacitor-header': (ctx) => {
    const { h } = ctx
    return h(Header, {}, { default: () => h('p', { class: 'p-3 text-sm' }, 'Header region') })
  },
  'capacitor-icon': (ctx) => {
    const { h } = ctx
    return h(Icon, { material: 'home', class: 'text-2xl' })
  },
  'capacitor-infinite-scroll': (ctx) => {
    const { h } = ctx
    return h(InfiniteScroll, { class: 'p-3 text-sm' }, { default: () => 'Load more when scrolled' })
  },
  'capacitor-input-otp': (ctx) => {
    const { h } = ctx
    return h(InputOtp, { class: 'p-2' }, { default: () => [h('span', { class: 'px-2 py-1 border rounded' }, '1'), h('span', { class: 'px-2 py-1 border rounded' }, '2')] })
  },
  'capacitor-item-sliding': (ctx) => {
    const { h } = ctx
    return h(
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
    )
  },
  'capacitor-link': (ctx) => {
    const { h } = ctx
    return h(Link, { href: '#' }, { default: () => 'Link' })
  },
  'capacitor-list': (ctx) => {
    const { h } = ctx
    return h(
      List,
      {},
      {
        default: () => [h(ListItem, { title: 'List item', subtitle: 'Subtitle', chevron: true }), h(ListButton, {}, { default: () => 'List button' })],
      },
    )
  },
  'capacitor-list-button': (ctx) => {
    const { h } = ctx
    return h(
      List,
      {},
      {
        default: () => h(ListButton, {}, { default: () => 'Standalone list button' }),
      },
    )
  },
  'capacitor-list-group': (ctx) => {
    const { h } = ctx
    return h(
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
    )
  },
  'capacitor-list-input': (ctx) => {
    const { h } = ctx
    return h(
      List,
      {},
      {
        default: () => h(ListInput, { label: 'Email', type: 'email', placeholder: 'you@example.com' }),
      },
    )
  },
  'capacitor-list-item': (ctx) => {
    const { h } = ctx
    return h(
      List,
      {},
      {
        default: () =>
          h(
            ListItem,
            {},
            {
              title: () => 'Title slot',
              after: () => h(Toggle, { checked: ctx.toggleOn.value, onClick: () => (ctx.toggleOn.value = !ctx.toggleOn.value) }),
            },
          ),
      },
    )
  },
  'capacitor-menu-list': (ctx) => {
    const { h } = ctx
    return h(
      MenuList,
      {},
      {
        default: () => h(MenuListItem, { href: '#' }, { default: () => 'Menu item' }),
      },
    )
  },
  'capacitor-menu-list-item': (ctx) => {
    const { h } = ctx
    return h(
      MenuList,
      {},
      {
        default: () => h(MenuListItem, { href: '#' }, { default: () => 'Dropdown menu item' }),
      },
    )
  },
  'capacitor-message': (ctx) => {
    const { h } = ctx
    return h(
      Messages,
      {},
      {
        default: () => [
          h(MessagesTitle, { name: 'Capgo' }),
          h(Message, { type: 'sent', text: 'Hello from the registry demo.', name: 'You' }),
          h(Message, { type: 'received', text: 'All components run in Vue.', name: 'Capgo' }),
        ],
      },
    )
  },
  'capacitor-messagebar': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-messagebar-host space-y-2' }, [
      h('p', { class: 'text-xs opacity-70' }, 'Compose a reply'),
      h(Messagebar, { placeholder: 'Type a message', value: 'On my way' }),
    ])
  },
  'capacitor-messages': (ctx) => {
    const { h } = ctx
    return h(
      Messages,
      {},
      {
        default: () => h(Message, { type: 'received', text: 'Messages container layout.', name: 'Capgo' }),
      },
    )
  },
  'capacitor-messages-title': (ctx) => {
    const { h } = ctx
    return h(
      Messages,
      {},
      {
        default: () => [h(MessagesTitle, { name: 'Martin' }), h(Message, { type: 'received', text: 'MessagesTitle labels the thread.', name: 'Martin' })],
      },
    )
  },
  'capacitor-modal': (ctx) => {
    const { h } = ctx
    return h(
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
    )
  },
  'capacitor-navbar': (ctx) => {
    const { h } = ctx
    return h(
      Navbar,
      { title: 'Navbar', subtitle: 'Subtitle' },
      {
        left: () => h(NavbarBackLink, { text: 'Back' }),
      },
    )
  },
  'capacitor-navbar-back-link': (ctx) => {
    const { h } = ctx
    return h(NavbarBackLink, { text: 'Back' })
  },
  'capacitor-note': (ctx) => {
    const { h } = ctx
    return h(Note, {}, { default: () => 'Note block from registry' })
  },
  'capacitor-notification': (ctx) => {
    const { h } = ctx
    return h(
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
    )
  },
  'capacitor-page': (ctx) => {
    const { h } = ctx
    return h(
      Block,
      { strong: true, inset: true, class: 'm-0' },
      {
        default: () => h('p', { class: 'p-3 text-sm' }, 'The outer scroll view is a Page component wrapping this catalog.'),
      },
    )
  },
  'capacitor-panel': (ctx) => {
    const { h } = ctx
    return overlayTrigger(ctx, 'Open panel', ctx.panelOpen)
  },
  'capacitor-picker': (ctx) => {
    const { h } = ctx
    return h(Picker, { class: 'p-4 text-sm' }, { default: () => ['Morning', 'Afternoon', 'Evening'].map((label) => h('div', { class: 'block py-2' }, label)) })
  },
  'capacitor-popover': (ctx) => {
    const { h } = ctx
    return overlayTrigger(ctx, 'Open popover', ctx.popoverOpen, { id: 'popover-target-inline' })
  },
  'capacitor-popup': (ctx) => {
    const { h } = ctx
    return overlayTrigger(ctx, 'Open popup', ctx.popupOpen)
  },
  'capacitor-preloader': (ctx) => {
    const { h } = ctx
    return h(Preloader, { class: 'mx-auto' })
  },
  'capacitor-progressbar': (ctx) => {
    const { h } = ctx
    return h(Progressbar, { progress: 65 })
  },
  'capacitor-radio': (ctx) => {
    const { h } = ctx
    return h(
      List,
      {},
      {
        default: () => [
          h(ListItem, { radio: true, checked: ctx.radioVal.value === 'a', title: 'Option A', onClick: () => (ctx.radioVal.value = 'a') }),
          h(ListItem, { radio: true, checked: ctx.radioVal.value === 'b', title: 'Option B', onClick: () => (ctx.radioVal.value = 'b') }),
          h(Radio, { class: 'sr-only', checked: ctx.radioVal.value === 'a' }),
        ],
      },
    )
  },
  'capacitor-range': (ctx) => {
    const { h } = ctx
    return h(Range, {
      value: ctx.rangeValue.value,
      onRange: 'change',
      onInput: (e: Event) => (ctx.rangeValue.value = Number((e.target as HTMLInputElement | null)?.value ?? 0)),
    })
  },
  'capacitor-refresher': (ctx) => {
    const { h } = ctx
    return h(Refresher, { class: 'p-3 text-center text-sm' }, { default: () => 'Pull to refresh' })
  },
  'capacitor-reorder': (ctx) => {
    const { h } = ctx
    return h(
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
    )
  },
  'capacitor-searchbar': (ctx) => {
    const { h } = ctx
    return h(Searchbar, {
      value: ctx.search.value,
      placeholder: 'Search components',
      onSearchbarInput: (e: CustomEvent<{ value?: string }>) => (ctx.search.value = String(e.detail?.value ?? '')),
    })
  },
  'capacitor-segmented': (ctx) => {
    const { h } = ctx
    return h(
      Segmented,
      { strong: true },
      {
        default: () => [
          h(SegmentedButton, { active: ctx.segmented.value === 'tab1', onClick: () => (ctx.segmented.value = 'tab1') }, { default: () => 'One' }),
          h(SegmentedButton, { active: ctx.segmented.value === 'tab2', onClick: () => (ctx.segmented.value = 'tab2') }, { default: () => 'Two' }),
        ],
      },
    )
  },
  'capacitor-segmented-button': (ctx) => {
    const { h } = ctx
    return h(
      Segmented,
      { strong: true },
      {
        default: () => [
          h(SegmentedButton, { active: ctx.segmented.value === 'a' }, { default: () => 'A' }),
          h(SegmentedButton, { active: ctx.segmented.value === 'b' }, { default: () => 'B' }),
        ],
      },
    )
  },
  'capacitor-select': (ctx) => {
    const { h } = ctx
    return h(Select, { label: 'Fruit', 'aria-label': 'Fruit' }, { default: () => [h('option', { value: 'apple' }, 'Apple'), h('option', { value: 'pear' }, 'Pear')] })
  },
  'capacitor-sheet': (ctx) => {
    const { h } = ctx
    return overlayTrigger(ctx, 'Open sheet', ctx.sheetOpen)
  },
  'capacitor-skeleton': (ctx) => {
    const { h } = ctx
    return h(Skeleton, { class: 'h-10 w-full rounded-lg' })
  },
  'capacitor-split-pane': (ctx) => {
    const { h } = ctx
    return h(SplitPane, { class: 'min-h-24 grid grid-cols-2 gap-2 p-2 text-sm' }, { default: () => [h('div', 'Left pane'), h('div', 'Right pane')] })
  },
  'capacitor-stepper': (ctx) => {
    const { h } = ctx
    return h(Stepper, {
      value: ctx.stepperValue.value,
      onPlus: () => {
        ctx.stepperValue.value = Math.min(10, ctx.stepperValue.value + 1)
      },
      onMinus: () => {
        ctx.stepperValue.value = Math.max(0, ctx.stepperValue.value - 1)
      },
    })
  },
  'capacitor-tab': (ctx) => {
    const { h } = ctx
    return h(
      Tabs,
      {},
      {
        default: () => [
          h(Tab, { active: ctx.tabsDemoActive.value === 'a' }, { default: () => 'Tab A' }),
          h(Tab, { active: ctx.tabsDemoActive.value === 'b' }, { default: () => 'Tab B' }),
        ],
      },
    )
  },
  'capacitor-tabbar': (ctx) => {
    const { h } = ctx
    return h(
      Tabbar,
      { labels: true },
      {
        default: () => [h(TabbarLink, { active: true, icon: 'home', label: 'Home' }), h(TabbarLink, { icon: 'search', label: 'Search' })],
      },
    )
  },
  'capacitor-tabbar-link': (ctx) => {
    const { h } = ctx
    return h(
      Tabbar,
      { labels: true },
      {
        default: () => h(TabbarLink, { active: true, icon: 'today', label: 'Today' }),
      },
    )
  },
  'capacitor-table': (ctx) => {
    const { h } = ctx
    return demoTableSample(ctx)
  },
  'capacitor-table-body': (ctx) => {
    const { h } = ctx
    return tableWithBodyRow(ctx, 'Body row')
  },
  'capacitor-table-cell': (ctx) => {
    const { h } = ctx
    return tableWithBodyCells(ctx, 'Cell A', 'Cell B')
  },
  'capacitor-table-head': (ctx) => {
    const { h } = ctx
    return tableWithHeaderCell(ctx, 'Header')
  },
  'capacitor-table-row': (ctx) => {
    const { h } = ctx
    return tableWithBodyRow(ctx, 'Single row')
  },
  'capacitor-tabs': (ctx) => {
    const { h } = ctx
    return h(
      Tabs,
      {},
      {
        default: () => [
          h(Tab, { active: ctx.tabsDemoActive.value === 'one' }, { default: () => 'One' }),
          h(Tab, { active: ctx.tabsDemoActive.value === 'two' }, { default: () => 'Two' }),
        ],
      },
    )
  },
  'capacitor-textarea': (ctx) => {
    const { h } = ctx
    return h(Textarea, { value: 'Hello', label: 'Message', placeholder: 'Type here', 'aria-label': 'Message' })
  },
  'capacitor-thumbnail': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'flex items-center gap-3' }, [
      h(Thumbnail, { class: 'size-16 rounded-lg bg-neutral-200 dark:bg-neutral-700' }),
      h('p', { class: 'text-sm' }, 'List row media'),
    ])
  },
  'capacitor-toast': (ctx) => {
    const { h } = ctx
    return overlayTrigger(ctx, 'Show toast', ctx.toastOpen)
  },
  'capacitor-toggle': (ctx) => {
    const { h } = ctx
    return h(Toggle, { checked: ctx.toggleOn.value, onClick: () => (ctx.toggleOn.value = !ctx.toggleOn.value) })
  },
  'capacitor-toolbar': (ctx) => {
    const { h } = ctx
    return h(
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
    )
  },
  'capacitor-touch-ripple': (ctx) => {
    const { h } = ctx
    return h(TouchRipple, { class: 'inline-flex' }, { default: () => h(Button, {}, { default: () => 'Ripple target' }) })
  },
}
const legacyAltDemoRenderers: Record<string, (ctx: GalleryContext) => VNode> = {
  'capacitor-accordion': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-accordion'](ctx)])
  },
  'capacitor-accordion-item': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-accordion-item'](ctx)])
  },
  'capacitor-alert': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-alert'](ctx)])
  },
  'capacitor-app': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-app'](ctx)])
  },
  'capacitor-avatar': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-avatar'](ctx)])
  },
  'capacitor-badge': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-badge'](ctx)])
  },
  'capacitor-block': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-block'](ctx)])
  },
  'capacitor-block-footer': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-block-footer'](ctx)])
  },
  'capacitor-block-header': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-block-header'](ctx)])
  },
  'capacitor-block-title': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-block-title'](ctx)])
  },
  'capacitor-breadcrumbs': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-breadcrumbs'](ctx)])
  },
  'capacitor-breadcrumbs-collapsed': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-breadcrumbs-collapsed'](ctx)])
  },
  'capacitor-breadcrumbs-item': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-breadcrumbs-item'](ctx)])
  },
  'capacitor-breadcrumbs-separator': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-breadcrumbs-separator'](ctx)])
  },
  'capacitor-card': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-card'](ctx)])
  },
  'capacitor-chip': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-chip'](ctx)])
  },
  'capacitor-datetime': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-datetime'](ctx)])
  },
  'capacitor-dialog-button': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-dialog-button'](ctx)])
  },
  'capacitor-fab': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-fab'](ctx)])
  },
  'capacitor-footer': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-footer'](ctx)])
  },
  'capacitor-header': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-header'](ctx)])
  },
  'capacitor-icon': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-icon'](ctx)])
  },
  'capacitor-infinite-scroll': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-infinite-scroll'](ctx)])
  },
  'capacitor-item-sliding': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-item-sliding'](ctx)])
  },
  'capacitor-link': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-link'](ctx)])
  },
  'capacitor-list': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-list'](ctx)])
  },
  'capacitor-list-button': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-list-button'](ctx)])
  },
  'capacitor-list-group': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-list-group'](ctx)])
  },
  'capacitor-list-item': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-list-item'](ctx)])
  },
  'capacitor-menu-list': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-menu-list'](ctx)])
  },
  'capacitor-menu-list-item': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-menu-list-item'](ctx)])
  },
  'capacitor-message': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-message'](ctx)])
  },
  'capacitor-messagebar': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-messagebar'](ctx)])
  },
  'capacitor-messages': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-messages'](ctx)])
  },
  'capacitor-messages-title': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-messages-title'](ctx)])
  },
  'capacitor-modal': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-modal'](ctx)])
  },
  'capacitor-navbar': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-navbar'](ctx)])
  },
  'capacitor-navbar-back-link': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-navbar-back-link'](ctx)])
  },
  'capacitor-note': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-note'](ctx)])
  },
  'capacitor-notification': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-notification'](ctx)])
  },
  'capacitor-page': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-page'](ctx)])
  },
  'capacitor-picker': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-picker'](ctx)])
  },
  'capacitor-preloader': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-preloader'](ctx)])
  },
  'capacitor-progressbar': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-progressbar'](ctx)])
  },
  'capacitor-range': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-range'](ctx)])
  },
  'capacitor-refresher': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-refresher'](ctx)])
  },
  'capacitor-reorder': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-reorder'](ctx)])
  },
  'capacitor-select': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-select'](ctx)])
  },
  'capacitor-skeleton': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-skeleton'](ctx)])
  },
  'capacitor-split-pane': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-split-pane'](ctx)])
  },
  'capacitor-stepper': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-stepper'](ctx)])
  },
  'capacitor-tabbar': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-tabbar'](ctx)])
  },
  'capacitor-tabbar-link': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-tabbar-link'](ctx)])
  },
  'capacitor-table': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-table'](ctx)])
  },
  'capacitor-table-body': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-table-body'](ctx)])
  },
  'capacitor-table-cell': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-table-cell'](ctx)])
  },
  'capacitor-table-head': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-table-head'](ctx)])
  },
  'capacitor-table-row': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-table-row'](ctx)])
  },
  'capacitor-thumbnail': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-thumbnail'](ctx)])
  },
  'capacitor-toolbar': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-toolbar'](ctx)])
  },
  'capacitor-touch-ripple': (ctx) => {
    const { h } = ctx
    return h('div', { class: 'tc-demo-state-alt' }, [legacyDemoRenderers['capacitor-touch-ripple'](ctx)])
  },
}

function expandedStatesForSlug(slug: string, ctx: GalleryContext): SlugStateDef[] | null {
  if (slug === 'foundation') return buildFoundationStates(ctx)
  if (slug === 'capacitor-button') return buildButtonStates(ctx)
  if (slug === 'capacitor-actions') return buildActionsFamilyStates(ctx, 'root')
  if (slug === 'capacitor-actions-button') return buildActionsFamilyStates(ctx, 'button')
  if (slug === 'capacitor-actions-group') return buildActionsFamilyStates(ctx, 'group')
  if (slug === 'capacitor-actions-label') return buildActionsFamilyStates(ctx, 'label')
  if (slug === 'capacitor-dialog') return buildOverlayStates(ctx, slug, 'Open dialog', 'dialogOpen', dialogOpenVNode)
  if (slug === 'capacitor-sheet') return buildOverlayStates(ctx, slug, 'Open sheet', 'sheetOpen', sheetOpenVNode)
  if (slug === 'capacitor-popup') return buildOverlayStates(ctx, slug, 'Open popup', 'popupOpen', popupOpenVNode)
  if (slug === 'capacitor-panel') return buildOverlayStates(ctx, slug, 'Open panel', 'panelOpen', panelOpenVNode)
  if (slug === 'capacitor-popover') return buildOverlayStates(ctx, slug, 'Open popover', 'popoverOpen', popoverOpenVNode, { id: 'popover-target-inline' })
  if (slug === 'capacitor-toast') return buildOverlayStates(ctx, slug, 'Show toast', 'toastOpen', toastOpenVNode)
  if (slug === 'capacitor-toggle') return buildToggleStates(ctx)
  if (slug === 'capacitor-checkbox') return buildCheckboxStates(ctx)
  if (slug === 'capacitor-radio') return buildRadioStates(ctx)
  if (slug === 'capacitor-segmented') return buildSegmentedStates(ctx)
  if (slug === 'capacitor-segmented-button') return buildSegmentedButtonStates(ctx)
  if (slug === 'capacitor-tab' || slug === 'capacitor-tabs') return buildTabsStates(ctx, slug)
  if (slug === 'capacitor-badge') return buildBadgeStates(ctx)
  if (slug === 'capacitor-chip') return buildChipStates(ctx)
  if (slug === 'capacitor-card') return buildCardStates(ctx)
  if (slug === 'capacitor-list') return buildListStates(ctx)
  if (slug === 'capacitor-list-item') return buildListItemStates(ctx)
  if (slug === 'capacitor-list-input') return buildListInputStates(ctx)
  if (slug === 'capacitor-searchbar') return buildSearchbarStates(ctx)
  if (slug === 'capacitor-textarea') return buildTextareaStates(ctx)
  if (slug === 'capacitor-input-otp') return buildInputOtpStates(ctx)
  return null
}

function legacyStatesForSlug(slug: string): SlugStateDef[] {
  const render = legacyDemoRenderers[slug]
  if (!render) {
    return [
      {
        id: 'default',
        label: 'Default',
        render: (ctx) => {
          const { h } = ctx
          return h('p', { class: 'p-3 text-sm opacity-70' }, `No demo registered for ${slug}.`)
        },
      },
      {
        id: 'placeholder',
        label: 'Placeholder',
        render: (ctx) => {
          const { h } = ctx
          return h('p', { class: 'p-3 text-sm opacity-50' }, 'Alternate preview.')
        },
      },
    ]
  }
  return [
    { id: 'default', label: 'Default', render },
    { id: 'alternate', label: 'Alternate', render: legacyAltDemoRenderers[slug] ?? render },
  ]
}

function slugStateDefs(slug: string, ctx: GalleryContext): SlugStateDef[] {
  return expandedStatesForSlug(slug, ctx) ?? legacyStatesForSlug(slug)
}

export function demoStatesForSlug(slug: string, ctx: GalleryContext): DemoState[] {
  return slugStateDefs(slug, ctx).map((def) => ({
    id: def.id,
    label: def.label,
    render: () => def.render(ctx),
  }))
}

export function tailwindCapacitorDemoStateManifest(): Record<string, { id: string; label: string }[]> {
  const ctx = createGalleryContext()
  const out: Record<string, { id: string; label: string }[]> = {}
  for (const slug of DEMO_SLUGS) {
    out[slug] = slugStateDefs(slug, ctx).map(({ id, label }) => ({ id, label }))
  }
  return out
}
