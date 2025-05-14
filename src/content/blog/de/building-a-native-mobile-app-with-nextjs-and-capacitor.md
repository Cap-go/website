---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  2025 Native Mobile Apps mit Next.js 15 und Capacitor erstellen: Ein
  Schritt-für-Schritt-Leitfaden
description: >-
  Lernen Sie, wie man native mobile Apps mit Next.js 15 und Capacitor in diesem
  umfassenden Leitfaden erstellt. Entdecken Sie die neuesten Best Practices und
  Techniken zur Erstellung von leistungsstarken, funktionsreichen mobilen
  Anwendungen.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2025-05-12T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 15 und Capacitor Illustration
keywords: >-
  Next.js 15, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
## Einführung

In diesem Tutorial werden wir erkunden, wie man native mobile Apps mithilfe der leistungsstarken Kombination aus [Next.js](https://nextjs.org/) 15 und [Capacitor](https://capacitorjs.com/) im Jahr 2024 erstellen kann. Durch die Nutzung der neuesten Versionen dieser Technologien können Sie leistungsstarke, funktionsreiche mobile Anwendungen problemlos entwickeln. Wir werden auch demonstrieren, wie man die mobile Benutzeroberfläche mit [Konsta UI](https://konstaui.com/) und Tailwind CSS verbessert, obwohl dieser Schritt optional ist.

Next.js, ein beliebtes React-Framework, bietet eine solide Grundlage für den Aufbau von Webanwendungen, während Capacitor es Ihnen ermöglicht, Ihre Next.js-App ohne wesentliche Änderungen oder das Erlernen neuer Fähigkeiten wie React Native in eine native mobile App zu transformieren. Dieses Tutorial wird Sie durch den Prozess führen, beginnend mit der Einrichtung einer neuen Next.js-App und der Integration von Capacitor, um ein natives mobiles Erlebnis zu schaffen.

### Vorteile der Verwendung von Next.js und Capacitor

- **Code-Wiederverwendbarkeit**: Next.js ermöglicht es Ihnen, wiederverwendbare Komponenten zu schreiben und Code zwischen Ihren Web- und mobilen Apps zu teilen, was Zeit und Aufwand bei der Entwicklung spart.
- **Leistung**: Next.js bietet integrierte Leistungsoptimierungen, wie z. B. serverseitiges Rendering und Code-Splitting, um schnelle Ladezeiten und eine reibungslose Benutzererfahrung sicherzustellen.
- **Native Funktionen**: Capacitor bietet Zugriff auf native Gerätefunktionen wie die Kamera, Geolokalisierung und mehr, sodass Sie funktionsreiche mobile Apps entwickeln können.
- **Vereinfachte Entwicklung**: Mit Capacitor können Sie Ihre mobile App unter Verwendung vertrauter Webtechnologien entwickeln und testen, wodurch die Lernkurve verringert und der Entwicklungsprozess gestrafft wird.

## Vorbereitung Ihrer Next.js-App

Um zu beginnen, erstellen wir eine neue Next.js-Anwendung mit dem Befehl `create-next-app`:

```shell
npx create-next-app@latest my-app
```

Dieser Befehl richtet ein leeres Next.js-Projekt mit der empfohlenen Konfiguration für die neueste Version ein.

Navigieren Sie als Nächstes in das Projektverzeichnis:

```shell
cd my-app
```

Um eine native mobile App zu erstellen, müssen wir einen statischen Export unseres Next.js-Projekts generieren. Aktualisieren Sie die Datei `package.json`, um ein Skript zum Bauen und Exportieren des Projekts einzuschließen:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "static": "NEXT_PUBLIC_IS_MOBILE=true next build"
  }
}
```

Das Ausführen des Befehls `npm run static` kann aufgrund von Inkompatibilitäten bei der Bildoptimierung zu Fehlern führen. Um dies zu beheben, öffnen Sie die Datei `next.config.js` und ändern Sie sie wie folgt:

```javascript
/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const nextConfig = {
    ...(isMobile ? {output: 'export'} : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

Jetzt sollte das Ausführen von `npm run static` ohne Probleme funktionieren, und Sie finden einen neuen Ordner `out` im Stammverzeichnis Ihres Projekts. Dieser Ordner wird von Capacitor in den nächsten Schritten verwendet.

## Hinzufügen von Capacitor zu Ihrer Next.js 15-App

Um Ihre Next.js-App in einen nativen mobilen Container zu verpacken, folgen Sie diesen Schritten:

1. Installieren Sie die [Capacitor CLI](https://capacitorjs.com/docs/cli/) als Entwicklungsabhängigkeit:

```shell
npm install -D @capacitor/cli
```

2. Initialisieren Sie Capacitor in Ihrem Next.js-Projekt:

```shell
npx cap init
```

Während des Initialisierungsprozesses können Sie "Enter" drücken, um die Standardwerte für den App-Namen und die Bundle-ID zu akzeptieren.

3. Installieren Sie die benötigten Capacitor-Pakete:

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

4. Fügen Sie die nativen Plattformen hinzu:

```shell
npx cap add ios
npx cap add android
```

Capacitor erstellt Ordner für jede Plattform (`ios` und `android`) im Stammverzeichnis Ihres Projekts. Diese Ordner enthalten die nativen Projekte für iOS und Android.

Um auf das Android-Projekt zuzugreifen und es zu erstellen, müssen Sie [Android Studio](https://developer.android.com/studio) installiert haben. Für die iOS-Entwicklung benötigen Sie einen Mac mit [Xcode](https://developer.apple.com/xcode/) installiert.

5. Konfigurieren Sie Capacitor:

Öffnen Sie die Datei `capacitor.config.ts` und aktualisieren Sie die Eigenschaft `webDir`, um auf das Ausgabeverzeichnis Ihres Next.js-Baus zu verweisen:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

6. Bauen und synchronisieren Sie Ihr Projekt:

```shell
npm run static
npx cap sync
```

Der Befehl `npm run static` baut Ihr Next.js-Projekt und exportiert die statischen Dateien, während `npx cap sync` den Webcode mit den nativen Plattformen synchronisiert.

## Erstellen und Bereitstellen von nativen Apps

Um Ihre native mobile App zu erstellen und bereitzustellen, folgen Sie diesen Schritten:
Um iOS-Apps zu entwickeln, müssen Sie **Xcode** installiert haben, und für Android-Apps benötigen Sie **Android Studio**. Zudem, wenn Sie planen, Ihre App im App Store zu verteilen, müssen Sie sich für das Apple Developer Program für iOS und die Google Play Console für Android anmelden.

1. Öffnen Sie die nativen Projekte:

Für iOS:
```shell
npx cap open ios
```

Für Android:
```shell
npx cap open android
```

2. Bauen und starten Sie die App:

![android-studio-run](/android-studio-run.webp)

- Warten Sie in Android Studio, bis das Projekt bereit ist, und klicken Sie dann auf die Schaltfläche "Ausführen", um die App auf einem verbundenen Gerät oder Emulator bereitzustellen.
![xcode-run](/xcode-run.webp)

- Richten Sie in Xcode Ihr Signing-Konto ein, um die App auf einem echten Gerät bereitzustellen. Wenn Sie dies noch nie zuvor getan haben, führt Sie Xcode durch den Prozess (beachten Sie, dass Sie für das Apple Developer Program angemeldet sein müssen). Sobald es eingerichtet ist, klicken Sie auf die Schaltfläche "Play", um die App auf Ihrem verbundenen Gerät auszuführen.

Herzlichen Glückwunsch! Sie haben Ihre Next.js-Webanwendung erfolgreich auf einem mobilen Gerät bereitgestellt.

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="nextjs-mobile-app">
</div>
Aber halt, es gibt auch einen schnelleren Weg, dies während der Entwicklung zu tun...

## Capacitor Live Reload

Während der Entwicklung können Sie die Live-Neuladefunktion nutzen, um Änderungen sofort auf Ihrem mobilen Gerät zu sehen. Um diese Funktion zu aktivieren, folgen Sie diesen Schritten:

1. Finden Sie Ihre lokale IP-Adresse:

- Unter macOS führen Sie den folgenden Befehl im Terminal aus:
  ```shell
  ipconfig getifaddr en0
  ```

- Unter Windows führen Sie aus:
  ```shell
  ipconfig
  ```
  Suchen Sie die IPv4-Adresse in der Ausgabe.

2. Aktualisieren Sie die Datei `capacitor.config.ts`, um die Serverkonfiguration einzuschließen:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://YOUR_IP_ADDRESS:3000',
    cleartext: true,
  },
};

export default config;
```

Ersetzen Sie `YOUR_IP_ADDRESS` durch Ihre lokale IP-Adresse.

3. Wenden Sie die Änderungen auf Ihr natives Projekt an:

```shell
npx cap copy
```

Der Befehl `copy` kopiert den Webordner und die Konfigurationsänderungen in das native Projekt, ohne das gesamte Projekt zu aktualisieren.

4. Bauen und starten Sie die App auf Ihrem Gerät mit Android Studio oder Xcode.

Jetzt wird die mobile App automatisch neu geladen, um diese Änderungen widerzuspiegeln, wann immer Sie Änderungen an Ihrer Next.js-App vornehmen.

Hinweis: Wenn Sie neue Plugins installieren oder Änderungen an nativen Dateien vornehmen, müssen Sie das native Projekt neu bauen, da das Live-Neuladen nur auf Änderungen im Webcode angewendet wird.

## Verwendung von Capacitor-Plug-ins

Capacitor-Plug-ins ermöglichen den Zugriff auf native Gerätefunktionen aus Ihrer Next.js-App. Lassen Sie uns erkunden, wie man das [Share-Plugin](https://capacitorjs.com/docs/apis/share/) als Beispiel verwendet:

1. Installieren Sie das Share-Plugin:

```shell
npm i @capacitor/share
```

2. Aktualisieren Sie die Datei `pages/index.js`, um das Share-Plugin zu verwenden:

```javascript
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Share } from '@capacitor/share';

export default function Home() {
  const share = async () => {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Capgo!</a>
        </h1>

        <p className={styles.description}>
          <h2>Cool channel</h2>
          <button onClick={() => share()}>Share now!</button>
        </p>
      </main>
    </div>
  );
}
```

3. Synchronisieren Sie die Änderungen mit dem nativen Projekt:

Wie bereits erwähnt, müssen wir beim Installieren neuer Plugins eine Synchronisierungsoperation durchführen und dann die App auf unserem Gerät neu bereitstellen. Führen Sie dazu den folgenden Befehl aus:

```shell
npx cap sync
```

4. Bauen und starten Sie die App auf Ihrem Gerät.

Jetzt erscheint das native Freigabedialogfeld, wenn Sie auf die Schaltfläche "Jetzt teilen!" klicken, und ermöglicht es Ihnen, den Inhalt mit anderen Apps zu teilen.

<div className={styles.container}>
  <Head>
<title>

Um die Schaltfläche mobiltauglicher zu gestalten, können wir einige Stile hinzufügen, indem wir meine Lieblings-Benutzeroberflächenkomponentenbibliothek für Webanwendungen - Next.js (kein Wortspiel beabsichtigt) verwenden.

## Hinzufügen von Konsta UI

Ich habe jahrelang mit [Ionic](https://ionicframework.com/) gearbeitet, um großartige plattformübergreifende Anwendungen zu erstellen, und das war eine der besten Entscheidungen über Jahre hinweg.
Aber jetzt empfehle ich es nicht mehr, da es sehr kompliziert ist, es mit Next.js zu integrieren, und es nicht wirklich wert ist, wenn Sie bereits [tailwindcss](https://tailwindcss.com/) haben.

Wenn Sie eine wirklich großartig aussehende mobile Benutzeroberfläche wünschen, die sich an das iOS- und Android-spezifische Styling anpasst, empfehle ich Konsta UI.

Sie müssen [tailwind bereits installiert haben](https://tailwindcss.com/docs/guides/nextjs/) 
Um die mobile Benutzeroberfläche Ihrer Next.js-App zu verbessern, können Sie [Konsta UI](https://konstaui.com/) verwenden, eine mobilfreundliche UI-Komponentenbibliothek, die sich an das Styling von iOS und Android anpasst. Folgen Sie diesen Schritten, um Konsta UI zu integrieren:

1. Installieren Sie die erforderlichen Pakete:

```shell
npm i konsta
```

2. Aktualisieren Sie die Datei `tailwind.config.js`:

```javascript
const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
```

3. Wickeln Sie Ihre App mit der Konsta UI `App`-Komponente in `pages/_app.js`:

```javascript
import { App } from 'konsta/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <App theme="ios">
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
```
### Beispielseite

Jetzt, wo alles eingerichtet ist, können wir Konsta UI React-Komponenten in unseren Next.js-Seiten verwenden.

4. Aktualisieren Sie die Datei `pages/index.js`, um die Komponenten von Konsta UI zu verwenden:

```javascript
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  BlockTitle,
} from 'konsta/react';

export default function Home() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Here is your Next.js & Konsta UI app. Let's see what we have here.
        </p>
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List>
        <ListItem href="/about/" title="About" />
        <ListItem href="/form/" title="Form" />
      </List>

      <Block strong className="flex space-x-4">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Block>
    </Page>
  );
}
```

5. Starten Sie den Entwicklungsserver neu und bauen Sie die App.

Ihre Next.js-App sollte jetzt eine native mobile Benutzeroberfläche haben, die von Konsta UI unterstützt wird.

## Leistungsoptimierung

Um eine optimale Leistung Ihrer Next.js- und Capacitor-App sicherzustellen, sollten Sie die folgenden bewährten Methoden in Betracht ziehen:

- Minimieren Sie die App-Größe, indem Sie ungenutzte Abhängigkeiten und Assets entfernen.
- Optimieren Sie Bilder und andere Mediendateien, um die Ladezeiten zu reduzieren.
- Implementieren Sie Lazy Loading für Komponenten und Seiten, um die Leistung beim ersten Laden zu verbessern.
- Verwenden Sie serverseitiges Rendering (SSR) mit Next.js, um die Ladegeschwindigkeit der App und die Suchmaschinenoptimierung (SEO) zu verbessern.
- Nutzen Sie die integrierten Optimierungen von Capacitor, wie z. B. Caching des Webviews und App-Bundling.

## Fazit

In diesem Tutorial haben wir erkundet, wie man native mobile Apps mit Next.js und Capacitor erstellt. Durch die Nutzung der Leistungsfähigkeit dieser Technologien können Sie problemlos leistungsstarke, funktionsreiche mobile Anwendungen erstellen.

Wir haben die Schritte zum Einrichten einer Next.js-App, zur Integration von Capacitor und zum Erstellen und Bereitstellen der App auf mobilen Geräten behandelt. Außerdem haben wir die Verwendung von Capacitor-Plugins, die Hinzufügung von Konsta UI für eine verbesserte mobile Benutzeroberfläche und Techniken zur Leistungsoptimierung besprochen.

Um Ihre Next.js- und Capacitor-App auf die nächste Stufe zu bringen, sollten Sie [Capgo](https://capgo.app/) für nahtlose Live-Updates in Betracht ziehen, damit Ihre Benutzer stets Zugang zu den neuesten Funktionen und Fehlerbehebungen haben.

Durch die Befolgung der in diesem Leitfaden dargelegten bewährten Methoden und Techniken sind Sie bestens gerüstet, um beeindruckende native mobile Apps mit Next.js und Capacitor zu erstellen.

## Ressourcen

- [Next.js Dokumentation](https://nextjs.org/docs)
- [Capacitor Dokumentation](https://capacitorjs.com/docs)
- [Konsta UI Dokumentation](https://konstaui.com/docs)
- [Capgo - Live-Updates für Capacitor-Apps](https://capgo.app/)

Viel Spaß beim Erstellen von Apps!

Erfahren Sie, wie Capgo Ihnen helfen kann, bessere Apps schneller zu bauen, [melden Sie sich noch heute für ein kostenloses Konto an](/register/).
