---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: Next.js 14とCapacitorによるネイティブモバイルアプリ開発：ステップバイステップガイド2024
description: >-
  Découvrez dans ce guide complet comment créer une application mobile native
  avec Next.js 14 et Capacitor. Apprenez les meilleures pratiques et les
  techniques les plus récentes pour développer des applications mobiles robustes
  et riches en fonctionnalités.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 14 und Capacitor Illustration
keywords: >-
  Next.js 14, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: de
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## Einführung

In diesem Tutorial werden wir erkunden, wie man native mobile Apps mit der leistungsstarken Kombination aus [Nextjs](https://nextjsorg/) 14 und [Capacitor](https://capacitorjscom/) in 2024 erstellt. Durch die Nutzung der neuesten Versionen dieser Technologien können Sie problemlos leistungsstarke, funktionsreiche mobile Anwendungen entwickeln. Wir zeigen auch, wie man die mobile Benutzeroberfläche mit [Konsta UI](https://konstauicom/) und Tailwind CSS verbessert, wobei dieser Schritt optional ist.

Nextjs, ein beliebtes React-Framework, bietet eine solide Grundlage für die Entwicklung von Webanwendungen, während Capacitor es Ihnen ermöglicht, Ihre Nextjs-App ohne größere Änderungen oder die Notwendigkeit, neue Fähigkeiten wie React Native zu erlernen, in eine native mobile App zu verwandeln. Dieses Tutorial führt Sie durch den Prozess, beginnend mit der Einrichtung einer neuen Nextjs-App und der Integration von Capacitor zur Erstellung einer nativen mobilen Erfahrung.

### Vorteile der Verwendung von Nextjs und Capacitor

- **Code-Wiederverwendbarkeit**: Nextjs ermöglicht es Ihnen, wiederverwendbare Komponenten zu schreiben und Code zwischen Ihren Web- und Mobile-Apps zu teilen, was Zeit und Aufwand bei der Entwicklung spart.
- **Leistung**: Nextjs bietet integrierte Leistungsoptimierungen wie serverseitiges Rendering und Code-Splitting, die schnelle Ladezeiten und eine reibungslose Benutzererfahrung gewährleisten.
- **Native Funktionen**: Capacitor bietet Zugriff auf native Gerätefunktionen wie Kamera, Geolokalisierung und mehr, sodass Sie funktionsreiche mobile Apps entwickeln können.
- **Vereinfachte Entwicklung**: Mit Capacitor können Sie Ihre mobile App mit vertrauten Webtechnologien entwickeln und testen, wodurch die Lernkurve reduziert und der Entwicklungsprozess optimiert wird.

## Vorbereitung Ihrer Nextjs-App

Lassen Sie uns zunächst eine neue Nextjs-Anwendung mit dem Befehl `create-next-app` erstellen:

[[CODE_BLOCK]]

Dieser Befehl richtet ein leeres Nextjs-Projekt mit der empfohlenen Konfiguration für die neueste Version ein.

Navigieren Sie als Nächstes zum Projektverzeichnis:

[[CODE_BLOCK]]

Um eine native mobile App zu erstellen, müssen wir einen statischen Export unseres Nextjs-Projekts generieren. Aktualisieren Sie die `package.json`-Datei, um ein Skript für das Bauen und Exportieren des Projekts einzufügen:

[[CODE_BLOCK]]

Die Ausführung des Befehls `npm run static` kann aufgrund von Inkompatibilitäten bei der Bildoptimierung zu Fehlern führen. Um dies zu beheben, öffnen Sie die `next.config.js`-Datei und ändern Sie sie wie folgt:

[[CODE_BLOCK]]

Jetzt sollte `npm run static` ohne Probleme funktionieren, und Sie finden einen neuen `out`-Ordner im Wurzelverzeichnis Ihres Projekts. Dieser Ordner wird in den nächsten Schritten von Capacitor verwendet.

## Hinzufügen von Capacitor zu Ihrer Nextjs 14 App

Befolgen Sie diese Schritte, um Ihre Nextjs-App in einen nativen mobilen Container zu verpacken:

1. Installieren Sie die [Capacitor CLI](https://capacitorjscom/docs/cli/) als Entwicklungsabhängigkeit:

[[CODE_BLOCK]]

2. Initialisieren Sie Capacitor in Ihrem Nextjs-Projekt:

[[CODE_BLOCK]]

Während des Initialisierungsprozesses können Sie "Enter" drücken, um die Standardwerte für den App-Namen und die Bundle-ID zu akzeptieren.

3. Installieren Sie die erforderlichen Capacitor-Pakete:

[[CODE_BLOCK]]

4. Fügen Sie die nativen Plattformen hinzu:

[[CODE_BLOCK]]

Capacitor erstellt Ordner für jede Plattform (`ios` und `android`) im Wurzelverzeichnis Ihres Projekts. Diese Ordner enthalten die nativen Projekte für iOS und Android.

Um auf das Android-Projekt zuzugreifen und es zu erstellen, müssen Sie [Android Studio](https://developerandroidcom/studio) installiert haben. Für die iOS-Entwicklung benötigen Sie einen Mac mit installiertem [Xcode](https://developerapplecom/xcode/).

5. Konfigurieren Sie Capacitor:

Öffnen Sie die `capacitor.config.ts`-Datei und aktualisieren Sie die `webDir`-Eigenschaft, um auf das Ausgabeverzeichnis Ihres Nextjs-Builds zu verweisen:

[[CODE_BLOCK]]

6. Bauen und synchronisieren Sie Ihr Projekt:

[[CODE_BLOCK]]

Der Befehl `npm run static` baut Ihr Nextjs-Projekt und exportiert die statischen Dateien, während `npx cap sync` den Webcode mit den nativen Plattformen synchronisiert.