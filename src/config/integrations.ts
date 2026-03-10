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
    name: 'ViaSocket',
    href: 'https://viasocket.com/integrations/capgo',
    logo: '/logo_viaSocket.svg',
    target: '_blank',
    rel: 'noopener noreferrer',
    description: 'Real-time socket integration for Capgo workflows.',
  },
  {
    name: 'Codemagic',
    href: 'https://docs.codemagic.io/integrations/capgo-integration/',
    logo: '/Codemagic_ios.webp',
    target: '_blank',
    rel: 'noopener noreferrer',
    description: 'Continuous delivery workflow integration with Capgo for mobile update pipelines.',
  },
]
