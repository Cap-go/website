---
locale: fr
title: "Functions and Paramètres"
description: "All Disponible method and Paramètres of the plugin"
sidebar: 
  order: 2
---

# Updater Plugin Config

See the Github [Readme](https://github.com/Cap-go/capacitor-updater) for more Information.

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater can be configured with these Options:

| Prop                         | Type                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default                                            | Since   |
| ---------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>                             | Configure the number of milliseconds the native plugin should wait before considering an update 'failed'. Only available for Android and iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>10000 // (10 seconds)</code>                 |         |
| **`responseTimeout`**        | <code>number</code>                             | Configure the number of milliseconds the native plugin should wait before considering API timeout. Only available for Android and iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>20 // (20 second)</code>                     |         |
| **`autoDeleteFailed`**       | <code>boolean</code>                            | Configure whether the plugin should use automatically delete failed bundles. Only available for Android and iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>true</code>                                  |         |
| **`autoDeletePrevious`**     | <code>boolean</code>                            | Configure whether the plugin should use automatically delete previous bundles after a successful update. Only available for Android and iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>true</code>                                  |         |
| **`autoUpdate`**             | <code>boolean</code>                            | Configure whether the plugin should use Auto Update via an update server. Only available for Android and iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>true</code>                                  |         |
| **`resetWhenUpdate`**        | <code>boolean</code>                            | Automatically delete previous downloaded bundles when a newer native app bundle is installed to the device. Only available for Android and iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>true</code>                                  |         |
| **`updateUrl`**              | <code>string</code>                             | Configure the URL / endpoint to which update checks are sent. Only available for Android and iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>https://plugin.capgo.app/updates</code>      |         |
| **`channelUrl`**             | <code>string</code>                             | Configure the URL / endpoint for channel operations. Only available for Android and iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>                             | Configure the URL / endpoint to which update statistics are sent. Only available for Android and iOS. Set to "" to disable stats reporting.                                                                                                                                                                                                                                                                                                                                                                                                                                       | <code>https://plugin.capgo.app/stats</code>        |         |
| **`publicKey`**              | <code>string</code>                             | Configure the public key for end to end live update encryption Version 2 Only available for Android and iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>undefined</code>                             | 6.2.0   |
| **`version`**                | <code>string</code>                             | Configure the current version of the app. This will be used for the first update request. If not set, the plugin will get the version from the native code. Only available for Android and iOS.                                                                                                                                                                                                                                                                                                                                                                                   | <code>undefined</code>                             | 4.17.48 |
| **`directUpdate`**           | <code>boolean \| 'always' \| 'atInstall' \| 'onLaunch'</code> | Configure when the plugin should direct install updates. Only for autoUpdate mode. Works well for apps less than 10MB and with uploads done using --partial flag. Zip or apps more than 10MB will be relatively slow for users to update. - false: Never do direct updates (use default behavior: download at start, set when backgrounded) - atInstall: Direct update only when app is installed, updated from store, otherwise act as directUpdate = false - onLaunch: Direct update only on app installed, updated from store or after app kill, otherwise act as directUpdate = false - always: Direct update in all previous cases (app installed, updated from store, after app kill or app resume), never act as directUpdate = false - true: (deprecated) Same as "always" for backward compatibility Only available for Android and iOS. | <code>false</code>                                 | 5.1.0   |
| **`autoSplashscreen`**       | <code>boolean</code>                            | Automatically handle splashscreen hiding when using directUpdate. When enabled, the plugin will automatically hide the splashscreen after updates are applied or when no update is needed. This removes the need to manually listen for appReady events and call SplashScreen.hide(). Only works when directUpdate is set to "atInstall", "always", or true. Requires the @capacitor/splash-screen plugin to be installed and configured with launchAutoHide: false. Requires autoUpdate and directUpdate to be enabled. Only available for Android and iOS.                      | <code>false</code>                                 | 7.6.0   |
| **`periodCheckDelay`**       | <code>number</code>                             | Configure the delay period for period update check. the unit is in seconds. Only available for Android and iOS. Cannot be less than 600 seconds (10 minutes).                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>600 // (10 minutes)</code>                   |         |
| **`localS3`**                | <code>boolean</code>                            | Configure the CLI to use a local server for testing or self-hosted update server.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localHost`**              | <code>string</code>                             | Configure the CLI to use a local server for testing or self-hosted update server.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localWebHost`**           | <code>string</code>                             | Configure the CLI to use a local server for testing or self-hosted update server.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localSupa`**              | <code>string</code>                             | Configure the CLI to use a local server for testing or self-hosted update server.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localSupaAnon`**          | <code>string</code>                             | Configure the CLI to use a local server for testing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>undefined</code>                             | 4.17.48 |
| **`localApi`**               | <code>string</code>                             | Configure the CLI to use a local api for testing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 6.3.3   |
| **`localApiFiles`**          | <code>string</code>                             | Configure the CLI to use a local file api for testing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>undefined</code>                             | 6.3.3   |
| **`allowModifyUrl`**         | <code>boolean</code>                            | Allow the plugin to modify the updateUrl, statsUrl and channelUrl dynamically from the JavaScript side.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code>                                 | 5.4.0   |
| **`defaultChannel`**         | <code>string</code>                             | Set the default channel for the app in the config. Case sensitive. This will setting will override the default channel set in the cloud, but will still respect overrides made in the cloud.                                                                                                                                                                                                                                                                                                                                                                                      | <code>undefined</code>                             | 5.5.0   |
| **`appId`**                  | <code>string</code>                             | Configure the app id for the app in the config.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>undefined</code>                             | 6.0.0   |
| **`keepUrlPathAfterReload`** | <code>boolean</code>                            | Configure the plugin to keep the URL path after a reload. WARNING: When a reload is triggered, 'window.history' will be cleared.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code>                                 | 6.8.0   |
| **`disableJSLogging`**       | <code>boolean</code>                            | Disable the JavaScript logging of the plugin. if true, the plugin will not log to the JavaScript console. only the native log will be done                                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>false</code>                                 | 7.3.0   |
| **`shakeMenu`**              | <code>boolean</code>                            | Enable shake gesture to show update menu for debugging/testing purposes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code>                                 | 7.5.0   |

## Exemples

In `capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1 second),
      "responseTimeout": 10 // (10 second),
      "autoDeleteFailed": false,
      "autoDeletePrevious": false,
      "autoUpdate": false,
      "resetWhenUpdate": false,
      "updateUrl": https://example.com/api/auto_update,
      "channelUrl": https://example.com/api/channel,
      "statsUrl": https://example.com/api/stats,
      "publicKey": undefined,
      "version": undefined,
      "directUpdate": undefined,
      "autoSplashscreen": undefined,
      "periodCheckDelay": undefined,
      "localS3": undefined,
      "localHost": undefined,
      "localWebHost": undefined,
      "localSupa": undefined,
      "localSupaAnon": undefined,
      "localApi": undefined,
      "localApiFiles": undefined,
      "allowModifyUrl": undefined,
      "defaultChannel": undefined,
      "appId": undefined,
      "keepUrlPathAfterReload": undefined,
      "disableJSLogging": undefined,
      "shakeMenu": undefined
    }
  }
}
```

In `capacitor.config.ts`:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1 second),
      responseTimeout: 10 // (10 second),
      autoDeleteFailed: false,
      autoDeletePrevious: false,
      autoUpdate: false,
      resetWhenUpdate: false,
      updateUrl: https://example.com/api/auto_update,
      channelUrl: https://example.com/api/channel,
      statsUrl: https://example.com/api/stats,
      publicKey: undefined,
      version: undefined,
      directUpdate: undefined,
      autoSplashscreen: undefined,
      periodCheckDelay: undefined,
      localS3: undefined,
      localHost: undefined,
      localWebHost: undefined,
      localSupa: undefined,
      localSupaAnon: undefined,
      localApi: undefined,
      localApiFiles: undefined,
      allowModifyUrl: undefined,
      defaultChannel: undefined,
      appId: undefined,
      keepUrlPathAfterReload: undefined,
      disableJSLogging: undefined,
      shakeMenu: undefined,
    },
  },
};

export default config;
```

</docgen-config>

<docgen-index>

* [`notifyAppReady()`](#notifyappready)
* [`setUpdateUrl(...)`](#setupdateurl)
* [`setStatsUrl(...)`](#setstatsurl)
* [`setChannelUrl(...)`](#setchannelurl)
* [`download(...)`](#download)
* [`next(...)`](#next)
* [`set(...)`](#set)
* [`delete(...)`](#delete)
* [`list(...)`](#list)
* [`reset(...)`](#reset)
* [`current()`](#current)
* [`reload()`](#reload)
* [`setMultiDelay(...)`](#setmultidelay)
* [`cancelDelay()`](#canceldelay)
* [`getLatest(...)`](#getlatest)
* [`setChannel(...)`](#setchannel)
* [`unsetChannel(...)`](#unsetchannel)
* [`getChannel()`](#getchannel)
* [`listChannels()`](#listchannels)
* [`setCustomId(...)`](#setcustomid)
* [`getBuiltinVersion()`](#getbuiltinversion)
* [`getDeviceId()`](#getdeviceid)
* [`getPluginVersion()`](#getpluginversion)
* [`isAutoUpdateEnabled()`](#isautoupdateenabled)
* [`removeAllListeners()`](#removealllisteners)
* [`addListener('download', ...)`](#addlistenerdownload-)
* [`addListener('noNeedUpdate', ...)`](#addlistenernoneedupdate-)
* [`addListener('updateAvailable', ...)`](#addlistenerupdateavailable-)
* [`addListener('downloadComplete', ...)`](#addlistenerdownloadcomplete-)
* [`addListener('majorAvailable', ...)`](#addlistenermajoravailable-)
* [`addListener('updateFailed', ...)`](#addlistenerupdatefailed-)
* [`addListener('downloadFailed', ...)`](#addlistenerdownloadfailed-)
* [`addListener('appReloaded', ...)`](#addlistenerappreloaded-)
* [`addListener('appReady', ...)`](#addlistenerappready-)
* [`isAutoUpdateAvailable()`](#isautoupdateavailable)
* [`getNextBundle()`](#getnextbundle)
* [`setShakeMenu(...)`](#setshakemenu)
* [`isShakeMenuEnabled()`](#isshakemenuenabled)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

# Methods

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Notify Capacitor Updater that the current Bundle is working (a Restauration will occur if this method is not called on every Application launch)
By default this method should be called in the first 10 sec after Application launch, otherwise a Restauration will occur.
Change this behaviour with {@link appReadyTimeout}

**Returns:** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------


## setUpdateUrl(...)

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Set the updateUrl for the Application, this will be used to Vérifier for Mises à jour.

| Param         | Type                                            | Description                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | contains the URL to use for checking for updates. |

**Since:** 5.4.0

--------------------


## setStatsUrl(...)

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Set the statsUrl for the Application, this will be used to send Statistiques. Passing an empty string will Désactiver Statistiques gathering.

| Param         | Type                                          | Description                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | contains the URL to use for sending statistics. |

**Since:** 5.4.0

--------------------


## setChannelUrl(...)

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Set the channelUrl for the Application, this will be used to set the Canal.

| Param         | Type                                              | Description                                      |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | contains the URL to use for setting the channel. |

**Since:** 5.4.0

--------------------


## Télécharger(...)

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Télécharger a Nouveau Bundle from the provided URL, it should be a zip file, with files inside or with a unique id inside with all your files

| Param         | Type                                                        | Description                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | The {@link <a href="#downloadoptions">DownloadOptions</a>} for downloading a new bundle zip. |

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## Suivant(...)

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Set the Suivant Bundle to be used when the Application is reloaded.

| Param         | Type                                          | Description                                                                                                   |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Contains the ID of the next Bundle to set on next app launch. {@link <a href="#bundleinfo">BundleInfo.id</a>} |

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## set(...)

```typescript
set(options: BundleId) => Promise<void>
```

Set the current Bundle and immediately reloads the Application.

| Param         | Type                                          | Description                                                                                       |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | A {@link <a href="#bundleid">BundleId</a>} object containing the new bundle id to set as current. |

--------------------


## Supprimer(...)

```typescript
delete(options: BundleId) => Promise<void>
```

Deletes the specified bundle from the native app storage. Use with {@link list} to get the stored Bundle IDs.

| Param         | Type                                          | Description                                                                                                                                   |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | A {@link <a href="#bundleid">BundleId</a>} object containing the ID of a bundle to delete (note, this is the bundle id, NOT the version name) |

--------------------


## list(...)

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Get all locally downloaded Bundles in your Application

| Param         | Type                                                | Description                                                            |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | The {@link <a href="#listoptions">ListOptions</a>} for listing bundles |

**Returns:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------


## Réinitialiser(...)

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Reset the app to the `builtin` bundle (the one sent to Apple App Store / Google Play Store ) or the last successfully loaded bundle.

| Param         | Type                                                  | Description                                                                                                                                                                      |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Containing {@link <a href="#resetoptions">ResetOptions.toLastSuccessful</a>}, `true` resets to the builtin bundle and `false` will reset to the last successfully loaded bundle. |

--------------------


## current()

```typescript
current() => Promise<CurrentBundleResult>
```

Get the current bundle, if none are set it returns `builtin`. currentNative is the original bundle installed on the device

**Returns:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------


## reload()

```typescript
reload() => Promise<void>
```

Reload the view

--------------------


## setMultiDelay(...)

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Sets a {@link <a href="#delaycondition">DelayCondition</a>} array containing conditions that the Plugin will use to delay the update.
After all conditions are met, the Mise à jour process will run Démarrer again as usual, so Mise à jour will be installed after a backgrounding or killing the Application.
For the `date` kind, the value should be an iso8601 date string.
For the `background` kind, the value should be a number in milliseconds.
For the `nativeVersion` kind, the value should be the version number.
For the `kill` kind, the value is not used.
The function has inconsistent behavior the Option kill do trigger the Mise à jour after the first kill and not after the Suivant background like other Options. This will be fixed in a future major Libération.

| Param         | Type                                                                  | Description                                                                                                |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Containing the {@link <a href="#multidelayconditions">MultiDelayConditions</a>} array of conditions to set |

**Since:** 4.3.0

--------------------


## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Cancels a {@link <a href="#delaycondition">DelayCondition</a>} to process an update immediately.

**Since:** 4.0.0

--------------------


## getLatest(...)

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Get Latest Bundle Disponible from Mise à jour Url

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Since:** 4.0.0

--------------------


## setChannel(...)

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Sets the Canal for this Appareil. The Canal has to allow for self assignment for this to work.
Do not use this method to set the Canal at boot.
This method is to set the Canal after the Application is ready, and Utilisateur interacted.
If you want to set the channel at boot, use the {@link PluginsConfig} to set the default channel.
This methods send to Capgo backend a request to link the Appareil ID to the Canal. Capgo can accept or refuse depending of the setting of your Canal.

| Param         | Type                                                            | Description                                                                      |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | Is the {@link <a href="#setchanneloptions">SetChannelOptions</a>} channel to set |

**Returns:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Since:** 4.7.0

--------------------


## unsetChannel(...)

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Unset the Canal for this Appareil. The Appareil will then return to the default Canal

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Since:** 4.7.0

--------------------


## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Get the Canal for this Appareil

**Returns:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Since:** 4.8.0

--------------------


## listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

List all Canaux Disponible for this Appareil that allow self-assignment

**Returns:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**Since:** 7.5.0

--------------------


## setCustomId(...)

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Set a custom ID for this Appareil

| Param         | Type                                                              | Description                                                                         |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | is the {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId to set |

**Since:** 4.9.0

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Get the Natif Application Version or the builtin Version if set in config

**Returns:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Since:** 5.2.0

--------------------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Get unique ID used to identify Appareil (sent to auto Mise à jour server)

**Returns:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Get the Natif Capacitor Updater plugin Version (sent to auto Mise à jour server)

**Returns:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Get the state of auto Mise à jour config.

**Returns:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------


## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Retirer all listeners for this plugin.

**Since:** 1.0.0

--------------------


## addListener('Télécharger', ...)

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Bundle Télécharger event in the Application. Fires once a Télécharger has started, during downloading and when finished.
This will return you all Télécharger percent during the Télécharger

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'download'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 2.0.11

--------------------


## addListener('noNeedUpdate', ...)

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Listen for no need to Mise à jour event, useful when you want force Vérifier every time the Application is launched

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'noNeedUpdate'</code>                                             |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.0.0

--------------------


## addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Disponible Mise à jour event, useful when you want to force Vérifier every time the Application is launched

| Param              | Type                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                                            |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.0.0

--------------------


## addListener('downloadComplete', ...)

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Listen for downloadComplete events.

| Param              | Type                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadComplete'</code>                                                             |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.0.0

--------------------


## addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Major Mise à jour event in the Application, let you know when major Mise à jour is blocked by setting disableAutoUpdateBreaking

| Param              | Type                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 2.3.0

--------------------


## addListener('updateFailed', ...)

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Mise à jour fail event in the Application, let you know when Mise à jour has fail to Installer at Suivant Application Démarrer

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateFailed'</code>                                                         |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 2.3.0

--------------------


## addListener('downloadFailed', ...)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Télécharger fail event in the Application, let you know when a Bundle Télécharger has Échoué

| Param              | Type                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadFailed'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.0.0

--------------------


## addListener('appReloaded', ...)

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Listen for reload event in the Application, let you know when reload has happened

| Param              | Type                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.3.0

--------------------


## addListener('appReady', ...)

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Application ready event in the Application, let you know when Application is ready to use

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'appReady'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 5.1.0

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Get if auto Mise à jour is Disponible (not disabled by serverUrl).

**Returns:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Get the Suivant Bundle that will be used when the Application reloads.
Retourne null if no Suivant Bundle is set.

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Since:** 6.8.0

--------------------


## setShakeMenu(...)

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Activer or Désactiver the shake menu for Débogage/Test purposes

| Param         | Type                                                                | Description                                              |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| **`options`** | <code><a href="#setshakemenuoptions">SetShakeMenuOptions</a></code> | Contains enabled boolean to enable or disable shake menu |

**Since:** 7.5.0

--------------------


## isShakeMenuEnabled()

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Get the current state of the shake menu

**Returns:** <code>Promise&lt;<a href="#shakemenuenabled">ShakeMenuEnabled</a>&gt;</code>

**Since:** 7.5.0

--------------------


## Interfaces


### AppReadyResult

| Prop         | Type                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| Prop             | Type                                                  |
| ---------------- | ----------------------------------------------------- |
| **`id`**         | <code>string</code>                                   |
| **`version`**    | <code>string</code>                                   |
| **`downloaded`** | <code>string</code>                                   |
| **`checksum`**   | <code>string</code>                                   |
| **`status`**     | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### ChannelUrl

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### DownloadOptions

This URL and versions are used to Télécharger the Bundle from the server, If you use backend all Information will be given by the method getLatest.
If you don't use backend, you need to provide the URL and Version of the Bundle. Checksum and sessionKey are required if you Chiffré the Bundle with the CLI Commande encrypt, you should receive them as result of the Commande.

| Prop             | Type                         | Description                                                                                                                                                      | Default                | Since |
| ---------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`**        | <code>string</code>          | The URL of the bundle zip file (e.g: dist.zip) to be downloaded. (This can be any URL. E.g: Amazon S3, a GitHub tag, any other place you've hosted your bundle.) |                        |       |
| **`version`**    | <code>string</code>          | The version code/name of this bundle/version                                                                                                                     |                        |       |
| **`sessionKey`** | <code>string</code>          | The session key for the update, when the bundle is encrypted with a session key                                                                                  | <code>undefined</code> | 4.0.0 |
| **`checksum`**   | <code>string</code>          | The checksum for the update, it should be in sha256 and encrypted with private key if the bundle is encrypted                                                    | <code>undefined</code> | 4.0.0 |
| **`manifest`**   | <code>ManifestEntry[]</code> | The manifest for multi-file downloads                                                                                                                            | <code>undefined</code> | 6.1.0 |


### ManifestEntry

| Prop               | Type                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### BundleId

| Prop     | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListResult

| Prop          | Type                      |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| Prop      | Type                 | Description                                                                                                                                   | Default            | Since  |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | Whether to return the raw bundle list or the manifest. If true, the list will attempt to read the internal database instead of files on disk. | <code>false</code> | 6.14.0 |


### ResetOptions

| Prop                   | Type                 |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| Prop         | Type                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code>                               |


### MultiDelayConditions

| Prop                  | Type                          |
| --------------------- | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### DelayCondition

| Prop        | Type                                                      | Description                              |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`**  | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Set up delay conditions in setMultiDelay |
| **`value`** | <code>string</code>                                       |                                          |


### LatestVersion

| Prop             | Type                         | Description                | Since |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`**    | <code>string</code>          | Result of getLatest method | 4.0.0 |
| **`checksum`**   | <code>string</code>          |                            | 6     |
| **`major`**      | <code>boolean</code>         |                            |       |
| **`message`**    | <code>string</code>          |                            |       |
| **`sessionKey`** | <code>string</code>          |                            |       |
| **`error`**      | <code>string</code>          |                            |       |
| **`old`**        | <code>string</code>          |                            |       |
| **`url`**        | <code>string</code>          |                            |       |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 6.1   |


### GetLatestOptions

| Prop          | Type                | Description                                                                                     | Default                | Since |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | The channel to get the latest version for The channel must allow 'self_assign' for this to work | <code>undefined</code> | 6.8.0 |


### ChannelRes

| Prop          | Type                | Description                   | Since |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`**  | <code>string</code> | Current status of set channel | 4.7.0 |
| **`error`**   | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |


### SetChannelOptions

| Prop                    | Type                 |
| ----------------------- | -------------------- |
| **`channel`**           | <code>string</code>  |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| Prop                    | Type                 |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes

| Prop           | Type                 | Description                   | Since |
| -------------- | -------------------- | ----------------------------- | ----- |
| **`channel`**  | <code>string</code>  | Current status of get channel | 4.8.0 |
| **`error`**    | <code>string</code>  |                               |       |
| **`message`**  | <code>string</code>  |                               |       |
| **`status`**   | <code>string</code>  |                               |       |
| **`allowSet`** | <code>boolean</code> |                               |       |


### ListChannelsResult

| Prop           | Type                       | Description                | Since |
| -------------- | -------------------------- | -------------------------- | ----- |
| **`channels`** | <code>ChannelInfo[]</code> | List of available channels | 7.5.0 |


### ChannelInfo

| Prop                 | Type                 | Description                                     | Since |
| -------------------- | -------------------- | ----------------------------------------------- | ----- |
| **`id`**             | <code>string</code>  | The channel ID                                  | 7.5.0 |
| **`name`**           | <code>string</code>  | The channel name                                | 7.5.0 |
| **`public`**         | <code>boolean</code> | Whether this is a public channel                | 7.5.0 |
| **`allow_self_set`** | <code>boolean</code> | Whether devices can self-assign to this channel | 7.5.0 |


### SetCustomIdOptions

| Prop           | Type                |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### BuiltinVersion

| Prop          | Type                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### DeviceId

| Prop           | Type                |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### PluginVersion

| Prop          | Type                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### AutoUpdateEnabled

| Prop          | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### DownloadEvent

| Prop          | Type                                              | Description                                    | Since |
| ------------- | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`percent`** | <code>number</code>                               | Current status of download, between 0 and 100. | 4.0.0 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeedEvent

| Prop         | Type                                              | Description                                    | Since |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Current status of download, between 0 and 100. | 4.0.0 |


### UpdateAvailableEvent

| Prop         | Type                                              | Description                                    | Since |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Current status of download, between 0 and 100. | 4.0.0 |


### DownloadCompleteEvent

| Prop         | Type                                              | Description                          | Since |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Emit when a new update is available. | 4.0.0 |


### MajorAvailableEvent

| Prop          | Type                | Description                                | Since |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | Emit when a new major bundle is available. | 4.0.0 |


### UpdateFailedEvent

| Prop         | Type                                              | Description                           | Since |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Emit when a update failed to install. | 4.0.0 |


### DownloadFailedEvent

| Prop          | Type                | Description                | Since |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Emit when a download fail. | 4.0.0 |


### AppReadyEvent

| Prop         | Type                                              | Description                           | Since |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Emitted when the app is ready to use. | 5.2.0 |
| **`status`** | <code>string</code>                               |                                       |       |


### AutoUpdateAvailable

| Prop            | Type                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


### SetShakeMenuOptions

| Prop          | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### ShakeMenuEnabled

| Prop          | Type                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


## Type Aliases


### BundleStatus

En attente: The Bundle is En attente to be **SET** as the Suivant Bundle.
downloading: The Bundle is being downloaded.
Succès: The Bundle has been downloaded and is ready to be **SET** as the Suivant Bundle.
Erreur: The Bundle has Échoué to Télécharger.

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>

</docgen-api>
