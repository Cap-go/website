---
slug: transform-pwabuilder-pwa-to-mobile-with-capacitor
title: 'PWABuilder, Capacitor, and Capgo: When to Package a PWA and When to Go Native'
description: >-
  What PWABuilder does for Microsoft Store, Google Play, and iOS packaging, how that compares
  to Capacitor with Capgo for native plugins, cloud builds, and live updates, and how to move
  from a PWABuilder PWA into Capacitor.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-11-24T00:00:00.000Z
updated_at: 2026-11-24T00:00:00.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "PWABuilder PWA to Capacitor and Capgo blog illustration"
keywords: PWABuilder, PWA, Capacitor, Capgo Builder, live updates, Trusted Web Activity, Bubblewrap, Microsoft Store, App Store, Google Play
tag: Tutorial
published: true
locale: en
origin: human
next_blog: transform-pwa-to-native-app-with-capacitor
faq:
  - question: "What does PWABuilder do?"
    answer: "PWABuilder scores a public PWA and generates store packages for Microsoft, Google Play, and iOS. Android uses Bubblewrap for a Trusted Web Activity. The packaged app loads your hosted PWA URL, so updating your website updates store installs without a new listing version."
  - question: "Is PWABuilder free?"
    answer: "Yes. PWABuilder is an MIT-licensed Microsoft open-source project. You still pay store developer account fees: Microsoft and Google Play list one-time fees in PWABuilder docs, and Apple charges an annual fee."
  - question: "Can PWABuilder publish to the Apple App Store?"
    answer: "PWABuilder generates an iOS WebView project you build in Xcode on a Mac. PWABuilder documentation treats iOS packaging as more limited than Android or Microsoft Store, and App Store review depends on your UI and use of native capabilities."
  - question: "When should I use Capacitor and Capgo instead of PWABuilder?"
    answer: "Use Capacitor with Capgo when you need native plugins, offline bundles, cloud iOS builds without a Mac, or Capgo live updates with channels and rollback. Keep PWABuilder when free URL-based packaging is enough."
---

## Introduction

[PWABuilder](https://www.pwabuilder.com/) helps teams ship an existing Progressive Web App to app stores. Enter your HTTPS URL, review the PWA report card, and download packages for [Microsoft Store](https://docs.pwabuilder.com/#/builder/windows), [Google Play](https://docs.pwabuilder.com/#/builder/android), or [iOS](https://docs.pwabuilder.com/#/builder/app-store). The tool is free and [open source on GitHub](https://github.com/pwa-builder/PWABuilder).

[Capacitor](https://capacitorjs.com/) takes a different path. It copies your **production web build** into native `ios/` and `android/` projects so you can call device APIs through plugins. **[Capgo Builder](https://capgo.app/native-build/)** compiles signed store binaries in the cloud, and **Capgo live updates** ship new web bundles to installed apps with channels and rollback.

> **Short version:** the [PWABuilder to iOS and Android page](/solutions/pwabuilder-to-mobile/) maps export, Capacitor, cloud builds without a Mac, and live updates on one screen. For a straight PWABuilder vs Capgo comparison, see [PWABuilder vs Capgo](/alternatives/pwabuilder/).

This guide explains what PWABuilder actually delivers, where Capgo fits, and how to move from a PWABuilder-packaged PWA (or the same web app) into Capacitor.

**Time required:** about 1 to 3 hours if you already have a PWA repo and store accounts.

**By the end, you will know:**

- Which store paths PWABuilder covers and what each package contains
- When PWABuilder is the simpler choice vs Capacitor plus Capgo
- The steps to wrap the same PWA in Capacitor and enable Capgo Build and live updates

## What PWABuilder does (verified basics)

Per [PWABuilder quick start](https://docs.pwabuilder.com/#/builder/quick-start), your PWA should:

- Be published at a public URL
- Have a complete web manifest
- Be served over HTTPS

The packaging flow is: enter the URL, open the report card, choose **Package for stores**, pick a platform, fill metadata, and download the zip.

**Store accounts:** PWABuilder docs list developer account costs for Microsoft, Google Play, and Apple. Factor those into release planning alongside any Capgo subscription you choose for builds and live updates ([Capgo pricing](https://capgo.app/pricing/)).

**Updates without resubmitting:** PWABuilder documentation states that packaged PWAs load your live site, so content changes on the server reach users without republishing the store listing. Cached offline data can lag until the user is online again.

**Android:** Packaging uses Bubblewrap to produce a Trusted Web Activity (AAB/APK). The Android form can mark a build as compatible with Meta Quest devices via a checkbox that sets Bubblewrap's Meta Quest options (see PWABuilder Android packaging docs and the [CloudAPK `isMetaQuest` option](https://github.com/pwa-builder/CloudAPK/blob/master/build/androidPackageOptions.ts)).

**iOS:** PWABuilder produces a native WebView wrapper you build with **Xcode on a Mac**. Treat iOS as higher risk for App Review than a fully native Capacitor app with plugins and bundled assets.

**Microsoft Store:** PWABuilder is a Microsoft project with first-class Windows store packaging.

## PWABuilder vs Capacitor plus Capgo

| Topic | PWABuilder | Capacitor + Capgo |
| --- | --- | --- |
| Cost of packaging tool | Free (MIT) | Capacitor is open source; Capgo has free tier and paid plans |
| What ships in the app | Loads your hosted PWA URL (TWA / WebView) | Bundled static web build in native projects |
| Native APIs | Limited to what the wrapper exposes | Capacitor and Capgo plugins (camera, push, purchases, and more) |
| iOS build machine | Mac + Xcode for PWABuilder iOS output | Capgo Build can compile iOS in the cloud |
| Updating installed users | Deploy your website | Capgo live updates (web layer) plus store builds for native changes |
| Rollback | Follow your web deploy process | Capgo channels and rollback for bundles |
| Microsoft Store | Built-in PWABuilder path | Capacitor targets iOS and Android; use PWABuilder or another path for Microsoft Store |

**Choose PWABuilder when** your PWA already does everything you need in a browser or TWA, you want zero packaging fees, or Microsoft Store is a primary target.

**Choose Capacitor and Capgo when** you need native features, offline-first bundles, a more dependable iOS story, or managed live updates after the app is in the store.

## Prerequisites

| Requirement | Details |
| --- | --- |
| PWA source code | The repo that builds your manifest and service worker, not only the PWABuilder download |
| Node.js | 24 LTS recommended |
| Package manager | Bun (or npm if your project already uses it) |
| Capgo account | [Free signup](/register/) for live updates and Capgo Build |
| Store accounts | Apple Developer Program and Google Play developer account when you publish |

Optional: run [PWABuilder](https://www.pwabuilder.com/) first to confirm manifest and HTTPS scores before you invest in Capacitor.

## Step 1: Confirm you have the web project, not only the wrapper

PWABuilder's zip contains store projects (for example Bubblewrap Android or iOS WebView). Capacitor needs the **compiled web assets** from your framework.

1. Clone the repository that you deploy to the URL PWABuilder analyzed
2. Run your production build (`bun run build` or equivalent)
3. Confirm `index.html` exists in `dist`, `build`, `out`, or `www`

If you only have a static host folder and no framework build, copy the site into a child directory such as `www/`, initialize Capacitor at the project root, and set `--web-dir www` (Capacitor does not accept `.` as `webDir`).

Detailed WebView checks live in [Transform your PWA to a native app with Capacitor](/blog/transform-pwa-to-native-app-with-capacitor/).

## Step 2: Add Capacitor

From your PWA project root:

```bash
bun add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
bunx cap init "Your App" com.company.app --web-dir dist
bunx cap add ios && bunx cap add android
bun run build && bunx cap sync
```

Replace `dist` with your real output folder. Set `webDir` in `capacitor.config.ts` to match.

The full onboarding flow is in [Capgo CLI onboarding](/docs/getting-started/onboarding/) and the [PWABuilder to Capacitor docs](/docs/ai/pwabuilder-to-capacitor/).

## Step 3: Add Capgo and live updates

```bash
npx @capgo/cli@latest init
bun add @capgo/capacitor-updater && bunx cap sync
```

Configure `plugins.CapacitorUpdater` (CLI onboarding creates a default `production` channel) and upload your first bundle:

```bash
bun run build
npx @capgo/cli@latest bundle upload --channel=production --auto-bump
```

Live updates change web assets only. New plugins, permissions, or native code still need a store build. See [live update compatibility](/docs/live-updates/compatibility/).

## Step 4: Build iOS and Android in the cloud

You do not need a Mac on the main Capgo path:

```bash
npx @capgo/cli@latest build init
npx @capgo/cli@latest build request --platform ios
npx @capgo/cli@latest build request --platform android
```

See [Capgo Cloud Build](/docs/builder/getting-started/) and [Build iOS from Windows](/blog/build-ios-app-from-windows-capacitor-capgo-build/) if iOS signing is new to you.

## Step 5: CI for repeat releases

Wire bundle upload to your deploy pipeline, for example on each push to `main`:

```bash
bun ci && bun run build
npx @capgo/cli@latest bundle upload --channel=production --auto-bump
```

Example: [GitHub Actions integration](/docs/live-updates/integrations/github-actions/).

## Conclusion

PWABuilder is a strong free option when your PWA is store-ready and URL-based updates are enough. Capacitor with Capgo is the path when you outgrow hosted shells: native plugins, bundled offline experiences, cloud iOS builds, and controlled live updates.

### Next steps

- **[PWABuilder to mobile solution](/solutions/pwabuilder-to-mobile/)**: One-page playbook
- **[PWABuilder vs Capgo](/alternatives/pwabuilder/)**: Side-by-side facts
- **[PWA to Capacitor deep dive](/blog/transform-pwa-to-native-app-with-capacitor/)**: WebView and service worker details
- **[Capgo live updates](/live-update/)**: Channels, rollouts, and rollback

[Sign up for Capgo](/register/) to run Capgo Build and live updates on your Capacitor app.

## Resources

- [PWABuilder](https://www.pwabuilder.com/)
- [PWABuilder documentation](https://docs.pwabuilder.com/)
- [PWABuilder on GitHub](https://github.com/pwa-builder/PWABuilder)
- [Capacitor documentation](https://capacitorjs.com/docs)
- [Capgo PWABuilder to Capacitor docs](/docs/ai/pwabuilder-to-capacitor/)

## Keep going from PWABuilder to Capacitor

If you are using **PWABuilder to Capacitor** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for available plugins, [Capgo Native Builds](/native-build/) for cloud signing, and [Capgo live updates](/live-update/) for post-release web changes.