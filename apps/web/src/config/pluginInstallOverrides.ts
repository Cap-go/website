const tailwindCapacitorRegistry =
  'https://raw.githubusercontent.com/Cap-go/tailwind-capacitor/refs/heads/main/public/r'

const tailwindCapacitorItems = ['capacitor-tailwind', 'capacitor-provider', 'capacitor-shared', 'capacitor-icons'] as const

export type PluginInstallOverride = {
  commands: string[]
  managers?: { label: string; command: string }[]
  installFaqAnswer: string
  openSourceFaqAnswer?: string
  installNote?: string
  skipNativePluginFaqs?: boolean
  frameworkFaqAnswer?: string
}

export const pluginInstallOverrides: Record<string, PluginInstallOverride> = {
  '@capgo/tailwind-capacitor': {
    commands: tailwindCapacitorItems.map((item) => `npx shadcn@latest add ${tailwindCapacitorRegistry}/${item}.json`),
    managers: [],
    skipNativePluginFaqs: true,
    installNote:
      'The capacitor-icons URL is unchanged, but that item is still typed as registry:lib in Cap-go/tailwind-capacitor#129. Do not treat that command as working until #129 retargets it to registry:item.',
    installFaqAnswer:
      'This is a shadcn registry, not a native Capacitor plugin. Do not run bun add or bunx cap sync. In a Vue 3 app with Tailwind CSS v4, run npx shadcn@latest add with the raw GitHub registry URLs for capacitor-tailwind, capacitor-provider, and capacitor-shared, then add components the same way. The commands are in the Install section on this page. The capacitor-icons item uses the same URL, but it does not install until Cap-go/tailwind-capacitor#129 retargets it from registry:lib to registry:item. Registry URLs on main resolve after that PR is merged.',
    frameworkFaqAnswer:
      'The v4 registry ships Vue 3 components. Use them in a Vue app with Tailwind CSS v4. React and Angular components are not in this registry.',
    openSourceFaqAnswer:
      'Yes. The source is public on GitHub at https://github.com/Cap-go/tailwind-capacitor/. The v4 components are installed from the shadcn registry with npx shadcn add, not from npm. This version is not published to npm. Bug reports and pull requests are welcome.',
  },
}
