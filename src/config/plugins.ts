import ArchiveBoxArrowDownIcon from 'astro-heroicons/mini/ArchiveBoxArrowDown.astro'
import ArrowPathIcon from 'astro-heroicons/mini/ArrowPath.astro'
import ArrowUpOnSquareIcon from 'astro-heroicons/mini/ArrowUpOnSquare.astro'
import Bars3Icon from 'astro-heroicons/mini/Bars3.astro'
import BellIcon from 'astro-heroicons/mini/Bell.astro'
import BoltIcon from 'astro-heroicons/mini/Bolt.astro'
import CameraIcon from 'astro-heroicons/mini/Camera.astro'
import ChartBarIcon from 'astro-heroicons/mini/ChartBar.astro'
import ChatBubbleLeftIcon from 'astro-heroicons/mini/ChatBubbleLeft.astro'
import CircleStackIcon from 'astro-heroicons/mini/CircleStack.astro'
import CloudArrowDownIcon from 'astro-heroicons/mini/CloudArrowDown.astro'
import CogIcon from 'astro-heroicons/mini/Cog.astro'
import CpuChipIcon from 'astro-heroicons/mini/CpuChip.astro'
import CreditCardIcon from 'astro-heroicons/mini/CreditCard.astro'
import CurrencyDollarIcon from 'astro-heroicons/mini/CurrencyDollar.astro'
import DevicePhoneMobileIcon from 'astro-heroicons/mini/DevicePhoneMobile.astro'
import DocumentIcon from 'astro-heroicons/mini/Document.astro'
import DocumentTextIcon from 'astro-heroicons/mini/DocumentText.astro'
import FingerPrintIcon from 'astro-heroicons/mini/FingerPrint.astro'
import GlobeAltIcon from 'astro-heroicons/mini/GlobeAlt.astro'
import HeartIcon from 'astro-heroicons/mini/Heart.astro'
import HomeIcon from 'astro-heroicons/mini/Home.astro'
import KeyIcon from 'astro-heroicons/mini/Key.astro'
import MapIcon from 'astro-heroicons/mini/Map.astro'
import MapPinIcon from 'astro-heroicons/mini/MapPin.astro'
import MegaphoneIcon from 'astro-heroicons/mini/Megaphone.astro'
import PhoneIcon from 'astro-heroicons/mini/Phone.astro'
import PhotoIcon from 'astro-heroicons/mini/Photo.astro'
import PlayCircleIcon from 'astro-heroicons/mini/PlayCircle.astro'
import RocketLaunchIcon from 'astro-heroicons/mini/RocketLaunch.astro'
import ShieldCheckIcon from 'astro-heroicons/mini/ShieldCheck.astro'
import SignalIcon from 'astro-heroicons/mini/Signal.astro'
import SpeakerWaveIcon from 'astro-heroicons/mini/SpeakerWave.astro'
import SpeakerXMarkIcon from 'astro-heroicons/mini/SpeakerXMark.astro'
import UserCircleIcon from 'astro-heroicons/mini/UserCircle.astro'
import VideoCameraIcon from 'astro-heroicons/mini/VideoCamera.astro'
import WrenchIcon from 'astro-heroicons/mini/Wrench.astro'

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
    href: 'https://github.com/riderx/capacitor-native-market/',
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
    href: 'https://github.com/Cap-go/capacitor-camera-preview/',
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
    description: "Record device's screen",
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
    href: 'https://github.com/Cap-go/capacitor-native-audio/',
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
    href: 'https://github.com/Cap-go/capacitor-ivs-player/',
    title: 'IVS Player',
    icon: PlayCircleIcon,
  },
  {
    name: '@capgo/home-indicator',
    author: 'github.com/riderx',
    description: 'hide and show home button indicator in Capacitor app',
    href: 'https://github.com/Cap-go/capacitor-home-indicator/',
    title: 'Indicator',
    icon: HomeIcon,
  },
  {
    name: '@capgo/native-purchases',
    author: 'github.com/riderx',
    description: 'In-app Subscriptions Made Easy',
    href: 'https://github.com/Cap-go/capacitor-native-purchases/',
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
  // add https://github.com/Cap-go/capacitor-android-usagestatsmanager
  {
    name: '@capgo/capacitor-android-usagestatsmanager',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for android usage stats manager',
    href: 'https://github.com/Cap-go/capacitor-android-usagestatsmanager/',
    title: 'Usage Stats Manager',
    icon: ChartBarIcon,
  },
  // add https://github.com/Cap-go/capacitor-streamcall
  {
    name: '@capgo/capacitor-streamcall',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for streamcall',
    href: 'https://github.com/Cap-go/capacitor-streamcall/',
    title: 'Streamcall',
    icon: VideoCameraIcon,
  },
  // @capgo/capacitor-autofill-save-password
  {
    name: '@capgo/capacitor-autofill-save-password',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for save password in autofill of the device',
    href: 'https://github.com/Cap-go/capacitor-autofill-save-password/',
    title: 'Autofill Save Password',
    icon: UserCircleIcon,
  },
  // add https://github.com/Cap-go/capacitor-social-login
  {
    name: '@capgo/capacitor-social-login',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for social login',
    href: 'https://github.com/Cap-go/capacitor-social-login/',
    title: 'Social Login',
    icon: UserCircleIcon,
  },
  // add https://github.com/Cap-go/capacitor-jw-player
  {
    name: '@capgo/capacitor-jw-player',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for jw player',
    href: 'https://github.com/Cap-go/capacitor-jw-player/',
    title: 'JW Player',
    icon: PlayCircleIcon,
  },
  // add https://github.com/Cap-go/capacitor-ricoh360-camera-plugin
  {
    name: '@capgo/capacitor-ricoh360-camera-plugin',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for ricoh360 camera',
    href: 'https://github.com/Cap-go/capacitor-ricoh360-camera-plugin/',
    title: 'Ricoh360 Camera',
    icon: CameraIcon,
  },
  // Missing plugins from documentation
  {
    name: '@capgo/capacitor-admob',
    author: 'github.com/Cap-go',
    description: 'AdMob integration for Capacitor apps',
    href: 'https://github.com/Cap-go/capacitor-admob/',
    title: 'AdMob',
    icon: MegaphoneIcon,
  },
  {
    name: '@capgo/capacitor-alarm',
    author: 'github.com/Cap-go',
    description: 'Schedule native alarms and notifications even when app is closed',
    href: 'https://github.com/Cap-go/capacitor-alarm/',
    title: 'Alarm',
    icon: BellIcon,
  },
  {
    name: '@capgo/capacitor-android-inline-install',
    author: 'github.com/Cap-go',
    description: 'Enable inline app installation on Android devices',
    href: 'https://github.com/Cap-go/capacitor-android-inline-install/',
    title: 'Android Inline Install',
    icon: CloudArrowDownIcon,
  },
  {
    name: '@capgo/capacitor-appinsights',
    author: 'github.com/Cap-go',
    description: 'Application insights and analytics using the Apptopia AppInsights SDK',
    href: 'https://github.com/Cap-go/capacitor-appinsights/',
    title: 'AppInsights',
    icon: ChartBarIcon,
  },
  {
    name: '@capgo/capacitor-audiosession',
    author: 'github.com/Cap-go',
    description: 'Audio session management for iOS',
    href: 'https://github.com/Cap-go/capacitor-audiosession/',
    title: 'Audio Session',
    icon: SpeakerWaveIcon,
  },
  {
    name: '@capgo/capacitor-background-geolocation',
    author: 'github.com/Cap-go',
    description: 'Track device location in background with battery optimization',
    href: 'https://github.com/Cap-go/capacitor-background-geolocation/',
    title: 'Background Geolocation',
    icon: MapPinIcon,
  },
  {
    name: '@capgo/capacitor-document-scanner',
    author: 'github.com/Cap-go',
    description: 'Document scanning capabilities for mobile apps',
    href: 'https://github.com/Cap-go/capacitor-document-scanner/',
    title: 'Document Scanner',
    icon: DocumentIcon,
  },
  {
    name: '@capgo/capacitor-downloader',
    author: 'github.com/Cap-go',
    description: 'Background file downloads with progress tracking',
    href: 'https://github.com/Cap-go/capacitor-downloader/',
    title: 'Downloader',
    icon: CloudArrowDownIcon,
  },
  {
    name: '@capgo/capacitor-env',
    author: 'github.com/Cap-go',
    description: 'Environment variables management for Capacitor apps',
    href: 'https://github.com/Cap-go/capacitor-env/',
    title: 'Env',
    icon: CogIcon,
  },
  {
    name: '@capgo/capacitor-ffmpeg',
    author: 'github.com/Cap-go',
    description: 'Video encoding and processing powered by FFmpeg for compression and conversion',
    href: 'https://github.com/Cap-go/capacitor-ffmpeg/',
    title: 'FFmpeg',
    icon: VideoCameraIcon,
  },
  {
    name: '@capgo/capacitor-gtm',
    author: 'github.com/Cap-go',
    description: 'Google Tag Manager integration for analytics and tracking',
    href: 'https://github.com/Cap-go/capacitor-gtm/',
    title: 'GTM',
    icon: ChartBarIcon,
  },
  {
    name: '@capgo/capacitor-health',
    author: 'github.com/Cap-go',
    description: 'Access health and fitness data from native health platforms',
    href: 'https://github.com/Cap-go/capacitor-health/',
    title: 'Health',
    icon: HeartIcon,
  },
  {
    name: '@capgo/capacitor-is-root',
    author: 'github.com/Cap-go',
    description: 'Detect if device is rooted or jailbroken for security',
    href: 'https://github.com/Cap-go/capacitor-is-root/',
    title: 'Is Root',
    icon: ShieldCheckIcon,
  },
  {
    name: '@capgo/capacitor-launch-navigator',
    author: 'github.com/Cap-go',
    description: 'Launch navigation apps with addresses and coordinates',
    href: 'https://github.com/Cap-go/capacitor-launch-navigator/',
    title: 'Launch Navigator',
    icon: MapIcon,
  },
  {
    name: '@capgo/capacitor-live-reload',
    author: 'github.com/Cap-go',
    description: 'Connect to your dev server for instant hot reloading during development',
    href: 'https://github.com/Cap-go/capacitor-live-reload/',
    title: 'Live Reload',
    icon: RocketLaunchIcon,
  },
  {
    name: '@capgo/capacitor-llm',
    author: 'github.com/Cap-go',
    description: 'Run Large Language Models locally with Apple Intelligence support',
    href: 'https://github.com/Cap-go/capacitor-llm/',
    title: 'LLM',
    icon: CpuChipIcon,
  },
  {
    name: '@capgo/capacitor-media-session',
    author: 'github.com/Cap-go',
    description: 'Control media playback from lock screen and notification center',
    href: 'https://github.com/Cap-go/capacitor-media-session/',
    title: 'Media Session',
    icon: PlayCircleIcon,
  },
  {
    name: '@capgo/capacitor-mux-player',
    author: 'github.com/Cap-go',
    description: 'Mux video player integration for high-quality streaming',
    href: 'https://github.com/Cap-go/capacitor-mux-player/',
    title: 'Mux Player',
    icon: PlayCircleIcon,
  },
  {
    name: '@capgo/capacitor-pay',
    author: 'github.com/Cap-go',
    description: 'Apple Pay and Google Pay integration for mobile payments',
    href: 'https://github.com/Cap-go/capacitor-pay/',
    title: 'Pay',
    icon: CreditCardIcon,
  },
  {
    name: '@capgo/capacitor-pdf-generator',
    author: 'github.com/Cap-go',
    description: 'Generate PDF documents from HTML content',
    href: 'https://github.com/Cap-go/capacitor-pdf-generator/',
    title: 'PDF Generator',
    icon: DocumentTextIcon,
  },
  {
    name: '@capgo/capacitor-persistent-account',
    author: 'github.com/Cap-go',
    description: 'Maintain user accounts across app reinstalls',
    href: 'https://github.com/Cap-go/capacitor-persistent-account/',
    title: 'Persistent Account',
    icon: UserCircleIcon,
  },
  {
    name: '@capgo/capacitor-photo-library',
    author: 'github.com/Cap-go',
    description: 'Access and manage device photo library',
    href: 'https://github.com/Cap-go/capacitor-photo-library/',
    title: 'Photo Library',
    icon: PhotoIcon,
  },
  {
    name: '@capgo/capacitor-sim',
    author: 'github.com/Cap-go',
    description: 'Access SIM card information and carrier details',
    href: 'https://github.com/Cap-go/capacitor-sim/',
    title: 'SIM',
    icon: SignalIcon,
  },
  {
    name: '@capgo/capacitor-textinteraction',
    author: 'github.com/Cap-go',
    description: 'Enhanced text interaction and selection features',
    href: 'https://github.com/Cap-go/capacitor-textinteraction/',
    title: 'Text Interaction',
    icon: DocumentTextIcon,
  },
  {
    name: '@capgo/capacitor-twilio-voice',
    author: 'github.com/Cap-go',
    description: 'Make and receive phone calls using Twilio Voice API',
    href: 'https://github.com/Cap-go/capacitor-twilio-voice/',
    title: 'Twilio Voice',
    icon: PhoneIcon,
  },
  {
    name: '@capgo/capacitor-video-player',
    author: 'github.com/Cap-go',
    description: 'Native video playback with subtitles, fullscreen, and comprehensive controls',
    href: 'https://github.com/Cap-go/capacitor-video-player/',
    title: 'Video Player',
    icon: PlayCircleIcon,
  },
  {
    name: '@capgo/capacitor-volume-buttons',
    author: 'github.com/Cap-go',
    description: 'Listen to hardware volume button presses for custom controls',
    href: 'https://github.com/Cap-go/capacitor-volume-buttons/',
    title: 'Volume Buttons',
    icon: SpeakerWaveIcon,
  },
  {
    name: '@capgo/capacitor-youtube-player',
    author: 'github.com/Cap-go',
    description: 'Embed YouTube videos with full player API control and event handling',
    href: 'https://github.com/Cap-go/capacitor-youtube-player/',
    title: 'YouTube Player',
    icon: PlayCircleIcon,
  },
]
