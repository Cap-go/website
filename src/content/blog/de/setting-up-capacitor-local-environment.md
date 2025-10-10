---
slug: setting-up-capacitor-local-environment
title: Einrichten der Capacitor-Lokalen Umgebung
description: >-
  Lernen Sie mit dieser umfassenden Anleitung, wie Sie schnell eine lokale
  Capacitor-Umgebung zum Erstellen von iOS- und Android-Apps mit Webtechnologien
  einrichten.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-03T01:01:07.065Z
updated_at: 2025-10-10T01:50:18.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67edd19cebbb9dc8064069d2-1743642078509.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Capacitor, mobile development, iOS setup, Android setup, app development, web
  technologies, local environment
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---
**Möchten Sie iOS- und Android-Apps mit Webtechnologien erstellen? Hier erfahren Sie, wie Sie eine lokale [Capacitor](https://capacitorjs.com/) Umgebung schnell und effizient einrichten.**

### Wichtige Schritte:

1. **Erforderliche Software installieren**:
    
    - **[Node.js](https://nodejs.org/en)** (v20.0.0+), **npm** (v9.0.0+), **Git** (v2.40.0+) und eine moderne IDE (z.B. [VS Code](https://code.visualstudio.com/)).
    - Systemanforderungen: 8GB RAM, 256GB Speicher, Intel i5/AMD Ryzen 5 Prozessor.
2. **iOS-Einrichtung** (nur macOS):
    
    - macOS 13.0+ (Ventura), [Xcode](https://developer.apple.com/xcode/) 16.0+, [CocoaPods](https://cocoapods.org/) 1.12.0+ und ein aktives Apple Developer-Konto.
3. **Android-Einrichtung**:
    
    - [Android Studio](https://developer.android.com/studio) Hedgehog (2023.1.1)+, Android SDK API Level 23+, JDK 17 und [Gradle](https://gradle.org/) 8.0+.
    - Umgebungsvariablen für Android-Tools festlegen.
4. **Capacitor installieren**:
    
    ```bash
    npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
    ```
    
5. **Projekt initialisieren**:
    
    - Erstellen Sie ein neues Projekt oder integrieren Sie Capacitor in eine bestehende App mit `npx cap init`.
6. **Plattformen hinzufügen**:
    
    ```bash
    npx cap add ios
    npx cap add android
    ```
    
7. **Build und Synchronisation**:
    
    - Web-Assets erstellen (`npm run build`) und mit nativen Plattformen synchronisieren (`npx cap sync`).
8. **Live-Updates aktivieren**:
    
    - Verwenden Sie [Capgo](https://capgo.app/) für Echtzeit-Updates mit:
        
        ```bash
        npx @capgo/cli init
        ```
        
9. **[Testen Sie Ihre App](https://capgo.app/docs/plugin/debugging/)**:
    
    - Verwenden Sie iOS Simulator (`npx cap open ios`) oder Android Emulator (`npx cap open android`).

### Schneller Tipp:

Aktualisieren Sie `capacitor.config.ts`, um Umgebungen zu verwalten und Live-Updates zu aktivieren. Zum Beispiel:

```typescript
const config: CapacitorConfig = {
  server: {
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://production-url.com',
    cleartext: true
  }
};
```

Diese Einrichtung gewährleistet eine reibungslose Entwicklung, Tests und Bereitstellung Ihrer Capacitor-Apps.

## Ionic Capacitor - Neue App erstellen - In Android & iOS ausführen ...

<iframe src="https://www.youtube.com/embed/krTN38Z-Ux4" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Erforderliche Einrichtung

Stellen Sie sicher, dass Ihr System die notwendigen Spezifikationen erfüllt, bevor Sie fortfahren.

### Grundlegende Softwareanforderungen

Installieren Sie die folgenden Tools:

| Software | Mindestversion | Hinweise |
| --- | --- | --- |
| **Node.js** | v20.0.0+ | LTS-Version wird empfohlen |
| **npm** | v9.0.0+ | Wird mit Node.js mitgeliefert |
| **Git** | v2.40.0+ | Erforderlich für Versionskontrolle |
| **VS Code/[WebStorm](https://www.jetbrains.com/webstorm/)** | Neueste | Jede moderne IDE funktioniert |

Ihr Gerät sollte mindestens **8GB RAM**, **256GB Speicher** und einen **Intel i5/AMD Ryzen 5 (oder gleichwertigen) Prozessor** haben.

### iOS- und Android-Einrichtung

**iOS-Anforderungen** (nur macOS):

- macOS 13.0 (Ventura) oder neuer
- Xcode 16.0 oder höher (Download aus dem Mac App Store)
- CocoaPods 1.12.0 oder höher (Installation mit `sudo gem install cocoapods`)
- Ein aktives Apple Developer-Konto

**Android-Anforderungen** (Windows/macOS/Linux):

- Android Studio Hedgehog (2023.1.1) oder höher
- Android SDK API Level 23 (Android 6.0) oder höher
- Java Development Kit (JDK) 17
- Gradle 8.0+

Richten Sie Android-Umgebungsvariablen ein, indem Sie diese Zeilen zu Ihrer Shell-Konfigurationsdatei hinzufügen:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Capacitor installieren

Installieren Sie Capacitor mit npm:

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
```

Wenn Sie ein Framework wie Vue, React oder Angular verwenden, installieren Sie die entsprechenden Capacitor-Plugins. Für Vue führen Sie aus:

```bash
npm install @capacitor/vue
```

Um die Installation zu bestätigen, überprüfen Sie die Capacitor-Version mit:

```bash
npx cap --version
```

Sie sollten die aktuelle Capacitor-Version angezeigt bekommen (z.B. 5.x.x Stand April 2025).

Abschließend initialisieren Sie Capacitor in Ihrem Projektverzeichnis:

```bash
npx cap init
```

Nach Abschluss können Sie diese Komponenten für Ihr spezifisches Projekt konfigurieren.

[Continues with remaining text in same format and style...]
