import { trackAICrawlerResponse } from '@datafast/ai-crawl'

interface Env {
  ASSETS: {
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  }
  DATAFAST_AI_CRAWL_WEBSITE_ID?: string
}

type RedirectStatus = 301 | 302
type RedirectDefinition = {
  destination: string
  status: RedirectStatus
}
type RedirectRow = readonly [source: string, destination: string, status: RedirectStatus]

const redirectRows: RedirectRow[] = [
  ['/docs/getting-started/', '/docs/getting-started/quickstart/', 301],
  ['/docs/plugins/updater/cloud-mode/getting-started/', '/docs/getting-started/quickstart/', 301],
  ['/docs/plugins/updater/commonProblems/', '/docs/plugins/updater/commonproblems/', 301],
  ['/docs/cli/', '/docs/cli/overview/', 302],
  ['/docs/cli/reference/', '/docs/cli/commands/', 302],
  ['/docs/cli/commands/build/', '/docs/cli/reference/build/', 302],
  ['/docs/tooling/cli/', '/docs/cli/overview/', 302],
  ['/docs/plugin/cloud-mode/getting-started/', '/docs/getting-started/quickstart/', 302],
  ['/docs/plugin/cloud-mode/auto-update', '/docs/getting-started/add-an-app/', 302],
  ['/docs/plugin/cloud-mode/auto-update/', '/docs/getting-started/add-an-app/', 302],
  ['/docs/plugin/cloud-mode/manual-update', '/docs/getting-started/deploy/', 302],
  ['/docs/plugin/cloud-mode/manual-update/', '/docs/getting-started/deploy/', 302],
  ['/docs/plugin/cloud-mode/channel-system', '/docs/live-updates/channels/', 302],
  ['/docs/plugin/cloud-mode/channel-system/', '/docs/live-updates/channels/', 302],
  ['/docs/plugin/cloud-mode/hybrid-update', '/docs/live-updates/differentials/', 302],
  ['/docs/plugin/cloud-mode/hybrid-update/', '/docs/live-updates/differentials/', 302],
  ['/docs/plugin/cloud-mode/authentication', '/security/', 302],
  ['/docs/plugin/cloud-mode/authentication/', '/security/', 302],
  ['/docs/plugin/debugging', '/docs/plugins/updater/debugging/', 302],
  ['/docs/plugin/debugging/', '/docs/plugins/updater/debugging/', 302],
  ['/docs/plugin/settings', '/docs/plugins/updater/settings/', 302],
  ['/docs/plugin/settings/', '/docs/plugins/updater/settings/', 302],
  ['/docs/plugin/auto-update', '/docs/plugins/updater/settings/', 302],
  ['/docs/plugin/know-issues', '/docs/plugins/updater/known-issues/', 302],
  ['/docs/plugin/know-issues/', '/docs/plugins/updater/known-issues/', 302],
  ['/docs/plugin/self-hosted/getting-started', '/docs/plugins/updater/self-hosted/getting-started/', 302],
  ['/docs/plugin/self-hosted/getting-started/', '/docs/plugins/updater/self-hosted/getting-started/', 302],
  ['/docs/plugin/self-hosted/auto-update/', '/docs/plugins/updater/self-hosted/auto-update/', 302],
  ['/docs/plugin/self-hosted/auto-update', '/docs/plugins/updater/self-hosted/auto-update/', 302],
  ['/docs/plugin/self-hosted/manual-update/', '/docs/plugins/updater/self-hosted/manual-update/', 302],
  ['/docs/plugin/self-hosted/encrypted-bundles/', '/docs/plugins/updater/self-hosted/encrypted-bundles/', 302],
  ['/docs/plugin/self-hosted/handling-updates/', '/docs/plugins/updater/self-hosted/handling-updates/', 302],
  ['/docs/plugin/self-hosted/local-dev/getting-started/', '/docs/plugins/updater/local-dev/getting-started/', 302],
  ['/docs/plugin/self-hosted/contributing/', '/docs/plugins/updater/local-dev/contributing/', 302],
  ['/docs/self-hosted/auto-update/update-endpoint', '/docs/plugins/updater/self-hosted/handling-updates/', 302],
  ['/docs/self-hosted/auto-update/update-endpoint/', '/docs/plugins/updater/self-hosted/handling-updates/', 302],
  ['/docs/self-hosted/auto-update', '/docs/plugins/updater/self-hosted/auto-update/', 302],
  ['/docs/self-hosted/auto-update/', '/docs/plugins/updater/self-hosted/auto-update/', 302],
  ['/docs/self-hosted/getting-started/', '/docs/plugins/updater/self-hosted/getting-started/', 302],
  ['/docs/self-hosted/local-dev/getting-started/', '/docs/plugins/updater/local-dev/getting-started/', 302],
  ['/docs/self-hosted/local-dev/cli/', '/docs/plugins/updater/local-dev/cli/', 302],
  ['/docs/upgrade/encryption-v1-to-v2/', '/docs/cli/migrations/encryption/', 302],
  ['/docs/plugins/electron-updater/migration/', '/docs/plugins/electron-updater/getting-started/', 302],
  ['/docs/plugins/updater/auto-update', '/docs/plugins/updater/notify-app-ready/', 302],
  ['/docs/plugins/capacitor-camera-preview/', '/docs/plugins/camera-preview/', 302],
  ['/docs/plugins/capacitor-home-indicator/', '/docs/plugins/home-indicator/', 302],
  ['/docs/plugins/capacitor-ivs-player/', '/docs/plugins/ivs-player/', 302],
  ['/docs/plugins/capacitor-native-audio/', '/docs/plugins/native-audio/', 302],
  ['/docs/plugins/capacitor-native-market/', '/docs/plugins/native-market/', 302],
  ['/docs/plugins/capacitor-native-purchases/', '/docs/plugins/native-purchases/', 302],
  ['/docs/cloud/native-builds/certificates/android/', '/docs/builder/android/', 302],
  ['/docs/cloud/native-builds/certificates/ios/', '/docs/builder/ios/', 302],
  ['/docs/CLI/Referencia/Aplicaci%C3%B3n/', '/docs/cli/reference/app/', 302],
  ['/docs/CLI/Referencia/Canal/', '/docs/cli/reference/channel/', 302],
  ['/docs/CLI/Referencia/Paquete/', '/docs/cli/reference/bundle/', 302],
  ['/docs/CLI/Referencia/doctor/', '/docs/cli/reference/doctor/', 302],
  ['/docs/CLI/Referencia/init/', '/docs/cli/reference/init/', 302],
  ['/docs/CLI/Referencia/key/', '/docs/cli/reference/key/', 302],
  ['/docs/getting-started/Agregar-an-Aplicaci%C3%B3n/', '/docs/getting-started/add-an-app/', 302],
  ['/docs/getting-started/Desplegar/', '/docs/getting-started/deploy/', 302],
  ['/docs/getting-started/Soluci%C3%B3n%20de%20problemas/', '/docs/getting-started/troubleshooting/', 302],
  ['/docs/getting-started/cicd-Integraci%C3%B3n/', '/docs/getting-started/cicd-integration/', 302],
  ['/docs/live-Actualizaciones/', '/docs/live-updates/', 302],
  ['/docs/live-Actualizaciones/Actualizar-behavior/', '/docs/live-updates/update-behavior/', 302],
  ['/docs/live-Actualizaciones/Canales/', '/docs/live-updates/channels/', 302],
  ['/docs/live-Actualizaciones/Reversiones/', '/docs/live-updates/rollbacks/', 302],
  ['/docs/live-Actualizaciones/differentials/', '/docs/live-updates/differentials/', 302],
  ['/docs/live-Actualizaciones/Integraciones/Azure-devops/', '/docs/live-updates/integrations/azure-devops/', 302],
  ['/docs/live-Actualizaciones/Integraciones/Bitbucket-pipeline/', '/docs/live-updates/integrations/bitbucket-pipeline/', 302],
  ['/docs/live-Actualizaciones/Integraciones/GitHub-actions/', '/docs/live-updates/integrations/github-actions/', 302],
  ['/docs/live-Actualizaciones/Integraciones/GitLab-ci/', '/docs/live-updates/integrations/gitlab-ci/', 302],
  ['/docs/Plugin/self-hosted/auto-Actualizar/', '/docs/plugins/updater/self-hosted/auto-update/', 302],
  ['/docs/Plugin/self-hosted/Contribuyendo/', '/docs/plugins/updater/local-dev/contributing/', 302],
  ['/docs/Plugin/self-hosted/handling-Actualizaciones/', '/docs/plugins/updater/self-hosted/handling-updates/', 302],
  ['/docs/Plugin/self-hosted/manual-Actualizar/', '/docs/plugins/updater/self-hosted/manual-update/', 302],
  ['/docs/Plugins/Capacitor-camera-preview/', '/docs/plugins/camera-preview/', 302],
  ['/docs/Plugins/Capacitor-home-indicator/', '/docs/plugins/home-indicator/', 302],
  ['/docs/Plugins/Capacitor-ivs-player/', '/docs/plugins/ivs-player/', 302],
  ['/docs/Plugins/Capacitor-native-audio/', '/docs/plugins/native-audio/', 302],
  ['/docs/Plugins/Capacitor-native-market/', '/docs/plugins/native-market/', 302],
  ['/docs/Plugins/Capacitor-native-purchases/', '/docs/plugins/native-purchases/', 302],
  ['/docs/Plugins/accelerometer/', '/docs/plugins/accelerometer/', 302],
  ['/docs/Plugins/age-signals/', '/docs/plugins/age-signals/', 302],
  ['/docs/Plugins/alarm/', '/docs/plugins/alarm/', 302],
  ['/docs/Plugins/android-inline-Instalar/', '/docs/plugins/android-inline-install/', 302],
  ['/docs/Plugins/android-kiosk/', '/docs/plugins/android-kiosk/', 302],
  ['/docs/Plugins/android-usagestatsmanager/', '/docs/plugins/android-usagestatsmanager/', 302],
  ['/docs/Plugins/appinsights/', '/docs/plugins/appinsights/', 302],
  ['/docs/Plugins/audio-recorder/', '/docs/plugins/audio-recorder/', 302],
  ['/docs/Plugins/autofill-Guardar-password/', '/docs/plugins/autofill-save-password/', 302],
  ['/docs/Plugins/background-geolocation/', '/docs/plugins/background-geolocation/', 302],
  ['/docs/Plugins/barometer/', '/docs/plugins/barometer/', 302],
  ['/docs/Plugins/contacts/', '/docs/plugins/contacts/', 302],
  ['/docs/Plugins/crisp/', '/docs/plugins/crisp/', 302],
  ['/docs/Plugins/data-storage-sqlite/', '/docs/plugins/data-storage-sqlite/', 302],
  ['/docs/Plugins/downloader/', '/docs/plugins/downloader/', 302],
  ['/docs/Plugins/ffmpeg/', '/docs/plugins/ffmpeg/', 302],
  ['/docs/Plugins/flash/', '/docs/plugins/flash/', 302],
  ['/docs/Plugins/gtm/', '/docs/plugins/gtm/', 302],
  ['/docs/Plugins/ibeacon/', '/docs/plugins/ibeacon/', 302],
  ['/docs/Plugins/inappbrowser/', '/docs/plugins/inappbrowser/', 302],
  ['/docs/Plugins/is-root/', '/docs/plugins/is-root/', 302],
  ['/docs/Plugins/jw-player/', '/docs/plugins/jw-player/', 302],
  ['/docs/Plugins/launch-navigator/', '/docs/plugins/launch-navigator/', 302],
  ['/docs/Plugins/live-reload/', '/docs/plugins/live-reload/', 302],
  ['/docs/Plugins/llm/', '/docs/plugins/llm/', 302],
  ['/docs/Plugins/mute/', '/docs/plugins/mute/', 302],
  ['/docs/Plugins/native-biometric/', '/docs/plugins/native-biometric/', 302],
  ['/docs/Plugins/nativegeocoder/', '/docs/plugins/nativegeocoder/', 302],
  ['/docs/Plugins/navigation-bar/', '/docs/plugins/navigation-bar/', 302],
  ['/docs/Plugins/nfc/', '/docs/plugins/nfc/', 302],
  ['/docs/Plugins/persistent-account/', '/docs/plugins/persistent-account/', 302],
  ['/docs/Plugins/ricoh360-camera/', '/docs/plugins/ricoh360-camera/', 302],
  ['/docs/Plugins/screen-recorder/', '/docs/plugins/screen-recorder/', 302],
  ['/docs/Plugins/shake/', '/docs/plugins/shake/', 302],
  ['/docs/Plugins/social-login/', '/docs/plugins/social-login/', 302],
  ['/docs/Plugins/social-login/apple/general/', '/docs/plugins/social-login/apple/general/', 302],
  ['/docs/Plugins/social-login/facebook/', '/docs/plugins/social-login/facebook/', 302],
  ['/docs/Plugins/social-login/google/general/', '/docs/plugins/social-login/google/general/', 302],
  ['/docs/Plugins/streamcall/', '/docs/plugins/streamcall/', 302],
  ['/docs/Plugins/textinteraction/getting-started/', '/docs/plugins/textinteraction/getting-started/', 302],
  ['/docs/Plugins/twilio-voice/', '/docs/plugins/twilio-voice/', 302],
  ['/docs/Plugins/updater/', '/docs/plugins/updater/', 302],
  ['/docs/Plugins/uploader/', '/docs/plugins/uploader/', 302],
  ['/docs/Plugins/video-player/', '/docs/plugins/video-player/', 302],
  ['/docs/Plugins/volume-buttons/', '/docs/plugins/volume-buttons/', 302],
  ['/docs/Plugins/wechat/', '/docs/plugins/wechat/', 302],
  ['/docs/Plugins/wifi/getting-started/', '/docs/plugins/wifi/getting-started/', 302],
  ['/docs/Plugins/youtube-player/', '/docs/plugins/youtube-player/', 302],
  ['/docs/Preguntas%20frecuentes/', '/docs/faq/', 302],
  ['/docs/public-API/API-keys/', '/docs/public-api/api-keys/', 302],
  ['/docs/public-API/Dispositivos/', '/docs/public-api/devices/', 302],
  ['/docs/public-API/Estad%C3%ADsticas/', '/docs/public-api/statistics/', 302],
  ['/docs/public-API/Miembros/', '/docs/public-api/members/', 302],
  ['/docs/public-API/Organizaciones/', '/docs/public-api/organizations/', 302],
  ['/docs/public-API/Paquetes/', '/docs/public-api/bundles/', 302],
  ['/docs/public-api/canales/', '/docs/public-api/channels/', 302],
  ['/docs/self-hosted/auto-Actualizar/Actualizar-endpoint', '/docs/plugins/updater/self-hosted/handling-updates/', 302],
  ['/docs/plugins/social-login/firebase/google/android/general/', '/docs/plugins/social-login/firebase/google/general/', 302],
  ['/docs/plugins/social-login/firebase/google/ios/general/', '/docs/plugins/social-login/firebase/google/general/', 302],
  ['/docs/plugins/social-login/firebase/introduction/google/android/', '/docs/plugins/social-login/firebase/google/android/', 302],
  ['/docs/plugins/social-login/firebase/introduction/google/general/', '/docs/plugins/social-login/firebase/google/general/', 302],
  ['/docs/plugins/social-login/firebase/introduction/google/ios/', '/docs/plugins/social-login/firebase/google/ios/', 302],
  ['/docs/plugins/social-login/firebase/introduction/google/web/', '/docs/plugins/social-login/firebase/google/web/', 302],
  ['/docs/plugins/social-login/supabase/apple/android/general/', '/docs/plugins/social-login/supabase/apple/general/', 302],
  ['/docs/plugins/social-login/supabase/apple/ios/general/', '/docs/plugins/social-login/supabase/apple/general/', 302],
  ['/docs/plugins/social-login/supabase/apple/web/general/', '/docs/plugins/social-login/supabase/apple/general/', 302],
  ['/docs/plugins/social-login/supabase/introduction/Apple/android/', '/docs/plugins/social-login/supabase/apple/android/', 302],
  ['/docs/plugins/social-login/supabase/introduction/Apple/general/', '/docs/plugins/social-login/supabase/apple/general/', 302],
  ['/docs/plugins/social-login/supabase/introduction/Apple/ios/', '/docs/plugins/social-login/supabase/apple/ios/', 302],
  ['/docs/plugins/social-login/supabase/introduction/google/android/', '/docs/plugins/social-login/supabase/google/android/', 302],
  ['/docs/plugins/social-login/supabase/introduction/google/general/', '/docs/plugins/social-login/supabase/google/general/', 302],
  ['/docs/plugins/social-login/supabase/introduction/google/ios/', '/docs/plugins/social-login/supabase/google/ios/', 302],
  ['/docs/plugins/social-login/supabase/introduction/google/web/', '/docs/plugins/social-login/supabase/google/web/', 302],
]

const redirectMap = new Map<string, RedirectDefinition>(redirectRows.map(([source, destination, status]) => [source, { destination, status }]))

function redirectResponse(request: Request, redirect: RedirectDefinition): Response {
  return Response.redirect(new URL(redirect.destination, request.url).toString(), redirect.status)
}

function isStaleCapgoLogoAsset(pathname: string): boolean {
  return /^\/_docs\/capgo_logo\.[A-Za-z0-9_-]+\.webp$/.test(pathname)
}

async function capgoLogoFallback(request: Request, env: Env): Promise<Response> {
  const fallbackUrl = new URL('/capgo_logo.webp', request.url)
  return env.ASSETS.fetch(new Request(fallbackUrl, request))
}

type BackgroundContext = {
  waitUntil(promise: Promise<unknown>): void
}

function trackAICrawler(request: Request, response: Response, env: Env, ctx?: BackgroundContext): Response {
  const websiteId = env.DATAFAST_AI_CRAWL_WEBSITE_ID?.trim()
  if (websiteId) {
    trackAICrawlerResponse(request, response, ctx, { websiteId })
  }
  return response
}

export default {
  async fetch(request: Request, env: Env, ctx?: BackgroundContext): Promise<Response> {
    const url = new URL(request.url)
    const pathname = url.pathname
    const redirect = redirectMap.get(pathname)
    if (redirect) return trackAICrawler(request, redirectResponse(request, redirect), env, ctx)
    // The Cloud Build docs moved to the Capgo Builder section (/docs/builder/).
    // Handled here because this worker serves /docs/* and does not apply public/_redirects.
    if (pathname === '/docs/cli/cloud-build' || pathname.startsWith('/docs/cli/cloud-build/')) {
      const rest = pathname.replace(/^\/docs\/cli\/cloud-build\/?/, '')
      return trackAICrawler(request, Response.redirect(new URL(`/docs/builder/${rest}${url.search}`, request.url).toString(), 301), env, ctx)
    }
    const response = await env.ASSETS.fetch(request)
    if (response.status === 404 && isStaleCapgoLogoAsset(pathname)) return trackAICrawler(request, await capgoLogoFallback(request, env), env, ctx)
    return trackAICrawler(request, response, env, ctx)
  },
}
