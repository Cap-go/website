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
      description: 'Core React registry items under public/r/react/ (pinned commit in shared config).',
      commands: reactCore.map((row) => row.command),
    },
    {
      id: 'angular',
      defaultVisible: false,
      description: 'Core Angular registry items under public/r/angular/ (pinned commit in shared config).',
      commands: angularCore.map((row) => row.command),
    },
  ]
}
