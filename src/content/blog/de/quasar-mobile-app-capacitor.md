---
slug: quasar-mobile-app-capacitor
title: 'Mobile Apps mit Live-Updates, Quasar und Capacitor erstellen.'
description: >-
  So erstellen Sie eine mobile App mit Quasar, Capacitor und implementieren
  Live-Updates.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: /quasar_capgo.webp
head_image_alt: Quasar und Capgo Illustration
keywords: >-
  Quasar, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
In dieser Anleitung beginnen wir mit der Erstellung einer neuen Web-App mit [Quasar](https://quasar.dev/). Später lernen wir, wie man sie mit Capacitor in eine mobile App verwandelt. Wenn Sie möchten, dass Ihre App auf mobilen Geräten besser aussieht.

Mit Capacitor können Sie Ihre Quasar Web-App in eine mobile App verwandeln, ohne viele komplizierte Dinge tun oder eine völlig neue Art der App-Entwicklung wie zum Beispiel mit React Native lernen zu müssen.

Diese Anleitung führt Sie durch den Prozess, beginnend mit einer neuen Quasar-App und dann der Integration von Capacitor, um in den Bereich der nativen mobilen Apps vorzudringen. Zusätzlich werden Sie [Capgo](https://capgo.app/) verwenden, um Live-Updates in Sekundenschnelle an Ihre App zu senden.

## Über Capacitor

CapacitorJS ist wirklich bahnbrechend! Sie können es mühelos in jedes Webprojekt integrieren, und es verpackt Ihre Anwendung in eine native Webview, wobei es das native Xcode- und Android Studio-Projekt für Sie generiert. Außerdem bieten seine Plugins über eine JS-Brücke Zugriff auf native Gerätefunktionen wie die Kamera.

Mit Capacitor erhalten Sie eine fantastische native mobile App ohne kompliziertes Setup oder steile Lernkurve. Seine schlanke API und optimierte Funktionalität machen die Integration in Ihr Projekt zum Kinderspiel. Glauben Sie mir, Sie werden erstaunt sein, wie mühelos es ist, mit Capacitor eine voll funktionsfähige native App zu erstellen!

## Vorbereitung Ihrer Quasar-App

Um eine neue Quasar-App zu erstellen, führen Sie den folgenden Befehl aus:

```shell
npm init quasar
```

![Quasar Project Setup](/quasar-setup.webp)

Wählen Sie die Option "App with Quasar CLI" und dann "Quasar v2".

Um eine native mobile App zu erstellen, benötigen wir einen **Export** unseres Projekts. Fügen wir also ein einfaches Skript in unserer **package.json** hinzu, das zum Bauen und Kopieren des Quasar-Projekts verwendet werden kann:

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

Nach Ausführung des Befehls `generate` sollten Sie einen neuen `dist`-Ordner im Wurzelverzeichnis Ihres Projekts sehen können.

Dieser Ordner wird später von Capacitor verwendet, aber zunächst müssen wir ihn korrekt einrichten.

[Continue with next part if needed]

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Quasar project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Wenn der Live-Reload nach der Installation aller erforderlichen Komponenten nicht synchron ist, versuchen Sie, alles neu zu starten. Sobald Sie das getan haben, sollten Sie eine mobile App mit einem einigermaßen nativen Aussehen sehen, die mit Quasar und Capacitor erstellt wurde!


## Fazit

Capacitor ist eine ausgezeichnete Option zum Erstellen nativer Anwendungen auf Basis eines bestehenden Web-Projekts und bietet eine einfache Möglichkeit, Code zu teilen und eine einheitliche Benutzeroberfläche beizubehalten.

Und mit der Ergänzung von [Capgo](https://capgo.app/) ist es noch einfacher, Live-Updates zu Ihrer App hinzuzufügen und sicherzustellen, dass Ihre Benutzer immer Zugriff auf die neuesten Funktionen und Fehlerbehebungen haben.

Wenn Sie erfahren möchten, wie Sie Capgo zu Ihrer Next.js-App hinzufügen können, werfen Sie einen Blick auf den nächsten Artikel:
