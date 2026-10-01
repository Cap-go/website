---
slug: how-to-patch-a-capacitor-plugin
title: "How to Patch a Capacitor Plugin (Bun, npm, pnpm)"
description: "How to patch a Capacitor plugin with bun patch, patch-package or pnpm patch, apply native iOS and Android fixes, and decide when to fork or upstream."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Capgo plugins logo on a dark blue background for the guide on patching Capacitor plugins"
keywords: patch Capacitor plugin, bun patch, patch-package Capacitor, pnpm patch, fork Capacitor plugin, fix Capacitor plugin bug, capacitor-patch
tag: Capacitor, Development, Tutorial
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can I patch the native iOS and Android code of a Capacitor plugin?"
    answer: "Yes. Capacitor builds plugin native code straight from node_modules (Gradle includes the plugin's android folder, CocoaPods and SPM point to the plugin path). Patch the Swift, Kotlin, Java, Gradle, podspec or Package.swift files, then run cap sync and rebuild the app."
  - question: "Do I need patch-package if I use Bun?"
    answer: "No. Bun has built-in patching: bun patch <pkg>, edit the files, then bun patch --commit. Bun stores the diff in patches/ and records it under patchedDependencies in package.json, and reapplies it on every bun install."
  - question: "Can I ship a plugin patch with a live update?"
    answer: "Only if the change is in the plugin's JavaScript, which ends up in your web bundle. Native changes in Swift, Kotlin, Gradle or podspec files require a new App Store and Google Play build."
  - question: "What happens to my patch when I upgrade the plugin?"
    answer: "Patches are tied to an exact version. With Bun the key includes the version, so an upgrade needs a fresh patch. patch-package tries to apply the old diff and fails loudly if it no longer fits. Check whether the upstream release already contains the fix first."
  - question: "When should I fork instead of patching?"
    answer: "Fork when the change is large, touches many files, adds features, or must live for months. A long patch is hard to review and breaks on every upgrade. A fork published under your own npm scope is easier to version and test."
---

To patch a Capacitor plugin, edit the plugin's files in `node_modules`, save the change as a diff with `bun patch --commit` (or `patch-package` on npm and Yarn, `pnpm patch-commit` on pnpm), commit the generated file in `patches/`, then run `bunx cap sync` so the native projects pick it up. The package manager reapplies the patch on every install, for your team and in CI.

Patching is the right move when a plugin has a small bug, a version constraint that blocks your build, or an upstream fix that's merged but not released. This guide covers the workflow for each package manager, how native patches reach Xcode and Gradle, and when a fork or an upstream PR is the better call.

## Why patching works for native plugin code

A Capacitor plugin is an npm package with three parts: JavaScript in `dist/`, Android code in `android/`, and iOS code in `ios/` plus a podspec and/or `Package.swift`. Capacitor compiles the native parts directly from `node_modules`:

- **Android**: `android/capacitor.settings.gradle` includes each plugin's `android` folder from `node_modules`.
- **iOS with CocoaPods**: the Podfile references each plugin with `:path => '../../node_modules/...'`.
- **iOS with SPM**: `CapApp-SPM/Package.swift` references each plugin by local path in `node_modules`.

So a change to `node_modules/@scope/plugin/ios/Sources/...` ends up in your app binary after `cap sync` and a rebuild. Nothing needs to be published.

## Before you patch

1. **Check for a release.** Look at the plugin's changelog and open PRs. Upgrading is better than patching.
2. **Read the license.** MIT and Apache-2.0 allow private modifications. Copyleft licenses such as GPL or MPL-2.0 can require you to publish modified source when you distribute the app. Check before you ship.
3. **Write down why.** Put the issue URL or a one-line reason in your commit message. Six months later nobody remembers why `patches/` has a file in it.

## Patching with Bun

Bun has patching built in. No extra package, no `postinstall` script.

```bash
# 1. Prepare the package for editing
bun patch @capacitor/haptics

# 2. Edit files under node_modules/@capacitor/haptics

# 3. Save the patch
bun patch --commit node_modules/@capacitor/haptics
```

Step 1 makes Bun give you a private copy of the package in `node_modules`, so edits don't touch Bun's global cache. Step 3 writes a diff and records it in `package.json`:

```json
{
  "patchedDependencies": {
    "@capacitor/haptics@8.0.2": "patches/@capacitor%2Fhaptics@8.0.2.patch"
  }
}
```

Commit both `package.json` and the `patches/` folder. Every `bun install`, including `bun install --frozen-lockfile` in CI, applies the patch.

The key contains the exact version. If you bump the plugin, Bun no longer matches the patch, so recreate it for the new version or delete it if the fix shipped.

## Patching with npm or Yarn: patch-package

```bash
npm install --save-dev patch-package
```

Add a `postinstall` script so patches apply after every install:

```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

Then edit the files in `node_modules` and generate the patch:

```bash
npx patch-package @capacitor/haptics
```

This writes `patches/@capacitor+haptics+8.0.2.patch`. Commit it. If the patch stops applying after an upgrade, `patch-package` fails the install with a clear message.

Yarn Berry has its own `yarn patch <pkg>` / `yarn patch-commit -s <path>` flow that stores the patch in the `resolutions` field.

## Patching with pnpm

```bash
pnpm patch @capacitor/haptics
# edit the temporary folder pnpm prints
pnpm patch-commit <path-printed-above>
```

pnpm records the patch under `patchedDependencies` and applies it on install.

## Example: fix a native build error in a plugin

A common case: your app uses AGP 9, and an older plugin's `android/build.gradle` still references `proguard-android.txt`, which AGP 9 rejects. You can't wait for a release.

```bash
bun patch some-capacitor-plugin
```

Edit `node_modules/some-capacitor-plugin/android/build.gradle`:

```diff
 buildTypes {
     release {
         minifyEnabled false
-        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
+        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
     }
 }
```

Save and sync:

```bash
bun patch --commit node_modules/some-capacitor-plugin
bunx cap sync android
cd android && ./gradlew assembleDebug
```

The full background on this error is in [fix Capacitor plugin build errors with AGP 9](/blog/fix-capacitor-plugin-build-errors-with-agp-9/).

## Example: relax an iOS dependency constraint

Two plugins pin different versions of the same SDK and CocoaPods can't resolve them. If you've verified the plugin works with the newer SDK, relax its podspec:

```diff
-  s.dependency 'FirebaseMessaging', '11.15.0'
+  s.dependency 'FirebaseMessaging', '>= 11.15.0', '< 13.0'
```

For SPM apps, the same constraint lives in the plugin's `Package.swift`:

```diff
-  .package(url: "https://github.com/firebase/firebase-ios-sdk.git", exact: "11.15.0")
+  .package(url: "https://github.com/firebase/firebase-ios-sdk.git", "11.15.0"..<"13.0.0")
```

Then:

```bash
bunx cap sync ios
```

With CocoaPods you may need `cd ios/App && pod update FirebaseMessaging` once, because `Podfile.lock` still holds the old version. With SPM, use **File > Packages > Resolve Package Versions** in Xcode.

## Patching Capacitor core itself

Sometimes the bug is in `@capacitor/android`, `@capacitor/ios` or the CLI, and the fix sits in an upstream pull request. You can patch those packages the same way, but every team ends up maintaining the same diffs.

Capgo publishes [`@capgo/capacitor-patch`](/plugins/capacitor-patch/) for this. It's a hook-only package with a catalog of small, version-gated patches that link back to their upstream PRs. It does nothing until you opt in:

```bash
bun add @capgo/capacitor-patch
bunx capgo-capacitor-patch list --all
```

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist',
  plugins: {
    CapacitorPatch: {
      patches: ['upstream-pr-8418-android'],
      strict: true,
    },
  },
};

export default config;
```

Package patches run before `cap sync` and `cap update`, and native project patches run after. `bunx capgo-capacitor-patch doctor` does a dry run. With `strict: true`, sync fails when a selected patch no longer applies, which tells you when an upgrade made it obsolete. See the [plugin docs](/docs/plugins/capacitor-patch/) for the full option list.

## Patch, fork, or upstream?

| Situation | Best option |
| --- | --- |
| A few lines, fix already merged upstream | Patch, remove after next release |
| Version constraint too strict | Patch, open an issue upstream |
| Bug with no upstream fix yet | Patch and send a PR with the same diff |
| New feature or large refactor | Fork, publish under your scope |
| Plugin abandoned | Fork, or switch to a maintained plugin |

### Forking well

If you fork, publish it so installs stay reproducible:

```bash
# in the fork, rename to your scope in package.json: "@acme/capacitor-foo"
bun run build
bun publish --access restricted
```

Installing from a git URL also works, but the plugin's `dist/` folder must exist in that branch or be built by a `prepare` script, and not every package manager runs dependency lifecycle scripts by default. A published package avoids that.

Remember that the npm name changes the native module name the CLI generates for SPM (`@acme/capacitor-foo` becomes `AcmeCapacitorFoo`), so update the fork's `Package.swift` to match. Details are in [migrate a Capacitor plugin to SPM](/blog/migrate-capacitor-plugin-to-swift-package-manager/).

Before you fork a plugin for a missing feature, check the [Capgo plugin directory](/plugins/). There may already be a maintained plugin that covers it.

### Upstreaming

The goal is to delete your patch. Open an issue with a minimal repro, your Capacitor and plugin versions, and the patch diff. Then open a PR. Maintainers merge small, tested fixes much faster than issue reports alone.

## Patches and live updates

Your web bundle includes the plugin's JavaScript from `dist/`, so a patch to the JS side ships with the next web build. With [Capgo live updates](/live-update/) that reaches users without a store release.

Native patches are different. Changes to Swift, Kotlin, Java, Gradle, podspec or `Package.swift` only take effect in a new native build submitted to the stores. Don't push a web bundle that depends on a native patch to users who still run the old binary. Capgo's [compatibility check](/docs/live-updates/compatibility/) compares native plugin versions between a bundle and a channel to catch this.

## Troubleshooting

**The patch isn't applied in CI.** Make sure `patches/` is committed and not ignored. For patch-package, check that CI doesn't use `--ignore-scripts`, which skips `postinstall`. For Bun, check `patchedDependencies` is in the committed `package.json`.

**My native change has no effect.** You edited the file but didn't rebuild. Run `bunx cap sync`, then clean: in Xcode **Product > Clean Build Folder**, on Android `./gradlew clean`. With SPM, also reset package caches.

**`bun patch --commit` says there are no changes.** You edited a file that isn't part of the package (for example a hoisted copy in another folder). Edit the path Bun printed in step 1.

**Patch fails after upgrading the plugin.** Check whether the fix is in the new release. If not, redo the patch against the new version.

**The plugin builds, but the app crashes on that feature.** Patches skip the plugin's own test suite. Test the patched path on a real device on both platforms. The [Capacitor iOS troubleshooting guide](/blog/troubleshooting-capacitor-ios-build-errors/) and [Android troubleshooting guide](/blog/troubleshooting-capacitor-android-build-errors/) cover how to read native logs.
