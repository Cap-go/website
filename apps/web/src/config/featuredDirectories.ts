export type FeaturedDirectorySnippet = {
  href: string
  imgSrc: string
  alt: string
  rel?: string
  target?: string
  width?: number
  height?: number
}

export type FeaturedDirectoryEntry = {
  id: string
  name: string
  homeUrl: string
  /** official snippet | placeholder link, replace after listing */
  sourceNote: string
  variant: 'snippet' | 'placeholder'
  snippet?: FeaturedDirectorySnippet
}

export const featuredDirectoryEntries: FeaturedDirectoryEntry[] = [
  {
    id: 'alternative-tools',
    name: 'Alternative.tools',
    homeUrl: 'https://alternative.tools/',
    sourceNote: 'official snippet',
    variant: 'snippet',
    snippet: {
      href: 'https://alternative.tools/item/capgo?utm_source=badge&utm_medium=referral&utm_campaign=featured-badge',
      rel: 'dofollow',
      target: '_blank',
      imgSrc: 'https://alternative.tools/badge.svg?theme=light&width=200&height=54',
      alt: 'Featured on Alternative.tools',
      width: 200,
      height: 54,
    },
  },
  {
    id: 'dang-ai',
    name: 'Dang AI',
    homeUrl: 'https://dang.ai/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'dododirectory',
    name: 'DodoDirectory',
    homeUrl: 'https://dododirectory.com/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'earlyhunt',
    name: 'EarlyHunt',
    homeUrl: 'https://earlyhunt.com/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'indiehunt',
    name: 'Indiehunt',
    homeUrl: 'https://indiehunt.io/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'launch-llama-tools',
    name: 'Launch Llama Tools',
    homeUrl: 'https://tools.launchllama.co/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'listmysaas',
    name: 'ListMySaaS',
    homeUrl: 'https://listmysaas.xyz/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'neeed-directory',
    name: 'neeed.directory',
    homeUrl: 'https://neeed.directory/',
    sourceNote: 'official snippet',
    variant: 'snippet',
    snippet: {
      href: 'https://neeed.directory/products/capgo?utm_source=capgo',
      rel: 'noopener',
      target: '_blank',
      imgSrc: 'https://neeed.directory/badges/neeed-badge-dark.svg',
      alt: 'Featured on neeed.directory',
      width: 139,
    },
  },
  {
    id: 'nick-launches',
    name: 'Nick Launches',
    homeUrl: 'https://nicklaunches.com/',
    sourceNote: 'official snippet',
    variant: 'snippet',
    snippet: {
      href: 'https://nicklaunches.com/',
      rel: 'noopener',
      target: '_blank',
      imgSrc: 'https://nicklaunches.com/badges/featured-dark.png',
      alt: 'Featured on Nick Launches',
      width: 244,
      height: 56,
    },
  },
  {
    id: 'saasgrow',
    name: 'SaaSGrow',
    homeUrl: 'https://saasgrow.app/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'startupfa-st',
    name: 'startupfa.st',
    homeUrl: 'https://www.startupfa.st/',
    sourceNote: 'official snippet',
    variant: 'snippet',
    snippet: {
      href: 'https://www.startupfa.st/',
      target: '_blank',
      imgSrc: 'https://www.startupfa.st/badge-dark.png',
      alt: 'Featured on Startup Fast',
    },
  },
  {
    id: 'startuptrusted',
    name: 'StartupTrusted',
    homeUrl: 'https://startuptrusted.com/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'sumodir',
    name: 'Sumodir',
    homeUrl: 'https://sumodir.com/',
    sourceNote: 'official snippet',
    variant: 'snippet',
    snippet: {
      href: 'https://sumodir.com/',
      target: '_blank',
      rel: 'dofollow',
      imgSrc: 'https://sumodir.com/badge.png',
      alt: 'Featured on Sumodir',
    },
  },
  {
    id: 'toolcurio',
    name: 'Toolcurio',
    homeUrl: 'https://toolcurio.com/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'toolfio',
    name: 'Toolfio',
    homeUrl: 'https://toolfio.com/',
    sourceNote: 'official snippet',
    variant: 'snippet',
    snippet: {
      href: 'https://toolfio.com/',
      rel: 'noopener noreferrer',
      target: '_blank',
      imgSrc: 'https://toolfio.com/toolfio-badge.svg',
      alt: 'Featured on Toolfio',
    },
  },
  {
    id: 'toolpilot',
    name: 'Toolpilot',
    homeUrl: 'https://www.toolpilot.ai/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'uno-directory',
    name: 'Uno Directory',
    homeUrl: 'https://uno.directory/',
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  },
  {
    id: 'web-review',
    name: 'Web Review',
    homeUrl: 'https://web-review.com/',
    sourceNote: 'official snippet',
    variant: 'snippet',
    snippet: {
      href: 'https://web-review.com/',
      rel: 'dofollow',
      target: '_blank',
      imgSrc: 'https://web-review.com/badge.png',
      alt: 'Featured on Web Review',
    },
  },
]
