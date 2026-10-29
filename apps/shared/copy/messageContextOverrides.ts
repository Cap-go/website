// Manual translator-context overrides kept across `bun run generate:message-contexts`.
// Prefer refining ambiguous short labels here instead of editing messageContexts.ts.
// Keys must exist in messages.ts.

import type { MessageKey } from './messages'

export const messageContextOverrides = {
  pricing_prepaid_summary:
    'Complete introduction on the homepage and below the registration button. A standalone localized prepaid-credit amount follows the colon, then a separate no-subscription sentence. Translate the entire introduction as one unit. Only light usage can fit this annual budget; it is not a fixed annual plan, unlimited usage, or a monthly fee.',
  pricing_prepaid_annual_example:
    'Qualifier immediately below the localized $5 prepaid-credit amount in the Pay as you go tier. That balance can cover a year only for light usage. This is not a fixed annual plan, unlimited usage, a monthly fee, or a guaranteed annual bill.',
  pricing_prepaid_cta: 'Registration link for the Pay as you go tier. Creates an account before purchasing prepaid credits; it does not directly charge or create a subscription.',
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
