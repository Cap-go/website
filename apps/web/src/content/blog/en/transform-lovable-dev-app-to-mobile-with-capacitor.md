---
slug: transform-lovable-dev-app-to-mobile-with-capacitor
title: Convert Your Lovable App to iOS and Android with Capacitor
description: >-
  Step-by-step guide to export your Lovable project, wrap it with Capacitor, build
  signed iOS and Android apps in the cloud with Capgo Builder, and ship fixes over the air.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-07-28T00:00:00.000Z
updated_at: 2026-06-27T00:00:00.000Z
head_image: /lovable_capacitor.webp
head_image_alt: "Convert your Lovable app to iOS and Android with Capacitor Capgo blog illustration"
keywords: Lovable, Lovable.dev, Capacitor, mobile app development, React, Vite, export project, native mobile apps, Capgo Builder, live updates, vibe coding
tag: Tutorial
published: true
locale: en
next_blog: building-a-native-mobile-app-with-nextjs-and-capacitor
---

## Introduction

[Lovable](https://lovable.dev/) is an AI app builder that turns prompts into working React apps in minutes. You can ship in the browser fast — but what if you want your app on the App Store and Google Play, sitting on home screens like every other native app?

This guide walks through the full path: export from Lovable, wrap the web app with [Capacitor](https://capacitorjs.com/), build signed iOS and Android binaries in the cloud with **[Capgo Builder](https://capgo.app/native-build/)** (no Mac required), add a real native feature, and push a layout fix over the air with **Capgo Live Updates**.

**Time required:** about 1–2 hours the first time, mostly account setup and waiting on cloud builds.

**By the end, you'll have:**

- A native iOS and Android app built from the cloud — no Xcode or Android Studio on the main path
- The app running on a real device (TestFlight, direct install, or Play internal testing)
- A working camera feature that only a native app can offer
- Live Updates configured so UI and CSS fixes ship without store review

## Prerequisites

| Requirement | Details |
| --- | --- |
| A computer | Mac, Windows, or Linux — cloud builds work from any OS |
| A code editor | [Cursor](https://cursor.sh/) or VS Code |
| Node.js | Version 20 or newer (22 LTS recommended) |
| Git | To clone your Lovable repo from GitHub |
| Capgo account | [Free signup](/register/) — cloud builds and Live Updates |

**Costs (only to publish publicly):**

| Item | Cost |
| --- | --- |
| Apple Developer Program | $99/year |
| Google Play Console | $25 one-time |
| Capgo | Free tier available; paid plans for production scale |

**Optional (local simulator only):**

| Tool | Why |
| --- | --- |
| Xcode (~15 GB, macOS only) | iOS Simulator on your Mac |
| Android Studio (~1 GB + SDKs) | Android emulator |

You can skip both. The main path in this guide builds in the cloud and installs on real devices without them.

## A Quick Note on Lovable and Frameworks

Before touching code, know that **the kind of web app Lovable generates affects mobile wrapping**.

For a long time, Lovable's default was a **React + Vite single-page app (SPA)**. As of May 2026, brand-new Lovable apps may use **TanStack Start with server-side rendering (SSR)** by default. SSR is great for the web, but Capacitor wraps a **static build** — a folder of HTML, CSS, and JavaScript with an `index.html` at its root — that ships inside the app on the device.

An SSR app expects a server to render pages on each request. There is no server inside a phone, so for Capacitor you want **static, client-rendered output**.

**What to do:**

- **Starting fresh:** Ask Lovable for a **single-page app (SPA)** or to skip SSR so you get a static `dist/` folder.
- **Already on TanStack Start (SSR):** Configure it to pre-render or output a static SPA. The only hard requirement is a static build folder containing `index.html`.
- **Legacy Next.js Lovable projects:** Use [static export](/blog/building-a-native-mobile-app-with-nextjs-and-capacitor/) — output goes to `out/` instead of `dist/`.

Whatever framework you use, point Capacitor's `webDir` at that folder. For a Vite SPA, that folder is `dist`.

## Step 1 — Export Your Lovable App to GitHub

Lovable keeps your code in its editor until you connect GitHub.

1. Open your Lovable project in the browser
2. Click **Upgrade** (top-right) if needed, then open **Git** in the left menu
3. Choose **GitHub**, authorize Lovable, and link your account
4. Lovable creates a repository and pushes your app automatically

![Lovable.dev GitHub connection](/lovable_github_step_1.webp)

![Lovable.dev GitHub authorization](/lovable_github_step_2.webp)

![Lovable.dev repository setup](/lovable_github_step_3.webp)

![Lovable.dev project exported](/lovable_github_done.webp)

✅ **Success:** Visiting `github.com/YOUR-USERNAME/your-app` shows your app's code.

## Step 2 — Clone and Run Your App Locally

Open a terminal in [Cursor](https://cursor.sh/) or VS Code and clone the repo (replace `YOUR-USERNAME`):

```shell
git clone https://github.com/YOUR-USERNAME/your-lovable-app.git
cd your-lovable-app
npm install
npm run dev
```

![Lovable.dev app running locally](/lovable-app-running.webp)

Lovable apps typically run on `http://localhost:8080` or `http://localhost:5173` — use whatever address your terminal prints.

Press `Ctrl + C` to stop the dev server when you're ready to continue.

✅ **Success:** Your app opens in the browser with its UI working.

## Step 3 — Prepare the Static Production Build

Capacitor needs a production build before you add native platforms.

### React + Vite (most Lovable apps)

Confirm `vite.config.ts` uses a relative base so assets load inside the native WebView:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
  },
})
```

Build and verify:

```shell
npm run build
```

You should see a `dist/` folder with `index.html` at its root.

![Lovable.dev static export success](/lovable-static-export.webp)

### Legacy Next.js Lovable projects

If your repo uses Next.js, configure static export and build to `out/`. See [Convert Your Next.js App to Mobile](/blog/building-a-native-mobile-app-with-nextjs-and-capacitor/) for the full `next.config` setup, then use `webDir: 'out'` in Capacitor instead of `dist`.

✅ **Success:** A static build folder exists (`dist/` or `out/`) with `index.html`.

## Step 4 — Add Capacitor and Native Platforms

Capacitor wraps your web app in real iOS and Android shells — no rewrite needed.

```shell
npm install @capacitor/core @capacitor/cli
npx cap init
```

When prompted:

| Prompt | Example | Notes |
| --- | --- | --- |
| App name | My Lovable App | Shown under the app icon |
| App Package ID | com.yourcompany.myapp | Reverse-domain style — **cannot change after store publish** |
| Web assets directory | `dist` | Use `out` for Next.js static export |

**Pick a Package ID you actually own.** Bundle IDs are globally unique. Use a reverse-domain ID based on a domain you control (e.g. `com.yourcompany.myapp`) from the start — changing it later means find-and-replacing across `ios/` and `android/` and rebuilding.

```shell
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

![Capacitor initialization](/capacitor-init-lovable.webp)

![Capacitor platforms added](/capacitor-platforms-added.webp)

Your project now looks like:

```
your-lovable-app/
├── android/              ← native Android project
├── ios/                  ← native iOS project
├── dist/                 ← built web app (or out/ for Next.js)
├── src/                  ← your Lovable app code
├── capacitor.config.ts
└── package.json
```

**No CocoaPods needed.** Capacitor 8 uses Swift Package Manager for iOS dependencies automatically.

✅ **Success:** `ios/` and `android/` folders appear and the terminal shows `Sync finished`.

## Step 5 — Check Your `.gitignore`

Capgo Builder compiles from your Git repository, so `ios/` and `android/` **must be committed**. A common mistake is ignoring them at the repo root.

Confirm:

- Root `.gitignore` ignores `node_modules` and `dist` (the cloud rebuilds `dist` during web builds)
- `ios/` and `android/` themselves are **not** ignored

`npx cap add` already adds platform-level `.gitignore` files that ignore build artifacts but keep the project source.

✅ **Success:** `git status` shows `ios/` and `android/` ready to commit (not ignored).

## Step 6 — Commit and Push

```shell
git add .
git commit -m "Add Capacitor and native iOS/Android platforms"
git push
```

✅ **Success:** Your GitHub repo shows the `ios/` and `android/` folders.

## Step 7 — Build Store-Ready Binaries with Capgo Builder

You do not need a Mac or local Xcode/Android Studio pipeline to ship. **Capgo Builder** compiles, signs, and can submit iOS and Android builds from the cloud.

### Set up Capgo Builder

```shell
npx @capgo/cli@latest login
npx @capgo/cli@latest init
npx @capgo/cli@latest build init --platform ios
npx @capgo/cli@latest build init --platform android
```

Save signing credentials once. Use our free tools if you need help generating them:

- [iOS Certificate Generator](/tools/ios-certificate-generator/)
- [Android Keystore Generator](/tools/android-keystore-generator/)
- [iOS UDID Finder](/tools/ios-udid-finder/) — register your iPhone for development builds

See [Managing Credentials](/docs/builder/credentials/) and [Build iOS from Windows](/blog/build-ios-app-from-windows-capacitor-capgo-build/).

### Request a cloud build

```shell
npm run build
npx cap sync
npx @capgo/cli@latest build com.yourcompany.myapp --platform ios --build-mode release
npx @capgo/cli@latest build com.yourcompany.myapp --platform android --build-mode release
```

Build logs stream in your terminal. With App Store Connect configured, iOS builds can upload to TestFlight automatically.

**Install on a real device:**

- **iOS:** TestFlight (recommended) or a development build with your device UDID registered
- **Android:** Google Play internal testing track or a signed release APK/AAB

✅ **Success:** A signed build completes and you can install it on a real device.

## Step 8 — Optional: Test Locally in Xcode or Android Studio

If you have a Mac or want emulator testing:

```shell
npx cap open ios      # Xcode + iOS Simulator
npx cap open android  # Android Studio + emulator
```

![Xcode opening Lovable project](/xcode-lovable-project.webp)

![Android Studio opening Lovable project](/android-studio-lovable-project.webp)

![Lovable app running on iOS](/lovable-ios-app.webp)

![Lovable app running on Android](/lovable-android-app.webp)

Use local IDEs for day-to-day debugging. Use **Capgo Builder** when you need signed release binaries.

## Step 9 — Add a Native Feature: The Camera

A Capacitor plugin lets JavaScript call real device features. We'll add the Camera plugin so users can snap a photo — something a browser tab cannot do reliably.

```shell
npm install @capacitor/camera
npx cap sync
```

### Declare camera permissions

**iOS** — add to `ios/App/App/Info.plist` inside the top-level `<dict>`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app uses the camera to take photos.</string>
```

**Android** — add inside `<manifest>` in `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

### Use the camera in your app

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

async function takePhoto() {
  const photo = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Uri,
  });
  return photo.webPath;
}
```

Capacitor shows the system permission dialog the first time — using the message you wrote in `Info.plist`.

![Native features added](/lovable-native-features.webp)

Adding a plugin requires a **fresh native build** through Capgo Builder before it works on devices.

✅ **Success:** Camera code compiles and `npx cap sync` finishes without errors.

## Step 10 — Add Capgo Live Updates

Every native change — even a typo fix in native config — normally goes through app store review. **Capgo Live Updates** push changes to your app's web layer (HTML, CSS, JS, images) over the air in minutes.

**Install the updater in your first release** so you're never stuck waiting on review when you need to ship a fix.

```shell
npm install @capgo/capacitor-updater
npx cap sync
```

Add to `capacitor.config.ts`:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.myapp',
  appName: 'My Lovable App',
  webDir: 'dist',
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
    },
  },
};

export default config;
```

Initialize in your app entry (e.g. `src/main.tsx`):

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

void CapacitorUpdater.notifyAppReady();
```

Commit, push, and run a new Capgo Builder build so the updater SDK is in the native shell.

Upload web bundles after launch:

```shell
npm run build
npx @capgo/cli@latest bundle upload --channel production
```

See [Capgo Live Updates docs](/docs/live-updates/getting-started/).

✅ **Success:** Updater plugin is installed and `notifyAppReady()` runs on startup.

## Step 11 — Fix Status Bar Spacing with a Live Update

On a real iPhone, your header may sit **under** the status bar (clock and battery). Modern Capacitor draws edge-to-edge, so your app must respect **safe area insets**: `env(safe-area-inset-top)`, `-bottom`, `-left`, `-right`.

Many Lovable apps already handle the bottom inset but use fixed top padding (like `pt-6`) without the top inset.

**1. Confirm `viewport-fit=cover`** in `index.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

**2. Fix top headers** — use `max()` to keep web padding and grow on notched devices:

```css
/* Before */
padding-top: 1.5rem;

/* After */
padding-top: max(1.5rem, env(safe-area-inset-top));
```

In Tailwind, ask Lovable:

> "The app content runs under the status bar at the top on mobile. Add `env(safe-area-inset-top)` to the top padding of each page header using `max()`, keeping the existing padding as the minimum."

**3. Ship the fix over the air** — this is pure CSS, no native rebuild needed:

```shell
git add .
git commit -m "Fix top safe area on mobile"
git push
npm run build
npx @capgo/cli@latest bundle upload --channel production
```

Force-close the app on your device, reopen it, wait ~15–30 seconds, and open again. The header should sit below the status bar — fixed without store review.

✅ **Success:** Top content clears the status bar after the OTA bundle applies.

For deeper layout work, see [@capgo/tailwind-capacitor](https://github.com/Cap-go/tailwind-capacitor) and [Capacitor edge-to-edge display](/blog/capacitor-edge-to-edge-display-native-config/).

## Step 12 — Prepare Your Store Listing

Your app is built, installable, and you can push instant updates. Going live on the public stores is mostly paperwork:

- **App icon** — 1024×1024px for iOS (no transparency), 512×512px for Google Play
- **Screenshots** — Apple requires iPhone 6.9" (1320×2868px) screenshots
- **App name, subtitle, description, keywords**
- **Privacy policy URL** — required by both stores, even for free apps
- **Age rating** — questionnaire in each console
- **Data collection disclosures** — Apple Privacy Nutrition Labels and Google Data Safety

Generate icons and splash screens:

```shell
npm install -D @capacitor/assets
# Add assets/icon.png (1024x1024) and assets/splash.png (2732x2732)
npx capacitor-assets generate
npx cap sync
```

![App assets generated](/lovable-app-assets.webp)

**What's left before "live":**

1. **Google Play closed testing** (personal accounts created after Nov 13, 2023): at least 12 testers for 14 consecutive days before production access. iOS has no equivalent.
2. **Submit for review** — Apple ~3–5 days, Google ~3–7 days after testing requirements are met.

See our [first-time app review guide](/blog/first-time-app-review-guide/) for the full checklist.

## Common Errors (and How to Fix Them)

- **`Could not find the web assets directory: ./dist`** — Run `npm run build` before `npx cap add` or `npx cap sync`. Make sure `webDir` in `capacitor.config.ts` matches your framework output (`dist` for Vite, `out` for Next.js static export).
- **"This App ID … is not available"** — Bundle IDs are globally unique. Pick a reverse-domain ID you control.
- **iOS build fails after changing the bundle ID** — The ID in your native project must match Apple App Store Connect. Find-and-replace across `ios/` and `android/`, commit, rebuild.
- **White screen on launch** — Set `base: './'` in Vite config, rebuild, and run `npx cap sync`.
- **Content under the status bar** — Add `viewport-fit=cover` and `env(safe-area-inset-top)` padding (Step 11).
- **APK signed in debug mode** — Google Play rejects debug builds. Use a release build signed with your keystore.
- **Deployment rejected — version already exists** — Bump version/build number in native projects and rebuild.

For Capgo Builder issues, see [Native Build troubleshooting](/docs/builder/troubleshooting/) and [Live Updates debugging](/docs/plugins/updater/debugging/).

## Conclusion

You took a Lovable web app to native iOS and Android — built in the cloud without a Mac, with a real camera feature and a layout fix shipped over the air. That's the hard part done.

### Next Steps

- **[Capgo Live Updates](/live-updates/)** — Ship UI and copy fixes without waiting on store review
- **[Capgo Builder](/native-build/)** — Automate release builds in CI
- **[Capgo Plugin Directory](/plugins/)** — Biometrics, push notifications, geolocation, and more
- **Related guides:** [Base44 to mobile](/blog/transform-base44-app-to-mobile-with-capacitor/) · [Bolt.new to mobile](/blog/transform-bolt-new-app-to-mobile-with-capacitor/)

[Sign up for a free Capgo account](/register/) to enable Live Updates and cloud native builds.

## Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capgo Native Builds](/native-build/)
- [Capgo — Live Updates for Capacitor Apps](https://capgo.app/)
- [Build iOS from Windows](/blog/build-ios-app-from-windows-capacitor-capgo-build/)
- [Next.js static export for mobile](/blog/building-a-native-mobile-app-with-nextjs-and-capacitor/)

## Keep going from Convert Your Lovable App to iOS and Android with Capacitor

If you are using **Convert Your Lovable App to iOS and Android with Capacitor** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds, and [Build iOS from Windows](/blog/build-ios-app-from-windows-capacitor-capgo-build/) for cloud iOS builds without a Mac.
