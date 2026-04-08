---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Aktualisieren Sie Ihre Capacitor-Apps nahtlos mit Capacitor-updater
description: >-
  Grüße an die Capacitor Ionic Community, heute werde ich Ihnen helfen,
  Capacitor-updater in Ihrer App einzurichten. Damit Sie reibungslose
  Veröffentlichungen durchführen können.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /update_flow.webp
head_image_alt: Capacitor-Entwicklung sucht nach Alternativen
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: de
next_blog: ''
---
## Was ist Capacitor-updater?

Capacitor-updater, eine Technologie, die bei der sofortigen Bereitstellung von App-Updates und Verbesserungen an Endbenutzer hilft.

Dies ist besonders großartig, wenn Sie kritische Fehlerbehebungen durchführen und diese sofort ohne App Store-Überprüfungen bereitstellen möchten.

Sie können es sich als "web-ähnliche" Agilität vorstellen, bei der Updates sofort nach Verfügbarkeit seitlich geladen werden.

Darüber hinaus bietet es Rollbacks, falls das neue Update die App zum Absturz bringt.

## Wie funktioniert es?

Capgo hält das JavaScript-Bundle Ihrer App mit dem Capgo-Server synchronisiert, und jedes Mal, wenn der Benutzer die App öffnet, überprüft sie beim Capgo-Server, ob ein neues Update für das Bundle verfügbar ist. Und natürlich kommt es mit vielen großartigen Konfigurationen, die Ihnen helfen können, das Benutzererlebnis fein abzustimmen.

Ich verwende Capgo in allen meinen Projekten, die ich entwickle. Das ermöglicht es mir, weniger Zeit im App Store-Überprüfungsprozess zu verbringen.

Sie können mehr darüber [hier](https://capgo.app/) lesen.

## Gibt es Einschränkungen?

So gut es auch klingen mag, gibt es einige Dinge, die wir beachten müssen.
Das Erste ist, dass OTA-Updates __nur mit Web-Bundles funktionieren__.
Sie denken vielleicht, dass dies keine große Einschränkung ist, da wir in Capacitor JS fast den gesamten Code in JS, CSS und HTML schreiben.
Während das stimmen mag, gibt es dennoch native Module, die wir in unsere App installieren.
Wenn ein Modul Ihre Android- oder iOS-Verzeichnisse ändert, können Sie OTA nicht verwenden, um Ihre App zu aktualisieren.
Das liegt daran, dass der Inhalt dieser Verzeichnisse verwendet wird, um native Binärdateien zu kompilieren, die OTA nicht aktualisieren kann.
Selbst native Apps können diesen Teil nicht aktualisieren.

Aber Sie können Ihre CI/CD einrichten, um diesen Teil zu handhaben. Ich habe ein Tutorial erstellt, wie man das macht [hier für iOS](https://capgo.app/blog/automatic-capacitor-android-build-github-action/).

## Automatische Capgo-Konfiguration

Es ist Zeit, sich anzumelden und Ihren API-Schlüssel zu erhalten, um Ihre erste Version hochzuladen! Beginnen Sie mit der [Registrierung für ein Capgo-Konto](/register/).

Sobald Sie bei Capgo eingeloggt sind, sehen Sie eine Onboarding-Seite

![Onboarding-Seite](/onboarding_1_new.webp)

Folgen Sie den Schritten auf der Onboarding-Seite, um Ihre erste App hinzuzufügen.

### Folgen Sie der CLI-Anleitung

Führen Sie von einer Kommandozeile direkt im Root-Verzeichnis Ihrer Capacitor-App aus:

`npx @capgo/cli@latest init`
Um Capgo in Ihre Capacitor-App zu installieren, wird Sie die CLI durch den Einrichtungsprozess führen.

Wenn Sie es manuell machen möchten, können Sie den nachfolgenden Schritten folgen.

## Manuelle Capgo-Konfiguration

### Plugin installieren

Sie sollten am Ende diesen Code zu Ihrer App hinzugefügt haben:

`npm i @capgo/capacitor-updater && npx cap sync`
Um das Plugin in Ihre Capacitor-App zu installieren.

Fügen Sie dann diesen Code zu Ihrer App hinzu, um dem nativen Plugin mitzuteilen, dass das JS-Bundle funktionsfähig ist (wenn Sie dies nicht tun, wird das native Plugin zur vorherigen Version zurückkehren):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Dies teilt dem nativen Plugin mit, dass die Installation erfolgreich war.

Führen Sie dann ein `npm run build && npx cap copy` aus, um Ihre App zu aktualisieren.

### Bei Capgo CLOUD anmelden

Verwenden Sie zunächst den `all` [apikey](https://console.capgo.app/dashboard/apikeys/), der in Ihrem Konto vorhanden ist, um sich mit der CLI anzumelden:

`npx @capgo/cli@latest login YOU_KEY`

### Ihre erste App hinzufügen

Lassen Sie uns damit beginnen, eine App in Capgo Cloud mit der CLI zu erstellen.

`npx @capgo/cli@latest app add`

Dieser Befehl verwendet alle im Capacitor-Konfigurationsdatei definierten Variablen, um die App zu erstellen.

### Ihre erste Version hochladen

Führen Sie den Befehl aus, um Ihren Code zu erstellen und an Capgo zu senden:
`npx @capgo/cli@latest bundle upload`

Standardmäßig wird der Versionsname derjenige aus Ihrer `package.json`-Datei sein.

Überprüfen Sie in [Capgo](https://console.capgo.app/), ob der Build vorhanden ist.

Sie können es sogar mit meiner [mobilen Sandbox-App](https://capgo.app/app_mobile/) testen.

### Kanal als Standard festlegen

Nachdem Sie Ihre App an Capgo gesendet haben, müssen Sie Ihren Kanal `default` machen, damit Apps Updates von Capgo empfangen können.

`npx @capgo/cli@latest channel set production -s default`

## Ein Live-Update auf einem Gerät empfangen

Damit Ihre Anwendung ein Live-Update von Deploy empfangen kann, müssen Sie die App auf einem Gerät oder einem Emulator ausführen. Der einfachste Weg dafür ist, den folgenden Befehl zu verwenden, um Ihre lokale App in einem Emulator oder einem mit Ihrem Computer verbundenen Gerät zu starten.

    npx cap run [ios | android]

Öffnen Sie die App, setzen Sie sie in den Hintergrund und öffnen Sie sie erneut, Sie sollten in den Logs sehen, dass die App das Update durchgeführt hat.

Glückwunsch! 🎉 Sie haben erfolgreich Ihr erstes Live-Update bereitgestellt. Dies ist nur der Anfang dessen, was Sie mit Live-Updates machen können. Um mehr zu erfahren, sehen Sie sich die vollständigen [Live-Updates-Docs](/docs/plugin/cloud-mode/getting-started/) an.

> Wenn Sie lokal keine Updates mehr empfangen möchten, führen Sie diesen Befehl aus
`npx @capgo/cli@latest channel set`
