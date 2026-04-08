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
    summary: 'Generate an Apple-ready certificate signing request and private key for manual signing, CI, and cloud builds.',
    href: 'tools/ios-certificate-generator',
    eyebrow: 'CSR + private key',
  },
  {
    slug: 'ios-udid-finder',
    name: 'iOS UDID Finder',
    summary: 'Install a lightweight profile on an iPhone or iPad and surface the UDID, model, serial, and iOS version in seconds.',
    href: 'tools/ios-udid-finder',
    eyebrow: 'Profile service',
  },
  {
    slug: 'android-keystore-generator',
    name: 'Android Keystore Generator',
    summary: 'Create a PKCS#12 signing keystore, alias, and certificate summary for Play Store or direct Android releases.',
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
