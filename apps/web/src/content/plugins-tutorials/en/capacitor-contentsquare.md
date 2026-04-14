---
locale: en
---

# Using @capgo/capacitor-contentsquare

`@capgo/capacitor-contentsquare` wires the Contentsquare mobile SDK into Capacitor 8 projects with a Capgo-friendly plugin surface. This tutorial focuses on the integration decisions you need to make around ownership, privacy, and analytics structure.

## Start with the plugin docs

- Getting started: [Contentsquare Getting Started](/docs/plugins/contentsquare/getting-started/)
- iOS setup notes: [Contentsquare iOS Setup](/docs/plugins/contentsquare/ios/)
- Android notes: [Contentsquare Android Notes](/docs/plugins/contentsquare/android/)

If you only need installation and the basic API examples, those pages are the canonical reference.

## Decide what owns consent

Treat consent as a product feature, not an analytics toggle. The simplest rule is:

- The consent UI or privacy layer is the only code allowed to call `optIn()` or `optOut()`.
- Everyone else can only call tracking methods when the privacy layer says tracking is allowed.

This keeps you from accidentally emitting events before consent is granted.

## Keep screen names stable

For clean analysis, define names as stable templates instead of user-specific content. A practical approach:

- Build a centralized set of constants for route names.
- Keep names consistent across iOS and Android route stacks.
- Reuse names when only parameters change, such as an item ID.

## Track transactions at the source of truth

Only emit purchase tracking once the app has a confirmed result, such as a server receipt or a finalized payment state. Avoid firing on UI intent unless you explicitly label it as an attempt.

## Keep the plugin behind one service

A low-friction pattern is to centralize Contentsquare behind one analytics service and keep the plugin API out of UI components. That makes it easier to gate calls on consent, keep screen naming stable, and change the implementation later without touching screens.

## Replay privacy checklist

Before enabling replay in production:

- Decide what should never be captured, such as inputs, payment fields, or identity screens.
- Add capture selectors intentionally and prefer explicit allow-listing.
- Keep the selector list owned by the same team that owns privacy compliance.

## Final notes

This plugin is a Capgo-maintained Capacitor 8 port of the current Contentsquare Capacitor API surface. Pair it with your existing consent policy and the official Contentsquare documentation for product-level guidance around replay, privacy, and debugging.
