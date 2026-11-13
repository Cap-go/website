const tailwindCapacitorRegistry =
  'https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r'

const tailwindCapacitorItems = ['capacitor-tailwind', 'capacitor-provider', 'capacitor-shared', 'capacitor-icons'] as const

export type PluginInstallOverride = {
  commands: string[]
  managers?: { label: string; command: string }[]
  installFaqAnswer: string
  skipNativePluginFaqs?: boolean
  frameworkFaqAnswer?: string
}

export const pluginInstallOverrides: Record<string, PluginInstallOverride> = {
  '@capgo/tailwind-capacitor': {
    commands: tailwindCapacitorItems.map((item) => `npx shadcn@latest add ${tailwindCapacitorRegistry}/${item}.json`),
    managers: [],
    skipNativePluginFaqs: true,
    installFaqAnswer:
      'This is a shadcn registry, not a native Capacitor plugin. Do not run bun add or bunx cap sync. In a Vue 3 app with Tailwind CSS v4 and components.json, run npx shadcn@latest add with the raw GitHub registry URLs for capacitor-tailwind, capacitor-provider, capacitor-shared, and capacitor-icons, then add components the same way. The commands are in the Install section on this page. Registry URLs on main resolve after Cap-go/tailwind-capacitor#129 is merged.',
    frameworkFaqAnswer:
      'The v4 registry ships Vue 3 components. Use them in a Vue app with Tailwind CSS v4. React and Angular components are not in this registry.',
  },
}
