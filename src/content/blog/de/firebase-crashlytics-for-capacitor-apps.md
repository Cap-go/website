---
slug: firebase-crashlytics-for-capacitor-apps
title: Firebase Crashlytics für Capacitor Apps
description: >-
  Erfahren Sie, wie Sie die Echtzeit-Absturzberichterstattung in Ihre mobilen
  Apps integrieren, mit einer Schritt-für-Schritt-Anleitung zur Einrichtung von
  Crashlytics für sowohl iOS als auch Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-21T03:55:39.168Z
updated_at: 2025-10-10T01:50:18.000Z
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
**[Firebase Crashlytics](https://firebase.google.com/docs/crashlytics)** hilft Ihnen, App-Abstürze in Echtzeit zu verfolgen und detaillierte Berichte bereitzustellen, um Probleme schnell zu beheben. Es integriert sich nahtlos mit [Capacitor](https://capacitorjs.com/) für iOS- und Android-Apps. Hier ist, was Sie wissen müssen:

-   **Warum Crashlytics verwenden?**
    
    -   Erhalten Sie **Echtzeit-Absturzwarnungen**.
    -   Analysieren Sie detaillierte Absturzberichte mit **automatischer Problemanalyse**.
    -   Überwachen Sie kritische Fehler, um Apps stabil zu halten.
-   **Einrichtungsanforderungen:**
    
    -   Installieren Sie **[Node.js](https://nodejs.org/en) (v16+)**, **Capacitor (v4+)** und Tools wie **[Xcode](https://developer.apple.com/xcode/) 14+** und **[Android Studio](https://developer.android.com/studio) Electric Eel**.
    -   Laden Sie die [Firebase](https://firebase.google.com/) Konfigurationsdateien herunter (`GoogleService-Info.plist` für iOS, `google-services.json` für Android).
    -   Aktualisieren Sie plattformspezifische Dateien wie `Podfile` (iOS) und `build.gradle` (Android).
-   **Wichtige Schritte:**
    
    -   Installieren Sie Crashlytics:
        
        ```bash
        npm install @capacitor-firebase/crashlytics && npx cap sync
        ```
        
    -   Initialisieren Sie Crashlytics in Ihrer App:
        
        ```typescript
        import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
        await FirebaseCrashlytics.initialize();
        ```
        
-   **Testen Sie Ihre Einrichtung:**
    
    -   Triggern Sie einen Testabsturz:
        
        ```typescript
        await FirebaseCrashlytics.crash();
        ```
        
-   **Bonus-Tipp:** Kombinieren Sie Crashlytics mit **[Capgo](https://capgo.app/)** für sofortige Live-Updates ohne Verzögerungen im App Store.
    

Dieser Leitfaden stellt sicher, dass Ihre App absturzfrei und benutzerfreundlich ist. Beginnen Sie noch heute mit der Einrichtung von Firebase Crashlytics!

## 2021 Android Leitfaden: [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) - benutzerdefinierter Absturz ...

![Firebase Crashlytics](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/3578d58943ebaf5b91a7f0e1afb1607f.jpg)

<iframe src="https://www.youtube.com/embed/JxVYfZprK0g" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Einrichtungsanforderungen

Bevor Sie loslegen, stellen Sie sicher, dass Sie die folgenden Schritte abgeschlossen haben:

### Erforderliche Software und Konten

Sie müssen Folgendes installieren:

-   **Node.js** (v16 oder höher) und **Capacitor** (v4 oder höher)
-   Ein **Firebase-Konto** mit einem aktiven Projekt
-   **Xcode 14+** für die iOS-Entwicklung
-   **Android Studio Electric Eel** oder eine neuere Version für die Android-Entwicklung
-   Die neueste Version von **[CocoaPods](https://cocoapods.org/)** (erforderlich für iOS)

### Plattform-Konfigurationsdateien

**Für iOS:**

-   Laden Sie die Datei `GoogleService-Info.plist` aus der Firebase-Konsole herunter.
-   Aktualisieren Sie Ihr `Podfile`, um die Abhängigkeiten von Crashlytics einzuschließen.
-   Fügen Sie die erforderlichen Datenschutzschlüssel zu Ihrer Datei `Info.plist` hinzu.

**Für Android:**

-   Erhalten Sie die Datei `google-services.json` aus der Firebase-Konsole.
-   Nehmen Sie Änderungen an den projekt- und app-spezifischen `build.gradle`-Dateien vor.
-   Aktualisieren Sie die `AndroidManifest.xml`, um die erforderlichen Berechtigungen einzuschließen.

### [Firebase](https://firebase.google.com/) Konsolen-Einrichtung

![Firebase](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/e510e8ab32244fff0b09e93222500c83.jpg)

Richten Sie Firebase ein und aktivieren Sie Crashlytics, indem Sie diese Schritte befolgen:

1.  **Erstellen Sie ein Firebase-Projekt** und aktivieren Sie Crashlytics.
    
2.  **Registrieren Sie Ihre Apps** in der Firebase-Konsole:
    
    -   Verwenden Sie die **Bundle-ID** für iOS und den **Paketnamen** für Android.
    -   Laden Sie die Konfigurationsdateien herunter: `GoogleService-Info.plist` (iOS) und `google-services.json` (Android).
3.  **Integrieren Sie Firebase SDKs** in Ihre App, indem Sie diese Abhängigkeiten hinzufügen:
    
    **Für Android (app-level `build.gradle`):**
    
    ```kotlin
    dependencies {
        implementation platform('com.google.firebase:firebase-bom:32.0.0')
        implementation 'com.google.firebase:firebase-crashlytics'
        implementation 'com.google.firebase:firebase-analytics'
    }
    ```
    
    **Für iOS (`Podfile`):**
    
    ```ruby
    pod 'Firebase/Crashlytics'
    pod 'Firebase/Analytics'
    ```
    

Sobald diese Schritte abgeschlossen sind, sind Sie bereit, zum Abschnitt Plugin-Installation überzugehen.

## Installationsschritte

### Plugin-Installation

Installieren Sie zunächst das Plugin und [synchronisieren Sie es mit Capacitor](https://capgo.app/plugins/capacitor-updater/):

```bash
npm install @capacitor-firebase/crashlytics && npx cap sync
```

Dann initialisieren Sie Crashlytics in Ihrer App. Fügen Sie den folgenden Code in `app.component.ts` oder `main.ts` ein:

```typescript
import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
await FirebaseCrashlytics.initialize();
```

### Plattform-Konfiguration

Richten Sie die erforderlichen Konfigurationen für Android- und iOS-Plattformen ein.

**Android-Einrichtung**

1.  Fügen Sie das Crashlytics Gradle-Plugin zu Ihrer app-spezifischen `build.gradle`-Datei hinzu:
    
    ```kotlin
    buildscript { 
        dependencies { 
            classpath 'com.google.firebase:firebase-crashlytics-gradle:2.9.5' 
        } 
    }
    apply plugin: 'com.google.firebase.crashlytics'
    ```
    
2.  Aktivieren Sie die Absturzsammlung in der `AndroidManifest.xml`:
    
    ```xml
    <meta-data
        android:name="firebase_crashlytics_collection_enabled"
        android:value="true" />
    ```
    

**iOS-Einrichtung**

1.  Konfigurieren Sie Firebase in `AppDelegate.swift`:
    
    ```swift
    import Firebase
    FirebaseApp.configure()
    ```
    

### Testen Sie Ihre Einrichtung

Bestätigen Sie, dass Crashlytics funktioniert, indem Sie einen Testabsturz auslösen und die Firebase-Konsole überprüfen:

-   Triggern Sie einen Testabsturz mit einem benutzerdefinierten Schlüssel:
    
    ```typescript
    await FirebaseCrashlytics.setCustomKey({key: 'test_scenario', value: 'manual_crash'});
    await FirebaseCrashlytics.crash();
    ```
    
-   Optional: Identifizieren Sie einen Benutzer:
    
    ```typescript
    await FirebaseCrashlytics.setUserId({userId: 'user123'});
    ```
    
-   Protokollieren Sie benutzerdefinierte Ereignisse:
    
    ```typescript
    await FirebaseCrashlytics.log({message: 'Test crash triggered'});
    ```
    

Berichte, einschließlich Stack-Traces, Gerätedetails und benutzerdefinierter Schlüssel, sollten innerhalb von etwa 5 Minuten in der Firebase-Konsole erscheinen.

**Wichtig:** Entfernen Sie Absturzaufrufe, bevor Sie Ihre App veröffentlichen. Um die Absturzsammlung während der Entwicklung zu deaktivieren, verwenden Sie:

```typescript
await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: false});
```

## Überwachungsleitfaden

Nachdem Sie Ihre Einrichtung mit einem Testabsturz bestätigt haben, verwenden Sie die Firebase-Konsole, um tatsächliche Abstürze und Fehler in Ihrer Live-App zu verfolgen.

### Lesen von Absturzberichten

Sie können Absturzberichte in der Firebase-Konsole im Abschnitt Crashlytics finden. Hier ist, was Sie sehen werden:

-   **Absturzfreie Benutzer**: Der Prozentsatz der Benutzer, die keine Abstürze erlebt haben.
-   **Problemanalyse**: Wie häufig Abstürze auftreten.
-   **Auswirkungsanalyse**: Die Anzahl der betroffenen Benutzer.

Klicken Sie auf ein beliebiges Problem, um tiefer in Details wie Stack-Traces, Geräteinformationen (z.B. OS-Version, Speicher), benutzerdefinierte Schlüssel, Protokolle und die Benutzerreise bis zum Absturz einzutauchen.

**Pro-Tipp**: Aktivieren Sie die Funktion "Geschwindigkeitswarnungen", um benachrichtigt zu werden, wenn die Absturzraten plötzlich ansteigen. Dies kann Ihnen helfen, Probleme zu beheben, bevor sie zu viele Benutzer beeinträchtigen.

### Tipps zum Fehlermanagement

-   **Priorisieren nach Auswirkungen**: Konzentrieren Sie sich auf Abstürze, die die meisten Benutzer betreffen oder in kritischen Teilen Ihrer App auftreten. Das Verfolgen von Trends kann Ihnen helfen, dringende Probleme zu identifizieren.
    
-   **Verwenden Sie benutzerdefinierte Schlüssel**: Fügen Sie Kontext zu Ihren Absturzberichten mit benutzerdefinierten Schlüsseln hinzu. Zum Beispiel:
    
    ```typescript
    await FirebaseCrashlytics.setCustomKey({
      key: 'current_view',
      value: 'payment_processing'
    });
    ```
    
-   **Gruppieren Sie ähnliche Probleme**: Nutzen Sie die automatische Problemanalyse von Firebase. Sie können verwandte Abstürze auch mit konsistenten benutzerdefinierten Schlüsseln kennzeichnen und klare, beschreibende Titel für eine einfachere Nachverfolgung verwenden.
    

### Schutz der Privatsphäre der Benutzer

Um die Einhaltung zu gewährleisten und die Benutzerdaten zu schützen, befolgen Sie diese Richtlinien:

-   **Berechtigungen**:
    
    -   Erwähnen Sie die Absturzberichterstattung in Ihrer Datenschutzrichtlinie.
    -   Holen Sie die Zustimmung der Benutzer für die Datenerfassung in Regionen mit GDPR-Vorschriften ein.
    -   Bieten Sie den Benutzern die Möglichkeit, sich von der Absturzberichterstattung abzumelden.
-   **Kontrollen zur Datenerfassung**:
    
    ```typescript
    await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: false});
    await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: true});
    ```
    
-   **Datenaufbewahrung**:
    
    -   Richten Sie eine automatische Datenlöschung nach 90 Tagen ein.
    -   Entfernen Sie sensible Informationen aus Ihren Berichten.
    -   Verwenden Sie nicht identifizierbare benutzerdefinierte Schlüssel, um die Privatsphäre der Benutzer beim Debuggen zu wahren.

## [Capgo](https://capgo.app/) Integration

![Capgo](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/12eddca90b08193253253ea10516a6c4.jpg)

Optimieren Sie den Prozess von der Absturzdetektion bis zur Bereitstellung von Fixes, indem Sie das Live-Update-System von Capgo mit Crashlytics kombinieren.

### Über Capgo

Capgo ist ein Live-Update-Tool, das speziell für [Capacitor-Apps](https://capgo.app/blog/capacitor-comprehensive-guide/) entwickelt wurde. Mit über 1.900 produzierten Apps und einer Aktualisierungsrate von 95% innerhalb von 24 Stunden sorgt es für schnelle Lösungen ohne Verzögerungen durch Genehmigungen des App Stores [\[1\]](https://capgo.app/).

Hauptmerkmale sind:

-   **Ende-zu-Ende-Verschlüsselung** für sichere Updates
-   **Ein-Klick-Rollback** zu vorherigen Versionen
-   **Kanalbasierte Distribution** für gezielte Veröffentlichungen
-   **Nahtlose CI/CD-Integration**
-   Eine **100% Open-Source-Plattform**

### Crashlytics und Capgo gemeinsam

Die Verwendung von Crashlytics mit Capgo schafft einen effizienten Workflow zur schnellen Identifizierung und Behebung von Problemen.

So funktioniert es:

1.  **Absturzdetektion und -reaktion**  
    Crashlytics identifiziert einen Absturz, und Capgo ermöglicht Ihnen, Lösungen sofort bereitzustellen, ohne auf die Genehmigung des App Stores zu warten.
    
2.  **Gezielte Updates**
    
    -   _Beta-Tests_: Testen Sie Lösungen mit einer bestimmten Gruppe, um sicherzustellen, dass sie wirksam sind.
    -   _Stufenweise Bereitstellung_: Stellen Sie Updates schrittweise bereit, um Risiken zu reduzieren.
    -   _Notfallfix_: Drücken Sie schnell kritische Patches, um dringende Probleme zu beheben.
3.  **Überwachung und Verifizierung**  
    Nach der Bereitstellung von Updates mit Capgo verwenden Sie Crashlytics, um Absturzraten zu verfolgen und zu bestätigen, dass das Problem behoben ist.
    

### Sicherheit und App Store-Regeln

Capgo hält sich an die Richtlinien von Apple und Google und bietet gleichzeitig starke Sicherheitsmerkmale:

-   82% globale Erfolgsquote beim Bereitstellen von Updates [\[1\]](https://capgo.app/)
-   Automatische Versionskontrolle für eine bessere Organisation
-   Einhaltung der Richtlinien für Live-Updates im App Store

Für die sichere Integration mit Crashlytics:

-   Aktivieren Sie das Fehlermanagement in beiden Systemen.
-   Verwenden Sie die Überwachungstools von Capgo neben den Berichten von Crashlytics.
-   Behalten Sie die Versionskontrolle für alle Updates bei.
-   Führen Sie detaillierte Protokolle über Updates zu Prüfungszwecken.

Fahren Sie mit dem Abschnitt Plugin-Optionen fort, um andere Tools für Live-Updates zu erkunden.

## Plugin-Optionen

Die Wahl des richtigen Absturzbericht-Plugins kann erheblichen Einfluss darauf haben, wie Sie Fehler in Ihrer App identifizieren und beheben.

Hier ist ein schneller Vergleich von Crashlytics mit anderen beliebten Fehlerberichterstattungstools für Capacitor:

-   **[Sentry](https://sentry.io/)**: Bietet eine kostenlose Stufe mit kostenpflichtigen Plänen ab 26$/Monat. Unterstützt über 30 Plattformen und bietet Echtzeit-Fehlerüberwachung mit detailliertem Kontext.
-   **[Bugsnag](https://www.bugsnag.com/)**: Beginnt bei 47$/Monat. Deckt sowohl mobile als auch Webplattformen ab und bietet automatische Fehlergruppierung und Release-Tracking.
-   **[Rollbar](https://rollbar.com/)**: Ab 31$/Monat. Funktioniert auf mehreren Plattformen, mit Funktionen wie Bereitstellungs-Tracking und Personenverfolgung.

Crashlytics ist besonders attraktiv für Teams, die bereits Firebase verwenden, dank seiner nahtlosen Integration und einer kostenlosen Stufe.

## Zusammenfassung

Hier ist ein schneller Überblick über das, was Sie erreicht haben und was als Nächstes kommt:

### Einrichtungsschritte Zusammenfassung

Sie haben drei wichtige Schritte abgeschlossen, um zu beginnen:

-   Ein Firebase-Projekt erstellt und Ihre iOS/Android-Apps registriert.
-   Das Crashlytics-Plugin installiert und konfiguriert.
-   Die erforderlichen iOS- und Android-Plattformdateien aktualisiert.

### Warum diese Tools integrieren?

Die Kombination von Firebase Crashlytics mit Capgo bietet Ihnen ein leistungsstarkes System zur Fehlerverfolgung und [Update-Verwaltung](https://capgo.app/docs/plugin/cloud-mode/manual-update/). Das bietet diese Kombination:

-   **Schnelle Lösungen**: Sofortige Updates bereitstellen und Änderungen mit nur einem Klick zurücknehmen.
-   **Zuverlässige Rollouts**: Sicherstellen, dass Updates weit verbreitet und reibungslos an die Benutzer geliefert werden.

### Was kommt als Nächstes?

1.  Aktivieren Sie die detaillierte Absturzanalytik in der Firebase-Konsole.
2.  Fügen Sie Capgo zu Ihrer CI/CD-Pipeline für optimierte Updates hinzu.
3.  Nutzen Sie [Capgo-Kanäle](https://capgo.app/docs/webapp/channels/), um Fehler schrittweise zu testen und freizugeben.

Mit Crashlytics und Capgo sind Sie bereit, Ihre App reibungslos und kontinuierlich zu verbessern.
