---
title: "Functions and Paramètres"
description: "All Disponible method and Paramètres of the plugin"
sidebar: 
  order: 2
---

# Updater Plugin Config

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater can be configured with these Options:

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`appReadyTimeout`** | `number` | Configure the number of milliseconds the native plugin should wait before considering an update 'failed'. Only available for Android and iOS. | `10000 // (10 seconds)` |  |
| **`responseTimeout`** | `number` | Configure the number of seconds the native plugin should wait before considering API timeout. Only available for Android and iOS. | `20 // (20 second)` |  |
| **`autoDeleteFailed`** | `boolean` | Configure whether the plugin should use automatically delete failed bundles. Only available for Android and iOS. | `true` |  |
| **`autoDeletePrevious`** | `boolean` | Configure whether the plugin should use automatically delete previous bundles after a successful update. Only available for Android and iOS. | `true` |  |
| **`autoUpdate`** | `boolean` | Configure whether the plugin should use Auto Update via an update server. Only available for Android and iOS. | `true` |  |
| **`resetWhenUpdate`** | `boolean` | Automatically delete previous downloaded bundles when a newer native app bundle is installed to the device. Only available for Android and iOS. | `true` |  |
| **`updateUrl`** | `string` | Configure the URL / endpoint to which update checks are sent. Only available for Android and iOS. | `https://plugin.capgo.app/updates` |  |
| **`channelUrl`** | `string` | Configure the URL / endpoint for channel operations. Only available for Android and iOS. | `https://plugin.capgo.app/channel_self` |  |
| **`statsUrl`** | `string` | Configure the URL / endpoint to which update statistics are sent. Only available for Android and iOS. Set to "" to disable stats reporting. | `https://plugin.capgo.app/stats` |  |
| **`publicKey`** | `string` | Configure the public key for end to end live update encryption Version 2 Only available for Android and iOS. | `undefined` | 6.2.0 |
| **`version`** | `string` | Configure the current version of the app. This will be used for the first update request. If not set, the plugin will get the version from the native code. Only available for Android and iOS. | `undefined` | 4.17.48 |
| **`directUpdate`** | `boolean | 'always' | 'atInstall' | 'onLaunch'` | Configure when the plugin should direct install updates. Only for autoUpdate mode. Works well for apps less than 10MB and with uploads done using --partial flag. Zip or apps more than 10MB will be relatively slow for users to update. - false: Never do direct updates (use default behavior: download at start, set when backgrounded) - atInstall: Direct update only when app is installed, updated from store, otherwise act as directUpdate = false - onLaunch: Direct update only on app installed, updated from store or after app kill, otherwise act as directUpdate = false - always: Direct update in all previous cases (app installed, updated from store, after app kill or app resume), never act as directUpdate = false - true: (deprecated) Same as "always" for backward compatibility Only available for Android and iOS. | `false` | 5.1.0 |
| **`autoSplashscreen`** | `boolean` | Automatically handle splashscreen hiding when using directUpdate. When enabled, the plugin will automatically hide the splashscreen after updates are applied or when no update is needed. This removes the need to manually listen for appReady events and call SplashScreen.hide(). Only works when directUpdate is set to "atInstall", "always", "onLaunch", or true. Requires the @capacitor/splash-screen plugin to be installed and configured with launchAutoHide: false. Requires autoUpdate and directUpdate to be enabled. Only available for Android and iOS. | `false` | 7.6.0 |
| **`autoSplashscreenLoader`** | `boolean` | Display a native loading indicator on top of the splashscreen while automatic direct updates are running. Only takes effect when {@link autoSplashscreen} is enabled. Requires the @capacitor/splash-screen plugin to be installed and configured with launchAutoHide: false. Only available for Android and iOS. | `false` | 7.19.0 |
| **`autoSplashscreenTimeout`** | `number` | Automatically hide the splashscreen after the specified number of milliseconds when using automatic direct updates. If the timeout elapses, the update continues to download in the background while the splashscreen is dismissed. Set to `0` (zero) to disable the timeout. When the timeout fires, the direct update flow is skipped and the downloaded bundle is installed on the next background/launch. Requires {@link autoSplashscreen} to be enabled. Only available for Android and iOS. | `10000 // (10 seconds)` | 7.19.0 |
| **`periodCheckDelay`** | `number` | Configure the delay period for period update check. the unit is in seconds. Only available for Android and iOS. Cannot be less than 600 seconds (10 minutes). | `0 (disabled)` |  |
| **`localS3`** | `boolean` | Configure the CLI to use a local server for testing or self-hosted update server. | `undefined` | 4.17.48 |
| **`localHost`** | `string` | Configure the CLI to use a local server for testing or self-hosted update server. | `undefined` | 4.17.48 |
| **`localWebHost`** | `string` | Configure the CLI to use a local server for testing or self-hosted update server. | `undefined` | 4.17.48 |
| **`localSupa`** | `string` | Configure the CLI to use a local server for testing or self-hosted update server. | `undefined` | 4.17.48 |
| **`localSupaAnon`** | `string` | Configure the CLI to use a local server for testing. | `undefined` | 4.17.48 |
| **`localApi`** | `string` | Configure the CLI to use a local api for testing. | `undefined` | 6.3.3 |
| **`localApiFiles`** | `string` | Configure the CLI to use a local file api for testing. | `undefined` | 6.3.3 |
| **`allowModifyUrl`** | `boolean` | Allow the plugin to modify the updateUrl, statsUrl and channelUrl dynamically from the JavaScript side. | `false` | 5.4.0 |
| **`allowModifyAppId`** | `boolean` | Allow the plugin to modify the appId dynamically from the JavaScript side. | `false` | 7.14.0 |
| **`allowManualBundleError`** | `boolean` | Allow marking bundles as errored from JavaScript while using manual update flows. When enabled, {@link CapacitorUpdaterPlugin.setBundleError} can change a bundle status to `error`. | `false` | 7.20.0 |
| **`persistCustomId`** | `boolean` | Persist the customId set through {@link CapacitorUpdaterPlugin.setCustomId} across app restarts. Only available for Android and iOS. | `false (will be true by default in a future major release v8.x.x)` | 7.17.3 |
| **`persistModifyUrl`** | `boolean` | Persist the updateUrl, statsUrl and channelUrl set through {@link CapacitorUpdaterPlugin.setUpdateUrl}, {@link CapacitorUpdaterPlugin.setStatsUrl} and {@link CapacitorUpdaterPlugin.setChannelUrl} across app restarts. Only available for Android and iOS. | `false` | 7.20.0 |
| **`allowSetDefaultChannel`** | `boolean` | Allow or disallow the {@link CapacitorUpdaterPlugin.setChannel} method to modify the defaultChannel. When set to `false`, calling `setChannel()` will return an error with code `disabled_by_config`. | `true` | 7.34.0 |
| **`defaultChannel`** | `string` | Set the default channel for the app in the config. Case sensitive. This will setting will override the default channel set in the cloud, but will still respect overrides made in the cloud. This requires the channel to allow devices to self dissociate/associate in the channel settings. https://capgo.app/docs/public-api/channels/#channel-configuration-options | `undefined` | 5.5.0 |
| **`appId`** | `string` | Configure the app id for the app in the config. | `undefined` | 6.0.0 |
| **`keepUrlPathAfterReload`** | `boolean` | Configure the plugin to keep the URL path after a reload. WARNING: When a reload is triggered, 'window.history' will be cleared. | `false` | 6.8.0 |
| **`disableJSLogging`** | `boolean` | Disable the JavaScript logging of the plugin. if true, the plugin will not log to the JavaScript console. only the native log will be done | `false` | 7.3.0 |
| **`shakeMenu`** | `boolean` | Enable shake gesture to show update menu for debugging/testing purposes | `false` | 7.5.0 |


</docgen-config>

## API Référence

<docgen-index>
<!--Auto-generated, do not edit by hand-->

- [`notifyAppReady`](#notifyappready)
- [`setUpdateUrl`](#setupdateurl)
- [`setStatsUrl`](#setstatsurl)
- [`setChannelUrl`](#setchannelurl)
- [`download`](#download)
- [`next`](#next)
- [`set`](#set)
- [`delete`](#delete)
- [`setBundleError`](#setbundleerror)
- [`list`](#list)
- [`reset`](#reset)
- [`current`](#current)
- [`reload`](#reload)
- [`setMultiDelay`](#setmultidelay)
- [`cancelDelay`](#canceldelay)
- [`getLatest`](#getlatest)
- [`setChannel`](#setchannel)
- [`unsetChannel`](#unsetchannel)
- [`getChannel`](#getchannel)
- [`listChannels`](#listchannels)
- [`setCustomId`](#setcustomid)
- [`getBuiltinVersion`](#getbuiltinversion)
- [`getDeviceId`](#getdeviceid)
- [`getPluginVersion`](#getpluginversion)
- [`isAutoUpdateEnabled`](#isautoupdateenabled)
- [`removeAllListeners`](#removealllisteners)
- [`addListener('download')`](#addlistenerdownload-)
- [`addListener('noNeedUpdate')`](#addlistenernoneedupdate-)
- [`addListener('updateAvailable')`](#addlistenerupdateavailable-)
- [`addListener('downloadComplete')`](#addlistenerdownloadcomplete-)
- [`addListener('breakingAvailable')`](#addlistenerbreakingavailable-)
- [`addListener('majorAvailable')`](#addlistenermajoravailable-)
- [`addListener('updateFailed')`](#addlistenerupdatefailed-)
- [`addListener('downloadFailed')`](#addlistenerdownloadfailed-)
- [`addListener('appReloaded')`](#addlistenerappreloaded-)
- [`addListener('appReady')`](#addlistenerappready-)
- [`addListener('channelPrivate')`](#addlistenerchannelprivate-)
- [`isAutoUpdateAvailable`](#isautoupdateavailable)
- [`getNextBundle`](#getnextbundle)
- [`getFailedUpdate`](#getfailedupdate)
- [`setShakeMenu`](#setshakemenu)
- [`isShakeMenuEnabled`](#isshakemenuenabled)
- [`getAppId`](#getappid)
- [`setAppId`](#setappid)

</docgen-index>

<docgen-api>
<!--Auto-generated, do not edit by hand-->

### notifyAppReady

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Notify the Natif layer that JavaScript initialized successfully.

**CRITICAL: You must call this method on every app launch to prevent automatic rollback.**

This is a simple notification to confirm that your Bundle's JavaScript loaded and executed.
The Natif web server successfully served the Bundle files and your JS runtime started.
That's all it checks - nothing more complex.

**What triggers rollback:**
- NOT calling this method within the timeout (default: 10 seconds)
- Terminé JavaScript failure (Bundle won't load at all)

**What does NOT trigger rollback:**
- Runtime errors after Initialisation (API failures, crashes, etc.)
- Network request failures
- Application logic errors

**IMPORTANT: Call this BEFORE any network requests.**
Don't wait for APIs, data loading, or async operations. Call it as soon as your
JavaScript Bundle starts executing to confirm the Bundle itself is valid.

Best practices:
- Call immediately in your Application entry point (main.js, Application component mount, etc.)
- Don't put it after network calls or heavy Initialisation
- Don't wrap it in try/catch with conditions
- Adjust {@link PluginsConfig.CapacitorUpdater.appReadyTimeout} if you need more time

**Returns**

`Promise<AppReadyResult>` — Always resolves successfully with current bundle info. This method never fails.


--------------------


### setUpdateUrl

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Set the Mise à jour URL for the Application dynamically at runtime.

This overrides the {@link PluginsConfig.CapacitorUpdater.updateUrl} config value.
Requires {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} to be set to `true`.

Use {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} to persist this value across app restarts.
Otherwise, the URL will Réinitialiser to the config value on Suivant Application launch.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `UpdateUrl` | Contains the URL to use for checking for updates. |

**Returns**

`Promise<void>` — Resolves when the URL is successfully updated.

**Since:** 5.4.0

**Throws:** {Error} If `allowModifyUrl` is false or if the operation fails.


--------------------


### setStatsUrl

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Set the Statistiques URL for the Application dynamically at runtime.

This overrides the {@link PluginsConfig.CapacitorUpdater.statsUrl} config value.
Requires {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} to be set to `true`.

Pass an empty string to Désactiver Statistiques gathering entirely.
Use {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} to persist this value across app restarts.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `StatsUrl` | Contains the URL to use for sending statistics, or an empty string to disable. |

**Returns**

`Promise<void>` — Resolves when the URL is successfully updated.

**Since:** 5.4.0

**Throws:** {Error} If `allowModifyUrl` is false or if the operation fails.


--------------------


### setChannelUrl

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Set the Canal URL for the Application dynamically at runtime.

This overrides the {@link PluginsConfig.CapacitorUpdater.channelUrl} config value.
Requires {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} to be set to `true`.

Use {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} to persist this value across app restarts.
Otherwise, the URL will Réinitialiser to the config value on Suivant Application launch.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `ChannelUrl` | Contains the URL to use for channel operations. |

**Returns**

`Promise<void>` — Resolves when the URL is successfully updated.

**Since:** 5.4.0

**Throws:** {Error} If `allowModifyUrl` is false or if the operation fails.


--------------------


### Télécharger

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Télécharger a Nouveau Bundle from the provided URL for later Installation.

The downloaded Bundle is stored locally but not activated. To use it:
- Call {@link next} to set it for installation on next app backgrounding/restart
- Call {@link set} to activate it immediately (destroys current JavaScript context)

The URL should point to a zip file containing either:
- Your Application files directly in the zip root, or
- A single folder containing all your Application files

The bundle must include an `index.html` file at the root level.

For encrypted bundles, provide the `sessionKey` and `checksum` parameters.
For multi-file partial updates, provide the `manifest` array.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `DownloadOptions` | The {@link DownloadOptions} for downloading a new bundle zip. |

**Returns**

`Promise<BundleInfo>` — The {@link BundleInfo} for the downloaded bundle.

**Throws:** {Error} If the download fails or the bundle is invalid.

**Example**

```ts
const bundle = await CapacitorUpdater.download({
  url: `https://example.com/versions/${version}/dist.zip`,
  version: version
});
// Bundle is downloaded but not active yet
await CapacitorUpdater.next({ id: bundle.id }); // Will activate on next background
```


--------------------


### Suivant

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Set the Suivant Bundle to be activated when the Application backgrounds or restarts.

This is the recommended way to apply Mises à jour as it doesn't interrupt the Utilisateur's current session.
The Bundle will be activated when:
- The Application is backgrounded (Utilisateur switches away), or
- The Application is killed and relaunched, or
- {@link reload} is called manually

Unlike {@link set}, this method does NOT destroy the current JavaScript context immediately.
Your Application continues running normally until one of the above events occurs.

Use {@link setMultiDelay} to add additional conditions before the update is applied.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `BundleId` | Contains the ID of the bundle to set as next. Use {@link BundleInfo.id} from a downloaded bundle. |

**Returns**

`Promise<BundleInfo>` — The {@link BundleInfo} for the specified bundle.

**Throws:** {Error} When there is no index.html file inside the bundle folder or the bundle doesn't exist.


--------------------


### set

```typescript
set(options: BundleId) => Promise<void>
```

Set the current Bundle and immediately reloads the Application.

**IMPORTANT: This is a terminal operation that destroys the current JavaScript context.**

When you call this method:
- The entire JavaScript context is immediately destroyed
- The Application reloads from a different folder with different files
- NO code after this call will execute
- NO promises will resolve
- NO callbacks will fire
- Event listeners registered after this call are unreliable and may never fire

The reload happens automatically - you don't need to do anything else.
If you need to preserve state like the current URL path, use the {@link PluginsConfig.CapacitorUpdater.keepUrlPathAfterReload} config option.
For other state preservation needs, Enregistrer your data before calling this method (e.g., to localStorage).

**Do not** try to execute additional logic after calling `set()` - it won't work as expected.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `BundleId` | A {@link BundleId} object containing the new bundle id to set as current. |

**Returns**

`Promise<void>` — A promise that will never resolve because the JavaScript context is destroyed.

**Throws:** {Error} When there is no index.html file inside the bundle folder.


--------------------


### Supprimer

```typescript
delete(options: BundleId) => Promise<void>
```

Supprimer a Bundle from local storage to free up disk space.

You cannot Supprimer:
- The currently Actif Bundle
- The `builtin` bundle (the version shipped with your app)
- The bundle set as `next` (call {@link next} with a different bundle first)

Use {@link list} to get all available bundle IDs.

**Note:** The bundle ID is NOT the same as the version name.
Use the `id` field from {@link BundleInfo}, not the `version` field.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `BundleId` | A {@link BundleId} object containing the bundle ID to delete. |

**Returns**

`Promise<void>` — Resolves when the bundle is successfully deleted.

**Throws:** {Error} If the bundle is currently in use or doesn't exist.


--------------------


### setBundleError

```typescript
setBundleError(options: BundleId) => Promise<BundleInfo>
```

Manually mark a Bundle as Échoué/errored in manual Mise à jour mode.

This is useful when you detect that a Bundle has critical issues and want to prevent
it from being used again. The bundle status will be changed to `error` and the plugin
will avoid using this Bundle in the future.

**Requirements:**
- {@link PluginsConfig.CapacitorUpdater.allowManualBundleError} must be set to `true`
- Only works in manual Mise à jour mode (when autoUpdate is disabled)

Common use case: After downloading and Test a Bundle, you discover it has critical
bugs and want to mark it as Échoué so it won't be retried.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `BundleId` | A {@link BundleId} object containing the bundle ID to mark as errored. |

**Returns**

`Promise<BundleInfo>` — The updated {@link BundleInfo} with status set to `error`.

**Since:** 7.20.0

**Throws:** {Error} When the bundle does not exist or `allowManualBundleError` is false.


--------------------


### list

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Get all locally downloaded Bundles stored in your Application.

This Retourne all Bundles that have been downloaded and are Disponible locally, including:
- The currently Actif Bundle
- The `builtin` bundle (shipped with your app)
- Any downloaded Bundles waiting to be activated
- Failed bundles (with `error` status)

Use this to:
- Vérifier Disponible disk space by counting Bundles
- Delete old bundles with {@link delete}
- Monitor Bundle Télécharger status

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `ListOptions | undefined` | The {@link ListOptions} for customizing the bundle list output. |

**Returns**

`Promise<BundleListResult>` — A promise containing the array of {@link BundleInfo} objects.

**Throws:** {Error} If the operation fails.


--------------------


### Réinitialiser

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Réinitialiser the Application to a known good Bundle.

This method helps recover from problematic Mises à jour by reverting to either:
- The `builtin` bundle (the original version shipped with your app to App Store/Play Store)
- The last successfully loaded Bundle (most recent Bundle that worked correctly)

**IMPORTANT: This triggers an immediate app reload, destroying the current JavaScript context.**
See {@link set} for details on the implications of this operation.

Use cases:
- Emergency recovery when an Mise à jour causes critical issues
- Test Restauration functionality
- Providing Utilisateurs a "Réinitialiser to factory" Option

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `ResetOptions | undefined` |  |

**Returns**

`Promise<void>` — A promise that may never resolve because the app will be reloaded.

**Throws:** {Error} If the reset operation fails.


--------------------


### current

```typescript
current() => Promise<CurrentBundleResult>
```

Get Information À propos the currently Actif Bundle.

Retourne:
- `bundle`: The currently active bundle information
- `native`: The version of the builtin bundle (the original app version from App/Play Store)

If no updates have been applied, `bundle.id` will be `"builtin"`, indicating the app
is running the original Version shipped with the Natif Application.

Use this to:
- Display the current Version to Utilisateurs
- Vérifier if an Mise à jour is currently Actif
- Compare against Disponible Mises à jour
- Journal the Actif Bundle for Débogage

**Returns**

`Promise<CurrentBundleResult>` — A promise with the current bundle and native version info.

**Throws:** {Error} If the operation fails.


--------------------


### reload

```typescript
reload() => Promise<void>
```

Manually reload the Application to apply a En attente Mise à jour.

This triggers the same reload behavior that happens automatically when the Application backgrounds.
If you've called {@link next} to queue an update, calling `reload()` will apply it immediately.

**IMPORTANT: This destroys the current JavaScript context immediately.**
See {@link set} for details on the implications of this operation.

Common use cases:
- Applying an Mise à jour immediately after Télécharger instead of waiting for backgrounding
- Providing a "Redémarrer now" button to Utilisateurs after an Mise à jour is ready
- Test Mise à jour flows during Développement

If no update is pending (no call to {@link next}), this simply reloads the current bundle.

**Returns**

`Promise<void>` — A promise that may never resolve because the app will be reloaded.

**Throws:** {Error} If the reload operation fails.


--------------------


### setMultiDelay

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Configure conditions that must be met before a En attente Mise à jour is applied.

After calling {@link next} to queue an update, use this method to control when it gets applied.
The Mise à jour will only be installed after ALL specified conditions are satisfied.

Disponible condition types:
- `background`: Wait for the app to be backgrounded. Optionally specify duration in milliseconds.
- `kill`: Wait for the app to be killed and relaunched (**Note:** Current behavior triggers update immediately on kill, not on next background. This will be fixed in v8.)
- `date`: Wait until a specific date/time (ISO 8601 format)
- `nativeVersion`: Wait until the native app is updated to a specific version

Condition value formats:
- `background`: Number in milliseconds (e.g., `"300000"` for 5 minutes), or omit for immediate
- `kill`: No value needed
- `date`: ISO 8601 date string (e.g., `"2025-12-31T23:59:59Z"`)
- `nativeVersion`: Version string (e.g., `"2.0.0"`)

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `MultiDelayConditions` | Contains the {@link MultiDelayConditions} array of conditions. |

**Returns**

`Promise<void>` — Resolves when the delay conditions are set.

**Since:** 4.3.0

**Throws:** {Error} If the operation fails or conditions are invalid.

**Example**

```ts
// Update after user kills app OR after 5 minutes in background
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    { kind: 'kill' },
    { kind: 'background', value: '300000' }
  ]
});
```

**Example**

```ts
// Update after a specific date
await CapacitorUpdater.setMultiDelay({
  delayConditions: [{ kind: 'date', value: '2025-12-31T23:59:59Z' }]
});
```

**Example**

```ts
// Default behavior: update on next background
await CapacitorUpdater.setMultiDelay({
  delayConditions: [{ kind: 'background' }]
});
```


--------------------


### cancelDelay

```typescript
cancelDelay() => Promise<void>
```

Annuler all delay conditions and apply the En attente Mise à jour immediately.

If you've set delay conditions with {@link setMultiDelay}, this method clears them
and triggers the En attente Mise à jour to be applied on the Suivant Application background or Redémarrer.

This is useful when:
- Utilisateur manually requests to Mise à jour now (e.g., clicks "Mise à jour now" button)
- Your Application detects it's a good time to Mise à jour (e.g., Utilisateur finished critical task)
- You want to override a time-based delay early

**Returns**

`Promise<void>` — Resolves when the delay conditions are cleared.

**Since:** 4.0.0

**Throws:** {Error} If the operation fails.


--------------------


### getLatest

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Vérifier the Mise à jour server for the latest Disponible Bundle Version.

This queries your configured Mise à jour URL (or Capgo backend) to see if a newer Bundle
is Disponible for Télécharger. It does NOT Télécharger the Bundle automatically.

The response includes:
- `version`: The latest available version identifier
- `url`: Download URL for the bundle (if available)
- `breaking`: Whether this update is marked as incompatible (requires native app update)
- `message`: Optional message from the server
- `manifest`: File list for partial updates (if using multi-file downloads)

After receiving the latest Version Info, you can:
1. Compare it with your current Version
2. Download it using {@link download}
3. Apply it using {@link next} or {@link set}

**Important: Error handling for "no new version available"**

When the Appareil's current Version matches the latest Version on the server (i.e., the Appareil is already
up-to-date), the server returns a 200 response with `error: "no_new_version_available"` and
`message: "No new version available"`. **This causes `getLatest()` to throw an error**, even though
this is a normal, expected condition.

You should catch this specific Erreur to handle it gracefully:

```typescript
try {
  const latest = await CapacitorUpdater.getLatest();
  // New version is available, proceed with download
} catch (error) {
  if (error.message === 'No new version available') {
    // Device is already on the latest version - this is normal
    console.log('Already up to date');
  } else {
    // Actual error occurred
    console.error('Failed to check for updates:', error);
  }
}
```

In this scenario, the server:
- Journaux the request with a "No Nouveau Version Disponible" message
- Sends a "noNew" stat action to track that the Appareil checked for Mises à jour but was already current (done on the backend)

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `GetLatestOptions | undefined` | Optional {@link GetLatestOptions} to specify which channel to check. |

**Returns**

`Promise<LatestVersion>` — Information about the latest available bundle version.

**Since:** 4.0.0

**Throws:** {Error} Always throws when no new version is available (`error: "no_new_version_available"`), or when the request fails.


--------------------


### setChannel

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Assign this Appareil to a specific Mise à jour Canal at runtime.

Canaux allow you to distribute different Bundle versions to different groups of Utilisateurs
(e.g., "Production", "Bêta", "staging"). This method switches the Appareil to a Nouveau Canal.

**Requirements:**
- The target Canal must allow self-assignment (configured in your Capgo Tableau de bord or backend)
- The backend may accept or reject the request based on Canal Paramètres

**When to use:**
- After the Application is ready and the Utilisateur has interacted (e.g., opted into Bêta program)
- To implement in-Application Canal switching (Bêta toggle, tester access, etc.)
- For Utilisateur-driven Canal changes

**When NOT to use:**
- At app boot/initialization - use {@link PluginsConfig.CapacitorUpdater.defaultChannel} config instead
- Before Utilisateur interaction

**Important: Listen for the `channelPrivate` event**

When a Utilisateur attempts to set a Canal that doesn't allow Appareil self-assignment, the method will
throw an error AND fire a {@link addListener}('channelPrivate') event. You should listen to this event
to provide appropriate Retour to Utilisateurs:

```typescript
CapacitorUpdater.addListener('channelPrivate', (data) => {
  console.warn(`Cannot access channel "${data.channel}": ${data.message}`);
  // Show user-friendly message
});
```

This sends a request to the Capgo backend linking your Appareil ID to the specified Canal.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `SetChannelOptions` | The {@link SetChannelOptions} containing the channel name and optional auto-update trigger. |

**Returns**

`Promise<ChannelRes>` — Channel operation result with status and optional error/message.

**Since:** 4.7.0

**Throws:** {Error} If the channel doesn't exist or doesn't allow self-assignment.


--------------------


### unsetChannel

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Retirer the Appareil's Canal assignment and return to the default Canal.

This unlinks the Appareil from any specifically assigned Canal, causing it to fall Retour to:
- The {@link PluginsConfig.CapacitorUpdater.defaultChannel} if configured, or
- Your backend's default Canal for this Application

Use this when:
- Utilisateurs opt out of Bêta/Test programs
- You want to Réinitialiser a Appareil to standard Mise à jour distribution
- Test Canal switching behavior

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `UnsetChannelOptions` |  |

**Returns**

`Promise<void>` — Resolves when the channel is successfully unset.

**Since:** 4.7.0

**Throws:** {Error} If the operation fails.


--------------------


### getChannel

```typescript
getChannel() => Promise<GetChannelRes>
```

Get the current Canal assigned to this Appareil.

Retourne Information À propos:
- `channel`: The currently assigned channel name (if any)
- `allowSet`: Whether the channel allows self-assignment
- `status`: Operation status
- `error`/`message`: Additional information (if applicable)

Use this to:
- Display current Canal to Utilisateurs (e.g., "You're on the Bêta Canal")
- Vérifier if a Appareil is on a specific Canal before showing Fonctionnalités
- Verify channel assignment after calling {@link setChannel}

**Returns**

`Promise<GetChannelRes>` — The current channel information.

**Since:** 4.8.0

**Throws:** {Error} If the operation fails.


--------------------


### listChannels

```typescript
listChannels() => Promise<ListChannelsResult>
```

Get a list of all Canaux Disponible for this Appareil to self-assign to.

Only returns channels where `allow_self_set` is `true`. These are channels that
users can switch to using {@link setChannel} without backend administrator intervention.

Each Canal includes:
- `id`: Unique channel identifier
- `name`: Human-readable channel name
- `public`: Whether the channel is publicly visible
- `allow_self_set`: Always `true` in results (filtered to only self-assignable channels)

Use this to:
- Construction a Canal selector UI for Utilisateurs (e.g., "Join Bêta" button)
- Show Disponible Test/preview Canaux
- Implement Canal discovery Fonctionnalités

**Returns**

`Promise<ListChannelsResult>` — List of channels the device can self-assign to.

**Since:** 7.5.0

**Throws:** {Error} If the operation fails or the request to the backend fails.


--------------------


### setCustomId

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Set a custom identifier for this Appareil.

This allows you to identify Appareils by your own custom ID (Utilisateur ID, Compte ID, etc.)
instead of or in addition to the Appareil's unique hardware ID. The custom ID is sent
to your Mise à jour server and can be used for:
- Targeting specific Utilisateurs for Mises à jour
- Analyse and Utilisateur tracking
- Débogage and Support (correlating Appareils with Utilisateurs)
- A/B Test or Fonctionnalité flagging

**Persistence:**
- When {@link PluginsConfig.CapacitorUpdater.persistCustomId} is `true`, the ID persists across app restarts
- When `false`, the ID is only kept for the current session

**Clearing the custom ID:**
- Pass an empty string `""` to remove any stored custom ID

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `SetCustomIdOptions` | The {@link SetCustomIdOptions} containing the custom identifier string. |

**Returns**

`Promise<void>` — Resolves immediately (synchronous operation).

**Since:** 4.9.0

**Throws:** {Error} If the operation fails.


--------------------


### getBuiltinVersion

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Get the builtin Bundle Version (the original Version shipped with your Natif Application).

This Retourne the Version of the Bundle that was included when the Application was installed
from the Application Store or Play Store. This is NOT the currently Actif Bundle Version -
use {@link current} for that.

Retourne:
- The {@link PluginsConfig.CapacitorUpdater.version} config value if set, or
- The Natif Application Version from platform configs (package.json, Info.plist, Construction.gradle)

Use this to:
- Display the "factory" Version to Utilisateurs
- Compare against downloaded Bundle versions
- Determine if any Mises à jour have been applied
- Débogage Version mismatches

**Returns**

`Promise<BuiltinVersion>` — The builtin bundle version string.

**Since:** 5.2.0


--------------------


### getDeviceId

```typescript
getDeviceId() => Promise<DeviceId>
```

Get the unique, privacy-friendly identifier for this Appareil.

This ID is used to identify the Appareil when communicating with Mise à jour servers.
It's automatically generated and stored securely by the plugin.

**Privacy & Security characteristics:**
- Generated as a UUID (not based on hardware identifiers)
- Stored securely in platform-specific secure storage
- Android: Android Keystore (persists across Application reinstalls on API 23+)
- iOS: Keychain with `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`
- Not synced to cloud (iOS)
- Follows Apple and Google privacy best practices
- Utilisateurs can clear it via system Paramètres (Android) or keychain access (iOS)

**Persistence:**
The Appareil ID persists across Application reinstalls to maintain consistent Appareil identity
for Mise à jour tracking and Analyse.

Use this to:
- Débogage Mise à jour delivery issues (Vérifier what ID the server sees)
- Implement Appareil-specific Fonctionnalités
- Correlate server Journaux with specific Appareils

**Returns**

`Promise<DeviceId>` — The unique device identifier string.

**Throws:** {Error} If the operation fails.


--------------------


### getPluginVersion

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Get the Version of the Capacitor Updater plugin installed in your Application.

This Retourne the Version of the Natif plugin code (Android/iOS), which is sent
to the Mise à jour server with each request. This is NOT your Application Version or Bundle Version.

Use this to:
- Débogage plugin-specific issues (when reporting bugs)
- Verify plugin Installation and Version
- Vérifier compatibility with backend Fonctionnalités
- Display in Débogage/À propos screens

**Returns**

`Promise<PluginVersion>` — The Capacitor Updater plugin version string.

**Throws:** {Error} If the operation fails.


--------------------


### isAutoUpdateEnabled

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Vérifier if automatic Mises à jour are currently enabled.

Returns `true` if {@link PluginsConfig.CapacitorUpdater.autoUpdate} is enabled,
meaning the plugin will automatically Vérifier for, Télécharger, and apply Mises à jour.

Returns `false` if in manual mode, where you control the update flow using
{@link getLatest}, {@link download}, {@link next}, and {@link set}.

Use this to:
- Determine which Mise à jour flow your Application is using
- Show/hide manual Mise à jour UI based on mode
- Débogage Mise à jour behavior

**Returns**

`Promise<AutoUpdateEnabled>` — `true` if auto-update is enabled, `false` if in manual mode.

**Throws:** {Error} If the operation fails.


--------------------


### removeAllListeners

```typescript
removeAllListeners() => Promise<void>
```

Retirer all event listeners registered for this plugin.

This unregisters all listeners added via {@link addListener} for all event types:
- `download`
- `noNeedUpdate`
- `updateAvailable`
- `downloadComplete`
- `downloadFailed`
- `breakingAvailable` / `majorAvailable`
- `updateFailed`
- `appReloaded`
- `appReady`

Use this during cleanup (e.g., when unmounting components or closing screens)
to prevent memory leaks from lingering event listeners.

**Returns**

`Promise<void>` — Resolves when all listeners are removed.

**Since:** 1.0.0


--------------------


### addListener('Télécharger')

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Bundle Télécharger event in the Application. Fires once a Télécharger has started, during downloading and when finished.
This will return you all Télécharger percent during the Télécharger

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'download'` |  |
| `listenerFunc` | `(state: DownloadEvent) => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 2.0.11


--------------------


### addListener('noNeedUpdate')

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Listen for no need to Mise à jour event, useful when you want force Vérifier every time the Application is launched

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'noNeedUpdate'` |  |
| `listenerFunc` | `(state: NoNeedEvent) => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 4.0.0


--------------------


### addListener('updateAvailable')

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Disponible Mise à jour event, useful when you want to force Vérifier every time the Application is launched

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'updateAvailable'` |  |
| `listenerFunc` | `(state: UpdateAvailableEvent) => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 4.0.0


--------------------


### addListener('downloadComplete')

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Listen for downloadComplete events.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'downloadComplete'` |  |
| `listenerFunc` | `(state: DownloadCompleteEvent) => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 4.0.0


--------------------


### addListener('breakingAvailable')

```typescript
addListener(eventName: 'breakingAvailable', listenerFunc: (state: BreakingAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Listen for breaking Mise à jour events when the backend flags an Mise à jour as incompatible with the current Application.
Emits the same payload as the legacy `majorAvailable` listener.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'breakingAvailable'` |  |
| `listenerFunc` | `(state: MajorAvailableEvent) => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 7.22.0


--------------------


### addListener('majorAvailable')

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Major Mise à jour event in the Application, let you know when major Mise à jour is blocked by setting disableAutoUpdateBreaking

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'majorAvailable'` |  |
| `listenerFunc` | `(state: MajorAvailableEvent) => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 2.3.0


--------------------


### addListener('updateFailed')

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Mise à jour fail event in the Application, let you know when Mise à jour has fail to Installer at Suivant Application Démarrer

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'updateFailed'` |  |
| `listenerFunc` | `(state: UpdateFailedEvent) => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 2.3.0


--------------------


### addListener('downloadFailed')

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Télécharger fail event in the Application, let you know when a Bundle Télécharger has Échoué

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'downloadFailed'` |  |
| `listenerFunc` | `(state: DownloadFailedEvent) => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 4.0.0


--------------------


### addListener('appReloaded')

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Listen for reload event in the Application, let you know when reload has happened

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'appReloaded'` |  |
| `listenerFunc` | `() => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 4.3.0


--------------------


### addListener('appReady')

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Application ready event in the Application, let you know when Application is ready to use, this event is retain till consumed.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'appReady'` |  |
| `listenerFunc` | `(state: AppReadyEvent) => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 5.1.0


--------------------


### addListener('channelPrivate')

```typescript
addListener(eventName: 'channelPrivate', listenerFunc: (state: ChannelPrivateEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Canal private event, fired when attempting to set a Canal that doesn't allow Appareil self-assignment.

This event is useful for:
- Informing Utilisateurs they don't have permission to switch to a specific Canal
- Implementing custom Erreur handling for Canal restrictions
- Logging unauthorized Canal access attempts

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `'channelPrivate'` |  |
| `listenerFunc` | `(state: ChannelPrivateEvent) => void` |  |

**Returns**

`Promise<PluginListenerHandle>`

**Since:** 7.34.0


--------------------


### isAutoUpdateAvailable

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Vérifier if the auto-Mise à jour Fonctionnalité is Disponible (not disabled by custom server Configuration).

Returns `false` when a custom `updateUrl` is configured, as this typically indicates
you're using a self-hosted Mise à jour server that may not Support all auto-Mise à jour Fonctionnalités.

Returns `true` when using the default Capgo backend or when the feature is available.

This is different from {@link isAutoUpdateEnabled}:
- `isAutoUpdateEnabled()`: Checks if auto-update MODE is turned on/off
- `isAutoUpdateAvailable()`: Checks if auto-update is SUPPORTED with your current configuration

**Returns**

`Promise<AutoUpdateAvailable>` — `false` when custom updateUrl is set, `true` otherwise.

**Throws:** {Error} If the operation fails.


--------------------


### getNextBundle

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Get Information À propos the Bundle queued to be activated on Suivant reload.

Retourne:
- {@link BundleInfo} object if a bundle has been queued via {@link next}
- `null` if no update is pending

This is useful to:
- Vérifier if an Mise à jour is waiting to be applied
- Display "Mise à jour En attente" status to Utilisateurs
- Show Version Info of the queued Mise à jour
- Decide whether to show a "Redémarrer to Mise à jour" prompt

The queued Bundle will be activated when:
- The Application is backgrounded (default behavior)
- The Application is killed and restarted
- {@link reload} is called manually
- Delay conditions set by {@link setMultiDelay} are met

**Returns**

`Promise<BundleInfo | null>` — The pending bundle info, or `null` if none is queued.

**Since:** 6.8.0

**Throws:** {Error} If the operation fails.


--------------------


### getFailedUpdate

```typescript
getFailedUpdate() => Promise<UpdateFailedEvent | null>
```

Retrieve Information À propos the most recent Bundle that Échoué to load.

When a Bundle fails to load (e.g., JavaScript errors prevent Initialisation, missing files),
the plugin automatically rolls Retour and stores Information À propos the failure. This method
retrieves that failure Information.

**IMPORTANT: The stored value is cleared after being retrieved once.**
Calling this method multiple times will only return the failure Info on the first call,
then `null` on subsequent calls until another failure occurs.

Retourne:
- {@link UpdateFailedEvent} with bundle info if a failure was recorded
- `null` if no failure has occurred or if it was already retrieved

Use this to:
- Show Utilisateurs why an Mise à jour Échoué
- Journal failure Information for Débogage
- Implement custom Erreur handling/reporting
- Display Restauration notifications

**Returns**

`Promise<UpdateFailedEvent | null>` — The failed update info (cleared after first retrieval), or `null`.

**Since:** 7.22.0

**Throws:** {Error} If the operation fails.


--------------------


### setShakeMenu

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Activer or Désactiver the shake gesture menu for Débogage and Test.

When enabled, Utilisateurs can shake their Appareil to open a Débogage menu that shows:
- Current Bundle Information
- Disponible Bundles
- Options to switch Bundles manually
- Mise à jour status

This is useful during Développement and Test to:
- Quickly Test different Bundle versions
- Débogage Mise à jour flows
- Switch between Production and Test Bundles
- Verify Bundle installations

**Important:** Disable this in production builds or only enable for internal testers.

Can also be configured via {@link PluginsConfig.CapacitorUpdater.shakeMenu}.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `SetShakeMenuOptions` |  |

**Returns**

`Promise<void>` — Resolves when the setting is applied.

**Since:** 7.5.0

**Throws:** {Error} If the operation fails.


--------------------


### isShakeMenuEnabled

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Vérifier if the shake gesture Débogage menu is currently enabled.

Retourne the current state of the shake menu Fonctionnalité that can be toggled via
{@link setShakeMenu} or configured via {@link PluginsConfig.CapacitorUpdater.shakeMenu}.

Use this to:
- Vérifier if Débogage Fonctionnalités are enabled
- Show/hide Débogage Paramètres UI
- Verify Configuration during Test

**Returns**

`Promise<ShakeMenuEnabled>` — Object with `enabled: true` or `enabled: false`.

**Since:** 7.5.0

**Throws:** {Error} If the operation fails.


--------------------


### getAppId

```typescript
getAppId() => Promise<GetAppIdRes>
```

Get the currently configured Application ID used for Mise à jour server communication.

Retourne the Application ID that identifies this Application to the Mise à jour server. This can be:
- The value set via {@link setAppId}, or
- The {@link PluginsConfig.CapacitorUpdater.appId} config value, or
- The default Application identifier from your Natif Application Configuration

Use this to:
- Verify which Application ID is being used for Mises à jour
- Débogage Mise à jour delivery issues
- Display Application Configuration in Débogage screens
- Confirm App ID after calling {@link setAppId}

**Returns**

`Promise<GetAppIdRes>` — Object containing the current `appId` string.

**Since:** 7.14.0

**Throws:** {Error} If the operation fails.


--------------------


### setAppId

```typescript
setAppId(options: SetAppIdOptions) => Promise<void>
```

Dynamically change the Application ID used for Mise à jour server communication.

This overrides the Application ID used to identify your Application to the Mise à jour server, allowing you
to switch between different Application configurations at runtime (e.g., Production vs staging
Application IDs, or multi-tenant configurations).

**Requirements:**
- {@link PluginsConfig.CapacitorUpdater.allowModifyAppId} must be set to `true`

**Important considerations:**
- Changing the Application ID will affect which Mises à jour this Appareil receives
- The Nouveau Application ID must exist on your Mise à jour server
- This is primarily for advanced use cases (multi-tenancy, environment switching)
- Most apps should use the config-based {@link PluginsConfig.CapacitorUpdater.appId} instead

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `SetAppIdOptions` |  |

**Returns**

`Promise<void>` — Resolves when the App ID is successfully changed.

**Since:** 7.14.0

**Throws:** {Error} If `allowModifyAppId` is false or the operation fails.


--------------------


</docgen-api>
