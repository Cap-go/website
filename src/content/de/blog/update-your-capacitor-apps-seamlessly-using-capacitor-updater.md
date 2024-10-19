---
slug: update-your-capacitor-apps-seamlessly-using-capacitor-updater
title: Aktualisieren Sie Ihre Capacitor-Apps nahtlos mit Capacitor-updater
description: >-
  Grüße an die Capacitor Ionic Community, heute werde ich Ihnen helfen,
  Capacitor-updater in Ihre App einzurichten. So können Sie nahtlose
  Veröffentlichungen durchführen.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-02-27T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /update_flow.webp
head_image_alt: Capacitor-Entwickler sucht nach Alternative
tag: Tutorial
published: true
locale: de
next_blog: ''
---

Hier ist die Übersetzung des Textes ins Deutsche:

## Was ist Capacitor-updater?

Capacitor-updater, eine Technologie, die bei der sofortigen Bereitstellung von App-Updates und -Verbesserungen an die Endbenutzer hilft

Dies ist besonders praktisch, wenn Sie kritische Fehlerbehebungen durchführen und sofort bereitstellen möchten, ohne den App Store-Überprüfungsprozess durchlaufen zu müssen

Sie können es sich als "web-ähnliche" Agilität vorstellen, bei der Updates sofort nach Verfügbarkeit seitlich geladen werden

Darüber hinaus bietet es Rollbacks, falls das neue Update die App zum Absturz bringt

## Wie funktioniert es?

Capgo hält das JavaScript-Bundle Ihrer App mit dem Capgo-Server synchron, und jedes Mal, wenn der Benutzer die App öffnet, prüft es beim Capgo-Server, ob ein neues Update für das Bundle verfügbar ist Und natürlich kommt es mit einer Fülle von großartigen Konfigurationen, die Ihnen helfen können, das Benutzererlebnis feinabzustimmen

Ich verwende Capgo in allen meinen Projekten, die ich entwickle Das ermöglicht es mir, weniger Zeit in den App Store-Überprüfungsprozess zu investieren

Mehr darüber können Sie [hier](https://capgoapp/) lesen

## Gibt es Einschränkungen?

So gut es auch klingen mag, gibt es einige Dinge, die wir beachten müssen
Der erste Punkt ist, dass OTA-Updates __nur mit Web-Bundles funktionieren__ 
Sie denken vielleicht, dass dies keine große Einschränkung ist, da wir in Capacitor JS fast den gesamten Code in JS, CSS und HTML schreiben
Während dies zutreffen mag, gibt es immer noch native Module, die wir in unsere App installieren
Wenn ein Modul Ihre Android- oder iOS-Verzeichnisse ändert, können Sie OTA nicht verwenden, um Ihre App zu aktualisieren
Das liegt daran, dass der Inhalt dieser Verzeichnisse verwendet wird, um native Binärdateien zu kompilieren, die OTA nicht aktualisieren kann
Selbst native Apps können diesen Teil nicht aktualisieren

Aber Sie können Ihre CI/CD einrichten, um diesen Teil zu handhaben. Ich habe ein Tutorial erstellt, wie man das macht [hier für iOS](https://capgoapp/blog/automatic-capacitor-ios-build-github-action/) und [hier für Android](https://capgoapp/blog/automatic-capacitor-android-build-github-action/)

## Automatische Capgo-Konfiguration

Es ist Zeit, sich anzumelden und Ihren API-Schlüssel zu erhalten, um Ihre erste Version hochzuladen! Beginnen Sie mit der [Registrierung für ein Capgo-Konto](/register/)

Sobald Sie bei Capgo eingeloggt sind, sehen Sie eine Onboarding-Seite 

![Onboarding-Seite](/onboarding_1_newwebp)

Folgen Sie den Schritten auf der Onboarding-Seite, um Ihre erste App hinzuzufügen

### Folgen Sie der CLI-Anleitung

Führen Sie von der Kommandozeile aus direkt im Stammverzeichnis Ihrer Capacitor-App folgenden Befehl aus:

`npx @capgo/cli@latest init`
Um Capgo in Ihre Capacitor-App zu installieren, wird Sie die CLI durch den Prozess der Einrichtung Ihrer App mit Capgo führen

Wenn Sie es manuell machen möchten, können Sie den folgenden Schritten folgen

## Manuelle Capgo-Konfiguration

### Installieren Sie das Plugin

Am Ende sollten Sie diesen Code zu Ihrer App hinzugefügt haben:

`npm i @capgo/capacitor-updater && npx cap sync`
Um das Plugin in Ihre Capacitor-App zu installieren

Fügen Sie dann diesen Code zu Ihrer App hinzu, um das native Plugin darüber zu informieren, dass das JS-Bundle funktionsfähig ist (wenn Sie dies nicht tun, wird das native Plugin auf die vorherige Version zurückgesetzt):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Dies teilt dem nativen Plugin mit, dass die Installation erfolgreich war

Führen Sie dann `npm run build && npx cap copy` aus, um Ihre App zu aktualisieren

### Anmelden bei Capgo CLOUD

Verwenden Sie zunächst den `all` [API-Schlüssel](https://webcapgoapp/dashboard/apikeys/), der in Ihrem Konto vorhanden ist, um sich mit der CLI anzumelden:

`npx @capgo/cli@latest login IHR_SCHLÜSSEL`

### Fügen Sie Ihre erste App hinzu

Beginnen wir damit, zuerst eine App in Capgo Cloud mit der CLI zu erstellen

`npx @capgo/cli@latest app add`

Dieser Befehl verwendet alle in der Capacitor-Konfigurationsdatei definierten Variablen, um die App zu erstellen

### Laden Sie Ihre erste Version hoch

Führen Sie den Befehl aus, um Ihren Code zu erstellen und an Capgo zu senden:
`npx @capgo/cli@latest bundle upload`

Standardmäßig wird der Versionsname derjenige aus Ihrer `packagejson`-Datei sein

Überprüfen Sie in [Capgo](https://webcapgoapp/), ob der Build vorhanden ist

Sie können es sogar mit meiner [mobilen Sandbox-App](https://capgoapp/app_mobile/) testen

### Machen Sie den Kanal zum Standard

Nachdem Sie Ihre App an Capgo gesendet haben, müssen Sie Ihren Kanal `default` machen, damit Apps Updates von Capgo erhalten können`npx @capgo/cli@latest channel set production -s default`

## Live-Update auf einem Gerät empfangen

Damit Ihre Anwendung ein Live-Update von Deploy empfangen kann, müssen Sie die App auf einem Gerät oder einem Emulator ausführen. Der einfachste Weg, dies zu tun, ist folgenden Befehl zu verwenden, um Ihre lokale App in einem Emulator oder auf einem mit Ihrem Computer verbundenen Gerät zu starten:

    npx cap run [ios | android]

Öffnen Sie die App, setzen Sie sie in den Hintergrund und öffnen Sie sie erneut. Sie sollten in den Logs sehen, dass die App das Update durchgeführt hat.

Glückwunsch! 🎉 Sie haben erfolgreich Ihr erstes Live-Update bereitgestellt. Dies ist nur der Anfang dessen, was Sie mit Live-Updates machen können. Um mehr zu erfahren, sehen Sie sich die vollständigen [Live-Updates-Dokumente](/docs/plugin/cloud-mode/getting-started/) an.

> Wenn Sie den Empfang von lokalen Updates stoppen möchten, führen Sie diesen Befehl aus:
`npx @capgo/cli@latest channel set`