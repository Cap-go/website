---
title: Funzioni e impostazioni
description: Todos los métodos y configuraciones disponibles del plugin
sidebar:
  order: 2
locale: es
---

# Configuración del Plugin Updater

Consulta el [Readme](https://github.com/Cap-go/capacitor-updater) de Github para más información

<docgen-config>
<!--Actualiza los comentarios JSDoc del archivo fuente y vuelve a ejecutar docgen para actualizar la documentación a continuación-->

CapacitorUpdater puede configurarse con estas opciones:

| Propiedad                    | Tipo                 | Descripción                                                                                                                                                                                    | Valor predeterminado                               | Desde   |
| ---------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>  | Configura el número de milisegundos que el plugin nativo debe esperar antes de considerar una actualización como 'fallida'. Solo disponible para Android e iOS                                | <code>10000 // (10 segundos)</code>                | |
| **`responseTimeout`**        | <code>number</code>  | Configura el número de milisegundos que el plugin nativo debe esperar antes de considerar un tiempo de espera de la API. Solo disponible para Android e iOS                                   | <code>20 // (20 segundos)</code>                   | |
| **`autoDeleteFailed`**       | <code>boolean</code> | Configura si el plugin debe eliminar automáticamente los paquetes fallidos. Solo disponible para Android e iOS                                                                                | <code>true</code>                                  | |
| **`autoDeletePrevious`**     | <code>boolean</code> | Configura si el plugin debe eliminar automáticamente los paquetes anteriores después de una actualización exitosa. Solo disponible para Android e iOS                                         | <code>true</code>                                  | |
| **`autoUpdate`**             | <code>boolean</code> | Configura si el plugin debe usar actualización automática a través de un servidor de actualizaciones. Solo disponible para Android e iOS                                                      | <code>true</code>                                  | |
| **`resetWhenUpdate`**        | <code>boolean</code> | Elimina automáticamente los paquetes descargados anteriormente cuando se instala un nuevo paquete nativo en el dispositivo. Solo disponible para Android e iOS                               | <code>true</code>                                  | |
| **`updateUrl`**              | <code>string</code>  | Configura la URL / punto final al que se envían las comprobaciones de actualización. Solo disponible para Android e iOS                                                                       | <code>https://plugincapgoapp/updates</code>      | |
| **`channelUrl`**             | <code>string</code>  | Configura la URL / punto final para operaciones de canal. Solo disponible para Android e iOS                                                                                                  | <code>https://plugincapgoapp/channel_self</code> | |
| **`statsUrl`**               | <code>string</code>  | Configura la URL / punto final al que se envían las estadísticas de actualización. Solo disponible para Android e iOS. Establecer como "" para deshabilitar el reporte de estadísticas      | <code>https://plugincapgoapp/stats</code>        | |
| **`privateKey`**             | <code>string</code>  | Configura la clave privada para el cifrado de actualizaciones en vivo de extremo a extremo. Solo disponible para Android e iOS. Obsoleto en la versión 620, será eliminado en la versión 700 | <code>undefined</code>                             | |
| **`publicKey`**              | <code>string</code>  | Configura la clave pública para el cifrado de actualizaciones en vivo de extremo a extremo Versión 2. Solo disponible para Android e iOS                                                     | <code>undefined</code>                             | 620   |
| **`version`**                | <code>string</code>  | Configura la versión actual de la aplicación. Se usará para la primera solicitud de actualización. Si no se establece, el plugin obtendrá la versión del código nativo. Solo para Android e iOS | <code>undefined</code>                             | 41748 |
| **`directUpdate`**           | <code>boolean</code> | Hace que el plugin instale directamente la actualización cuando la aplicación se acaba de actualizar/instalar. Solo para modo autoUpdate. Solo disponible para Android e iOS                 | <code>undefined</code>                             | 510   |
| **`periodCheckDelay`**       | <code>number</code>  | Configura el período de retraso para la comprobación periódica de actualizaciones en segundos. Solo disponible para Android e iOS. No puede ser menor a 600 segundos (10 minutos)          | <code>600 // (10 minutos)</code>                   | |
| **`localS3`**                | <code>boolean</code> | Configura el CLI para usar un servidor local para pruebas o servidor de actualizaciones autohospedado                                                                                         | <code>undefined</code>                             | 41748 |
| **`localHost`**              | <code>string</code>  | Configura el CLI para usar un servidor local para pruebas o servidor de actualizaciones autohospedado                                                                                         | <code>undefined</code>                             | 41748 |
| **`localWebHost`**           | <code>string</code>  | Configura el CLI para usar un servidor local para pruebas o servidor de actualizaciones autohospedado                                                                                         | <code>undefined</code>                             | 41748 |
| **`localSupa`**              | <code>string</code>  | Configura el CLI para usar un servidor local para pruebas o servidor de actualizaciones autohospedado                                                                                         | <code>undefined</code>                             | 41748 |
| **`localSupaAnon`**          | <code>string</code>  | Configura el CLI para usar un servidor local para pruebas                                                                                                                                     | <code>undefined</code>                             | 41748 |
| **`localApi`**               | <code>string</code>  | Configura el CLI para usar una API local para pruebas                                                                                                                                         | <code>undefined</code>                             | 633   |
| **`localApiFiles`**          | <code>string</code>  | Configura el CLI para usar una API de archivos local para pruebas                                                                                                                             | <code>undefined</code>                             | 633   |
| **`allowModifyUrl`**         | <code>boolean</code> | Permite que el plugin modifique updateUrl, statsUrl y channelUrl dinámicamente desde el lado JavaScript                                                                                       | <code>false</code>                                 | 540   |
| **`defaultChannel`**         | <code>string</code>  | Establece el canal predeterminado para la aplicación en la configuraciónTraducción al español:

                                                                                                                                              | <code>undefined</code>                             | 550   |
| **`appId`**                  | <code>string</code>  | Configura el id de la aplicación en la configuración                                                                                                                                 | <code>undefined</code>                             | 600   |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | Configura el plugin para mantener la ruta URL después de una recarga ADVERTENCIA: Cuando se activa una recarga, 'windowhistory' se borrará                                                                | <code>false</code>                                 | 680   |

## Ejemplos

En `capacitorconfigjson`:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1 segundo),
      "responseTimeout": 10 // (10 segundos),
      "autoDeleteFailed": false,
      "autoDeletePrevious": false,
      "autoUpdate": false,
      "resetWhenUpdate": false,
      "updateUrl": https://examplecom/api/auto_update,
      "channelUrl": https://examplecom/api/channel,
      "statsUrl": https://examplecom/api/stats,
      "privateKey": undefined,
      "publicKey": undefined,
      "version": undefined,
      "directUpdate": undefined,
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
      "keepUrlPathAfterReload": undefined
    }
  }
}
```

En `capacitorconfigts`:

```ts
/// <reference types="@capgo/capacitor-updater" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1 segundo),
      responseTimeout: 10 // (10 segundos),
      autoDeleteFailed: false,
      autoDeletePrevious: false,
      autoUpdate: false,
      resetWhenUpdate: false,
      updateUrl: https://examplecom/api/auto_update,
      channelUrl: https://examplecom/api/channel,
      statsUrl: https://examplecom/api/stats,
      privateKey: undefined,
      publicKey: undefined,
      version: undefined,
      directUpdate: undefined,
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
    },
  },
};

export default config;
```

</docgen-config>

<docgen-index>

* [`notifyAppReady()`](#notifyappready)
* [`setUpdateUrl()`](#setupdateurl)
* [`setStatsUrl()`](#setstatsurl)
* [`setChannelUrl()`](#setchannelurl)
* [`download()`](#download)
* [`next()`](#next)
* [`set()`](#set)
* [`delete()`](#delete)
* [`list()`](#list)
* [`reset()`](#reset)
* [`current()`](#current)
* [`reload()`](#reload)
* [`setMultiDelay()`](#setmultidelay)
* [`cancelDelay()`](#canceldelay)
* [`getLatest()`](#getlatest)
* [`setChannel()`](#setchannel)
* [`unsetChannel()`](#unsetchannel)
* [`getChannel()`](#getchannel)
* [`setCustomId()`](#setcustomid)
* [`getBuiltinVersion()`](#getbuiltinversion)
* [`getDeviceId()`](#getdeviceid)
* [`getPluginVersion()`](#getpluginversion)
* [`isAutoUpdateEnabled()`](#isautoupdateenabled)
* [`removeAllListeners()`](#removealllisteners)
* [`addListener('download', )`](#addlistenerdownload-)
* [`addListener('noNeedUpdate', )`](#addlistenernoneedupdate-)
* [`addListener('updateAvailable', )`](#addlistenerupdateavailable-)
* [`addListener('downloadComplete', )`](#addlistenerdownloadcomplete-)
* [`addListener('majorAvailable', )`](#addlistenermajoravailable-)
* [`addListener('updateFailed', )`](#addlistenerupdatefailed-)
* [`addListener('downloadFailed', )`](#addlistenerdownloadfailed-)
* [`addListener('appReloaded', )`](#addlistenerappreloaded-)
* [`addListener('appReady', )`](#addlistenerappready-)
* [`isAutoUpdateAvailable()`](#isautoupdateavailable)
* [`getNextBundle()`](#getnextbundle)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

# Métodos

<docgen-api>

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Notifica a Capacitor Updater que el paquete actual está funcionando (se producirá un rollback si este método no se llama en cada inicio de la aplicación)
Por defecto, este método debe llamarse en los primeros 10 segundos después del inicio de la aplicación, de lo contrario se producirá un rollback
Cambia este comportamiento con {@link appReadyTimeout}

**Devuelve:** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------

## setUpdateUrl()

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Establece la updateUrl para la aplicación, esta se usará para buscar actualizaciones

| Param         | Type                                            | Descripción                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | contiene la URL a usar para buscar actualizaciones |

**Desde:** 540

--------------------

## setStatsUrl()

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Establece la statsUrl para la aplicación, esta se usará para enviar estadísticas. Pasar una cadena vacía deshabilitará la recopilación de estadísticas

| Param         | Type                                          | Descripción                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | contiene la URL a usar para enviar estadísticas |

**Desde:** 540

--------------------

## setChannelUrl()

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Establece la channelUrl para la aplicación, esta se usará para establecer el canal

| Param         | Type                                              | Descripción                                      |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | contiene la URL a usar para establecer el canal |

**Desde:** 540

--------------------

## download()

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Descarga un nuevo paquete desde la URL proporcionada, debe ser un archivo zip, con archivos dentro o con un id único dentro con todos tus archivos

| Param         | Type                                                        | Descripción                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | Las {@link <a href="#downloadoptions">DownloadOptions</a>} para descargar un nuevo zip de paquete |

**Devuelve:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------

## next()

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Establece el siguiente paquete que se usará cuando la aplicación sea recargada| Param         | Type                                          | Description                                                                                                   |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Contiene el ID del siguiente Bundle a establecer en el próximo inicio de la aplicación {@link <a href="#bundleinfo">BundleInfoid</a>} |

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------

## set()

```typescript
set(options: BundleId) => Promise<void>
```

Establece el bundle actual e inmediatamente recarga la aplicación

| Param         | Type                                          | Description                                                                                       |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un objeto {@link <a href="#bundleid">BundleId</a>} que contiene el nuevo ID de bundle a establecer como actual |

--------------------

## delete()

```typescript
delete(options: BundleId) => Promise<void>
```

Elimina el bundle especificado del almacenamiento nativo de la aplicación. Use con {@link list} para obtener los IDs de Bundle almacenados

| Param         | Type                                          | Description                                                                                                                                   |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un objeto {@link <a href="#bundleid">BundleId</a>} que contiene el ID del bundle a eliminar (nota, este es el ID del bundle, NO el nombre de la versión) |

--------------------

## list()

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Obtiene todos los bundles descargados localmente en tu aplicación

| Param         | Type                                                | Description                                                            |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | Las {@link <a href="#listoptions">ListOptions</a>} para listar bundles |

**Returns:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------

## reset()

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Restablece la aplicación al bundle `builtin` (el enviado a Apple App Store / Google Play Store) o al último bundle cargado exitosamente

| Param         | Type                                                  | Description                                                                                                                                                                      |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Contiene {@link <a href="#resetoptions">ResetOptionstoLastSuccessful</a>}, `true` restablece al bundle incorporado y `false` restablecerá al último bundle cargado exitosamente |

--------------------

## current()

```typescript
current() => Promise<CurrentBundleResult>
```

Obtiene el bundle actual, si no hay ninguno establecido retorna `builtin`. currentNative es el bundle original instalado en el dispositivo

**Returns:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------

## reload()

```typescript
reload() => Promise<void>
```

Recarga la vista

--------------------

## setMultiDelay()

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Establece un array {@link <a href="#delaycondition">DelayCondition</a>} que contiene condiciones que el Plugin usará para retrasar la actualización
Después de que todas las condiciones se cumplan, el proceso de actualización comenzará nuevamente como de costumbre, por lo que la actualización se instalará después de poner en segundo plano o matar la aplicación
Para el tipo `date`, el valor debe ser una cadena de fecha iso8601
Para el tipo `background`, el valor debe ser un número en milisegundos
Para el tipo `nativeVersion`, el valor debe ser el número de versión
Para el tipo `kill`, el valor no se utiliza
La función tiene un comportamiento inconsistente; la opción kill activa la actualización después del primer cierre y no después del siguiente segundo plano como otras opciones. Esto se corregirá en una versión mayor futura

| Param         | Type                                                                  | Description                                                                                                |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Contiene el array {@link <a href="#multidelayconditions">MultiDelayConditions</a>} de condiciones a establecer |

**Since:** 430

--------------------

## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Cancela una {@link <a href="#delaycondition">DelayCondition</a>} para procesar una actualización inmediatamente

**Since:** 400

--------------------

## getLatest()

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Obtiene el último bundle disponible desde la URL de actualización

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Since:** 400

--------------------

## setChannel()

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Establece el canal para este dispositivo. El canal debe permitir la autoasignación para que esto funcione
No use este método para establecer el canal al inicio cuando `autoUpdate` está habilitado en la {@link PluginsConfig}
Este método es para establecer el canal después de que la aplicación esté lista
Este método envía al backend de Capgo una solicitud para vincular el ID del dispositivo al canal. Capgo puede aceptar o rechazar dependiendo de la configuración de tu canal

| Param         | Type                                                            | Description                                                                      |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | Es el canal {@link <a href="#setchanneloptions">SetChannelOptions</a>} a establecer |

**Returns:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Since:** 470

--------------------

## unsetChannel()

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Desestablece el canal para este dispositivoEl dispositivo volverá entonces al canal predeterminado

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Since:** 470

--------------------

## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Obtener el canal para este dispositivo

**Returns:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Since:** 480

--------------------

## setCustomId()

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Establecer un ID personalizado para este dispositivo

| Param         | Type                                                              | Description                                                                         |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | es el {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId a establecer |

**Since:** 490

--------------------

## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Obtener la versión nativa de la app o la versión incorporada si está configurada

**Returns:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Since:** 520

--------------------

## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Obtener ID único usado para identificar el dispositivo (enviado al servidor de actualización automática)

**Returns:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------

## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Obtener la versión nativa del plugin Capacitor Updater (enviada al servidor de actualización automática)

**Returns:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------

## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Obtener el estado de la configuración de actualización automática

**Returns:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------

## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Eliminar todos los listeners de este plugin

**Since:** 100

--------------------

## addListener('download', )

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Escuchar el evento de descarga de bundle en la App. Se activa cuando comienza una descarga, durante la descarga y cuando finaliza

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'download'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 2011

--------------------

## addListener('noNeedUpdate', )

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Escuchar el evento de no necesidad de actualización, útil cuando deseas forzar la comprobación cada vez que se inicia la app

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'noNeedUpdate'</code>                                             |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('updateAvailable', )

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Escuchar el evento de actualización disponible, útil cuando deseas forzar la comprobación cada vez que se inicia la app

| Param              | Type                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                                            |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('downloadComplete', )

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Escuchar eventos de descarga completada

| Param              | Type                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadComplete'</code>                                                             |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('majorAvailable', )

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Escuchar el evento de actualización Mayor en la App, te permite saber cuándo una actualización mayor está bloqueada por la configuración disableAutoUpdateBreaking

| Param              | Type                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 230

--------------------

## addListener('updateFailed', )

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Escuchar el evento de fallo de actualización en la App, te permite saber cuándo una actualización ha fallado al instalarse en el próximo inicio de la app

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateFailed'</code>                                                         |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 230

--------------------

## addListener('downloadFailed',```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Escuchar el evento de fallo de descarga en la App, te permite saber cuando ha fallado la descarga de un paquete

| Param | Tipo |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'downloadFailed'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Devuelve:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 400

--------------------

## addListener('appReloaded', )

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Escuchar el evento de recarga en la App, te permite saber cuando se ha producido una recarga

| Param | Tipo |
| ------------------ | -------------------------- |
| **`eventName`** | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Devuelve:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 430

--------------------

## addListener('appReady', )

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Escuchar el evento de app lista en la App, te permite saber cuando la app está lista para usarse

| Param | Tipo |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>'appReady'</code> |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Devuelve:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 510

--------------------

## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Obtener si la actualización automática está disponible (no deshabilitada por serverUrl)

**Devuelve:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------

## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Obtener el siguiente paquete que será utilizado cuando la app se recargue
Devuelve null si no hay un siguiente paquete establecido

**Devuelve:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Desde:** 680

--------------------

## Interfaces

### AppReadyResult

| Prop | Tipo |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |

### BundleInfo

| Prop | Tipo |
| ---------------- | ----------------------------------------------------- |
| **`id`** | <code>string</code> |
| **`version`** | <code>string</code> |
| **`downloaded`** | <code>string</code> |
| **`checksum`** | <code>string</code> |
| **`status`** | <code><a href="#bundlestatus">BundleStatus</a></code> |

### UpdateUrl

| Prop | Tipo |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

### StatsUrl

| Prop | Tipo |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

### ChannelUrl

| Prop | Tipo |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

### DownloadOptions

| Prop | Tipo | Descripción | Por defecto | Desde |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`** | <code>string</code> | La URL del archivo zip del paquete (ej: distzip) a descargar (Puede ser cualquier URL Ej: Amazon S3, un tag de GitHub, cualquier otro lugar donde hayas alojado tu paquete) | | |
| **`version`** | <code>string</code> | El código/nombre de versión de este paquete/versión | | |
| **`sessionKey`** | <code>string</code> | La clave de sesión para la actualización | <code>undefined</code> | 400 |
| **`checksum`** | <code>string</code> | El checksum para la actualización | <code>undefined</code> | 400 |

### BundleId 

| Prop | Tipo |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

### BundleListResult

| Prop | Tipo |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |

### ListOptions

| Prop | Tipo | Descripción | Por defecto | Desde |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | Si devolver la lista cruda de paquetes o el manifiesto. Si es true, la lista intentará leer la base de datos interna en lugar de los archivos en disco | <code>false</code> | 6140 |

### ResetOptions

| Prop | Tipo |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |

### CurrentBundleResult

| Prop | Tipo |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code> |

### MultiDelayConditions

| Prop | Tipo |
| ---------------------- | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |

### DelayCondition

| Prop | Tipo | Descripción |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`** | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Establecer condiciones de retraso en setMultiDelay |
| **`value`** | <code>string</code> | |

### LatestVersion

| Prop | Tipo | Descripción | Desde |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Resultado del método getLatest | 400 |
| **`checksum`**   | <code>string</code>          |                            | 6     |
| **`major`**      | <code>boolean</code>         |                            |       |
| **`message`**    | <code>string</code>          |                            |       |
| **`sessionKey`** | <code>string</code>          |                            |       |
| **`error`**      | <code>string</code>          |                            |       |
| **`old`**        | <code>string</code>          |                            |       |
| **`url`**        | <code>string</code>          |                            |       |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 61   |


### ManifestEntry

| Prop               | Type                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### GetLatestOptions

| Prop          | Type                | Description                                                                                     | Default                | Since |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | El canal para obtener la última versión. El canal debe permitir 'self_assign' para que esto funcione | <code>undefined</code> | 680 |


### ChannelRes

| Prop          | Type                | Description                   | Since |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`**  | <code>string</code> | Estado actual del canal establecido | 470 |
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
| **`channel`**  | <code>string</code>  | Estado actual del canal obtenido | 480 |
| **`error`**    | <code>string</code>  |                               |       |
| **`message`**  | <code>string</code>  |                               |       |
| **`status`**   | <code>string</code>  |                               |       |
| **`allowSet`** | <code>boolean</code> |                               |       |


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
| **`percent`** | <code>number</code>                               | Estado actual de la descarga, entre 0 y 100 | 400 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeedEvent

| Prop         | Type                                              | Description                                    | Since |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Estado actual de la descarga, entre 0 y 100 | 400 |


### UpdateAvailableEvent

| Prop         | Type                                              | Description                                    | Since |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Estado actual de la descarga, entre 0 y 100 | 400 |


### DownloadCompleteEvent

| Prop         | Type                                              | Description                          | Since |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Se emite cuando hay una nueva actualización disponible | 400 |


### MajorAvailableEvent

| Prop          | Type                | Description                                | Since |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | Se emite cuando hay un nuevo paquete principal disponible | 400 |


### UpdateFailedEvent

| Prop         | Type                                              | Description                           | Since |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Se emite cuando una actualización falla al instalarse | 400 |


### DownloadFailedEvent

| Prop          | Type                | Description                | Since |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Se emite cuando falla una descarga | 400 |


### AppReadyEvent

| Prop         | Type                                              | Description                           | Since |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Se emite cuando la aplicación está lista para usar | 520 |
| **`status`** | <code>string</code>                               |                                       |       |


### AutoUpdateAvailable

| Prop            | Type                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


## Type Aliases


### BundleStatus

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>

</docgen-api>
