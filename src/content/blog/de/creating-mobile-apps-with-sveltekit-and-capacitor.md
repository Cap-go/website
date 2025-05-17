---
slug: creating-mobile-apps-with-sveltekit-and-capacitor
title: Mobile Apps mit SvelteKit und Capacitor entwickeln
description: >-
  Erfahren Sie, wie Sie eine mobile App mit SvelteKit und Capacitor erstellen
  und die native Benutzeroberfläche mit Konsta UI verbessern.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: SvelteKit und Capgo Illustration
tag: Tutorial
published: true
locale: de
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
---

In diesem Tutorial beginnen wir mit einer neuen [SvelteKit](https://kitsveltedev/) App und wechseln zur nativen mobilen Entwicklung mit Capacitor. Optional können Sie auch [Konsta UI](https://konstauicom/) für eine verbesserte Tailwind CSS mobile Benutzeroberfläche integrieren.

Capacitor ermöglicht es Ihnen, Ihre SvelteKit-Webanwendung einfach in eine native mobile App umzuwandeln, ohne dass signifikante Änderungen oder das Erlernen einer neuen Fähigkeit wie React Native erforderlich sind.

Folgen Sie dieser Schritt-für-Schritt-Anleitung, um Ihre SvelteKit-App mit Capacitor in eine mobile App umzuwandeln und, falls gewünscht, Ihre mobile Benutzeroberfläche mit Konsta UI zu verbessern.

## Über Capacitor

Capacitor ist bahnbrechend! Es kann mühelos in jedes Webprojekt integriert werden, umhüllt Ihre Anwendung in einem nativen Webview und generiert für Sie native Xcode- und Android Studio-Projekte. Seine Plugins bieten Zugriff auf native Gerätefunktionen wie die Kamera über eine JavaScript-Brücke.

Capacitor ermöglicht es Ihnen, eine fantastische native mobile App ohne kompliziertes Setup oder steile Lernkurve zu erstellen. Seine schlanke API und optimierte Funktionalität machen es einfach, es in Ihr Projekt zu integrieren. Sie werden erstaunt sein, wie einfach es ist, mit Capacitor eine voll funktionsfähige native App zu erreichen!

## Vorbereitung Ihrer SvelteKit-App

Um eine neue SvelteKit-App zu erstellen, führen Sie den folgenden Befehl aus:

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

Nach Ausführung des `build`-Befehls sollten Sie einen neuen `dist`-Ordner im Hauptverzeichnis Ihres Projekts sehen.

Dieser Ordner wird später von Capacitor verwendet, aber vorerst müssen wir ihn korrekt einrichten.

## Hinzufügen von Capacitor zu Ihrer SvelteKit-App

Um eine beliebige Web-App in einen nativen mobilen Container zu verpacken, müssen wir einige anfängliche Schritte befolgen. Danach ist es so einfach wie das Ausführen eines einzigen `sync`-Befehls.

Installieren Sie zunächst die [Capacitor CLI](https://capacitorjs.com/docs/cli/) als Entwicklungsabhängigkeit und richten Sie sie in Ihrem Projekt ein. Während der Einrichtung können Sie "Enter" drücken, um die Standardwerte für Namen und Bundle-ID zu akzeptieren.

Installieren Sie als Nächstes das Core-Paket und die relevanten Pakete für die iOS- und Android-Plattformen.

Fügen Sie schließlich die Plattformen hinzu, und Capacitor wird für jede Plattform Ordner im Hauptverzeichnis Ihres Projekts erstellen:

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your SvelteKit project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

An diesem Punkt sollten Sie neue **ios**- und **android**-Ordner in Ihrem SvelteKit-Projekt sehen.

**Dies sind echte native Projekte!**

Um später auf das Android-Projekt zuzugreifen, müssen Sie [Android Studio](https://developerandroidcom/studio/) installieren. Für iOS benötigen Sie einen Mac und sollten [Xcode](https://developer.apple.com/xcode/) installieren.

Zusätzlich sollten Sie eine **capacitorconfigts**-Datei in Ihrem Projekt finden, die einige grundlegende Capacitor-Einstellungen enthält, die während der Synchronisierung verwendet werden. Das Einzige, worauf Sie achten müssen, ist das **webDir**, das auf das Ergebnis Ihres Build-Befehls zeigen muss. Derzeit ist es falsch.

Um dies zu beheben, öffnen Sie die **capacitorconfigts**-Datei und aktualisieren Sie das **webDir**:

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```

Jetzt, da wir unsere Capacitor-Einstellungen aktualisiert haben, ändern wir unser Sveltekit-Projekt in eine statische Anwendung, indem wir das entsprechende statische Adapter-Paket herunterladen:

```shell
npm i -D @sveltejs/adapter-static
```

Nachdem das Paket installiert ist, müssen wir die _svelteconfigjs_-Datei vom Auto-Adapter auf statisch ändern:

```ts
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    })
  }
}

export default config
```

Mit der aktualisierten _svelteconfigjs_ müssen wir eine _prerender_-Option hinzufügen, indem wir eine _+layoutjs_-Seite zu _src/routes_ erstellen und einfach den folgenden Export zu _+layoutjs_ hinzufügen:

```ts
export const prerender = true
```

Nachdem wir die _+layoutjs_-Seite hinzugefügt und aktualisiert haben, müssen wir unsere mobilen Plattformen hinzufügen und unser Projekt neu bauen, um den _build_-Ordner zu erstellen.

Sie können dies tun, indem Sie die folgenden Befehle ausführen:

```shell
npm run build
npx cap sync
```

Der erste Befehl `npm run build` wird Ihr SvelteKit-Projekt bauen und den statischen Build kopieren, während der zweite Befehl `npx cap sync` den gesamten Webcode an die richtigen Stellen der nativen Plattformen synchronisiert, damit sie in einer App angezeigt werden können.

Zusätzlich könnte der Sync-Befehl die nativen Plattformen aktualisieren und Plugins installieren, sodass es an der Zeit ist, `npx cap sync` erneut auszuführen, wenn Sie neue [Capacitor-Plugins](https://capacitorjs.com/docs/plugins/) installieren.Ohne es zu merken, haben Sie den Prozess nun abgeschlossen. Lassen Sie uns die App auf einem Gerät ansehen!

## Native Apps erstellen und bereitstellen

Um iOS-Apps zu entwickeln, benötigen Sie **Xcode**, und für Android-Apps benötigen Sie **Android Studio**. Wenn Sie Ihre App außerdem im App Store vertreiben möchten, müssen Sie sich für iOS im Apple Developer Program und für Android in der Google Play Console registrieren.

Wenn Sie neu in der nativen Mobilentwicklung sind, können Sie mit der Capacitor CLI ganz einfach beide nativen Projekte öffnen:

Sobald Sie Ihre nativen Projekte eingerichtet haben, ist die Bereitstellung Ihrer App auf einem verbundenen Gerät einfach. In Android Studio müssen Sie nur warten, bis alles bereit ist, und Sie können Ihre App ohne Änderung von Einstellungen auf einem verbundenen Gerät bereitstellen. Hier ein Beispiel:

In Xcode müssen Sie Ihr Signing-Konto einrichten, um Ihre App auf einem echten Gerät statt nur im Simulator bereitzustellen. Wenn Sie das noch nie gemacht haben, führt Sie Xcode durch den Prozess (aber auch hier müssen Sie im Developer Program registriert sein). Danach können Sie einfach auf Play klicken, um die App auf Ihrem verbundenen Gerät auszuführen, das Sie oben auswählen können. Hier ein Beispiel:

Herzlichen Glückwunsch! Sie haben Ihre SvelteKit-Web-App erfolgreich auf einem mobilen Gerät bereitgestellt. Hier ein Beispiel:

Aber warten Sie, es gibt auch einen schnelleren Weg dafür während der Entwicklung.

## Capacitor Live Reload

Mittlerweile sind Sie wahrscheinlich an Hot Reload bei allen modernen Frameworks gewöhnt, und die gute Nachricht ist, dass Sie die gleiche Funktionalität **auf einem mobilen Gerät** mit minimalem Aufwand haben können!

Ermöglichen Sie den Zugriff auf Ihre lokal gehostete Anwendung mit Live Reload **in Ihrem Netzwerk**, indem Sie die Capacitor-App den Inhalt von der spezifischen URL laden lassen.

Der erste Schritt besteht darin, Ihre lokale IP-Adresse herauszufinden. Wenn Sie einen Mac verwenden, können Sie dies mit folgendem Befehl im Terminal herausfinden:

Unter Windows führen Sie aus:

Suchen Sie dann nach der IPv4-Adresse.

Wir können Capacitor anweisen, die App direkt vom Server zu laden, indem wir einen weiteren Eintrag zu unserer `capacitor.config.ts`-Datei hinzufügen:

Stellen Sie sicher, dass Sie **die richtige IP und den richtigen Port** verwenden, wie im obigen Beispiel gezeigt.

Jetzt können wir diese Änderungen übernehmen, indem wir sie in unser natives Projekt kopieren:

Der Befehl `copy` ähnelt `sync`, kopiert aber nur **die Änderungen am Webordner** und an der Konfiguration, ohne das native Projekt zu aktualisieren.

Sie können Ihre App jetzt noch einmal über Android Studio oder Xcode bereitstellen. Danach wird die App, wenn Sie etwas in Ihrer Svelte-App ändern, **automatisch neu geladen** und zeigt die Änderungen an!

**Beachten Sie**, dass die Installation neuer Plugins wie der Kamera weiterhin einen Neuaufbau Ihres nativen Projekts erfordert. Dies liegt daran, dass native Dateien geändert werden und dies nicht im Handumdrehen geschehen kann.

Beachten Sie, dass Sie in Ihrer Konfiguration die richtige IP und den richtigen Port verwenden sollten. Der obige Codeblock zeigt zu Demonstrationszwecken den Standard-SvelteKit-Port.

## Verwendung von Capacitor-Plugins

Schauen wir uns an, wie man ein Capacitor-Plugin in Aktion verwendet, was wir schon ein paar Mal erwähnt haben. Dazu können wir ein einfaches Plugin installieren, indem wir Folgendes ausführen:

Das [Share-Plugin](https://capacitorjs.com/docs/apis/share/) ist nichts Besonderes, aber es öffnet den nativen Teilen-Dialog! Dafür müssen wir jetzt nur noch das Paket importieren und die Funktion `share()` aus unserer App aufrufen. Ändern wir also **src/routes/index.svelte** wie folgt:

Wie bereits erwähnt, müssen wir bei der Installation neuer Plugins einen Sync-Vorgang durchführen und dann die App erneut auf unserem Gerät bereitstellen. Führen Sie dazu den folgenden Befehl aus:

Nachdem Sie auf den Button geklickt haben, können Sie den schönen nativen Teilen-Dialog in Aktion sehen!

## Hinzufügen von Konsta UI

Um Konsta UI in Ihrer Nuxt 3-App zu verwenden, müssen Sie [Tailwind bereits installiert haben](https://tailwindcsscom/docs/guides/sveltekit/) und um das Paket zu installieren:

```shell
npx cap open ios
npx cap open android
```

Zusätzlich müssen Sie Ihre `tailwind.config.js` Datei ändern:

```shell
ipconfig getifaddr en0
```

`konstaConfig` erweitert die Standard (oder Ihre benutzerdefinierte) Tailwind CSS-Konfiguration um einige zusätzliche Varianten und Hilfsfunktionen, die für Konsta UI erforderlich sind.

Jetzt müssen wir die Haupt-[App](https://konstaui.com/vue/app/)-Komponente einrichten, damit wir einige globale Parameter (wie `theme`) festlegen können.

Wir müssen die gesamte App in `src/routes/+layout.svelte` mit `App` umschließen:

```shell
ipconfig
```

### Beispielseite

Nachdem alles eingerichtet ist, können wir Konsta UI Svelte-Komponenten in unseren SvelteKit-Seiten verwenden.

Öffnen wir zum Beispiel `src/routes/index.svelte` und ändern es wie folgt:

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

Wenn die Live-Aktualisierung nach der Installation aller erforderlichen Komponenten nicht synchron ist, versuchen Sie, alles neu zu starten. Sobald Sie das getan haben, sollten Sie eine mobile App mit einem etwas nativen Aussehen sehen, die mit SvelteKit und Capacitor erstellt wurde!

Sie sollten folgende Seite als Ergebnis sehen:

<div class="mx-auto" style="width: 50%;">
  <img src="/sveltekit-mobile-app.webp" alt="sveltekit-mobile-app">
</div>

## Fazit

Capacitor ist eine ausgezeichnete Option zum Erstellen nativer Anwendungen auf Basis eines bestehenden Webprojekts und bietet eine einfache Möglichkeit, Code zu teilen und eine konsistente Benutzeroberfläche beizubehalten.

Und mit der Ergänzung von [Capgo](https://capgo.app/) ist es noch einfacher, Live-Updates zu Ihrer App hinzuzufügen und sicherzustellen, dass Ihre Benutzer immer Zugang zu den neuesten Funktionen und Fehlerbehebungen haben.

Wenn Sie erfahren möchten, wie Sie Capgo zu Ihrer SvelteKit-App hinzufügen, werfen Sie einen Blick auf den nächsten Artikel:

Erfahren Sie, wie Capgo Ihnen helfen kann, bessere Apps schneller zu erstellen. [Registrieren Sie sich noch heute für ein kostenloses Konto](/register/)