---
slug: preparing-for-capacitor-9
title: 'Preparing for Capacitor 9: What App and Plugin Teams Can Do Now'
description: >-
  Capacitor 9 raises the bar on Node, Xcode, Android Gradle, and deprecated native
  APIs. Here is how to get ready on Capacitor 8 before you flip the version switch,
  including Cordova optional sync, CLI live reload, and Capgo OTA store builds.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-09-14T10:00:00.000Z
updated_at: 2026-09-14T10:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: 'Preparing for Capacitor 9 Capgo blog illustration'
keywords: Capacitor, Capacitor 9, mobile app development, live updates, OTA updates, Gradle, Xcode, plugin migration
tag: Capacitor
published: true
locale: en
origin: human
next_blog: ''
---

Capacitor 9 is available on the `next` dist-tag while it moves toward general availability. You do not have to upgrade your app the day the alpha lands, but the [official Capacitor 9 update guide](https://capacitorjs.com/docs/next/updating/9-0) and [plugin update guide](https://capacitorjs.com/docs/next/updating/plugins/9-0) already spell out toolchain floors and API removals that are worth addressing early.

This article is a **preparation** checklist: work you can do on Capacitor 8 (or on a branch) so the eventual `npx cap migrate` pass is boring instead of painful. When you are ready to cut over, follow Ionic’s guides linked above line by line.

## Toolchain and platform floors (apps)

Plan your CI, local machines, and store pipelines around these minimums:

| Area | Capacitor 9 requirement |
| --- | --- |
| Node.js | **24+** (latest LTS recommended; npm 11 ships with Node 24) |
| Xcode | **27+** |
| iOS deployment target | **16.0+** |
| Android Studio | **2026.1.1+** |
| Android Gradle Plugin (AGP) | **9.2.1** |
| Gradle wrapper | **9.5.1** |

If you are still on Capacitor 8.4 or earlier for iOS, you also need the **UIScene lifecycle** work from the Capacitor 8.5 update before Cap 9 — Xcode 27 expects it. Apps already on 8.5 can skip that extra step.

On iOS, Swift 6 (with Xcode 27) rejects `@UIApplicationMain`; when you upgrade, replace it with `@main` in `AppDelegate.swift` as described in the official guide.

## Cordova at app sync time (not a plugin prep step)

In Capacitor 9, the Cordova compatibility layer is **only wired into your app when `cap sync` detects an installed Cordova plugin**. Android drops the extra Gradle modules when none are present; iOS stops adding `CapacitorCordova` to the Podfile or `Package.swift` when none are present.

That is an **app-level** behavior change after you upgrade. While you are still on Cap 8, you do not need to rip Cordova out of your template preemptively. Do audit whether any **custom native code** (yours or a forked plugin) imports Cordova symbols without an actual Cordova plugin in the project — those references will fail once optional Cordova wiring applies.

## Android: `gradle.properties` and AGP 9 defaults

The AGP Upgrade Assistant often writes explicit `gradle.properties` flags so builds keep AGP 8 behavior. Capacitor 9 apps should **remove** those entries instead of carrying them forward: most are deprecated ahead of AGP 10, and some break Cap 9 builds (for example `android.builtInKotlin=false` disables Kotlin support that AGP 9 bundles, and `android.sdk.defaultTargetSdkToCompileSdkIfUnset=false` stops AGP from inferring `targetSdkVersion`).

When you migrate, also expect to:

- Bump `variables.gradle` minimums (compile/target SDK 37, `minSdkVersion` 26, updated AndroidX versions — see the official doc).
- Remove explicit `targetSdkVersion` from the app `build.gradle` so AGP 9 can infer it from `compileSdkVersion`.
- Declare `variables.gradle` symbols at the top of `app/build.gradle` (Gradle 9.6 deprecates implicit lookup from the root project).
- Swap default ProGuard file names, migrate `core-ktx` to `androidx.core:core` 1.19.0+, drop standalone Kotlin Gradle plugin usage, and remove `jcenter()`.

You can read diff hunks in the [Updating to 9.0](https://capacitorjs.com/docs/next/updating/9-0) Android section and apply the same cleanups on a branch before bumping Capacitor versions.

## CLI: `cap run --url`

Capacitor 9 merges live-reload host/port/https flags into a single **`--url`** argument. Instead of:

```sh
npx cap run android -l --host 192.168.1.181 --port 5173
```

pass the URL your dev server prints:

```sh
npx cap run android --url http://192.168.1.181:5173/
```

Update scripts and README snippets now so muscle memory does not fight the new CLI after upgrade.

## Official plugins: push and splash gotchas

Two user-facing changes show up often in production apps:

**Push Notifications (iOS):** The deprecated `alert` presentation option is removed. Use **`banner`** and/or **`list`** in your presentation options.

**Splash Screen (Android):** Default `launchFadeOutDuration` changes from **200 ms to 0**. If you relied on the fade hiding first paint glitches, set `launchFadeOutDuration: 200` explicitly in `capacitor.config` until you adjust your startup UI.

Scan the plugin sections in the [9.0 update guide](https://capacitorjs.com/docs/next/updating/9-0) for AndroidX and Google Play Services version bumps tied to official plugins you use.

## Plugin maintainers: prep on Cap 8 without breaking Cap 8

If you ship Capacitor plugins consumed on Capacitor 8 **and** want Cap 9-ready code, focus on **deprecated API removal**, not on Cap-9-only packaging changes.

Safe to do while Cap 8 remains supported:

- Replace **`@NativePlugin`** with **`@CapacitorPlugin`** and migrate legacy permission / activity-result APIs to `@PermissionCallback` / `@ActivityCallback` patterns (see the [plugin 9.0 guide](https://capacitorjs.com/docs/next/updating/plugins/9-0) table).
- Remove **`PluginCall.hasOption`**, **`Plugin.getConfigValue`**, old **`CapConfig` constructors and getters**, **`PluginCall.save()` / `isSaved()`**, and other Java removals listed under “Breaking changes in code.”
- On iOS, stop using the **`CAPBridge`** compatibility class and deprecated **`CAPBridgeProtocol`** helpers; use `ApplicationDelegateProxy`, typed `PluginCall` accessors, and bridge properties from the migration table.
- Run **`npx @capacitor/plugin-migration-v8-to-v9@latest`** on a branch and keep only the API edits that still compile against Cap 8 peer dependencies until you publish a major for Cap 9.

**Do not remove the `Cordova` SPM product from your plugin’s `Package.swift` while you still support Capacitor 8.** Cap 8 projects expect that dependency when your plugin is SPM-based; dropping it early breaks consumers still on 8. Treat **optional Cordova / removing the unconditional `Cordova` product** as a **Capacitor 9-only** release line (or a semver major explicitly documented as Cap 9+), after you stop supporting Cap 8 — as described in the plugin guide, not as prep work on the Cap 8 line.

The same rule of thumb applies to bumping **`capacitor-swift-pm`** to `9.0.0-alpha.x` in `Package.swift`: that belongs on your Cap 9 major, not on a Cap-8-compatible release.

## Capgo live updates and the native Cap 9 store build

Capgo delivers **web bundle** updates over the air; the native shell still comes from the App Store and Google Play. When you move your app to Capacitor 9:

1. Ship **at least one store build** compiled against Capacitor 9 native projects (iOS and Android). That binary establishes the native baseline Capgo channels target.
2. Only after that build is in users’ hands should you rely on OTA bundles tested against Cap 9 WebView and plugin behavior.
3. Keep channel / semver rules aligned so you never push a bundle that assumes Cap 9 APIs to devices still running an older native shell.

If you use [Capgo Build](/native-build/) or your own CI, refresh macOS and Linux agents to Node 24+, Xcode 27+, and AGP 9.2.1 / Gradle 9.5.1 **before** the Cap 9 store release so the OTA pipeline matches what users install.

## Suggested order of operations

1. **Upgrade tooling** on CI and developer machines to the floors above (still building Cap 8 until you migrate).
2. **Fix deprecated native APIs** in app code and plugins (especially custom `AppDelegate` URL handling and Android bridge usage).
3. **Clean Android Gradle** files and scripts (`gradle.properties`, ProGuard defaults, `--url` in dev scripts).
4. **Audit Cordova** usage at the app level; do not change plugin SPM Cordova products until Cap 9-only releases.
5. When Cap 9 is GA (or when you accept `next`), run `npm i -D @capacitor/cli@next` (or `@latest` after release), then **`npx cap migrate`**, and follow [Updating to 9.0](https://capacitorjs.com/docs/next/updating/9-0).
6. **Publish the Cap 9 native build** to stores, then resume or expand Capgo OTA rollouts on the matching channel.

Capacitor 9 is mostly “pay down deprecations and align with modern Android and Apple toolchains.” Doing that work on Cap 8 keeps your upgrade diff small and your plugins compatible with the teams still shipping 8.x today.
