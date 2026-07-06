---
slug: building-a-native-mobile-app-with-nuxt-and-capacitor
title: Convert Your Nuxt App to iOS & Android with Capacitor 8
description: >-
  Transform your existing Nuxt 4 web application into native iOS and Android
  mobile apps using Capacitor 8. A complete guide to configuring static generation,
  adding native plugins, and deploying to app stores.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2026-06-23T19:49:03.000Z
head_image: /nuxt_capgo.webp
head_image_alt: "Convert Your Nuxt App to iOS & Android with Capacitor 8 Capgo blog illustration"
keywords: Nuxt 4, Capacitor 8, convert web app to mobile, iOS, Android, mobile app development, static generation, native plugins, Vue
tag: Tutorial
published: true
locale: en
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## Introduction

Have an existing Nuxt web application? In this guide, you'll learn how to transform it into native iOS and Android mobile apps using [Capacitor](https://capacitorjs.com/) 8 — the latest version with improved performance and new features.

Capacitor wraps your web app in a native container, giving you access to device APIs like camera, filesystem, and push notifications while keeping your existing Vue codebase. Unlike Flutter or React Native, you don't need to rewrite anything — your Nuxt code runs as-is.

**What you'll learn:**
- Configure your existing Nuxt app for static generation
- Add Capacitor 8 with essential native plugins
- Build and test on iOS and Android simulators
- Enable live reload for faster development
- Fix common iOS layout issues (viewport, safe area, horizontal overflow)
- Add native-feeling UI with Capgo Native Navigation and Transitions

> Looking to start a new project from scratch? Check out our guide on [Building a Nuxt Mobile App from Scratch](/blog/nuxt-mobile-app-capacitor-from-scratch/).

### Benefits of Using Nuxt and Capacitor

- **Code Reusability**: Share your Vue components and logic between web and mobile apps.
- **Performance**: Nuxt's static generation creates optimized bundles perfect for mobile.
- **Native Capabilities**: Access device features like camera, geolocation, and filesystem through Capacitor plugins.
- **Simplified Development**: Use familiar Vue/Nuxt patterns without learning native development.

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed
- An existing **Nuxt 4** application
- **Xcode** (for iOS development, macOS only)
- **Android Studio** (for Android development)

## Configuring Your Nuxt App for Mobile

The first step is to configure your Nuxt app for static generation. Capacitor needs static HTML/JS/CSS files to bundle into the native app.

Make sure your `package.json` has the generate script:

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

**Important:** If you're using server-side features (API routes, server middleware, etc.), you'll need to refactor those to use client-side alternatives or external APIs.

Test the static generation by running:

```shell
bun run generate
```

You should see a `.output/public` folder with your static files. This is what Capacitor will bundle into your native app.

## Adding Capacitor 8 to Your Project

To package your Nuxt app into a native mobile container, follow these steps:

1. Install Capacitor core and CLI:

```shell
bun add @capacitor/core
bun add -D @capacitor/cli
```

2. Install common Capacitor plugins you'll likely need:

```shell
bun add @capacitor/app @capacitor/keyboard @capacitor/splash-screen @capacitor/status-bar @capacitor/preferences
```

These plugins provide essential features:
- **@capacitor/app**: Handle app lifecycle events (foreground/background, deep links)
- **@capacitor/keyboard**: Control keyboard behavior on mobile
- **@capacitor/splash-screen**: Manage the native splash screen
- **@capacitor/status-bar**: Style the device status bar
- **@capacitor/preferences**: Key-value storage (like localStorage but native)

3. Initialize Capacitor with your project details:

```shell
bunx cap init my-app com.example.myapp --web-dir .output/public
```

Replace `my-app` with your app name and `com.example.myapp` with your app ID (reverse domain notation).

4. Create or update the `capacitor.config.ts` file with the proper configuration:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'my-app',
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

5. Install native platforms:

```shell
bun add @capacitor/ios @capacitor/android
```

6. Add the native platform folders:

```shell
bunx cap add ios
bunx cap add android
```

Capacitor will create `ios` and `android` folders at the root of your project containing the native projects.

To build the Android project, you need [Android Studio](https://developer.android.com/studio). For iOS, you need a Mac with [Xcode](https://developer.apple.com/xcode/).

7. Build and sync your project:

```shell
bun run mobile
```

This runs your custom script that generates the static Nuxt build and syncs the files with the native platforms.

## Building and Deploying Native Apps

To build and deploy your native mobile app, follow these steps:

To develop iOS apps, you need to have **Xcode** installed, and for Android apps, you need to have **Android Studio** installed. Moreover, if you plan to distribute your app on the app store, you need to enroll in the Apple Developer Program for iOS and the Google Play Console for Android.

1. Open the native projects:

For iOS:
```shell
bun run mobile:ios
```

For Android:
```shell
bun run mobile:android
```

Or directly with Capacitor CLI:
```shell
bunx cap open ios
bunx cap open android
```

2. Build and run the app:

![android-studio-run](/android-studio-run.webp)

- In Android Studio, wait for the project to be ready, and then click on the "Run" button to deploy the app to a connected device or emulator.

![xcode-run](/xcode-run.webp)

- In Xcode, set up your signing account to deploy the app to a real device. If you haven't done this before, Xcode will guide you through the process (note that you need to be enrolled in the Apple Developer Program). Once set up, click on the "Play" button to run the app on your connected device.

Congratulations! You have successfully deployed your Nuxt web app to a mobile device.

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

But hold on, there's also a faster way to do this during development...

## Capacitor Live Reload

During development, you can take advantage of live reloading to see changes instantly on your mobile device. To enable this feature, follow these steps:

1. Find your local IP address:

- On macOS, run the following command in the terminal:
  ```shell
  ipconfig getifaddr en0
  ```

- On Windows, run:
  ```shell
  ipconfig
  ```
  Look for the IPv4 address in the output.

2. Update your `capacitor.config.ts` to point to your development server:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: '.output/public',
  server: {
    url: 'http://YOUR_IP_ADDRESS:3000',
    cleartext: true,
  },
  plugins: {
    // ... your plugin config
  },
};

export default config;
```

Replace `YOUR_IP_ADDRESS` with your local IP address (e.g., `192.168.1.100`).

3. Apply the changes to your native project:

```shell
bunx cap copy
```

The `copy` command copies the web folder and configuration changes to the native project without updating the entire project.

4. Start your Nuxt dev server and rebuild in Xcode/Android Studio:

```shell
bun run dev
```

Now, whenever you make changes to your Nuxt app, the mobile app will automatically reload to reflect those changes.

**Note:** If you install new plugins or make changes to native files, you'll need to rebuild the native project since live reloading only applies to web code changes.

## Using Capacitor Plugins

Capacitor plugins allow you to access native device features from your Nuxt app. Let's explore how to use the [Share plugin](https://capacitorjs.com/docs/apis/share/) as an example:

1. Install the Share plugin:

```shell
bun add @capacitor/share
```

2. Create or update a page to use the Share plugin. In Nuxt 4, pages go in `app/pages/`:

```vue
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Welcome to Nuxt + Capacitor!</h1>
    <button
      @click="shareContent"
      class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold"
    >
      Share now!
    </button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function shareContent() {
  await Share.share({
    title: 'Check this out!',
    text: 'Built with Nuxt and Capacitor',
    url: 'https://capacitorjs.com',
    dialogTitle: 'Share with friends',
  });
}
</script>
```

3. Sync the changes with the native project:

```shell
bun run mobile
```

Or just sync without rebuilding:
```shell
bunx cap sync
```

4. Rebuild and run the app on your device.

Now, when you click the "Share now!" button, the native share dialog will appear.

Next, you can make the app feel more native on iOS and Android with Capgo navigation and transitions, and fix common iOS layout issues that cause horizontal overflow or cropped safe areas.

## Native-feeling UI with Capgo Native Navigation and Transitions

I've worked for years with [Ionic](https://ionicframework.com/) to build cross-platform applications, but integrating it with Nuxt is hacky and rarely worth it when you already have [Tailwind CSS](https://tailwindcss.com/).

For a native mobile feel in a Nuxt + Capacitor app, use Capgo plugins instead of web-only UI kits like Konsta UI:

- **[@capgo/capacitor-native-navigation](https://github.com/Cap-go/capacitor-native-navigation)** — native navbar, Liquid Glass tab bar on iOS, and a blurred tab bar style on Android. Your Nuxt router keeps route state; the plugin owns the native chrome.
- **[@capgo/capacitor-transitions](https://github.com/Cap-go/capacitor-transitions)** — Ionic-style page transitions and iOS edge swipe-back in the WebView layer, without adopting Ionic UI.

Install both:

```shell
bun add @capgo/capacitor-native-navigation @capgo/capacitor-transitions
bunx cap sync
```

Configure native navigation with CSS inset mode so web content respects the native bars:

```typescript
import { NativeNavigation } from '@capgo/capacitor-native-navigation';

await NativeNavigation.configure({
  contentInsetMode: 'css',
  animationDuration: 360,
  glass: {
    effect: 'liquidGlass',
  },
});
```

Render a Liquid Glass tab bar (iOS uses system-owned rendering; Android uses a blurred WebView backdrop):

```typescript
await NativeNavigation.setTabbar({
  selectedId: 'home',
  labelVisibilityMode: 'labeled',
  icons: true,
  colors: { dynamic: true },
  tabs: [
    { id: 'home', title: 'Home', icon: { svg: '...' } },
    { id: 'settings', title: 'Settings', icon: { svg: '...' } },
  ],
});

await NativeNavigation.addListener('tabSelect', ({ id }) => {
  router.push(`/${id}`);
});
```

Add native page transitions in your app shell:

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import '@capgo/capacitor-transitions';
import { initTransitions, setDirection, setupRouterOutlet } from '@capgo/capacitor-transitions/vue';

initTransitions({ platform: 'auto' });

const router = useRouter();
const outletRef = ref(null);

onMounted(() => {
  if (outletRef.value) {
    setupRouterOutlet(outletRef.value, { platform: 'auto', swipeGesture: 'auto' });
  }
});

const openSettings = () => {
  setDirection('forward');
  router.push('/settings');
};
</script>

<template>
  <cap-router-outlet ref="outletRef">
    <router-view />
  </cap-router-outlet>
</template>
```

Wrap routed pages in `cap-router-outlet`, `cap-page`, and `cap-content`, and call `setDirection('forward')` or `setDirection('back')` before navigating. Do not duplicate web headers or footers when native navigation owns those surfaces.

See the full guides: [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) and [Using @capgo/capacitor-transitions](/plugins/capacitor-transitions/).

### Safe areas with Tailwind

For device safe areas in Tailwind CSS, use [@capgo/tailwind-capacitor](https://github.com/Cap-go/tailwind-capacitor) (published as `tailwind-capacitor` on npm). It provides `safe-areas` utilities and other Capacitor-friendly Tailwind plugins:

```shell
bun add -D tailwind-capacitor
```

In `app/assets/css/main.css`:

```css
@import 'tailwindcss';
@plugin "@capgo/tailwind-capacitor/platform";
@plugin "@capgo/tailwind-capacitor/safe-areas";
```

For Nuxt 4 with Tailwind CSS 4, keep this import in the CSS file referenced from `nuxt.config.ts`.

Use utilities such as `pt-safe`, `pb-safe`, and `px-safe` instead of sprinkling `env(safe-area-inset-*)` by hand. The project is actively developed — if something is missing for your Nuxt setup, [open a PR on GitHub](https://github.com/Cap-go/tailwind-capacitor/pulls).

## Fixing iOS Layout Issues (Viewport, Safe Area, and Horizontal Overflow)

If content looks cropped, shifted, or horizontally scrollable on iOS, adding more `overflow-x: hidden` or tweaking the viewport tag alone usually does not fix it. Work through these checks in order.

### Make sure the viewport meta tag is applied correctly

In `nuxt.config.ts`, set the viewport through `app.head`:

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
      ],
    },
  },
});
```

### Handle iOS safe area from one root wrapper only

Create a single app shell and apply safe area padding there — not in multiple nested components:

```css
html,
body,
#__nuxt {
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

.app-shell {
  min-height: 100dvh;
  width: 100%;
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}
```

Wrap all page content inside `.app-shell`. Duplicated safe-area padding in headers, modals, and layout wrappers often makes the UI look cropped or too large.

With [@capgo/tailwind-capacitor](https://github.com/Cap-go/tailwind-capacitor), you can express the same padding with utilities like `pt-safe pb-safe px-safe` on that single shell.

### Set Capacitor iOS `contentInset` to `never` first

In `capacitor.config.ts`, prefer native inset disabled and let CSS (or Native Navigation's `contentInsetMode: 'css'`) own the safe area:

```typescript
const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'my-app',
  webDir: 'out',
  ios: {
    contentInset: 'never',
  },
};
```

Mixing Capacitor's automatic content inset with CSS `env(safe-area-inset-*)` padding is a common cause of double spacing.

### Find the real overflowing element

The usual culprit is an element using `100vw`, Tailwind `w-screen`, a fixed pixel width, or a large `min-width`.

In Safari Web Inspector, run:

```javascript
[...document.querySelectorAll('*')]
  .filter(el => el.scrollWidth > document.documentElement.clientWidth)
  .map(el => ({
    el,
    tag: el.tagName,
    class: el.className,
    scrollWidth: el.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
```

With Tailwind, replace `w-screen` with `w-full` when possible. Many horizontal overflow issues come from `100vw` / `w-screen`, duplicated safe-area padding, or a fixed-width container — not from the viewport meta tag itself.

## Conclusion

You've successfully converted your existing Nuxt web application into native iOS and Android apps using Capacitor 8. Your Vue codebase now runs natively on mobile devices with access to device APIs.

**What you accomplished:**
- Configured Nuxt for static generation
- Added Capacitor 8 with essential plugins
- Built and deployed to iOS and Android simulators
- Enabled live reload for development
- Fixed common iOS layout issues (viewport, safe area, overflow)
- Added native-feeling UI with Capgo Native Navigation and Transitions

**Next steps:**
- Set up [Capgo](https://capgo.app/) for over-the-air updates without app store resubmission
- Add more native plugins like Camera, Geolocation, or Push Notifications
- Configure app icons and splash screens for production
- Prepare your app for App Store and Google Play submission

> Starting a brand new project? Check out [Building a Nuxt Mobile App from Scratch](/blog/nuxt-mobile-app-capacitor-from-scratch/) for a guided walkthrough.

## Resources

- [Nuxt Documentation](https://nuxt.com/docs)
- [Capacitor 8 Documentation](https://capacitorjs.com/docs)
- [@capgo/capacitor-native-navigation](https://github.com/Cap-go/capacitor-native-navigation/) — Liquid Glass tab bar and native chrome
- [@capgo/capacitor-transitions](https://github.com/Cap-go/capacitor-transitions/) — native-feeling page transitions
- [@capgo/tailwind-capacitor](https://github.com/Cap-go/tailwind-capacitor) — Tailwind safe-area utilities for Capacitor
- [Capgo - Live Updates for Capacitor Apps](https://capgo.app/)

Learn how Capgo can help you build better apps faster, [sign up for a free account](/register/) today.

## Keep going from Convert Your Nuxt App to iOS & Android with Capacitor 8

If you are using **Convert Your Nuxt App to iOS & Android with Capacitor 8** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
