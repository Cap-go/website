---
slug: fix-capacitor-plugin-build-errors-with-agp-9
title: Capacitor Plugin Build Error AGP 9 Fix (proguard-android.txt Not Found)
description: Solve AGP 9 Capacitor plugin build errors fast. Learn why proguard-android.txt fails, how to use proguard-android-optimize.txt, and how Capgo fixed Android Gradle Plugin 9 issues across plugins.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-02-19T14:30:00.000Z
updated_at: 2026-02-20T02:55:43.000Z
head_image: https://assets.seobotai.com/capgo.app/680053ff28980901df1e733b-1744889496415.jpg
head_image_alt: Android Build Compatibility
keywords: Capacitor plugin build error, AGP 9, Android Gradle Plugin 9, proguard-android.txt not found, proguard-android-optimize.txt, fix AGP 9 build error, Gradle build failed, Capacitor Android build error, R8 ProGuard rules, Capgo plugins, Android plugin migration, Capacitor plugin AGP 9 fix
tag: Development, Android, Updates
published: true
locale: en
next_blog: ''
---

If your [Capacitor](https://capacitorjs.com/) plugin started failing after upgrading to Android Gradle Plugin 9 (AGP 9), you are likely hitting a small but critical Gradle configuration issue.

This post specifically targets common search intents like:

- Capacitor plugin build error AGP 9
- Android Gradle Plugin 9 plugin build failed
- `proguard-android.txt` not found
- AGP 9 `getDefaultProguardFile` error
- Capacitor Android build failed after AGP upgrade

The short version:

- `proguard-android.txt` is no longer the safe default baseline to reference in AGP 9 plugin builds.
- Switch to `proguard-android-optimize.txt`.
- Rebuild and verify.

The longer version matters too, especially if you maintain many plugins or large Capacitor workspaces. In this article we cover:

- What Android and AGP are in the build chain
- What Capacitor is and how plugin builds work
- What [Capgo](https://capgo.app/) is and why this matters for release reliability
- The exact AGP 9 change that breaks old plugin templates
- A safe migration strategy for one repo or many repos

## What is Android in this context?

[Android](https://developer.android.com/) is both an operating system and a build ecosystem. When you ship a Capacitor app or plugin on Android, your project goes through:

1. [Gradle](https://gradle.org/) as the build system.
2. [Android Gradle Plugin (AGP)](https://developer.android.com/build/releases/gradle-plugin) as Android-specific Gradle integration.
3. The Android SDK toolchain for packaging, shrinking, linting, and producing `.aar`, `.apk`, or `.aab` outputs.

When AGP versions change, some defaults and internal files can change too. A plugin configuration that worked for AGP 8 can fail on AGP 9 if it points to a removed or deprecated baseline.

## What is Capacitor?

[Capacitor](https://capacitorjs.com/) is a cross-platform runtime that lets you build iOS/Android apps with web code (TypeScript, JavaScript, HTML, CSS) while still calling native APIs.

Capacitor apps usually include:

- A web layer (your UI and business logic)
- Native shells (`ios/`, `android/`)
- Plugins that expose native features to JavaScript

Each plugin has its own native build configuration. On Android, this means each plugin includes an `android/build.gradle` file that AGP must parse and compile correctly.

If plugin Gradle settings are outdated, the whole app build can fail, even when your web code is correct.

## What is Capgo?

[Capgo](https://capgo.app/) provides tools around Capacitor delivery and operations:

- [Live updates](https://capgo.app/docs/plugin/cloud-mode/auto-update/) for web bundle changes
- Plugin ecosystem and native feature packages
- CI/CD-friendly update workflows for Capacitor teams

Even with live updates, native build stability is non-negotiable. You still need clean Android builds for:

- App Store / Play Store releases
- Native plugin upgrades
- Platform SDK migrations
- Team onboarding and CI reliability

That is why AGP 9 compatibility fixes are important: they keep your plugin layer dependable so delivery pipelines stay predictable.

## Why AGP 9 breaks older plugin configs

Many plugin templates historically used:

```kotlin
proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
```

In AGP 9 setups, this legacy baseline reference can fail because the old file is no longer guaranteed in the location expected by older templates/configs.

Typical symptoms include Gradle errors during `assemble`, `lint`, or `build` phases, often pointing to missing ProGuard baseline resources or invalid default file references.

## Quick background: ProGuard, R8, and baseline files

- [R8](https://developer.android.com/build/shrink-code) is the modern code shrinker/optimizer in Android builds.
- `proguard-rules.pro` is your project/plugin custom keep rules.
- `getDefaultProguardFile(...)` injects an Android-provided baseline.

When you reference:

- `proguard-android.txt` -> legacy, minimal baseline
- `proguard-android-optimize.txt` -> modern optimized baseline (recommended default in current setups)

For AGP 9 compatibility, switching to `proguard-android-optimize.txt` is the practical fix.

## The one-line fix

Update plugin and app module Gradle files:

```kotlin
proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
```

At minimum, check:

- `android/build.gradle` in each plugin
- `example-app/android/app/build.gradle` in plugin repos
- Any generator/template files that create new plugin Gradle config

## Migration guide for one plugin

### 1. Find the old reference

```bash
rg -n "proguard-android\\.txt" android example-app
```

### 2. Replace it

```bash
perl -pi -e "s/proguard-android\\.txt/proguard-android-optimize.txt/g" \
  android/build.gradle example-app/android/app/build.gradle
```

### 3. Verify with Bun

```bash
bun run verify:android
```

If your plugin has full verification scripts, run:

```bash
bun run verify
```

## Batch update all plugin repos

If you maintain many plugin repositories in one workspace, automate it:

```bash
rg -l "proguard-android\\.txt" capacitor-* \
  --glob '!**/node_modules/**' \
  --glob '!**/.gradle/**' \
  --glob '!**/build/**' \
| xargs perl -pi -e "s/proguard-android\\.txt/proguard-android-optimize.txt/g"
```

Then validate that no tracked plugin source still uses the old file:

```bash
for d in capacitor-*; do
  [ -d "$d/.git" ] || continue
  git -C "$d" grep -n "proguard-android\\.txt" -- || true
done
```

No matches means the old baseline reference is gone from tracked plugin files.

## Capgo rollout status

We completed this migration across all official Capgo Capacitor plugin repositories and templates:

- Plugin Android modules now reference `proguard-android-optimize.txt`
- Plugin example Android apps were updated too
- Plugin scaffolding templates were updated so new plugins are AGP 9-safe by default

This prevents a common class of AGP 9 upgrade failures before they hit CI.

## Why this is important even if your build passes today

You might not see failures immediately if:

- Your CI cache still masks the issue
- You have mixed AGP versions across projects
- Only some modules are rebuilt in local dev

But eventually, clean builds, new environments, or upgraded runners expose it. Doing the migration now removes hidden instability.

## Troubleshooting if builds still fail after the replacement

Check these points:

1. Every module is patched.
Look at plugin modules, app modules, samples, and template assets.

2. There is no second reference in shared scripts.
Search entire repositories (including custom Gradle scripts).

3. Caches are clean.
Run `./gradlew clean` and rebuild.

4. AGP / Gradle / JDK versions are aligned.
Use combinations supported by Android documentation for your AGP version.

5. CI uses the same versions as local.
Pin JDK and Gradle wrapper versions in CI to avoid environment drift.

6. You are not patching only `node_modules`.
Fix tracked plugin source, not transient dependency directories.

## SEO FAQ: AGP 9 Capacitor plugin build errors

### How do I fix `proguard-android.txt` not found in AGP 9?

Replace:

```kotlin
getDefaultProguardFile('proguard-android.txt')
```

With:

```kotlin
getDefaultProguardFile('proguard-android-optimize.txt')
```

Then run a clean rebuild.

### Why does my Capacitor plugin build fail after upgrading to Android Gradle Plugin 9?

Most failures come from legacy Gradle config in plugin `android/build.gradle` files that still reference `proguard-android.txt`. AGP 9 projects should use `proguard-android-optimize.txt`.

### What is the fastest AGP 9 migration path for many Capacitor plugins?

Use a workspace-wide search-and-replace command, then validate with `git grep` and run `bun run verify:android` on representative plugins.

### Is this only a Capacitor issue?

No. Any Android module (app or library) using deprecated ProGuard baseline references can hit similar AGP 9 build errors. It is especially visible in plugin ecosystems because many repositories share old templates.

### What keywords are relevant for this migration?

If you are documenting this in internal runbooks or support pages, include terms like:

- AGP 9 build error
- Android Gradle Plugin 9 ProGuard file missing
- Capacitor plugin Android build failed
- `proguard-android.txt` replacement
- `proguard-android-optimize.txt` migration

## Related links

- Android Developers: [Build your app overview](https://developer.android.com/build)
- Android Gradle Plugin: [Release notes](https://developer.android.com/build/releases/gradle-plugin)
- Android code shrinking: [R8 and rules](https://developer.android.com/build/shrink-code)
- Gradle docs: [Build tool fundamentals](https://docs.gradle.org/current/userguide/userguide.html)
- Capacitor docs: [Official documentation](https://capacitorjs.com/docs)
- Capgo docs: [Auto update docs](https://capgo.app/docs/plugin/cloud-mode/auto-update/)

## Final takeaway

This AGP 9 issue is simple, but it is easy to miss in multi-plugin workspaces. Once you replace `proguard-android.txt` with `proguard-android-optimize.txt` everywhere relevant, Android builds become predictable again.

If you use Capgo plugins, this migration is already applied in official repositories so you can upgrade with fewer surprises.
