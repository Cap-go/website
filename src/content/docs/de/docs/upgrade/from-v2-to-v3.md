---
title: Von V2 zu V3
description: Wie man von V2 auf V3 aktualisiert
sidebar:
  order: 4
locale: de
---

Diese Dokumentation erklärt, wie man auf die Version 3 des Auto-Updates umsteigt.

## Zuerst auf das letzte Tool migrieren:

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## Entfernen Sie alle Ihre vorherigen Konfigurationen:

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https",
      
  },
}
```

um nur dies zu lassen:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ Wenn Sie Ihren Server mit `autoUpdateURL` verwendet haben, werde ich diesen Leitfaden bald für Sie aktualisieren. In der Zwischenzeit werfen Sie einen Blick auf die neue Upload-Option `external`, die es Ihnen ermöglicht, nur den Link zu Ihrem Zip zu senden, nicht den Code in der Capgo-Cloud. Dies wurde für Unternehmen mit strengen Datenschutzrichtlinien erstellt. Im externen Modus wird der Code niemals auf dem Capgo-Server gespeichert; wir speichern nur die URL und senden sie an das Gerät, das sie direkt herunterladen wird. Auf die Standardweise wird der Code zip-compressed und auf unserem Server gespeichert, aber wir werden ihn niemals öffnen oder verwenden.

## Was ändert sich

Alle Konfigurationen erfolgen serverseitig für das Auto-Update, um Ihnen mehr Kontrolle darüber zu geben, wie Sie ein Update an Benutzer senden.

Das ermöglicht uns, zurückzusetzen, sogar nur an einen Benutzer mit Kanälen zu deployen! Diese Einstellungen werden wieder zur Web-Oberfläche hinzugefügt:

* Rückgängigmachen unter native deaktivieren
* Update über major deaktivieren

> ⚠️ Diese werden standardmäßig für alle Kanäle wahr.

Dies wird auch die Notwendigkeit beseitigen, das Plugin häufig zu aktualisieren; die meisten Updates werden serverseitig durchgeführt, und Sie erhalten es ohne Änderungen auf Ihrer Seite.

> ⚠️ Zurücksetzen, wenn ein Update zum Standard wird. Wenn Sie also nicht alle Download-Versionen beim Aktualisieren aus dem Store entfernen möchten, tun Sie dies:

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## Aktualisieren Sie Ihren Code

Schließlich aktualisieren Sie alle Ihre Importe in JS von:

```
import { CapacitorUpdater } from 'capacitor-updater'
```

zu

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

Bauen Sie dann Ihren Code erneut `npm run build` und kopieren Sie die Assets erneut `npx cap copy`.

Sie sollten jetzt in der Lage sein, das letzte Auto-Update-System zu testen.

Senden Sie Ihre Version mit:

```
npx @capgo/cli@latest upload
```

anstatt von

```
npx capgo upload
```

## Zukünftige Entwicklung

Momentan wird nur der erste öffentliche Kanal genutzt; in Zukunft wird Öffentlich auf mehrere öffentliche Kanäle wechseln, wenn mehr als einer festgelegt ist.

## Häufige Probleme:

* Build-Problem nach dem Upgrade: Wenn Sie den Quellcode des Plugins bereits in Android Studio oder Xcode geöffnet haben, entfernt die Synchronisation manchmal nicht, die Ursache des Problems. Öffnen Sie die native IDE und entfernen Sie `capacitor-updater` manuell und führen Sie `npx cap sync` aus, das sollte das Problem lösen.