---
slug: creating-mobile-apps-with-react-and-capacitor
title: Mobile Apps mit Pure React.js und Capacitor entwickeln
description: >-
  Ein Leitfaden zur Umwandlung einer React.js-Webanwendung in eine native mobile
  App mit Capacitor und zur Verbesserung der nativen Benutzeroberfläche mit
  Konsta UI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-29T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React.js und Capacitor Illustration
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: de
next_blog: implementing-live-updates-in-your-react-capacitor-app
---

Das Tutorial führt Sie durch die Entwicklung einer mobilen Anwendung mit React, Capacitor und Konsta UI. Am Ende werden Sie wissen, wie Sie eine Reactjs Web-App mit Capacitor in eine native mobile Anwendung umwandeln und eine native Benutzeroberfläche mit Konsta UI implementieren können.

Capacitor ermöglicht die einfache Umwandlung Ihrer Reactjs Web-App in eine native mobile Anwendung, ohne dass wesentliche Änderungen oder das Erlernen neuer Strategien wie React Native erforderlich sind.

Der Prozess umfasst einige einfache Schritte, und schon bald wird Ihre Reactjs-App eine voll funktionsfähige mobile Anwendung sein. Bleiben Sie also dabei, während wir Sie auf dieser Reise begleiten.

## Capacitor Überblick

Capacitor ist ein Game-Changer. Es lässt sich nahtlos in jedes Web-Projekt integrieren und verpackt Ihre App in eine native Webview, während es das native Xcode- und Android Studio-Projekt generiert. Außerdem können Sie über seine Plugins auf native Gerätefunktionen wie die Kamera über eine JS-Brücke zugreifen.

Capacitor bietet einen unkomplizierten Weg, eine native mobile Anwendung ohne Aufwand oder steile Lernkurve zu erstellen. Seine einfache API und optimierte Funktionalität machen es leicht, es in Ihr Projekt zu integrieren.

## Einrichten Ihrer Reactjs-App

Gehen wir den einfachsten Weg, eine React-Anwendung zu starten. Wir verwenden den npm Package Manager, um eine neue React-App zu erstellen:

```shell
npx create-react-app my-app
```

Um unser Projekt in eine native mobile App umzuwandeln, ist ein **Export** unserer App erforderlich.

Darauf kommen wir gleich zurück. Zunächst wollen wir verstehen, wie wir Capacitor in unsere React-App integrieren.

## Integration von Capacitor in Ihre Reactjs-App

Die ersten Einrichtungsschritte mögen etwas detailliert sein, aber danach wird das Aktualisieren Ihres nativen App-Wrappers so einfach wie das Ausführen eines `sync`-Befehls.

Zuerst installieren wir die Capacitor CLI als Entwicklungsabhängigkeit und richten sie in unserem Projekt ein. Akzeptieren Sie während der Einrichtung die Standardwerte für Name und Bundle-ID durch Drücken von "Enter".

Als nächstes installieren wir das Core-Paket und die relevanten Pakete für die iOS- und Android-Plattformen.

Schließlich fügen wir die Plattformen hinzu, und Capacitor erstellt Ordner für jede Plattform in unserem Projekt-Root:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your React project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Die Verzeichnisse **ios** und **android** befinden sich jetzt in Ihrem Reactjs-Projekt.

Um später auf das Android-Projekt zuzugreifen, installieren Sie [Android Studio](https://developer.android.com/studio/). Für iOS benötigen Sie einen Mac und sollten [Xcode](https://developer.apple.com/xcode/) installieren.

Aktualisieren Sie als nächstes das **webDir** in Ihrer **capacitor.config.json** Datei wie unten gezeigt:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "build",
  "bundledWebRuntime": false
}
```

Führen Sie den Build-Befehl aus und synchronisieren Sie Ihr Projekt mit Capacitor:

```shell
npm run build
npx cap sync
```

Der `npm run build`-Befehl wird Ihr Reactjs-Projekt bauen, während `npx cap sync` den Web-Code an den richtigen Stellen der nativen Plattformen ausrichtet, damit sie in einer App ausgeführt werden können.

Jetzt sollte Ihre Reactjs-App mit etwas Glück und ohne Fehler bereit sein, auf einem Gerät gestartet zu werden!

## Erstellen und Bereitstellen Ihrer nativen Apps

Für die Entwicklung von iOS-Apps wird **Xcode** benötigt, und für Android-Apps **Android Studio**. Wenn Sie Ihre App im App Store vertreiben möchten, müssen Sie sich für iOS im Apple Developer Program und für Android in der Google Play Console registrieren.

Die Capacitor CLI vereinfacht den Prozess des Öffnens beider nativer Projekte:

```shell
npx cap open ios
npx cap open android
```

Sobald Ihre nativen Projekte eingerichtet sind, ist das Bereitstellen Ihrer App auf einem verbundenen Gerät ein unkomplizierter Prozess.

Für Android Studio warten Sie, bis alles geladen ist, und stellen dann Ihre App auf einem verbundenen Gerät bereit.

Für Xcode richten Sie Ihr Signing-Konto ein, um Ihre App auf einem echten Gerät anstatt nur im Simulator bereitzustellen. Danach drücken Sie einfach auf Play, um die App auf Ihrem verbundenen Gerät auszuführen, das Sie oben auswählen können.

Wenn alles gut gelaufen ist, haben Sie Ihre React-App konvertiert.js Web-App in eine native mobile Anwendung!

## Capacitor Live Reload

Moderne Entwicklungs-Frameworks bieten normalerweise Hot Reload, und glücklicherweise können Sie dasselbe mit Capacitor, aber **auf Ihrem mobilen Gerät** haben!

Sie können Ihre lokal gehostete Anwendung mit Live Reload in Ihrem Netzwerk zugänglich machen, indem Sie die Capacitor-App den Inhalt von einer bestimmten URL laden lassen

Ermitteln Sie zunächst Ihre lokale IP-Adresse. Auf einem Mac können Sie dies durch Ausführen von `ipconfig getifaddr en0` im Terminal tun. Unter Windows führen Sie `ipconfig` aus und suchen nach der IPv4-Adresse

Weisen Sie danach Capacitor an, die App direkt vom Server zu laden, indem Sie einen weiteren Parameter zu Ihrer `capacitorconfig.ts` Datei hinzufügen:

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Stellen Sie sicher, dass Sie die korrekte IP und Port verwenden. Führen Sie `npx cap copy` aus, um diese Änderungen auf unser natives Projekt anzuwenden

Wenn Sie Ihre App noch einmal über Android Studio oder Xcode bereitstellen, werden alle Änderungen in Ihrer React-App automatisch neu geladen und in Ihrer App angezeigt!

Beachten Sie, dass wenn neue Plugins installiert werden, wie zum Beispiel die Kamera, ein Neuaufbau Ihres nativen Projekts erforderlich ist. Dies liegt daran, dass sich die nativen Dateien geändert haben und nicht im laufenden Betrieb aktualisiert werden können

## Verwendung von Capacitor Plugins

Schauen wir uns kurz an, wie man ein Capacitor-Plugin verwendet. Installieren wir ein einfaches Plugin, das [Share Plugin](https://capacitorjs.com/docs/apis/share/), welches den nativen Share-Dialog aufruft:

```shell
npm i @capacitor/share
```

Um es zu verwenden, importieren Sie das Paket und rufen Sie die entsprechende `share()`-Funktion aus unserer App auf. Betrachten Sie die **App.js**:

```javascript
import { Share } from '@capacitor/share';

function ShareButton() {
  const share = async () => {
    await Share.share({
      title: 'React App',
      text: 'Visit this React App',
      url: 'http://localhost:3000',
      dialogTitle: 'Share with...'
    });
  };

  return (
    <button onClick={share}>
      Share
    </button>
  );
}

export default ShareButton;
```

Nach der Installation eines neuen Plugins denken Sie daran, Ihr React-Projekt erneut mit `npx cap sync` zu synchronisieren

## Implementierung von Konsta UI: Bessere Mobile UI

Für eine bessere mobile UI-Erfahrung verwenden wir Konsta UI. Es bietet iOS- und Android-spezifisches Styling und ist einfach zu verwenden

Um Konsta UI zu verwenden, installieren Sie das React-Paket:

```shell
npm i konsta
```

Modifizieren Sie Ihre `tailwind.config.js` Datei wie folgt:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/**/*.{js,ts,javascript,tsx}',
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

`konstaConfig` wird Ihre aktuelle Tailwind CSS-Konfiguration um zusätzliche Varianten und Utilities ergänzen, die für Konsta UI erforderlich sind

Richten Sie nun die primäre App-Komponente ein, um globale Parameter wie `theme` festzulegen. Umschließen Sie die Haupt-App mit App in der `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from 'konsta/react';
import './index.css';
import MyApp from './App';

ReactDOM.render(
  <React.StrictMode>
    <App theme="ios">
      <MyApp />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Verwenden wir Konsta UI React-Komponenten in unseren React.js-Seiten. Öffnen Sie `src/App.js` und ändern Sie sie zu:

```javascript
// Konsta UI components
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
} from 'konsta/react';

export default function MyApp() {
  return (
    <Page>
      <Navbar title="My App" />

      <Block strong>
        <p>
          Welcome to your React & Konsta UI app.
        </p>
      </Block>
      
      <List>
        <ListItem href="/about" title="About" />
      </List>

      <Block strong>
        <Button>Click Me</Button>
      </Block>
    </Page>
  );
}
```

Wenn alles richtig gemacht wurde, sollten Sie eine nahtlose Integration zwischen React und Konsta UI sehen, die Ihrer mobilen App ein natives Aussehen verleiht

## Fazit

Capacitor bietet eine nahtlose Möglichkeit, native Apps basierend auf einem bestehenden Webprojekt zu erstellen und bietet eine einfache Möglichkeit, Code zu teilen und eine konsistente Benutzeroberfläche zu haben

Dank Technologien wie Capacitor war es noch nie einfacher, mobile Anwendungen aus React.js-Web-Apps zu erstellen. Bringen Sie Ihre Webentwicklungsfähigkeiten auf die nächste Stufe, indem Sie beeindruckende native mobile Apps erstellen. Viel Spaß beim Programmieren!

Erfahren Sie mehr darüber, wie Sie Ihren App-Entwicklungsprozess beschleunigen können, [registrieren Sie sich noch heute für ein kostenloses Konto](/register/)