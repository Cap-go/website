---
title: Aggiornamento automatico
description: So verwenden Sie die automatische Aktualisierung mit Capacitor-Updater
sidebar:
  order: 2
locale: de
---

Dieser Modus ermöglicht Entwicklern die Verwendung von capacitor-updater im Auto-Update-Modus und das Pushen von Updates über Capgo-Kanäle oder Äquivalente

### Voraussetzungen

Stellen Sie sicher, dass Ihre App-Version [https://semverorg/](https://semverorg/) verwendet, bevor Sie Capgo Auto-Update nutzen

Dies ist die Konvention zur Verwaltung von Versionen in Capgo

Es gibt zwei Möglichkeiten, die Version in Ihrer App festzulegen:

Neue Methode: Verwenden Sie das `version`-Feld in Ihrer `capacitorconfigjson`-Datei

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // Auto-Update aktivieren, standardmäßig true
      "appId": "comexampleapp", // Zur Identifizierung der App auf dem Server
      "version": "100" // Zur Überprüfung auf Updates
    }
  }
}
```
Diese Optionen werden vom Plugin zur Überprüfung auf Updates und von der CLI zum Hochladen der Version verwendet

Alte Methode:
In 3 Dateien in Ihrem Projekt:

* `packagejson` in **version**
* `android/app/buildgradle` in **versionName**
* `ios/App/Appxcodeproj/projectpbxproj` in **CURRENT\_PROJECT\_VERSION**

### Tutorials

Richten Sie Ihre App in 5 Minuten ein

[Aktualisieren Sie Ihre Capacitor-Apps nahtlos mit Capacitor Updater](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

Richten Sie Ihre CI in 5 Minuten ein

[Automatischer Build und Release mit GitHub Actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

### Installation

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### Einführung

Klicken Sie auf [registrieren](https://capgoapp), um Ihr Konto zu erstellen

Der Server ermöglicht die Verwaltung von Kanälen, Versionen und vielem mehr

`autoUpdate` verwendet Daten aus `capacitorconfig` zur Identifizierung des Capgo-Servers

:::note
Sie können Capgo Cloud weiterhin nutzen, ohne Ihren Code an unseren Server zu senden, falls dies von Ihrem Unternehmen nicht erlaubt ist
:::

#### Version validieren

Wenn Auto-Update eingerichtet ist, müssen Sie von innerhalb JS mitteilen, dass Ihre App aktiv und bereit ist

Dies kann durch Aufruf von `notifyAppReady` in Ihrer App erfolgen

Tun Sie dies so früh wie möglich

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdaternotifyAppReady()
```

#### Benutzerablauf
* Benutzer öffnet die App, die App fragt beim Server nach Updates, wenn welche gefunden werden, werden sie im Hintergrund heruntergeladen
* Benutzer verlässt die App, die neue Version wird als aktiv gesetzt
* Benutzer öffnet die App erneut, die neue aktive Version wird geladen und als Standard gesetzt
* Wenn `notifyAppReady()` aufgerufen wird, wird beim Verlassen der App die vorherige Version gelöscht
* Benutzer setzt den normalen App-Ablauf fort bis zum nächsten Update-Zyklus

:::danger
⚠️ Wenn Sie `notifyAppReady()` nicht in Ihrer App aufrufen, wird die aktuelle Version als ungültig markiert und auf das vorherige gültige Bundle oder die Standardversion zurückgesetzt
:::

#### Entwicklungsablauf

Wenn Sie neue Funktionen entwickeln, stellen Sie sicher, dass Sie `autoUpdate` blockieren, da Capgo sonst ständig Ihre Arbeit mit dem neuesten Update-Bundle überschreibt
Setzen Sie `autoUpdate` in Ihrer Konfiguration auf false 
Falls Sie aus irgendeinem Grund bei einem Update festsitzen, können Sie die App löschen und neu installieren
Stellen Sie sicher, dass Sie `autoUpdate` in Ihrer Konfiguration auf false setzen, bevor Sie dies tun
Und bauen Sie sie dann erneut mit Xcode oder Android Studio

Um die Version bei jedem Commit hochzuladen, richten Sie CI/CD mit dieser Anleitung ein

[Automatischer Build und Release mit GitHub Actions](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

#### Major Available Event

Wenn `disableAutoUpdateBreaking` auf true gesetzt ist, können Sie auf das Event hören, um zu erfahren, wann die App sich weigert, ein größeres Breaking-Update durchzuführen

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdateraddListener('majorAvailable', (info: any) => {
  consolelog('majorAvailable wurde ausgelöst', infoversion)
})
```