---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  2024 Building Native Mobile Apps with Next.js 14 and Capacitor: A Step-by-Step
  Guide
description: >-
  Learn how to create native mobile apps using Next.js 14 and Capacitor in this
  comprehensive guide. Discover the latest best practices and techniques for
  building high-performance, feature-rich mobile applications.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 14 and Capacitor illustration
tag: Tutorial
published: true
locale: en
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## Introduction

In this tutorial, we'll explore how to create native mobile apps using the powerful combination of [Next.js](https://nextjs.org/) 14 and [Capacitor](https://capacitorjs.com/) in 2024. By leveraging the latest versions of these technologies, you can build high-performance, feature-rich mobile applications with ease. We'll also demonstrate how to enhance the mobile UI using [Konsta UI](https://konstaui.com/) and Tailwind CSS, although this step is optional.

Next.js, a popular React framework, provides a solid foundation for building web applications, while Capacitor allows you to transform your Next.js app into a native mobile app without significant modifications or the need to learn new skills like React Native. This tutorial will guide you through the process, starting with setting up a new Next.js app and integrating Capacitor to create a native mobile experience.

### Benefits of Using Next.js and Capacitor

- **Code Reusability**: Next.js enables you to write reusable components and share code between your web and mobile apps, saving development time and effort.
- **Performance**: Next.js offers built-in performance optimizations, such as server-side rendering and code splitting, ensuring fast loading times and a smooth user experience.
- **Native Capabilities**: Capacitor provides access to native device features like the camera, geolocation, and more, allowing you to build feature-rich mobile apps.
- **Simplified Development**: With Capacitor, you can develop and test your mobile app using familiar web technologies, reducing the learning curve and streamlining the development process.

## Preparing Your Next.js App

To get started, let's create a new Next.js application using the `create-next-app` command:

```shell
npx create-next-app@latest my-app
```

This command will set up a blank Next.js project with the recommended configuration for the latest version.

Next, navigate to the project directory:

```shell
cd my-app
```

To create a native mobile app, we need to generate a static export of our Next.js project. Update the `package.json` file to include a script for building and exporting the project:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "static": "NEXT_PUBLIC_IS_MOBILE=true next build"
  }
}
```

Running the `npm run static` command may result in errors due to image optimization incompatibility. To resolve this, open the `next.config.js` file and modify it as follows:

```javascript
/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const nextConfig = {
    ...(isMobile ? {output: 'export'} : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

Now, running `npm run static` should work without any issues, and you will find a new `out` folder at the root of your project. This folder will be used by Capacitor in the next steps.

## Adding Capacitor to Your Next.js 14 App

To package your Next.js app into a native mobile container, follow these steps:

1. Install the [Capacitor CLI](https://capacitorjs.com/docs/cli/) as a development dependency:

```shell
npm install -D @capacitor/cli
```

2. Initialize Capacitor in your Next.js project:

```shell
npx cap init
```

During the initialization process, you can press "Enter" to accept the default values for the app name and bundle ID.

3. Install the required Capacitor packages:

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4. Add the native platforms:

```shell
npx cap add ios
npx cap add android
```

Capacitor will create folders for each platform (`ios` and `android`) at the root of your project. These folders contain the native projects for iOS and Android, respectively.

To access and build the Android project, you need to have [Android Studio](https://developer.android.com/studio) installed. For iOS development, you need a Mac with [Xcode](https://developer.apple.com/xcode/) installed.

5. Configure Capacitor:

Open the `capacitor.config.ts` file and update the `webDir` property to point to the output directory of your Next.js build:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

6. Build and sync your project:

```shell
npm run static
npx cap sync
```

The `npm run static` command builds your Next.js project and exports the static files, while `npx cap sync` synchronizes the web code with the native platforms.

## Building and Deploying Native Apps

To build and deploy your native mobile app, follow these steps:
To develop iOS apps, you need to have **Xcode** installed, and for Android apps, you need to have **Android Studio** installed. Moreover, if you plan to distribute your app on the app store, you need to enroll in the Apple Developer Program for iOS and the Google Play Console for Android.

1. Open the native projects:

For iOS:
```shell
npx cap open ios
```

For Android:
```shell
npx cap open android
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

2. Update the `capacitor.config.ts` file to include the server configuration:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://YOUR_IP_ADDRESS:3000',
    cleartext: true,
  },
};

export default config;
```

Replace `YOUR_IP_ADDRESS` with your local IP address.

3. Apply the changes to your native project:

```shell
npx cap copy
```

The `copy` command copies the web folder and configuration changes to the native project without updating the entire project.

4. Rebuild and run the app on your device using Android Studio or Xcode.

Now, whenever you make changes to your Next.js app, the mobile app will automatically reload to reflect those changes.

Note: If you install new plugins or make changes to native files, you'll need to rebuild the native project since live reloading only applies to web code changes.

## Using Capacitor Plugins

Capacitor plugins allow you to access native device features from your Next.js app. Let's explore how to use the [Share plugin](https://capacitorjs.com/docs/apis/share/) as an example:

1. Install the Share plugin:

```shell
npm i @capacitor/share
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
npx cap sync
```

4. Rebuild and run the app on your device.

Now, when you click the "Share now!" button, the native share dialog will appear, allowing you to share the content with other apps.

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="next-capacitor-share">
</div>

To make the button look more mobile-friendly, we can add some styling using my favorite UI component library for web apps - Next.js (no pun intended). 

## Adding Konsta UI

I’ve worked years with [Ionic](https://ionicframework.com/) to build awesome cross platform applications and it was one of the best choices for years.
But now i don't recommend it anymore it's very hacky to integrate it with Next.js and it's not really worth it when you have already [tailwindcss](https://tailwindcss.com/).


if you want a really great looking mobile UI that adapts to iOS and Android specific styling i recommend kosta UI.

You need to have [tailwind already install](https://tailwindcss.com/docs/guides/nextjs/) 
To enhance the mobile UI of your Next.js app, you can use [Konsta UI](https://konstaui.com/), a mobile-friendly UI component library that adapts to iOS and Android styling. Follow these steps to integrate Konsta UI:

1. Install the required packages:

```shell
npm i konsta
```

2. Update the `tailwind.config.js` file:

```javascript
const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
```

3. Wrap your app with the Konsta UI `App` component in `pages/_app.js`:

```javascript
import { App } from 'konsta/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```
### Example Page

Now when everything is set up, we can use Konsta UI React components in our Next.js pages.

4. Update the `pages/index.js` file to use Konsta UI components:

```javascript
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  BlockTitle,
} from 'konsta/react';

export default function Home() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your Next.js & Konsta UI app. Let's see what we have here.
        </p>
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List>
        <ListItem href="/about/" title="About" />
        <ListItem href="/form/" title="Form" />
      </List>

      <Block strong className="flex space-x-4">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Block>
    </Page>
  );
}
```

5. Restart the development server and rebuild the app.

Your Next.js app should now have a native-looking mobile UI powered by Konsta UI.

## Performance Optimization

To ensure optimal performance of your Next.js and Capacitor app, consider the following best practices:

- Minimize the app size by removing unused dependencies and assets.
- Optimize images and other media files to reduce loading times.
- Implement lazy loading for components and pages to improve initial load performance.
- Use server-side rendering (SSR) with Next.js to enhance the app's loading speed and search engine optimization (SEO).
- Leverage Capacitor's built-in optimizations, such as web view caching and app bundling.

## Conclusion

In this tutorial, we explored how to build native mobile apps using Next.js and Capacitor. By leveraging the power of these technologies, you can create high-performance, feature-rich mobile applications with ease.

We covered the steps to set up a Next.js app, integrate Capacitor, and build and deploy the app to mobile devices. Additionally, we discussed using Capacitor plugins, adding Konsta UI for an enhanced mobile UI, and performance optimization techniques.

To take your Next.js and Capacitor app to the next level, consider exploring [Capgo](https://capgo.app/) for seamless live updates, ensuring your users always have access to the latest features and bug fixes.

By following the best practices and techniques outlined in this guide, you'll be well-equipped to build stunning native mobile apps using Next.js and Capacitor.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Konsta UI Documentation](https://konstaui.com/docs)
- [Capgo - Live Updates for Capacitor Apps](https://capgo.app/)

Happy app building!

Learn how Capgo can help you build better apps faster, [sign up for a free account](/register/) today.
