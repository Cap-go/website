---
slug: quasar-mobile-app-capacitor
title: 'Creating Mobile Apps with live updates, Quasar and Capacitor.'
description: 'How to create a mobile app with Quasar, Capacitor and implement live updates.'
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2026-06-23T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: "'Creating Mobile Apps with live updates, Quasar and Capacitor.' Capgo blog illustration"
keywords: Quasar, Capacitor, mobile app development, live updates, OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: en
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
In this tutorial, we will begin with creating a new web app using [Quasar](https://quasar.dev/). Later on, we'll learn how to turn it into a mobile app using Capacitor. If you want to make your app look better on mobile.

With Capacitor, you can change your Quasar web app into a mobile app without needing to do lots of hard things or learn a completely new way of making apps like you would with something called React Native. 

This tutorial will guide you through the process, starting with a new Quasar app and then incorporating Capacitor to move into the realm of native mobile apps. Additionally, you will use [Capgo](https://capgo.app/) to send live update to your app in seconds.

## About Capacitor

CapacitorJS is truly a game-changer! You can effortlessly incorporate it into any web project, and it will wrap your application into a native webview, generating the native Xcode and Android Studio project for you. Plus, its plugins provide access to native device features like the camera via a JS bridge.

With Capacitor, you get a fantastic native mobile app without any complicated setup or steep learning curve. Its slim API and streamlined functionality make it a breeze to integrate into your project. Trust me, you'll be amazed at how effortless it is to achieve a fully functional native app with Capacitor!

## Preparing Your Quasar App

To create a new Quasar app, run the following command:

```shell
npm init quasar
```

![Quasar Project Setup](/quasar-setup.webp)

Pick the "App with Quasar CLI" option then "Quasar v2".

In order to create a native mobile app, we require an **export** of our project. Thus, let's include a straightforward script in our **package.json** that can be utilized to build and copy the Quasar project:

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

After executing the command `generate`, you should be able to spot a fresh `dist` folder at your project's root.

This folder will be used by Capacitor later on, but for now, we must set it up correctly.

## Adding Capacitor to Your Quasar App

To package any web app into a native mobile container, we must follow a few initial steps, but afterward it's as simple as executing a single `sync` command.

Firstly, we can install the [Capacitor CLI](https://capacitorjs.com/docs/cli/) as a development dependency, and then set it up within our project. During the setup, you can press “enter” to accept the default values for name and bundle ID.

Next, we need to install the core package and the relevant packages for the iOS and Android platforms.

Finally, we can add the platforms, and Capacitor will create folders for each platform at the root of our project:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Quasar project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

![Initialize Capacitor](/capacitor-init.webp)

By this point, you should be able to observe new **ios** and **android** folders in your Quasar project.

**Those are real native projects!**

To access the Android project later, you must install [Android Studio](https://developer.android.com/studio/). For iOS, you need a Mac and should install [Xcode](https://developer.apple.com/xcode/).

Additionally, you should find a **capacitor.config.ts** file in your project, which contains some fundamental Capacitor settings utilized during the sync. The only thing you need to pay attention to is the **webDir**, which must point to the result of your build command. Currently, it is inaccurate.

To rectify this, open the **capacitor.config.json** file and update the **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

You can try it out by executing the following commands:

```shell
npm run generate
npx cap sync
```

The first command `npm run generate` will simply build your Quasar project and copy the static build, while the second command `npx cap sync` will sync all the web code into the right places of the native platforms so they can be displayed in an app.

Additionally, the sync command might update the native platforms and install plugins, so when you install a new [Capacitor plugins](https://capacitorjs.com/docs/plugins/) it’s time to run `npx cap sync` again.

Without noticing, you are now actually done, so let’s see the app on a device!

## Build and Deploy native apps

To develop iOS apps, you need to have **Xcode** installed, and for Android apps, you need to have **Android Studio** installed. Moreover, if you plan to distribute your app on the app store, you need to enroll in the Apple Developer Program for iOS and the Google Play Console for Android.

If you're new to native mobile development, you can use the Capacitor CLI to easily open both native projects:

```shell
npx cap open ios
npx cap open android
```

Once you've set up your native projects, deploying your app to a connected device is easy. In Android Studio, you just need to wait for everything to be ready, and you can deploy your app to a connected device without changing any settings. Here's an example: 

![android-studio-run](/android-studio-run.webp)

In Xcode, you need to set up your signing account to deploy your app to a real device instead of just the simulator. If you haven't done this before, Xcode guides you through the process (but again, you need to be enrolled in the Developer Program). After that, you can simply hit play to run the app on your connected device, which you can select at the top. Here's an example:

![xcode-run](/xcode-run.webp)

Congratulations! You have successfully deployed your Quasar web app to a mobile device. Here's an example:

<div class="mx-auto" style="width: 50%;">
  <img src="/Quasar-mobile.webp" alt="quasar-mobile-app">
</div>

But hold on, there's also a faster way to do this during development...

## Capgo Live Update

Capgo Live Update is a service that allows developers to deploy updates to their mobile apps without going through the traditional App Store submission process. This can be a convenient way to quickly fix bugs or make small updates to an app without waiting for the App Store review process.

Integrating Capgo into your Quasar app is a straightforward process that empowers you to harness the power of real-time live updates. This step-by-step guide will walk you through the integration and implementation of Capgo Live Update, enabling you to deliver seamless updates.

**Sign Up and Access the Capgo Dashboard**:

It’s time to sign up, and get your API key to upload your first version! Begin by [signing up for a Capgo account](https://console.capgo.app/register/).

**Install the Capgo SDK**:

From a command line, directly into the root of your Capacitor app, run:

`npm i @capgo/capacitor-updater && npx cap sync` To install the plugin into your Capacitor app.

And then add to your app this code as a replacement of CodePush one:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

This will tell the native plugin the installation as succeeded. 

**Login to Capgo CLOUD**:

First, use the `all` [apikey](https://console.capgo.app/dashboard/apikeys/) present in your account to log in with the CLI:

    `npx @capgo/cli@latest login YOU_KEY`

**Add your first App**:

Let’s get started by first creating an app in Capgo Cloud with the CLI.

```shell
    npx @capgo/cli@latest app add
```
This command will use all variables defined in the Capacitor config file to create the app.

**Upload your first version**:

Run the command to build your code and send it to Capgo with: 

```shell
npx @capgo/cli@latest bundle upload`
```

By default, the version name will be the one in your package.json file.

Check in [Capgo](https://console.capgo.app/login/) if the build is present.

You can even test it with my [mobile sandbox app](https://capgo.app/app_mobile/).

**Make channel default**:

After you have sent your app to Capgo, you need to make your channel default to let apps receive updates from Capgo.

`npx @capgo/cli@latest channel set production -s default`

**Configure app to validate updates**:

Add this config to your main JavaScript file.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Then do a `npm run build && npx cap copy` to update your app.

**Receive a Live Update**:

For your application to receive a live update from Deploy, you’ll need to run the app on a device or an emulator. The easiest way to do this is simply to use the following command to launch your local app in an emulator or a device connected to your computer.

      npx cap run [ios | android]

Open the app, put it in the background and open it again, you should see in the logs the app did the update.

Congrats! 🎉 You have successfully deployed your first Live Update. This is just the start of what you can do with Live Updates. To learn more, view the complete [Live Updates docs](https://capgo.app/docs/getting-started/quickstart/).

## Using Capacitor Plugins

Let's take a look at how to use a Capacitor plugin in action, which we've mentioned a few times before. To do this, we can install a fairly simple plugin by running:

```shell
npm i @capacitor/share
```

There’s nothing fancy about the [Share plugin](https://capacitorjs.com/docs/apis/share/), but it anyway brings up the native share dialog! For this we now only need to import the package and call the according `share()` function from our app, so let’s change the **pages/index.vue** to this:

```html
<template>
  <div>
    <h1>Welcome to Quasar and Capacitor!</h1>
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

As mentioned earlier, when installing new plugins, we need to perform a sync operation and then redeploy the app to our device. To do this, run the following command:

```
npx cap sync
```

After hitting the button, you can witness the beautiful native share dialog in action!

Next, you can make the app feel more native on iOS and Android with Capgo navigation and transitions, and fix common iOS layout issues that cause horizontal overflow or cropped safe areas.

## Native-feeling UI with Capgo Native Navigation and Transitions

I've worked for years with [Ionic](https://ionicframework.com/) to build cross-platform applications, but integrating it with Quasar is hacky and rarely worth it when you already have [Tailwind CSS](https://tailwindcss.com/).

For a native mobile feel in a Quasar + Capacitor app, use Capgo plugins instead of web-only UI kits like Konsta UI:

- **[@capgo/capacitor-native-navigation](https://github.com/Cap-go/capacitor-native-navigation)** — native navbar, Liquid Glass tab bar on iOS, and a blurred tab bar style on Android. Your Quasar router keeps route state; the plugin owns the native chrome.
- **[@capgo/capacitor-transitions](https://github.com/Cap-go/capacitor-transitions)** — Ionic-style page transitions and iOS edge swipe-back in the WebView layer, without adopting Ionic UI.

Install both:

```shell
npm add @capgo/capacitor-native-navigation @capgo/capacitor-transitions
npmx cap sync
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
npm add -D tailwind-capacitor
```

In `src/css/app.scss`:

```css
@import 'tailwindcss';
@plugin "@capgo/tailwind-capacitor/platform";
@plugin "@capgo/tailwind-capacitor/safe-areas";
```

Use utilities such as `pt-safe`, `pb-safe`, and `px-safe` instead of sprinkling `env(safe-area-inset-*)` by hand. The project is actively developed — if something is missing for your Quasar setup, [open a PR on GitHub](https://github.com/Cap-go/tailwind-capacitor/pulls).

## Fixing iOS Layout Issues (Viewport, Safe Area, and Horizontal Overflow)

If content looks cropped, shifted, or horizontally scrollable on iOS, adding more `overflow-x: hidden` or tweaking the viewport tag alone usually does not fix it. Work through these checks in order.

### Make sure the viewport meta tag is applied correctly

In `index.html` (or your Quasar HTML template), set the viewport meta tag in `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

### Handle iOS safe area from one root wrapper only

Create a single app shell and apply safe area padding there — not in multiple nested components:

```css
html,
body,
#q-app {
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
  webDir: 'dist/spa',
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

Capacitor is an excellent option for building native applications based on an existing web project, offering a simple way to share code and maintain a consistent UI. 

And with the addition of [Capgo](https://capgo.app/), it's even easier to add live updates to your app, ensuring that your users always have access to the latest features and bug fixes.

If you would like to learn how to add Capgo to your Next.js app, take a look at the next article :

## Keep going from Creating Mobile Apps with live updates, Quasar and Capacitor.

If you are using **Creating Mobile Apps with live updates, Quasar and Capacitor.** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
