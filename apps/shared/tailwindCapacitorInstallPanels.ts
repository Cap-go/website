import { buildTailwindCapacitorInstallCommands } from './tailwindCapacitorInstallCommands'

export type InstallTabVariant = 'web' | 'docs'

export type InstallTabPanel = {
  id: 'vue' | 'react' | 'angular'
  defaultVisible: boolean
  description: string
  commands: string[]
}

export function getTailwindCapacitorInstallPanels(variant: InstallTabVariant): InstallTabPanel[] {
  const vueCli = variant === 'web' ? 'bunx' : 'npx'
  const { vueCore, vueComponent, reactCore, angularCore } = buildTailwindCapacitorInstallCommands({ vueCli })

  return [
    {
      id: 'vue',
      defaultVisible: true,
      description: 'Core registry items, then any component slug.',
      commands: [...vueCore.map((row) => row.command), vueComponent.command],
    },
    {
      id: 'react',
      defaultVisible: false,
      description: 'React registry URLs are provisional until the tailwind-capacitor multi-framework PR lands.',
      commands: reactCore.map((row) => row.command),
    },
    {
      id: 'angular',
      defaultVisible: false,
      description: 'Angular (spartan/ng) URLs are provisional until the tailwind-capacitor multi-framework PR lands.',
      commands: angularCore.map((row) => row.command),
    },
  ]
}
