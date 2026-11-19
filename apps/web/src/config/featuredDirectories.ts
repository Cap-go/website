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

function placeholder(id: string, name: string, homeUrl: string): FeaturedDirectoryEntry {
  return {
    id,
    name,
    homeUrl,
    sourceNote: 'placeholder link, replace after listing',
    variant: 'placeholder',
  }
}

function snippet(id: string, name: string, homeUrl: string, badge: FeaturedDirectorySnippet): FeaturedDirectoryEntry {
  return {
    id,
    name,
    homeUrl,
    sourceNote: 'official snippet',
    variant: 'snippet',
    snippet: badge,
  }
}

export const featuredDirectoryEntries: FeaturedDirectoryEntry[] = [
  snippet('alternative-tools', 'Alternative.tools', 'https://alternative.tools/', {
    href: 'https://alternative.tools/item/capgo?utm_source=badge&utm_medium=referral&utm_campaign=featured-badge',
    rel: 'dofollow',
    target: '_blank',
    imgSrc: 'https://alternative.tools/badge.svg?theme=light&width=200&height=54',
    alt: 'Featured on Alternative.tools',
    width: 200,
    height: 54,
  }),
  placeholder('dang-ai', 'Dang AI', 'https://dang.ai/'),
  placeholder('dododirectory', 'DodoDirectory', 'https://dododirectory.com/'),
  placeholder('earlyhunt', 'EarlyHunt', 'https://earlyhunt.com/'),
  placeholder('indiehunt', 'Indiehunt', 'https://indiehunt.io/'),
  placeholder('launch-llama-tools', 'Launch Llama Tools', 'https://tools.launchllama.co/products/capgo?utm_source=badge&utm_medium=referral'),
  placeholder('listmysaas', 'ListMySaaS', 'https://listmysaas.xyz/'),
  snippet('neeed-directory', 'neeed.directory', 'https://neeed.directory/', {
    href: 'https://neeed.directory/products/capgo?utm_source=capgo',
    rel: 'noopener',
    target: '_blank',
    imgSrc: 'https://neeed.directory/badges/neeed-badge-dark.svg',
    alt: 'Featured on neeed.directory',
    width: 139,
  }),
  snippet('nick-launches', 'Nick Launches', 'https://nicklaunches.com/', {
    href: 'https://nicklaunches.com/',
    rel: 'noopener',
    target: '_blank',
    imgSrc: 'https://nicklaunches.com/badges/featured-dark.png',
    alt: 'Featured on Nick Launches',
    width: 244,
    height: 56,
  }),
  placeholder('saasgrow', 'SaaSGrow', 'https://saasgrow.app/'),
  snippet('startupfa-st', 'startupfa.st', 'https://www.startupfa.st/', {
    href: 'https://www.startupfa.st/',
    target: '_blank',
    imgSrc: 'https://www.startupfa.st/badge-dark.png',
    alt: 'Featured on Startup Fast',
  }),
  placeholder('startuptrusted', 'StartupTrusted', 'https://startuptrusted.com/'),
  snippet('sumodir', 'Sumodir', 'https://sumodir.com/', {
    href: 'https://sumodir.com/',
    target: '_blank',
    rel: 'dofollow',
    imgSrc: 'https://sumodir.com/badge.png',
    alt: 'Featured on Sumodir',
  }),
  placeholder('toolcurio', 'Toolcurio', 'https://toolcurio.com/'),
  snippet('toolfio', 'Toolfio', 'https://toolfio.com/', {
    href: 'https://toolfio.com/',
    rel: 'noopener noreferrer',
    target: '_blank',
    imgSrc: 'https://toolfio.com/toolfio-badge.svg',
    alt: 'Featured on Toolfio',
  }),
  placeholder('toolpilot', 'Toolpilot', 'https://www.toolpilot.ai/'),
  placeholder('uno-directory', 'Uno Directory', 'https://uno.directory/'),
  snippet('web-review', 'Web Review', 'https://web-review.com/', {
    href: 'https://web-review.com/',
    rel: 'dofollow',
    target: '_blank',
    imgSrc: 'https://web-review.com/badge.png',
    alt: 'Featured on Web Review',
  }),
]
