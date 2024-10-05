---

slug: "vue-mobile-app-capacitor"
title: Building Mobile Apps with Vue and Capacitor
description: Learn how to create a mobile app using Vue, Capacitor, and optionally enhance the UI with Konsta UI.
author: Martin Donadieu
author_url: https://x.com/martindonadieu
created_at: 2023-06-08
updated_at: 2023-06-29
head_image: "/vue_capacitor.webp"
head_image_alt: Vue and Capacitor illustration
tag: Tutorial
published: true
next_blog: "update-your-capacitor-apps-seamlessly-using-capacitor-updater"

---

In this tutorial, we'll guide you through the process of converting a Vue web application into a native mobile app using Capacitor. Optionally, you can also enhance your mobile UI with Konsta UI, a Tailwind CSS-based mobile UI library.

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

## Adding Konsta UI

To use Konsta UI in your Vue app, you need to have [tailwind already install](https://tailwindcss.com/docs/guides/vite/#vue) and to install the package:
To use Konsta UI in your Vue app, install the package and modify your `tailwind.config.js` file:

```shell
npm i konsta
```

Wrap your app with the `App` component in the `pages/_app.vue` file, and use Konsta UI Vue components in your Vue pages.

## Conclusion

Capacitor is a great option for building native applications based on an existing web project. With the addition of Capgo, it's even easier to add live updates to your app, ensuring that your users always have access to the latest features and bug fixes.

Learn how Capgo can help you build better apps faster, [sign up for a free account](/register/) today.
