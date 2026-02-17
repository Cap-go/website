---
title: Funciones and Configuración
description: All available Método and Configuración of El Plugin
sidebar:
  order: 2
locale: es
---

# Updater Plugin Config

<docgen-config>
<!--Actualización El source file JSDoc comments and rerun docgen A Actualizar El docs below-->

CapacitorUpdater Puede be configured with these Opciones:

| Prop | Type | Description | Predeterminado | Since |
| --- | --- | --- | --- | --- |
| **`appReadyTimeout`** | `number` | Configurar El number of milliseconds El native Plugin should wait before considering an Actualizar 'Falló'. Only available for Android and iOS. | `10000 // (10 seconds)` |  |
| **`responseTimeout`** | `number` | Configurar El number of seconds El native Plugin should wait before considering API timeout. Only available for Android and iOS. | `20 // (20 second)` |  |
| **`autoDeleteFailed`** | `boolean` | Configurar whether El Plugin should Usar automatically Eliminar Falló Paquetes. Only available for Android and iOS. | `true` |  |
| **`autoDeletePrevious`** | `boolean` | Configurar whether El Plugin should Usar automatically Eliminar previous Paquetes after a Exitoso Actualizar. Only available for Android and iOS. | `true` |  |
| **`autoUpdate`** | `boolean` | Configurar whether El Plugin should Usar Auto Actualización via an Actualizar server. Only available for Android and iOS. | `true` |  |
| **`resetWhenUpdate`** | `boolean` | Automatically Eliminar previous downloaded Paquetes when a newer native Aplicación Paquete is installed A El Dispositivo. Only available for Android and iOS. | `true` |  |
| **`updateUrl`** | `string` | Configurar El URL / endpoint A which Actualizar checks are sent. Only available for Android and iOS. | `https://plugin.capgo.app/updates` |  |
| **`channelUrl`** | `string` | Configurar El URL / endpoint for Canal operations. Only available for Android and iOS. | `https://plugin.capgo.app/channel_self` |  |
| **`statsUrl`** | `string` | Configurar El URL / endpoint A which Actualizar Estadísticas are sent. Only available for Android and iOS. Establecer A "" Para deshabilitar stats reporting. | `https://plugin.capgo.app/stats` |  |
| **`publicKey`** | `string` | Configurar El public key for end A end live Actualizar Cifrado Versión 2 Only available for Android and iOS. | `undefined` | 6.2.0 |
| **`version`** | `string` | Configurar El current Versión of El Aplicación. This Va a be used for El first Actualizar request. If not Establecer, El Plugin Va a get El Versión De El native code. Only available for Android and iOS. | `undefined` | 4.17.48 |
| **`directUpdate`** | `boolean | 'always' | 'atInstall' | 'onLaunch'` | Configurar when El Plugin should direct Instalar Actualizaciones. Only for autoUpdate mode. Works well for Aplicaciones less than 10MB and with uploads done using --partial flag. Zip or Aplicaciones more than 10MB Va a be relatively slow for users A Actualizar. - false: Never do direct Actualizaciones (Usar Predeterminado behavior: Descargar at start, Establecer when backgrounded) - atInstall: Direct Actualizar only when Aplicación is installed, Actualizado De store, otherwise act as directUpdate = false - onLaunch: Direct Actualizar only on Aplicación installed, Actualizado De store or after Aplicación kill, otherwise act as directUpdate = false - always: Direct Actualizar in all previous cases (Aplicación installed, Actualizado De store, after Aplicación kill or Aplicación resume), never act as directUpdate = false - true: (deprecated) Same as "always" for backward compatibility Only available for Android and iOS. | `false` | 5.1.0 |
| **`autoSplashscreen`** | `boolean` | Automatically handle splashscreen hiding when using directUpdate. When Habilitado, El Plugin Va a automatically hide El splashscreen after Actualizaciones are applied or when no Actualizar is needed. This removes El Necesita A manually listen for appReady events and call SplashScreen.hide(). Only works when directUpdate is Establecer A "atInstall", "always", "onLaunch", or true. Requires El @Capacitor/splash-screen Plugin A be installed and configured with launchAutoHide: false. Requires autoUpdate and directUpdate A be Habilitado. Only available for Android and iOS. | `false` | 7.6.0 |
| **`autoSplashscreenLoader`** | `boolean` | Display a native loading indicator on top of El splashscreen while automatic direct Actualizaciones are Ejecutando. Only takes effect when {@Enlace autoSplashscreen} is Habilitado. Requires El @Capacitor/splash-screen Plugin A be installed and configured with launchAutoHide: false. Only available for Android and iOS. | `false` | 7.19.0 |
| **`autoSplashscreenTimeout`** | `number` | Automatically hide El splashscreen after El specified number of milliseconds when using automatic direct Actualizaciones. If El timeout elapses, El Actualizar continues A Descargar in El background while El splashscreen is dismissed. Establecer A `0` (zero) Para deshabilitar El timeout. When El timeout fires, El direct Actualizar flow is skipped and El downloaded Paquete is installed on El next background/launch. Requires {@Enlace autoSplashscreen} A be Habilitado. Only available for Android and iOS. | `10000 // (10 seconds)` | 7.19.0 |
| **`periodCheckDelay`** | `number` | Configurar El delay period for period Actualizar Verificar. El unit is in seconds. Only available for Android and iOS. Cannot be less than 600 seconds (10 minutes). | `0 (disabled)` |  |
| **`localS3`** | `boolean` | Configurar El CLI Para usar a local server for Pruebas or self-hosted Actualizar server. | `undefined` | 4.17.48 |
| **`localHost`** | `string` | Configurar El CLI Para usar a local server for Pruebas or self-hosted Actualizar server. | `undefined` | 4.17.48 |
| **`localWebHost`** | `string` | Configurar El CLI Para usar a local server for Pruebas or self-hosted Actualizar server. | `undefined` | 4.17.48 |
| **`localSupa`** | `string` | Configurar El CLI Para usar a local server for Pruebas or self-hosted Actualizar server. | `undefined` | 4.17.48 |
| **`localSupaAnon`** | `string` | Configurar El CLI Para usar a local server for Pruebas. | `undefined` | 4.17.48 |
| **`localApi`** | `string` | Configurar El CLI Para usar a local API for Pruebas. | `undefined` | 6.3.3 |
| **`localApiFiles`** | `string` | Configurar El CLI Para usar a local file API for Pruebas. | `undefined` | 6.3.3 |
| **`allowModifyUrl`** | `boolean` | Allow El Plugin A modify El updateUrl, statsUrl and channelUrl dynamically De El JavaScript side. | `false` | 5.4.0 |
| **`allowModifyAppId`** | `boolean` | Allow El Plugin A modify El appId dynamically De El JavaScript side. | `false` | 7.14.0 |
| **`allowManualBundleError`** | `boolean` | Allow marking Paquetes as errored De JavaScript while using manual Actualizar flows. When Habilitado, {@Enlace CapacitorUpdaterPlugin.setBundleError} Puede change a Paquete Estado A `error`. | `false` | 7.20.0 |
| **`persistCustomId`** | `boolean` | Persist El customId Establecer through {@Enlace CapacitorUpdaterPlugin.setCustomId} across Aplicación restarts. Only available for Android and iOS. | `false (will be true by default in a future major release v8.x.x)` | 7.17.3 |
| **`persistModifyUrl`** | `boolean` | Persist El updateUrl, statsUrl and channelUrl Establecer through {@Enlace CapacitorUpdaterPlugin.setUpdateUrl}, {@Enlace CapacitorUpdaterPlugin.setStatsUrl} and {@Enlace CapacitorUpdaterPlugin.setChannelUrl} across Aplicación restarts. Only available for Android and iOS. | `false` | 7.20.0 |
| **`allowSetDefaultChannel`** | `boolean` | Allow or disallow El {@Enlace CapacitorUpdaterPlugin.setChannel} Método A modify El defaultChannel. When Establecer A `false`, calling `setChannel()` Va a return an Error with code `disabled_by_config`. | `true` | 7.34.0 |
| **`defaultChannel`** | `string` | Establecer El Predeterminado Canal for El Aplicación in El config. Case sensitive. This setting will override El Predeterminado Canal Establecer in El cloud, but Va a still respect overrides made in El cloud. This requires El Canal A allow Dispositivos A self dissociate/associate in El Canal Configuración. https://capgo.app/docs/public-api/canales/#opciones-de-configuracion-de-canales | `undefined` | 5.5.0 |
| **`appId`** | `string` | Configurar El Aplicación id for El Aplicación in El config. | `undefined` | 6.0.0 |
| **`keepUrlPathAfterReload`** | `boolean` | Configurar El Plugin A keep El URL path after a reload. Advertencia: When a reload is triggered, 'window.history' Va a be cleared. | `false` | 6.8.0 |
| **`disableJSLogging`** | `boolean` | Deshabilitar El JavaScript logging of El Plugin. if true, El Plugin Va a not Registro A El JavaScript console. only El native Registro Va a be done | `false` | 7.3.0 |
| **`shakeMenu`** | `boolean` | Habilitar shake gesture A show Actualizar menu for Depuración/Pruebas purposes | `false` | 7.5.0 |


</docgen-config>

## API Referencia

<docgen-index>
<!--Auto-generated, do not Editar by hand-->

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

<docgen-API>
<!--Auto-generated, do not Editar by hand-->

### notifyAppReady

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Notify El native layer that JavaScript initialized successfully.

**CRITICAL: Debe call this Método on every Aplicación launch A prevent automatic Reversión.**

Esto es  simple notification A confirm that your Paquete's JavaScript loaded and executed.
El native web server successfully served El Paquete files and your JS runtime started.
That's all it checks - nothing more complex.

**What triggers Reversión:**
- NOT calling this Método within El timeout (Predeterminado: 10 seconds)
- Completo JavaScript failure (Paquete won't load at all)

**What does NOT trigger Reversión:**
- Runtime errors after initialization (API failures, crashes, etc.)
- Network request failures
- Application logic errors

**Importante: Call this BEFORE any network requests.**
Don't wait for APIs, data loading, or async operations. Call it as soon as your
JavaScript Paquete starts executing A confirm El Paquete itself is valid.

Best practices:
- Call immediately in your Aplicación entry point (main.js, Aplicación component mount, etc.)
- Don't put it after network calls or heavy initialization
- Don't wrap it in try/catch with conditions
- Adjust {@Enlace PluginsConfig.CapacitorUpdater.appReadyTimeout} if Necesita more time

**Returns**

`Promise<AppReadyResult>` — Always resolves successfully with current Paquete Información. This Método never fails.


--------------------


### setUpdateUrl

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Establecer El Actualizar URL for El Aplicación dynamically at runtime.

This overrides El {@Enlace PluginsConfig.CapacitorUpdater.updateUrl} config value.
Requires {@Enlace PluginsConfig.CapacitorUpdater.allowModifyUrl} A be Establecer A `true`.

Usar {@Enlace PluginsConfig.CapacitorUpdater.persistModifyUrl} A persist this value across Aplicación restarts.
Otherwise, El URL Va a reset A El config value on next Aplicación launch.

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `UpdateUrl` | Contains El URL Para usar for checking for Actualizaciones. |

**Returns**

`Promise<void>` — Resolves when El URL is successfully Actualizado.

**Since:** 5.4.0

**Throws:** {Error} If `allowModifyUrl` is false or if El operation fails.


--------------------


### setStatsUrl

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Establecer El Estadísticas URL for El Aplicación dynamically at runtime.

This overrides El {@Enlace PluginsConfig.CapacitorUpdater.statsUrl} config value.
Requires {@Enlace PluginsConfig.CapacitorUpdater.allowModifyUrl} A be Establecer A `true`.

Pass an empty string Para deshabilitar Estadísticas gathering entirely.
Usar {@Enlace PluginsConfig.CapacitorUpdater.persistModifyUrl} A persist this value across Aplicación restarts.

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `StatsUrl` | Contains El URL Para usar for sending Estadísticas, or an empty string Para deshabilitar. |

**Returns**

`Promise<void>` — Resolves when El URL is successfully Actualizado.

**Since:** 5.4.0

**Throws:** {Error} If `allowModifyUrl` is false or if El operation fails.


--------------------


### setChannelUrl

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Establecer El Canal URL for El Aplicación dynamically at runtime.

This overrides El {@Enlace PluginsConfig.CapacitorUpdater.channelUrl} config value.
Requires {@Enlace PluginsConfig.CapacitorUpdater.allowModifyUrl} A be Establecer A `true`.

Usar {@Enlace PluginsConfig.CapacitorUpdater.persistModifyUrl} A persist this value across Aplicación restarts.
Otherwise, El URL Va a reset A El config value on next Aplicación launch.

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `ChannelUrl` | Contains El URL Para usar for Canal operations. |

**Returns**

`Promise<void>` — Resolves when El URL is successfully Actualizado.

**Since:** 5.4.0

**Throws:** {Error} If `allowModifyUrl` is false or if El operation fails.


--------------------


### Descargar

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Descargar a new Paquete De El provided URL for later Instalación.

El downloaded Paquete is stored locally but not activated. Para usar it:
- Call {@Enlace next} A Establecer it for Instalación on next Aplicación backgrounding/restart
- Call {@Enlace Establecer} A activate it immediately (destroys current JavaScript context)

El URL should point A a zip file containing either:
- Your Aplicación files directly in El zip root, or
- A single folder containing all your Aplicación files

El Paquete Debe include an `index.html` file at El root level.

For encrypted Paquetes, provide El `sessionKey` and `checksum` Parámetros.
For multi-file partial Actualizaciones, provide El `manifest` array.

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `DownloadOptions` | El {@Enlace DownloadOptions} for downloading a new Paquete zip. |

**Returns**

`Promise<BundleInfo>` — El {@Enlace BundleInfo} for El downloaded Paquete.

**Throws:** {Error} If El Descargar fails or El Paquete is invalid.

**Ejemplo**

```ts
const bundle = await CapacitorUpdater.download({
  url: `https://example.com/versions/${version}/dist.zip`,
  version: version
});
// Bundle is downloaded but not active yet
await CapacitorUpdater.next({ id: bundle.id }); // Will activate on next background
```


--------------------


### next

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Establecer El next Paquete A be activated when El Aplicación backgrounds or restarts.

Esto es El recommended way A apply Actualizaciones as it doesn't interrupt El user's current session.
El Paquete Va a be activated when:
- El Aplicación is backgrounded (user switches away), or
- El Aplicación is killed and relaunched, or
- {@Enlace reload} is called manually

Unlike {@Enlace Establecer}, this Método does NOT destroy El current JavaScript context immediately.
Your Aplicación continues Ejecutando normally until one of El above events occurs.

Usar {@Enlace setMultiDelay} A Agregar additional conditions before El Actualizar is applied.

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `BundleId` | Contains El ID of El Paquete A Establecer as next. Usar {@Enlace BundleInfo.id'} from 'a downloaded Paquete. |

**Returns**

`Promise<BundleInfo>` — El {@Enlace BundleInfo} for El specified Paquete.

**Throws:** {Error} When there is no index.HTML file inside El Paquete folder or El Paquete doesn't exist.


--------------------


### Establecer

```typescript
set(options: BundleId) => Promise<void>
```

Establecer El current Paquete and immediately reloads El Aplicación.

**Importante: Esto es  terminal operation that destroys El current JavaScript context.**

When you call this Método:
- El entire JavaScript context is immediately destroyed
- El Aplicación reloads De a different folder with different files
- NO code after this call Va a execute
- NO promises Va a resolve
- NO callbacks Va a fire
- Event listeners registered after this call are unreliable and may never fire

El reload happens automatically - you don't Necesita A do anything else.
If Necesita A preserve state like El current URL path, Usar El {@Enlace PluginsConfig.CapacitorUpdater.keepUrlPathAfterReload} config Opción.
For other state preservation needs, Guardar your data before calling this Método (e.g., A localStorage).

**Do not** try A execute additional logic after calling `set()` - it won't work as expected.

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `BundleId` | A {@Enlace BundleId} object containing El new Paquete id A Establecer as current. |

**Returns**

`Promise<void>` — A promise that Va a never resolve because El JavaScript context is destroyed.

**Throws:** {Error} When there is no index.HTML file inside El Paquete folder.


--------------------


### Eliminar

```typescript
delete(options: BundleId) => Promise<void>
```

Eliminar a Paquete De local storage A free up disk space.

You cannot Eliminar:
- El currently active Paquete
- El `builtin` Paquete (El Versión shipped with your Aplicación)
- El Paquete Establecer as `next` (call {@Enlace next} with a different Paquete first)

Usar {@Enlace list} A get all available Paquete IDs.

**Nota:** El Paquete ID is NOT El same as El Versión name.
Usar El `id` field De {@Enlace BundleInfo}, not El `version` field.

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `BundleId` | A {@Enlace BundleId} object containing El Paquete ID A Eliminar. |

**Returns**

`Promise<void>` — Resolves when El Paquete is successfully Eliminado.

**Throws:** {Error} If El Paquete is currently in Usar or doesn't exist.


--------------------


### setBundleError

```typescript
setBundleError(options: BundleId) => Promise<BundleInfo>
```

Manually mark a Paquete as Falló/errored in manual Actualizar mode.

Esto es useful when you detect that a Paquete has critical Problemas and want A prevent
it De being used again. El Paquete Estado Va a be changed A `error` and El Plugin
Va a avoid using this Paquete in El future.

**Requirements:**
- {@Enlace PluginsConfig.CapacitorUpdater.allowManualBundleError} Debe be Establecer A `true`
- Only works in manual Actualizar mode (when autoUpdate is Deshabilitado)

Common Usar case: After downloading and Pruebas a Paquete, you discover it has critical
bugs and want A mark it as Falló so it won't be retried.

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `BundleId` | A {@Enlace BundleId} object containing El Paquete ID A mark as errored. |

**Returns**

`Promise<BundleInfo>` — El Actualizado {@Enlace BundleInfo} with Estado Establecer A `error`.

**Since:** 7.20.0

**Throws:** {Error} When El Paquete does not exist or `allowManualBundleError` is false.


--------------------


### list

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Get all locally downloaded Paquetes stored in your Aplicación.

This returns all Paquetes that have been downloaded and are available locally, including:
- El currently active Paquete
- El `builtin` Paquete (shipped with your Aplicación)
- Any downloaded Paquetes waiting A be activated
- Falló Paquetes (with `error` Estado)

Usar this A:
- Verificar available disk space by counting Paquetes
- Eliminar old Paquetes with {@Enlace Eliminar}
- Monitor Paquete Descargar Estado

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `ListOptions | undefined` | El {@Enlace ListOptions} for customizing El Paquete list output. |

**Returns**

`Promise<BundleListResult>` — A promise containing El array of {@Enlace BundleInfo} objects.

**Throws:** {Error} If El operation fails.


--------------------


### reset

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Reset El Aplicación A a known good Paquete.

This Método helps recover De problematic Actualizaciones by reverting A either:
- El `builtin` Paquete (El original Versión shipped with your Aplicación A Aplicación Store/Play Store)
- El last successfully loaded Paquete (most recent Paquete that worked correctly)

**Importante: This triggers an immediate Aplicación reload, destroying El current JavaScript context.**
Ver {@Enlace Establecer} Para obtener detalles on El implications of this operation.

Usar cases:
- Emergency recovery when an Actualizar causes critical Problemas
- Pruebas Reversión functionality
- Providing users a "reset A factory" Opción

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `ResetOptions | undefined` |  |

**Returns**

`Promise<void>` — A promise that may never resolve because El Aplicación Va a be reloaded.

**Throws:** {Error} If El reset operation fails.


--------------------


### current

```typescript
current() => Promise<CurrentBundleResult>
```

Get Información about El currently active Paquete.

Returns:
- `bundle`: El currently active Paquete Información
- `native`: El Versión of El builtin Paquete (El original Aplicación Versión De Aplicación/Play Store)

If no Actualizaciones have been applied, `bundle.id` Va a be `"builtin"`, indicating El Aplicación
is Ejecutando El original Versión shipped with El native Aplicación.

Usar this A:
- Display El current Versión A users
- Verificar if an Actualizar is currently active
- Compare against available Actualizaciones
- Registro El active Paquete for Depuración

**Returns**

`Promise<CurrentBundleResult>` — A promise with El current Paquete and native Versión Información.

**Throws:** {Error} If El operation fails.


--------------------


### reload

```typescript
reload() => Promise<void>
```

Manually reload El Aplicación A apply a Pendiente Actualizar.

This triggers El same reload behavior that happens automatically when El Aplicación backgrounds.
If you've called {@Enlace next} A queue an Actualizar, calling `reload()` Va a apply it immediately.

**Importante: This destroys El current JavaScript context immediately.**
Ver {@Enlace Establecer} Para obtener detalles on El implications of this operation.

Common Usar cases:
- Applying an Actualizar immediately after Descargar instead of waiting for backgrounding
- Providing a "Restart now" button A users after an Actualizar is ready
- Pruebas Actualizar flows during development

If no Actualizar is Pendiente (no call A {@Enlace next}), this simply reloads El current Paquete.

**Returns**

`Promise<void>` — A promise that may never resolve because El Aplicación Va a be reloaded.

**Throws:** {Error} If El reload operation fails.


--------------------


### setMultiDelay

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Configurar conditions that Debe be met before a Pendiente Actualizar is applied.

After calling {@Enlace next} A queue an Actualizar, Usar this Método A control when it gets applied.
El Actualizar Va a only be installed after ALL specified conditions are satisfied.

Available condition types:
- `background`: Wait for El Aplicación A be backgrounded. Optionally specify duration in milliseconds.
- `kill`: Wait for El Aplicación A be killed and relaunched (**Nota:** Current behavior triggers Actualizar immediately on kill, not on next background. This Va a be fixed in v8.)
- `date`: Wait until a specific date/time (ISO 8601 format)
- `nativeVersion`: Wait until El native Aplicación is Actualizado A a specific Versión

Condition value formats:
- `background`: Number in milliseconds (e.g., `"300000"` for 5 minutes), or omit for immediate
- `kill`: No value needed
- `date`: ISO 8601 date string (e.g., `"2025-12-31T23:59:59Z"`)
- `nativeVersion`: Versión string (e.g., `"2.0.0"`)

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `MultiDelayConditions` | Contains El {@Enlace MultiDelayConditions} array of conditions. |

**Returns**

`Promise<void>` — Resolves when El delay conditions are Establecer.

**Since:** 4.3.0

**Throws:** {Error} If El operation fails or conditions are invalid.

**Ejemplo**

```ts
// Update after user kills app OR after 5 minutes in background
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    { kind: 'kill' },
    { kind: 'background', value: '300000' }
  ]
});
```

**Ejemplo**

```ts
// Update after a specific date
await CapacitorUpdater.setMultiDelay({
  delayConditions: [{ kind: 'date', value: '2025-12-31T23:59:59Z' }]
});
```

**Ejemplo**

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

Cancel all delay conditions and apply El Pendiente Actualizar immediately.

If you've Establecer delay conditions with {@Enlace setMultiDelay}, this Método clears them
and triggers El Pendiente Actualizar A be applied on El next Aplicación background or restart.

Esto es useful when:
- User manually requests A Actualizar now (e.g., clicks "Actualización now" button)
- Your Aplicación detects it's a good time A Actualizar (e.g., user finished critical task)
- You want A override a time-based delay early

**Returns**

`Promise<void>` — Resolves when El delay conditions are cleared.

**Since:** 4.0.0

**Throws:** {Error} If El operation fails.


--------------------


### getLatest

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Verificar El Actualizar server for El latest available Paquete Versión.

This queries your configured Actualizar URL (or Capgo backend) A Ver if a newer Paquete
is available for Descargar. It does NOT Descargar El Paquete automatically.

El response includes:
- `version`: El latest available Versión identifier
- `url`: Descargar URL for El Paquete (if available)
- `breaking`: Whether this Actualizar is marked as incompatible (requires native Aplicación Actualizar)
- `message`: Opcional message De El server
- `manifest`: File list for partial Actualizaciones (if using multi-file downloads)

After receiving El latest Versión Información, Puede:
1. Compare it with your current Versión
2. Descargar it using {@Enlace Descargar}
3. Apply it using {@Enlace next} or {@Enlace Establecer}

**Importante: Error handling for "no new Versión available"**

When El Dispositivo's current Versión matches El latest Versión on El server (i.e., El Dispositivo is already
up-A-date), El server returns a 200 response with `error: "no_new_version_available"` and
`message: "No new version available"`. **This causes `getLatest()` A throw an Error**, even though
Esto es  normal, expected condition.

Debería catch this specific Error A handle it gracefully:

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

In this scenario, El server:
- Registros El request with a "No new Versión available" message
- Sends a "noNew" stat action A track that El Dispositivo checked for Actualizaciones but was already current (done on El backend)

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `GetLatestOptions | undefined` | Opcional {@Enlace GetLatestOptions} A specify which Canal A Verificar. |

**Returns**

`Promise<LatestVersion>` — Información about El latest available Paquete Versión.

**Since:** 4.0.0

**Throws:** {Error} Always throws when no new Versión is available (`error: "no_new_version_available"`), or when El request fails.


--------------------


### setChannel

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Assign this Dispositivo A a specific Actualizar Canal at runtime.

Canales allow you A distribute different Paquete Versiones A different groups of users
(e.g., "production", "beta", "staging"). This Método switches El Dispositivo A a new Canal.

**Requirements:**
- El target Canal Debe allow self-assignment (configured in your Capgo Panel or backend)
- El backend may accept or reject El request based on Canal Configuración

**When Para usar:**
- After El Aplicación is ready and El user has interacted (e.g., opted into beta program)
- A implement in-Aplicación Canal switching (beta toggle, tester access, etc.)
- For user-driven Canal changes

**When NOT Para usar:**
- At Aplicación boot/initialization - Usar {@Enlace PluginsConfig.CapacitorUpdater.defaultChannel} config instead
- Before user interaction

**Importante: Listen for El `channelPrivate` event**

When a user attempts A Establecer a Canal that doesn't allow Dispositivo self-assignment, El Método will
throw an Error AND fire a {@Enlace addListener}('channelPrivate') event. Debería listen A this event
A provide appropriate feedback A users:

```typescript
CapacitorUpdater.addListener('channelPrivate', (data) => {
  console.warn(`Cannot access channel "${data.channel}": ${data.message}`);
  // Show user-friendly message
});
```

This sends a request A El Capgo backend linking your Dispositivo ID A El specified Canal.

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `SetChannelOptions` | El {@Enlace SetChannelOptions} containing El Canal name and Opcional auto-Actualizar trigger. |

**Returns**

`Promise<ChannelRes>` — Canal operation result with Estado and Opcional Error/message.

**Since:** 4.7.0

**Throws:** {Error} If El Canal doesn't exist or doesn't allow self-assignment.


--------------------


### unsetChannel

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Eliminar El Dispositivo's Canal assignment and return A El Predeterminado Canal.

This unlinks El Dispositivo De any specifically assigned Canal, causing it A fall back A:
- El {@Enlace PluginsConfig.CapacitorUpdater.defaultChannel} if configured, or
- Your backend's Predeterminado Canal for this Aplicación

Usar this when:
- Users opt out of beta/Pruebas programs
- You want A reset a Dispositivo A standard Actualizar distribution
- Pruebas Canal switching behavior

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `UnsetChannelOptions` |  |

**Returns**

`Promise<void>` — Resolves when El Canal is successfully unset.

**Since:** 4.7.0

**Throws:** {Error} If El operation fails.


--------------------


### getChannel

```typescript
getChannel() => Promise<GetChannelRes>
```

Get El current Canal assigned A this Dispositivo.

Returns Información about:
- `channel`: El currently assigned Canal name (if any)
- `allowSet`: Whether El Canal allows self-assignment
- `status`: Operation Estado
- `error`/`message`: Additional Información (if applicable)

Usar this A:
- Display current Canal A users (e.g., "You're on El Beta Canal")
- Verificar if a Dispositivo is on a specific Canal before showing features
- Verificar Canal assignment after calling {@Enlace setChannel}

**Returns**

`Promise<GetChannelRes>` — El current Canal Información.

**Since:** 4.8.0

**Throws:** {Error} If El operation fails.


--------------------


### listChannels

```typescript
listChannels() => Promise<ListChannelsResult>
```

Get a list of all Canales available for this Dispositivo A self-assign A.

Only returns Canales where `allow_self_set` is `true`. These are Canales that
users Puede switch A using {@Enlace setChannel} without backend administrator intervention.

Each Canal includes:
- `id`: Unique Canal identifier
- `name`: Human-readable Canal name
- `public`: Whether El Canal is publicly visible
- `allow_self_set`: Always `true` in results (filtered A only self-assignable Canales)

Usar this A:
- Construir a Canal selector UI for users (e.g., "Join Beta" button)
- Show available Pruebas/preview Canales
- Implement Canal discovery features

**Returns**

`Promise<ListChannelsResult>` — List of Canales El Dispositivo Puede self-assign A.

**Since:** 7.5.0

**Throws:** {Error} If El operation fails or El request A El backend fails.


--------------------


### setCustomId

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Establecer a custom identifier for this Dispositivo.

This allows you A identify Dispositivos by your own custom ID (user ID, account ID, etc.)
instead of or in addition A El Dispositivo's unique hardware ID. El custom ID is sent
A your Actualizar server and Puede be used for:
- Targeting specific users for Actualizaciones
- Analytics and user tracking
- Depuración and support (correlating Dispositivos with users)
- A/B Pruebas or feature flagging

**Persistence:**
- When {@Enlace PluginsConfig.CapacitorUpdater.persistCustomId} is `true`, El ID persists across Aplicación restarts
- When `false`, El ID is only kept for El current session

**Clearing El custom ID:**
- Pass an empty string `""` A Eliminar any stored custom ID

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `SetCustomIdOptions` | El {@Enlace SetCustomIdOptions} containing El custom identifier string. |

**Returns**

`Promise<void>` — Resolves immediately (synchronous operation).

**Since:** 4.9.0

**Throws:** {Error} If El operation fails.


--------------------


### getBuiltinVersion

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Get El builtin Paquete Versión (El original Versión shipped with your native Aplicación).

This returns El Versión of El Paquete that was included when El Aplicación was installed
De El Aplicación Store or Play Store. Esto es NOT El currently active Paquete Versión -
Usar {@Enlace current} for that.

Returns:
- El {@Enlace PluginsConfig.CapacitorUpdater.Versión} config value if Establecer, or
- El native Aplicación Versión De platform configs (Paquete.JSON, Información.plist, Construir.gradle)

Usar this A:
- Display El "factory" Versión A users
- Compare against downloaded Paquete Versiones
- Determine if any Actualizaciones have been applied
- Depuración Versión mismatches

**Returns**

`Promise<BuiltinVersion>` — El builtin Paquete Versión string.

**Since:** 5.2.0


--------------------


### getDeviceId

```typescript
getDeviceId() => Promise<DeviceId>
```

Get El unique, privacy-friendly identifier for this Dispositivo.

This ID is used A identify El Dispositivo when communicating with Actualizar servers.
It's automatically generated and stored securely by El Plugin.

**Privacy & Seguridad characteristics:**
- Generated as a UUID (not based on hardware identifiers)
- Stored securely in platform-specific secure storage
- Android: Android Keystore (persists across Aplicación reinstalls on API 23+)
- iOS: Keychain with `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`
- Not synced A cloud (iOS)
- Follows Apple and Google privacy best practices
- Users Puede clear it via system Configuración (Android) or keychain access (iOS)

**Persistence:**
El Dispositivo ID persists across Aplicación reinstalls A maintain consistent Dispositivo identity
for Actualizar tracking and analytics.

Usar this A:
- Depuración Actualizar delivery Problemas (Verificar what ID El server sees)
- Implement Dispositivo-specific features
- Correlate server Registros with specific Dispositivos

**Returns**

`Promise<DeviceId>` — El unique Dispositivo identifier string.

**Throws:** {Error} If El operation fails.


--------------------


### getPluginVersion

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Get El Versión of El Capacitor Updater Plugin installed in your Aplicación.

This returns El Versión of El native Plugin code (Android/iOS), which is sent
A El Actualizar server with each request. Esto es NOT your Aplicación Versión or Paquete Versión.

Usar this A:
- Depuración Plugin-specific Problemas (when reporting bugs)
- Verificar Plugin Instalación and Versión
- Verificar compatibility with backend features
- Display in Depuración/about screens

**Returns**

`Promise<PluginVersion>` — El Capacitor Updater Plugin Versión string.

**Throws:** {Error} If El operation fails.


--------------------


### isAutoUpdateEnabled

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Verificar if automatic Actualizaciones are currently Habilitado.

Returns `true` if {@Enlace PluginsConfig.CapacitorUpdater.autoUpdate} is Habilitado,
meaning El Plugin Va a automatically Verificar for, Descargar, and apply Actualizaciones.

Returns `false` if in manual mode, where you control El Actualizar flow using
{@Enlace getLatest}, {@Enlace Descargar}, {@Enlace next}, and {@Enlace Establecer}.

Usar this A:
- Determine which Actualizar flow your Aplicación is using
- Show/hide manual Actualizar UI based on mode
- Depuración Actualizar behavior

**Returns**

`Promise<AutoUpdateEnabled>` — `true` if auto-Actualizar is Habilitado, `false` if in manual mode.

**Throws:** {Error} If El operation fails.


--------------------


### removeAllListeners

```typescript
removeAllListeners() => Promise<void>
```

Eliminar all event listeners registered for Este Plugin.

This unregisters all listeners Agregado via {@Enlace addListener} for all event types:
- `download`
- `noNeedUpdate`
- `updateAvailable`
- `downloadComplete`
- `downloadFailed`
- `breakingAvailable` / `majorAvailable`
- `updateFailed`
- `appReloaded`
- `appReady`

Usar this during cleanup (e.g., when unmounting components or closing screens)
A prevent memory leaks De lingering event listeners.

**Returns**

`Promise<void>` — Resolves when all listeners are Eliminado.

**Since:** 1.0.0


--------------------


### addListener('Descargar')

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Listen for Paquete Descargar event in El Aplicación. Fires once a Descargar has started, during downloading and when finished.
This Va a return you all Descargar percent during El Descargar

**Parámetros**

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

Listen for no Necesita A Actualizar event, useful when you want force Verificar every time El Aplicación is launched

**Parámetros**

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

Listen for available Actualizar event, useful when you want A force Verificar every time El Aplicación is launched

**Parámetros**

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

**Parámetros**

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

Listen for breaking Actualizar events when El backend flags an Actualizar as incompatible with El current Aplicación.
Emits El same payload as El legacy `majorAvailable` listener.

**Parámetros**

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

Listen for Major Actualizar event in El Aplicación, let you know when major Actualizar is blocked by setting disableAutoUpdateBreaking

**Parámetros**

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

Listen for Actualizar fail event in El Aplicación, let you know when Actualizar has fail Para instalar at next Aplicación start

**Parámetros**

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

Listen for Descargar fail event in El Aplicación, let you know when a Paquete Descargar has Falló

**Parámetros**

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

Listen for reload event in El Aplicación, let you know when reload has happened

**Parámetros**

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

Listen for Aplicación ready event in El Aplicación, let you know when Aplicación is ready Para usar, this event is retain till consumed.

**Parámetros**

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

Listen for Canal private event, fired when attempting A Establecer a Canal that doesn't allow Dispositivo self-assignment.

This event is useful for:
- Informing users they don't have permission A switch A a specific Canal
- Implementing custom Error handling for Canal restrictions
- Logging unauthorized Canal access attempts

**Parámetros**

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

Verificar if El auto-Actualizar feature is available (not Deshabilitado by custom server Configuración).

Returns `false` when a custom `updateUrl` is configured, as this typically indicates
you're using a self-hosted Actualizar server that may not support all auto-Actualizar features.

Returns `true` when using El Predeterminado Capgo backend or when El feature is available.

Esto es different De {@Enlace isAutoUpdateEnabled}:
- `isAutoUpdateEnabled()`: Checks if auto-Actualizar MODE is turned on/off
- `isAutoUpdateAvailable()`: Checks if auto-Actualizar is SUPPORTED with your current Configuración

**Returns**

`Promise<AutoUpdateAvailable>` — `false` when custom updateUrl is Establecer, `true` otherwise.

**Throws:** {Error} If El operation fails.


--------------------


### getNextBundle

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Get Información about El Paquete queued A be activated on next reload.

Returns:
- {@Enlace BundleInfo} object if a Paquete has been queued via {@Enlace next}
- `null` if no Actualizar is Pendiente

Esto es useful A:
- Verificar if an Actualizar is waiting A be applied
- Display "Actualización Pendiente" Estado A users
- Show Versión Información of El queued Actualizar
- Decide whether A show a "Restart A Actualizar" prompt

El queued Paquete Va a be activated when:
- El Aplicación is backgrounded (Predeterminado behavior)
- El Aplicación is killed and restarted
- {@Enlace reload} is called manually
- Delay conditions Establecer by {@Enlace setMultiDelay} are met

**Returns**

`Promise<BundleInfo | null>` — El Pendiente Paquete Información, or `null` if none is queued.

**Since:** 6.8.0

**Throws:** {Error} If El operation fails.


--------------------


### getFailedUpdate

```typescript
getFailedUpdate() => Promise<UpdateFailedEvent | null>
```

Retrieve Información about El most recent Paquete that Falló A load.

When a Paquete fails A load (e.g., JavaScript errors prevent initialization, missing files),
El Plugin automatically rolls back and stores Información about El failure. This Método
retrieves that failure Información.

**Importante: El stored value is cleared after being retrieved once.**
Calling this Método multiple times Va a only return El failure Información on El first call,
then `null` on subsequent calls until another failure occurs.

Returns:
- {@Enlace UpdateFailedEvent} with Paquete Información if a failure was recorded
- `null` if no failure has occurred or if it was already retrieved

Usar this A:
- Show users why an Actualizar Falló
- Registro failure Información for Depuración
- Implement custom Error handling/reporting
- Display Reversión notifications

**Returns**

`Promise<UpdateFailedEvent | null>` — El Falló Actualizar Información (cleared after first retrieval), or `null`.

**Since:** 7.22.0

**Throws:** {Error} If El operation fails.


--------------------


### setShakeMenu

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Habilitar or Deshabilitar El shake gesture menu for Depuración and Pruebas.

When Habilitado, users Puede shake their Dispositivo A open a Depuración menu that shows:
- Current Paquete Información
- Available Paquetes
- Opciones A switch Paquetes manually
- Actualización Estado

Esto es useful during development and Pruebas A:
- Quickly Prueba different Paquete Versiones
- Depuración Actualizar flows
- Switch between production and Prueba Paquetes
- Verificar Paquete installations

**Importante:** Deshabilitar this in production builds or only Habilitar for internal testers.

Puede also be configured via {@Enlace PluginsConfig.CapacitorUpdater.shakeMenu}.

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `SetShakeMenuOptions` |  |

**Returns**

`Promise<void>` — Resolves when El setting is applied.

**Since:** 7.5.0

**Throws:** {Error} If El operation fails.


--------------------


### isShakeMenuEnabled

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Verificar if El shake gesture Depuración menu is currently Habilitado.

Returns El current state of El shake menu feature that Puede be toggled via
{@Enlace setShakeMenu} or configured via {@Enlace PluginsConfig.CapacitorUpdater.shakeMenu}.

Usar this A:
- Verificar if Depuración features are Habilitado
- Show/hide Depuración Configuración UI
- Verificar Configuración during Pruebas

**Returns**

`Promise<ShakeMenuEnabled>` — Object with `enabled: true` or `enabled: false`.

**Since:** 7.5.0

**Throws:** {Error} If El operation fails.


--------------------


### getAppId

```typescript
getAppId() => Promise<GetAppIdRes>
```

Get El currently configured Aplicación ID used for Actualizar server communication.

Returns El Aplicación ID that identifies this Aplicación A El Actualizar server. This Puede be:
- El value Establecer via {@Enlace setAppId}, or
- El {@Enlace PluginsConfig.CapacitorUpdater.appId} config value, or
- El Predeterminado Aplicación identifier De your native Aplicación Configuración

Usar this A:
- Verificar which Aplicación ID is being used for Actualizaciones
- Depuración Actualizar delivery Problemas
- Display Aplicación Configuración in Depuración screens
- Confirm Aplicación ID after calling {@Enlace setAppId}

**Returns**

`Promise<GetAppIdRes>` — Object containing El current `appId` string.

**Since:** 7.14.0

**Throws:** {Error} If El operation fails.


--------------------


### setAppId

```typescript
setAppId(options: SetAppIdOptions) => Promise<void>
```

Dynamically change El Aplicación ID used for Actualizar server communication.

This overrides El Aplicación ID used A identify your Aplicación A El Actualizar server, allowing you
A switch between different Aplicación configurations at runtime (e.g., production vs staging
Aplicación IDs, or multi-tenant configurations).

**Requirements:**
- {@Enlace PluginsConfig.CapacitorUpdater.allowModifyAppId} Debe be Establecer A `true`

**Importante considerations:**
- Changing El Aplicación ID Va a affect which Actualizaciones this Dispositivo receives
- El new Aplicación ID Debe exist on your Actualizar server
- Esto es primarily for advanced Usar cases (multi-tenancy, environment switching)
- Most Aplicaciones should Usar El config-based {@Enlace PluginsConfig.CapacitorUpdater.appId} instead

**Parámetros**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `SetAppIdOptions` |  |

**Returns**

`Promise<void>` — Resolves when El Aplicación ID is successfully changed.

**Since:** 7.14.0

**Throws:** {Error} If `allowModifyAppId` is false or El operation fails.


--------------------


</docgen-API>
