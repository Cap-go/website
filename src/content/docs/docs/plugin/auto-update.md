---
title: "Auto update"
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

[Update your capacitor apps seamlessly using capacitor updater](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

Setup your CI in 5 mins

[Automatic build and release with GitHub actions](https://capgo.app/blog/automatic-build-and-release-with-github-actions)



### Install

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### Intro

Click on [register](https://capgo.app) to create your account if you don't have one.

The server allows you to manage channel and versions and much more.

`autoUpdate` will use data from `capacitor.config` to identify into the Capgo server

> ℹ️ You can use Capgo Cloud without sending your code to our server. If that not allowed by your company.

#### Validate version

When auto-update is setup you have to send a signal from JS that your app is alive

This can be done by calling within your app `notifyAppReady`.

Do it as soon as possible.

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

#### User flow

* When User open app, it calls the server to check for update, if found it download in the background.
* When the user leaves the app, the new version is set as active
* When the user opens again, he sees the new app
  * If `notifyAppReady()` is called, when the user leaves, the past version is deleted.
  * If not called, when the user leaves, the version is reset to past one and marked as invalid.
* User Continue normal flow until the next update process.

#### Dev flow

When you develop new features, be sure to block `autoUpdate`, otherwise you will not see your work but the updates.
 Set `autoUpdate` to false in your config. 
 If you are stuck on an update, you can delete the app and reinstall it.
 Be sure to set `autoUpdate` to false in your config before doing that.
 And then build it again with Xcode or Android studio.

To upload version at each commit setup CI/CD with this guide

[Automatic build and release with GitHub actions](https://capgo.app/blog/automatic-build-and-release-with-github-actions)

#### Major Available event

When `disableAutoUpdateBreaking` is true, you can listen to event to know when the app refuses to do a major braking update.

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater';

CapacitorUpdater.addListener('majorAvailable', (info: any) => {
  console.log('majorAvailable was fired', info.version);
});
```

### Advanced settings

To have more control over auto-update system, I added 2 setting to allow you:

* `resetWhenUpdate` : When store update happens, disable force reset to the native version

You have also other config available only on the [web app](https://web.capgo.app/login)

To configure the plugin, use these settings:

```tsx
// capacitor.config.json
{
	"appId": "**.***.**",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"autoUpdate": true,
			"resetWhenUpdate": false
		}
	}
}
```

* `version` : Send this version to the server to identify your version at the first download. This setting disables the plugin to read the version in your native code.
```tsx
// capacitor.config.json
{
    "appId": "**.***.**",
    "appName": "Name",
    "plugins": {
        "CapacitorUpdater": {
            "version": "1.2.3"
        }
    }
}
```
