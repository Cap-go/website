/** Pinned tailwind-capacitor main commit for registry sync and install URLs. */
export const TAILWIND_CAPACITOR_REGISTRY_COMMIT = 'e6437809852749b566a8489cd59db362006741f0'

const rawBase = `https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/${TAILWIND_CAPACITOR_REGISTRY_COMMIT}/public/r`

/** Vue registry paths (current main layout). */
export const tailwindCapacitorVueRegistryBase = rawBase

/**
 * React and Angular registry URL bases.
 * Update when tailwind-capacitor lands per-framework layouts (e.g. public/r/react/).
 * Depends on the in-flight tailwind-capacitor multi-framework registry PR.
 */
export const tailwindCapacitorReactRegistryBase =
  'https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/react'

export const tailwindCapacitorAngularRegistryBase =
  'https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r/angular'

export const tailwindCapacitorCoreVueItems = [
  'capacitor-tailwind',
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
