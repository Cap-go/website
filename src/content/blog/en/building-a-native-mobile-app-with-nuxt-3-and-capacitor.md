---
slug: building-a-native-mobile-app-with-nuxt-4-and-capacitor
title: '2025 Guide: Creating Mobile Apps with Nuxt 4 and Capacitor'
description: How to create a mobile app with Nuxt 4, Capacitor, Tailwind CSS 4, and implement native UI with Konsta UI 5.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2025-01-20T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Nuxt 4 and Capgo illustration
keywords: Nuxt 4, Capacitor, Tailwind CSS 4, Konsta UI 5, mobile app development, live updates, OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: en
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In this tutorial, we will start with a new [Nuxt 4](https://nuxt.com/) app and move into native land using Capacitor and eventually also add [Konsta UI v5](https://konstaui.com/) for an improved Tailwind CSS 4 mobile UI, although the last step is completely optional.

By using Capacitor, you can easily convert your Nuxt 4 web application into a native mobile app without requiring significant modifications or learning a new skill like React Native. 

With just a few simple steps, most Nuxt 3 applications can be transformed into mobile apps. 

This tutorial will guide you through the process, starting with a new Nuxt 4 app and then incorporating Capacitor to move into the realm of native mobile apps. Additionally, you can optionally use [Konsta UI v5](https://konstaui.com/) to enhance your mobile UI with Tailwind CSS 4.

## About Capacitor

CapacitorJS is truly a game-changer! You can effortlessly incorporate it into any web project, and it will wrap your application into a native webview, generating the native Xcode and Android Studio project for you. Plus, its plugins provide access to native device features like the camera via a JS bridge.

With Capacitor, you get a fantastic native mobile app without any complicated setup or steep learning curve. Its slim API and streamlined functionality make it a breeze to integrate into your project. Trust me, you'll be amazed at how effortless it is to achieve a fully functional native app with Capacitor!

## Preparing Your Nuxt 4 App

To create a new Nuxt 4 app, run the following command:

```shell
npx nuxi@latest init my-app
cd my-app
npm install
```

### Nuxt 4 Directory Structure

Nuxt 4 introduces a new default directory structure. The main application code now lives in the `app/` directory:

```
my-app/
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

This new structure improves performance and provides better IDE type-safety by separating server and app contexts.

In order to create a native mobile app, we require an **export** of our project. Thus, let's include a straightforward script in our **package.json** that can be utilized to build and copy the Nuxt project:

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

After executing the command `generate`, you should be able to spot a fresh `.output/public` folder at your project's root. In Nuxt 4, this is the new location for static output (previously `dist`).

This folder will be used by Capacitor later on, but for now, we must set it up correctly.

## Adding Capacitor to Your Nuxt 4 App

To package any web app into a native mobile container, we must follow a few initial steps, but afterward it's as simple as executing a single `sync` command.

Firstly, we can install the [Capacitor CLI](https://capacitorjs.com/docs/cli/) as a development dependency, and then set it up within our project. During the setup, you can press “enter” to accept the default values for name and bundle ID.

Next, we need to install the core package and the relevant packages for the iOS and Android platforms.

Finally, we can add the platforms, and Capacitor will create folders for each platform at the root of our project:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Nuxt project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

By this point, you should be able to observe new **ios** and **android** folders in your Nuxt 4 project.

**Those are real native projects!**

To access the Android project later, you must install [Android Studio](https://developer.android.com/studio/). For iOS, you need a Mac and should install [Xcode](https://developer.apple.com/xcode/).

Additionally, you should find a **capacitor.config.ts** file in your project, which contains some fundamental Capacitor settings utilized during the sync. The only thing you need to pay attention to is the **webDir**, which must point to the result of your build command. Currently, it is inaccurate.

For Nuxt 4, the static generation output is located at `.output/public` instead of the old `dist` directory.

To rectify this, open the **capacitor.config.ts** file and update the **webDir**:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: '.output/public'
};

export default config;
```

You can try it out by executing the following commands:

```shell
npm run generate
npx cap sync
```

The first command `npm run generate` will simply build your Nuxt 4 project and copy the static build, while the second command `npx cap sync` will sync all the web code into the right places of the native platforms so they can be displayed in an app.

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

Congratulations! You have successfully deployed your Nuxt 4 web app to a mobile device. Here's an example:

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

But hold on, there's also a faster way to do this during development...

## Capacitor Live Reload

By now, you're probably used to having hot reload with all modern frameworks, and the good news is that you can have the same functionality **on a mobile device** with minimal effort!

Enable access to your locally hosted application with live reload **on your network** by having the Capacitor app load the content from the specific URL.

The first step is to figure out your local IP address. If you're using a Mac, you can find this out by running the following command in the terminal:

```shell
ipconfig getifaddr en0
```

On Windows, run :

```shell
ipconfig
```

Then look for the IPv4 address.

We can instruct Capacitor to load the app directly from the server by adding another entry to our `capacitor.config.ts` file:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: '.output/public',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Be sure to use **the correct IP and port**, I have used the default Nuxt 4 port in this example.

Now, we can apply these changes by copying them over to our native project:

```shell
npx cap copy
```

The `copy` command is similar to `sync`, but it will only **copy over the changes made to the web folder** and configuration, without updating the native project.

You can now deploy your app one more time through Android Studio or Xcode. After that, if you change something in your Nuxt app, **the app will automatically reload** and show the changes!

**Keep in mind** that if you install new plugins such as the camera, it still requires a rebuild of your native project. This is because native files are changed, and it can't be done on the fly.

Note that you should use the correct IP and port in your configuration. The code block above shows the default Nuxt 4 port for demonstration purposes.

## Using Capacitor Plugins

Let's take a look at how to use a Capacitor plugin in action, which we've mentioned a few times before. To do this, we can install a fairly simple plugin by running:

```shell
npm i @capacitor/share
```

There's nothing fancy about the [Share plugin](https://capacitorjs.com/docs/apis/share/), but it anyway brings up the native share dialog! For this we now only need to import the package and call the according `share()` function from our app. 

In Nuxt 4, pages go in the `app/pages/` directory, so let's create **app/pages/index.vue** with this content:

```html
<template>
  <div>
    <h1>Welcome to Nuxt 4 and Capacitor!</h1>
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

## Adding Konsta UI v5 with Tailwind CSS 4

To use Konsta UI v5 in your Nuxt 4 app, you need to have [Tailwind CSS 4 already installed](https://tailwindcss.com/docs/guides/nuxtjs/) and to install the package:

```shell
npm i konsta
```

First, import the Konsta UI v5 theme in your main CSS file (e.g., `app/assets/css/main.css`):

```css
@import 'tailwindcss';
/* import Konsta UI v5 theme */
@import 'konsta/theme.css';
```

Additionally, you need to modify your `tailwind.config.js` file for Tailwind CSS 4:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

`konstaConfig` will extend the default (or your custom one) Tailwind CSS 4 config with some extra variants and helper utilities required for Konsta UI v5.

Now we need to set up the main [App](https://konstaui.com/vue/app/) component so we can set some global parameters (like `theme`).

We need to wrap the whole app with `App` in the `app.vue`:

```html
<template>
  <App theme="ios">
    <NuxtPage />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Roboto Font for Material Design

Konsta UI v5 uses system font for iOS theme and Roboto font for Material Design theme. If you're developing a web app, add the Roboto font to your app:

In your `nuxt.config.ts`, add the font links to the app head:

```javascript
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap'
        }
      ]
    }
  }
})
```

### Example Page

Now when everything is set up, we can use Konsta UI v5 Vue components in our Nuxt 4 pages.

For example, let's create `app/pages/index.vue` with the following content:

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Nuxt 4 & Konsta UI app. Let's see what we have here.
      </p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem href="/about/" title="About" />
      <ListItem href="/form/" title="Form" />
    </List>

    <Block strong class="flex space-x-4">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Block>
  </Page>
</template>

<script setup>
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/vue';
</script>
```

If the live reload is out of sync after installing all the necessary components, try restarting everything. Once you have done that, you should see a mobile app with a somewhat native look, built with Nuxt 4, Capacitor, Tailwind CSS 4, and Konsta UI v5!

You should see the following page as a result:

<div class="mx-auto" style="width: 50%;">
  <img src="/konsta-nuxt.webp" alt="konsta-nuxt">
</div>

## Conclusion

Capacitor is an excellent option for building native applications based on an existing web project, offering a simple way to share code and maintain a consistent UI. 

And with the addition of [Capgo](https://capgo.app/), it's even easier to add live updates to your app, ensuring that your users always have access to the latest features and bug fixes.

If you would like to learn how to add Capgo to your Next.js app, take a look at the next article :

## Credits

Thanks a lot to Simon, this article is based on [this article](https://devdactic.com/nextjs-and-capacitor/) rewritten for Nuxt 4 and adapted.
