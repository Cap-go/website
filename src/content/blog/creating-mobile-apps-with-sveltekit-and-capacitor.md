---

slug: "creating-mobile-apps-with-sveltekit-and-capacitor"
title: Building Mobile Apps with SvelteKit and Capacitor
description: Learn how to build a mobile app using SvelteKit, Capacitor, and enhance the native UI with Konsta UI.
author: Martin Donadieu
author_url: https://x.com/martindonadieu
created_at: 2023-06-04
updated_at: 2023-06-04
head_image: "/sveltekit_capacitor.webp"
head_image_alt: SvelteKit and Capgo illustration
tag: Tutorial
published: true
next_blog: "updating-your-capacitor-apps-seamlessly-with-capacitor-updater"

---

In this tutorial, we'll begin with a new [SvelteKit](https://kit.svelte.dev/) app and transition to native mobile development using Capacitor. Optionally, you can also integrate [Konsta UI](https://konstaui.com/) for an enhanced Tailwind CSS mobile UI.

Capacitor allows you to easily convert your SvelteKit web application into a native mobile app without the need for significant modifications or learning a new skill like React Native.

Follow this step-by-step guide to transform your SvelteKit app into a mobile app using Capacitor and, if desired, enhance your mobile UI with Konsta UI.

## About Capacitor

CapacitorJS is a game-changer! It can be effortlessly integrated into any web project, wrapping your application in a native webview and generating native Xcode and Android Studio projects for you. Its plugins provide access to native device features like the camera via a JavaScript bridge.

Capacitor enables you to create a fantastic native mobile app without any complicated setup or steep learning curve. Its slim API and streamlined functionality make it easy to integrate into your project. You'll be amazed at how simple it is to achieve a fully functional native app with Capacitor!

## Preparing Your SvelteKit App

To create a new SvelteKit app, run the following command:

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

After running the `build` command, you should see a new `dist` folder at the root of your project.

This folder will be used by Capacitor later, but for now, we need to set it up correctly.

## Adding Capacitor to Your SvelteKit App

To package any web app into a native mobile container, we need to follow a few initial steps. Afterward, it's as simple as running a single `sync` command.

First, install the [Capacitor CLI](https://capacitorjs.com/docs/cli/) as a development dependency and set it up within your project. During the setup, you can press "enter" to accept the default values for name and bundle ID.

Next, install the core package and the relevant packages for the iOS and Android platforms.

Finally, add the platforms, and Capacitor will create folders for each platform at the root of your project:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your SvelteKit project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

At this point, you should see new **ios** and **android** folders in your SvelteKit project.

**These are real native projects!**

To access the Android project later, you need to install [Android Studio](https://developer.android.com/studio/). For iOS, you need a Mac and should install [Xcode](https://developer.apple.com/xcode/).

Additionally, you should find a **capacitor.config.ts** file in your project, which contains some basic Capacitor settings used during the sync. The only thing you need to pay attention to is the **webDir**, which must point to the result of your build command. Currently, it is incorrect.

To fix this, open the **capacitor.config.ts** file and update the **webDir**:

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```
ow that we’ve updated our Capacitor settings, let’s change out Sveltekit project to a static application by downloading the proper static adapter package:

```shell
npm i -D @sveltejs/adapter-static
```

After the package is installed, we’ll need to alter _svelte.config.js_ file from the auto-adapter to static:

```ts
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    })
  }
}

export default config
```

With the _svelte.config.js_ updated, we’ll need to add a _prerender_ option by creating a _+layout.js_ page to _src/routes_ and just add the following export to _+layout.js_:

```ts
export const prerender = true
```

After adding and updating the _+layout.js_ page, we’ll need to add our mobile platforms, re-build our project to create the _build_ folder

You can do it by running the following commands:

```shell
npm run build
npx cap sync
```

The first command `npm run build` will build your SvelteKit project and copy the static build, while the second command `npx cap sync` will sync all the web code into the right places of the native platforms so they can be displayed in an app.

Additionally, the sync command might update the native platforms and install plugins, so when you install new [Capacitor plugins](https://capacitorjs.com/docs/plugins/), it's time to run `npx cap sync` again.

Without realizing it, you've now completed the process, so let's see the app on a device!

## Build and Deploy Native Apps

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

Congratulations! You have successfully deployed your SvelteKit web app to a mobile device. Here's an example:

<div class="mx-auto" style="width: 50%;">
  <img src="/sveltekit-mobile-app.webp" alt="sveltekit-mobile-app">
</div>

But wait, there's also a faster way to do this during development...

## Capacitor Live Reload

By now, you're probably used to having hot reload with all modern frameworks, and the good news is that you can have the same functionality **on a mobile device** with minimal effort!

Enable access to your locally hosted application with live reload **on your network** by having the Capacitor app load the content from the specific URL.

The first step is to figure out your local IP address. If you're using a Mac, you can find this out by running the following command in the terminal:

```shell
ipconfig getifaddr en0
```

On Windows, run:

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
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Be sure to use **the correct IP and port**, as shown in the example above.

Now, we can apply these changes by copying them over to our native project:

```shell
npx cap copy
```

The `copy` command is similar to `sync`, but it will only **copy over the changes made to the web folder** and configuration, without updating the native project.

You can now deploy your app one more time through Android Studio or Xcode. After that, if you change something in your Svelte app, **the app will automatically reload** and show the changes!

**Keep in mind** that if you install new plugins such as the camera, it still requires a rebuild of your native project. This is because native files are changed, and it can't be done on the fly.

Note that you should use the correct IP and port in your configuration. The code block above shows the default SvelteKit port for demonstration purposes.

## Using Capacitor Plugins

Let's take a look at how to use a Capacitor plugin in action, which we've mentioned a few times before. To do this, we can install a simple plugin by running:

```shell
npm i @capacitor/share
```

There’s nothing fancy about the [Share plugin](https://capacitorjs.com/docs/apis/share/), but it brings up the native share dialog! For this, we now only need to import the package and call the `share()` function from our app, so let’s change the **src/routes/index.svelte** to this:

```html
<script>
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

<h1>Welcome to SvelteKit and Capacitor!</h1>
<button on:click={share}>Share now!</button>
```

As mentioned earlier, when installing new plugins, we need to perform a sync operation and then redeploy the app to our device. To do this, run the following command:

```
npx cap sync
```

After hitting the button, you can witness the beautiful native share dialog in action!

## Adding Konsta UI

To use Konsta UI in your Nuxt 3 app, you need to have [tailwind already install](https://tailwindcss.com/docs/guides/sveltekit/) and to install the package:

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
    './src/routes/**/*.{svelte}',
    './src/components/**/*.{svelte}',
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

Now we need to set up the main [App](https://konstaui.com/vue/app/) component so we can set some global parameters (like `theme`).

We need to wrap the whole app with `App` in the `src/routes/+layout.svelte`:

```html
<script>
  import { App } from 'konsta/svelte';
</script>

<App theme="ios">
  <slot />
</App>
```

### Example Page

Now when everything is set up, we can use Konsta UI Svelte components in our SvelteKit pages.

For example, let's open `src/routes/index.svelte` and change it to the following:

```html
<script>
  import {
    Page,
    Navbar,
    Block,
    Button,
    List,
    ListItem,
    Link,
    BlockTitle,
  } from 'konsta/svelte';
</script>

<Page>
  <Navbar title="My App" />

  <Block strong>
    <p>
      Here is your SvelteKit & Konsta UI app. Let's see what we have here.
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
```

If the live reload is out of sync after installing all the necessary components, try restarting everything. Once you have done that, you should see a mobile app with a somewhat native look, built with SvelteKit and Capacitor!

You should see the following page as a result:

<div class="mx-auto" style="width: 50%;">
  <img src="/konsta-sveltekit.webp" alt="konsta-sveltekit">
</div>

## Conclusion

Capacitor is an excellent option for building native applications based on an existing web project, offering a simple way to share code and maintain a consistent UI.

And with the addition of [Capgo](https://capgo.app/), it's even easier to add live updates to your app, ensuring that your users always have access to the latest features and bug fixes.

If you would like to learn how to add Capgo to your SvelteKit app, take a look at the next article:

Learn how Capgo can help you build better apps faster, [sign up for a free account](/register/) today.
