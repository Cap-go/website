---
slug: create-react-mobile-apps-with-capacitor
title: Mobile Apps mit React und Capacitor entwickeln
description: >-
  Erfahren Sie, wie Sie eine mobile App mit React und Capacitor erstellen und
  die native Benutzeroberfläche mit Konsta UI verbessern.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React und Capacitor Illustration
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In diesem Tutorial beginnen wir mit einer neuen [React](https://reactjsorg/) App und gehen zum nativen Mobile-Development über, indem wir Capacitor verwenden. Optional können Sie auch [Konsta UI](https://konstauicom/) hinzufügen, um eine verbesserte mobile Benutzeroberfläche mit Tailwind CSS zu erhalten.

Capacitor ermöglicht es Ihnen, Ihre React-Webanwendung einfach in eine native mobile App umzuwandeln, ohne signifikante Änderungen vorzunehmen oder eine neue Fähigkeit wie React Native zu erlernen.

Mit nur wenigen einfachen Schritten können die meisten React-Anwendungen in mobile Apps umgewandelt werden.

Dieses Tutorial führt Sie durch den Prozess, beginnend mit einer neuen React-App und dann der Integration von Capacitor, um in den Bereich der nativen mobilen Apps vorzudringen. Zusätzlich können Sie optional [Konsta UI](https://konstauicom/) verwenden, um Ihre mobile Benutzeroberfläche mit Tailwind CSS zu verbessern.

## Über Capacitor

Capacitor ist bahnbrechend! Sie können es mühelos in jedes Webprojekt integrieren, und es wird Ihre Anwendung in einen nativen Webview verpacken und das native Xcode- und Android Studio-Projekt für Sie generieren. Außerdem bieten seine Plugins Zugriff auf native Gerätefunktionen wie die Kamera über eine JS-Brücke.

Mit Capacitor erhalten Sie eine fantastische native mobile App ohne kompliziertes Setup oder steile Lernkurve. Seine schlanke API und rationalisierte Funktionalität machen es zu einem Kinderspiel, es in Ihr Projekt zu integrieren. Glauben Sie mir, Sie werden erstaunt sein, wie mühelos es ist, mit Capacitor eine voll funktionsfähige native App zu erreichen!

## Vorbereiten Ihrer React-App

Während es verschiedene Methoden gibt, React-Anwendungen zu initiieren, wählen wir in diesem Tutorial die einfachste, die eine leere React-Anwendung bereitstellt:

Bei der Erstellung einer nativen mobilen App benötigen wir einen **Export** unseres Projekts. Fügen wir also ein einfaches Skript in unserer **packagejson** hinzu, das zum Erstellen und Exportieren des React-Projekts verwendet werden kann:

Sie können jetzt `npm run build` ohne Bedenken ausführen, und Sie sollten einen neuen out-Ordner im Wurzelverzeichnis Ihres Projekts sehen können.

Dieser Ordner wird später von Capacitor verwendet, aber zunächst müssen wir ihn korrekt einrichten.

## Hinzufügen von Capacitor zu Ihrer React-App

Um eine beliebige Web-App in einen nativen mobilen Container zu verpacken, müssen wir einige anfängliche Schritte befolgen, aber danach ist es so einfach wie die Ausführung eines einzigen `sync`-Befehls.

Zunächst können wir die [Capacitor CLI](https://capacitorjs.com/docs/cli/) als Entwicklungsabhängigkeit installieren und sie dann in unserem Projekt einrichten. Während der Einrichtung können Sie "Enter" drücken, um die Standardwerte für Name und Bundle-ID zu akzeptieren.

Als Nächstes müssen wir das Core-Paket und die relevanten Pakete für die iOS- und Android-Plattformen installieren.

Schließlich können wir die Plattformen hinzufügen, und Capacitor wird für jede Plattform Ordner im Wurzelverzeichnis unseres Projekts erstellen:

An diesem Punkt sollten Sie neue **ios**- und **android**-Ordner in Ihrem React-Projekt sehen können.

**Das sind echte native Projekte!**

Um später auf das Android-Projekt zugreifen zu können, müssen Sie [Android Studio](https://developerandroidcom/studio/) installieren. Für iOS benötigen Sie einen Mac und sollten [Xcode](https://developer.apple.com/xcode/) installieren.

Zusätzlich sollten Sie eine **capacitorconfigts**-Datei in Ihrem Projekt finden, die einige grundlegende Capacitor-Einstellungen enthält, die während der Synchronisierung verwendet werden. Das Einzige, worauf Sie achten müssen, ist das **webDir**, das auf das Ergebnis Ihres Build-Befehls zeigen muss. Derzeit ist es ungenau.

Um dies zu korrigieren, öffnen Sie die **capacitorconfigjson**-Datei und aktualisieren Sie das **webDir**:

Sie können es ausprobieren, indem Sie die folgenden Befehle ausführen:

Der erste Befehl `npm run build` wird einfach Ihr React-Projekt erstellen und den statischen Build exportieren.

Der zweite Befehl `npx cap sync` wird den gesamten Web-Code an die richtigen Stellen der nativen Plattformen synchronisieren, damit sie in einer App angezeigt werden können.

Zusätzlich kann der Sync-Befehl die nativen Plattformen aktualisieren und Plugins installieren, daher ist es Zeit, `npx cap sync` erneut auszuführen, wenn Sie ein neues [Capacitor-Plugin](https://capacitorjs.com/docs/plugins/) installieren.Ohne es zu bemerken, sind Sie jetzt eigentlich fertig. Lassen Sie uns die App auf einem Gerät ansehen!

## Native Apps erstellen und bereitstellen

Um iOS-Apps zu entwickeln, benötigen Sie **Xcode**, und für Android-Apps benötigen Sie **Android Studio**. Wenn Sie Ihre App im App Store vertreiben möchten, müssen Sie sich außerdem für das Apple Developer Program für iOS und die Google Play Console für Android anmelden.

Wenn Sie neu in der nativen mobilen Entwicklung sind, können Sie die Capacitor CLI verwenden, um beide nativen Projekte einfach zu öffnen:

Sobald Sie Ihre nativen Projekte eingerichtet haben, ist die Bereitstellung Ihrer App auf einem verbundenen Gerät einfach. In Android Studio müssen Sie nur warten, bis alles bereit ist, und Sie können Ihre App ohne Änderung von Einstellungen auf einem verbundenen Gerät bereitstellen. Hier ein Beispiel:

![android-studio-run](/android-studio-run.webp)

In Xcode müssen Sie Ihr Signing-Konto einrichten, um Ihre App auf einem echten Gerät anstatt nur im Simulator bereitzustellen. Wenn Sie dies noch nie gemacht haben, führt Sie Xcode durch den Prozess (aber Sie müssen im Developer Program angemeldet sein). Danach können Sie einfach auf "Play" klicken, um die App auf Ihrem verbundenen Gerät auszuführen, das Sie oben auswählen können. Hier ein Beispiel:

![xcode-run](/xcode-run.webp)

Herzlichen Glückwunsch! Sie haben Ihre React-Web-App erfolgreich auf einem mobilen Gerät bereitgestellt. Hier ein Beispiel:

Aber Moment, es gibt auch einen schnelleren Weg, dies während der Entwicklung zu tun.

## Capacitor Live Reload

Inzwischen sind Sie wahrscheinlich an Hot Reload bei allen modernen Frameworks gewöhnt, und die gute Nachricht ist, dass Sie die gleiche Funktionalität **auf einem mobilen Gerät** mit minimalem Aufwand haben können!

Ermöglichen Sie den Zugriff auf Ihre lokal gehostete Anwendung mit Live Reload **in Ihrem Netzwerk**, indem Sie die Capacitor-App den Inhalt von der spezifischen URL laden lassen.

Der erste Schritt besteht darin, Ihre lokale IP-Adresse herauszufinden. Wenn Sie einen Mac verwenden, können Sie dies herausfinden, indem Sie den folgenden Befehl im Terminal ausführen:

Unter Windows führen Sie aus:

Suchen Sie dann nach der IPv4-Adresse.

Wir können Capacitor anweisen, die App direkt vom Server zu laden, indem wir einen weiteren Eintrag zu unserer `capacitor.config.ts`-Datei hinzufügen:

Stellen Sie sicher, dass Sie **die richtige IP und den richtigen Port** verwenden. Ich habe in diesem Beispiel den Standard-React-Port verwendet.

Jetzt können wir diese Änderungen anwenden, indem wir sie in unser natives Projekt kopieren:

Der `copy`-Befehl ähnelt `sync`, kopiert aber nur **die Änderungen im Web-Ordner** und der Konfiguration, ohne das native Projekt zu aktualisieren.

Sie können Ihre App jetzt noch einmal über Android Studio oder Xcode bereitstellen. Danach, wenn Sie etwas in Ihrer React-App ändern, **wird die App automatisch neu geladen** und zeigt die Änderungen an!

**Beachten Sie**, dass wenn Sie neue Plugins wie die Kamera installieren, dies immer noch einen Neuaufbau Ihres nativen Projekts erfordert. Dies liegt daran, dass native Dateien geändert werden, und das kann nicht im laufenden Betrieb geschehen.

Beachten Sie, dass Sie in Ihrer Konfiguration die richtige IP und den richtigen Port verwenden sollten. Der obige Codeblock zeigt zu Demonstrationszwecken den Standard-React-Port.

## Verwendung von Capacitor-Plugins

Lassen Sie uns einen Blick darauf werfen, wie man ein Capacitor-Plugin in Aktion verwendet, was wir bereits einige Male erwähnt haben. Dazu können wir ein ziemlich einfaches Plugin installieren, indem wir Folgendes ausführen:

Das [Share-Plugin](https://capacitorjs.com/docs/apis/share/) ist nichts Besonderes, aber es ruft trotzdem den nativen Share-Dialog auf! Dafür müssen wir jetzt nur das Paket importieren und die `share()`-Funktion aus unserer App aufrufen. Ändern wir die **src/App.js** wie folgt:

Wie bereits erwähnt, müssen wir bei der Installation neuer Plugins eine Synchronisierung durchführen und dann die App erneut auf unserem Gerät bereitstellen.Um dies zu tun, führen Sie den folgenden Befehl aus:

```shell
npx create-react-app my-app
```

Nachdem Sie den Button gedrückt haben, können Sie den schönen nativen Teilen-Dialog in Aktion sehen!

<div class="mx-auto" style="width: 50%;">
  <img src="/next-capacitor-share.webp" alt="react-mobile-app">
</div>

Um den Button mobil-freundlicher aussehen zu lassen, können wir etwas Styling hinzufügen, indem wir meine Lieblings-UI-Komponentenbibliothek für Web-Apps verwenden - React (Wortspiel nicht beabsichtigt).

## Hinzufügen von Konsta UI

Ich habe jahrelang mit [Ionic](https://ionicframework.com/) gearbeitet, um tolle plattformübergreifende Anwendungen zu erstellen, und es war jahrelang eine der besten Optionen. Aber jetzt empfehle ich es nicht mehr; es ist sehr umständlich, es mit React zu integrieren, und es lohnt sich nicht wirklich, wenn man bereits [tailwindcss](https://tailwindcss.com/) hat.

Wenn Sie ein großartig aussehendes mobiles UI möchten, das sich an iOS- und Android-spezifische Stile anpasst, empfehle ich Konsta UI.

Sie müssen [tailwind bereits installiert haben](https://tailwindcss.com/docs/guides/vite/#react).

Um es zu verwenden, müssen wir nur das React-Paket installieren:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

Zusätzlich müssen Sie Ihre `tailwind.config.js` Datei modifizieren:

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

`konstaConfig` wird die Standard (oder Ihre benutzerdefinierte) Tailwind CSS-Konfiguration mit einigen zusätzlichen Varianten und Hilfsdienstprogrammen erweitern, die für Konsta UI erforderlich sind.

Jetzt müssen wir die Haupt-[App](https://konsta.ui.com/react/app/)-Komponente einrichten, damit wir einige globale Parameter (wie `theme`) festlegen können.

Wir müssen die gesamte App mit `App` in `src/App.js` umschließen:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

### Beispielseite

Jetzt, wo alles eingerichtet ist, können wir Konsta UI React-Komponenten in unserer React-App verwenden.

Öffnen wir zum Beispiel `src/App.js` und ändern es wie folgt:

```shell
npm run build
npx cap sync
```

Wenn die Live-Aktualisierung nach der Installation aller notwendigen Komponenten nicht synchron ist, versuchen Sie, alles neu zu starten. Sobald Sie das getan haben, sollten Sie eine mobile App mit einem einigermaßen nativen Aussehen sehen, die mit React und Capacitor erstellt wurde!

Sie sollten folgende Seite als Ergebnis sehen:

<div>
  <h1>
</h1>

## Fazit

Capacitor ist eine ausgezeichnete Option zum Erstellen nativer Anwendungen auf Basis eines bestehenden Web-Projekts und bietet eine einfache Möglichkeit, Code zu teilen und eine konsistente Benutzeroberfläche beizubehalten.

Und mit der Ergänzung von [Capgo](https://capgo.app/) ist es noch einfacher, Live-Updates zu Ihrer App hinzuzufügen und sicherzustellen, dass Ihre Benutzer immer Zugang zu den neuesten Funktionen und Fehlerbehebungen haben.

Wenn Sie erfahren möchten, wie Sie Capgo zu Ihrer React-App hinzufügen, schauen Sie sich den nächsten Artikel an: