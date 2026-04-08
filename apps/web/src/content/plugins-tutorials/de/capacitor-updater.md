---
locale: de
---

capgo/capacitor-updater Paket Tutorial

Dieses Tutorial führt Sie durch den Prozess der Verwendung des `@capgo/capacitor-updater`-Pakets, um automatische Updates in Ihrer Ionic Capacitor-App zu aktivieren.

## Voraussetzungen

Bevor wir beginnen, stellen Sie sicher, dass Sie Folgendes installiert haben:

- Nodejs
- npm

## Installation

Um das `@capgo/capacitor-updater`-Paket zu installieren, öffnen Sie Ihr Terminal oder die Eingabeaufforderung und führen Sie den folgenden Befehl aus:

```
npm install @capgo/capacitor-updater
```

Dies wird das Paket in Ihrem Projekt herunterladen und installieren.

### Plugin installieren

Sie sollten am Ende diesen Code zu Ihrer App hinzufügen:

`npm i @capgo/capacitor-updater && npx cap sync`
Um das Plugin in Ihre Capacitor-App zu installieren.

Fügen Sie Ihrer App dann diesen Code hinzu, um das native Plugin zu benachrichtigen, dass das JS-Bundle gesund ist. Das native Plugin wird auf die vorherige Version zurücksetzen, wenn Sie dies nicht tun:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Dies wird dem nativen Plugin mitteilen, dass die Installation erfolgreich war.

Führen Sie dann `npm run build && npx cap copy` aus, um Ihre App zu aktualisieren.

### Bei Capgo CLOUD anmelden

Zuerst verwenden Sie den `all` [apikey](https://console.capgo.app/dashboard/apikeys/), der in Ihrem Konto vorhanden ist, um sich mit der CLI anzumelden:

`npx @capgo/cli@latest login IHR_SCHLÜSSEL`

### Ihre erste App hinzufügen

Lassen Sie uns zunächst eine App in Capgo Cloud mit der CLI erstellen.

`npx @capgo/cli@latest app add`

Dieser Befehl verwendet alle Variablen, die in der Capacitor-Konfigurationsdatei definiert sind, um die App zu erstellen.

### Ihre erste Version hochladen

Führen Sie den Befehl aus, um Ihren Code zu bauen und ihn an Capgo zu senden:

`npx @capgo/cli@latest bundle upload`

Standardmäßig wird der Versionsname der in Ihrer `packagejson`-Datei angegeben.

Überprüfen Sie in [Capgo](https://console.capgo.app/), ob der Build vorhanden ist.

Sie können es sogar mit meiner [mobilen Sandbox-App](https://capgo.app/app_mobile/) testen!

### Kanal als Standard festlegen

Nachdem Sie Ihre App an Capgo gesendet haben, müssen Sie Ihren Kanal auf `default` setzen, damit Apps Updates von Capgo erhalten können.

`npx @capgo/cli@latest channel set production -s default`

## Live-Update auf einem Gerät empfangen

Damit Ihre Anwendung ein Live-Update von Deploy erhält, müssen Sie die App auf einem Gerät oder einem Emulator ausführen. Der einfachste Weg, dies zu tun, ist einfach, den folgenden Befehl zu verwenden, um Ihre lokale App in einem Emulator oder auf einem mit Ihrem Computer verbundenen Gerät zu starten:

    npx cap run [ios | android]

Öffnen Sie die App, bringen Sie sie in den Hintergrund und öffnen Sie sie erneut; Sie sollten in den Protokollen sehen, dass die App das Update durchgeführt hat.

Herzlichen Glückwunsch! 🎉 Sie haben erfolgreich Ihr erstes Live-Update bereitgestellt. Dies ist nur der Anfang dessen, was Sie mit Live-Updates tun können. Um mehr zu erfahren, sehen Sie sich die vollständige [Live Updates-Dokumentation](/docs/plugin/cloud-mode/getting-started/) an.

> Wenn Sie das lokale Update empfangen stoppen möchten, führen Sie diesen Befehl aus:
`npx @capgo/cli@latest channel set`

## Fazit

Herzlichen Glückwunsch! Sie haben erfolgreich gelernt, wie Sie das `@capgo/capacitor-updater`-Paket verwenden, um automatische Updates in Ihrer Ionic Capacitor-App zu aktivieren. Egal, ob Sie sich für das automatische Update oder die manuelle Einrichtung entscheiden, Sie haben jetzt die Werkzeuge, um Ihre App problemlos auf dem neuesten Stand zu halten.
