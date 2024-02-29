---
title: "Auto update"
description: "How to use auto-update with capacitor-updater"
sidebar:
  order: 3
---

It allows developers to use capacitor-updater with auto-update mode link to Capgo channel or equivalent.

### Prerequisite

The only, thing you need to do before using Capgo auto-update is using [https://semver.org/](https://semver.org/) for your app versioning.

This is the convention it used to manage versions. This convention should be used in 3 files in your project:

* `package.json` in **version**
* `android/app/build.gradle` in **versionName**
* `ios/App/App.xcodeproj/project.pbxproj` in **CURRENT\_PROJECT\_VERSION**

### Tutorial

Setup your app in 5 mins

[Update your capacitor apps seamlessly using capacitor updater](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

Setup your CI in 5 mins

[Automatic build and release with GitHub actions](https://capgo.app/blog/automatic-build-and-release-with-github-actions/)



### Install

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### Intro

Click on [register](https://capgo.app/) to create your account if you don't have one.

The server allows you to manage channels and versions and much more.

`autoUpdate` will use data from `capacitor.config` to identify into the Capgo server

> ℹ️ You can use Capgo Cloud without sending your code to our server. If that is not allowed by your company.

#### Validate version

When auto-update is set up you have to send a signal from JS that your app is alive

This can be done by calling within your app `notifyAppReady`.

Do it as soon as possible.

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

#### User flow

* When the User opens the app, it calls the server to check for updates, if found it is downloaded in the background.
* When the user leaves the app, the new version is set as active
* When the user opens again, he sees the new app
  * If `notifyAppReady()` is called, when the user leaves, the past version is deleted.
  * If not called, when the user leaves, the version is reset to past one and marked as invalid.
* User continues normal flow until the next update process.

#### Dev flow

When you develop new features, be sure to block `autoUpdate`, otherwise you will not see your work but the updates.
 Set `autoUpdate` to false in your config. 
 If you are stuck on an update, you can delete the app and reinstall it.
 Be sure to set `autoUpdate` to false in your config before doing that.
 And then build it again with Xcode or Android studio.

To upload the version at each commit setup CI/CD with this guide

[Automatic build and release with GitHub actions](https://capgo.app/blog/automatic-build-and-release-with-github-actions/)

#### Major Available event

When `disableAutoUpdateBreaking` is true, you can listen to the event to know when the app refuses to do a major braking update.

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.addListener('majorAvailable', (info: any) => {
  console.log('majorAvailable was fired', info.version)
})
```
