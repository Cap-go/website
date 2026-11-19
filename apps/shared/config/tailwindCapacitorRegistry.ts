/** Pinned tailwind-capacitor commit for registry sync and install URLs (merged Cap-go/tailwind-capacitor#130). */
export const TAILWIND_CAPACITOR_REGISTRY_COMMIT = '9791d43d67279d7725d6a1f7865ff10deaf36ba5'

const rawBase = `https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/${TAILWIND_CAPACITOR_REGISTRY_COMMIT}/public/r`

/** Vue registry paths under public/r/. */
export const tailwindCapacitorVueRegistryBase = rawBase

/** React registry paths under public/r/react/. */
export const tailwindCapacitorReactRegistryBase = `${rawBase}/react`

/** Angular registry paths under public/r/angular/. */
export const tailwindCapacitorAngularRegistryBase = `${rawBase}/angular`

export const tailwindCapacitorCoreVueItems = [
  'capacitor-tailwind',
  'capacitor-provider',
  'capacitor-shared',
  'capacitor-icons',
] as const

/** React and Angular registries ship provider, shared, and icons under public/r/{react,angular}/. */
export const tailwindCapacitorCoreReactItems = [
  'capacitor-provider',
  'capacitor-shared',
  'capacitor-icons',
] as const

export const tailwindCapacitorCoreAngularItems = [
  'capacitor-provider',
  'capacitor-shared',
  'capacitor-icons',
] as const

export function tailwindCapacitorVueRegistryUrl(slug: string): string {
  return `${tailwindCapacitorVueRegistryBase}/${slug}.json`
}

export function tailwindCapacitorReactRegistryUrl(slug: string): string {
  return `${tailwindCapacitorReactRegistryBase}/${slug}.json`
}

export function tailwindCapacitorAngularRegistryUrl(slug: string): string {
  return `${tailwindCapacitorAngularRegistryBase}/${slug}.json`
}