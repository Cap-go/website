---
slug: vue-mobile-app-capacitor
title: Mobile Apps mit Vue und Capacitor erstellen
description: >-
  Erfahren Sie, wie Sie eine mobile App mit Vue, Capacitor und optional zur
  Verbesserung der Benutzeroberfläche mit Konsta UI erstellen können.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-08T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /vue_capacitor.webp
head_image_alt: Vue und Capacitor Illustration
keywords: >-
  Vue, Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
original_slug: vue-mobile-app-capacitor
---
In diesem Tutorial führen wir Sie durch den Prozess der Umwandlung einer Vue-Webanwendung in eine native mobile App mit Capacitor. Optional können Sie Ihre mobile Benutzeroberfläche auch mit Konsta UI erweitern, einer auf Tailwind CSS basierenden mobilen UI-Bibliothek.

## Über Capacitor

Capacitor ist ein bahnbrechendes Tool, das sich einfach in jedes Webprojekt integrieren lässt und Ihre Anwendung in eine native mobile App umwandelt. Es generiert native Xcode- und Android Studio-Projekte und ermöglicht den Zugriff auf native Gerätefunktionen wie die Kamera über eine JavaScript-Brücke.

## Vorbereitung Ihrer Vue-App

Erstellen Sie zunächst eine neue Vue-App mit folgendem Befehl:

```shell
vue create my-app
cd my-app
npm install
```

Um Ihre Vue-App für die native mobile Bereitstellung vorzubereiten, müssen Sie Ihr Projekt exportieren. Fügen Sie ein Skript in Ihrer **package.json**-Datei hinzu, um das Vue-Projekt zu erstellen und zu kopieren:

```json
{
  "scripts": {
    // ...
    "build": "vue-cli-service build"
  }
}
```

Nach Ausführung des `build`-Befehls sollten Sie einen neuen `dist`-Ordner im Wurzelverzeichnis Ihres Projekts sehen. Dieser Ordner wird später von Capacitor verwendet.

## Hinzufügen von Capacitor zu Ihrer Vue-App

Um Ihre Vue-Web-App in einen nativen mobilen Container umzuwandeln, folgen Sie diesen Schritten:

1. Installieren Sie die Capacitor CLI als Entwicklungsabhängigkeit und richten Sie sie in Ihrem Projekt ein. Akzeptieren Sie die Standardwerte für Name und Bundle-ID während der Einrichtung.

2. Installieren Sie das Core-Paket und die relevanten Pakete für die iOS- und Android-Plattformen.

3. Fügen Sie die Plattformen hinzu, und Capacitor erstellt Ordner für jede Plattform im Wurzelverzeichnis Ihres Projekts:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Vue project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Sie sollten jetzt neue **iOS**- und **android**-Ordner in Ihrem Vue-Projekt sehen.

Aktualisieren Sie die **capacitor.config.json**-Datei, um das **webDir** auf das Ergebnis Ihres Build-Befehls zu verweisen:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Jetzt können Sie Ihr Vue-Projekt erstellen und mit Capacitor synchronisieren:

```shell
npm run build
npx cap sync
```

## Native Apps erstellen und bereitstellen

Für die Entwicklung von iOS-Apps benötigen Sie Xcode und für Android-Apps Android Studio. Zusätzlich müssen Sie sich im Apple Developer Program für iOS und in der Google Play Console für Android registrieren, um Ihre App im App Store zu vertreiben.

Verwenden Sie die Capacitor CLI, um beide nativen Projekte zu öffnen:

```shell
npx cap open ios
npx cap open android
```

Stellen Sie Ihre App über Android Studio oder Xcode auf einem verbundenen Gerät bereit.

## Capacitor Live Reload

Aktivieren Sie Live Reload auf Ihrem mobilen Gerät, indem Sie die Capacitor-App den Inhalt von einer bestimmten URL in Ihrem Netzwerk laden lassen.

Finden Sie Ihre lokale IP-Adresse und aktualisieren Sie die `capacitor.config.ts`-Datei mit der korrekten IP und Port:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:8080',
    cleartext: true
  }
};

export default config;
```

Übernehmen Sie diese Änderungen, indem Sie sie in Ihr natives Projekt kopieren:

```shell
npx cap copy
```

Jetzt wird Ihre App automatisch neu geladen und zeigt Änderungen an, wenn Sie Ihre Vue-App aktualisieren.

## Verwendung von Capacitor Plugins

Installieren Sie ein Capacitor-Plugin, wie zum Beispiel das Share-Plugin, und verwenden Sie es in Ihrer Vue-App:

```shell
npm i @capacitor/share
```

Importieren Sie das Paket und rufen Sie die `share()`-Funktion in Ihrer App auf:

```html
<template>
  <div>
    <h1>Welcome to Vue and Capacitor!</h1>
    <button @click="share">Share now!</button>
  </div>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';

async function share() {
  await Share.share({
    title: 'Open Youtube',
    text: 'Check new video on youtube',
    url: 'https://www.youtube.com',
    dialogTitle: 'Share with friends'
  });
}
</script>
```

Nach der Installation neuer Plugins führen Sie den `sync`-Befehl aus und stellen die App erneut auf Ihrem Gerät bereit:

```
npx cap sync
```

## Hinzufügen von Konsta UI

Um Konsta UI in Ihrer Vue-App zu verwenden, müssen Sie [tailwind bereits installiert haben](https://tailwindcss.com/docs/guides/vite/#vue) und das Paket installieren:
Um Konsta UI in Ihrer Vue-App zu verwenden, installieren Sie das Paket und modifizieren Sie Ihre `tailwind.config.js`-Datei:

```shell
npm i konsta
```

Umschließen Sie Ihre App mit der `App`-Komponente in der `pages/_app.vue`-Datei und verwenden Sie Konsta UI Vue-Komponenten in Ihren Vue-Seiten.

## Fazit

Capacitor ist eine großartige Option für die Entwicklung nativer Anwendungen auf Basis eines bestehenden Webprojekts. Mit der Ergänzung von Capgo ist es noch einfacher, Live-Updates zu Ihrer App hinzuzufügen und sicherzustellen, dass Ihre Nutzer immer Zugriff auf die neuesten Funktionen und Fehlerbehebungen haben.

Erfahren Sie, wie Capgo Ihnen helfen kann, bessere Apps schneller zu entwickeln, [registrieren Sie sich noch heute für ein kostenloses Konto](/register/).
