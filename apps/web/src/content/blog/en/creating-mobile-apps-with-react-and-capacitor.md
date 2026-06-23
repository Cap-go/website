---
slug: creating-mobile-apps-with-react-and-capacitor
title: Building Mobile Apps with Pure React.js and Capacitor
description: >-
  A guide on how to transform a React.js web application into a native mobile
  app utilizing Capacitor, and adding Capgo Native Navigation, Transitions, and iOS layout best practices.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2026-06-23T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: "Building Mobile Apps with Pure React.js and Capacitor Capgo blog illustration"
keywords: React, Capacitor, mobile app development, live updates, OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: en
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

This tutorial will walk you through crafting a mobile application using React and Capacitor. By the end, you’ll know how to morph a React.js web app into a native mobile application with Capacitor, and add a native feel with Capgo Native Navigation and Transitions.

Capacitor enables the easy transformation of your React.js web app into a native mobile application, requiring no substantial alterations or learning of new strategies such as React Native.

The process involves a few simple steps, and before you know it, your React.js app will be a fully-functioning mobile application. So, stick around as we guide you on this journey.

## Capacitor Overview

CapacitorJS is a game-changer. It can seamlessly integrate with any web project and wrap your app into a native webview while generating the native Xcode and Android Studio project. Plus, through its plugins, you can access native device features like the camera via a JS bridge.

Capacitor offers a straightforward way to create a native mobile application without any hassle or steep learning curve. Its simple API and streamlined functionality make it easy to incorporate into your project.

## Setting Up Your React.js App

Let's go for the simplest method to initiate a React application. We'll use the npm package manager to create a new React app:

```shell
npx create-react-app my-app
```

To transform our project into a native mobile app, an **export** of our app is required. 

We’ll come back to this in a moment. First, let's understand how to integrate Capacitor into our React app.

## Integrating Capacitor into Your React.js App

The initial setup steps might be a little detailed, but after that, updating your native app wrapper becomes as simple as running a `sync` command.

First, we’ll install the Capacitor CLI as a development dependency and set it up within our project. During the setup, accept the default values for name and bundle ID by pressing “enter.”

Next, we'll install the core package and the relevant packages for the iOS and Android platforms.

Finally, we’ll add the platforms, and Capacitor will create folders for each platform at our project root:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your React project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

The **ios** and **android** directories are now present in your React.js project.

To access the Android project later, install [Android Studio](https://developer.android.com/studio/). For iOS, you need a Mac and should install [Xcode](https://developer.apple.com/xcode/).

Next, update the **webDir** in your **capacitor.config.json** file as shown below:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

Run the build command and sync your project with Capacitor:

```shell
npm run build
npx cap sync
```

The `npm run build` command will build your React.js project, while `npx cap sync` will align the web code in the accurate places of the native platforms so they can be executed in an app.

Now, with a little luck and no errors, your React.js app should be ready for launch on a device!

## Building and Deploying Your Native Apps

Developing iOS apps requires **Xcode**, and Android apps need **Android Studio**. If you plan to distribute your app on the app store, you must enroll in the Apple Developer Program for iOS and the Google Play Console for Android.

The Capacitor CLI simplifies the process of opening both native projects:

```shell
npx cap open ios
npx cap open android
```

Once your native projects are set up, deploying your app to a connected device is a straightforward process. 

For Android Studio, wait for everything to load and then deploy your app to a connected device. 

For Xcode, establish your signing account to deploy your app to a real device instead of just the simulator. After doing that, simply hit play to run the app on your connected device, which you can choose at the top.

If all has gone well, you'll have converted your React.js web app into a native mobile application!

## Capacitor Live Reload

Modern development frameworks usually come with hot reload, and luckily, you can have the same with Capacitor but **on your mobile device**!

You can make your locally hosted application accessible with live reload on your network by having the Capacitor app load the content from a specific URL.

First, determine your local IP address. On a Mac, you can do it by running `ipconfig getifaddr en0` in the terminal. On Windows, execute `ipconfig` and look for the IPv4 address.

After this, instruct Capacitor to load the app directly from the server by adding another parameter to your `capacitor.config.ts` file:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Be sure to use the accurate IP and port. Run `npx cap copy` to apply these changes to our native project.

Upon deploying your app one more time through Android Studio or Xcode, any changes in your React app will automatically be reloaded and displayed on your app!

Do keep in mind that if new plugins are installed, such as the camera, it necessitates a rebuild of your native project. This is because the native files will have changed and cannot be updated on the fly.

## Using Capacitor Plugins

Let's take a quick look at how to use a Capacitor plugin. Let's install a simple one, the [Share plugin](https://capacitorjs.com/docs/apis/share/), which prompts the native share dialog:

```shell
npm i @capacitor/share
```

To use it, import the package and call the respective `share()` function from our app. Consider the **App.js**:

```javascript
import { Share } from '@capacitor/share';

function ShareButton() {
  const share = async () => {
    await Share.share({
      title: 'React App',
      text: 'Visit this React App',
      url: 'http://localhost:3000',
      dialogTitle: 'Share with...'
    });
  };

  return (
    <button onClick={share}>
      Share
    </button>
  );
}

export default ShareButton;
```

After installing a new plugin, remember to sync your React project again using `npx cap sync`.

Next, you can make the app feel more native on iOS and Android with Capgo navigation and transitions, and fix common iOS layout issues that cause horizontal overflow or cropped safe areas.

## Native-feeling UI with Capgo Native Navigation and Transitions

I've worked for years with [Ionic](https://ionicframework.com/) to build cross-platform applications, but integrating it with React is hacky and rarely worth it when you already have [Tailwind CSS](https://tailwindcss.com/).

For a native mobile feel in a React + Capacitor app, use Capgo plugins instead of web-only UI kits like Konsta UI:

- **[@capgo/capacitor-native-navigation](https://github.com/Cap-go/capacitor-native-navigation)** — native navbar, Liquid Glass tab bar on iOS, and a blurred tab bar style on Android. Your React router keeps route state; the plugin owns the native chrome.
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
  navigate(`/${id}`);
});
```

Add native page transitions in your app shell:

```tsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '@capgo/capacitor-transitions';
import { initTransitions, setDirection, setupRouterOutlet } from '@capgo/capacitor-transitions/react';

initTransitions({ platform: 'auto' });

export function AppShell() {
  const navigate = useNavigate();
  const outletRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (outletRef.current) {
      setupRouterOutlet(outletRef.current, { platform: 'auto', swipeGesture: 'auto' });
    }
  }, []);

  const openSettings = () => {
    setDirection('forward');
    navigate('/settings');
  };

  return <cap-router-outlet ref={outletRef}>{/* routes */}</cap-router-outlet>;
}
```

Wrap routed pages in `cap-router-outlet`, `cap-page`, and `cap-content`, and call `setDirection('forward')` or `setDirection('back')` before navigating. Do not duplicate web headers or footers when native navigation owns those surfaces.

See the full guides: [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) and [Using @capgo/capacitor-transitions](/plugins/capacitor-transitions/).

### Safe areas with Tailwind

For device safe areas in Tailwind CSS, use [@capgo/tailwind-capacitor](https://github.com/Cap-go/tailwind-capacitor) (published as `tailwind-capacitor` on npm). It provides `safe-areas` utilities and other Capacitor-friendly Tailwind plugins:

```shell
bun add -D tailwind-capacitor
```

In `src/index.css`:

```css
@import 'tailwindcss';
@plugin "@capgo/tailwind-capacitor/platform";
@plugin "@capgo/tailwind-capacitor/safe-areas";
```

Use utilities such as `pt-safe`, `pb-safe`, and `px-safe` instead of sprinkling `env(safe-area-inset-*)` by hand. The project is actively developed — if something is missing for your React setup, [open a PR on GitHub](https://github.com/Cap-go/tailwind-capacitor/pulls).

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
#root {
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
  webDir: 'build',
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

Capacitor offers a seamless means of building native apps based on an existing web project, providing a simple way to share code and have consistent UI.

Thanks to technologies like Capacitor, building mobile applications from React.js web apps has never been easier. Take your web development skills to the next level by crafting impressive native mobile apps. Happy coding!

For more about how you can fast-track your app development process, [sign up for a free account](/register/) today.

## Keep going from Building Mobile Apps with Pure React.js and Capacitor

If you are using **Building Mobile Apps with Pure React.js and Capacitor** to plan native media and interface behavior, connect it with [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player, [@capgo/capacitor-video-player](/docs/plugins/video-player/) for the implementation detail in @capgo/capacitor-video-player, and [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) for the native capability in Using @capgo/capacitor-native-navigation.
