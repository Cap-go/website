---
slug: how-to-customize-build-scripts-with-capacitor-cli
title: So passen Sie Build-Skripte mit der Capacitor CLI an
description: >-
  Erfahren Sie, wie Sie Ihre Build-Skripte mit der Capacitor CLI für effiziente
  Bereitstellungen und maßgeschneiderte App-Updates über verschiedene
  Plattformen hinweg anpassen können.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T01:58:36.984Z
updated_at: 2025-10-22T12:30:10.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873-1743559128944.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Capacitor, build scripts, mobile development, deployment automation,
  environment variables, app updates
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLI ermöglicht es Ihnen, den Build-Prozess Ihrer App für iOS-, Android- und Web-Plattformen anzupassen. Durch Anpassung der Build-Skripte können Sie:

-   **Updates beschleunigen**: Änderungen sofort ohne App-Store-Verzögerungen bereitstellen.
-   **Deployments kontrollieren**: Updates zurückrollen oder bestimmte Benutzergruppen ansprechen.
-   **App absichern**: Verschlüsselung zum Schutz von Updates verwenden.
-   **Builds optimieren**: Einstellungen für plattformspezifische Anforderungen anpassen.

### Schnelle Übersicht der Hauptfunktionen:

-   **Konfigurationsdateien**: Verwenden Sie `capacitor.config.json` und `package.json` zur Verwaltung der Build-Einstellungen.
-   **Benutzerdefinierte Skripte**: Fügen Sie Prebuild- und Postbuild-Aufgaben für Automatisierung hinzu.
-   **Build-Hooks**: Code während bestimmter Phasen des Build-Prozesses ausführen.
-   **Umgebungsvariablen**: Vereinfachen Sie umgebungsspezifische Builds mit `.env`-Dateien.

[Capgo](https://capgo.app/), ein Deployment-Tool, verbessert diesen Prozess mit [automatisierten Updates](https://capgo.app/docs/live-updates/update-behavior/), Versionsverfolgung und globaler Leistungsoptimierung. Lesen Sie weiter, um zu erfahren, wie Sie Ihre Build-Skripte für maximale Effizienz einrichten und anpassen können.

## Einführung in [Capacitor](https://capacitorjs.com/) Configure

![Capacitor Framework Documentation Website](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/7e137b9b90adb3934b29b03381f213c1.jpg)

<Steps>
1. Konfiguration einrichten
2. Builds anpassen
3. Updates verwalten
</Steps>

## Standard Build-Prozess in Capacitor

Das Verständnis des Standard-Build-Prozesses von Capacitor ist entscheidend, wenn Sie ihn effektiv anpassen möchten. Nachfolgend erläutern wir den Build-Prozess der Capacitor CLI und seine wichtigsten Konfigurationsdateien.

### Standard Build-Schritte

Capacitor verwendet einen schrittweisen Prozess, um Ihre Web-App in plattformspezifische Builds umzuwandeln. Hier ist, was während des Standard-Build-Prozesses passiert:

| Phase | Beschreibung | Ausgabe |
| --- | --- | --- |
| **Web Build** | Kompiliert Web-Assets mit Framework-Tools | Optimiertes Web-Bundle |
| **Assets kopieren** | Verschiebt Web-Assets in native Plattformordner | Plattformspezifische Asset-Verzeichnisse |
| **Nativer Build** | Führt plattformspezifische Build-Befehle aus | Einsatzbereite Binärdateien |
| **Verifizierung** | Prüft Build-Integrität und Abhängigkeiten | Build-Status und Warnungen |

### Hauptkonfigurationsdateien

Zwei wichtige Konfigurationsdateien bestimmen, wie Capacitor Ihre Builds handhabt:

**capacitor.config.json**  
Dies ist die Kernkonfigurationsdatei für Ihr Capacitor-Projekt. Sie legt wichtige Parameter für Ihre Builds fest:

```json
{
  "appId": "com.example.app",
  "appName": "Example App",
  "webDir": "dist",
  "bundledWebRuntime": false
}
```

-   **`appId`**: Eine eindeutige Kennung für Ihre App.
-   **`appName`**: Der Name Ihrer App.
-   **`webDir`**: Gibt an, wo Capacitor nach den Web-Assets suchen soll (z.B. `dist`).
-   **`plugins`**: Ermöglicht die Konfiguration plugin-spezifischer Einstellungen, wie SplashScreen-Optionen.

**package.json**  
Diese Datei enthält Build-Skripte und Abhängigkeiten, die den Build-Prozess beeinflussen:

```json
{
  "scripts": {
    "build": "vite build",
    "cap:build": "cap build",
    "cap:sync": "cap sync"
  }
}
```

-   Die `webDir`-Einstellung in `capacitor.config.json` teilt Capacitor mit, wo sich Ihre kompilierten Web-Assets für die Einbindung in die nativen Builds befinden.
-   Nach Änderungen an `capacitor.config.json` müssen Sie `cap sync` ausführen, um sicherzustellen, dass Ihre nativen Projekte aktualisiert werden.

Als Nächstes erkunden wir, wie Sie diese Einstellungen anpassen können, um Ihre Builds weiter zu individualisieren.

## Build-Skripte modifizieren

Sie können den Standard-Build-Prozess von Capacitor an Ihre Projektanforderungen anpassen. Hier ist wie:

### Konfigurationsdatei-Einstellungen

Sie können den Build-Prozess durch Bearbeiten der `capacitor.config.json`-Datei anpassen. Hier ist ein Beispiel für eine Konfiguration:

```json
{
  "appId": "com.example.app",
  "appName": "Example App",
  "webDir": "dist",
  "server": {
    "hostname": "app.example.com",
    "allowNavigation": ["*.example.com"]
  }
}
```

Hier sind einige wichtige Einstellungen, die Sie ändern können:

-   **`webDir`**: Gibt an, wo sich Ihre kompilierten Web-Assets befinden.
-   **`server`**: Konfiguriert den Entwicklungsserver, einschließlich Hostname und Navigationsberechtigungen.
-   **`android/ios`**: Ermöglicht plattformspezifische Build-Einstellungen, wie Keystore-Details für Android oder Bereitstellungsoptionen für iOS.

### NPM-Skripte erstellen

Um Ihren Workflow zu optimieren, fügen Sie benutzerdefinierte NPM-Skripte zu Ihrer `package.json`-Datei hinzu. Hier ist ein Beispiel:

```json
{
  "scripts": {
    "prebuild": "node scripts/prepare-env.js",
    "build": "vite build",
    "postbuild": "node scripts/notify-build-complete.js",
    "build:android": "cap build android",
    "build:ios": "cap build ios"
  }
}
```

-   **`prebuild` und `postbuild`**: Verwenden Sie diese für Aufgaben wie das Einrichten der Umgebung oder das Senden von Benachrichtigungen, wenn der Build abgeschlossen ist.
-   **`build:platform`**: Plattformspezifische Befehle zum Erstellen von Android- oder iOS-Apps.

Sie können die Automatisierung durch Hinzufügen von Build-Hooks noch weiter ausbauen.

### Build-Hooks Einrichtung

Für erweiterte Kontrolle verwenden Sie Build-Hooks, um benutzerdefinierten Code an bestimmten Punkten während des Build-Prozesses auszuführen. Hier ist ein Beispiel-Setup in `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  hooks: {
    preBuild: async () => {
      console.log('Pre-build hook executed');
    },
    postBuild: async () => {
      console.log('Post-build hook executed');
    }
  }
};

export default config;
```

Mit Build-Hooks können Sie:

-   Anforderungen vor dem Build validieren
-   Assets während des Prozesses transformieren
-   Benachrichtigungen an wichtigen Punkten auslösen
-   Versionsnummern automatisch aktualisieren
-   Automatisierte Tests nahtlos ausführen

Dieser Ansatz gibt Ihnen größere Flexibilität und Kontrolle über den gesamten Build-Lebenszyklus.

## Erweiterte Build-Anpassung

Bei der Arbeit an größeren Projekten kann die Feinabstimmung Ihres Build-Prozesses einen großen Unterschied machen. Hier erfahren Sie, wie Sie umgebungsspezifische Builds und Plattform-Anpassungen effektiv handhaben.

### Umgebungsvariablen

Richten Sie Umgebungsvariablen ein, indem Sie separate `.env`-Dateien für jede Umgebung erstellen:

-   `.env.development`
-   `.env.staging`
-   `.env.production`

Konfigurieren Sie dann Ihr Build-Skript, um die entsprechende Datei basierend auf der Umgebung zu laden:

```bash
NODE_ENV=production npm run build
```

Sie können diese Einstellungen weiter anpassen, um plattformspezifische Anforderungen zu erfüllen.

### Plattformspezifische Builds

Um Builds für Android und iOS anzupassen, verwenden Sie folgende Struktur:

```json
{
  "ios": {
    "contentInset": "always",
    "backgroundColor": "#ffffff",
    "scheme": "App"
  },
  "android": {
    "backgroundColor": "#ffffff",
    "allowMixedContent": true
  }
}
```

Diese Konfigurationen ermöglichen es Ihnen, Builds für jede Plattform anzupassen und sorgen für reibungslosere Deployments.

| Funktion | Android | iOS |
| --- | --- | --- |
| Debug-Symbole | [ProGuard](https://www.guardsquare.com/proguard) Mapping-Dateien | dSYM-Dateien |
| Build-Varianten | debug, release, staging | debug, release |
| Code-Signierung | Keystore-Verwaltung | Bereitstellungsprofile |
| Asset-Verwaltung | res/drawable-Optimierung | Asset-Kataloge |

Weitere Tipps zur Optimierung Ihrer Builds sind:

-   Nutzung von Teil-Updates zur Zeitersparnis bei Deployments
-   Einrichtung von Fehler-Tracking zur schnellen Problemidentifizierung
-   Erstellung von Kanalsystemen für Beta-Test-Versionen
-   Aktivierung der Ende-zu-Ende-Verschlüsselung für sichere Verteilung

In Kombination mit Tools wie Capgo für Analytik und sichere Updates geben diese Techniken Ihnen mehr Kontrolle über Ihren Deployment-Prozess [\[1\]](https://capgo.app/).

## Build-Skript Probleme & Lösungen

Bei der Arbeit mit benutzerdefinierten Build-Konfigurationen ist die schnelle Behebung von Fehlern entscheidend, um den Build-Prozess reibungslos am Laufen zu halten.

### Häufige Fehler beheben

Viele Build-Skript-Probleme stammen von der Umgebungseinrichtung oder Abhängigkeitsproblemen. Hier erfahren Sie, wie Sie einige häufige Probleme angehen:

**Fehlende Umgebungsvariablen**

Wenn Sie einen Fehler wie diesen sehen:

```bash
Error: Missing required environment variable APP_KEY
```

Können Sie ihn beheben, indem Sie eine `.env.local`-Datei im Wurzelverzeichnis Ihres Projekts erstellen. Hier ein Beispiel:

```
APP_KEY=your-secret-key
API_URL=https://api.example.com
```

**Plattformspezifische Build-Fehler**

Für Android-Signierungsfehler verwenden Sie diesen Befehl:

```bash
keytool -genkey -v -keystore release-key.keystore -alias app-alias -keyalg RSA
```

Für iOS-Bereitstellungsprofil-Probleme versuchen Sie dies:

```bash
xcode-select --install
```

| Fehlertyp | Häufige Ursache | Lösung |
| --- | --- | --- |
| Signierungskonfiguration | Fehlende Keystore-Details | `KEYSTORE_PATH` und Anmeldedaten setzen |
| Build-Umgebung | Undefinierte Variablen | Plattformspezifische `.env`-Dateien erstellen |
| Abhängigkeiten | Versionsunterschiede | `package.json` aktualisieren und synchronisieren |

Nach dem Anwenden von Korrekturen stellen Sie sicher, dass Ihre Änderungen solide sind, indem Sie gründliche Build-Tests durchführen.

### Build-Skripte testen

Sobald die Fehler behoben sind, validieren Sie Ihre Build-Skripte mit diesen Schritten:

-   **Automatisierte Verifizierung**: Führen Sie wichtige Befehle aus, um zu bestätigen, dass der Build-Prozess wie erwartet funktioniert.

```bash
npm run test:builds
```

-   **Umgebungsvalidierung**: Prüfen Sie auf fehlende Umgebungsvariablen vor dem Start des Builds.

```bash
node scripts/validate-env.js
```

-   **Build-Skript-Debugging**: Fügen Sie detaillierte Skripte hinzu, um potenzielle Probleme während des Builds zu erkennen.

```bash
DEBUG=true npm run build
```

Zusätzliche Tipps zum Testen:

-   Verwenden Sie [Docker](https://www.docker.com/)-Container zur Isolierung von Builds.
-   Validieren Sie Konfigurationsdateien vor dem Start des Prozesses.
-   Testen Sie mit mehreren [Node.js](https://nodejs.org/en)-Versionen.
-   Bestätigen Sie, dass plattformspezifische Anforderungen erfüllt sind.
-   Behalten Sie die Build-Leistung für mögliche Verbesserungen im Auge.

## [Capgo](https://capgo.app/) Build-Funktionen

![Capgo Live Update Dashboard Interface](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/454adbba4c00491adce88db59812b177.jpg)

Capgo hebt Build-Skripte mit automatisiertem Deployment auf die nächste Stufe und verbessert die Effizienz und vereinfacht den Prozess.

### Schnelle App-Updates

Capgos Update-Leistung ist beeindruckend:

-   **95% der aktiven Nutzer** erhalten Updates innerhalb von 24 Stunden.
-   **82% Erfolgsrate** bei der Update-Zustellung weltweit.
-   Eine durchschnittliche API-Antwortzeit von **57ms global**.

Die Plattform verwendet Teil-

Dieses Sicherheitsframework wurde in Hunderten von Unternehmensanwendungen gründlich getestet. Für Teams, die zusätzliche Sicherheit benötigen, bietet Capgo auch selbst gehostete Lösungen mit anpassbaren Konfigurationen.

Das Kanalsystem von Capgo macht die Update-Verteilung flexibel. Entwickler können bestimmte Benutzergruppen mit verschiedenen Versionen ansprechen, perfekt für Beta-Tests oder schrittweise Einführungen.

## Zusammenfassung

### Überblick der Build-Schritte

Benutzerdefinierte Build-Skripte ermöglichen automatisierte und konsistente Bereitstellungen durch die Nutzung von Build-Hooks, Umgebungsvariablen und plattformspezifischen Befehlen. Diese Prozesse schaffen eine solide Grundlage für Bereitstellungsverbesserungen, die mit Capgo möglich sind.

### Capgo-Vorteile

Capgo vereinfacht die Bereitstellung und hat bereits über 23,5 Millionen Updates in 750 Produktions-Apps erfolgreich ausgeliefert [\[1\]](https://capgo.app/). Das teilweise Aktualisierungssystem reduziert sowohl die Bandbreitennutzung als auch die Bereitstellungszeit.

Die Plattform bietet schnelle Updates, globale Leistungsoptimierung, Ende-zu-Ende-Verschlüsselung für Sicherheit und ein flexibles kanalbasiertes Verteilungssystem. Diese Einrichtung unterstützt gezielte Updates, Beta-Tests und die Einhaltung von App-Store-Richtlinien bei gleichzeitiger Aufrechterhaltung eines starken Sicherheitsframeworks.
