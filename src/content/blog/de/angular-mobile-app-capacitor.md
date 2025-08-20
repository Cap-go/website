---
slug: angular-mobile-app-capacitor
title: Mobile Apps mit Angular und Capacitor erstellen
description: >-
  Lernen Sie, wie Sie eine mobile App mit Angular, Capacitor und verbesserter
  nativer Benutzeroberfläche mit Konsta UI erstellen.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Angular- und Capacitor-Illustration
keywords: >-
  Angular, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
In diesem Tutorial beginnen wir mit einer neuen [Angular](https://angular.io/) App und wechseln mithilfe von Capacitor in den Bereich der nativen Mobile Apps. Optional können Sie auch [Konsta UI](https://konstaui.com/) für eine verbesserte mobile Benutzeroberfläche mit Tailwind CSS hinzufügen.

Capacitor ermöglicht es Ihnen, Ihre Angular-Webanwendung ohne größere Änderungen oder das Erlernen einer neuen Technologie wie React Native in eine native mobile App umzuwandeln.

Mit nur wenigen einfachen Schritten können die meisten Angular-Anwendungen in mobile Apps umgewandelt werden.

Dieses Tutorial führt Sie durch den Prozess, beginnend mit einer neuen Angular-App und der anschließenden Integration von Capacitor für native mobile Apps. Zusätzlich können Sie optional [Konsta UI](https://konstaui.com/) verwenden, um Ihre mobile Benutzeroberfläche mit Tailwind CSS zu verbessern.

## Über Capacitor

Capacitor ist ein echter Game-Changer! Sie können es mühelos in jedes Webprojekt integrieren, und es verpackt Ihre Anwendung in eine native Webview, wobei es das native Xcode- und Android Studio-Projekt für Sie generiert. Außerdem bieten seine Plugins über eine JS-Brücke Zugriff auf native Gerätefunktionen wie die Kamera.

Mit Capacitor erhalten Sie eine fantastische native mobile App ohne kompliziertes Setup oder steile Lernkurve. Seine schlanke API und optimierte Funktionalität machen die Integration in Ihr Projekt zum Kinderspiel. Glauben Sie mir, Sie werden erstaunt sein, wie mühelos Sie mit Capacitor eine voll funktionsfähige native App erstellen können!

## Vorbereitung Ihrer Angular App

Um eine neue Angular App zu erstellen, führen Sie folgenden Befehl aus:

```shell
ng new my-app
cd my-app
```

Wählen Sie "Angular" wenn Sie nach der Angular-Version gefragt werden.

Für eine native mobile App benötigen wir einen **Export** unseres Projekts. Daher fügen wir ein einfaches Skript in unserer **package.json** hinzu, das zum Erstellen und Kopieren des Angular-Projekts verwendet werden kann:

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

## Capacitor zu Ihrer Angular App hinzufügen

Um eine beliebige Web-App in einen nativen mobilen Container zu verpacken, müssen wir einige erste Schritte befolgen, danach ist es so einfach wie die Ausführung eines einzelnen `sync`-Befehls.

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

An diesem Punkt sollten Sie neue **ios**- und **android**-Ordner in Ihrem Angular-Projekt sehen können.

**Das sind echte native Projekte!**

Um später auf das Android-Projekt zugreifen zu können, müssen Sie [Android Studio](https://developer.android.com/studio/) installieren. Für iOS benötigen Sie einen Mac und sollten [Xcode](https://developer.apple.com/xcode/) installieren.

Zusätzlich sollten Sie eine **capacitor.config.ts**-Datei in Ihrem Projekt finden, die einige grundlegende Capacitor-Einstellungen enthält, die während der Synchronisation verwendet werden. Das Einzige, worauf Sie achten müssen, ist das **webDir**, das auf das Ergebnis Ihres Build-Befehls zeigen muss. Momentan ist es nicht korrekt.

Um dies zu korrigieren, öffnen Sie die **capacitor.config.json**-Datei und aktualisieren Sie das **webDir**:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "dist"
}
```

Sie können es ausprobieren, indem Sie folgende Befehle ausführen:

```shell
npm run build
npx cap sync
```

Der erste Befehl `npm run build` wird einfach Ihr Angular-Projekt erstellen und den statischen Build kopieren, während der zweite Befehl `npx cap sync` den gesamten Web-Code an die richtigen Stellen der nativen Plattformen synchronisiert, damit sie in einer App angezeigt werden können.

Zusätzlich könnte der Sync-Befehl die nativen Plattformen aktualisieren und Plugins installieren, also wenn Sie neue [Capacitor-Plugins](https://capacitorjs.com/docs/plugins/) installieren, ist es Zeit, erneut `npx cap sync` auszuführen.

Ohne es zu merken, sind Sie jetzt eigentlich fertig, also lassen Sie uns die App auf einem Gerät sehen!

## Native Apps erstellen und bereitstellen

Um iOS-Apps zu entwickeln, müssen Sie **Xcode** installiert haben, und für Android-Apps benötigen Sie **Android Studio**. Wenn Sie Ihre App im App Store vertreiben möchten, müssen Sie sich außerdem für iOS im Apple Developer Program und für Android in der Google Play Console registrieren.

Wenn Sie neu in der nativen Mobile-Entwicklung sind, können Sie die Capacitor CLI verwenden, um beide nativen Projekte einfach zu öffnen:

```shell
npx cap open ios
npx cap open android
```

Sobald Sie Ihre nativen Projekte eingerichtet haben, ist das Bereitstellen Ihrer App auf einem verbundenen Gerät einfach. In Android Studio müssen Sie nur warten, bis alles bereit ist, und Sie können Ihre App ohne Änderung von Einstellungen auf einem verbundenen Gerät bereitstellen. Hier ein Beispiel:

![android-studio-run](/android-studio-run.webp)

In Xcode müssen Sie Ihr Signing-Konto einrichten, um Ihre App auf einem echten Gerät anstatt nur im Simulator bereitzustellen. Wenn Sie dies noch nie gemacht haben, führt Sie Xcode durch den Prozess (aber auch hier müssen Sie im Developer Program registriert sein). Anschließend können Sie einfach auf Play drücken, um die App auf Ihrem verbundenen Gerät auszuführen, das Sie oben auswählen können. Hier ein Beispiel:

![xcode-run](/xcode-run.webp)

Herzlichen Glückwunsch! Sie haben Ihre Angular-Web-App erfolgreich auf einem mobilen Gerät bereitgestellt. Hier ein Beispiel:

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

Aber warten Sie, es gibt auch einen schnelleren Weg während der Entwicklung...

## Capacitor Live Reload

Mittlerweile sind Sie wahrscheinlich an Hot Reload bei allen modernen Frameworks gewöhnt, und die gute Nachricht ist, dass Sie die gleiche Funktionalität **auf einem mobilen Gerät** mit minimalem Aufwand haben können!

Ermöglichen Sie den Zugriff auf Ihre lokal gehostete Anwendung mit Live Reload **in Ihrem Netzwerk**, indem Sie die Capacitor-App den Inhalt von der spezifischen URL laden lassen.

Der erste Schritt ist, Ihre lokale IP-Adresse herauszufinden. Wenn Sie einen Mac verwenden, können Sie dies durch Ausführen des folgenden Befehls im Terminal herausfinden:

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

Stellen Sie sicher, dass Sie **die richtige IP und den richtigen Port** verwenden, ich habe in diesem Beispiel den Standard-Angular-Port verwendet.

Jetzt können wir diese Änderungen anwenden, indem wir sie in unser natives Projekt kopieren:

```shell
npx cap copy
```

Der `copy`-Befehl ist ähnlich wie `sync`, wird aber nur **die Änderungen am Web-Ordner** und der Konfiguration kopieren, ohne das native Projekt zu aktualisieren.

Sie können Ihre App jetzt noch einmal über Android Studio oder Xcode bereitstellen. Danach wird die App automatisch neu geladen und zeigt die Änderungen an, wenn Sie etwas in Ihrer Angular-App ändern!

**Beachten Sie**, dass wenn Sie neue Plugins wie die Kamera installieren, es immer noch einen Rebuild Ihres nativen Projekts erfordert. Dies liegt daran, dass native Dateien geändert werden und dies nicht im laufenden Betrieb erfolgen kann.

Beachten Sie, dass Sie die richtige IP und den richtigen Port in Ihrer Konfiguration verwenden sollten. Der obige Codeblock zeigt zu Demonstrationszwecken den Standard-Angular-Port.

## Verwendung von Capacitor Plugins

Schauen wir uns an, wie man ein Capacitor-Plugin in Aktion verwendet, das wir schon mehrmals erwähnt haben. Dazu können wir ein ziemlich einfaches Plugin installieren, indem wir Folgendes ausführen:

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

Wie bereits erwähnt, müssen wir bei der Installation neuer Plugins eine Synchronisation durchführen und dann die App erneut auf unserem Gerät bereitstellen. Führen Sie dazu folgenden Befehl aus:

```
npx cap sync
```

Nachdem Sie den Button gedrückt haben, können Sie den schönen nativen Share-Dialog in Aktion sehen!

## Konsta UI hinzufügen

Um Konsta UI in Ihrer Nuxt 3 App zu verwenden, müssen Sie [Tailwind bereits installiert haben](https://tailwindcss.com/docs/guides/angular/) und das Paket installieren:

```shell
npm i konsta
```

Zusätzlich müssen Sie Ihre `tailwind.config.js`-Datei modifizieren:

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

`konstaConfig` wird die Standard- (oder Ihre benutzerdefinierte) Tailwind CSS-Konfiguration um einige zusätzliche Varianten und Hilfsfunktionen erweitern, die für Konsta UI erforderlich sind.

Jetzt müssen wir die Haupt-[App](https://konstaui.com/vue/app/)-Komponente einrichten, damit wir einige globale Parameter (wie `theme`) festlegen können.

Wir müssen die gesamte App mit `App` in der `src/app/app.component.html` umschließen:

```html
<app>
  <h1>Welcome to Angular and Capacitor!</h1>
  <button (click)="share()">Share now!</button>
</app>
```

### Beispielseite

Jetzt, wo alles eingerichtet ist, können wir Konsta UI Vue-Komponenten in unseren Angular-Seiten verwenden.

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

Wenn der Live Reload nach der Installation aller notwendigen Komponenten nicht synchron ist, versuchen Sie, alles neu zu starten. Sobald Sie das getan haben, sollten Sie eine mobile App mit einem etwas nativen Look sehen, die mit Angular und Capacitor erstellt wurde!

Sie sollten folgende Seite als Ergebnis sehen:

<app>
  <h1>
</h1>

## Fazit

Capacitor ist eine ausgezeichnete Option zum Erstellen nativer Anwendungen auf Basis eines bestehenden Webprojekts und bietet eine einfache Möglichkeit, Code zu teilen und eine konsistente Benutzeroberfläche beizubehalten.

Und mit der Ergänzung von [Capgo](https://capgo.app/) ist es noch einfacher, Live-Updates zu Ihrer App hinzuzufügen und sicherzustellen, dass Ihre Benutzer immer Zugriff auf die neuesten Funktionen und Fehlerbehebungen haben.

Wenn Sie erfahren möchten, wie Sie Capgo zu Ihrer Angular-App hinzufügen können, werfen Sie einen Blick auf den nächsten Artikel:
