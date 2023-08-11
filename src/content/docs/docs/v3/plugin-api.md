---
title: "Plugin API"
sidebar:
  order: 1
---

## API

### download(...)

```typescript
download(options: { url: string; }) => Promise<{ version: string; }>
```

Download a new version from the provided URL, it should be a zip file, with files inside or with a unique folder inside with all your files

| Param         | Type               |
| ------------- | ------------------ |
| **`options`** | `{ url: string; }` |

**Returns:** `Promise<{ version: string; }>`

***

### set(...)

```typescript
set(options: { version: string; versionName?: string; }) => Promise<void>
```

Set version as current version, set will return an error if there are is no index.html file inside the version folder. `versionName` is optional, and it's a custom value that will be saved for you.

| Param         | Type                                         |
| ------------- | -------------------------------------------- |
| **`options`** | `{ version: string; versionName?: string; }` |

***

### getId()

```typescript
getId() => Promise<{ id: string; }>
```

Get unique ID used to identify device into auto-update server

**Returns:** `Promise<{ id: string; }>`

***

#### delete(...)

```typescript
delete(options: { version: string; }) => Promise<void>
```

Delete version in storage

| Param         | Type                   |
| ------------- | ---------------------- |
| **`options`** | `{ version: string; }` |

***

### list()

```typescript
list() => Promise<{ versions: string[]; }>
```

Get all available versions

**Returns:** `Promise<{ versions: string[]; }>`

***

### reset(...)

```typescript
reset(options?: { toAutoUpdate?: boolean | undefined; } | undefined) => Promise<void>
```

Set the `builtin` version (the one sent to Apple Store / Google Play Store ) as the current version

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | `{ toAutoUpdate?: boolean; }` |

***

### current()

```typescript
current() => Promise<{ current: string; currentNative: string; }>
```

Get the current version, if none is set it returns `builtin`, `currentNative` is the original version install on the device

**Returns:** `Promise<{ current: string; currentNative: string; }>`

***

### reload()

```typescript
reload() => Promise<void>
```

Reload the view

***

### versionName()

```typescript
versionName() => Promise<{ versionName: string; }>
```

Get the version name, if it was set during the set phase

**Returns:** `Promise<{ versionName: string; }>`

***

### notifyAppReady()

```typescript
notifyAppReady() => Promise<void>
```

Notify native plugin that the update is working, only in auto-update

***

### delayUpdate()

```typescript
delayUpdate() => Promise<void>
```

Skip updates in the next time the app goes into the background, only in auto-update

***

### cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

allow update in the next time the app goes into the background, only in auto-update

## Events

#### Listen to download events

```javascript
  import { CapacitorUpdater } from '@capgo/capacitor-updater';

CapacitorUpdater.addListener('download', (info: any) => {
  console.log('download was fired', info.percent);
});
```

On iOS, Apple doesn't allow you to show a message when the app is updated, so you can't show a progress bar.

### Angular specific

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

### addListener('download', ...)

```typescript
addListener(eventName: 'download', listenerFunc: DownloadChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listen for download event in the App, let you know when the download is started, loading and finished

| Param              | Type                     |
| ------------------ | ------------------------ |
| **`eventName`**    | `'download'`             |
| **`listenerFunc`** | `DownloadChangeListener` |

**Returns:** `Promise<PluginListenerHandle> & PluginListenerHandle`

**Since:** 2.0.11

***

### addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: MajorAvailableListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listen for Major update events in the App, let you know when a major update is blocked by setting `disableAutoUpdateBreaking`

| Param              | Type                     |
| ------------------ | ------------------------ |
| **`eventName`**    | `'majorAvailable'`       |
| **`listenerFunc`** | `MajorAvailableListener` |

**Returns:** `Promise<PluginListenerHandle> & PluginListenerHandle`

**Since:** 2.3.0

***

### addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: UpdateAvailableListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listen for update event in the App, let you know when the update is ready to install at next app start

| Param              | Type                      |
| ------------------ | ------------------------- |
| **`eventName`**    | `'updateAvailable'`       |
| **`listenerFunc`** | `UpdateAvailableListener` |

**Returns:** `Promise<PluginListenerHandle> & PluginListenerHandle`

**Since:** 2.3.0

***

### addListener(string, ...)

```typescript
addListener(eventName: string, listenerFunc: (...args: any[]) => any) => Promise<PluginListenerHandle>
```

| Param              | Type                      |
| ------------------ | ------------------------- |
| **`eventName`**    | `string`                  |
| **`listenerFunc`** | `(...args: any[]) => any` |

**Returns:** `Promise<PluginListenerHandle>`

***

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

***

### Interfaces

### **PluginListenerHandle**

| Prop         | Type                  |
| ------------ | --------------------- |
| **`remove`** | `() => Promise<void>` |

### **DownloadEvent**

| Prop          | Type     | Description                                    | Since  |
| ------------- | -------- | ---------------------------------------------- | ------ |
| **`percent`** | `number` | Current status of download, between 0 and 100. | 2.0.11 |

### **MajorAvailableEvent**

| Prop          | Type     | Description                                 | Since |
| ------------- | -------- | ------------------------------------------- | ----- |
| **`version`** | `string` | Emit when a new major version is available. | 2.3.0 |

### **UpdateAvailableEvent**

| Prop          | Type     | Description                          | Since |
| ------------- | -------- | ------------------------------------ | ----- |
| **`version`** | `string` | Emit when a new update is available. | 3.0.0 |

#### Type Aliases

**DownloadChangeListener**

`(state: DownloadEvent): void`

**MajorAvailableListener**

`(state: MajorAvailableEvent): void`

**UpdateAvailableListener**

`(state: UpdateAvailableEvent): void`



## Settings

After install capacitor-updater to your project, you can configure some behavior:

* `resetWhenUpdate` set it false to disable the reset version when update
* `autoUpdateUrl` the target URL to get updates
* `autoUpdate` true or false depend on if you want manual or auto
* `statsUrl` the target URL for stats, set it to "" to disable stats



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

###
