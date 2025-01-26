---
title: Funktionen und Einstellungen
description: Alle verfügbaren Methoden und Einstellungen des Plugins
sidebar:
  order: 2
locale: de
---

# Updater Plugin-Konfiguration

Siehe das Github [Readme](https://githubcom/Cap-go/capacitor-updater) für weitere Informationen

<docgen-config>
<!--Aktualisieren Sie die JSDoc-Kommentare der Quelldatei und führen Sie docgen erneut aus, um die untenstehenden Dokumentationen zu aktualisieren-->

CapacitorUpdater kann mit diesen Optionen konfiguriert werden:

| Prop                         | Typ                  | Beschreibung                                                                                                                                                                                     | Standard                                        | Seit    |
| ---------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------- |
| **`appReadyTimeout`**        | <code>number</code>  | Konfigurieren Sie die Anzahl der Millisekunden, die das native Plugin warten sollte, bevor es ein Update als 'fehlgeschlagen' betrachtet. Nur verfügbar für Android und iOS                 | <code>10000 // (10 Sekunden)</code>             |         |
| **`responseTimeout`**        | <code>number</code>  | Konfigurieren Sie die Anzahl der Millisekunden, die das native Plugin warten sollte, bevor es einen API-Timeout betrachtet. Nur verfügbar für Android und iOS                                 | <code>20 // (20 Sekunden)</code>                 |         |
| **`autoDeleteFailed`**       | <code>boolean</code> | Konfigurieren Sie, ob das Plugin fehlgeschlagene Bündel automatisch löschen soll. Nur verfügbar für Android und iOS                                                                            | <code>true</code>                                |         |
| **`autoDeletePrevious`**     | <code>boolean</code> | Konfigurieren Sie, ob das Plugin vorherige Bündel nach einem erfolgreichen Update automatisch löschen soll. Nur verfügbar für Android und iOS                                                  | <code>true</code>                                |         |
| **`autoUpdate`**             | <code>boolean</code> | Konfigurieren Sie, ob das Plugin Autos-Updates über einen Update-Server verwenden soll. Nur verfügbar für Android und iOS                                                                    | <code>true</code>                                |         |
| **`resetWhenUpdate`**        | <code>boolean</code> | Vorher heruntergeladene Bündel automatisch löschen, wenn ein neueres natives App-Bündel auf dem Gerät installiert wird. Nur verfügbar für Android und iOS                                    | <code>true</code>                                |         |
| **`updateUrl`**              | <code>string</code>  | Konfigurieren Sie die URL / den Endpunkt, an den die Update-Überprüfungen gesendet werden. Nur verfügbar für Android und iOS                                                                  | <code>https://plugincapgoapp/updates</code>    |         |
| **`channelUrl`**             | <code>string</code>  | Konfigurieren Sie die URL / den Endpunkt für Kanaloperationen. Nur verfügbar für Android und iOS                                                                                             | <code>https://plugincapgoapp/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>  | Konfigurieren Sie die URL / den Endpunkt, an den die Update-Statistiken gesendet werden. Nur verfügbar für Android und iOS. Setzen Sie auf "" zur Deaktivierung der Statistikanzeige       | <code>https://plugincapgoapp/stats</code>      |         |
| **`privateKey`**             | <code>string</code>  | Konfigurieren Sie den privaten Schlüssel für die Ende-zu-Ende-Live-Update-Verschlüsselung. Nur verfügbar für Android und iOS. Ab Version 620 veraltet, wird in Version 700 entfernt.      | <code>undefined</code>                           |         |
| **`publicKey`**              | <code>string</code>  | Konfigurieren Sie den öffentlichen Schlüssel für die Ende-zu-Ende-Live-Update-Verschlüsselung. Version 2. Nur verfügbar für Android und iOS                                                 | <code>undefined</code>                           | 620     |
| **`version`**                | <code>string</code>  | Konfigurieren Sie die aktuelle Version der App. Dies wird für die erste Update-Anfrage verwendet. Wenn nicht festgelegt, erhält das Plugin die Version aus dem nativen Code. Nur verfügbar für Android und iOS                                                   | <code>undefined</code>                           | 41748   |
| **`directUpdate`**           | <code>boolean</code> | Lassen Sie das Plugin das Update direkt installieren, wenn die App, die gerade aktualisiert/installiert wurde. Nur für den AutoUpdate-Modus. Nur verfügbar für Android und iOS              | <code>undefined</code>                           | 510     |
| **`periodCheckDelay`**       | <code>number</code>  | Konfigurieren Sie den Verzögerungszeitraum für die periodische Update-Überprüfung; die Einheit ist in Sekunden. Nur verfügbar für Android und iOS. Darf nicht weniger als 600 Sekunden (10 Minuten) sein. | <code>600 // (10 Minuten)</code>                 |         |
| **`localS3`**                | <code>boolean</code> | Konfigurieren Sie die CLI, um einen lokalen Server für Tests oder einen selbstgehosteten Update-Server zu verwenden.                                                                             | <code>undefined</code>                           | 41748   |
| **`localHost`**              | <code>string</code>  | Konfigurieren Sie die CLI, um einen lokalen Server für Tests oder einen selbstgehosteten Update-Server zu verwenden.                                                                             | <code>undefined</code>                           | 41748   |
| **`localWebHost`**           | <code>string</code>  | Konfigurieren Sie die CLI, um einen lokalen Server für Tests oder einen selbstgehosteten Update-Server zu verwenden.                                                                             | <code>undefined</code>                           | 41748   |
| **`localSupa`**              | <code>string</code>  | Konfigurieren Sie die CLI, um einen lokalen Server für Tests oder einen selbstgehosteten Update-Server zu verwenden.                                                                             | <code>undefined</code>                           | 41748   |
| **`localSupaAnon`**          | <code>string</code>  | Konfigurieren Sie die CLI, um einen lokalen Server für Tests zu verwenden.                                                                                                                    | <code>undefined</code>                           | 41748   |
| **`localApi`**               | <code>string</code>  | Konfigurieren Sie die CLI, um eine lokale API für Tests zu verwenden.                                                                                                                        | <code>undefined</code>                           | 633     |
| **`localApiFiles`**          | <code>string</code>  | Konfigurieren Sie die CLI, um eine lokale Datei-API für Tests zu verwenden.                                                                                                                  | <code>undefined</code>                           | 633     |
| **`allowModifyUrl`**         | <code>boolean</code> | Erlauben Sie dem Plugin, die updateUrl, statsUrl und channelUrl dynamisch von der JavaScript-Seite zu ändern.                                                                                  | <code>false</code>                               | 540     |
| **`defaultChannel`**         | <code>string</code>  | Setzen Sie den Standardkanal für die App in der Konfiguration.| **`appId`**                  | <code>string</code>  | Konfigurieren Sie die App-ID für die App in der Konfiguration                                                                                                                                                 | <code>undefined</code>                             | 600   |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | Konfigurieren Sie das Plugin so, dass der URL-Pfad nach einem Neuladen beibehalten wird WARNUNG: Wenn ein Neuladen ausgelöst wird, wird 'window.history' gelöscht                                                                | <code>false</code>                                 | 680   |

## Beispiele

In `capacitorconfigjson`:

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000 // (1 Sekunde),
      "responseTimeout": 10 // (10 Sekunden),
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
      appReadyTimeout: 1000 // (1 Sekunde),
      responseTimeout: 10 // (10 Sekunden),
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
* [Typalias](#type-aliases)

</docgen-index>

# Methoden

<docgen-api>
<!--Aktualisieren Sie die JSDoc-Kommentare der Quelldatei und führen Sie docgen erneut aus, um die unten stehenden Dokumente zu aktualisieren-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Benachrichtigen Sie den Capacitor Updater, dass das aktuelle Bundle funktioniert (ein Rollback tritt ein, wenn diese Methode bei jedem App-Start nicht aufgerufen wird)
Standardmäßig sollte diese Methode in den ersten 10 Sekunden nach dem Start der App aufgerufen werden, andernfalls tritt ein Rollback ein
Ändern Sie dieses Verhalten mit {@link appReadyTimeout}

**Gibt zurück:** <code>Promise&lt;<a href="#appreadyresult">AppReadyResult</a>&gt;</code>

--------------------


## setUpdateUrl()

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Setzen Sie die updateUrl für die App, dies wird verwendet, um nach Updates zu suchen

| Parameter     | Typ                                            | Beschreibung                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | enthält die URL, die für die Überprüfung auf Updates verwendet wird |

**Seit:** 540

--------------------


## setStatsUrl()

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Setzen Sie die statsUrl für die App, dies wird verwendet, um Statistiken zu senden. Das Übergeben einer leeren Zeichenfolge deaktiviert die Erfassung von Statistiken

| Parameter     | Typ                                          | Beschreibung                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | enthält die URL, die verwendet wird, um Statistiken zu senden |

**Seit:** 540

--------------------


## setChannelUrl()

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Setzen Sie die channelUrl für die App, dies wird verwendet, um den Kanal festzulegen

| Parameter     | Typ                                              | Beschreibung                                      |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | enthält die URL, die verwendet wird, um den Kanal festzulegen |

**Seit:** 540

--------------------


## download()

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Laden Sie ein neues Bundle von der angegebenen URL herunter, es sollte sich um eine ZIP-Datei handeln, mit Dateien darin oder mit einer eindeutigen ID darin, die all Ihre Dateien enthält

| Parameter     | Typ                                                        | Beschreibung                                                                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | Die {@link <a href="#downloadoptions">DownloadOptions</a>} für den Download eines neuen Bundle-Zip |

**Gibt zurück:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## next()

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Setzen Sie das nächste Bundle, das verwendet werden soll, wenn die App neu geladen wird| Parameter     | Typ                                           | Beschreibung                                                                                                      |
| ------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Enthält die ID des nächsten Bundles, das beim nächsten Start der App gesetzt werden soll {@link <a href="#bundleinfo">BundleInfoid</a>} |

**Gibt zurück:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------


## set()

```typescript
set(options: BundleId) => Promise<void>
```

Setzt das aktuelle Bundle und lädt die App sofort neu

| Parameter     | Typ                                           | Beschreibung                                                                                       |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Ein {@link <a href="#bundleid">BundleId</a>}-Objekt, das die neue Bundle-ID enthält, die als aktuell gesetzt werden soll |

--------------------


## delete()

```typescript
delete(options: BundleId) => Promise<void>
```

Löscht das angegebene Bundle aus dem nativen App-Speicher. Verwenden Sie {@link list}, um die gespeicherten Bundle-IDs zu erhalten

| Parameter     | Typ                                           | Beschreibung                                                                                                                                                                      |
| ------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Ein {@link <a href="#bundleid">BundleId</a>} -Objekt, das die ID eines zu löschenden Bundles enthält (Hinweis, dies ist die Bundle-ID, NICHT der Versionsname) |

--------------------


## list()

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Erhält alle lokal heruntergeladenen Bundles in Ihrer App

| Parameter     | Typ                                                | Beschreibung                                                            |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | Die {@link <a href="#listoptions">ListOptions</a>} zum Auflisten der Bundles |

**Gibt zurück:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------


## reset()

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Setzt die App auf das `builtin` Bundle zurück (das, das an den Apple App Store / Google Play Store gesendet wurde) oder auf das zuletzt erfolgreich geladene Bundle

| Parameter     | Typ                                                  | Beschreibung                                                                                                                                                                      |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Enthält {@link <a href="#resetoptions">ResetOptionstoLastSuccessful</a>}, `true` setzt auf das integrierte Bundle zurück und `false` setzt auf das zuletzt erfolgreich geladene Bundle zurück |

--------------------


## current()

```typescript
current() => Promise<CurrentBundleResult>
```

Erhält das aktuelle Bundle, wenn keines gesetzt ist, wird `builtin` zurückgegeben. currentNative ist das originale Bundle, das auf dem Gerät installiert ist

**Gibt zurück:** <code>Promise&lt;<a href="#currentbundleresult">CurrentBundleResult</a>&gt;</code>

--------------------


## reload()

```typescript
reload() => Promise<void>
```

Lädt die Ansicht neu

--------------------


## setMultiDelay()

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Setzt ein {@link <a href="#delaycondition">DelayCondition</a>} Array, das Bedingungen enthält, die das Plugin verwenden wird, um das Update hinauszuzögern. Nach Erfüllung aller Bedingungen wird der Update-Prozess erneut wie gewohnt gestartet, sodass das Update nach einem Hintergrundbetrieb oder dem Schließen der App installiert wird. Für die `date`-Art sollte der Wert ein iso8601-Datums-String sein. Für die `background`-Art sollte der Wert eine Zahl in Millisekunden sein. Für die `nativeVersion`-Art sollte der Wert die Versionsnummer sein. Für die `kill`-Art wird der Wert nicht verwendet. Die Funktion hat inkonsequentes Verhalten, die Option kill löst das Update nach dem ersten Kill aus und nicht nach dem nächsten Hintergrund wie andere Optionen. Dies wird in einer zukünftigen Hauptversion behoben.

| Parameter     | Typ                                                                  | Beschreibung                                                                                                 |
| ------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Enthält das {@link <a href="#multidelayconditions">MultiDelayConditions</a>} Array von Bedingungen, die gesetzt werden sollen |

**Seit:** 430

--------------------


## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Hebt eine {@link <a href="#delaycondition">DelayCondition</a>} auf, um ein Update sofort zu verarbeiten

**Seit:** 400

--------------------


## getLatest()

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Holt das neueste Bundle verfügbar von der Update-URL

| Parameter     | Typ                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Gibt zurück:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Seit:** 400

--------------------


## setChannel()

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Setzt den Kanal für dieses Gerät. Der Kanal muss eine Selbstzuweisung ermöglichen, damit dies funktioniert. Verwenden Sie diese Methode nicht, um den Kanal beim Start festzulegen, wenn `autoUpdate` in den {@link PluginsConfig} aktiviert ist. Diese Methode dient dazu, den Kanal nach dem Start der App festzulegen. Diese Methode sendet an das Capgo-Backend eine Anfrage, um die Geräte-ID mit dem Kanal zu verknüpfen. Capgo kann je nach Einstellung Ihres Kanals akzeptieren oder ablehnen.

| Parameter     | Typ                                                            | Beschreibung                                                                      |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | Ist die {@link <a href="#setchanneloptions">SetChannelOptions</a>} Kanal, der gesetzt werden soll |

**Gibt zurück:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Seit:** 470

--------------------


## unsetChannel()

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Setzt den Kanal für dieses Gerät zurückDas Gerät kehrt dann zum Standardkanal zurück

| Param         | Typ                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Seit:** 470

--------------------


## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Holen Sie sich den Kanal für dieses Gerät

**Gibt zurück:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Seit:** 480

--------------------


## setCustomId()

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Setzen Sie eine benutzerdefinierte ID für dieses Gerät

| Param         | Typ                                                              | Beschreibung                                                                         |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | ist die {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId, die gesetzt werden soll |

**Seit:** 490

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Holen Sie sich die native App-Version oder die integrierte Version, wenn sie in der Konfiguration festgelegt ist

**Gibt zurück:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Seit:** 520

--------------------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Holen Sie sich die eindeutige ID, die zur Identifizierung des Geräts verwendet wird (an den Auto-Update-Server gesendet)

**Gibt zurück:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Holen Sie sich die native Capacitor Updater-Plugin-Version (an den Auto-Update-Server gesendet)

**Gibt zurück:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Holen Sie sich den Status der Auto-Update-Konfiguration

**Gibt zurück:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------


## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Entfernen Sie alle Listener für dieses Plugin

**Seit:** 100

--------------------


## addListener('download', )

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Hören Sie auf das Bundle-Download-Ereignis in der App, das einmal ausgelöst wird, sobald ein Download gestartet wurde, während des Downloads und nach Abschluss

| Param              | Typ                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'download'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Gibt zurück:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 2011

--------------------


## addListener('noNeedUpdate', )

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Hören Sie auf das Ereignis "Nicht nötig zu aktualisieren", nützlich, wenn Sie bei jedem Start der App eine Überprüfung erzwingen möchten

| Param              | Typ                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'noNeedUpdate'</code>                                             |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Gibt zurück:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 400

--------------------


## addListener('updateAvailable', )

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Hören Sie auf das Ereignis verfügbarer Updates, nützlich, wenn Sie bei jedem Start der App eine Überprüfung erzwingen möchten

| Param              | Typ                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateAvailable'</code>                                                            |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Gibt zurück:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 400

--------------------


## addListener('downloadComplete', )

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Hören Sie auf das Ereignis downloadComplete

| Param              | Typ                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadComplete'</code>                                                             |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Gibt zurück:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 400

--------------------


## addListener('majorAvailable', )

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Hören Sie auf das Ereignis "Major Update" in der App, das Sie informiert, wenn ein großes Update durch das Setzen von disableAutoUpdateBreaking blockiert wird

| Param              | Typ                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'majorAvailable'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Gibt zurück:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 230

--------------------


## addListener('updateFailed', )

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Hören Sie auf das Ereignis "Update fehlgeschlagen" in der App, das Sie informiert, wenn das Update beim nächsten Start der App nicht installiert werden konnte

| Param              | Typ                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'updateFailed'</code>                                                         |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Gibt zurück:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 230

--------------------


## addListener('downloadFailed',)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Hören Sie auf das Ereignis "Download fehlgeschlagen" in der App, um zu erfahren, wann ein Bündeldownload fehlgeschlagen ist.

| Param              | Typ                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadFailed'</code>                                                           |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Gibt zurück:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 400

--------------------


## addListener('appReloaded', )

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Hören Sie auf das Ereignis "Neu geladen" in der App, um zu erfahren, wann ein Neuladen stattgefunden hat.

| Param              | Typ                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Gibt zurück:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 430

--------------------


## addListener('appReady', )

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Hören Sie auf das Ereignis "App bereit" in der App, um zu erfahren, wann die App betriebsbereit ist.

| Param              | Typ                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'appReady'</code>                                                     |
| **`listenerFunc`** | <code>(state: <a href="#appreadyevent">AppReadyEvent</a>) =&gt; void</code> |

**Gibt zurück:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 510

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Erhalten Sie, ob eine automatische Aktualisierung verfügbar ist (nicht vom serverUrl deaktiviert).

**Gibt zurück:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Erhalten Sie das nächste Bündel, das verwendet wird, wenn die App neu geladen wird. Gibt null zurück, wenn kein nächstes Bündel festgelegt ist.

**Gibt zurück:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Seit:** 680

--------------------


## Schnittstellen


### AppReadyResult

| Prop         | Typ                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| Prop             | Typ                                                  |
| ---------------- | ----------------------------------------------------- |
| **`id`**         | <code>string</code>                                   |
| **`version`**    | <code>string</code>                                   |
| **`downloaded`** | <code>string</code>                                   |
| **`checksum`**   | <code>string</code>                                   |
| **`status`**     | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| Prop      | Typ                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl

| Prop      | Typ                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### ChannelUrl

| Prop      | Typ                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### DownloadOptions

| Prop             | Typ                | Beschreibung                                                                                                                                                      | Standard                | Seit |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`**        | <code>string</code> | Die URL der Bündel-Zip-Datei (z. B.: distzip), die heruntergeladen werden soll (dies kann jede URL sein, z. B.: Amazon S3, ein GitHub-Tag oder ein anderer Ort, an dem Sie Ihr Bündel gehostet haben) |                        |       |
| **`version`**    | <code>string</code> | Der Versionscode/-name dieses Bündels/Diese Version                                                                                                                     |                        |       |
| **`sessionKey`** | <code>string</code> | Der Sitzungsschlüssel für die Aktualisierung                                                                                                                                   | <code>undefined</code> | 400 |
| **`checksum`**   | <code>string</code> | Die Prüfziffer für die Aktualisierung                                                                                                                                      | <code>undefined</code> | 400 |


### BundleId

| Prop     | Typ                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListResult

| Prop          | Typ                      |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| Prop      | Typ                 | Beschreibung                                                                                                                                    | Standard            | Seit  |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ------ |
| **`raw`** | <code>boolean</code> | Ob die rohen Bündelliste oder das Manifest zurückgegeben werden sollen. Wenn true, wird die Liste versuchen, die interne Datenbank statt der Dateien auf der Festplatte auszulesen | <code>false</code> | 6140 |


### ResetOptions

| Prop                   | Typ                 |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| Prop         | Typ                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code>                               |


### MultiDelayConditions

| Prop                  | Typ                          |
| --------------------- | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### DelayCondition

| Prop        | Typ                                                      | Beschreibung                              |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`**  | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Verzögerungsbedingungen in setMultiDelay einrichten |
| **`value`** | <code>string</code>                                       |                                          |


### LatestVersion

| Prop             | Typ                         | Beschreibung                | Seit |
| ---------------- | ---------------------------- | -------------------------- | ----- |
| **`version`**    | <code>string</code>          | Ergebnis der getLatest-Methode | 400 |
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

| Prop          | Type                | Beschreibung                                                                                     | Standard                | Seit |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | Der Kanal, um die neueste Version zu erhalten. Der Kanal muss 'self_assign' zulassen, damit dies funktioniert | <code>undefined</code> | 680 |


### ChannelRes

| Prop          | Type                | Beschreibung                   | Seit |
| ------------- | ------------------- | ----------------------------- | ----- |
| **`status`**  | <code>string</code> | Aktueller Status des festgelegten Kanals | 470 |
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

| Prop           | Type                 | Beschreibung                   | Seit |
| -------------- | -------------------- | ----------------------------- | ----- |
| **`channel`**  | <code>string</code>  | Aktueller Status des Empfangskanals | 480 |
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

| Prop          | Type                                              | Beschreibung                                    | Seit |
| ------------- | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`percent`** | <code>number</code>                               | Aktueller Status des Downloads, zwischen 0 und 100 | 400 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeedEvent

| Prop         | Type                                              | Beschreibung                                    | Seit |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Aktueller Status des Downloads, zwischen 0 und 100 | 400 |


### UpdateAvailableEvent

| Prop         | Type                                              | Beschreibung                                    | Seit |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Aktueller Status des Downloads, zwischen 0 und 100 | 400 |


### DownloadCompleteEvent

| Prop         | Type                                              | Beschreibung                          | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Wird emittiert, wenn ein neues Update verfügbar ist | 400 |


### MajorAvailableEvent

| Prop          | Type                | Beschreibung                                | Seit |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | Wird emittiert, wenn ein neues Major-Bundle verfügbar ist | 400 |


### UpdateFailedEvent

| Prop         | Type                                              | Beschreibung                           | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Wird emittiert, wenn ein Update nicht installiert werden konnte | 400 |


### DownloadFailedEvent

| Prop          | Type                | Beschreibung                | Seit |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Wird emittiert, wenn ein Download fehlschlägt | 400 |


### AppReadyEvent

| Prop         | Type                                              | Beschreibung                           | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Wird emittiert, wenn die App bereit zur Verwendung ist | 520 |
| **`status`** | <code>string</code>                               |                                       |       |


### AutoUpdateAvailable

| Prop            | Type                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


## Typ-Aliase


### BundleStatus

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>