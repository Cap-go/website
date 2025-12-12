---
title: "Funciones y configuración"
description: "Todos los métodos y configuraciones disponibles del plugin"
sidebar:
  order: 2
---

# Configuración del plugin Updater

<docgen-config>
<!--Actualiza los comentarios JSDoc del archivo fuente y vuelve a ejecutar docgen para actualizar la documentación a continuación-->

CapacitorUpdater se puede configurar con estas opciones:

| Prop | Tipo | Descripción | Predeterminado | Desde |
| --- | --- | --- | --- | --- |
| **`appReadyTimeout`** | `number` | Configura el número de milisegundos que el plugin nativo debe esperar antes de considerar una actualización como 'fallida'. Solo disponible para Android e iOS. | `10000 // (10 segundos)` |  |
| **`responseTimeout`** | `number` | Configura el número de segundos que el plugin nativo debe esperar antes de considerar un timeout de API. Solo disponible para Android e iOS. | `20 // (20 segundos)` |  |
| **`autoDeleteFailed`** | `boolean` | Configura si el plugin debe eliminar automáticamente los bundles fallidos. Solo disponible para Android e iOS. | `true` |  |
| **`autoDeletePrevious`** | `boolean` | Configura si el plugin debe eliminar automáticamente los bundles anteriores después de una actualización exitosa. Solo disponible para Android e iOS. | `true` |  |
| **`autoUpdate`** | `boolean` | Configura si el plugin debe usar Auto Update a través de un servidor de actualizaciones. Solo disponible para Android e iOS. | `true` |  |
| **`resetWhenUpdate`** | `boolean` | Elimina automáticamente los bundles descargados anteriormente cuando se instala un nuevo bundle de aplicación nativa en el dispositivo. Solo disponible para Android e iOS. | `true` |  |
| **`updateUrl`** | `string` | Configura la URL / endpoint al que se envían las comprobaciones de actualización. Solo disponible para Android e iOS. | `https://plugin.capgo.app/updates` |  |
| **`channelUrl`** | `string` | Configura la URL / endpoint para operaciones de canal. Solo disponible para Android e iOS. | `https://plugin.capgo.app/channel_self` |  |
| **`statsUrl`** | `string` | Configura la URL / endpoint al que se envían las estadísticas de actualización. Solo disponible para Android e iOS. Establece en "" para deshabilitar el reporte de estadísticas. | `https://plugin.capgo.app/stats` |  |
| **`publicKey`** | `string` | Configura la clave pública para cifrado end-to-end de actualizaciones en vivo Versión 2 Solo disponible para Android e iOS. | `undefined` | 6.2.0 |
| **`version`** | `string` | Configura la versión actual de la aplicación. Se usará para la primera solicitud de actualización. Si no se establece, el plugin obtendrá la versión del código nativo. Solo disponible para Android e iOS. | `undefined` | 4.17.48 |
| **`directUpdate`** | `boolean | 'always' | 'atInstall' | 'onLaunch'` | Configura cuándo el plugin debe instalar actualizaciones directamente. Solo para modo autoUpdate. Funciona bien para aplicaciones de menos de 10MB y con cargas hechas usando el flag --partial. Zip o aplicaciones de más de 10MB serán relativamente lentas para que los usuarios actualicen. - false: Nunca hacer actualizaciones directas (usar comportamiento predeterminado: descargar al inicio, establecer cuando está en segundo plano) - atInstall: Actualización directa solo cuando la aplicación está instalada, actualizada desde la tienda, de lo contrario actúa como directUpdate = false - onLaunch: Actualización directa solo en aplicación instalada, actualizada desde la tienda o después de cierre de aplicación, de lo contrario actúa como directUpdate = false - always: Actualización directa en todos los casos anteriores (aplicación instalada, actualizada desde la tienda, después de cierre de aplicación o reanudación de aplicación), nunca actúa como directUpdate = false - true: (obsoleto) Igual que "always" para compatibilidad hacia atrás Solo disponible para Android e iOS. | `false` | 5.1.0 |
| **`autoSplashscreen`** | `boolean` | Maneja automáticamente el ocultamiento de la pantalla de inicio cuando se usa directUpdate. Cuando está habilitado, el plugin ocultará automáticamente la pantalla de inicio después de que se apliquen las actualizaciones o cuando no se necesite actualización. Esto elimina la necesidad de escuchar manualmente los eventos appReady y llamar a SplashScreen.hide(). Solo funciona cuando directUpdate está establecido en "atInstall", "always", "onLaunch" o true. Requiere que el plugin @capacitor/splash-screen esté instalado y configurado con launchAutoHide: false. Requiere que autoUpdate y directUpdate estén habilitados. Solo disponible para Android e iOS. | `false` | 7.6.0 |
| **`autoSplashscreenLoader`** | `boolean` | Muestra un indicador de carga nativo encima de la pantalla de inicio mientras se ejecutan actualizaciones directas automáticas. Solo tiene efecto cuando {@link autoSplashscreen} está habilitado. Requiere que el plugin @capacitor/splash-screen esté instalado y configurado con launchAutoHide: false. Solo disponible para Android e iOS. | `false` | 7.19.0 |
| **`autoSplashscreenTimeout`** | `number` | Oculta automáticamente la pantalla de inicio después del número especificado de milisegundos cuando se usan actualizaciones directas automáticas. Si el timeout transcurre, la actualización continúa descargándose en segundo plano mientras se descarta la pantalla de inicio. Establece en `0` (cero) para deshabilitar el timeout. Cuando el timeout se dispara, el flujo de actualización directa se omite y el bundle descargado se instala en el siguiente segundo plano/lanzamiento. Requiere que {@link autoSplashscreen} esté habilitado. Solo disponible para Android e iOS. | `10000 // (10 segundos)` | 7.19.0 |
| **`periodCheckDelay`** | `number` | Configura el período de retraso para la verificación periódica de actualización. La unidad es en segundos. Solo disponible para Android e iOS. No puede ser menor de 600 segundos (10 minutos). | `0 (deshabilitado)` |  |
| **`localS3`** | `boolean` | Configura la CLI para usar un servidor local para pruebas o servidor de actualización auto-alojado. | `undefined` | 4.17.48 |
| **`localHost`** | `string` | Configura la CLI para usar un servidor local para pruebas o servidor de actualización auto-alojado. | `undefined` | 4.17.48 |
| **`localWebHost`** | `string` | Configura la CLI para usar un servidor local para pruebas o servidor de actualización auto-alojado. | `undefined` | 4.17.48 |
| **`localSupa`** | `string` | Configura la CLI para usar un servidor local para pruebas o servidor de actualización auto-alojado. | `undefined` | 4.17.48 |
| **`localSupaAnon`** | `string` | Configura la CLI para usar un servidor local para pruebas. | `undefined` | 4.17.48 |
| **`localApi`** | `string` | Configura la CLI para usar una API local para pruebas. | `undefined` | 6.3.3 |
| **`localApiFiles`** | `string` | Configura la CLI para usar una API de archivos local para pruebas. | `undefined` | 6.3.3 |
| **`allowModifyUrl`** | `boolean` | Permite que el plugin modifique updateUrl, statsUrl y channelUrl dinámicamente desde el lado de JavaScript. | `false` | 5.4.0 |
| **`allowModifyAppId`** | `boolean` | Permite que el plugin modifique el appId dinámicamente desde el lado de JavaScript. | `false` | 7.14.0 |
| **`allowManualBundleError`** | `boolean` | Permite marcar bundles como erróneos desde JavaScript mientras se usan flujos de actualización manual. Cuando está habilitado, {@link CapacitorUpdaterPlugin.setBundleError} puede cambiar el estado de un bundle a `error`. | `false` | 7.20.0 |
| **`persistCustomId`** | `boolean` | Persiste el customId establecido a través de {@link CapacitorUpdaterPlugin.setCustomId} entre reinicios de la aplicación. Solo disponible para Android e iOS. | `false (será true por defecto en una futura versión principal v8.x.x)` | 7.17.3 |
| **`persistModifyUrl`** | `boolean` | Persiste updateUrl, statsUrl y channelUrl establecidos a través de {@link CapacitorUpdaterPlugin.setUpdateUrl}, {@link CapacitorUpdaterPlugin.setStatsUrl} y {@link CapacitorUpdaterPlugin.setChannelUrl} entre reinicios de la aplicación. Solo disponible para Android e iOS. | `false` | 7.20.0 |
| **`allowSetDefaultChannel`** | `boolean` | Permite o deshabilita que el método {@link CapacitorUpdaterPlugin.setChannel} modifique el defaultChannel. Cuando está establecido en `false`, llamar a `setChannel()` devolverá un error con código `disabled_by_config`. | `true` | 7.34.0 |
| **`defaultChannel`** | `string` | Establece el canal predeterminado para la aplicación en la configuración. Sensible a mayúsculas. Esta configuración anulará el canal predeterminado establecido en la nube, pero seguirá respetando las anulaciones hechas en la nube. Esto requiere que el canal permita que los dispositivos se disocien/asocien por sí mismos en la configuración del canal. https://capgo.app/docs/public-api/channels/#channel-configuration-options | `undefined` | 5.5.0 |
| **`appId`** | `string` | Configura el ID de aplicación para la aplicación en la configuración. | `undefined` | 6.0.0 |
| **`keepUrlPathAfterReload`** | `boolean` | Configura el plugin para mantener la ruta de URL después de una recarga. ADVERTENCIA: Cuando se activa una recarga, 'window.history' se borrará. | `false` | 6.8.0 |
| **`disableJSLogging`** | `boolean` | Deshabilita el registro de JavaScript del plugin. Si es true, el plugin no registrará en la consola de JavaScript. Solo se hará el registro nativo | `false` | 7.3.0 |
| **`shakeMenu`** | `boolean` | Habilita el gesto de agitación para mostrar el menú de actualización para propósitos de depuración/prueba | `false` | 7.5.0 |


</docgen-config>

## Referencia de API

<docgen-index>
<!--Generado automáticamente, no editar manualmente-->

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
<!--Generado automáticamente, no editar manualmente-->

### notifyAppReady

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Notifica a la capa nativa que JavaScript se inicializó correctamente.

**CRÍTICO: Debes llamar a este método en cada inicio de aplicación para prevenir el rollback automático.**

Esta es una simple notificación para confirmar que el JavaScript de tu bundle se cargó y ejecutó.
El servidor web nativo sirvió exitosamente los archivos del bundle y tu runtime de JS inició.
Eso es todo lo que verifica - nada más complejo.

**Lo que desencadena el rollback:**
- NO llamar a este método dentro del timeout (predeterminado: 10 segundos)
- Falla completa de JavaScript (el bundle no se cargará en absoluto)

**Lo que NO desencadena el rollback:**
- Errores de runtime después de la inicialización (fallos de API, crashes, etc.)
- Fallos de solicitudes de red
- Errores de lógica de aplicación

**IMPORTANTE: Llama a esto ANTES de cualquier solicitud de red.**
No esperes a APIs, carga de datos u operaciones asíncronas. Llámalo tan pronto como tu
bundle de JavaScript comience a ejecutarse para confirmar que el bundle en sí es válido.

Mejores prácticas:
- Llámalo inmediatamente en el punto de entrada de tu aplicación (main.js, montaje de componente de aplicación, etc.)
- No lo pongas después de llamadas de red o inicialización pesada
- No lo envuelvas en try/catch con condiciones
- Ajusta {@link PluginsConfig.CapacitorUpdater.appReadyTimeout} si necesitas más tiempo

**Devuelve**

`Promise<AppReadyResult>` — Siempre se resuelve exitosamente con información del bundle actual. Este método nunca falla.


--------------------


### setUpdateUrl

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Establece la URL de actualización para la aplicación dinámicamente en tiempo de ejecución.

Esto anula el valor de configuración {@link PluginsConfig.CapacitorUpdater.updateUrl}.
Requiere que {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} esté establecido en `true`.

Usa {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} para persistir este valor entre reinicios de la aplicación.
De lo contrario, la URL se restablecerá al valor de configuración en el próximo inicio de la aplicación.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `UpdateUrl` | Contiene la URL a usar para verificar actualizaciones. |

**Devuelve**

`Promise<void>` — Se resuelve cuando la URL se actualiza exitosamente.

**Desde:** 5.4.0

**Lanza:** {Error} Si `allowModifyUrl` es false o si la operación falla.


--------------------


### setStatsUrl

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Establece la URL de estadísticas para la aplicación dinámicamente en tiempo de ejecución.

Esto anula el valor de configuración {@link PluginsConfig.CapacitorUpdater.statsUrl}.
Requiere que {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} esté establecido en `true`.

Pasa una cadena vacía para deshabilitar completamente la recopilación de estadísticas.
Usa {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} para persistir este valor entre reinicios de la aplicación.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `StatsUrl` | Contiene la URL a usar para enviar estadísticas, o una cadena vacía para deshabilitar. |

**Devuelve**

`Promise<void>` — Se resuelve cuando la URL se actualiza exitosamente.

**Desde:** 5.4.0

**Lanza:** {Error} Si `allowModifyUrl` es false o si la operación falla.


--------------------


### setChannelUrl

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Establece la URL de canal para la aplicación dinámicamente en tiempo de ejecución.

Esto anula el valor de configuración {@link PluginsConfig.CapacitorUpdater.channelUrl}.
Requiere que {@link PluginsConfig.CapacitorUpdater.allowModifyUrl} esté establecido en `true`.

Usa {@link PluginsConfig.CapacitorUpdater.persistModifyUrl} para persistir este valor entre reinicios de la aplicación.
De lo contrario, la URL se restablecerá al valor de configuración en el próximo inicio de la aplicación.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `ChannelUrl` | Contiene la URL a usar para operaciones de canal. |

**Devuelve**

`Promise<void>` — Se resuelve cuando la URL se actualiza exitosamente.

**Desde:** 5.4.0

**Lanza:** {Error} Si `allowModifyUrl` es false o si la operación falla.


--------------------


### download

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Descarga un nuevo bundle desde la URL proporcionada para instalación posterior.

El bundle descargado se almacena localmente pero no se activa. Para usarlo:
- Llama a {@link next} para establecerlo para instalación en el próximo segundo plano/reinicio de la aplicación
- Llama a {@link set} para activarlo inmediatamente (destruye el contexto de JavaScript actual)

La URL debe apuntar a un archivo zip que contenga:
- Tus archivos de aplicación directamente en la raíz del zip, o
- Una sola carpeta que contenga todos tus archivos de aplicación

El bundle debe incluir un archivo `index.html` en el nivel raíz.

Para bundles cifrados, proporciona los parámetros `sessionKey` y `checksum`.
Para actualizaciones parciales de múltiples archivos, proporciona el array `manifest`.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `DownloadOptions` | Las {@link DownloadOptions} para descargar un nuevo zip de bundle. |

**Devuelve**

`Promise<BundleInfo>` — El {@link BundleInfo} para el bundle descargado.

**Lanza:** {Error} Si la descarga falla o el bundle es inválido.

**Ejemplo**

```ts
const bundle = await CapacitorUpdater.download({
  url: `https://example.com/versions/${version}/dist.zip`,
  version: version
});
// Bundle descargado pero aún no activo
await CapacitorUpdater.next({ id: bundle.id }); // Se activará en el próximo segundo plano
```


--------------------


### next

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Establece el siguiente bundle a activar cuando la aplicación pase a segundo plano o se reinicie.

Esta es la forma recomendada de aplicar actualizaciones ya que no interrumpe la sesión actual del usuario.
El bundle se activará cuando:
- La aplicación pase a segundo plano (el usuario cambie de aplicación), o
- La aplicación sea cerrada y relanzada, o
- Se llame manualmente a {@link reload}

A diferencia de {@link set}, este método NO destruye inmediatamente el contexto de JavaScript actual.
Tu aplicación continúa ejecutándose normalmente hasta que ocurra uno de los eventos anteriores.

Usa {@link setMultiDelay} para agregar condiciones adicionales antes de que se aplique la actualización.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `BundleId` | Contiene el ID del bundle a establecer como siguiente. Usa {@link BundleInfo.id} de un bundle descargado. |

**Devuelve**

`Promise<BundleInfo>` — El {@link BundleInfo} para el bundle especificado.

**Lanza:** {Error} Cuando no hay archivo index.html dentro de la carpeta del bundle o el bundle no existe.


--------------------


### set

```typescript
set(options: BundleId) => Promise<void>
```

Establece el bundle actual y recarga inmediatamente la aplicación.

**IMPORTANTE: Esta es una operación terminal que destruye el contexto de JavaScript actual.**

Cuando llamas a este método:
- El contexto completo de JavaScript se destruye inmediatamente
- La aplicación se recarga desde una carpeta diferente con archivos diferentes
- NINGÚN código después de esta llamada se ejecutará
- NINGUNA promesa se resolverá
- NINGÚN callback se disparará
- Los event listeners registrados después de esta llamada son poco confiables y pueden no dispararse nunca

La recarga ocurre automáticamente - no necesitas hacer nada más.
Si necesitas preservar el estado como la ruta de URL actual, usa la opción de configuración {@link PluginsConfig.CapacitorUpdater.keepUrlPathAfterReload}.
Para otras necesidades de preservación de estado, guarda tus datos antes de llamar a este método (ej., en localStorage).

**No** intentes ejecutar lógica adicional después de llamar a `set()` - no funcionará como se espera.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `BundleId` | Un objeto {@link BundleId} que contiene el nuevo ID de bundle a establecer como actual. |

**Devuelve**

`Promise<void>` — Una promesa que nunca se resolverá porque el contexto de JavaScript se destruye.

**Lanza:** {Error} Cuando no hay archivo index.html dentro de la carpeta del bundle.


--------------------


### delete

```typescript
delete(options: BundleId) => Promise<void>
```

Elimina un bundle del almacenamiento local para liberar espacio en disco.

No puedes eliminar:
- El bundle actualmente activo
- El bundle `builtin` (la versión enviada con tu aplicación)
- El bundle establecido como `next` (llama primero a {@link next} con un bundle diferente)

Usa {@link list} para obtener todos los IDs de bundle disponibles.

**Nota:** El ID del bundle NO es lo mismo que el nombre de versión.
Usa el campo `id` de {@link BundleInfo}, no el campo `version`.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `BundleId` | Un objeto {@link BundleId} que contiene el ID del bundle a eliminar. |

**Devuelve**

`Promise<void>` — Se resuelve cuando el bundle se elimina exitosamente.

**Lanza:** {Error} Si el bundle está actualmente en uso o no existe.


--------------------


### setBundleError

```typescript
setBundleError(options: BundleId) => Promise<BundleInfo>
```

Marca manualmente un bundle como fallido/erróneo en modo de actualización manual.

Esto es útil cuando detectas que un bundle tiene problemas críticos y quieres prevenir
que se use nuevamente. El estado del bundle cambiará a `error` y el plugin
evitará usar este bundle en el futuro.

**Requisitos:**
- {@link PluginsConfig.CapacitorUpdater.allowManualBundleError} debe estar establecido en `true`
- Solo funciona en modo de actualización manual (cuando autoUpdate está deshabilitado)

Caso de uso común: Después de descargar y probar un bundle, descubres que tiene errores
críticos y quieres marcarlo como fallido para que no se vuelva a intentar.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `BundleId` | Un objeto {@link BundleId} que contiene el ID del bundle a marcar como erróneo. |

**Devuelve**

`Promise<BundleInfo>` — El {@link BundleInfo} actualizado con estado establecido en `error`.

**Desde:** 7.20.0

**Lanza:** {Error} Cuando el bundle no existe o `allowManualBundleError` es false.


--------------------


### list

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Obtiene todos los bundles descargados localmente almacenados en tu aplicación.

Esto devuelve todos los bundles que se han descargado y están disponibles localmente, incluyendo:
- El bundle actualmente activo
- El bundle `builtin` (enviado con tu aplicación)
- Cualquier bundle descargado esperando ser activado
- Bundles fallidos (con estado `error`)

Úsalo para:
- Verificar el espacio disponible en disco contando bundles
- Eliminar bundles antiguos con {@link delete}
- Monitorear el estado de descarga de bundles

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `ListOptions | undefined` | Las {@link ListOptions} para personalizar la salida de la lista de bundles. |

**Devuelve**

`Promise<BundleListResult>` — Una promesa que contiene el array de objetos {@link BundleInfo}.

**Lanza:** {Error} Si la operación falla.


--------------------


### reset

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Restablece la aplicación a un bundle conocido como bueno.

Este método ayuda a recuperarse de actualizaciones problemáticas revirtiendo a:
- El bundle `builtin` (la versión original enviada con tu aplicación a App Store/Play Store)
- El último bundle cargado exitosamente (el bundle más reciente que funcionó correctamente)

**IMPORTANTE: Esto desencadena una recarga inmediata de la aplicación, destruyendo el contexto de JavaScript actual.**
Consulta {@link set} para detalles sobre las implicaciones de esta operación.

Casos de uso:
- Recuperación de emergencia cuando una actualización causa problemas críticos
- Probar funcionalidad de rollback
- Proporcionar a los usuarios una opción de "restablecer a fábrica"

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `ResetOptions | undefined` |  |

**Devuelve**

`Promise<void>` — Una promesa que puede no resolverse nunca porque la aplicación se recargará.

**Lanza:** {Error} Si la operación de restablecimiento falla.


--------------------


### current

```typescript
current() => Promise<CurrentBundleResult>
```

Obtiene información sobre el bundle actualmente activo.

Devuelve:
- `bundle`: La información del bundle actualmente activo
- `native`: La versión del bundle builtin (la versión original de la aplicación de App/Play Store)

Si no se han aplicado actualizaciones, `bundle.id` será `"builtin"`, indicando que la aplicación
está ejecutando la versión original enviada con la aplicación nativa.

Úsalo para:
- Mostrar la versión actual a los usuarios
- Verificar si una actualización está actualmente activa
- Comparar contra actualizaciones disponibles
- Registrar el bundle activo para depuración

**Devuelve**

`Promise<CurrentBundleResult>` — Una promesa con la información del bundle actual y versión nativa.

**Lanza:** {Error} Si la operación falla.


--------------------


### reload

```typescript
reload() => Promise<void>
```

Recarga manualmente la aplicación para aplicar una actualización pendiente.

Esto desencadena el mismo comportamiento de recarga que ocurre automáticamente cuando la aplicación pasa a segundo plano.
Si has llamado a {@link next} para poner en cola una actualización, llamar a `reload()` la aplicará inmediatamente.

**IMPORTANTE: Esto destruye el contexto de JavaScript actual inmediatamente.**
Consulta {@link set} para detalles sobre las implicaciones de esta operación.

Casos de uso comunes:
- Aplicar una actualización inmediatamente después de la descarga en lugar de esperar al segundo plano
- Proporcionar un botón "Reiniciar ahora" a los usuarios después de que una actualización esté lista
- Probar flujos de actualización durante el desarrollo

Si no hay actualización pendiente (sin llamada a {@link next}), esto simplemente recarga el bundle actual.

**Devuelve**

`Promise<void>` — Una promesa que puede no resolverse nunca porque la aplicación se recargará.

**Lanza:** {Error} Si la operación de recarga falla.


--------------------


### setMultiDelay

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Configura condiciones que deben cumplirse antes de que se aplique una actualización pendiente.

Después de llamar a {@link next} para poner en cola una actualización, usa este método para controlar cuándo se aplica.
La actualización solo se instalará después de que TODAS las condiciones especificadas estén satisfechas.

Tipos de condición disponibles:
- `background`: Esperar a que la aplicación pase a segundo plano. Opcionalmente especifica la duración en milisegundos.
- `kill`: Esperar a que la aplicación sea cerrada y relanzada (**Nota:** El comportamiento actual desencadena la actualización inmediatamente al cerrar, no en el próximo segundo plano. Esto se corregirá en v8.)
- `date`: Esperar hasta una fecha/hora específica (formato ISO 8601)
- `nativeVersion`: Esperar hasta que la aplicación nativa sea actualizada a una versión específica

Formatos de valor de condición:
- `background`: Número en milisegundos (ej., `"300000"` para 5 minutos), u omitir para inmediato
- `kill`: No se necesita valor
- `date`: Cadena de fecha ISO 8601 (ej., `"2025-12-31T23:59:59Z"`)
- `nativeVersion`: Cadena de versión (ej., `"2.0.0"`)

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `MultiDelayConditions` | Contiene el array de {@link MultiDelayConditions} de condiciones. |

**Devuelve**

`Promise<void>` — Se resuelve cuando las condiciones de retraso se establecen.

**Desde:** 4.3.0

**Lanza:** {Error} Si la operación falla o las condiciones son inválidas.

**Ejemplo**

```ts
// Actualizar después de que el usuario cierre la aplicación O después de 5 minutos en segundo plano
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    { kind: 'kill' },
    { kind: 'background', value: '300000' }
  ]
});
```

**Ejemplo**

```ts
// Actualizar después de una fecha específica
await CapacitorUpdater.setMultiDelay({
  delayConditions: [{ kind: 'date', value: '2025-12-31T23:59:59Z' }]
});
```

**Ejemplo**

```ts
// Comportamiento predeterminado: actualizar en el próximo segundo plano
await CapacitorUpdater.setMultiDelay({
  delayConditions: [{ kind: 'background' }]
});
```


--------------------


### cancelDelay

```typescript
cancelDelay() => Promise<void>
```

Cancela todas las condiciones de retraso y aplica la actualización pendiente inmediatamente.

Si has establecido condiciones de retraso con {@link setMultiDelay}, este método las borra
y desencadena que la actualización pendiente se aplique en el próximo segundo plano o reinicio de la aplicación.

Esto es útil cuando:
- El usuario solicita manualmente actualizar ahora (ej., hace clic en el botón "Actualizar ahora")
- Tu aplicación detecta que es un buen momento para actualizar (ej., el usuario terminó una tarea crítica)
- Quieres anular un retraso basado en tiempo anticipadamente

**Devuelve**

`Promise<void>` — Se resuelve cuando las condiciones de retraso se borran.

**Desde:** 4.0.0

**Lanza:** {Error} Si la operación falla.


--------------------


### getLatest

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Verifica el servidor de actualizaciones para la última versión de bundle disponible.

Esto consulta tu URL de actualización configurada (o backend de Capgo) para ver si hay un bundle más nuevo
disponible para descargar. NO descarga el bundle automáticamente.

La respuesta incluye:
- `version`: El identificador de versión más reciente disponible
- `url`: URL de descarga para el bundle (si está disponible)
- `breaking`: Si esta actualización está marcada como incompatible (requiere actualización de aplicación nativa)
- `message`: Mensaje opcional del servidor
- `manifest`: Lista de archivos para actualizaciones parciales (si se usan descargas de múltiples archivos)

Después de recibir la información de la última versión, puedes:
1. Compararla con tu versión actual
2. Descargarla usando {@link download}
3. Aplicarla usando {@link next} o {@link set}

**Importante: Manejo de errores para "no hay nueva versión disponible"**

Cuando la versión actual del dispositivo coincide con la última versión en el servidor (es decir, el dispositivo ya está
actualizado), el servidor devuelve una respuesta 200 con `error: "no_new_version_available"` y
`message: "No new version available"`. **Esto hace que `getLatest()` lance un error**, aunque
esta es una condición normal y esperada.

Debes capturar este error específico para manejarlo con gracia:

```typescript
try {
  const latest = await CapacitorUpdater.getLatest();
  // Nueva versión disponible, proceder con la descarga
} catch (error) {
  if (error.message === 'No new version available') {
    // El dispositivo ya está en la última versión - esto es normal
    console.log('Ya está actualizado');
  } else {
    // Ocurrió un error real
    console.error('Fallo al verificar actualizaciones:', error);
  }
}
```

En este escenario, el servidor:
- Registra la solicitud con un mensaje "No new version available"
- Envía una acción de estadística "noNew" para rastrear que el dispositivo verificó actualizaciones pero ya estaba actualizado (hecho en el backend)

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `GetLatestOptions | undefined` | {@link GetLatestOptions} opcional para especificar qué canal verificar. |

**Devuelve**

`Promise<LatestVersion>` — Información sobre la última versión de bundle disponible.

**Desde:** 4.0.0

**Lanza:** {Error} Siempre lanza cuando no hay nueva versión disponible (`error: "no_new_version_available"`), o cuando la solicitud falla.


--------------------


### setChannel

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Asigna este dispositivo a un canal de actualización específico en tiempo de ejecución.

Los canales te permiten distribuir diferentes versiones de bundle a diferentes grupos de usuarios
(ej., "production", "beta", "staging"). Este método cambia el dispositivo a un nuevo canal.

**Requisitos:**
- El canal objetivo debe permitir auto-asignación (configurado en tu panel de Capgo o backend)
- El backend puede aceptar o rechazar la solicitud basándose en la configuración del canal

**Cuándo usar:**
- Después de que la aplicación esté lista y el usuario haya interactuado (ej., optó por el programa beta)
- Para implementar cambio de canal en la aplicación (toggle beta, acceso de probador, etc.)
- Para cambios de canal impulsados por el usuario

**Cuándo NO usar:**
- En el arranque/inicialización de la aplicación - usa la configuración {@link PluginsConfig.CapacitorUpdater.defaultChannel} en su lugar
- Antes de la interacción del usuario

**Importante: Escucha el evento `channelPrivate`**

Cuando un usuario intenta establecer un canal que no permite auto-asignación de dispositivo, el método
lanzará un error Y disparará un evento {@link addListener}('channelPrivate'). Debes escuchar este evento
para proporcionar retroalimentación apropiada a los usuarios:

```typescript
CapacitorUpdater.addListener('channelPrivate', (data) => {
  console.warn(`No se puede acceder al canal "${data.channel}": ${data.message}`);
  // Mostrar mensaje amigable para el usuario
});
```

Esto envía una solicitud al backend de Capgo vinculando tu ID de dispositivo al canal especificado.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `SetChannelOptions` | Las {@link SetChannelOptions} que contienen el nombre del canal y disparador opcional de auto-actualización. |

**Devuelve**

`Promise<ChannelRes>` — Resultado de la operación del canal con estado y error/mensaje opcional.

**Desde:** 4.7.0

**Lanza:** {Error} Si el canal no existe o no permite auto-asignación.


--------------------


### unsetChannel

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Elimina la asignación de canal del dispositivo y vuelve al canal predeterminado.

Esto desvincula el dispositivo de cualquier canal específicamente asignado, causando que vuelva a:
- El {@link PluginsConfig.CapacitorUpdater.defaultChannel} si está configurado, o
- El canal predeterminado de tu backend para esta aplicación

Úsalo cuando:
- Los usuarios optan por salir de programas beta/prueba
- Quieres restablecer un dispositivo a distribución de actualización estándar
- Probando comportamiento de cambio de canal

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `UnsetChannelOptions` |  |

**Devuelve**

`Promise<void>` — Se resuelve cuando el canal se desestablece exitosamente.

**Desde:** 4.7.0

**Lanza:** {Error} Si la operación falla.


--------------------


### getChannel

```typescript
getChannel() => Promise<GetChannelRes>
```

Obtiene el canal actual asignado a este dispositivo.

Devuelve información sobre:
- `channel`: El nombre del canal actualmente asignado (si hay)
- `allowSet`: Si el canal permite auto-asignación
- `status`: Estado de la operación
- `error`/`message`: Información adicional (si aplica)

Úsalo para:
- Mostrar el canal actual a los usuarios (ej., "Estás en el canal Beta")
- Verificar si un dispositivo está en un canal específico antes de mostrar características
- Verificar asignación de canal después de llamar a {@link setChannel}

**Devuelve**

`Promise<GetChannelRes>` — La información del canal actual.

**Desde:** 4.8.0

**Lanza:** {Error} Si la operación falla.


--------------------


### listChannels

```typescript
listChannels() => Promise<ListChannelsResult>
```

Obtiene una lista de todos los canales disponibles para que este dispositivo se auto-asigne.

Solo devuelve canales donde `allow_self_set` es `true`. Estos son canales a los que
los usuarios pueden cambiar usando {@link setChannel} sin intervención del administrador del backend.

Cada canal incluye:
- `id`: Identificador único del canal
- `name`: Nombre del canal legible por humanos
- `public`: Si el canal es públicamente visible
- `allow_self_set`: Siempre `true` en los resultados (filtrado a solo canales auto-asignables)

Úsalo para:
- Construir una interfaz de selección de canal para usuarios (ej., botón "Unirse a Beta")
- Mostrar canales de prueba/vista previa disponibles
- Implementar características de descubrimiento de canales

**Devuelve**

`Promise<ListChannelsResult>` — Lista de canales a los que el dispositivo puede auto-asignarse.

**Desde:** 7.5.0

**Lanza:** {Error} Si la operación falla o la solicitud al backend falla.


--------------------


### setCustomId

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Establece un identificador personalizado para este dispositivo.

Esto te permite identificar dispositivos por tu propio ID personalizado (ID de usuario, ID de cuenta, etc.)
en lugar de o además del ID de hardware único del dispositivo. El ID personalizado se envía
a tu servidor de actualizaciones y se puede usar para:
- Apuntar a usuarios específicos para actualizaciones
- Análisis y seguimiento de usuarios
- Depuración y soporte (correlacionar dispositivos con usuarios)
- Pruebas A/B o feature flagging

**Persistencia:**
- Cuando {@link PluginsConfig.CapacitorUpdater.persistCustomId} es `true`, el ID persiste entre reinicios de la aplicación
- Cuando es `false`, el ID solo se mantiene para la sesión actual

**Limpiar el ID personalizado:**
- Pasa una cadena vacía `""` para eliminar cualquier ID personalizado almacenado

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `SetCustomIdOptions` | Las {@link SetCustomIdOptions} que contienen la cadena de identificador personalizado. |

**Devuelve**

`Promise<void>` — Se resuelve inmediatamente (operación síncrona).

**Desde:** 4.9.0

**Lanza:** {Error} Si la operación falla.


--------------------


### getBuiltinVersion

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Obtiene la versión del bundle builtin (la versión original enviada con tu aplicación nativa).

Esto devuelve la versión del bundle que se incluyó cuando la aplicación se instaló
desde App Store o Play Store. Esta NO es la versión del bundle actualmente activo -
usa {@link current} para eso.

Devuelve:
- El valor de configuración {@link PluginsConfig.CapacitorUpdater.version} si está establecido, o
- La versión de la aplicación nativa de las configuraciones de plataforma (package.json, Info.plist, build.gradle)

Úsalo para:
- Mostrar la versión "de fábrica" a los usuarios
- Comparar contra versiones de bundles descargados
- Determinar si se han aplicado actualizaciones
- Depurar discrepancias de versión

**Devuelve**

`Promise<BuiltinVersion>` — La cadena de versión del bundle builtin.

**Desde:** 5.2.0


--------------------


### getDeviceId

```typescript
getDeviceId() => Promise<DeviceId>
```

Obtiene el identificador único y amigable con la privacidad para este dispositivo.

Este ID se usa para identificar el dispositivo al comunicarse con servidores de actualización.
Es generado y almacenado de forma segura automáticamente por el plugin.

**Características de privacidad y seguridad:**
- Generado como UUID (no basado en identificadores de hardware)
- Almacenado de forma segura en almacenamiento seguro específico de plataforma
- Android: Android Keystore (persiste entre reinstalaciones de aplicación en API 23+)
- iOS: Keychain con `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`
- No sincronizado a la nube (iOS)
- Sigue las mejores prácticas de privacidad de Apple y Google
- Los usuarios pueden limpiarlo a través de configuración del sistema (Android) o acceso a keychain (iOS)

**Persistencia:**
El ID del dispositivo persiste entre reinstalaciones de aplicación para mantener identidad de dispositivo consistente
para seguimiento de actualización y análisis.

Úsalo para:
- Depurar problemas de entrega de actualización (verificar qué ID ve el servidor)
- Implementar características específicas del dispositivo
- Correlacionar registros del servidor con dispositivos específicos

**Devuelve**

`Promise<DeviceId>` — La cadena de identificador único del dispositivo.

**Lanza:** {Error} Si la operación falla.


--------------------


### getPluginVersion

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Obtiene la versión del plugin Capacitor Updater instalado en tu aplicación.

Esto devuelve la versión del código del plugin nativo (Android/iOS), que se envía
al servidor de actualización con cada solicitud. Esta NO es tu versión de aplicación o versión de bundle.

Úsalo para:
- Depurar problemas específicos del plugin (al reportar errores)
- Verificar instalación y versión del plugin
- Verificar compatibilidad con características del backend
- Mostrar en pantallas de depuración/acerca de

**Devuelve**

`Promise<PluginVersion>` — La cadena de versión del plugin Capacitor Updater.

**Lanza:** {Error} Si la operación falla.


--------------------


### isAutoUpdateEnabled

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Verifica si las actualizaciones automáticas están actualmente habilitadas.

Devuelve `true` si {@link PluginsConfig.CapacitorUpdater.autoUpdate} está habilitado,
lo que significa que el plugin verificará, descargará y aplicará actualizaciones automáticamente.

Devuelve `false` si está en modo manual, donde tú controlas el flujo de actualización usando
{@link getLatest}, {@link download}, {@link next} y {@link set}.

Úsalo para:
- Determinar qué flujo de actualización está usando tu aplicación
- Mostrar/ocultar interfaz de actualización manual basándose en el modo
- Depurar comportamiento de actualización

**Devuelve**

`Promise<AutoUpdateEnabled>` — `true` si auto-update está habilitado, `false` si está en modo manual.

**Lanza:** {Error} Si la operación falla.


--------------------


### removeAllListeners

```typescript
removeAllListeners() => Promise<void>
```

Elimina todos los event listeners registrados para este plugin.

Esto desregistra todos los listeners agregados a través de {@link addListener} para todos los tipos de evento:
- `download`
- `noNeedUpdate`
- `updateAvailable`
- `downloadComplete`
- `downloadFailed`
- `breakingAvailable` / `majorAvailable`
- `updateFailed`
- `appReloaded`
- `appReady`

Úsalo durante la limpieza (ej., al desmontar componentes o cerrar pantallas)
para prevenir fugas de memoria de event listeners persistentes.

**Devuelve**

`Promise<void>` — Se resuelve cuando todos los listeners se eliminan.

**Desde:** 1.0.0


--------------------


### addListener('download')

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de descarga de bundle en la aplicación. Se dispara una vez que ha comenzado una descarga, durante la descarga y cuando finaliza.
Esto te devolverá todo el porcentaje de descarga durante la descarga

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'download'` |  |
| `listenerFunc` | `(state: DownloadEvent) => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 2.0.11


--------------------


### addListener('noNeedUpdate')

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de no necesidad de actualización, útil cuando quieres forzar verificación cada vez que se inicia la aplicación

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'noNeedUpdate'` |  |
| `listenerFunc` | `(state: NoNeedEvent) => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 4.0.0


--------------------


### addListener('updateAvailable')

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de actualización disponible, útil cuando quieres forzar verificación cada vez que se inicia la aplicación

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'updateAvailable'` |  |
| `listenerFunc` | `(state: UpdateAvailableEvent) => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 4.0.0


--------------------


### addListener('downloadComplete')

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Escucha eventos downloadComplete.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'downloadComplete'` |  |
| `listenerFunc` | `(state: DownloadCompleteEvent) => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 4.0.0


--------------------


### addListener('breakingAvailable')

```typescript
addListener(eventName: 'breakingAvailable', listenerFunc: (state: BreakingAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Escucha eventos de actualización breaking cuando el backend marca una actualización como incompatible con la aplicación actual.
Emite el mismo payload que el listener legacy `majorAvailable`.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'breakingAvailable'` |  |
| `listenerFunc` | `(state: MajorAvailableEvent) => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 7.22.0


--------------------


### addListener('majorAvailable')

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de actualización Mayor en la aplicación, te permite saber cuándo una actualización mayor está bloqueada al establecer disableAutoUpdateBreaking

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'majorAvailable'` |  |
| `listenerFunc` | `(state: MajorAvailableEvent) => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 2.3.0


--------------------


### addListener('updateFailed')

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de fallo de actualización en la aplicación, te permite saber cuándo una actualización ha fallado al instalarse en el próximo inicio de la aplicación

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'updateFailed'` |  |
| `listenerFunc` | `(state: UpdateFailedEvent) => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 2.3.0


--------------------


### addListener('downloadFailed')

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de fallo de descarga en la aplicación, te permite saber cuándo una descarga de bundle ha fallado

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'downloadFailed'` |  |
| `listenerFunc` | `(state: DownloadFailedEvent) => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 4.0.0


--------------------


### addListener('appReloaded')

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Escucha el evento de recarga en la aplicación, te permite saber cuándo ha ocurrido una recarga

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'appReloaded'` |  |
| `listenerFunc` | `() => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 4.3.0


--------------------


### addListener('appReady')

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de aplicación lista en la aplicación, te permite saber cuándo la aplicación está lista para usar, este evento se retiene hasta ser consumido.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'appReady'` |  |
| `listenerFunc` | `(state: AppReadyEvent) => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 5.1.0


--------------------


### addListener('channelPrivate')

```typescript
addListener(eventName: 'channelPrivate', listenerFunc: (state: ChannelPrivateEvent) => void) => Promise<PluginListenerHandle>
```

Escucha el evento de canal privado, disparado al intentar establecer un canal que no permite auto-asignación de dispositivo.

Este evento es útil para:
- Informar a los usuarios que no tienen permiso para cambiar a un canal específico
- Implementar manejo de errores personalizado para restricciones de canal
- Registrar intentos de acceso no autorizado a canal

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `eventName` | `'channelPrivate'` |  |
| `listenerFunc` | `(state: ChannelPrivateEvent) => void` |  |

**Devuelve**

`Promise<PluginListenerHandle>`

**Desde:** 7.34.0


--------------------


### isAutoUpdateAvailable

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Verifica si la característica de auto-actualización está disponible (no deshabilitada por configuración de servidor personalizado).

Devuelve `false` cuando una `updateUrl` personalizada está configurada, ya que esto típicamente indica
que estás usando un servidor de actualización auto-alojado que puede no soportar todas las características de auto-actualización.

Devuelve `true` cuando se usa el backend predeterminado de Capgo o cuando la característica está disponible.

Esto es diferente de {@link isAutoUpdateEnabled}:
- `isAutoUpdateEnabled()`: Verifica si el MODO de auto-actualización está activado/desactivado
- `isAutoUpdateAvailable()`: Verifica si la auto-actualización está SOPORTADA con tu configuración actual

**Devuelve**

`Promise<AutoUpdateAvailable>` — `false` cuando updateUrl personalizada está establecida, `true` de lo contrario.

**Lanza:** {Error} Si la operación falla.


--------------------


### getNextBundle

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Obtiene información sobre el bundle en cola para ser activado en la próxima recarga.

Devuelve:
- Objeto {@link BundleInfo} si un bundle ha sido puesto en cola a través de {@link next}
- `null` si no hay actualización pendiente

Esto es útil para:
- Verificar si una actualización está esperando ser aplicada
- Mostrar estado "Actualización pendiente" a los usuarios
- Mostrar información de versión de la actualización en cola
- Decidir si mostrar un aviso de "Reiniciar para actualizar"

El bundle en cola se activará cuando:
- La aplicación pase a segundo plano (comportamiento predeterminado)
- La aplicación sea cerrada y reiniciada
- Se llame manualmente a {@link reload}
- Se cumplan las condiciones de retraso establecidas por {@link setMultiDelay}

**Devuelve**

`Promise<BundleInfo | null>` — La información del bundle pendiente, o `null` si ninguno está en cola.

**Desde:** 6.8.0

**Lanza:** {Error} Si la operación falla.


--------------------


### getFailedUpdate

```typescript
getFailedUpdate() => Promise<UpdateFailedEvent | null>
```

Recupera información sobre el bundle más reciente que falló al cargar.

Cuando un bundle falla al cargar (ej., errores de JavaScript previenen inicialización, archivos faltantes),
el plugin automáticamente revierte y almacena información sobre el fallo. Este método
recupera esa información de fallo.

**IMPORTANTE: El valor almacenado se borra después de ser recuperado una vez.**
Llamar a este método múltiples veces solo devolverá la información de fallo en la primera llamada,
luego `null` en llamadas subsecuentes hasta que ocurra otro fallo.

Devuelve:
- {@link UpdateFailedEvent} con información del bundle si se registró un fallo
- `null` si no ha ocurrido fallo o si ya fue recuperado

Úsalo para:
- Mostrar a los usuarios por qué falló una actualización
- Registrar información de fallo para depuración
- Implementar manejo/reporte de errores personalizado
- Mostrar notificaciones de rollback

**Devuelve**

`Promise<UpdateFailedEvent | null>` — La información de actualización fallida (borrada después de primera recuperación), o `null`.

**Desde:** 7.22.0

**Lanza:** {Error} Si la operación falla.


--------------------


### setShakeMenu

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Habilita o deshabilita el menú de gesto de agitación para depuración y pruebas.

Cuando está habilitado, los usuarios pueden agitar su dispositivo para abrir un menú de depuración que muestra:
- Información del bundle actual
- Bundles disponibles
- Opciones para cambiar bundles manualmente
- Estado de actualización

Esto es útil durante desarrollo y pruebas para:
- Probar rápidamente diferentes versiones de bundle
- Depurar flujos de actualización
- Cambiar entre bundles de producción y prueba
- Verificar instalaciones de bundle

**Importante:** Deshabilita esto en builds de producción o solo habilita para probadores internos.

También se puede configurar a través de {@link PluginsConfig.CapacitorUpdater.shakeMenu}.

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `SetShakeMenuOptions` |  |

**Devuelve**

`Promise<void>` — Se resuelve cuando la configuración se aplica.

**Desde:** 7.5.0

**Lanza:** {Error} Si la operación falla.


--------------------


### isShakeMenuEnabled

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Verifica si el menú de depuración de gesto de agitación está actualmente habilitado.

Devuelve el estado actual de la característica de menú de agitación que puede alternarse a través de
{@link setShakeMenu} o configurarse a través de {@link PluginsConfig.CapacitorUpdater.shakeMenu}.

Úsalo para:
- Verificar si las características de depuración están habilitadas
- Mostrar/ocultar interfaz de configuración de depuración
- Verificar configuración durante pruebas

**Devuelve**

`Promise<ShakeMenuEnabled>` — Objeto con `enabled: true` o `enabled: false`.

**Desde:** 7.5.0

**Lanza:** {Error} Si la operación falla.


--------------------


### getAppId

```typescript
getAppId() => Promise<GetAppIdRes>
```

Obtiene el ID de aplicación actualmente configurado usado para comunicación con el servidor de actualizaciones.

Devuelve el ID de aplicación que identifica esta aplicación al servidor de actualizaciones. Esto puede ser:
- El valor establecido a través de {@link setAppId}, o
- El valor de configuración {@link PluginsConfig.CapacitorUpdater.appId}, o
- El identificador de aplicación predeterminado de tu configuración de aplicación nativa

Úsalo para:
- Verificar qué ID de aplicación se está usando para actualizaciones
- Depurar problemas de entrega de actualización
- Mostrar configuración de aplicación en pantallas de depuración
- Confirmar ID de aplicación después de llamar a {@link setAppId}

**Devuelve**

`Promise<GetAppIdRes>` — Objeto que contiene la cadena `appId` actual.

**Desde:** 7.14.0

**Lanza:** {Error} Si la operación falla.


--------------------


### setAppId

```typescript
setAppId(options: SetAppIdOptions) => Promise<void>
```

Cambia dinámicamente el ID de aplicación usado para comunicación con el servidor de actualizaciones.

Esto anula el ID de aplicación usado para identificar tu aplicación al servidor de actualizaciones, permitiéndote
cambiar entre diferentes configuraciones de aplicación en tiempo de ejecución (ej., IDs de aplicación de producción vs staging,
o configuraciones multi-tenant).

**Requisitos:**
- {@link PluginsConfig.CapacitorUpdater.allowModifyAppId} debe estar establecido en `true`

**Consideraciones importantes:**
- Cambiar el ID de aplicación afectará qué actualizaciones recibe este dispositivo
- El nuevo ID de aplicación debe existir en tu servidor de actualizaciones
- Esto es principalmente para casos de uso avanzados (multi-tenancy, cambio de entorno)
- La mayoría de las aplicaciones deben usar el {@link PluginsConfig.CapacitorUpdater.appId} basado en configuración en su lugar

**Parámetros**

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `options` | `SetAppIdOptions` |  |

**Devuelve**

`Promise<void>` — Se resuelve cuando el ID de aplicación se cambia exitosamente.

**Desde:** 7.14.0

**Lanza:** {Error} Si `allowModifyAppId` es false o la operación falla.


--------------------


</docgen-api>
