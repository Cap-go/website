---
title: "Funciones y configuraciones"
locale: es
description: "Todos los métodos y configuraciones disponibles del Plugin"
sidebar:
  order: 2
---

# Configuración del Plugin Updater

Consulta el [Readme](https://github.com/Cap-go/capacitor-updater) de GitHub para más información.

<docgen-config>
<!--Actualiza los comentarios JSDoc del archivo fuente y vuelve a ejecutar docgen para actualizar los documentos a continuación-->

CapacitorUpdater puede configurarse con estas opciones:

| Prop                         | Tipo                                            | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Por defecto                                            | Desde   |
| ---------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>                             | Configura el número de milisegundos que el Plugin nativo debe esperar antes de considerar una actualización como 'fallida'. Solo disponible para Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>10000 // (10 segundos)</code>                 |         |
| **`responseTimeout`**        | <code>number</code>                             | Configura el número de milisegundos que el Plugin nativo debe esperar antes de considerar un timeout de API. Solo disponible para Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>20 // (20 segundos)</code>                     |         |
| **`autoDeleteFailed`**       | <code>boolean</code>                            | Configura si el Plugin debe eliminar automáticamente los Paquetes fallidos. Solo disponible para Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>true</code>                                  |         |
| **`autoDeletePrevious`**     | <code>boolean</code>                            | Configura si el Plugin debe eliminar automáticamente los Paquetes anteriores después de una actualización exitosa. Solo disponible para Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>true</code>                                  |         |
| **`autoUpdate`**             | <code>boolean</code>                            | Configura si el Plugin debe usar Actualización Automática a través de un servidor de actualizaciones. Solo disponible para Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>true</code>                                  |         |
| **`resetWhenUpdate`**        | <code>boolean</code>                            | Elimina automáticamente los Paquetes descargados anteriores cuando se instala un nuevo Paquete de aplicación nativa en el dispositivo. Solo disponible para Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>true</code>                                  |         |
| **`updateUrl`**              | <code>string</code>                             | Configura la URL / endpoint al que se envían las verificaciones de actualización. Solo disponible para Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>https://Plugin.Capgo.Aplicación/Actualizaciones</code>      |         |
| **`channelUrl`**             | <code>string</code>                             | Configura la URL / endpoint para operaciones de canal. Solo disponible para Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>https://Plugin.Capgo.Aplicación/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>                             | Configura la URL / endpoint al que se envían las estadísticas de actualización. Solo disponible para Android e iOS. Establece en "" para deshabilitar el reporte de estadísticas.                                                                                                                                                                                                                                                                                                                                                                                                                       | <code>https://Plugin.Capgo.Aplicación/stats</code>        |         |
| **`publicKey`**              | <code>string</code>                             | Configura la clave pública para cifrado de actualizaciones en vivo de extremo a extremo Versión 2 Solo disponible para Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>undefined</code>                             | 6.2.0   |
| **`version`**                | <code>string</code>                             | Configura la versión actual de la aplicación. Esto se usará para la primera solicitud de actualización. Si no se establece, el Plugin obtendrá la versión del código nativo. Solo disponible para Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                   | <code>undefined</code>                             | 4.17.48 |
| **`directUpdate`**           | <code>boolean \| 'always' \| 'atInstall' \| 'onLaunch'</code> | Configura cuándo el Plugin debe realizar instalación directa de actualizaciones. Solo para modo autoUpdate. Funciona bien para aplicaciones menores a 10MB y con cargas realizadas usando el flag --partial. Zip o aplicaciones mayores a 10MB serán relativamente lentas para que los usuarios actualicen. - false: Nunca hacer actualizaciones directas (usar comportamiento predeterminado: descargar al inicio, establecer cuando se pone en segundo plano) - atInstall: Actualización directa solo cuando la aplicación está instalada, actualizada desde la tienda, de lo contrario actúa como directUpdate = false - onLaunch: Actualización directa solo al instalar la aplicación, actualizarla desde la tienda o después de cerrar la aplicación, de lo contrario actúa como directUpdate = false - always: Actualización directa en todos los casos anteriores (aplicación instalada, actualizada desde la tienda, después de cerrar la aplicación o reanudar la aplicación), nunca actúa como directUpdate = false - true: (obsoleto) Lo mismo que "always" para retrocompatibilidad Solo disponible para Android e iOS. | <code>false</code>                                 | 5.1.0   |
| **`autoSplashscreen`**       | <code>boolean</code>                            | Maneja automáticamente el ocultamiento de la pantalla de bienvenida cuando se usa directUpdate. Cuando está habilitado, el Plugin ocultará automáticamente la pantalla de bienvenida después de aplicar las actualizaciones o cuando no se necesite actualización. Esto elimina la necesidad de escuchar manualmente los eventos appReady y llamar a SplashScreen.hide(). Solo funciona cuando directUpdate está establecido en "atInstall", "always" o true. Requiere que el Plugin @Capacitor/splash-screen esté instalado y configurado con launchAutoHide: false. Requiere que autoUpdate y directUpdate estén habilitados. Solo disponible para Android e iOS.                      | <code>false</code>                                 | 7.6.0   |
| **`periodCheckDelay`**       | <code>number</code>                             | Configura el período de retraso para la verificación periódica de actualizaciones. La unidad es en segundos. Solo disponible para Android e iOS. No puede ser menor a 600 segundos (10 minutos).                                                                                                                                                                                                                                                                                                                                                                                                     | <code>600 // (10 minutos)</code>                   |         |
| **`localS3`**                | <code>boolean</code>                            | Configura el CLI para usar un servidor local para pruebas o servidor de actualizaciones auto-hospedado.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localHost`**              | <code>string</code>                             | Configura el CLI para usar un servidor local para pruebas o servidor de actualizaciones auto-hospedado.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localWebHost`**           | <code>string</code>                             | Configura el CLI para usar un servidor local para pruebas o servidor de actualizaciones auto-hospedado.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localSupa`**              | <code>string</code>                             | Configura el CLI para usar un servidor local para pruebas o servidor de actualizaciones auto-hospedado.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localSupaAnon`**          | <code>string</code>                             | Configura el CLI para usar un servidor local para pruebas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>undefined</code>                             | 4.17.48 |
| **`localApi`**               | <code>string</code>                             | Configura el CLI para usar una API local para pruebas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 6.3.3   |
| **`localApiFiles`**          | <code>string</code>                             | Configura el CLI para usar una API de archivos local para pruebas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>undefined</code>                             | 6.3.3   |
| **`allowModifyUrl`**         | <code>boolean</code>                            | Permite que el Plugin modifique dinámicamente updateUrl, statsUrl y channelUrl desde el lado de JavaScript.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code>                                 | 5.4.0   |
| **`defaultChannel`**         | <code>string</code>                             | Establece el canal predeterminado para la aplicación en la configuración. Sensible a mayúsculas. Esta configuración anulará el canal predeterminado establecido en la nube, pero aún respetará las anulaciones hechas en la nube.                                                                                                                                                                                                                                                                                                                                                                      | <code>undefined</code>                             | 5.5.0   |
| **`appId`**                  | <code>string</code>                             | Configura el id de la aplicación en la configuración.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>undefined</code>                             | 6.0.0   |
| **`keepUrlPathAfterReload`** | <code>boolean</code>                            | Configura el Plugin para mantener la ruta de URL después de una recarga. ADVERTENCIA: Cuando se activa una recarga, 'window.history' se borrará.                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code>                                 | 6.8.0   |
| **`disableJSLogging`**       | <code>boolean</code>                            | Deshabilita el registro de JavaScript del Plugin. Si es true, el Plugin no registrará en la consola de JavaScript. Solo se realizará el registro nativo                                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>false</code>                                 | 7.3.0   |
| **`shakeMenu`**              | <code>boolean</code>                            | Habilita el gesto de sacudir para mostrar el menú de actualización para propósitos de depuración/prueba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code>                                 | 7.5.0   |

## Ejemplos

En `capacitor.config.json`:

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

En `capacitor.config.ts`:

```ts
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
* [Alias de Tipos](#type-aliases)

</docgen-index>

# Métodos

<docgen-API>
<!--Actualiza los comentarios JSDoc del archivo fuente y vuelve a ejecutar docgen para actualizar los documentos a continuación-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Notifica a Capacitor Updater que el Paquete actual está funcionando (ocurrirá un Reversión si este método no se llama en cada inicio de aplicación)
Por defecto, este método debe llamarse en los primeros 10 segundos después del inicio de la aplicación, de lo contrario ocurrirá un Reversión.
Cambia este comportamiento con {@Enlace appReadyTimeout}

**Retorna:** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------


## setUpdateUrl(...)

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Establece la updateUrl para la aplicación, esto se usará para verificar actualizaciones.

| Parámetro         | Tipo                                            | Descripción                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | contiene la URL a usar para verificar actualizaciones. |

**Desde:** 5.4.0

--------------------


## setStatsUrl(...)

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Establece la statsUrl para la aplicación, esto se usará para enviar estadísticas. Pasar una cadena vacía deshabilitará la recopilación de estadísticas.

| Parámetro         | Tipo                                          | Descripción                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | contiene la URL a usar para enviar estadísticas. |

**Desde:** 5.4.0

--------------------


## setChannelUrl(...)

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Establece la channelUrl para la aplicación, esto se usará para establecer el canal.

| Parámetro         | Tipo                                              | Descripción                                      |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | contiene la URL a usar para establecer el canal. |

**Desde:** 5.4.0

--------------------


## Descargar(...)

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Descarga un nuevo Paquete desde la URL proporcionada, debe ser un archivo zip, con archivos dentro o con un id único dentro con todos tus archivos

| Parámetro         | Tipo                                                        | Descripción                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | Las {@Enlace <a href="#downloadoptions">DownloadOptions</a>} para descargar un nuevo Paquete zip. |

**Retorna:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## next(...)

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Establece el siguiente Paquete a usar cuando la aplicación se recarga.

| Parámetro         | Tipo                                          | Descripción                                                                                                   |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Contiene el ID del siguiente Paquete a establecer en el próximo inicio de la aplicación. {@Enlace <a href="#bundleinfo">BundleInfo.id</a>} |

**Retorna:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## Establecer(...)

```typescript
set(options: BundleId) => Promise<void>
```

Establece el Paquete actual e inmediatamente recarga la aplicación.

| Parámetro         | Tipo                                          | Descripción                                                                                       |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un objeto {@Enlace <a href="#bundleid">BundleId</a>} que contiene el nuevo id del Paquete a establecer como actual. |

--------------------


## Eliminar(...)

```typescript
delete(options: BundleId) => Promise<void>
```

Elimina el Paquete especificado del almacenamiento de la aplicación nativa. Usa con {@Enlace list} para obtener los IDs de Paquete almacenados.

| Parámetro         | Tipo                                          | Descripción                                                                                                                                   |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un objeto {@Enlace <a href="#bundleid">BundleId</a>} que contiene el ID de un Paquete a eliminar (nota, este es el id del Paquete, NO el nombre de versión) |

--------------------


## list(...)

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Obtiene todos los Paquetes descargados localmente en tu aplicación

| Parámetro         | Tipo                                                | Descripción                                                            |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | Las {@Enlace <a href="#listoptions">ListOptions</a>} para listar Paquetes |

**Retorna:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------


## reset(...)

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Restablece la aplicación al Paquete `builtin` (el enviado a Apple Aplicación Store / Google Play Store) o al último Paquete cargado exitosamente.

| Parámetro         | Tipo                                                  | Descripción                                                                                                                                                                      |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Contiene {@Enlace <a href="#resetoptions">ResetOptions.toLastSuccessful</a>}, `true` restablece al Paquete builtin y `false` restablecerá al último Paquete cargado exitosamente. |

--------------------


## current()

```typescript
current() => Promise<CurrentBundleResult>
```

Obtiene el Paquete actual, si no hay ninguno establecido retorna `builtin`. currentNative es el Paquete original instalado en el dispositivo

**Retorna:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------


## reload()

```typescript
reload() => Promise<void>
```

Recarga la vista

--------------------


## setMultiDelay(...)

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Establece un array de {@Enlace <a href="#delaycondition">DelayCondition</a>} que contiene condiciones que el Plugin usará para retrasar la actualización.
Después de que se cumplan todas las condiciones, el proceso de actualización comenzará nuevamente como de costumbre, por lo que la actualización se instalará después de poner en segundo plano o cerrar la aplicación.
Para el tipo `date`, el valor debe ser una cadena de fecha iso8601.
Para el tipo `background`, el valor debe ser un número en milisegundos.
Para el tipo `nativeVersion`, el valor debe ser el número de versión.
Para el tipo `kill`, el valor no se usa.
La función tiene comportamiento inconsistente, la opción kill activa la actualización después del primer cierre y no después del siguiente segundo plano como otras opciones. Esto se corregirá en una futura versión mayor.

| Parámetro         | Tipo                                                                  | Descripción                                                                                                |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Contiene el array de {@Enlace <a href="#multidelayconditions">MultiDelayConditions</a>} de condiciones a establecer |

**Desde:** 4.3.0

--------------------


## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Cancela una {@Enlace <a href="#delaycondition">DelayCondition</a>} para procesar una actualización inmediatamente.

**Desde:** 4.0.0

--------------------


## getLatest(...)

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Obtiene el último Paquete disponible desde la URL de actualización

| Parámetro         | Tipo                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Retorna:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Desde:** 4.0.0

--------------------


## setChannel(...)

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Establece el canal para este dispositivo. El canal debe permitir auto-asignación para que esto funcione.
No uses este método para establecer el canal al inicio.
Este método es para establecer el canal después de que la aplicación esté lista, y el usuario haya interactuado.
Si quieres establecer el canal al inicio, usa {@Enlace PluginsConfig} para establecer el canal predeterminado.
Este método envía al backend de Capgo una solicitud para vincular el ID del dispositivo al canal. Capgo puede aceptar o rechazar dependiendo de la configuración de tu canal.

| Parámetro         | Tipo                                                            | Descripción                                                                      |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | Es el canal {@Enlace <a href="#setchanneloptions">SetChannelOptions</a>} a establecer |

**Retorna:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Desde:** 4.7.0

--------------------


## unsetChannel(...)

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Desestablece el canal para este dispositivo. El dispositivo volverá entonces al canal predeterminado

| Parámetro         | Tipo                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Desde:** 4.7.0

--------------------


## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Obtiene el canal para este dispositivo

**Retorna:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Desde:** 4.8.0

--------------------


## listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

Lista todos los canales disponibles para este dispositivo que permiten auto-asignación

**Retorna:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**Desde:** 7.5.0

--------------------


## setCustomId(...)

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Establece un ID personalizado para este dispositivo

| Parámetro         | Tipo                                                              | Descripción                                                                         |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | es el {@Enlace <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId a establecer |

**Desde:** 4.9.0

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Obtiene la versión de la aplicación nativa o la versión builtin si se estableció en la configuración

**Retorna:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Desde:** 5.2.0

--------------------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Obtiene el ID único usado para identificar el dispositivo (enviado al servidor de actualización automática)

**Retorna:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Obtiene la versión del Plugin nativo Capacitor Updater (enviado al servidor de actualización automática)

**Retorna:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Obtiene el estado de la configuración de actualización automática.

**Retorna:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------


## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Elimina todos los listeners de este Plugin.

**Desde:** 1.0.0

--------------------


## addListener('Descargar', ...)

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de descarga de Paquete en la Aplicación. Se activa una vez que comienza una descarga, durante la descarga y cuando termina.
Esto te devolverá todos los porcentajes de descarga durante la descarga

| Parámetro              | Tipo                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'Descargar'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Retorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 2.0.11

--------------------


## addListener('noNeedUpdate', ...)

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de no necesidad de actualización, útil cuando quieres forzar la verificación cada vez que se inicia la aplicación

| Parámetro              | Tipo                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'noNeedUpdate'</code>                                             |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Retorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 4.0.0

--------------------


## addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de actualización disponible, útil cuando quieres forzar la verificación cada vez que se inicia la aplicación

| Parámetro              | Tipo                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                                            |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Retorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 4.0.0

--------------------


## addListener('downloadComplete', ...)

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Escucha eventos de downloadComplete.

| Parámetro              | Tipo                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadComplete'</code>                                                             |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Retorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 4.0.0

--------------------


## addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de actualización Mayor en la Aplicación, te permite saber cuando una actualización mayor está bloqueada al establecer disableAutoUpdateBreaking

| Parámetro              | Tipo                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Retorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 2.3.0

--------------------


## addListener('updateFailed', ...)

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de fallo de actualización en la Aplicación, te permite saber cuando la actualización ha fallado al instalarse en el próximo inicio de la aplicación

| Parámetro              | Tipo                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateFailed'</code>                                                         |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Retorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 2.3.0

--------------------


## addListener('downloadFailed', ...)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de fallo de descarga en la Aplicación, te permite saber cuando la descarga de un Paquete ha fallado

| Parámetro              | Tipo                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadFailed'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Retorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 4.0.0

--------------------


## addListener('appReloaded', ...)

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Escucha el evento de recarga en la Aplicación, te permite saber cuando ha ocurrido una recarga

| Parámetro              | Tipo                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Retorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 4.3.0

--------------------


## addListener('appReady', ...)

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de aplicación lista en la Aplicación, te permite saber cuando la aplicación está lista para usar

| Parámetro              | Tipo                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'appReady'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Retorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Desde:** 5.1.0

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Obtiene si la actualización automática está disponible (no deshabilitada por serverUrl).

**Retorna:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Obtiene el siguiente Paquete que se usará cuando la aplicación se recargue.
Retorna null si no hay un siguiente Paquete establecido.

**Retorna:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Desde:** 6.8.0

--------------------


## setShakeMenu(...)

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Habilita o deshabilita el menú de sacudida para propósitos de depuración/prueba

| Parámetro         | Tipo                                                                | Descripción                                              |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| **`options`** | <code><a href="#setshakemenuoptions">SetShakeMenuOptions</a></code> | Contiene el booleano Habilitado para habilitar o deshabilitar el menú de sacudida |

**Desde:** 7.5.0

--------------------


## isShakeMenuEnabled()

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Obtiene el estado actual del menú de sacudida

**Retorna:** <code>Promise&lt;<a href="#shakemenuenabled">ShakeMenuEnabled</a>&gt;</code>

**Desde:** 7.5.0

--------------------


## Interfaces


### AppReadyResult

| Prop         | Tipo                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| Prop             | Tipo                                                  |
| ---------------- | ----------------------------------------------------- |
| **`id`**         | <code>string</code>                                   |
| **`version`**    | <code>string</code>                                   |
| **`downloaded`** | <code>string</code>                                   |
| **`checksum`**   | <code>string</code>                                   |
| **`status`**     | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| Prop      | Tipo                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl

| Prop      | Tipo                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### ChannelUrl

| Prop      | Tipo                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### DownloadOptions

Esta URL y versiones se usan para descargar el Paquete desde el servidor. Si usas backend, toda la información será proporcionada por el método getLatest.
Si no usas backend, necesitas proporcionar la URL y versión del Paquete. Checksum y sessionKey son requeridos si cifraste el Paquete con el comando CLI encrypt, deberías recibirlos como resultado del comando.

| Prop             | Tipo                         | Descripción                                                                                                                                                      | Por defecto                | Desde |
| ---------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`**        | <code>string</code>          | La URL del archivo zip del Paquete (ej: dist.zip) a descargar. (Puede ser cualquier URL. Ej: Amazon S3, una etiqueta de GitHub, cualquier otro lugar donde hayas alojado tu Paquete.) |                        |       |
| **`version`**    | <code>string</code>          | El código/nombre de versión de este Paquete/versión                                                                                                                     |                        |       |
| **`sessionKey`** | <code>string</code>          | La clave de sesión para la actualización, cuando el Paquete está cifrado con una clave de sesión                                                                                  | <code>undefined</code> | 4.0.0 |
| **`checksum`**   | <code>string</code>          | El checksum para la actualización, debe estar en sha256 y cifrado con clave privada si el Paquete está cifrado                                                    | <code>undefined</code> | 4.0.0 |
| **`manifest`**   | <code>ManifestEntry[]</code> | El manifiesto para descargas de múltiples archivos                                                                                                                            | <code>undefined</code> | 6.1.0 |


### ManifestEntry

| Prop               | Tipo                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### BundleId

| Prop     | Tipo                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListResult

| Prop          | Tipo                      |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| Prop      | Tipo                 | Descripción                                                                                                                                   | Por defecto            | Desde  |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | Si retornar la lista de Paquetes sin procesar o el manifiesto. Si es true, la lista intentará leer la base de datos interna en lugar de archivos en disco. | <code>false</code> | 6.14.0 |


### ResetOptions

| Prop                   | Tipo                 |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| Prop         | Tipo                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code>                               |


### MultiDelayConditions

| Prop                  | Tipo                          |
| --------------------- | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### DelayCondition

| Prop        | Tipo                                                      | Descripción                              |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`**  | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Configura condiciones de retraso en setMultiDelay |
| **`value`** | <code>string</code>                                       |                                          |


### LatestVersion

| Prop             | Tipo                         | Descripción                | Desde |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`**    | <code>string</code>          | Resultado del método getLatest | 4.0.0 |
| **`checksum`**   | <code>string</code>          |                            | 6     |
| **`major`**      | <code>boolean</code>         |                            |       |
| **`message`**    | <code>string</code>          |                            |       |
| **`sessionKey`** | <code>string</code>          |                            |       |
| **`error`**      | <code>string</code>          |                            |       |
| **`old`**        | <code>string</code>          |                            |       |
| **`url`**        | <code>string</code>          |                            |       |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 6.1   |


### GetLatestOptions

| Prop          | Tipo                | Descripción                                                                                     | Por defecto                | Desde |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | El canal para obtener la última versión El canal debe permitir 'self_assign' para que esto funcione | <code>undefined</code> | 6.8.0 |


### ChannelRes

| Prop          | Tipo                | Descripción                   | Desde |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`**  | <code>string</code> | Estado actual de establecer canal | 4.7.0 |
| **`error`**   | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |


### SetChannelOptions

| Prop                    | Tipo                 |
| ----------------------- | -------------------- |
| **`channel`**           | <code>string</code>  |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| Prop                    | Tipo                 |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes

| Prop           | Tipo                 | Descripción                   | Desde |
| -------------- | -------------------- | ----------------------------- | ----- |
| **`channel`**  | <code>string</code>  | Estado actual de obtener canal | 4.8.0 |
| **`error`**    | <code>string</code>  |                               |       |
| **`message`**  | <code>string</code>  |                               |       |
| **`status`**   | <code>string</code>  |                               |       |
| **`allowSet`** | <code>boolean</code> |                               |       |


### ListChannelsResult

| Prop           | Tipo                       | Descripción                | Desde |
| -------------- | -------------------------- | -------------------------- | ----- |
| **`channels`** | <code>ChannelInfo[]</code> | Lista de canales disponibles | 7.5.0 |


### ChannelInfo

| Prop                 | Tipo                 | Descripción                                     | Desde |
| -------------------- | -------------------- | ----------------------------------------------- | ----- |
| **`id`**             | <code>string</code>  | El ID del canal                                  | 7.5.0 |
| **`name`**           | <code>string</code>  | El nombre del canal                                | 7.5.0 |
| **`public`**         | <code>boolean</code> | Si este es un canal público                | 7.5.0 |
| **`allow_self_set`** | <code>boolean</code> | Si los dispositivos pueden auto-asignarse a este canal | 7.5.0 |


### SetCustomIdOptions

| Prop           | Tipo                |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### BuiltinVersion

| Prop          | Tipo                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### DeviceId

| Prop           | Tipo                |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### PluginVersion

| Prop          | Tipo                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### AutoUpdateEnabled

| Prop          | Tipo                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| Prop         | Tipo                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### DownloadEvent

| Prop          | Tipo                                              | Descripción                                    | Desde |
| ------------- | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`percent`** | <code>number</code>                               | Estado actual de descarga, entre 0 y 100. | 4.0.0 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeedEvent

| Prop         | Tipo                                              | Descripción                                    | Desde |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Estado actual de descarga, entre 0 y 100. | 4.0.0 |


### UpdateAvailableEvent

| Prop         | Tipo                                              | Descripción                                    | Desde |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Estado actual de descarga, entre 0 y 100. | 4.0.0 |


### DownloadCompleteEvent

| Prop         | Tipo                                              | Descripción                          | Desde |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Se emite cuando una nueva actualización está disponible. | 4.0.0 |


### MajorAvailableEvent

| Prop          | Tipo                | Descripción                                | Desde |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | Se emite cuando un nuevo Paquete mayor está disponible. | 4.0.0 |


### UpdateFailedEvent

| Prop         | Tipo                                              | Descripción                           | Desde |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Se emite cuando una actualización falla al instalarse. | 4.0.0 |


### DownloadFailedEvent

| Prop          | Tipo                | Descripción                | Desde |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Se emite cuando falla una descarga. | 4.0.0 |


### AppReadyEvent

| Prop         | Tipo                                              | Descripción                           | Desde |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Se emite cuando la aplicación está lista para usar. | 5.2.0 |
| **`status`** | <code>string</code>                               |                                       |       |


### AutoUpdateAvailable

| Prop            | Tipo                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


### SetShakeMenuOptions

| Prop          | Tipo                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### ShakeMenuEnabled

| Prop          | Tipo                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


## Alias de Tipos


### BundleStatus

Pendiente: El Paquete está pendiente de ser **ESTABLECIDO** como el próximo Paquete.
downloading: El Paquete se está descargando.
Éxito: El Paquete se ha descargado y está listo para ser **ESTABLECIDO** como el próximo Paquete.
Error: El Paquete ha fallado al descargarse.

<code>'Éxito' | 'Error' | 'Pendiente' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>

</docgen-API>
