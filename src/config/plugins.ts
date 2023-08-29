import {
  ArchiveBoxArrowDownIcon,
  ArrowPathIcon,
  Bars3Icon,
  BoltIcon,
  CameraIcon,
  ChatBubbleLeftIcon,
  CommandLineIcon,
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
}

export const actions = [
  {
    name: '@capgo/cli',
    author: 'github.com/riderx',
    description: 'A CLI to upload to capgo servers',
    href: 'https://github.com/Cap-go/capgo-cli',
    title: 'CLI',
    icon: CommandLineIcon,
  },
  // {
  //   name: '@capgo/standard-version',
  //   author: 'Martin Donadieu',
  //   description: 'replacement for `npm version` with automatic CHANGELOG generation',
  //   href: 'https://github.com/Cap-go/standard-version',
  //   title: 'Standard Version',
  //   icon: AdjustmentsHorizontalIcon,
  // },
  {
    name: '@capgo/native-market',
    author: 'Martin Donadieu',
    description: 'A native market plugin for linking to google play or app store.',
    href: 'https://github.com/riderx/native-market',
    title: 'Native Market',
    icon: ArchiveBoxArrowDownIcon,
  },
  {
    name: '@capgo/capacitor-native-biometric',
    author: 'Jose Martinez',
    description: 'This plugin gives access to the native biometric apis for android and iOS',
    href: 'https://github.com/Cap-go/capacitor-native-biometric',
    title: 'Native Biometric',
    icon: FingerPrintIcon,
  },
  {
    name: '@capgo/camera-preview',
    author: 'Martin Donadieu',
    description: 'Camera preview',
    href: 'https://github.com/Cap-go/camera-preview',
    title: 'Camera Preview',
    icon: CameraIcon,
  },
  // {
  //   name: '@capgo/google-play-scraper',
  //   author: 'Facundo Olano',
  //   description: 'scrapes app data from google play store',
  //   href: 'https://github.com/facundoolano/google-play-scraper',
  //   title: 'Google Play Scraper',
  //   icon: PlayIcon,
  // },
  // {
  //   name: '@capgo/ngx-intl-tel-input-app',
  //   author: 'Unknown',
  //   description: '[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)',
  //   href: 'N/A',
  //   title: 'International Telephone Input',
  //   icon: PhoneIcon,
  // },
  // {
  //   name: '@capgo/konsta',
  //   author: 'Vladimir Kharlampidi',
  //   description: 'Mobile UI components made with Tailwind CSS',
  //   href: 'https://github.com/konstaui/konsta',
  //   title: 'Konsta',
  //   icon: PaintBrushIcon,
  // },
  {
    name: '@capgo/capacitor-updater',
    author: 'Martin Donadieu',
    description: 'Live update for capacitor apps',
    href: 'https://github.com/Cap-go/capacitor-updater',
    title: 'Updater',
    icon: ArrowPathIcon,
  },
  {
    name: '@capgo/capacitor-purchases',
    author: 'Martin Donadieu',
    description: 'In-app Subscriptions Made Easy with RevenueCat sdk',
    href: 'https://github.com/Cap-go/capacitor-purchases',
    title: 'Purchases',
    icon: CurrencyDollarIcon,
  },
  {
    name: '@capgo/capacitor-flash',
    author: 'Martin Donadieu',
    description: 'Switch the Flashlight / Torch of your device.',
    href: 'https://github.com/riderx/capacitor-flash',
    title: 'Flash',
    icon: BoltIcon,
  },
  {
    name: '@capgo/capacitor-screen-recorder',
    author: 'Martin Donadieu',
    // prettier-ignore
    description: 'Record device\'s screen',
    href: 'https://github.com/riderx/capacitor-screen-recorder',
    title: 'Screen Recorder',
    icon: VideoCameraIcon,
  },
  {
    name: '@capgo/capacitor-crisp',
    author: 'Martin Donadieu',
    description: 'Crisp native SDK for capacitor',
    href: 'https://github.com/Cap-go/capacitor-crisp',
    title: 'Crisp',
    icon: ChatBubbleLeftIcon,
  },
  {
    name: '@capgo/nativegeocoder',
    author: 'Martin Donadieu',
    description: 'Capacitor plugin for native forward and reverse geocoding',
    href: 'https://github.com/Cap-go/capacitor-nativegeocoder',
    title: 'Native Geocoder',
    icon: MapPinIcon,
  },
  {
    name: '@capgo/inappbrowser',
    author: 'Martin Donadieu',
    description: 'Capacitor plugin in app browser',
    href: 'https://github.com/Cap-go/capacitor-inappbrowser',
    title: 'In App Browser',
    icon: GlobeAltIcon,
  },
  {
    name: '@capgo/capacitor-mute',
    author: 'Martin donadieu',
    description: 'Detect if the mute switch is enabled/disabled on a device',
    href: 'https://github.com/riderx/capacitor-mute',
    title: 'Mute',
    icon: SpeakerXMarkIcon,
  },
  // {
  //   name: '@capgo/angular-ng-stepper',
  //   author: 'Giorgi Merabishvili',
  //   description: 'Angular stepper',
  //   href: 'https://github.com/gmerabishvili/angular-ng-stepper',
  //   title: 'Stepper',
  //   icon: EllipsisHorizontalIcon,
  // },
  {
    name: '@capgo/native-audio',
    author: 'Martin Donadieu',
    description: 'A native plugin for native audio engine',
    href: 'https://github.com/Cap-go/native-audio',
    title: 'Native Audio',
    icon: SpeakerWaveIcon,
  },
  {
    name: '@capgo/capacitor-shake',
    author: 'Martin Donadieu',
    description: 'Detect shake gesture in device',
    href: 'https://github.com/Cap-go/capacitor-shake',
    title: 'Shake',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: '@capgo/capacitor-navigation-bar',
    author: 'Martin Donadieu',
    description: 'Set navigation bar color for android lolipop and higher',
    href: 'https://github.com/Cap-go/capacitor-navigation-bar',
    title: 'Navigation Bar',
    icon: Bars3Icon,
  },
  {
    name: '@capgo/ivs-player',
    author: 'Martin Donadieu',
    description: 'Ivs player for capacitor app',
    href: 'https://github.com/Cap-go/ivs-player',
    title: 'IVS Player',
    icon: PlayCircleIcon,
  },
  {
    name: '@capgo/home-indicator',
    author: 'Martin Donadieu',
    description: 'hide and show home button indicator in Capacitor app',
    href: 'https://github.com/Cap-go/home-indicator',
    title: 'Indicator',
    icon: HomeIcon,
  },
  // {
  //   name: '@capgo/find-package-manager',
  //   author: 'github.com/riderx',
  //   description: 'Live update for capacitor apps',
  //   href: 'https://github.com/Cap-go/find-package-manager',
  //   title: 'Package Manager',
  //   icon: DocumentMagnifyingGlassIcon,
  // },
  {
    name: '@capgo/native-purchases',
    author: 'Martin donadieu',
    description: 'In-app Subscriptions Made Easy',
    href: 'https://github.com/Cap-go/native-purchases',
    title: 'Native Purchases',
    icon: CurrencyDollarIcon,
  },
  // {
  //   name: '@capgo/capacitor-fingerprint',
  //   author: 'Martin Donadieu',
  //   description: 'Capacitor client for Fingerprint PRO. 100% accurate device identification for fraud detection.',
  //   href: 'https://github.com/Cap-go/capacitor-fingerprint',
  //   title: 'Fingerprint',
  //   icon: FingerPrintIcon,
  // },
  // {
  //   name: '@capgo/capacitor-callkit-voip',
  //   author: 'Martin Donadieu',
  //   description: 'Provide PushKit functionality to ionic capacitor',
  //   href: 'https://github.com/Cap-go/capacitor-callkit-voip',
  //   title: 'CallKit VOIP',
  //   icon: PhoneArrowUpRightIcon,
  // },
  // {
  //   name: '@capgo/walletconnect',
  //   author: 'Martin Donadieu',
  //   description: 'WIP: Capacitor plugin for WalletConnect',
  //   href: 'N/A',
  //   title: 'WalletConnect',
  //   icon: WalletIcon,
  // },
]
