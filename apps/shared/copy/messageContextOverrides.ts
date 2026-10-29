// Manual translator-context overrides kept across `bun run generate:message-contexts`.
// Prefer refining ambiguous short labels here instead of editing messageContexts.ts.
// Keys must exist in messages.ts.

import type { MessageKey } from './messages'

export const messageContextOverrides = {
  pricing_prepaid_headline:
    'Pay-as-you-go offer on the homepage, pricing page, and registration page. Keep {price} unchanged. This is a low-usage annual cost example, not a fixed-price annual plan or unlimited usage promise.',
  pricing_prepaid_details:
    'Clarify that prepaid credits work without a subscription, expire after 12 months, and may last a year only with low usage. Higher usage requires a top-up; never imply unlimited access for the headline price.',
  // Example:
  // updates: 'Pricing calculator metric label for monthly OTA update volume, not a nav item.',
  live_update_hero_headline:
    'SEO product H1. Keep the product name "Capacitor Live Updates" and the acronym OTA in parentheses. Do not replace OTA with a long translated phrase in the headline.',
  live_update_hero_title: 'Same meaning as live_update_hero_headline: Capacitor Live Updates (OTA). Used as document title context.',
  live_update_hero_subtitle:
    'Answer-first hero paragraph under the H1. Explain OTA live updates for Capacitor (web bundle changes without a new store binary) and mention Capgo channels, rollback, and device logs.',
  brand_asset_youtube_banner_title: 'Brand page asset heading for the YouTube channel banner download. Keep the word YouTube unchanged.',
  brand_asset_youtube_banner_desc:
    'Brand page description of the 2560×1440 YouTube channel banner. Keep YouTube, 2560×1440, and Capgo unchanged. The lockup is placed inside the area YouTube shows on phones, desktops, and TVs.',
} as const satisfies Partial<Record<MessageKey, string>>
