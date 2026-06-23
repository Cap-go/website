export const pluginCategories = [
  { id: 'updates', label: 'Updates' },
  { id: 'auth-security', label: 'Auth & Security' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'media', label: 'Media' },
  { id: 'files-storage', label: 'Files & Storage' },
  { id: 'device-apis', label: 'Device APIs' },
  { id: 'ui-system', label: 'UI & System' },
  { id: 'location', label: 'Location' },
  { id: 'communication', label: 'Communication' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'developer-tools', label: 'Developer Tools' },
] as const

export type PluginCategoryId = (typeof pluginCategories)[number]['id']

export interface Action {
  icon?: string
  href: string
  title: string
  name?: string
  author: string
  description: string
  category: PluginCategoryId
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

const actionDefinitionRows =
  String.raw`@capgo/capacitor-native-market|github.com/Cap-go|Deep link users directly to your app page on Google Play Store or Apple App Store|https://github.com/Cap-go/capacitor-native-market/|Native Market
@capgo/capacitor-native-navigation|github.com/Cap-go|Render native navbars, tabbars, and transition shells over a full-screen Capacitor WebView|https://github.com/Cap-go/capacitor-native-navigation/|Native Navigation
@capgo/capacitor-native-loader|github.com/Cap-go|Show native animated loaders, transparent overlays, Lottie assets, and WebView-resizing loading states from JavaScript or native code|https://github.com/Cap-go/capacitor-native-loader/|Native Loader
@capgo/capacitor-auto|github.com/Cap-go|Bridge Capacitor apps with CarPlay and Android Auto template surfaces for two-way car communication|https://github.com/Cap-go/capacitor-auto/|Auto
@capgo/capacitor-transitions|github.com/Cap-go|Add Ionic-style page transitions and iOS edge swipe-back gestures without Ionic UI|https://github.com/Cap-go/capacitor-transitions/|Transitions
@capgo/capacitor-sheets|github.com/Cap-go|Framework-agnostic sheets, drawers, dialogs, and overlay primitives optimized for Capacitor apps|https://github.com/Cap-go/capacitor-sheets/|Sheets
@capgo/capacitor-native-biometric|github.com/Cap-go|Secure authentication using Face ID, Touch ID, and Android biometric APIs|https://github.com/Cap-go/capacitor-native-biometric/|Native Biometric
@capgo/camera-preview|github.com/Cap-go|Display live camera feed as overlay with customizable controls and capture capabilities|https://github.com/Cap-go/capacitor-camera-preview/|Camera Preview
@capgo/capacitor-calendar|github.com/Cap-go|Manage native calendar events on iOS and Android, with iOS Reminders support|https://github.com/Cap-go/capacitor-calendar/|Calendar
@capgo/capacitor-date-picker|github.com/Cap-go|Native date, time, date-time, year-month, and range picker for iOS, Android, and Web|https://github.com/Cap-go/capacitor-date-picker/|Date Picker
@capgo/capacitor-device-info|github.com/Cap-go|Read CPU, memory, GPU, storage, thermal state, and onboard sensor metrics from Capacitor apps|https://github.com/Cap-go/capacitor-device-info/|Device Info
@capgo/capacitor-updater|github.com/Cap-go|Deploy live updates instantly to your users without app store review delays|https://github.com/Cap-go/capacitor-updater/|Updater
@capgo/electron-updater|github.com/Cap-go|OTA live updates for Electron apps with the same API surface as capacitor-updater|https://github.com/Cap-go/electron-updater/|Electron Updater
@capgo/capacitor-uploader|github.com/Cap-go|Upload large files reliably in background with progress tracking and retry support|https://github.com/Cap-go/capacitor-uploader/|Uploader
@revenuecat/purchases-capacitor|github.com/Cap-go|Implement in-app subscriptions and purchases with RevenueCat SDK for cross-platform monetization|https://github.com/RevenueCat/purchases-capacitor/|Purchases
@capgo/capacitor-flash|github.com/Cap-go|Control device flashlight and torch with simple on/off toggle functionality|https://github.com/Cap-go/capacitor-flash/|Flash
@capgo/capacitor-screen-recorder|github.com/Cap-go|Capture screen recordings with audio for tutorials, demos, and bug reports|https://github.com/Cap-go/capacitor-screen-recorder/|Screen Recorder
@capgo/capacitor-crisp|github.com/Cap-go|Integrate Crisp live chat and customer support directly into your mobile app|https://github.com/Cap-go/capacitor-crisp/|Crisp
@capgo/capacitor-intercom|github.com/Cap-go|Integrate Intercom live chat, help center, and support workflows in your Capacitor app|https://github.com/Cap-go/capacitor-intercom/|Intercom
@capgo/capacitor-appsflyer|github.com/Cap-go|Add AppsFlyer attribution, analytics, deferred deep links, and OneLink support to your Capacitor app|https://github.com/Cap-go/capacitor-appsflyer/|AppsFlyer
@capgo/capacitor-contentsquare|github.com/Cap-go|Integrate Contentsquare mobile analytics, consent gating, screen tracking, transactions, and session replay controls in Capacitor|https://github.com/Cap-go/capacitor-contentsquare/|Contentsquare
@capgo/capacitor-facebook-analytics|github.com/Cap-go|Meta/Facebook App Events analytics with standard events, purchase logging, currency parameters, and advertiser tracking controls|https://github.com/Cap-go/capacitor-facebook-analytics/|Facebook Analytics
@capgo/capacitor-nativegeocoder|github.com/Cap-go|Convert addresses to coordinates and coordinates to addresses using native geocoding|https://github.com/Cap-go/capacitor-nativegeocoder/|Native Geocoder
@capgo/capacitor-inappbrowser|github.com/Cap-go|Open web pages in a customizable in-app browser without leaving your application|https://github.com/Cap-go/capacitor-inappbrowser/|In App Browser
@capgo/capacitor-mqtt|github.com/Cap-go|MQTT support for real-time messaging across iOS, Android, and Web.|https://github.com/Cap-go/capacitor-mqtt/|MQTT
@capgo/capacitor-mock-location-detector|github.com/Cap-go|Detect simulated GPS locations and developer tooling that enables spoofing apps|https://github.com/Cap-go/capacitor-mock-location-detector/|Mock Location Detector
@capgo/capacitor-mute|github.com/Cap-go|Detect device mute switch state for iOS devices to handle audio playback appropriately|https://github.com/Cap-go/capacitor-mute/|Mute
@capgo/capacitor-native-audio|github.com/Cap-go|Play short audio files with low latency using native audio engine for games and apps|https://github.com/Cap-go/capacitor-native-audio/|Native Audio
@capgo/capacitor-shake|github.com/Cap-go|Detect shake gestures on device for triggering actions like undo or feedback|https://github.com/Cap-go/capacitor-shake/|Shake
@capgo/capacitor-navigation-bar|github.com/Cap-go|Customize Android navigation bar color and visibility for immersive UI experiences|https://github.com/Cap-go/capacitor-navigation-bar/|Navigation Bar
@capgo/ivs-player|github.com/Cap-go|Stream ultra-low latency live video using Amazon Interactive Video Service (IVS)|https://github.com/Cap-go/capacitor-ivs-player/|IVS Player
@capgo/home-indicator|github.com/Cap-go|Hide or show iOS home indicator for fullscreen and immersive app experiences|https://github.com/Cap-go/capacitor-home-indicator/|Indicator
@capgo/native-purchases|github.com/Cap-go|Implement native in-app purchases, subscriptions, and iOS StoreKit commitment billing plans with a simple API|https://github.com/Cap-go/capacitor-native-purchases/|Native Purchases
@capgo/capacitor-data-storage-sqlite|github.com/Cap-go|Store data locally using SQLite database with simple key-value API and encryption support|https://github.com/Cap-go/capacitor-data-storage-sqlite/|Data Storage
@capgo/capacitor-android-usagestatsmanager|github.com/Cap-go|Access Android usage statistics to track app usage time and screen time analytics|https://github.com/Cap-go/capacitor-android-usagestatsmanager/|Usage Stats Manager
@capgo/capacitor-streamcall|github.com/Cap-go|Integrate video calling and live streaming with Stream SDK for real-time communication|https://github.com/Cap-go/capacitor-streamcall/|Streamcall
@capgo/capacitor-autofill-save-password|github.com/Cap-go|Prompt users to save passwords to device autofill for seamless login experience|https://github.com/Cap-go/capacitor-autofill-save-password/|Autofill Save Password
@capgo/capacitor-social-login|github.com/Cap-go|Authenticate users with Google, Facebook, and Apple Sign-In for easy social login|https://github.com/Cap-go/capacitor-social-login/|Social Login
@capgo/capacitor-passkey|github.com/Cap-go|Keep browser-style WebAuthn code in Capacitor while native passkey calls and host patching are handled for you|https://github.com/Cap-go/capacitor-passkey/|Passkey
@capgo/capacitor-jw-player|github.com/Cap-go|Embed JW Player for professional video streaming with ads and analytics support|https://github.com/Cap-go/capacitor-jw-player/|JW Player
@capgo/capacitor-ricoh360|github.com/Cap-go|Control Ricoh Theta 360-degree cameras for immersive panoramic photography|https://github.com/Cap-go/capacitor-ricoh360-camera-plugin/|Ricoh360 Camera
@capgo/capacitor-admob|github.com/Cap-go|Monetize your app with Google AdMob banner, interstitial, and rewarded ads|https://github.com/Cap-go/capacitor-admob/|AdMob
@capgo/capacitor-alarm|github.com/Cap-go|Schedule native alarms and notifications even when app is closed|https://github.com/Cap-go/capacitor-alarm/|Alarm
@capgo/capacitor-android-inline-install|github.com/Cap-go|Install app updates directly within the app without leaving to Play Store|https://github.com/Cap-go/capacitor-android-inline-install/|Android Inline Install
@capgo/capacitor-android-kiosk|github.com/Cap-go|Lock Android devices into kiosk mode with launcher functionality and hardware key control|https://github.com/Cap-go/capacitor-android-kiosk/|Android Kiosk
@capgo/capacitor-android-sms-retriever|github.com/Cap-go|Read one app-targeted verification SMS without SMS permissions and request SIM phone number hints on Android|https://github.com/Cap-go/capacitor-android-sms-retriever/|Android SMS Retriever
@capgo/capacitor-appinsights|github.com/Cap-go|Track app usage, performance metrics, and user behavior with Apptopia AppInsights|https://github.com/Cap-go/capacitor-appinsights/|AppInsights
@capgo/capacitor-app-attest|github.com/Cap-go|Capacitor plugin for cross-platform device attestation using Apple App Attest and Google Play Integrity Standard|https://github.com/Cap-go/capacitor-app-attest/|App Attest
@capgo/capacitor-recaptcha|github.com/Cap-go|Generate Web reCAPTCHA or reCAPTCHA Enterprise tokens plus native Enterprise mobile tokens|https://github.com/Cap-go/capacitor-recaptcha/|reCAPTCHA
@capgo/capacitor-verisoul|github.com/Cap-go|Collect Verisoul native fraud-prevention sessions from Capacitor apps on iOS and Android|https://github.com/Cap-go/capacitor-verisoul/|Verisoul
@capgo/capacitor-audiosession|github.com/Cap-go|Configure iOS audio session for background playback, mixing, and routing control|https://github.com/Cap-go/capacitor-audiosession/|Audio Session
@capgo/capacitor-background-geolocation|github.com/Cap-go|Accurate background location tracking with native iOS and Android geofencing plus transition webhooks|https://github.com/Cap-go/capacitor-background-geolocation/|Background Geolocation
@capgo/capacitor-background-task|github.com/Cap-go|Schedule periodic background fetch tasks on iOS and Android with Expo-style task registration|https://github.com/Cap-go/capacitor-background-task/|Background Task
@capgo/capacitor-document-scanner|github.com/Cap-go|Scan documents with auto edge detection, perspective correction, and PDF export|https://github.com/Cap-go/capacitor-document-scanner/|Document Scanner
@capgo/capacitor-downloader|github.com/Cap-go|Download large files in background with progress tracking and pause/resume support|https://github.com/Cap-go/capacitor-downloader/|Downloader
@capgo/capacitor-env|github.com/Cap-go|Securely manage environment variables and configuration across different build environments|https://github.com/Cap-go/capacitor-env/|Env
@capgo/capacitor-ffmpeg|github.com/Cap-go|Video encoding and processing powered by FFmpeg for compression and conversion|https://github.com/Cap-go/capacitor-ffmpeg/|FFmpeg
@capgo/capacitor-gtm|github.com/Cap-go|Google Tag Manager integration for analytics and tracking|https://github.com/Cap-go/capacitor-gtm/|GTM
@capgo/capacitor-rudderstack|github.com/Cap-go|RudderStack analytics, identity resolution, screen tracking, and delivery controls for Capacitor|https://github.com/Cap-go/capacitor-rudderstack/|RudderStack
@capgo/capacitor-health|github.com/Cap-go|Access health and fitness data from native health platforms|https://github.com/Cap-go/capacitor-health/|Health
@capgo/capacitor-is-root|github.com/Cap-go|Detect rooted Android or jailbroken iOS devices to enhance app security|https://github.com/Cap-go/capacitor-is-root/|Is Root
@capgo/capacitor-app-tracking-transparency|github.com/Cap-go|Request and check iOS App Tracking Transparency permission for IDFA access|https://github.com/Cap-go/capacitor-app-tracking-transparency/|App Tracking Transparency
@capgo/capacitor-launch-navigator|github.com/Cap-go|Open navigation apps like Google Maps or Apple Maps with directions to destinations|https://github.com/Cap-go/capacitor-launch-navigator/|Launch Navigator
@capgo/capacitor-live-activities|github.com/Cap-go|Manage iOS Live Activities and Dynamic Island layouts from Capacitor with JSON-driven templates|https://github.com/Cap-go/capacitor-live-activities/|Live Activities
@capgo/capacitor-live-reload|github.com/Cap-go|Connect to your dev server for instant hot reloading during development|https://github.com/Cap-go/capacitor-live-reload/|Live Reload
@capgo/capacitor-llm|github.com/Cap-go|Run Large Language Models locally on-device with Apple Intelligence and MLX support|https://github.com/Cap-go/capacitor-llm/|LLM
@capgo/capacitor-media-session|github.com/Cap-go|Control media playback from lock screen and notification center|https://github.com/Cap-go/capacitor-media-session/|Media Session
@capgo/capacitor-mux-player|github.com/Cap-go|Stream adaptive bitrate video with Mux player for optimized playback quality|https://github.com/Cap-go/capacitor-mux-player/|Mux Player
@capgo/capacitor-pay|github.com/Cap-go|Accept payments with Apple Pay and Google Pay for seamless checkout experience|https://github.com/Cap-go/capacitor-pay/|Pay
@capgo/capacitor-privacy-screen|github.com/Cap-go|Protect app content in Android screenshots and obscure the iOS app switcher snapshot|https://github.com/Cap-go/capacitor-privacy-screen/|Privacy Screen
@capgo/capacitor-proximity|github.com/Cap-go|Enable native proximity monitoring so your app can react when the device is near a face, hand, or surface|https://github.com/Cap-go/capacitor-proximity/|Proximity
@capgo/capacitor-pdf-generator|github.com/Cap-go|Create PDF documents from HTML templates for invoices, reports, and receipts|https://github.com/Cap-go/capacitor-pdf-generator/|PDF Generator
@capgo/capacitor-persistent-account|github.com/Cap-go|Preserve user authentication and account data across app reinstalls and updates|https://github.com/Cap-go/capacitor-persistent-account/|Persistent Account
@capgo/capacitor-persistent-uuid|github.com/Cap-go|Generate and persist one app-scoped UUID across reinstalls, app updates, and OS updates|https://github.com/Cap-go/capacitor-persistent-uuid/|Persistent UUID
@capgo/capacitor-photo-library|github.com/Cap-go|Browse, save, and manage photos and videos in device photo library with permissions|https://github.com/Cap-go/capacitor-photo-library/|Photo Library
@capgo/capacitor-sim|github.com/Cap-go|Retrieve SIM card information including carrier name, country code, and phone number|https://github.com/Cap-go/capacitor-sim/|SIM
@capgo/capacitor-speech-recognition|github.com/Cap-go|Natural, low-latency speech recognition with streaming partial results and cross-platform parity|https://github.com/Cap-go/capacitor-speech-recognition/|Speech Recognition
@capgo/capacitor-textinteraction|github.com/Cap-go|Enable advanced text selection, copy-paste, and interaction features in web views|https://github.com/Cap-go/capacitor-textinteraction/|Text Interaction
@capgo/capacitor-twilio-video|github.com/Cap-go|Join Twilio Video rooms from Capacitor with native audio, camera, and room lifecycle events|https://github.com/Cap-go/capacitor-twilio-video/|Twilio Video
@capgo/capacitor-twilio-voice|github.com/Cap-go|Make and receive VoIP calls with Twilio Voice for in-app calling functionality|https://github.com/Cap-go/capacitor-twilio-voice/|Twilio Voice
@capgo/capacitor-video-player|github.com/Cap-go|Native video playback with subtitles, fullscreen, and comprehensive controls|https://github.com/Cap-go/capacitor-video-player/|Video Player
@capgo/capacitor-volume-buttons|github.com/Cap-go|Capture hardware volume button presses for custom app controls and shortcuts|https://github.com/Cap-go/capacitor-volume-buttons/|Volume Buttons
@capgo/capacitor-youtube-player|github.com/Cap-go|Embed YouTube videos with full player API control and event handling|https://github.com/Cap-go/capacitor-youtube-player/|YouTube Player
@capgo/capacitor-wechat|github.com/Cap-go|WeChat SDK for Capacitor - enables authentication, sharing, payments, and mini-programs|https://github.com/Cap-go/capacitor-wechat/|WeChat
@capgo/capacitor-ibeacon|github.com/Cap-go|iBeacon plugin for Capacitor - proximity detection and beacon region monitoring|https://github.com/Cap-go/capacitor-ibeacon/|iBeacon
@capgo/capacitor-nfc|github.com/Cap-go|Native NFC tag discovery, reading and writing for Capacitor apps on iOS and Android|https://github.com/Cap-go/capacitor-nfc/|NFC
@capgo/capacitor-age-range|github.com/Cap-go|Cross-platform age range detection using Google Play Age Signals (Android) and Apple DeclaredAgeRange (iOS)|https://github.com/Cap-go/capacitor-age-range/|Age Range
@capgo/capacitor-persona|github.com/Cap-go|Launch Persona identity verification inquiries with native iOS and Android SDKs|https://github.com/Cap-go/capacitor-persona/|Persona
@capgo/capacitor-intune|github.com/Cap-go|Microsoft Intune MAM, app protection policy, app config, and MSAL authentication for Capacitor|https://github.com/Cap-go/capacitor-intune/|Intune
@capgo/capacitor-pretty-toast|github.com/Cap-go|Native-first pretty toast notifications for Capacitor and the web|https://github.com/Cap-go/capacitor-pretty-toast/|Pretty Toast
@capgo/capacitor-patch|github.com/Cap-go|Apply version-gated Capacitor core, CLI, plugin, and native project patches during cap sync and update|https://github.com/Cap-go/capacitor-patch/|Capacitor Patch
@capgo/capacitor-supabase|github.com/Cap-go|Native Supabase authentication, JWT access, and basic database helpers for Capacitor|https://github.com/Cap-go/capacitor-supabase/|Supabase
@capgo/capacitor-incoming-call-kit|github.com/Cap-go|Present native incoming-call UI with iOS CallKit and Android full-screen notifications|https://github.com/Cap-go/capacitor-incoming-call-kit/|Incoming Call Kit
@capgo/capacitor-install-referrer|github.com/Cap-go|Read Google Play install referrer data and Apple AdServices attribution from Capacitor|https://github.com/Cap-go/capacitor-install-referrer/|Install Referrer
@capgo/capacitor-android-age-signals|github.com/Cap-go|Google Play Age Signals API wrapper - detect supervised accounts and verified users|https://github.com/Cap-go/capacitor-android-age-signals/|Age Signals
@capgo/capacitor-barometer|github.com/Cap-go|Access device barometer for atmospheric pressure and altitude readings|https://github.com/Cap-go/capacitor-barometer/|Barometer
@capgo/capacitor-accelerometer|github.com/Cap-go|Read device accelerometer for motion detection and orientation tracking|https://github.com/Cap-go/capacitor-accelerometer/|Accelerometer
@capgo/capacitor-contacts|github.com/Cap-go|Access and manage device contacts with read and write capabilities|https://github.com/Cap-go/capacitor-contacts/|Contacts
@capgo/capacitor-audio-recorder|github.com/Cap-go|Record audio on iOS, Android, and Web with simple controls and formats|https://github.com/Cap-go/capacitor-audio-recorder/|Audio Recorder
@capgo/capacitor-share-target|github.com/Cap-go|Receive shared content from other apps - text, images, and files|https://github.com/Cap-go/capacitor-share-target/|Share Target
@capgo/capacitor-realtimekit|github.com/Cap-go|Cloudflare Calls integration with built-in UI for video meetings and real-time communication|https://github.com/Cap-go/capacitor-realtimekit/|RealtimeKit
@capgo/capacitor-pedometer|github.com/Cap-go|Track steps, distance, pace, cadence, and floors with device pedometer sensors|https://github.com/Cap-go/capacitor-pedometer/|Pedometer
@capgo/capacitor-fast-sql|github.com/Cap-go|High-performance native SQLite with custom protocol for efficient sync operations and IndexedDB replacement|https://github.com/Cap-go/capacitor-fast-sql/|Fast SQL
@capgo/capacitor-file-compressor|github.com/Cap-go|Capacitor plugin for efficient image compression supporting PNG, JPEG, and WebP formats across iOS, Android, and Web platforms|https://github.com/Cap-go/capacitor-file-compressor/|File Compressor
@capgo/capacitor-speech-synthesis|github.com/Cap-go|Synthesize speech from text with full control over language, voice, pitch, rate, and volume.|https://github.com/Cap-go/capacitor-speech-synthesis/|Speech Synthesis
@capgo/capacitor-ssl-pinning|github.com/Cap-go|Pin HTTPS connections to bundled certificates for CapacitorHttp on iOS and Android|https://github.com/Cap-go/capacitor-ssl-pinning/|SSL Pinning
@capgo/capacitor-printer|github.com/Cap-go|Capacitor plugin for printing documents, HTML, PDFs, images and web views|https://github.com/Cap-go/capacitor-printer/|Printer
@capgo/capacitor-zip|github.com/Cap-go|A free Capacitor plugin for zipping and unzipping files on iOS, Android, and Web.|https://github.com/Cap-go/capacitor-zip/|Zip
@capgo/capacitor-zebra-datawedge|github.com/Cap-go|Manage Zebra DataWedge profiles, notifications, queries, and scan triggers on Zebra Android devices|https://github.com/Cap-go/capacitor-zebra-datawedge/|Zebra DataWedge
@capgo/capacitor-network-diagnostics|github.com/Cap-go|Run native network diagnostics for URL reachability, TCP ports, WebSocket handshakes, speed, and packet loss|https://github.com/Cap-go/capacitor-network-diagnostics/|Network Diagnostics
@capgo/capacitor-wifi|github.com/Cap-go|Manage WiFi connectivity for your Capacitor app|https://github.com/Cap-go/capacitor-wifi/|WiFi
@capgo/capacitor-screen-orientation|github.com/Cap-go|Screen orientation plugin with support for bypassing orientation lock|https://github.com/Cap-go/capacitor-screen-orientation/|Screen Orientation
@capgo/capacitor-webview-guardian|github.com/Cap-go|Detect when the WebView was killed in the background and relaunch it on foreground|https://github.com/Cap-go/capacitor-webview-guardian/|WebView Guardian
@capgo/capacitor-webview-crash|github.com/Cap-go|Restart crashed WebViews natively and recycle long-running WebViews on a fixed interval|https://github.com/Cap-go/capacitor-webview-crash/|WebView Crash
@capgo/capacitor-webview-version-checker|github.com/Cap-go|Capacitor plugin for checking Android WebView version freshness and guiding users to native update flows|https://github.com/Cap-go/capacitor-webview-version-checker/|WebView Version Checker
@capgo/capacitor-firebase-analytics|github.com/Cap-go|Capacitor plugin for Firebase Analytics|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/analytics|Firebase Analytics
@capgo/capacitor-firebase-app|github.com/Cap-go|Capacitor plugin for Firebase App|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/app|Firebase App
@capgo/capacitor-firebase-app-check|github.com/Cap-go|Capacitor plugin for Firebase App Check|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/app-check|Firebase App Check
@capgo/capacitor-firebase-authentication|github.com/Cap-go|Capacitor plugin for Firebase Authentication|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/authentication|Firebase Authentication
@capgo/capacitor-firebase-crashlytics|github.com/Cap-go|Capacitor plugin for Firebase Crashlytics|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/crashlytics|Firebase Crashlytics
@capgo/capacitor-firebase-firestore|github.com/Cap-go|Capacitor plugin for Firebase Cloud Firestore|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/firestore|Firebase Firestore
@capgo/capacitor-firebase-functions|github.com/Cap-go|Capacitor plugin for Firebase Cloud Functions|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/functions|Firebase Functions
@capgo/capacitor-firebase-messaging|github.com/Cap-go|Capacitor plugin for Firebase Cloud Messaging (FCM)|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/messaging|Firebase Messaging
@capgo/capacitor-firebase-performance|github.com/Cap-go|Capacitor plugin for Firebase Performance Monitoring|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/performance|Firebase Performance
@capgo/capacitor-firebase-remote-config|github.com/Cap-go|Capacitor plugin for Firebase Remote Config|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/remote-config|Firebase Remote Config
@capgo/capacitor-firebase-storage|github.com/Cap-go|Capacitor plugin for Firebase Cloud Storage|https://github.com/Cap-go/capacitor-firebase/tree/main/packages/storage|Firebase Storage
@capacitor-plus/core|github.com/Cap-go|Capacitor+ is an automated, always-synced fork of Capacitor with merged community PRs and rapid releases|https://github.com/Cap-go/capacitor-plus/|Capacitor+ Core
@capacitor-plus/cli|github.com/Cap-go|Capacitor+ CLI - Same as official CLI but with community improvements merged faster|https://github.com/Cap-go/capacitor-plus/|Capacitor+ CLI
@capacitor-plus/android|github.com/Cap-go|Capacitor+ Android runtime - Drop-in replacement with merged community fixes|https://github.com/Cap-go/capacitor-plus/|Capacitor+ Android
@capacitor-plus/ios|github.com/Cap-go|Capacitor+ iOS runtime - Drop-in replacement with merged community fixes|https://github.com/Cap-go/capacitor-plus/|Capacitor+ iOS
@capgo/capacitor-compass|github.com/Cap-go|Read device compass heading in degrees with continuous updates and permission handling|https://github.com/Cap-go/capacitor-compass/|Compass
@capgo/capacitor-file|github.com/Cap-go|Full-featured file system plugin for reading, writing, and managing files and directories|https://github.com/Cap-go/capacitor-file/|File
@capgo/capacitor-file-sharer|github.com/Cap-go|Share and save files from base64 data or local paths across Android, iOS, and Web|https://github.com/Cap-go/capacitor-file-sharer/|File Sharer
@capgo/capacitor-bluetooth-low-energy|github.com/Cap-go|Full-featured BLE plugin for scanning, connecting, reading, writing, and receiving notifications from Bluetooth devices|https://github.com/Cap-go/capacitor-bluetooth-low-energy/|Bluetooth Low Energy
@capgo/capacitor-keep-awake|github.com/Cap-go|Prevent device screen from dimming or sleeping for video players, navigation, and presentations|https://github.com/Cap-go/capacitor-keep-awake/|Keep Awake
@capgo/capacitor-in-app-review|github.com/Cap-go|Prompt users to submit app store ratings and reviews without leaving your app using native iOS and Android APIs|https://github.com/Cap-go/capacitor-in-app-review/|In App Review
@capgo/capacitor-file-picker|github.com/Cap-go|Pick files, images, videos, and directories with full native support for iOS and Android including HEIC conversion|https://github.com/Cap-go/capacitor-file-picker/|File Picker
@capgo/capacitor-watch|github.com/Cap-go|Apple Watch communication with bidirectional messaging between iPhone and watchOS apps|https://github.com/Cap-go/capacitor-watch/|Watch
@capgo/capacitor-widget-kit|github.com/Cap-go|Build WidgetKit and Live Activity surfaces from Capacitor with SVG frames, timers, action hotspots, or full-native widget state sync|https://github.com/Cap-go/capacitor-widget-kit/|Widget Kit
@capgo/capacitor-brightness|github.com/Cap-go|Control device screen brightness programmatically with support for app-specific and system-wide control|https://github.com/Cap-go/capacitor-brightness/|Brightness
@capgo/capacitor-light-sensor|github.com/Cap-go|Access the ambient light sensor to measure illuminance levels in lux with real-time updates|https://github.com/Cap-go/capacitor-light-sensor/|Light Sensor
@capgo/capacitor-video-thumbnails|github.com/Cap-go|Generate thumbnail images from local and remote video files at specific timestamps|https://github.com/Cap-go/capacitor-video-thumbnails/|Video Thumbnails
@capgo/capacitor-intent-launcher|github.com/Cap-go|Launch Android intents, open system settings, and interact with other apps using the Intent system|https://github.com/Cap-go/capacitor-intent-launcher/|Intent Launcher`
    .trim()
    .split('\n')

const pluginIconsByName: Record<string, string> = {
  '@capgo/capacitor-native-market': 'ArchiveBoxArrowDown',
  '@capgo/capacitor-native-navigation': 'DevicePhoneMobile',
  '@capgo/capacitor-native-loader': 'ArrowPath',
  '@capgo/capacitor-auto': 'Truck',
  '@capgo/capacitor-transitions': 'ArrowsRightLeft',
  '@capgo/capacitor-sheets': 'ArrowsPointingOut',
  '@capgo/capacitor-native-biometric': 'FingerPrint',
  '@capgo/camera-preview': 'Camera',
  '@capgo/capacitor-calendar': 'CalendarDays',
  '@capgo/capacitor-date-picker': 'CalendarDays',
  '@capgo/capacitor-device-info': 'CpuChip',
  '@capgo/capacitor-updater': 'ArrowPath',
  '@capgo/electron-updater': 'ArrowPath',
  '@capgo/capacitor-uploader': 'ArrowUpOnSquare',
  '@revenuecat/purchases-capacitor': 'CurrencyDollar',
  '@capgo/capacitor-flash': 'Bolt',
  '@capgo/capacitor-screen-recorder': 'VideoCamera',
  '@capgo/capacitor-crisp': 'ChatBubbleLeft',
  '@capgo/capacitor-intercom': 'ChatBubbleLeft',
  '@capgo/capacitor-appsflyer': 'ChartBar',
  '@capgo/capacitor-contentsquare': 'ChartBar',
  '@capgo/capacitor-facebook-analytics': 'ChartBar',
  '@capgo/capacitor-nativegeocoder': 'MapPin',
  '@capgo/capacitor-inappbrowser': 'GlobeAlt',
  '@capgo/capacitor-mqtt': 'Signal',
  '@capgo/capacitor-mock-location-detector': 'MapPin',
  '@capgo/capacitor-mute': 'SpeakerXMark',
  '@capgo/capacitor-native-audio': 'SpeakerWave',
  '@capgo/capacitor-shake': 'DevicePhoneMobile',
  '@capgo/capacitor-navigation-bar': 'Bars3',
  '@capgo/ivs-player': 'PlayCircle',
  '@capgo/home-indicator': 'Home',
  '@capgo/native-purchases': 'CurrencyDollar',
  '@capgo/capacitor-data-storage-sqlite': 'CircleStack',
  '@capgo/capacitor-android-usagestatsmanager': 'ChartBar',
  '@capgo/capacitor-streamcall': 'VideoCamera',
  '@capgo/capacitor-autofill-save-password': 'UserCircle',
  '@capgo/capacitor-social-login': 'UserCircle',
  '@capgo/capacitor-passkey': 'Key',
  '@capgo/capacitor-jw-player': 'PlayCircle',
  '@capgo/capacitor-ricoh360': 'Camera',
  '@capgo/capacitor-admob': 'Megaphone',
  '@capgo/capacitor-alarm': 'Bell',
  '@capgo/capacitor-android-inline-install': 'CloudArrowDown',
  '@capgo/capacitor-android-kiosk': 'LockClosed',
  '@capgo/capacitor-android-sms-retriever': 'ChatBubbleLeft',
  '@capgo/capacitor-appinsights': 'ChartBar',
  '@capgo/capacitor-app-attest': 'ShieldCheck',
  '@capgo/capacitor-recaptcha': 'ShieldCheck',
  '@capgo/capacitor-verisoul': 'ShieldCheck',
  '@capgo/capacitor-audiosession': 'SpeakerWave',
  '@capgo/capacitor-background-geolocation': 'MapPin',
  '@capgo/capacitor-background-task': 'Clock',
  '@capgo/capacitor-document-scanner': 'Document',
  '@capgo/capacitor-downloader': 'CloudArrowDown',
  '@capgo/capacitor-env': 'Cog',
  '@capgo/capacitor-ffmpeg': 'VideoCamera',
  '@capgo/capacitor-gtm': 'ChartBar',
  '@capgo/capacitor-rudderstack': 'ChartBar',
  '@capgo/capacitor-health': 'Heart',
  '@capgo/capacitor-is-root': 'ShieldCheck',
  '@capgo/capacitor-app-tracking-transparency': 'EyeSlash',
  '@capgo/capacitor-launch-navigator': 'Map',
  '@capgo/capacitor-live-activities': 'Bell',
  '@capgo/capacitor-live-reload': 'RocketLaunch',
  '@capgo/capacitor-llm': 'CpuChip',
  '@capgo/capacitor-media-session': 'PlayCircle',
  '@capgo/capacitor-mux-player': 'PlayCircle',
  '@capgo/capacitor-pay': 'CreditCard',
  '@capgo/capacitor-privacy-screen': 'EyeSlash',
  '@capgo/capacitor-pdf-generator': 'DocumentText',
  '@capgo/capacitor-persistent-account': 'UserCircle',
  '@capgo/capacitor-persistent-uuid': 'FingerPrint',
  '@capgo/capacitor-photo-library': 'Photo',
  '@capgo/capacitor-sim': 'Signal',
  '@capgo/capacitor-speech-recognition': 'Microphone',
  '@capgo/capacitor-textinteraction': 'DocumentText',
  '@capgo/capacitor-twilio-video': 'VideoCamera',
  '@capgo/capacitor-twilio-voice': 'Phone',
  '@capgo/capacitor-video-player': 'PlayCircle',
  '@capgo/capacitor-volume-buttons': 'SpeakerWave',
  '@capgo/capacitor-youtube-player': 'PlayCircle',
  '@capgo/capacitor-wechat': 'ChatBubbleOvalLeft',
  '@capgo/capacitor-ibeacon': 'Radio',
  '@capgo/capacitor-nfc': 'Tag',
  '@capgo/capacitor-age-range': 'UserGroup',
  '@capgo/capacitor-persona': 'UserCircle',
  '@capgo/capacitor-intune': 'ShieldCheck',
  '@capgo/capacitor-pretty-toast': 'Bell',
  '@capgo/capacitor-patch': 'WrenchScrewdriver',
  '@capgo/capacitor-supabase': 'CircleStack',
  '@capgo/capacitor-incoming-call-kit': 'Phone',
  '@capgo/capacitor-install-referrer': 'Tag',
  '@capgo/capacitor-android-age-signals': 'UserGroup',
  '@capgo/capacitor-barometer': 'ChartBar',
  '@capgo/capacitor-accelerometer': 'ArrowsPointingOut',
  '@capgo/capacitor-contacts': 'UserGroup',
  '@capgo/capacitor-audio-recorder': 'Microphone',
  '@capgo/capacitor-share-target': 'Share',
  '@capgo/capacitor-realtimekit': 'VideoCamera',
  '@capgo/capacitor-pedometer': 'Signal',
  '@capgo/capacitor-fast-sql': 'CircleStack',
  '@capgo/capacitor-file-compressor': 'Photo',
  '@capgo/capacitor-speech-synthesis': 'SpeakerWave',
  '@capgo/capacitor-ssl-pinning': 'ShieldCheck',
  '@capgo/capacitor-printer': 'Printer',
  '@capgo/capacitor-proximity': 'Signal',
  '@capgo/capacitor-zip': 'ArchiveBox',
  '@capgo/capacitor-zebra-datawedge': 'QrCode',
  '@capgo/capacitor-network-diagnostics': 'Signal',
  '@capgo/capacitor-wifi': 'Wifi',
  '@capgo/capacitor-screen-orientation': 'DevicePhoneMobile',
  '@capgo/capacitor-webview-guardian': 'ShieldExclamation',
  '@capgo/capacitor-webview-crash': 'ShieldExclamation',
  '@capgo/capacitor-webview-version-checker': 'ShieldExclamation',
  '@capgo/capacitor-firebase-analytics': 'ChartBar',
  '@capgo/capacitor-firebase-app': 'Fire',
  '@capgo/capacitor-firebase-app-check': 'ShieldCheck',
  '@capgo/capacitor-firebase-authentication': 'UserCircle',
  '@capgo/capacitor-firebase-crashlytics': 'ExclamationTriangle',
  '@capgo/capacitor-firebase-firestore': 'CircleStack',
  '@capgo/capacitor-firebase-functions': 'CommandLine',
  '@capgo/capacitor-firebase-messaging': 'ChatBubbleLeft',
  '@capgo/capacitor-firebase-performance': 'RocketLaunch',
  '@capgo/capacitor-firebase-remote-config': 'Cog',
  '@capgo/capacitor-firebase-storage': 'Cloud',
  '@capacitor-plus/core': 'ArrowsRightLeft',
  '@capacitor-plus/cli': 'CommandLine',
  '@capacitor-plus/android': 'DevicePhoneMobile',
  '@capacitor-plus/ios': 'DevicePhoneMobile',
  '@capgo/capacitor-compass': 'MapPin',
  '@capgo/capacitor-file': 'Folder',
  '@capgo/capacitor-file-sharer': 'Share',
  '@capgo/capacitor-bluetooth-low-energy': 'Radio',
  '@capgo/capacitor-keep-awake': 'Sun',
  '@capgo/capacitor-in-app-review': 'Star',
  '@capgo/capacitor-file-picker': 'FolderOpen',
  '@capgo/capacitor-watch': 'Clock',
  '@capgo/capacitor-widget-kit': 'Clock',
  '@capgo/capacitor-brightness': 'Sun',
  '@capgo/capacitor-light-sensor': 'Eye',
  '@capgo/capacitor-video-thumbnails': 'Film',
  '@capgo/capacitor-intent-launcher': 'RocketLaunch',
}

const pluginNamesByCategory = {
  updates: ['@capgo/capacitor-updater', '@capgo/electron-updater', '@capgo/capacitor-android-inline-install', '@capgo/capacitor-live-reload', '@capgo/capacitor-patch'],
  'auth-security': [
    '@capgo/capacitor-native-biometric',
    '@capgo/capacitor-autofill-save-password',
    '@capgo/capacitor-social-login',
    '@capgo/capacitor-passkey',
    '@capgo/capacitor-app-attest',
    '@capgo/capacitor-is-root',
    '@capgo/capacitor-mock-location-detector',
    '@capgo/capacitor-privacy-screen',
    '@capgo/capacitor-is-root',
    '@capgo/capacitor-privacy-screen',
    '@capgo/capacitor-persistent-account',
    '@capgo/capacitor-persistent-uuid',
    '@capgo/capacitor-age-range',
    '@capgo/capacitor-persona',
    '@capgo/capacitor-intune',
    '@capgo/capacitor-android-age-signals',
    '@capgo/capacitor-ssl-pinning',
    '@capgo/capacitor-firebase-app-check',
    '@capgo/capacitor-firebase-authentication',
    '@capgo/capacitor-webview-guardian',
    '@capgo/capacitor-webview-crash',
    '@capgo/capacitor-webview-version-checker',
  ],
  analytics: [
    '@capgo/capacitor-appsflyer',
    '@capgo/capacitor-contentsquare',
    '@capgo/capacitor-facebook-analytics',
    '@capgo/capacitor-android-usagestatsmanager',
    '@capgo/capacitor-appinsights',
    '@capgo/capacitor-gtm',
    '@capgo/capacitor-rudderstack',
    '@capgo/capacitor-app-tracking-transparency',
    '@capgo/capacitor-install-referrer',
    '@capgo/capacitor-in-app-review',
    '@capgo/capacitor-firebase-analytics',
    '@capgo/capacitor-firebase-crashlytics',
    '@capgo/capacitor-firebase-performance',
  ],
  commerce: ['@capgo/capacitor-native-market', '@revenuecat/purchases-capacitor', '@capgo/native-purchases', '@capgo/capacitor-admob', '@capgo/capacitor-pay'],
  media: [
    '@capgo/camera-preview',
    '@capgo/capacitor-flash',
    '@capgo/capacitor-screen-recorder',
    '@capgo/capacitor-native-audio',
    '@capgo/ivs-player',
    '@capgo/capacitor-jw-player',
    '@capgo/capacitor-ricoh360',
    '@capgo/capacitor-audiosession',
    '@capgo/capacitor-ffmpeg',
    '@capgo/capacitor-media-session',
    '@capgo/capacitor-mux-player',
    '@capgo/capacitor-photo-library',
    '@capgo/capacitor-speech-recognition',
    '@capgo/capacitor-video-player',
    '@capgo/capacitor-youtube-player',
    '@capgo/capacitor-audio-recorder',
    '@capgo/capacitor-file-compressor',
    '@capgo/capacitor-speech-synthesis',
    '@capgo/capacitor-video-thumbnails',
  ],
  'files-storage': [
    '@capgo/capacitor-uploader',
    '@capgo/capacitor-data-storage-sqlite',
    '@capgo/capacitor-document-scanner',
    '@capgo/capacitor-downloader',
    '@capgo/capacitor-pdf-generator',
    '@capgo/capacitor-fast-sql',
    '@capgo/capacitor-printer',
    '@capgo/capacitor-zip',
    '@capgo/capacitor-firebase-firestore',
    '@capgo/capacitor-firebase-storage',
    '@capgo/capacitor-file',
    '@capgo/capacitor-file-sharer',
    '@capgo/capacitor-file-picker',
  ],
  'device-apis': [
    '@capgo/capacitor-auto',
    '@capgo/capacitor-calendar',
    '@capgo/capacitor-date-picker',
    '@capgo/capacitor-device-info',
    '@capgo/capacitor-mute',
    '@capgo/capacitor-shake',
    '@capgo/capacitor-alarm',
    '@capgo/capacitor-android-kiosk',
    '@capgo/capacitor-background-task',
    '@capgo/capacitor-health',
    '@capgo/capacitor-llm',
    '@capgo/capacitor-proximity',
    '@capgo/capacitor-sim',
    '@capgo/capacitor-nfc',
    '@capgo/capacitor-volume-buttons',
    '@capgo/capacitor-barometer',
    '@capgo/capacitor-accelerometer',
    '@capgo/capacitor-contacts',
    '@capgo/capacitor-pedometer',
    '@capgo/capacitor-bluetooth-low-energy',
    '@capgo/capacitor-keep-awake',
    '@capgo/capacitor-watch',
    '@capgo/capacitor-brightness',
    '@capgo/capacitor-light-sensor',
    '@capgo/capacitor-screen-orientation',
    '@capgo/capacitor-intent-launcher',
    '@capgo/capacitor-zebra-datawedge',
    '@capgo/capacitor-wifi',
  ],
  'ui-system': [
    '@capgo/capacitor-native-navigation',
    '@capgo/capacitor-native-loader',
    '@capgo/capacitor-transitions',
    '@capgo/capacitor-sheets',
    '@capgo/capacitor-inappbrowser',
    '@capgo/capacitor-navigation-bar',
    '@capgo/home-indicator',
    '@capgo/capacitor-textinteraction',
    '@capgo/capacitor-pretty-toast',
    '@capgo/capacitor-live-activities',
    '@capgo/capacitor-widget-kit',
    '@capgo/capacitor-background-geolocation',
    '@capgo/capacitor-mock-location-detector',
    '@capgo/capacitor-launch-navigator',
    '@capgo/capacitor-nativegeocoder',
    '@capgo/capacitor-background-geolocation',
    '@capgo/capacitor-launch-navigator',
    '@capgo/capacitor-ibeacon',
    '@capgo/capacitor-compass',
  ],
  communication: [
    '@capgo/capacitor-crisp',
    '@capgo/capacitor-intercom',
    '@capgo/capacitor-mqtt',
    '@capgo/capacitor-streamcall',
    '@capgo/capacitor-android-sms-retriever',
    '@capgo/capacitor-twilio-video',
    '@capgo/capacitor-twilio-voice',
    '@capgo/capacitor-wechat',
    '@capgo/capacitor-incoming-call-kit',
    '@capgo/capacitor-share-target',
    '@capgo/capacitor-realtimekit',
    '@capgo/capacitor-firebase-messaging',
  ],
  integrations: ['@capgo/capacitor-supabase', '@capgo/capacitor-firebase-app', '@capgo/capacitor-firebase-functions', '@capgo/capacitor-firebase-remote-config'],
  'developer-tools': [
    '@capgo/capacitor-env',
    '@capgo/capacitor-network-diagnostics',
    '@capacitor-plus/core',
    '@capacitor-plus/cli',
    '@capacitor-plus/android',
    '@capacitor-plus/ios',
  ],
} satisfies Record<PluginCategoryId, readonly string[]>

const pluginCategoriesByName = Object.fromEntries(
  Object.entries(pluginNamesByCategory).flatMap(([category, names]) => names.map((name) => [name, category as PluginCategoryId])),
) as Record<string, PluginCategoryId>

export const actions: Action[] = actionDefinitionRows.map((row) => {
  const [name, author, description, href, title] = row.split('|')
  return { name, author, description, href, title, icon: pluginIconsByName[name], category: pluginCategoriesByName[name] ?? 'device-apis' }
})

export const pluginCount = actions.length
export const pluginCountLabel = `${pluginCount}+`
