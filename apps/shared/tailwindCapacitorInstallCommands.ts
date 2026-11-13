import {
  tailwindCapacitorAngularRegistryBase,
  tailwindCapacitorCoreVueItems,
  tailwindCapacitorReactRegistryBase,
  tailwindCapacitorVueRegistryUrl,
} from './config/tailwindCapacitorRegistry'

export function buildTailwindCapacitorInstallCommands(options?: { vueCli?: 'bunx' | 'npx' }) {
  const vueCli = options?.vueCli ?? 'npx'
  const vueCore = tailwindCapacitorCoreVueItems.map((slug) => ({
    slug,
    command: `${vueCli} shadcn-vue@latest add ${tailwindCapacitorVueRegistryUrl(slug)}`,
  }))
  const vueComponent = {
    slug: 'capacitor-button',
    command: `${vueCli} shadcn-vue@latest add ${tailwindCapacitorVueRegistryUrl('capacitor-button')}`,
  }
  const reactCore = tailwindCapacitorCoreVueItems.map((slug) => ({
    slug,
    command: `npx shadcn@latest add ${tailwindCapacitorReactRegistryBase}/${slug}.json`,
  }))
  const angularCore = tailwindCapacitorCoreVueItems.map((slug) => ({
    slug,
    command: `npx @spartan-ng/cli@latest add ${tailwindCapacitorAngularRegistryBase}/${slug}.json`,
  }))
  return { vueCore, vueComponent, reactCore, angularCore }
}
