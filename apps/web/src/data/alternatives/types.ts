// Shape of one competitor comparison page (/alternatives/<slug>/), rendered by src/pages/alternatives/[slug].astro.
// Every factual claim about the competitor must cite one of its `sources` (1-based indexes) and be verifiable
// on the competitor's own site, docs, or repository. Never invent prices, limits, or dates.

import type { ComparisonRowId } from '@/components/comparison/ComparisonPage.astro'

export type AlternativeCategory = 'framework' | 'web-to-app' | 'live-updates' | 'ci-cd'

export interface AlternativeCell {
  text: string
  /** 1-based indexes into `sources`. */
  sources: number[]
}

export interface AlternativeOption {
  /** Product name shown in the ranked list. Capgo is always added as #1 by the template. */
  name: string
  /** One or two sentences: who it fits and its main trade-off. */
  text: string
  /** Official site of the product, or a capgo.app path without leading slash (e.g. 'alternatives/expo'). */
  href: string
}

export interface AlternativeCompetitor {
  slug: string
  /** Display name, e.g. 'React Native' or 'Despia'. */
  name: string
  category: AlternativeCategory
  /** <title>. 30-60 characters, contains "<name> alternative". */
  metaTitle: string
  /** 120-160 characters. */
  metaDescription: string
  keywords: string
  /** Short hero badge, e.g. 'Despia vs Capgo'. */
  eyebrow: string
  /** H1, 20-70 characters. */
  heading: string
  lead: string
  verdict: string
  /** Short status chip for the hub card, e.g. 'Web-to-app builder' (max ~5 words). */
  status: string
  sources: Array<{ label: string; href: string }>
  rows: Record<ComparisonRowId, AlternativeCell>
  /** Override the default Capgo column text when it does not answer the row for this kind of competitor. */
  capgoRows?: Partial<Record<ComparisonRowId, string>>
  /** 2 or 3 honest cases where the competitor is the better pick. */
  better: Array<{ title: string; text: string; sources?: number[] }>
  /** 4 to 6 other alternatives, ranked after Capgo. Do not include the competitor itself. */
  alternatives: AlternativeOption[]
  migration: {
    title: string
    lead: string
    /** 3 steps. `html` may contain inline <code> only. */
    steps: Array<{ title: string; html: string }>
  }
  /** 4 or 5 entries. */
  faq: Array<{ question: string; answer: string }>
}
