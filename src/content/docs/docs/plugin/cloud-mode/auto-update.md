---
title: "Auto update"
description: "How to use auto-update with capacitor-updater"
sidebar:
  order: 2
---

This mode allows developers to use capacitor-updater with auto-update mode and push updates via Capgo channels or equivalent.

### Prerequisites

Make sure your app version uses [https://semver.org/](https://semver.org/) before using Capgo auto-update.

This is the convention it uses to manage versions in Capgo.

There are two ways to set the version in your app:

New way: Use the `version` field in your `capacitor.config.json` file.

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // Enable auto-update, true by default
      "appId": "com.example.app", // Used to identify the app in the server
      "version": "1.0.0" // Used to check for updates
    }
  }
}
```
This will option in `CapacitorUpdater` will be used by the plugin to check for updates, and the CLI to upload the version.

Old way:
In 3 files in your project:

* `package.json` in **version**
* `android/app/build.gradle` in **versionName**
* `ios/App/App.xcodeproj/project.pbxproj` in **CURRENT\_PROJECT\_VERSION**

### Tutorials

Setup your app in 5 mins

[Update your capacitor apps seamlessly using capacitor updater](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

Setup your CI in 5 mins

[Automatic build and release with GitHub actions](https://capgo.app/blog/automatic-build-and-release-with-github-actions)



### Install

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### Intro

Click on [register](https://capgo.app) to create your account.

The server allows you to manage channels and versions and much more.

`autoUpdate` will use data from `capacitor.config` to identify the Capgo server

:::note
You can still use Capgo Cloud without sending your code to our server. If that is not allowed by your company.
:::

#### Validate version

When auto-update is set up you have to notify from within JS that your app is alive and ready.

This can be done by calling within your app `notifyAppReady`.

Do it as soon as possible.

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

#### User flow
* User opens the app, the app calls the server to check for updates, if any are found they'll be downloaded in the background.
* User leaves the app, the new version is set as active.
* User opens app again, we load the new active version and set it as default.
* If `notifyAppReady()` is called, when the user leaves the app, the past version is deleted.
* User continues normal flow of the app until next update cycle.

:::danger
⚠️ Not calling `notifyAppReady()` in your app, will make the current version marked as invalid and will revert to the previous valid bundle or stock.
:::

#### Dev flow

When you develop new features, be sure to block `autoUpdate`, as capgo will constatly overwrite your work with the latest update bundle.
Set `autoUpdate` to false in your config. 
If for some reason you are stuck on an update, you can delete the app and reinstall it.
Be sure to set `autoUpdate` to false in your config before doing so.
And then build it again with Xcode or Android studio.

To upload the version at each commit setup CI/CD with this guide

[Automatic build and release with GitHub actions](https://capgo.app/blog/automatic-build-and-release-with-github-actions)

#### Major Available event

When `disableAutoUpdateBreaking` is set to true, you can listen to the event to know when the app refuses to do a major braking update.

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.addListener('majorAvailable', (info: any) => {
  console.log('majorAvailable was fired', info.version)
})
```
