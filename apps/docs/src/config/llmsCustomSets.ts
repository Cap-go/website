const llmsCustomSetRows = String.raw`Capgo CLI|full reference documentation for capgo CLI to upload and manage your live updates|docs/cli/**
Plugin Live updates|full reference documentation for plugin live updates for Capacitor and Electron|docs/live-updates/**|docs/plugins/updater/**|docs/plugins/electron-updater/**
Console Tutorial|step-by-step tutorial to get started with Capgo Console and live updates|docs/webapp/**
Public API|full reference documentation for public API|docs/public-api/**
Plugin Accelerometer|accelerometer sensor plugin for detecting device motion and orientation|docs/plugins/accelerometer/**
Plugin AdMob|Google AdMob plugin for mobile advertising integration|docs/plugins/admob/**
Plugin Age Range|cross-platform age range detection plugin|docs/plugins/age-range/**
Plugin Age Signals|Android age signals plugin for age verification|docs/plugins/age-signals/**
Plugin Alarm|alarm and notification scheduling plugin|docs/plugins/alarm/**
Plugin Android Inline Install|Android inline app installation plugin|docs/plugins/android-inline-install/**
Plugin Android Usage Stats|Android usage statistics manager plugin|docs/plugins/android-usagestatsmanager/**
Plugin Android Kiosk|Android kiosk mode plugin for locked-down device experiences|docs/plugins/android-kiosk/**
Plugin Android SMS Retriever|Android SMS Retriever and Phone Number Hint plugin for passwordless verification flows|docs/plugins/android-sms-retriever/**
Plugin AppInsights|Microsoft Application Insights analytics plugin|docs/plugins/appinsights/**
Plugin AppsFlyer|AppsFlyer mobile attribution, analytics, and deep linking plugin|docs/plugins/appsflyer/**
Plugin App Attest|cross-platform app attestation plugin using Apple App Attest and Google Play Integrity Standard|docs/plugins/app-attest/**
Plugin App Tracking Transparency|iOS app tracking transparency permission plugin|docs/plugins/app-tracking-transparency/**
Plugin Audio Recorder|audio recording plugin for capturing microphone input|docs/plugins/audio-recorder/**
Plugin Audio Session|iOS audio session configuration plugin|docs/plugins/audiosession/**
Plugin Auto|CarPlay and Android Auto template bridge for two-way communication with Capacitor apps|docs/plugins/auto/**
Plugin Autofill Save Password|autofill and password save plugin for credential management|docs/plugins/autofill-save-password/**
Plugin Background Geolocation|background location tracking plugin|docs/plugins/background-geolocation/**
Plugin Background Task|periodic background fetch task plugin for iOS and Android|docs/plugins/background-task/**
Plugin Barometer|barometric pressure sensor plugin|docs/plugins/barometer/**
Plugin Bluetooth Low Energy|Bluetooth Low Energy (BLE) plugin for device communication|docs/plugins/bluetooth-low-energy/**
Plugin Brightness|screen brightness control plugin|docs/plugins/brightness/**
Plugin Calendar|calendar events and reminders plugin for iOS and Android|docs/plugins/calendar/**
Plugin Camera Preview|camera preview plugin for live camera feed|docs/plugins/camera-preview/**
Plugin Capacitor+|Capacitor+ enhanced runtime plugin|docs/plugins/capacitor-plus/**
Plugin Capacitor Patch|hook-only patch catalog plugin for applying Capacitor core, CLI, plugin, and native project fixes during sync and update|docs/plugins/capacitor-patch/**
Plugin Compass|digital compass plugin for device orientation|docs/plugins/compass/**
Plugin Contentsquare|Contentsquare analytics, consent gating, and session replay integration plugin|docs/plugins/contentsquare/**
Plugin Facebook Analytics|Meta/Facebook App Events analytics plugin|docs/plugins/facebook-analytics/**
Plugin Contacts|contacts access plugin for reading device contacts|docs/plugins/contacts/**
Plugin Crisp|Crisp chat integration plugin|docs/plugins/crisp/**
Plugin Data Storage SQLite|SQLite data storage plugin for local database|docs/plugins/data-storage-sqlite/**
Plugin Date Picker|native date, time, date-time, year-month, and range picker plugin for iOS, Android, and Web|docs/plugins/date-picker/**
Plugin Device Info|CPU, memory, GPU, storage, thermal, and onboard sensor metrics plugin|docs/plugins/device-info/**
Plugin Document Scanner|document scanning plugin with OCR capabilities|docs/plugins/document-scanner/**
Plugin Downloader|file download manager plugin|docs/plugins/downloader/**
Plugin Env|environment variables plugin|docs/plugins/env/**
Plugin Fast SQL|high-performance SQL database plugin|docs/plugins/fast-sql/**
Plugin FFmpeg|FFmpeg media processing plugin|docs/plugins/ffmpeg/**
Plugin File|file system access plugin|docs/plugins/file/**
Plugin File Compressor|file compression plugin|docs/plugins/file-compressor/**
Plugin File Sharer|file sharing and saving plugin for base64 data and local paths|docs/plugins/file-sharer/**
Plugin File Picker|file picker plugin for selecting files|docs/plugins/file-picker/**
Plugin Flash|device flashlight control plugin|docs/plugins/flash/**
Plugin GTM|Google Tag Manager integration plugin|docs/plugins/gtm/**
Plugin RudderStack|RudderStack analytics and identity tracking plugin|docs/plugins/rudderstack/**
Plugin Health|health data access plugin for HealthKit and Google Fit|docs/plugins/health/**
Plugin Home Indicator|iOS home indicator visibility control plugin|docs/plugins/home-indicator/**
Plugin iBeacon|iBeacon proximity detection plugin|docs/plugins/ibeacon/**
Plugin InAppBrowser|in-app browser plugin for opening web content|docs/plugins/inappbrowser/**
Plugin In App Review|in-app review prompt plugin for app store ratings|docs/plugins/in-app-review/**
Plugin Incoming Call Kit|native incoming call presentation with iOS CallKit and Android full-screen notifications|docs/plugins/incoming-call-kit/**
Plugin Install Referrer|install attribution plugin for Google Play Install Referrer and Apple AdServices|docs/plugins/install-referrer/**
Plugin Intent Launcher|Android intent launcher plugin|docs/plugins/intent-launcher/**
Plugin Intercom|Intercom customer messaging and support plugin for native in-app chat|docs/plugins/intercom/**
Plugin Is Root|root/jailbreak detection plugin|docs/plugins/is-root/**
Plugin IVS Player|Amazon IVS video player plugin|docs/plugins/ivs-player/**
Plugin JW Player|JW Player video integration plugin|docs/plugins/jw-player/**
Plugin Keep Awake|screen wake lock plugin to prevent sleep|docs/plugins/keep-awake/**
Plugin Launch Navigator|native maps navigation plugin|docs/plugins/launch-navigator/**
Plugin Light Sensor|ambient light sensor plugin|docs/plugins/light-sensor/**
Plugin Live Activities|iOS Live Activities and Dynamic Island plugin|docs/plugins/live-activities/**
Plugin Live Reload|development live reload plugin|docs/plugins/live-reload/**
Plugin LLM|on-device large language model plugin|docs/plugins/llm/**
Plugin Media Session|media session and playback controls plugin|docs/plugins/media-session/**
Plugin MQTT|MQTT publish/subscribe plugin for real-time communication|docs/plugins/mqtt/**
Plugin Mute|device mute state detection plugin|docs/plugins/mute/**
Plugin Mux Player|Mux video player integration plugin|docs/plugins/mux-player/**
Plugin Native Audio|native audio playback plugin|docs/plugins/native-audio/**
Plugin Native Biometric|biometric authentication plugin for fingerprint and face ID|docs/plugins/native-biometric/**
Plugin Native Geocoder|native geocoding plugin for address lookup|docs/plugins/nativegeocoder/**
Plugin Native Market|app store deep linking plugin|docs/plugins/native-market/**
Plugin Native Navigation|native navbar, tabbar, and transition shell plugin for Capacitor WebView apps|docs/plugins/native-navigation/**
Plugin Network Diagnostics|native network diagnostics plugin for URL reachability, TCP ports, WebSocket handshakes, speed, and packet loss checks|docs/plugins/network-diagnostics/**
Plugin Native Purchases|in-app purchases, subscriptions, paywalls, revenue playbook, and monetization plugin|docs/plugins/native-purchases/**
Plugin Navigation Bar|Android navigation bar customization plugin|docs/plugins/navigation-bar/**
Plugin NFC|NFC reading and writing plugin|docs/plugins/nfc/**
Plugin Pay|Apple Pay and Google Pay integration plugin|docs/plugins/pay/**
Plugin Passkey|browser-style WebAuthn passkey plugin that handles native calls and host patching|docs/plugins/passkey/**
Plugin Privacy Screen|privacy screen plugin for hiding app content in system previews and screenshots|docs/plugins/privacy-screen/**
Plugin Proximity|native proximity sensor plugin for face, hand, and surface detection|docs/plugins/proximity/**
Plugin PDF Generator|PDF generation plugin|docs/plugins/pdf-generator/**
Plugin Pedometer|step counting pedometer plugin|docs/plugins/pedometer/**
Plugin Persona|Persona identity verification inquiry plugin|docs/plugins/persona/**
Plugin Intune|Microsoft Intune MAM and MSAL plugin|docs/plugins/intune/**
Plugin Persistent Account|persistent account storage plugin|docs/plugins/persistent-account/**
Plugin Photo Library|photo library access plugin|docs/plugins/photo-library/**
Plugin Printer|printing plugin for documents and images|docs/plugins/printer/**
Plugin RealtimeKit|real-time communication plugin|docs/plugins/realtimekit/**
Plugin reCAPTCHA|Web reCAPTCHA, Web reCAPTCHA Enterprise, and native Enterprise mobile token plugin|docs/plugins/recaptcha/**
Plugin Verisoul|native Verisoul fraud-prevention session plugin for Capacitor apps|docs/plugins/verisoul/**
Plugin Ricoh 360 Camera|Ricoh 360 camera integration plugin|docs/plugins/ricoh360-camera/**
Plugin Screen Orientation|screen orientation control plugin|docs/plugins/screen-orientation/**
Plugin Screen Recorder|screen recording plugin|docs/plugins/screen-recorder/**
Plugin Shake|shake gesture detection plugin|docs/plugins/shake/**
Plugin Share Target|share target plugin for receiving shared content|docs/plugins/share-target/**
Plugin SIM|SIM card information plugin|docs/plugins/sim/**
Plugin Social Login|social authentication plugin for Google, Apple, Facebook login|docs/plugins/social-login/**
Plugin Speech Recognition|speech-to-text recognition plugin|docs/plugins/speech-recognition/**
Plugin Speech Synthesis|text-to-speech synthesis plugin|docs/plugins/speech-synthesis/**
Plugin SSL Pinning|certificate pinning plugin for CapacitorHttp requests|docs/plugins/ssl-pinning/**
Plugin StreamCall|Stream video calling plugin|docs/plugins/streamcall/**
Plugin Text Interaction|text selection and interaction plugin|docs/plugins/textinteraction/**
Plugin Transitions|framework-agnostic Ionic-style page transitions and iOS edge swipe-back gesture for Capacitor apps|docs/plugins/transitions/**
Plugin Twilio Video|Twilio Video room integration plugin|docs/plugins/twilio-video/**
Plugin Twilio Voice|Twilio voice calling plugin|docs/plugins/twilio-voice/**
Plugin Uploader|file upload plugin with background support|docs/plugins/uploader/**
Plugin Video Player|native video player plugin|docs/plugins/video-player/**
Plugin Video Thumbnails|video thumbnail generation plugin|docs/plugins/video-thumbnails/**
Plugin Volume Buttons|volume button event detection plugin|docs/plugins/volume-buttons/**
Plugin Watch|Apple Watch and Wear OS integration plugin|docs/plugins/watch/**
Plugin WeChat|WeChat integration plugin|docs/plugins/wechat/**
Plugin Webview Guardian|webview security and protection plugin|docs/plugins/webview-guardian/**
Plugin WebView Crash|recovered WebView crash detection plugin|docs/plugins/webview-crash/**
Plugin Webview Version Checker|Android WebView version validation plugin|docs/plugins/webview-version-checker/**
Plugin WiFi|WiFi network information plugin|docs/plugins/wifi/**
Plugin Widget Kit|WidgetKit and Live Activities template plugin|docs/plugins/widget-kit/**
Plugin Zebra DataWedge|Zebra DataWedge plugin for barcode profiles, notifications, and scan intents|docs/plugins/zebra-datawedge/**
Plugin YouTube Player|YouTube video player plugin|docs/plugins/youtube-player/**
Plugin Zip|file compression and extraction plugin|docs/plugins/zip/**
Plugin Firebase Analytics|Firebase Analytics integration plugin|docs/plugins/firebase-analytics/**
Plugin Firebase App|Firebase core app plugin|docs/plugins/firebase-app/**
Plugin Firebase App Check|Firebase App Check security plugin|docs/plugins/firebase-app-check/**
Plugin Firebase Authentication|Firebase Authentication plugin|docs/plugins/firebase-authentication/**
Plugin Firebase Crashlytics|Firebase Crashlytics crash reporting plugin|docs/plugins/firebase-crashlytics/**
Plugin Firebase Firestore|Firebase Firestore database plugin|docs/plugins/firebase-firestore/**
Plugin Firebase Functions|Firebase Cloud Functions plugin|docs/plugins/firebase-functions/**
Plugin Firebase Messaging|Firebase Cloud Messaging push notifications plugin|docs/plugins/firebase-messaging/**
Plugin Firebase Performance|Firebase Performance Monitoring plugin|docs/plugins/firebase-performance/**
Plugin Firebase Remote Config|Firebase Remote Config plugin|docs/plugins/firebase-remote-config/**
Plugin Firebase Storage|Firebase Cloud Storage plugin|docs/plugins/firebase-storage/**`
  .trim()
  .split('\n')

export const docsLlmsCustomSets = llmsCustomSetRows.map((row, index) => {
  const [label, description, ...paths] = row.split('|').map((part) => part.trim())

  if (!label || !description || paths.length === 0 || paths.some((path) => !path)) {
    throw new Error(`Invalid llms custom set row at line ${index + 1}: "${row}"`)
  }

  return { label, description, paths }
})
