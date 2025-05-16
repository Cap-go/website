---
slug: angular-mobile-app-capacitor
title: Mobile Apps mit Angular und Capacitor entwickeln
description: >-
  Lernen Sie, wie Sie eine mobile App mit Angular, Capacitor und verbesserter
  nativer Benutzeroberfläche mit Konsta UI erstellen.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Angular und Capacitor Illustration
keywords: >-
  Angular, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Here's the German translation:

In diesem Tutorial beginnen wir mit einer neuen [Angular](https://angulario/) App und wechseln in den Bereich der nativen mobilen Apps mit Capacitor. Optional können Sie auch [Konsta UI](https://konstauicom/) für eine verbesserte mobile Benutzeroberfläche mit Tailwind CSS hinzufügen.

Capacitor ermöglicht es Ihnen, Ihre Angular Web-Anwendung einfach in eine native mobile App umzuwandeln, ohne dass erhebliche Änderungen oder das Erlernen einer neuen Technologie wie React Native erforderlich sind.

Mit nur wenigen einfachen Schritten können die meisten Angular-Anwendungen in mobile Apps umgewandelt werden.

Dieses Tutorial führt Sie durch den Prozess, beginnend mit einer neuen Angular-App und der anschließenden Integration von Capacitor, um in den Bereich der nativen mobilen Apps zu wechseln. Zusätzlich können Sie optional [Konsta UI](https://konstauicom/) verwenden, um Ihre mobile Benutzeroberfläche mit Tailwind CSS zu verbessern.

## Über Capacitor

Capacitor ist ein echter Durchbruch! Sie können es mühelos in jedes Webprojekt integrieren, und es verpackt Ihre Anwendung in eine native Webview, wobei das native Xcode- und Android Studio-Projekt für Sie generiert wird. Außerdem bieten seine Plugins über eine JS-Brücke Zugriff auf native Gerätefunktionen wie die Kamera.

Mit Capacitor erhalten Sie eine fantastische native mobile App ohne kompliziertes Setup oder steile Lernkurve. Seine schlanke API und optimierte Funktionalität machen die Integration in Ihr Projekt zum Kinderspiel. Glauben Sie mir, Sie werden erstaunt sein, wie mühelos es ist, mit Capacitor eine voll funktionsfähige native App zu erstellen!

## Vorbereitung Ihrer Angular-App

Um eine neue Angular-App zu erstellen, führen Sie den folgenden Befehl aus:

```shell
ng new my-app
cd my-app
```

Wählen Sie "Angular", wenn Sie nach der Angular-Version gefragt werden.

Für eine native mobile App benötigen wir einen **Export** unseres Projekts. Fügen wir also ein einfaches Skript in unserer **package.json** hinzu, das zum Bauen und Kopieren des Angular-Projekts verwendet werden kann:

```json
{
  "scripts": {
    // ...
    "build": "ng build --prod"
  }
}
```

Nach Ausführung des Befehls `build` sollten Sie einen neuen `dist`-Ordner im Wurzelverzeichnis Ihres Projekts sehen können.

Dieser Ordner wird später von Capacitor verwendet, aber zunächst müssen wir ihn korrekt einrichten.

## Hinzufügen von Capacitor zu Ihrer Angular-App

Um eine Web-App in einen nativen mobilen Container zu verpacken, müssen wir einige anfängliche Schritte befolgen, aber danach ist es so einfach wie das Ausführen eines einzelnen `sync`-Befehls.

Zunächst können wir die [Capacitor CLI](https://capacitorjs.com/docs/cli/) als Entwicklungsabhängigkeit installieren und sie dann in unserem Projekt einrichten. Während der Einrichtung können Sie "Enter" drücken, um die Standardwerte für Name und Bundle-ID zu akzeptieren.

Als Nächstes müssen wir das Core-Paket und die relevanten Pakete für die iOS- und Android-Plattformen installieren.

Schließlich können wir die Plattformen hinzufügen, und Capacitor wird für jede Plattform Ordner im Wurzelverzeichnis unseres Projekts erstellen:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your Angular project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

Zu diesem Zeitpunkt sollten Sie neue **ios**- und **android**-Ordner in Ihrem Angular-Projekt sehen können.

**Das sind echte native Projekte!**

Um später auf das Android-Projekt zugreifen zu können, müssen Sie [Android Studio](https://developer.android.com/studio/) installieren. Für iOS benötigen Sie einen Mac und sollten [Xcode](https://developer.apple.com/xcode/) installieren.

Zusätzlich sollten Sie eine **capacitor.config.ts**-Datei in Ihrem Projekt finden, die einige grundlegende Capacitor-Einstellungen enthält, die während der Synchronisation verwendet werden. Das Einzige, worauf Sie achten müssen, ist das **webDir**, das auf das Ergebnis Ihres Build-Befehls zeigen muss. Derzeit ist es nicht korrekt.

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
npm run build
npx cap sync
```

Der erste Befehl `npm run build` wird einfach Ihr Angular-Projekt bauen und den statischen Build kopieren, während der zweite Befehl `npx cap sync` den gesamten Web-Code an die richtigen Stellen der nativen Plattformen synchronisiert, damit sie in einer App angezeigt werden können.

Zusätzlich könnte der Sync-Befehl die nativen Plattformen aktualisieren und Plugins installieren, also wenn Sie neue [Capacitor-Plugins](https://capacitorjs.com/docs/plugins/) installieren, ist es Zeit, erneut `npx cap sync` auszuführen.Ohne es zu bemerken, sind Sie jetzt tatsächlich fertig. Lassen Sie uns die App also auf einem Gerät anschauen!

## Native Apps erstellen und bereitstellen

Für die Entwicklung von iOS-Apps benötigen Sie **Xcode**, und für Android-Apps benötigen Sie **Android Studio**. Außerdem müssen Sie, wenn Sie Ihre App im App Store vertreiben möchten, am Apple Developer Program für iOS und an der Google Play Console für Android teilnehmen.

Wenn Sie neu in der nativen Mobilentwicklung sind, können Sie mit der Capacitor CLI ganz einfach beide nativen Projekte öffnen:

```shell
npx cap open ios
npx cap open android
```

Sobald Sie Ihre nativen Projekte eingerichtet haben, ist die Bereitstellung Ihrer App auf einem verbundenen Gerät einfach. In Android Studio müssen Sie nur warten, bis alles bereit ist, und Sie können Ihre App ohne Änderung von Einstellungen auf einem verbundenen Gerät bereitstellen. Hier ein Beispiel:

![android-studio-run](/android-studio-run.webp)

In Xcode müssen Sie Ihr Signing-Konto einrichten, um Ihre App auf einem echten Gerät und nicht nur im Simulator bereitzustellen. Wenn Sie das noch nie gemacht haben, führt Sie Xcode durch den Prozess (aber auch hier müssen Sie am Developer Program teilnehmen). Anschließend können Sie einfach auf "Play" drücken, um die App auf Ihrem verbundenen Gerät auszuführen, das Sie oben auswählen können. Hier ein Beispiel:

![xcode-run](/xcode-run.webp)

Herzlichen Glückwunsch! Sie haben Ihre Angular Web-App erfolgreich auf einem mobilen Gerät bereitgestellt. Hier ein Beispiel:

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

Aber warten Sie, es gibt auch einen schnelleren Weg während der Entwicklung.

## Capacitor Live Reload

Inzwischen sind Sie wahrscheinlich daran gewöhnt, Hot Reload bei allen modernen Frameworks zu haben, und die gute Nachricht ist, dass Sie die gleiche Funktionalität **auf einem mobilen Gerät** mit minimalem Aufwand haben können!

Aktivieren Sie den Zugriff auf Ihre lokal gehostete Anwendung mit Live Reload **in Ihrem Netzwerk**, indem Sie die Capacitor-App den Inhalt von der spezifischen URL laden lassen.

Der erste Schritt ist, Ihre lokale IP-Adresse herauszufinden. Wenn Sie einen Mac verwenden, können Sie dies mit folgendem Befehl im Terminal herausfinden:

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
    url: 'http://192.168.x.xx:4200',
    cleartext: true
  }
};

export default config;
```

Stellen Sie sicher, dass Sie **die richtige IP und Port** verwenden. Ich habe in diesem Beispiel den Standard-Angular-Port verwendet.

Jetzt können wir diese Änderungen übernehmen, indem wir sie in unser natives Projekt kopieren:

```shell
npx cap copy
```

Der `copy`-Befehl ist ähnlich wie `sync`, kopiert aber nur **die Änderungen am Webordner** und an der Konfiguration, ohne das native Projekt zu aktualisieren.

Sie können Ihre App jetzt noch einmal über Android Studio oder Xcode bereitstellen. Danach wird die App **automatisch neu geladen** und zeigt die Änderungen an, wenn Sie etwas in Ihrer Angular-App ändern!

**Beachten Sie**, dass wenn Sie neue Plugins wie die Kamera installieren, dies immer noch einen Neuaufbau Ihres nativen Projekts erfordert. Dies liegt daran, dass native Dateien geändert werden und dies nicht im laufenden Betrieb erfolgen kann.

Beachten Sie, dass Sie die richtige IP und den richtigen Port in Ihrer Konfiguration verwenden sollten. Der obige Codeblock zeigt zu Demonstrationszwecken den Standard-Angular-Port.

## Verwendung von Capacitor Plugins

Schauen wir uns an, wie man ein Capacitor-Plugin in Aktion verwendet, das wir schon einige Male erwähnt haben. Dazu können wir ein recht einfaches Plugin installieren, indem wir Folgendes ausführen:

```shell
npm i @capacitor/share
```

Das [Share-Plugin](https://capacitorjs.com/docs/apis/share/) ist nichts Besonderes, aber es öffnet trotzdem den nativen Share-Dialog! Dafür müssen wir jetzt nur das Paket importieren und die entsprechende `share()`-Funktion aus unserer App aufrufen. Ändern wir also die **src/app/app.component.ts** wie folgt:

```typescript
import { Component } from '@angular/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  async share() {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  }
}
```

Wie bereits erwähnt, müssen wir beim Installieren neuer Plugins einen Sync-Vorgang durchführen und dann die App erneut auf unserem Gerät bereitstellen.Um dies zu tun, führen Sie den folgenden Befehl aus:

```
npx cap sync
```

Nach dem Klicken auf den Button können Sie den schönen nativen Teilen-Dialog in Aktion sehen!

## Konsta UI hinzufügen

Um Konsta UI in Ihrer Nuxt 3 App zu verwenden, müssen Sie [tailwind bereits installiert](https://tailwindcss.com/docs/guides/angular/) haben und das Paket installieren:

```shell
npm i konsta
```

Zusätzlich müssen Sie Ihre `tailwind.config.js` Datei anpassen:

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/**/*.{html,ts}',
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

`konstaConfig` erweitert die Standard (oder Ihre benutzerdefinierte) Tailwind CSS Konfiguration mit einigen zusätzlichen Varianten und Hilfsfunktionen, die für Konsta UI erforderlich sind.

Nun müssen wir die [App](https://konsta.ui.com/vue/app/) Hauptkomponente einrichten, damit wir einige globale Parameter (wie `theme`) festlegen können.

Wir müssen die gesamte App mit `App` in der `src/app/app.component.html` umschließen:

```html
<app>
  <h1>Welcome to Angular and Capacitor!</h1>
  <button (click)="share()">Share now!</button>
</app>
```

### Beispielseite

Nachdem alles eingerichtet ist, können wir Konsta UI Vue Komponenten in unseren Angular-Seiten verwenden.

Öffnen wir zum Beispiel `src/app/app.component.html` und ändern sie wie folgt:

```html
<app>
  <page>
    <navbar title="My App" />

    <block strong>
      <p>
        Here is your Angular & Konsta UI app. Let's see what we have here.
      </p>
    </block>
    <block-title>Navigation</block-title>
    <list>
      <list-item href="/about/" title="About" />
      <list-item href="/form/" title="Form" />
    </list>

    <block strong class="flex space-x-4">
      <button>Button 1</button>
      <button>Button 2</button>
    </block>
  </page>
</app>
```

Falls das Live-Reload nach der Installation aller notwendigen Komponenten nicht synchron ist, versuchen Sie, alles neu zu starten. Sobald Sie das getan haben, sollten Sie eine mobile App mit einem einigermaßen nativen Aussehen sehen, die mit Angular und Capacitor erstellt wurde!

Sie sollten folgende Seite als Ergebnis sehen:

<app>
  <h1>
</h1>

## Fazit

Capacitor ist eine ausgezeichnete Option zum Erstellen nativer Anwendungen basierend auf einem bestehenden Web-Projekt, die eine einfache Möglichkeit bietet, Code zu teilen und eine konsistente Benutzeroberfläche beizubehalten.

Und mit der Ergänzung von [Capgo](https://capgo.app/) ist es noch einfacher, Live-Updates zu Ihrer App hinzuzufügen, wodurch sichergestellt wird, dass Ihre Benutzer immer Zugriff auf die neuesten Funktionen und Fehlerbehebungen haben.

Wenn Sie erfahren möchten, wie Sie Capgo zu Ihrer Angular-App hinzufügen können, werfen Sie einen Blick auf den nächsten Artikel: