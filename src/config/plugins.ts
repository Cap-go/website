import {
  ArchiveBoxArrowDownIcon,
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  Bars3Icon,
  BoltIcon,
  CameraIcon,
  ChatBubbleLeftIcon,
  CircleStackIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  FingerPrintIcon,
  GlobeAltIcon,
  HomeIcon,
  MapPinIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  VideoCameraIcon,
} from '@heroicons/vue/20/solid'

export interface Action {
  icon?: any
  href: string
  title: string
  name?: string
  author: string
  description: string
  iconForeground?: string
  iconBackground?: string
}

export interface Plugin extends Action {
  npmDownloads?: number
  githubStars?: number
  readme?: string
  datePublished?: string
  dateModified?: string
  tutorial?: string
  locale?: string
}

export const actions = [
  {
    name: '@capgo/native-market',
    author: 'github.com/riderx',
    description: 'A native market plugin for linking to google play or app store.',
    href: 'https://github.com/riderx/native-market/',
    title: 'Native Market',
    icon: ArchiveBoxArrowDownIcon,
  },
  {
    name: '@capgo/capacitor-native-biometric',
    author: 'github.com/riderx',
    description: 'This plugin gives access to the native biometric apis for android and iOS',
    href: 'https://github.com/Cap-go/capacitor-native-biometric/',
    title: 'Native Biometric',
    icon: FingerPrintIcon,
  },
  {
    name: '@capgo/camera-preview',
    author: 'github.com/riderx',
    description: 'Camera preview',
    href: 'https://github.com/Cap-go/camera-preview/',
    title: 'Camera Preview',
    icon: CameraIcon,
  },
  {
    name: '@capgo/capacitor-updater',
    author: 'github.com/riderx',
    description: 'Live update for capacitor apps',
    href: 'https://github.com/Cap-go/capacitor-updater/',
    title: 'Updater',
    icon: ArrowPathIcon,
  },
  {
    name: '@capgo/capacitor-uploader',
    author: 'github.com/riderx',
    description: 'Background Uploader for capacitor apps',
    href: 'https://github.com/Cap-go/capacitor-uploader/',
    title: 'Uploader',
    icon: ArrowUpOnSquareIcon,
  },
  {
    name: '@revenuecat/purchases-capacitor',
    author: 'github.com/riderx',
    description: 'In-app Subscriptions Made Easy with RevenueCat sdk',
    href: 'https://github.com/RevenueCat/purchases-capacitor/',
    title: 'Purchases',
    icon: CurrencyDollarIcon,
  },
  {
    name: '@capgo/capacitor-flash',
    author: 'github.com/riderx',
    description: 'Switch the Flashlight / Torch of your device.',
    href: 'https://github.com/riderx/capacitor-flash/',
    title: 'Flash',
    icon: BoltIcon,
  },
  {
    name: '@capgo/capacitor-screen-recorder',
    author: 'github.com/riderx',
    // prettier-ignore
    description: 'Record device\'s screen',
    href: 'https://github.com/riderx/capacitor-screen-recorder/',
    title: 'Screen Recorder',
    icon: VideoCameraIcon,
  },
  {
    name: '@capgo/capacitor-crisp',
    author: 'github.com/riderx',
    description: 'Crisp native SDK for capacitor',
    href: 'https://github.com/Cap-go/capacitor-crisp/',
    title: 'Crisp',
    icon: ChatBubbleLeftIcon,
  },
  {
    name: '@capgo/nativegeocoder',
    author: 'github.com/riderx',
    description: 'Capacitor plugin for native forward and reverse geocoding',
    href: 'https://github.com/Cap-go/capacitor-nativegeocoder/',
    title: 'Native Geocoder',
    icon: MapPinIcon,
  },
  {
    name: '@capgo/inappbrowser',
    author: 'github.com/riderx',
    description: 'Capacitor plugin in app browser',
    href: 'https://github.com/Cap-go/capacitor-inappbrowser/',
    title: 'In App Browser',
    icon: GlobeAltIcon,
  },
  {
    name: '@capgo/capacitor-mute',
    author: 'github.com/riderx',
    description: 'Detect if the mute switch is enabled/disabled on a device',
    href: 'https://github.com/riderx/capacitor-mute/',
    title: 'Mute',
    icon: SpeakerXMarkIcon,
  },
  {
    name: '@capgo/native-audio',
    author: 'github.com/riderx',
    description: 'A native plugin for native audio engine',
    href: 'https://github.com/Cap-go/native-audio/',
    title: 'Native Audio',
    icon: SpeakerWaveIcon,
  },
  {
    name: '@capgo/capacitor-shake',
    author: 'github.com/riderx',
    description: 'Detect shake gesture in device',
    href: 'https://github.com/Cap-go/capacitor-shake/',
    title: 'Shake',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: '@capgo/capacitor-navigation-bar',
    author: 'github.com/riderx',
    description: 'Set navigation bar color for android lolipop and higher',
    href: 'https://github.com/Cap-go/capacitor-navigation-bar/',
    title: 'Navigation Bar',
    icon: Bars3Icon,
  },
  {
    name: '@capgo/ivs-player',
    author: 'github.com/riderx',
    description: 'Ivs player for capacitor app',
    href: 'https://github.com/Cap-go/ivs-player/',
    title: 'IVS Player',
    icon: PlayCircleIcon,
  },
  {
    name: '@capgo/home-indicator',
    author: 'github.com/riderx',
    description: 'hide and show home button indicator in Capacitor app',
    href: 'https://github.com/Cap-go/home-indicator/',
    title: 'Indicator',
    icon: HomeIcon,
  },
  {
    name: '@capgo/native-purchases',
    author: 'github.com/riderx',
    description: 'In-app Subscriptions Made Easy',
    href: 'https://github.com/Cap-go/native-purchases/',
    title: 'Native Purchases',
    icon: CurrencyDollarIcon,
  },
  {
    name: '@capgo/capacitor-data-storage-sqlite',
    author: 'github.com/riderx',
    description: 'Capacitor SQLite Storage',
    href: 'https://github.com/Cap-go/capacitor-data-storage-sqlite/',
    title: 'Data Storage',
    icon: CircleStackIcon,
  },
]
