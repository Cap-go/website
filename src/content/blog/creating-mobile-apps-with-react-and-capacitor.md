---
slug: "creating-mobile-apps-with-react-and-capacitor"
title: 'Building Mobile Apps with Pure React.js and Capacitor'
description: 'A guide on how to transform a React.js web application into a native mobile app utilizing Capacitor, and enhancing the native UI with Konsta UI.'
author: Martin Donadieu
author_url: https://x.com/martindonadieu
created_at: 2023-06-29
updated_at: 2023-06-29
head_image: "/react_capacitor.webp"
head_image_alt: React.js and Capacitor illustration
tag: Tutorial
published: true
locale: en
next_blog: "implementing-live-updates-in-your-react-capacitor-app"

---

This tutorial will walk you through crafting a mobile application using React, Capacitor, and Konsta UI. By the end, you’ll know how to morph a React.js web app into a native mobile application with Capacitor, and implement a native UI using Konsta UI.

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

## Implementing Konsta UI: Better-looking Mobile UI

For a better-looking mobile UI experience, we'll use Konsta UI. It provides iOS and Android-specific styling, and it's easy to work with.

To use Konsta UI, install the React package:

```shell
npm i konsta
```

Modify your `tailwind.config.js` file like so:

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

`konstaConfig` will supplement your current Tailwind CSS config with additional variants and utilities necessary for Konsta UI.

Now, set up the primary App component to set global parameters like `theme`. Wrap the main app with App in the `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from 'konsta/react';
import './index.css';
import MyApp from './App';

ReactDOM.render(
  <React.StrictMode>
    <App theme="ios">
      <MyApp />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Let's use Konsta UI React components in our React.js pages. Open `src/App.js` and modify it to:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
} from 'konsta/react';

export default function MyApp() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Welcome to your React & Konsta UI app.
        </p>
      </Block>
      
      <List>
        <ListItem href="/about" title="About" />
      </List>

      <Block strong>
        <Button>Click Me</Button>
      </Block>
    </Page>
  );
}
```

If everything has been done right, you should see effortless integration between React and Konsta UI to give your mobile app a native look.

## Conclusion

Capacitor offers a seamless means of building native apps based on an existing web project, providing a simple way to share code and have consistent UI.

Thanks to technologies like Capacitor, building mobile applications from React.js web apps has never been easier. Take your web development skills to the next level by crafting impressive native mobile apps. Happy coding!

For more about how you can fast-track your app development process, [sign up for a free account](/register/) today.
