---
title: "@capgo/capacitor-notifications"
description: "Send native iOS and Android push notifications from Capgo without storing a per-device notification table in Capgo Postgres."
tableOfContents: false
next: false
prev: false
sidebar:
  order: 1
  label: "Introduction"
hero:
  tagline: "Capgo-managed native notifications for campaigns, badges, user lookup, delivery stats, and silent live-update checks."
  actions:
    - text: Get started
      link: /docs/plugins/notifications/getting-started/
      icon: right-arrow
      variant: primary
    - text: Debug setup
      link: /docs/plugins/notifications/debugging/
      icon: external
      variant: minimal
---

## Overview

`@capgo/capacitor-notifications` connects a Capacitor app to Capgo's native notification pipeline. Your app registers a signed customer user ID with Capgo, Capgo keeps the latest active device state in Cloudflare Analytics Engine, and you can send notifications, set badges, inspect delivery stats, and trigger silent Capgo live-update checks from the Capgo dashboard or API.

The feature is designed to avoid a high-cardinality notification device table in Capgo Postgres. Postgres stores only low-cardinality control plane data such as app settings, platform credential metadata, campaign drafts, schedules, and aggregate campaign records. Active device state and notification events are append-only Analytics Engine rows.

## What Capgo Stores

| Data | Where it lives | Why |
| --- | --- | --- |
| Platform credential metadata | Capgo Postgres | Needed to manage app setup and permissions. |
| Private platform secrets | Worker environment | Avoids storing private credentials in customer-facing tables. |
| Campaign drafts and settings | Capgo Postgres | Low-cardinality control plane data. |
| Active device registration state | Cloudflare Analytics Engine | Cheap append-only active-device registry. |
| Notification events | Cloudflare Analytics Engine | Cheap stats for queued, sent, received, opened, failed, and background events. |

## Identity Model

Capgo does not ask you to upload a list of users or maintain a device table.

- Your backend knows the real customer user ID.
- Your backend asks Capgo for a short-lived `identityProof`.
- The app registers with `externalId` and that proof after your own user authentication succeeds.
- Capgo derives deterministic internal keys for the recipient and the native install.
- Sending to the same `externalId` finds the user's active devices again.

This lets you look up a user's devices, set badges, and target notification campaigns without storing per-device notification rows in Capgo Postgres.

## Core Capabilities

- Register devices with an authenticated external user ID.
- Refresh tags, attributes, consent, and token state on app start or token changes.
- Receive foreground notifications in JavaScript.
- Track notification received and opened events.
- Handle background data notifications.
- Set, clear, and increment app badges.
- Create Android notification channels.
- Send one-off notifications, campaign notifications, badge updates, and silent update checks.
- Trigger `@capgo/capacitor-updater` from a silent notification.

## Stats

Capgo writes notification events to Cloudflare Analytics Engine so dashboard stats stay cheap:

- `queued`
- `sent`
- `provider_accepted`
- `received`
- `opened`
- `failed`
- `permission_changed`
- `background_started`
- `background_finished`

Stats are operational signals, not a permanent per-recipient ledger. Analytics Engine retention means active devices must refresh registration periodically.

## Public API

| Method | Description |
| --- | --- |
| `configure` | Sets the Capgo app ID, API host, and updater integration behavior. |
| `register` | Registers the current install for an external customer user ID. |
| `setExternalId` | Changes the external customer user ID after login or account switch. |
| `setTags` | Replaces the tags used for audience targeting. |
| `setBadge` | Sets the native app badge. |
| `clearBadge` | Clears the native app badge. |
| `incrementBadge` | Increments the native app badge. |
| `enableUpdaterIntegration` | Enables silent update-check handling through `@capgo/capacitor-updater`. |
| `runUpdateCheck` | Runs the updater integration manually for testing. |
| `trackReceived` | Manually writes a received event. |
| `trackOpened` | Manually writes an opened event. |
| `addListener('notificationReceived')` | Fires when a notification is received while JavaScript is active. |
| `addListener('notificationOpened')` | Fires when a user opens a notification. |
| `addListener('backgroundNotification')` | Fires for background data notifications and exposes `finish()`. |
| `addListener('registrationChanged')` | Fires when the native push token changes. |

## Delivery Guarantees

Native push is at-least-once. A campaign can be retried, and a device can receive a duplicate if the platform accepts a repeated message. Use collapse IDs for update checks and make background work idempotent.

iOS background notifications are best-effort. The OS can throttle or skip background execution based on battery, user behavior, force-quit state, and system policy. Do not rely on silent notifications for hard deadlines.

## Keep going from @capgo/capacitor-notifications

If you are using **@capgo/capacitor-notifications** to plan push messaging, connect it with [Getting Started](/docs/plugins/notifications/getting-started/) for setup, [Debugging](/docs/plugins/notifications/debugging/) for troubleshooting, [@capgo/capacitor-updater](/docs/plugins/updater/) for silent update checks, and [Capgo Plugin Directory](/plugins/) for other native plugins.
