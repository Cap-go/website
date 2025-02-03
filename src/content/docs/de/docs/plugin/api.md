---
title: Fungsi dan pengaturan
description: Alle verfügbaren Methoden und Einstellungen des Plugins
sidebar:
  order: 2
locale: de
---

# Updater Plugin Konfiguration

Weitere Informationen finden Sie im Github [Readme](https://githubcom/Cap-go/capacitor-updater)

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater kann mit folgenden Optionen konfiguriert werden:

| Eigenschaft                  | Typ                  | Beschreibung                                                                                                                                                                                   | Standard                                           | Seit    |
| ---------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| **`appReadyTimeout`**        | <code>number</code>  | Konfiguriert die Anzahl der Millisekunden, die das native Plugin warten soll, bevor ein Update als 'fehlgeschlagen' gilt. Nur verfügbar für Android und iOS                                    | <code>10000 // (10 Sekunden)</code>                |         |
| **`responseTimeout`**        | <code>number</code>  | Konfiguriert die Anzahl der Millisekunden, die das native Plugin warten soll, bevor API-Timeout eintritt. Nur verfügbar für Android und iOS                                                    | <code>20 // (20 Sekunden)</code>                   |         |
| **`autoDeleteFailed`**       | <code>boolean</code> | Konfiguriert, ob das Plugin fehlgeschlagene Bundles automatisch löschen soll. Nur verfügbar für Android und iOS                                                                                | <code>true</code>                                  |         |
| **`autoDeletePrevious`**     | <code>boolean</code> | Konfiguriert, ob das Plugin vorherige Bundles nach einem erfolgreichen Update automatisch löschen soll. Nur verfügbar für Android und iOS                                                      | <code>true</code>                                  |         |
| **`autoUpdate`**             | <code>boolean</code> | Konfiguriert, ob das Plugin Auto-Update über einen Update-Server verwenden soll. Nur verfügbar für Android und iOS                                                                             | <code>true</code>                                  |         |
| **`resetWhenUpdate`**        | <code>boolean</code> | Löscht automatisch zuvor heruntergeladene Bundles, wenn ein neueres natives App-Bundle auf dem Gerät installiert wird. Nur verfügbar für Android und iOS                                       | <code>true</code>                                  |         |
| **`updateUrl`**              | <code>string</code>  | Konfiguriert die URL/den Endpunkt, an den Update-Prüfungen gesendet werden. Nur verfügbar für Android und iOS                                                                                  | <code>https://plugincapgoapp/updates</code>      |         |
| **`channelUrl`**             | <code>string</code>  | Konfiguriert die URL/den Endpunkt für Kanal-Operationen. Nur verfügbar für Android und iOS                                                                                                     | <code>https://plugincapgoapp/channel_self</code> |         |
| **`statsUrl`**               | <code>string</code>  | Konfiguriert die URL/den Endpunkt, an den Update-Statistiken gesendet werden. Nur verfügbar für Android und iOS. Auf "" setzen, um Statistik-Reporting zu deaktivieren                         | <code>https://plugincapgoapp/stats</code>        |         |
| **`privateKey`**             | <code>string</code>  | Konfiguriert den privaten Schlüssel für Ende-zu-Ende Live-Update-Verschlüsselung. Nur verfügbar für Android und iOS. Veraltet in Version 620, wird in Version 700 entfernt                    | <code>undefined</code>                             |         |
| **`publicKey`**              | <code>string</code>  | Konfiguriert den öffentlichen Schlüssel für Ende-zu-Ende Live-Update-Verschlüsselung Version 2. Nur verfügbar für Android und iOS                                                              | <code>undefined</code>                             | 620   |
| **`version`**                | <code>string</code>  | Konfiguriert die aktuelle Version der App. Dies wird für die erste Update-Anfrage verwendet. Wenn nicht gesetzt, holt das Plugin die Version aus dem nativen Code. Nur für Android und iOS     | <code>undefined</code>                             | 41748 |
| **`directUpdate`**           | <code>boolean</code> | Lässt das Plugin Updates direkt installieren, wenn die App gerade aktualisiert/installiert wurde. Nur für autoUpdate-Modus. Nur verfügbar für Android und iOS                                  | <code>undefined</code>                             | 510   |
| **`periodCheckDelay`**       | <code>number</code>  | Konfiguriert die Verzögerungszeit für periodische Update-Prüfungen in Sekunden. Nur verfügbar für Android und iOS. Kann nicht weniger als 600 Sekunden (10 Minuten) sein                      | <code>600 // (10 Minuten)</code>                   |         |
| **`localS3`**                | <code>boolean</code> | Konfiguriert die CLI zur Verwendung eines lokalen Servers für Tests oder selbst gehosteten Update-Server                                                                                        | <code>undefined</code>                             | 41748 |
| **`localHost`**              | <code>string</code>  | Konfiguriert die CLI zur Verwendung eines lokalen Servers für Tests oder selbst gehosteten Update-Server                                                                                        | <code>undefined</code>                             | 41748 |
| **`localWebHost`**           | <code>string</code>  | Konfiguriert die CLI zur Verwendung eines lokalen Servers für Tests oder selbst gehosteten Update-Server                                                                                        | <code>undefined</code>                             | 41748 |
| **`localSupa`**              | <code>string</code>  | Konfiguriert die CLI zur Verwendung eines lokalen Servers für Tests oder selbst gehosteten Update-Server                                                                                        | <code>undefined</code>                             | 41748 |
| **`localSupaAnon`**          | <code>string</code>  | Konfiguriert die CLI zur Verwendung eines lokalen Servers für Tests                                                                                                                             | <code>undefined</code>                             | 41748 |
| **`localApi`**               | <code>string</code>  | Konfiguriert die CLI zur Verwendung einer lokalen API für Tests                                                                                                                                 | <code>undefined</code>                             | 633   |
| **`localApiFiles`**          | <code>string</code>  | Konfiguriert die CLI zur Verwendung einer lokalen Datei-API für Tests                                                                                                                          | <code>undefined</code>                             | 633   |
| **`allowModifyUrl`**         | <code>boolean</code> | Erlaubt dem Plugin, updateUrl, statsUrl und channelUrl dynamisch von der JavaScript-Seite zu ändern                                                                                             | <code>false</code>                                 | 540   |
| **`defaultChannel`**         | <code>string</code>  | Setzt den Standard-Kanal für die App in der Konfiguration                                                                                                                                      | <code>undefined</code>                             | 41748 || **`appId`**                  | <code>string</code>  | Konfigurieren Sie die App-ID für die App in der Konfiguration                                                                                                                                                 | <code>undefined</code>                             | 600   |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | Konfigurieren Sie das Plugin, um den URL-Pfad nach einem Neuladen beizubehalten. WARNUNG: Wenn ein Neuladen ausgelöst wird, wird 'windowhistory' gelöscht                                                                | <code>false</code>                                 | 680   |

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
```| Parameter | Typ | Beschreibung |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Enthält die ID des nächsten Bundles, das beim nächsten App-Start gesetzt werden soll {@link <a href="#bundleinfo">BundleInfoid</a>} |

**Gibt zurück:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a>&gt;</code>

--------------------

## set()

```typescript
set(options: BundleId) => Promise<void>
```

Setzt das aktuelle Bundle und lädt die App sofort neu

| Parameter | Typ | Beschreibung |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Ein {@link <a href="#bundleid">BundleId</a>} Objekt mit der neuen Bundle-ID, die als aktuell gesetzt werden soll |

--------------------

## delete()

```typescript
delete(options: BundleId) => Promise<void>
```

Löscht das angegebene Bundle aus dem nativen App-Speicher. Verwenden Sie es zusammen mit {@link list}, um die gespeicherten Bundle-IDs zu erhalten

| Parameter | Typ | Beschreibung |
| ------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Ein {@link <a href="#bundleid">BundleId</a>} Objekt, das die ID eines zu löschenden Bundles enthält (beachten Sie, dies ist die Bundle-ID, NICHT der Versionsname) |

--------------------

## list()

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Erhalte alle lokal heruntergeladenen Bundles in deiner App

| Parameter | Typ | Beschreibung |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | Die {@link <a href="#listoptions">ListOptions</a>} für das Auflisten von Bundles |

**Gibt zurück:** <code>Promise&lt;<a href="#bundlelistresult">BundleListResult</a>&gt;</code>

--------------------

## reset()

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Setzt die App auf das 'builtin'-Bundle zurück (das an den Apple App Store / Google Play Store gesendet wurde) oder auf das zuletzt erfolgreich geladene Bundle

| Parameter | Typ | Beschreibung |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Enthält {@link <a href="#resetoptions">ResetOptionstoLastSuccessful</a>}, `true` setzt auf das builtin-Bundle zurück und `false` setzt auf das zuletzt erfolgreich geladene Bundle zurück |

--------------------

## current()

```typescript
current() => Promise<CurrentBundleResult>
```

Gibt das aktuelle Bundle zurück, wenn keines gesetzt ist, wird 'builtin' zurückgegeben. currentNative ist das ursprünglich auf dem Gerät installierte Bundle

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

Setzt ein {@link <a href="#delaycondition">DelayCondition</a>} Array mit Bedingungen, die das Plugin verwendet, um das Update zu verzögern
Nachdem alle Bedingungen erfüllt sind, wird der Update-Prozess wie gewohnt wieder gestartet, sodass das Update nach dem Hintergrundwechsel oder Beenden der App installiert wird
Für die Art 'date' sollte der Wert ein iso8601-Datums-String sein
Für die Art 'background' sollte der Wert eine Zahl in Millisekunden sein
Für die Art 'nativeVersion' sollte der Wert die Versionsnummer sein
Für die Art 'kill' wird der Wert nicht verwendet
Die Funktion hat ein inkonsistentes Verhalten: Die Option 'kill' löst das Update nach dem ersten Beenden aus und nicht nach dem nächsten Hintergrundwechsel wie andere Optionen. Dies wird in einem zukünftigen Major Release behoben

| Parameter | Typ | Beschreibung |
| ------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Enthält das {@link <a href="#multidelayconditions">MultiDelayConditions</a>} Array von zu setzenden Bedingungen |

**Seit:** 430

--------------------

## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Bricht eine {@link <a href="#delaycondition">DelayCondition</a>} ab, um ein Update sofort zu verarbeiten

**Seit:** 400

--------------------

## getLatest()

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Erhalte das neueste verfügbare Bundle von der Update-URL

| Parameter | Typ |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Gibt zurück:** <code>Promise&lt;<a href="#latestversion">LatestVersion</a>&gt;</code>

**Seit:** 400

--------------------

## setChannel()

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Setzt den Kanal für dieses Gerät. Der Kanal muss Selbstzuweisung erlauben, damit dies funktioniert
Verwenden Sie diese Methode nicht, um den Kanal beim Start zu setzen, wenn `autoUpdate` in der {@link PluginsConfig} aktiviert ist
Diese Methode ist zum Setzen des Kanals, nachdem die App bereit ist
Diese Methode sendet eine Anfrage an den Capgo-Backend, um die Geräte-ID mit dem Kanal zu verknüpfen. Capgo kann je nach Einstellung Ihres Kanals akzeptieren oder ablehnen

| Parameter | Typ | Beschreibung |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | Ist die {@link <a href="#setchanneloptions">SetChannelOptions</a>} Kanal zu setzen |

**Gibt zurück:** <code>Promise&lt;<a href="#channelres">ChannelRes</a>&gt;</code>

**Seit:** 470

--------------------

## unsetChannel()

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Hebt die Kanaleinstellung für dieses Gerät aufDas Gerät kehrt dann zum Standardkanal zurück

| Param | Type |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Seit:** 470

--------------------

## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Den Kanal für dieses Gerät abrufen

**Returns:** <code>Promise&lt;<a href="#getchannelres">GetChannelRes</a>&gt;</code>

**Seit:** 480

--------------------

## setCustomId()

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```

Eine benutzerdefinierte ID für dieses Gerät festlegen

| Param | Type | Description |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | ist die {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId zum Setzen |

**Seit:** 490

--------------------

## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Die native App-Version oder die in der Konfiguration festgelegte integrierte Version abrufen

**Returns:** <code>Promise&lt;<a href="#builtinversion">BuiltinVersion</a>&gt;</code>

**Seit:** 520

--------------------

## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Eindeutige ID abrufen, die zur Identifizierung des Geräts verwendet wird (an den Auto-Update-Server gesendet)

**Returns:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

--------------------

## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Die native Capacitor Updater Plugin-Version abrufen (an den Auto-Update-Server gesendet)

**Returns:** <code>Promise&lt;<a href="#pluginversion">PluginVersion</a>&gt;</code>

--------------------

## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Den Status der Auto-Update-Konfiguration abrufen

**Returns:** <code>Promise&lt;<a href="#autoupdateenabled">AutoUpdateEnabled</a>&gt;</code>

--------------------

## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Alle Listener für dieses Plugin entfernen

**Seit:** 100

--------------------

## addListener('download', )

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Auf Bundle-Download-Events in der App lauschen. Wird ausgelöst, wenn ein Download startet, während des Downloads und wenn er beendet ist

| Param | Type | 
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`** | <code>'download'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadevent">DownloadEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 2011

--------------------

## addListener('noNeedUpdate', )

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Auf Events lauschen, wenn kein Update erforderlich ist, nützlich wenn Sie bei jedem App-Start eine Überprüfung erzwingen möchten

| Param | Type |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`** | <code>'noNeedUpdate'</code> |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 400

--------------------

## addListener('updateAvailable', )

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Auf verfügbare Update-Events lauschen, nützlich wenn Sie bei jedem App-Start eine Überprüfung erzwingen möchten

| Param | Type |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'updateAvailable'</code> |
| **`listenerFunc`** | <code>(state: <a href="#updateavailableevent">UpdateAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 400

--------------------

## addListener('downloadComplete', )

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Auf downloadComplete-Events lauschen

| Param | Type |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'downloadComplete'</code> |
| **`listenerFunc`** | <code>(state: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 400

--------------------

## addListener('majorAvailable', )

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Auf Major-Update-Events in der App lauschen, informiert Sie wenn ein Major-Update durch disableAutoUpdateBreaking blockiert wird

| Param | Type |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`eventName`** | <code>'majorAvailable'</code> |
| **`listenerFunc`** | <code>(state: <a href="#majoravailableevent">MajorAvailableEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 230

--------------------

## addListener('updateFailed', )

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Auf Update-Fehler-Events in der App lauschen, informiert Sie wenn ein Update beim nächsten App-Start nicht installiert werden konnte

| Param | Type |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`** | <code>'updateFailed'</code> |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 230

--------------------

## addListener('downloadFailed',```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Hört auf Download-Fehler-Events in der App und informiert Sie, wenn ein Bundle-Download fehlgeschlagen ist

| Parameter          | Typ                                                                     |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'downloadFailed'</code>                                            |
| **`listenerFunc`** | <code>(state: <a href="#downloadfailedevent">DownloadFailedEvent</a>) =&gt; void</code> |

**Gibt zurück:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Seit:** 400

--------------------


## addListener('appReloaded', )

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Hört auf Reload-Events in der App und informiert Sie, wenn ein Reload stattgefunden hat

| Parameter          | Typ                       |
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

Hört auf App-Ready-Events in der App und informiert Sie, wenn die App bereit zur Verwendung ist

| Parameter          | Typ                                                                        |
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

Prüft, ob automatische Updates verfügbar sind (nicht durch serverUrl deaktiviert)

**Gibt zurück:** <code>Promise&lt;<a href="#autoupdateavailable">AutoUpdateAvailable</a>&gt;</code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Ruft das nächste Bundle ab, das beim App-Reload verwendet wird
Gibt null zurück, wenn kein nächstes Bundle festgelegt ist

**Gibt zurück:** <code>Promise&lt;<a href="#bundleinfo">BundleInfo</a> | null&gt;</code>

**Seit:** 680

--------------------


## Interfaces


### AppReadyResult

| Eigenschaft   | Typ                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| Eigenschaft       | Typ                                                  |
| ---------------- | ----------------------------------------------------- |
| **`id`**         | <code>string</code>                                   |
| **`version`**    | <code>string</code>                                   |
| **`downloaded`** | <code>string</code>                                   |
| **`checksum`**   | <code>string</code>                                   |
| **`status`**     | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| Eigenschaft | Typ                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl

| Eigenschaft | Typ                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### ChannelUrl 

| Eigenschaft | Typ                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### DownloadOptions

| Eigenschaft       | Typ                | Beschreibung                                                                                                                                                   | Standard               | Seit |
| ---------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----- |
| **`url`**        | <code>string</code> | Die URL der Bundle-ZIP-Datei (z.B. distzip), die heruntergeladen werden soll (Dies kann eine beliebige URL sein, z.B. Amazon S3, ein GitHub-Tag oder ein anderer Ort, an dem Sie Ihr Bundle gehostet haben) |                       |       |
| **`version`**    | <code>string</code> | Der Versionscode/-name dieses Bundles/dieser Version                                                                                                           |                       |       |
| **`sessionKey`** | <code>string</code> | Der Sitzungsschlüssel für das Update                                                                                                                           | <code>undefined</code> | 400   |
| **`checksum`**   | <code>string</code> | Die Prüfsumme für das Update                                                                                                                                   | <code>undefined</code> | 400   |


### BundleId

| Eigenschaft | Typ                |
| --------- | ------------------- |
| **`id`**  | <code>string</code> |


### BundleListResult

| Eigenschaft    | Typ                      |
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### ListOptions

| Eigenschaft | Typ                 | Beschreibung                                                                                                                                      | Standard           | Seit  |
| ---------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`raw`**  | <code>boolean</code> | Ob die rohe Bundle-Liste oder das Manifest zurückgegeben werden soll. Wenn true, wird versucht, die interne Datenbank anstelle von Dateien auf der Festplatte zu lesen | <code>false</code> | 6140   |


### ResetOptions

| Eigenschaft             | Typ                 |
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| Eigenschaft   | Typ                                              |
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code>                               |


### MultiDelayConditions

| Eigenschaft           | Typ                          |
| -------------------- | ----------------------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### DelayCondition

| Eigenschaft  | Typ                                                      | Beschreibung                              |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`**  | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Verzögerungsbedingungen in setMultiDelay einrichten |
| **`value`** | <code>string</code>                                       |                                          |


### LatestVersion

| Eigenschaft      | Typ                         | Beschreibung                | Seit |
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

| Eigenschaft         | Typ                        |
| ------------------ | --------------------------- |
| **`file_name`**    | <code>string \| null</code> |
| **`file_hash`**    | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### GetLatestOptions

| Eigenschaft    | Typ                | Beschreibung                                                                                    | Standard               | Seit |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`channel`** | <code>string</code> | Der Kanal, für den die neueste Version abgerufen werden soll. Der Kanal muss 'self_assign' erlauben, damit dies funktioniert | <code>undefined</code> | 680 |


### ChannelRes

| Eigenschaft    | Typ                | Beschreibung                | Seit |
| ------------- | ------------------- | --------------------------- | ----- |
| **`status`**  | <code>string</code> | Aktueller Status des festgelegten Kanals | 470 |
| **`error`**   | <code>string</code> |                            |       |
| **`message`** | <code>string</code> |                            |       |


### SetChannelOptions

| Eigenschaft              | Typ                 |
| ----------------------- | -------------------- |
| **`channel`**           | <code>string</code>  |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| Eigenschaft              | Typ                 |
| ----------------------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes

| Eigenschaft     | Typ                 | Beschreibung                | Seit |
| -------------- | -------------------- | --------------------------- | ----- |
| **`channel`**  | <code>string</code>  | Aktueller Status des abgerufenen Kanals | 480 |
| **`error`**    | <code>string</code>  |                            |       |
| **`message`**  | <code>string</code>  |                            |       |
| **`status`**   | <code>string</code>  |                            |       |
| **`allowSet`** | <code>boolean</code> |                            |       |


### SetCustomIdOptions

| Eigenschaft     | Typ                |
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### BuiltinVersion

| Eigenschaft    | Typ                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### DeviceId

| Eigenschaft     | Typ                |
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### PluginVersion

| Eigenschaft    | Typ                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### AutoUpdateEnabled

| Eigenschaft    | Typ                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| Eigenschaft   | Typ                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### DownloadEvent

| Eigenschaft    | Typ                                              | Beschreibung                                 | Seit |
| ------------- | ------------------------------------------------- | ------------------------------------------- | ----- |
| **`percent`** | <code>number</code>                               | Aktueller Status des Downloads, zwischen 0 und 100 | 400 |
| **`bundle`**  | <code><a href="#bundleinfo">BundleInfo</a></code> |                                             |       |


### NoNeedEvent

| Eigenschaft   | Typ                                              | Beschreibung                                 | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Aktueller Status des Downloads, zwischen 0 und 100 | 400 |


### UpdateAvailableEvent

| Eigenschaft   | Typ                                              | Beschreibung                                 | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Aktueller Status des Downloads, zwischen 0 und 100 | 400 |


### DownloadCompleteEvent

| Eigenschaft   | Typ                                              | Beschreibung                         | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Wird ausgelöst, wenn ein neues Update verfügbar ist | 400 |


### MajorAvailableEvent

| Eigenschaft    | Typ                | Beschreibung                                      | Seit |
| ------------- | ------------------- | ------------------------------------------------ | ----- |
| **`version`** | <code>string</code> | Wird ausgelöst, wenn ein neues Major-Bundle verfügbar ist | 400 |


### UpdateFailedEvent

| Eigenschaft   | Typ                                              | Beschreibung                                | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Wird ausgelöst, wenn ein Update fehlschlägt | 400 |


### DownloadFailedEvent

| Eigenschaft    | Typ                | Beschreibung                              | Seit |
| ------------- | ------------------- | ---------------------------------------- | ----- |
| **`version`** | <code>string</code> | Wird ausgelöst, wenn ein Download fehlschlägt | 400 |


### AppReadyEvent

| Eigenschaft   | Typ                                              | Beschreibung                                | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Wird ausgelöst, wenn die App bereit zur Nutzung ist | 520 |
| **`status`** | <code>string</code>                               |                                            |       |


### AutoUpdateAvailable

| Eigenschaft      | Typ                 |
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


## Type Aliases


### BundleStatus

<code>'success' | 'error' | 'pending' | 'downloading'</code>


### DelayUntilNext

<code>'background' | 'kill' | 'nativeVersion' | 'date'</code>

</docgen-api>