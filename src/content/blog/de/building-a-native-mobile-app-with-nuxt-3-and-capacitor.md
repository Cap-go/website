---
slug: building-a-native-mobile-app-with-nuxt-3-and-capacitor
title: '2025 Anleitung: Mobile Apps mit Nuxt 3.17 und Capacitor erstellen.'
description: >-
  Wie man eine mobile App mit Nuxt 3.17, Capacitor erstellt und eine native
  Benutzeroberfläche mit Konsta UI implementiert.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-03T00:00:00.000Z
updated_at: 2025-05-12T00:00:00.000Z
head_image: /nuxt_capgo.webp
head_image_alt: Nuxt 3 und Capgo Illustration
keywords: >-
  Nuxt 3, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
In diesem Tutorial beginnen wir mit einer neuen [Nuxt 3.17](https://nuxtjs.org/) App und bewegen uns in die native Welt, indem wir Capacitor verwenden und schließlich auch [Konsta UI](https://konstaui.com/) für eine verbesserte Tailwind CSS-Mobile-UI hinzufügen, obwohl der letzte Schritt völlig optional ist.

Durch die Verwendung von Capacitor können Sie Ihre Nuxt 3-Webanwendung problemlos in eine native mobile App umwandeln, ohne dass erhebliche Änderungen oder das Erlernen neuer Fähigkeiten wie React Native erforderlich sind.

Mit nur wenigen einfachen Schritten können die meisten Nuxt 3-Anwendungen in mobile Apps umgewandelt werden.

Dieses Tutorial führt Sie durch den Prozess, beginnend mit einer neuen Nuxt 3-App und dann der Integration von Capacitor, um in den Bereich der nativen mobilen Apps einzutauchen. Zusätzlich können Sie optional [Konsta UI](https://konstaui.com/) verwenden, um Ihre mobile UI mit Tailwind CSS zu verbessern.

## Über Capacitor

CapacitorJS ist wahrhaftig ein Spielveränderer! Sie können es mühelos in jedes Webprojekt integrieren, und es wickelt Ihre Anwendung in eine native Webansicht, indem es das native Xcode- und Android Studio-Projekt für Sie generiert. Darüber hinaus bieten die Plugins Zugriff auf native Gerätefunktionen wie die Kamera über eine JS-Brücke.

Mit Capacitor erhalten Sie eine fantastische native mobile App ohne komplizierte Einrichtung oder steile Lernkurve. Seine schlanke API und die optimierte Funktionalität machen die Integration in Ihr Projekt zum Kinderspiel. Vertrauen Sie mir, Sie werden erstaunt sein, wie mühelos es ist, eine voll funktionsfähige native App mit Capacitor zu erreichen!

## Vorbereitung Ihrer Nuxt 3-App

Um eine neue Nuxt 3-App zu erstellen, führen Sie den folgenden Befehl aus:

```shell
npx nuxi init my-app
cd my-app
npm install
```

Wählen Sie "Nuxt 3", wenn Sie nach der Nuxt-Version gefragt werden.

Um eine native mobile App zu erstellen, benötigen wir einen **Export** unseres Projekts. Lassen Sie uns daher ein einfaches Skript in unsere **package.json** aufnehmen, das verwendet werden kann, um das Nuxt-Projekt zu erstellen und zu kopieren:

```json
{
  "scripts": {
    // ...
    "generate": "nuxt generate"
  }
}
```

Nachdem Sie den Befehl `generate` ausgeführt haben, sollten Sie einen neuen `dist`-Ordner im Stammverzeichnis Ihres Projekts sehen.

Dieser Ordner wird später von Capacitor verwendet, aber im Moment müssen wir ihn korrekt einrichten.

## Hinzufügen von Capacitor zu Ihrer Nuxt 3-App

Um eine Webanwendung in einen nativen mobilen Container zu verpacken, müssen wir einige erste Schritte befolgen, aber danach ist es so einfach wie das Ausführen eines einzigen `sync`-Befehls.

Zuerst können wir die [Capacitor CLI](https://capacitorjs.com/docs/cli/) als Entwicklungsabhängigkeit installieren und sie dann in unserem Projekt einrichten. Während des Setups können Sie „Enter“ drücken, um die Standardwerte für den Namen und die Bundle-ID zu akzeptieren.

Als nächstes müssen wir das Kernpaket und die relevanten Pakete für die iOS- und Android-Plattformen installieren.

Abschließend können wir die Plattformen hinzufügen, und Capacitor wird Ordner für jede Plattform im Stammverzeichnis unseres Projekts erstellen:

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

Bis zu diesem Punkt sollten Sie neue **ios**- und **android**-Ordner in Ihrem Nuxt 3-Projekt sehen.

**Das sind echte native Projekte!**

Um später auf das Android-Projekt zuzugreifen, müssen Sie [Android Studio](https://developer.android.com/studio/) installieren. Für iOS benötigen Sie einen Mac und sollten [Xcode](https://developer.apple.com/xcode/) installieren.

Zusätzlich sollten Sie eine Datei **capacitor.config.ts** in Ihrem Projekt finden, die einige grundlegende Capacitor-Einstellungen enthält, die während der Synchronisation verwendet werden. Das Einzige, auf das Sie achten müssen, ist das **webDir**, das auf das Ergebnis Ihres Build-Befehls zeigen muss. Momentan ist es falsch.

Um dies zu korrigieren, öffnen Sie die Datei **capacitor.config.json** und aktualisieren Sie das **webDir**:

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

Darüber hinaus kann der Synchronisationsbefehl die nativen Plattformen aktualisieren und Plugins installieren. Wenn Sie also ein neues [Capacitor-Plugin](https://capacitorjs.com/docs/plugins/) installieren, ist es an der Zeit, `npx cap sync` erneut auszuführen.

Ohne es zu bemerken, sind Sie jetzt tatsächlich fertig, also sehen Sie sich die App auf einem Gerät an!

## Erstellen und Bereitstellen nativer Apps

Um iOS-Apps zu entwickeln, müssen Sie **Xcode** installiert haben, und für Android-Apps benötigen Sie **Android Studio**. Darüber hinaus müssen Sie, wenn Sie Ihre App im App Store vertreiben möchten, im Apple Developer Program für iOS und in der Google Play Console für Android angemeldet sein.

Wenn Sie neu in der Entwicklung nativer mobiler Anwendungen sind, können Sie die Capacitor CLI verwenden, um beide nativen Projekte problemlos zu öffnen:

```shell
npx cap open ios
npx cap open android
```

Sobald Sie Ihre nativen Projekte eingerichtet haben, ist das Bereitstellen Ihrer App auf einem verbundenen Gerät einfach. In Android Studio müssen Sie lediglich warten, bis alles bereit ist, und Sie können Ihre App auf einem verbundenen Gerät bereitstellen, ohne Einstellungen ändern zu müssen. Hier ist ein Beispiel:

![android-studio-run](/android-studio-run.webp)

In Xcode müssen Sie Ihr Signaturkonto einrichten, um Ihre App auf einem echten Gerät und nicht nur im Simulator bereitzustellen. Wenn Sie dies noch nie gemacht haben, führt Sie Xcode durch den Prozess (aber Sie müssen sich wieder im Developer Program anmelden). Danach können Sie einfach auf Play klicken, um die App auf Ihrem verbundenen Gerät auszuführen, das Sie oben auswählen können. Hier ist ein Beispiel:

![xcode-run](/xcode-run.webp)

Herzlichen Glückwunsch! Sie haben Ihre Nuxt 3-Webanwendung erfolgreich auf einem mobilen Gerät bereitgestellt. Hier ist ein Beispiel:

<div class="mx-auto" style="width: 50%;">
  <img src="/nuxtjs-mobile-app.webp" alt="nuxtjs-mobile-app">
</div>

Aber warten Sie, während der Entwicklung gibt es auch einen schnelleren Weg, dies zu tun...

## Capacitor Live Reload

Bis jetzt sind Sie wahrscheinlich daran gewöhnt, Hot Reload mit allen modernen Frameworks zu haben, und die gute Nachricht ist, dass Sie die gleiche Funktionalität **auf einem mobilen Gerät** mit minimalem Aufwand haben können!

Aktivieren Sie den Zugriff auf Ihre lokal gehostete Anwendung mit Live Reload **in Ihrem Netzwerk**, indem Sie die Capacitor-App den Inhalt von der bestimmten URL laden lassen.

Der erste Schritt besteht darin, Ihre lokale IP-Adresse herauszufinden. Wenn Sie einen Mac verwenden, können Sie dies herausfinden, indem Sie den folgenden Befehl im Terminal ausführen:

```shell
ipconfig getifaddr en0
```

Unter Windows führen Sie aus:

```shell
ipconfig
```

Suchen Sie dann nach der IPv4-Adresse.

Wir können Capacitor anweisen, die App direkt vom Server zu laden, indem wir einen weiteren Eintrag in unsere `capacitor.config.ts`-Datei hinzufügen:

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

Stellen Sie sicher, dass Sie **die richtige IP und den richtigen Port** verwenden, ich habe in diesem Beispiel den Standardport von Nuxt 3 verwendet.

Jetzt können wir diese Änderungen anwenden, indem wir sie in unser natives Projekt kopieren:

```shell
npx cap copy
```

Der Befehl `copy` ähnelt dem `sync`, wird jedoch nur **die Änderungen an dem Webordner** und der Konfiguration **übertragen**, ohne das native Projekt zu aktualisieren.

Sie können Ihre App nun ein weiteres Mal über Android Studio oder Xcode bereitstellen. Danach, wenn Sie etwas in Ihrer Nuxt-App ändern, **wird die App automatisch neu geladen** und zeigt die Änderungen an!

**Beachten Sie**, dass, wenn Sie neue Plugins wie die Kamera installieren, dies immer noch einen Neubau Ihres nativen Projekts erfordert. Dies liegt daran, dass native Dateien geändert werden, und dies kann nicht „on the fly“ geschehen.

Hinweis: Sie sollten die richtige IP und den richtigen Port in Ihrer Konfiguration verwenden. Der obenstehende Codeblock zeigt den Standardport von Nuxt 3 zu Demonstrationszwecken.

## Verwendung von Capacitor Plugins

Lassen Sie uns ansehen, wie man ein Capacitor-Plugin in Aktion verwendet, das wir bereits einige Male erwähnt haben. Dazu können wir ein relativ einfaches Plugin installieren, indem wir Folgendes ausführen:

```shell
npm i @capacitor/share
```

Es gibt nichts Auffälliges am [Share-Plugin](https://capacitorjs.com/docs/apis/share/), aber es bringt dennoch den nativen Freigabedialog auf! Dafür müssen wir jetzt nur noch das Paket importieren und die entsprechende `share()`-Funktion von unserer App aufrufen, also lassen Sie uns die **pages/index.vue** wie folgt ändern:

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

Wie bereits erwähnt, müssen wir beim Installieren neuer Plugins eine Synchronisationsoperation durchführen und die App dann auf unser Gerät neu bereitstellen. Führen Sie dazu den folgenden Befehl aus:

```
npx cap sync
```

Nachdem Sie auf die Schaltfläche geklickt haben, können Sie den wunderschönen nativen Freigabedialog in Aktion sehen!

## Hinzufügen von Konsta UI

Um Konsta UI in Ihrer Nuxt 3-App zu verwenden, müssen Sie [Tailwind bereits installiert haben](https://tailwindcss.com/docs/guides/nuxtjs/) und das Paket installieren:

```shell
npm i konsta
```

Darüber hinaus müssen Sie Ihre Datei `tailwind.config.js` ändern:

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

`konstaConfig` erweitert die Standard-(oder Ihre benutzerdefinierte) Tailwind CSS-Konfiguration um einige zusätzliche Variationen und Hilfsfunktionen, die für Konsta UI erforderlich sind.

Jetzt müssen wir die Haupt- [App](https://konstaui.com/vue/app/) Komponente einrichten, damit wir einige globale Parameter (wie `theme`) festlegen können.

Wir müssen die gesamte App mit `App` in der `pages/_app.vue` umwickeln:

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

Jetzt, wo alles eingerichtet ist, können wir die Konsta UI Vue-Komponenten in unseren Nuxt 3-Seiten verwenden.

Zum Beispiel, lassen Sie uns `pages/index.vue` öffnen und es wie folgt ändern:

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

Wenn das Live-Reload nicht synchron ist, nachdem alle erforderlichen Komponenten installiert wurden, versuchen Sie, alles neu zu starten. Sobald Sie das getan haben, sollten Sie eine mobile App mit einem etwas nativen Aussehen sehen, die mit Nuxt 3 und Capacitor erstellt wurde!

Sie sollten folgende Seite als Ergebnis sehen:

<template>
  <div>
<h1>

## Fazit

Capacitor ist eine ausgezeichnete Option zum Erstellen nativer Anwendungen, die auf einem bestehenden Webprojekt basieren, und bietet eine einfache Möglichkeit, Code zu teilen und eine konsistente UI aufrechtzuerhalten.

Und mit der Hinzufügung von [Capgo](https://capgo.app/) wird es sogar einfacher, Live-Updates in Ihre App einzufügen, sodass Ihre Benutzer immer Zugriff auf die neuesten Funktionen und Fehlerbehebungen haben.

Wenn Sie lernen möchten, wie Sie Capgo zu Ihrer Next.js-App hinzufügen können, lesen Sie den nächsten Artikel:

## Danksagungen

Vielen Dank an Simon, dieser Artikel basiert auf [diesem Artikel](https://devdactic.com/nextjs-and-capacitor/), der für nuxt3 mit chat-gpt-4 umgeschrieben und angepasst wurde.
