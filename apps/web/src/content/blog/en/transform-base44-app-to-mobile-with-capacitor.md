---
slug: transform-base44-app-to-mobile-with-capacitor
title: Base44 to Native Mobile Apps with Capacitor
description: >-
  Learn how to export your Base44 project and transform it into native mobile apps
  using Capacitor and Capgo Builder. A complete step-by-step guide for 2026.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-06-24T00:00:00.000Z
updated_at: 2026-06-24T00:00:00.000Z
head_image: /bolt_capacitor.webp
head_image_alt: "Base44 to Native Mobile Apps with Capacitor Capgo blog illustration"
keywords: Base44, Capacitor, mobile app development, React, export project, native mobile apps, Capgo Builder, vibe coding
tag: Tutorial
published: true
locale: en
next_blog: transform-lovable-dev-app-to-mobile-with-capacitor
---

## Introduction

[Base44](https://base44.com/) is an AI-powered app builder that generates full React applications from prompts. You can ship a working product in the browser fast — but what if you want it on iOS and Android? In this tutorial, we show how to export your Base44 project and turn it into native mobile apps with [Capacitor](https://capacitorjs.com/), then ship signed store binaries with **[Capgo Builder](https://capgo.app/native-build/)** — no Mac required for iOS.

By the end of this guide, your Base44 app runs natively on iOS and Android with access to device features like camera, storage, and push notifications.

### Prerequisites & Time Estimate

**Time Required**: 2-4 hours for first-time setup

**System Requirements**:
- **For iOS cloud builds**: Any OS (Windows, Mac, or Linux) with Capgo Builder
- **For Android cloud builds**: Any OS
- **Storage**: 10GB free space for dependencies and build artifacts
- **RAM**: 8GB minimum

**Costs**:
- **Base44 export**: Builder plan or higher (for GitHub export and ZIP download)
- **iOS App Store**: $99/year (Apple Developer Account)
- **Android Play Store**: $25 one-time (Google Play Developer)
- **Cursor Pro**: $20/month (optional but recommended)

**Required Software**:
- Node.js 18+
- A code editor such as [Cursor](https://cursor.sh/)

### Why Transform Your Base44 App to Mobile?

- **Expanded reach**: Meet users where they expect a native app icon, not a browser tab
- **Native features**: Camera, GPS, biometrics, and offline storage through Capacitor plugins
- **App Store distribution**: Publish on Google Play and the Apple App Store
- **Faster iteration**: Pair Capgo Live Updates with Capgo Builder for web-layer fixes without rebuilding native binaries every time

## Step 1: Export Your Base44 Project

Base44 lets you export code once you are on the **Builder plan or higher**. You have two main options.

### Option A: Export to GitHub (Recommended)

1. Open your app in the Base44 editor
2. Click the **GitHub** icon in the top bar
3. Authorize **Base44 Builder** and create or connect a repository
4. Base44 syncs your app code to GitHub automatically (two-way sync on supported plans)

See [Base44 GitHub integration docs](https://docs.base44.com/developers/app-code/local-development/github) for details.

### Option B: Download as ZIP

1. Click **Code** in the top bar to open the file browser
2. Click **Export project as ZIP** in the top right of the code view
3. Extract the archive on your computer

### Open the Project in Cursor

1. Visit [cursor.sh](https://cursor.sh/) and install Cursor
2. Clone your GitHub repo (`Git: Clone` from the command palette) or open the extracted ZIP folder with **File > Open Folder**

![Start Cursor](/start_in_cursor.webp)

For the best AI-assisted workflow, enable your preferred model and allow command execution in Cursor settings — the same setup described in our [Lovable to mobile guide](/blog/transform-lovable-dev-app-to-mobile-with-capacitor/).

## Step 2: Set Up Your Development Environment

Base44 exports a standard React project. Install dependencies and confirm the dev server works.

### Using Cursor AI (Recommended)

Press `Command+K` (Mac) or `Ctrl+K` (Windows) and ask:

```
Install Node.js if needed, install project dependencies, and start the dev server
```

### Manual Setup

```shell
cd your-base44-project
npm install
npm run dev
```

![Bolt.new app running locally](/bolt-app-running.webp)

Your Base44 app should load at `http://localhost:5173` (Vite) or the port shown in the terminal.

## Step 3: Prepare the Production Build

Capacitor needs static web assets. Base44 React apps typically use Vite and output to `dist/`.

### Configure Vite for Mobile

Ask Cursor:

```
Configure vite.config for Capacitor mobile deployment with base './' and production build to dist
```

Or update `vite.config.ts` manually:

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

### Test the Production Build

```shell
npm run build
```

Verify a `dist/` folder exists with `index.html` and bundled assets.

![Bolt.new build output](/bolt-build-output.webp)

## Step 4: Add Capacitor to Your Base44 Project

### Using Cursor AI (Recommended)

```
Install Capacitor CLI, initialize it for my Base44 app with webDir dist, and add iOS and Android platforms
```

### Manual Installation

```shell
npm install -D @capacitor/cli
npm install @capacitor/core @capacitor/ios @capacitor/android

npx cap init "Your Base44 App" com.yourcompany.yourapp --web-dir dist
npx cap add ios
npx cap add android
```

![Capacitor initialization](/capacitor-init-bolt.webp)

Commit the `ios/` and `android/` folders to git. Capgo Builder compiles what is in those directories.

## Step 5: Configure Capacitor

Update `capacitor.config.ts`:

```typescript
import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp',
  appName: 'Your Base44 App',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
```

Consider adding `@capgo/capacitor-updater` early so you can ship OTA updates after launch. See [Capgo Live Updates docs](/docs/live-updates/getting-started/).

## Step 6: Build and Sync

Every time you change the web app:

```shell
npm run build
npx cap sync
```

![Capacitor sync Bolt complete](/capacitor-sync-bolt.webp)

## Step 7: Build Store-Ready Binaries with Capgo Builder (Recommended)

Simulator testing is optional. For TestFlight, internal testing, and store submission, use **Capgo Builder** to compile and sign native binaries in the cloud.

### Why Capgo Builder for Base44 apps?

- **No Mac required for iOS** — build from Windows or Linux
- **Same CLI your AI agent can run** — fits vibe-coding workflows from Base44 → GitHub → Cursor
- **Pairs with Live Updates** — fix UI and copy over the air; rebuild native only when plugins or permissions change

### Set up Capgo Builder

```shell
npx @capgo/cli@latest login
npx @capgo/cli@latest init
npx @capgo/cli@latest build init --platform ios
npx @capgo/cli@latest build init --platform android
```

Save signing credentials once. See [Managing Credentials](/docs/builder/credentials/) and [Build iOS from Windows](/blog/build-ios-app-from-windows-capacitor-capgo-build/).

### Request a cloud build

```shell
npm run build
npx cap sync
npx @capgo/cli@latest build com.yourcompany.yourapp --platform ios --build-mode release
npx @capgo/cli@latest build com.yourcompany.yourapp --platform android --build-mode release
```

Build logs stream in your terminal. With App Store Connect configured, iOS builds can upload to TestFlight automatically.

Upload your web bundle for OTA updates:

```shell
npx @capgo/cli@latest bundle upload --channel production
```

## Step 8: Optional — Test Locally in Xcode or Android Studio

If you have a Mac or want emulator testing before cloud builds:

```shell
npx cap open ios      # Xcode + iOS Simulator
npx cap open android  # Android Studio + emulator
```

![Xcode opening Bolt project](/xcode-bolt-project.webp)

Use local IDEs for day-to-day debugging. Use **Capgo Builder** when you need signed release binaries.

## Step 9: Add Native Features

Enhance your Base44 app with device capabilities:

```shell
npm install @capacitor/share @capacitor/camera @capacitor/push-notifications
npx cap sync
```

Ask Cursor to wire Share, Camera, or Push into your React components. After adding plugins, run a new **Capgo Builder** build before store submission.

![Native features added Bolt](/bolt-native-features.webp)

## Step 10: Optimize for Production

### App Icons and Splash Screens

```shell
npm install -D @capacitor/assets
# Add assets/icon.png (1024x1024) and assets/splash.png (2732x2732)
npx capacitor-assets generate
npx cap sync
```

### Base44 Backend Considerations

Exported Base44 apps may call Base44's hosted backend and SDK. That usually works in Capacitor as long as:

- API calls use HTTPS
- Auth redirects work inside the WebView (test login on a real device)
- Deep links are configured if you use magic-link or OAuth flows

If you later migrate off Base44's backend, plan to replace `base44.entities.*` and related SDK calls with your own API — the React UI layer typically carries over.

## Troubleshooting Common Issues

### White screen on launch

- Confirm `base: './'` is set in Vite config
- Run `npm run build` and check that `dist/index.html` loads assets with relative paths
- Run `npx cap sync` after every web build

### Build errors in Capgo Builder

- Commit `ios/` and `android/` to git before requesting a cloud build
- Run `npx cap sync` locally so web assets are copied into native projects
- New Capacitor plugins require a fresh native build

### Export not available in Base44

GitHub export and ZIP download require the **Builder plan or higher**. Upgrade in Base44 or copy files manually from the Code view on lower tiers.

## Conclusion

You exported a Base44 AI-generated React app, wrapped it with Capacitor, and have a clear path to signed iOS and Android binaries through **Capgo Builder** — without maintaining a local Xcode farm.

### Next Steps

- **[Capgo Live Updates](/live-updates/)**: Ship UI and copy fixes without waiting on store review
- **[Capgo Builder](/native-build/)**: Automate release builds in CI
- **Push Notifications**: Add `@capacitor/push-notifications` and rebuild with Capgo Builder
- **Related guides**: [Lovable to mobile](/blog/transform-lovable-dev-app-to-mobile-with-capacitor/) · [Bolt.new to mobile](/blog/transform-bolt-new-app-to-mobile-with-capacitor/)

[Sign up for a free Capgo account](/register/) to enable Live Updates and cloud native builds.

## Resources

- [Base44 Documentation](https://docs.base44.com/)
- [Base44 GitHub Integration](https://docs.base44.com/developers/app-code/local-development/github)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capgo Native Builds](/native-build/)
- [Capgo — Live Updates for Capacitor Apps](https://capgo.app/)

## Keep going from Base44 to Native Mobile Apps with Capacitor

If you are using **Base44 to Native Mobile Apps with Capacitor** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds, and [Build iOS from Windows](/blog/build-ios-app-from-windows-capacitor-capgo-build/) for cloud iOS builds without a Mac.
