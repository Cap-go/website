// Manual translator-context overrides kept across `bun run generate:message-contexts`.
// Prefer refining ambiguous short labels here instead of editing messageContexts.ts.
// Keys must exist in messages.ts.

export const messageContextOverrides = {
  // Example:
  // updates: 'Pricing calculator metric label for monthly OTA update volume, not a nav item.',
} as const satisfies Record<string, string>
