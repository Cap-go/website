---
slug: upgrade-capacitor-app-to-capacitor-8
title: "How to Upgrade Your Capacitor App to Capacitor 8"
description: "Upgrade a Capacitor app to Capacitor 8: Node 22, Xcode 26, iOS 15, Android SDK 36, AGP 8.13, System Bars, SPM default, and fixes for common errors."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Capacitor logo on a dark blue background for the Capacitor 8 upgrade guide"
keywords: upgrade to Capacitor 8, Capacitor 8 migration, cap migrate, Capacitor 7 to 8, Capacitor 8 breaking changes, Android SDK 36, Xcode 26, System Bars, edge-to-edge
tag: Capacitor, Migration, Tutorial
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What are the minimum requirements for Capacitor 8?"
    answer: "Capacitor 8 needs Node.js 22 or later, Xcode 26 or later, an iOS deployment target of 15.0, Android Studio Otter (2025.2.1) or later, minSdkVersion 24, compileSdkVersion and targetSdkVersion 36, Android Gradle Plugin 8.13.0, Gradle 8.14.3, and a JDK 21 for Android builds."
  - question: "Does upgrading to Capacitor 8 force my iOS app onto Swift Package Manager?"
    answer: "No. Existing apps keep their current setup. SPM only becomes the default when you create a new iOS platform with cap add ios. If you delete the ios folder and want to stay on CocoaPods, run bunx cap add ios --packagemanager CocoaPods."
  - question: "Can I skip from Capacitor 6 straight to Capacitor 8?"
    answer: "Yes, but apply the Capacitor 7 changes too. Run the 7 migration first (or read its guide), build both platforms, then run the 8 migration. Doing both in one jump makes it harder to tell which change broke the build."
  - question: "Why does my content now sit under the status bar on Android after upgrading?"
    answer: "Capacitor 8 removed android.adjustMarginsForEdgeToEdge. Safe areas are now handled by the System Bars core plugin and CSS env(safe-area-inset-*) values. Add viewport-fit=cover to your viewport meta tag and pad your layout with the safe area variables."
  - question: "Do live updates keep working after a Capacitor 8 upgrade?"
    answer: "Yes, but ship a new store build first. A web bundle built against Capacitor 8 plugins should only reach devices running the Capacitor 8 native binary. With Capgo, use separate channels or native version checks so older binaries don't receive incompatible bundles."
---

To upgrade a Capacitor app to Capacitor 8, install Node.js 22+, Xcode 26+ and Android Studio Otter, update `@capacitor/cli` to the latest 8.x, run `bunx cap migrate`, then fix whatever the migrator reports. The main breaking changes are iOS 15 as the minimum deployment target, Android SDK 36 with minSdk 24, AGP 8.13 with Gradle 8.14.3, and the removal of `adjustMarginsForEdgeToEdge` in favor of the new System Bars plugin.

This guide walks through the automated path, every manual step behind it, and the errors people hit most often after the upgrade. If you maintain a plugin rather than an app, read [How to Upgrade Your Capacitor Plugin to Capacitor 8](/blog/upgrade-capacitor-plugin-to-capacitor-8/) instead.

## Capacitor 8 requirements at a glance

Check your toolchain before touching the project. Most failed upgrades are an old JDK, an old Xcode, or an old Node in CI, not the code.

| Area | Capacitor 7 | Capacitor 8 |
| --- | --- | --- |
| Node.js | 20+ | 22+ (the CLI declares `engines.node >= 22.0.0`) |
| Xcode | 16+ | 26+ |
| iOS deployment target | 14.0 | 15.0 |
| Android Studio | Ladybug | Otter 2025.2.1+ |
| minSdkVersion | 23 | 24 |
| compileSdkVersion / targetSdkVersion | 35 | 36 |
| Android Gradle Plugin | 8.7.2 | 8.13.0 |
| Gradle wrapper | 8.11.1 | 8.14.3 |
| Kotlin (if used) | 1.9.25 | 2.2.20 |
| JDK for Android builds | 21 | 21 (`@capacitor/android` compiles with Java 21) |
| New iOS platform default | CocoaPods | Swift Package Manager |

Xcode 26 is not only a Capacitor requirement. Since April 28, 2026, App Store Connect rejects uploads built with an older Xcode, so you need it anyway. See [Apple's Xcode 26 requirement for Capacitor apps](/blog/xcode-26-requirement-for-capacitor-apps/) for the details.

## Before you start

1. Commit everything, or create a branch. The migrator edits native files in place.
2. Make sure the app builds on Capacitor 7 today. Upgrading a broken project only adds noise.
3. If you are on Capacitor 6 or older, do the previous major first. Each major has its own migration logic in the CLI.
4. List your plugins with `bunx cap ls` and check that each one has a release supporting Capacitor 8. Look at the `peerDependencies` of the latest version:

```bash
bun pm view @capgo/capacitor-updater peerDependencies
```

A plugin with `@capacitor/core: ^7.0.0` as its peer will install with warnings and may fail to compile. Capgo plugins follow the Capacitor major in their own version number, so `@capgo/*` 8.x releases target Capacitor 8.

5. Update local and CI toolchains: Node 22, Xcode 26, JDK 21, Android Studio Otter. In GitHub Actions, pin a macOS image that ships Xcode 26 and use `actions/setup-java` with `java-version: '21'`.

## Option 1: upgrade with `cap migrate`

The CLI ships a migration command that handles most of the work. Install the latest CLI, then run it:

```bash
bun add -D @capacitor/cli@latest
bunx cap migrate
```

The migrator asks whether it should install the new Capacitor packages and lets you pick npm, Yarn, pnpm or Bun. Pick Bun if your project has a `bun.lock`. You can skip the prompt with `bunx cap migrate --noprompt`.

What it changes for you:

- Bumps `@capacitor/core`, `@capacitor/ios`, `@capacitor/android` and official `@capacitor/*` plugins to 8.x.
- Sets `IPHONEOS_DEPLOYMENT_TARGET = 15.0` in the Xcode project and `platform :ios, '15.0'` in the Podfile.
- Updates `variables.gradle`, the AGP classpath, the Gradle wrapper and `kotlin_version`.
- Adds `density` to `android:configChanges` in `AndroidManifest.xml`.

Read the full output. When a step cannot be applied, for example because a file was customized, the CLI prints an error with the file name and continues. Those lines are your manual to-do list.

When it finishes:

```bash
bun run build
bunx cap sync
```

Then open each platform and build it once from the IDE so you see native errors in full.

## Option 2: upgrade manually

If your native projects are heavily customized, or the migrator skipped steps, apply the changes by hand. These match the [official Capacitor 8 upgrade guide](https://capacitorjs.com/docs/updating/8-0).

### Update the npm packages

```bash
bun add @capacitor/core@latest @capacitor/ios@latest @capacitor/android@latest
bun add -D @capacitor/cli@latest
```

Then update each official plugin, for example:

```bash
bun add @capacitor/app@latest @capacitor/splash-screen@latest @capacitor/status-bar@latest
```

### iOS: raise the deployment target to 15.0

In Xcode, select the project, open **Build Settings**, find **iOS Deployment Target** under **Deployment** and set it to 15.0. Repeat for every app target, including extensions.

If the app still uses CocoaPods, update `ios/App/Podfile`:

```ruby
platform :ios, '15.0'
```

Then run `bunx cap sync ios`, which runs `pod install` for you.

If the app uses SPM, the CLI regenerates `ios/App/CapApp-SPM/Package.swift` on every sync with the right platform version and an exact `capacitor-swift-pm` version that matches your installed `@capacitor/ios`. Don't edit that file by hand.

### iOS: remove custom view controller notifications

Capacitor 8 now emits `CAPBridgeViewController` notifications for `viewDidAppear` and `viewWillTransition` itself. If you added an extension or subclass to post `.capacitorViewDidAppear` or `.capacitorViewWillTransition`, delete it, or listeners will fire twice.

### Android: update Android Studio and AGP

Install Android Studio Otter or newer, open the `android` folder and run **Tools > AGP Upgrade Assistant**. Choose 8.13.0 and run the selected steps. Or edit `android/build.gradle` directly:

```groovy
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:8.13.0'
        classpath 'com.google.gms:google-services:4.4.4'
    }
}
```

And `android/gradle/wrapper/gradle-wrapper.properties`:

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.14.3-all.zip
```

### Android: update `variables.gradle`

```groovy
ext {
    minSdkVersion = 24
    compileSdkVersion = 36
    targetSdkVersion = 36
    androidxActivityVersion = '1.11.0'
    androidxAppCompatVersion = '1.7.1'
    androidxCoordinatorLayoutVersion = '1.3.0'
    androidxCoreVersion = '1.17.0'
    androidxFragmentVersion = '1.8.9'
    coreSplashScreenVersion = '1.2.0'
    androidxWebkitVersion = '1.14.0'
    junitVersion = '4.13.2'
    androidxJunitVersion = '1.3.0'
    androidxEspressoCoreVersion = '3.7.0'
    cordovaAndroidVersion = '14.0.1'
}
```

Keep any extra variables your plugins read (for example `firebaseMessagingVersion`). Official plugin bumps for Capacitor 8 include `firebaseMessagingVersion = '25.0.1'`, `androidxBrowserVersion = '1.9.0'`, `androidxMaterialVersion = '1.13.0'` and `androidxExifInterfaceVersion = '1.4.1'`.

### Android: switch to `=` assignment in Gradle files

Gradle deprecated the space-assignment syntax. It only warns today, but it will break in a future Gradle release, so fix it now in `android/app/build.gradle`:

```diff
android {
-    namespace "com.example.app"
-    compileSdk rootProject.ext.compileSdkVersion
+    namespace = "com.example.app"
+    compileSdk = rootProject.ext.compileSdkVersion
     defaultConfig {
         aaptOptions {
-            ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
+            ignoreAssetsPattern = '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
         }
     }
}
```

Method calls such as `google()` or `mavenCentral()` stay as they are.

### Android: Kotlin and `configChanges`

If your app module uses Kotlin, set `kotlin_version = '2.2.20'`. Kotlin 2.x turns the old `kotlinOptions {}` block into an error, so move `jvmTarget` into `kotlin { compilerOptions { ... } }`.

Then add `density` to the main activity so the WebView isn't recreated when the display density changes (foldables, window resizing, display size settings):

```xml
android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation|density"
```

### Android: the bridge layout was renamed

`bridge_layout_main.xml` no longer exists. If your `MainActivity` or a custom fragment referenced `R.layout.bridge_layout_main`, use `R.layout.capacitor_bridge_layout_main`.

## Edge-to-edge and the new System Bars plugin

This is the change most likely to show up visually. Capacitor 8 removed `android.adjustMarginsForEdgeToEdge` and added a core System Bars plugin. You don't install it, it ships with `@capacitor/core`.

Android 15 forces edge-to-edge for apps targeting SDK 35, and Android 16 removes the opt-out for apps targeting SDK 36. Capacitor 8 targets 36, so your web content now draws behind the status and navigation bars unless you handle insets.

The plugin config lives under `plugins.SystemBars`:

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist',
  plugins: {
    SystemBars: {
      // 'css' (default) injects --safe-area-inset-* variables on Android
      // 'native' relies on env() and viewport-fit
      // 'disable' leaves inset handling entirely to you
      insetsHandling: 'css',
      initialViewportFitValueHint: 'cover',
    },
  },
};

export default config;
```

With `css` or `native`, newer Android WebViews (Chromium 140+) honor `viewport-fit=cover` and report real `env(safe-area-inset-*)` values. On older WebViews, Capacitor pads the WebView and sets the env values to `0px`. So set the meta tag and use the variables:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

At runtime you can change bar style or visibility:

```ts
import { SystemBars, SystemBarsStyle, SystemBarType } from '@capacitor/core';

await SystemBars.setStyle({ style: SystemBarsStyle.Dark });
await SystemBars.hide({ bar: SystemBarType.NavigationBar });
```

Ionic Framework apps already use the safe-area variables, so they usually only need the meta tag. Our older post on [edge-to-edge without plugins](/blog/capacitor-edge-to-edge-display-native-config/) describes the Capacitor 7 option, which no longer exists in 8.

## Other behavior changes to check

- **`appendUserAgent` on iOS**: Capacitor 7 added two spaces before your string, Capacitor 8 adds one. If your server parses the user agent strictly, add a leading space to `ios.appendUserAgent` (not the root option, which also affects Android).
- **Screen Orientation and Barcode Scanner**: on Android 16+ large screens, orientation locks are ignored. A temporary opt-out exists through the `android.window.PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY` manifest property, but Android 17 drops it.
- **Geolocation**: `timeout` now applies to all requests on Android and iOS. If you see new timeouts, raise the value. `watchPosition` on Android gained an `interval` option.
- **Status Bar**: the plugin no longer ships its own `CAPBridgeViewController` notification files, since core now emits those events.
- **New iOS platforms default to SPM**: `bunx cap add ios` now creates an SPM project. Use `--packagemanager CocoaPods` if you need the old template. See [how to use CocoaPods with Capacitor 8](/blog/use-cocoapods-with-capacitor-8/).

## Verify the upgrade

Run through this list on both platforms before you ship:

```bash
bunx cap doctor
bunx cap sync
bunx cap run ios
bunx cap run android
```

- `cap doctor` shows matching 8.x versions for core, CLI, iOS and Android.
- App launches, splash screen hides, deep links open the right screen.
- Status bar and navigation bar areas look right on an Android 15/16 device and on a notched iPhone.
- Push notifications, camera, file access and any plugin with native permissions still work.
- A release build (Archive in Xcode, `./gradlew bundleRelease`) succeeds, not only debug.

If you don't want to maintain Xcode 26 and JDK 21 on every machine, [Capgo Build](/native-build/) runs the iOS and Android builds in the cloud with current toolchains.

## Ship the upgrade safely with live updates

A Capacitor major upgrade changes native code, so it has to go through the App Store and Google Play. Web bundles built after the upgrade may call plugin APIs that older binaries don't have.

If you use [Capgo live updates](/live-update/), keep Capacitor 7 users and Capacitor 8 users apart until adoption catches up: bump your native version, upload new bundles to a channel used by the new binary, and run the [compatibility check](/docs/live-updates/compatibility/) before you upload:

```bash
bunx @capgo/cli@latest bundle compatibility
```

It compares the native plugin versions in your bundle with what's running on the channel and flags mismatches before users get a broken update.

## Troubleshooting common Capacitor 8 upgrade errors

**`The engine "node" is incompatible` or the CLI refuses to run.** You are on Node 20 or older. Install Node 22 LTS, and update your CI image too.

**`error: invalid source release: 21` on Android.** Gradle is running with JDK 17. Point Android Studio to its bundled JDK 21 (**Settings > Build, Execution, Deployment > Build Tools > Gradle > Gradle JDK**) and set `JAVA_HOME` to a JDK 21 for command-line and CI builds.

**`Minimum supported Gradle version is 8.13`.** You updated AGP but not the wrapper. Set the wrapper to 8.14.3.

**`Dependency ... requires libraries and applications that depend on it to compile against version 36`.** `compileSdkVersion` is still 35 somewhere. Check `variables.gradle` and any plugin that hardcodes it.

**`Using 'kotlinOptions' ... is an error`** or similar Kotlin DSL errors. A plugin or your app module still uses `kotlinOptions`. Update the plugin, or patch it until a release lands (see [how to patch a Capacitor plugin](/blog/how-to-patch-a-capacitor-plugin/)).

**Xcode: `No such module 'Capacitor'` after upgrading.** For CocoaPods, open `App.xcworkspace`, not `App.xcodeproj`, and rerun `bunx cap sync ios`. For SPM, use **File > Packages > Reset Package Caches**.

**`"X" plugin is not implemented on ios/android`.** The plugin didn't get synced, or it has no Capacitor 8 / SPM-compatible release. Run `bunx cap sync` and read the warnings.

For a longer list, see the [Capacitor iOS troubleshooting guide](/blog/troubleshooting-capacitor-ios-build-errors/) and the [Android troubleshooting guide](/blog/troubleshooting-capacitor-android-build-errors/). Mismatched core and plugin versions are covered in [fix Capacitor version mismatch errors](/blog/fix-capacitor-version-mismatch-errors/).

## Let an AI agent do the boring parts

If you use Claude Code, Cursor or a similar agent, the open [Capgo Skills](/skills/) include `capacitor-app-upgrade-v7-to-v8` and `capacitor-app-upgrades` for multi-major jumps. Install them with `bunx skills add Cap-go/capgo-skills` and ask the agent to upgrade the app. It runs the migrator, then checks the steps the CLI usually misses, such as Gradle syntax, Kotlin options and CI images.

## What comes next

Capacitor 9 is already in prerelease. Once you're stable on 8, read [Preparing for Capacitor 9](/blog/preparing-for-capacitor-9/) so the next upgrade is smaller.
