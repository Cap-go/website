---
title: Funktionen und Einstellungen
description: Alle verfügbaren Methoden und Einstellungen des Plugins
sidebar:
  order: 2
locale: de
---
# Updater-Plugin-Konfiguration

Weitere Informationen finden Sie im Github [Readme](https://github.com/Cap-go/capacitor-updater).

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

CapacitorUpdater kann mit diesen Optionen konfiguriert werden:| Stütze | Geben Sie | ein Beschreibung | Standard | Seit |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------- |
| **`appReadyTimeout`** | <code>Nummer</code> | Konfigurieren Sie die Anzahl der Millisekunden, die das native Plugin warten soll, bevor ein Update als „fehlgeschlagen“ betrachtet wird. Verfügbar auf Android, iOS und Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>10000 // (10 Sekunden)</code> |         |
| **`responseTimeout`** | <code>Nummer</code> | Konfigurieren Sie die Anzahl der Millisekunden, die das native Plugin warten soll, bevor das Zeitlimit API berücksichtigt wird. Verfügbar auf Android, iOS und Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>20000 // (20 Sekunden)</code> |         |
| **`autoDeleteFailed`** | <code>boolean</code> | Konfigurieren Sie, ob das Plugin fehlgeschlagene Bundles automatisch löschen soll. Verfügbar auf Android, iOS und Elektron.                                                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>true</code> |         |
| **`autoDeletePrevious`** | <code>boolean</code> | Konfigurieren Sie, ob das Plugin nach einem erfolgreichen Update automatisch vorherige Bundles löschen soll. Verfügbar auf Android, iOS und Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>true</code> |         |
| **`autoUpdate`** | <code>boolean</code> | Konfigurieren Sie, ob das Plugin Auto Update über einen Update-Server verwenden soll. Verfügbar auf Android, iOS und Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>true</code> |         |
| **`resetWhenUpdate`** | <code>boolean</code> | Löschen Sie zuvor heruntergeladene Bundles automatisch, wenn ein neueres natives App-Bundle auf dem Gerät installiert wird. Verfügbar auf Android, iOS und Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>true</code> |         |
| **`updateUrl`** | <code>string</code> | Konfigurieren Sie die URL/den Endpunkt, an den Update-Prüfungen gesendet werden. Verfügbar auf Android, iOS und Electron.| <code>https://plugin.capgo.app/updates</code> |         |
| **`channelUrl`** | <code>string</code> | Konfigurieren Sie die URL/den Endpunkt für Kanalvorgänge. Verfügbar für Android, iOS und Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>https://plugin.capgo.app/channel_self</code> |         |
| **`statsUrl`** | <code>string</code> | Konfigurieren Sie die URL/den Endpunkt, an den Update-Statistiken gesendet werden. Verfügbar auf Android, iOS und Electron. Auf „“ setzen, um die Statistikberichterstattung zu deaktivieren.                                                                                                                                                                                                                                                                                                                                                                                                                                       | <code>https://plugin.capgo.app/stats</code> |         |
| **`publicKey`** | <code>string</code> | Konfigurieren Sie den öffentlichen Schlüssel für die End-to-End-Live-Update-Verschlüsselung Version 2. Verfügbar auf Android, iOS und Electron.                                                                                                                                                                                                                                                                                                                                                                                                                                                             | <code>undefiniert</code> | 6.2.0 |
| **`version`** | <code>string</code> | Konfigurieren Sie die aktuelle Version der App. Dies wird für die erste Update-Anfrage verwendet. Wenn nicht festgelegt, erhält das Plugin die Version aus dem nativen Code. Verfügbar auf Android, iOS und Electron.| <code>undefiniert</code> | 4.17.48 |
| **`directUpdate`** | <code>boolean \| 'immer' \| 'atInstall' \| 'onLaunch'</code> | Konfigurieren Sie, wann das Plugin Updates direkt installieren soll. Nur für den AutoUpdate-Modus. Funktioniert gut für Apps mit weniger als 10 MB und mit Uploads, die mit der Flagge --delta erfolgen. Zip-Dateien oder Apps mit mehr als 10 MB werden für Benutzer relativ langsam aktualisiert. – false: Führen Sie niemals direkte Aktualisierungen durch (Standardverhalten verwenden: beim Start herunterladen, im Hintergrund festlegen) – atInstall: Direkte Aktualisierung nur, wenn die App installiert oder aus dem Store aktualisiert wird, andernfalls als „directUpdate = false“ fungieren – onLaunch: Direkte Aktualisierung nur bei installierter App, Aktualisierung aus dem Store oder nach App-Kill, ansonsten als „directUpdate = false“ – immer: Direkte Aktualisierung in allen vorherigen Fällen (App installiert, aus dem Store aktualisiert, nach App-Kill oder App-Fortsetzung), niemals als „directUpdate = false“ fungieren – true: (veraltet) Das Gleiche wie „immer“ für Abwärtskompatibilität. Verfügbar auf Android, iOS und Electron. | <code>false</code> | 5.1.0 |
| **`autoSplashscreen`** | <code>boolean</code> | Behandeln Sie das Ausblenden des Begrüßungsbildschirms automatisch, wenn Sie DirectUpdate verwenden. Wenn diese Option aktiviert ist, blendet das Plugin den Begrüßungsbildschirm automatisch aus, nachdem Updates angewendet wurden oder wenn kein Update erforderlich ist. Dadurch entfällt die Notwendigkeit, manuell auf appReady-Ereignisse zu warten und SplashScreen.hide() aufzurufen. Funktioniert nur, wenn directUpdate auf „atInstall“, „always“ oder true gesetzt ist. Erfordert die Installation und Konfiguration des Plugins @capacitor/splash-screen mit launchAutoHide: false. Erfordert die Aktivierung von autoUpdate und directUpdate. Verfügbar für Android und iOS.                      | <code>false</code> | 7.6.0 |
| **`periodCheckDelay`** | <code>Nummer</code> | Konfigurieren Sie den Verzögerungszeitraum für die Periodenaktualisierungsprüfung. Die Einheit ist in Sekunden. Verfügbar auf Android, iOS und Electron. Darf nicht kürzer als 600 Sekunden (10 Minuten) sein.                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>600 // (10 Minuten)</code> |         |
| **`localS3`** | <code>boolean</code> | Konfigurieren Sie CLI so, dass ein lokaler Server zum Testen oder ein selbstgehosteter Update-Server verwendet wird.| <code>undefiniert</code> | 4.17.48 |
| **`localHost`** | <code>string</code> | Konfigurieren Sie CLI so, dass ein lokaler Server zum Testen oder ein selbstgehosteter Update-Server verwendet wird.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefiniert</code> | 4.17.48 |
| **`localWebHost`** | <code>string</code> | Konfigurieren Sie CLI so, dass ein lokaler Server zum Testen oder ein selbstgehosteter Update-Server verwendet wird.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefiniert</code> | 4.17.48 |
| **`localSupa`** | <code>string</code> | Konfigurieren Sie CLI so, dass ein lokaler Server zum Testen oder ein selbstgehosteter Update-Server verwendet wird.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefiniert</code> | 4.17.48 |
| **`localSupaAnon`** | <code>string</code> | Konfigurieren Sie CLI so, dass zum Testen ein lokaler Server verwendet wird.| <code>undefiniert</code> | 4.17.48 |
| **`localApi`**               | <code>string</code> | Konfigurieren Sie CLI so, dass zum Testen eine lokale API verwendet wird.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>undefiniert</code> | 6.3.3 |
| **`localApiFiles`**          | <code>string</code> | Konfigurieren Sie CLI so, dass zum Testen eine lokale Datei-API verwendet wird.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | <code>undefiniert</code> | 6.3.3 |
| **`allowModifyUrl`**         | <code>boolean</code> | Ermöglichen Sie dem Plugin, updateUrl, statsUrl undchannelUrl dynamisch von der JavaScript-Seite aus zu ändern.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <code>false</code> | 5.4.0 |
| **`defaultChannel`**         | <code>string</code> | Legen Sie in der Konfiguration den Standardkanal für die App fest. Groß- und Kleinschreibung beachten. Diese Einstellung überschreibt den in der Cloud festgelegten Standardkanal, berücksichtigt jedoch weiterhin die in der Cloud vorgenommenen Überschreibungen.                                                                                                                                                                                                                                                                                                                                                                                      | <code>undefined</code> | 5.5.0 |
| **`appId`** | <code>string</code> | Konfigurieren Sie die App-ID für die App in der Konfiguration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>undefiniert</code> | 6.0.0 |
| **`keepUrlPathAfterReload`** | <code>boolean</code> | Konfigurieren Sie das Plugin so, dass der URL-Pfad nach einem Neuladen erhalten bleibt. WARNUNG: Wenn ein Neuladen ausgelöst wird, wird „window.history“ gelöscht.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code> | 6.8.0 |
| **`disableJSLogging`** | <code>boolean</code> | Deaktivieren Sie die JavaScript-Protokollierung des Plugins. Wenn „true“, meldet sich das Plugin nicht an der JavaScript-Konsole an. es wird nur das native Protokoll erstellt | <code>false</code> | 7.3.0 |
| **`shakeMenu`** | <code>boolean</code> | Aktivieren Sie die Schüttelgeste, um das Update-Menü zu Debug-/Testzwecken anzuzeigen | <code>false</code> | 7.5.0 |## Beispiele

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
* [`current()`](#aktuell)
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
* [Schnittstellen](#interfaces)
* [Typ-Aliase](#type-aliases)

</docgen-index>

# Methoden

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

## notifyAppReady()

```typescript
notifyAppReady() => Promise<AppReadyResult>
```

Capacitor Updater benachrichtigen, dass das aktuelle Bundle funktioniert (ein Rollback erfolgt, wenn diese Methode nicht bei jedem App-Start aufgerufen wird)
Standardmäßig sollte diese Methode in den ersten 10 Sekunden nach dem App-Start aufgerufen werden, andernfalls kommt es zu einem Rollback.
Ändern Sie dieses Verhalten mit {@link appReadyTimeout}

**Rückgaben:** <code>Promise<<a href="#appreadyresult">AppReadyResult</a>></code>

--------------------


## setUpdateUrl(...)

```typescript
setUpdateUrl(options: UpdateUrl) => Promise<void>
```

Legen Sie die updateUrl für die App fest. Diese wird verwendet, um nach Updates zu suchen.

| Param | Geben Sie | ein Beschreibung |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#updateurl">UpdateUrl</a></code> | enthält die URL, die zum Suchen nach Updates verwendet werden soll. |

**Seit:** 5.4.0

--------------------


## setStatsUrl(...)

```typescript
setStatsUrl(options: StatsUrl) => Promise<void>
```

Legen Sie die statsUrl für die App fest. Diese wird zum Senden von Statistiken verwendet. Durch die Übergabe einer leeren Zeichenfolge wird die Statistikerfassung deaktiviert.| Param | Geben Sie | ein Beschreibung |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| **`options`** | <code><a href="#statsurl">StatsUrl</a></code> | enthält die URL, die zum Senden von Statistiken verwendet werden soll. |

**Seit:** 5.4.0

--------------------


## setChannelUrl(...)

```typescript
setChannelUrl(options: ChannelUrl) => Promise<void>
```

Legen Sie die Kanal-URL für die App fest. Diese wird zum Festlegen des Kanals verwendet.

| Param | Geben Sie | ein Beschreibung |
| ------------- | ------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#channelurl">ChannelUrl</a></code> | enthält die URL, die zum Einstellen des Kanals verwendet werden soll. |

**Seit:** 5.4.0

--------------------


## herunterladen(...)

```typescript
download(options: DownloadOptions) => Promise<BundleInfo>
```

Laden Sie ein neues Paket von der angegebenen URL herunter. Es sollte eine ZIP-Datei mit darin enthaltenen Dateien oder mit einer eindeutigen ID für alle Ihre Dateien sein

| Param | Geben Sie | ein Beschreibung |
| ------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadoptions">DownloadOptions</a></code> | Der {@link <a href="#downloadoptions">DownloadOptions</a>} zum Herunterladen einer neuen Bundle-ZIP-Datei. |

**Rückgaben:** <code>Promise<<a href="#bundleinfo">BundleInfo</a>></code>

--------------------


## weiter(...)

```typescript
next(options: BundleId) => Promise<BundleInfo>
```

Legen Sie das nächste Bundle fest, das beim Neuladen der App verwendet werden soll.

| Param | Geben Sie | ein Beschreibung |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Enthält die ID des nächsten Bundles, das beim nächsten App-Start festgelegt werden soll. {@link <a href="#bundleinfo">BundleInfo.id</a>} |

**Rückgaben:** <code>Promise<<a href="#bundleinfo">BundleInfo</a>></code>

--------------------


## gesetzt(...)

```typescript
set(options: BundleId) => Promise<void>
```

Legt das aktuelle Bundle fest und lädt die App sofort neu.| Param | Geben Sie | ein Beschreibung |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Ein {@link <a href="#bundleid">BundleId</a>}-Objekt, das die neue Bundle-ID enthält, die als aktuell festgelegt werden soll. |

--------------------


## löschen(...)

```typescript
delete(options: BundleId) => Promise<void>
```

Löscht das angegebene Bundle aus dem nativen App-Speicher. Verwenden Sie es mit {@link list}, um die gespeicherten Bundle-IDs abzurufen.

| Param | Geben Sie | ein Beschreibung |
| ------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#bundleid">BundleId</a></code> | Ein {@link <a href="#bundleid">BundleId</a>}-Objekt, das die ID eines zu löschenden Bundles enthält (beachten Sie, dass dies die Bundle-ID ist, NICHT der Versionsname) |

--------------------


## Liste(...)

```typescript
list(options?: ListOptions | undefined) => Promise<BundleListResult>
```

Holen Sie sich alle lokal heruntergeladenen Bundles in Ihre App

| Param | Geben Sie | ein Beschreibung |
| ------------- | --------------------------------------------------- | -------------------------------------------------------- |
| **`options`** | <code><a href="#listoptions">ListOptions</a></code> | Der {@link <a href="#listoptions">ListOptions</a>} zum Auflisten von Bundles |

**Rückgaben:** <code>Promise<<a href="#bundlelistresult">BundleListResult</a>></code>

--------------------


## zurücksetzen(...)

```typescript
reset(options?: ResetOptions | undefined) => Promise<void>
```

Setzen Sie die App auf das Bundle `builtin` (das an Apple App Store / Google Play Store gesendete Paket) oder das zuletzt erfolgreich geladene Bundle zurück.

| Param | Geben Sie | ein Beschreibung |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#resetoptions">ResetOptions</a></code> | Enthält {@link <a href="#resetoptions">ResetOptions.toLastSuccessful</a>}, `true` wird auf das integrierte Bundle zurückgesetzt und `false` wird auf das zuletzt erfolgreich geladene Bundle zurückgesetzt. |

--------------------


## aktuell()

```typescript
current() => Promise<CurrentBundleResult>
```Rufen Sie das aktuelle Bundle ab. Wenn keines festgelegt ist, wird `builtin` zurückgegeben. currentNative ist das Originalpaket, das auf dem Gerät installiert ist

**Rückgaben:** <code>Promise<<a href="#currentbundleresult">CurrentBundleResult</a>></code>

--------------------


## reload()

```typescript
reload() => Promise<void>
```

Laden Sie die Ansicht neu

--------------------


## setMultiDelay(...)

```typescript
setMultiDelay(options: MultiDelayConditions) => Promise<void>
```

Legt ein {@link <a href="#delaycondition">DelayCondition</a>}-Array fest, das Bedingungen enthält, die das Plugin verwendet, um die Aktualisierung zu verzögern.
Nachdem alle Bedingungen erfüllt sind, wird der Update-Vorgang wie gewohnt erneut ausgeführt, sodass das Update nach einem Hintergrund- oder Beenden der App installiert wird.
Für den Typ `date` sollte der Wert eine iso8601-Datumszeichenfolge sein.
Für den Typ `background` sollte der Wert eine Zahl in Millisekunden sein.
Für den Typ `nativeVersion` sollte der Wert die Versionsnummer sein.
Für den Typ `kill` wird der Wert nicht verwendet.
Die Funktion weist ein inkonsistentes Verhalten auf. Die Option kill löst das Update nach dem ersten Kill aus und nicht wie andere Optionen nach dem nächsten Hintergrund. Dies wird in einer zukünftigen Hauptversion behoben.

| Param | Geben Sie | ein Beschreibung |
| ------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **`options`** | <code><a href="#multidelayconditions">MultiDelayConditions</a></code> | Enthält das Array {@link <a href="#multidelayconditions">MultiDelayConditions</a>} mit festzulegenden Bedingungen |

**Seit:** 4.3.0

--------------------


## cancelDelay()

```typescript
cancelDelay() => Promise<void>
```

Bricht einen {@link <a href="#delaycondition">DelayCondition</a>} ab, um ein Update sofort zu verarbeiten.

**Seit:** 4.0.0

--------------------


## getLatest(...)

```typescript
getLatest(options?: GetLatestOptions | undefined) => Promise<LatestVersion>
```

Holen Sie sich das neueste Paket, das über die Update-URL verfügbar ist

| Param | Geben Sie | ein
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getlatestoptions">GetLatestOptions</a></code> |

**Rückgaben:** <code>Promise<<a href="#latestversion">LatestVersion</a>></code>

**Seit:** 4.0.0

--------------------


## setChannel(...)

```typescript
setChannel(options: SetChannelOptions) => Promise<ChannelRes>
```

Legt den Kanal für dieses Gerät fest. Damit dies funktioniert, muss auf dem Kanal `allow_device_self_set` aktiviert sein.**Wichtige Hinweise:**
– Verwenden Sie diese Methode nicht, um den Kanal beim Booten festzulegen. Verwenden Sie stattdessen `defaultChannel` in Ihrer Capacitor-Konfiguration.
– Diese Methode ist für die Verwendung gedacht, nachdem die App fertig ist und der Benutzer interagiert hat (z. B. wenn er sich für ein Betaprogramm entscheidet).
- **Öffentliche Kanäle können nicht selbst zugewiesen werden.** Wenn ein Kanal als `public` markiert ist, wird beim Aufruf von `setChannel()` ein Fehler zurückgegeben. Um einen öffentlichen Kanal zu verwenden, rufen Sie stattdessen `unsetChannel()` auf – das Gerät greift automatisch auf den passenden öffentlichen Kanal zurück.
- Verwenden Sie `listChannels()`, um herauszufinden, welche Kanäle verfügbar sind und ob sie eine Selbstzuweisung zulassen.

| Param | Geben Sie | ein Beschreibung |
| ------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setchanneloptions">SetChannelOptions</a></code> | Ist der Kanal {@link <a href="#setchanneloptions">SetChannelOptions</a>}, der festgelegt werden soll |

**Rückgaben:** <code>Promise<<a href="#channelres">ChannelRes</a>></code>

**Seit:** 4.7.0

--------------------


## unsetChannel(...)

```typescript
unsetChannel(options: UnsetChannelOptions) => Promise<void>
```

Deaktivieren Sie die Kanalüberschreibung für dieses Gerät. Nach dem Aufruf dieser Methode erhält das Gerät automatisch Updates vom **öffentlichen Kanal**, der seinen Bedingungen (Plattform, Gerätetyp, Build-Typ) entspricht.

Dies ist nützlich, wenn:
- Sie möchten ein Gerät zurück zum Standard-Update-Track verschieben
- Sie möchten einen öffentlichen Kanal verwenden (da öffentliche Kanäle nicht über `setChannel()` selbst zugewiesen werden können)

| Param | Geben Sie | ein
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#unsetchanneloptions">UnsetChannelOptions</a></code> |

**Seit:** 4.7.0

--------------------


## getChannel()

```typescript
getChannel() => Promise<GetChannelRes>
```

Holen Sie sich den Kanal für dieses Gerät

**Rückgaben:** <code>Promise<<a href="#getchannelres">GetChannelRes</a>></code>

**Seit:** 4.8.0

--------------------


##listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

Listen Sie alle für dieses Gerät verfügbaren Kanäle auf. Gibt Kanäle zurück, die mit der aktuellen Umgebung des Geräts (Plattform, Emulator/reales Gerät, Entwickler-/Produkt-Build) kompatibel sind und entweder öffentlich sind oder Selbstzuweisung zulassen.

Jeder Kanal im Ergebnis umfasst:
- `public`: Wenn `true`, ist dies ein **Standardkanal**. Sie können es nicht mit `setChannel()` selbst zuweisen. Wenn Sie stattdessen Ihre Kanalzuweisung mit `unsetChannel()` entfernen, erhält das Gerät automatisch Updates von diesem öffentlichen Kanal.
- `allow_self_set`: Wenn `true`, handelt es sich um einen **selbst zuweisbaren Kanal**. Mit `setChannel()` können Sie das Gerät explizit diesem Kanal zuordnen.

**Rückgaben:** <code>Promise<<a href="#listchannelsresult">ListChannelsResult</a>></code>

**Seit:** 7.5.0

--------------------


## setCustomId(...)

```typescript
setCustomId(options: SetCustomIdOptions) => Promise<void>
```Legen Sie eine benutzerdefinierte ID für dieses Gerät fest

| Param | Geben Sie | ein Beschreibung |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setcustomidoptions">SetCustomIdOptions</a></code> | ist die {@link <a href="#setcustomidoptions">SetCustomIdOptions</a>} customId, die festgelegt werden soll |

**Seit:** 4.9.0

--------------------


## getBuiltinVersion()

```typescript
getBuiltinVersion() => Promise<BuiltinVersion>
```

Rufen Sie die native App-Version oder die integrierte Version ab, sofern in der Konfiguration festgelegt

**Rückgaben:** <code>Promise<<a href="#builtinversion">BuiltinVersion</a>></code>

**Seit:** 5.2.0

--------------------


## getDeviceId()

```typescript
getDeviceId() => Promise<DeviceId>
```

Erhalten Sie eine eindeutige ID, die zur Identifizierung des Geräts verwendet wird (an den Auto-Update-Server gesendet).

**Rückgaben:** <code>Promise<<a href="#deviceid">DeviceId</a>></code>

--------------------


## getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersion>
```

Holen Sie sich die native Capacitor Updater-Plugin-Version (an den Auto-Update-Server gesendet).

**Rückgaben:** <code>Promise<<a href="#pluginversion">PluginVersion</a>></code>

--------------------


## isAutoUpdateEnabled()

```typescript
isAutoUpdateEnabled() => Promise<AutoUpdateEnabled>
```

Rufen Sie den Status der Konfiguration für die automatische Aktualisierung ab.

**Rückgaben:** <code>Promise<<a href="#autoupdateenabled">AutoUpdateEnabled</a>></code>

--------------------


## removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Entfernen Sie alle Listener für dieses Plugin.

**Seit:** 1.0.0

--------------------


## addListener('download', ...)

```typescript
addListener(eventName: 'download', listenerFunc: (state: DownloadEvent) => void) => Promise<PluginListenerHandle>
```

Achten Sie auf das Bundle-Download-Ereignis in der App. Wird ausgelöst, sobald ein Download gestartet wurde, während des Downloads und wenn er beendet ist.
Dadurch erhalten Sie während des Downloads alle Download-Prozentsätze zurück

| Param | Geben Sie | ein
| ------------------- | ------------------------------------------------------------ |
| **`eventName`** | <code>'download'</code> |
| **`listenerFunc`** | <code>(Status: <a href="#downloadevent">DownloadEvent</a>) => void</code> |

**Rückgaben:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Seit:** 2.0.11

--------------------


## addListener('noNeedUpdate', ...)

```typescript
addListener(eventName: 'noNeedUpdate', listenerFunc: (state: NoNeedEvent) => void) => Promise<PluginListenerHandle>
```

Achten Sie darauf, dass kein Aktualisierungsereignis erforderlich ist. Dies ist nützlich, wenn Sie bei jedem Start der App eine erzwungene Prüfung durchführen möchten

| Param | Geben Sie | ein
| ------------------- | ----------------------------------------------------------------------- |
| **`eventName`** | <code>'noNeedUpdate'</code> |
| **`listenerFunc`** | <code>(state: <a href="#noneedevent">NoNeedEvent</a>) => void</code> |**Rückgaben:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Seit:** 4.0.0

--------------------


## addListener('updateAvailable', ...)

```typescript
addListener(eventName: 'updateAvailable', listenerFunc: (state: UpdateAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Warten Sie auf verfügbare Update-Ereignisse. Dies ist nützlich, wenn Sie bei jedem Start der App eine Überprüfung erzwingen möchten

| Param | Geben Sie | ein
| ------------------- | ------------------------------------------------------------- |
| **`eventName`** | <code>'updateAvailable'</code> |
| **`listenerFunc`** | <code>(Status: <a href="#updateavailableevent">UpdateAvailableEvent</a>) => void</code> |

**Rückgaben:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Seit:** 4.0.0

--------------------


## addListener('downloadComplete', ...)

```typescript
addListener(eventName: 'downloadComplete', listenerFunc: (state: DownloadCompleteEvent) => void) => Promise<PluginListenerHandle>
```

Hören Sie sich den Download anKomplette Veranstaltungen.

| Param | Geben Sie | ein
| ------------------- | ---------------------------------------------------------------------------- |
| **`eventName`** | <code>'downloadComplete'</code> |
| **`listenerFunc`** | <code>(Status: <a href="#downloadcompleteevent">DownloadCompleteEvent</a>) => void</code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Seit:** 4.0.0

--------------------


## addListener('majorAvailable', ...)

```typescript
addListener(eventName: 'majorAvailable', listenerFunc: (state: MajorAvailableEvent) => void) => Promise<PluginListenerHandle>
```

Warten Sie auf ein größeres Update-Ereignis in der App und informieren Sie Sie, wenn ein größeres Update blockiert wird, indem Sie „disableAutoUpdateBreaking“ festlegen

| Param | Geben Sie | ein
| ------------------- | ------------------------------------------------------------ |
| **`eventName`** | <code>'majorAvailable'</code> |
| **`listenerFunc`** | <code>(Status: <a href="#majoravailableevent">MajorAvailableEvent</a>) => void</code> |

**Rückgaben:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Seit:** 2.3.0

--------------------


## addListener('updateFailed', ...)

```typescript
addListener(eventName: 'updateFailed', listenerFunc: (state: UpdateFailedEvent) => void) => Promise<PluginListenerHandle>
```

Achten Sie auf das Ereignis „Update-Fehler“ in der App und informieren Sie Sie, wenn die Installation des Updates beim nächsten App-Start fehlgeschlagen ist

| Param | Geben Sie | ein
| ------------------- | ----------------------------------------------------------------------------------- |
| **`eventName`** | <code>'updateFailed'</code> |
| **`listenerFunc`** | <code>(state: <a href="#updatefailedevent">UpdateFailedEvent</a>) => void</code> |**Rückgaben:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Seit:** 2.3.0

--------------------


## addListener('downloadFailed', ...)

```typescript
addListener(eventName: 'downloadFailed', listenerFunc: (state: DownloadFailedEvent) => void) => Promise<PluginListenerHandle>
```

Achten Sie auf das Ereignis „Download-Fehler“ in der App und informieren Sie Sie, wenn ein Bundle-Download fehlgeschlagen ist

| Param | Geben Sie | ein
| ------------------- | ------------------------------------------------------------ |
| **`eventName`** | <code>'downloadFailed'</code> |
| **`listenerFunc`** | <code>(Status: <a href="#downloadfailedevent">DownloadFailedEvent</a>) => void</code> |

**Rückgaben:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Seit:** 4.0.0

--------------------


## addListener('appReloaded', ...)

```typescript
addListener(eventName: 'appReloaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Achten Sie auf ein Neuladeereignis in der App und informieren Sie Sie, wenn ein Neuladen stattgefunden hat

| Param | Geben Sie | ein
| ------------------- | -------------------------- |
| **`eventName`** | <code>'appReloaded'</code> |
| **`listenerFunc`** | <code>() => void</code> |

**Rückgaben:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Seit:** 4.3.0

--------------------


## addListener('appReady', ...)

```typescript
addListener(eventName: 'appReady', listenerFunc: (state: AppReadyEvent) => void) => Promise<PluginListenerHandle>
```

Achten Sie auf das App-Ready-Ereignis in der App und informieren Sie Sie, wenn die App einsatzbereit ist

| Param | Geben Sie | ein
| ------------------- | ------------------------------------------------------------ |
| **`eventName`** | <code>'appReady'</code> |
| **`listenerFunc`** | <code>(Status: <a href="#appreadyevent">AppReadyEvent</a>) => void</code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>></code>

**Seit:** 5.1.0

--------------------


## isAutoUpdateAvailable()

```typescript
isAutoUpdateAvailable() => Promise<AutoUpdateAvailable>
```

Rufen Sie ab, ob die automatische Aktualisierung verfügbar ist (nicht durch serverUrl deaktiviert).

**Rückgaben:** <code>Promise<<a href="#autoupdateavailable">AutoUpdateAvailable</a>></code>

--------------------


## getNextBundle()

```typescript
getNextBundle() => Promise<BundleInfo | null>
```

Holen Sie sich das nächste Bundle, das beim Neuladen der App verwendet wird.
Gibt null zurück, wenn kein nächstes Bundle festgelegt ist.

**Rückgaben:** <code>Promise<<a href="#bundleinfo">BundleInfo</a> | null></code>

**Seit:** 6.8.0

--------------------


## setShakeMenu(...)

```typescript
setShakeMenu(options: SetShakeMenuOptions) => Promise<void>
```

Aktivieren oder deaktivieren Sie das Shake-Menü für Debugging-/Testzwecke| Param | Geben Sie | ein Beschreibung |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| **`options`** | <code><a href="#setshakemenuoptions">SetShakeMenuOptions</a></code> | Enthält einen aktivierten booleschen Wert zum Aktivieren oder Deaktivieren des Shake-Menüs |

**Seit:** 7.5.0

--------------------


## isShakeMenuEnabled()

```typescript
isShakeMenuEnabled() => Promise<ShakeMenuEnabled>
```

Rufen Sie den aktuellen Status des Shake-Menüs ab

**Rückgaben:** <code>Promise<<a href="#shakemenuenabled">ShakeMenuEnabled</a>></code>

**Seit:** 7.5.0

--------------------


## Schnittstellen


### AppReadyResult

| Stütze | Geben Sie | ein
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |


### BundleInfo

| Stütze | Geben Sie | ein
| ---------------- | ----------------------------------------------------- |
| **`id`** | <code>string</code> |
| **`version`** | <code>string</code> |
| **`downloaded`** | <code>string</code> |
| **`checksum`** | <code>string</code> |
| **`status`** | <code><a href="#bundlestatus">BundleStatus</a></code> |


### UpdateUrl

| Stütze | Geben Sie | ein
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### StatsUrl

| Stütze | Geben Sie | ein
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### Kanal-URL

| Stütze | Geben Sie | ein
| --------- | ------------------- |
| **`url`** | <code>string</code> |


### Download-Optionen

Diese URL und Versionen werden zum Herunterladen des Bundles vom Server verwendet. Wenn Sie ein Backend verwenden, werden alle Informationen von der Methode getLatest bereitgestellt.
Wenn Sie kein Backend verwenden, müssen Sie die URL und die Version des Bundles angeben. Prüfsumme und SessionKey sind erforderlich, wenn Sie das Bundle mit dem Befehl „encrypt“ CLI verschlüsselt haben. Sie sollten diese als Ergebnis des Befehls erhalten.| Stütze | Geben Sie | ein Beschreibung | Standard | Seit |
| ---------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`url`** | <code>string</code> | Die URL der Bundle-ZIP-Datei (z. B. dist.zip), die heruntergeladen werden soll. (Dies kann eine beliebige URL sein. Zum Beispiel: Amazon S3, ein GitHub-Tag, jeder andere Ort, an dem Sie Ihr Paket gehostet haben.) |                        |       |
| **`version`** | <code>string</code> | Der Versionscode/Name dieses Bundles/dieser Version |                        |       |
| **`sessionKey`** | <code>string</code> | Der Sitzungsschlüssel für das Update, wenn das Bundle mit einem Sitzungsschlüssel | verschlüsselt ist <code>undefiniert</code> | 4.0.0 |
| **`checksum`** | <code>string</code> | Die Prüfsumme für das Update sollte in sha256 vorliegen und mit einem privaten Schlüssel verschlüsselt sein, wenn das Bundle verschlüsselt ist | <code>undefiniert</code> | 4.0.0 |
| **`manifest`** | <code>ManifestEntry[]</code> | Das Manifest für Delta (Manifest)-Downloads mehrerer Dateien | <code>undefiniert</code> | 6.1.0 |


### ManifestEntry

| Stütze | Geben Sie | ein
| ------------------- | ------------ |
| **`file_name`** | <code>string \| null</code> |
| **`file_hash`** | <code>string \| null</code> |
| **`download_url`** | <code>string \| null</code> |


### BundleId

| Stütze | Geben Sie | ein
| -------- | ------------------- |
| **`id`** | <code>string</code> |


### BundleListResult

| Stütze | Geben Sie | ein
| ------------- | ------------------------- |
| **`bundles`** | <code>BundleInfo[]</code> |


### Listenoptionen| Stütze | Geben Sie | ein Beschreibung | Standard | Seit |
| --------- | -------------------- | ----------------------------------------------------------------------- | ------------------- | ------ |
| **`raw`** | <code>boolean</code> | Ob die Rohpaketliste oder das Manifest zurückgegeben werden soll. Bei „true“ versucht die Liste, die interne Datenbank statt Dateien auf der Festplatte zu lesen. | <code>false</code> | 6.14.0 |


### Optionen zurücksetzen

| Stütze | Geben Sie | ein
| ---------------------- | -------------------- |
| **`toLastSuccessful`** | <code>boolean</code> |


### CurrentBundleResult

| Stütze | Geben Sie | ein
| ------------ | ------------------------------------------------- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |
| **`native`** | <code>string</code> |


### MultiDelayConditions

| Stütze | Geben Sie | ein
| --------------------- | -------------- |
| **`delayConditions`** | <code>DelayCondition[]</code> |


### Verzögerungsbedingung

| Stütze | Geben Sie | ein Beschreibung |
| ----------- | --------------------------------------------------------- | ---------------------------------------- |
| **`kind`** | <code><a href="#delayuntilnext">DelayUntilNext</a></code> | Richten Sie Verzögerungsbedingungen in setMultiDelay | ein
| **`value`** | <code>string</code> |                                          |


### Neueste Version| Stütze | Geben Sie | ein Beschreibung | Seit |
| ---------------- | ------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Ergebnis der getLatest-Methode | 4.0.0 |
| **`checksum`** | <code>string</code> |                            | 6 |
| **`major`** | <code>boolean</code> |                            |       |
| **`message`** | <code>string</code> |                            |       |
| **`sessionKey`** | <code>string</code> |                            |       |
| **`error`** | <code>string</code> |                            |       |
| **`old`** | <code>string</code> |                            |       |
| **`url`** | <code>string</code> |                            |       |
| **`manifest`** | <code>ManifestEntry[]</code> |                            | 6.1   |


### GetLatestOptions

| Stütze | Geben Sie | ein Beschreibung | Standard | Seit |
| ------------- | ------------------- | ------------------------------------------------------------------ | ---------------------- | ----- |
| **`channel`** | <code>string</code> | Der Kanal muss die neueste Version erhalten, damit dies funktioniert. Der Kanal muss „self_assign“ zulassen <code>undefiniert</code> | 6.8.0 |


### ChannelRes

| Stütze | Geben Sie | ein Beschreibung | Seit |
| ------------- | ------------------- | -------------- | ----- |
| **`status`** | <code>string</code> | Aktueller Status des eingestellten Kanals | 4.7.0 |
| **`error`** | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |


### SetChannelOptions

| Stütze | Geben Sie | ein
| --------- | -------------------- |
| **`channel`** | <code>string</code> |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### UnsetChannelOptions

| Stütze | Geben Sie | ein
| --------- | -------------------- |
| **`triggerAutoUpdate`** | <code>boolean</code> |


### GetChannelRes| Stütze | Geben Sie | ein Beschreibung | Seit |
| -------------- | -------------------- | -------------- | ----- |
| **`channel`** | <code>string</code> | Aktueller Status des Get-Kanals | 4.8.0 |
| **`error`** | <code>string</code> |                               |       |
| **`message`** | <code>string</code> |                               |       |
| **`status`** | <code>string</code> |                               |       |
| **`allowSet`** | <code>boolean</code> |                               |       |


### ListChannelsResult

| Stütze | Geben Sie | ein Beschreibung | Seit |
| -------------- | -------------------------- | -------------------------- | ----- |
| **`channels`** | <code>ChannelInfo[]</code> | Liste der verfügbaren Kanäle | 7.5.0 |


### ChannelInfo

| Stütze | Geben Sie | ein Beschreibung | Seit |
| -------------------- | -------------------- | ----------------------------------------------- | ----- |
| **`id`** | <code>string</code> | Die Kanal-ID | 7.5.0 |
| **`name`** | <code>string</code> | Der Kanalname | 7.5.0 |
| **`public`** | <code>boolean</code> | Wenn „true“, handelt es sich um einen Standard-/Fallback-Kanal. Geräte können sich nicht selbst öffentlichen Kanälen zuweisen. Wenn ein Gerät stattdessen seine Kanalüberschreibung entfernt (mithilfe von `unsetChannel()`), erhält es automatisch Aktualisierungen vom entsprechenden öffentlichen Kanal. | 7.5.0 |
| **`allow_self_set`** | <code>boolean</code> | Wenn „true“, können sich Geräte mithilfe von `setChannel()` explizit selbst diesem Kanal zuweisen. Dies wird normalerweise für Betatests, A/B-Tests oder Opt-in-Update-Tracks verwendet. | 7.5.0 |


### SetCustomIdOptions

| Stütze | Geben Sie | ein
| -------------- | ------------------- |
| **`customId`** | <code>string</code> |


### BuiltinVersion

| Stütze | Geben Sie | ein
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### Geräte-ID

| Stütze | Geben Sie | ein
| -------------- | ------------------- |
| **`deviceId`** | <code>string</code> |


### PluginVersion

| Stütze | Geben Sie | ein
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


### AutoUpdateEnabled

| Stütze | Geben Sie | ein
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### PluginListenerHandle

| Stütze | Geben Sie | ein
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() => Versprechen<void></code> |


### DownloadEvent| Stütze | Geben Sie | ein Beschreibung | Seit |
| ------------- | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`percent`** | <code>Nummer</code> | Aktueller Downloadstatus, zwischen 0 und 100. | 4.0.0 |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> |                                                |       |


### NoNeedEvent

| Stütze | Geben Sie | ein Beschreibung | Seit |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Aktueller Downloadstatus, zwischen 0 und 100. | 4.0.0 |


### UpdateAvailableEvent

| Stütze | Geben Sie | ein Beschreibung | Seit |
| ------------ | ------------------------------------------------- | ---------------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Aktueller Downloadstatus, zwischen 0 und 100. | 4.0.0 |


### DownloadCompleteEvent

| Stütze | Geben Sie | ein Beschreibung | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------ | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Wird ausgegeben, wenn ein neues Update verfügbar ist. | 4.0.0 |


### MajorAvailableEvent

| Stütze | Geben Sie | ein Beschreibung | Seit |
| ------------- | ------------------- | ------------------------------------------ | ----- |
| **`version`** | <code>string</code> | Wird ausgegeben, wenn ein neues Hauptpaket verfügbar ist. | 4.0.0 |


### UpdateFailedEvent

| Stütze | Geben Sie | ein Beschreibung | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Wird ausgegeben, wenn die Installation eines Updates fehlgeschlagen ist. | 4.0.0 |


### DownloadFailedEvent

| Stütze | Geben Sie | ein Beschreibung | Seit |
| ------------- | ------------------- | -------------------------- | ----- |
| **`version`** | <code>string</code> | Wird ausgegeben, wenn ein Download fehlschlägt. | 4.0.0 |


### AppReadyEvent| Stütze | Geben Sie | ein Beschreibung | Seit |
| ------------ | ------------------------------------------------- | ------------------------------------- | ----- |
| **`bundle`** | <code><a href="#bundleinfo">BundleInfo</a></code> | Wird ausgegeben, wenn die App einsatzbereit ist. | 5.2.0 |
| **`status`** | <code>string</code> |                                       |       |


### AutoUpdateVerfügbar

| Stütze | Geben Sie | ein
| --------------- | -------------------- |
| **`available`** | <code>boolean</code> |


### SetShakeMenuOptions

| Stütze | Geben Sie | ein
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


### ShakeMenuEnabled

| Stütze | Geben Sie | ein
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |


## Geben Sie Aliase ein


### BundleStatus

ausstehend: Das Bundle muss noch als nächstes Bundle **SET** werden.
wird heruntergeladen: Das Bundle wird heruntergeladen.
Erfolg: Das Bundle wurde heruntergeladen und kann als nächstes Bundle **SET** werden.
Fehler: Das Bundle konnte nicht heruntergeladen werden.

<code>'success' | 'Fehler' | 'ausstehend' | 'Herunterladen'</code>


### DelayUntilNext

<code>'Hintergrund' | 'töten' | 'nativeVersion' | 'Datum'</code>

</docgen-api>
