import manifest from '@/tailwind-capacitor-snapshot/registry-manifest.json'

export const tailwindCapacitorRegistryPackageCount = manifest.items.length

export const foundationPackageNames = ['capacitor-tailwind', 'capacitor-provider', 'capacitor-shared', 'capacitor-icons'] as const

export type TailwindCapacitorDemoSlug = (typeof manifest.items)[number]['name'] | 'foundation'

export const tailwindCapacitorDemoNavItems = [
  { name: 'foundation' as const, title: 'Registry foundation' },
  ...manifest.items.filter((item) => !foundationPackageNames.includes(item.name as (typeof foundationPackageNames)[number])),
]

export const tailwindCapacitorDemoPreviewPageCount = tailwindCapacitorDemoNavItems.length

export function resolveTailwindCapacitorDemoSlug(slug: string): TailwindCapacitorDemoSlug | null {
  if (slug === 'foundation') return 'foundation'
  const item = manifest.items.find((entry) => entry.name === slug)
  return item ? (item.name as TailwindCapacitorDemoSlug) : null
}

export function tailwindCapacitorDemoTitle(slug: TailwindCapacitorDemoSlug): string {
  if (slug === 'foundation') return 'Registry foundation'
  return manifest.items.find((item) => item.name === slug)?.title ?? slug
}