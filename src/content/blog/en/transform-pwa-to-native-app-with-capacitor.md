---
slug: transform-pwa-to-native-app-with-capacitor
title: Transform Your PWA to a Native App with Capacitor
description: >-
  Convert an existing Progressive Web App into a native Capacitor mobile app for
  iOS and Android. A practical guide to packaging your PWA with minimal code
  changes.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-02-23T00:00:00.000Z
updated_at: 2026-02-23T00:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: PWA running in a Capacitor native wrapper
keywords: PWA, Capacitor, native mobile app, iOS, Android, web-to-app migration, web app deployment
tag: Tutorial
published: true
locale: en
next_blog: building-a-native-mobile-app-with-nextjs-and-capacitor
---

## Introduction

You already have a Progressive Web App. It works in browsers, has a manifest, and maybe uses a service worker for offline support. If you now need app store distribution, native device APIs, or a better onboarding funnel, migrating to a Capacitor app is usually faster than rewriting your front end.

The biggest advantage is that you keep almost all of your existing web code. In most cases, you only need to:

- build production web assets,
- initialize Capacitor with the right `webDir`,
- add iOS and Android projects,
- and wire native plugins only where needed.

If your PWA has clean routes and component logic, this can take just a few hours.

### Prerequisites

**Estimated time**: 2-5 hours, depending on platform-specific features.

- **Node.js** 18+ with **Bun**
- Your existing PWA source code (React, Vue, Angular, Svelte, etc.)
- **Xcode** (for iOS, macOS only)
- **Android Studio** (for Android)
- Apple Developer account if you plan to publish iOS
- Google Play Developer account for Android distribution

## Step 1: Check your PWA before wrapping it in native

Before you run `bunx cap init`, verify your web app is production-ready:

1. Ensure your PWA has a production build script (e.g., `bun run build`).
2. Confirm your web output folder is deterministic (often `dist`, `build`, or `out`).
3. Remove hard-coded absolute redirects that assume browser-only context.
4. Verify service worker behavior is compatible with mobile WebViews:
   - Keep offline support if it helps your users.
   - Avoid browser-only APIs that are unavailable in the embedded webview.
5. Confirm PWA install prompts and browser-specific UX still make sense. In a Capacitor app, app install prompts are usually not needed.

## Step 2: Adapt web-only behaviors

Keep your app UI but gate browser-only logic.

Use a simple platform check around install and push prompts:

```ts
import { Capacitor } from '@capacitor/core'

const isNative = Capacitor.isNativePlatform()

function registerInstallPrompt() {
  if (isNative) return
  // existing browser-only install or Web Push code
}
```

This avoids browser-only logic firing inside the native container.

## Step 3: Initialize Capacitor in your PWA folder

From your existing PWA root:

```bash
bun add @capacitor/core
bun add -D @capacitor/cli
```

Run Capacitor init with your app name, bundle ID, and web output directory:

```bash
bunx cap init MyPWAApp com.example.my-pwa-app --web-dir dist
```

If your build folder is `build` (Create React App) or `out` (Next.js static export), replace `dist`.

Add a basic Capacitor config:

```ts
import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.my-pwa-app',
  appName: 'MyPWAApp',
  webDir: 'dist',
  server: {
    iosScheme: 'https',
  },
}

export default config
```

## Step 4: Add native platforms

Install core native packages and generate project folders:

```bash
bun add @capacitor/ios @capacitor/android
bunx cap add ios
bunx cap add android
```

At this point Capacitor has created `ios/` and `android/` folders. Syncing will copy your built web assets into both platforms.

## Step 5: Build your web app and sync

Build the PWA and sync web assets:

```bash
bun run build
bunx cap sync
```

Now open native projects:

```bash
bunx cap open ios
bunx cap open android
```

From Xcode or Android Studio, connect a device or emulator and run.

## Step 6: Native enhancements after migration

This is where you replace web-only features with native APIs where needed:

- Push notifications -> `@capacitor/push-notifications`
- Secure key/value storage -> `@capacitor/preferences`
- Camera / media -> `@capacitor/camera`
- Biometric auth -> `@capacitor-community/native-biometric` (or plugin of choice)

For every new native plugin:

1. Install the plugin package
2. Configure plugin-specific settings
3. Run:

```bash
bunx cap sync
```

Then rebuild and run again.

## Step 7: App store parity checks

Before submission:

- Test deep links and routing (`/` and deep routes) on both platforms.
- Verify that status bar, safe areas, and orientation are correct.
- Remove unused web-only metadata that conflicts with app behavior (for example, install prompts).
- Keep app transport security and privacy settings consistent with your policy.
- Add app icons/splash assets for each platform.

If your app uses OTA updates, pair your release pipeline with a native-safe update strategy and consider [Capgo](https://capgo.app) for controlled rollout and rollback.

## Final checklist

- Web app builds cleanly (`bun run build`)
- Capacitor initialized with the right `webDir`
- `bunx cap add ios` and `bunx cap add android` completed
- Native apps run on real devices
- Browser-only code paths are gated for native behavior
- Update channels and app store assets are configured

You already did most of the hard work when building your PWA. Wrapping it with Capacitor gives you:

- Store distribution,
- Access to native APIs,
- Faster iteration without a full code rewrite,
- A single deployment path for web and mobile teams.

Start from this flow, then iterate native-by-native based on analytics and user feedback.
