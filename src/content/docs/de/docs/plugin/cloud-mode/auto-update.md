---
title: Automatische Aktualisierung
description: Wie man die automatische Aktualisierung mit capacitor-updater verwendet
sidebar:
  order: 2
locale: de
---

Dieser Modus ermöglicht es Entwicklern, capacitor-updater im automatischen Update-Modus zu verwenden und Updates über Capgo-Kanäle oder Äquivalente zu pushen.

### Voraussetzungen

Stellen Sie sicher, dass Ihre App-Version [https://semverorg/](https://semverorg/) verwendet, bevor Sie Capgo-Auto-Update aktivieren.

Dies ist die Konvention, die verwendet wird, um Versionen in Capgo zu verwalten.

Es gibt zwei Möglichkeiten, die Version in Ihrer App festzulegen:

Neue Methode: Verwenden Sie das Feld `version` in Ihrer `capacitorconfigjson`-Datei

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // Automatische Aktualisierung aktivieren, standardmäßig true
      "appId": "comexampleapp", // Wird verwendet, um die App auf dem Server zu identifizieren
      "version": "100" // Wird verwendet, um nach Updates zu suchen
    }
  }
}
```
Diese Optionen werden vom Plugin verwendet, um nach Updates zu suchen, und von der CLI, um die Version hochzuladen.

Alte Methode:
In 3 Dateien in Ihrem Projekt:

* `packagejson` in **version**
* `android/app/buildgradle` in **versionName**
* `ios/App/Appxcodeproj/projectpbxproj` in **CURRENT\_PROJECT\_VERSION**

### Tutorials

Richten Sie Ihre App in 5 Minuten ein

[Aktualisieren Sie Ihre Capacitor-Apps nahtlos mit dem Capacitor-Updater](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

Richten Sie Ihre CI in 5 Minuten ein

[Automatischer Build und Release mit GitHub-Aktionen](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

### Installieren

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### Einführung

Klicken Sie auf [registrieren](https://capgoapp), um Ihr Konto zu erstellen.

Der Server ermöglicht es Ihnen, Kanäle und Versionen und vieles mehr zu verwalten.

`autoUpdate` verwendet Daten aus `capacitorconfig`, um den Capgo-Server zu identifizieren.

:::note
Sie können Capgo Cloud weiterhin nutzen, ohne Ihren Code an unseren Server zu senden, wenn dies von Ihrem Unternehmen nicht erlaubt ist.
:::

#### Version validieren

Wenn die automatische Aktualisierung eingerichtet ist, müssen Sie von JavaScript aus benachrichtigen, dass Ihre App aktiv und bereit ist.

Dies kann durch einen Aufruf innerhalb Ihrer App `notifyAppReady` erfolgen.

Tun Sie dies so schnell wie möglich.

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdaternotifyAppReady()
```

#### Benutzerfluss
* Der Benutzer öffnet die App, die App ruft den Server auf, um nach Updates zu suchen. Wenn Updates gefunden werden, werden sie im Hintergrund heruntergeladen.
* Der Benutzer verlässt die App, die neue Version wird als aktiv festgelegt.
* Der Benutzer öffnet die App erneut, wir laden die neue aktive Version und setzen sie als Standard.
* Wenn `notifyAppReady()` aufgerufen wird, wird die vorherige Version gelöscht, wenn der Benutzer die App verlässt.
* Der Benutzer setzt den normalen Fluss der App bis zum nächsten Aktualisierungszyklus fort.

:::danger
⚠️ Wenn `notifyAppReady()` in Ihrer App nicht aufgerufen wird, wird die aktuelle Version als ungültig markiert und kehrt zum vorherigen gültigen Bundle oder Stock zurück.
:::

#### Entwicklerfluss

Wenn Sie neue Funktionen entwickeln, sollten Sie `autoUpdate` blockieren, da Capgo ständig Ihre Arbeit mit dem neuesten Update-Bundle überschreibt.
Setzen Sie `autoUpdate` in Ihrer Konfiguration auf false.
Wenn Sie aus irgendeinem Grund bei einem Update feststecken, können Sie die App deinstallieren und erneut installieren.
Stellen Sie sicher, dass Sie `autoUpdate` in Ihrer Konfiguration auf false setzen, bevor Sie dies tun.
Und dann bauen Sie es erneut mit Xcode oder Android Studio.

Um die Version bei jedem Commit hochzuladen, richten Sie CI/CD mit diesem Leitfaden ein.

[Automatischer Build und Release mit GitHub-Aktionen](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

#### Hauptverfügbare Ereignisse

Wenn `disableAutoUpdateBreaking` auf true gesetzt ist, können Sie das Ereignis abhören, um zu erfahren, wann die App sich weigert, ein großes Brechupdate durchzuführen.

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdateraddListener('majorAvailable', (info: any) => {
  consolelog('majorAvailable wurde ausgelöst', infoversion)
})
```