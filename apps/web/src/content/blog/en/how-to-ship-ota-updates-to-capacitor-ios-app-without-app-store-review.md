---
slug: how-to-ship-ota-updates-to-capacitor-ios-app-without-app-store-review
title: How to Ship OTA Updates to a Capacitor iOS App Without App Store Review
description: >-
  Yes for web-layer changes. Ship HTML, CSS, JavaScript, and assets to Capacitor
  iOS with @capgo/capacitor-updater and notifyAppReady. Native changes still
  need a new App Store binary. Step-by-step, policy caveats, and links.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-11-09T12:00:00.000Z
updated_at: 2026-11-09T12:00:00.000Z
head_image: /blog-images/how-to-ship-ota-updates-to-capacitor-ios-app-without-app-store-review.jpg
head_image_alt: How to ship OTA updates to a Capacitor iOS app without waiting on App Store review
keywords: capacitor ios ota, ship ota updates ios, capacitor live updates ios, app store review, notifyAppReady, capacitor-updater, capgo ota
tag: Tutorial, Mobile, Updates
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: Can I ship OTA updates to a Capacitor iOS app without App Store review?
    answer: >-
      Yes, when the change stays in the web layer. You can deliver new HTML,
      CSS, JavaScript, and assets to the WebView inside your existing iOS binary.
      New native code, plugins, permissions, or entitlements still need a new
      App Store submission and review. Apple does not guarantee approval of any
      update path.
  - question: What counts as a web-layer update on iOS?
    answer: >-
      Bug fixes, copy changes, layout and styling, new screens built in your
      existing web stack, images, translations, and configuration that run
      inside the Capacitor WebView. Anything that changes the native shell,
      adds a Capacitor plugin, or requests new device permissions is not
      web-layer only.
  - question: Why must I call notifyAppReady() after an OTA update?
    answer: >-
      Capgo treats a bundle as healthy only after your app calls
      CapacitorUpdater.notifyAppReady() during startup. Automatic rollback
      applies when a new bundle fails to load or never reports ready within the
      timeout. Crashes after a successful notifyAppReady() need a manual channel
      rollback or a new upload.
takeaways:
  - 'OTA on iOS updates JavaScript, HTML, CSS, and assets inside your reviewed binary.'
  - 'Use @capgo/capacitor-updater, upload bundles to a channel, and call notifyAppReady() on every launch.'
  - 'Native plugins, permissions, and binary changes still require an App Store release.'
  - 'Stay inside Apple interpreted-code rules. Capgo does not guarantee store approval.'
cta:
  title: Try Capgo on your Capacitor iOS app
  text: Connect your app, upload a bundle, and roll out to a channel in minutes.
  href: /register/
  label: Start free trial
---

**Yes, you can ship OTA updates to a Capacitor iOS app without waiting on App Store review when the change is only in the web layer.** Replace HTML, CSS, JavaScript, and static assets inside your existing binary with [Capacitor live updates](https://capgo.app/live-update/) and [@capgo/capacitor-updater](https://capgo.app/plugins/capacitor-updater/). **No** for native work: new plugins, permission changes, SDK bumps, or anything that needs a new iOS binary still goes through [App Store Connect](https://developer.apple.com/app-store-connect/) and review. Apple and Capgo do not guarantee approval.

This guide is a practical how-to for iOS Capacitor teams. For the policy background, read [does Apple allow live updates](https://capgo.app/blog/do-apple-allow-live-updates/). For OTA basics, see [what is an OTA update](https://capgo.app/blog/what-is-ota-update/) and [how live updates work in Capgo](https://capgo.app/blog/how-live-updates-for-capacitor-work/).

## What counts as a web-layer update on iOS

Capacitor runs your app UI in a WebView. OTA delivery swaps the files that WebView loads.

| OK to ship OTA on iOS | Needs a new App Store binary |
| --- | --- |
| JavaScript, HTML, CSS bug fixes | New or updated native Capacitor plugins |
| Copy, translations, images, fonts in the bundle | New permissions or entitlements |
| Layout and styling in your web app | Capacitor major version or native dependency changes |
| Rollouts and rollbacks of web bundles | Changing the app into a different product purpose |

Use [channels](https://capgo.app/docs/live-updates/channels/), [compatibility checks](https://capgo.app/docs/live-updates/compatibility/), and [version targeting](https://capgo.app/solutions/version-targeting/) so a web bundle does not reach a binary that lacks the native pieces it needs.

## Step by step: @capgo/capacitor-updater and notifyAppReady

### 1. Install the updater plugin

Add the plugin to your Capacitor project and sync iOS, following the [Capgo quickstart](https://capgo.app/docs/getting-started/quickstart/) and [updater plugin docs](https://capgo.app/docs/plugins/updater/).

```bash
bun add @capgo/capacitor-updater
bunx cap sync ios
```

Register the app in the Capgo dashboard and note your API keys. The [capacitor-updater plugin page](https://capgo.app/plugins/capacitor-updater/) lists compatibility and links to deeper docs.

### 2. Call notifyAppReady() on every successful launch

Call it early in your app entry point, before slow network requests or other async work that can exceed the default readiness timeout:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// As soon as the shell can render; do not wait on remote data first
void CapacitorUpdater.notifyAppReady()
```

If a downloaded bundle fails during startup or never reaches `notifyAppReady()` in time, Capgo rolls back. See [`notifyAppReady` in the API docs](https://capgo.app/docs/plugins/updater/api/#notifyappready).

### 3. Build the web bundle and upload

Build your web assets as you do for a store release (`bun run build`, output in `dist/` or `www/`). Upload with the Capgo CLI:

```bash
bunx @capgo/cli@latest bundle upload --channel production --fail-on-incompatible
```

The CLI compares native packages against the channel and can fail the upload when the bundle is not compatible with what is live. Use `--fail-on-incompatible` for routine web-only uploads. When a bundle needs a newer binary, ship the native build first, then upload with the right [compatibility rules](https://capgo.app/docs/live-updates/compatibility/).

### 4. Let iOS devices pull the update

On the next check (foreground, resume, or your configured interval), the plugin downloads the bundle, applies it, and reloads the WebView. Users stay on the same App Store install. No review queue for eligible web-only changes.

## Channels, rollback, and when you still submit to the store

- **Channels:** Use `production`, `beta`, or custom channels for staged rollouts. See [channels documentation](https://capgo.app/docs/live-updates/channels/).
- **Rollback:** Revert a channel to a prior bundle in the dashboard, or rely on automatic rollback when a new bundle fails during startup or `notifyAppReady()` does not fire in time. See [rollbacks](https://capgo.app/docs/live-updates/rollbacks/).
- **Native release:** When the CLI reports incompatible native packages, ship a new iOS build through the App Store, then upload web bundles tied to that `version_build`.

## iOS policy caveats (no approval guarantees)

Apple's rules are the boundary, not vendor marketing.

- [App Store Review Guideline 2.5.2](https://developer.apple.com/app-store/review/guidelines/#software-requirements) limits downloadable code that changes app features.
- Section **3.3.1(B)** of the [Apple Developer Program License Agreement](https://developer.apple.com/support/terms/apple-developer-program-license-agreement/) allows **interpreted** code (such as JavaScript in WebKit) only if it does not change the app's primary purpose, does not create a code storefront, and does not bypass OS security.

Capgo can verify bundle checksums by default. For end-to-end signing, configure your keys as described in [encryption](https://capgo.app/docs/live-updates/encryption/). Your team must keep each update inside the app you submitted for review. Read [live updates compliance](https://capgo.app/docs/live-updates/compliance/) and Capgo's [Apple compliance notes](https://capgo.app/blog/capacitor-live-updates-staying-compliant-with-apple/). Review outcomes always belong to Apple.

## Start with Capgo

1. Open the [Capgo docs quickstart](https://capgo.app/docs/getting-started/quickstart/).
2. Install `@capgo/capacitor-updater` and wire `notifyAppReady()`.
3. Upload a bundle and point your iOS app at a channel.

[Start a Capgo trial](https://capgo.app/register/) or explore the full [live updates product](https://capgo.app/live-update/) when you are ready to ship web-layer fixes without waiting on review for every change.
