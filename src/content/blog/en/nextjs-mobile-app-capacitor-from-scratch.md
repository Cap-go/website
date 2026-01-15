---
slug: nextjs-mobile-app-capacitor-from-scratch
title: Build a Next.js Mobile App from Scratch with Capacitor 8
description: >-
  Step-by-step guide to creating a new Next.js 15 project and turning it into native
  iOS and Android mobile apps using Capacitor 8. Perfect for starting fresh with
  mobile-first development.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-01-15T00:00:00.000Z
updated_at: 2026-01-15T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js and Capacitor mobile app development
keywords: Next.js 15, Capacitor 8, mobile app from scratch, iOS development, Android development, React mobile app, native plugins, Tailwind CSS
tag: Tutorial
published: true
locale: en
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## Introduction

Want to build a mobile app with Next.js from the ground up? This guide walks you through creating a brand new Next.js 15 project configured for mobile from day one, then packaging it as native iOS and Android apps using [Capacitor](https://capacitorjs.com/) 8.

By the end of this tutorial, you'll have a working mobile app running on simulators that you can continue developing and eventually publish to the App Store and Google Play.

**Time required:** ~30 minutes

**What you'll build:**
- A new Next.js 15 project with App Router
- Static export configuration for mobile
- Capacitor 8 with essential plugins
- Native iOS and Android apps
- Live reload development setup

> Already have a Next.js app? Check out [Convert Your Next.js App to Mobile](/blog/building-a-native-mobile-app-with-nextjs-and-capacitor/) instead.

## Prerequisites

Make sure you have these installed:

- **Node.js 18+** (check with `node --version`)
- **Bun** package manager (`curl -fsSL https://bun.sh/install | bash`)
- **Xcode** (macOS only, for iOS development)
- **Android Studio** (for Android development)

## Step 1: Create a New Next.js Project

Start by creating a fresh Next.js 15 project:

```shell
bunx create-next-app@latest my-mobile-app
```

When prompted, select these options:
- **TypeScript:** Yes (recommended)
- **ESLint:** Yes
- **Tailwind CSS:** Yes (recommended for mobile styling)
- **`src/` directory:** Yes
- **App Router:** Yes (recommended)
- **Import alias:** Default (`@/*`)

Navigate to your project:

```shell
cd my-mobile-app
```

## Step 2: Configure Next.js for Static Export

Capacitor requires static HTML/JS/CSS files. Configure Next.js for static export by updating `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for proper routing in Capacitor
  trailingSlash: true,
};

export default nextConfig;
```

**Why these settings?**
- `output: 'export'` — Generates static HTML instead of requiring a Node.js server
- `images: { unoptimized: true }` — Disables Next.js Image Optimization (requires a server)
- `trailingSlash: true` — Ensures proper routing in the native WebView

## Step 3: Add Mobile Scripts

Update your `package.json` with mobile development scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "mobile": "bun run build && bunx cap sync",
    "mobile:ios": "bun run mobile && bunx cap open ios",
    "mobile:android": "bun run mobile && bunx cap open android"
  }
}
```

Test the build:

```shell
bun run build
```

You should see an `out` directory with your static files.

## Step 4: Install Capacitor 8

Install the Capacitor core packages:

```shell
bun add @capacitor/core
bun add -D @capacitor/cli
```

Install essential plugins that most mobile apps need:

```shell
bun add @capacitor/app @capacitor/keyboard @capacitor/splash-screen @capacitor/status-bar @capacitor/preferences
```

**What these plugins do:**
- **@capacitor/app** — App lifecycle events (foreground/background, deep links)
- **@capacitor/keyboard** — Control keyboard behavior
- **@capacitor/splash-screen** — Native splash screen control
- **@capacitor/status-bar** — Style the device status bar
- **@capacitor/preferences** — Key-value storage (like localStorage but native)

## Step 5: Initialize Capacitor

Initialize Capacitor with your project details:

```shell
bunx cap init "My Mobile App" com.example.mymobileapp --web-dir out
```

Replace:
- `"My Mobile App"` with your app's display name
- `com.example.mymobileapp` with your app ID (reverse domain notation)

This creates `capacitor.config.ts`. Update it with plugin configuration:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.mymobileapp',
  appName: 'My Mobile App',
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
    StatusBar: {
      style: 'light',
    },
  },
};

export default config;
```

## Step 6: Add Native Platforms

Install the platform packages:

```shell
bun add @capacitor/ios @capacitor/android
```

Generate the native projects:

```shell
bunx cap add ios
bunx cap add android
```

This creates `ios` and `android` directories containing the native projects.

## Step 7: Build and Run

Build your project and sync with native platforms:

```shell
bun run mobile
```

Open in iOS Simulator:

```shell
bun run mobile:ios
```

Or Android Emulator:

```shell
bun run mobile:android
```

**In Xcode (iOS):**
1. Select a simulator from the device dropdown
2. Click the Play button or press `Cmd + R`

**In Android Studio:**
1. Wait for Gradle to finish syncing
2. Select an emulator from the device dropdown
3. Click the Run button or press `Shift + F10`

## Step 8: Set Up Live Reload

For faster development, enable live reload so changes appear instantly on your device.

1. Find your local IP address:

```shell
# macOS
ipconfig getifaddr en0

# Windows
ipconfig
```

2. Create a development Capacitor config. Add to `capacitor.config.ts`:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const devConfig: CapacitorConfig = {
  appId: 'com.example.mymobileapp',
  appName: 'My Mobile App',
  webDir: 'out',
  server: {
    url: 'http://YOUR_IP_ADDRESS:3000',
    cleartext: true,
  },
  plugins: {
    // ... same plugin config
  },
};

const prodConfig: CapacitorConfig = {
  appId: 'com.example.mymobileapp',
  appName: 'My Mobile App',
  webDir: 'out',
  plugins: {
    // ... same plugin config
  },
};

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

export default config;
```

3. Start the dev server and copy config to native:

```shell
bun run dev &
NODE_ENV=development bunx cap copy
```

4. Rebuild in Xcode/Android Studio

Now edits to your Next.js code will hot-reload on the device.

## Step 9: Create Your First Mobile Screen

Let's create a simple mobile-friendly home screen. Update `src/app/page.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import { Keyboard } from '@capacitor/keyboard';

export default function Home() {
  const [appInfo, setAppInfo] = useState<{ name: string; version: string } | null>(null);

  useEffect(() => {
    // Get app info on mount
    App.getInfo().then(setAppInfo).catch(console.error);

    // Handle back button on Android
    const backHandler = App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });

    // Hide keyboard when tapping outside inputs
    const keyboardHandler = Keyboard.addListener('keyboardWillShow', () => {
      document.body.classList.add('keyboard-open');
    });

    return () => {
      backHandler.then(h => h.remove());
      keyboardHandler.then(h => h.remove());
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-4xl font-bold mb-4">My Mobile App</h1>
      <p className="text-xl mb-8 text-center opacity-90">
        Built with Next.js 15 + Capacitor 8
      </p>

      {appInfo && (
        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm">
            {appInfo.name} v{appInfo.version}
          </p>
        </div>
      )}

      <div className="mt-12 space-y-4 w-full max-w-sm">
        <button className="w-full py-4 px-6 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg active:scale-95 transition-transform">
          Get Started
        </button>
        <button className="w-full py-4 px-6 bg-white/20 text-white rounded-xl font-semibold text-lg backdrop-blur-sm active:scale-95 transition-transform">
          Learn More
        </button>
      </div>
    </main>
  );
}
```

## Step 10: Add Safe Area Handling

Mobile devices have notches, home indicators, and status bars. Add safe area handling with Tailwind.

Update `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --sat: env(safe-area-inset-top);
  --sar: env(safe-area-inset-right);
  --sab: env(safe-area-inset-bottom);
  --sal: env(safe-area-inset-left);
}

body {
  padding-top: var(--sat);
  padding-right: var(--sar);
  padding-bottom: var(--sab);
  padding-left: var(--sal);
}

/* Prevent text selection on mobile */
* {
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* Allow text selection in inputs */
input, textarea {
  -webkit-user-select: auto;
  user-select: auto;
}

/* Keyboard handling */
.keyboard-open {
  --sab: 0px;
}
```

## Project Structure

Your project should now look like this:

```
my-mobile-app/
├── android/              # Android native project
├── ios/                  # iOS native project
├── out/                  # Static build output
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── ...
├── capacitor.config.ts   # Capacitor configuration
├── next.config.ts        # Next.js configuration
├── package.json
└── ...
```

## Next Steps

You now have a working Next.js mobile app. Here's what to do next:

### Essential Setup
- **App Icons:** Replace default icons in `ios/App/App/Assets.xcassets` and `android/app/src/main/res`
- **Splash Screen:** Customize in native projects or use `@capacitor/splash-screen` config
- **Deep Links:** Configure URL schemes for your app

### Add More Features
- **Camera:** `bun add @capacitor/camera`
- **Geolocation:** `bun add @capacitor/geolocation`
- **Push Notifications:** `bun add @capacitor/push-notifications`
- **File System:** `bun add @capacitor/filesystem`

### UI Enhancement
Consider adding [Konsta UI](https://konstaui.com/) for native-looking iOS/Android components:

```shell
bun add konsta
```

### Over-the-Air Updates
Set up [Capgo](https://capgo.app/) to push updates without app store resubmission:

```shell
bunx @capgo/cli init
```

## Troubleshooting

**Build fails with "Cannot find module"**
Run `bun install` and try again.

**iOS: "No signing identity found"**
Open Xcode, go to Signing & Capabilities, and select your development team.

**Android: "SDK location not found"**
Create `android/local.properties` with `sdk.dir=/path/to/android/sdk`

**Changes not appearing on device**
Make sure you ran `bun run mobile` after making changes. For live reload, verify the IP address is correct and the dev server is running.

## Resources

- [Capacitor 8 Documentation](https://capacitorjs.com/docs)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Capgo - Live Updates](https://capgo.app/)
- [Konsta UI - Mobile UI Components](https://konstaui.com/)

Ready to ship your app? Learn how Capgo can help you deliver updates faster — [sign up for a free account](/register/) today.
