---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: Convert Your Next.js App to iOS & Android with Capacitor 8
description: >-
  Transform your existing Next.js 15 web application into native iOS and Android
  mobile apps using Capacitor 8. A complete guide to configuring static export,
  adding native plugins, and deploying to app stores.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2026-06-23T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: "Convert Your Next.js App to iOS & Android with Capacitor 8 Capgo blog illustration"
keywords: Next.js 15, Capacitor 8, convert web app to mobile, iOS, Android, mobile app development, static export, native plugins
tag: Tutorial
published: true
locale: en
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## Introduction

Have an existing Next.js web application? In this guide, you'll learn how to transform it into native iOS and Android mobile apps using [Capacitor](https://capacitorjs.com/) 8 — the latest version with improved performance and new features.

Capacitor wraps your web app in a native container, giving you access to device APIs like camera, filesystem, and push notifications while keeping your existing React codebase. Unlike React Native, you don't need to rewrite anything — your Next.js code runs as-is.

**What you'll learn:**
- Configure your existing Next.js app for static export
- Add Capacitor 8 with essential native plugins
- Build and test on iOS and Android simulators
- Enable live reload for faster development
- Fix common iOS layout issues (viewport, safe area, horizontal overflow)
- Add native-feeling UI with Capgo Native Navigation and Transitions

> Looking to start a new project from scratch? Check out our guide on [Building a Next.js Mobile App from Scratch](/blog/nextjs-mobile-app-capacitor-from-scratch/).

### Benefits of Using Next.js and Capacitor

- **Code Reusability**: Next.js enables you to write reusable components and share code between your web and mobile apps, saving development time and effort.
- **Performance**: Next.js offers built-in performance optimizations, such as server-side rendering and code splitting, ensuring fast loading times and a smooth user experience.
- **Native Capabilities**: Capacitor provides access to native device features like the camera, geolocation, and more, allowing you to build feature-rich mobile apps.
- **Simplified Development**: With Capacitor, you can develop and test your mobile app using familiar web technologies, reducing the learning curve and streamlining the development process.

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed
- An existing **Next.js 15+** application
- **Xcode** (for iOS development, macOS only)
- **Android Studio** (for Android development)

## Configuring Your Next.js App for Mobile

The first step is to configure your Next.js app for static export. Capacitor needs static HTML/JS/CSS files to bundle into the native app.

Open your `next.config.js` (or `next.config.ts`) file and add the export configuration:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

The `output: 'export'` setting tells Next.js to generate static HTML files, and `images: { unoptimized: true }` bypasses Next.js image optimization which requires a server.

**Important:** If you're using features that require a server (API routes, server components with data fetching, etc.), you'll need to refactor those to use client-side alternatives or external APIs.

Add mobile-specific scripts to your `package.json`:

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

Test the static export by running:

```shell
bun run build
```

You should see an `out` folder at the root of your project. This contains all the static files that Capacitor will bundle into your native app.

## Adding Capacitor 8 to Your Project

To package your Next.js app into a native mobile container, follow these steps:

1. Install Capacitor core and CLI:

```shell
bun add @capacitor/core
bun add -D @capacitor/cli
```

2. Install common Capacitor plugins you'll likely need:

```shell
bun add @capacitor/app @capacitor/keyboard @capacitor/splash-screen @capacitor/preferences
```

These plugins provide essential features:
- **@capacitor/app**: Handle app lifecycle events (foreground/background, URLs)
- **@capacitor/keyboard**: Control keyboard behavior on mobile
- **@capacitor/splash-screen**: Manage the native splash screen
- **@capacitor/preferences**: Store key-value data persistently

3. Initialize Capacitor with your project details:

```shell
bunx cap init my-app com.example.myapp --web-dir out
```

Replace `my-app` with your app name and `com.example.myapp` with your app ID (reverse domain notation).

4. Create or update the `capacitor.config.ts` file with the proper configuration:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'my-app',
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
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

This runs your custom script that builds the Next.js project and syncs the static files with the native platforms.

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

Congratulations! You have successfully deployed your Next.js web app to a mobile device.

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="nextjs-mobile-app">
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
  webDir: 'out',
  server: {
    url: 'http://YOUR_IP_ADDRESS:3000',
    cleartext: true,
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

4. Rebuild and run the app on your device using Android Studio or Xcode.

Now, whenever you make changes to your Next.js app, the mobile app will automatically reload to reflect those changes.

Note: If you install new plugins or make changes to native files, you'll need to rebuild the native project since live reloading only applies to web code changes.

## Using Capacitor Plugins

Capacitor plugins allow you to access native device features from your Next.js app. Let's explore how to use the [Share plugin](https://capacitorjs.com/docs/apis/share/) as an example:

1. Install the Share plugin:

```shell
bun add @capacitor/share
```

2. Update the `pages/index.js` file to use the Share plugin:

```javascript
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Share } from '@capacitor/share';

export default function Home() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Capgo!</a>
        </h1>

        <p className={styles.description}>
          <h2>Cool channel</h2>
          <button onClick={() => share()}>Share now!</button>
        </p>
      </main>
    </div>
  );
}
```

3. Sync the changes with the native project:

As mentioned earlier, when installing new plugins, we need to perform a sync operation and then redeploy the app to our device. To do this, run the following command:

```shell
bun run mobile
```

Or just sync without rebuilding:
```shell
bunx cap sync
```

4. Rebuild and run the app on your device.

Now, when you click the "Share now!" button, the native share dialog will appear, allowing you to share the content with other apps.

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="next-capacitor-share">
</div>
Next, you can make the app feel more native on iOS and Android with Capgo navigation and transitions, and fix common iOS layout issues that cause horizontal overflow or cropped safe areas.
## Native-feeling UI with Capgo Native Navigation and Transitions

I've worked for years with [Ionic](https://ionicframework.com/) to build cross-platform applications, but integrating it with Next.js is hacky and rarely worth it when you already have [Tailwind CSS 4](https://tailwindcss.com/).

For a native mobile feel in a Next.js + Capacitor app, use Capgo plugins instead of web-only UI kits like Konsta UI:

- **[@capgo/capacitor-native-navigation](https://github.com/Cap-go/capacitor-native-navigation)** — native navbar, Liquid Glass tab bar on iOS, and a blurred tab bar style on Android. Your Next.js router keeps route state; the plugin owns the native chrome.
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

```typescript
import '@capgo/capacitor-transitions';
import { initTransitions, setDirection, setupRouterOutlet } from '@capgo/capacitor-transitions/react';

initTransitions({ platform: 'auto' });
```

Wrap routed pages in `cap-router-outlet`, `cap-page`, and `cap-content`, and call `setDirection('forward')` or `setDirection('back')` before `router.push()` or `router.back()`. Do not duplicate web headers or footers when native navigation owns those surfaces.

See the full guides: [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) and [Using @capgo/capacitor-transitions](/plugins/capacitor-transitions/).

### Safe areas with Tailwind

For device safe areas in Tailwind CSS, use [@capgo/tailwind-capacitor](https://github.com/Cap-go/tailwind-capacitor) (published as `tailwind-capacitor` on npm). It provides `safe-areas` utilities and other Capacitor-friendly Tailwind plugins:

```shell
bun add -D tailwind-capacitor
```

In `styles/globals.css`:

```css
@import 'tailwindcss';
@plugin "@capgo/tailwind-capacitor/platform";
@plugin "@capgo/tailwind-capacitor/safe-areas";
```

Use utilities such as `pt-safe`, `pb-safe`, and `px-safe` instead of sprinkling `env(safe-area-inset-*)` by hand. The project is actively developed — if something is missing for your Next.js setup, [open a PR on GitHub](https://github.com/Cap-go/tailwind-capacitor/pulls).

## Fixing iOS Layout Issues (Viewport, Safe Area, and Horizontal Overflow)

If content looks cropped, shifted, or horizontally scrollable on iOS, adding more `overflow-x: hidden` or tweaking the viewport tag alone usually does not fix it. Work through these checks in order.

### Make sure the viewport meta tag is applied correctly

**App Router** (`app/`): export `viewport` from `app/layout.tsx`:

```typescript
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};
```

**Pages Router** (`pages/`): put the viewport meta tag in `pages/_app.tsx`, not `_document.tsx` (Next.js may not apply tags from `_document.tsx` the way you expect for viewport behavior).

### Handle iOS safe area from one root wrapper only

Create a single app shell and apply safe area padding there — not in multiple nested components:

```css
html,
body,
#__next {
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

## Performance Optimization

To ensure optimal performance of your Next.js and Capacitor app, consider the following best practices:

- Minimize the app size by removing unused dependencies and assets.
- Optimize images and other media files to reduce loading times.
- Implement lazy loading for components and pages to improve initial load performance.
- Use server-side rendering (SSR) with Next.js to enhance the app's loading speed and search engine optimization (SEO).
- Leverage Capacitor's built-in optimizations, such as web view caching and app bundling.

## Conclusion

You've successfully converted your existing Next.js web application into native iOS and Android apps using Capacitor 8. Your web codebase now runs natively on mobile devices with access to device APIs.

**What you accomplished:**
- Configured Next.js for static export
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

> Starting a brand new project? Check out [Building a Next.js Mobile App from Scratch](/blog/nextjs-mobile-app-capacitor-from-scratch/) for a guided walkthrough.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [@capgo/capacitor-native-navigation](https://github.com/Cap-go/capacitor-native-navigation/) — Liquid Glass tab bar and native chrome
- [Capacitor 8 Documentation](https://capacitorjs.com/docs)
- [@capgo/capacitor-transitions](https://github.com/Cap-go/capacitor-transitions/) — native-feeling page transitions
- [@capgo/tailwind-capacitor](https://github.com/Cap-go/tailwind-capacitor) — Tailwind safe-area utilities for Capacitor
- [Capgo - Live Updates for Capacitor Apps](https://capgo.app/)

Learn how Capgo can help you build better apps faster, [sign up for a free account](/register/) today.

## Keep going from Convert Your Next.js App to iOS & Android with Capacitor 8

If you are using **Convert Your Next.js App to iOS & Android with Capacitor 8** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
