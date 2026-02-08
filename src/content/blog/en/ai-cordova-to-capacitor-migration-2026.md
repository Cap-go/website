---
slug: ai-cordova-to-capacitor-migration-2026
title: "AI-Assisted Cordova to Capacitor Migration (2026): Step-by-Step + Plugin Replacements"
description: A 2026, AI-assisted guide to migrate from Apache Cordova to Capacitor with a practical checklist, plugin replacement table, and Capgo plugin recommendations.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-02-08T00:00:00.000Z
updated_at: 2026-02-08T00:00:00.000Z
head_image: /capgo_banner.webp
head_image_alt: Mobile Development
keywords: cordova to capacitor migration, migrate cordova to capacitor, capacitor 2026, capgo plugins, capacitor plugins, live updates, bun, bunx
tag: Development, Capacitor, Migration, AI
published: true
locale: en
next_blog: ''
---

Cordova got many teams to production fast. But in 2026, most teams moving forward on hybrid mobile have the same goal: **keep their web code, modernize the native layer, and stop fighting plugin drift**.

Capacitor is a pragmatic upgrade path: you ship a real iOS/Android project (Xcode/Android Studio), keep your existing web app, and replace old Cordova plugins with maintained Capacitor-first alternatives.

This guide is **based on the official “Migrating from Cordova to Capacitor” docs** and adds what those docs do not: a **plugin replacement map**, **Capgo-first alternatives**, and **copy/paste AI prompts** you can use to accelerate the migration.

- Official reference: <https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor>

## DIY vs All-Inclusive Migration (Pick Your Risk Level)

You can migrate on your own (this post), or you can offload the high-risk parts.

- **DIY path**: use this checklist, replace plugins early, and ship the first Capacitor release with a conservative rollout plan.
- **All-inclusive path**: if you want Capgo to handle the migration end-to-end, see our **Cordova to Capacitor** service page: [Capgo Cordova to Capacitor migration](/solutions/cordova-to-capacitor/).

If you want a safety net for the hard native issues (CI, signing, crashes, app store blockers), Capgo also offers [Premium Support](/premium-support/).

## What Changes When You Leave Cordova

Cordova feels like “a wrapper project” around your web app. Capacitor is closer to “a native app that hosts your web app”.

That difference pays off:

- **Native projects are first-class**: you debug with Xcode/Android Studio, use modern tooling, and keep platform tweaks where they belong.
- **Plugin APIs are typically typed and maintained**: fewer runtime surprises, better upgrade paths.
- **You can modernize incrementally**: keep some Cordova plugins temporarily, but move to Capacitor-native plugins over time.

## Migration Checklist (Practical Order)

### 1) Audit Your Cordova App (1 hour that saves days)

Export what you have today:

```bash
# In your Cordova project
cordova plugin list
cordova platform ls
```

Collect:

- `config.xml` preferences (orientation, status bar, etc.)
- Plugin variables (API keys, manifest placeholders, URL schemes)
- Custom hooks/scripts you rely on
- Any native edits done directly inside `platforms/` (often “lost” on rebuilds)

This is the input your AI prompt (below) will need.

### 2) Add Capacitor to Your Web App

Install the core packages:

```bash
bun add @capacitor/core @capacitor/cli
bunx cap init
```

Pick:

- `appId`: your reverse-domain identifier (ex: `com.company.app`)
- `appName`: user-facing name
- `webDir`: your build output folder (ex: `dist`, `build`, `www`)

Capacitor will generate `capacitor.config.*` (prefer `capacitor.config.ts` for maintainability).

### 3) Add iOS + Android Projects

```bash
bun add @capacitor/ios @capacitor/android
bunx cap add ios
bunx cap add android
```

From here on: **treat `ios/` and `android/` as real native projects**. Commit them. Review changes. Upgrade intentionally.

### 4) Wire Your Build Output

Capacitor loads your web bundle from `webDir`. Make sure your build actually outputs there:

```bash
bun run build
bunx cap sync
```

### 5) Replace Cordova Plugins (Do This Early)

You can run some Cordova plugins in Capacitor as a temporary bridge, but it’s usually better to replace them with **Capacitor-first plugins** (typed APIs, fewer edge cases, easier upgrades).

Here’s a high-signal replacement table you can start with:

| If you used in Cordova | Cordova plugin (examples) | Capacitor / Capgo replacement |
| --- | --- | --- |
| Camera capture | `cordova-plugin-camera` | Capacitor Camera (`@capacitor/camera`) or advanced preview overlays with `@capgo/capacitor-camera-preview` |
| Filesystem | `cordova-plugin-file` | Capacitor Filesystem (`@capacitor/filesystem`) or richer file ops/pickers with `@nicholasalx/capacitor-file` + `@nicholasalx/capacitor-file-picker` |
| In-app browser | `cordova-plugin-inappbrowser` | `@nicholasalx/capacitor-inappbrowser` |
| Geolocation (foreground) | `cordova-plugin-geolocation` | Capacitor Geolocation (`@capacitor/geolocation`) |
| Geolocation (background) | Various background GPS plugins | `@capgo/capacitor-background-geolocation` |
| Biometrics | Many biometric plugins | `@capgo/capacitor-native-biometric` |
| Social login | `cordova-plugin-facebook4`, etc. | `@capgo/capacitor-social-login` |
| SQLite | `cordova-sqlite-storage` | `@nicholasalx/capacitor-data-storage-sqlite` (or `@nicholasalx/capacitor-fast-sql` for performance) |
| Purchases / IAP | Mixed community plugins | `@capgo/capacitor-native-purchases` |
| Document scanning | Various scanner plugins | `@capgo/capacitor-document-scanner` |
| OTA / Live Updates | Appflow or custom loaders | `@capgo/capacitor-updater` (secure, production-grade live updates) |

Installation pattern (repeat per plugin):

```bash
bun add <plugin-package>
bunx cap sync
```

Tip: If you’re unsure which plugin is the best replacement, browse the Capgo plugin catalog and map by capability: [Capgo plugins](/plugins/).

### 6) Migrate `config.xml` Settings to “The Right Place”

In Cordova, `config.xml` did a lot. In Capacitor:

- App identity goes in `capacitor.config.ts` (`appId`, `appName`, `webDir`)
- Many preferences become **native settings** (Xcode project settings, AndroidManifest, Gradle)
- Icons/splashes are typically generated

Generate icons/splashes:

```bash
bunx @capacitor/assets generate
bunx cap sync
```

### 7) Run and Debug Like a Native App

```bash
bunx cap open ios
bunx cap open android
```

At this point, treat migration as two parallel tracks:

- Web app parity (routing, auth, API calls)
- Native parity (permissions, notifications, deep links, background tasks)

## Why We Recommend Capgo Plugins During Migration

Migration is the worst time to accept “it kinda works” plugin behavior. You need:

- stable APIs
- maintained native code
- predictable upgrades
- production support for edge cases

Capgo’s plugin ecosystem is built around real-world Capacitor apps (not demo projects), and it pairs naturally with **Capgo Live Updates** (`@capgo/capacitor-updater`) so you can ship fixes fast after you cut over from Cordova.

## Use Capgo “Skills” With Your AI Agent (Built for Migrations)

If you’re using an AI coding agent (Cursor, Claude Code, etc.), you’ll get better results if the agent follows a consistent playbook for Capacitor migrations.

Capgo publishes an open-source set of **AI agent skills** for Capacitor, including plugins, best practices, debugging, CI/CD, and live updates: [Capacitor Skills for AI Agents](/skills/).

## AI Prompts You Can Copy/Paste (Designed for Real Migrations)

These prompts are written to get useful output from an LLM. Replace the placeholders with your own app details.

### Prompt 1: Build a Plugin Replacement Plan

```text
You are a senior Capacitor engineer.

I am migrating a Cordova app to Capacitor. Here is my `cordova plugin list` output:
<PASTE HERE>

1) Create a table mapping each Cordova plugin to a recommended Capacitor alternative.
2) Prefer official Capacitor plugins when possible.
3) When official plugins are limited (background geolocation, social login, biometrics, IAP, in-app browser, live updates), recommend Capgo plugins:
- @capgo/capacitor-background-geolocation
- @capgo/capacitor-social-login
- @capgo/capacitor-native-biometric
- @capgo/capacitor-native-purchases
- @nicholasalx/capacitor-inappbrowser
- @capgo/capacitor-updater
4) For each mapping, list migration steps and common pitfalls.
Return a prioritized plan (highest risk first).
```

### Prompt 2: Convert `config.xml` Preferences Into Capacitor + Native Changes

```text
You are migrating Cordova to Capacitor.

Here is my Cordova `config.xml`:
<PASTE HERE>

Create a migration checklist:
1) What goes into capacitor.config.ts (appId, appName, webDir, server config for dev only).
2) What must be moved to iOS (Info.plist, entitlements, URL schemes, permissions strings).
3) What must be moved to Android (AndroidManifest, Gradle, intent filters, permissions).
Be explicit about file names and what to change.
```

### Prompt 3: Refactor JS Bridge Calls to Reduce Native Overhead

```text
You are optimizing a Capacitor migration.

Here is a module from my Cordova app that calls plugins frequently:
<PASTE CODE HERE>

Refactor it for Capacitor best practices:
- reduce bridge calls (batch when possible)
- add availability checks before calling native APIs
- use lazy/dynamic imports for plugins
Return TypeScript code.
```

### Prompt 4: Create a Cutover Test Plan (Real Devices, Real Risks)

```text
You are the QA lead for a Cordova -> Capacitor migration.

App description:
<PASTE HERE>

Features that rely on native plugins:
<LIST HERE>

Create a test plan for iOS and Android that includes:
- permission flows (fresh install, denied, restricted, limited)
- background behavior (if any)
- deep links / universal links (if any)
- upgrade path from the existing Cordova app version
Output as a checklist that an engineer can run in 2-3 hours per release candidate.
```

### Prompt 5: Add Live Updates Safely After Migration

```text
You are implementing Capgo Live Updates in a Capacitor app.

Constraints:
- Must stay compliant with App Store / Play Store rules
- Need rollback and staged rollout (channels)

Give me:
1) Installation steps for @capgo/capacitor-updater (bun + bunx).
2) A safe rollout strategy for the first 30 days after migrating from Cordova.
3) A monitoring checklist for update failures and crash spikes.
```

## Common Cordova-to-Capacitor Migration Pitfalls (So You Don’t Repeat Them)

- **Forgetting `cap sync`** after installing a plugin: install, then `bunx cap sync`, every time.
- **Committing dev server URLs**: keep `server.url` only for development.
- **Assuming old plugin defaults**: permission prompts, file paths, and background execution policies differ.
- **Not testing upgrade flows**: your existing users will update into a different native container.

## A Minimal “Happy Path” Command Summary (Bun-First)

```bash
bun add @capacitor/core @capacitor/cli
bunx cap init

bun add @capacitor/ios @capacitor/android
bunx cap add ios
bunx cap add android

bun run build
bunx cap sync

bunx cap open ios
bunx cap open android
```

If you want the fastest route to stability after the migration, start by replacing your highest-risk plugins (auth, payments, background services) and add **Capgo Live Updates** once your baseline app is solid.
