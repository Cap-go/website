---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  2024 Native Mobile Apps mit Next.js 14 und Capacitor erstellen: Eine
  Schritt-für-Schritt-Anleitung
description: >-
  Erfahren Sie in dieser umfassenden Anleitung, wie Sie native mobile Apps mit
  Next.js 14 und Capacitor erstellen können. Entdecken Sie die neuesten Best
  Practices und Techniken für die Entwicklung leistungsstarker und
  funktionsreicher mobiler Anwendungen.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 14 und Capacitor Illustration
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## Einführung

In diesem Tutorial werden wir erkunden, wie man native mobile Apps mit der leistungsstarken Kombination aus Nextjs 14 und Capacitor im Jahr 2024 erstellt. Durch die Nutzung der neuesten Versionen dieser Technologien können Sie leistungsstarke, funktionsreiche mobile Anwendungen mit Leichtigkeit erstellen. Wir werden auch zeigen, wie man die mobile Benutzeroberfläche mit Konsta UI und Tailwind CSS verbessert, obwohl dieser Schritt optional ist.

Nextjs, ein beliebtes React-Framework, bietet eine solide Grundlage für den Aufbau von Webanwendungen, während Capacitor es Ihnen ermöglicht, Ihre Nextjs-App ohne wesentliche Änderungen oder die Notwendigkeit, neue Fähigkeiten wie React Native zu erlernen, in eine native mobile App zu verwandeln. Dieses Tutorial wird Sie durch den Prozess führen, beginnend mit der Einrichtung einer neuen Nextjs-App und der Integration von Capacitor, um ein natives mobiles Erlebnis zu schaffen.

### Vorteile der Verwendung von Nextjs und Capacitor

- **Wiederverwendbarkeit des Codes**: Nextjs ermöglicht es Ihnen, wiederverwendbare Komponenten zu schreiben und Code zwischen Ihren Web- und mobilen Apps zu teilen, was Zeit und Aufwand bei der Entwicklung spart.
- **Leistung**: Nextjs bietet integrierte Leistungsoptimierungen wie serverseitiges Rendering und Code-Splitting, die schnelle Ladezeiten und eine reibungslose Benutzererfahrung gewährleisten.
- **Native Fähigkeiten**: Capacitor bietet Zugriff auf native Gerätefunktionen wie Kamera, Geolokalisierung und mehr, so dass Sie funktionsreiche mobile Apps erstellen können.
- **Vereinfachte Entwicklung**: Mit Capacitor können Sie Ihre mobile App mit vertrauten Webtechnologien entwickeln und testen, was die Lernkurve reduziert und den Entwicklungsprozess rationalisiert.

## Vorbereitung Ihrer Nextjs App

Um zu beginnen, erstellen wir eine neue Nextjs-Anwendung mit dem Befehl `create-next-app`:

Dieser Befehl richtet ein leeres Nextjs-Projekt mit der empfohlenen Konfiguration für die neueste Version ein.

Navigieren Sie als Nächstes zum Projektverzeichnis:

Um eine native mobile App zu erstellen, müssen wir einen statischen Export unseres Nextjs-Projekts generieren. Aktualisieren Sie die Datei `package.json`, um ein Skript für den Bau und Export des Projekts einzufügen:

Das Ausführen des Befehls `npm run static` kann zu Fehlern aufgrund von Inkompatibilität bei der Bildoptimierung führen. Um dies zu beheben, öffnen Sie die Datei `next.config.js` und ändern Sie sie wie folgt:

Jetzt sollte `npm run static` ohne Probleme funktionieren, und Sie werden einen neuen `out`-Ordner im Stammverzeichnis Ihres Projekts finden. Dieser Ordner wird in den nächsten Schritten von Capacitor verwendet.

## Hinzufügen von Capacitor zu Ihrer Nextjs 14 App

Um Ihre Nextjs-App in einen nativen mobilen Container zu verpacken, folgen Sie diesen Schritten:

1. Installieren Sie die Capacitor CLI als Entwicklungsabhängigkeit:

2. Initialisieren Sie Capacitor in Ihrem Nextjs-Projekt:

Während des Initialisierungsprozesses können Sie "Enter" drücken, um die Standardwerte für den App-Namen und die Bundle-ID zu akzeptieren.

3. Installieren Sie die erforderlichen Capacitor-Pakete:

4. Fügen Sie die nativen Plattformen hinzu:

Capacitor wird Ordner für jede Plattform (`ios` und `android`) im Stammverzeichnis Ihres Projekts erstellen. Diese Ordner enthalten die nativen Projekte für iOS bzw. Android.

Um auf das Android-Projekt zuzugreifen und es zu erstellen, müssen Sie Android Studio installiert haben. Für die iOS-Entwicklung benötigen Sie einen Mac mit installiertem Xcode.

5. Konfigurieren Sie Capacitor:

Öffnen Sie die Datei `capacitor.config.ts` und aktualisieren Sie die Eigenschaft `webDir`, um auf das Ausgabeverzeichnis Ihres Nextjs-Builds zu verweisen:

6. Bauen und synchronisieren Sie Ihr Projekt:

Der Befehl `npm run static` baut Ihr Nextjs-Projekt und exportiert die statischen Dateien, während `npx cap sync` den Webcode mit den nativen Plattformen synchronisiert.## Erstellen und Bereitstellen von nativen Apps

Befolgen Sie diese Schritte, um Ihre native mobile App zu erstellen und bereitzustellen:
Um iOS-Apps zu entwickeln, müssen Sie **Xcode** installiert haben, und für Android-Apps benötigen Sie **Android Studio**. Wenn Sie Ihre App außerdem im App Store vertreiben möchten, müssen Sie sich für iOS im Apple Developer Program und für Android in der Google Play Console registrieren.

1. Öffnen Sie die nativen Projekte:

Für iOS:
```shell
npx create-next-app@latest my-app
```

Für Android:
```shell
cd my-app
```

2. Erstellen und starten Sie die App:

![android-studio-run](/android-studio-run.webp)

- Warten Sie in Android Studio, bis das Projekt bereit ist, und klicken Sie dann auf die Schaltfläche "Ausführen", um die App auf einem verbundenen Gerät oder Emulator bereitzustellen.
![xcode-run](/xcode-run.webp)

- Richten Sie in Xcode Ihr Signaturkonto ein, um die App auf einem echten Gerät bereitzustellen. Wenn Sie dies noch nie gemacht haben, wird Sie Xcode durch den Prozess führen (beachten Sie, dass Sie im Apple Developer Program registriert sein müssen). Sobald die Einrichtung abgeschlossen ist, klicken Sie auf die Schaltfläche "Abspielen", um die App auf Ihrem verbundenen Gerät auszuführen.

Glückwunsch! Sie haben Ihre Nextjs-Web-App erfolgreich auf einem mobilen Gerät bereitgestellt.

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="nextjs-mobile-app">
</div>
Aber Moment, es gibt auch einen schnelleren Weg, dies während der Entwicklung zu tun.

## Capacitor Live Reload

Während der Entwicklung können Sie von Live Reloading profitieren, um Änderungen sofort auf Ihrem mobilen Gerät zu sehen. Um diese Funktion zu aktivieren, befolgen Sie diese Schritte:

1. Ermitteln Sie Ihre lokale IP-Adresse:

- Unter macOS führen Sie den folgenden Befehl im Terminal aus:
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

- Unter Windows führen Sie aus:
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
  Suchen Sie in der Ausgabe nach der IPv4-Adresse.

2. Aktualisieren Sie die Datei `capacitor.config.ts`, um die Server-Konfiguration einzuschließen:

```shell
npm install -D @capacitor/cli
```

Ersetzen Sie `YOUR_IP_ADDRESS` durch Ihre lokale IP-Adresse.

3. Übernehmen Sie die Änderungen in Ihr natives Projekt:

```shell
npx cap init
```

Der Befehl `copy` kopiert den Webordner und die Konfigurationsänderungen in das native Projekt, ohne das gesamte Projekt zu aktualisieren.

4. Erstellen Sie die App neu und führen Sie sie auf Ihrem Gerät mit Android Studio oder Xcode aus.

Jetzt wird die mobile App automatisch neu geladen, um Änderungen an Ihrer Nextjs-App widerzuspiegeln, wann immer Sie welche vornehmen.

Hinweis: Wenn Sie neue Plugins installieren oder Änderungen an nativen Dateien vornehmen, müssen Sie das native Projekt neu erstellen, da sich das Live Reloading nur auf Änderungen am Webcode bezieht.

## Verwendung von Capacitor-Plugins

Mit Capacitor-Plugins können Sie von Ihrer Nextjs-App aus auf native Gerätefunktionen zugreifen. Lassen Sie uns am Beispiel des [Share-Plugins](https://capacitorjs.com/docs/apis/share/) erkunden, wie man sie verwendet:

1. Installieren Sie das Share-Plugin:

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

2. Aktualisieren Sie die Datei `pages/index.js`, um das Share-Plugin zu verwenden:

```shell
npx cap add ios
npx cap add android
```

3. Synchronisieren Sie die Änderungen mit dem nativen Projekt:

Wie bereits erwähnt, müssen wir bei der Installation neuer Plugins eine Synchronisierung durchführen und dann die App erneut auf unserem Gerät bereitstellen. Führen Sie dazu den folgenden Befehl aus:

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

4. Erstellen Sie die App neu und führen Sie sie auf Ihrem Gerät aus.

Wenn Sie jetzt auf die Schaltfläche "Jetzt teilen!" klicken, erscheint der native Teilen-Dialog, mit dem Sie den Inhalt mit anderen Apps teilen können.

<div className={styles.container}>
  <Head>
<title>

Um die Schaltfläche mobilfreundlicher aussehen zu lassen, können wir mit meiner Lieblings-UI-Komponentenbibliothek für Web-Apps - Nextjs (ohne Wortspiel) - etwas Styling hinzufügen.

## Hinzufügen von Konsta UI

Ich habe jahrelang mit [Ionic](https://ionicframework.com/) gearbeitet, um fantastische plattformübergreifende Anwendungen zu erstellen, und es war jahrelang eine der besten Optionen.
Aber jetzt empfehle ich es nicht mehr, da es sehr umständlich ist, es in Nextjs zu integrieren, und es sich nicht wirklich lohnt, wenn man bereits [tailwindcss](https://tailwindcss.com/) hat.

Wenn Sie ein wirklich großartiges mobiles UI möchten, das sich an iOS- und Android-spezifische Stile anpasst, empfehle ich Konsta UI.

Sie müssen [tailwind bereits installiert haben](https://tailwindcss.com/docs/guides/nextjs/)
Um die mobile Benutzeroberfläche Ihrer Nextjs-App zu verbessern, können Sie [Konsta UI](https://konstaui.com/) verwenden, eine mobilfreundliche UI-Komponentenbibliothek, die sich an iOS- und Android-Styling anpasst. Befolgen Sie diese Schritte, um Konsta UI zu integrieren:

1.Installieren Sie die erforderlichen Pakete:

```shell
npm run static
npx cap sync
```

2. Aktualisieren Sie die `tailwind.config.js` Datei:

```shell
npx cap open ios
```

3. Umschließen Sie Ihre App mit der Konsta UI `App` Komponente in `pages/_app.js`:

```shell
npx cap open android
```

### Beispielseite

Nachdem alles eingerichtet ist, können wir Konsta UI React-Komponenten in unseren Next.js-Seiten verwenden.

4. Aktualisieren Sie die `pages/index.js` Datei, um Konsta UI-Komponenten zu verwenden:

```shell
  ipconfig getifaddr en0
  ```

5. Starten Sie den Entwicklungsserver neu und bauen Sie die App neu.

Ihre Next.js-App sollte jetzt eine native mobile Benutzeroberfläche haben, die von Konsta UI angetrieben wird.

## Leistungsoptimierung

Um eine optimale Leistung Ihrer Next.js- und Capacitor-App sicherzustellen, berücksichtigen Sie die folgenden Best Practices:

- Minimieren Sie die App-Größe, indem Sie ungenutzte Abhängigkeiten und Assets entfernen
- Optimieren Sie Bilder und andere Mediendateien, um Ladezeiten zu reduzieren
- Implementieren Sie Lazy Loading für Komponenten und Seiten, um die anfängliche Ladeleistung zu verbessern
- Verwenden Sie serverseitiges Rendering (SSR) mit Next.js, um die Ladegeschwindigkeit der App und die Suchmaschinenoptimierung (SEO) zu verbessern
- Nutzen Sie die integrierten Optimierungen von Capacitor, wie Web-View-Caching und App-Bundling

## Fazit

In diesem Tutorial haben wir untersucht, wie man native mobile Apps mit Next.js und Capacitor erstellt. Durch die Nutzung der Leistungsfähigkeit dieser Technologien können Sie mühelos leistungsstarke, funktionsreiche mobile Anwendungen erstellen.

Wir haben die Schritte zur Einrichtung einer Next.js-App, zur Integration von Capacitor und zum Erstellen und Bereitstellen der App auf mobilen Geräten behandelt. Zusätzlich haben wir die Verwendung von Capacitor-Plugins, das Hinzufügen von Konsta UI für eine verbesserte mobile Benutzeroberfläche und Techniken zur Leistungsoptimierung besprochen.

Um Ihre Next.js- und Capacitor-App auf die nächste Stufe zu heben, erwägen Sie die Erkundung von [Capgo](https://capgo.app/) für nahtlose Live-Updates, um sicherzustellen, dass Ihre Benutzer immer Zugang zu den neuesten Funktionen und Fehlerbehebungen haben.

Wenn Sie die in diesem Leitfaden beschriebenen Best Practices und Techniken befolgen, sind Sie gut ausgerüstet, um beeindruckende native mobile Apps mit Next.js und Capacitor zu erstellen.

## Ressourcen

- [Next.js Dokumentation](https://nextjs.org/docs)
- [Capacitor Dokumentation](https://capacitorjs.com/docs)
- [Konsta UI Dokumentation](https://konsta-ui.com/docs)
- [Capgo - Live-Updates für Capacitor-Apps](https://capgo.app/)

Viel Spaß beim App-Entwickeln!

Erfahren Sie, wie Capgo Ihnen helfen kann, bessere Apps schneller zu erstellen. [Registrieren Sie sich noch heute für ein kostenloses Konto](/register/)