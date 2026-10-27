// Publish and last content update dates for hand-built comparison, review, and migration pages.
// AI search and Google use these to judge freshness, so bump `updatedAt` (YYYY-MM-DD) whenever the facts on a page change.

export interface PageDates {
  publishedAt: string
  updatedAt: string
}

export const pageDates = {
  'alternatives/capawesome': { publishedAt: '2025-09-24', updatedAt: '2026-10-26' },
  'alternatives/codepush': { publishedAt: '2026-09-29', updatedAt: '2026-10-15' },
  'alternatives/expo': { publishedAt: '2026-06-18', updatedAt: '2026-09-30' },
  'alternatives/ionic-appflow': { publishedAt: '2025-09-24', updatedAt: '2026-09-30' },
  'alternatives/median': { publishedAt: '2026-06-18', updatedAt: '2026-09-30' },
  'alternatives/voltbuilder': { publishedAt: '2026-09-29', updatedAt: '2026-10-15' },
  'reviews/appflow': { publishedAt: '2026-09-29', updatedAt: '2026-10-15' },
  'reviews/capawesome': { publishedAt: '2026-09-29', updatedAt: '2026-10-15' },
  'reviews/codepush': { publishedAt: '2026-09-29', updatedAt: '2026-10-15' },
  'migrate/from-appflow': { publishedAt: '2026-09-29', updatedAt: '2026-10-15' },
  'migrate/from-capawesome': { publishedAt: '2026-09-29', updatedAt: '2026-10-15' },
  'migrate/from-codepush': { publishedAt: '2026-09-29', updatedAt: '2026-10-15' },
} satisfies Record<string, PageDates>

/** Converts a YYYY-MM-DD date to the ISO timestamp used in JSON-LD and article meta tags. */
export function toIsoDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toISOString()
}

/** Human-readable date for the visible "Last updated" line. */
export function formatPageDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}
