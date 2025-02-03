---
title: Von V2 auf V3
description: Upgrade von V2 auf V3
sidebar:
  order: 4
locale: de
---

Diese Dokumentation erklärt, wie man auf Version 3 von auto-update aktualisiert

## Zuerst auf die neuesten Tools aktualisieren:

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## Entfernen Sie alle vorherigen Konfigurationen:

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https",
      
  },
}
```

und lassen Sie nur dies:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ Wenn Sie Ihren eigenen Server mit `autoUpdateURL` verwendet haben, werde ich diese Anleitung bald für Sie aktualisieren. Schauen Sie sich in der Zwischenzeit die neue Upload-Option `external` an, mit der Sie nur den Link Ihrer ZIP-Datei senden können, nicht den Code in der Capgo Cloud. Dies wurde für Unternehmen mit strengen Datenschutzrichtlinien entwickelt. Im externen Modus wird der Code nie auf dem Capgo-Server landen, wir speichern nur die URL und senden sie an das Gerät, das sie dann direkt herunterlädt. Auf die standardmäßige Art wird der Code gezippt und auf unserem Server gespeichert, aber wir werden ihn niemals öffnen oder anderweitig verwenden.

## Was sich ändert

Alle Konfigurationen werden serverseitig für auto-update, um Ihnen mehr Kontrolle darüber zu geben, wie Sie ein Update an Benutzer senden

Dies ermöglicht uns das Zurücksetzen und sogar das Bereitstellen nur für einen Benutzer mit Kanälen! Diese Einstellungen werden in der Weboberfläche hinzugefügt:

* Deaktivieren der Zurücksetzung unter Native
* Deaktivieren von Updates über Major-Versionen

> ⚠️ Diese werden standardmäßig für alle Kanäle aktiviert

Dies wird auch die Notwendigkeit häufiger Plugin-Updates reduzieren, die meisten Updates werden serverseitig durchgeführt und Sie erhalten sie ohne Änderungen auf Ihrer Seite

> ⚠️ Zurücksetzen wenn ein Update zum Standard wird, wenn Sie also bevorzugen, nicht alle heruntergeladenen Versionen beim Update aus dem Store zu entfernen, tun Sie dies:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## Aktualisieren Sie Ihren Code

Zuletzt aktualisieren Sie alle Ihre Imports in JS von:

```
import { CapacitorUpdater } from 'capacitor-updater'
```

zu

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

Dann bauen Sie Ihren Code erneut `npm run build` und kopieren Sie die Assets noch einmal `npx cap copy`

Sie sollten jetzt in der Lage sein, das neueste auto-update System zu testen

Senden Sie Ihre Version mit:

```
npx @capgo/cli@latest upload
```

anstelle von

```
npx capgo upload
```

## Zukünftige Entwicklung

Derzeit wird nur der erste öffentliche Kanal verwendet, in Zukunft wird sich public für mehrere öffentliche Kanäle ändern, wenn mehr als einer eingestellt ist

## Häufige Probleme:

* Build-Problem nach Upgrade: Wenn Sie den Quellcode des Plugins bereits in Android Studio oder Xcode geöffnet haben, entfernt die Synchronisierung sie manchmal nicht, das ist die Ursache des Problems. Öffnen Sie die native IDE und entfernen Sie `capacitor-updater` manuell und führen Sie `npx cap sync` aus, das sollte das Problem lösen