// Manual translator-context overrides kept across `bun run generate:message-contexts`.
// Prefer refining ambiguous short labels here instead of editing messageContexts.ts.
// Keys must exist in messages.ts.

import type { MessageKey } from './messages'

export const messageContextOverrides = {
  // website_live_* keys are Web2App copy; the generator maps their page label and humanized name (web2app_*) from the website_live_ prefix.
  // Add per-key overrides here only when a specific string needs extra translator guidance.
  live_update_hero_headline:
    'SEO product H1. Keep the product name "Capacitor Live Updates" and the acronym OTA in parentheses. Do not replace OTA with a long translated phrase in the headline.',
  live_update_hero_title: 'Same meaning as live_update_hero_headline: Capacitor Live Updates (OTA). Used as document title context.',
  live_update_hero_subtitle:
    'Answer-first hero paragraph under the H1. Explain OTA live updates for Capacitor (web bundle changes without a new store binary) and mention Capgo channels, rollback, and device logs.',
} as const satisfies Partial<Record<MessageKey, string>>
