---
slug: create-react-mobile-apps-with-capacitor
title: Building Mobile Apps with React and Capacitor
description: >-
  Learn how to build a mobile app using React, Capacitor, and enhance the native
  UI with Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React and Capacitor illustration
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In this tutorial, we'll begin with a new [React](https://reactjs.org/) app and transition to native mobile development using Capacitor. Optionally, you can also add [Konsta UI](https://konstaui.com/) for an improved mobile UI with Tailwind CSS.

Capacitor allows you to easily convert your React web application into a native mobile app without significant modifications or learning a new skill like React Native.

With just a few simple steps, most React applications can be transformed into mobile apps.

This tutorial will guide you through the process, starting with a new React app and then incorporating Capacitor to move into the realm of native mobile apps. Additionally, you can optionally use [Konsta UI](https://konstaui.com/) to enhance your mobile UI with Tailwind CSS.

## About Capacitor

CapacitorJS is a game-changer! You can effortlessly incorporate it into any web project, and it will wrap your application into a native webview, generating the native Xcode and Android Studio project for you. Plus, its plugins provide access to native device features like the camera via a JS bridge.

With Capacitor, you get a fantastic native mobile app without any complicated setup or steep learning curve. Its slim API and streamlined functionality make it a breeze to integrate into your project. Trust me, you'll be amazed at how effortless it is to achieve a fully functional native app with Capacitor!

## Preparing Your React App

While there are various methods to initiate React applications, let's go for the simplest one in this tutorial that provides a blank React application:

```shell
npx create-react-app my-app
```

In order to create a native mobile app, we require an **export** of our project. Thus, let's include a straightforward script in our **package.json** that can be utilized to build and export the React project:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

You can now run `npm run build` without any worries, and you should be able to spot a fresh out folder at your project's root.

This folder will be used by Capacitor later on, but for now, we must set it up correctly.

## Adding Capacitor to Your React App

To package any web app into a native mobile container, we must follow a few initial steps, but afterward it's as simple as executing a single `sync` command.

Firstly, we can install the [Capacitor CLI](https://capacitorjs.com/docs/cli/) as a development dependency, and then set it up within our project. During the setup, you can press “enter” to accept the default values for name and bundle ID.

Next, we need to install the core package and the relevant packages for the iOS and Android platforms.

Finally, we can add the platforms, and Capacitor will create folders for each platform at the root of our project:

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

By this point, you should be able to observe new **ios** and **android** folders in your React project.

**Those are real native projects!**

To access the Android project later, you must install [Android Studio](https://developer.android.com/studio/). For iOS, you need a Mac and should install [Xcode](https://developer.apple.com/xcode/).

Additionally, you should find a **capacitor.config.ts** file in your project, which contains some fundamental Capacitor settings utilized during the sync. The only thing you need to pay attention to is the **webDir**, which must point to the result of your build command. Currently, it is inaccurate.

To rectify this, open the **capacitor.config.json** file and update the **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

You can try it out by executing the following commands:

```shell
npm run build
npx cap sync
```

The first command `npm run build` will simply build your React project and export the static build.

While the second command `npx cap sync` will sync all the web code into the right places of the native platforms so they can be displayed in an app.

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

Congratulations! You have successfully deployed your React web app to a mobile device. Here's an example:

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
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
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Be sure to use **the correct IP and port**, I have used the default React port in this example.

Now, we can apply these changes by copying them over to our native project:

```shell
npx cap copy
```

The `copy` command is similar to `sync`, but it will only **copy over the changes made to the web folder** and configuration, without updating the native project.

You can now deploy your app one more time through Android Studio or Xcode. After that, if you change something in your React app, **the app will automatically reload** and show the changes!

**Keep in mind** that if you install new plugins such as the camera, it still requires a rebuild of your native project. This is because native files are changed, and it can't be done on the fly.

Note that you should use the correct IP and port in your configuration. The code block above shows the default React port for demonstration purposes.

## Using Capacitor Plugins

Let's take a look at how to use a Capacitor plugin in action, which we've mentioned a few times before. To do this, we can install a fairly simple plugin by running:

```shell
npm i @capacitor/share
```

There’s nothing fancy about the [Share plugin](https://capacitorjs.com/docs/apis/share/), but it anyway brings up the native share dialog! Forthis, we now only need to import the package and call the `share()` function from our app. Let's change the **src/App.js** to this:

```javascript
import React from 'react';
import { Share } from '@capacitor/share';

function App() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  };

  return (
    <div>
      <h1>Welcome to React and Capacitor!</h1>
      <p>
        <h2>Cool channel</h2>
        <button onClick={() => share()}>Share now!</button>
      </p>
    </div>
  );
}

export default App;
```

As mentioned earlier, when installing new plugins, we need to perform a sync operation and then redeploy the app to our device. To do this, run the following command:

```
npx cap sync
```

After hitting the button, you can witness the beautiful native share dialog in action!

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-capacitor-share">
</div>

To make the button look more mobile-friendly, we can add some styling using my favorite UI component library for web apps - React (no pun intended).

## Adding Konsta UI

I’ve worked years with [Ionic](https://ionicframework.com/) to build awesome cross-platform applications, and it was one of the best choices for years. But now I don't recommend it anymore; it's very hacky to integrate it with React, and it's not really worth it when you have already [tailwindcss](https://tailwindcss.com/).

If you want a great-looking mobile UI that adapts to iOS and Android specific styling, I recommend Konsta UI.

You need to have [tailwind already install](https://tailwindcss.com/docs/guides/vite/#react) 

To use it, we only need to install the package react package:

```shell
npm i konsta
```

Additionally, you need to modify your `tailwind.config.js` file:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/**/*.{js,ts,javascript,tsx}',
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

`konstaConfig` will extend the default (or your custom one) Tailwind CSS config with some extra variants and helper utilities required for Konsta UI.

Now we need to set up the main [App](https://konstaui.com/react/app/) component so we can set some global parameters (like `theme`).

We need to wrap the whole app with `App` in the `src/App.js`:

```javascript
import { App } from 'konsta/react';
import './App.css';

function MyApp({ Component, pageProps }) {
  return (
    // Wrap our app with App component
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```

### Example Page

Now when everything is set up, we can use Konsta UI React components in our React app.

For example, let's open `src/App.js` and change it to the following:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/react';

function App() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your React & Konsta UI app. Let's see what we have here.
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

export default App;
```

If the live reload is out of sync after installing all the necessary components, try restarting everything. Once you have done that, you should see a mobile app with a somewhat native look, built with React and Capacitor!

You should see the following page as a result:

<div class="mx-auto" style="width: 50%;">
  <img src="/konsta-next.webp" alt="konsta-react">
</div>

## Conclusion

Capacitor is an excellent option for building native applications based on an existing web project, offering a simple way to share code and maintain a consistent UI.

And with the addition of [Capgo](https://capgo.app/), it's even easier to add live updates to your app, ensuring that your users always have access to the latest features and bug fixes.

If you would like to learn how to add Capgo to your React app, take a look at the next article:
