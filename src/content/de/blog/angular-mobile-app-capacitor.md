---
slug: angular-mobile-app-capacitor
title: Mobile Apps mit Angular und Capacitor entwickeln
description: >-
  Erfahren Sie, wie Sie eine mobile App mit Angular und Capacitor erstellen und
  die native Benutzeroberfläche mit Konsta UI verbessern.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Angular und Capacitor Illustration
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In diesem Tutorial beginnen wir mit einer neuen [Angular](https://angulario/) App und wechseln in die native mobile App-Welt mit Capacitor. Optional können Sie auch [Konsta UI](https://konstauicom/) für eine verbesserte mobile Benutzeroberfläche mit Tailwind CSS hinzufügen.

Capacitor ermöglicht es Ihnen, Ihre Angular-Webanwendung einfach in eine native mobile App umzuwandeln, ohne dass erhebliche Änderungen oder das Erlernen einer neuen Fähigkeit wie React Native erforderlich sind.

Mit nur wenigen einfachen Schritten können die meisten Angular-Anwendungen in mobile Apps umgewandelt werden.

Dieses Tutorial führt Sie durch den Prozess, beginnend mit einer neuen Angular-App und dann der Integration von Capacitor, um in den Bereich der nativen mobilen Apps zu wechseln. Zusätzlich können Sie optional [Konsta UI](https://konstauicom/) verwenden, um Ihre mobile Benutzeroberfläche mit Tailwind CSS zu verbessern.

## Über Capacitor

Capacitor ist bahnbrechend! Sie können es mühelos in jedes Webprojekt integrieren, und es wird Ihre Anwendung in eine native Webview verpacken und das native Xcode- und Android Studio-Projekt für Sie generieren. Außerdem bieten seine Plugins Zugriff auf native Gerätefunktionen wie die Kamera über eine JS-Brücke.

Mit Capacitor erhalten Sie eine fantastische native mobile App ohne kompliziertes Setup oder steile Lernkurve. Seine schlanke API und optimierte Funktionalität machen es zu einem Kinderspiel, es in Ihr Projekt zu integrieren. Glauben Sie mir, Sie werden erstaunt sein, wie mühelos es ist, mit Capacitor eine voll funktionsfähige native App zu erreichen!

## Vorbereiten Ihrer Angular-App

Um eine neue Angular-App zu erstellen, führen Sie den folgenden Befehl aus:

```shell
ng new my-app
cd my-app
```

Wählen Sie "Angular", wenn Sie nach der Angular-Version gefragt werden.

Um eine native mobile App zu erstellen, benötigen wir einen **Export** unseres Projekts. Lassen Sie uns also ein einfaches Skript in unserer **packagejson** aufnehmen, das zum Erstellen und Kopieren des Angular-Projekts verwendet werden kann:

```json
{
  "scripts": {
    // ...
    "build": "ng build --prod"
  }
}
```

Nachdem Sie den Befehl `build` ausgeführt haben, sollten Sie einen neuen `dist`-Ordner im Wurzelverzeichnis Ihres Projekts sehen können.

Dieser Ordner wird später von Capacitor verwendet, aber zunächst müssen wir ihn richtig einrichten.

## Hinzufügen von Capacitor zu Ihrer Angular-App

Um eine beliebige Web-App in einen nativen mobilen Container zu verpacken, müssen wir einige erste Schritte befolgen, aber danach ist es so einfach wie das Ausführen eines einzelnen `sync`-Befehls.

Zunächst können wir die [Capacitor CLI](https://capacitorjscom/docs/cli/) als Entwicklungsabhängigkeit installieren und sie dann in unserem Projekt einrichten. Während der Einrichtung können Sie "Enter" drücken, um die Standardwerte für Name und Bundle-ID zu akzeptieren.

Als Nächstes müssen wir das Kernpaket und die relevanten Pakete für die iOS- und Android-Plattformen installieren.

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

Um später auf das Android-Projekt zuzugreifen, müssen Sie [Android Studio](https://developerandroidcom/studio/) installieren. Für iOS benötigen Sie einen Mac und sollten [Xcode](https://developerapplecom/xcode/) installieren.

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
npm run build
npx cap sync
```

Der erste Befehl `npm run build` wird einfach Ihr Angular-Projekt erstellen und den statischen Build kopieren, während der zweite Befehl `npx cap sync` den gesamten Web-Code an die richtigen Stellen der nativen Plattformen synchronisiert, damit sie in einer App angezeigt werden können.

Zusätzlich könnte der Sync-Befehl die nativen Plattformen aktualisieren und Plugins installieren, daher ist es Zeit, `npx cap sync` erneut auszuführen, wenn Sie ein neues [Capacitor-Plugin](https://capacitorjscom/docs/plugins/) installieren.Ohne es zu bemerken, sind Sie jetzt tatsächlich fertig. Lassen Sie uns die App auf einem Gerät betrachten!

## Native Apps erstellen und bereitstellen

Um iOS-Apps zu entwickeln, müssen Sie **Xcode** installiert haben, und für Android-Apps benötigen Sie **Android Studio**. Wenn Sie Ihre App im App Store vertreiben möchten, müssen Sie sich zudem für iOS im Apple Developer Program und für Android in der Google Play Console registrieren.

Wenn Sie neu in der nativen Mobilentwicklung sind, können Sie die Capacitor CLI verwenden, um beide nativen Projekte einfach zu öffnen:

Sobald Sie Ihre nativen Projekte eingerichtet haben, ist die Bereitstellung Ihrer App auf einem verbundenen Gerät einfach. In Android Studio müssen Sie nur warten, bis alles bereit ist, und Sie können Ihre App ohne Änderung von Einstellungen auf einem verbundenen Gerät bereitstellen. Hier ein Beispiel:

![android-studio-run](/android-studio-run.webp)

In Xcode müssen Sie Ihr Signaturkonto einrichten, um Ihre App auf einem echten Gerät anstatt nur im Simulator bereitzustellen. Wenn Sie dies noch nicht getan haben, führt Sie Xcode durch den Prozess (aber auch hier müssen Sie im Developer Program registriert sein). Anschließend können Sie einfach auf Play klicken, um die App auf Ihrem verbundenen Gerät auszuführen, das Sie oben auswählen können. Hier ein Beispiel:

![xcode-run](/xcode-run.webp)

Herzlichen Glückwunsch! Sie haben Ihre Angular-Web-App erfolgreich auf einem mobilen Gerät bereitgestellt. Hier ein Beispiel:

Aber warten Sie, es gibt auch einen schnelleren Weg, dies während der Entwicklung zu tun.

## Capacitor Live Reload

Inzwischen sind Sie wahrscheinlich an Hot Reload bei allen modernen Frameworks gewöhnt, und die gute Nachricht ist, dass Sie mit minimalem Aufwand die gleiche Funktionalität **auf einem mobilen Gerät** haben können!

Ermöglichen Sie den Zugriff auf Ihre lokal gehostete Anwendung mit Live Reload **in Ihrem Netzwerk**, indem Sie die Capacitor-App den Inhalt von der spezifischen URL laden lassen.

Der erste Schritt besteht darin, Ihre lokale IP-Adresse herauszufinden. Wenn Sie einen Mac verwenden, können Sie dies durch Ausführen des folgenden Befehls im Terminal herausfinden:

Unter Windows führen Sie aus:

Suchen Sie dann nach der IPv4-Adresse.

Wir können Capacitor anweisen, die App direkt vom Server zu laden, indem wir einen weiteren Eintrag zu unserer `capacitor.config.ts`-Datei hinzufügen:

Stellen Sie sicher, dass Sie **die korrekte IP und den korrekten Port** verwenden. Ich habe in diesem Beispiel den Standard-Angular-Port verwendet.

Nun können wir diese Änderungen anwenden, indem wir sie in unser natives Projekt kopieren:

Der Befehl `copy` ähnelt `sync`, kopiert aber nur **die Änderungen am Webordner** und der Konfiguration, ohne das native Projekt zu aktualisieren.

Sie können Ihre App jetzt noch einmal über Android Studio oder Xcode bereitstellen. Danach wird die App **automatisch neu geladen** und zeigt die Änderungen an, wenn Sie etwas in Ihrer Angular-App ändern!

**Beachten Sie**, dass bei der Installation neuer Plugins wie der Kamera immer noch ein Neuaufbau Ihres nativen Projekts erforderlich ist. Dies liegt daran, dass native Dateien geändert werden und dies nicht im laufenden Betrieb erfolgen kann.

Beachten Sie, dass Sie in Ihrer Konfiguration die korrekte IP und den korrekten Port verwenden sollten. Der obige Codeblock zeigt zu Demonstrationszwecken den Standard-Angular-Port.

## Verwendung von Capacitor Plugins

Lassen Sie uns einen Blick darauf werfen, wie man ein Capacitor-Plugin in Aktion verwendet, was wir schon ein paar Mal erwähnt haben. Dazu können wir ein ziemlich einfaches Plugin installieren, indem wir Folgendes ausführen:

Das [Share-Plugin](https://capacitorjs.com/docs/apis/share/) ist nichts Besonderes, aber es ruft trotzdem den nativen Teilen-Dialog auf! Dafür müssen wir jetzt nur das Paket importieren und die entsprechende `share()`-Funktion aus unserer App aufrufen. Ändern wir also die **src/app/app.component.ts** wie folgt:

Wie bereits erwähnt, müssen wir bei der Installation neuer Plugins einen Sync-Vorgang durchführen und dann die App erneut auf unserem Gerät bereitstellen.Um dies zu tun, führen Sie den folgenden Befehl aus:

```shell
npx cap open ios
npx cap open android
```

Nachdem Sie den Button gedrückt haben, können Sie den schönen nativen Teilen-Dialog in Aktion erleben!

## Konsta UI hinzufügen

Um Konsta UI in Ihrer Nuxt 3 App zu verwenden, müssen Sie [Tailwind bereits installiert haben](https://tailwindcss.com/docs/guides/angular/) und das Paket installieren:

```shell
ipconfig getifaddr en0
```

Zusätzlich müssen Sie Ihre `tailwind.config.js` Datei modifizieren:

```shell
ipconfig
```

`konstaConfig` wird die Standard (oder Ihre benutzerdefinierte) Tailwind CSS-Konfiguration mit einigen zusätzlichen Varianten und Hilfsfunktionen erweitern, die für Konsta UI erforderlich sind.

Jetzt müssen wir die Haupt-[App](https://konsta-ui.com/vue/app/) Komponente einrichten, damit wir einige globale Parameter (wie `theme`) festlegen können.

Wir müssen die gesamte App mit `App` in der `src/app/app.component.html` umschließen:

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

### Beispielseite

Jetzt, da alles eingerichtet ist, können wir Konsta UI Vue-Komponenten in unseren Angular-Seiten verwenden.

Öffnen wir zum Beispiel `src/app/app.component.html` und ändern es wie folgt:

```shell
npx cap copy
```

Wenn die Live-Aktualisierung nach der Installation aller notwendigen Komponenten nicht synchron ist, versuchen Sie, alles neu zu starten. Sobald Sie das getan haben, sollten Sie eine mobile App mit einem einigermaßen nativen Look sehen, die mit Angular und Capacitor erstellt wurde!

Sie sollten folgende Seite als Ergebnis sehen:

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="angular-mobile-app">
</div>

## Fazit

Capacitor ist eine ausgezeichnete Option zum Erstellen nativer Anwendungen auf Basis eines bestehenden Web-Projekts und bietet eine einfache Möglichkeit, Code zu teilen und eine konsistente Benutzeroberfläche beizubehalten.

Und mit der Ergänzung von [Capgo](https://capgo.app/) ist es noch einfacher, Live-Updates zu Ihrer App hinzuzufügen, um sicherzustellen, dass Ihre Benutzer immer Zugang zu den neuesten Funktionen und Fehlerbehebungen haben.

Wenn Sie erfahren möchten, wie Sie Capgo zu Ihrer Angular-App hinzufügen, werfen Sie einen Blick auf den nächsten Artikel: