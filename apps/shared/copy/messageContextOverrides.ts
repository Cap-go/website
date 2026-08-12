// Manual translator-context overrides kept across `bun run generate:message-contexts`.
// Prefer refining ambiguous short labels here instead of editing messageContexts.ts.
// Keys must exist in messages.ts.

import type { MessageKey } from './messages'

export const messageContextOverrides = {
  // Example:
  // updates: 'Pricing calculator metric label for monthly OTA update volume, not a nav item.',
  live_update_hero_headline:
    'Punchy two-clause marketing hero headline. Meaning: skip App Store review delay and ship the hotfix immediately. Keep both clauses short and imperative; prefer natural local marketing phrasing over word-for-word calques.',
  live_update_hero_title:
    'Punchy two-clause marketing hero / document title. Meaning: skip App Store review delay and ship the hotfix immediately. Keep both clauses short and imperative; prefer natural local marketing phrasing over word-for-word calques.',
  live_update_hero_subtitle:
    'Hero supporting sentence under the H1. "Skip the App Store wait" means avoid App Store / Play Store review delay for web-layer fixes. Keep target-language grammar correct (including French article elision).',
} as const satisfies Partial<Record<MessageKey, string>>
