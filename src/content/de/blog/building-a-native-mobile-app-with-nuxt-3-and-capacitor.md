---
slug: building-a-native-mobile-app-with-nuxt-3-and-capacitor
title: Mobile Apps mit Nuxt 3 und Capacitor erstellen
description: >-
  Wie man eine mobile App mit Nuxt 3, Capacitor erstellt und native
  Benutzeroberfläche mit Konsta UI implementiert.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2023-06-03T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Nuxt 3 und Capgo Illustration
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In diesem Tutorial beginnen wir mit einer neuen [Nuxt 3](https://nuxtjsorg/) App und wechseln in den nativen Bereich mithilfe von Capacitor. Schließlich fügen wir optional auch [Konsta UI](https://konstauicom/) für eine verbesserte mobile Benutzeroberfläche mit Tailwind CSS hinzu, obwohl der letzte Schritt völlig optional ist.

Durch die Verwendung von Capacitor können Sie Ihre Nuxt 3 Web-Anwendung einfach in eine native mobile App umwandeln, ohne dass wesentliche Änderungen oder das Erlernen einer neuen Fähigkeit wie React Native erforderlich sind.

Mit nur wenigen einfachen Schritten können die meisten Nuxt 3 Anwendungen in mobile Apps umgewandelt werden.

Dieses Tutorial führt Sie durch den Prozess, beginnend mit einer neuen Nuxt 3 App und dann der Integration von Capacitor, um in den Bereich der nativen mobilen Apps zu gelangen. Zusätzlich können Sie optional [Konsta UI](https://konstauicom/) verwenden, um Ihre mobile Benutzeroberfläche mit Tailwind CSS zu verbessern.

## Über Capacitor

Capacitor ist wirklich bahnbrechend! Sie können es mühelos in jedes Webprojekt integrieren, und es wird Ihre Anwendung in eine native Webview einbetten und das native Xcode- und Android Studio-Projekt für Sie generieren. Außerdem bieten seine Plugins über eine JS-Brücke Zugriff auf native Gerätefunktionen wie die Kamera.

Mit Capacitor erhalten Sie eine fantastische native mobile App ohne kompliziertes Setup oder steile Lernkurve. Seine schlanke API und optimierte Funktionalität machen es zu einem Kinderspiel, es in Ihr Projekt zu integrieren. Glauben Sie mir, Sie werden erstaunt sein, wie mühelos es mit Capacitor ist, eine voll funktionsfähige native App zu erstellen!

## Vorbereitung Ihrer Nuxt 3 App

Um eine neue Nuxt 3 App zu erstellen, führen Sie den folgenden Befehl aus:

```shell
npx nuxi init my-app
cd my-app
npm install
```

Wählen Sie "Nuxt 3", wenn Sie nach der Nuxt-Version gefragt werden.

Um eine native mobile App zu erstellen, benötigen wir einen **Export** unseres Projekts. Lassen Sie uns daher ein einfaches Skript in unsere **packagejson** aufnehmen, das zum Erstellen und Kopieren des Nuxt-Projekts verwendet werden kann:

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

Nach der Ausführung des Befehls `generate` sollten Sie einen neuen `dist`-Ordner im Stammverzeichnis Ihres Projekts sehen können.

Dieser Ordner wird später von Capacitor verwendet, aber zunächst müssen wir ihn korrekt einrichten.

## Hinzufügen von Capacitor zu Ihrer Nuxt 3 App

Um eine beliebige Web-App in einen nativen mobilen Container zu verpacken, müssen wir einige anfängliche Schritte befolgen, aber danach ist es so einfach wie die Ausführung eines einzigen `sync`-Befehls.

Zunächst können wir die [Capacitor CLI](https://capacitorjscom/docs/cli/) als Entwicklungsabhängigkeit installieren und sie dann in unserem Projekt einrichten. Während der Einrichtung können Sie "Enter" drücken, um die Standardwerte für Namen und Bundle-ID zu akzeptieren.

Als Nächstes müssen wir das Kernpaket und die relevanten Pakete für die iOS- und Android-Plattformen installieren.

Schließlich können wir die Plattformen hinzufügen, und Capacitor wird Ordner für jede Plattform im Stammverzeichnis unseres Projekts erstellen:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Nuxt project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

An diesem Punkt sollten Sie neue **ios**- und **android**-Ordner in Ihrem Nuxt 3-Projekt sehen können.

**Das sind echte native Projekte!**

Um später auf das Android-Projekt zugreifen zu können, müssen Sie [Android Studio](https://developerandroidcom/studio/) installieren. Für iOS benötigen Sie einen Mac und sollten [Xcode](https://developerapplecom/xcode/) installieren.

Zusätzlich sollten Sie eine **capacitorconfigts**-Datei in Ihrem Projekt finden, die einige grundlegende Capacitor-Einstellungen enthält, die während der Synchronisierung verwendet werden. Das Einzige, worauf Sie achten müssen, ist das **webDir**, das auf das Ergebnis Ihres Build-Befehls zeigen muss. Derzeit ist es ungenau.

Um dies zu korrigieren, öffnen Sie die **capacitorconfigjson**-Datei und aktualisieren Sie das **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Sie können es ausprobieren, indem Sie die folgenden Befehle ausführen:

```shell
npm run generate
npx cap sync
```

Der erste Befehl `npm run generate` wird einfach Ihr Nuxt 3-Projekt erstellen und den statischen Build kopieren, während der zweite Befehl `npx cap sync` den gesamten Webcode an die richtigen Stellen der nativen Plattformen synchronisiert, damit sie in einer App angezeigt werden können.

Zusätzlich könnte der Sync-Befehl die nativen Plattformen aktualisieren und Plugins installieren, daher ist es Zeit, `npx cap sync` erneut auszuführen, wenn Sie ein neues [Capacitor-Plugin](https://capacitorjscom/docs/plugins/) installieren.Ohne es zu bemerken, sind Sie jetzt tatsächlich fertig. Lassen Sie uns die App auf einem Gerät ansehen!

## Native Apps erstellen und bereitstellen

Um iOS-Apps zu entwickeln, müssen Sie **Xcode** installiert haben, und für Android-Apps benötigen Sie **Android Studio**. Wenn Sie außerdem planen, Ihre App im App Store zu vertreiben, müssen Sie sich für iOS im Apple Developer Program und für Android in der Google Play Console anmelden.

Wenn Sie neu in der nativen Mobilentwicklung sind, können Sie die Capacitor CLI verwenden, um beide nativen Projekte einfach zu öffnen:

```shell
npx cap open ios
npx cap open android
```

Sobald Sie Ihre nativen Projekte eingerichtet haben, ist die Bereitstellung Ihrer App auf einem verbundenen Gerät einfach. In Android Studio müssen Sie nur warten, bis alles bereit ist, und Sie können Ihre App ohne Änderung von Einstellungen auf einem verbundenen Gerät bereitstellen. Hier ein Beispiel:

![android-studio-run](/android-studio-run.webp)

In Xcode müssen Sie Ihr Signierungskonto einrichten, um Ihre App auf einem echten Gerät anstatt nur im Simulator bereitzustellen. Wenn Sie das noch nie gemacht haben, führt Sie Xcode durch den Prozess (aber auch hier müssen Sie im Developer Program angemeldet sein). Danach können Sie einfach auf "Play" klicken, um die App auf Ihrem verbundenen Gerät auszuführen, das Sie oben auswählen können. Hier ein Beispiel:

![xcode-run](/xcode-run.webp)

Herzlichen Glückwunsch! Sie haben Ihre Nuxt 3 Web-App erfolgreich auf einem mobilen Gerät bereitgestellt. Hier ein Beispiel:

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

Aber warten Sie, es gibt auch einen schnelleren Weg, dies während der Entwicklung zu tun.

## Capacitor Live Reload

Inzwischen sind Sie wahrscheinlich an Hot Reload bei allen modernen Frameworks gewöhnt, und die gute Nachricht ist, dass Sie die gleiche Funktionalität **auf einem mobilen Gerät** mit minimalem Aufwand haben können!

Ermöglichen Sie den Zugriff auf Ihre lokal gehostete Anwendung mit Live Reload **in Ihrem Netzwerk**, indem Sie die Capacitor-App den Inhalt von der spezifischen URL laden lassen.

Der erste Schritt besteht darin, Ihre lokale IP-Adresse herauszufinden. Wenn Sie einen Mac verwenden, können Sie dies herausfinden, indem Sie den folgenden Befehl im Terminal ausführen:

```shell
ipconfig getifaddr en0
```

Unter Windows führen Sie aus:

```shell
ipconfig
```

Suchen Sie dann nach der IPv4-Adresse.

Wir können Capacitor anweisen, die App direkt vom Server zu laden, indem wir einen weiteren Eintrag zu unserer `capacitor.config.ts`-Datei hinzufügen:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Stellen Sie sicher, dass Sie **die korrekte IP und den korrekten Port** verwenden. Ich habe in diesem Beispiel den Standard-Nuxt 3-Port verwendet.

Jetzt können wir diese Änderungen anwenden, indem wir sie in unser natives Projekt kopieren:

```shell
npx cap copy
```

Der Befehl `copy` ist ähnlich wie `sync`, kopiert aber nur **die Änderungen, die am Webordner** und an der Konfiguration vorgenommen wurden, ohne das native Projekt zu aktualisieren.

Sie können Ihre App jetzt noch einmal über Android Studio oder Xcode bereitstellen. Danach wird die App, wenn Sie etwas in Ihrer Nuxt-App ändern, **automatisch neu geladen** und zeigt die Änderungen an!

**Beachten Sie**, dass die Installation neuer Plugins wie der Kamera immer noch einen Neuaufbau Ihres nativen Projekts erfordert. Dies liegt daran, dass native Dateien geändert werden und dies nicht im laufenden Betrieb erfolgen kann.

Beachten Sie, dass Sie in Ihrer Konfiguration die richtige IP und den richtigen Port verwenden sollten. Der obige Codeblock zeigt zu Demonstrationszwecken den Standard-Nuxt 3-Port.

## Verwendung von Capacitor-Plugins

Schauen wir uns an, wie man ein Capacitor-Plugin in Aktion verwendet, was wir schon ein paar Mal erwähnt haben. Dazu können wir ein ziemlich einfaches Plugin installieren, indem wir Folgendes ausführen:

```shell
npm i @capacitor/share
```

Es gibt nichts Besonderes am [Share-Plugin](https://capacitorjs.com/docs/apis/share/), aber es ruft trotzdem den nativen Teilen-Dialog auf! Dafür müssen wir jetzt nur das Paket importieren und die entsprechende `share()`-Funktion aus unserer App aufrufen. Ändern wir also die **pages/index.vue** wie folgt:

```html
<template>
  <div>
    <h1>Welcome to Nuxt 3 and Capacitor!</h1>
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

Wie bereits erwähnt, müssen wir bei der Installation neuer Plugins eine Synchronisierung durchführen und dann die App erneut auf unserem Gerät bereitstellen.Um dies zu tun, führen Sie den folgenden Befehl aus:

```
npx cap sync
```

Nachdem Sie den Button gedrückt haben, können Sie den schönen nativen Teilen-Dialog in Aktion sehen!

## Hinzufügen von Konsta UI

Um Konsta UI in Ihrer Nuxt 3 App zu verwenden, müssen Sie [Tailwind bereits installiert haben](https://tailwindcsscom/docs/guides/nuxtjs/) und das Paket installieren:

```shell
npm i konsta
```

Zusätzlich müssen Sie Ihre `tailwindconfigjs` Datei ändern:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './pages/**/*.{vue}',
    './components/**/*.{vue}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

`konstaConfig` erweitert die Standard (oder Ihre benutzerdefinierte) Tailwind CSS-Konfiguration um einige zusätzliche Varianten und Hilfsdienstprogramme, die für Konsta UI erforderlich sind.

Jetzt müssen wir die Haupt-[App](https://konstauicom/vue/app/) Komponente einrichten, damit wir einige globale Parameter (wie `theme`) festlegen können.

Wir müssen die gesamte App mit `App` in der `pages/_appvue` umschließen:

```html
<template>
  <App theme="ios">
    <Nuxt />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Beispielseite

Jetzt, da alles eingerichtet ist, können wir Konsta UI Vue-Komponenten in unseren Nuxt 3-Seiten verwenden.

Öffnen wir zum Beispiel `pages/indexvue` und ändern es wie folgt:

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Nuxt 3 & Konsta UI app. Let's see what we have here.
      </p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem href="/about/" title="About" />
      <ListItem href="/form/" title="Form" />
    </List>

    <Block strong class="flex space-x-4">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Block>
  </Page>
</template>

<script setup>
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/vue';
</script>
```

Wenn die Live-Aktualisierung nach der Installation aller notwendigen Komponenten nicht synchronisiert ist, versuchen Sie, alles neu zu starten. Sobald Sie das getan haben, sollten Sie eine mobile App mit einem einigermaßen nativen Look sehen, die mit Nuxt 3 und Capacitor gebaut wurde!

Sie sollten folgende Seite als Ergebnis sehen:

<template>
  <div>
<h1>

## Fazit

Capacitor ist eine ausgezeichnete Option zum Erstellen nativer Anwendungen basierend auf einem bestehenden Webprojekt und bietet eine einfache Möglichkeit, Code zu teilen und eine konsistente Benutzeroberfläche beizubehalten.

Und mit der Ergänzung von [Capgo](https://capgoapp/) ist es noch einfacher, Live-Updates zu Ihrer App hinzuzufügen und sicherzustellen, dass Ihre Benutzer immer Zugriff auf die neuesten Funktionen und Fehlerbehebungen haben.

Wenn Sie lernen möchten, wie Sie Capgo zu Ihrer Nextjs-App hinzufügen, werfen Sie einen Blick auf den nächsten Artikel:

## Danksagung

Vielen Dank an Simon, dieser Artikel basiert auf [diesem Artikel](https://devdacticcom/nextjs-and-capacitor/), der für Nuxt3 mit ChatGPT-4 umgeschrieben und angepasst wurde.