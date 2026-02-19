import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { filterSitemapByDefaultLocale, i18n } from 'astro-i18n-aut/integration'
import { defineConfig, envField } from 'astro/config'
import { glob } from 'glob'
import { readFileSync, statSync } from 'node:fs'
import os from 'node:os'
import starlightImageZoom from 'starlight-image-zoom'
import starlightLlmsTxt from 'starlight-llms-txt'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import config from './configs.json'
import { defaultLocale, localeNames, locales } from './src/services/locale'

// Get CPU count for optimal parallelization
const CPU_COUNT = os.cpus().length

// Build a map of page paths to their lastmod dates for sitemap
function getPageLastModDates() {
  const lastModMap = new Map()

  // Get blog post dates from frontmatter
  const blogFiles = glob.sync('src/content/blog/**/*.md')
  for (const file of blogFiles) {
    const content = readFileSync(file, 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      const updatedAtMatch = frontmatter.match(/updated_at:\s*(.+)/)
      const slugMatch = frontmatter.match(/slug:\s*(.+)/)
      if (updatedAtMatch && slugMatch) {
        const slug = slugMatch[1].trim()
        const updatedAt = updatedAtMatch[1].trim()
        lastModMap.set(`/blog/${slug}`, new Date(updatedAt))
        lastModMap.set(`/blog/${slug}/`, new Date(updatedAt))
      }
    }
  }

  // Get static page dates from file modification time
  const pageFiles = glob.sync('src/pages/**/*.astro')
  for (const file of pageFiles) {
    const stat = statSync(file)
    // Convert file path to URL path
    let urlPath = file.replace('src/pages', '').replace('/index.astro', '/').replace('.astro', '/')
    if (!urlPath.endsWith('/')) urlPath += '/'
    if (!lastModMap.has(urlPath)) {
      lastModMap.set(urlPath, stat.mtime)
    }
  }

  return lastModMap
}

const pageLastModDates = getPageLastModDates()

const docsExpludes = locales.map((locale) => `${locale}/**`)

export default defineConfig({
  trailingSlash: 'always',
  site: `https://${config.base_domain.prod}`,
  output: 'static',
  build: {
    // Optimal concurrency based on benchmarks: CPU_COUNT is usually best
    // Too high causes memory contention, too low underutilizes cores
    concurrency: CPU_COUNT,
    // Skip HTML compression - let CDN handle it for faster builds
    compressHTML: false,
    // Inline small stylesheets for performance
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Target modern JS to reduce transpilation overhead
      target: 'es2022',
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // Use esbuild for fastest minification (or disable for even faster builds)
      minify: 'esbuild',
      // Reduce chunk fragmentation overhead
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
        // Maximize parallel file operations
        maxParallelFileOps: CPU_COUNT * 3,
      },
    },
    // Optimize dependency pre-bundling
    optimizeDeps: {
      // Force include heavy deps to pre-bundle them once
      include: ['mermaid'],
    },
  },
  env: {
    validateSecrets: true,
    schema: {
      ORAMA_CLOUD_ENDPOINT: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: '',
      }),
      ORAMA_CLOUD_API_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: '',
      }),
    },
  },
  redirects: {
    '/docs/getting-started/': {
      status: 301,
      destination: '/docs/plugins/updater/cloud-mode/getting-started/',
    },
    '/docs/plugins/updater/cloud-mode/getting-started/': {
      status: 301,
      destination: '/docs/getting-started/quickstart/',
    },
  },
  i18n: {
    locales,
    defaultLocale,
    // fallback: locales
    //   .filter((i) => i !== defaultLocale)
    //   .reduce((r, h) => {
    //     r[h] = defaultLocale
    //     return r
    //   }, {})
    routing: {
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    i18n({
      locales: localeNames,
      defaultLocale,
      redirectDefaultLocale: true,
      exclude: ['pages/**/*.json.ts'],
    }),
    sitemap({
      i18n: {
        defaultLocale,
        locales: localeNames,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Check if this URL matches a page with a known lastmod date
        const urlPath = new URL(item.url).pathname
        const lastmod = pageLastModDates.get(urlPath)
        if (lastmod) {
          item.lastmod = lastmod.toISOString()
        }
        return item
      },
    }),
    starlight({
      title: 'Capgo',
      pagefind: false,
      prerender: true,
      plugins: [
        starlightImageZoom({ showCaptions: false }),
        starlightLlmsTxt({
          projectName: 'capgo',
          description: 'Capgo is set of tools for Capacitorjs apps, plugins live app updates with cloud hosting, more than 90 plugins for any problems.',
          exclude: docsExpludes,
          customSets: [
            {
              label: 'Capgo CLI',
              description: 'full reference documentation for capgo CLI to upload and manage your live updates',
              paths: ['docs/cli/**'],
            },
            {
              label: 'Plugin Live updates',
              description: 'full reference documentation for plugin live updates for Capacitor and Electron',
              paths: ['docs/live-updates/**', 'docs/plugins/updater/**', 'docs/plugins/electron-updater/**'],
            },
            {
              label: 'Console Tutorial',
              description: 'step-by-step tutorial to get started with Capgo Console and live updates',
              paths: ['docs/webapp/**'],
            },
            {
              label: 'Public API',
              description: 'full reference documentation for public API',
              paths: ['docs/public-api/**'],
            },
            // Individual plugin documentation sets
            {
              label: 'Plugin Accelerometer',
              description: 'accelerometer sensor plugin for detecting device motion and orientation',
              paths: ['docs/plugins/accelerometer/**'],
            },
            {
              label: 'Plugin AdMob',
              description: 'Google AdMob plugin for mobile advertising integration',
              paths: ['docs/plugins/admob/**'],
            },
            {
              label: 'Plugin Age Signals',
              description: 'Android age signals plugin for age verification',
              paths: ['docs/plugins/age-signals/**'],
            },
            {
              label: 'Plugin Alarm',
              description: 'alarm and notification scheduling plugin',
              paths: ['docs/plugins/alarm/**'],
            },
            {
              label: 'Plugin Android Inline Install',
              description: 'Android inline app installation plugin',
              paths: ['docs/plugins/android-inline-install/**'],
            },
            {
              label: 'Plugin Android Usage Stats',
              description: 'Android usage statistics manager plugin',
              paths: ['docs/plugins/android-usagestatsmanager/**'],
            },
            {
              label: 'Plugin Android Kiosk',
              description: 'Android kiosk mode plugin for locked-down device experiences',
              paths: ['docs/plugins/android-kiosk/**'],
            },
            {
              label: 'Plugin AppInsights',
              description: 'Microsoft Application Insights analytics plugin',
              paths: ['docs/plugins/appinsights/**'],
            },
            {
              label: 'Plugin App Attest',
              description: 'cross-platform app attestation plugin using Apple App Attest and Google Play Integrity Standard',
              paths: ['docs/plugins/app-attest/**'],
            },
            {
              label: 'Plugin Audio Recorder',
              description: 'audio recording plugin for capturing microphone input',
              paths: ['docs/plugins/audio-recorder/**'],
            },
            {
              label: 'Plugin Audio Session',
              description: 'iOS audio session configuration plugin',
              paths: ['docs/plugins/audiosession/**'],
            },
            {
              label: 'Plugin Autofill Save Password',
              description: 'autofill and password save plugin for credential management',
              paths: ['docs/plugins/autofill-save-password/**'],
            },
            {
              label: 'Plugin Background Geolocation',
              description: 'background location tracking plugin',
              paths: ['docs/plugins/background-geolocation/**'],
            },
            {
              label: 'Plugin Barometer',
              description: 'barometric pressure sensor plugin',
              paths: ['docs/plugins/barometer/**'],
            },
            {
              label: 'Plugin Bluetooth Low Energy',
              description: 'Bluetooth Low Energy (BLE) plugin for device communication',
              paths: ['docs/plugins/bluetooth-low-energy/**'],
            },
            {
              label: 'Plugin Brightness',
              description: 'screen brightness control plugin',
              paths: ['docs/plugins/brightness/**'],
            },
            {
              label: 'Plugin Camera Preview',
              description: 'camera preview plugin for live camera feed',
              paths: ['docs/plugins/camera-preview/**'],
            },
            {
              label: 'Plugin Capacitor+',
              description: 'Capacitor+ enhanced runtime plugin',
              paths: ['docs/plugins/capacitor-plus/**'],
            },
            {
              label: 'Plugin Compass',
              description: 'digital compass plugin for device orientation',
              paths: ['docs/plugins/compass/**'],
            },
            {
              label: 'Plugin Contacts',
              description: 'contacts access plugin for reading device contacts',
              paths: ['docs/plugins/contacts/**'],
            },
            {
              label: 'Plugin Crisp',
              description: 'Crisp chat integration plugin',
              paths: ['docs/plugins/crisp/**'],
            },
            {
              label: 'Plugin Data Storage SQLite',
              description: 'SQLite data storage plugin for local database',
              paths: ['docs/plugins/data-storage-sqlite/**'],
            },
            {
              label: 'Plugin Document Scanner',
              description: 'document scanning plugin with OCR capabilities',
              paths: ['docs/plugins/document-scanner/**'],
            },
            {
              label: 'Plugin Downloader',
              description: 'file download manager plugin',
              paths: ['docs/plugins/downloader/**'],
            },
            {
              label: 'Plugin Env',
              description: 'environment variables plugin',
              paths: ['docs/plugins/env/**'],
            },
            {
              label: 'Plugin Fast SQL',
              description: 'high-performance SQL database plugin',
              paths: ['docs/plugins/fast-sql/**'],
            },
            {
              label: 'Plugin FFmpeg',
              description: 'FFmpeg media processing plugin',
              paths: ['docs/plugins/ffmpeg/**'],
            },
            {
              label: 'Plugin File',
              description: 'file system access plugin',
              paths: ['docs/plugins/file/**'],
            },
            {
              label: 'Plugin File Compressor',
              description: 'file compression plugin',
              paths: ['docs/plugins/file-compressor/**'],
            },
            {
              label: 'Plugin File Picker',
              description: 'file picker plugin for selecting files',
              paths: ['docs/plugins/file-picker/**'],
            },
            {
              label: 'Plugin Flash',
              description: 'device flashlight control plugin',
              paths: ['docs/plugins/flash/**'],
            },
            {
              label: 'Plugin GTM',
              description: 'Google Tag Manager integration plugin',
              paths: ['docs/plugins/gtm/**'],
            },
            {
              label: 'Plugin Health',
              description: 'health data access plugin for HealthKit and Google Fit',
              paths: ['docs/plugins/health/**'],
            },
            {
              label: 'Plugin Home Indicator',
              description: 'iOS home indicator visibility control plugin',
              paths: ['docs/plugins/home-indicator/**'],
            },
            {
              label: 'Plugin iBeacon',
              description: 'iBeacon proximity detection plugin',
              paths: ['docs/plugins/ibeacon/**'],
            },
            {
              label: 'Plugin InAppBrowser',
              description: 'in-app browser plugin for opening web content',
              paths: ['docs/plugins/inappbrowser/**'],
            },
            {
              label: 'Plugin In App Review',
              description: 'in-app review prompt plugin for app store ratings',
              paths: ['docs/plugins/in-app-review/**'],
            },
            {
              label: 'Plugin Intent Launcher',
              description: 'Android intent launcher plugin',
              paths: ['docs/plugins/intent-launcher/**'],
            },
            {
              label: 'Plugin Is Root',
              description: 'root/jailbreak detection plugin',
              paths: ['docs/plugins/is-root/**'],
            },
            {
              label: 'Plugin IVS Player',
              description: 'Amazon IVS video player plugin',
              paths: ['docs/plugins/ivs-player/**'],
            },
            {
              label: 'Plugin JW Player',
              description: 'JW Player video integration plugin',
              paths: ['docs/plugins/jw-player/**'],
            },
            {
              label: 'Plugin Keep Awake',
              description: 'screen wake lock plugin to prevent sleep',
              paths: ['docs/plugins/keep-awake/**'],
            },
            {
              label: 'Plugin Launch Navigator',
              description: 'native maps navigation plugin',
              paths: ['docs/plugins/launch-navigator/**'],
            },
            {
              label: 'Plugin Light Sensor',
              description: 'ambient light sensor plugin',
              paths: ['docs/plugins/light-sensor/**'],
            },
            {
              label: 'Plugin Live Reload',
              description: 'development live reload plugin',
              paths: ['docs/plugins/live-reload/**'],
            },
            {
              label: 'Plugin LLM',
              description: 'on-device large language model plugin',
              paths: ['docs/plugins/llm/**'],
            },
            {
              label: 'Plugin Media Session',
              description: 'media session and playback controls plugin',
              paths: ['docs/plugins/media-session/**'],
            },
            {
              label: 'Plugin Mute',
              description: 'device mute state detection plugin',
              paths: ['docs/plugins/mute/**'],
            },
            {
              label: 'Plugin Mux Player',
              description: 'Mux video player integration plugin',
              paths: ['docs/plugins/mux-player/**'],
            },
            {
              label: 'Plugin Native Audio',
              description: 'native audio playback plugin',
              paths: ['docs/plugins/native-audio/**'],
            },
            {
              label: 'Plugin Native Biometric',
              description: 'biometric authentication plugin for fingerprint and face ID',
              paths: ['docs/plugins/native-biometric/**'],
            },
            {
              label: 'Plugin Native Geocoder',
              description: 'native geocoding plugin for address lookup',
              paths: ['docs/plugins/nativegeocoder/**'],
            },
            {
              label: 'Plugin Native Market',
              description: 'app store deep linking plugin',
              paths: ['docs/plugins/native-market/**'],
            },
            {
              label: 'Plugin Native Purchases',
              description: 'in-app purchases and subscriptions plugin',
              paths: ['docs/plugins/native-purchases/**'],
            },
            {
              label: 'Plugin Navigation Bar',
              description: 'Android navigation bar customization plugin',
              paths: ['docs/plugins/navigation-bar/**'],
            },
            {
              label: 'Plugin NFC',
              description: 'NFC reading and writing plugin',
              paths: ['docs/plugins/nfc/**'],
            },
            {
              label: 'Plugin Pay',
              description: 'Apple Pay and Google Pay integration plugin',
              paths: ['docs/plugins/pay/**'],
            },
            {
              label: 'Plugin PDF Generator',
              description: 'PDF generation plugin',
              paths: ['docs/plugins/pdf-generator/**'],
            },
            {
              label: 'Plugin Pedometer',
              description: 'step counting pedometer plugin',
              paths: ['docs/plugins/pedometer/**'],
            },
            {
              label: 'Plugin Persistent Account',
              description: 'persistent account storage plugin',
              paths: ['docs/plugins/persistent-account/**'],
            },
            {
              label: 'Plugin Photo Library',
              description: 'photo library access plugin',
              paths: ['docs/plugins/photo-library/**'],
            },
            {
              label: 'Plugin Printer',
              description: 'printing plugin for documents and images',
              paths: ['docs/plugins/printer/**'],
            },
            {
              label: 'Plugin RealtimeKit',
              description: 'real-time communication plugin',
              paths: ['docs/plugins/realtimekit/**'],
            },
            {
              label: 'Plugin Ricoh 360 Camera',
              description: 'Ricoh 360 camera integration plugin',
              paths: ['docs/plugins/ricoh360-camera/**'],
            },
            {
              label: 'Plugin Screen Orientation',
              description: 'screen orientation control plugin',
              paths: ['docs/plugins/screen-orientation/**'],
            },
            {
              label: 'Plugin Screen Recorder',
              description: 'screen recording plugin',
              paths: ['docs/plugins/screen-recorder/**'],
            },
            {
              label: 'Plugin Shake',
              description: 'shake gesture detection plugin',
              paths: ['docs/plugins/shake/**'],
            },
            {
              label: 'Plugin Share Target',
              description: 'share target plugin for receiving shared content',
              paths: ['docs/plugins/share-target/**'],
            },
            {
              label: 'Plugin SIM',
              description: 'SIM card information plugin',
              paths: ['docs/plugins/sim/**'],
            },
            {
              label: 'Plugin Social Login',
              description: 'social authentication plugin for Google, Apple, Facebook login',
              paths: ['docs/plugins/social-login/**'],
            },
            {
              label: 'Plugin Speech Recognition',
              description: 'speech-to-text recognition plugin',
              paths: ['docs/plugins/speech-recognition/**'],
            },
            {
              label: 'Plugin Speech Synthesis',
              description: 'text-to-speech synthesis plugin',
              paths: ['docs/plugins/speech-synthesis/**'],
            },
            {
              label: 'Plugin StreamCall',
              description: 'Stream video calling plugin',
              paths: ['docs/plugins/streamcall/**'],
            },
            {
              label: 'Plugin Text Interaction',
              description: 'text selection and interaction plugin',
              paths: ['docs/plugins/textinteraction/**'],
            },
            {
              label: 'Plugin Twilio Voice',
              description: 'Twilio voice calling plugin',
              paths: ['docs/plugins/twilio-voice/**'],
            },
            {
              label: 'Plugin Uploader',
              description: 'file upload plugin with background support',
              paths: ['docs/plugins/uploader/**'],
            },
            {
              label: 'Plugin Video Player',
              description: 'native video player plugin',
              paths: ['docs/plugins/video-player/**'],
            },
            {
              label: 'Plugin Video Thumbnails',
              description: 'video thumbnail generation plugin',
              paths: ['docs/plugins/video-thumbnails/**'],
            },
            {
              label: 'Plugin Volume Buttons',
              description: 'volume button event detection plugin',
              paths: ['docs/plugins/volume-buttons/**'],
            },
            {
              label: 'Plugin Watch',
              description: 'Apple Watch and Wear OS integration plugin',
              paths: ['docs/plugins/watch/**'],
            },
            {
              label: 'Plugin WeChat',
              description: 'WeChat integration plugin',
              paths: ['docs/plugins/wechat/**'],
            },
            {
              label: 'Plugin Webview Guardian',
              description: 'webview security and protection plugin',
              paths: ['docs/plugins/webview-guardian/**'],
            },
            {
              label: 'Plugin Webview Version Checker',
              description: 'Android WebView version validation plugin',
              paths: ['docs/plugins/webview-version-checker/**'],
            },
            {
              label: 'Plugin WiFi',
              description: 'WiFi network information plugin',
              paths: ['docs/plugins/wifi/**'],
            },
            {
              label: 'Plugin YouTube Player',
              description: 'YouTube video player plugin',
              paths: ['docs/plugins/youtube-player/**'],
            },
            {
              label: 'Plugin Zip',
              description: 'file compression and extraction plugin',
              paths: ['docs/plugins/zip/**'],
            },
            // Firebase plugins
            {
              label: 'Plugin Firebase Analytics',
              description: 'Firebase Analytics integration plugin',
              paths: ['docs/plugins/firebase-analytics/**'],
            },
            {
              label: 'Plugin Firebase App',
              description: 'Firebase core app plugin',
              paths: ['docs/plugins/firebase-app/**'],
            },
            {
              label: 'Plugin Firebase App Check',
              description: 'Firebase App Check security plugin',
              paths: ['docs/plugins/firebase-app-check/**'],
            },
            {
              label: 'Plugin Firebase Authentication',
              description: 'Firebase Authentication plugin',
              paths: ['docs/plugins/firebase-authentication/**'],
            },
            {
              label: 'Plugin Firebase Crashlytics',
              description: 'Firebase Crashlytics crash reporting plugin',
              paths: ['docs/plugins/firebase-crashlytics/**'],
            },
            {
              label: 'Plugin Firebase Firestore',
              description: 'Firebase Firestore database plugin',
              paths: ['docs/plugins/firebase-firestore/**'],
            },
            {
              label: 'Plugin Firebase Functions',
              description: 'Firebase Cloud Functions plugin',
              paths: ['docs/plugins/firebase-functions/**'],
            },
            {
              label: 'Plugin Firebase Messaging',
              description: 'Firebase Cloud Messaging push notifications plugin',
              paths: ['docs/plugins/firebase-messaging/**'],
            },
            {
              label: 'Plugin Firebase Performance',
              description: 'Firebase Performance Monitoring plugin',
              paths: ['docs/plugins/firebase-performance/**'],
            },
            {
              label: 'Plugin Firebase Remote Config',
              description: 'Firebase Remote Config plugin',
              paths: ['docs/plugins/firebase-remote-config/**'],
            },
            {
              label: 'Plugin Firebase Storage',
              description: 'Firebase Cloud Storage plugin',
              paths: ['docs/plugins/firebase-storage/**'],
            },
          ],
        }),
      ],
      disable404Route: true,
      logo: {
        src: '~public/capgo_logo.webp',
        alt: 'Capgo - Live Updates for Capacitor Apps',
        replacesTitle: true,
      },
      markdown: { headingLinks: true },
      customCss: ['./src/css/docs.css'],
      expressiveCode: { themes: ['github-dark'] },
      editLink: { baseUrl: 'https://github.com/Cap-go/website/edit/main/' },
      components: {
        Head: './src/components/doc/Head.astro',
        Search: './src/components/doc/Search.astro',
        LanguageSelect: './src/components/doc/LanguageSelect.astro',
        PageTitle: './src/components/doc/PageTitle.astro',
      },
      social: [
        { icon: 'discord', label: 'Discord', href: 'https://discord.capgo.app' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Cap-go/' },
      ],
      sidebar: [
        {
          label: 'Welcome to Capgo',
          link: '/docs/',
        },
        {
          label: 'Quickstart',
          collapsed: false,
          autogenerate: { directory: 'docs/getting-started' },
        },
        {
          label: 'Capgo CLI',
          collapsed: true,
          items: [
            { label: 'Overview', link: '/docs/cli/overview' },
            {
              label: 'Command reference',
              collapsed: false,
              autogenerate: { directory: 'docs/cli/reference' },
            },
            {
              label: 'Cloud Build',
              collapsed: false,
              autogenerate: { directory: 'docs/cli/cloud-build' },
            },
            {
              label: 'Migrations',
              collapsed: true,
              autogenerate: { directory: 'docs/cli/migrations' },
            },
          ],
        },
        {
          label: 'Live Updates',
          collapsed: true,
          autogenerate: { directory: 'docs/live-updates' },
        },
        {
          label: 'Public API',
          collapsed: true,
          autogenerate: { directory: 'docs/public-api' },
        },
        {
          label: 'Plugins',
          collapsed: true,
          items: [
            { label: 'Getting Started', link: '/docs/plugins/' },
            {
              label: 'Updater',
              collapsed: true,
              items: [
                { label: 'Getting Started', link: '/docs/plugins/updater' },
                { label: 'Events', link: '/docs/plugins/updater/events' },
                { label: 'API Reference', link: '/docs/plugins/updater/api' },
                { label: 'Configuration', link: '/docs/plugins/updater/settings' },
                { label: 'notifyAppReady call placement', link: '/docs/plugins/updater/notify-app-ready' },
                { label: 'Known Issues', link: '/docs/plugins/updater/known-issues' },
                { label: 'Debugging', link: '/docs/plugins/updater/debugging' },
                { label: 'Cordova Migration', link: '/docs/plugins/updater/cordova' },
                {
                  label: 'Local Development',
                  collapsed: true,
                  autogenerate: { directory: '/docs/plugins/updater/local-dev' },
                },
                {
                  label: 'Self-Hosting',
                  items: [
                    { label: 'Getting Started', link: '/docs/plugins/updater/self-hosted/getting-started' },
                    { label: 'Auto Update', link: '/docs/plugins/updater/self-hosted/auto-update' },
                    { label: 'Manual Update', link: '/docs/plugins/updater/self-hosted/manual-update' },
                    { label: 'Encrypted Bundles', link: '/docs/plugins/updater/self-hosted/encrypted-bundles' },
                    { label: 'Update API Endpoint', link: '/docs/plugins/updater/self-hosted/handling-updates' },
                    { label: 'Statistics API Endpoint', link: '/docs/plugins/updater/self-hosted/handling-stats' },
                    { label: 'Channel API Endpoint', link: '/docs/plugins/updater/self-hosted/handling-channels' },
                  ],
                  collapsed: true,
                },
                {
                  label: 'Migrations',
                  collapsed: true,
                  autogenerate: { directory: 'docs/upgrade' },
                },
              ],
            },

            {
              label: 'Accelerometer',
              items: [
                { label: 'Overview', link: '/docs/plugins/accelerometer/' },
                { label: 'Getting started', link: '/docs/plugins/accelerometer/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'AdMob',
              items: [
                { label: 'Overview', link: '/docs/plugins/admob/' },
                { label: 'Getting started', link: '/docs/plugins/admob/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Age Signals',
              items: [
                { label: 'Overview', link: '/docs/plugins/age-signals/' },
                { label: 'Getting started', link: '/docs/plugins/age-signals/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Alarm',
              items: [
                { label: 'Overview', link: '/docs/plugins/alarm/' },
                { label: 'Getting started', link: '/docs/plugins/alarm/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Android Inline Install',
              items: [
                { label: 'Overview', link: '/docs/plugins/android-inline-install/' },
                { label: 'Getting started', link: '/docs/plugins/android-inline-install/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Android Usage Stats',
              items: [
                { label: 'Overview', link: '/docs/plugins/android-usagestatsmanager/' },
                { label: 'Getting started', link: '/docs/plugins/android-usagestatsmanager/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Android Kiosk',
              items: [
                { label: 'Overview', link: '/docs/plugins/android-kiosk/' },
                { label: 'Getting started', link: '/docs/plugins/android-kiosk/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'AppInsights',
              items: [
                { label: 'Overview', link: '/docs/plugins/appinsights/' },
                { label: 'Getting started', link: '/docs/plugins/appinsights/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'App Attest',
              items: [
                { label: 'Overview', link: '/docs/plugins/app-attest/' },
                { label: 'Getting started', link: '/docs/plugins/app-attest/getting-started' },
                { label: 'iOS setup', link: '/docs/plugins/app-attest/ios' },
                { label: 'Android setup', link: '/docs/plugins/app-attest/android' },
              ],
              collapsed: true,
            },
            {
              label: 'Audio Recorder',
              items: [
                { label: 'Overview', link: '/docs/plugins/audio-recorder/' },
                { label: 'Getting started', link: '/docs/plugins/audio-recorder/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Audio Session',
              items: [
                { label: 'Overview', link: '/docs/plugins/audiosession/' },
                { label: 'Getting started', link: '/docs/plugins/audiosession/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Autofill Save Password',
              items: [
                { label: 'Overview', link: '/docs/plugins/autofill-save-password/' },
                { label: 'Getting started', link: '/docs/plugins/autofill-save-password/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Background Geolocation',
              items: [
                { label: 'Overview', link: '/docs/plugins/background-geolocation/' },
                { label: 'Getting started', link: '/docs/plugins/background-geolocation/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Barometer',
              items: [
                { label: 'Overview', link: '/docs/plugins/barometer/' },
                { label: 'Getting started', link: '/docs/plugins/barometer/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Camera Preview',
              items: [
                { label: 'Overview', link: '/docs/plugins/camera-preview/' },
                { label: 'Getting started', link: '/docs/plugins/camera-preview/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Capacitor+',
              items: [
                { label: 'Overview', link: '/docs/plugins/capacitor-plus/' },
                { label: 'Getting started', link: '/docs/plugins/capacitor-plus/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Compass',
              items: [
                { label: 'Overview', link: '/docs/plugins/compass/' },
                { label: 'Getting started', link: '/docs/plugins/compass/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Contacts',
              items: [
                { label: 'Overview', link: '/docs/plugins/contacts/' },
                { label: 'Getting started', link: '/docs/plugins/contacts/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Crisp',
              items: [
                { label: 'Overview', link: '/docs/plugins/crisp/' },
                { label: 'Getting started', link: '/docs/plugins/crisp/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Data Storage SQLite',
              items: [
                { label: 'Overview', link: '/docs/plugins/data-storage-sqlite/' },
                { label: 'Getting started', link: '/docs/plugins/data-storage-sqlite/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Document Scanner',
              items: [
                { label: 'Overview', link: '/docs/plugins/document-scanner/' },
                { label: 'Getting started', link: '/docs/plugins/document-scanner/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Downloader',
              items: [
                { label: 'Overview', link: '/docs/plugins/downloader/' },
                { label: 'Getting started', link: '/docs/plugins/downloader/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Env',
              items: [
                { label: 'Overview', link: '/docs/plugins/env/' },
                { label: 'Getting started', link: '/docs/plugins/env/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Fast SQL',
              items: [
                { label: 'Overview', link: '/docs/plugins/fast-sql/' },
                { label: 'Getting started', link: '/docs/plugins/fast-sql/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'FFmpeg',
              items: [
                { label: 'Overview', link: '/docs/plugins/ffmpeg/' },
                { label: 'Getting started', link: '/docs/plugins/ffmpeg/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'File',
              items: [
                { label: 'Overview', link: '/docs/plugins/file/' },
                { label: 'Getting started', link: '/docs/plugins/file/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'File Compressor',
              items: [
                { label: 'Overview', link: '/docs/plugins/file-compressor/' },
                { label: 'Getting started', link: '/docs/plugins/file-compressor/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Flash',
              items: [
                { label: 'Overview', link: '/docs/plugins/flash/' },
                { label: 'Getting started', link: '/docs/plugins/flash/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'GTM',
              items: [
                { label: 'Overview', link: '/docs/plugins/gtm/' },
                { label: 'Getting started', link: '/docs/plugins/gtm/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Health',
              items: [
                { label: 'Overview', link: '/docs/plugins/health/' },
                { label: 'Getting started', link: '/docs/plugins/health/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Home Indicator',
              items: [
                { label: 'Overview', link: '/docs/plugins/home-indicator/' },
                { label: 'Getting started', link: '/docs/plugins/home-indicator/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'iBeacon',
              items: [
                { label: 'Overview', link: '/docs/plugins/ibeacon/' },
                { label: 'Getting started', link: '/docs/plugins/ibeacon/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'InAppBrowser',
              items: [
                { label: 'Overview', link: '/docs/plugins/inappbrowser/' },
                { label: 'Getting started', link: '/docs/plugins/inappbrowser/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Is Root',
              items: [
                { label: 'Overview', link: '/docs/plugins/is-root/' },
                { label: 'Getting started', link: '/docs/plugins/is-root/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'IVS Player',
              items: [
                { label: 'Overview', link: '/docs/plugins/ivs-player/' },
                { label: 'Getting started', link: '/docs/plugins/ivs-player/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'JW Player',
              items: [
                { label: 'Overview', link: '/docs/plugins/jw-player/' },
                { label: 'Getting started', link: '/docs/plugins/jw-player/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Launch Navigator',
              items: [
                { label: 'Overview', link: '/docs/plugins/launch-navigator/' },
                { label: 'Getting started', link: '/docs/plugins/launch-navigator/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Live Reload',
              items: [
                { label: 'Overview', link: '/docs/plugins/live-reload/' },
                { label: 'Getting started', link: '/docs/plugins/live-reload/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'LLM',
              items: [
                { label: 'Overview', link: '/docs/plugins/llm/' },
                { label: 'Getting started', link: '/docs/plugins/llm/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Media Session',
              items: [
                { label: 'Overview', link: '/docs/plugins/media-session/' },
                { label: 'Getting started', link: '/docs/plugins/media-session/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Mute',
              items: [
                { label: 'Overview', link: '/docs/plugins/mute/' },
                { label: 'Getting started', link: '/docs/plugins/mute/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Mux Player',
              items: [
                { label: 'Overview', link: '/docs/plugins/mux-player/' },
                { label: 'Getting started', link: '/docs/plugins/mux-player/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Native Audio',
              items: [
                { label: 'Overview', link: '/docs/plugins/native-audio/' },
                { label: 'Getting started', link: '/docs/plugins/native-audio/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Native Biometric',
              items: [
                { label: 'Overview', link: '/docs/plugins/native-biometric/' },
                { label: 'Getting started', link: '/docs/plugins/native-biometric/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Native Geocoder',
              items: [
                { label: 'Overview', link: '/docs/plugins/nativegeocoder/' },
                { label: 'Getting started', link: '/docs/plugins/nativegeocoder/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Native Market',
              items: [
                { label: 'Overview', link: '/docs/plugins/native-market/' },
                { label: 'Getting started', link: '/docs/plugins/native-market/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Native Purchases',
              items: [
                { label: 'Overview', link: '/docs/plugins/native-purchases/' },
                { label: 'Getting started', link: '/docs/plugins/native-purchases/getting-started' },
                {
                  label: 'Android Setup',
                  items: [
                    { label: 'Sandbox Testing', link: '/docs/plugins/native-purchases/android-sandbox-testing' },
                    { label: 'Create Subscription', link: '/docs/plugins/native-purchases/android-create-subscription' },
                    { label: 'Introductory Offers', link: '/docs/plugins/native-purchases/android-introductory-offer' },
                    { label: 'Play Store Review', link: '/docs/plugins/native-purchases/android-play-store-review' },
                  ],
                },
                {
                  label: 'iOS Setup',
                  items: [
                    { label: 'Sandbox Testing', link: '/docs/plugins/native-purchases/ios-sandbox-testing' },
                    { label: 'Subscription Groups', link: '/docs/plugins/native-purchases/ios-subscription-group' },
                    { label: 'Create Subscription', link: '/docs/plugins/native-purchases/ios-create-subscription' },
                    { label: 'Introductory Offers', link: '/docs/plugins/native-purchases/ios-introductory-offer' },
                    { label: 'App Store Review', link: '/docs/plugins/native-purchases/ios-app-store-review' },
                  ],
                },
              ],
              collapsed: true,
            },
            {
              label: 'Navigation Bar',
              items: [
                { label: 'Overview', link: '/docs/plugins/navigation-bar/' },
                { label: 'Getting started', link: '/docs/plugins/navigation-bar/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'NFC',
              items: [
                { label: 'Overview', link: '/docs/plugins/nfc/' },
                { label: 'Getting started', link: '/docs/plugins/nfc/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Pay',
              items: [
                { label: 'Overview', link: '/docs/plugins/pay/' },
                { label: 'Getting started', link: '/docs/plugins/pay/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'PDF Generator',
              items: [
                { label: 'Overview', link: '/docs/plugins/pdf-generator/' },
                { label: 'Getting started', link: '/docs/plugins/pdf-generator/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Pedometer',
              items: [
                { label: 'Overview', link: '/docs/plugins/pedometer/' },
                { label: 'Getting started', link: '/docs/plugins/pedometer/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Persistent Account',
              items: [
                { label: 'Overview', link: '/docs/plugins/persistent-account/' },
                { label: 'Getting started', link: '/docs/plugins/persistent-account/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Photo Library',
              items: [
                { label: 'Overview', link: '/docs/plugins/photo-library/' },
                { label: 'Getting started', link: '/docs/plugins/photo-library/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Printer',
              items: [
                { label: 'Overview', link: '/docs/plugins/printer/' },
                { label: 'Getting started', link: '/docs/plugins/printer/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'RealtimeKit',
              items: [
                { label: 'Overview', link: '/docs/plugins/realtimekit/' },
                { label: 'Getting started', link: '/docs/plugins/realtimekit/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Ricoh 360 Camera',
              items: [
                { label: 'Overview', link: '/docs/plugins/ricoh360-camera/' },
                { label: 'Getting started', link: '/docs/plugins/ricoh360-camera/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Screen Orientation',
              items: [
                { label: 'Overview', link: '/docs/plugins/screen-orientation/' },
                { label: 'Getting started', link: '/docs/plugins/screen-orientation/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Screen Recorder',
              items: [
                { label: 'Overview', link: '/docs/plugins/screen-recorder/' },
                { label: 'Getting started', link: '/docs/plugins/screen-recorder/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Shake',
              items: [
                { label: 'Overview', link: '/docs/plugins/shake/' },
                { label: 'Getting started', link: '/docs/plugins/shake/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Share Target',
              items: [
                { label: 'Overview', link: '/docs/plugins/share-target/' },
                { label: 'Getting started', link: '/docs/plugins/share-target/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'SIM',
              items: [
                { label: 'Overview', link: '/docs/plugins/sim/' },
                { label: 'Getting started', link: '/docs/plugins/sim/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Speech Recognition',
              items: [
                { label: 'Overview', link: '/docs/plugins/speech-recognition/' },
                { label: 'Getting started', link: '/docs/plugins/speech-recognition/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Speech Synthesis',
              items: [
                { label: 'Overview', link: '/docs/plugins/speech-synthesis/' },
                { label: 'Getting started', link: '/docs/plugins/speech-synthesis/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Social Login',
              items: [
                { label: 'Overview', link: '/docs/plugins/social-login/' },
                { label: 'Getting started', link: '/docs/plugins/social-login/getting-started' },
                { label: 'Google', autogenerate: { directory: 'docs/plugins/social-login/google' } },
                { label: 'Apple', autogenerate: { directory: 'docs/plugins/social-login/apple' } },
                { label: 'Facebook', link: '/docs/plugins/social-login/facebook' },
                { label: 'Firebase', autogenerate: { directory: 'docs/plugins/social-login/firebase' } },
                {
                  label: 'Supabase',
                  items: [
                    { label: 'Introduction', link: '/docs/plugins/social-login/supabase/introduction' },
                    {
                      label: 'Google',
                      autogenerate: { directory: 'docs/plugins/social-login/supabase/google' },
                    },
                    {
                      label: 'Apple',
                      items: [
                        { label: 'Supabase Apple Login - General Setup', link: '/docs/plugins/social-login/supabase/apple/general' },
                        { label: 'Supabase Apple Login on iOS Setup', link: '/docs/plugins/social-login/supabase/apple/ios' },
                        { label: 'Supabase Apple Login on Android Setup', link: '/docs/plugins/social-login/supabase/apple/android' },
                        { label: 'Supabase Apple Login on Web Setup', link: '/docs/plugins/social-login/supabase/apple/web' },
                      ],
                    },
                  ],
                },
                { label: 'Migrations', autogenerate: { directory: 'docs/plugins/social-login/migrations' } },
              ],
              collapsed: true,
            },
            {
              label: 'StreamCall',
              items: [
                { label: 'Overview', link: '/docs/plugins/streamcall/' },
                { label: 'Getting started', link: '/docs/plugins/streamcall/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Text Interaction',
              items: [
                { label: 'Overview', link: '/docs/plugins/textinteraction/' },
                { label: 'Getting started', link: '/docs/plugins/textinteraction/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Twilio Voice',
              items: [
                { label: 'Overview', link: '/docs/plugins/twilio-voice/' },
                { label: 'Getting started', link: '/docs/plugins/twilio-voice/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Uploader',
              items: [
                { label: 'Overview', link: '/docs/plugins/uploader/' },
                { label: 'Getting started', link: '/docs/plugins/uploader/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Video Player',
              items: [
                { label: 'Overview', link: '/docs/plugins/video-player/' },
                { label: 'Getting started', link: '/docs/plugins/video-player/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Volume Buttons',
              items: [
                { label: 'Overview', link: '/docs/plugins/volume-buttons/' },
                { label: 'Getting started', link: '/docs/plugins/volume-buttons/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'WeChat',
              items: [
                { label: 'Overview', link: '/docs/plugins/wechat/' },
                { label: 'Getting started', link: '/docs/plugins/wechat/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'WebView Version Checker',
              items: [
                { label: 'Overview', link: '/docs/plugins/webview-version-checker/' },
                { label: 'Getting started', link: '/docs/plugins/webview-version-checker/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'WiFi',
              items: [
                { label: 'Overview', link: '/docs/plugins/wifi/' },
                { label: 'Getting started', link: '/docs/plugins/wifi/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'YouTube Player',
              items: [
                { label: 'Overview', link: '/docs/plugins/youtube-player/' },
                { label: 'Getting started', link: '/docs/plugins/youtube-player/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Zip',
              items: [
                { label: 'Overview', link: '/docs/plugins/zip/' },
                { label: 'Getting started', link: '/docs/plugins/zip/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: '👋 Get a custom plugin',
              link: '/consulting/',
            },
          ],
        },
        {
          label: 'Console',
          collapsed: true,
          autogenerate: { directory: 'docs/webapp' },
        },
        {
          label: 'How To',
          link: '/docs/how-to/',
        },
        {
          label: 'FAQ',
          link: '/docs/faq/',
        },
        {
          label: 'How to get support',
          link: '/docs/getting-help/',
        },
        {
          label: '💬 Consult us',
          link: '/consulting/',
        },
        {
          label: 'LLMs-full.txt',
          link: 'https://capgo.app/llms-full.txt',
        },
      ],
    }),
  ],
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
  },
  preview: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
  },
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        outdir: './src/paraglide',
        project: './project.inlang',
        disableAsyncLocalStorage: true,
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/content/docs/**/*.{md,mdx}',
            dest: '',
            rename: (fileName, _, fullPath) => {
              // Extract relative path after 'src/content/docs/'
              const relativePath = fullPath.replace(/\\/g, '/').split('src/content/docs/')[1]
              const pathWithoutExt = relativePath.replace(/\.(md|mdx)$/, '')
              const segments = pathWithoutExt.split('/')

              // Handle index files
              if (fileName === 'index') {
                if (segments.length === 1) {
                  return 'index.md'
                }
                // Remove 'index' from the end and use parent folder name
                segments.pop()
                return `${segments.join('/')}.md`
              }

              // Regular files - preserve directory structure
              return `${pathWithoutExt}.md`
            },
          },
        ],
      }),
    ],
  },
})
