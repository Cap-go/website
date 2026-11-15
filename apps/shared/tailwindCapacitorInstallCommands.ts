import {
  TAILWIND_CAPACITOR_REGISTRY_COMMIT,
  tailwindCapacitorAngularRegistryUrl,
  tailwindCapacitorCoreAngularItems,
  tailwindCapacitorCoreReactItems,
  tailwindCapacitorCoreVueItems,
  tailwindCapacitorReactRegistryUrl,
  tailwindCapacitorVueRegistryUrl,
} from './config/tailwindCapacitorRegistry'

const angularRegistryAddCli = `npx --package github:Cap-go/tailwind-capacitor#${TAILWIND_CAPACITOR_REGISTRY_COMMIT} registry-add`

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
  const reactCore = tailwindCapacitorCoreReactItems.map((slug) => ({
    slug,
    command: `npx shadcn@latest add ${tailwindCapacitorReactRegistryUrl(slug)}`,
  }))
  const angularCore = tailwindCapacitorCoreAngularItems.map((slug) => ({
    slug,
    command: `${angularRegistryAddCli} ${tailwindCapacitorAngularRegistryUrl(slug)}`,
  }))
  return { vueCore, vueComponent, reactCore, angularCore }
}
