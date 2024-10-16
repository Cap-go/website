---
slug: live-update-with-quasar-and-capacitor
title: 'Erstellen von mobilen Apps mit Live-Updates, Quasar und Capacitor.'
description: >-
  Wie man eine mobile App mit Quasar und Capacitor erstellt und Live-Updates
  implementiert.
author: Anik Dhabal Babu
author_url: 'https://x.com/anikDhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /quasar_capgo.webp
head_image_alt: Quasar und Capgo Illustration
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In diesem Tutorial beginnen wir mit der Erstellung einer neuen Web-App mit [Quasar](https://quasar.dev/). Später lernen wir, wie man sie mit Capacitor in eine mobile App umwandelt. Wenn Sie möchten, dass Ihre App auf Mobilgeräten besser aussieht.

Mit Capacitor können Sie Ihre Quasar-Web-App in eine mobile App verwandeln, ohne viele komplizierte Dinge tun oder eine völlig neue Art der App-Entwicklung erlernen zu müssen, wie es bei React Native der Fall wäre.

Dieses Tutorial führt Sie durch den Prozess, beginnend mit einer neuen Quasar-App und dann der Integration von Capacitor, um in den Bereich der nativen mobilen Apps vorzustoßen. Zusätzlich werden Sie [Capgo](https://capgo.app/) verwenden, um Live-Updates in Sekundenschnelle an Ihre App zu senden.

## Über Capacitor

Capacitor ist wirklich bahnbrechend! Sie können es mühelos in jedes Webprojekt integrieren, und es wird Ihre Anwendung in eine native Webview verpacken und das native Xcode- und Android Studio-Projekt für Sie generieren. Außerdem bieten seine Plugins über eine JS-Brücke Zugriff auf native Gerätefunktionen wie die Kamera.

Mit Capacitor erhalten Sie eine fantastische native mobile App ohne kompliziertes Setup oder steile Lernkurve. Seine schlanke API und optimierte Funktionalität machen es kinderleicht, es in Ihr Projekt zu integrieren. Glauben Sie mir, Sie werden erstaunt sein, wie mühelos es mit Capacitor ist, eine voll funktionsfähige native App zu erstellen!

## Vorbereitung Ihrer Quasar-App

Um eine neue Quasar-App zu erstellen, führen Sie den folgenden Befehl aus:

```shell
npm init quasar
```

![Quasar Project Setup](/quasar-setup.webp)

Wählen Sie die Option "App with Quasar CLI" und dann "Quasar v2".

Um eine native mobile App zu erstellen, benötigen wir einen **Export** unseres Projekts. Fügen wir also ein einfaches Skript in unsere **package.json** ein, das zum Erstellen und Kopieren des Quasar-Projekts verwendet werden kann:

```json
{
  "scripts": {
    // ...
    "build": "quasar build"
  }
}
```

Nachdem Sie den Befehl `generate` ausgeführt haben, sollten Sie einen neuen `dist`-Ordner im Stammverzeichnis Ihres Projekts sehen können.

Dieser Ordner wird später von Capacitor verwendet, aber jetzt müssen wir ihn richtig einrichten.

## Hinzufügen von Capacitor zu Ihrer Quasar-App

Um eine beliebige Web-App in einen nativen mobilen Container zu packen, müssen wir einige anfängliche Schritte befolgen, aber danach ist es so einfach wie die Ausführung eines einzigen `sync`-Befehls.

Zuerst können wir die [Capacitor CLI](https://capacitorjs.com/docs/cli/) als Entwicklungsabhängigkeit installieren und dann in unserem Projekt einrichten. Während der Einrichtung können Sie "Enter" drücken, um die Standardwerte für Name und Bundle-ID zu akzeptieren.

Als Nächstes müssen wir das Core-Paket und die relevanten Pakete für die iOS- und Android-Plattformen installieren.

Schließlich können wir die Plattformen hinzufügen, und Capacitor wird für jede Plattform Ordner im Stammverzeichnis unseres Projekts erstellen:

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

![Initialize Capacitor](/capacitor-init.webp)

An diesem Punkt sollten Sie neue **ios**- und **android**-Ordner in Ihrem Quasar-Projekt sehen können.

**Das sind echte native Projekte!**

Um später auf das Android-Projekt zuzugreifen, müssen Sie [Android Studio](https://developer.android.com/studio/) installieren. Für iOS benötigen Sie einen Mac und sollten [Xcode](https://developer.apple.com/xcode/) installieren.

Zusätzlich sollten Sie eine **capacitor.config.ts**-Datei in Ihrem Projekt finden, die einige grundlegende Capacitor-Einstellungen enthält, die während der Synchronisierung verwendet werden. Das Einzige, worauf Sie achten müssen, ist das **webDir**, das auf das Ergebnis Ihres Build-Befehls zeigen muss. Derzeit ist es ungenau.

Um dies zu korrigieren, öffnen Sie die **capacitor.config.json**-Datei und aktualisieren Sie das **webDir**:

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

Der erste Befehl `npm run generate` wird einfach Ihr Quasar-Projekt erstellen und den statischen Build kopieren, während der zweite Befehl `npx cap sync` den gesamten Web-Code an die richtigen Stellen der nativen Plattformen synchronisiert, damit sie in einer App angezeigt werden können.

Zusätzlich könnte der Sync-Befehl die nativen Plattformen aktualisieren und Plugins installieren, also wenn Sie ein neues [Capacitor-Plugin](https://capacitorjs.com/docs/plugins/) installieren, ist es Zeit, erneut `npx cap sync` auszuführen.Ohne es zu merken, sind Sie jetzt tatsächlich fertig. Lassen Sie uns also die App auf einem Gerät betrachten!

## Native Apps erstellen und bereitstellen

Um iOS-Apps zu entwickeln, müssen Sie **Xcode** installiert haben, und für Android-Apps benötigen Sie **Android Studio**. Wenn Sie außerdem planen, Ihre App im App Store zu vertreiben, müssen Sie sich für iOS im Apple Developer Program und für Android in der Google Play Console anmelden.

Wenn Sie neu in der nativen Mobilentwicklung sind, können Sie die Capacitor CLI verwenden, um beide nativen Projekte einfach zu öffnen:

```shell
npx cap open ios
npx cap open android
```

Sobald Sie Ihre nativen Projekte eingerichtet haben, ist die Bereitstellung Ihrer App auf einem verbundenen Gerät einfach. In Android Studio müssen Sie nur warten, bis alles bereit ist, und Sie können Ihre App ohne Änderung von Einstellungen auf einem verbundenen Gerät bereitstellen. Hier ein Beispiel:

![android-studio-run](/android-studio-run.webp)

In Xcode müssen Sie Ihr Signaturkonto einrichten, um Ihre App auf einem echten Gerät bereitzustellen und nicht nur im Simulator. Wenn Sie dies noch nie gemacht haben, führt Sie Xcode durch den Prozess (aber auch hier müssen Sie im Developer Program angemeldet sein). Danach können Sie einfach auf Play drücken, um die App auf Ihrem verbundenen Gerät auszuführen, das Sie oben auswählen können. Hier ein Beispiel:

![xcode-run](/xcode-run.webp)

Glückwunsch! Sie haben Ihre Quasar-Web-App erfolgreich auf einem mobilen Gerät bereitgestellt. Hier ein Beispiel:

<div class="mx-auto" style="width: 50%;">
  <img src="/Quasar-mobile.webp" alt="quasar-mobile-app">
</div>

Aber warten Sie, es gibt auch einen schnelleren Weg, dies während der Entwicklung zu tun.

## Capgo Live Update

Capgo Live Update ist ein Dienst, der es Entwicklern ermöglicht, Updates für ihre mobilen Apps bereitzustellen, ohne den traditionellen App Store-Einreichungsprozess zu durchlaufen. Dies kann eine bequeme Möglichkeit sein, schnell Fehler zu beheben oder kleine Updates an einer App vorzunehmen, ohne auf den App Store-Überprüfungsprozess warten zu müssen.

Die Integration von Capgo in Ihre Quasar-App ist ein unkomplizierter Prozess, der es Ihnen ermöglicht, die Kraft von Echtzeit-Live-Updates zu nutzen. Diese Schritt-für-Schritt-Anleitung führt Sie durch die Integration und Implementierung von Capgo Live Update, damit Sie nahtlose Updates bereitstellen können.

**Registrieren Sie sich und greifen Sie auf das Capgo Dashboard zu**:

Es ist Zeit, sich zu registrieren und Ihren API-Schlüssel zu erhalten, um Ihre erste Version hochzuladen! Beginnen Sie, indem Sie sich [für ein Capgo-Konto registrieren](https://web.capgo.app/register/).

**Installieren Sie das Capgo SDK**:

Führen Sie von einer Kommandozeile aus direkt im Hauptverzeichnis Ihrer Capacitor-App Folgendes aus:

`npm i @capgo/capacitor-updater && npx cap sync` Um das Plugin in Ihre Capacitor-App zu installieren.

Fügen Sie dann diesen Code als Ersatz für CodePush in Ihre App ein:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Dies teilt dem nativen Plugin mit, dass die Installation erfolgreich war.

**Melden Sie sich bei Capgo CLOUD an**:

Verwenden Sie zunächst den `all` [API-Schlüssel](https://web.capgo.app/dashboard/apikeys/), der in Ihrem Konto vorhanden ist, um sich mit der CLI anzumelden:

    `npx @capgo/cli@latest login YOU_KEY`

**Fügen Sie Ihre erste App hinzu**:

Beginnen wir damit, eine App in Capgo Cloud mit der CLI zu erstellen.

```shell
    npx @capgo/cli@latest app add
```
Dieser Befehl verwendet alle in der Capacitor-Konfigurationsdatei definierten Variablen, um die App zu erstellen.

**Laden Sie Ihre erste Version hoch**:

Führen Sie den Befehl aus, um Ihren Code zu erstellen und an Capgo zu senden:

```shell
npx @capgo/cli@latest bundle upload`
```

Standardmäßig wird der Versionsname der in Ihrer package.json-Datei sein.

Überprüfen Sie in [Capgo](https://web.capgo.app/login/), ob der Build vorhanden ist.

Sie können es sogar mit meiner [mobilen Sandbox-App](https://capgo.app/app_mobile/) testen.

**Machen Sie den Kanal zum Standard**:

Nachdem Sie Ihre App an Capgo gesendet haben, müssen Sie Ihren Kanal zum Standard machen, damit Apps Updates von Capgo erhalten können.

`npx @capgo/cli@latest channel set production -s default`

**Konfigurieren Sie die App zur Validierung von Updates**:

Fügen Sie diese Konfiguration zu Ihrer Haupt-JavaScript-Datei hinzu:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Führen Sie dann `npm run build && npx cap copy` aus, um Ihre App zu aktualisieren.

**Empfangen Sie ein Live Update**:

Damit Ihre Anwendung ein Live-Update von Deploy empfangen kann, müssen Sie die App auf einem Gerät oder einem Emulator ausführen. Der einfachste Weg dazu ist, den folgenden Befehl zu verwenden, um Ihre lokale App in einem Emulator oder auf einem mit Ihrem Computer verbundenen Gerät zu starten.npx cap run [ios | android]

Öffnen Sie die App, setzen Sie sie in den Hintergrund und öffnen Sie sie erneut. Sie sollten in den Protokollen sehen, dass die App das Update durchgeführt hat.

Glückwunsch! 🎉 Sie haben erfolgreich Ihr erstes Live Update bereitgestellt. Dies ist nur der Anfang dessen, was Sie mit Live Updates machen können. Um mehr zu erfahren, sehen Sie sich die vollständigen [Live Updates Docs](https://capgoapp/docs/plugin/cloud-mode/getting-started/) an.

## Verwendung von Capacitor Plugins

Lassen Sie uns einen Blick darauf werfen, wie man ein Capacitor Plugin in Aktion verwendet, was wir bereits einige Male erwähnt haben. Dazu können wir ein recht einfaches Plugin installieren, indem wir Folgendes ausführen:

```shell
npm i @capacitor/share
```

Es gibt nichts Besonderes am [Share Plugin](https://capacitorjscom/docs/apis/share/), aber es ruft trotzdem den nativen Teilen-Dialog auf! Dafür müssen wir jetzt nur noch das Paket importieren und die entsprechende `share()`-Funktion aus unserer App aufrufen. Ändern wir also die **pages/indexvue** wie folgt:

```html
<template>
  <div>
    <h1>Welcome to Quasar and Capacitor!</h1>
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

Wie bereits erwähnt, müssen wir beim Installieren neuer Plugins einen Synchronisierungsvorgang durchführen und dann die App erneut auf unserem Gerät bereitstellen. Führen Sie dazu den folgenden Befehl aus:

```
npx cap sync
```

Nach dem Drücken der Schaltfläche können Sie den wunderschönen nativen Teilen-Dialog in Aktion erleben!

## Optionale Hinzufügung von Konsta UI

Um Konsta UI in Ihrer Quasar-App zu verwenden, müssen Sie [Tailwind bereits installiert haben](https://tailwindcsscom/docs/installation/) und das Paket installieren:

```shell
npm i konsta
```

Zusätzlich müssen Sie Ihre `tailwindconfigjs`-Datei ändern:

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

`konstaConfig` wird die Standard-Tailwind-CSS-Konfiguration (oder Ihre benutzerdefinierte) mit einigen zusätzlichen Varianten und Hilfsfunktionen erweitern, die für Konsta UI erforderlich sind.

Jetzt müssen wir die Haupt-[App](https://konstauicom/vue/app/)-Komponente einrichten, damit wir einige globale Parameter (wie `theme`) festlegen können.

Wir müssen die gesamte App in `pages/_appvue` mit `App` umschließen:

```html
<template>
  <App theme="ios">
    <Quasar />
  </App>
</template>

<script setup>
import { App } from 'konsta/vue';
</script>
```

### Beispielseite

Jetzt, da alles eingerichtet ist, können wir Konsta UI Vue-Komponenten in unseren Quasar-Seiten verwenden.

Öffnen wir zum Beispiel `pages/indexvue` und ändern sie wie folgt:

```html
<template>
  <Page>
    <Navbar title="My App" />

    <Block strong>
      <p>
        Here is your Quasar & Konsta UI app. Let's see what we have here.
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

Wenn die Live-Aktualisierung nach der Installation aller notwendigen Komponenten nicht synchron ist, versuchen Sie, alles neu zu starten. Sobald Sie das getan haben, sollten Sie eine mobile App mit einem einigermaßen nativen Aussehen sehen, die mit Quasar und Capacitor erstellt wurde!

## Fazit

Capacitor ist eine ausgezeichnete Option zum Erstellen nativer Anwendungen auf Basis eines bestehenden Webprojekts und bietet eine einfache Möglichkeit, Code zu teilen und eine konsistente Benutzeroberfläche beizubehalten.

Und mit der Ergänzung von [Capgo](https://capgoapp/) ist es noch einfacher, Live-Updates zu Ihrer App hinzuzufügen und sicherzustellen, dass Ihre Benutzer immer Zugriff auf die neuesten Funktionen und Fehlerbehebungen haben.

Wenn Sie erfahren möchten, wie Sie Capgo zu Ihrer Nextjs-App hinzufügen können, werfen Sie einen Blick auf den nächsten Artikel: