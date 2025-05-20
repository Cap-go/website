---
title: Funzioni e impostazioni
description: Tutti i metodi e le impostazioni disponibili del plugin
sidebar:
  order: 2
locale: it
---

# Configurazione del Plugin Updater

Consulta [Readme](https://github.com/Cap-go/capacitor-updater) su Github per maggiori informazioni

<docgen-config>
<!--Aggiorna i commenti JSDoc del file sorgente e riesegui docgen per aggiornare la documentazione sottostante-->

CapacitorUpdater può essere configurato con queste opzioni:

| Proprietà                    | Tipo                 | Descrizione                                                                                                                                                                                    | Predefinito                                        | Da      |
| ---------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>  | Configura il numero di millisecondi che il plugin nativo deve attendere prima di considerare un aggiornamento 'fallito'. Disponibile solo per Android e iOS                                    | <code>10000 // (10 secondi)</code>                 |         |
| **`responseTimeout`**        | <code>number</code>  | Configura il numero di millisecondi che il plugin nativo deve attendere prima di considerare timeout l'API. Disponibile solo per Android e iOS                                                 | <code>20 // (20 secondi)</code>                    |         |
| **`autoDeleteFailed`**       | <code>boolean</code> | Configura se il plugin deve eliminare automaticamente i bundle falliti. Disponibile solo per Android e iOS                                                                                     | <code>true</code>                                  |         |
| **`autoDeletePrevious`**     | <code>boolean</code> | Configura se il plugin deve eliminare automaticamente i bundle precedenti dopo un aggiornamento riuscito. Disponibile solo per Android e iOS                                                   | <code>true</code>                                  |         |
| **`autoUpdate`**             | <code>boolean</code> | Configura se il plugin deve utilizzare l'aggiornamento automatico tramite un server di aggiornamento. Disponibile solo per Android e iOS                                                       | <code>true</code>                                  |         |
| **`resetWhenUpdate`**        | <code>boolean</code> | Elimina automaticamente i bundle scaricati in precedenza quando viene installata una nuova versione nativa dell'app sul dispositivo. Disponibile solo per Android e iOS                        | <code>true</code>                                  |         |
| **`updateUrl`**              | <code>string</code>  | Configura l'URL/endpoint a cui vengono inviati i controlli di aggiornamento. Disponibile solo per Android e iOS                                                                                | <code>https://plugin.capgo.app/updates</code>      |         |
| **`channelUrl`**             | <code>string</code>  | Configura l'URL/endpoint per le operazioni sui canali. Disponibile solo per Android e iOS                                                                                                      | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>  | Configura l'URL/endpoint a cui vengono inviate le statistiche di aggiornamento. Disponibile solo per Android e iOS. Impostare a "" per disabilitare la segnalazione delle statistiche         | <code>https://plugin.capgo.app/stats</code>        |         |
| **`privateKey`**             | <code>string</code>  | Configura la chiave privata per la crittografia end-to-end degli aggiornamenti live. Disponibile solo per Android e iOS. Deprecato nella versione 620, sarà rimosso nella versione 700 | <code>undefined</code>                             |         |
| **`publicKey`**              | <code>string</code>  | Configura la chiave pubblica per la crittografia end-to-end degli aggiornamenti live Versione 2. Disponibile solo per Android e iOS                                                           | <code>undefined</code>                             | 620   |
| **`version`**                | <code>string</code>  | Configura la versione corrente dell'app. Verrà utilizzata per la prima richiesta di aggiornamento. Se non impostata, il plugin otterrà la versione dal codice nativo. Solo Android e iOS     | <code>undefined</code>                             | 41748 |
| **`directUpdate`**           | <code>boolean</code> | Fa sì che il plugin installi direttamente l'aggiornamento quando l'app è stata appena aggiornata/installata. Solo per modalità autoUpdate. Disponibile solo per Android e iOS                 | <code>undefined</code>                             | 510   |
| **`periodCheckDelay`**       | <code>number</code>  | Configura il periodo di ritardo per il controllo periodico degli aggiornamenti in secondi. Disponibile solo per Android e iOS. Non può essere inferiore a 600 secondi (10 minuti)             | <code>600 // (10 minuti)</code>                    |         |
| **`localS3`**                | <code>boolean</code> | Configura la CLI per utilizzare un server locale per test o server di aggiornamento self-hosted                                                                                                | <code>undefined</code>                             | 41748 |
| **`localHost`**              | <code>string</code>  | Configura la CLI per utilizzare un server locale per test o server di aggiornamento self-hosted                                                                                                | <code>undefined</code>                             | 41748 |
| **`localWebHost`**           | <code>string</code>  | Configura la CLI per utilizzare un server locale per test o server di aggiornamento self-hosted                                                                                                | <code>undefined</code>                             | 41748 |
| **`localSupa`**              | <code>string</code>  | Configura la CLI per utilizzare un server locale per test o server di aggiornamento self-hosted                                                                                                | <code>undefined</code>                             | 41748 |
| **`localSupaAnon`**          | <code>string</code>  | Configura la CLI per utilizzare un server locale per test                                                                                                                                      | <code>undefined</code>                             | 41748 |
| **`localApi`**               | <code>string</code>  | Configura la CLI per utilizzare un'API locale per test                                                                                                                                         | <code>undefined</code>                             | 633   |
| **`localApiFiles`**          | <code>string</code>  | Configura la CLI per utilizzare un'API di file locale per test                                                                                                                                 | <code>undefined</code>                             | 633   |
| **`allowModifyUrl`**         | <code>boolean</code> | Permette al plugin di modificare dinamicamente updateUrl, statsUrl e channelUrl dal lato JavaScript                                                                                            | <code>false</code>                                 | 540   |
| **`defaultChannel`**         | <code>string</code>  | Imposta il canale predefinito per l'app nella configurazioneEcco la traduzione in italiano:

                                                                                                                                              | <code>undefined</code>                             | 550   |
| **`appId`**                  | <code>string</code>  | Configura l'id dell'app per l'app nella configurazione                                                                                                                                               | <code>undefined</code>                             | 600   |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | Configura il plugin per mantenere il percorso URL dopo un ricaricamento ATTENZIONE: Quando viene attivato un ricaricamento, la 'windowhistory' verrà cancellata                                                               | <code>false</code>                                 | 680   |

## Esempi

In `capacitorconfigjson`:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1 secondo),
      "responseTimeout": 10 // (10 secondi),
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

In `capacitorconfigts`:

```ts
/// <reference types="@capgo/capacitor-updater" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000 // (1 secondo),
      responseTimeout: 10 // (10 secondi),
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

# Metodi

<docgen-api>

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Notifica a Capacitor Updater che il bundle corrente sta funzionando (verrà eseguito un rollback se questo metodo non viene chiamato ad ogni avvio dell'app)
Per impostazione predefinita questo metodo dovrebbe essere chiamato nei primi 10 secondi dopo l'avvio dell'app, altrimenti verrà eseguito un rollback
Modifica questo comportamento con {@link appReadyTimeout}

**Ritorna:** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------

## setUpdateUrl()

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Imposta l'updateUrl per l'app, questo sarà utilizzato per controllare gli aggiornamenti

| Param         | Type                                            | Descrizione                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | contiene l'URL da utilizzare per controllare gli aggiornamenti |

**Dal:** 540

--------------------

## setStatsUrl()

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Imposta la statsUrl per l'app, questa verrà utilizzata per inviare statistiche. L'inserimento di una stringa vuota disabiliterà la raccolta delle statistiche.

| Param         | Type                                          | Descrizione                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | contiene l'URL da utilizzare per inviare statistiche |

**Dal:** 540

--------------------

## setChannelUrl()

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Imposta la channelUrl per l'app, questa verrà utilizzata per impostare il canale

| Param         | Type                                              | Descrizione                                      |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | contiene l'URL da utilizzare per impostare il canale |

**Dal:** 540

--------------------

## download()

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Scarica un nuovo bundle dall'URL fornito, dovrebbe essere un file zip, con file al suo interno o con un ID unico al suo interno con tutti i tuoi file

| Param         | Type                                                        | Descrizione                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | Le {@link <a href="#downloadoptions">DownloadOptions</a>} per scaricare un nuovo bundle zip |

**Ritorna:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------

## next()

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Imposta il prossimo bundle da utilizzare quando l'app viene ricaricata| Param         | Type                                          | Description                                                                                                   |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Contiene l'ID del prossimo Bundle da impostare al prossimo avvio dell'app {@link <a href="#bundleinfo">BundleInfoid</a>} |

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------

## set()

```typescript
set(options: BundleId) => Promise<void>
```

Imposta il bundle corrente e riavvia immediatamente l'app

| Param         | Type                                          | Description                                                                                       |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un oggetto {@link <a href="#bundleid">BundleId</a>} contenente il nuovo bundle id da impostare come corrente |

--------------------

## delete()

```typescript
delete(options: BundleId) => Promise<void>
```

Elimina il bundle specificato dalla memoria dell'app nativa. Usa con {@link list} per ottenere gli ID dei Bundle memorizzati

| Param         | Type                                          | Description                                                                                                                                   |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un oggetto {@link <a href="#bundleid">BundleId</a>} contenente l'ID di un bundle da eliminare (nota, questo è l'id del bundle, NON il nome della versione) |

--------------------

## list()

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Ottieni tutti i bundle scaricati localmente nella tua app

| Param         | Type                                                | Description                                                            |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | Le {@link <a href="#listoptions">ListOptions</a>} per elencare i bundle |

**Returns:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------

## reset()

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Ripristina l'app al bundle 'builtin' (quello inviato all'Apple App Store / Google Play Store) o all'ultimo bundle caricato con successo

| Param         | Type                                                  | Description                                                                                                                                                                      |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Contenente {@link <a href="#resetoptions">ResetOptionstoLastSuccessful</a>}, `true` ripristina al bundle builtin e `false` ripristinerà all'ultimo bundle caricato con successo |

--------------------

## current()

```typescript
current() => Promise<CurrentBundleResult>
```

Ottieni il bundle corrente, se nessuno è impostato restituisce `builtin` currentNative è il bundle originale installato sul dispositivo

**Returns:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------

## reload()

```typescript
reload() => Promise<void>
```

Ricarica la vista

--------------------

## setMultiDelay()

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Imposta un array {@link <a href="#delaycondition">DelayCondition</a>} contenente le condizioni che il Plugin utilizzerà per ritardare l'aggiornamento
Dopo che tutte le condizioni sono soddisfatte, il processo di aggiornamento ripartirà come al solito, quindi l'aggiornamento verrà installato dopo un background o l'uccisione dell'app
Per il tipo 'date', il valore deve essere una stringa di data iso8601
Per il tipo 'background', il valore deve essere un numero in millisecondi
Per il tipo 'nativeVersion', il valore deve essere il numero di versione
Per il tipo 'kill', il valore non viene utilizzato
La funzione ha un comportamento non coerente l'opzione kill fa scattare l'aggiornamento dopo il primo kill e non dopo il prossimo background come altre opzioni. Questo sarà corretto in una futura release maggiore

| Param         | Type                                                                  | Description                                                                                                |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Contenente l'array {@link <a href="#multidelayconditions">MultiDelayConditions</a>} di condizioni da impostare |

**Since:** 430

--------------------

## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Annulla un {@link <a href="#delaycondition">DelayCondition</a>} per elaborare immediatamente un aggiornamento

**Since:** 400

--------------------

## getLatest()

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Ottieni l'ultimo bundle disponibile dall'URL di aggiornamento

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

Imposta il canale per questo dispositivo. Il canale deve consentire l'auto-assegnazione perché questo funzioni
Non utilizzare questo metodo per impostare il canale all'avvio quando `autoUpdate` è abilitato nella {@link PluginsConfig}
Questo metodo serve per impostare il canale dopo che l'app è pronta
Questo metodo invia al backend di Capgo una richiesta per collegare l'ID del dispositivo al canale. Capgo può accettare o rifiutare a seconda delle impostazioni del tuo canale

| Param         | Type                                                            | Description                                                                      |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | È il canale {@link <a href="#setchanneloptions">SetChannelOptions</a>} da impostare |

**Returns:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Since:** 470

--------------------

## unsetChannel()

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Rimuove l'impostazione del canale per questo dispositivoIl dispositivo tornerà quindi al canale predefinito

| Param | Tipo |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Da:** 470

--------------------

## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Ottieni il canale per questo dispositivo

**Ritorna:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Da:** 480

--------------------

## setCustomId()

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Imposta un ID personalizzato per questo dispositivo

| Param | Tipo | Descrizione |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | è il {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId da impostare |

**Da:** 490

--------------------

## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Ottieni la versione nativa dell'app o la versione integrata se impostata nella configurazione

**Ritorna:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Da:** 520

--------------------

## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Ottieni ID univoco utilizzato per identificare il dispositivo (inviato al server di aggiornamento automatico)

**Ritorna:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------

## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Ottieni la versione nativa del plugin Capacitor Updater (inviata al server di aggiornamento automatico)

**Ritorna:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------

## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Ottieni lo stato della configurazione di aggiornamento automatico

**Ritorna:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------

## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Rimuovi tutti i listener per questo plugin

**Da:** 100

--------------------

## addListener('download', )

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di download del bundle nell'App Si attiva quando inizia un download, durante il download e al termine

| Param | Tipo |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>'download'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Ritorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Da:** 2011

--------------------

## addListener('noNeedUpdate', )

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento nessun aggiornamento necessario, utile quando vuoi forzare il controllo ogni volta che l'app viene avviata

| Param | Tipo |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`** | <code>'noNeedUpdate'</code> |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Ritorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Da:** 400

--------------------

## addListener('updateAvailable', )

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento aggiornamento disponibile, utile quando vuoi forzare il controllo ogni volta che l'app viene avviata

| Param | Tipo |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'updateAvailable'</code> |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Ritorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Da:** 400

--------------------

## addListener('downloadComplete', )

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta gli eventi downloadComplete

| Param | Tipo |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'downloadComplete'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Ritorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Da:** 400

--------------------

## addListener('majorAvailable', )

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di aggiornamento Major nell'App, ti fa sapere quando l'aggiornamento major è bloccato dall'impostazione disableAutoUpdateBreaking

| Param | Tipo |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'majorAvailable'</code> |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Ritorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Da:** 230

--------------------

## addListener('updateFailed', )

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di fallimento dell'aggiornamento nell'App, ti fa sapere quando l'aggiornamento non è riuscito a installarsi al prossimo avvio dell'app

| Param | Tipo |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`** | <code>'updateFailed'</code> |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Ritorna:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Da:** 230

--------------------

## addListener('downloadFailed',)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di fallimento del download nell'App, ti informa quando il download di un bundle è fallito

| Param              | Type                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadFailed'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 400

--------------------

## addListener('appReloaded', )

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di ricaricamento nell'App, ti informa quando è avvenuto il ricaricamento

| Param              | Type                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 430

--------------------

## addListener('appReady', )

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di app pronta nell'App, ti informa quando l'app è pronta all'uso

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'appReady'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 510

--------------------

## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Verifica se l'aggiornamento automatico è disponibile (non disabilitato da serverUrl)

**Returns:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------

## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Ottieni il prossimo bundle che verrà utilizzato quando l'app si ricaricherà
Restituisce null se non è impostato alcun bundle successivo

**Returns:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Since:** 680

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

| Prop             | Type                | Description                                                                                                                                                | Default                | Since |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`**        | <code>string</code> | L'URL del file zip del bundle (es: distzip) da scaricare (Può essere qualsiasi URL Es: Amazon S3, un tag GitHub, qualsiasi altro posto dove hai ospitato il tuo bundle) |                        |       |
| **`version`**    | <code>string</code> | Il codice/nome versione di questo bundle/versione                                                                                                          |                        |       |
| **`sessionKey`** | <code>string</code> | La chiave di sessione per l'aggiornamento                                                                                                                 | <code>undefined</code> | 400   |
| **`checksum`**   | <code>string</code> | Il checksum per l'aggiornamento                                                                                                                           | <code>undefined</code> | 400   |

### BundleId

| Prop     | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

### BundleListResult

| Prop          | Type                      |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |

### ListOptions

| Prop      | Type                 | Description                                                                                                                               | Default            | Since  |
| --------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | Se restituire la lista dei bundle grezza o il manifest Se true, la lista tenterà di leggere il database interno invece dei file su disco | <code>false</code> | 6140   |

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

| Prop        | Type                                                      | Description                                     |
| ----------- | --------------------------------------------------------- | ----------------------------------------------- |
| **`kind`**  | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Imposta le condizioni di ritardo in setMultiDelay |
| **`value`** | <code>string</code>                                       |                                                 |

### LatestVersion

| Prop             | Type                         | Description                    | Since |
| ---------------- | ---------------------------- | ------------------------------ | ----- |
| **`version`**    | <code>string</code>          | Risultato del metodo getLatest | 40    |0 |
| **`checksum`**   | <code>string</code>          |                            | 6     |
| **`major`**      | <code>boolean</code>         |                            |       |
| **`message`**    | <code>string</code>          |                            |       |
| **`sessionKey`** | <code>string</code>          |                            |       |
| **`error`**      | <code>string</code>          |                            |       |
| **`old`**        | <code>string</code>          |                            |       |
| **`url`**        | <code>string</code>          |                            |       |
| **`manifest`**   | <code>ManifestEntry[]</code> |                            | 61   |


### ManifestEntry

| Proprietà           | Tipo                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### GetLatestOptions

| Proprietà      | Tipo                | Descrizione                                                                                     | Predefinito            | Da |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | Il canale per ottenere l'ultima versione. Il canale deve consentire 'self_assign' affinché funzioni | <code>undefined</code> | 680 |


### ChannelRes

| Proprietà      | Tipo                | Descrizione                   | Da |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`**  | <code>string</code> | Stato attuale del canale impostato | 470 |
| **`error`**   | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |


### SetChannelOptions

| Proprietà               | Tipo                 |
| ----------------------- | -------------------- |
| **`channel`**           | <code>string</code>  |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| Proprietà               | Tipo                 |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes

| Proprietà       | Tipo                 | Descrizione                   | Da |
| -------------- | -------------------- | ----------------------------- | ----- |
| **`channel`**  | <code>string</code>  | Stato attuale del canale ottenuto | 480 |
| **`error`**    | <code>string</code>  |                               |       |
| **`message`**  | <code>string</code>  |                               |       |
| **`status`**   | <code>string</code>  |                               |       |
| **`allowSet`** | <code>boolean</code> |                               |       |


### SetCustomIdOptions

| Proprietà       | Tipo                |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### BuiltinVersion

| Proprietà      | Tipo                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### DeviceId

| Proprietà       | Tipo                |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### PluginVersion

| Proprietà      | Tipo                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### AutoUpdateEnabled

| Proprietà      | Tipo                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| Proprietà     | Tipo                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### DownloadEvent

| Proprietà      | Tipo                                              | Descrizione                                    | Da |
| ------------- | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`percent`** | <code>number</code>                               | Stato attuale del download, tra 0 e 100 | 400 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeedEvent

| Proprietà     | Tipo                                              | Descrizione                                    | Da |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Stato attuale del download, tra 0 e 100 | 400 |


### UpdateAvailableEvent

| Proprietà     | Tipo                                              | Descrizione                                    | Da |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Stato attuale del download, tra 0 e 100 | 400 |


### DownloadCompleteEvent

| Proprietà     | Tipo                                              | Descrizione                          | Da |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Emesso quando è disponibile un nuovo aggiornamento | 400 |


### MajorAvailableEvent

| Proprietà      | Tipo                | Descrizione                                | Da |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | Emesso quando è disponibile un nuovo bundle maggiore | 400 |


### UpdateFailedEvent

| Proprietà     | Tipo                                              | Descrizione                           | Da |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Emesso quando un aggiornamento non riesce a installarsi | 400 |


### DownloadFailedEvent

| Proprietà      | Tipo                | Descrizione                | Da |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Emesso quando un download fallisce | 400 |


### AppReadyEvent

| Proprietà     | Tipo                                              | Descrizione                           | Da |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Emesso quando l'app è pronta per l'uso | 520 |
| **`status`** | <code>string</code>                               |                                       |       |


### AutoUpdateAvailable

| Proprietà        | Tipo                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


## Type Aliases


### BundleStatus

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>

</docgen-api>
