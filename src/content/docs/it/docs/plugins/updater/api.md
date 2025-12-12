---
title: "Funzioni e impostazioni"
description: "Tutti i metodi e le impostazioni disponibili del plugin"
sidebar:
  order: 2
locale: it
---

# Configurazione Plugin Updater

Consulta il [Readme](https://github.com/Cap-go/capacitor-updater) su Github per ulteriori informazioni.

<docgen-config>
<!--Aggiorna i commenti JSDoc nel file sorgente e riesegui docgen per aggiornare i documenti sottostanti-->

CapacitorUpdater può essere configurato con queste opzioni:

| Prop                         | Type                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default                                            | Since   |
| ---------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>                             | Configura il numero di millisecondi che il plugin nativo dovrebbe aspettare prima di considerare un aggiornamento 'non riuscito'. Disponibile solo per Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                                             | <code>10000 // (10 secondi)</code>                 |         |
| **`responseTimeout`**        | <code>number</code>                             | Configura il numero di millisecondi che il plugin nativo dovrebbe aspettare prima di considerare un timeout API. Disponibile solo per Android e iOS.                                                                                                                                                                                                                                                                                                                                            | <code>20 // (20 secondi)</code>                     |         |
| **`autoDeleteFailed`**       | <code>boolean</code>                            | Configura se il plugin dovrebbe eliminare automaticamente i bundle non riusciti. Disponibile solo per Android e iOS.                                                                                                                                                                                                                                                                                                                                                                  | <code>true</code>                                  |         |
| **`autoDeletePrevious`**     | <code>boolean</code>                            | Configura se il plugin dovrebbe eliminare automaticamente i bundle precedenti dopo un aggiornamento riuscito. Disponibile solo per Android e iOS.                                                                                                                                                                                                                                                                                                                                      | <code>true</code>                                  |         |
| **`autoUpdate`**             | <code>boolean</code>                            | Configura se il plugin dovrebbe utilizzare l'aggiornamento automatico tramite un server di aggiornamento. Disponibile solo per Android e iOS.                                                                                                                                                                                                                                                                                                                                                                     | <code>true</code>                                  |         |
| **`resetWhenUpdate`**        | <code>boolean</code>                            | Elimina automaticamente i bundle scaricati precedentemente quando viene installato un nuovo bundle di app nativo sul dispositivo. Disponibile solo per Android e iOS.                                                                                                                                                                                                                                                                                                                                   | <code>true</code>                                  |         |
| **`updateUrl`**              | <code>string</code>                             | Configura l'URL / endpoint a cui vengono inviati i controlli degli aggiornamenti. Disponibile solo per Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                 | <code>https://plugin.capgo.app/updates</code>      |         |
| **`channelUrl`**             | <code>string</code>                             | Configura l'URL / endpoint per le operazioni del canale. Disponibile solo per Android e iOS.                                                                                                                                                                                                                                                                                                                                                                                          | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>                             | Configura l'URL / endpoint a cui vengono inviate le statistiche degli aggiornamenti. Disponibile solo per Android e iOS. Imposta su "" per disabilitare la segnalazione delle statistiche.                                                                                                                                                                                                                                                                                                                                                       | <code>https://plugin.capgo.app/stats</code>        |         |
| **`publicKey`**              | <code>string</code>                             | Configura la chiave pubblica per la crittografia end to end degli aggiornamenti in tempo reale. Versione 2 Disponibile solo per Android e iOS.                                                                                                                                                                                                                                                                                                                                                                      | <code>undefined</code>                             | 6.2.0   |
| **`version`**                | <code>string</code>                             | Configura la versione corrente dell'app. Verrà utilizzato per la prima richiesta di aggiornamento. Se non impostato, il plugin otterrà la versione dal codice nativo. Disponibile solo per Android e iOS.                                                                                                                                                                                                                                                                                   | <code>undefined</code>                             | 4.17.48 |
| **`directUpdate`**           | <code>boolean \| 'always' \| 'atInstall' \| 'onLaunch'</code> | Configura quando il plugin dovrebbe installare direttamente gli aggiornamenti. Solo per la modalità autoUpdate. Funziona bene per app di dimensioni inferiori a 10MB e con caricamenti effettuati utilizzando il flag --partial. Gli zip o le app di dimensioni superiori a 10MB saranno relativamente lenti per gli utenti da aggiornare. - false: Non eseguire mai aggiornamenti diretti (usa il comportamento predefinito: scarica all'inizio, imposta quando in background) - atInstall: Aggiornamento diretto solo quando l'app viene installata, aggiornata dallo store, altrimenti agisci come directUpdate = false - onLaunch: Aggiornamento diretto solo all'installazione dell'app, aggiornamento dallo store o dopo l'eliminazione dell'app, altrimenti agisci come directUpdate = false - always: Aggiornamento diretto in tutti i casi precedenti (app installata, aggiornata dallo store, dopo l'eliminazione dell'app o la ripresa dell'app), non agire mai come directUpdate = false - true: (deprecato) Come "always" per la compatibilità con le versioni precedenti Solo per Android e iOS. | <code>false</code>                                 | 5.1.0   |
| **`autoSplashscreen`**       | <code>boolean</code>                            | Gestisce automaticamente l'occultamento della splashscreen quando si utilizza directUpdate. Se abilitato, il plugin nasconderà automaticamente la splashscreen dopo l'applicazione degli aggiornamenti o quando non è necessario nessun aggiornamento. Ciò elimina la necessità di ascoltare manualmente gli eventi appReady e chiamare SplashScreen.hide(). Funziona solo quando directUpdate è impostato su "atInstall", "always" o true. Richiede che il plugin @capacitor/splash-screen sia installato e configurato con launchAutoHide: false. Richiede che autoUpdate e directUpdate siano abilitati. Solo per Android e iOS.                      | <code>false</code>                                 | 7.6.0   |
| **`periodCheckDelay`**       | <code>number</code>                             | Configura il periodo di ritardo per il controllo periodico degli aggiornamenti. L'unità è in secondi. Solo per Android e iOS. Non può essere inferiore a 600 secondi (10 minuti).                                                                                                                                                                                                                                                                                                                     | <code>600 // (10 minuti)</code>                   |         |
| **`localS3`**                | <code>boolean</code>                            | Configura la CLI per utilizzare un server locale per i test o un server di aggiornamento self-hosted.                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localHost`**              | <code>string</code>                             | Configura la CLI per utilizzare un server locale per i test o un server di aggiornamento self-hosted.                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localWebHost`**           | <code>string</code>                             | Configura la CLI per utilizzare un server locale per i test o un server di aggiornamento self-hosted.                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localSupa`**              | <code>string</code>                             | Configura la CLI per utilizzare un server locale per i test o un server di aggiornamento self-hosted.                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 4.17.48 |
| **`localSupaAnon`**          | <code>string</code>                             | Configura la CLI per utilizzare un server locale per i test.                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>undefined</code>                             | 4.17.48 |
| **`localApi`**               | <code>string</code>                             | Configura la CLI per utilizzare un api locale per i test.                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefined</code>                             | 6.3.3   |
| **`localApiFiles`**          | <code>string</code>                             | Configura la CLI per utilizzare un api di file locale per i test.                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>undefined</code>                             | 6.3.3   |
| **`allowModifyUrl`**         | <code>boolean</code>                            | Permette al plugin di modificare dinamicamente updateUrl, statsUrl e channelUrl dal lato JavaScript.                                                                                                                                                                                                                                                                           | <code>false</code>                                 | 5.4.0   |
| **`defaultChannel`**         | <code>string</code>                             | Imposta il canale predefinito per l'app nella configurazione. Sensibile alle maiuscole. Questa impostazione sovrascriverà il canale predefinito impostato nel cloud, ma rispetterà comunque le sostituzioni effettuate nel cloud.                                                                                                                                                                                                                                                                                      | <code>undefined</code>                             | 5.5.0   |
| **`appId`**                  | <code>string</code>                             | Configura l'id dell'app per l'app nella configurazione.                                                                                                                                                                                                                                                                                                                                   | <code>undefined</code>                             | 6.0.0   |
| **`keepUrlPathAfterReload`** | <code>boolean</code>                            | Configura il plugin per mantenere il percorso URL dopo un ricaricamento. AVVERTENZA: Quando viene attivato un ricaricamento, 'window.history' verrà cancellato.                                                                                                                                                                                                                                                                                                                                  | <code>false</code>                                 | 6.8.0   |
| **`disableJSLogging`**       | <code>boolean</code>                            | Disabilita la registrazione JavaScript del plugin. se true, il plugin non registrerà la console JavaScript. solo il log nativo verrà eseguito                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>false</code>                                 | 7.3.0   |
| **`shakeMenu`**              | <code>boolean</code>                            | Abilita il gesto di scuotimento per mostrare il menu di aggiornamento per scopi di debug/test                                                                                                                                                                                                                                                                                                                                   | <code>false</code>                                 | 7.5.0   |

## Esempi

In `capacitor.config.json`:

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
* [Interfacce](#interfacce)
* [Alias di Tipo](#alias-di-tipo)

</docgen-index>

# Metodi

<docgen-api>
<!--Aggiorna i commenti JSDoc nel file sorgente e riesegui docgen per aggiornare i documenti sottostanti-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Notifica a Capacitor Updater che il bundle corrente funziona (un rollback si verificherà se questo metodo non viene chiamato ad ogni avvio dell'app)
Per impostazione predefinita, questo metodo dovrebbe essere chiamato nei primi 10 secondi dopo l'avvio dell'app, altrimenti si verificherà un rollback.
Modifica questo comportamento con {@link appReadyTimeout}

**Restituisce:** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------


## setUpdateUrl(...)

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Imposta l'updateUrl per l'app, questo verrà utilizzato per verificare gli aggiornamenti.

| Param         | Type                                            | Description                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | contiene l'URL da utilizzare per verificare gli aggiornamenti. |

**Since:** 5.4.0

--------------------


## setStatsUrl(...)

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Imposta l'statsUrl per l'app, questo verrà utilizzato per inviare le statistiche. Il passaggio di una stringa vuota disabiliterà la raccolta di statistiche.

| Param         | Type                                          | Description                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | contiene l'URL da utilizzare per inviare le statistiche. |

**Since:** 5.4.0

--------------------


## setChannelUrl(...)

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Imposta l'channelUrl per l'app, questo verrà utilizzato per impostare il canale.

| Param         | Type                                              | Description                                      |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | contiene l'URL da utilizzare per impostare il canale. |

**Since:** 5.4.0

--------------------


## download(...)

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Scarica un nuovo bundle dall'URL fornito, dovrebbe essere un file zip, con file dentro o con un id univoco dentro con tutti i tuoi file

| Param         | Type                                                        | Description                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | Le {@link <a href="#downloadoptions">DownloadOptions</a>} per scaricare un nuovo bundle zip. |

**Restituisce:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## next(...)

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Imposta il bundle successivo da utilizzare quando l'app viene ricaricata.

| Param         | Type                                          | Description                                                                                                   |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Contiene l'ID del bundle successivo da impostare al prossimo avvio dell'app. {@link <a href="#bundleinfo">BundleInfo.id</a>} |

**Restituisce:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## set(...)

```typescript
set(options: BundleId) => Promise<void>
```

Imposta il bundle corrente e ricarica immediatamente l'app.

| Param         | Type                                          | Description                                                                                       |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un oggetto {@link <a href="#bundleid">BundleId</a>} contenente il nuovo id del bundle da impostare come corrente. |

--------------------


## delete(...)

```typescript
delete(options: BundleId) => Promise<void>
```

Elimina il bundle specificato dall'archiviazione nativa dell'app. Usa con {@link list} per ottenere gli ID dei Bundle memorizzati.

| Param         | Type                                          | Description                                                                                                                                   |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Un oggetto {@link <a href="#bundleid">BundleId</a>} contenente l'ID di un bundle da eliminare (nota, questo è l'id del bundle, NON il nome della versione) |

--------------------


## list(...)

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Ottieni tutti i bundle scaricati localmente nella tua app

| Param         | Type                                                | Description                                                            |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | Le {@link <a href="#listoptions">ListOptions</a>} per elencare i bundle |

**Restituisce:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------


## reset(...)

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Ripristina l'app al bundle `builtin` (quello inviato a Apple App Store / Google Play Store) o all'ultimo bundle caricato con successo.

| Param         | Type                                                  | Description                                                                                                                                                                      |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Contenente {@link <a href="#resetoptions">ResetOptions.toLastSuccessful</a>}, `true` ripristina il bundle builtin e `false` ripristinerà l'ultimo bundle caricato con successo. |

--------------------


## current()

```typescript
current() => Promise<CurrentBundleResult>
```

Ottieni il bundle corrente, se nessuno è impostato restituisce `builtin`. currentNative è il bundle originale installato sul dispositivo

**Restituisce:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------


## reload()

```typescript
reload() => Promise<void>
```

Ricarica la vista

--------------------


## setMultiDelay(...)

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Imposta un array {@link <a href="#delaycondition">DelayCondition</a>} contenente le condizioni che il Plugin utilizzerà per ritardare l'aggiornamento.
Dopo che tutte le condizioni sono soddisfatte, il processo di aggiornamento verrà eseguito di nuovo come al solito, quindi l'aggiornamento verrà installato dopo l'inserimento in background o l'interruzione dell'app.
Per il tipo `date`, il valore dovrebbe essere una stringa di data iso8601.
Per il tipo `background`, il valore dovrebbe essere un numero in millisecondi.
Per il tipo `nativeVersion`, il valore dovrebbe essere il numero di versione.
Per il tipo `kill`, il valore non viene utilizzato.
La funzione ha un comportamento incoerente, l'opzione kill attiva l'aggiornamento dopo il primo kill e non dopo il successivo background come altre opzioni. Questo verrà corretto in una versione principale futura.

| Param         | Type                                                                  | Description                                                                                                |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Contenente l'array {@link <a href="#multidelayconditions">MultiDelayConditions</a>} di condizioni da impostare |

**Since:** 4.3.0

--------------------


## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Annulla un {@link <a href="#delaycondition">DelayCondition</a>} per elaborare un aggiornamento immediatamente.

**Since:** 4.0.0

--------------------


## getLatest(...)

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Ottieni il bundle più recente disponibile da update Url

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Restituisce:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Since:** 4.0.0

--------------------


## setChannel(...)

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Imposta il canale per questo dispositivo. Il canale deve consentire l'autoassegnazione perché questo funzioni.
Non utilizzare questo metodo per impostare il canale all'avvio.
Questo metodo serve a impostare il canale dopo che l'app è pronta e l'utente ha interagito.
Se desideri impostare il canale all'avvio, utilizza {@link PluginsConfig} per impostare il canale predefinito.
Questo metodo invia al backend Capgo una richiesta per collegare l'ID del dispositivo al canale. Capgo può accettare o rifiutare in base alle impostazioni del tuo canale.

| Param         | Type                                                            | Description                                                                      |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | È la {@link <a href="#setchanneloptions">SetChannelOptions</a>} canale da impostare |

**Restituisce:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Since:** 4.7.0

--------------------


## unsetChannel(...)

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Annulla l'impostazione del canale per questo dispositivo. Il dispositivo tornerà quindi al canale predefinito

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Since:** 4.7.0

--------------------


## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Ottieni il canale per questo dispositivo

**Restituisce:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Since:** 4.8.0

--------------------


## listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

Elenca tutti i canali disponibili per questo dispositivo che consentono l'autoassegnazione

**Restituisce:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**Since:** 7.5.0

--------------------


## setCustomId(...)

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Imposta un ID personalizzato per questo dispositivo

| Param         | Type                                                              | Description                                                                         |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | è l'opzione {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId da impostare |

**Since:** 4.9.0

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Ottieni la versione dell'app nativa o la versione builtin se impostato nella configurazione

**Restituisce:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Since:** 5.2.0

--------------------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Ottieni l'ID univoco utilizzato per identificare il dispositivo (inviato al server di aggiornamento automatico)

**Restituisce:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Ottieni la versione del plugin Capacitor Updater nativo (inviato al server di aggiornamento automatico)

**Restituisce:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Ottieni lo stato della configurazione dell'aggiornamento automatico.

**Restituisce:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------


## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Rimuovi tutti i listener per questo plugin.

**Since:** 1.0.0

--------------------


## addListener('download', ...)

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di download del bundle nell'App. Si attiva una volta che è iniziato il download, durante il download e al termine.
Questo ti restituirà la percentuale di download durante il download

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'download'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Restituisce:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 2.0.11

--------------------


## addListener('noNeedUpdate', ...)

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento nessun aggiornamento necessario, utile quando vuoi forzare il controllo ogni volta che l'app viene avviata

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'noNeedUpdate'</code>                                             |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Restituisce:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.0.0

--------------------


## addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di aggiornamento disponibile, utile quando desideri forzare il controllo ogni volta che l'app viene avviata

| Param              | Type                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                                            |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Restituisce:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.0.0

--------------------


## addListener('downloadComplete', ...)

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta gli eventi downloadComplete.

| Param              | Type                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadComplete'</code>                                                             |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Restituisce:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.0.0

--------------------


## addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di aggiornamento importante nell'App, ti fa sapere quando l'aggiornamento importante è bloccato dall'impostazione disableAutoUpdateBreaking

| Param              | Type                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Restituisce:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 2.3.0

--------------------


## addListener('updateFailed', ...)

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di aggiornamento non riuscito nell'App, ti fa sapere quando l'aggiornamento non è riuscito a installarsi al prossimo avvio dell'app

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateFailed'</code>                                                         |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Restituisce:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 2.3.0

--------------------


## addListener('downloadFailed', ...)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di download non riuscito nell'App, ti fa sapere quando il download di un bundle non è riuscito

| Param              | Type                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadFailed'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Restituisce:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.0.0

--------------------


## addListener('appReloaded', ...)

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento di ricaricamento nell'App, ti fa sapere quando si è verificato il ricaricamento

| Param              | Type                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Restituisce:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.3.0

--------------------


## addListener('appReady', ...)

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Ascolta l'evento app pronto nell'App, ti fa sapere quando l'app è pronta per l'uso

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'appReady'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Restituisce:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 5.1.0

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Scopri se l'aggiornamento automatico è disponibile (non disabilitato da serverUrl).

**Restituisce:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Ottieni il bundle successivo che verrà utilizzato quando l'app viene ricaricata.
Restituisce null se nessun bundle successivo è impostato.

**Restituisce:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Since:** 6.8.0

--------------------


## setShakeMenu(...)

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Abilita o disabilita il menu di scuotimento per scopi di debug/test

| Param         | Type                                                                | Description                                              |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| **`options`** | <code><a href="#setshakemenuoptions">SetShakeMenuOptions</a></code> | Contiene il booleano abilitato per abilitare o disabilitare il menu di scuotimento |

**Since:** 7.5.0

--------------------


## isShakeMenuEnabled()

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Ottieni lo stato corrente del menu di scuotimento

**Restituisce:** <code>Promise&lt;<a href="#shakemenuenabled">ShakeMenuEnabled</a>&gt;</code>

**Since:** 7.5.0

--------------------


## Interfacce


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

Questo URL e le versioni vengono utilizzati per scaricare il bundle dal server. Se utilizzi il backend, tutte le informazioni verranno fornite dal metodo getLatest.
Se non utilizzi il backend, devi fornire l'URL e la versione del bundle. Checksum e sessionKey sono obbligatori se hai crittografato il bundle con il comando CLI encrypt, dovresti riceverli come risultato del comando.

| Prop             | Type                         | Description                                                                                                                                                      | Default                | Since |
| ---------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`**        | <code>string</code>          | L'URL del file zip bundle (ad esempio: dist.zip) da scaricare. (Questo può essere qualsiasi URL. Ad esempio: Amazon S3, un tag GitHub, qualsiasi altro luogo in cui hai ospitato il tuo bundle.) |                        |       |
| **`version`**    | <code>string</code>          | Il codice di versione/nome di questo bundle/versione                                                                                                                     |                        |       |
| **`sessionKey`** | <code>string</code>          | La chiave di sessione per l'aggiornamento, quando il bundle è crittografato con una chiave di sessione                                                                                  | <code>undefined</code> | 4.0.0 |
| **`checksum`**   | <code>string</code>          | Il checksum per l'aggiornamento, dovrebbe essere in sha256 e crittografato con chiave privata se il bundle è crittografato                                                    | <code>undefined</code> | 4.0.0 |
| **`manifest`**   | <code>ManifestEntry[]</code> | Il manifesto per i download di più file                                                                                                                            | <code>undefined</code> | 6.1.0 |


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
| **`raw`** | <code>boolean</code> | Se restituire l'elenco dei bundle non elaborato o il manifesto. Se true, l'elenco tenterà di leggere il database interno anziché i file su disco. | <code>false</code> | 6.14.0 |


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
| **`kind`**  | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Imposta le condizioni di ritardo in setMultiDelay |
| **`value`** | <code>string</code>                                       |                                          |


### LatestVersion

| Prop             | Type                         | Description                | Since |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`**    | <code>string</code>          | Risultato del metodo getLatest | 4.0.0 |
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
| **`channel`** | <code>string</code> | Il canale per il quale ottenere la versione più recente Il canale deve consentire 'self_assign' per questo | <code>undefined</code> | 6.8.0 |


### ChannelRes

| Prop          | Type                | Description                   | Since |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`**  | <code>string</code> | Stato attuale del canale impostato | 4.7.0 |
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
| **`channel`**  | <code>string</code>  | Stato attuale del canale ottenuto | 4.8.0 |
| **`error`**    | <code>string</code>  |                               |       |
| **`message`**  | <code>string</code>  |                               |       |
| **`status`**   | <code>string</code>  |                               |       |
| **`allowSet`** | <code>boolean</code> |                               |       |


### ListChannelsResult

| Prop           | Type                       | Description                | Since |
| -------------- | -------------------------- | -------------------------- | ----- |
| **`channels`** | <code>ChannelInfo[]</code> | Elenco dei canali disponibili | 7.5.0 |


### ChannelInfo

| Prop                 | Type                 | Description                                     | Since |
| -------------------- | -------------------- | ----------------------------------------------- | ----- |
| **`id`**             | <code>string</code>  | L'ID del canale                                  | 7.5.0 |
| **`name`**           | <code>string</code>  | Il nome del canale                                | 7.5.0 |
| **`public`**         | <code>boolean</code> | Se questo è un canale pubblico                | 7.5.0 |
| **`allow_self_set`** | <code>boolean</code> | Se i dispositivi possono autoassegnarsi a questo canale | 7.5.0 |


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
| **`percent`** | <code>number</code>                               | Stato attuale del download, tra 0 e 100. | 4.0.0 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeedEvent

| Prop         | Type                                              | Description                                    | Since |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Stato attuale del download, tra 0 e 100. | 4.0.0 |


### UpdateAvailableEvent

| Prop         | Type                                              | Description                                    | Since |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Stato attuale del download, tra 0 e 100. | 4.0.0 |


### DownloadCompleteEvent

| Prop         | Type                                              | Description                          | Since |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Emesso quando è disponibile un nuovo aggiornamento. | 4.0.0 |


### MajorAvailableEvent

| Prop          | Type                | Description                                | Since |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | Emesso quando è disponibile un nuovo bundle importante. | 4.0.0 |


### UpdateFailedEvent

| Prop         | Type                                              | Description                           | Since |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Emesso quando un aggiornamento non è riuscito a installarsi. | 4.0.0 |


### DownloadFailedEvent

| Prop          | Type                | Description                | Since |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Emesso quando il download non riesce. | 4.0.0 |


### AppReadyEvent

| Prop         | Type                                              | Description                           | Since |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Emesso quando l'app è pronta per l'uso. | 5.2.0 |
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


## Alias di Tipo


### BundleStatus

pending: Il bundle è in attesa di essere **IMPOSTATO** come bundle successivo.
downloading: Il bundle è in corso di download.
success: Il bundle è stato scaricato ed è pronto per essere **IMPOSTATO** come bundle successivo.
error: Il bundle non ha scaricato.

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>

</docgen-api>
