---
slug: "update-your-capacitor-apps-seamlessly-using-capacitor-updater"
title: Update your Capacitor apps seamlessly using Capacitor-updater
description: Greetings Capacitor Ionic Community, today I'll be helping you setup Capacitor-updater
  into your app. So that you can do seamless releases.
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2022-02-27
updated_at: 2022-02-27
head_image: "/update_flow.webp"
head_image_alt: Capacitor Dev looking for alternative
tag: Tutorial
published: true
next_blog: ""

---

## What is Capacitor-updater?

Capacitor-updater, a technology that helps in the delivery of app updates and improvements to the end users instantly.

This is especially great if you want to do critical bug fixes and deliver instantly without going through the App Store reviews.

You can think of it as "web-like" agility of side-loading updates as soon as they are available.

Moreover, it provides rollbacks if the new update crashed the app

## How does it work?

Capgo keeps your app's JavaScript bundle in sync with the Capgo server, and every time the user opens the app it checks with the Capgo server if a new update is available to the bundle. And of course, it comes with tons of awesome configuration which can help you fine-tune your user's experience.

I use Capgo in all my projects I build that allow me to put less time in the App Store review process.

You can read more about it [here](https://capgo.app).

## Are there any limitations?

As good as it may sound, there are a few things that we need to keep in mind.
The first thing is that OTA updates __only work with web bundles__. 
You may think that this isn’t really a big limitation because, in Capacitor JS, we write almost all code in JS CSS and HTML.
While this may be true, there still are native modules that we install to our app.
If a module changes your android or iOS directories, you can’t use OTA to update your app.
That’s because these directories’ contents are used to compile Native binaries, which OTA can’t update.
Even native app cannot update this part.

But you can set up your CI/CD to handle this part, I made a tutorial on how to do it [here for IOS](https://capgo.app/blog/automatic-capacitor-ios-build-github-action/), and [here for Android](https://capgo.app/blog/automatic-capacitor-android-build-github-action/).

## Let's get started 🚀

### Capgo Configuration

It’s time to sign up, and get your API key to upload your first version! Begin by [signing up for a Capgo account](https://web.capgo.app/register/).

Once you’re logged into Capgo, You will have onboarding page 

![Onboarding page](/onboarding_1.webp)

Follow the steps in the onboarding page to add your first app.


### Install the Capgo SDK

From a command line, directly into the root of your Capacitor app run:

`npm i @capgo/capacitor-updater && npx cap sync`
To install the plugin into your Capacitor app.

And then add to your app this code as replacement of CodePush one:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

This will tell the native plugin the installation as succeeded.

### Login to Capgo CLOUD

First, use the `all` [apikey](https://web.capgo.app/dashboard/apikeys) present in your account to log in with the CLI:

`npx @capgo/cli@latest login YOU_KEY`

## Add your first app

Let's get started by first creating an app in Capgo Cloud with the CLI.

`npx @capgo/cli@latest add`

This command will use all variable defined in the Capacitor config file to create the app.

## Upload your first version

Run the command to build your code and send it to Capgo with:
`npx @capgo/cli@latest upload`

By default, the version name will be the one in your `package.json` file.

Check in [Capgo](https://web.capgo.app) if the build is present.

You can even test it with my [mobile sandbox app](https://capgo.app/app_mobile).

### Make channel default

After you have sent your app to Capgo, you need to make your channel `default` to let apps receive updates from Capgo.

`npx @capgo/cli@latest set -c production -s default`

## Configure app to validate updates

Add this config to your main JavaScript file.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
CapacitorUpdater.notifyAppReady()
```

Then do a `npm run build && npx cap copy` to update your app.

## Receive a Live Update on a Device

For your application to receive a live update from Deploy, you'll need to run the app on a device or an emulator. The easiest way to do this is simply to use the following command to launch your local app in an emulator or a device connected to your computer.

    npc cap run [ios | android]

Open the app, put it in background and open it again, you should see in the logs the app did the update.

Congrats! 🎉 You have successfully deployed your first Live Update. This is just the start of what you can do with Live Updates. To learn more, view the complete [Live Updates docs](https://docs.capgo.app/plugin/auto-update/).