/** Legacy path aliases shared by web links, web worker, and translation worker. */
const LEGACY_PATH_REDIRECTS: Record<string, string> = {
  '/blog/setup-ci-and-cd-gitlab': '/blog/setup-ci-and-cd-in-gitlab/',
  '/blog/open-source-licecing': '/blog/open-source-licence/',
  '/blog/release-of-a-brand-new-capacitor-social-login': '/blog/capacitor-social-login-release/',
  '/blog/Release-of-a-brand-new-capacitor-social-login': '/blog/capacitor-social-login-release/',
  '/blog/birth-of-capgo-my-challenging-journey-as-a-solo-maker': '/blog/birth-of-capgo-revolutionizing-capacitor-app-updates/',
  '/blog/how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater': '/blog/how-I-manage-semantic-release-with-CapGo-CapacitorUpdater/',
  '/blog/introducing-end-A-end-Seguridad-A-Capacitor-updater-with-code-signing': '/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/',
  '/blog/building-a-native-mobile-app-with-nuxt-3-and-capacitor': '/blog/building-a-native-mobile-app-with-nuxt-and-capacitor/',
  '/blog/alternative-to-capawesome': '/capwesome/',
  '/blog/capgo-vs-capawesome-comparing-ota-update-plugins': '/capwesome/',
  '/blog/how-to-use-capacitor-with-nextjs': '/blog/nextjs-mobile-app-capacitor-from-scratch/',
  '/blog/gestione-dei-changelog-di-capacitor-guida-completa':
    '/blog/capacitor-comprehensive-guide/#is-there-enterprise-specific-support-available',
}

function normalizeLegacyLookupPath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

/** Returns a canonical target path when `pathname` is a known legacy alias. */
export function resolveLegacyPathRedirect(pathname: string): string | null {
  const key = normalizeLegacyLookupPath(pathname)
  return LEGACY_PATH_REDIRECTS[key] ?? null
}
