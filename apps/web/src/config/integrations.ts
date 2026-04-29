export interface IntegrationEntry {
  name: string
  href: string
  logo: string
  target?: string
  rel?: string
  description: string
}

export const integrations: IntegrationEntry[] = [
  {
    name: 'viaSocket',
    href: 'https://viasocket.com/integrations/capgo',
    logo: '/logo_viaSocket.svg',
    target: '_blank',
    rel: 'noopener noreferrer',
    description: 'Enable event-based automation for Capgo workflows using viaSocket, with instant triggers and smooth data flow.',
  },
  {
    name: 'Codemagic',
    href: 'https://docs.codemagic.io/integrations/capgo-integration/',
    logo: '/codemagic-logo-black.svg',
    target: '_blank',
    rel: 'noopener noreferrer',
    description: 'Continuous delivery workflow integration with Capgo for mobile update pipelines.',
  },
  {
    name: 'Dyad',
    href: 'https://www.dyad.sh',
    logo: '/dyad-logo.svg',
    target: '_blank',
    rel: 'noopener noreferrer',
    description: 'Flexible, local, open-source AI app builder with zero lock-in and support for your own models and tools.',
  },
]
