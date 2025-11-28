import ArchiveBoxArrowDownIcon from 'astro-heroicons/mini/ArchiveBoxArrowDown.astro'
import ArrowPathIcon from 'astro-heroicons/mini/ArrowPath.astro'
import ArrowsPointingOutIcon from 'astro-heroicons/mini/ArrowsPointingOut.astro'
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
import LockClosedIcon from 'astro-heroicons/mini/LockClosed.astro'
import MapIcon from 'astro-heroicons/mini/Map.astro'
import MapPinIcon from 'astro-heroicons/mini/MapPin.astro'
import MegaphoneIcon from 'astro-heroicons/mini/Megaphone.astro'
import MicrophoneIcon from 'astro-heroicons/mini/Microphone.astro'
import PhoneIcon from 'astro-heroicons/mini/Phone.astro'
import PhotoIcon from 'astro-heroicons/mini/Photo.astro'
import PlayCircleIcon from 'astro-heroicons/mini/PlayCircle.astro'
import RadioIcon from 'astro-heroicons/mini/Radio.astro'
import RocketLaunchIcon from 'astro-heroicons/mini/RocketLaunch.astro'
import ShieldCheckIcon from 'astro-heroicons/mini/ShieldCheck.astro'
import SignalIcon from 'astro-heroicons/mini/Signal.astro'
import SpeakerWaveIcon from 'astro-heroicons/mini/SpeakerWave.astro'
import SpeakerXMarkIcon from 'astro-heroicons/mini/SpeakerXMark.astro'
import TagIcon from 'astro-heroicons/mini/Tag.astro'
import UserCircleIcon from 'astro-heroicons/mini/UserCircle.astro'
import UserGroupIcon from 'astro-heroicons/mini/UserGroup.astro'
import VideoCameraIcon from 'astro-heroicons/mini/VideoCamera.astro'
import ChatBubbleOvalLeftIcon from 'astro-heroicons/mini/ChatBubbleOvalLeft.astro'
import ShareIcon from 'astro-heroicons/mini/Share.astro'
import PrinterIcon from 'astro-heroicons/mini/Printer.astro'
import ArchiveBoxIcon from 'astro-heroicons/mini/ArchiveBox.astro'
import WifiIcon from 'astro-heroicons/mini/Wifi.astro'
import FireIcon from 'astro-heroicons/mini/Fire.astro'
import ExclamationTriangleIcon from 'astro-heroicons/mini/ExclamationTriangle.astro'
import CloudIcon from 'astro-heroicons/mini/Cloud.astro'
import CommandLineIcon from 'astro-heroicons/mini/CommandLine.astro'
import ShieldExclamationIcon from 'astro-heroicons/mini/ShieldExclamation.astro'
import ArrowsRightLeftIcon from 'astro-heroicons/mini/ArrowsRightLeft.astro'

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
    author: 'github.com/Cap-go',
    description: 'Deep link users directly to your app page on Google Play Store or Apple App Store',
    href: 'https://github.com/Cap-go/capacitor-native-market/',
    title: 'Native Market',
    icon: ArchiveBoxArrowDownIcon,
  },
  {
    name: '@capgo/capacitor-native-biometric',
    author: 'github.com/Cap-go',
    description: 'Secure authentication using Face ID, Touch ID, and Android biometric APIs',
    href: 'https://github.com/Cap-go/capacitor-native-biometric/',
    title: 'Native Biometric',
    icon: FingerPrintIcon,
  },
  {
    name: '@capgo/camera-preview',
    author: 'github.com/Cap-go',
    description: 'Display live camera feed as overlay with customizable controls and capture capabilities',
    href: 'https://github.com/Cap-go/capacitor-camera-preview/',
    title: 'Camera Preview',
    icon: CameraIcon,
  },
  {
    name: '@capgo/capacitor-updater',
    author: 'github.com/Cap-go',
    description: 'Deploy live updates instantly to your users without app store review delays',
    href: 'https://github.com/Cap-go/capacitor-updater/',
    title: 'Updater',
    icon: ArrowPathIcon,
  },
  {
    name: '@capgo/capacitor-uploader',
    author: 'github.com/Cap-go',
    description: 'Upload large files reliably in background with progress tracking and retry support',
    href: 'https://github.com/Cap-go/capacitor-uploader/',
    title: 'Uploader',
    icon: ArrowUpOnSquareIcon,
  },
  {
    name: '@revenuecat/purchases-capacitor',
    author: 'github.com/Cap-go',
    description: 'Implement in-app subscriptions and purchases with RevenueCat SDK for cross-platform monetization',
    href: 'https://github.com/RevenueCat/purchases-capacitor/',
    title: 'Purchases',
    icon: CurrencyDollarIcon,
  },
  {
    name: '@capgo/capacitor-flash',
    author: 'github.com/Cap-go',
    description: 'Control device flashlight and torch with simple on/off toggle functionality',
    href: 'https://github.com/Cap-go/capacitor-flash/',
    title: 'Flash',
    icon: BoltIcon,
  },
  {
    name: '@capgo/capacitor-screen-recorder',
    author: 'github.com/Cap-go',
    description: 'Capture screen recordings with audio for tutorials, demos, and bug reports',
    href: 'https://github.com/Cap-go/capacitor-screen-recorder/',
    title: 'Screen Recorder',
    icon: VideoCameraIcon,
  },
  {
    name: '@capgo/capacitor-crisp',
    author: 'github.com/Cap-go',
    description: 'Integrate Crisp live chat and customer support directly into your mobile app',
    href: 'https://github.com/Cap-go/capacitor-crisp/',
    title: 'Crisp',
    icon: ChatBubbleLeftIcon,
  },
  {
    name: '@capgo/nativegeocoder',
    author: 'github.com/Cap-go',
    description: 'Convert addresses to coordinates and coordinates to addresses using native geocoding',
    href: 'https://github.com/Cap-go/capacitor-nativegeocoder/',
    title: 'Native Geocoder',
    icon: MapPinIcon,
  },
  {
    name: '@capgo/inappbrowser',
    author: 'github.com/Cap-go',
    description: 'Open web pages in a customizable in-app browser without leaving your application',
    href: 'https://github.com/Cap-go/capacitor-inappbrowser/',
    title: 'In App Browser',
    icon: GlobeAltIcon,
  },
  {
    name: '@capgo/capacitor-mute',
    author: 'github.com/Cap-go',
    description: 'Detect device mute switch state for iOS devices to handle audio playback appropriately',
    href: 'https://github.com/Cap-go/capacitor-mute/',
    title: 'Mute',
    icon: SpeakerXMarkIcon,
  },
  {
    name: '@capgo/native-audio',
    author: 'github.com/Cap-go',
    description: 'Play short audio files with low latency using native audio engine for games and apps',
    href: 'https://github.com/Cap-go/capacitor-native-audio/',
    title: 'Native Audio',
    icon: SpeakerWaveIcon,
  },
  {
    name: '@capgo/capacitor-shake',
    author: 'github.com/Cap-go',
    description: 'Detect shake gestures on device for triggering actions like undo or feedback',
    href: 'https://github.com/Cap-go/capacitor-shake/',
    title: 'Shake',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: '@capgo/capacitor-navigation-bar',
    author: 'github.com/Cap-go',
    description: 'Customize Android navigation bar color and visibility for immersive UI experiences',
    href: 'https://github.com/Cap-go/capacitor-navigation-bar/',
    title: 'Navigation Bar',
    icon: Bars3Icon,
  },
  {
    name: '@capgo/ivs-player',
    author: 'github.com/Cap-go',
    description: 'Stream ultra-low latency live video using Amazon Interactive Video Service (IVS)',
    href: 'https://github.com/Cap-go/capacitor-ivs-player/',
    title: 'IVS Player',
    icon: PlayCircleIcon,
  },
  {
    name: '@capgo/home-indicator',
    author: 'github.com/Cap-go',
    description: 'Hide or show iOS home indicator for fullscreen and immersive app experiences',
    href: 'https://github.com/Cap-go/capacitor-home-indicator/',
    title: 'Indicator',
    icon: HomeIcon,
  },
  {
    name: '@capgo/native-purchases',
    author: 'github.com/Cap-go',
    description: 'Implement native in-app purchases and subscriptions for iOS and Android with simple API',
    href: 'https://github.com/Cap-go/capacitor-native-purchases/',
    title: 'Native Purchases',
    icon: CurrencyDollarIcon,
  },
  {
    name: '@capgo/capacitor-data-storage-sqlite',
    author: 'github.com/Cap-go',
    description: 'Store data locally using SQLite database with simple key-value API and encryption support',
    href: 'https://github.com/Cap-go/capacitor-data-storage-sqlite/',
    title: 'Data Storage',
    icon: CircleStackIcon,
  },
  {
    name: '@capgo/capacitor-android-usagestatsmanager',
    author: 'github.com/Cap-go',
    description: 'Access Android usage statistics to track app usage time and screen time analytics',
    href: 'https://github.com/Cap-go/capacitor-android-usagestatsmanager/',
    title: 'Usage Stats Manager',
    icon: ChartBarIcon,
  },
  {
    name: '@capgo/capacitor-streamcall',
    author: 'github.com/Cap-go',
    description: 'Integrate video calling and live streaming with Stream SDK for real-time communication',
    href: 'https://github.com/Cap-go/capacitor-streamcall/',
    title: 'Streamcall',
    icon: VideoCameraIcon,
  },
  {
    name: '@capgo/capacitor-autofill-save-password',
    author: 'github.com/Cap-go',
    description: 'Prompt users to save passwords to device autofill for seamless login experience',
    href: 'https://github.com/Cap-go/capacitor-autofill-save-password/',
    title: 'Autofill Save Password',
    icon: UserCircleIcon,
  },
  {
    name: '@capgo/capacitor-social-login',
    author: 'github.com/Cap-go',
    description: 'Authenticate users with Google, Facebook, and Apple Sign-In for easy social login',
    href: 'https://github.com/Cap-go/capacitor-social-login/',
    title: 'Social Login',
    icon: UserCircleIcon,
  },
  {
    name: '@capgo/capacitor-jw-player',
    author: 'github.com/Cap-go',
    description: 'Embed JW Player for professional video streaming with ads and analytics support',
    href: 'https://github.com/Cap-go/capacitor-jw-player/',
    title: 'JW Player',
    icon: PlayCircleIcon,
  },
  {
    name: '@capgo/capacitor-ricoh360-camera-plugin',
    author: 'github.com/Cap-go',
    description: 'Control Ricoh Theta 360-degree cameras for immersive panoramic photography',
    href: 'https://github.com/Cap-go/capacitor-ricoh360-camera-plugin/',
    title: 'Ricoh360 Camera',
    icon: CameraIcon,
  },
  {
    name: '@capgo/capacitor-admob',
    author: 'github.com/Cap-go',
    description: 'Monetize your app with Google AdMob banner, interstitial, and rewarded ads',
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
    description: 'Install app updates directly within the app without leaving to Play Store',
    href: 'https://github.com/Cap-go/capacitor-android-inline-install/',
    title: 'Android Inline Install',
    icon: CloudArrowDownIcon,
  },
  {
    name: '@capgo/capacitor-android-kiosk',
    author: 'github.com/Cap-go',
    description: 'Lock Android devices into kiosk mode with launcher functionality and hardware key control',
    href: 'https://github.com/Cap-go/capacitor-android-kiosk/',
    title: 'Android Kiosk',
    icon: LockClosedIcon,
  },
  {
    name: '@capgo/capacitor-appinsights',
    author: 'github.com/Cap-go',
    description: 'Track app usage, performance metrics, and user behavior with Apptopia AppInsights',
    href: 'https://github.com/Cap-go/capacitor-appinsights/',
    title: 'AppInsights',
    icon: ChartBarIcon,
  },
  {
    name: '@capgo/capacitor-audiosession',
    author: 'github.com/Cap-go',
    description: 'Configure iOS audio session for background playback, mixing, and routing control',
    href: 'https://github.com/Cap-go/capacitor-audiosession/',
    title: 'Audio Session',
    icon: SpeakerWaveIcon,
  },
  {
    name: '@capgo/capacitor-background-geolocation',
    author: 'github.com/Cap-go',
    description: 'Track device location continuously in background with battery-efficient geofencing',
    href: 'https://github.com/Cap-go/capacitor-background-geolocation/',
    title: 'Background Geolocation',
    icon: MapPinIcon,
  },
  {
    name: '@capgo/capacitor-document-scanner',
    author: 'github.com/Cap-go',
    description: 'Scan documents with auto edge detection, perspective correction, and PDF export',
    href: 'https://github.com/Cap-go/capacitor-document-scanner/',
    title: 'Document Scanner',
    icon: DocumentIcon,
  },
  {
    name: '@capgo/capacitor-downloader',
    author: 'github.com/Cap-go',
    description: 'Download large files in background with progress tracking and pause/resume support',
    href: 'https://github.com/Cap-go/capacitor-downloader/',
    title: 'Downloader',
    icon: CloudArrowDownIcon,
  },
  {
    name: '@capgo/capacitor-env',
    author: 'github.com/Cap-go',
    description: 'Securely manage environment variables and configuration across different build environments',
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
    description: 'Detect rooted Android or jailbroken iOS devices to enhance app security',
    href: 'https://github.com/Cap-go/capacitor-is-root/',
    title: 'Is Root',
    icon: ShieldCheckIcon,
  },
  {
    name: '@capgo/capacitor-launch-navigator',
    author: 'github.com/Cap-go',
    description: 'Open navigation apps like Google Maps or Apple Maps with directions to destinations',
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
    description: 'Run Large Language Models locally on-device with Apple Intelligence and MLX support',
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
    description: 'Stream adaptive bitrate video with Mux player for optimized playback quality',
    href: 'https://github.com/Cap-go/capacitor-mux-player/',
    title: 'Mux Player',
    icon: PlayCircleIcon,
  },
  {
    name: '@capgo/capacitor-pay',
    author: 'github.com/Cap-go',
    description: 'Accept payments with Apple Pay and Google Pay for seamless checkout experience',
    href: 'https://github.com/Cap-go/capacitor-pay/',
    title: 'Pay',
    icon: CreditCardIcon,
  },
  {
    name: '@capgo/capacitor-pdf-generator',
    author: 'github.com/Cap-go',
    description: 'Create PDF documents from HTML templates for invoices, reports, and receipts',
    href: 'https://github.com/Cap-go/capacitor-pdf-generator/',
    title: 'PDF Generator',
    icon: DocumentTextIcon,
  },
  {
    name: '@capgo/capacitor-persistent-account',
    author: 'github.com/Cap-go',
    description: 'Preserve user authentication and account data across app reinstalls and updates',
    href: 'https://github.com/Cap-go/capacitor-persistent-account/',
    title: 'Persistent Account',
    icon: UserCircleIcon,
  },
  {
    name: '@capgo/capacitor-photo-library',
    author: 'github.com/Cap-go',
    description: 'Browse, save, and manage photos and videos in device photo library with permissions',
    href: 'https://github.com/Cap-go/capacitor-photo-library/',
    title: 'Photo Library',
    icon: PhotoIcon,
  },
  {
    name: '@capgo/capacitor-sim',
    author: 'github.com/Cap-go',
    description: 'Retrieve SIM card information including carrier name, country code, and phone number',
    href: 'https://github.com/Cap-go/capacitor-sim/',
    title: 'SIM',
    icon: SignalIcon,
  },
  {
    name: '@capgo/capacitor-speech-recognition',
    author: 'github.com/Cap-go',
    description: 'Natural, low-latency speech recognition with streaming partial results and cross-platform parity',
    href: 'https://github.com/Cap-go/capacitor-speech-recognition/',
    title: 'Speech Recognition',
    icon: MicrophoneIcon,
  },
  {
    name: '@capgo/capacitor-textinteraction',
    author: 'github.com/Cap-go',
    description: 'Enable advanced text selection, copy-paste, and interaction features in web views',
    href: 'https://github.com/Cap-go/capacitor-textinteraction/',
    title: 'Text Interaction',
    icon: DocumentTextIcon,
  },
  {
    name: '@capgo/capacitor-twilio-voice',
    author: 'github.com/Cap-go',
    description: 'Make and receive VoIP calls with Twilio Voice for in-app calling functionality',
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
    description: 'Capture hardware volume button presses for custom app controls and shortcuts',
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
  {
    name: '@capgo/capacitor-wechat',
    author: 'github.com/Cap-go',
    description: 'WeChat SDK for Capacitor - enables authentication, sharing, payments, and mini-programs',
    href: 'https://github.com/Cap-go/capacitor-wechat/',
    title: 'WeChat',
    icon: ChatBubbleOvalLeftIcon,
  },
  {
    name: '@capgo/capacitor-ibeacon',
    author: 'github.com/Cap-go',
    description: 'iBeacon plugin for Capacitor - proximity detection and beacon region monitoring',
    href: 'https://github.com/Cap-go/capacitor-ibeacon/',
    title: 'iBeacon',
    icon: RadioIcon,
  },
  {
    name: '@capgo/capacitor-nfc',
    author: 'github.com/Cap-go',
    description: 'Native NFC tag discovery, reading and writing for Capacitor apps on iOS and Android',
    href: 'https://github.com/Cap-go/capacitor-nfc/',
    title: 'NFC',
    icon: TagIcon,
  },
  {
    name: '@capgo/capacitor-android-age-signals',
    author: 'github.com/Cap-go',
    description: 'Google Play Age Signals API wrapper - detect supervised accounts and verified users',
    href: 'https://github.com/Cap-go/capacitor-android-age-signals/',
    title: 'Age Signals',
    icon: UserGroupIcon,
  },
  {
    name: '@capgo/capacitor-barometer',
    author: 'github.com/Cap-go',
    description: 'Access device barometer for atmospheric pressure and altitude readings',
    href: 'https://github.com/Cap-go/capacitor-barometer/',
    title: 'Barometer',
    icon: ChartBarIcon,
  },
  {
    name: '@capgo/capacitor-accelerometer',
    author: 'github.com/Cap-go',
    description: 'Read device accelerometer for motion detection and orientation tracking',
    href: 'https://github.com/Cap-go/capacitor-accelerometer/',
    title: 'Accelerometer',
    icon: ArrowsPointingOutIcon,
  },
  {
    name: '@capgo/capacitor-contacts',
    author: 'github.com/Cap-go',
    description: 'Access and manage device contacts with read and write capabilities',
    href: 'https://github.com/Cap-go/capacitor-contacts/',
    title: 'Contacts',
    icon: UserGroupIcon,
  },
  {
    name: '@capgo/capacitor-audio-recorder',
    author: 'github.com/Cap-go',
    description: 'Record audio on iOS, Android, and Web with simple controls and formats',
    href: 'https://github.com/Cap-go/capacitor-audio-recorder/',
    title: 'Audio Recorder',
    icon: MicrophoneIcon,
  },
  {
    name: '@capgo/capacitor-share-target',
    author: 'github.com/Cap-go',
    description: 'Receive shared content from other apps - text, images, and files',
    href: 'https://github.com/Cap-go/capacitor-share-target/',
    title: 'Share Target',
    icon: ShareIcon,
  },
  {
    name: '@capgo/capacitor-realtimekit',
    author: 'github.com/Cap-go',
    description: 'Cloudflare Calls integration with built-in UI for video meetings and real-time communication',
    href: 'https://github.com/Cap-go/capacitor-realtimekit/',
    title: 'RealtimeKit',
    icon: VideoCameraIcon,
  },
  {
    name: '@capgo/capacitor-pedometer',
    author: 'github.com/Cap-go',
    description: 'Track steps, distance, pace, cadence, and floors with device pedometer sensors',
    href: 'https://github.com/Cap-go/capacitor-pedometer/',
    title: 'Pedometer',
    icon: SignalIcon,
  },
  {
    name: '@capgo/capacitor-fast-sql',
    author: 'github.com/Cap-go',
    description: 'High-performance native SQLite with custom protocol for efficient sync operations and IndexedDB replacement',
    href: 'https://github.com/Cap-go/capacitor-fast-sql/',
    title: 'Fast SQL',
    icon: CircleStackIcon,
  },
  {
    name: '@capgo/capacitor-file-compressor',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for efficient image compression supporting PNG, JPEG, and WebP formats across iOS, Android, and Web platforms',
    href: 'https://github.com/Cap-go/capacitor-file-compressor/',
    title: 'File Compressor',
    icon: PhotoIcon,
  },
  {
    name: '@capgo/capacitor-speech-synthesis',
    author: 'github.com/Cap-go',
    description: 'Synthesize speech from text with full control over language, voice, pitch, rate, and volume.',
    href: 'https://github.com/Cap-go/capacitor-speech-synthesis/',
    title: 'Speech Synthesis',
    icon: SpeakerWaveIcon,
  },
  {
    name: '@capgo/capacitor-printer',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for printing documents, HTML, PDFs, images and web views',
    href: 'https://github.com/Cap-go/capacitor-printer/',
    title: 'Printer',
    icon: PrinterIcon,
  },
  {
    name: '@capgo/capacitor-zip',
    author: 'github.com/Cap-go',
    description: 'A free Capacitor plugin for zipping and unzipping files on iOS, Android, and Web.',
    href: 'https://github.com/Cap-go/capacitor-zip/',
    title: 'Zip',
    icon: ArchiveBoxIcon,
  },
  {
    name: '@capgo/capacitor-wifi',
    author: 'github.com/Cap-go',
    description: 'Manage WiFi connectivity for your Capacitor app',
    href: 'https://github.com/Cap-go/capacitor-wifi/',
    title: 'WiFi',
    icon: WifiIcon,
  },
  {
    name: '@capgo/capacitor-screen-orientation',
    author: 'github.com/Cap-go',
    description: 'Screen orientation plugin with support for bypassing orientation lock',
    href: 'https://github.com/Cap-go/capacitor-screen-orientation/',
    title: 'Screen Orientation',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: '@capgo/capacitor-webview-guardian',
    author: 'github.com/Cap-go',
    description: 'Detect when the WebView was killed in the background and relaunch it on foreground',
    href: 'https://github.com/Cap-go/capacitor-webview-guardian/',
    title: 'WebView Guardian',
    icon: ShieldExclamationIcon,
  },
  {
    name: '@capgo/capacitor-firebase-analytics',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase Analytics',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/analytics',
    title: 'Firebase Analytics',
    icon: ChartBarIcon,
  },
  {
    name: '@capgo/capacitor-firebase-app',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase App',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/app',
    title: 'Firebase App',
    icon: FireIcon,
  },
  {
    name: '@capgo/capacitor-firebase-app-check',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase App Check',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/app-check',
    title: 'Firebase App Check',
    icon: ShieldCheckIcon,
  },
  {
    name: '@capgo/capacitor-firebase-authentication',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase Authentication',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/authentication',
    title: 'Firebase Authentication',
    icon: UserCircleIcon,
  },
  {
    name: '@capgo/capacitor-firebase-crashlytics',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase Crashlytics',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/crashlytics',
    title: 'Firebase Crashlytics',
    icon: ExclamationTriangleIcon,
  },
  {
    name: '@capgo/capacitor-firebase-firestore',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase Cloud Firestore',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/firestore',
    title: 'Firebase Firestore',
    icon: CircleStackIcon,
  },
  {
    name: '@capgo/capacitor-firebase-functions',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase Cloud Functions',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/functions',
    title: 'Firebase Functions',
    icon: CommandLineIcon,
  },
  {
    name: '@capgo/capacitor-firebase-messaging',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase Cloud Messaging (FCM)',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/messaging',
    title: 'Firebase Messaging',
    icon: ChatBubbleLeftIcon,
  },
  {
    name: '@capgo/capacitor-firebase-performance',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase Performance Monitoring',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/performance',
    title: 'Firebase Performance',
    icon: RocketLaunchIcon,
  },
  {
    name: '@capgo/capacitor-firebase-remote-config',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase Remote Config',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/remote-config',
    title: 'Firebase Remote Config',
    icon: CogIcon,
  },
  {
    name: '@capgo/capacitor-firebase-storage',
    author: 'github.com/Cap-go',
    description: 'Capacitor plugin for Firebase Cloud Storage',
    href: 'https://github.com/Cap-go/capacitor-firebase/tree/main/packages/storage',
    title: 'Firebase Storage',
    icon: CloudIcon,
  },
  {
    name: '@capacitor-plus/core',
    author: 'github.com/Cap-go',
    description: 'Capacitor+ is an automated, always-synced fork of Capacitor with merged community PRs and rapid releases',
    href: 'https://github.com/Cap-go/capacitor-plus/',
    title: 'Capacitor+ Core',
    icon: ArrowsRightLeftIcon,
  },
  {
    name: '@capacitor-plus/cli',
    author: 'github.com/Cap-go',
    description: 'Capacitor+ CLI - Same as official CLI but with community improvements merged faster',
    href: 'https://github.com/Cap-go/capacitor-plus/',
    title: 'Capacitor+ CLI',
    icon: CommandLineIcon,
  },
  {
    name: '@capacitor-plus/android',
    author: 'github.com/Cap-go',
    description: 'Capacitor+ Android runtime - Drop-in replacement with merged community fixes',
    href: 'https://github.com/Cap-go/capacitor-plus/',
    title: 'Capacitor+ Android',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: '@capacitor-plus/ios',
    author: 'github.com/Cap-go',
    description: 'Capacitor+ iOS runtime - Drop-in replacement with merged community fixes',
    href: 'https://github.com/Cap-go/capacitor-plus/',
    title: 'Capacitor+ iOS',
    icon: DevicePhoneMobileIcon,
  },
]
