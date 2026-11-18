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
  Tabs,
  Textarea,
  Thumbnail,
  Toast,
  Toggle,
  Toolbar,
  TouchRipple,
} from '../../tailwind-capacitor-snapshot/capacitor/index.js'
import { tailwindCapacitorDemoTitle, type TailwindCapacitorDemoSlug } from '@/lib/tailwindCapacitorDemoCatalog'
import manifest from '../../tailwind-capacitor-snapshot/registry-manifest.json'
import {
  destructiveActionColors,
  openOverlayRefStage,
  overlayScreenFiller,
  overlayUnderlayTrigger,
} from './demoOverlayHelpers'
import { demoComponentStateRegistry } from './demoComponentStateRegistry'
import {
  buildTwoOptionSegmentedStates,
  demoIconVnode,
  demoTableBodyCells,
  demoTableBodyRow,
  demoTableHeaderCell,
  demoTableSample,
  platformLabel,
  type SlugStateDef,
} from './demoGalleryShared'

export type DemoState = { id: string; label: string; render: () => VNode }
export { platformLabel }

export type GalleryContext = {
  h: typeof h
  platform: Ref<'ios' | 'material'>
  dark: Ref<boolean>
  actionsOpen: Ref<boolean>
  dialogOpen: Ref<boolean>
  alertOpen: Ref<boolean>
  sheetOpen: Ref<boolean>
  popupOpen: Ref<boolean>
  panelOpen: Ref<boolean>
  toastOpen: Ref<boolean>
  popoverOpen: Ref<boolean>
  modalOpen: Ref<boolean>
  notificationOpen: Ref<boolean>
  segmented: Ref<string>
  rangeValue: Ref<number>
  stepperValue: Ref<number>
  stepperMinValue: Ref<number>
  stepperMaxValue: Ref<number>
  toggleOffChecked: Ref<boolean>
  toggleOnChecked: Ref<boolean>
  toggleAfterChecked: Ref<boolean>
  checkboxOffChecked: Ref<boolean>
  checkboxOnChecked: Ref<boolean>
  chipFilledActive: Ref<boolean>
  chipRemovableVisible: Ref<boolean>
  radioOptionA: Ref<string>
  radioOptionB: Ref<string>
  toggleOn: Ref<boolean>
  checkboxOn: Ref<boolean>
  radioVal: Ref<string>
  search: Ref<string>
  tabsDemoActive: Ref<string>
  tabbarDemoActive: Ref<string>
  accordionDemoOpen: Ref<boolean>
  accordionItemExpandedCopy: Ref<boolean>
  overlayTrigger: (label: string, openRef: Ref<boolean>, options?: { id?: string }) => VNode
}

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
    alertOpen: ref(false),
    sheetOpen: ref(false),
    popupOpen: ref(false),
    panelOpen: ref(false),
    toastOpen: ref(false),
    popoverOpen: ref(false),
    modalOpen: ref(false),
    notificationOpen: ref(false),
    segmented: ref('tab1'),
    rangeValue: ref(40),
    stepperValue: ref(2),
    stepperMinValue: ref(0),
    stepperMaxValue: ref(10),
    toggleOffChecked: ref(false),
    toggleOnChecked: ref(true),
    toggleAfterChecked: ref(true),
    checkboxOffChecked: ref(false),
    checkboxOnChecked: ref(true),
    chipFilledActive: ref(false),
    chipRemovableVisible: ref(true),
    radioOptionA: ref('a'),
    radioOptionB: ref('b'),
    toggleOn: ref(true),
    checkboxOn: ref(true),
    radioVal: ref('a'),
    search: ref(''),
    tabsDemoActive: ref('a'),
    tabbarDemoActive: ref('home'),
    accordionDemoOpen: ref(false),
    accordionItemExpandedCopy: ref(true),
  }

  return attachGalleryContext(ctxBase)
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
              h(ActionsButton, { bold: true, colors: destructiveActionColors }, { default: () => 'Delete' }),
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
          demoIconVnode(c, 'home', { class: 'text-2xl', 'aria-label': 'Home' }),
          demoIconVnode(c, 'person', { class: 'text-2xl', 'aria-label': 'Person' }),
          demoIconVnode(c, 'search', { class: 'text-2xl', 'aria-label': 'Search' }),
          demoIconVnode(c, 'settings', { class: 'text-2xl', 'aria-label': 'Settings' }),
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
    render: (c) => overlayUnderlayTrigger(c, 'Open actions', c.actionsOpen),
  }
  const sheetOpen: SlugStateDef = {
    id: 'sheet-open',
    label: 'Sheet open',
    render: (c) => openOverlayRefStage(c, overlayScreenFiller(c, 'Actions'), c.actionsOpen),
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

function overlayUnderlayTitle(slug: string): string {
  if (slug === 'foundation') return 'Foundation'
  return tailwindCapacitorDemoTitle(slug as TailwindCapacitorDemoSlug)
}

function buildOverlayStates(
  _ctx: GalleryContext,
  slug: string,
  triggerLabel: string,
  openRef: keyof GalleryContext,
  _openRenderer: (ctx: GalleryContext) => VNode,
  options?: { id?: string },
): SlugStateDef[] {
  const screenTitle = overlayUnderlayTitle(slug)
  return [
    {
      id: 'screen',
      label: 'Screen',
      render: (c) => overlayUnderlayTrigger(c, triggerLabel, c[openRef] as Ref<boolean>, options),
    },
    {
      id: 'open',
      label: 'Open',
      render: (c) => {
        const openKey = openRef as keyof GalleryContext
        const ref = c[openKey] as Ref<boolean>
        const underlay =
          options?.id != null
            ? c.h('div', { class: 'tc-demo-screen-filler flex min-h-full flex-col justify-center p-4' }, [
                c.h('button', {
                  type: 'button',
                  id: options.id,
                  class:
                    'tc-demo-overlay-trigger inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white',
                  onClick: () => {
                    ref.value = true
                  },
                }, 'Open'),
              ])
            : overlayScreenFiller(c, screenTitle || 'App')
        return openOverlayRefStage(c, underlay, ref)
      },
    },
  ]
}

function buildToggleStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    {
      id: 'off',
      label: 'Off',
      render: (c) =>
        h(Toggle, {
          checked: c.toggleOffChecked.value,
          onClick: () => {
            c.toggleOffChecked.value = !c.toggleOffChecked.value
          },
        }),
    },
    {
      id: 'on',
      label: 'On',
      render: (c) =>
        h(Toggle, {
          checked: c.toggleOnChecked.value,
          onClick: () => {
            c.toggleOnChecked.value = !c.toggleOnChecked.value
          },
        }),
    },
    { id: 'disabled', label: 'Disabled', render: (c) => h(Toggle, { checked: false, disabled: true }) },
  ]
}

function buildBadgeStates(ctx: GalleryContext): SlugStateDef[] {
  const { h } = ctx
  return [
    {
      id: 'count',
      label: 'Count',
      render: () => h(Badge, { class: 'tc-demo-badge-inline' }, { default: () => '3' }),
    },
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
    {
      id: 'filled',
      label: 'Filled',
      render: (c) =>
        h('div', { class: 'tc-demo-chip-row' }, [
          h(
            Chip,
            {
              onClick: () => {
                c.chipFilledActive.value = !c.chipFilledActive.value
              },
              class: c.chipFilledActive.value ? 'ring-2 ring-primary' : undefined,
            },
            { default: () => 'Capgo' },
          ),
        ]),
    },
    {
      id: 'removable',
      label: 'Removable',
      render: (c) =>
        c.chipRemovableVisible.value
          ? h(
              Chip,
              {
                deleteButton: true,
                onDelete: () => {
                  c.chipRemovableVisible.value = false
                },
              },
              { default: () => 'Removable' },
            )
          : h('p', { class: 'p-3 text-sm opacity-70' }, 'Chip removed'),
    },
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
          after: () =>
            h(Toggle, {
              checked: c.toggleAfterChecked.value,
              onClick: () => {
                c.toggleAfterChecked.value = !c.toggleAfterChecked.value
              },
            }),
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
      render: (c) =>
        h(List, { inset: true }, {
          default: () => [
            h(
              ListItem,
              { title: 'Tailwind Capacitor', subtitle: 'Registry plugin' },
              { media: () => demoIconVnode(c, 'extension', { class: 'text-xl' }) },
            ),
            h(
              ListItem,
              { title: 'Live updates', subtitle: 'Capgo channel' },
              { media: () => demoIconVnode(c, 'bolt', { class: 'text-xl' }) },
            ),
          ],
        }),
    },
  ]
}

function buildCheckboxStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    {
      id: 'off',
      label: 'Off',
      render: (c) =>
        h(Checkbox, {
          checked: c.checkboxOffChecked.value,
          onChange: () => {
            c.checkboxOffChecked.value = !c.checkboxOffChecked.value
          },
        }),
    },
    {
      id: 'on',
      label: 'On',
      render: (c) =>
        h(Checkbox, {
          checked: c.checkboxOnChecked.value,
          onChange: () => {
            c.checkboxOnChecked.value = !c.checkboxOnChecked.value
          },
        }),
    },
    { id: 'disabled', label: 'Disabled', render: (c) => h(Checkbox, { checked: false, disabled: true }) },
  ]
}

function buildRadioRow(ctx: GalleryContext, group: 'a' | 'b', selected: Ref<string>) {
  const { h } = ctx
  const name = `tc-demo-radio-${group}`
  const pick = (value: string) => {
    selected.value = value
  }
  return h(
    List,
    {},
    {
      default: () => [
        h(
          ListItem,
          {
            title: 'Option A',
            label: true,
            onClick: () => pick('a'),
          },
          {
            media: () =>
              h(Radio, {
                name,
                value: 'a',
                checked: selected.value === 'a',
                onChange: () => pick('a'),
              }),
          },
        ),
        h(
          ListItem,
          {
            title: 'Option B',
            label: true,
            onClick: () => pick('b'),
          },
          {
            media: () =>
              h(Radio, {
                name,
                value: 'b',
                checked: selected.value === 'b',
                onChange: () => pick('b'),
              }),
          },
        ),
      ],
    },
  )
}

function buildRadioStates(ctx: GalleryContext): SlugStateDef[] {
  return [
    { id: 'option-a', label: 'Option A', render: (c) => buildRadioRow(c, 'a', c.radioOptionA) },
    { id: 'option-b', label: 'Option B', render: (c) => buildRadioRow(c, 'b', c.radioOptionB) },
  ]
}

function buildSegmentedStates(ctx: GalleryContext): SlugStateDef[] {
  return buildTwoOptionSegmentedStates(
    ctx,
    { id: 'one-selected', label: 'One selected', firstActive: true, options: ['One', 'Two'] },
    { id: 'two-selected', label: 'Two selected', firstActive: false, options: ['One', 'Two'] },
  )
}

function buildSegmentedButtonStates(ctx: GalleryContext): SlugStateDef[] {
  return buildTwoOptionSegmentedStates(
    ctx,
    { id: 'a-selected', label: 'A selected', firstActive: true, options: ['A', 'B'] },
    { id: 'b-selected', label: 'B selected', firstActive: false, options: ['A', 'B'] },
  )
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
      c.tabsDemoActive.value = activeKey
      return h(
        Tabs,
        {},
        {
          default: () => [
            h(
              Tab,
              {
                active: c.tabsDemoActive.value === keys[0],
                onClick: () => {
                  c.tabsDemoActive.value = keys[0]
                },
              },
              { default: () => left },
            ),
            h(
              Tab,
              {
                active: c.tabsDemoActive.value === keys[1],
                onClick: () => {
                  c.tabsDemoActive.value = keys[1]
                },
              },
              { default: () => right },
            ),
          ],
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
    {
      id: 'focused',
      label: 'Focused',
      render: (c) =>
        h(Searchbar, {
          value: 'cap',
          placeholder: 'Search components',
          focused: true,
        }),
    },
    {
      id: 'with-cancel',
      label: 'With cancel',
      render: (c) =>
        h(Searchbar, {
          value: c.search.value || 'plugins',
          placeholder: 'Search components',
          disableButton: true,
          onSearchbarInput: (e: CustomEvent<{ value?: string }>) => (c.search.value = String(e.detail?.value ?? '')),
        }),
    },
  ]
}

function buildTextareaStates(ctx: GalleryContext): SlugStateDef[] {
  const field = (value: string) => (c: GalleryContext) =>
    h(List, {}, {
      default: () =>
        h(ListInput, {
          label: 'Message',
          type: 'textarea',
          placeholder: 'Type here',
          value,
          onInput: (event: Event) => {
            const target = event.target
            if (target instanceof HTMLTextAreaElement) c.search.value = target.value
          },
        }),
    })
  return [
    { id: 'empty', label: 'Empty', render: field('') },
    { id: 'filled', label: 'Filled', render: field('Hello from the demo shell.') },
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

function dialogAlertVNode(ctx: GalleryContext) {
  const { h } = ctx
  return h(
    Dialog,
    { opened: true },
    {
      title: () => 'Heads up',
      default: () => 'Registry Alert styles.',
      buttons: () => h(DialogButton, { strong: true }, { default: () => 'OK' }),
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
      backdrop: true,
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
  return h(
    Toast,
    { class: 'tc-demo-registry-toast', opened: true, position: 'left', translucent: false },
    { default: () => 'Bundle uploaded to the preview channel' },
  )
}


function expandedStatesForSlug(slug: string, ctx: GalleryContext): SlugStateDef[] | null {
  if (slug === 'foundation') return buildFoundationStates(ctx)
  if (slug === 'capacitor-button') return buildButtonStates(ctx)
  if (slug === 'capacitor-actions') return buildActionsFamilyStates(ctx, 'root')
  if (slug === 'capacitor-actions-button') return buildActionsFamilyStates(ctx, 'button')
  if (slug === 'capacitor-actions-group') return buildActionsFamilyStates(ctx, 'group')
  if (slug === 'capacitor-actions-label') return buildActionsFamilyStates(ctx, 'label')
  if (slug === 'capacitor-dialog') return buildOverlayStates(ctx, slug, 'Open dialog', 'dialogOpen', dialogOpenVNode)
  if (slug === 'capacitor-alert') {
    const { h } = ctx
    return [
      {
        id: 'inline',
        label: 'Inline',
        render: (c) => h(Alert, { class: 'p-4' }, { default: () => 'Heads up: registry Alert styles.' }),
      },
      ...buildOverlayStates(ctx, slug, 'Show alert', 'alertOpen', dialogAlertVNode),
    ]
  }
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
  const registry = demoComponentStateRegistry(slug)
  if (registry) return registry(ctx)
  return null
}

function legacyStatesForSlug(slug: string): SlugStateDef[] {
  return [
    {
      id: 'unregistered',
      label: 'Unregistered',
      render: (ctx) => {
        const { h } = ctx
        return h('p', { class: 'p-3 text-sm opacity-70' }, `No demo registered for ${slug}.`)
      },
    },
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
