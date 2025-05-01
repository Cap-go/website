---
slug: firebase-crashlytics-for-capacitor-apps
title: Capacitorアプリ向けFirebase Crashlytics
description: >-
  Erfahren Sie in dieser schrittweisen Anleitung zur Crashlytics-Einrichtung für
  iOS und Android, wie Sie Echtzeit-Absturzberichte in Ihre mobile App
  integrieren können.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-21T03:55:39.168Z
updated_at: 2025-04-21T03:56:15.479Z
head_image: >-
  https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf-1745207775479.jpg
head_image_alt: Mobile Entwicklung
keywords: >-
  Firebase, Crashlytics, mobile apps, Capacitor, app development, crash
  reporting, error tracking
tag: 'Development, Mobile, Updates'
published: true
locale: de
next_blog: ''
---

**[Firebase Crashlytics](https://firebasegooglecom/docs/crashlytics)** hilft Ihnen, App-Abstürze in Echtzeit zu verfolgen und liefert detaillierte Berichte, um Probleme schnell zu beheben. Es integriert sich nahtlos mit [Capacitor](https://capacitorjscom/) für iOS- und Android-Apps. Hier ist, was Sie wissen müssen:

-   **Warum Crashlytics verwenden?**
    
    -   Erhalten Sie **Echtzeitbenachrichtigungen bei Abstürzen**
    -   Analysieren Sie detaillierte Absturzberichte mit **automatischer Problemgruppierung**
    -   Überwachen Sie kritische Fehler, um Apps stabil zu halten
-   **Setup-Anforderungen:**
    
    -   Installieren Sie **[Nodejs](https://nodejsorg/en) (v16+)**, **Capacitor (v4+)** und Tools wie **[Xcode](https://developerapplecom/xcode/) 14+** und **[Android Studio](https://developerandroidcom/studio) Electric Eel**
    -   Laden Sie [Firebase](https://firebasegooglecom/) Konfigurationsdateien herunter (`GoogleService-Infoplist` für iOS, `google-servicesjson` für Android)
    -   Aktualisieren Sie plattformspezifische Dateien wie `Podfile` (iOS) und `buildgradle` (Android)
-   **Wichtige Schritte:**
    
    -   Installieren Sie Crashlytics:
        
        [[CODE_BLOCK]]
        
    -   Initialisieren Sie Crashlytics in Ihrer App:
        
        [[CODE_BLOCK]]
        
-   **Testen Sie Ihr Setup:**
    
    -   Lösen Sie einen Testabsturz aus:
        
        [[CODE_BLOCK]]
        
-   **Bonus-Tipp:** Kombinieren Sie Crashlytics mit **[Capgo](https://capgoapp/)** für sofortige Live-Updates ohne App-Store-Verzögerungen
    

Diese Anleitung stellt sicher, dass Ihre App abstürzfrei und benutzerfreundlich ist. Beginnen Sie noch heute mit der Einrichtung von Firebase Crashlytics!

## 2021 Android-Anleitung: [Firebase Crashlytics](https://firebasegooglecom/docs/crashlytics) - benutzerdefinierter Absturz

![Firebase Crashlytics](https://assetsseobotaicom/capgoapp/6805ba51360079f947b8a1bf/3578d58943ebaf5b91a7f0e1afb1607fjpg)

[[HTML_TAG]][[HTML_TAG]]

## Setup-Anforderungen

Bevor Sie beginnen, stellen Sie sicher, dass Sie die folgenden Schritte abgeschlossen haben:

### Erforderliche Software und Konten

Sie müssen Folgendes installieren:

-   **Nodejs** (v16 oder höher) und **Capacitor** (v4 oder höher)
-   Ein **Firebase-Konto** mit einem aktiven Projekt
-   **Xcode 14+** für iOS-Entwicklung
-   **Android Studio Electric Eel** oder eine neuere Version für Android-Entwicklung
-   Die neueste Version von **[CocoaPods](https://cocoapodsorg/)** (erforderlich für iOS)

### Plattform-Konfigurationsdateien

**Für iOS:**

-   Laden Sie die `GoogleService-Infoplist`-Datei aus der Firebase Console herunter
-   Aktualisieren Sie Ihre `Podfile`, um Crashlytics-Abhängigkeiten einzuschließen
-   Fügen Sie die notwendigen Datenschutzschlüssel zu Ihrer `Infoplist`-Datei hinzu

**Für Android:**

-   Beziehen Sie die `google-servicesjson`-Datei aus der Firebase Console
-   Nehmen Sie Änderungen sowohl an der Projekt- als auch an der App-Level `buildgradle`-Datei vor
-   Aktualisieren Sie die `AndroidManifestxml` um die erforderlichen Berechtigungen einzuschließen

### [Firebase](https://firebasegooglecom/) Console Setup

![Firebase](https://assetsseobotaicom/capgoapp/6805ba51360079f947b8a1bf/e510e8ab32244fff0b09e93222500c83jpg)

Richten Sie Firebase ein und aktivieren Sie Crashlytics durch diese Schritte:

1.  **Erstellen Sie ein Firebase-Projekt** und aktivieren Sie Crashlytics
    
2.  **Registrieren Sie Ihre Apps** in der Firebase Console:
    
    -   Verwenden Sie die **Bundle ID** für iOS und den **Package Namen** für Android
    -   Laden Sie die Konfigurationsdateien herunter: `GoogleService-Infoplist` (iOS) und `google-servicesjson` (Android)
3.  **Integrieren Sie Firebase SDKs** in Ihre App durch Hinzufügen dieser Abhängigkeiten:
    
    **Für Android (App-Level `buildgradle`):**
    
    [[CODE_BLOCK]]
    
    **Für iOS (`Podfile`):**
    
    [[CODE_BLOCK]]
    

Sobald diese Schritte abgeschlossen sind, können Sie mit dem Abschnitt Plugin-Installation fortfahren.

## Installationsschritte

### Plugin-Installation

Installieren Sie zunächst das Plugin und [synchronisieren Sie es mit Capacitor](https://capgoapp/plugins/capacitor-updater/):

[[CODE_BLOCK]]

Initialisieren Sie dann Crashlytics in Ihrer App. Fügen Sie den folgenden Code zu `appcomponentts` oder `maints` hinzu:

[[CODE_BLOCK]]

### Plattform-Konfiguration

Richten Sie die erforderlichen Konfigurationen für Android- und iOS-Plattformen ein.

**Android-Setup**

1.