---
slug: capacitor-cli-project-setup-guide
title: 'Capacitor CLI: Projekt-Einrichtungs-Leitfaden'
description: >-
  Erfahren Sie, wie Sie die Capacitor CLI für die Entwicklung nativer iOS- und
  Android-Apps mit Webtechnologien in wenigen einfachen Schritten einrichten.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-18T03:02:50.225Z
updated_at: 2025-04-18T03:04:53.935Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847-1744945493935.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Capacitor, CLI, mobile apps, iOS, Android, project setup, live updates,
  troubleshooting
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
original_slug: capacitor-cli-project-setup-guide
---
**Möchten Sie iOS- und Android-Apps mit einer Codebasis erstellen?** [Capacitor](https://capacitorjs.com/) CLI vereinfacht den Prozess und ermöglicht es Ihnen, native Apps mit Webtechnologien zu erstellen. Hier lernen Sie:

-   **Schnelle Einrichtung**: Installieren Sie Capacitor CLI und initialisieren Sie Ihr Projekt in Minuten.
-   **Plattform-Integration**: Fügen Sie iOS- und Android-Unterstützung mit einfachen Befehlen hinzu.
-   **Live-Updates**: Nutzen Sie [Capgo](https://capgo.app/) für sofortige Over-the-Air-Updates.
-   **Häufige Problembehebungen**: Beheben Sie Probleme wie Synchronisierungsfehler oder Build-Fehler.

**Wichtige Schritte zum Start:**

1.  Installieren Sie [Node.js](https://nodejs.org/en), npm, JDK, [Xcode](https://developer.apple.com/xcode/) und [Android Studio](https://developer.android.com/studio).
2.  Führen Sie `npm install @capacitor/core @capacitor/cli` aus und initialisieren Sie Ihr Projekt.
3.  Fügen Sie iOS- und Android-Plattformen mit `npx cap add ios` und `npx cap add android` hinzu.
4.  Optional: Richten Sie Capgo für Live-[App-Updates](https://capgo.app/plugins/capacitor-updater/) ein.

Dieser Leitfaden behandelt alles, was Sie für die Einrichtung von Capacitor CLI, die Konfiguration von Plattformen und die Bereitstellung Ihrer App benötigen. Los geht's!

## Einführung in [Capacitor](https://capacitorjs.com/) Configure

![Capacitor](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/7e137b9b90adb3934b29b03381f213c1.jpg)

<Steps>

## Systemvoraussetzungen

Stellen Sie sicher, dass Sie folgende Tools installiert haben:

-   **Node.js** (Version 14 oder neuer) und **npm**
-   **Java JDK** (Version 11 oder neuer)
-   **Xcode** (Version 12 oder neuer für iOS-Builds)
-   **Android Studio** (für Android-Builds)
-   **Capacitor CLI** (Version 6 oder 7)

_Optional:_ Wenn Sie Live-Updates aktivieren möchten, lesen Sie den "[Capgo Setup Guide](https://capgo.app/docs/plugin/cloud-mode/getting-started/)" unten.

## CLI-Installationsschritte

Stellen Sie vor dem Start sicher, dass **Node.js**, **npm**, **JDK**, **Xcode** und **Android Studio** eingerichtet sind. Sobald Sie bereit sind, können Sie die Capacitor CLI mit folgendem Befehl installieren:

```bash
npm install --save @capacitor/core @capacitor/cli
npx cap init
```

Dieser Befehl installiert Capacitor und richtet seine Kernkomponenten ein.

Nach Abschluss dieses Schritts gehen Sie zu **Neues Projekt erstellen** über, um Ihre Anwendung aufzubauen.

## Neues Projekt erstellen

Um mit Ihrem Projekt [mit Capacitor CLI](https://capgo.app/docs/cli/commands/) zu beginnen, folgen Sie diesen Schritten:

```bash
mkdir my-app && cd my-app
npm init -y
npx cap init my-app com.company.app --web-dir dist
```

### Konfigurationsdatei aktualisieren

Bearbeiten Sie die `capacitor.config.json` Datei, um folgende Einstellungen aufzunehmen:

```json
{
  "appId": "com.company.app",
  "appName": "My App",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "hostname": "app.example.com",
    "androidScheme": "https"
  }
}
```

Sobald diese aktualisiert ist, verwenden Sie diese Konfiguration, um Capacitor für Ihr Projekt einzurichten.

## Plattform-Setup

Nachdem das Projekt-Scaffolding abgeschlossen ist, ist es Zeit, iOS- und Android-Ziele einzurichten.

### iOS und Android hinzufügen

Beginnen Sie mit der Installation der erforderlichen plattformspezifischen Pakete mit der Capacitor CLI:

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

Für iOS benötigen Sie Xcode 14 oder neuer, [CocoaPods](https://cocoapods.org/) 1.11 oder neuer und macOS 12 oder höher. Für Android benötigen Sie Android Studio Giraffe (2022.3.1+), JDK 17 oder neuer und [Gradle](https://gradle.org/) 7.5 oder höher.

Nach der Installation müssen Sie Ihre nativen Ziele mit Änderungen an Ihrer Webanwendung aktuell halten.

### Plattform-Updates

Um Ihre Plattformen mit den neuesten Web-Änderungen zu synchronisieren, führen Sie diese Schritte nach der Aktualisierung Ihrer Web-App aus:

```bash
npm run build
npx cap sync
```

Der `cap sync` Befehl erledigt zwei Aufgaben:

-   Kopiert aktualisierte Web-Assets zu den nativen Plattformen
-   Aktualisiert native Konfigurationen und Plugins entsprechend den neuesten Änderungen

### IDE-Einrichtung

Öffnen Sie die plattformspezifischen Projekte in den entsprechenden IDEs:

**In Xcode:**

1.  Wählen Sie Ihr Entwicklerteam aus.
2.  Richten Sie Signaturzertifikate ein.
3.  Aktualisieren Sie Ihre Bundle-ID.

**In Android Studio:**

1.  Ändern Sie die Anwendungs-ID in `build.gradle`.
2.  Konfigurieren Sie den Keystore für die Signierung.
3.  Richten Sie Debug- und Release-Build-Varianten ein.

Wenn alles konfiguriert ist, erstellen Sie die Projekte mit `npx cap build ios` oder `npx cap build android`. Vergessen Sie nicht, `npx cap sync` erneut auszuführen, um sicherzustellen, dass alle Assets aktuell sind.

## [Capgo](https://capgo.app/) Einrichtungsanleitung

![Capgo](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

Richten Sie Capgo ein, um sofortige Over-the-Air-Updates für Ihre App zu ermöglichen.

### Hauptfunktionen von Capgo

Capgo bietet verschiedene Tools zur Optimierung von App-Updates:

-   **Ende-zu-Ende-Verschlüsselung** gewährleistet sichere Übermittlung von Updates.
-   Updates laufen **im Hintergrund** beim App-Start.
-   **Analyse-Tools** helfen bei der Verfolgung von Update-Erfolgsraten und Benutzerengagement.
-   Eine **Ein-Klick-Rollback-Option** ermöglicht schnelle Wiederherstellung bei problematischen Updates.
-   Nutzen Sie das **[Kanalsystem](https://capgo.app/docs/plugin/cloud-mode/channel-system/)** für gestaffelte Rollouts und Beta-Tests.

### Installation von Capgo

Befolgen Sie diese Schritte, um mit Capgo zu beginnen:

1.  [Installieren Sie die Capgo CLI](https://capgo.app/docs/self-hosted/local-dev/cli/):
    
    ```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```
    
2.  [Initialisieren Sie Capgo](https://capgo.app/docs/webapp/) in Ihrem Projekt:
    
    ```bash
    npm install --save @capgo/cli
    ```
    
3.  Erstellen und veröffentlichen Sie Updates:
    
    ```bash
    npx capgo init
    ```
    
4.  Öffnen Sie die App, um den Hintergrund-Update-Prozess auszulösen.

### Best Practices

-   Nutzen Sie Kanäle, um Updates zu testen, bevor Sie sie an alle Benutzer ausrollen.
-   Überwachen Sie Analysen, um sicherzustellen, dass Updates erfolgreich zugestellt werden und Benutzer engagiert bleiben.
-   Aktivieren Sie Fehlerverfolgung, um Probleme frühzeitig zu erkennen und zu beheben.
-   Halten Sie die Rollback-Funktion bereit, um schnell auf Probleme reagieren zu können.

Capgo ist kompatibel mit Capacitor 6 und 7, integriert sich nahtlos in CI/CD-Pipelines und erfüllt die Anforderungen von Apple- und Google-Stores.

## Häufige Probleme und Tipps

Nach Abschluss der Plattform- und Capgo-Einrichtung könnten einige häufige Fehler auftreten. Hier erfahren Sie, wie Sie diese schnell beheben.

### Umgebungseinrichtungsprobleme

-   **CLI nicht gefunden**  
    **Fehler**: Der Befehl `npx cap` schlägt fehl.  
    **Lösung**: Führen Sie `npm install --save @capacitor/cli @capacitor/core` aus und versuchen Sie es erneut.
    
-   **Node-Version stimmt nicht überein**  
    **Fehler**: CLI-Befehle schlagen aufgrund von Node.js-Versionsfehlern fehl.  
    **Lösung**: Installieren Sie Node.js Version 14 oder höher gemäß den Einrichtungsanforderungen.

### Konfigurationsprobleme

-   **Konfigurationsabweichung**  
    **Fehler**: Änderungen in `capacitor.config.json` werden nicht wirksam.  
    **Lösung**: Stellen Sie sicher, dass die Werte `appId` und `webDir` mit der `package.json` Ihres Projekts und dem Web-Build-Ausgabeordner übereinstimmen.
    
-   **Plattform-Sync-Fehler**  
    **Fehler**: Die Ausführung von `npx cap sync` führt zu Plugin-Versionskonflikten.  
    **Lösung**: Aktualisieren Sie `@capacitor/android` und `@capacitor/ios` auf die gleiche Hauptversion und führen Sie dann den Sync-Befehl erneut aus.

### Build und Deployment

-   **Build-Signierungsfehler**  
    **Fehler**: iOS- oder Android-Builds schlagen aufgrund fehlender Zertifikate oder Keystore fehl.  
    **Lösung**: Folgen Sie den IDE-Einrichtungsanweisungen. Fügen Sie für iOS Ihr Entwicklerteam in Xcode hinzu. Konfigurieren Sie für Android den Keystore in `build.gradle`.
    
-   **Webverzeichnis nicht gefunden**  
    **Fehler**: `npx cap sync` kann die Web-Assets nicht finden.  
    **Lösung**: Führen Sie Ihren Web-Build-Befehl (z.B. `npm run build`) vor der Synchronisierung der Plattformen aus.
    

### Live-Update-Probleme

-   **[Capgo Update-Fehler](https://capgo.app/docs/plugin/cloud-mode/manual-update/)**  
    **Fehler**: Updates erscheinen nicht in der Produktions-App.  
    **Lösung**: Überprüfen Sie Ihren [Capgo API-Schlüssel](https://capgo.app/docs/webapp/api-keys/) in `capacitor.config.json` und stellen Sie sicher, dass Sie den richtigen Kanal ansprechen.

Für weitere Details zur plattformspezifischen Einrichtung, besuchen Sie den Abschnitt Platform Setup. Wenn Sie mit Live-Updates arbeiten, konsultieren Sie den Capgo Setup Guide für zusätzliche Fehlerbehebungstipps.

## Zusammenfassung

### Setup-Überprüfung

Starten Sie Ihre Web-App mit Capacitor CLI, richten Sie iOS- und Android-Plattformen ein und fügen Sie optional Capgo für Live-Updates hinzu.

So beginnen Sie:

1. Verwenden Sie die Capacitor CLI, um Ihr Projekt zu initialisieren.
2. Richten Sie die Paket-ID Ihrer App ein und definieren Sie das Web-Ausgabeverzeichnis.
3. Fügen Sie Unterstützung für iOS- und Android-Plattformen hinzu.
4. Installieren und richten Sie Capgo mit folgendem Befehl ein: `npm install --save @capgo/cli && npx capgo init`

Für detaillierte Einrichtungsanweisungen oder Fehlerbehebung, schauen Sie in die offizielle Capacitor- und Capgo-Dokumentation.
