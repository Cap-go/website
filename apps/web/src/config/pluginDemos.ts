export interface PluginDemoItem {
  title: string
  alt: string
  src: string
  aspect: 'phone' | 'wide'
}

export interface PluginDemoGroup {
  description: string
  sourceHref: string
  items: PluginDemoItem[]
}

const demoBase = '/plugins/demo'

const sheetUsecases = [
  ['Long Sheet', 'long-sheet'],
  ['Sheet with Detent', 'sheet-with-detent'],
  ['Sidebar', 'sidebar'],
  ['Bottom Sheet', 'bottom-sheet'],
  ['Sheet with Keyboard', 'sheet-with-keyboard'],
  ['Toast', 'toast'],
  ['Detached Sheet', 'detached-sheet'],
  ['Page from Bottom', 'page-from-bottom'],
  ['Top Sheet', 'top-sheet'],
  ['Sheet with Stacking', 'sheet-with-stacking'],
  ['Sheet with Depth', 'sheet-with-depth'],
  ['Parallax Page', 'parallax-page'],
  ['Page', 'page'],
  ['Lightbox', 'lightbox'],
  ['Persistent Sheet with Detent', 'persistent-sheet-with-detent'],
  ['Card', 'card'],
] as const

export const pluginDemosBySlug: Record<string, PluginDemoGroup> = {
  'capacitor-native-navigation': {
    description: 'Native navigation chrome, tab selection, SVG icons, and styling options rendered as animated WebP demos.',
    sourceHref: 'https://github.com/Cap-go/capacitor-native-navigation/tree/main/docs',
    items: [
      {
        title: 'Native shell',
        alt: 'Animated native navigation shell demo showing native navbar, tabs, and WebView content',
        src: `${demoBase}/capacitor-native-navigation/demo.webp`,
        aspect: 'phone',
      },
      {
        title: 'Tap flow',
        alt: 'Animated native navigation tap flow showing tab selection, push transition, and native back',
        src: `${demoBase}/capacitor-native-navigation/demo-navigation.webp`,
        aspect: 'phone',
      },
      {
        title: 'SVG icons',
        alt: 'Animated native SVG icon demo showing inline SVG icons, native tint, labels, and tab selection',
        src: `${demoBase}/capacitor-native-navigation/demo-svg-icons.webp`,
        aspect: 'phone',
      },
      {
        title: 'Styling options',
        alt: 'Animated native navigation options demo showing dynamic colors, selected labels, badges, and zoom transitions',
        src: `${demoBase}/capacitor-native-navigation/demo-options.webp`,
        aspect: 'phone',
      },
    ],
  },
  'capacitor-transitions': {
    description: 'A React router flow showing iOS-style Capacitor page transitions as an animated WebP demo.',
    sourceHref: 'https://github.com/Cap-go/capacitor-transitions/tree/main/docs',
    items: [
      {
        title: 'React transition flow',
        alt: 'Animated React page transition demo showing forward and back navigation in a Capacitor-style shell',
        src: `${demoBase}/capacitor-transitions/react-transition-demo.webp`,
        aspect: 'phone',
      },
    ],
  },
  'capacitor-sheets': {
    description: 'Every supported sheet use case ships as an animated WebP demo, covering detents, drawers, pages, stacks, depth, and lightboxes.',
    sourceHref: 'https://github.com/Cap-go/capacitor-sheets/tree/main/docs/demos',
    items: sheetUsecases.map(([title, slug]) => ({
      title,
      alt: `Animated ${title} demo for @capgo/capacitor-sheets`,
      src: `${demoBase}/capacitor-sheets/${slug}.webp`,
      aspect: 'phone',
    })),
  },
  'capacitor-calendar': {
    description: 'Native calendar event creation on iOS and Android, exported as animated WebP demos.',
    sourceHref: 'https://github.com/Cap-go/capacitor-calendar/tree/main/assets/demo',
    items: [
      {
        title: 'iOS event creation',
        alt: 'iOS demo of native calendar event creation',
        src: `${demoBase}/capacitor-calendar/ios-demo.webp`,
        aspect: 'phone',
      },
      {
        title: 'Android event creation',
        alt: 'Android demo of native calendar event creation',
        src: `${demoBase}/capacitor-calendar/android-demo.webp`,
        aspect: 'phone',
      },
    ],
  },
  'capacitor-pretty-toast': {
    description: 'Native and centered toast notification flows converted from the plugin video capture into an animated WebP demo.',
    sourceHref: 'https://github.com/Cap-go/capacitor-pretty-toast/tree/main/media',
    items: [
      {
        title: 'Toast notification flow',
        alt: 'Animated Pretty Toast demo on an external device',
        src: `${demoBase}/capacitor-pretty-toast/demo-pretty-toast.webp`,
        aspect: 'phone',
      },
    ],
  },
  'capacitor-widget-kit': {
    description: 'WidgetKit and Live Activity template controls shown as an animated WebP demo.',
    sourceHref: 'https://github.com/Cap-go/capacitor-widget-kit/tree/main/docs',
    items: [
      {
        title: 'Widget template flow',
        alt: 'Animated WidgetKit demo showing template widget state and controls driven from Capacitor',
        src: `${demoBase}/capacitor-widget-kit/demo.webp`,
        aspect: 'phone',
      },
    ],
  },
}
