// Manual translator-context overrides kept across `bun run generate:message-contexts`.
// Prefer refining ambiguous short labels here instead of editing messageContexts.ts.
// Keys must exist in messages.ts.

import type { MessageKey } from './messages'

export const messageContextOverrides = {
  // Example:
  // updates: 'Pricing calculator metric label for monthly OTA update volume, not a nav item.',
  live_update_hero_headline:
    'SEO product H1 for the live-update page. English: "Capacitor OTA updates for hybrid apps". Keep Capacitor, OTA, and hybrid apps clear; OTA may stay as the acronym in headlines. Do not replace OTA with an overly long translated phrase.',
  live_update_hero_title:
    'Same meaning as live_update_hero_headline: Capacitor OTA updates for hybrid apps. Used as document title context.',
  live_update_hero_subtitle:
    'Answer-first hero paragraph under the H1. Explain OTA live updates for Capacitor (web bundle changes without a new store binary) and mention Capgo channels, rollback, and device logs.',
  brand_asset_youtube_banner_title:
    'Brand page asset heading for the YouTube channel banner download. Keep the word YouTube unchanged.',
  brand_asset_youtube_banner_desc:
    'Brand page description of the 2560×1440 YouTube channel banner. Keep YouTube, 2560×1440, and Capgo unchanged. The lockup is placed inside the area YouTube shows on phones, desktops, and TVs.',
} as const satisfies Partial<Record<MessageKey, string>>
