import {
  tailwindCapacitorCoreVueItems,
  tailwindCapacitorVueRegistryUrl,
} from '../../../shared/config/tailwindCapacitorRegistry'

export type PluginInstallOverride = {
  commands: string[]
  managers?: { label: string; command: string }[]
  installFaqAnswer: string
  openSourceFaqAnswer?: string
  installNote?: string
  skipNativePluginFaqs?: boolean
  frameworkFaqAnswer?: string
  hideNpm?: boolean
}

export const pluginInstallOverrides: Record<string, PluginInstallOverride> = {
  '@capgo/tailwind-capacitor': {
    commands: tailwindCapacitorCoreVueItems.map((item) => `npx shadcn-vue@latest add ${tailwindCapacitorVueRegistryUrl(item)}`),
    managers: [],
    skipNativePluginFaqs: true,
    hideNpm: true,
    installFaqAnswer:
      'This is a shadcn registry, not a native Capacitor plugin. Do not run bun add or bunx cap sync. In a Vue 3 app with Tailwind CSS v4 and a project-level components.json, run npx shadcn-vue@latest add with the raw GitHub registry URLs for capacitor-tailwind, capacitor-provider, capacitor-shared, and capacitor-icons, then add components the same way. The Install section on this page has framework tabs for Vue, React, and Angular.',
    frameworkFaqAnswer:
      'The v4 registry ships Vue, React, and Angular components from public/r/, public/r/react/, and public/r/angular/. The Capgo plugin page and docs list pinned install commands for each framework.',
    openSourceFaqAnswer:
      'Yes. The source is public on GitHub at https://github.com/Cap-go/tailwind-capacitor/. Vue components install with npx shadcn-vue add; React with npx shadcn add; Angular with registry-add from the tailwind-capacitor package. This version is not published to npm. Bug reports and pull requests are welcome.',
  },
}
