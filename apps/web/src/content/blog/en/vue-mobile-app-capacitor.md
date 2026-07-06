---
slug: vue-mobile-app-capacitor
title: Building Mobile Apps with Vue and Capacitor
description: >-
  Learn how to create a mobile app using Vue, Capacitor, and optionally enhance
  Capgo Native Navigation, Transitions, and iOS layout best practices.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2026-06-23T19:49:03.000Z
head_image: /vue_capacitor.webp
head_image_alt: "Building Mobile Apps with Vue and Capacitor Capgo blog illustration"
keywords: Vue, Capacitor, mobile app development, live updates, OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: en
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In this tutorial, we'll guide you through the process of converting a Vue web application into a native mobile app using Capacitor. You can also add Capgo Native Navigation and Transitions for a native mobile feel, and use tailwind-capacitor for safe areas.

## About Capacitor

Capacitor is a game-changing tool that allows you to easily integrate it into any web project and convert your application into a native mobile app. It generates native Xcode and Android Studio projects for you and provides access to native device features like the camera through a JavaScript bridge.

## Preparing Your Vue App

First, create a new Vue app by running the following command:

```shell
vue create my-app
cd my-app
npm install
```

To prepare your Vue app for native mobile deployment, you'll need to export your project. Add a script in your **package.json** file to build and copy the Vue project:

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

After running the `build` command, you should see a new `dist` folder in your project's root directory. This folder will be used by Capacitor later.

## Adding Capacitor to Your Vue App

To convert your Vue web app into a native mobile container, follow these steps:

1. Install the Capacitor CLI as a development dependency and set it up within your project. Accept the default values for name and bundle ID during the setup.

2. Install the core package and the relevant packages for the iOS and Android platforms.

3. Add the platforms, and Capacitor will create folders for each platform at the root of your project:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Vue project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

You should now see new **iOS** and **android** folders in your Vue project.

Update the **capacitor.config.json** file to point the **webDir** to the result of your build command:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Now, you can build your Vue project and sync it with Capacitor:

```shell
npm run build
npx cap sync
```

## Build and Deploy Native Apps

To develop iOS apps, you need Xcode installed, and for Android apps, you need Android Studio installed. Additionally, you need to enroll in the Apple Developer Program for iOS and the Google Play Console for Android to distribute your app on the app store.

Use the Capacitor CLI to open both native projects:

```shell
npx cap open ios
npx cap open android
```

Deploy your app to a connected device using Android Studio or Xcode.

## Capacitor Live Reload

Enable live reload on your mobile device by having the Capacitor app load the content from a specific URL on your network.

Find your local IP address and update the `capacitor.config.ts` file with the correct IP and port:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:8080',
    cleartext: true
  }
};

export default config;
```

Apply these changes by copying them over to your native project:

```shell
npx cap copy
```

Now, your app will automatically reload and show changes when you update your Vue app.

## Using Capacitor Plugins

Install a Capacitor plugin, such as the Share plugin, and use it in your Vue app:

```shell
npm i @capacitor/share
```

Import the package and call the `share()` function in your app:

```html
<template>
  <div>
    <h1>Welcome to Vue and Capacitor!</h1>
    <button @click="share">Share now!</button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function share() {
  await Share.share({
    title: 'Open Youtube',
    text: 'Check new video on youtube',
    url: 'https://www.youtube.com',
    dialogTitle: 'Share with friends'
  });
}
</script>
```

After installing new plugins, run the `sync` command and redeploy the app to your device:

```
npx cap sync
```

Next, you can make the app feel more native on iOS and Android with Capgo navigation and transitions, and fix common iOS layout issues that cause horizontal overflow or cropped safe areas.

## Native-feeling UI with Capgo Native Navigation and Transitions

I've worked for years with [Ionic](https://ionicframework.com/) to build cross-platform applications, but integrating it with Vue is hacky and rarely worth it when you already have [Tailwind CSS](https://tailwindcss.com/).

For a native mobile feel in a Vue + Capacitor app, use Capgo plugins instead of web-only UI kits like Konsta UI:

- **[@capgo/capacitor-native-navigation](https://github.com/Cap-go/capacitor-native-navigation)** — native navbar, Liquid Glass tab bar on iOS, and a blurred tab bar style on Android. Your Vue router keeps route state; the plugin owns the native chrome.
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

In `src/assets/main.css`:

```css
@import 'tailwindcss';
@plugin "@capgo/tailwind-capacitor/platform";
@plugin "@capgo/tailwind-capacitor/safe-areas";
```

Use utilities such as `pt-safe`, `pb-safe`, and `px-safe` instead of sprinkling `env(safe-area-inset-*)` by hand. The project is actively developed — if something is missing for your Vue setup, [open a PR on GitHub](https://github.com/Cap-go/tailwind-capacitor/pulls).

## Fixing iOS Layout Issues (Viewport, Safe Area, and Horizontal Overflow)

If content looks cropped, shifted, or horizontally scrollable on iOS, adding more `overflow-x: hidden` or tweaking the viewport tag alone usually does not fix it. Work through these checks in order.

### Make sure the viewport meta tag is applied correctly

Add the viewport meta tag in `index.html` inside `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

### Handle iOS safe area from one root wrapper only

Create a single app shell and apply safe area padding there — not in multiple nested components:

```css
html,
body,
#app {
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
  webDir: 'dist',
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

Capacitor is a great option for building native applications based on an existing web project. With the addition of Capgo, it's even easier to add live updates to your app, ensuring that your users always have access to the latest features and bug fixes.

Learn how Capgo can help you build better apps faster, [sign up for a free account](/register/) today.

## Keep going from Building Mobile Apps with Vue and Capacitor

If you are using **Building Mobile Apps with Vue and Capacitor** to plan native media and interface behavior, connect it with [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player, [@capgo/capacitor-video-player](/docs/plugins/video-player/) for the implementation detail in @capgo/capacitor-video-player, and [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) for the native capability in Using @capgo/capacitor-native-navigation.
