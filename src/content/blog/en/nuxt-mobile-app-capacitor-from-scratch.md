---
slug: nuxt-mobile-app-capacitor-from-scratch
title: Build a Nuxt Mobile App from Scratch with Capacitor 8
description: >-
  Step-by-step guide to creating a new Nuxt 4 project and turning it into native
  iOS and Android mobile apps using Capacitor 8. Perfect for starting fresh with
  mobile-first Vue development.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-01-15T00:00:00.000Z
updated_at: 2026-01-15T23:07:27.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Nuxt and Capacitor mobile app development
keywords: Nuxt 4, Capacitor 8, mobile app from scratch, iOS development, Android development, Vue mobile app, native plugins, Tailwind CSS
tag: Tutorial
published: true
locale: en
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## Introduction

Want to build a mobile app with Nuxt from the ground up? This guide walks you through creating a brand new Nuxt 4 project configured for mobile from day one, then packaging it as native iOS and Android apps using [Capacitor](https://capacitorjs.com/) 8.

By the end of this tutorial, you'll have a working mobile app running on simulators that you can continue developing and eventually publish to the App Store and Google Play.

**Time required:** ~30 minutes

**What you'll build:**
- A new Nuxt 4 project with the latest directory structure
- Static generation configuration for mobile
- Capacitor 8 with essential plugins
- Native iOS and Android apps
- Live reload development setup

> Already have a Nuxt app? Check out [Convert Your Nuxt App to Mobile](/blog/building-a-native-mobile-app-with-nuxt-and-capacitor/) instead.

## Prerequisites

Make sure you have these installed:

- **Node.js 18+** (check with `node --version`)
- **Bun** package manager (`curl -fsSL https://bun.sh/install | bash`)
- **Xcode** (macOS only, for iOS development)
- **Android Studio** (for Android development)

## Step 1: Create a New Nuxt 4 Project

Start by creating a fresh Nuxt 4 project:

```shell
bunx nuxi@latest init my-mobile-app
cd my-mobile-app
bun install
```

### Nuxt 4 Directory Structure

Nuxt 4 uses a new directory structure with app code in the `app/` directory:

```
my-mobile-app/
  app/
    assets/
    components/
    composables/
    layouts/
    middleware/
    pages/
    plugins/
    utils/
    app.vue
  public/
  server/
  nuxt.config.ts
  package.json
```

This structure provides better separation between app and server code.

## Step 2: Configure Nuxt for Static Generation

Capacitor requires static HTML/JS/CSS files. Configure Nuxt for static generation in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',
  devtools: { enabled: true },

  // Enable static generation
  ssr: true,
  nitro: {
    preset: 'static',
  },
});
```

## Step 3: Add Mobile Scripts

Update your `package.json` with mobile development scripts:

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "mobile": "bun run generate && bunx cap sync",
    "mobile:ios": "bun run mobile && bunx cap open ios",
    "mobile:android": "bun run mobile && bunx cap open android"
  }
}
```

Test the static generation:

```shell
bun run generate
```

You should see a `.output/public` directory with your static files.

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
bunx cap init "My Mobile App" com.example.mymobileapp --web-dir .output/public
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
  webDir: '.output/public',
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
      style: 'dark',
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

2. Create a development Capacitor config. Update `capacitor.config.ts`:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const devConfig: CapacitorConfig = {
  appId: 'com.example.mymobileapp',
  appName: 'My Mobile App',
  webDir: '.output/public',
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
  webDir: '.output/public',
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

Now edits to your Nuxt code will hot-reload on the device.

## Step 9: Create Your First Mobile Screen

Let's create a mobile-friendly home screen. Update `app/app.vue`:

```vue
<template>
  <NuxtPage />
</template>
```

Create `app/pages/index.vue`:

```vue
<template>
  <main
    class="min-h-screen bg-gradient-to-b from-green-500 to-green-700 flex flex-col items-center justify-center p-6 text-white"
  >
    <h1 class="text-4xl font-bold mb-4">My Mobile App</h1>
    <p class="text-xl mb-8 text-center opacity-90">
      Built with Nuxt 4 + Capacitor 8
    </p>

    <div v-if="appInfo" class="bg-white/20 rounded-lg p-4 backdrop-blur-sm mb-8">
      <p class="text-sm">
        {{ appInfo.name }} v{{ appInfo.version }}
      </p>
    </div>

    <div class="space-y-4 w-full max-w-sm">
      <button
        class="w-full py-4 px-6 bg-white text-green-600 rounded-xl font-semibold text-lg shadow-lg active:scale-95 transition-transform"
        @click="handleGetStarted"
      >
        Get Started
      </button>
      <button
        class="w-full py-4 px-6 bg-white/20 text-white rounded-xl font-semibold text-lg backdrop-blur-sm active:scale-95 transition-transform"
        @click="handleShare"
      >
        Share App
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { App } from '@capacitor/app';

const appInfo = ref<{ name: string; version: string } | null>(null);

let backButtonListener: { remove: () => void } | null = null;

onMounted(async () => {
  // Get app info
  try {
    appInfo.value = await App.getInfo();
  } catch (e) {
    // Web fallback
    appInfo.value = { name: 'My Mobile App', version: '1.0.0' };
  }

  // Handle Android back button
  backButtonListener = await App.addListener('backButton', ({ canGoBack }) => {
    if (!canGoBack) {
      App.exitApp();
    } else {
      window.history.back();
    }
  });
});

onUnmounted(() => {
  backButtonListener?.remove();
});

function handleGetStarted() {
  // Navigate to onboarding or main app
  console.log('Get started clicked');
}

async function handleShare() {
  // We'll implement this with the Share plugin later
  console.log('Share clicked');
}
</script>
```

## Step 10: Add Tailwind CSS

For the styling to work, add Tailwind CSS to your project:

```shell
bun add tailwindcss @tailwindcss/vite
```

Update `nuxt.config.ts`:

```typescript
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',
  devtools: { enabled: true },

  ssr: true,
  nitro: {
    preset: 'static',
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
});
```

Create `app/assets/css/main.css`:

```css
@import 'tailwindcss';

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
input,
textarea {
  -webkit-user-select: auto;
  user-select: auto;
}
```

## Step 11: Add the Share Plugin

Let's implement the share button functionality:

```shell
bun add @capacitor/share
```

Update `app/pages/index.vue` to use the Share plugin:

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { App } from '@capacitor/app';
import { Share } from '@capacitor/share';

// ... existing code ...

async function handleShare() {
  try {
    await Share.share({
      title: 'Check out this app!',
      text: 'Built with Nuxt 4 and Capacitor 8',
      url: 'https://capacitorjs.com',
      dialogTitle: 'Share with friends',
    });
  } catch (e) {
    console.log('Share cancelled or failed:', e);
  }
}
</script>
```

Sync and rebuild:

```shell
bun run mobile
```

## Project Structure

Your project should now look like this:

```
my-mobile-app/
├── android/                  # Android native project
├── ios/                      # iOS native project
├── .output/
│   └── public/              # Static build output
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── pages/
│   │   └── index.vue
│   └── app.vue
├── capacitor.config.ts       # Capacitor configuration
├── nuxt.config.ts            # Nuxt configuration
├── package.json
└── ...
```

## Next Steps

You now have a working Nuxt mobile app. Here's what to do next:

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

Then update your CSS to import the theme:

```css
@import 'tailwindcss';
@import 'konsta/theme.css';
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

**.output/public is empty or missing**
Make sure you configured `nitro: { preset: 'static' }` in `nuxt.config.ts` and run `bun run generate`.

## Resources

- [Capacitor 8 Documentation](https://capacitorjs.com/docs)
- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Capgo - Live Updates](https://capgo.app/)
- [Konsta UI - Mobile UI Components](https://konstaui.com/)

Ready to ship your app? Learn how Capgo can help you deliver updates faster — [sign up for a free account](/register/) today.
