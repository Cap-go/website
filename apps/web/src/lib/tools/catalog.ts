export type ToolSlug = 'ios-certificate-generator' | 'ios-udid-finder' | 'android-keystore-generator'

export interface ToolCatalogItem {
  slug: ToolSlug
  name: string
  summary: string
  href: `tools/${ToolSlug}`
  eyebrow: string
}

export const toolCatalog: ToolCatalogItem[] = [
  {
    slug: 'ios-certificate-generator',
    name: 'iOS Certificate Generator',
    summary: 'Create an iOS distribution or development certificate without a Mac: get an Apple-ready CSR and private key, then a .p12 for signing.',
    href: 'tools/ios-certificate-generator',
    eyebrow: 'CSR + private key',
  },
  {
    slug: 'ios-udid-finder',
    name: 'iOS UDID Finder',
    summary: 'Find an iPhone or iPad UDID in seconds from Safari, without a Mac or iTunes, plus model, serial, and iOS version.',
    href: 'tools/ios-udid-finder',
    eyebrow: 'Profile service',
  },
  {
    slug: 'android-keystore-generator',
    name: 'Android Keystore Generator',
    summary: 'Generate an Android keystore online without Android Studio: a PKCS#12 release key with SHA-1 and SHA-256 fingerprints for Google Play.',
    href: 'tools/android-keystore-generator',
    eyebrow: 'PKCS#12 keystore',
  },
]

export function getToolBySlug(slug: ToolSlug): ToolCatalogItem {
  const item = toolCatalog.find((tool) => tool.slug === slug)
  if (!item) {
    throw new Error(`Unknown tool slug: ${slug}`)
  }
  return item
}
