import { h, type VNode } from 'vue'
import type { GalleryContext } from './tailwindCapacitorDemoGallery'
import {
  demoIconVnode,
  demoTableBodyCells,
  demoTableBodyRow,
  demoTableHeaderCell,
  demoTableSample,
  overlayClosedOpen,
  platformLabel,
  type SlugStateDef,
} from './demoGalleryShared'
import {
  Accordion,
  AccordionItem,
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
  Datetime,
  Dialog,
  DialogButton,
  Fab,
  Footer,
  Header,
  Icon,
  InfiniteScroll,
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
  Picker,
  Preloader,
  Progressbar,
  Range,
  Refresher,
  Reorder,
  Select,
  Skeleton,
  SplitPane,
  Stepper,
  Tabbar,
  TabbarLink,
  Thumbnail,
  Toolbar,
  TouchRipple,
} from '../../tailwind-capacitor-snapshot/capacitor/index.js'
import {
  openOverlayPhoneStage,
  overlayScreenFiller,
  overlayUnderlayTrigger,
} from './demoOverlayHelpers'

const EXPANDED_IN_GALLERY = new Set([
  'foundation',
  'capacitor-button',
  'capacitor-actions',
  'capacitor-actions-button',
  'capacitor-actions-group',
  'capacitor-actions-label',
  'capacitor-dialog',
  'capacitor-sheet',
  'capacitor-popup',
  'capacitor-panel',
  'capacitor-popover',
  'capacitor-toast',
  'capacitor-toggle',
  'capacitor-checkbox',
  'capacitor-radio',
  'capacitor-segmented',
  'capacitor-segmented-button',
  'capacitor-tab',
  'capacitor-tabs',
  'capacitor-badge',
  'capacitor-chip',
  'capacitor-card',
  'capacitor-list',
  'capacitor-list-item',
  'capacitor-list-input',
  'capacitor-searchbar',
  'capacitor-textarea',
  'capacitor-input-otp',
])


function notificationVNode(ctx: GalleryContext, opened: boolean): VNode {
  const { h } = ctx
  return h(
    Notification,
    {
      opened,
      button: 'Dismiss',
      title: 'New message',
      subtitle: 'Capgo',
      text: 'Your bundle finished uploading to the preview channel.',
      class: opened ? 'tc-demo-notification-inline' : undefined,
    },
    {
      icon: () => demoIconVnode(ctx, 'notifications', { class: 'text-xl', 'aria-label': 'Notification' }),
    },
  )
}

function modalContentVNode(ctx: GalleryContext): VNode {
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
}

const REGISTRY_BUILDERS: Record<string, (ctx: GalleryContext) => SlugStateDef[]> = {
  'capacitor-accordion': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'single-section',
        label: 'Single section',
        render: () =>
          h(Accordion, {}, {
            default: () => [h(AccordionItem, {}, { default: () => 'Accounts' })],
          }),
      },
      {
        id: 'multi-section',
        label: 'Multi section',
        render: () =>
          h(Accordion, {}, {
            default: () => [
              h(AccordionItem, {}, { default: () => 'Accounts' }),
              h(AccordionItem, {}, { default: () => 'Billing' }),
              h(AccordionItem, {}, { default: () => 'Security' }),
            ],
          }),
      },
      {
        id: 'nested-copy',
        label: 'With descriptions',
        render: () =>
          h(Accordion, {}, {
            default: () => [
              h(AccordionItem, {}, { default: () => 'Notifications' }),
              h(AccordionItem, {}, { default: () => 'Appearance' }),
            ],
          }),
      },
    ]
  },
  'capacitor-accordion-item': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'collapsed',
        label: 'Collapsed',
        render: () =>
          h(Accordion, {}, {
            default: () => h(AccordionItem, {}, { default: () => 'Accordion item' }),
          }),
      },
      {
        id: 'expanded-copy',
        label: 'Expanded copy',
        render: (c) => {
          c.accordionDemoOpen.value = true
          return h('div', { class: 'w-full tc-demo-accordion-expanded' }, [
            h(Accordion, {}, {
              default: () =>
                h(
                  AccordionItem,
                  {
                    onClick: () => {
                      c.accordionDemoOpen.value = !c.accordionDemoOpen.value
                    },
                  },
                  { default: () => 'Billing details' },
                ),
            }),
            c.accordionDemoOpen.value
              ? h(
                  'p',
                  { class: 'px-4 pb-3 text-sm opacity-80 tc-demo-accordion-expanded-body' },
                  'Invoices, receipts, and tax settings appear here when expanded.',
                )
              : null,
          ])
        },
      },
      {
        id: 'stacked',
        label: 'Stacked items',
        render: () =>
          h(Accordion, {}, {
            default: () => [
              h(AccordionItem, {}, { default: () => 'First' }),
              h(AccordionItem, {}, { default: () => 'Second' }),
            ],
          }),
      },
    ]
  },
  'capacitor-app': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'light-shell',
        label: 'Light shell',
        render: () =>
          h(Block, { strong: true, inset: true, class: 'tc-demo-app-light-preview m-0' }, {
            default: () => h('p', { class: 'p-3 text-sm' }, 'Light App surface preview inside the demo shell.'),
          }),
      },
      {
        id: 'dark-shell',
        label: 'Dark shell',
        render: (c) =>
          h(App, { class: 'p-3' }, {
            default: () =>
              h('p', { class: 'text-sm' }, `Root App shell (${platformLabel(c)}, ${c.dark.value ? 'dark' : 'light'}).`),
          }),
      },
      {
        id: 'with-block',
        label: 'With block',
        render: () =>
          h(App, {}, {
            default: () => h(Block, { strong: true, inset: true, class: 'm-0' }, { default: () => 'App wraps scrollable content.' }),
          }),
      },
    ]
  },
  'capacitor-avatar': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'initials',
        label: 'Initials',
        render: () => h(Avatar, { class: 'inline-flex size-12 items-center justify-center text-sm font-semibold' }, { default: () => 'CG' }),
      },
      {
        id: 'small',
        label: 'Small',
        render: () => h(Avatar, { class: 'inline-flex size-8 items-center justify-center text-xs font-semibold' }, { default: () => 'AB' }),
      },
      {
        id: 'large',
        label: 'Large',
        render: () => h(Avatar, { class: 'inline-flex size-16 items-center justify-center text-base font-semibold' }, { default: () => 'XL' }),
      },
    ]
  },
  'capacitor-block': (ctx) => {
    const { h } = ctx
    return [
      { id: 'inset-strong', label: 'Inset strong', render: () => h(Block, { inset: true, strong: true }, { default: () => 'Inset strong block' }) },
      { id: 'outline', label: 'Outline', render: () => h(Block, { outline: true, class: 'p-4' }, { default: () => 'Outline block' }) },
      { id: 'plain', label: 'Plain', render: () => h(Block, { class: 'p-3 text-sm' }, { default: () => 'Plain block content.' }) },
    ]
  },
  'capacitor-block-footer': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'with-footer',
        label: 'With footer',
        render: () =>
          h(Block, { strong: true, class: 'm-0' }, {
            default: () => [h('p', { class: 'p-4' }, 'Block body'), h(BlockFooter, {}, { default: () => 'Block footer' })],
          }),
      },
      {
        id: 'footer-note',
        label: 'Footer note',
        render: () =>
          h(Block, { class: 'm-0' }, {
            default: () => [h('p', { class: 'p-4 text-sm' }, 'Settings saved.'), h(BlockFooter, {}, { default: () => 'Changes sync on next launch.' })],
          }),
      },
    ]
  },
  'capacitor-block-header': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'with-header',
        label: 'With header',
        render: () =>
          h(Block, { class: 'm-0' }, {
            default: () => [h(BlockHeader, {}, { default: () => 'Header' }), h('p', { class: 'p-4' }, 'Block body')],
          }),
      },
      {
        id: 'section-title',
        label: 'Section title',
        render: () =>
          h(Block, { class: 'm-0' }, {
            default: () => [h(BlockHeader, {}, { default: () => 'Account' }), h('p', { class: 'p-4 text-sm' }, 'Profile and security.')],
          }),
      },
    ]
  },
  'capacitor-block-title': (ctx) => {
    const { h } = ctx
    return [
      { id: 'standalone', label: 'Standalone', render: () => h(BlockTitle, {}, { default: () => 'Block title' }) },
      {
        id: 'with-body',
        label: 'With body',
        render: () =>
          h(Block, { class: 'm-0' }, {
            default: () => [h(BlockTitle, {}, { default: () => 'Releases' }), h('p', { class: 'px-4 pb-4 text-sm opacity-80' }, 'Recent builds')],
          }),
      },
    ]
  },
  'capacitor-breadcrumbs': (ctx) => {
    const { h } = ctx
    const trail = () =>
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
    return [
      { id: 'trail', label: 'Trail', render: trail },
      {
        id: 'compact',
        label: 'Compact',
        render: () =>
          h(Breadcrumbs, {}, {
            default: () => [
              h(BreadcrumbsItem, {}, { default: () => 'Docs' }),
              h(BreadcrumbsSeparator),
              h(BreadcrumbsItem, { active: true }, { default: () => 'Components' }),
            ],
          }),
      },
    ]
  },
  'capacitor-breadcrumbs-collapsed': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'collapsed-middle',
        label: 'Collapsed middle',
        render: () =>
          h(Breadcrumbs, {}, {
            default: () => [
              h(BreadcrumbsItem, {}, { default: () => 'Root' }),
              h(BreadcrumbsSeparator),
              h(BreadcrumbsCollapsed),
              h(BreadcrumbsItem, { active: true }, { default: () => 'Current' }),
            ],
          }),
      },
      {
        id: 'long-trail',
        label: 'Long trail',
        render: () =>
          h(Breadcrumbs, {}, {
            default: () => [
              h(BreadcrumbsItem, {}, { default: () => 'Home' }),
              h(BreadcrumbsSeparator),
              h(BreadcrumbsCollapsed),
              h(BreadcrumbsSeparator),
              h(BreadcrumbsItem, { active: true }, { default: () => 'Detail' }),
            ],
          }),
      },
    ]
  },
  'capacitor-breadcrumbs-item': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'link',
        label: 'Link',
        render: () =>
          h(Breadcrumbs, {}, {
            default: () => [
              h(BreadcrumbsItem, {}, { default: () => 'Library' }),
              h(BreadcrumbsSeparator),
              h(BreadcrumbsItem, {}, { default: () => 'Data' }),
            ],
          }),
      },
      {
        id: 'active',
        label: 'Active',
        render: () =>
          h(Breadcrumbs, {}, {
            default: () => [
              h(BreadcrumbsItem, {}, { default: () => 'Library' }),
              h(BreadcrumbsSeparator),
              h(BreadcrumbsItem, { active: true }, { default: () => 'Active item' }),
            ],
          }),
      },
    ]
  },
  'capacitor-breadcrumbs-separator': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'between-items',
        label: 'Between items',
        render: () =>
          h(Breadcrumbs, {}, {
            default: () => [
              h(BreadcrumbsItem, {}, { default: () => 'Docs' }),
              h(BreadcrumbsSeparator),
              h(BreadcrumbsItem, { active: true }, { default: () => 'API' }),
            ],
          }),
      },
      {
        id: 'multi-separator',
        label: 'Multi separator',
        render: () =>
          h(Breadcrumbs, {}, {
            default: () => [
              h(BreadcrumbsItem, {}, { default: () => 'A' }),
              h(BreadcrumbsSeparator),
              h(BreadcrumbsItem, {}, { default: () => 'B' }),
              h(BreadcrumbsSeparator),
              h(BreadcrumbsItem, { active: true }, { default: () => 'C' }),
            ],
          }),
      },
    ]
  },
  'capacitor-datetime': () => [
    {
      id: 'closed',
      label: 'Closed',
      render: (c) => h(Datetime, { class: 'p-3 text-sm' }, { default: () => 'Nov 15, 2026' }),
    },
    {
      id: 'open',
      label: 'Open',
      render: (c) =>
        openOverlayPhoneStage(
          c,
          overlayScreenFiller(c, 'Schedule'),
          h(Picker, { class: 'p-4 text-sm' }, {
            default: () => ['Nov', '15', '2026'].map((label, i) => h('div', { key: i, class: 'block py-2 text-center font-medium' }, label)),
          }),
        ),
    },
  ],
  'capacitor-dialog-button': (ctx) => {
    const { h } = ctx
    const footerDialog = (buttons: VNode, title = 'Preview') =>
      h(
        Dialog,
        { opened: true, class: 'tc-demo-dialog-button-stage tc-demo-dialog-button-preview', translucent: false },
        {
          title: () => title,
          default: () => 'Dialog footer button styles.',
          buttons: () => buttons,
        },
      )
    return [
      {
        id: 'cancel-ok',
        label: 'Cancel + OK',
        render: () =>
          h('div', { class: 'tc-demo-dialog-button-preview w-full' }, [
            footerDialog(
              h('div', { class: 'flex w-full flex-row' }, [
                h(DialogButton, {}, { default: () => 'Cancel' }),
                h(DialogButton, { strong: true }, { default: () => 'OK' }),
              ]),
            ),
          ]),
      },
      {
        id: 'destructive',
        label: 'Destructive',
        render: () =>
          h('div', { class: 'tc-demo-dialog-button-preview w-full' }, [
            footerDialog(h(DialogButton, { class: 'text-red-500' }, { default: () => 'Delete' }), 'Delete item?'),
          ]),
      },
      {
        id: 'stacked',
        label: 'Stacked',
        render: () =>
          h('div', { class: 'tc-demo-dialog-button-preview w-full' }, [
            footerDialog(
              h('div', { class: 'flex w-full flex-col' }, [
                h(DialogButton, { strong: true }, { default: () => 'Confirm' }),
                h(DialogButton, {}, { default: () => 'Cancel' }),
              ]),
              'Confirm',
            ),
          ]),
      },
    ]
  },
  'capacitor-fab': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'closed',
        label: 'Closed',
        render: () =>
          h('div', { class: 'relative min-h-24' }, [
            h(Fab, { class: 'relative right-0 bottom-0 ml-auto', href: '#' }, { default: () => h('span', { class: 'text-2xl' }, '+') }),
          ]),
      },
      {
        id: 'list-open',
        label: 'List open',
        render: () =>
          h('div', { class: 'relative flex min-h-32 flex-col items-end gap-3 p-2' }, [
            h(Fab, { href: '#', class: 'relative' }, { default: () => h(Icon, { material: 'create', class: 'text-xl' }) }),
            h(Fab, { href: '#', class: 'relative' }, { default: () => h(Icon, { material: 'image', class: 'text-xl' }) }),
            h(Fab, { href: '#', class: 'relative' }, { default: () => h('span', { class: 'text-2xl' }, '×') }),
          ]),
      },
    ]
  },
  'capacitor-footer': (ctx) => {
    const { h } = ctx
    return [
      { id: 'plain-footer', label: 'Plain footer', render: () => h(Footer, {}, { default: () => h('p', { class: 'p-3 text-sm' }, 'Footer region') }) },
      {
        id: 'with-toolbar',
        label: 'With toolbar',
        render: () =>
          h(Footer, {}, {
            default: () =>
              h(Toolbar, {}, {
                default: () => h('div', { class: 'title text-sm' }, 'Footer toolbar'),
              }),
          }),
      },
    ]
  },
  'capacitor-header': (ctx) => {
    const { h } = ctx
    return [
      { id: 'plain-header', label: 'Plain header', render: () => h(Header, {}, { default: () => h('p', { class: 'p-3 text-sm' }, 'Header region') }) },
      {
        id: 'with-navbar',
        label: 'With navbar',
        render: () =>
          h(Header, {}, {
            default: () => h(Navbar, { title: 'Header title' }),
          }),
      },
    ]
  },
  'capacitor-icon': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'navigation',
        label: 'Navigation',
        render: (c) =>
          h('div', { class: 'flex flex-wrap gap-4 p-2' }, [
            demoIconVnode(c, 'home', { class: 'text-2xl', 'aria-label': 'Home' }),
            demoIconVnode(c, 'search', { class: 'text-2xl', 'aria-label': 'Search' }),
            demoIconVnode(c, 'settings', { class: 'text-2xl', 'aria-label': 'Settings' }),
          ]),
      },
      {
        id: 'large',
        label: 'Large',
        render: (c) => demoIconVnode(c, 'bolt', { class: 'text-4xl', 'aria-label': 'Bolt' }),
      },
    ]
  },
  'capacitor-infinite-scroll': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'idle',
        label: 'Idle',
        render: () => h(InfiniteScroll, { class: 'p-3 text-sm' }, { default: () => 'Load more when scrolled' }),
      },
      {
        id: 'loading',
        label: 'Loading',
        render: () =>
          h(List, {}, {
            default: () => [
              h(ListItem, { title: 'Item 1' }),
              h(ListItem, { title: 'Item 2' }),
              h(InfiniteScroll, { class: 'p-3 text-center text-sm' }, { default: () => 'Loading more…' }),
            ],
          }),
      },
    ]
  },
  'capacitor-item-sliding': (ctx) => {
    const { h } = ctx
    const row = (swiped: boolean) =>
      h(List, {}, {
        default: () =>
          h('div', { class: 'relative overflow-hidden' }, [
            h(
              'div',
              { class: 'absolute inset-y-0 right-0 flex w-16 items-center justify-center bg-red-500 text-white' },
              [h('span', { class: 'text-xs font-semibold' }, 'Del')],
            ),
            h(ItemSliding, {}, {
              default: () =>
                h(ListItem, {
                  title: 'Swipe row',
                  subtitle: swiped ? 'Actions revealed' : 'Swipe left',
                  link: true,
                  class: swiped ? '-translate-x-12 bg-white dark:bg-neutral-900 transition-transform' : 'bg-white dark:bg-neutral-900',
                }),
            }),
          ]),
      })
    return [
      { id: 'closed', label: 'Closed', render: () => row(false) },
      { id: 'swiped-open', label: 'Swiped open', render: () => row(true) },
    ]
  },
  'capacitor-link': (ctx) => {
    const { h } = ctx
    return [
      { id: 'text-link', label: 'Text link', render: () => h(Link, { href: '#' }, { default: () => 'Link' }) },
      { id: 'toolbar', label: 'Toolbar', render: () => h(Link, { toolbar: true, href: '#' }, { default: () => 'Save' }) },
    ]
  },
  'capacitor-list-button': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'single',
        label: 'Single',
        render: () => h(List, {}, { default: () => h(ListButton, {}, { default: () => 'Standalone list button' }) }),
      },
      {
        id: 'pair',
        label: 'Pair',
        render: () =>
          h(List, { inset: true }, {
            default: () => [h(ListButton, {}, { default: () => 'Sign in' }), h(ListButton, {}, { default: () => 'Register' })],
          }),
      },
    ]
  },
  'capacitor-list-group': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'grouped',
        label: 'Grouped',
        render: () =>
          h(List, {}, {
            default: () =>
              h(ListGroup, {}, {
                default: () => [h(ListItem, { title: 'Grouped' }), h(ListItem, { title: 'Items' })],
              }),
          }),
      },
      {
        id: 'nested',
        label: 'Nested',
        render: () =>
          h(List, { inset: true }, {
            default: () =>
              h(ListGroup, {}, {
                default: () => [
                  h(ListItem, { title: 'Primary', chevron: true }),
                  h(ListItem, { title: 'Secondary', subtitle: 'Subtitle' }),
                ],
              }),
          }),
      },
    ]
  },
  'capacitor-menu-list': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'basic',
        label: 'Basic',
        render: () =>
          h(MenuList, {}, {
            default: () => h(MenuListItem, { href: '#' }, { default: () => 'Menu item' }),
          }),
      },
      {
        id: 'with-icons',
        label: 'With icons',
        render: () =>
          h(MenuList, {}, {
            default: () => [
              h(
                MenuListItem,
                { href: '#' },
                {
                  media: () => demoIconVnode(ctx, 'edit', { class: 'text-xl' }),
                  default: () => 'Edit',
                },
              ),
              h(
                MenuListItem,
                { href: '#' },
                {
                  media: () => demoIconVnode(ctx, 'delete', { class: 'text-xl' }),
                  default: () => 'Delete',
                },
              ),
            ],
          }),
      },
    ]
  },
  'capacitor-menu-list-item': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'basic-item',
        label: 'Basic item',
        render: () =>
          h(MenuList, {}, {
            default: () => h(MenuListItem, { href: '#' }, { default: () => 'Dropdown menu item' }),
          }),
      },
      {
        id: 'selected',
        label: 'Selected',
        render: () =>
          h(MenuList, {}, {
            default: () => h(MenuListItem, { href: '#', class: 'font-semibold' }, { default: () => 'Active item' }),
          }),
      },
    ]
  },
  'capacitor-message': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'sent',
        label: 'Sent',
        render: () =>
          h(Messages, {}, {
            default: () => h(Message, { type: 'sent', text: 'Hello from the registry demo.', name: 'You' }),
          }),
      },
      {
        id: 'received',
        label: 'Received',
        render: () =>
          h(Messages, {}, {
            default: () => h(Message, { type: 'received', text: 'All components run in Vue.', name: 'Capgo' }),
          }),
      },
      {
        id: 'thread',
        label: 'Thread',
        render: () =>
          h(Messages, {}, {
            default: () => [
              h(MessagesTitle, { name: 'Capgo' }),
              h(Message, { type: 'sent', text: 'Ship to preview?', name: 'You' }),
              h(Message, { type: 'received', text: 'On it.', name: 'Capgo' }),
            ],
          }),
      },
    ]
  },
  'capacitor-messagebar': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'empty',
        label: 'Empty',
        render: () => h(Messagebar, { placeholder: 'Type a message', value: '' }),
      },
      {
        id: 'composing',
        label: 'Composing',
        render: () =>
          h('div', { class: 'tc-demo-messagebar-host space-y-2' }, [
            h('p', { class: 'text-xs opacity-70' }, 'Compose a reply'),
            h(Messagebar, { placeholder: 'Type a message', value: 'On my way' }),
          ]),
      },
    ]
  },
  'capacitor-messages': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'single',
        label: 'Single',
        render: () =>
          h(Messages, {}, {
            default: () => h(Message, { type: 'received', text: 'Messages container layout.', name: 'Capgo' }),
          }),
      },
      {
        id: 'pair',
        label: 'Pair',
        render: () =>
          h(Messages, {}, {
            default: () => [
              h(Message, { type: 'received', text: 'Preview ready.', name: 'Capgo' }),
              h(Message, { type: 'sent', text: 'Thanks!', name: 'You' }),
            ],
          }),
      },
    ]
  },
  'capacitor-messages-title': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'with-title',
        label: 'With title',
        render: () =>
          h(Messages, {}, {
            default: () => [
              h(MessagesTitle, { name: 'Martin' }),
              h(Message, { type: 'received', text: 'MessagesTitle labels the thread.', name: 'Martin' }),
            ],
          }),
      },
      {
        id: 'group-chat',
        label: 'Group chat',
        render: () =>
          h(Messages, {}, {
            default: () => [
              h(MessagesTitle, { name: 'Release crew' }),
              h(Message, { type: 'received', text: 'Build passed.', name: 'CI' }),
            ],
          }),
      },
    ]
  },
  'capacitor-modal': (ctx) => [
    ...overlayClosedOpen(ctx, 'Open modal', 'Editor', 'modalOpen', modalContentVNode, { closed: 'Closed', open: 'Open' }),
    {
      id: 'inline',
      label: 'Inline',
      render: (c) => modalContentVNode(c),
    },
  ],
  'capacitor-navbar': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'standard',
        label: 'Standard',
        render: () => h(Navbar, { title: 'Navbar', subtitle: 'Subtitle' }),
      },
      {
        id: 'large-title',
        label: 'Large title',
        render: () => h(Navbar, { title: 'Large title', large: true }),
      },
      {
        id: 'transparent',
        label: 'Transparent',
        render: () =>
          h('div', { class: 'tc-demo-navbar-transparent-stage min-h-36 w-full' }, [
            h(Navbar, { title: 'Transparent', transparent: true }),
            h('p', { class: 'px-4 py-6 text-sm text-white' }, 'Content scrolls under a transparent navbar.'),
          ]),
      },
      {
        id: 'with-back-link',
        label: 'With back link',
        render: () =>
          h(Navbar, { title: 'Details' }, {
            left: () => h(NavbarBackLink, { text: 'Back' }),
          }),
      },
    ]
  },
  'capacitor-navbar-back-link': (ctx) => {
    const { h } = ctx
    return [
      { id: 'with-text', label: 'With text', render: () => h(NavbarBackLink, { text: 'Back' }) },
      {
        id: 'in-navbar',
        label: 'In navbar',
        render: () =>
          h(Navbar, { title: 'Child' }, {
            left: () => h(NavbarBackLink, { text: 'Back' }),
          }),
      },
    ]
  },
  'capacitor-note': (ctx) => {
    const { h } = ctx
    return [
      { id: 'body-note', label: 'Body note', render: () => h(Note, {}, { default: () => 'Note block from registry' }) },
      {
        id: 'secondary',
        label: 'Secondary',
        render: () => h(Note, { class: 'text-sm opacity-80' }, { default: () => 'Secondary note with helper copy.' }),
      },
    ]
  },
  'capacitor-notification': (ctx) => [
    ...overlayClosedOpen(ctx, 'Show notification', 'Inbox', 'notificationOpen', (c) => notificationVNode(c, true), {
      closed: 'Closed',
      open: 'Open',
    }),
    {
      id: 'inline-open',
      label: 'Inline open',
      render: (c) => notificationVNode(c, true),
    },
  ],
  'capacitor-page': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'scroll-content',
        label: 'Scroll content',
        render: () =>
          h(Page, {}, {
            default: () =>
              h(Block, { strong: true, inset: true, class: 'm-0' }, {
                default: () => h('p', { class: 'p-3 text-sm' }, 'Page wraps the catalog scroll region.'),
              }),
          }),
      },
      {
        id: 'with-navbar',
        label: 'With navbar',
        render: () =>
          h(Page, {}, {
            default: () => [h(Navbar, { title: 'Page' }), h(Block, { class: 'p-4 text-sm' }, { default: () => 'Body content' })],
          }),
      },
    ]
  },
  'capacitor-picker': () => [
    {
      id: 'closed',
      label: 'Closed',
      render: (c) => h(Datetime, { class: 'p-3 text-sm' }, { default: () => 'Tap to pick' }),
    },
    {
      id: 'open',
      label: 'Open',
      render: (c) =>
        h(Picker, { class: 'p-4 text-sm' }, {
          default: () => ['Morning', 'Afternoon', 'Evening'].map((label, i) => h('div', { key: i, class: 'block py-2 text-center' }, label)),
        }),
    },
    {
      id: 'wheels',
      label: 'Wheels',
      render: (c) =>
        h(Picker, { class: 'p-4 text-sm grid grid-cols-3 gap-2 text-center' }, {
          default: () => ['Jan', '15', 'PM'].map((label, i) => h('div', { key: i, class: 'py-2 font-medium' }, label)),
        }),
    },
  ],
  'capacitor-preloader': (ctx) => {
    const { h } = ctx
    return [
      { id: 'spinner', label: 'Spinner', render: () => h(Preloader, { class: 'mx-auto' }) },
      {
        id: 'blue',
        label: 'Blue',
        render: () => h(Preloader, { class: 'mx-auto', colors: { text: 'text-blue-500' } }),
      },
      {
        id: 'large-green',
        label: 'Large green',
        render: () => h(Preloader, { class: 'mx-auto', size: 'w-12 h-12', colors: { text: 'text-emerald-500' } }),
      },
    ]
  },
  'capacitor-progressbar': (ctx) => {
    const { h } = ctx
    return [
      { id: 'low', label: 'Low', render: () => h(Progressbar, { progress: 25 }) },
      { id: 'high', label: 'High', render: () => h(Progressbar, { progress: 75 }) },
      {
        id: 'indeterminate',
        label: 'Indeterminate',
        render: () =>
          h('div', { class: 'space-y-1' }, [
            h(Progressbar, { progress: 0, class: 'overflow-hidden' }),
            h('p', { class: 'text-xs opacity-60 text-center' }, 'Indeterminate-style thin bar'),
          ]),
      },
    ]
  },
  'capacitor-range': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'single',
        label: 'Single',
        render: (c) =>
          h(Range, {
            value: c.rangeValue.value,
            onInput: (e: Event) => (c.rangeValue.value = Number((e.target as HTMLInputElement | null)?.value ?? 0)),
          }),
      },
      {
        id: 'dual',
        label: 'Dual',
        render: (c) =>
          h('div', { class: 'space-y-4' }, [
            h(Range, { value: 20, min: 0, max: 100 }),
            h(Range, { value: 80, min: 0, max: 100 }),
          ]),
      },
      {
        id: 'with-pins',
        label: 'With pins',
        render: () =>
          h('div', { class: 'space-y-2' }, [
            h(Range, { value: 50, min: 0, max: 100, step: 25 }),
            h('div', { class: 'flex justify-between text-xs opacity-60 px-1' }, [h('span', '0'), h('span', '25'), h('span', '50'), h('span', '75'), h('span', '100')]),
          ]),
      },
    ]
  },
  'capacitor-refresher': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'idle',
        label: 'Idle',
        render: () => h(Refresher, { class: 'p-3 text-center text-sm' }, { default: () => 'Pull to refresh' }),
      },
      {
        id: 'pulling',
        label: 'Pulling',
        render: () =>
          h('div', {}, [
            h(Refresher, { class: 'p-3 text-center text-sm font-medium' }, { default: () => 'Release to refresh' }),
            h(List, {}, { default: () => h(ListItem, { title: 'Feed item' }) }),
          ]),
      },
    ]
  },
  'capacitor-reorder': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'two-rows',
        label: 'Two rows',
        render: () =>
          h(List, {}, {
            default: () =>
              h(Reorder, {}, {
                default: () => [h(ListItem, { title: 'First' }), h(ListItem, { title: 'Second' })],
              }),
          }),
      },
      {
        id: 'three-rows',
        label: 'Three rows',
        render: () =>
          h(List, { inset: true }, {
            default: () =>
              h(Reorder, {}, {
                default: () => [
                  h(ListItem, { title: 'Channels' }),
                  h(ListItem, { title: 'Devices' }),
                  h(ListItem, { title: 'Plugins' }),
                ],
              }),
          }),
      },
    ]
  },
  'capacitor-select': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'closed',
        label: 'Closed',
        render: () =>
          h(Select, { label: 'Fruit', 'aria-label': 'Fruit' }, {
            default: () => [h('option', { value: 'apple' }, 'Apple'), h('option', { value: 'pear' }, 'Pear')],
          }),
      },
      {
        id: 'open',
        label: 'Open',
        render: () =>
          h(List, { strong: true, inset: true, class: '!my-0' }, {
            default: () => [
              h(ListInput, { type: 'select', label: 'Fruit', value: 'apple' }),
              h('div', { class: 'border-t' }, [h(ListItem, { title: 'Apple', active: true }), h(ListItem, { title: 'Pear' }), h(ListItem, { title: 'Grape' })]),
            ],
          }),
      },
    ]
  },
  'capacitor-skeleton': (ctx) => {
    const { h } = ctx
    return [
      { id: 'line', label: 'Line', render: () => h(Skeleton, { class: 'h-10 w-full rounded-lg' }) },
      {
        id: 'avatar-row',
        label: 'Avatar row',
        render: () =>
          h('div', { class: 'flex items-center gap-3' }, [
            h(Skeleton, { class: 'size-12 rounded-full' }),
            h('div', { class: 'flex-1 space-y-2' }, [h(Skeleton, { class: 'h-3 w-3/4 rounded' }), h(Skeleton, { class: 'h-3 w-1/2 rounded' })]),
          ]),
      },
    ]
  },
  'capacitor-split-pane': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'two-pane',
        label: 'Two pane',
        render: () =>
          h(SplitPane, { class: 'min-h-24 grid grid-cols-2 gap-2 p-2 text-sm' }, { default: () => [h('div', 'Left pane'), h('div', 'Right pane')] }),
      },
      {
        id: 'master-detail',
        label: 'Master detail',
        render: () =>
          h(SplitPane, { class: 'min-h-28 grid grid-cols-[1fr_2fr] gap-2 p-2 text-sm' }, {
            default: () => [h(List, { class: 'text-xs' }, { default: () => h(ListItem, { title: 'Inbox' }) }), h('div', { class: 'p-2' }, 'Message body')],
          }),
      },
    ]
  },
  'capacitor-stepper': (ctx) => {
    const { h } = ctx
    const stepper = (preset: number) => (c: GalleryContext) => {
      c.stepperValue.value = preset
      return h(Stepper, {
        value: c.stepperValue.value,
        onInput: (event: Event) => {
          const target = event.target
          if (target instanceof HTMLInputElement) c.stepperValue.value = Number(target.value) || 0
        },
        onPlus: () => {
          c.stepperValue.value += 1
        },
        onMinus: () => {
          c.stepperValue.value = Math.max(0, c.stepperValue.value - 1)
        },
      })
    }
    return [
      { id: 'min', label: 'Min', render: stepper(0) },
      { id: 'max', label: 'Max', render: stepper(10) },
      { id: 'disabled', label: 'Disabled', render: () => h(Stepper, { value: 2, inputDisabled: true }) },
    ]
  },
  'capacitor-tabbar': (ctx) => {
    const { h } = ctx
    const tabbar =
      (tabs: Array<{ id: string; label: string; icon: Parameters<typeof demoIconVnode>[1] }>) =>
      (c: GalleryContext) =>
        h(Tabbar, { labels: true }, {
          default: () =>
            tabs.map((tab) =>
              h(
                TabbarLink,
                {
                  active: c.tabbarDemoActive.value === tab.id,
                  label: tab.label,
                  onClick: () => {
                    c.tabbarDemoActive.value = tab.id
                  },
                },
                { icon: () => demoIconVnode(c, tab.icon, { class: 'text-xl' }) },
              ),
            ),
        })
    return [
      {
        id: 'two-tabs',
        label: 'Two tabs',
        render: (c) => {
          c.tabbarDemoActive.value = 'home'
          return tabbar([
            { id: 'home', label: 'Home', icon: 'home' },
            { id: 'search', label: 'Search', icon: 'search' },
          ])(c)
        },
      },
      {
        id: 'three-tabs',
        label: 'Three tabs',
        render: (c) => {
          c.tabbarDemoActive.value = 'today'
          return tabbar([
            { id: 'today', label: 'Today', icon: 'today' },
            { id: 'calendar', label: 'Calendar', icon: 'calendar_month' },
            { id: 'profile', label: 'Profile', icon: 'person' },
          ])(c)
        },
      },
    ]
  },
  'capacitor-tabbar-link': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'inactive',
        label: 'Inactive',
        render: () =>
          h(Tabbar, { labels: true }, {
            default: () =>
              h(TabbarLink, { label: 'Browse' }, { icon: () => h(Icon, { material: 'explore', class: 'text-xl' }) }),
          }),
      },
      {
        id: 'active',
        label: 'Active',
        render: () =>
          h(Tabbar, { labels: true }, {
            default: () =>
              h(TabbarLink, { active: true, label: 'Today' }, { icon: () => h(Icon, { material: 'today', class: 'text-xl' }) }),
          }),
      },
      {
        id: 'badge',
        label: 'Badge',
        render: () =>
          h('div', { class: 'px-2 pb-8 pt-3' }, [
            h(Tabbar, { labels: true }, {
              default: () =>
                h(TabbarLink, { active: true, label: 'Inbox' }, {
                  icon: () =>
                    h('span', { class: 'relative inline-flex overflow-visible p-1' }, [
                      h(Icon, { material: 'mail', class: 'text-xl', 'aria-hidden': 'true' }),
                      h(
                        Badge,
                        { class: 'tc-demo-badge-count absolute -right-1 -top-1 min-h-5 min-w-5 px-1 text-[11px] leading-5' },
                        { default: () => '3' },
                      ),
                    ]),
                }),
            }),
          ]),
      },
    ]
  },
  'capacitor-table': () => [
    { id: 'sample', label: 'Sample', render: (c) => demoTableSample(c) },
    { id: 'compact', label: 'Compact', render: (c) => demoTableBodyRow(c, 'Compact row') },
  ],
  'capacitor-table-body': () => [
    { id: 'single-row', label: 'Single row', render: (c) => demoTableBodyRow(c, 'Body row') },
    { id: 'two-rows', label: 'Two rows', render: (c) => demoTableBodyCells(c, 'A', 'B') },
  ],
  'capacitor-table-cell': () => [
    { id: 'body-cell', label: 'Body cell', render: (c) => demoTableBodyCells(c, 'Cell A', 'Cell B') },
    { id: 'header-cell', label: 'Header cell', render: (c) => demoTableHeaderCell(c, 'Header') },
  ],
  'capacitor-table-head': () => [
    { id: 'header', label: 'Header', render: (c) => demoTableHeaderCell(c, 'Header') },
    { id: 'multi-column', label: 'Multi column', render: (c) => demoTableSample(c) },
  ],
  'capacitor-table-row': () => [
    { id: 'single', label: 'Single', render: (c) => demoTableBodyRow(c, 'Single row') },
    { id: 'values', label: 'Values', render: (c) => demoTableBodyCells(c, '42', '99') },
  ],
  'capacitor-thumbnail': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'standalone',
        label: 'Standalone',
        render: () =>
          h('div', { class: 'flex items-center gap-3' }, [
            h(Thumbnail, { class: 'size-16 rounded-lg bg-neutral-200 dark:bg-neutral-700' }),
            h('p', { class: 'text-sm' }, 'List row media'),
          ]),
      },
      {
        id: 'in-list',
        label: 'In list',
        render: () =>
          h(List, { inset: true }, {
            default: () =>
              h(
                ListItem,
                { title: 'Thumbnail row' },
                { media: () => h(Thumbnail, { class: 'size-10 rounded-lg bg-neutral-200 dark:bg-neutral-700' }) },
              ),
          }),
      },
    ]
  },
  'capacitor-toolbar': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'top',
        label: 'Top',
        render: () =>
          h(Toolbar, { top: true }, {
            default: () => [
              h('div', { class: 'left' }, [h(Link, { toolbar: true, href: '#' }, { default: () => 'Cancel' })]),
              h('div', { class: 'title' }, 'Edit item'),
              h('div', { class: 'right' }, [h(Link, { toolbar: true, href: '#' }, { default: () => 'Save' })]),
            ],
          }),
      },
      {
        id: 'actions',
        label: 'Actions',
        render: () =>
          h(Toolbar, {}, {
            default: () => [
              h('div', { class: 'left text-sm opacity-70' }, 'Toolbar'),
              h('div', { class: 'right flex gap-3' }, [
                h(Link, { toolbar: true, href: '#' }, { default: () => 'Save' }),
                h(Link, { toolbar: true, href: '#' }, { default: () => 'More' }),
              ]),
            ],
          }),
      },
    ]
  },
  'capacitor-touch-ripple': (ctx) => {
    const { h } = ctx
    return [
      {
        id: 'on-button',
        label: 'On button',
        render: () => h(TouchRipple, { class: 'inline-flex' }, { default: () => h(Button, {}, { default: () => 'Ripple target' }) }),
      },
      {
        id: 'on-card',
        label: 'On card',
        render: () =>
          h(TouchRipple, { class: 'block' }, {
            default: () => h(Card, {}, { default: () => h('div', { class: 'p-4 text-sm' }, 'Tap card') }),
          }),
      },
    ]
  },
}

export function demoComponentStateRegistry(slug: string): ((ctx: GalleryContext) => SlugStateDef[]) | null {
  if (EXPANDED_IN_GALLERY.has(slug)) return null
  const builder = REGISTRY_BUILDERS[slug]
  return builder ? (ctx) => builder(ctx) : null
}