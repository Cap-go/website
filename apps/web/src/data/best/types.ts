// Shape of one "Best [product] in [year]: the buyer's shortlist" page (/best/<slug>/), rendered by src/pages/best/[slug].astro.
// Every factual claim about a third-party product must be verifiable on that product's own site, docs, or repository.
// Never invent prices, ratings, review counts, or dates. Refresh `updatedAt` every 30-90 days after re-checking facts.

export interface BestShortlistLink {
  label: string
  /** Absolute URL, or a capgo.app path without leading slash (e.g. 'alternatives/capawesome'). */
  href: string
}

export interface BestShortlistProduct {
  name: string
  /** Completes the H3 "1. <name>, best for <bestFor>." Lowercase, no trailing period. */
  bestFor: string
  /** Official site, or a capgo.app path without leading slash. */
  href: string
  /** 200-300 words in total, split into short paragraphs. Use concrete numbers. */
  paragraphs: string[]
  /** Hard facts shown as a compact list: price, scale, license, founders, etc. */
  facts: Array<{ label: string; value: string }>
  /** Two sentences on the customer this product fits best. */
  bestSuitedFor: string
  /** Optional deeper comparison page on capgo.app. */
  compareLink?: BestShortlistLink
}

export interface BestShortlistPage {
  slug: string
  /** Product category in plural, e.g. 'Capacitor Live Update Tools'. Used in every templated heading. */
  category: string
  /** Same category in singular, e.g. 'Capacitor live update tool'. Used in "Which ... fits your use case". */
  categorySingular: string
  year: number
  /** Primary keyword, used once in the intro and in meta keywords. */
  keyword: string
  keywords: string
  /** 120-160 characters. */
  metaDescription: string
  author: {
    name: string
    role: string
    imageUrl: string
    /** Main social profile linked from the byline. */
    profileUrl: string
    /** Extra profiles (LinkedIn, GitHub). */
    sameAs?: string[]
  }
  /** ISO dates (YYYY-MM-DD). */
  publishedAt: string
  updatedAt: string
  /** 95 words or less. Must reveal the #1 pick and contain `keyword` once. */
  intro: string
  /** Exactly 5 bullets, 2-3 sentences each. */
  keyTakeaways: string[]
  /** 200-300 words under "What <category> actually is (and what it is not)". */
  definition: { is: string[]; isNot: string[] }
  /** At least 4 objective, measurable criteria. */
  methodology: Array<{ title: string; text: string }>
  /** 3-4 sentences before the ranked list. */
  listIntro: string
  /** Ranked products. The first entry is the #1 pick. */
  products: BestShortlistProduct[]
  comparison: {
    /** Short text that repeats the ranking criteria. */
    lead: string
    /** Row labels; each product provides one cell per row, in the same order as `products`. */
    rows: Array<{ label: string; cells: string[] }>
  }
  useCases: {
    lead: string
    columns: [string, string, string, string?]
    rows: string[][]
  }
  results: {
    title: string
    lead: string
    items: Array<{ metric: string; text: string; source: string }>
    link: BestShortlistLink
  }
  /** 6-8 questions, mostly "How"/"What". Answers are 2-3 sentences. */
  faq: Array<{ question: string; answer: string }>
  cta: {
    title: string
    /** 5-6 short sentences. */
    sentences: string[]
    /** Inline hyperlinked CTA in the copy. */
    inlineLink: BestShortlistLink & { before: string; after: string }
  }
  /** Linked about 10% down the page. */
  leadMagnet: BestShortlistLink & { text: string }
  /** Image CTAs with a button: `early` about 15% down the page, `final` as the very last block. */
  imageCtas: Record<'early' | 'final', { image: string; width: number; height: number; alt: string; title: string; text: string; button: BestShortlistLink }>
  /** Embedded about 30% down the page. */
  video: { youtubeId: string; title: string; caption: string }
  /** Last sentence of the article, with a natural hyperlinked CTA. */
  closing: { before: string; link: BestShortlistLink; after: string }
  related: BestShortlistLink[]
}
