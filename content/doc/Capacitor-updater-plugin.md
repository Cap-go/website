---
slug: "Capacitor-updater-plugin"
title: "Capacitor Updater Plugin"
description: "Documentation for Capacitor Updater Plugin"

---
# Install

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

# Plugin usage

Download app update from URL and install it.

Then reload the view when user is away.

You can list the version and manage it with the command below.

```tsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'

let data = { version: '' }
App.addListener('appStateChange', async (state) => {
  if (state.isActive) {
    // Do the download during user active app time to prevent failed download
    data = await CapacitorUpdater.download({
      url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.2/dist.zip',
    })
  }
  if (!state.isActive && data.version !== '') {
    // Do the switch when user leave app
    SplashScreen.show()
    try {
      await CapacitorUpdater.set(data)
    }
    catch (err) {
      console.log(err)
      SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
    }
  }
})

// or do it when click on button
const updateNow = async () => {
  const version = await CapacitorUpdater.download({
    url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.2/dist.zip',
  })
  // show the splashscreen to let the update happen
  SplashScreen.show()
  await CapacitorUpdater.set(version)
  SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
}
```

> ⚠️ *Be extra careful when you update manually.* If you send a broken update, the app will crash until the user uninstall it.
To fix that, use auto-update.

 
> ⛔ The Live Update feature only works on HTML, CSS, JS changes, if you update native code, you must resubmit to the app store.


# **API**

- [Install](#install)
- [Plugin usage](#plugin-usage)
- [**API**](#api)
- [download(...)](#download)
- [set(...)](#set)
- [getId()](#getid)
- [delete(...)](#delete)
- [list()](#list)
- [reset(...)](#reset)
- [current()](#current)
- [reload()](#reload)
- [versionName()](#versionname)
- [notifyAppReady()](#notifyappready)
- [delayUpdate()](#delayupdate)
- [cancelDelay()](#canceldelay)
- [addListener('download', ...)](#addlistenerdownload-)
- [addListener('majorAvailable', ...)](#addlistenermajoravailable-)
- [addListener('updateAvailable', ...)](#addlistenerupdateavailable-)
- [addListener(string, ...)](#addlistenerstring-)
- [removeAllListeners()](#removealllisteners)
- [Interfaces](#interfaces)
- [PluginListenerHandle](#pluginlistenerhandle)
- [DownloadEvent](#downloadevent)
- [MajorAvailableEvent](#majoravailableevent)
- [UpdateAvailableEvent](#updateavailableevent)
- [Type Aliases](#type-aliases)
- [DownloadChangeListener](#downloadchangelistener)
- [MajorAvailableListener](#majoravailablelistener)
- [UpdateAvailableListener](#updateavailablelistener)
- [Package](#package)
- [Download events](#download-events)
- [Listen to download events](#listen-to-download-events)
- [Angular specific](#angular-specific)
- [Dev flow](#dev-flow)
- [Settings](#settings)
- [Auto-updates](#auto-updates)
- [Statistics](#statistics)
- [Demo app for manual update](#demo-app-for-manual-update)

# download(...)

```typescript
download(options: { url: string; }) => Promise<{ version: string; }>
```

Download a new version from the provided URL, it should be a zip file, with files inside or with a unique folder inside with all your files

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | <code>{ url: string; }</code> |

**Returns:** <code>Promise&lt;{ version: string; }&gt;</code>

--------------------


# set(...)

```typescript
set(options: { version: string; versionName?: string; }) => Promise<void>
```

Set version as current version, set will return an error if there are is no index.html file inside the version folder. `versionName` is optional, and it's a custom value that will be saved for you

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code>{ version: string; versionName?: string; }</code> |

--------------------


# getId()

```typescript
getId() => Promise<{ id: string; }>
```

Get unique ID used to identify device into auto update server

**Returns:** <code>Promise&lt;{ id: string; }&gt;</code>

--------------------


# delete(...)

```typescript
delete(options: { version: string; }) => Promise<void>
```

Delete version in storage

| Param         | Type                              |
| ------------- | --------------------------------- |
| **`options`** | <code>{ version: string; }</code> |

--------------------


# list()

```typescript
list() => Promise<{ versions: string[]; }>
```

Get all available versions

**Returns:** <code>Promise&lt;{ versions: string[]; }&gt;</code>

--------------------


# reset(...)

```typescript
reset(options?: { toAutoUpdate?: boolean | undefined; } | undefined) => Promise<void>
```

Set the `builtin` version (the one sent to Apple store / Google play store ) as current version

| Param         | Type                                     |
| ------------- | ---------------------------------------- |
| **`options`** | <code>{ toAutoUpdate?: boolean; }</code> |

--------------------


# current()

```typescript
current() => Promise<{ current: string; currentNative: string; }>
```

Get the current version, if none are set it returns `builtin`, currentNative is the original version install on the device

**Returns:** <code>Promise&lt;{ current: string; currentNative: string; }&gt;</code>

--------------------


# reload()

```typescript
reload() => Promise<void>
```

Reload the view

--------------------


# versionName()

```typescript
versionName() => Promise<{ versionName: string; }>
```

Get the version name, if it was set during the set phase

**Returns:** <code>Promise&lt;{ versionName: string; }&gt;</code>

--------------------


# notifyAppReady()

```typescript
notifyAppReady() => Promise<void>
```

Notify native plugin that the update is working, only in auto-update

--------------------


# delayUpdate()

```typescript
delayUpdate() => Promise<void>
```

Skip updates in the next time the app goes into the background, only in auto-update

--------------------


# cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

allow update in the next time the app goes into the background, only in auto-update

--------------------


# addListener('download', ...)

```typescript
addListener(eventName: 'download', listenerFunc: DownloadChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listen for download event in the App, let you know when the download is started, loading and finished

| Param              | Type                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| **`eventName`**    | <code>'download'</code>                                                   |
| **`listenerFunc`** | <code><a href="#downloadchangelistener">DownloadChangeListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 2.0.11

--------------------


# addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: MajorAvailableListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listen for Major update event in the App, let you know when major update is blocked by setting disableAutoUpdateBreaking

| Param              | Type                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                             |
| **`listenerFunc`** | <code><a href="#majoravailablelistener">MajorAvailableListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 2.3.0

--------------------


# addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: UpdateAvailableListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listen for update event in the App, let you know when update is ready to install at next app start

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                              |
| **`listenerFunc`** | <code><a href="#updateavailablelistener">UpdateAvailableListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 2.3.0

--------------------


# addListener(string, ...)

```typescript
addListener(eventName: string, listenerFunc: (...args: any[]) => any) => Promise<PluginListenerHandle>
```

| Param              | Type                                    |
| ------------------ | --------------------------------------- |
| **`eventName`**    | <code>string</code>                     |
| **`listenerFunc`** | <code>(...args: any[]) =&gt; any</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


# removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

--------------------


# Interfaces


# PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


# DownloadEvent

| Prop          | Type                | Description                                    | Since  |
| ------------- | ------------------- | ---------------------------------------------- | ------ |
| **`percent`** | <code>number</code> | Current status of download, between 0 and 100. | 2.0.11 |


# MajorAvailableEvent

| Prop          | Type                | Description                                 | Since |
| ------------- | ------------------- | ------------------------------------------- | ----- |
| **`version`** | <code>string</code> | Emit when a new major version is available. | 2.3.0 |


# UpdateAvailableEvent

| Prop          | Type                | Description                          | Since |
| ------------- | ------------------- | ------------------------------------ | ----- |
| **`version`** | <code>string</code> | Emit when a new update is available. | 3.0.0 |


# Type Aliases


# DownloadChangeListener

<code>(state: <a href="#downloadevent">DownloadEvent</a>): void</code>


# MajorAvailableListener

<code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>): void</code>


# UpdateAvailableListener

<code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>): void</code>
# Package

Whatever you choose to name the file you download from your release/update server URL, the zip file should contain the full contents of your production Capacitor build output folder, usually ``{project directory}/dist/`` or ``{project directory}/www/``. 

This is where `index.html` will be located, and it should also contain all bundled JavaScript, CSS, and web resources necessary for your app to run.

Do not password encrypt this file, or it will fail to unpack.

# Download events

# Listen to download events

```javascript
  import { CapacitorUpdater } from '@capgo/capacitor-updater';

CapacitorUpdater.addListener('download', (info: any) => {
  console.log('download was fired', info.percent);
});
```

On iOS, Apple don't allow you to show a message when the app is updated, so you can't show a progress bar.

# Angular specific

You need to use ngZone to let the event be detected in angular

```jsx
public updatingDownloadProgress: number = 0;
constructor(
  ...
  private ngZone: NgZone
  ...) {
	CapacitorUpdater.addListener("download", (state: DownloadEvent) => {
	      this.ngZone.run(() => {
	        this.updatingDownloadProgress = state.percent; 
	      });
	    });
}
```

# Dev flow

When you develop, be sure to remove the app from the device. Otherwise, you will not see your change.
Otherwise, you will stay stuck on the downloaded code.

> I’m looking for a better solution, detect we are in dev is difficult and know when reset or not
> 

# Settings

After install capacitor-updater to your project, you can configure some behavior:
- resetWhenUpdate set it false to disable the reset version when update
```
{
	"appId": "**.***.**",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"resetWhenUpdate": false
		}
	}
}
```

# Auto-updates

This is a different section in the doc, click here to access:

[Auto-updates](https://doc.capgo.app/Auto-update-2cf9edda70484d7fa57111ab9c435d08)

# Statistics

Starting from version 1.3.0 the update system send stats!

By default, all stats are sent to our server, to understand usage.

> 💡 No private data are sent for stats, only random UUID, version update, version native app, platform, action, and app ID.

If you want to send data to your server instead, change the config below:

```tsx
// capacitor.config.json
{
	"appId": "**.***.**",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"statsUrl": "YOUR_URL"
		}
	}
}
```

What your server will receive is :

```tsx
{
	"app_id": "**.***.**", // app identifier in the store
	"device_id": "*******", // unique id per app install
	"platform": "ios", // or android
	"action": "set", // can be set, delete, set_fail, reset, revert
        "version_name": "1.2.3", // version of the web build
        "version_build": "1.2.0", // version of the native build
}
```

You can also totally disable it, with empty string.
Keep in mind, statistic are made private friendly and help me to understand how people use the plugin, to resolve issue and improve it.

# Demo app for manual update


https://user-images.githubusercontent.com/4084527/163661164-c0f7c441-ecdd-42b5-89f1-46656ff18f8c.mp4



[GitHub - Cap-go/demo-app: demo app with manual and auto mode](https://github.com/Cap-go/demo-app)